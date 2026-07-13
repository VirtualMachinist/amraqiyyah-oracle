/**
 * The composed Calendar state — the §14 API structure the Oracle consumes.
 * All nine layers + oracle inputs, deterministic from (timestamp, location).
 */
import type { GeoLocation } from '../types.js';
import { TEMPORAL_LAYER_NAMES } from '../data/names99.js';
import { WEEK } from '../data/calendarData.js';
import { currentPlanetaryHour, weekdayInTz } from './planetaryHours.js';
import { currentSalahWindow, DEFAULT_METHOD, type SalahMethod } from './salah.js';
import { hijriDate } from './hijri.js';
import { seasonState } from './seasons.js';
import { harmonicState } from './harmonic.js';
import { currentMansion, greatYearPosition } from '../astro/agoss.js';
import { abjadLine } from '../data/mansions.js';
import { stellarCourtState } from '../oracle/stellarCourt.js';

export interface OracleInputs {
  timestamp: string;
  location: { lat: number; lon: number; tz: string };
  amraqiyyah_date: string;
  layers: {
    planetary_hour: {
      planet: string;
      hour_number: number;
      is_day: boolean;
      divine_name: string;
    };
    salah: {
      current_window: string;
      hexagram_line: number;
      hizb_half: 'first' | 'second';
      divine_name: string;
    };
    week: {
      day: string;
      planetary_lord: string;
      standing_line: number | null;
      is_sabt: boolean;
      sabt_axial_resonance: boolean;
      divine_name: string;
    };
    mansion: {
      number: number;
      name_ar: string;
      letter: string;
      abjad_value: number;
      planetary_ruler: string;
      standing_line: number;
      divine_name: string;
    };
    hijri: {
      day: number;
      month: number;
      month_name: string;
      year: number;
      is_sacred_month: boolean;
    };
    solar_season: {
      current: string;
      day_of_season: number;
      active_line: number;
      threshold_state: boolean;
      divine_name: string;
    };
    harmonic_cycle: {
      cycle_number: number;
      epoch: string;
      year_in_cycle: number;
      next_boundary_ce: number;
      divine_name: string;
    };
    great_year: {
      vernal_equinox_agoss: number;
      current_age: number;
      age_label: string;
      age_year: number;
      age_completion: number;
      age_exits_ce: number;
      next_age: string;
      conjunction_return_ce: number;
      divine_name: string;
    };
  };
  oracle_inputs: {
    mode_a_upper_trigram: string;
    mode_a_lower_trigram: string;
    check_1_line: number;
    check_2: { active: boolean; line: number | null };
    check_3_line: number;
    stellar_court: string;
  };
}

export function oracleInputs(
  date: Date,
  loc: GeoLocation,
  method: SalahMethod = DEFAULT_METHOD
): OracleInputs {
  const hour = currentPlanetaryHour(loc, date);
  const salah = currentSalahWindow(loc, date, method);
  const hijri = hijriDate(date);
  const season = seasonState(date);
  const harmonic = harmonicState(date);
  const { mansion } = currentMansion(date);
  const great = greatYearPosition(date);
  const weekInfo = WEEK[weekdayInTz(date, loc.tz)]!;
  const court = stellarCourtState(date, loc);

  const check2Active = hour.planet === mansion.ruler;

  return {
    timestamp: date.toISOString(),
    location: { lat: loc.lat, lon: loc.lon, tz: loc.tz },
    amraqiyyah_date: `${hijri.day} ${hijri.monthName} ${hijri.year} / ${formatCe(date, loc.tz)}`,
    layers: {
      planetary_hour: {
        planet: hour.planet,
        hour_number: hour.hourNumber,
        is_day: hour.isDay,
        divine_name: TEMPORAL_LAYER_NAMES[1][0],
      },
      salah: {
        current_window: salah.window,
        hexagram_line: salah.line,
        hizb_half: salah.hizbHalf,
        divine_name: TEMPORAL_LAYER_NAMES[2][0],
      },
      week: {
        day: weekInfo.day,
        planetary_lord: weekInfo.lord,
        standing_line: weekInfo.standingLine,
        is_sabt: weekInfo.day === 'al-Sabt',
        sabt_axial_resonance: weekInfo.day === 'al-Sabt',
        divine_name: TEMPORAL_LAYER_NAMES[3][0],
      },
      mansion: {
        number: mansion.number,
        name_ar: mansion.nameAr,
        letter: `${mansion.letter} ${mansion.letterName}`,
        abjad_value: mansion.abjad,
        planetary_ruler: mansion.ruler,
        standing_line: abjadLine(mansion.abjad),
        divine_name: TEMPORAL_LAYER_NAMES[4][0],
      },
      hijri: {
        day: hijri.day,
        month: hijri.month,
        month_name: hijri.monthName,
        year: hijri.year,
        is_sacred_month: hijri.isSacredMonth,
      },
      solar_season: {
        current: season.season,
        day_of_season: season.dayOfSeason,
        active_line: season.activeLine,
        threshold_state: season.thresholdState,
        divine_name: TEMPORAL_LAYER_NAMES[6][0],
      },
      harmonic_cycle: {
        cycle_number: harmonic.cycleNumber,
        epoch: harmonic.epoch,
        year_in_cycle: harmonic.yearInCycle,
        next_boundary_ce: harmonic.nextBoundaryCe,
        divine_name: TEMPORAL_LAYER_NAMES[8][0],
      },
      great_year: {
        vernal_equinox_agoss: Number(great.vernalEquinoxAgoss.toFixed(2)),
        current_age: great.age.index,
        age_label: great.age.label,
        age_year: great.ageYear,
        age_completion: Number(great.ageCompletion.toFixed(3)),
        age_exits_ce: great.ageExitsCe,
        next_age: `${great.nextAge.numeral} — ${great.nextAge.label}`,
        conjunction_return_ce: great.conjunctionReturnCe,
        divine_name: TEMPORAL_LAYER_NAMES[9][0],
      },
    },
    oracle_inputs: {
      mode_a_upper_trigram: mansion.ruler,
      mode_a_lower_trigram: hour.planet,
      check_1_line: hijri.lunarDayLine,
      check_2: {
        active: check2Active,
        line: check2Active ? salah.line : null,
      },
      check_3_line: season.activeLine,
      stellar_court: court.state,
    },
  };
}

function formatCe(date: Date, tz: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: tz,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
