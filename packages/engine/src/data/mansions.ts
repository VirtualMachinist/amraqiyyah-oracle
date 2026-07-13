import type { Mansion, Planet } from '../types.js';
import { CHALDEAN_ORDER } from './trigrams.js';

/** Exact mansion width: 360° / 28 = 12°51'25.714…" (the spec's 12°51'26" rounded). */
export const MANSION_WIDTH_DEG = 360 / 28;

/**
 * THE ONE TABLE (Calendar §6 = Oracle Appendix B — "the two documents publish one table").
 * Abjadi letter order (hard constraint #6): the Moon's circuit is the numerical
 * ascent 1 → 1000. Rulers: 4 mansions per planet in Chaldean descent order.
 */
const RAW: Array<[string, string, string, string, number]> = [
  // [nameAr, translation, letter, letterName, abjad]
  ['Al-Sharatain', 'The Two Signs', 'أ', 'Alif', 1],
  ['Al-Butain', 'The Belly', 'ب', 'Ba', 2],
  ['Al-Thurayya', 'The Many Little Ones', 'ج', 'Jim', 3],
  ['Al-Dabaran', 'The Follower', 'د', 'Dal', 4],
  ["Al-Haq'ah", 'The White Spot', 'ه', 'Ha', 5],
  ["Al-Han'ah", 'The Brand', 'و', 'Waw', 6],
  ['Al-Dhira', 'The Forearm', 'ز', 'Zayn', 7],
  ['Al-Nathrah', 'The Gap', 'ح', 'Haa', 8],
  ['Al-Tarf', 'The Glance', 'ط', 'Tta', 9],
  ['Al-Jabhah', 'The Forehead', 'ي', 'Ya', 10],
  ['Al-Zubrah', 'The Mane', 'ك', 'Kaf', 20],
  ['Al-Sarfah', 'The Changer', 'ل', 'Lam', 30],
  ['Al-Awwa', 'The Barker', 'م', 'Mim', 40],
  ['Al-Simak', 'The Unarmed', 'ن', 'Nun', 50],
  ['Al-Ghafr', 'The Cover', 'س', 'Sin', 60],
  ['Al-Zubana', 'The Claws', 'ع', 'Ayn', 70],
  ['Al-Iklil', 'The Crown', 'ف', 'Fa', 80],
  ['Al-Qalb', 'The Heart', 'ص', 'Sad', 90],
  ['Al-Shawlah', 'The Sting', 'ق', 'Qaf', 100],
  ["Al-Na'aim", 'The Ostriches', 'ر', 'Ra', 200],
  ['Al-Baldah', 'The City', 'ش', 'Shin', 300],
  ["Sa'd al-Dhabih", 'Luck of the Slaughterer', 'ت', 'Ta', 400],
  ["Sa'd Bula", 'Luck of the Swallower', 'ث', 'Tha', 500],
  ["Sa'd al-Su'ud", 'Luckiest of the Lucky', 'خ', 'Kha', 600],
  ["Sa'd al-Akhbiyah", 'Luck of the Tents', 'ذ', 'Dhal', 700],
  ['Al-Fargh al-Awwal', 'The First Spout', 'ض', 'Dad', 800],
  ['Al-Fargh al-Thani', 'The Second Spout', 'ظ', 'Dha', 900],
  ['Batn al-Hut', 'The Belly of the Fish', 'غ', 'Ghayn', 1000],
];

export const MANSIONS: readonly Mansion[] = RAW.map((row, i) => {
  const ruler = CHALDEAN_ORDER[Math.floor(i / 4)] as Planet;
  return {
    number: i + 1,
    nameAr: row[0],
    translation: row[1],
    agossStartDeg: i * MANSION_WIDTH_DEG,
    letter: row[2],
    letterName: row[3],
    abjad: row[4],
    ruler,
  };
});

export function mansionByNumber(n: number): Mansion {
  const m = MANSIONS[n - 1];
  if (!m) throw new Error(`No mansion ${n}`);
  return m;
}

/** Mansion from an AGOSS longitude in degrees. */
export function mansionFromAgoss(agossDeg: number): Mansion {
  const norm = ((agossDeg % 360) + 360) % 360;
  const idx = Math.floor(norm / MANSION_WIDTH_DEG);
  return mansionByNumber(Math.min(idx + 1, 28));
}

/** Standing Abjad resonance line: ((value − 1) mod 6) + 1 (Oracle §7.3 App 1). */
export function abjadLine(value: number): number {
  return ((value - 1) % 6) + 1;
}

/** Question gematria → element index 1–5 (Fire, Earth, Air, Ether, Water). */
export function abjadElementIndex(sum: number): number {
  return ((sum - 1) % 5) + 1;
}

/** Natal mansion: ((name Abjad sum − 1) mod 28) + 1 (Oracle §7.4). */
export function natalMansionNumber(nameAbjadSum: number): number {
  return ((nameAbjadSum - 1) % 28) + 1;
}

/** Abjad values of the 28 Arabic letters (Hisab al-Jummal), keyed by letter. */
export const ABJAD_VALUES: Record<string, number> = Object.fromEntries(
  RAW.map((r) => [r[2], r[4]])
);

/** Abjad sum of an Arabic string (ignores non-Abjad characters, normalizes hamza/alef forms). */
export function abjadSum(arabic: string): number {
  let sum = 0;
  for (const ch of arabic) {
    const normalized = normalizeArabicChar(ch);
    const v = ABJAD_VALUES[normalized];
    if (v) sum += v;
  }
  return sum;
}

function normalizeArabicChar(ch: string): string {
  switch (ch) {
    case 'آ':
    case 'إ':
    case 'ٱ':
    case 'ا':
      return 'أ';
    case 'ة':
      return 'ه'; // ta marbuta counted as ha in classical jummal
    case 'ى':
    case 'ئ':
      return 'ي';
    case 'ؤ':
      return 'و';
    case 'ء':
      return 'أ';
    default:
      return ch;
  }
}
