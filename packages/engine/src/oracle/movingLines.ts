/**
 * Moving Line Engine (Oracle §9.3 Step 4).
 * EXACTLY THREE CHECKS — never a fourth (hard constraint #2). Lines move
 * because an astronomical force bears on that position, not because they are
 * "exhausted". The weekly standing line and the month's Abjad line are
 * background context and never enter this engine.
 */
import type { LineNumber, SalahWindow } from '../types.js';
import {
  SALAH_WINDOW_LINES,
  lunarDayLine,
  seasonDayLine,
} from '../data/calendarData.js';

export type ResonanceState =
  | 'base'
  | 'solar_seal'
  | 'sevenfold_seal'
  | 'triple_seal'
  | 'solar_threshold';

export interface MovingLinesInput {
  lunarDay: number; // 1–30
  /** Sevenfold Weave: active iff hour ruler === mansion ruler. */
  sevenfoldActive: boolean;
  salahWindow: SalahWindow;
  dayOfSeason: number; // 1–91
  /** Solar Threshold: within ±3 days of a solstice/equinox. */
  solarThreshold: boolean;
}

export interface CheckResult {
  check: 1 | 2 | 3;
  source: 'lunar_day' | 'sevenfold_weave' | 'solar_season';
  clock: 'lunar' | 'planetary' | 'solar';
  line: LineNumber;
}

export interface MovingLinesResult {
  checks: CheckResult[];
  /** Distinct moving lines, ascending. */
  movingLines: LineNumber[];
  resonance: ResonanceState;
  /** Lines 6 and 1 both indicated at the Solar Threshold. */
  thresholdLines: LineNumber[] | null;
}

export function deriveMovingLines(input: MovingLinesInput): MovingLinesResult {
  const checks: CheckResult[] = [];

  // Check 1 — Lunar Day (always active): tidal, cyclical, emotional.
  const c1 = lunarDayLine(input.lunarDay) as LineNumber;
  checks.push({ check: 1, source: 'lunar_day', clock: 'lunar', line: c1 });

  // Check 2 — Sevenfold Weave (conditional): immediate, crystalline.
  let c2: LineNumber | null = null;
  if (input.sevenfoldActive) {
    c2 = SALAH_WINDOW_LINES[input.salahWindow] as LineNumber;
    checks.push({ check: 2, source: 'sevenfold_weave', clock: 'planetary', line: c2 });
  }

  // Check 3 — Solar Season (always active): structural, civilizational.
  const c3 = seasonDayLine(input.dayOfSeason) as LineNumber;
  checks.push({ check: 3, source: 'solar_season', clock: 'solar', line: c3 });

  const movingLines = [...new Set(checks.map((c) => c.line))].sort((a, b) => a - b) as LineNumber[];

  // Named resonance states (Oracle §9.3). Appendix C ruling: the worked
  // reading names a Check 2 + Check 3 convergence a Sevenfold Seal, so any
  // convergence involving the Sevenfold Weave seals as Sevenfold; the §9.3
  // table's "1 + 2" is one instance, not the definition.
  let resonance: ResonanceState = 'base';
  if (c2 !== null && c1 === c2 && c1 === c3) resonance = 'triple_seal';
  else if (c2 !== null && (c1 === c2 || c2 === c3)) resonance = 'sevenfold_seal';
  else if (c1 === c3) resonance = 'solar_seal';
  if (input.solarThreshold) resonance = 'solar_threshold';

  const thresholdLines: LineNumber[] | null = input.solarThreshold ? [6, 1] : null;

  return { checks, movingLines, resonance, thresholdLines };
}

/**
 * Check weighting by Veil band (Oracle §9.6 Function 2): governs
 * interpretation, not calculation — all active checks still produce lines.
 */
export function dominantCheckForVeil(veil: number): 1 | 2 | 3 {
  if (veil <= 3) return 2; // shallow questions live in the immediate
  if (veil <= 6) return 1; // mid-depth questions live in the month's arc
  return 3; // deep questions live in the structural
}
