/**
 * The slower wheels — the six temporal layers that turn beneath the day:
 * the week, the lunar mansion, the lunar month, the solar season, the harmonic
 * cycle, and the Great Year. Each is a small arc-meter: the same clock made
 * visible at a slower speed. Together with the Sacred Clock's three fast layers,
 * all nine Amraqiyyah temporal layers are shown as living dials.
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path, Text as SvgText } from 'react-native-svg';
import { COLORS } from '../theme';
import type { OracleInputs } from '@amraqiyyah/engine';

interface Moon { illumination: number; waxing: boolean }

/** Name the lunar phase from illumination + waxing/waning. */
function phaseName(m: Moon): string {
  const i = m.illumination;
  if (i < 0.03) return 'New';
  if (i > 0.97) return 'Full';
  if (Math.abs(i - 0.5) < 0.06) return m.waxing ? 'First Quarter' : 'Last Quarter';
  if (i < 0.5) return m.waxing ? 'Waxing Crescent' : 'Waning Crescent';
  return m.waxing ? 'Waxing Gibbous' : 'Waning Gibbous';
}

/** SVG path for the lit area of a moon disc (northern convention: waxing lit on the right). */
function moonLitPath(cx: number, cy: number, r: number, illum: number, waxing: boolean): string {
  const rx = r * Math.abs(1 - 2 * illum);
  const limbSweep = waxing ? 1 : 0;
  const termSweep = illum < 0.5 ? (waxing ? 0 : 1) : (waxing ? 1 : 0);
  return `M ${cx} ${cy - r} A ${r} ${r} 0 0 ${limbSweep} ${cx} ${cy + r} A ${rx.toFixed(2)} ${r} 0 0 ${termSweep} ${cx} ${cy - r} Z`;
}

const SZ = 104;
const CC = SZ / 2;
const R = 40;

function arc(fraction: number): string {
  const f = Math.max(0, Math.min(0.9999, fraction));
  const end = f * 360;
  const a = (end * Math.PI) / 180;
  const x1 = CC + R * Math.sin(a);
  const y1 = CC - R * Math.cos(a);
  const large = end > 180 ? 1 : 0;
  return `M ${CC} ${CC - R} A ${R} ${R} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
}

function Meter({
  label, fraction, center, sub, color,
}: { label: string; fraction: number; center: string; sub: string; color: string }) {
  return (
    <View style={styles.meter}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.dial}>
        <Svg viewBox={`0 0 ${SZ} ${SZ}`} width="100%" height="100%">
          <Circle cx={CC} cy={CC} r={R} fill="none" stroke={COLORS.line} strokeWidth={5} />
          <Path d={arc(fraction)} fill="none" stroke={color} strokeWidth={5} strokeLinecap="round" opacity={0.95} />
        </Svg>
        <View style={styles.dialCenter} pointerEvents="none">
          <Text style={[styles.centerText, { color }]} numberOfLines={1}>{center}</Text>
          <Text style={styles.subText} numberOfLines={1}>{sub}</Text>
        </View>
      </View>
    </View>
  );
}

/** The lunar-month meter, with a true drawn moon phase at its heart. */
function MoonMeter({ day, monthName, fraction, moon }: { day: number; monthName: string; fraction: number; moon: Moon }) {
  const MR = 15; // moon radius
  return (
    <View style={styles.meter}>
      <Text style={styles.label}>LUNAR MONTH</Text>
      <View style={styles.dial}>
        <Svg viewBox={`0 0 ${SZ} ${SZ}`} width="100%" height="100%">
          <Circle cx={CC} cy={CC} r={R} fill="none" stroke={COLORS.line} strokeWidth={5} />
          <Path d={arc(fraction)} fill="none" stroke={COLORS.lapisLight} strokeWidth={5} strokeLinecap="round" opacity={0.95} />
          {/* moon disc */}
          <Circle cx={CC} cy={CC - 8} r={MR} fill="#23263a" stroke={COLORS.line} strokeWidth={0.75} />
          <Path d={moonLitPath(CC, CC - 8, MR, moon.illumination, moon.waxing)} fill="#eae7f2" />
          <SvgText x={CC} y={CC + 22} fill={COLORS.text} fontSize={13} fontWeight="700" textAnchor="middle">
            {`day ${day}`}
          </SvgText>
        </Svg>
      </View>
      <Text style={styles.moonSub} numberOfLines={1}>{monthName} · {phaseName(moon)}</Text>
    </View>
  );
}

const WEEKDAYS = ['al-Ahad', 'al-Ithnayn', 'al-Thulatha', 'al-Arbiʿa', 'al-Khamis', 'al-Jumuʿa', 'al-Sabt'];

export function CycleMeters({ inputs, now, tz, moon }: { inputs: OracleInputs; now: Date; tz: string; moon: Moon }) {
  const L = inputs.layers;

  // weekday index 0=Sun..6=Sat in the location's timezone
  const wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(
    new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'short' }).format(now)
  );

  return (
    <View style={styles.grid}>
      <Meter
        label="THE WEEK"
        fraction={(wd + 1) / 7}
        center={WEEKDAYS[wd]?.replace('al-', '') ?? L.week.day}
        sub={L.week.planetary_lord}
        color={COLORS.lapisLight}
      />
      <Meter
        label="MANSION"
        fraction={L.mansion.number / 28}
        center={`${L.mansion.number}/28`}
        sub={L.mansion.name_ar}
        color={COLORS.copperLight}
      />
      <MoonMeter
        day={L.hijri.day}
        monthName={L.hijri.month_name}
        fraction={(L.hijri.day - 1) / 29.53}
        moon={moon}
      />
      <Meter
        label="SEASON"
        fraction={L.solar_season.day_of_season / 91}
        center={`${L.solar_season.day_of_season}/91`}
        sub={L.solar_season.current}
        color={COLORS.gold}
      />
      <Meter
        label="HARMONIC"
        fraction={L.harmonic_cycle.year_in_cycle / 33}
        center={`${L.harmonic_cycle.year_in_cycle}/33`}
        sub={`cycle ${L.harmonic_cycle.cycle_number}`}
        color={COLORS.teal}
      />
      <Meter
        label="GREAT YEAR"
        fraction={L.great_year.age_completion}
        center={`${Math.round(L.great_year.age_completion * 100)}%`}
        sub={L.great_year.age_label}
        color={COLORS.copper}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 16 },
  meter: { width: '31%', alignItems: 'center', marginBottom: 16 },
  label: { color: COLORS.dim, fontSize: 9, letterSpacing: 1, marginBottom: 4 },
  dial: { width: '100%', aspectRatio: 1 },
  dialCenter: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  centerText: { fontSize: 15, fontWeight: '700' },
  subText: { color: COLORS.dim, fontSize: 9, marginTop: 2, maxWidth: 90, textAlign: 'center' },
  moonSub: { color: COLORS.dim, fontSize: 9, marginTop: 2, maxWidth: 104, textAlign: 'center' },
});
