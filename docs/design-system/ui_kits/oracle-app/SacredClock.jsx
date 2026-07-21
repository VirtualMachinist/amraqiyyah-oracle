/**
 * SacredClock — a faithful HTML/SVG port of the Oracle app's astrolabe
 * (apps/app/src/screens/SacredClock.tsx). One dial, three concentric temporal
 * layers sharing the same clock angle (noon top, midnight bottom, clockwise):
 *   · sky band       — daylight (gold) and night (lapis)
 *   · planetary hours — 24 unequal hours, current one lit
 *   · salah windows   — the six prayer windows, current one lit
 * A gold needle marks the present; the centre names the hour.
 *
 * Schedule is expressed in fractional local hours (0–24) for a self-contained,
 * ephemeris-free recreation.
 */
const CLK = 180, R_TICK = 173, R_SKY = 160, R_HOUR = 139, R_SALAH = 110, R_DISC = 90;
const CHALDEAN = ["Saturn", "Jupiter", "Mars", "Sun", "Venus", "Mercury", "Moon"];
const PLANET = {
  Saturn: { glyph: "♄", color: "var(--planet-saturn)" },
  Jupiter: { glyph: "♃", color: "var(--planet-jupiter)" },
  Mars: { glyph: "♂", color: "var(--planet-mars)" },
  Sun: { glyph: "☉", color: "var(--planet-sun)" },
  Venus: { glyph: "♀", color: "var(--planet-venus)" },
  Mercury: { glyph: "☿", color: "var(--planet-mercury)" },
  Moon: { glyph: "☾", color: "var(--planet-moon)" },
};
const SALAH = {
  tahajjud: { label: "Tahajjud", short: "Tah", color: "#2f3c78" },
  fajr: { label: "Fajr", short: "Fajr", color: "#b87333" },
  duha: { label: "Duha", short: "Duha", color: "#d4af6a" },
  dhuhr_asr: { label: "Dhuhr–Asr", short: "Ẓuhr", color: "#caa23f" },
  asr_maghrib: { label: "Asr–Maghrib", short: "Aṣr", color: "#c98a3f" },
  maghrib_isha: { label: "Maghrib–Isha", short: "Mag", color: "#7a5aa0" },
};

