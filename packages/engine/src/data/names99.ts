import type { Element, Planet, Veil } from '../types.js';
import { HEXAGRAM_DIVINE_NAMES } from './hexagrams.js';

/**
 * The 99 Names Registry v1.0 — perfect exhaustion:
 * 64 hexagrams + 13 Bridges + 5 Keys + 3 Court + 9 Layers + 5 Suits = 99,
 * every Name used exactly once (verified by the registry exhaustion test).
 */

export const STELLAR_COURT_NAMES: Record<string, [string, string, string]> = {
  'The Unmoved Axis': ['Al-Ahad', 'الأحد', 'The Unique One'],
  'The Witness Star': ['Ash-Shahid', 'الشهيد', 'The All-Observing Witness'],
  'The Pleiades Gate': ['Al-Fattah', 'الفتاح', 'The Opener, The Revealer'],
};

export const PLATONIC_KEY_NAMES: Record<string, [string, string, string]> = {
  'The Spark': ["Al-Mubdi'", 'المبدئ', 'The Originator'],
  'The Foundation': ['Al-Qayyum', 'القيوم', 'The Self-Sustaining Maintainer'],
  'The Bridge': ['Al-Alim', 'العليم', 'The All-Knowing'],
  'The Cosmos': ["Al-Wasi'", 'الواسع', 'The All-Encompassing'],
  'The Current': ['Al-Muhyi', 'المحيي', 'The Giver of Life'],
};

export const SUIT_NAMES: Record<Element, [string, string, string]> = {
  Fire: ['Al-Aziz', 'العزيز', 'The All-Mighty'],
  Earth: ['Al-Matin', 'المتين', 'The Firm, The Steadfast'],
  Air: ['Ar-Rahman', 'الرحمن', 'The Most Merciful'],
  Ether: ['Al-Quddus', 'القدوس', 'The Absolutely Pure, The Holy'],
  Water: ['Ar-Rahim', 'الرحيم', 'The Most Compassionate'],
};

export const TEMPORAL_LAYER_NAMES: Record<Veil, [string, string, string]> = {
  1: ['Al-Qadir', 'القادر', 'The All-Powerful'],
  2: ['Ar-Razzaq', 'الرزاق', 'The Provider'],
  3: ["Al-Jami'", 'الجامع', 'The Gatherer'],
  4: ['Al-Hadi', 'الهادي', 'The Guide'],
  5: ['At-Tawwab', 'التواب', 'The Ever-Returning'],
  6: ['Al-Musawwir', 'المصور', 'The Fashioner of Forms'],
  7: ['Al-Malik', 'الملك', 'The King'],
  8: ['Al-Wahhab', 'الوهاب', 'The Bestower'],
  9: ['Al-Baqi', 'الباقي', 'The Everlasting'],
};

/** Planetary Council card Names (these govern the card as Agent; threshold hexagrams carry their own Names). */
export const COUNCIL_NAMES: Record<Planet, [string, string, string]> = {
  Saturn: ['As-Sabur', 'الصبور', 'The Patient'],
  Jupiter: ['Al-Karim', 'الكريم', 'The Generous'],
  Mars: ['Al-Qawi', 'القوي', 'The All-Strong'],
  Sun: ['An-Nur', 'النور', 'The Light'],
  Venus: ['Al-Wadud', 'الودود', 'The Loving'],
  Mercury: ['Al-Khabir', 'الخبير', 'The Fully Aware'],
  Moon: ['Al-Latif', 'اللطيف', 'The Subtle'],
};

export const BRIDGE_NAMES: ReadonlyArray<[string, string, string]> = [
  ["Al-Badi'", 'البديع', 'The Incomparable Originator'],
  ['Al-Adl', 'العدل', 'Justice — the vector equilibrium'],
  ['Al-Muqsit', 'المقسط', 'The Equitable'],
  ['Al-Hafiz', 'الحفيظ', 'The Preserver'],
  ['Al-Wakil', 'الوكيل', 'The Trustee'],
  ['Al-Hakim', 'الحكيم', 'The Wise'],
  ['Al-Wajid', 'الواجد', 'The Finder'],
  ['Ar-Raqib', 'الرقيب', 'The Watchful'],
  ['Al-Muhaymin', 'المهيمن', 'The Overseer'],
  ['Al-Muhsi', 'المحصي', 'The Enumerator'],
  ['Al-Kabir', 'الكبير', 'The Great'],
  ['Al-Azim', 'العظيم', 'The Magnificent'],
  ['Al-Wahid', 'الواحد', 'The One'],
];

/**
 * Normalize the definite-article assimilation for exhaustion checking:
 * Ar-/Ash-/As-/Ad-/An-/At-/Az- → Al- (sun-letter assimilation is orthographic,
 * not a different Name).
 */
export function normalizeName(name: string): string {
  return name
    .replace(/^(Ar|Ash|As|Ad|An|At|Az)-/u, 'Al-')
    .replace(/[’'ʿ]/gu, "'")
    .toLowerCase();
}

/** All 99 Name assignments as a flat list of [component, name]. */
export function allNameAssignments(): Array<{ component: string; name: string }> {
  const out: Array<{ component: string; name: string }> = [];
  for (const [n, [name]] of Object.entries(HEXAGRAM_DIVINE_NAMES)) {
    out.push({ component: `hexagram-${n}`, name });
  }
  BRIDGE_NAMES.forEach(([name], i) => out.push({ component: `bridge-${i + 1}`, name }));
  for (const [card, [name]] of Object.entries(PLATONIC_KEY_NAMES)) {
    out.push({ component: `key-${card}`, name });
  }
  for (const [card, [name]] of Object.entries(STELLAR_COURT_NAMES)) {
    out.push({ component: `court-${card}`, name });
  }
  for (const [layer, [name]] of Object.entries(TEMPORAL_LAYER_NAMES)) {
    out.push({ component: `layer-${layer}`, name });
  }
  for (const [suit, [name]] of Object.entries(SUIT_NAMES)) {
    out.push({ component: `suit-${suit}`, name });
  }
  return out;
}
