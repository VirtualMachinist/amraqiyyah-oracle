import * as React from "react";

export interface DivineNameProps {
  /** Transliterated Name, e.g. "Al-Qadir". */
  name: string;
  /** The Name in Arabic script. */
  arabic?: string;
  /** English meaning. */
  meaning?: string;
  /** Role in the reading, e.g. "hexagram", "suit", "key". */
  role?: string;
  /** Dhikr count (the Name's Abjad value). */
  count?: number;
  style?: React.CSSProperties;
}

/**
 * One of the 99 Names — gold transliteration, lapis Arabic, meaning, role.
 * @dsCard group="Components"
 */
export function DivineName(props: DivineNameProps): React.ReactElement;
