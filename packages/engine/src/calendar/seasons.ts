/**
 * Layer 6 — Solar Seasons (Calendar §8).
 * Anchored by equinoxes/solstices (calculable to the second). ~91-day seasons
 * divide across six lines (bins 15/15/15/15/15/16). Solar Threshold: ±3 days
 * of a solstice/equinox — lines 6 and 1 simultaneously indicated.
 */
import type { Season } from '../types.js';
import { seasonBoundaries } from '../astro/ephemeris.js';
import { seasonDayLine } from '../data/calendarData.js';

export interface SeasonState {
  season: Season;
  dayOfSeason: number; // 1-based
  activeLine: number;
  /** Within ±3 days of a solstice/equinox (days 89–91 closing OR 1–3 opening). */
  thresholdState: boolean;
  seasonStart: Date;
  nextBoundary: Date;
}

interface Boundary {
  season: Season;
  start: Date;
}

/** All season boundaries covering `date` (northern-hemisphere season names). */
function boundariesAround(date: Date): Boundary[] {
  const y = date.getUTCFullYear();
  const out: Boundary[] = [];
  for (const year of [y - 1, y, y + 1]) {
    const b = seasonBoundaries(year);
    out.push(
      { season: 'spring', start: b.marEquinox },
      { season: 'summer', start: b.junSolstice },
      { season: 'autumn', start: b.sepEquinox },
      { season: 'winter', start: b.decSolstice }
    );
  }
  return out.sort((a, b) => a.start.getTime() - b.start.getTime());
}

export function seasonState(date: Date): SeasonState {
  const bounds = boundariesAround(date);
  let current: Boundary | null = null;
  let next: Boundary | null = null;
  for (let i = 0; i < bounds.length - 1; i++) {
    if (bounds[i]!.start.getTime() <= date.getTime() && date.getTime() < bounds[i + 1]!.start.getTime()) {
      current = bounds[i]!;
      next = bounds[i + 1]!;
      break;
    }
  }
  if (!current || !next) throw new Error('Season boundaries not found');
  const dayOfSeason = Math.floor((date.getTime() - current.start.getTime()) / 86400_000) + 1;
  const daysToNext = (next.start.getTime() - date.getTime()) / 86400_000;
  const daysSinceStart = (date.getTime() - current.start.getTime()) / 86400_000;
  const thresholdState = daysSinceStart <= 3 || daysToNext <= 3;
  return {
    season: current.season,
    dayOfSeason,
    activeLine: seasonDayLine(dayOfSeason),
    thresholdState,
    seasonStart: current.start,
    nextBoundary: next.start,
  };
}
