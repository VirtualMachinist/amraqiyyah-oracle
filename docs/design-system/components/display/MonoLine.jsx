import React from "react";

/**
 * MonoLine — a teal monospace readout line, the app's voice for deterministic
 * output (oracle inputs, coordinates, substrate). When href/onClick is given it
 * becomes a lit-copper underlined link that opens a text or coordinate.
 */
export function MonoLine({ children, link = false, dim = false, gold = false, onClick, style }) {
  let color = "var(--teal)";
  if (link) color = "var(--copper-light)";
  if (dim) color = "var(--dim)";
  if (gold) color = "var(--gold)";
  return (
    <div
      onClick={onClick}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: link ? "var(--text-sm)" : "var(--text-sm)",
        color,
        marginTop: "3px",
        textDecoration: link ? "underline" : "none",
        cursor: link || onClick ? "pointer" : "default",
        lineHeight: 1.5,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
