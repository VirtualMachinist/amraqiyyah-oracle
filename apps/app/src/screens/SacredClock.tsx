/**
 * The Sacred Clock — the planetary day as a living astrolabe.
 *
 * One dial, three concentric temporal layers sharing the same clock-time angle
 * (noon at the top, midnight at the bottom, clockwise):
 *   · the sky band      — daylight (gold) and night (lapis), sunrise→sunset→sunrise
 *   · the planetary hours — 24 unequal hours, each a planet's sigil, the current one lit
 *   · the Salah windows  — the six prayer windows, the current one lit
 * A gold needle marks the present moment; the center names the hour.
 *
 * All geometry derives from the engine's daySchedule(). This file only draws.
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path, G, Line, Text as SvgText, Defs, RadialGradient, Stop } from 'react-native-svg';
import { COLORS, FONTS } from '../theme';
import type { DaySchedule } from '@amraqiyyah/engine';

const PLANET: Record<string, { glyph: string; color: string }> = {
  Saturn: { glyph: '♄', color: '#9a93a8' },
  Jupiter: { glyph: '♃', color: '#6d8fd8' },
  Mars: { glyph: '♂', color: '#c85a6e' },
  Sun: { glyph: '☉', color: '#d4af6a' },
  Venus: { glyph: '♀', color: '#7bbf9e' },
  Mercury: { glyph: '☿', color: '#d99a5c' },
  Moon: { glyph: '☾', color: '#c8ccda' },
};

const SALAH: Record<string, { label: string; short: string; color: string }> = {
  tahajjud: { label: 'Tahajjud', short: 'Tah', color: '#2f3c78' },
  fajr: { label: 'Fajr', short: 'Fajr', color: '#b87333' },
  duha: { label: 'Duha', short: 'Duha', color: '#d4af6a' },
  dhuhr_asr: { label: 'Dhuhr–Asr', short: 'Ẓuhr', color: '#caa23f' },
  asr_maghrib: { label: 'Asr–Maghrib', short: 'Aṣr', color: '#c98a3f' },
  maghrib_isha: { label: 'Maghrib–Isha', short: 'Mag', color: '#7a5aa0' },
  isha: { label: 'Isha', short: 'Isha', color: '#4a5bb0' },
};

// ---- geometry ----
const C = 180; // center
const R_TICK = 173;
const R_SKY = 160;
const R_HOUR = 139;
const R_SALAH = 110;
const R_DISC = 90;

function pol(r: number, deg: number): [number, number] {
  const a = (deg * Math.PI) / 180;
  return [C + r * Math.sin(a), C - r * Math.cos(a)];
}
function arcPath(r: number, startDeg: number, deltaDeg: number): string {
  const [x0, y0] = pol(r, startDeg);
  const [x1, y1] = pol(r, startDeg + deltaDeg);
  const large = Math.abs(deltaDeg) > 180 ? 1 : 0;
  const sweep = deltaDeg >= 0 ? 1 : 0;
  return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${large} ${sweep} ${x1.toFixed(2)} ${y1.toFixed(2)}`;
}
/** Fractional local hours (0–24) of a date in a timezone. */
function localHours(date: Date, tz: string): number {
  const p = new Intl.DateTimeFormat('en-US', {
    timeZone: tz, hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit',
  }).formatToParts(date);
  const get = (t: string) => Number(p.find((x) => x.type === t)?.value ?? 0);
  let h = get('hour');
  if (h === 24) h = 0;
  return h + get('minute') / 60 + get('second') / 3600;
}
/** Angle (deg clockwise from top) for a clock time: noon→0°, midnight→180°. */
function timeDeg(date: Date, tz: string): number {
  return ((localHours(date, tz) - 12) / 24) * 360;
}
function durationDeg(start: Date, end: Date): number {
  return ((end.getTime() - start.getTime()) / 86_400_000) * 360;
}

