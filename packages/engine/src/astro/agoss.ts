/**
 * AGOSS — the Amraqiyyah Galactic Oriental Sidereal System (Calendar §11).
 * 0°00' AGOSS = ecliptic longitude of Sagittarius A* at epoch J2000.0.
 *
 * λ_AGOSS(t) = (λ_tropical(t) − 266°51' − 50.29″ × Δt) mod 360°
 * Δt = years from J2000. The vernal point DESCENDS (retrograde) — hard constraint #8.
 */
import {
  PRECESSION_ARCSEC_PER_YEAR,
  SGR_A_TROPICAL_LON_J2000,
  AGES,
  type AgeInfo,
} from '../data/calendarData.js';
import type { Mansion } from '../types.js';
import { mansionFromAgoss } from '../data/mansions.js';
import { moonTropicalLongitude } from './ephemeris.js';

const J2000_UTC_MS = Date.UTC(2000, 0, 1, 12, 0, 0); // 2000-01-01T12:00Z (J2000.0)
const JULIAN_YEAR_MS = 365.25 * 86400_000;

/** Years elapsed since J2000.0 (Julian years, fractional). */
export function yearsSinceJ2000(date: Date): number {
  return (date.getTime() - J2000_UTC_MS) / JULIAN_YEAR_MS;
}

function mod360(x: number): number {
  return ((x % 360) + 360) % 360;
}

/** Convert a tropical (of-date) ecliptic longitude to AGOSS. */
export function tropicalToAgoss(tropicalLonDeg: number, date: Date): number {
  const dt = yearsSinceJ2000(date);
  return mod360(
    tropicalLonDeg - SGR_A_TROPICAL_LON_J2000 - (PRECESSION_ARCSEC_PER_YEAR * dt) / 3600
  );
}

/** Convert an AGOSS longitude back to tropical (of-date). */
export function agossToTropical(agossLonDeg: number, date: Date): number {
  const dt = yearsSinceJ2000(date);
  return mod360(
    agossLonDeg + SGR_A_TROPICAL_LON_J2000 + (PRECESSION_ARCSEC_PER_YEAR * dt) / 3600
  );
}

/** The Moon's AGOSS longitude and current lunar mansion. */
export function currentMansion(date: Date): { agossLon: number; mansion: Mansion } {
  const tropical = moonTropicalLongitude(date);
  const agossLon = tropicalToAgoss(tropical, date);
  return { agossLon, mansion: mansionFromAgoss(agossLon) };
}

/**
 * The vernal point's AGOSS longitude: λ_tropical(vernal) = 0° by definition,
 * so the vernal point descends from 93°09' at J2000.
 */
export function vernalPointAgoss(date: Date): number {
  return tropicalToAgoss(0, date);
}

export interface GreatYearPosition {
  vernalEquinoxAgoss: number;
  age: AgeInfo;
  /** Fraction of the age completed (descending through the arc). */
  ageCompletion: number;
  /** Year within the age (1-based). */
  ageYear: number;
  ageDurationYears: number;
  ageEntryCe: number;
  ageExitsCe: number;
  nextAge: AgeInfo;
  /** Vernal-galactic conjunction — the Return (vernal point reaches 0° AGOSS). */
  conjunctionReturnCe: number;
}

/** Years per degree of precession. */
const YEARS_PER_DEGREE = 3600 / PRECESSION_ARCSEC_PER_YEAR;

export function greatYearPosition(date: Date): GreatYearPosition {
  const vernal = vernalPointAgoss(date);
  const age = AGES.find((a) => vernal >= a.arcStart && vernal < a.arcEnd);
  if (!age) throw new Error(`No age for vernal longitude ${vernal}`);
  // Descending: the age begins at arcEnd and completes at arcStart.
  const ageDurationYears = 30 * YEARS_PER_DEGREE;
  const ageCompletion = (age.arcEnd - vernal) / 30;
  const ageYear = Math.max(1, Math.round(ageCompletion * ageDurationYears));
  const yearNow = date.getUTCFullYear() + date.getUTCMonth() / 12;
  const ageEntryCe = Math.round(yearNow - ageCompletion * ageDurationYears);
  const ageExitsCe = Math.round(yearNow + (1 - ageCompletion) * ageDurationYears);
  const conjunctionReturnCe = Math.round(yearNow + vernal * YEARS_PER_DEGREE);
  // Next age in the descent: the age whose arc lies immediately below.
  const nextStart = age.arcStart === 0 ? 330 : age.arcStart - 30;
  const nextAge = AGES.find((a) => a.arcStart === nextStart);
  if (!nextAge) throw new Error('No next age');
  return {
    vernalEquinoxAgoss: vernal,
    age,
    ageCompletion,
    ageYear,
    ageDurationYears,
    ageEntryCe,
    ageExitsCe,
    nextAge,
    conjunctionReturnCe,
  };
}
