import React from "react";

/**
 * Medallion — a round copper-ringed numeral, used for surah numbers in the
 * Texts index and anywhere a single number needs a sacred frame.
 */
export function Medallion({ children, size = 40, style }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "var(--radius-full)",
        border: "1px solid var(--copper)",
        background: "var(--panel)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-mono)",
        fontWeight: "var(--weight-bold)",
        fontSize: "var(--text-sm)",
        color: "var(--gold)",
        flex: "0 0 auto",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
