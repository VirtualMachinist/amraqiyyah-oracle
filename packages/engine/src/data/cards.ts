import type { Element, Planet, TrigramRuler } from '../types.js';
import { CHALDEAN_ORDER } from './trigrams.js';
import { MATRIX } from './hexagrams.js';
import {
  BRIDGE_NAMES,
  COUNCIL_NAMES,
  PLATONIC_KEY_NAMES,
  STELLAR_COURT_NAMES,
} from './names99.js';

/**
 * The 78-card deck (Oracle §5, Appendix A).
 * 78 = T(12) = T(7) + 50. Five strata. Uniform backs; split faces are two
 * regions on the front, not reversible cards.
 */

export interface StellarCourtCard {
  cardNumber: 1 | 2 | 3;
  name: string;
  identity: string;
  trigger: string;
  divineName: string;
  divineNameArabic: string;
}

export const STELLAR_COURT_CARDS: StellarCourtCard[] = [
  {
    cardNumber: 1,
    name: 'The Unmoved Axis',
    identity: 'Sgr A* / Gen ☶',
    trigger: 'Both Sirian AND Pleiadian conditions active simultaneously',
    divineName: STELLAR_COURT_NAMES['The Unmoved Axis']![0],
    divineNameArabic: STELLAR_COURT_NAMES['The Unmoved Axis']![1],
  },
  {
    cardNumber: 2,
    name: 'The Witness Star',
    identity: "Sirius / Al-Shi'ra",
    trigger: 'Sirius heliacal rising OR Moon within 1° of Sirius',
    divineName: STELLAR_COURT_NAMES['The Witness Star']![0],
    divineNameArabic: STELLAR_COURT_NAMES['The Witness Star']![1],
  },
  {
    cardNumber: 3,
    name: 'The Pleiades Gate',
    identity: 'Pleiades / Al-Thurayya',
    trigger: 'Pleiades heliacal rising OR Moon within 1° of Alcyone',
    divineName: STELLAR_COURT_NAMES['The Pleiades Gate']![0],
    divineNameArabic: STELLAR_COURT_NAMES['The Pleiades Gate']![1],
  },
];

export interface CouncilCard {
  cardNumber: number; // 4–10
  name: string;
  planet: Planet;
  divineName: string;
  /** Yang half (Pleiadian): planet upper / Gen lower. */
  yangHexagram: number;
  /** Yin half (Sirian): Gen upper / planet lower. */
  yinHexagram: number;
}

const COUNCIL_TITLES: Record<Planet, string> = {
  Saturn: 'The Architect',
  Jupiter: 'The Illuminator',
  Mars: 'The Striker',
  Sun: 'The Sovereign',
  Venus: 'The Harmonist',
  Mercury: 'The Messenger',
  Moon: 'The Keeper',
};

export const COUNCIL_CARDS: CouncilCard[] = CHALDEAN_ORDER.map((planet, i) => ({
  cardNumber: 4 + i,
  name: COUNCIL_TITLES[planet],
  planet,
  divineName: COUNCIL_NAMES[planet][0],
  yangHexagram: MATRIX['Gen'][planet], // planet upper / Gen lower — Pleiadian
  yinHexagram: MATRIX[planet]['Gen'], // Gen upper / planet lower — Sirian
}));

export type BridgeOrientation = 'upright' | 'inverted' | 'sideways';

export interface PlatonicKeyCard {
  cardNumber: number; // 11–15
  name: string;
  solid: string;
  faces: number;
  element: Element;
  register: 'Jalal' | 'Jamal' | 'Kamal';
  zaburBook: number;
  bridgeOrientation: BridgeOrientation;
  divineName: string;
}

export const PLATONIC_KEY_CARDS: PlatonicKeyCard[] = [
  { cardNumber: 11, name: 'The Spark', solid: 'Tetrahedron', faces: 4, element: 'Fire', register: 'Jalal', zaburBook: 1, bridgeOrientation: 'upright', divineName: PLATONIC_KEY_NAMES['The Spark']![0] },
  { cardNumber: 12, name: 'The Foundation', solid: 'Cube', faces: 6, element: 'Earth', register: 'Jalal', zaburBook: 3, bridgeOrientation: 'inverted', divineName: PLATONIC_KEY_NAMES['The Foundation']![0] },
  { cardNumber: 13, name: 'The Bridge', solid: 'Octahedron', faces: 8, element: 'Air', register: 'Jamal', zaburBook: 5, bridgeOrientation: 'upright', divineName: PLATONIC_KEY_NAMES['The Bridge']![0] },
  { cardNumber: 14, name: 'The Cosmos', solid: 'Dodecahedron', faces: 12, element: 'Ether', register: 'Kamal', zaburBook: 4, bridgeOrientation: 'sideways', divineName: PLATONIC_KEY_NAMES['The Cosmos']![0] },
  { cardNumber: 15, name: 'The Current', solid: 'Icosahedron', faces: 20, element: 'Water', register: 'Jamal', zaburBook: 2, bridgeOrientation: 'inverted', divineName: PLATONIC_KEY_NAMES['The Current']![0] },
];

