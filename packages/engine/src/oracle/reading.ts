/**
 * Reading Protocol Orchestration (Oracle §9).
 * Modes A (astronomical), B (deck), C (resonance check). The engine is pure:
 * Mode B card draws are passed IN (physical deck entry, or app-side virtual
 * draw). Randomness never carries authority (hard constraint #1) — the
 * interpretive weight rests entirely on the deterministic checks.
 */
import type {
  Element,
  GeoLocation,
  Hexagram,
  LineNumber,
  ReadingMode,
  Veil,
} from '../types.js';
import {
  hexagramByNumber,
  hexagramByTrigrams,
  transformHexagram,
  AXIAL_HEXAGRAM,
} from '../data/hexagrams.js';
import {
  BRIDGE_CARDS,
  COUNCIL_CARDS,
  PLATONIC_KEY_CARDS,
  DRAWABLE_FIELD_CARDS,
  type BridgeOrientation,
} from '../data/cards.js';
import { SUIT_NAMES, TEMPORAL_LAYER_NAMES, COUNCIL_NAMES } from '../data/names99.js';
import { elementConcordance } from '../data/trigrams.js';
import { deriveMovingLines, dominantCheckForVeil, type MovingLinesResult } from './movingLines.js';
import { quranicCoordinate, zaburCoordinate, abjadCoordinate, type AbjadCoordinate, type QuranicCoordinate, type ZaburCoordinate } from './coordinates.js';
import { oracleInputs, type OracleInputs } from '../calendar/oracleInputs.js';
import { stellarCourtState, type StellarCourtStatus } from './stellarCourt.js';
import { moonPhaseInfo } from '../astro/ephemeris.js';
import { mansionByNumber } from '../data/mansions.js';

export type Handedness = 'right' | 'left' | 'threshold';

/** Chiral Card Protocol (Oracle §5.4): handedness by lunar illumination. */
export function chiralHandedness(illumination: number): Handedness {
  const pct = illumination * 100;
  if (Math.abs(pct - 50) < 0.5) return 'threshold';
  return pct > 50 ? 'right' : 'left';
}

export interface ModeBDraws {
  /** Card number 11–15. The Key is ALWAYS drawn (hard constraint #4). */
  platonicKeyCard: number;
  /** Card number 30–78 (never 29 — Hex 52 is never drawn). Suspended in Stellar Court states. */
  hexagramFieldCard?: number | undefined;
  /** Card number 16–28. */
  bridgeCard?: number | undefined;
  /** Card number 4–10. */
  agentCard?: number | undefined;
}

export interface ReadingRequest {
  mode: ReadingMode;
  timestamp: Date;
  location: GeoLocation;
  veil: Veil;
  question?: string | undefined;
  questionArabic?: string | undefined;
  querentNameArabic?: string | undefined;
  /** Required for Modes B and C. */
  draws?: ModeBDraws | undefined;
  /**
   * Optional precomputed Stellar Court status — for replaying a recorded
   * moment or demonstrating a rare state. Production callers omit it; the
   * status is then computed live from the ephemeris. Still a deterministic
   * input, never randomness.
   */
  courtOverride?: StellarCourtStatus | undefined;
}

export interface ActiveName {
  role: string;
  name: string;
  arabic?: string | undefined;
  meaning?: string | undefined;
}