function pol(r, deg) {
  const a = (deg * Math.PI) / 180;
  return [CLK + r * Math.sin(a), CLK - r * Math.cos(a)];
}
function hourDeg(h) { return ((h - 12) / 24) * 360; }
function arcPath(r, startDeg, deltaDeg) {
  const [x0, y0] = pol(r, startDeg);
  const [x1, y1] = pol(r, startDeg + deltaDeg);
  const large = Math.abs(deltaDeg) > 180 ? 1 : 0;
  const sweep = deltaDeg >= 0 ? 1 : 0;
  return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${large} ${sweep} ${x1.toFixed(2)} ${y1.toFixed(2)}`;
}

/** Build a plausible day: 24 unequal planetary hours + six salah arcs. */
function buildSchedule(nowH, sunrise, sunset, dayLord) {
  const nightLen = 24 - (sunset - sunrise);
  const dayHour = (sunset - sunrise) / 12;
  const nightHour = nightLen / 12;
  const start = CHALDEAN.indexOf(dayLord);
  const hours = [];
  for (let i = 0; i < 24; i++) {
    const isDay = i < 12;
    const s = isDay ? sunrise + i * dayHour : sunset + (i - 12) * nightHour;
    const e = s + (isDay ? dayHour : nightHour);
    hours.push({ index: i, planet: CHALDEAN[(start + i) % 7], start: s % 24, end: ((e - 0.0001) % 24), rawStart: s, rawEnd: e, isDay });
  }
  const cur = hours.findIndex((h) => nowH >= h.rawStart % 24 && nowH < h.rawEnd % 24) ;
  const salahArcs = [
    { window: "tahajjud", start: (sunset + nightLen * 0.66) % 24, end: sunrise },
    { window: "fajr", start: sunrise, end: sunrise + 1.4 },
    { window: "duha", start: sunrise + 1.4, end: 11.7 },
    { window: "dhuhr_asr", start: 11.7, end: 15.3 },
    { window: "asr_maghrib", start: 15.3, end: sunset },
    { window: "maghrib_isha", start: sunset, end: (sunset + nightLen * 0.66) % 24 },
  ];
  const inArc = (a) => { const s = a.start, e = a.end; return s < e ? (nowH >= s && nowH < e) : (nowH >= s || nowH < e); };
  const curSalah = salahArcs.find(inArc) || salahArcs[3];
  return { hours, currentHourIndex: cur < 0 ? 0 : cur, sunrise, sunset, salahArcs, currentSalahWindow: curSalah.window, dayLord, salahLine: salahArcs.indexOf(curSalah) + 1 };
}

function segDelta(s, e) { let d = e - s; if (d <= 0) d += 24; return (d / 24) * 360; }

function SacredClock({ time }) {
  const now = time || new Date();
  const nowH = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
  const sched = React.useMemo(() => buildSchedule(nowH, 6.2, 18.78, "Sun"), [Math.floor(nowH * 60)]);
  const nowDeg = hourDeg(nowH);
  const cur = sched.hours[sched.currentHourIndex];
  const curPlanet = PLANET[cur.planet];
  const curSalah = SALAH[sched.currentSalahWindow];
  const clock = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  const [handX, handY] = pol(R_HOUR + 8, nowDeg);
  const [srX, srY] = pol(R_SKY, hourDeg(sched.sunrise));
  const [ssX, ssY] = pol(R_SKY, hourDeg(sched.sunset));

  return (
    <div style={{ width: "100%", maxWidth: 360, aspectRatio: "1", alignSelf: "center", margin: "0 auto", position: "relative" }}>
      <svg viewBox="0 0 360 360" width="100%" height="100%">
        <defs>
          <radialGradient id="core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#161428" />
            <stop offset="100%" stopColor="#0b0b12" />
          </radialGradient>
        </defs>
        {[R_TICK, R_SKY, R_HOUR, R_SALAH, R_DISC].map((r) => (
          <circle key={r} cx={CLK} cy={CLK} r={r} fill="none" stroke="var(--line)" strokeWidth={0.5} opacity={0.5} />
        ))}
        {/* sky band */}
        <path d={arcPath(R_SKY, hourDeg(sched.sunrise), segDelta(sched.sunrise, sched.sunset))} stroke="var(--gold)" strokeWidth={7} fill="none" opacity={0.28} strokeLinecap="round" />
        <path d={arcPath(R_SKY, hourDeg(sched.sunset), segDelta(sched.sunset, sched.sunrise))} stroke="var(--lapis)" strokeWidth={7} fill="none" opacity={0.5} strokeLinecap="round" />
        <circle cx={srX} cy={srY} r={3} fill="var(--gold)" />
        <circle cx={ssX} cy={ssY} r={3} fill="var(--lapis-light)" />
        {/* ticks */}
        {Array.from({ length: 24 }, (_, h) => {
          const d = hourDeg(h);
          const [x0, y0] = pol(R_TICK, d);
          const [x1, y1] = pol(R_TICK - (h % 6 === 0 ? 9 : 5), d);
          return <line key={h} x1={x0} y1={y0} x2={x1} y2={y1} stroke="var(--dim)" strokeWidth={h % 6 === 0 ? 1.2 : 0.6} opacity={0.6} />;
        })}
        {[["0", 180], ["6", 270], ["12", 0], ["18", 90]].map(([lbl, d]) => {
          const [x, y] = pol(R_TICK - 20, d);
          return <text key={lbl} x={x} y={y + 4} fill="var(--dim)" fontSize={10} textAnchor="middle">{lbl}</text>;
        })}
        {/* planetary hours */}
        {sched.hours.map((h) => {
          const start = hourDeg(h.rawStart % 24);
          const delta = segDelta(h.rawStart % 24, h.rawEnd % 24);
          const isCur = h.index === sched.currentHourIndex;
          const p = PLANET[h.planet];
          const [gx, gy] = pol(R_HOUR, start + delta / 2);
          return (
            <g key={h.index}>
              <path d={arcPath(R_HOUR, start + 0.6, delta - 1.2)} stroke={p.color} strokeWidth={isCur ? 22 : 15} fill="none" opacity={isCur ? 0.95 : h.isDay ? 0.34 : 0.22} />
              <text x={gx} y={gy + (isCur ? 5 : 4)} fill={isCur ? "#0b0b12" : p.color} fontSize={isCur ? 15 : 10} fontWeight={isCur ? 700 : 400} textAnchor="middle" opacity={isCur ? 1 : 0.85}>{p.glyph}</text>
            </g>
          );
        })}
        {/* salah windows */}
        {sched.salahArcs.map((a) => {
          const start = hourDeg(a.start);
          const delta = segDelta(a.start, a.end);
          const s = SALAH[a.window];
          const isCur = a.window === sched.currentSalahWindow;
          const [lx, ly] = pol(R_SALAH, start + delta / 2);
          return (
            <g key={a.window}>
              <path d={arcPath(R_SALAH, start + 0.8, delta - 1.6)} stroke={s.color} strokeWidth={isCur ? 18 : 12} fill="none" opacity={isCur ? 0.95 : 0.32} />
              <text x={lx} y={ly + 3} fill={isCur ? "#0b0b12" : s.color} fontSize={8} fontWeight={isCur ? 700 : 400} textAnchor="middle" opacity={isCur ? 1 : 0.9}>{s.short}</text>
            </g>
          );
        })}
        {/* core + needle */}
        <circle cx={CLK} cy={CLK} r={R_DISC} fill="url(#core)" stroke="var(--copper)" strokeWidth={1} opacity={0.95} />
        <line x1={CLK} y1={CLK} x2={handX} y2={handY} stroke="var(--gold)" strokeWidth={2} strokeLinecap="round" />
        <circle cx={handX} cy={handY} r={4} fill="var(--gold)" />
        <circle cx={CLK} cy={CLK} r={4} fill="var(--copper)" />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
        <div style={{ color: "var(--text)", fontSize: 40, fontWeight: 200, letterSpacing: 2, fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums" }}>{clock}</div>
        <div style={{ color: curPlanet.color, fontSize: 15, fontWeight: 600, marginTop: 2 }}>{curPlanet.glyph} {cur.planet} · hour {(cur.index % 12) + 1}</div>
        <div style={{ color: curSalah.color, fontSize: 12, marginTop: 4 }}>{curSalah.label} · Line {sched.salahLine}</div>
        <div style={{ color: "var(--dim)", fontSize: 11, marginTop: 6 }}>day of {PLANET[sched.dayLord].glyph} {sched.dayLord}</div>
      </div>
    </div>
  );
}
window.SacredClock = SacredClock;
