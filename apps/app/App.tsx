/**
 * The Amraqiyyah Oracle — app UI (web + iOS + Android via Expo; desktop via
 * the Electron shell wrapping the web export).
 *
 * Card imagery is pending the Deck Design Document. Placeholders honor the
 * ratified constraints: uniform backs, split faces (two regions on one front),
 * and sideways placement for the Planetary Agent.
 */
import React, { useEffect, useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  oracleInputs,
  daySchedule,
  moonPhaseInfo,
  performReading,
  PLATONIC_KEY_CARDS,
  DRAWABLE_FIELD_CARDS,
  BRIDGE_CARDS,
  COUNCIL_CARDS,
  hexagramByNumber,
  type GeoLocation,
  type OracleInputs,
  type ReadingResult,
  type ReadingMode,
  type Veil,
  type Hexagram,
} from '@amraqiyyah/engine';
import { COLORS } from './src/theme';
import { TextsView, type TextTarget } from './src/screens/TextsView';
import { SacredClock } from './src/screens/SacredClock';
import { CycleMeters } from './src/screens/CycleMeters';
import { LocationPicker } from './src/screens/LocationPicker';
import { cityForTz, cityLabel } from './src/geo';

/** A coherent starting place: the largest city in the device's own timezone. */
function deviceDefault(): { loc: GeoLocation; label: string } {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Chicago';
  const c = cityForTz(tz);
  if (c) return { loc: { lat: c.lat, lon: c.lon, tz: c.tz }, label: cityLabel(c) };
  return { loc: { lat: 41.8781, lon: -87.6298, tz: 'America/Chicago' }, label: 'Chicago, United States' };
}
const DEVICE_DEFAULT = deviceDefault();

type Tab = 'now' | 'reading' | 'texts' | 'journal';

const TAB_LABELS: Record<Tab, string> = {
  now: 'Now',
  reading: 'Reading',
  texts: 'Texts',
  journal: 'Journal',
};

export default function App() {
  const [tab, setTab] = useState<Tab>('now');
  const [location, setLocation] = useState<GeoLocation>(DEVICE_DEFAULT.loc);
  const [locationLabel, setLocationLabel] = useState<string>(DEVICE_DEFAULT.label);
  const [textTarget, setTextTarget] = useState<TextTarget | null>(null);

  const setPlace = (loc: GeoLocation, label: string) => {
    setLocation(loc);
    setLocationLabel(label);
  };

  const openText = (t: TextTarget) => {
    setTextTarget(t);
    setTab('texts');
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>The Amraqiyyah Oracle</Text>
        <Text style={styles.subtitle}>An instrument of directed dhikr — deterministic, transparent</Text>
      </View>
      <View style={styles.tabs}>
        {(['now', 'reading', 'texts', 'journal'] as Tab[]).map((t) => (
          <Pressable key={t} onPress={() => setTab(t)} style={[styles.tab, tab === t && styles.tabActive]}>
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{TAB_LABELS[t]}</Text>
          </Pressable>
        ))}
      </View>
      {tab === 'now' && <NowView location={location} locationLabel={locationLabel} onLocationChange={setPlace} />}
      {tab === 'reading' && <ReadingView location={location} onOpenText={openText} />}
      {tab === 'texts' && <TextsView target={textTarget} onConsumeTarget={() => setTextTarget(null)} />}
      {tab === 'journal' && <JournalView />}
    </View>
  );
}

// ---------------------------------------------------------------- Now view