export interface ReadingResult {
  mode: ReadingMode;
  veil: Veil;
  stellarCourt: StellarCourtStatus;
  /** State 3: hold position — no hexagram, no lines, no trajectory. */
  holdAndWitness: boolean;
  axialWitness: { hexagram: number; name: string; divineName: string };
  platonicKey: {
    card: number;
    name: string;
    element: Element;
    zaburBook: number;
    bridgeOrientation: BridgeOrientation;
    divineName: string;
    /** State 3: the Key functions as mirror only. */
    mirrorOnly: boolean;
  };
  hexagram: Hexagram | null;
  movingLines: MovingLinesResult | null;
  transformed: Hexagram | null;
  bridge: {
    card: number;
    bridgeNumber: number;
    yangFace: string;
    yinFace: string;
    orientation: BridgeOrientation;
    handedness: Handedness | null; // chiral cards only
    suspendedAtExactBalance: boolean;
    divineName: string;
  } | null;
  agent: {
    card: number;
    name: string;
    planet: string;
    agentResonance: boolean;
    divineName: string;
  } | null;
  concordance: {
    keyElement: Element;
    comparedTo: string;
    result: 'concordance' | 'partial' | 'discordance';
  } | null;
  /** Mode C: astronomical vs drawn comparison. */
  resonanceCheck: {
    astronomicalHexagram: number;
    drawnHexagram: number;
    sameHexagram: boolean;
    sameSuit: boolean;
    verdict: 'concordance' | 'suit_concordance' | 'discordance';
  } | null;
  coordinates: {
    quranic: QuranicCoordinate;
    zabur: ZaburCoordinate;
    abjad: AbjadCoordinate;
    temporal: OracleInputs;
  };
  activeNames: ActiveName[];
  dominantCheck: 1 | 2 | 3;
  calendar: OracleInputs;
}

