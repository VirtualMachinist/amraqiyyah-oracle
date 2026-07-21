import React from "react";

/**
 * TabBar — the app's top-level pill navigation (Now · Reading · Texts · Natal ·
 * Journal). Active pill is gold with night-ink text; the rest sit on panel fill.
 * Horizontally scrollable when the tabs overflow.
 */
export function TabBar({ tabs = [], active, onChange, style }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        overflowX: "auto",
        padding: "0 16px",
        alignItems: "center",
        scrollbarWidth: "none",
        ...style,
      }}
    >
      {tabs.map((t) => {
        const key = typeof t === "string" ? t : t.key;
        const label = typeof t === "string" ? t : t.label;
        const isActive = key === active;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange && onChange(key)}
            style={{
              flex: "0 0 auto",
              padding: "8px 16px",
              borderRadius: "var(--radius-pill)",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--weight-semibold)",
              letterSpacing: "0.04em",
              background: isActive ? "var(--gold)" : "var(--panel)",
              color: isActive ? "var(--accent-ink)" : "var(--dim)",
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
