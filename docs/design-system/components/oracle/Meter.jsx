import React from "react";

/**
 * Meter — a small arc dial for a slow temporal cycle (the week, mansion, season,
 * harmonic cycle, Great Year). A faint full ring with a coloured progress arc
 * from the top, clockwise; the value sits at the centre with a caption below.
 * The same clock made visible at a slower speed.
 */
export function Meter({ label, fraction = 0, center, sub, color = "var(--gold)", size = 104, style }) {
  const CC = size / 2;
  const R = size * 0.385;
  const f = Math.max(0, Math.min(0.9999, fraction));
  const end = f * 360;
  const a = (end * Math.PI) / 180;
  const x1 = CC + R * Math.sin(a);
  const y1 = CC - R * Math.cos(a);
  const large = end > 180 ? 1 : 0;
  const d = `M ${CC} ${CC - R} A ${R} ${R} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", ...style }}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--dim)",
          marginBottom: "4px",
        }}
      >
        {label}
      </div>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%">
          <circle cx={CC} cy={CC} r={R} fill="none" stroke="var(--line)" strokeWidth={5} />
          <path d={d} fill="none" stroke={color} strokeWidth={5} strokeLinecap="round" opacity={0.95} />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-base)", fontWeight: "var(--weight-bold)", color }}>
            {center}
          </div>
          {sub ? (
            <div style={{ fontSize: "9px", color: "var(--dim)", marginTop: "2px", maxWidth: size - 14, textAlign: "center" }}>
              {sub}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
