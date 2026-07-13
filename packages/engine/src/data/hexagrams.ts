import type {
  Hexagram,
  Lines,
  Register,
  Suit,
  TrigramRuler,
} from '../types.js';
import { SUIT_REGISTER, TRIGRAMS } from './trigrams.js';

/**
 * THE ONE MATRIX (Oracle §4.1 + §4.3 + §4.2).
 * MATRIX[lower][upper] = King Wen number.
 * Rows = lower trigram (ground / hour ruler); columns = upper trigram (sky / mansion ruler).
 * This is the single data source for all 64 hexagrams — the 49-cell core,
 * the 14 thresholds (Gen row/column), and the Axial (Gen×Gen = 52).
 */
export const MATRIX: Record<TrigramRuler, Record<TrigramRuler, number>> = {
  Saturn: { Saturn: 2, Jupiter: 35, Mars: 16, Sun: 12, Venus: 45, Mercury: 20, Moon: 8, Gen: 23 },
  Jupiter: { Saturn: 36, Jupiter: 30, Mars: 55, Sun: 13, Venus: 49, Mercury: 37, Moon: 63, Gen: 22 },
  Mars: { Saturn: 24, Jupiter: 21, Mars: 51, Sun: 25, Venus: 17, Mercury: 42, Moon: 3, Gen: 27 },
  Sun: { Saturn: 11, Jupiter: 14, Mars: 34, Sun: 1, Venus: 43, Mercury: 9, Moon: 5, Gen: 26 },
  Venus: { Saturn: 19, Jupiter: 38, Mars: 54, Sun: 10, Venus: 58, Mercury: 61, Moon: 60, Gen: 41 },
  Mercury: { Saturn: 46, Jupiter: 50, Mars: 32, Sun: 44, Venus: 28, Mercury: 57, Moon: 48, Gen: 18 },
  Moon: { Saturn: 7, Jupiter: 64, Mars: 40, Sun: 6, Venus: 47, Mercury: 59, Moon: 29, Gen: 4 },
  Gen: { Saturn: 15, Jupiter: 56, Mars: 62, Sun: 33, Venus: 31, Mercury: 53, Moon: 39, Gen: 52 },
};

/** The permanent Axial Witness — never drawn (hard constraint #3). */
export const AXIAL_HEXAGRAM = 52;

/** 7 Pleiadian thresholds: planet upper / Gen lower — sky speaks, ground silenced. */
export const PLEIADIAN_HEXAGRAMS = [15, 56, 62, 33, 31, 53, 39] as const;
/** 7 Sirian thresholds: Gen upper / planet lower — ground speaks, sky silenced. */
export const SIRIAN_HEXAGRAMS = [23, 22, 27, 26, 41, 18, 4] as const;

export const HEXAGRAM_NAMES: Record<number, string> = {
  1: 'The Creative',
  2: 'The Receptive',
  3: 'Difficulty at the Beginning',
  4: 'Youthful Folly',
  5: 'Waiting',
  6: 'Conflict',
  7: 'The Army',
  8: 'Holding Together',
  9: 'Small Taming',
  10: 'Treading',
  11: 'Peace',
  12: 'Standstill',
  13: 'Fellowship',
  14: 'Great Possession',
  15: 'Modesty',
  16: 'Enthusiasm',
  17: 'Following',
  18: 'Work on What Has Decayed',
  19: 'Approach',
  20: 'Contemplation',
  21: 'Biting Through',
  22: 'Grace',
  23: 'Splitting Apart',
  24: 'Return',
  25: 'Innocence',
  26: 'Taming Power of the Great',
  27: 'Nourishment',
  28: 'Great Preponderance',
  29: 'The Abysmal',
  30: 'The Clinging',
  31: 'Influence',
  32: 'Duration',
  33: 'Retreat',
  34: 'Great Power',
  35: 'Progress',
  36: 'Darkening of the Light',
  37: 'The Family',
  38: 'Opposition',
  39: 'Obstruction',
  40: 'Deliverance',
  41: 'Decrease',
  42: 'Increase',
  43: 'Breakthrough',
  44: 'Coming to Meet',
  45: 'Gathering Together',
  46: 'Pushing Upward',
  47: 'Oppression',
  48: 'The Well',
  49: 'Revolution',
  50: 'The Cauldron',
  51: 'The Arousing',
  52: 'The Axial Witness',
  53: 'Gradual Progress',
  54: 'The Marrying Maiden',
  55: 'Abundance',
  56: 'The Wanderer',
  57: 'The Gentle',
  58: 'The Joyous',
  59: 'Dispersion',
  60: 'Limitation',
  61: 'Inner Truth',
  62: 'Preponderance of the Small',
  63: 'After Completion',
  64: 'Before Completion',
};

