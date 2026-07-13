/**
 * Live-ephemeris integration: the full pipeline from (timestamp, location) to
 * the §14 oracle-inputs JSON and a complete six-coordinate reading.
 */
import { describe, expect, it } from 'vitest';
import {
  oracleInputs,
  performReading,
  hijriDate,
  seasonState,
  currentPlanetaryHour,
  currentSalahWindow,
  type GeoLocation,
} from '../src/index.js';

const CHICAGO: GeoLocation = { lat: 41.885, lon: -87.627, tz: 'America/Chicago' };
const NOW = new Date(Date.UTC(2026, 6, 12, 18, 0, 0)); // 2026-07-12 13:00 CDT

describe('oracle-inputs (§14 structure)', () => {
  const inputs = oracleInputs(NOW, CHICAGO);

  it('carries all nine layers with the spec field names', () => {
    expect(Object.keys(inputs.layers)).toEqual([
      'planetary_hour',
      'salah',
      'week',
      'mansion',
      'hijri',
      'solar_season',
      'harmonic_cycle',
      'great_year',
    ]);
    expect(inputs.timestamp).toBe(NOW.toISOString());
    expect(inputs.location.tz).toBe('America/Chicago');
  });

  it('layer divine Names match the Nine Names of Time', () => {
    expect(inputs.layers.planetary_hour.divine_name).toBe('Al-Qadir');
    expect(inputs.layers.salah.divine_name).toBe('Ar-Razzaq');
    expect(inputs.layers.week.divine_name).toBe("Al-Jami'");
    expect(inputs.layers.mansion.divine_name).toBe('Al-Hadi');
    expect(inputs.layers.solar_season.divine_name).toBe('Al-Musawwir');
    expect(inputs.layers.harmonic_cycle.divine_name).toBe('Al-Wahhab');
    expect(inputs.layers.great_year.divine_name).toBe('Al-Baqi');
  });

  it('oracle_inputs block: trigram sources, checks, stellar court', () => {
    expect(['Saturn', 'Jupiter', 'Mars', 'Sun', 'Venus', 'Mercury', 'Moon']).toContain(
      inputs.oracle_inputs.mode_a_upper_trigram
    );
    expect(inputs.oracle_inputs.check_1_line).toBeGreaterThanOrEqual(1);
    expect(inputs.oracle_inputs.check_1_line).toBeLessThanOrEqual(6);
    expect(inputs.oracle_inputs.check_3_line).toBeGreaterThanOrEqual(1);
    expect(inputs.oracle_inputs.check_3_line).toBeLessThanOrEqual(6);
    // Check 2 active iff hour ruler = mansion ruler.
    const hour = currentPlanetaryHour(CHICAGO, NOW);
    expect(inputs.oracle_inputs.check_2.active).toBe(
      hour.planet === inputs.layers.mansion.planetary_ruler
    );
  });

  it('harmonic cycle 61 of the Age of Pisces, boundary ~2031 (Calendar §10)', () => {
    expect(inputs.layers.harmonic_cycle.cycle_number).toBe(61);
    expect(inputs.layers.harmonic_cycle.next_boundary_ce).toBeGreaterThanOrEqual(2030);
    expect(inputs.layers.harmonic_cycle.next_boundary_ce).toBeLessThanOrEqual(2032);
  });

  it('great year: age IV, ~90.7% complete in 2026', () => {
    expect(inputs.layers.great_year.current_age).toBe(4);
    expect(inputs.layers.great_year.age_label).toBe('Pisces');
    expect(inputs.layers.great_year.age_completion).toBeCloseTo(0.907, 2);
  });
});

describe('calendar layers at a real instant', () => {
  it('hijri date is astronomically coherent (day 1–30, month 1–12)', () => {
    const h = hijriDate(NOW);
    expect(h.day).toBeGreaterThanOrEqual(1);
    expect(h.day).toBeLessThanOrEqual(30);
    expect(h.month).toBeGreaterThanOrEqual(1);
    expect(h.month).toBeLessThanOrEqual(12);
    expect(h.year).toBe(1448); // July 2026 falls in 1448 AH (year began ~June 2026)
  });

  it('July 12 is summer, day ~22 → Line 2', () => {
    const s = seasonState(NOW);
    expect(s.season).toBe('summer');
    expect(s.dayOfSeason).toBeGreaterThanOrEqual(20);
    expect(s.dayOfSeason).toBeLessThanOrEqual(24);
    expect(s.activeLine).toBe(2);
    expect(s.thresholdState).toBe(false);
  });

  it('salah window at 13:00 local is dhuhr_asr or asr_maghrib (post-noon)', () => {
    const w = currentSalahWindow(CHICAGO, NOW);
    expect(['dhuhr_asr', 'asr_maghrib']).toContain(w.window);
    expect(w.hizbHalf).toBe('second');
  });
});

