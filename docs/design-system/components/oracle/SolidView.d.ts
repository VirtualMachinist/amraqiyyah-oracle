import * as React from "react";

export interface SolidViewProps {
  /** Solid key: 5 Platonic (tetrahedron…icosahedron), 13 Archimedean (snake_case, e.g. "snub_cube"), 13 Catalan duals (e.g. "pentagonal_icositetrahedron"). */
  solid: string;
  /** Rendered size in px (default 120). */
  size?: number;
  /** Mirror (left-handed) — for the chiral snubs. */
  mirror?: boolean;
  /** View rotation in radians. */
  yaw?: number;
  pitch?: number;
  /** Edge tone: "lapis" (copper edges, default) or "gold". */
  tone?: "lapis" | "gold";
  label?: string;
  style?: React.CSSProperties;
}

/**
 * Glass polyhedron (SVG) — lapis glass faces, copper edges, glowing vertices.
 * @dsCard group="Components"
 */
export function SolidView(props: SolidViewProps): React.ReactElement;