function NowView({
  location,
  locationLabel,
  onLocationChange,
}: {
  location: GeoLocation;
  locationLabel: string;
  onLocationChange: (l: GeoLocation, label: string) => void;
}) {
  // The needle ticks each second; the heavier layers recompute each minute.
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const minuteKey = Math.floor(now.getTime() / 60000);

  const { inputs, schedule, moon, error } = useMemo(() => {
    try {
      const at = new Date(minuteKey * 60000);
      return {
        inputs: oracleInputs(at, location),
        schedule: daySchedule(location, at),
        moon: moonPhaseInfo(at),
        error: null as string | null,
      };
    } catch (e) {
      return { inputs: null, schedule: null, moon: null, error: e instanceof Error ? e.message : String(e) };
    }
  }, [location, minuteKey]);

  if (error) return <Text style={styles.error}>{error}</Text>;
  if (!inputs || !schedule || !moon) return <Text style={styles.dim}>Calculating the heavens…</Text>;

  const L = inputs.layers;
  return (
    <ScrollView style={styles.body} contentContainerStyle={{ paddingBottom: 48 }}>
      <Text style={styles.dateLine}>{inputs.amraqiyyah_date}</Text>
      <LocationPicker label={locationLabel} onChange={onLocationChange} />
      <SacredClock schedule={schedule} now={now} tz={location.tz} />
      <CycleMeters inputs={inputs} now={now} tz={location.tz} moon={moon} />
      <Text style={styles.sectionLabel}>All nine layers — in full</Text>
      <View style={styles.grid}>
        <LayerCard title="Planetary Hour" name={L.planetary_hour.divine_name}
          main={`${L.planetary_hour.planet} — hour ${L.planetary_hour.hour_number} (${L.planetary_hour.is_day ? 'day' : 'night'})`} />
        <LayerCard title="Salah Window" name={L.salah.divine_name}
          main={`${windowLabel(L.salah.current_window)} → Line ${L.salah.hexagram_line}`}
          sub={`Hizb: ${L.salah.hizb_half}`} />
        <LayerCard title="The Week" name={L.week.divine_name}
          main={`${L.week.day} (${L.week.planetary_lord})`}
          sub={L.week.is_sabt ? 'Axial — no line · sabt resonance · Psalm 92' : `Standing line ${L.week.standing_line}`} />
        <LayerCard title="Lunar Mansion" name={L.mansion.divine_name}
          main={`${L.mansion.number} — ${L.mansion.name_ar} (${L.mansion.planetary_ruler})`}
          sub={`Letter ${L.mansion.letter} · abjad ${L.mansion.abjad_value} · standing line ${L.mansion.standing_line}`} />
        <LayerCard title="Lunar Month" name="At-Tawwab"
          main={`${L.hijri.day} ${L.hijri.month_name} ${L.hijri.year}`}
          sub={L.hijri.is_sacred_month ? '✦ Sacred month — Line 6 resonance' : undefined} />
        <LayerCard title="Solar Season" name={L.solar_season.divine_name}
          main={`${L.solar_season.current} — day ${L.solar_season.day_of_season} → Line ${L.solar_season.active_line}`}
          sub={L.solar_season.threshold_state ? '⚠ SOLAR THRESHOLD — the turn itself' : undefined} />
        <LayerCard title="Harmonic Cycle" name={L.harmonic_cycle.divine_name}
          main={`Cycle ${L.harmonic_cycle.cycle_number}, year ${L.harmonic_cycle.year_in_cycle} of 33`}
          sub={`Next boundary ~${L.harmonic_cycle.next_boundary_ce} CE`} />
        <LayerCard title="Great Year" name={L.great_year.divine_name}
          main={`Age ${L.great_year.age_label} — ${(L.great_year.age_completion * 100).toFixed(1)}% complete`}
          sub={`Vernal ${L.great_year.vernal_equinox_agoss}° AGOSS · exits ~${L.great_year.age_exits_ce} · Return ~${L.great_year.conjunction_return_ce}`} />
      </View>
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Oracle inputs (Mode A)</Text>
        <Text style={styles.mono}>upper (sky): {inputs.oracle_inputs.mode_a_upper_trigram} — mansion ruler</Text>
        <Text style={styles.mono}>lower (ground): {inputs.oracle_inputs.mode_a_lower_trigram} — hour ruler</Text>
        <Text style={styles.mono}>Check 1 line {inputs.oracle_inputs.check_1_line} · Check 2 {inputs.oracle_inputs.check_2.active ? `ACTIVE line ${inputs.oracle_inputs.check_2.line}` : 'inactive'} · Check 3 line {inputs.oracle_inputs.check_3_line}</Text>
        <Text style={styles.mono}>Stellar Court: {inputs.oracle_inputs.stellar_court}</Text>
      </View>
    </ScrollView>
  );
}

function LayerCard({ title, name, main, sub }: { title: string; name: string; main: string; sub?: string }) {
  return (
    <View style={styles.layerCard}>
      <Text style={styles.layerTitle}>{title}</Text>
      <Text style={styles.layerMain}>{main}</Text>
      {sub ? <Text style={styles.layerSub}>{sub}</Text> : null}
      <Text style={styles.layerName}>{name}</Text>
    </View>
  );
}

// ------------------------------------------------------------ Reading view

