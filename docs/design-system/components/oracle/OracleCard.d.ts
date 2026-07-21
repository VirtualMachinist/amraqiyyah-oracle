import * as React from "react";

export interface OracleCardProps {
  /** Card label, e.g. "Axial Witness" or the Key name. */
  label: string;
  /** Sub-line, e.g. "Hex 52 · As-Samad". */
  sub?: string;
  /** Card role — sets the placeholder glyph. */
  kind?: "axial" | "key" | "agent" | "bridge";
  /** Split face (yin/yang) — for Bridge cards. */
  split?: boolean;
  /** Lay the card sideways — the Planetary Agent. */
  sideways?: boolean;
  /** Explicit orientation (overrides sideways). */
  orientation?: "upright" | "inverted" | "sideways";
  style?: React.CSSProperties;
}

/**
 * A deck-card slot honouring the ratified placeholder constraints.
 * @dsCard group="Components"
 */
export function OracleCard(props: OracleCardProps): React.ReactElement;
