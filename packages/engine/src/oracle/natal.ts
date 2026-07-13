/**
 * The Natal Chart — the entire Amraqiyyah substrate computed for the birth
 * moment, expressed in AGOSS (galactocentric sidereal, Sgr A* = 0°).
 *
 * RATIFIED math only: AGOSS conversion (Calendar §11), the 28 mansions, the 12
 * sidereal houses as 30° AGOSS arcs (Oracle §7.4.4), the name-based natal
 * mansion (§7.4.2), and the full nine-layer substrate (oracleInputs). Interpretive
 * house rulerships and compound protocols are explicitly DEFERRED by §7.4.4 to a
 * future sub-document — this engine computes placements, it does not interpret.
 *
 * Design decisions ratified with the author (2026-07-13): natal hexagram = Mode A
 * at birth (upper = birth Moon-mansion ruler, lower = birth hour ruler); include
 * the Ascendant; show BOTH the name-mansion (identity) and the birth-Moon mansion.
 */
import type { GeoLocation, Hexagram, Mansion, MoonPhaseInfo, Planet } from '../types.js';
import {
  planetTropicalLongitude,
  siderealTimeHours,
  moonPhaseInfo,
} from '../astro/ephemeris.js';
import { tropicalToAgoss } from '../astro/agoss.js';
import { MANSION_WIDTH_DEG, mansionFromAgoss, mansionByNumber, natalMansionNumber, abjadSum, abjadLine } from '../data/mansions.js';
import { hexagramByTrigrams } from '../data/hexagrams.js';
import { oracleInputs, type OracleInputs } from '../calendar/oracleInputs.js';
import { DEFAULT_METHOD, type SalahMethod } from '../calendar/salah.js';

/**
 * The 12 sidereal houses = 30° AGOSS arcs, labeled with the Great-Year Age
 * zodiac mnemonics (Oracle §7.4.4 + Calendar §11). House 1 (0–30° AGOSS) is
 * Sagittarius — the arc containing the galactic center itself.
 */
export const AGOSS_SIGNS = [
  'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus',
  'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio',
] as const;

const CHALDEAN_PLANETS: Planet[] = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'];

function mod360(x: number): number {
  return ((x % 360) + 360) % 360;
}
const D2R = Math.PI / 180;
const R2D = 180 / Math.PI;

/** Mean obliquity of the ecliptic (degrees), IAU 2006 leading terms. */
function meanObliquityDeg(date: Date): number {
  const T = (date.getTime() - Date.UTC(2000, 0, 1, 12)) / (365.25 * 86400_000) / 100; // centuries
  return 23.439291 - 0.0130042 * T - 1.64e-7 * T * T + 5.04e-7 * T * T * T;
}

export interface HousePlacement {
  house: number; // 1–12
  sign: string; // AGOSS sidereal sign
}

function houseFor(agossLon: number): HousePlacement {
  const idx = Math.floor(mod360(agossLon) / 30);
  return { house: idx + 1, sign: AGOSS_SIGNS[idx]! };
}

export interface Placement {
  planet: Planet;
  tropicalLon: number;
  agossLon: number;
  degreeInMansion: number; // 0 – 12.857
  mansion: Mansion;
  house: number;
  sign: string;
}

function placementAt(agossLon: number): { degreeInMansion: number; mansion: Mansion } & HousePlacement {
  const mansion = mansionFromAgoss(agossLon);
  const degreeInMansion = mod360(agossLon) - mansion.agossStartDeg;
  return { mansion, degreeInMansion, ...houseFor(agossLon) };
}

function planetPlacement(planet: Planet, date: Date): Placement {
  const tropicalLon = planetTropicalLongitude(planet, date);
  const agossLon = tropicalToAgoss(tropicalLon, date);
  const { mansion, degreeInMansion, house, sign } = placementAt(agossLon);
  return { planet, tropicalLon, agossLon, degreeInMansion, mansion, house, sign };
}

/**
 * Horizontal coordinates of an ecliptic point (longitude, latitude 0) at a
 * place and time. Exported for validation against a real ephemeris (the Sun
 * lies on the ecliptic, so its computed alt/az must match astronomy-engine).
 * Azimuth measured from North, increasing eastward (0–360).
 */
