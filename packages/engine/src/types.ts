/**
 * Core types for the Amraqiyyah Oracle engines.
 * All engines are pure functions of (timestamp, location, querent data) → outputs.
 */

export type Planet =
  | 'Saturn'
  | 'Jupiter'
  | 'Mars'
  | 'Sun'
  | 'Venus'
  | 'Mercury'
  | 'Moon';

/** The eighth trigram Gen is anchored to Sgr A*, not a planet. */
export type TrigramRuler = Planet | 'Gen';

export type Element = 'Fire' | 'Earth' | 'Air' | 'Ether' | 'Water';

export type Register = 'Jalal' | 'Jamal' | 'Kamal';

/** Suit of a hexagram — determined by the UPPER trigram (hard constraint #7). */
export type Suit = Element | 'Axial';

/** Six lines, index 0 = Line 1 (bottom) … index 5 = Line 6 (top). true = yang. */
export type Lines = [boolean, boolean, boolean, boolean, boolean, boolean];

export type LineNumber = 1 | 2 | 3 | 4 | 5 | 6;

export type SalahWindow =
  | 'tahajjud'
  | 'fajr'
  | 'duha'
  | 'dhuhr_asr'
  | 'asr_maghrib'
  | 'maghrib_isha';

export type WeekDay =
  | 'al-Ahad'
  | 'al-Ithnayn'
  | 'al-Thulatha'
  | 'al-Arbiʿa'
  | 'al-Khamis'
  | 'al-Jumuʿah'
  | 'al-Sabt';

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export type Veil = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type ReadingMode = 'A' | 'B' | 'C';

export type StellarCourtState =
  | 'none'
  | 'witness_star' // State 1 — Sirius
  | 'pleiades_gate' // State 2 — Pleiades
  | 'both'; // State 3 — hold and witness

export interface GeoLocation {
  lat: number;
  lon: number;
  /** IANA timezone, e.g. "America/Chicago" */
  tz: string;
}

export interface Hexagram {
  /** King Wen number 1–64 */
  number: number;
  name: string;
  upper: TrigramRuler;
  lower: TrigramRuler;
  lines: Lines;
  suit: Suit;
  register: Register | 'Axial';
  divineName: string;
  divineNameArabic: string;
  divineNameMeaning: string;
  /** 'core' = 7×7 field; 'pleiadian'/'sirian' = threshold; 'axial' = Hex 52 */
  kind: 'core' | 'pleiadian' | 'sirian' | 'axial';
  pureResonance: boolean;
}

export interface Mansion {
  number: number; // 1–28
  nameAr: string;
  translation: string;
  /** exact start in AGOSS degrees: (number-1) * 360/28 */
  agossStartDeg: number;
  letter: string; // Arabic letter
  letterName: string;
  abjad: number;
  ruler: Planet;
}

export interface MoonPhaseInfo {
  /** Illuminated fraction 0–1 */
  illumination: number;
  /** True if waxing */
  waxing: boolean;
}
