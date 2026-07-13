/**
 * Layer 2 — The Salah Cycle (Calendar §4).
 * Six named windows anchored by the five obligatory prayers; each window maps
 * to one hexagram line. Duha and Tahajjud are full temporal windows.
 */
import type { GeoLocation, SalahWindow } from '../types.js';
import { SALAH_WINDOW_LINES, hizbHalfForWindow } from '../data/calendarData.js';
import {
  bodyAltitude,
  nextSunrise,
  nextSunset,
  sunAltitudeTime,
} from '../astro/ephemeris.js';
import { Body, SearchHourAngle } from 'astronomy-engine';
import { makeObserver, toTime } from '../astro/ephemeris.js';

export interface SalahMethod {
  /** Solar depression angle for Fajr (dawn), degrees below horizon. */
  fajrAngle: number;
  /** Solar depression angle for Isha (dusk), degrees below horizon. */
  ishaAngle: number;
  /** Asr shadow factor: 1 (majority) or 2 (Hanafi). */
  asrShadowFactor: 1 | 2;
}

/** Default method: Muslim World League (Fajr 18°, Isha 17°), Asr factor 1. */
export const DEFAULT_METHOD: SalahMethod = {
  fajrAngle: 18,
  ishaAngle: 17,
  asrShadowFactor: 1,
};

export interface DayPrayerTimes {
  fajrDawn: Date; // astronomical dawn at fajrAngle
  sunrise: Date;
  dhuhr: Date; // solar transit
  asr: Date;
  maghrib: Date; // sunset
  isha: Date; // dusk at ishaAngle
}

/** Solar transit (Dhuhr) at or after `from`. */
function nextTransit(loc: GeoLocation, from: Date): Date {
  const evt = SearchHourAngle(Body.Sun, makeObserver(loc), 0, toTime(from), +1);
  return evt.time.date;
}

/**
 * Prayer times for the civil day that begins at the sunrise on/before `date`
 * (times are computed astronomically for the location).
 */
export function prayerTimesForDay(loc: GeoLocation, dayAnchor: Date, method: SalahMethod = DEFAULT_METHOD): DayPrayerTimes {
  // Anchor on local midnight-ish: find sunrise at/after (dayAnchor at 00:00 local is
  // messy across TZs) — the caller passes any instant; we take the sunrise at or
  // after (dayAnchor − 12h) to lock the day's cycle.
  const sunrise = nextSunrise(loc, new Date(dayAnchor.getTime() - 12 * 3600_000), 3);
  const fajrDawn = sunAltitudeTime(loc, new Date(sunrise.getTime() - 6 * 3600_000), 1, -method.fajrAngle, 1);
  const dhuhr = nextTransit(loc, sunrise);
  // Asr: shadow = noon shadow + factor. Sun altitude at Asr:
  // h_asr = atan( 1 / (factor + cot(h_noon)) )
  const noonAlt = bodyAltitude(Body.Sun, loc, dhuhr);
  const noonAltRad = (noonAlt * Math.PI) / 180;
  const asrAltRad = Math.atan(1 / (method.asrShadowFactor + 1 / Math.tan(noonAltRad)));
  const asrAltDeg = (asrAltRad * 180) / Math.PI;
  const asr = sunAltitudeTime(loc, dhuhr, -1, asrAltDeg, 1);
  const maghrib = nextSunset(loc, dhuhr, 1);
  const isha = sunAltitudeTime(loc, maghrib, -1, -method.ishaAngle, 1);
  return { fajrDawn, sunrise, dhuhr, asr, maghrib, isha };
}

export interface SalahState {
  window: SalahWindow;
  line: number;
  hizbHalf: 'first' | 'second';
  times: DayPrayerTimes;
}

/** Which Salah window contains `date`, with its hexagram line and Hizb half. */
export function currentSalahWindow(loc: GeoLocation, date: Date, method: SalahMethod = DEFAULT_METHOD): SalahState {
  const today = prayerTimesForDay(loc, date, method);
  let window: SalahWindow;
  const t = date.getTime();

  if (t < today.fajrDawn.getTime()) {
    // Before dawn: still Tahajjud (Isha of the previous day → Fajr).
    window = 'tahajjud';
  } else if (t < today.sunrise.getTime()) {
    window = 'fajr';
  } else if (t < today.dhuhr.getTime()) {
    window = 'duha';
  } else if (t < today.asr.getTime()) {
    window = 'dhuhr_asr';
  } else if (t < today.maghrib.getTime()) {
    window = 'asr_maghrib';
  } else if (t < today.isha.getTime()) {
    window = 'maghrib_isha';
  } else {
    window = 'tahajjud'; // after Isha: the night vigil begins
  }

  return {
    window,
    line: SALAH_WINDOW_LINES[window],
    hizbHalf: hizbHalfForWindow(window),
    times: today,
  };
}
