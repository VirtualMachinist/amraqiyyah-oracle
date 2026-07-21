import React from "react";

/**
 * VerseRow — a single āyah or mizmār verse: the reference on a pill, the Arabic
 * source (large, right-to-left), and the translation beneath. A jumped-to verse
 * (the one a reading points at) is haloed gold with a gold left rule.
 */
export function VerseRow({ label, arabic, english, highlight = false, style }) {
  return (
    <div
      style={{
        padding: "14px 16px",
        borderBottom: "1px solid var(--line)",
        background: highlight ? "var(--highlight-wash)" : "transparent",
        borderLeft: highlight ? "2px solid var(--gold)" : "2px solid transparent",
        ...style,
      }}
    >
      <div style={{ marginBottom: "8px" }}>
        <span
          style={{
            display: "inline-block",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            fontWeight: "var(--weight-bold)",
            color: "var(--gold)",
            padding: "2px 8px",
            borderRadius: "var(--radius-pill)",
            border: `1px solid ${highlight ? "var(--gold)" : "var(--line)"}`,
            background: "var(--panel)",
          }}
        >
          {label}
        </span>
      </div>
      <div className="aq-arabic" style={{ fontSize: "var(--text-arabic)", color: "var(--text)" }}>
        {arabic}
      </div>
      <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "var(--dim)", marginTop: "10px", lineHeight: 1.5 }}>
        {english}
      </div>
    </div>
  );
}
