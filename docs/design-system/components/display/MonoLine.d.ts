import * as React from "react";

export interface MonoLineProps {
  children?: React.ReactNode;
  /** Render as a lit-copper underlined link. */
  link?: boolean;
  /** Muted dim colour. */
  dim?: boolean;
  /** Gold (threshold / emphasis). */
  gold?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

/**
 * Teal monospace readout line — the deterministic voice of the Oracle.
 * @dsCard group="Components"
 */
export function MonoLine(props: MonoLineProps): React.ReactElement;
