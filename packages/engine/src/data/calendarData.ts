import type { Planet, SalahWindow, WeekDay } from '../types.js';

/** Salah windows → hexagram lines (Calendar §4). THE ONE TABLE with Oracle §8.2. */
export const SALAH_WINDOW_LINES: Record<SalahWindow, number> = {
  tahajjud: 1,
  fajr: 2,
  duha: 3,
  dhuhr_asr: 4,
  asr_maghrib: 5,
  maghrib_isha: 6,
};

export const SALAH_WINDOW_ORDER: SalahWindow[] = [
  'tahajjud',
  'fajr',
  'duha',
  'dhuhr_asr',
  'asr_maghrib',
  'maghrib_isha',
];

/** Pre-noon windows → first Hizb of the day's Juz; post-noon → second (Oracle §11.1). */
export function hizbHalfForWindow(w: SalahWindow): 'first' | 'second' {
  return w === 'tahajjud' || w === 'fajr' || w === 'duha' ? 'first' : 'second';
}

/** Day-lord table (Calendar §3). JS getDay(): 0=Sunday. */
export const DAY_LORDS: Planet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

export interface WeekDayInfo {
  day: WeekDay;
  english: string;
  lord: Planet;
  /** Standing weekly line 1–6, or null for al-Sabt (axial — hard constraint #9). */
  standingLine: number | null;
}

/** The week is a hexagram: six days that count, one that stops (Calendar §5). */
export const WEEK: WeekDayInfo[] = [
  { day: 'al-Ahad', english: 'Sunday', lord: 'Sun', standingLine: 1 },
  { day: 'al-Ithnayn', english: 'Monday', lord: 'Moon', standingLine: 2 },
  { day: 'al-Thulatha', english: 'Tuesday', lord: 'Mars', standingLine: 3 },
  { day: 'al-Arbiʿa', english: 'Wednesday', lord: 'Mercury', standingLine: 4 },
  { day: 'al-Khamis', english: 'Thursday', lord: 'Jupiter', standingLine: 5 },
  { day: 'al-Jumuʿah', english: 'Friday', lord: 'Venus', standingLine: 6 },
  { day: 'al-Sabt', english: 'Saturday', lord: 'Saturn', standingLine: null },
];

export interface HijriMonthInfo {
  number: number;
  name: string;
  gloss: string;
  sacred: boolean;
  abjadLine: number;
}

/** The twelve Hijri months (Calendar §7). No intercalation — hard constraint #10. */
export const HIJRI_MONTHS: HijriMonthInfo[] = [
  { number: 1, name: 'Muharram', gloss: 'The Sacred Opening', sacred: true, abjadLine: 1 },
  { number: 2, name: 'Safar', gloss: 'The Departure', sacred: false, abjadLine: 1 },
  { number: 3, name: 'Rabi al-Awwal', gloss: 'First Spring', sacred: false, abjadLine: 2 },
  { number: 4, name: 'Rabi al-Thani', gloss: 'Second Spring', sacred: false, abjadLine: 2 },
  { number: 5, name: 'Jumada al-Ula', gloss: 'First Stillness', sacred: false, abjadLine: 3 },
  { number: 6, name: 'Jumada al-Thani', gloss: 'Second Stillness', sacred: false, abjadLine: 3 },
  { number: 7, name: 'Rajab', gloss: 'The Revered', sacred: true, abjadLine: 4 },
  { number: 8, name: "Sha'ban", gloss: 'The Branching', sacred: false, abjadLine: 4 },
  { number: 9, name: 'Ramadan', gloss: 'The Burning', sacred: false, abjadLine: 5 },
  { number: 10, name: 'Shawwal', gloss: 'The Lifting', sacred: false, abjadLine: 5 },
  { number: 11, name: "Dhul Qi'dah", gloss: 'The Sitting', sacred: true, abjadLine: 6 },
  { number: 12, name: 'Dhul Hijjah', gloss: 'The Pilgrimage', sacred: true, abjadLine: 6 },
];

/** Check 1 — lunar day → line (5-day bins, Oracle §9.3). */
export function lunarDayLine(lunarDay: number): number {
  const d = Math.min(Math.max(lunarDay, 1), 30);
  return Math.min(Math.floor((d - 1) / 5) + 1, 6);
}

/** Day-in-window 1–5 within the lunar day's 5-day line bin (Zabur grid dimension d). */
export function lunarDayInWindow(lunarDay: number): number {
  const d = Math.min(Math.max(lunarDay, 1), 30);
  return ((d - 1) % 5) + 1;
}

/**
 * Check 3 — season day → line. Bins 15/15/15/15/15/16: Line 6 absorbs the
 * remainder of the 91-day season (Calendar §8).
 */
export function seasonDayLine(dayOfSeason: number): number {
  const d = Math.min(Math.max(dayOfSeason, 1), 91);
  if (d <= 15) return 1;
  if (d <= 30) return 2;
  if (d <= 45) return 3;
  if (d <= 60) return 4;
  if (d <= 75) return 5;
  return 6;
}

/** Harmonic cycle length in days (Calendar §10): 33 lunar years. */
export const HARMONIC_CYCLE_DAYS = 11694;

/** Age IV (Pisces) entry — the harmonic epoch (~78 CE). */
export const AGE_IV_ENTRY_CE = 78;

/** AGOSS constants (Calendar §11). */
export const SGR_A_TROPICAL_LON_J2000 = 266 + 51 / 60; // 266°51'
export const PRECESSION_ARCSEC_PER_YEAR = 50.29;

export interface AgeInfo {
  numeral: string;
  index: number; // numeric for JSON (IV = 4)
  label: string;
  character: string;
  /** AGOSS arc [start, end) in degrees */
  arcStart: number;
  arcEnd: number;
}

/**
 * The Twelve Ages (Calendar §11) — fixed 30° arcs; the vernal point DESCENDS
 * (retrograde — hard constraint #8), so ages run VI → V → IV → III → II → I.
 */
export const AGES: AgeInfo[] = [
  { numeral: 'I', index: 1, label: 'Sagittarius', character: 'The Center — convergence, the Return', arcStart: 0, arcEnd: 30 },
  { numeral: 'II', index: 2, label: 'Capricorn', character: 'Structure — foundation, discipline', arcStart: 30, arcEnd: 60 },
  { numeral: 'III', index: 3, label: 'Aquarius', character: 'Innovation — disruption, flow', arcStart: 60, arcEnd: 90 },
  { numeral: 'IV', index: 4, label: 'Pisces', character: 'Dissolution — faith, surrender', arcStart: 90, arcEnd: 120 },
  { numeral: 'V', index: 5, label: 'Aries', character: 'Ignition — initiative, emergence', arcStart: 120, arcEnd: 150 },
  { numeral: 'VI', index: 6, label: 'Taurus', character: 'Accumulation — wealth, permanence', arcStart: 150, arcEnd: 180 },
  { numeral: 'VII', index: 7, label: 'Gemini', character: '—', arcStart: 180, arcEnd: 210 },
  { numeral: 'VIII', index: 8, label: 'Cancer', character: '—', arcStart: 210, arcEnd: 240 },
  { numeral: 'IX', index: 9, label: 'Leo', character: '—', arcStart: 240, arcEnd: 270 },
  { numeral: 'X', index: 10, label: 'Virgo', character: '—', arcStart: 270, arcEnd: 300 },
  { numeral: 'XI', index: 11, label: 'Libra', character: '—', arcStart: 300, arcEnd: 330 },
  { numeral: 'XII', index: 12, label: 'Scorpio', character: '—', arcStart: 330, arcEnd: 360 },
];
