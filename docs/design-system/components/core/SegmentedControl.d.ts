import * as React from "react";

export type SegmentOption = string | { value: string; label: string };

export interface SegmentedControlProps {
  options: SegmentOption[];
  value: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}

/**
 * Framed segmented selector — reading Mode, book choice.
 * @dsCard group="Components"
 */
export function SegmentedControl(props: SegmentedControlProps): React.ReactElement;
