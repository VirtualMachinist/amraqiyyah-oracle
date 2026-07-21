import * as React from "react";

export interface ButtonProps {
  children?: React.ReactNode;
  /** Gold fill (primary action), copper outline (ghost), or sunken utility. */
  variant?: "primary" | "ghost" | "sunken";
  size?: "sm" | "md";
  disabled?: boolean;
  /** Stretch to fill the container width. */
  full?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

/**
 * The Oracle's action button — uppercase mono label on a gold leaf fill.
 * @dsCard group="Components"
 */
export function Button(props: ButtonProps): React.ReactElement;