/** Divine Name per hexagram — from The 99 Names Registry v1.0. [name, arabic, meaning] */
export const HEXAGRAM_DIVINE_NAMES: Record<number, [string, string, string]> = {
  // Anchors (Registry §I)
  1: ['An-Nur', 'النور', 'The Light — the Solar Crown'],
  2: ['As-Sabur', 'الصبور', 'The Patient'],
  30: ['Al-Karim', 'الكريم', 'The Generous'],
  51: ['Al-Qawi', 'القوي', 'The All-Strong'],
  58: ['Al-Wadud', 'الودود', 'The Loving'],
  57: ['Al-Khabir', 'الخبير', 'The Fully Aware'],
  29: ['Al-Latif', 'اللطيف', 'The Subtle'],
  52: ['As-Samad', 'الصمد', 'The Eternal Absolute, The Self-Sufficient'],
  // Thresholds (Registry §II) — Az-Zahir/Al-Batin pairs
  33: ['Az-Zahir', 'الظاهر', 'The Manifest'],
  26: ['Al-Batin', 'الباطن', 'The Hidden'],
  15: ['Al-Khafid', 'الخافض', 'The Abaser — the manifest lowering'],
  23: ['Al-Hasib', 'الحسيب', 'The Reckoner — the hidden reckoning'],
  56: ['Al-Basit', 'الباسط', 'The Expander — expansion declared'],
  22: ['Al-Barr', 'البر', 'The Kind — kindness working unseen'],
  62: ['Al-Muqaddim', 'المقدم', 'The Advancer — the careful advance'],
  27: ['Al-Muqit', 'المقيت', 'The Nourisher'],
  31: ['Al-Mujib', 'المجيب', 'The Responsive — the manifest response'],
  41: ['Al-Afuww', 'العفو', 'The Pardoner — the hidden release that purifies'],
  53: ['Ar-Rashid', 'الرشيد', 'The Guide to Right Procedure'],
  18: ['Al-Mu’id', 'المعيد', 'The Restorer — the hidden Restorer'],
  39: ['Al-Qabid', 'القابض', 'The Constrictor — the manifest halt'],
  4: ['Ar-Ra’uf', 'الرؤوف', 'The Tender — hidden tenderness toward the unformed'],
  // Core 42 (Registry §IV)
  36: ['Ad-Darr', 'الضار', 'The Distresser — ordained affliction'],
  24: ['Al-Ba’ith', 'الباعث', 'The Resurrector'],
  11: ['As-Salam', 'السلام', 'Peace itself'],
  19: ['Al-Waali', 'الوالي', 'The Patron drawing near'],
  46: ['Ar-Rafi’', 'الرافع', 'The Exalter'],
  7: ['Al-Jabbar', 'الجبار', 'The Compeller'],
  35: ['Al-Mu’izz', 'المعز', 'The Honorer'],
  21: ['Al-Muntaqim', 'المنتقم', 'The Avenger — the penal hexagram'],
  14: ['Al-Ghani', 'الغني', 'The Rich beyond need'],
  38: ['Al-Mani’', 'المانع', 'The Withholder'],
  50: ['Al-Bari’', 'البارئ', 'The Maker who proportions within the vessel'],
  64: ['Al-Muqtadir', 'المقتدر', 'The outcome held in power'],
  16: ['Al-Hamid', 'الحميد', 'Praise and music'],
  55: ['Al-Maajid', 'الماجد', 'The Noble-Glorious at zenith'],
  34: ['Al-Qahhar', 'القهار', 'The Subduer'],
  54: ['Al-Mudhill', 'المذل', 'The Humbler'],
  32: ['Al-Warith', 'الوارث', 'The Inheritor — what endures'],
  40: ['An-Nafi’', 'النافع', 'The rain that benefits'],
  12: ['Al-Muta’ali', 'المتعالي', 'Heaven withdrawn above'],
  13: ['Al-Mu’min', 'المؤمن', 'Security granted to the community'],
  25: ['Al-Haqq', 'الحق', 'Alignment with what is'],
  10: ['Al-Ali', 'العلي', 'Conduct beneath the Most High'],
  44: ['Al-Awwal', 'الأول', 'The First who precedes every encounter'],
  6: ['Al-Akhir', 'الآخر', 'The Last, final arbiter of disputes'],
  45: ['Malik-ul-Mulk', 'مالك الملك', 'Around whom all gathers'],
  49: ['Al-Mumit', 'المميت', 'Death of the old order'],
  17: ['Al-Wali', 'الولي', 'The Friend one follows'],
  43: ['Al-Ghafur', 'الغفور', 'The flood that washes clean'],
  28: ['Al-Halim', 'الحليم', 'Bearing the sagging beam'],
  47: ['Ash-Shakur', 'الشكور', 'Gratitude in exhaustion'],
  8: ['Al-Hayy', 'الحي', 'Union as one life'],
  63: ['Al-Basir', 'البصير', 'Vigilance when all is in place'],
  3: ['Al-Khaliq', 'الخالق', "Creation's birth-struggle"],
  5: ['As-Sami’', 'السميع', 'The waiting that is heard'],
  60: ['Al-Mu’akhkhir', 'المؤخر', 'The boundary that holds back'],
  48: ['Al-Mughni', 'المغني', 'The inexhaustible Enricher'],
  20: ['Al-Jalil', 'الجليل', 'Majesty beheld from the tower'],
  37: ['Al-Hakam', 'الحكم', 'Right order within the household'],
  42: ['Al-Majid', 'المجيد', 'Overflowing glory that gives below'],
  9: ['Al-Mutakabbir', 'المتكبر', 'The Supreme that yields only briefly to gentle restraint'],
  61: ['Dhul-Jalali-wal-Ikram', 'ذو الجلال والإكرام', 'Majesty and Generosity united at the sincere center'],
  59: ['Al-Ghaffar', 'الغفار', 'The Ever-Forgiving who scatters what hardened'],
};

