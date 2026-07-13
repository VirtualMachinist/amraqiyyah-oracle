import { describe, it, expect } from 'vitest';
import { Body, Equator, Horizon, MakeTime, Observer } from 'astronomy-engine';
import { natalChart, eclipticHorizontal, AGOSS_SIGNS } from '../src/oracle/natal.js';
import { sunTropicalLongitude } from '../src/astro/ephemeris.js';
import { MANSION_WIDTH_DEG } from '../src/data/mansions.js';

const loc = { lat: 41.8781, lon: -87.6298, tz: 'America/Chicago' };
const birth = new Date('1990-06-15T14:30:00Z');

function azDiff(a: number, b: number): number {
  let d = Math.abs(a - b) % 360;
  if (d > 180) d = 360 - d;
  return d;
}

describe('natal — horizon geometry validated against a real ephemeris', () => {
  it('eclipticHorizontal matches astronomy-engine for the Sun (on the ecliptic)', () => {
    const sunLon = sunTropicalLongitude(birth);
    const mine = eclipticHorizontal(sunLon, birth, loc);

    const t = MakeTime(birth);
    const obs = new Observer(loc.lat, loc.lon, 0);
    const eq = Equator(Body.Sun, t, obs, true, true);
    const hor = Horizon(t, obs, eq.ra, eq.dec, null); // no refraction — geometric

    expect(Math.abs(mine.alt - hor.altitude)).toBeLessThan(0.5);
    expect(azDiff(mine.az, hor.azimuth)).toBeLessThan(0.5);
  });

  it('Ascendant is on the eastern horizon; Descendant exactly opposite on the west', () => {
    const chart = natalChart(birth, loc);
    const asc = chart.ascendant.tropicalLon;

    const hAsc = eclipticHorizontal(asc, birth, loc);
    expect(Math.abs(hAsc.alt)).toBeLessThan(0.2); // on the horizon
    expect(hAsc.az).toBeGreaterThan(0);
    expect(hAsc.az).toBeLessThan(180); // eastern

    const hDesc = eclipticHorizontal((asc + 180) % 360, birth, loc);
    expect(Math.abs(hDesc.alt)).toBeLessThan(0.2); // antipode also on the horizon
    expect(hDesc.az).toBeGreaterThan(180); // western
  });
});

describe('natal — chart structure', () => {
  const chart = natalChart(birth, loc, 'محمد');

  it('has seven Chaldean placements with valid AGOSS mansions and houses', () => {
    expect(chart.placements).toHaveLength(7);
    for (const p of chart.placements) {
      expect(p.mansion.number).toBeGreaterThanOrEqual(1);
      expect(p.mansion.number).toBeLessThanOrEqual(28);
      expect(p.house).toBeGreaterThanOrEqual(1);
      expect(p.house).toBeLessThanOrEqual(12);
      expect(AGOSS_SIGNS as readonly string[]).toContain(p.sign);
      expect(p.degreeInMansion).toBeGreaterThanOrEqual(0);
      expect(p.degreeInMansion).toBeLessThan(MANSION_WIDTH_DEG + 1e-6);
    }
  });

  it('derives a valid Mode-A natal hexagram', () => {
    expect(chart.natalHexagram.number).toBeGreaterThanOrEqual(1);
    expect(chart.natalHexagram.number).toBeLessThanOrEqual(64);
    // upper trigram (sky) is the birth Moon-mansion ruler
    expect(chart.natalHexagram.upper).toBe(chart.substrate.oracle_inputs.mode_a_upper_trigram);
  });

  it('includes the name-based natal mansion when a name is given', () => {
    expect(chart.nameMansion).not.toBeNull();
    expect(chart.nameMansion!.mansionNumber).toBeGreaterThanOrEqual(1);
    expect(chart.nameMansion!.mansionNumber).toBeLessThanOrEqual(28);
  });

  it('is deterministic', () => {
    const again = natalChart(birth, loc, 'محمد');
    expect(again.ascendant.agossLon).toBeCloseTo(chart.ascendant.agossLon, 6);
    expect(again.natalHexagram.number).toBe(chart.natalHexagram.number);
  });
});
