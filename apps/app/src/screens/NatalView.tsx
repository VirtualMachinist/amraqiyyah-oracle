/**
 * The Natal Chart — the whole Amraqiyyah substrate cast for the birth moment,
 * in AGOSS. Mechanics build: a transparent readout (aesthetics come next).
 *
 * Enter birth date · time · place (+ optional Arabic name); the chart yields the
 * seven Chaldean placements (mansion + house in AGOSS), the Ascendant, the
 * Mode-A natal hexagram, both natal mansions, moon phase, and the birth
 * substrate. Interpretation is deferred canon (Oracle §7.4.4) — this shows
 * placements, not verdicts.
 */
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS } from '../theme';
import { LocationPicker } from './LocationPicker';
import { natalChart, type GeoLocation, type NatalChart } from '@amraqiyyah/engine';

const PLANET_GLYPH: Record<string, string> = {
  Sun: '☉', Moon: '☾', Mercury: '☿', Venus: '♀', Mars: '♂', Jupiter: '♃', Saturn: '♄',
};

/** Wall-clock time in a given IANA timezone → the exact UTC instant. */
function zonedToUtc(y: number, mo: number, d: number, h: number, mi: number, tz: string): Date {
  const guess = Date.UTC(y, mo - 1, d, h, mi);
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: tz, hour12: false, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
  const parts: Record<string, number> = {};
  for (const p of dtf.formatToParts(new Date(guess))) if (p.type !== 'literal') parts[p.type] = Number(p.value);
  const asUtc = Date.UTC(parts.year!, parts.month! - 1, parts.day!, parts.hour! === 24 ? 0 : parts.hour!, parts.minute!, parts.second!);
  const offset = asUtc - guess;
  return new Date(guess - offset);
}

