/**
 * Ephemeris adapters over astronomy-engine.
 * Real celestial mechanics — never hand-approximated (CLAUDE.md).
 * All longitudes are geocentric ecliptic of date (tropical), as the AGOSS
 * conversion expects.
 */
import {
  AngleBetween,
  AstroTime,
  Body,
  DefineStar,
  Ecliptic,
  EclipticGeoMoon,
  Equator,
  GeoVector,
  Horizon,
  Illumination,
  MakeTime,
  MoonPhase,
  Observer,
  SearchAltitude,
  SearchMoonPhase,
  SearchRiseSet,
  Seasons,
  SunPosition,
} from 'astronomy-engine';
import type { GeoLocation, MoonPhaseInfo } from '../types.js';

// Fixed stars (J2000): Sirius and Alcyone — the Stellar Court triggers fire on
// actual conjunction with these physical stars, never on mansion transit
// (hard constraint #5).
DefineStar(Body.Star1, 6.7525, -16.7161, 8.6); // Sirius: RA 6h45m09s, Dec −16°42'58"
DefineStar(Body.Star2, 3.7914, 24.1051, 444); // Alcyone: RA 3h47m29s, Dec +24°06'18"

export const SIRIUS = Body.Star1;
export const ALCYONE = Body.Star2;

export function toTime(date: Date): AstroTime {
  return MakeTime(date);
}

/** Moon geocentric ecliptic longitude of date (tropical), degrees 0–360. */
export function moonTropicalLongitude(date: Date): number {
  return EclipticGeoMoon(toTime(date)).lon;
}

/** Sun geocentric apparent ecliptic longitude of date (tropical), degrees 0–360. */
export function sunTropicalLongitude(date: Date): number {
  return SunPosition(toTime(date)).elon;
}

/** Moon illumination fraction and waxing flag. */
export function moonPhaseInfo(date: Date): MoonPhaseInfo {
  const illum = Illumination(Body.Moon, toTime(date));
  const phaseAngle = MoonPhase(toTime(date)); // 0 = new, 180 = full
  return { illumination: illum.phase_fraction, waxing: phaseAngle < 180 };
}

/** The most recent new moon (conjunction) at or before `date`. */
export function previousNewMoon(date: Date): Date {
  // Search backward: start 31 days earlier, find the last new moon before date.
  let t = MakeTime(new Date(date.getTime() - 31 * 86400_000));
  let last: AstroTime | null = null;
  for (;;) {
    const found = SearchMoonPhase(0, t, 40);
    if (!found || found.date.getTime() > date.getTime()) break;
    last = found;
    t = found.AddDays(1);
  }
  if (!last) throw new Error('No new moon found before date');
  return last.date;
}

/** The next new moon strictly after `date`. */
export function nextNewMoon(date: Date): Date {
  const found = SearchMoonPhase(0, toTime(date), 40);
  if (!found) throw new Error('No new moon found after date');
  return found.date;
}

export interface SeasonBoundaries {
  marEquinox: Date;
  junSolstice: Date;
  sepEquinox: Date;
  decSolstice: Date;
}

export function seasonBoundaries(year: number): SeasonBoundaries {
  const s = Seasons(year);
  return {
    marEquinox: s.mar_equinox.date,
    junSolstice: s.jun_solstice.date,
    sepEquinox: s.sep_equinox.date,
    decSolstice: s.dec_solstice.date,
  };
}

export function makeObserver(loc: GeoLocation): Observer {
  return new Observer(loc.lat, loc.lon, 0);
}

/** Sunrise at or after `from` (within limitDays). */
export function nextSunrise(loc: GeoLocation, from: Date, limitDays = 2): Date {
  const t = SearchRiseSet(Body.Sun, makeObserver(loc), +1, toTime(from), limitDays);
  if (!t) throw new Error('No sunrise found (polar condition?)');
  return t.date;
}

/** Sunset at or after `from` (within limitDays). */
export function nextSunset(loc: GeoLocation, from: Date, limitDays = 2): Date {
  const t = SearchRiseSet(Body.Sun, makeObserver(loc), -1, toTime(from), limitDays);
  if (!t) throw new Error('No sunset found (polar condition?)');
  return t.date;
}

/**
 * Time at or after `from` when the Sun reaches `altitudeDeg` moving in
 * `direction` (+1 ascending / −1 descending). Used for dawn/dusk (Fajr/Isha)
 * and the Asr shadow altitude.
 */
export function sunAltitudeTime(
  loc: GeoLocation,
  from: Date,
  direction: 1 | -1,
  altitudeDeg: number,
  limitDays = 2
): Date {
  const t = SearchAltitude(Body.Sun, makeObserver(loc), direction, toTime(from), limitDays, altitudeDeg);
  if (!t) throw new Error(`Sun never reaches altitude ${altitudeDeg}° (polar condition?)`);
  return t.date;
}

/** 3D angular separation in degrees between the Moon and a defined star body. */
export function moonStarAngularSeparation(star: Body, date: Date): number {
  const t = toTime(date);
  const moon = GeoVector(Body.Moon, t, true);
  const starVec = GeoVector(star, t, true);
  return AngleBetween(moon, starVec);
}

/** A star's geocentric ecliptic longitude of date (true ecliptic, degrees). */
export function starEclipticLongitude(star: Body, date: Date): number {
  const t = toTime(date);
  const vec = GeoVector(star, t, true); // EQJ frame
  return Ecliptic(vec).elon; // converted to true ecliptic of date
}

/**
 * Conjunction separation: |Δ ecliptic longitude| between the Moon and a star,
 * wrapped to ≤180°. The classical (and physically realizable) conjunction
 * measure — Sirius sits ~39.6° below the ecliptic, so a 3D separation of 1°
 * can never occur; the spec's "~2–4 hours duration" for monthly triggers
 * matches the Moon crossing a ±1° longitude window (~0.55°/hour).
 */
export function moonStarLongitudeSeparation(star: Body, date: Date): number {
  const moonLon = EclipticGeoMoon(toTime(date)).lon;
  const starLon = starEclipticLongitude(star, date);
  const diff = Math.abs(moonLon - starLon) % 360;
  return diff > 180 ? 360 - diff : diff;
}

/** Altitude of a body above the horizon (degrees), equatorial→horizontal of date. */
export function bodyAltitude(body: Body, loc: GeoLocation, date: Date): number {
  const t = toTime(date);
  const obs = makeObserver(loc);
  const eq = Equator(body, t, obs, true, true);
  const hor = Horizon(t, obs, eq.ra, eq.dec, 'normal');
  return hor.altitude;
}
