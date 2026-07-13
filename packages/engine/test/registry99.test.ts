/**
 * Golden Vector 3 — The 99 Names Registry: perfect exhaustion.
 * 64 + 13 + 5 + 3 + 9 + 5 = 99. Zero duplicates, zero omissions.
 * Normalization: Ar-/Ash-/As-/Ad-/An-/At-/Az- → Al- before comparing.
 */
import { describe, expect, it } from 'vitest';
import { allNameAssignments, normalizeName } from '../src/index.js';

describe('Golden Vector 3 — 99 Names perfect exhaustion', () => {
  const assignments = allNameAssignments();

  it('exactly 99 slots', () => {
    expect(assignments).toHaveLength(99);
  });

  it('component counts: 64 hexagrams + 13 bridges + 5 keys + 3 court + 9 layers + 5 suits', () => {
    const count = (prefix: string) =>
      assignments.filter((a) => a.component.startsWith(prefix)).length;
    expect(count('hexagram-')).toBe(64);
    expect(count('bridge-')).toBe(13);
    expect(count('key-')).toBe(5);
    expect(count('court-')).toBe(3);
    expect(count('layer-')).toBe(9);
    expect(count('suit-')).toBe(5);
  });

  it('99 distinct Names — zero duplicates after article normalization', () => {
    const normalized = assignments.map((a) => normalizeName(a.name));
    const seen = new Map<string, string>();
    for (let i = 0; i < normalized.length; i++) {
      const n = normalized[i]!;
      if (seen.has(n)) {
        throw new Error(
          `Duplicate Name "${assignments[i]!.name}" on ${assignments[i]!.component}, already on ${seen.get(n)}`
        );
      }
      seen.set(n, assignments[i]!.component);
    }
    expect(seen.size).toBe(99);
  });

  it('the ratification-required Names are present (Canon ledger)', () => {
    const names = new Set(allNameAssignments().map((a) => normalizeName(a.name)));
    for (const required of [
      'Al-Ahad',
      'As-Samad',
      'Az-Zahir',
      'Al-Batin',
      "Al-Wasi'",
      'Al-Muhyi',
      'Al-Alim',
    ]) {
      expect(names.has(normalizeName(required)), required).toBe(true);
    }
  });
});
