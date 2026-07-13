/**
 * Layer 5 — The Lunar Month (Calendar §7).
 * Astronomical Hijri: months are anchored to the new-moon conjunction.
 * NO INTERCALATION — hard constraint #10. Observational override is a
 * configuration hook, not a default.
 *
 * Anchor: the conjunction of 25 June 2025 10:31 UTC began 1 Muharram 1447 AH.
 */
import { previousNewMoon } from '../astro/ephemeris.js';
import { HIJRI_MONTHS, lunarDayInWindow, lunarDayLine, type HijriMonthInfo } from '../data/calendarData.js';

/** Conjunction that opened Muharram 1447. */
const ANCHOR_CONJUNCTION = new Date(Date.UTC(2025, 5, 25, 10, 31, 0));
const ANCHOR_TOTAL_MONTHS = (1447 - 1) * 12 + 1; // absolute month count at anchor
const SYNODIC_DAYS = 29.530588;

export interface HijriDate {
  day: number; // 1–30
  month: number; // 1–12
  monthName: string;
  monthInfo: HijriMonthInfo;
  year: number;
  isSacredMonth: boolean;
  /** Check 1 line from the lunar day (5-day bins). */
  lunarDayLine: number;
  /** Day-in-window 1–5 (Zabur grid dimension d). */
  dayInWindow: number;
  /** Conjunction that opened this month. */
  monthStart: Date;
}

/**
 * Astronomical Hijri date at `date` (UTC-based lunar day: days elapsed since
 * the month's conjunction, floor + 1, capped at 30).
 */
export function hijriDate(date: Date): HijriDate {
  const monthStart = previousNewMoon(date);
  // Count conjunctions between the anchor and this month's conjunction.
  const elapsedDays = (monthStart.getTime() - ANCHOR_CONJUNCTION.getTime()) / 86400_000;
  const monthsSince = Math.round(elapsedDays / SYNODIC_DAYS);
  const totalMonths = ANCHOR_TOTAL_MONTHS + monthsSince;
  const month = ((totalMonths - 1) % 12) + 1;
  const year = Math.floor((totalMonths - 1) / 12) + 1;
  const day = Math.min(Math.floor((date.getTime() - monthStart.getTime()) / 86400_000) + 1, 30);
  const monthInfo = HIJRI_MONTHS[month - 1]!;
  return {
    day,
    month,
    monthName: monthInfo.name,
    monthInfo,
    year,
    isSacredMonth: monthInfo.sacred,
    lunarDayLine: lunarDayLine(day),
    dayInWindow: lunarDayInWindow(day),
    monthStart,
  };
}

/** The lunar day 1–30 (age of the moon since conjunction). */
export function lunarDay(date: Date): number {
  return hijriDate(date).day;
}