function linesFor(upper: TrigramRuler, lower: TrigramRuler): Lines {
  const lo = TRIGRAMS[lower].lines;
  const up = TRIGRAMS[upper].lines;
  return [lo[0], lo[1], lo[2], up[0], up[1], up[2]];
}

function suitFor(upper: TrigramRuler, lower: TrigramRuler): Suit {
  if (upper === 'Gen' && lower === 'Gen') return 'Axial';
  if (upper === 'Gen') {
    // Sirian thresholds: suit classification follows the register of the pair's
    // manifest face; for suit purposes the spec treats thresholds by their Council
    // card, but as hexagrams they sit outside the five drawable suits.
    return 'Axial';
  }
  const element = TRIGRAMS[upper].element;
  if (!element) return 'Axial';
  return element;
}

/** All 64 hexagrams, built from THE ONE MATRIX. Keyed by King Wen number. */
export const HEXAGRAMS: ReadonlyMap<number, Hexagram> = (() => {
  const map = new Map<number, Hexagram>();
  const rulers = Object.keys(MATRIX) as TrigramRuler[];
  for (const lower of rulers) {
    for (const upper of rulers) {
      const number = MATRIX[lower][upper];
      const lines = linesFor(upper, lower);
      let kind: Hexagram['kind'] = 'core';
      if (upper === 'Gen' && lower === 'Gen') kind = 'axial';
      else if (lower === 'Gen') kind = 'pleiadian';
      else if (upper === 'Gen') kind = 'sirian';
      const suit = suitFor(upper, lower);
      const register: Register | 'Axial' =
        suit === 'Axial' ? 'Axial' : SUIT_REGISTER[suit];
      const dn = HEXAGRAM_DIVINE_NAMES[number];
      if (!dn) throw new Error(`Missing divine Name for hexagram ${number}`);
      map.set(number, {
        number,
        name: HEXAGRAM_NAMES[number] ?? `Hexagram ${number}`,
        upper,
        lower,
        lines,
        suit,
        register,
        divineName: dn[0],
        divineNameArabic: dn[1],
        divineNameMeaning: dn[2],
        kind,
        pureResonance: upper === lower && upper !== 'Gen',
      });
    }
  }
  if (map.size !== 64) throw new Error(`Matrix produced ${map.size} hexagrams, expected 64`);
  return map;
})();

export function hexagramByNumber(n: number): Hexagram {
  const h = HEXAGRAMS.get(n);
  if (!h) throw new Error(`No hexagram ${n}`);
  return h;
}

export function hexagramByTrigrams(upper: TrigramRuler, lower: TrigramRuler): Hexagram {
  return hexagramByNumber(MATRIX[lower][upper]);
}

const BY_LINES: ReadonlyMap<string, Hexagram> = (() => {
  const m = new Map<string, Hexagram>();
  for (const h of HEXAGRAMS.values()) m.set(h.lines.map((l) => (l ? '1' : '0')).join(''), h);
  return m;
})();

export function hexagramByLines(lines: Lines): Hexagram {
  const key = lines.map((l) => (l ? '1' : '0')).join('');
  const h = BY_LINES.get(key);
  if (!h) throw new Error(`No hexagram for line pattern ${key}`);
  return h;
}

/** Transformed hexagram: flip the moving lines (yang ↔ yin). */
export function transformHexagram(hex: Hexagram, movingLines: number[]): Hexagram {
  const lines = [...hex.lines] as Lines;
  for (const ln of movingLines) {
    if (ln < 1 || ln > 6) throw new Error(`Invalid line ${ln}`);
    lines[ln - 1] = !lines[ln - 1];
  }
  return hexagramByLines(lines);
}
