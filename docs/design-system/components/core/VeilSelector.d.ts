import * as React from "react";

export interface VeilSelectorProps {
  /** Selected veil 1–9. */
  value: number;
  onChange?: (veil: number) => void;
  style?: React.CSSProperties;
}

/**
 * The nine Veils of question depth as round 1–9 tokens; selected fills gold.
 * @dsCard group="Components"
 */
export function VeilSelector(props: VeilSelectorProps): React.ReactElement;
