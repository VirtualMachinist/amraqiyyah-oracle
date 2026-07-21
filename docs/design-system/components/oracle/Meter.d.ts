import * as React from "react";

export interface MeterProps {
  /** Uppercase caption above the dial, e.g. "GREAT YEAR". */
  label: string;
  /** Progress 0–1, drawn clockwise from the top. */
  fraction: number;
  /** Centre value, e.g. "40/91" or "91%". */
  center: React.ReactNode;
  /** Caption below the centre value. */
  sub?: string;
  /** Arc colour (CSS value). */
  color?: string;
  /** Dial diameter in px (default 104). */
  size?: number;
  style?: React.CSSProperties;
}

/**
 * Arc-dial meter for a slow temporal cycle.
 * @dsCard group="Components"
 */
export function Meter(props: MeterProps): React.ReactElement;
