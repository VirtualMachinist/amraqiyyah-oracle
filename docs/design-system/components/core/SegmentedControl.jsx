import React from "react";

/**
 * SegmentedControl — the framed multiple-choice selector: reading Mode (A/B/C),
 * book (Qur'ān / Zabūr). Selected segment lifts to sunken fill with a copper
 * border and lit-copper text.
 */
export function SegmentedControl({ options = [], value, onChange, style }) {
  return (
    <div style={{ display: "flex", gap: "8px", ...style }}>
      {options.map((o) => {
        const key = typeof o === "string" ? o : o.value;
        const label = typeof o === "string" ? o : o.label;
        const isActive = key === value;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange && onChange(key)}
            style={{
              flex: 1,
              padding: "10px 12px",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--weight-semibold)",
              background: isActive ? "var(--panel-soft)" : "var(--panel)",
              color: isActive ? "var(--copper-light)" : "var(--dim)",
              border: `1px solid ${isActive ? "var(--copper)" : "var(--line)"}`,
              transition: "var(--transition)",
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