interface Draws {
  platonicKeyCard: number;
  hexagramFieldCard?: number;
  bridgeCard?: number;
  agentCard?: number;
}

function drawModeB(): Draws {
  // The shuffle. Randomness here is the physical act of drawing in Mode B —
  // it never carries interpretive authority: every meaning-bearing output
  // (moving lines, seals, coordinates) is astronomical and deterministic.
  const pick = <T,>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)]!;
  return {
    platonicKeyCard: pick(PLATONIC_KEY_CARDS).cardNumber,
    hexagramFieldCard: pick(DRAWABLE_FIELD_CARDS).cardNumber,
    bridgeCard: pick(BRIDGE_CARDS).cardNumber,
    agentCard: pick(COUNCIL_CARDS).cardNumber,
  };
}

function ReadingView({ location, onOpenText }: { location: GeoLocation; onOpenText: (t: TextTarget) => void }) {
  const [mode, setMode] = useState<ReadingMode>('A');
  const [veil, setVeil] = useState<Veil>(5);
  const [question, setQuestion] = useState('');
  const [querentName, setQuerentName] = useState('');
  const [result, setResult] = useState<ReadingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = () => {
    try {
      const draws = mode === 'A' ? undefined : drawModeB();
      const r = performReading({
        mode,
        timestamp: new Date(),
        location,
        veil,
        question: question || undefined,
        querentNameArabic: querentName || undefined,
        draws,
      });
      setResult(r);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  return (
    <ScrollView style={styles.body} contentContainerStyle={{ paddingBottom: 48 }}>
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Mode</Text>
        <View style={styles.row}>
          {(['A', 'B', 'C'] as ReadingMode[]).map((m) => (
            <Pressable key={m} onPress={() => setMode(m)} style={[styles.choice, mode === m && styles.choiceActive]}>
              <Text style={[styles.choiceText, mode === m && styles.choiceTextActive]}>
                {m === 'A' ? 'A — Astronomical' : m === 'B' ? 'B — Deck' : 'C — Resonance'}
              </Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.panelTitle}>Veil (question depth)</Text>
        <View style={styles.rowWrap}>
          {([1, 2, 3, 4, 5, 6, 7, 8, 9] as Veil[]).map((v) => (
            <Pressable key={v} onPress={() => setVeil(v)} style={[styles.veil, veil === v && styles.choiceActive]}>
              <Text style={[styles.choiceText, veil === v && styles.choiceTextActive]}>{v}</Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.dimSmall}>{VEIL_LABELS[veil]}</Text>
        <TextInput style={styles.inputWide} value={question} onChangeText={setQuestion}
          placeholder="The question (optional)" placeholderTextColor={COLORS.dim} />
        <TextInput style={styles.inputWide} value={querentName} onChangeText={setQuerentName}
          placeholder="Querent name in Arabic — natal mansion (optional)" placeholderTextColor={COLORS.dim} />
        <Pressable style={styles.button} onPress={run}>
          <Text style={styles.buttonText}>
            {mode === 'A' ? 'Read the sky' : mode === 'B' ? 'Draw and read' : 'Draw and compare'}
          </Text>
        </Pressable>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
      {result && <ReadingResultView result={result} onOpenText={onOpenText} />}
    </ScrollView>
  );
}

/** Turn a reading's Quranic coordinate into a Texts destination. */
function quranTarget(q: ReadingResult['coordinates']['quranic']): TextTarget {
  if (q.muqattaatSurah) return { book: 'quran', kind: 'surah', n: q.muqattaatSurah };
  return { book: 'quran', kind: 'hizb', n: q.hizb };
}

const VEIL_LABELS: Record<number, string> = {
  1: "This hour's decision — Al-Qadir",
  2: "Today's conduct — Ar-Razzaq",
  3: "The week's work — Al-Jami'",
  4: 'The current station — Al-Hadi',
  5: "The month's project — At-Tawwab",
  6: "The season's strategy — Al-Musawwir",
  7: "The year's direction — Al-Malik",
  8: 'The life-stage — Al-Wahhab',
  9: 'The civilizational question — Al-Baqi',
};

function ReadingResultView({ result, onOpenText }: { result: ReadingResult; onOpenText: (t: TextTarget) => void }) {
  const [saved, setSaved] = useState(false);
  const z = result.coordinates.zabur;
  const q = result.coordinates.quranic;
  const save = async () => {
    const raw = (await AsyncStorage.getItem('journal')) ?? '[]';
    const journal = JSON.parse(raw) as unknown[];
    journal.unshift({
      at: result.calendar.timestamp,
      mode: result.mode,
      veil: result.veil,
      hexagram: result.hexagram?.number ?? null,
      transformed: result.transformed?.number ?? null,
      resonance: result.movingLines?.resonance ?? 'hold',
      psalm: result.coordinates.zabur.psalm,
      juz: result.coordinates.quranic.juz,
      names: result.activeNames.map((n) => n.name),
    });
    await AsyncStorage.setItem('journal', JSON.stringify(journal.slice(0, 200)));
    setSaved(true);
  };

  if (result.holdAndWitness) {
    return (
      <View style={[styles.panel, { borderColor: COLORS.gold }]}>
        <Text style={[styles.panelTitle, { color: COLORS.gold }]}>State 3 — The Unmoved Axis</Text>
        <Text style={styles.text}>Both gates are open. Hold position. Do not act. Witness.</Text>
        <Text style={styles.dim}>No hexagram is named. No lines move. The texts speak where geometry has gone still:</Text>
        <Pressable onPress={() => onOpenText(quranTarget(q))}>
          <Text style={styles.monoLink}>Quranic: Juz {q.juz}, Hizb {q.hizb} ›</Text>
        </Pressable>
        <Pressable onPress={() => onOpenText({ book: 'zabur', kind: 'psalm', n: z.psalm, verse: z.verse })}>
          <Text style={styles.monoLink}>Zabur: Psalm {z.psalm}:{z.verse} ›</Text>
        </Pressable>
      </View>
    );
  }

  const hex = result.hexagram!;
  const ml = result.movingLines!;
  return (
    <View>
      {result.stellarCourt.state !== 'none' && (
        <View style={[styles.panel, { borderColor: COLORS.teal }]}>
          <Text style={[styles.panelTitle, { color: COLORS.teal }]}>
            {result.stellarCourt.state === 'witness_star' ? 'The Witness Star is active — ground speaks, sky silenced'
              : 'The Pleiades Gate is open — sky speaks, ground silenced'}
          </Text>
        </View>
      )}
      <View style={styles.cardsRow}>
        <PlaceholderCard label="Axial Witness" sub="Hex 52 · As-Samad" kind="axial" />
        <PlaceholderCard label={result.platonicKey.name} sub={`${result.platonicKey.element} · ${result.platonicKey.divineName}`} kind="key" />
        {result.agent && (
          <PlaceholderCard label={result.agent.name} sub={`${result.agent.planet}${result.agent.agentResonance ? ' · RESONANCE' : ''}`} kind="agent" sideways />
        )}
        {result.bridge && (
          <PlaceholderCard
            label={`Bridge ${result.bridge.bridgeNumber}`}
            sub={result.bridge.orientation === 'upright' ? result.bridge.yangFace : result.bridge.orientation === 'inverted' ? result.bridge.yinFace : 'both faces equal'}
            kind="bridge"
            split
            orientation={result.bridge.orientation}
          />
        )}
      </View>
      <View style={styles.hexRow}>
        <HexagramFigure hexagram={hex} movingLines={ml.movingLines} title="The situation" />
        {result.transformed && (
          <HexagramFigure hexagram={result.transformed} movingLines={[]} title="The trajectory (zanshin)" />
        )}
      </View>
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Resonance: {ml.resonance.replace('_', ' ').toUpperCase()}</Text>
        {ml.checks.map((c) => (
          <Text key={c.check} style={styles.mono}>
            Check {c.check} ({c.clock}): Line {c.line}
          </Text>
        ))}
        {ml.thresholdLines && <Text style={[styles.mono, { color: COLORS.gold }]}>Solar Threshold — Lines 6 and 1: the reading is about the turn itself</Text>}
        <Text style={styles.dimSmall}>Dominant check for Veil {result.veil}: Check {result.dominantCheck}</Text>
      </View>
      {result.resonanceCheck && (
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Mode C — Resonance Check</Text>
          <Text style={styles.mono}>Astronomical: Hex {result.resonanceCheck.astronomicalHexagram} · Drawn: Hex {result.resonanceCheck.drawnHexagram}</Text>
          <Text style={[styles.text, { color: result.resonanceCheck.verdict === 'discordance' ? COLORS.crimson : COLORS.teal }]}>
            {result.resonanceCheck.verdict === 'concordance' ? 'Concordance — aligned with the cosmic grain'
              : result.resonanceCheck.verdict === 'suit_concordance' ? 'Suit concordance — the register agrees'
              : 'Discordance — moving against the grain'}
          </Text>
        </View>
      )}
      {result.concordance && (
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Concordance (Step 8)</Text>
          <Text style={styles.mono}>Key {result.concordance.keyElement} vs {result.concordance.comparedTo}</Text>
          <Text style={styles.text}>{result.concordance.result}</Text>
        </View>
      )}
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>The six coordinates</Text>
        <Text style={styles.mono}>1 · Hexagram: {hex.number} {hex.name} → {result.transformed?.number} {result.transformed?.name}</Text>
        <Text style={styles.mono}>2 · Divine Names: {result.activeNames.map((n) => n.name).join(' · ')}</Text>
        <Pressable onPress={() => onOpenText(quranTarget(q))}>
          <Text style={styles.monoLink}>
            3 · Quranic: {q.muqattaatSurah
              ? `Surah ${q.muqattaatSurah} (Muqatta'at override)`
              : `Juz ${q.juz}, Hizb ${q.hizb}`} — read ›
          </Text>
        </Pressable>
        <Pressable onPress={() => onOpenText({ book: 'zabur', kind: 'psalm', n: z.psalm, verse: z.verse })}>
          <Text style={styles.monoLink}>
            4 · Zabur: Psalm {z.psalm}:{z.verse}
            {z.royalPsalm ? ` (royal: ${z.royalPsalm})` : ''}
            {z.sabtPsalm ? ` · Sabt standing: Psalm ${z.sabtPsalm}` : ''} — read ›
          </Text>
        </Pressable>
        {z.royalPsalm && z.royalPsalm !== z.psalm ? (
          <Pressable onPress={() => onOpenText({ book: 'zabur', kind: 'psalm', n: z.royalPsalm! })}>
            <Text style={styles.monoLinkDim}>   ↳ read the royal psalm {z.royalPsalm} ›</Text>
          </Pressable>
        ) : null}
        <Text style={styles.mono}>
          5 · Abjad: mansion letter {result.coordinates.abjad.mansionLetter} ({result.coordinates.abjad.mansionAbjad}) → standing line {result.coordinates.abjad.standingLine}
          {result.coordinates.abjad.natal ? ` · natal mansion ${result.coordinates.abjad.natal.mansionNumber}${result.coordinates.abjad.natal.natalTransit ? ' — NATAL TRANSIT' : ''}` : ''}
        </Text>
        <Text style={styles.mono}>6 · Temporal: {result.calendar.amraqiyyah_date}</Text>
      </View>
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Active Names — dhikr before interpretation</Text>
        {result.activeNames.map((n, i) => (
          <Text key={i} style={styles.text}>
            <Text style={{ color: COLORS.gold }}>{n.name}</Text>
            {n.arabic ? `  ${n.arabic}` : ''} {n.meaning ? `— ${n.meaning}` : ''} <Text style={styles.dimSmall}>({n.role})</Text>
          </Text>
        ))}
      </View>
      <Pressable style={[styles.button, saved && { opacity: 0.5 }]} onPress={save} disabled={saved}>
        <Text style={styles.buttonText}>{saved ? 'Saved to journal' : 'Save to journal'}</Text>
      </Pressable>
    </View>
  );
}

// -------------------------------------------------------- Hexagram figure

function HexagramFigure({ hexagram, movingLines, title }: { hexagram: Hexagram; movingLines: number[]; title: string }) {
  // Render lines top (6) to bottom (1).
  const rows = [5, 4, 3, 2, 1, 0].map((i) => ({
    index: i + 1,
    yang: hexagram.lines[i]!,
    moving: movingLines.includes(i + 1),
  }));
  return (
    <View style={styles.hexFigure}>
      <Text style={styles.dimSmall}>{title}</Text>
      <Text style={styles.hexTitle}>
        {hexagram.number} — {hexagram.name}
      </Text>
      {rows.map((r) => (
        <View key={r.index} style={styles.hexLineRow}>
          {r.yang ? (
            <View style={[styles.yangLine, r.moving && styles.movingLine]} />
          ) : (
            <View style={styles.yinRow}>
              <View style={[styles.yinLine, r.moving && styles.movingLine]} />
              <View style={styles.yinGap} />
              <View style={[styles.yinLine, r.moving && styles.movingLine]} />
            </View>
          )}
          {r.moving && <Text style={styles.movingMark}>●</Text>}
        </View>
      ))}
      <Text style={styles.dimSmall}>
        {hexagram.upper} over {hexagram.lower} · {hexagram.suit === 'Axial' ? 'Threshold/Axial' : `${hexagram.suit} suit`}
      </Text>
      <Text style={[styles.dimSmall, { color: COLORS.gold }]}>{hexagram.divineName}</Text>
    </View>
  );
}

// ------------------------------------------------------- Card placeholders

function PlaceholderCard({
  label,
  sub,
  kind,
  sideways,
  split,
  orientation,
}: {
  label: string;
  sub: string;
  kind: 'axial' | 'key' | 'agent' | 'bridge';
  sideways?: boolean;
  split?: boolean;
  orientation?: 'upright' | 'inverted' | 'sideways';
}) {
  const rotate = sideways || orientation === 'sideways' ? '90deg' : orientation === 'inverted' ? '180deg' : '0deg';
  return (
    <View style={styles.cardSlot}>
      <View style={[styles.card, { transform: [{ rotate }] }]}>
        {split ? (
          <View style={{ flex: 1 }}>
            <View style={[styles.cardHalf, { backgroundColor: '#2a2438' }]}>
              <Text style={styles.cardHalfText}>yang</Text>
            </View>
            <View style={[styles.cardHalf, { backgroundColor: '#1c2436' }]}>
              <Text style={styles.cardHalfText}>yin</Text>
            </View>
          </View>
        ) : (
          <View style={styles.cardFace}>
            <Text style={styles.cardGlyph}>{kind === 'axial' ? '☶' : kind === 'key' ? '◈' : '✶'}</Text>
          </View>
        )}
      </View>
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={styles.cardSub}>{sub}</Text>
    </View>
  );
}

// ------------------------------------------------------------ Journal view

function JournalView() {
  const [entries, setEntries] = useState<any[]>([]);
  useEffect(() => {
    AsyncStorage.getItem('journal').then((raw) => setEntries(raw ? JSON.parse(raw) : []));
  }, []);
  return (
    <ScrollView style={styles.body} contentContainerStyle={{ paddingBottom: 48 }}>
      <Text style={styles.panelTitle}>Reading record</Text>
      <Text style={styles.dimSmall}>
        The accumulated record feeds the first Sirian Cycle review (~2076 CE).
      </Text>
      {entries.length === 0 && <Text style={styles.dim}>No readings saved yet.</Text>}
      {entries.map((e, i) => (
        <View key={i} style={styles.panel}>
          <Text style={styles.mono}>{new Date(e.at).toLocaleString()} · Mode {e.mode} · Veil {e.veil}</Text>
          <Text style={styles.text}>
            {e.hexagram ? `Hex ${e.hexagram} → ${e.transformed}` : 'Hold and witness'} · {e.resonance}
          </Text>
          <Text style={styles.dimSmall}>Juz {e.juz} · Psalm {e.psalm} · {Array.isArray(e.names) ? e.names.join(', ') : ''}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

// ------------------------------------------------------------------ styles

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg, paddingTop: 48 },
  header: { paddingHorizontal: 20, paddingBottom: 8 },
  title: { color: COLORS.gold, fontSize: 24, fontWeight: '700', letterSpacing: 0.5 },
  subtitle: { color: COLORS.dim, fontSize: 12, marginTop: 2 },
  tabs: { flexDirection: 'row', paddingHorizontal: 16, gap: 8, marginTop: 8 },
  tab: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: COLORS.panel },
  tabActive: { backgroundColor: COLORS.gold },
  tabText: { color: COLORS.dim, fontWeight: '600' },
  tabTextActive: { color: COLORS.bg },
  body: { flex: 1, paddingHorizontal: 16, marginTop: 12 },
  dateLine: { color: COLORS.text, fontSize: 16, fontWeight: '600', marginBottom: 8 },
  sectionLabel: { color: COLORS.dim, fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 20, marginBottom: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  layerCard: {
    backgroundColor: COLORS.panel, borderRadius: 12, padding: 12, minWidth: 240, flexGrow: 1, flexBasis: '45%',
    borderWidth: 1, borderColor: COLORS.line,
  },
  layerTitle: { color: COLORS.dim, fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 },
  layerMain: { color: COLORS.text, fontSize: 15, fontWeight: '600', marginTop: 4 },
  layerSub: { color: COLORS.dim, fontSize: 12, marginTop: 2 },
  layerName: { color: COLORS.gold, fontSize: 12, marginTop: 6 },
  panel: { backgroundColor: COLORS.panel, borderRadius: 12, padding: 14, marginTop: 12, borderWidth: 1, borderColor: COLORS.line },
  panelTitle: { color: COLORS.text, fontWeight: '700', marginBottom: 6 },
  text: { color: COLORS.text, marginTop: 2 },
  dim: { color: COLORS.dim, padding: 16 },
  dimSmall: { color: COLORS.dim, fontSize: 11, marginTop: 4 },
  mono: { color: COLORS.teal, fontFamily: 'monospace' as never, fontSize: 12, marginTop: 2 },
  monoLink: { color: COLORS.copperLight, fontFamily: 'monospace' as never, fontSize: 12, marginTop: 4, textDecorationLine: 'underline' },
  monoLinkDim: { color: COLORS.dim, fontFamily: 'monospace' as never, fontSize: 11, marginTop: 2 },
  error: { color: COLORS.crimson, padding: 12 },
  row: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  rowWrap: { flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginBottom: 4 },
  choice: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, backgroundColor: COLORS.panelSoft, marginBottom: 8 },
  choiceActive: { backgroundColor: COLORS.gold },
  choiceText: { color: COLORS.dim, fontSize: 13, fontWeight: '600' },
  choiceTextActive: { color: COLORS.bg },
  veil: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.panelSoft, alignItems: 'center', justifyContent: 'center' },
  input: { backgroundColor: COLORS.panelSoft, color: COLORS.text, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6, width: 90 },
  inputWide: { backgroundColor: COLORS.panelSoft, color: COLORS.text, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, marginTop: 8 },
  button: { backgroundColor: COLORS.gold, borderRadius: 10, paddingVertical: 12, alignItems: 'center', marginTop: 12 },
  buttonSmall: { backgroundColor: COLORS.gold, borderRadius: 8, paddingVertical: 6, paddingHorizontal: 12 },
  buttonText: { color: COLORS.bg, fontWeight: '700' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  cardsRow: { flexDirection: 'row', gap: 12, marginTop: 12, flexWrap: 'wrap' },
  cardSlot: { alignItems: 'center', width: 110 },
  card: {
    width: 72, height: 108, borderRadius: 8, backgroundColor: COLORS.panelSoft,
    borderWidth: 1.5, borderColor: COLORS.gold, overflow: 'hidden',
  },
  cardFace: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  cardGlyph: { color: COLORS.gold, fontSize: 30 },
  cardHalf: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  cardHalfText: { color: COLORS.dim, fontSize: 10, textTransform: 'uppercase', letterSpacing: 2 },
  cardLabel: { color: COLORS.text, fontSize: 12, fontWeight: '600', marginTop: 6, textAlign: 'center' },
  cardSub: { color: COLORS.dim, fontSize: 10, textAlign: 'center' },
  hexRow: { flexDirection: 'row', gap: 16, marginTop: 12, flexWrap: 'wrap' },
  hexFigure: { backgroundColor: COLORS.panel, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: COLORS.line, minWidth: 220, flexGrow: 1 },
  hexTitle: { color: COLORS.text, fontWeight: '700', marginBottom: 8 },
  hexLineRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 3, height: 12 },
  yangLine: { width: 120, height: 8, backgroundColor: COLORS.yang, borderRadius: 2 },
  yinRow: { flexDirection: 'row', width: 120 },
  yinLine: { flex: 1, height: 8, backgroundColor: COLORS.yin, borderRadius: 2 },
  yinGap: { width: 24 },
  movingLine: { backgroundColor: COLORS.crimson },
  movingMark: { color: COLORS.crimson, marginLeft: 8, fontSize: 10 },
});

function windowLabel(w: string): string {
  const map: Record<string, string> = {
    tahajjud: 'Tahajjud', fajr: 'Fajr', duha: 'Duha',
    dhuhr_asr: 'Dhuhr–Asr', asr_maghrib: 'Asr–Maghrib', maghrib_isha: 'Maghrib–Isha',
  };
  return map[w] ?? w;
}
