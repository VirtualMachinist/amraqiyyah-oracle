import React from "react";

/**
 * OracleCard — a deck card slot honouring the ratified placeholder constraints:
 * uniform backs, split faces (two regions on one front), sideways placement for
 * the Planetary Agent. Card imagery is pending the Deck Design Document, so the
 * face carries a glyph or the yin/yang split. A gold-outlined slot with a label
 * and sub beneath.
 *
 *  kind:  "axial" (☶ · Hex 52) · "key" (◈ · Platonic Key) · "agent" (✶ · sideways) · "bridge" (split)
 *  orientation: "upright" | "inverted" | "sideways" — rotates the card face.
 */
export function OracleCard({ label, sub, kind = "key", split = false, sideways = false, orientation, style }) {
  const glyphs = { axial: "☶", key: "◈", agent: "✶", bridge: "⯒" };
  const rotate = sideways || orientation === "sideways" ? "90deg" : orientation === "inverted" ? "180deg" : "0deg";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "130px", ...style }}>
      <div
        style={{
          width: "86px",
          height: "128px",
          borderRadius: "var(--radius-sm)",
          background: "var(--panel-soft)",
          border: "1.5px solid var(--gold)",
          overflow: "hidden",
          transform: `rotate(${rotate})`,
          transition: "var(--transition)",
        }}
      >
        {split ? (
          <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ flex: 1, background: "#2a2438", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "var(--dim)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px" }}>yang</span>
            </div>
            <div style={{ flex: 1, background: "#1c2436", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "var(--dim)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px" }}>yin</span>
            </div>
          </div>
        ) : (
          <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "var(--gold)", fontSize: "34px" }}>{glyphs[kind] || "◈"}</span>
          </div>
        )}
      </div>
      <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-semibold)", color: "var(--text)", marginTop: "6px", textAlign: "center" }}>
        {label}
      </div>
      {sub ? (
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--dim)", textAlign: "center", marginTop: "2px" }}>
          {sub}
        </div>
      ) : null}
    </div>
  );
}
