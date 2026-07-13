/**
 * The Texts pillar — Quran (Uthmani Arabic + Yusuf Ali 1934) and the Zabur /
 * Psalms (Van Dyck 1865 Arabic + KJV). All public domain, bundled offline so
 * the app stays deterministic and network-free, in keeping with the engine.
 *
 * The reading names an address (Juz/Hizb, Surah, Psalm:verse); these accessors
 * return the text living at that address. Verse numbering for the Psalms matches
 * the engine's KJV versification exactly — the coordinate and the text agree.
 *
 * The English Quran translation is a SWAPPABLE layer: Yusuf Ali ships here; a
 * personally-licensed translation may overlay it locally without redistribution.
 */
import surahsData from './data/quran-surahs.json';
import versesData from './data/quran-verses.json';
import divisionsData from './data/quran-divisions.json';
import psalmsData from './data/psalms.json';

export interface QuranVerse {
  s: number; // surah
  v: number; // ayah
  ar: string; // Uthmani
  en: string; // Yusuf Ali
}

export interface Surah {
  n: number;
  ar: string; // Arabic name
  en: string; // transliterated name (e.g. "Al-Faatiha")
  tr: string; // English meaning (e.g. "The Opening")
  ayahs: number;
  startGlobal: number; // 1-based index of this surah's first ayah in the flat list
}

export interface Division {
  n: number; // juz 1–30 or hizb 1–60
  startGlobal: number;
  endGlobal: number;
  startS: number; startV: number;
  endS: number; endV: number;
}

export interface PsalmVerse { v: number; ar: string; en: string }
export interface Psalm { p: number; verses: PsalmVerse[] }

const VERSES = versesData as QuranVerse[];
const SURAH_LIST = surahsData as Surah[];
const JUZ = (divisionsData as { juz: Division[]; hizb: Division[] }).juz;
const HIZB = (divisionsData as { juz: Division[]; hizb: Division[] }).hizb;
const PSALMS = psalmsData as Psalm[];

export const QURAN_SURAHS: readonly Surah[] = SURAH_LIST;
export const QURAN_JUZ: readonly Division[] = JUZ;
export const QURAN_HIZB: readonly Division[] = HIZB;
export const PSALM_COUNT = PSALMS.length; // 150

export function surahMeta(n: number): Surah | undefined {
  return SURAH_LIST[n - 1];
}

/** All ayat of a surah, in order. */
export function surahVerses(n: number): QuranVerse[] {
  const s = SURAH_LIST[n - 1];
  if (!s) return [];
  return VERSES.slice(s.startGlobal - 1, s.startGlobal - 1 + s.ayahs);
}

/** A single ayah. */
export function ayah(surah: number, verse: number): QuranVerse | undefined {
  const s = SURAH_LIST[surah - 1];
  if (!s || verse < 1 || verse > s.ayahs) return undefined;
  return VERSES[s.startGlobal - 1 + (verse - 1)];
}

/** The ayat of a Juz (1–30) with its bounds. */
export function juz(n: number): { division: Division; verses: QuranVerse[] } | undefined {
  const d = JUZ[n - 1];
  if (!d) return undefined;
  return { division: d, verses: VERSES.slice(d.startGlobal - 1, d.endGlobal) };
}

/** The ayat of a Hizb (1–60) with its bounds. */
export function hizb(n: number): { division: Division; verses: QuranVerse[] } | undefined {
  const d = HIZB[n - 1];
  if (!d) return undefined;
  return { division: d, verses: VERSES.slice(d.startGlobal - 1, d.endGlobal) };
}

/** A whole Psalm (Arabic Van Dyck + KJV). */
export function psalm(n: number): Psalm | undefined {
  return PSALMS[n - 1];
}

/** A single Psalm verse. */
export function psalmVerse(p: number, v: number): PsalmVerse | undefined {
  return PSALMS[p - 1]?.verses.find((x) => x.v === v);
}
