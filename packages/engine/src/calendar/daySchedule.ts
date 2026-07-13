/**
 * The day as an astrolabe — the full sunrise-to-sunrise planetary day assembled
 * for rendering. Twenty-four planetary hours (unequal, anchored to sunrise and
 * sunset) and the six Salah windows, each with real clock-time bounds, so a UI
 * can draw the living clock without touching astronomy.
 *
 * Pure function of (timestamp, location) — no clock reads, no hidden state.
 */
import type { GeoLocation, Planet, SalahWindow } from '../types.js';
import { CHALDEAN_ORDER } from '../data/trigrams.js';
import { DAY_LORDS, SALAH_WINDOW_LINES } from '../data/calendarData.js';
import { nextSunrise, nextSunset } from '../astro/ephemeris.js';
import { planetaryDaySunrise, weekdayInTz } from './planetaryHours.js';
import {
  prayerTimesForDay,
  DEFAULT_METHOD,
  type SalahMethod,
  type DayPrayerTimes,
} from './salah.js';

/**
 * Display windows on the clock. The reading engine only ever knows the six
 * ratified SalahWindows (Calendar §4); 'isha' is a DISPLAY-ONLY subdivision of
 * the Line-1 night — Isha (the night) before its final third (Tahajjud). It
 * never carries its own line: both halves of the night read as Line 1.
 */
export type ClockWindow = SalahWindow | 'isha';

export interface PlanetaryHourSlot {
  /** 0–23 across the planetary day (0 = first daylight hour). */
  index: number;
  planet: Planet;
  isDay: boolean;
  /** 1–12 within the day or night half. */
  hourNumber: number;
  start: Date;
  end: Date;
}

export interface SalahArc {
  window: ClockWindow;
  line: number;
  start: Date;
  end: Date;
}

export interface DaySchedule {
  /** Sunrise beginning this planetary day. */
  sunrise: Date;
  sunset: Date;
  /** Sunrise ending this planetary day (the seam of the dial). */
  nextSunrise: Date;
  dayLord: Planet;
  hours: PlanetaryHourSlot[]; // 24
  salahArcs: SalahArc[]; // 6, spanning sunrise → nextSunrise
  prayers: DayPrayerTimes;
  currentHourIndex: number;
  currentSalahWindow: ClockWindow;
  currentSalahLine: number;
}

export function daySchedule(
  loc: GeoLocation,
  date: Date,
  method: SalahMethod = DEFAULT_METHOD
): DaySchedule {
  const sunrise = planetaryDaySunrise(loc, date);
  const sunset = nextSunset(loc, sunrise, 2);
  const next = nextSunrise(loc, new Date(sunset.getTime() + 60_000), 2);
  const dayLord = DAY_LORDS[weekdayInTz(sunrise, loc.tz)] as Planet;
  const lordIndex = CHALDEAN_ORDER.indexOf(dayLord);

  const dayLen = (sunset.getTime() - sunrise.getTime()) / 12;
  const nightLen = (next.getTime() - sunset.getTime()) / 12;

  const hours: PlanetaryHourSlot[] = [];
  for (let i = 0; i < 24; i++) {
    const planet = CHALDEAN_ORDER[(lordIndex + i) % 7] as Planet;
    const isDay = i < 12;
    const start = isDay
      ? new Date(sunrise.getTime() + i * dayLen)
      : new Date(sunset.getTime() + (i - 12) * nightLen);
    const end = isDay
      ? new Date(sunrise.getTime() + (i + 1) * dayLen)
      : new Date(sunset.getTime() + (i - 12 + 1) * nightLen);
    hours.push({ index: i, planet, isDay, hourNumber: (i % 12) + 1, start, end });
  }

  // Prayer times for this planetary day (anchor at solar midday to lock the cycle).
  const midday = new Date(sunrise.getTime() + (sunset.getTime() - sunrise.getTime()) / 2);
  const prayers = prayerTimesForDay(loc, midday, method);
  // Next dawn/sunrise close the Tahajjud → Fajr tail of the dial.
  const nextPrayers = prayerTimesForDay(loc, new Date(next.getTime() + 3600_000), method);

  // Traditional night reckoning: sunset → next dawn; Tahajjud is its final third,
  // Isha the earlier night. DISPLAY ONLY — the reading still treats the whole
  // night as one Tahajjud window (Line 1) per Calendar §4.
  const nightStart = prayers.maghrib;
  const nightEnd = nextPrayers.fajrDawn;
  const lastThirdStart = new Date(nightStart.getTime() + (2 / 3) * (nightEnd.getTime() - nightStart.getTime()));

  const arcSpans: { window: ClockWindow; start: Date; end: Date }[] = [
    { window: 'duha', start: sunrise, end: prayers.dhuhr },
    { window: 'dhuhr_asr', start: prayers.dhuhr, end: prayers.asr },
    { window: 'asr_maghrib', start: prayers.asr, end: prayers.maghrib },
    { window: 'maghrib_isha', start: prayers.maghrib, end: prayers.isha },
  ];
  if (lastThirdStart.getTime() > prayers.isha.getTime()) {
    arcSpans.push({ window: 'isha', start: prayers.isha, end: lastThirdStart });
    arcSpans.push({ window: 'tahajjud', start: lastThirdStart, end: nightEnd });
  } else {
    // Degenerate high-latitude night: keep the single Tahajjud window.
    arcSpans.push({ window: 'tahajjud', start: prayers.isha, end: nightEnd });
  }
  arcSpans.push({ window: 'fajr', start: nextPrayers.fajrDawn, end: next });

  const salahArcs: SalahArc[] = arcSpans.map((a) => ({
    ...a,
    line: a.window === 'isha' ? 1 : SALAH_WINDOW_LINES[a.window],
  }));

  const t = date.getTime();
  let currentHourIndex = hours.findIndex((h) => t >= h.start.getTime() && t < h.end.getTime());
  if (currentHourIndex < 0) currentHourIndex = t < sunrise.getTime() ? 0 : 23;

  // Current display window: which drawn arc holds the moment (Isha vs Tahajjud
  // resolves here for the clock; readings resolve it as Tahajjud upstream).
  const currentArc = salahArcs.find((a) => t >= a.start.getTime() && t < a.end.getTime());

  return {
    sunrise,
    sunset,
    nextSunrise: next,
    dayLord,
    hours,
    salahArcs,
    prayers,
    currentHourIndex,
    currentSalahWindow: currentArc?.window ?? 'tahajjud',
    currentSalahLine: currentArc?.line ?? 1,
  };
}
