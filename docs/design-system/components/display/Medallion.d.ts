import * as React from "react";

export interface MedallionProps {
  children?: React.ReactNode;
  /** Diameter in px (default 40). */
  size?: number;
  style?: React.CSSProperties;
}

/**
 * Round copper-ringed numeral badge.
 * @dsCard group="Components"
 */
export function Medallion(props: MedallionProps): React.ReactElement;
