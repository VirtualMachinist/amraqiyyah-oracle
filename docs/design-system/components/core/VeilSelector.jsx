import React from "react";

/**
 * VeilSelector — the nine Veils (question depth). Each Veil is a round token
 * numbered 1–9; the chosen one fills gold. The declared Veil sets how many
 * layers a reading engages, so the control reads as a dial of depth.
 */
export function VeilSelector({ value, onChange, style }) {
  const veils = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", ...style }}>
      {veils.map((v) => {
        const isActive = v === value;
        return (
          <button
            key={v}
            type="button"
            onClick={() => onChange && onChange(v)}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "var(--radius-full)",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-base)",
              fontWeight: "var(--weight-semibold)",
              background: isActive ? "var(--gold)" : "var(--panel-soft)",
              color: isActive ? "var(--accent-ink)" : "var(--dim)",
              transition: "var(--transition)",
            }}
          >
            {v}
          </button>
        );
      })}
    </div>
  );
}