export interface BridgeCard {
  cardNumber: number; // 16–28
  bridgeNumber: number; // 1–13
  yangFace: string; // Archimedean solid
  yinFace: string; // Catalan dual
  character: string;
  chiral: boolean;
  divineName: string;
}

const BRIDGE_SOLIDS: Array<[string, string, string, boolean]> = [
  ['Truncated Tetrahedron', 'Triakis Tetrahedron', 'First emergence — pure form beginning to complexify', false],
  ['Cuboctahedron', 'Rhombic Dodecahedron', 'Perfect equilibrium — vector equilibrium, zero point', false],
  ['Truncated Cube', 'Triakis Octahedron', 'Structure refined — cutting away excess', false],
  ['Truncated Octahedron', 'Tetrakis Hexahedron', 'Expansion bounded — open form finding walls', false],
  ['Rhombicuboctahedron', 'Deltoidal Icositetrahedron', 'Practical compound — many faces working together', false],
  ['Truncated Cuboctahedron', 'Disdyakis Dodecahedron', 'Maximum cubic complexity — all face types integrated', false],
  ['Snub Cube', 'Pentagonal Icositetrahedron', 'Mirror paths — two valid routes; handedness decides', true],
  ['Icosidodecahedron', 'Rhombic Triacontahedron', 'Cosmic-emotional threshold — universal meets personal', false],
  ['Truncated Dodecahedron', 'Triakis Icosahedron', 'Cosmic rendered accessible — pentagons opening', false],
  ['Truncated Icosahedron', 'Pentakis Dodecahedron', 'Familiar deep pattern — the fullerene made visible', false],
  ['Rhombicosidodecahedron', 'Deltoidal Hexecontahedron', 'Maximum compound short of totality — 62 faces, 2 in reserve', false],
  ['Truncated Icosidodecahedron', 'Disdyakis Triacontahedron', 'Maximum complexity — all face types present', false],
  ['Snub Dodecahedron', 'Pentagonal Hexecontahedron', 'Mirror paths at cosmic scale — highest-stakes handedness', true],
];

export const BRIDGE_CARDS: BridgeCard[] = BRIDGE_SOLIDS.map((row, i) => ({
  cardNumber: 16 + i,
  bridgeNumber: i + 1,
  yangFace: row[0],
  yinFace: row[1],
  character: row[2],
  chiral: row[3],
  divineName: BRIDGE_NAMES[i]![0],
}));

export interface FieldCard {
  cardNumber: number; // 29–78
  hexagram: number;
  drawable: boolean; // Card 29 (Hex 52) is never drawn
}

/**
 * The Hexagram Field roster (Appendix A ordering rule): suits proceed
 * Earth → Fire → Ether → Air → Water; within each suit, upper trigrams in
 * Chaldean order, then lower trigrams in Chaldean order. Card 29 = Hex 52.
 */
export const FIELD_CARDS: FieldCard[] = (() => {
  const cards: FieldCard[] = [{ cardNumber: 29, hexagram: 52, drawable: false }];
  const upperSequence: TrigramRuler[] = ['Saturn', 'Jupiter', 'Mars', 'Sun', 'Mercury', 'Venus', 'Moon']
    // Suit order Earth(Saturn) → Fire(Jupiter, Mars) → Ether(Sun) → Air(Mercury) → Water(Venus, Moon)
    ;
  let n = 30;
  for (const upper of upperSequence) {
    for (const lower of CHALDEAN_ORDER) {
      cards.push({ cardNumber: n++, hexagram: MATRIX[lower][upper], drawable: true });
    }
  }
  return cards;
})();

/** The 49 drawable field cards (Hex 52 excluded — hard constraint #3). */
export const DRAWABLE_FIELD_CARDS: FieldCard[] = FIELD_CARDS.filter((c) => c.drawable);
