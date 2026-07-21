import * as React from "react";

export interface DeckCardProps {
  /** Card number 1–78, or "back" for the uniform back. */
  card?: number | "back";
  /** Card width in px (height follows the 2.75:4.75 deck ratio). Default 300. */
  width?: number;
  /** Placement orientation — "sideways" for the Planetary Agent, "inverted" for Catalan-primary Bridge placement. */
  orientation?: "upright" | "inverted" | "sideways";
  /** Path to the brand mark used on the uniform back (default "../assets/logo-mark.png"). */
  backSrc?: string;
  style?: React.CSSProperties;
}

/**
 * Full card art for the 78-card Oracle deck (5 strata + uniform back).
 * @dsCard group="Components"
 * @startingPoint section="Oracle" subtitle="A fully-designed deck card" viewport="360x620"
 */
export function DeckCard(props: DeckCardProps): React.ReactElement;
