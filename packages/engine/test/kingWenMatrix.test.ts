/**
 * Golden Vector 4 — the 7×7 matrix vs the classical King Wen table, and the
 * threshold split. The independent check table below is encoded from the
 * canonical King Wen trigram chart, NOT from the spec matrix — so a transposition
 * error in either would surface here.
 */
import { describe, expect, it } from 'vitest';
import {
  MATRIX,
  HEXAGRAMS,
  PLEIADIAN_HEXAGRAMS,
  SIRIAN_HEXAGRAMS,
  hexagramByLines,
  hexagramByNumber,
  TRIGRAMS,
} from '../src/index.js';
import type { Lines, TrigramRuler } from '../src/index.js';

/**
 * Canonical King Wen chart. KING_WEN[lowerTrigram][upperTrigram] = number.
 * Trigram keys by Chinese name; independent of the engine's planet mapping.
 */
const KING_WEN: Record<string, Record<string, number>> = {
  qian: { qian: 1, zhen: 34, kan: 5, gen: 26, kun: 11, xun: 9, li: 14, dui: 43 },
  zhen: { qian: 25, zhen: 51, kan: 3, gen: 27, kun: 24, xun: 42, li: 21, dui: 17 },
  kan: { qian: 6, zhen: 40, kan: 29, gen: 4, kun: 7, xun: 59, li: 64, dui: 47 },
  gen: { qian: 33, zhen: 62, kan: 39, gen: 52, kun: 15, xun: 53, li: 56, dui: 31 },
  kun: { qian: 12, zhen: 16, kan: 8, gen: 23, kun: 2, xun: 20, li: 35, dui: 45 },
  xun: { qian: 44, zhen: 32, kan: 48, gen: 18, kun: 46, xun: 57, li: 50, dui: 28 },
  li: { qian: 13, zhen: 55, kan: 63, gen: 22, kun: 36, xun: 37, li: 30, dui: 49 },
  dui: { qian: 10, zhen: 54, kan: 60, gen: 41, kun: 19, xun: 61, li: 38, dui: 58 },
};

/** Planet → classical trigram name (Oracle §3). */
const PLANET_TO_TRIGRAM: Record<TrigramRuler, string> = {
  Sun: 'qian',
  Saturn: 'kun',
  Mars: 'zhen',
  Mercury: 'xun',
  Moon: 'kan',
  Jupiter: 'li',
  Venus: 'dui',
  Gen: 'gen',
};

describe('Golden Vector 4 — 7×7 matrix vs King Wen', () => {
  const planets: TrigramRuler[] = ['Saturn', 'Jupiter', 'Mars', 'Sun', 'Venus', 'Mercury', 'Moon'];

  it('all 49 core cells match the classical King Wen chart', () => {
    for (const lower of planets) {
      for (const upper of planets) {
        const expected = KING_WEN[PLANET_TO_TRIGRAM[lower]]![PLANET_TO_TRIGRAM[upper]]!;
        expect(
          MATRIX[lower][upper],
          `lower=${lower} upper=${upper}`
        ).toBe(expected);
      }
    }
  });

  it('all 15 Gen cells (14 thresholds + axial) match King Wen', () => {
    for (const p of planets) {
      expect(MATRIX['Gen'][p], `Pleiadian ${p}`).toBe(KING_WEN['gen']![PLANET_TO_TRIGRAM[p]]!);
      expect(MATRIX[p]['Gen'], `Sirian ${p}`).toBe(KING_WEN[PLANET_TO_TRIGRAM[p]]!['gen']!);
    }
    expect(MATRIX['Gen']['Gen']).toBe(52);
  });

  it('threshold split table: yang half Pleiadian (planet↑/Gen↓), yin half Sirian (Gen↑/planet↓)', () => {
    expect([...PLEIADIAN_HEXAGRAMS]).toEqual([15, 56, 62, 33, 31, 53, 39]);
    expect([...SIRIAN_HEXAGRAMS]).toEqual([23, 22, 27, 26, 41, 18, 4]);
    for (const n of PLEIADIAN_HEXAGRAMS) {
      const h = hexagramByNumber(n);
      expect(h.lower, `Hex ${n} lower`).toBe('Gen');
      expect(h.upper, `Hex ${n} upper`).not.toBe('Gen');
      expect(h.kind).toBe('pleiadian');
    }
    for (const n of SIRIAN_HEXAGRAMS) {
      const h = hexagramByNumber(n);
      expect(h.upper, `Hex ${n} upper`).toBe('Gen');
      expect(h.lower, `Hex ${n} lower`).not.toBe('Gen');
      expect(h.kind).toBe('sirian');
    }
  });

  it('line bitmaps are consistent: 64 unique patterns, round-trip by lines', () => {
    const seen = new Set<string>();
    for (const h of HEXAGRAMS.values()) {
      const key = h.lines.map((l) => (l ? '1' : '0')).join('');
      expect(seen.has(key), `duplicate line pattern for hex ${h.number}`).toBe(false);
      seen.add(key);
      expect(hexagramByLines(h.lines).number).toBe(h.number);
    }
    expect(seen.size).toBe(64);
  });

  it('trigram line structures match the classical figures', () => {
    // Qian ☰ three unbroken; Kun ☷ three broken; Zhen ☳ yang below; etc.
    expect(TRIGRAMS.Sun.lines).toEqual([true, true, true]);
    expect(TRIGRAMS.Saturn.lines).toEqual([false, false, false]);
    expect(TRIGRAMS.Mars.lines).toEqual([true, false, false]);
    expect(TRIGRAMS.Mercury.lines).toEqual([false, true, true]);
    expect(TRIGRAMS.Moon.lines).toEqual([false, true, false]);
    expect(TRIGRAMS.Jupiter.lines).toEqual([true, false, true]);
    expect(TRIGRAMS.Venus.lines).toEqual([true, true, false]);
    expect(TRIGRAMS.Gen.lines).toEqual([false, false, true]);
  });

  it('worked-reading line arithmetic: Hex 55 = ⚊⚋⚊ ⚊⚋⚋ bottom-to-top', () => {
    const h = hexagramByNumber(55);
    const expected: Lines = [true, false, true, true, false, false];
    expect(h.lines).toEqual(expected);
  });
});
