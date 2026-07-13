/**
 * Layer 8 — The 33-Year Harmonic Cycle (Calendar §10).
 * 11,694-day cycles counted from the entry of the Age of Pisces (~78 CE).
 */
import { AGE_IV_ENTRY_CE, HARMONIC_CYCLE_DAYS } from '../data/calendarData.js';

/**
 * Epoch: 78 CE January 1 (proleptic Gregorian, UTC).
 * NOTE: Date.UTC(78, …) would map to 1978 — two-digit-year legacy behavior —
 * so the year is set explicitly.
 */
const EPOCH_MS = (() => {
  const d = new Date(Date.UTC(2000, 0, 1, 0, 0, 0));
  d.setUTCFullYear(78);
  return d.getTime();
})();

export interface HarmonicState {
  cycleNumber: number; // 1-based cycle of the Age of Pisces
  yearInCycle: number; // 1–33 (lunar years)
  dayInCycle: number;
  nextBoundaryCe: number;
  epoch: string;
}

export function harmonicState(date: Date): HarmonicState {
  const days = (date.getTime() - EPOCH_MS) / 86400_000;
  const cycleIndex = Math.floor(days / HARMONIC_CYCLE_DAYS); // 0-based
  const dayInCycle = Math.floor(days - cycleIndex * HARMONIC_CYCLE_DAYS) + 1;
  const lunarYearDays = HARMONIC_CYCLE_DAYS / 33; // 354.36 days
  const yearInCycle = Math.min(Math.floor((dayInCycle - 1) / lunarYearDays) + 1, 33);
  const nextBoundaryDays = (cycleIndex + 1) * HARMONIC_CYCLE_DAYS;
  const nextBoundaryCe = Math.round(AGE_IV_ENTRY_CE + nextBoundaryDays / 365.2425);
  return {
    cycleNumber: cycleIndex + 1,
    yearInCycle,
    dayInCycle,
    nextBoundaryCe,
    epoch: `Age IV entry (~${AGE_IV_ENTRY_CE} CE)`,
  };
}