export function NatalView() {
  const [place, setPlace] = useState<{ loc: GeoLocation; label: string } | null>(null);
  const [name, setName] = useState('');
  const [y, setY] = useState('1990');
  const [mo, setMo] = useState('1');
  const [d, setD] = useState('1');
  const [h, setH] = useState('12');
  const [mi, setMi] = useState('00');
  const [chart, setChart] = useState<NatalChart | null>(null);
  const [error, setError] = useState<string | null>(null);

  const cast = () => {
    try {
      if (!place) {
        setError('Choose a birthplace first.');
        return;
      }
      const nums = [y, mo, d, h, mi].map(Number);
      if (nums.some((n) => !Number.isFinite(n))) {
        setError('Enter a valid date and time.');
        return;
      }
      const [Y, MO, D, H, MI] = nums as [number, number, number, number, number];
      const birth = zonedToUtc(Y, MO, D, H, MI, place.loc.tz);
      setChart(natalChart(birth, place.loc, name || undefined));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  return (
    <ScrollView style={styles.body} contentContainerStyle={{ paddingBottom: 64 }}>
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Birth moment</Text>
        <Text style={styles.fieldLabel}>Date &amp; time (local to birthplace)</Text>
        <View style={styles.dtRow}>
          <Field value={y} onChange={setY} ph="YYYY" w={64} />
          <Field value={mo} onChange={setMo} ph="MM" w={44} />
          <Field value={d} onChange={setD} ph="DD" w={44} />
          <Text style={styles.dtSep}>·</Text>
          <Field value={h} onChange={setH} ph="HH" w={44} />
          <Field value={mi} onChange={setMi} ph="MM" w={44} />
        </View>
        <Text style={styles.fieldLabel}>Birthplace</Text>
        <LocationPicker label={place?.label ?? 'Choose a birthplace'} onChange={(loc, label) => setPlace({ loc, label })} />
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Name in Arabic — for the identity mansion (optional)"
          placeholderTextColor={COLORS.dim}
        />
        <Pressable style={styles.button} onPress={cast}>
          <Text style={styles.buttonText}>Cast the natal chart</Text>
        </Pressable>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>

      {chart && <NatalResult chart={chart} />}
    </ScrollView>
  );
}

function Field({ value, onChange, ph, w }: { value: string; onChange: (t: string) => void; ph: string; w: number }) {
  return (
    <TextInput
      style={[styles.dtField, { width: w }]}
      value={value}
      onChangeText={onChange}
      placeholder={ph}
      placeholderTextColor={COLORS.dim}
      keyboardType="number-pad"
    />
  );
}

function NatalResult({ chart }: { chart: NatalChart }) {
  const hex = chart.natalHexagram;
  const S = chart.substrate.layers;
  const moonPct = Math.round(chart.moon.illumination * 100);
  return (
    <View>
      <View style={[styles.panel, { borderColor: COLORS.copper }]}>
        <Text style={styles.panelTitle}>Natal Hexagram</Text>
        <Text style={styles.hexBig}>{hex.number} — {hex.name}</Text>
        <Text style={styles.dim}>{hex.upper} over {hex.lower} · {hex.suit} suit · {hex.divineName}</Text>
        <Text style={styles.dimSmall}>Mode A at birth — sky (upper) = Moon-mansion ruler, ground (lower) = hour ruler</Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>The Rising — Ascendant</Text>
        <Text style={styles.text}>
          House {chart.ascendant.house} {chart.ascendant.sign} · mansion {chart.ascendant.mansion.number} {chart.ascendant.mansion.nameAr}
        </Text>
        <Text style={styles.dimSmall}>AGOSS {chart.ascendant.agossLon.toFixed(2)}° · {chart.ascendant.degreeInMansion.toFixed(2)}° into the mansion (ruler {chart.ascendant.mansion.ruler})</Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>The Seven — placements in AGOSS</Text>
        {chart.placements.map((p) => (
          <View key={p.planet} style={styles.placeRow}>
            <Text style={styles.placeGlyph}>{PLANET_GLYPH[p.planet]}</Text>
            <Text style={styles.placePlanet}>{p.planet}</Text>
            <Text style={styles.placeHouse}>H{p.house} {p.sign}</Text>
            <Text style={styles.placeMansion}>{p.mansion.number} {p.mansion.nameAr}</Text>
            <Text style={styles.placeDeg}>{p.agossLon.toFixed(1)}°</Text>
          </View>
        ))}
        <Text style={styles.dimSmall}>House = 30° AGOSS arc (§7.4.4) · mansion = 12°51′ arc · ruler = mansion's Chaldean planet</Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>The Two Natal Mansions</Text>
        {chart.nameMansion ? (
          <Text style={styles.text}>
            <Text style={{ color: COLORS.gold }}>Identity (name)</Text> — mansion {chart.nameMansion.mansionNumber} {chart.nameMansion.mansion.nameAr} · ruler {chart.nameMansion.mansion.ruler} · standing line {chart.nameMansion.standingLine}
          </Text>
        ) : (
          <Text style={styles.dimSmall}>Add an Arabic name above for the identity mansion (Ibn Arabi, §7.4).</Text>
        )}
        <Text style={styles.text}>
          <Text style={{ color: COLORS.lapisLight }}>Astronomical (birth Moon)</Text> — mansion {chart.placements[1]!.mansion.number} {chart.placements[1]!.mansion.nameAr} · ruler {chart.placements[1]!.mansion.ruler}
        </Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Birth substrate &amp; moon</Text>
        <Text style={styles.mono}>Moon: {moonPct}% illuminated, {chart.moon.waxing ? 'waxing' : 'waning'}</Text>
        <Text style={styles.mono}>Hijri: {S.hijri.day} {S.hijri.month_name} {S.hijri.year}{S.hijri.is_sacred_month ? ' ✦ sacred' : ''}</Text>
        <Text style={styles.mono}>Planetary hour: {S.planetary_hour.planet} ({S.planetary_hour.is_day ? 'day' : 'night'})</Text>
        <Text style={styles.mono}>Weekday: {S.week.day} ({S.week.planetary_lord})</Text>
        <Text style={styles.mono}>Salah window: {S.salah.current_window} → line {S.salah.hexagram_line}</Text>
        <Text style={styles.mono}>Season: {S.solar_season.current} day {S.solar_season.day_of_season}</Text>
        <Text style={styles.mono}>Age: {S.great_year.age_label} ({(S.great_year.age_completion * 100).toFixed(1)}%)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, paddingHorizontal: 16, marginTop: 12 },
  panel: { backgroundColor: COLORS.panel, borderRadius: 12, padding: 14, marginTop: 12, borderWidth: 1, borderColor: COLORS.line },
  panelTitle: { color: COLORS.text, fontWeight: '700', marginBottom: 8 },
  fieldLabel: { color: COLORS.dim, fontSize: 12, marginTop: 8, marginBottom: 4 },
  dtRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dtField: { backgroundColor: COLORS.panelSoft, color: COLORS.text, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 8, borderWidth: 1, borderColor: COLORS.line, textAlign: 'center' },
  dtSep: { color: COLORS.dim, fontSize: 18 },
  input: { backgroundColor: COLORS.panelSoft, color: COLORS.text, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, marginTop: 8, borderWidth: 1, borderColor: COLORS.line },
  button: { backgroundColor: COLORS.gold, borderRadius: 10, paddingVertical: 12, alignItems: 'center', marginTop: 12 },
  buttonText: { color: COLORS.bg, fontWeight: '700' },
  error: { color: COLORS.crimson, paddingTop: 10 },
  hexBig: { color: COLORS.gold, fontSize: 20, fontWeight: '700' },
  text: { color: COLORS.text, marginTop: 4 },
  dim: { color: COLORS.dim, marginTop: 4 },
  dimSmall: { color: COLORS.dim, fontSize: 11, marginTop: 6 },
  mono: { color: COLORS.teal, fontFamily: 'monospace' as never, fontSize: 12, marginTop: 3 },
  placeRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: COLORS.line },
  placeGlyph: { color: COLORS.gold, fontSize: 16, width: 22 },
  placePlanet: { color: COLORS.text, fontSize: 13, width: 66 },
  placeHouse: { color: COLORS.lapisLight, fontSize: 12, width: 92 },
  placeMansion: { color: COLORS.text, fontSize: 12, flex: 1 },
  placeDeg: { color: COLORS.dim, fontSize: 11 },
});
