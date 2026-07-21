import React from "react";

/**
 * Panel — the Oracle's fundamental container. A bordered card on panel fill
 * with an optional title. The accent prop recolours the border to signal a
 * special state (gold = the Unmoved Axis; teal = Stellar Court).
 */
export function Panel({ title, accent, children, style }) {
  const accents = {
    gold: "var(--gold)",
    teal: "var(--teal)",
    copper: "var(--copper)",
    crimson: "var(--crimson)",
  };
  const borderColor = accents[accent] || "var(--line)";
  const titleColor = accent ? (accents[accent] || "var(--text)") : "var(--text)";
  return (
    <div
      style={{
        background: "var(--panel)",
        border: `1px solid ${borderColor}`,
        borderRadius: "var(--radius-lg)",
        padding: "14px",
        ...style,
      }}
    >
      {title ? (
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--weight-bold)",
            fontSize: "var(--text-lg)",
            color: titleColor,
            marginBottom: "6px",
          }}
        >
          {title}
        </div>
      ) : null}
      {children}
    </div>
  );
}
