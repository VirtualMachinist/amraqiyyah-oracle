import React from "react";

/**
 * LayerCard — one of the nine temporal layers on the Now screen. A small titled
 * cell: an uppercase layer title, its main reading, an optional sub-line, and
 * the layer's active Divine Name in gold at the foot.
 */
export function LayerCard({ title, main, sub, name, style }) {
  return (
    <div
      style={{
        background: "var(--panel)",
        border: "1px solid var(--line)",
        borderRadius: "var(--radius-lg)",
        padding: "12px",
        minWidth: "220px",
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--dim)",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-base)",
          fontWeight: "var(--weight-semibold)",
          color: "var(--text)",
          marginTop: "4px",
        }}
      >
        {main}
      </div>
      {sub ? (
        <div style={{ fontSize: "var(--text-sm)", color: "var(--dim)", marginTop: "2px" }}>
          {sub}
        </div>
      ) : null}
      {name ? (
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--gold)", marginTop: "6px" }}>
          {name}
        </div>
      ) : null}
    </div>
  );
}
