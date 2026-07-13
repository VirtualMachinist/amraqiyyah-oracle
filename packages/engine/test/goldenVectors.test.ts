/**
 * GOLDEN TEST VECTORS (CLAUDE.md / Handoff).
 * These must always pass — they pin the engines to the ratified specifications.
 */
import { describe, expect, it } from 'vitest';
import {
  deriveMovingLines,
  hexagramByNumber,
  hexagramByTrigrams,
  transformHexagram,
  quranicCoordinate,
  zaburCoordinate,
  zaburPsalm,
  vernalPointAgoss,
  greatYearPosition,
  lunarDayLine,
  seasonDayLine,
  abjadLine,
  mansionByNumber,
} from '../src/index.js';

describe('Golden Vector 1 — Appendix C worked reading', () => {
  // The moment: lunar day 17, season day 40, Mars hour, Mansion 9 (Al-Tarf,
  // ruler Mars, letter Tta = 9), Salah window Duha. Veil 5. No Stellar Court.
  const lunarDay = 17;
  const seasonDay = 40;

  it('Check 1: lunar day 17 → Line 4', () => {
    expect(lunarDayLine(lunarDay)).toBe(4);
  });

  it('Check 2: Sevenfold Weave active (Mars hour = Mars mansion ruler), Duha → Line 3', () => {
    const mansion9 = mansionByNumber(9);
    expect(mansion9.ruler).toBe('Mars');
    const result = deriveMovingLines({
      lunarDay,
      sevenfoldActive: true, // hour ruler (Mars) === mansion 9 ruler (Mars)
      salahWindow: 'duha',
      dayOfSeason: seasonDay,
      solarThreshold: false,
    });
    const check2 = result.checks.find((c) => c.check === 2);
    expect(check2?.line).toBe(3);
  });

  it('Check 3: season day 40 → Line 3', () => {
    expect(seasonDayLine(seasonDay)).toBe(3);
  });

  it('Abjad standing resonance: Tta (9) → Line 3', () => {
    expect(abjadLine(9)).toBe(3);
  });

  it('Resonance: Sevenfold Seal (checks 2+3 converge on Line 3, lunar on Line 4)', () => {
    const result = deriveMovingLines({
      lunarDay,
      sevenfoldActive: true,
      salahWindow: 'duha',
      dayOfSeason: seasonDay,
      solarThreshold: false,
    });
    // Moving lines 3 and 4 — adjacent, the crossing is active.
    expect(result.movingLines).toEqual([3, 4]);
    expect(result.resonance).toBe('sevenfold_seal');
  });

  it('Hex 55 (Mars over Jupiter), flip lines 3+4 → Hex 24 (Return)', () => {
    const hex55 = hexagramByTrigrams('Mars', 'Jupiter');
    expect(hex55.number).toBe(55);
    expect(hex55.suit).toBe('Fire');
    const transformed = transformHexagram(hex55, [3, 4]);
    expect(transformed.number).toBe(24);
    expect(transformed.name).toBe('Return');
    expect(transformed.upper).toBe('Saturn');
    expect(transformed.lower).toBe('Mars');
  });

  it('Quranic coordinate: lunar day 17, Duha (pre-noon) → Juz 17, Hizb 33', () => {
    const q = quranicCoordinate(lunarDay, 'duha');
    expect(q.juz).toBe(17);
    expect(q.hizbHalf).toBe('first');
    expect(q.hizb).toBe(33);
  });

  it('Zabur 6×5×5 grid: ℓ=4, d=2, b=1 (The Spark) → Psalm 81, Duha → verse 3', () => {
    expect(zaburPsalm(4, 2, 1)).toBe(81);
    const z = zaburCoordinate({
      check1Line: 4,
      dayInWindow: 2, // day 17 = second day of the 16–20 window
      keyElement: 'Fire', // The Spark → Book I
      salahWindow: 'duha',
      modeA: false,
      isSabt: false,
    });
    expect(z.psalm).toBe(81);
    expect(z.verse).toBe(3); // "Blow the trumpet at the new moon…"
    expect(z.book).toBe(1);
  });
});

describe('Golden Vector 2 — 2026 great-year position', () => {
  // Handoff: vernal ≈ 92.79° AGOSS, age IV, completion 0.907, exit ~2225,
  // next III-Aquarius, Return ~8667.
  const spring2026 = new Date(Date.UTC(2026, 2, 20, 12, 0, 0)); // 2026 March equinox

  it('vernal equinox ≈ 92.79° AGOSS', () => {
    const vernal = vernalPointAgoss(spring2026);
    expect(vernal).toBeGreaterThan(92.7);
    expect(vernal).toBeLessThan(92.9);
    expect(Number(vernal.toFixed(2))).toBeCloseTo(92.79, 1);
  });

  it('Age IV (Pisces), completion ≈ 0.907, descending (retrograde)', () => {
    const g = greatYearPosition(spring2026);
    expect(g.age.index).toBe(4);
    expect(g.age.label).toBe('Pisces');
    expect(g.ageCompletion).toBeGreaterThan(0.905);
    expect(g.ageCompletion).toBeLessThan(0.909);
  });

  it('exit ~2225 CE, next age III (Aquarius), Return ~8667 CE', () => {
    const g = greatYearPosition(spring2026);
    expect(g.ageExitsCe).toBeGreaterThanOrEqual(2224);
    expect(g.ageExitsCe).toBeLessThanOrEqual(2227);
    expect(g.nextAge.index).toBe(3);
    expect(g.nextAge.label).toBe('Aquarius');
    expect(g.conjunctionReturnCe).toBeGreaterThanOrEqual(8664);
    expect(g.conjunctionReturnCe).toBeLessThanOrEqual(8671);
  });
});

describe('Golden Vector 3 — hexagram data invariants', () => {
  it('Hex 52 is Gen × Gen — the Axial Witness, As-Samad', () => {
    const h = hexagramByNumber(52);
    expect(h.upper).toBe('Gen');
    expect(h.lower).toBe('Gen');
    expect(h.kind).toBe('axial');
    expect(h.divineName).toBe('As-Samad');
  });

  it('Hex 1 is the Solar Crown — Sun × Sun, Ether, An-Nur', () => {
    const h = hexagramByNumber(1);
    expect(h.upper).toBe('Sun');
    expect(h.lower).toBe('Sun');
    expect(h.suit).toBe('Ether');
    expect(h.pureResonance).toBe(true);
    expect(h.divineName).toBe('An-Nur');
  });
});