export function SacredClock({ schedule, now, tz }: { schedule: DaySchedule; now: Date; tz: string }) {
  const nowDeg = timeDeg(now, tz);
  const cur = schedule.hours[schedule.currentHourIndex]!;
  const curPlanet = PLANET[cur.planet]!;
  const curSalah = SALAH[schedule.currentSalahWindow]!;

  const clock = String(new Intl.DateTimeFormat('en-GB', {
    timeZone: tz, hour12: false, hour: '2-digit', minute: '2-digit',
  }).format(now));

  const [handX, handY] = pol(R_HOUR + 8, nowDeg);
  const [sunriseX, sunriseY] = pol(R_SKY, timeDeg(schedule.sunrise, tz));
  const [sunsetX, sunsetY] = pol(R_SKY, timeDeg(schedule.sunset, tz));

  return (
    <View style={styles.wrap}>
      <Svg viewBox="0 0 360 360" width="100%" height="100%">
        <Defs>
          <RadialGradient id="core" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#161428" />
            <Stop offset="100%" stopColor="#0b0b12" />
          </RadialGradient>
        </Defs>

        {/* faint concentric guides — sacred geometry scaffold */}
        {[R_TICK, R_SKY, R_HOUR, R_SALAH, R_DISC].map((r) => (
          <Circle key={r} cx={C} cy={C} r={r} fill="none" stroke={COLORS.line} strokeWidth={0.5} opacity={0.5} />
        ))}

        {/* the sky band: day + night */}
        <Path d={arcPath(R_SKY, timeDeg(schedule.sunrise, tz), durationDeg(schedule.sunrise, schedule.sunset))}
          stroke={COLORS.gold} strokeWidth={7} fill="none" opacity={0.28} strokeLinecap="round" />
        <Path d={arcPath(R_SKY, timeDeg(schedule.sunset, tz), durationDeg(schedule.sunset, schedule.nextSunrise))}
          stroke={COLORS.lapis} strokeWidth={7} fill="none" opacity={0.5} strokeLinecap="round" />
        {/* sunrise / sunset markers */}
        <Circle cx={sunriseX} cy={sunriseY} r={3} fill={COLORS.gold} />
        <Circle cx={sunsetX} cy={sunsetY} r={3} fill={COLORS.lapisLight} />

        {/* 24-hour ticks */}
        {Array.from({ length: 24 }, (_, h) => {
          const d = ((h - 12) / 24) * 360;
          const [x0, y0] = pol(R_TICK, d);
          const [x1, y1] = pol(R_TICK - (h % 6 === 0 ? 9 : 5), d);
          return <Line key={h} x1={x0} y1={y0} x2={x1} y2={y1} stroke={COLORS.dim} strokeWidth={h % 6 === 0 ? 1.2 : 0.6} opacity={0.6} />;
        })}
        {[['0', 180], ['6', 270], ['12', 0], ['18', 90]].map(([lbl, d]) => {
          const [x, y] = pol(R_TICK - 20, d as number);
          return <SvgText key={lbl as string} x={x} y={(y as number) + 4} fill={COLORS.dim} fontSize={10} textAnchor="middle">{lbl as string}</SvgText>;
        })}

        {/* planetary hours ring */}
        {schedule.hours.map((h) => {
          const start = timeDeg(h.start, tz);
          const delta = durationDeg(h.start, h.end);
          const isCur = h.index === schedule.currentHourIndex;
          const p = PLANET[h.planet]!;
          const [gx, gy] = pol(R_HOUR, start + delta / 2);
          return (
            <G key={h.index}>
              <Path d={arcPath(R_HOUR, start + 0.6, delta - 1.2)} stroke={p.color} strokeWidth={isCur ? 22 : 15}
                fill="none" opacity={isCur ? 0.95 : h.isDay ? 0.34 : 0.22} strokeLinecap="butt" />
              <SvgText x={gx} y={gy + (isCur ? 5 : 4)} fill={isCur ? '#0b0b12' : p.color}
                fontSize={isCur ? 15 : 10} fontWeight={isCur ? '700' : '400'} textAnchor="middle" opacity={isCur ? 1 : 0.85}>
                {p.glyph}
              </SvgText>
            </G>
          );
        })}

        {/* salah windows ring */}
        {schedule.salahArcs.map((a) => {
          const start = timeDeg(a.start, tz);
          const delta = durationDeg(a.start, a.end);
          const s = SALAH[a.window]!;
          const isCur = a.window === schedule.currentSalahWindow;
          const [lx, ly] = pol(R_SALAH, start + delta / 2);
          return (
            <G key={a.window}>
              <Path d={arcPath(R_SALAH, start + 0.8, delta - 1.6)} stroke={s.color} strokeWidth={isCur ? 18 : 12}
                fill="none" opacity={isCur ? 0.95 : 0.32} strokeLinecap="butt" />
              <SvgText x={lx} y={ly + 3} fill={isCur ? '#0b0b12' : s.color} fontSize={8}
                fontWeight={isCur ? '700' : '400'} textAnchor="middle" opacity={isCur ? 1 : 0.9}>
                {s.short}
              </SvgText>
            </G>
          );
        })}

        {/* center disc + now-needle */}
        <Circle cx={C} cy={C} r={R_DISC} fill="url(#core)" stroke={COLORS.copper} strokeWidth={1} opacity={0.95} />
        <Line x1={C} y1={C} x2={handX} y2={handY} stroke={COLORS.gold} strokeWidth={2} strokeLinecap="round" />
        <Circle cx={handX} cy={handY} r={4} fill={COLORS.gold} />
        <Circle cx={C} cy={C} r={4} fill={COLORS.copper} />
      </Svg>

      {/* crisp typographic center overlay */}
      <View style={styles.center} pointerEvents="none">
        <Text style={styles.clock}>{clock}</Text>
        <Text style={[styles.hour, { color: curPlanet.color }]}>
          {curPlanet.glyph} {cur.planet} · hour {cur.hourNumber}
        </Text>
        <Text style={[styles.salah, { color: curSalah.color }]}>{curSalah.label} · Line {schedule.currentSalahLine}</Text>
        <Text style={styles.lord}>day of {PLANET[schedule.dayLord]!.glyph} {schedule.dayLord}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%', aspectRatio: 1, maxWidth: 400, alignSelf: 'center', marginTop: 4 },
  center: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  clock: { color: COLORS.text, fontFamily: FONTS.mono, fontSize: 42, letterSpacing: 1, fontVariant: ['tabular-nums'] },
  hour: { fontFamily: FONTS.bodySemi, fontSize: 16, marginTop: 4 },
  salah: { fontFamily: FONTS.body, fontSize: 13, marginTop: 4 },
  lord: { color: COLORS.dim, fontFamily: FONTS.mono, fontSize: 11, marginTop: 6 },
});