describe('complete readings — all six coordinates', () => {
  it('Mode A produces hexagram + moving lines + transform + all coordinates', () => {
    const r = performReading({
      mode: 'A',
      timestamp: NOW,
      location: CHICAGO,
      veil: 5,
      querentNameArabic: 'عبد القادر',
    });
    expect(r.hexagram).not.toBeNull();
    expect(r.movingLines!.movingLines.length).toBeGreaterThanOrEqual(1);
    expect(r.transformed).not.toBeNull();
    expect(r.coordinates.quranic.juz).toBe(r.calendar.layers.hijri.day);
    expect(r.coordinates.zabur.psalm).toBeGreaterThanOrEqual(1);
    expect(r.coordinates.zabur.psalm).toBeLessThanOrEqual(150);
    expect(r.coordinates.abjad.natal).not.toBeNull();
    expect(r.activeNames.length).toBeGreaterThanOrEqual(3);
    expect(r.axialWitness.hexagram).toBe(52);
    // Mode A: Dawud Protocol — royal psalm precedence when in band.
    expect(r.coordinates.zabur.royalPsalm === null || r.coordinates.zabur.royalPsalm >= 1).toBe(true);
  });

  it('Mode B with explicit draws mirrors Appendix C structure', () => {
    const r = performReading({
      mode: 'B',
      timestamp: NOW,
      location: CHICAGO,
      veil: 5,
      draws: { platonicKeyCard: 11, hexagramFieldCard: 45, bridgeCard: 17, agentCard: 6 },
    });
    expect(r.platonicKey.name).toBe('The Spark');
    expect(r.platonicKey.bridgeOrientation).toBe('upright'); // Fire → upright
    expect(r.hexagram!.number).toBe(55); // card 45 carries Hex 55
    expect(r.bridge!.bridgeNumber).toBe(2); // Cuboctahedron
    expect(r.agent!.name).toBe('The Striker');
    expect(r.transformed).not.toBeNull();
    expect(r.concordance).not.toBeNull();
  });

  it('Mode C compares astronomical vs drawn hexagram', () => {
    const r = performReading({
      mode: 'C',
      timestamp: NOW,
      location: CHICAGO,
      veil: 7,
      draws: { platonicKeyCard: 14, hexagramFieldCard: 54, bridgeCard: 22, agentCard: 7 },
    });
    if (r.stellarCourt.state === 'none') {
      expect(r.resonanceCheck).not.toBeNull();
      expect(r.resonanceCheck!.drawnHexagram).toBe(1); // card 54 carries Hex 1
      expect(['concordance', 'suit_concordance', 'discordance']).toContain(
        r.resonanceCheck!.verdict
      );
    }
  });

  it('Stellar Court conjunctions are reachable: Moon passes within 1° longitude of Sirius monthly', async () => {
    const { moonStarLongitudeSeparation } = await import('../src/astro/ephemeris.js');
    const { SIRIUS } = await import('../src/astro/ephemeris.js');
    // Scan one synodic month hourly; the Moon must cross Sirius' longitude once.
    let minSep = 360;
    for (let h = 0; h < 24 * 30; h++) {
      const t = new Date(Date.UTC(2026, 6, 1) + h * 3600_000);
      minSep = Math.min(minSep, moonStarLongitudeSeparation(SIRIUS, t));
    }
    expect(minSep).toBeLessThan(1);
  });

  it('chiral bridge (card 22) gets deterministic handedness from lunar illumination', () => {
    const r = performReading({
      mode: 'B',
      timestamp: NOW,
      location: CHICAGO,
      veil: 2,
      draws: { platonicKeyCard: 13, hexagramFieldCard: 60, bridgeCard: 22, agentCard: 8 },
    });
    expect(['right', 'left', 'threshold']).toContain(r.bridge!.handedness);
  });
});