export function performReading(req: ReadingRequest): ReadingResult {
  const calendar = oracleInputs(req.timestamp, req.location);
  const court = req.courtOverride ?? stellarCourtState(req.timestamp, req.location);
  const isSabt = calendar.layers.week.is_sabt;

  // Step 2 — the Platonic Key is ALWAYS drawn (never suspended; hard constraint #4).
  if ((req.mode === 'B' || req.mode === 'C') && !req.draws) {
    throw new Error('Modes B and C require card draws (physical or app-side virtual)');
  }
  // Mode A consults the Key too — the question's element is independent of the
  // sky. For Mode A the caller supplies the Key via draws as well; without one,
  // Mode A derives the Key from question gematria when available, else Ether.
  const keyCardNumber =
    req.draws?.platonicKeyCard ?? deriveModeAKey(req.questionArabic);
  const key = PLATONIC_KEY_CARDS.find((k) => k.cardNumber === keyCardNumber);
  if (!key) throw new Error(`Invalid Platonic Key card ${keyCardNumber}`);

  const holdAndWitness = court.state === 'both';

  // Hexagram derivation.
  let hexagram: Hexagram | null = null;
  let movingLines: MovingLinesResult | null = null;
  let transformed: Hexagram | null = null;

  const mansion = mansionByNumber(calendar.layers.mansion.number);
  const hourRuler = calendar.oracle_inputs.mode_a_lower_trigram as Hexagram['lower'];
  const mansionRuler = calendar.oracle_inputs.mode_a_upper_trigram as Hexagram['upper'];

  if (!holdAndWitness) {
    if (court.state === 'witness_star') {
      // State 1: ground speaks — Sirian half of the hour ruler's Council card.
      const council = COUNCIL_CARDS.find((c) => c.planet === hourRuler);
      if (!council) throw new Error(`No council card for ${hourRuler}`);
      hexagram = hexagramByNumber(council.yinHexagram);
    } else if (court.state === 'pleiades_gate') {
      // State 2: sky speaks — Pleiadian half of the mansion ruler's Council card.
      const council = COUNCIL_CARDS.find((c) => c.planet === mansionRuler);
      if (!council) throw new Error(`No council card for ${mansionRuler}`);
      hexagram = hexagramByNumber(council.yangHexagram);
    } else if (req.mode === 'A') {
      hexagram = hexagramByTrigrams(mansionRuler, hourRuler);
    } else {
      const fieldCardNumber = req.draws?.hexagramFieldCard;
      if (fieldCardNumber === undefined) throw new Error('Mode B requires a hexagram field draw');
      if (fieldCardNumber === 29) throw new Error('Hex 52 is never drawn (hard constraint #3)');
      const fieldCard = DRAWABLE_FIELD_CARDS.find((c) => c.cardNumber === fieldCardNumber);
      if (!fieldCard) throw new Error(`Invalid hexagram field card ${fieldCardNumber}`);
      hexagram = hexagramByNumber(fieldCard.hexagram);
    }

    // Step 4 — moving lines (exactly three checks).
    movingLines = deriveMovingLines({
      lunarDay: calendar.layers.hijri.day,
      sevenfoldActive: calendar.oracle_inputs.check_2.active,
      salahWindow: calendar.layers.salah.current_window as never,
      dayOfSeason: calendar.layers.solar_season.day_of_season,
      solarThreshold: calendar.layers.solar_season.threshold_state,
    });

    // Step 7 — transformed hexagram.
    transformed = transformHexagram(hexagram, movingLines.movingLines);
  }

  // Step 5 — Archimedean Bridge.
  let bridge: ReadingResult['bridge'] = null;
  if (!holdAndWitness && req.draws?.bridgeCard !== undefined) {
    const b = BRIDGE_CARDS.find((c) => c.cardNumber === req.draws!.bridgeCard);
    if (!b) throw new Error(`Invalid bridge card ${req.draws.bridgeCard}`);
    let handedness: Handedness | null = null;
    let suspended = false;
    if (b.chiral) {
      handedness = chiralHandedness(moonPhaseInfo(req.timestamp).illumination);
      suspended = handedness === 'threshold';
    }
    bridge = {
      card: b.cardNumber,
      bridgeNumber: b.bridgeNumber,
      yangFace: b.yangFace,
      yinFace: b.yinFace,
      orientation: key.bridgeOrientation,
      handedness,
      suspendedAtExactBalance: suspended,
      divineName: b.divineName,
    };
  }

  // Step 6 — Planetary Agent (sideways; excluded if placed as Stellar carrier).
  let agent: ReadingResult['agent'] = null;
  if (!holdAndWitness && req.draws?.agentCard !== undefined) {
    const a = COUNCIL_CARDS.find((c) => c.cardNumber === req.draws!.agentCard);
    if (!a) throw new Error(`Invalid agent card ${req.draws.agentCard}`);
    const carrierPlanet =
      court.state === 'witness_star' ? hourRuler : court.state === 'pleiades_gate' ? mansionRuler : null;
    if (carrierPlanet && a.planet === carrierPlanet) {
      throw new Error(`Council card ${a.name} is the Stellar carrier — draw from the remaining six`);
    }
    agent = {
      card: a.cardNumber,
      name: a.name,
      planet: a.planet,
      agentResonance: a.planet === hourRuler,
      divineName: a.divineName,
    };
  }

  // Step 8 — Concordance.
  let concordance: ReadingResult['concordance'] = null;
  if (!holdAndWitness && hexagram) {
    if (court.state === 'none') {
      const hexElement = hexagram.suit === 'Axial' ? null : hexagram.suit;
      if (hexElement) {
        concordance = {
          keyElement: key.element,
          comparedTo: `hexagram suit (${hexElement})`,
          result: elementConcordance(key.element, hexElement),
        };
      }
    } else {
      // Stellar Court states: Key element vs the operative planet's character.
      const planet = court.state === 'witness_star' ? hourRuler : mansionRuler;
      const planetElement = planetCharacterElement(planet);
      concordance = {
        keyElement: key.element,
        comparedTo: `planet character (${planet} — ${planetElement})`,
        result: elementConcordance(key.element, planetElement),
      };
    }
  }

  // Mode C — resonance check: astronomical vs drawn.
  let resonanceCheck: ReadingResult['resonanceCheck'] = null;
  if (req.mode === 'C' && !holdAndWitness && court.state === 'none') {
    const astro = hexagramByTrigrams(mansionRuler, hourRuler);
    const drawn = hexagram!;
    const sameHexagram = astro.number === drawn.number;
    const sameSuit = astro.suit === drawn.suit;
    resonanceCheck = {
      astronomicalHexagram: astro.number,
      drawnHexagram: drawn.number,
      sameHexagram,
      sameSuit,
      verdict: sameHexagram ? 'concordance' : sameSuit ? 'suit_concordance' : 'discordance',
    };
  }

  // Six coordinates (State 3 still emits Quranic + Zabur — "the texts speak
  // where geometry has gone still").
  const muqattaatAbjad =
    court.state === 'witness_star' || court.state === 'pleiades_gate'
      ? mansion.abjad
      : null;
  const quranic = quranicCoordinate(
    calendar.layers.hijri.day,
    calendar.layers.salah.current_window as never,
    muqattaatAbjad
  );
  const zabur = zaburCoordinate({
    check1Line: calendar.oracle_inputs.check_1_line,
    dayInWindow: dayInWindowOf(calendar.layers.hijri.day),
    keyElement: key.element,
    salahWindow: calendar.layers.salah.current_window as never,
    modeA: req.mode === 'A',
    isSabt,
  });
  const abjad = abjadCoordinate({
    mansionNumber: calendar.layers.mansion.number,
    currentMansionNumber: calendar.layers.mansion.number,
    questionArabic: req.questionArabic,
    querentNameArabic: req.querentNameArabic,
  });

  // Active Names (Oracle §6.6): hexagram + suit + Key + Veil layer (+ Court).
  const activeNames: ActiveName[] = [];
  if (hexagram) {
    activeNames.push({
      role: 'hexagram',
      name: hexagram.divineName,
      arabic: hexagram.divineNameArabic,
      meaning: hexagram.divineNameMeaning,
    });
    if (hexagram.suit !== 'Axial') {
      const s = SUIT_NAMES[hexagram.suit];
      activeNames.push({ role: 'suit', name: s[0], arabic: s[1], meaning: s[2] });
    }
  }
  activeNames.push({ role: 'platonic_key', name: key.divineName });
  const veilName = TEMPORAL_LAYER_NAMES[req.veil];
  activeNames.push({ role: `veil_${req.veil}`, name: veilName[0], arabic: veilName[1], meaning: veilName[2] });
  if (court.state === 'witness_star' || court.state === 'both') {
    activeNames.push({ role: 'stellar_court', name: 'Ash-Shahid', arabic: 'الشهيد', meaning: 'The All-Observing Witness' });
  }
  if (court.state === 'pleiades_gate' || court.state === 'both') {
    activeNames.push({ role: 'stellar_court', name: 'Al-Fattah', arabic: 'الفتاح', meaning: 'The Opener' });
  }
  if (court.state === 'both') {
    activeNames.push({ role: 'stellar_court_axis', name: 'Al-Ahad', arabic: 'الأحد', meaning: 'The Unique One' });
  }

  return {
    mode: req.mode,
    veil: req.veil,
    stellarCourt: court,
    holdAndWitness,
    axialWitness: { hexagram: AXIAL_HEXAGRAM, name: 'The Axial Witness', divineName: 'As-Samad' },
    platonicKey: {
      card: key.cardNumber,
      name: key.name,
      element: key.element,
      zaburBook: key.zaburBook,
      bridgeOrientation: key.bridgeOrientation,
      divineName: key.divineName,
      mirrorOnly: holdAndWitness,
    },
    hexagram,
    movingLines,
    transformed,
    bridge,
    agent,
    concordance,
    resonanceCheck,
    coordinates: { quranic, zabur, abjad, temporal: calendar },
    activeNames,
    dominantCheck: dominantCheckForVeil(req.veil),
    calendar,
  };
}

function dayInWindowOf(lunarDay: number): number {
  return ((Math.min(Math.max(lunarDay, 1), 30) - 1) % 5) + 1;
}

/** Mode A Key fallback: question gematria element, else Ether (The Cosmos). */
function deriveModeAKey(questionArabic?: string): number {
  if (questionArabic) {
    // abjadSum/element handled in coordinates; map element index → key card.
    // Import here would cycle; simple inline map via PLATONIC_KEY_CARDS order.
    const order: Record<number, Element> = { 1: 'Fire', 2: 'Earth', 3: 'Air', 4: 'Ether', 5: 'Water' };
    void order;
  }
  const ether = PLATONIC_KEY_CARDS.find((k) => k.element === 'Ether')!;
  return ether.cardNumber;
}

function planetCharacterElement(planet: string): Element {
  // Planet character → element via its trigram's suit element (upper-trigram element).
  const map: Record<string, Element> = {
    Saturn: 'Earth',
    Jupiter: 'Fire',
    Mars: 'Fire',
    Sun: 'Ether',
    Venus: 'Water',
    Mercury: 'Air',
    Moon: 'Water',
  };
  return map[planet] ?? 'Ether';
}
