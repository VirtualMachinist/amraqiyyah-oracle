/**
 * Stellar Court Engine (Oracle §5.1, §9.5).
 * Triggers fire on ACTUAL CONJUNCTION — Moon within 1° of the physical star
 * (Sirius / Alcyone) — or on heliacal rising. NEVER on mansion transit
 * (hard constraint #5). Annual (heliacal) triggers carry maximum weight.
 */
import { Body } from 'astronomy-engine';
import type { GeoLocation, StellarCourtState } from '../types.js';
import {
  ALCYONE,
  SIRIUS,
  bodyAltitude,
  moonStarSeparation,
  nextSunrise,
  sunAltitudeTime,
} from '../astro/ephemeris.js';

export const CONJUNCTION_ORB_DEG = 1.0;

export interface StellarCourtStatus {
  state: StellarCourtState;
  sirius: {
    conjunction: boolean;
    separationDeg: number;
    heliacalRising: boolean;
  };
  pleiades: {
    conjunction: boolean;
    separationDeg: number;
    heliacalRising: boolean;
  };
  /** Annual triggers carry maximum weight. */
  weight: 'none' | 'standard' | 'maximum';
}

/**
 * Heliacal rising detection (deterministic ijtihad, documented):
 * the star is in its heliacal-rising window on the first day of the year it
 * becomes visible at dawn — visible = star altitude ≥ 5° at the moment the Sun
 * is 9° below the horizon before sunrise — after a period of invisibility.
 * The activation window is the first-visibility day and the following day.
 */
export function heliacalRisingActive(
  star: Body,
  loc: GeoLocation,
  date: Date
): boolean {
  const visibleToday = visibleAtDawn(star, loc, date);
  if (!visibleToday) return false;
  // Active only if the star was NOT visible 3 days ago (i.e., this is the
  // first-visibility window, not deep in its visibility season) …
  const before = new Date(date.getTime() - 3 * 86400_000);
  if (visibleAtDawn(star, loc, before)) return false;
  return true;
}

function visibleAtDawn(star: Body, loc: GeoLocation, date: Date): boolean {
  try {
    // Morning twilight moment: Sun ascending through −9°, before the sunrise
    // that follows `date`'s midnight.
    const sunrise = nextSunrise(loc, new Date(date.getTime() - 12 * 3600_000), 2);
    const dawnMoment = sunAltitudeTime(
      loc,
      new Date(sunrise.getTime() - 3 * 3600_000),
      1,
      -9,
      1
    );
    return bodyAltitude(star, loc, dawnMoment) >= 5;
  } catch {
    return false; // polar/edge conditions: no heliacal event
  }
}

export function stellarCourtState(date: Date, loc: GeoLocation): StellarCourtStatus {
  const sepSirius = moonStarSeparation(SIRIUS, date);
  const sepAlcyone = moonStarSeparation(ALCYONE, date);
  const conjSirius = sepSirius <= CONJUNCTION_ORB_DEG;
  const conjAlcyone = sepAlcyone <= CONJUNCTION_ORB_DEG;
  const heliacalSirius = heliacalRisingActive(SIRIUS, loc, date);
  const heliacalPleiades = heliacalRisingActive(ALCYONE, loc, date);

  const sirianActive = conjSirius || heliacalSirius;
  const pleiadianActive = conjAlcyone || heliacalPleiades;

  let state: StellarCourtState = 'none';
  if (sirianActive && pleiadianActive) state = 'both';
  else if (sirianActive) state = 'witness_star';
  else if (pleiadianActive) state = 'pleiades_gate';

  const weight =
    heliacalSirius || heliacalPleiades
      ? 'maximum'
      : sirianActive || pleiadianActive
        ? 'standard'
        : 'none';

  return {
    state,
    sirius: { conjunction: conjSirius, separationDeg: sepSirius, heliacalRising: heliacalSirius },
    pleiades: { conjunction: conjAlcyone, separationDeg: sepAlcyone, heliacalRising: heliacalPleiades },
    weight,
  };
}
