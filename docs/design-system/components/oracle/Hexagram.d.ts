import * as React from "react";

export interface HexagramProps {
  /** King Wen number 1–64. */
  number: number;
  /** Hexagram name, e.g. "Abundance". */
  name: string;
  /** 6 booleans, index 0 = bottom line (1) … 5 = top (6); true = yang (solid). */
  lines: boolean[];
  /** Line numbers (1–6) currently moving (burn crimson). */
  moving?: number[];
  /** Upper trigram name (the sky / mansion ruler). */
  upper?: string;
  /** Lower trigram name (the ground / hour ruler). */
  lower?: string;
  /** Suit; "Axial" is drawn as Threshold/Axial. */
  suit?: string;
  /** The hexagram's Divine Name. */
  divineName?: string;
  /** Small caption above the figure, e.g. "The situation". */
  title?: string;
  style?: React.CSSProperties;
}

/**
 * The six-line hexagram figure with moving-line highlighting.
 * @dsCard group="Components"
 * @startingPoint section="Oracle" subtitle="Six-line hexagram figure" viewport="700x340"
 */
export function Hexagram(props: HexagramProps): React.ReactElement;
