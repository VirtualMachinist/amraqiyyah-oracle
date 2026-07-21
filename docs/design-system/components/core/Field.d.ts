import * as React from "react";

export interface FieldProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  /** CSS width; defaults to 100%. */
  width?: string;
  align?: "left" | "center" | "right";
  style?: React.CSSProperties;
}

/**
 * Sunken text input; copper focus ring.
 * @dsCard group="Components"
 */
export function Field(props: FieldProps): React.ReactElement;
