import * as React from "react";

export interface PanelProps {
  /** Optional panel heading (display serif). */
  title?: string;
  /** Recolour the border + title to signal a state. */
  accent?: "gold" | "teal" | "copper" | "crimson";
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Bordered container card — the Oracle's fundamental panel.
 * @dsCard group="Components"
 * @startingPoint section="Layout" subtitle="Bordered panel card" viewport="700x220"
 */
export function Panel(props: PanelProps): React.ReactElement;
