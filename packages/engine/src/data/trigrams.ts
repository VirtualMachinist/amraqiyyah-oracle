import type { Element, Planet, Register, Suit, TrigramRuler } from '../types.js';

/**
 * The eight trigrams (Oracle §3). Seven map to the Chaldean planets;
 * Gen (Mountain, Keeping Still) is anchored to Sagittarius A*.
 * Line arrays are bottom-to-top; true = yang (unbroken).
 */
export interface TrigramInfo {
  ruler: TrigramRuler;
  symbol: string;
  chineseName: string;
  englishName: string;
  lines: [boolean, boolean, boolean];
  /** Element carried when this trigram is the UPPER trigram (suit assignment). Gen has none. */
  element: Element | null;
}

export const TRIGRAMS: Record<TrigramRuler, TrigramInfo> = {
  Sun: {
    ruler: 'Sun',
    symbol: '☰',
    chineseName: 'Qian',
    englishName: 'Heaven',
    lines: [true, true, true],
    element: 'Ether',
  },
  Saturn: {
    ruler: 'Saturn',
    symbol: '☷',
    chineseName: 'Kun',
    englishName: 'Earth',
    lines: [false, false, false],
    element: 'Earth',
  },
  Mars: {
    ruler: 'Mars',
    symbol: '☳',
    chineseName: 'Zhen',
    englishName: 'Thunder',
    lines: [true, false, false],
    element: 'Fire',
  },
  Mercury: {
    ruler: 'Mercury',
    symbol: '☴',
    chineseName: 'Xun',
    englishName: 'Wind',
    lines: [false, true, true],
    element: 'Air',
  },
  Moon: {
    ruler: 'Moon',
    symbol: '☵',
    chineseName: 'Kan',
    englishName: 'Water',
    lines: [false, true, false],
    element: 'Water',
  },
  Jupiter: {
    ruler: 'Jupiter',
    symbol: '☲',
    chineseName: 'Li',
    englishName: 'Fire',
    lines: [true, false, true],
    element: 'Fire',
  },
  Venus: {
    ruler: 'Venus',
    symbol: '☱',
    chineseName: 'Dui',
    englishName: 'Lake',
    lines: [true, true, false],
    element: 'Water',
  },
  Gen: {
    ruler: 'Gen',
    symbol: '☶',
    chineseName: 'Gen',
    englishName: 'Mountain',
    lines: [false, false, true],
    element: null,
  },
};

/** Chaldean descent order — governs planetary hours and mansion rulership (4 per planet). */
export const CHALDEAN_ORDER: Planet[] = [
  'Saturn',
  'Jupiter',
  'Mars',
  'Sun',
  'Venus',
  'Mercury',
  'Moon',
];

/** Suit (by UPPER trigram — hard constraint #7) → Jalal/Jamal/Kamal register. */
export const SUIT_REGISTER: Record<Exclude<Suit, 'Axial'>, Register> = {
  Fire: 'Jalal',
  Earth: 'Jalal',
  Air: 'Jamal',
  Water: 'Jamal',
  Ether: 'Kamal',
};

/** Element adjacency for the Step 8 concordance check (Oracle §9.3). */
export function elementConcordance(
  a: Element,
  b: Element
): 'concordance' | 'partial' | 'discordance' {
  if (a === b) return 'concordance';
  if (a === 'Ether' || b === 'Ether') return 'partial'; // Ether adjacent to all
  const jalal: Element[] = ['Fire', 'Earth'];
  const jamal: Element[] = ['Water', 'Air'];
  const sameRegister =
    (jalal.includes(a) && jalal.includes(b)) ||
    (jamal.includes(a) && jamal.includes(b));
  return sameRegister ? 'partial' : 'discordance';
}
