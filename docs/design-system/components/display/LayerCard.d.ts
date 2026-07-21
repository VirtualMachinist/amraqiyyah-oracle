import * as React from "react";

export interface LayerCardProps {
  /** Uppercase layer title, e.g. "Planetary Hour". */
  title: string;
  /** The main reading line. */
  main: string;
  /** Optional secondary detail. */
  sub?: string;
  /** The layer's active Divine Name (rendered gold). */
  name?: string;
  style?: React.CSSProperties;
}

/**
 * One temporal-layer cell for the Now screen.
 * @dsCard group="Components"
 */
export function LayerCard(props: LayerCardProps): React.ReactElement;
