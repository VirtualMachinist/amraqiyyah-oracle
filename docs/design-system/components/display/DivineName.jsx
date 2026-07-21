import React from "react";

/**
 * DivineName — one of the 99 Names as the app names them: the transliteration
 * in gold, optional Arabic in lit lapis, an optional meaning, and an optional
 * role tag (e.g. "hexagram", "suit", "key"). The dhikr count, when given, is
 * the Name's Abjad value.
 */
export function DivineName({ name, arabic, meaning, role, count, style }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "8px", ...style }}>
      <span style={{ fontFamily: "var(--font-body)", fontWeight: "var(--weight-semibold)", fontSize: "var(--text-md)", color: "var(--gold)" }}>
        {name}
      </span>
      {arabic ? (
        <span className="aq-arabic" style={{ fontSize: "var(--text-lg)", color: "var(--lapis-light)" }}>
          {arabic}
        </span>
      ) : null}
      {meaning ? (
        <span style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "var(--text-base)", color: "var(--text)" }}>
          — {meaning}
        </span>
      ) : null}
      {role ? (
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--dim)" }}>
          ({role})
        </span>
      ) : null}
      {count != null ? (
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--copper-light)" }}>
          ×{count}
        </span>
      ) : null}
    </div>
  );
}
