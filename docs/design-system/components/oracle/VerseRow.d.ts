import * as React from "react";

export interface VerseRowProps {
  /** Reference label, e.g. "81:3". */
  label: string;
  /** The verse in Arabic (source). */
  arabic: string;
  /** The translation. */
  english: string;
  /** Halo this verse in gold (a reading's destination). */
  highlight?: boolean;
  style?: React.CSSProperties;
}

/**
 * A scripture verse row — Arabic source over translation, gold halo when targeted.
 * @dsCard group="Components"
 */
export function VerseRow(props: VerseRowProps): React.ReactElement;
