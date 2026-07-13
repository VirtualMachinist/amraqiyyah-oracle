/**
 * Layer 1 — Planetary Hours (Calendar §3).
 * 12 daylight + 12 night hours, Chaldean descent order, first hour ruled by
 * the day's planetary lord. The planetary day runs sunrise → next sunrise.
 */
import type { GeoLocation, Planet } from '../types.js';
import { CHALDEAN_ORDER } from '../data/trigrams.js';
import { DAY_LORDS } from '../data/calendarData.js';
import { nextSunrise, nextSunset } from '../astro/ephemeris.js';

export interface PlanetaryHour {
  planet: Planet;
  /** 1–12 within its half (day or night). */
  hourNumber: number;
  isDay: boolean;
  start: Date;
  end: Date;
  dayLord: Planet;
}

/** Weekday (0=Sunday) of a Date in a specific IANA timezone. */
export function weekdayInTz(date: Date, tz: string): number {
  const name = new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'short' }).format(date);
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(name);
}

/** Sunrise of the planetary day containing `date` (the most recent sunrise ≤ date). */
export function planetaryDaySunrise(loc: GeoLocation, date: Date): Date {
  // Look back up to 2 days to find the sunrise at or before `date`.
  const probe = new Date(date.getTime() - 2 * 86400_000);
  let sunrise = nextSunrise(loc, probe, 4);
  let prev = sunrise;
  while (sunrise.getTime() <= date.getTime()) {
    prev = sunrise;
    sunrise = nextSunrise(loc, new Date(sunrise.getTime() + 60_000), 2);
  }
  return prev;
}

export function currentPlanetaryHour(loc: GeoLocation, date: Date): PlanetaryHour {
  const dayStart = planetaryDaySunrise(loc, date); // sunrise beginning this planetary day
  const sunset = nextSunset(loc, dayStart, 2);
  const nextDaySunrise = nextSunrise(loc, new Date(sunset.getTime() + 60_000), 2);

  const dayLord = DAY_LORDS[weekdayInTz(dayStart, loc.tz)] as Planet;
  const lordIndex = CHALDEAN_ORDER.indexOf(dayLord);

  let isDay: boolean;
  let hourIndex: number; // 0–23 across the planetary day
  let start: Date;
  let end: Date;

  if (date.getTime() < sunset.getTime()) {
    // Daylight hours: (sunset − sunrise) / 12
    const len = (sunset.getTime() - dayStart.getTime()) / 12;
    const idx = Math.min(Math.floor((date.getTime() - dayStart.getTime()) / len), 11);
    isDay = true;
    hourIndex = idx;
    start = new Date(dayStart.getTime() + idx * len);
    end = new Date(dayStart.getTime() + (idx + 1) * len);
  } else {
    // Night hours: (next sunrise − sunset) / 12
    const len = (nextDaySunrise.getTime() - sunset.getTime()) / 12;
    const idx = Math.min(Math.floor((date.getTime() - sunset.getTime()) / len), 11);
    isDay = false;
    hourIndex = 12 + idx;
    start = new Date(sunset.getTime() + idx * len);
    end = new Date(sunset.getTime() + (idx + 1) * len);
  }

  const planet = CHALDEAN_ORDER[(lordIndex + hourIndex) % 7] as Planet;
  return {
    planet,
    hourNumber: (hourIndex % 12) + 1,
    isDay,
    start,
    end,
    dayLord,
  };
}