export function eclipticHorizontal(
  eclipticLonDeg: number,
  date: Date,
  loc: GeoLocation
): { alt: number; az: number } {
  const eps = meanObliquityDeg(date) * D2R;
  const lam = eclipticLonDeg * D2R;
  const ra = Math.atan2(Math.sin(lam) * Math.cos(eps), Math.cos(lam)); // rad, latitude 0
  const dec = Math.asin(Math.sin(eps) * Math.sin(lam));
  const lstDeg = mod360((siderealTimeHours(date) + loc.lon / 15) * 15);
  const H = mod360(lstDeg - ra * R2D) * D2R; // local hour angle
  const phi = loc.lat * D2R;
  const sinAlt = Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(H);
  const alt = Math.asin(Math.max(-1, Math.min(1, sinAlt)));
  const cosAlt = Math.cos(alt);
  const sinAz = (-Math.cos(dec) * Math.sin(H)) / cosAlt;
  const cosAz = (Math.sin(dec) - Math.sin(phi) * sinAlt) / (Math.cos(phi) * cosAlt);
  const az = mod360(Math.atan2(sinAz, cosAz) * R2D);
  return { alt: alt * R2D, az };
}

/**
 * The Ascendant's tropical ecliptic longitude: the ecliptic point on the
 * eastern horizon. Found by scanning the ecliptic for the eastern (az 0–180)
 * horizon crossing — geometry, no closed-form sign convention to get wrong.
 */
function ascendantTropicalLon(date: Date, loc: GeoLocation): number {
  let bestLon = 0;
  let bestAlt = Infinity;
  // coarse 0.1° sweep, then a 0.005° refinement around the best crossing
  for (let lon = 0; lon < 360; lon += 0.1) {
    const { alt, az } = eclipticHorizontal(lon, date, loc);
    if (az > 0 && az < 180 && Math.abs(alt) < bestAlt) {
      bestAlt = Math.abs(alt);
      bestLon = lon;
    }
  }
  for (let lon = bestLon - 0.1; lon <= bestLon + 0.1; lon += 0.005) {
    const { alt, az } = eclipticHorizontal(mod360(lon), date, loc);
    if (az > 0 && az < 180 && Math.abs(alt) < bestAlt) {
      bestAlt = Math.abs(alt);
      bestLon = mod360(lon);
    }
  }
  return bestLon;
}

export interface NatalPoint {
  tropicalLon: number;
  agossLon: number;
  degreeInMansion: number;
  mansion: Mansion;
  house: number;
  sign: string;
}

export interface NameMansion {
  mansionNumber: number;
  mansion: Mansion;
  standingLine: number; // ((letter abjad − 1) mod 6) + 1
}

export interface NatalChart {
  birth: { timestamp: string; location: { lat: number; lon: number; tz: string } };
  /** The seven Chaldean placements in AGOSS. */
  placements: Placement[];
  /** The rising point — Ascendant — in AGOSS. */
  ascendant: NatalPoint;
  /** Mode-A-at-birth hexagram (upper = birth Moon-mansion ruler, lower = birth hour ruler). */
  natalHexagram: Hexagram;
  /** Ibn Arabi identity mansion from the Arabic name (§7.4). Null if no name given. */
  nameMansion: NameMansion | null;
  /** The full nine-layer temporal substrate at the birth moment. */
  substrate: OracleInputs;
  /** Moon phase at birth. */
  moon: MoonPhaseInfo;
}

export function natalChart(
  birthDate: Date,
  loc: GeoLocation,
  nameArabic?: string,
  method: SalahMethod = DEFAULT_METHOD
): NatalChart {
  const placements = CHALDEAN_PLANETS.map((p) => planetPlacement(p, birthDate));

  const ascTropical = ascendantTropicalLon(birthDate, loc);
  const ascAgoss = tropicalToAgoss(ascTropical, birthDate);
  const ascPlace = placementAt(ascAgoss);
  const ascendant: NatalPoint = {
    tropicalLon: ascTropical,
    agossLon: ascAgoss,
    degreeInMansion: ascPlace.degreeInMansion,
    mansion: ascPlace.mansion,
    house: ascPlace.house,
    sign: ascPlace.sign,
  };

  const substrate = oracleInputs(birthDate, loc, method);
  const natalHexagram = hexagramByTrigrams(
    substrate.oracle_inputs.mode_a_upper_trigram as Hexagram['upper'],
    substrate.oracle_inputs.mode_a_lower_trigram as Hexagram['lower']
  );

  let nameMansion: NameMansion | null = null;
  if (nameArabic && nameArabic.trim()) {
    const num = natalMansionNumber(abjadSum(nameArabic));
    const mansion = mansionByNumber(num);
    nameMansion = { mansionNumber: num, mansion, standingLine: abjadLine(mansion.abjad) };
  }

  return {
    birth: { timestamp: birthDate.toISOString(), location: { lat: loc.lat, lon: loc.lon, tz: loc.tz } },
    placements,
    ascendant,
    natalHexagram,
    nameMansion,
    substrate,
    moon: moonPhaseInfo(birthDate),
  };
}
