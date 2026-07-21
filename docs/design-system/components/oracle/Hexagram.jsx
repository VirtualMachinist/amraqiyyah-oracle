import React from "react";

/**
 * Hexagram — the six-line figure, drawn top (line 6) to bottom (line 1). A solid
 * bar is yang (gold), a split pair is yin (indigo); a moving line burns crimson
 * with a dot to its right. Header names the number and title; the foot gives the
 * trigram stack, suit, and Divine Name.
 *
 * lines: 6 booleans, index 0 = bottom line (1) … index 5 = top line (6); true = yang.
 * moving: line numbers (1–6) that are currently moving.
 */
export function Hexagram({ number, name, lines = [], moving = [], upper, lower, suit, divineName, title, style }) {
  const rows = [5, 4, 3, 2, 1, 0].map((i) => ({
    index: i + 1,
    yang: !!lines[i],
    moving: moving.includes(i + 1),
  }));
  const barW = 120;
  const barH = 9;
  return (
    <div
      style={{
        background: "var(--panel)",
        border: "1px solid var(--line)",
        borderRadius: "var(--radius-lg)",
        padding: "14px",
        minWidth: "220px",
        ...style,
      }}
    >
      {title ? (
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--dim)" }}>{title}</div>
      ) : null}
      <div style={{ fontFamily: "var(--font-display)", fontWeight: "var(--weight-bold)", fontSize: "var(--text-lg)", color: "var(--text)", marginBottom: "8px" }}>
        {number} — {name}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        {rows.map((r) => (
          <div key={r.index} style={{ display: "flex", alignItems: "center", height: barH }}>
            {r.yang ? (
              <div style={{ width: barW, height: barH, borderRadius: "2px", background: r.moving ? "var(--crimson)" : "var(--yang)" }} />
            ) : (
              <div style={{ display: "flex", width: barW, gap: "24px" }}>
                <div style={{ flex: 1, height: barH, borderRadius: "2px", background: r.moving ? "var(--crimson)" : "var(--yin)" }} />
                <div style={{ flex: 1, height: barH, borderRadius: "2px", background: r.moving ? "var(--crimson)" : "var(--yin)" }} />
              </div>
            )}
            {r.moving ? <span style={{ color: "var(--crimson)", marginLeft: "8px", fontSize: "10px" }}>●</span> : null}
          </div>
        ))}
      </div>
      {(upper || lower || suit) ? (
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--dim)", marginTop: "8px" }}>
          {upper} over {lower} · {suit === "Axial" ? "Threshold/Axial" : `${suit} suit`}
        </div>
      ) : null}
      {divineName ? (
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--gold)", marginTop: "2px" }}>{divineName}</div>
      ) : null}
    </div>
  );
}
