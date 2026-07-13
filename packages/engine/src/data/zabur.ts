import type { Element } from '../types.js';

/**
 * The Zabur integration (Oracle §8).
 * 150 = 6 × 5 × 5: line register × day-in-window × Book — a bijection over the Psalter.
 */

export interface ZaburBook {
  book: number; // 1–5
  psalms: [number, number]; // inclusive range
  character: string;
  platonicKey: string;
  element: Element;
}

export const ZABUR_BOOKS: ZaburBook[] = [
  { book: 1, psalms: [1, 41], character: 'Creation, individual praise, foundational lament, kingship', platonicKey: 'The Spark', element: 'Fire' },
  { book: 2, psalms: [42, 72], character: 'Deliverance, exile, longing, pilgrimage beginnings', platonicKey: 'The Current', element: 'Water' },
  { book: 3, psalms: [73, 89], character: 'Community lament, historical reckoning, collapse of certainty', platonicKey: 'The Foundation', element: 'Earth' },
  { book: 4, psalms: [90, 106], character: "Divine sovereignty, cosmic timescale, Moses's prayer", platonicKey: 'The Cosmos', element: 'Ether' },
  { book: 5, psalms: [107, 150], character: 'Praise, Songs of Ascent, Hallel, the Hallelujah sequence', platonicKey: 'The Bridge', element: 'Air' },
];

/** Element → Zabur Book number (via the Platonic Key correspondence, Oracle §8.5). */
export const ELEMENT_TO_BOOK: Record<Element, number> = {
  Fire: 1,
  Water: 2,
  Earth: 3,
  Ether: 4,
  Air: 5,
};

/**
 * The Zabur coordinate (Oracle §8.8):
 * Psalm = (ℓ − 1) × 25 + (d − 1) × 5 + b
 * ℓ = Check-1 line register (1–6), d = day-in-window (1–5), b = Book (1–5).
 */
export function zaburPsalm(lineRegister: number, dayInWindow: number, book: number): number {
  if (lineRegister < 1 || lineRegister > 6) throw new Error(`line register ${lineRegister} out of range`);
  if (dayInWindow < 1 || dayInWindow > 5) throw new Error(`day-in-window ${dayInWindow} out of range`);
  if (book < 1 || book > 5) throw new Error(`book ${book} out of range`);
  return (lineRegister - 1) * 25 + (dayInWindow - 1) * 5 + book;
}

/** Royal psalms — the Dawud Protocol default register for Mode A (Oracle §8.9). */
export const ROYAL_PSALMS = [2, 18, 20, 21, 45, 72, 89, 101, 110, 132, 144] as const;

/** The 25-Psalm band of a line register (Oracle §8.2). */
export function lineBand(lineRegister: number): [number, number] {
  return [(lineRegister - 1) * 25 + 1, lineRegister * 25];
}

/**
 * Mode A royal-psalm precedence: prefer a royal psalm inside the active line's
 * 25-Psalm band; fall back to the grid psalm when none is in band.
 */
export function royalPsalmInBand(lineRegister: number): number | null {
  const [lo, hi] = lineBand(lineRegister);
  const royal = ROYAL_PSALMS.find((p) => p >= lo && p <= hi);
  return royal ?? null;
}

/** Psalm 92 — the Song for the Sabbath day: standing secondary coordinate on al-Sabt. */
export const SABT_PSALM = 92;

/** The 7 Penitential Psalms mapped to the Planetary Council (Oracle §8.6). */
export const PENITENTIAL_PSALMS: Array<{ psalm: number; planet: string; line: number }> = [
  { psalm: 6, planet: 'Saturn', line: 1 },
  { psalm: 32, planet: 'Jupiter', line: 2 },
  { psalm: 38, planet: 'Mars', line: 2 },
  { psalm: 51, planet: 'Sun', line: 3 },
  { psalm: 102, planet: 'Venus', line: 5 },
  { psalm: 130, planet: 'Mercury', line: 6 },
  { psalm: 143, planet: 'Moon', line: 6 },
];

/**
 * Verse counts of the 150 Psalms (English/KJV versification, superscriptions
 * not counted as verses). Used only for the verse-wrap modulus (Oracle §8.8:
 * "verse count wraps by modulus for short Psalms").
 */
export const PSALM_VERSE_COUNTS: readonly number[] = [
  6, 12, 8, 8, 12, 10, 17, 9, 20, 18, // 1–10
  7, 8, 6, 7, 5, 11, 15, 50, 14, 9, // 11–20
  13, 31, 6, 10, 22, 12, 14, 9, 11, 12, // 21–30
  24, 11, 22, 22, 28, 12, 40, 22, 13, 17, // 31–40
  13, 11, 5, 26, 17, 11, 9, 14, 20, 23, // 41–50
  19, 9, 6, 7, 23, 13, 11, 11, 17, 12, // 51–60
  8, 12, 11, 10, 13, 20, 7, 35, 36, 5, // 61–70
  24, 20, 28, 23, 10, 12, 20, 72, 13, 19, // 71–80
  16, 8, 18, 12, 13, 17, 7, 18, 52, 17, // 81–90
  16, 15, 5, 23, 11, 13, 12, 9, 9, 5, // 91–100
  8, 28, 22, 35, 45, 48, 43, 13, 31, 7, // 101–110
  10, 10, 9, 8, 18, 19, 2, 29, 176, 7, // 111–120
  8, 9, 4, 8, 5, 6, 5, 6, 8, 8, // 121–130
  3, 18, 3, 3, 21, 26, 9, 8, 24, 14, // 131–140
  10, 7, 12, 15, 21, 10, 20, 14, 9, 6, // 141–150
];

/** Verse within the addressed Psalm: Salah window 1–6, wrapped for short psalms. */
export function zaburVerse(psalm: number, salahLine: number): number {
  const count = PSALM_VERSE_COUNTS[psalm - 1];
  if (!count) throw new Error(`No verse count for Psalm ${psalm}`);
  return ((salahLine - 1) % count) + 1;
}
