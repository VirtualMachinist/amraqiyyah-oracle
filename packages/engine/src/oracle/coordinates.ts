/**
 * Coordinate Engine (Oracle §10, §11, §8.8, §7.3).
 * Six simultaneous coordinates per reading: hexagram, divine Name(s), Quranic,
 * Zabur, Abjad, temporal.
 */
import type { Element, SalahWindow } from '../types.js';
import { hizbHalfForWindow, SALAH_WINDOW_LINES } from '../data/calendarData.js';
import {
  ELEMENT_TO_BOOK,
  SABT_PSALM,
  royalPsalmInBand,
  zaburPsalm,
  zaburVerse,
} from '../data/zabur.js';
import {
  abjadElementIndex,
  abjadLine,
  abjadSum,
  mansionByNumber,
  natalMansionNumber,
} from '../data/mansions.js';

/** Quranic coordinate (Oracle §11.1): lunar day → Juz; Salah window → Hizb. */
export interface QuranicCoordinate {
  juz: number; // 1–30
  /** Hizb number 1–60 (global), plus which half of the day's Juz. */
  hizb: number;
  hizbHalf: 'first' | 'second';
  /** Muqatta'at override (threshold readings): Surah opening verse replaces Juz/Hizb. */
  muqattaatSurah: number | null;
}

export function quranicCoordinate(
  lunarDay: number,
  window: SalahWindow,
  muqattaatLetterAbjad: number | null = null
): QuranicCoordinate {
  const juz = Math.min(Math.max(lunarDay, 1), 30);
  const half = hizbHalfForWindow(window);
  const hizb = (juz - 1) * 2 + (half === 'first' ? 1 : 2);
  const muqattaatSurah =
    muqattaatLetterAbjad !== null ? ((muqattaatLetterAbjad - 1) % 114) + 1 : null;
  return { juz, hizb, hizbHalf: half, muqattaatSurah };
}

/** Zabur coordinate (Oracle §8.8): the 6×5×5 grid + verse + registers. */
export interface ZaburCoordinate {
  psalm: number;
  verse: number;
  lineRegister: number; // ℓ — Check 1 line
  dayInWindow: number; // d
  book: number; // b — from the Platonic Key element
  /** Mode A royal-psalm precedence (Dawud Protocol) — null in Mode B. */
  royalPsalm: number | null;
  /** Psalm 92 standing secondary coordinate on al-Sabt. */
  sabtPsalm: number | null;
}

export function zaburCoordinate(opts: {
  check1Line: number;
  dayInWindow: number;
  keyElement: Element;
  salahWindow: SalahWindow;
  modeA: boolean;
  isSabt: boolean;
}): ZaburCoordinate {
  const book = ELEMENT_TO_BOOK[opts.keyElement];
  const psalm = zaburPsalm(opts.check1Line, opts.dayInWindow, book);
  const salahLine = SALAH_WINDOW_LINES[opts.salahWindow];
  const verse = zaburVerse(psalm, salahLine);
  const royal = opts.modeA ? royalPsalmInBand(opts.check1Line) : null;
  return {
    psalm,
    verse,
    lineRegister: opts.check1Line,
    dayInWindow: opts.dayInWindow,
    book,
    royalPsalm: royal,
    sabtPsalm: opts.isSabt ? SABT_PSALM : null,
  };
}

/** Abjad coordinate (Oracle §7.3): standing line, question gematria, natal mansion. */
export interface AbjadCoordinate {
  mansionLetter: string;
  mansionAbjad: number;
  standingLine: number;
  question: {
    gematria: number;
    elementIndex: number; // 1–5: Fire, Earth, Air, Ether, Water
    element: Element;
  } | null;
  natal: {
    mansionNumber: number;
    ruler: string;
    letter: string;
    divineLine: number;
    /** Moon currently transiting the natal mansion — maximum personal resonance. */
    natalTransit: boolean;
  } | null;
}

const ELEMENT_ORDER: Element[] = ['Fire', 'Earth', 'Air', 'Ether', 'Water'];

export function abjadCoordinate(opts: {
  mansionNumber: number;
  currentMansionNumber: number;
  questionArabic?: string | undefined;
  querentNameArabic?: string | undefined;
}): AbjadCoordinate {
  const mansion = mansionByNumber(opts.mansionNumber);
  let question: AbjadCoordinate['question'] = null;
  if (opts.questionArabic) {
    const g = abjadSum(opts.questionArabic);
    const idx = abjadElementIndex(g);
    question = { gematria: g, elementIndex: idx, element: ELEMENT_ORDER[idx - 1]! };
  }
  let natal: AbjadCoordinate['natal'] = null;
  if (opts.querentNameArabic) {
    const sum = abjadSum(opts.querentNameArabic);
    const natalNum = natalMansionNumber(sum);
    const natalMansion = mansionByNumber(natalNum);
    natal = {
      mansionNumber: natalNum,
      ruler: natalMansion.ruler,
      letter: natalMansion.letter,
      divineLine: abjadLine(natalMansion.abjad),
      natalTransit: natalNum === opts.currentMansionNumber,
    };
  }
  return {
    mansionLetter: mansion.letter,
    mansionAbjad: mansion.abjad,
    standingLine: abjadLine(mansion.abjad),
    question,
    natal,
  };
}
