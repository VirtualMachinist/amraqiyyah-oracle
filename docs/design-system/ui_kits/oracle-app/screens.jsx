/* Oracle app screens — compose the design-system primitives into the five
   product surfaces. Demo data stands in for the deterministic engine. */
const NS = window.AmraqiyyahOracleDesignSystem_484c79;
const { Button, TabBar, SegmentedControl, VeilSelector, Field, Panel, LayerCard, Medallion, DivineName, MonoLine, Meter, Hexagram, OracleCard, VerseRow, DeckCard } = NS;

const eyebrow = { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--dim)", margin: "20px 0 6px" };

// ───────────────────────────── Now ─────────────────────────────
const LAYERS = [
  { title: "Planetary Hour", main: "Sun — hour 3 (day)", name: "Al-Malik" },
  { title: "Salah Window", main: "Duha → Line 3", sub: "Hizb: 1", name: "Al-Fattah" },
  { title: "The Week", main: "al-Ahad (Sun)", sub: "Standing line 1", name: "Al-Jami'" },
  { title: "Lunar Mansion", main: "9 — Al-Haq'a (Mercury)", sub: "Letter Ṭ · abjad 9 · standing line 3", name: "Al-Alim" },
  { title: "Lunar Month", main: "17 Ramaḍān 1447", sub: "✦ Sacred month — Line 6 resonance", name: "At-Tawwab" },
  { title: "Solar Season", main: "Spring — day 40 → Line 3", name: "Al-Musawwir" },
  { title: "Harmonic Cycle", main: "Cycle 61, year 20 of 33", sub: "Next boundary ~2031 CE", name: "Al-Muhsi" },
  { title: "Great Year", main: "Age IV — 90.7% complete", sub: "Vernal 92.79° AGOSS · exits ~2225 · Return ~8667", name: "Al-Baqi" },
];
function NowScreen() {
  return (
    <div>
      <div style={{ fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>
        al-Ahad · 17 Ramaḍān 1447 · Mansion 9 · Age IV
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span style={{ flex: 1, color: "var(--text)", fontSize: 14, fontWeight: 600 }}>📍 Chicago, United States</span>
        <Button variant="ghost" size="sm">Use my location</Button>
      </div>
      <window.SacredClock />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 20, justifyItems: "center" }}>
        <Meter label="THE WEEK" fraction={1 / 7} center="Ahad" sub="Sun" color="var(--lapis-light)" size={92} />
        <Meter label="MANSION" fraction={9 / 28} center="9/28" sub="Al-Haq'a" color="var(--copper-light)" size={92} />
        <Meter label="LUNAR MONTH" fraction={16 / 29.53} center="day 17" sub="Ramaḍān" color="var(--lapis-light)" size={92} />
        <Meter label="SEASON" fraction={40 / 91} center="40/91" sub="Spring" color="var(--gold)" size={92} />
        <Meter label="HARMONIC" fraction={20 / 33} center="20/33" sub="cycle 61" color="var(--teal)" size={92} />
        <Meter label="GREAT YEAR" fraction={0.907} center="91%" sub="Age IV" color="var(--copper)" size={92} />
      </div>
      <div style={eyebrow}>All nine layers — in full</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {LAYERS.map((l) => <LayerCard key={l.title} {...l} />)}
      </div>
      <div style={{ marginTop: 12 }}>
        <Panel title="Oracle inputs (Mode A)">
          <MonoLine>upper (sky): Fire — mansion ruler</MonoLine>
          <MonoLine>lower (ground): Earth — hour ruler</MonoLine>
          <MonoLine>Check 1 line 4 · Check 2 ACTIVE line 3 · Check 3 line 6</MonoLine>
          <MonoLine>Stellar Court: none</MonoLine>
        </Panel>
      </div>
    </div>
  );
}

// ─────────────────────────── Reading ───────────────────────────
const VEIL_LABELS = {
  1: "This hour's decision — Al-Qadir", 2: "Today's conduct — Ar-Razzaq", 3: "The week's work — Al-Jami'",
  4: "The current station — Al-Hadi", 5: "The month's project — At-Tawwab", 6: "The season's strategy — Al-Musawwir",
  7: "The year's direction — Al-Malik", 8: "The life-stage — Al-Wahhab", 9: "The civilizational question — Al-Baqi",
};
function ReadingScreen({ onOpenText }) {
  const [mode, setMode] = React.useState("A");
  const [veil, setVeil] = React.useState(5);
  const [q, setQ] = React.useState("");
  const [name, setName] = React.useState("");
  const [result, setResult] = React.useState(false);
  return (
    <div>
      <Panel title="Mode" style={{ marginBottom: 12 }}>
        <SegmentedControl style={{ marginBottom: 12 }} value={mode} onChange={setMode}
          options={[{ value: "A", label: "A — Astronomical" }, { value: "B", label: "B — Deck" }, { value: "C", label: "C — Resonance" }]} />
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--text)", margin: "6px 0" }}>Veil (question depth)</div>
        <VeilSelector value={veil} onChange={setVeil} />
        <div style={{ color: "var(--dim)", fontSize: 12, marginTop: 6 }}>{VEIL_LABELS[veil]}</div>
        <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
          <Field value={q} onChange={setQ} placeholder="The question (optional)" />
          <Field value={name} onChange={setName} placeholder="Querent name in Arabic — natal mansion (optional)" />
        </div>
        <Button full style={{ marginTop: 12 }} onClick={() => setResult(true)}>
          {mode === "A" ? "Read the sky" : mode === "B" ? "Draw and read" : "Draw and compare"}
        </Button>
      </Panel>
      {result && <ReadingResult />}
    </div>
  );
}
function ReadingResult() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", alignItems: "center", marginTop: 4 }}>
        <DeckCard card={29} width={108} backSrc="../../assets/hedronite-glyph-copper.png" />
        <DeckCard card={11} width={108} backSrc="../../assets/hedronite-glyph-copper.png" />
        <DeckCard card={6} width={108} orientation="sideways" style={{ margin: "0 38px" }} backSrc="../../assets/hedronite-glyph-copper.png" />
        <DeckCard card={17} width={108} backSrc="../../assets/hedronite-glyph-copper.png" />
      </div>
      <div style={{ textAlign: "center", color: "var(--dim)", fontSize: 10, fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Axial Witness · The Spark (Key) · The Striker (Agent, sideways) · Bridge 2</div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Hexagram style={{ flex: 1 }} title="The situation" number={55} name="Abundance" lines={[true, true, false, true, false, false]} moving={[3, 4]} upper="Thunder" lower="Fire" suit="Fire" divineName="Al-Muhyi" />
        <Hexagram style={{ flex: 1 }} title="The trajectory (zanshin)" number={24} name="Return" lines={[true, false, false, false, false, false]} upper="Earth" lower="Thunder" suit="Earth" divineName="Al-Baʿith" />
      </div>
      <Panel title="Resonance: SEVENFOLD SEAL">
        <MonoLine>Check 1 (lunar day): Line 4</MonoLine>
        <MonoLine>Check 2 (Sevenfold Weave): Line 3</MonoLine>
        <MonoLine>Check 3 (season day): Line 6</MonoLine>
        <div style={{ color: "var(--dim)", fontSize: 11, marginTop: 4 }}>Dominant check for Veil 5: Check 1</div>
      </Panel>
      <Panel title="The six coordinates">
        <MonoLine>1 · Hexagram: 55 Abundance → 24 Return</MonoLine>
        <MonoLine>2 · Divine Names: Al-Muhyi · An-Nur · Al-Fattah</MonoLine>
        <MonoLine link>3 · Quranic: Juz 17, Hizb 33 — read ›</MonoLine>
        <MonoLine link>4 · Zabur: Psalm 81:3 (royal: 81) — read ›</MonoLine>
        <MonoLine>5 · Abjad: mansion letter Ṭ (9) → standing line 3</MonoLine>
        <MonoLine>6 · Temporal: 17 Ramaḍān 1447 · Mansion 9</MonoLine>
      </Panel>
      <Panel title="Active Names — dhikr before interpretation">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <DivineName name="Al-Muhyi" arabic="المحيي" meaning="The Giver of Life" role="hexagram" count={68} />
          <DivineName name="An-Nur" arabic="النور" meaning="The Light" role="key" count={256} />
          <DivineName name="Al-Fattah" arabic="الفتّاح" meaning="The Opener" role="suit" count={489} />
        </div>
      </Panel>
      <Button variant="ghost" full>Save to journal</Button>
    </div>
  );
}

// ──────────────────────────── Texts ────────────────────────────
const SURAHS = [
  { n: 1, en: "The Opening", tr: "Al-Fātiḥa", ar: "الفاتحة", ayahs: 7 },
  { n: 2, en: "The Cow", tr: "Al-Baqara", ar: "البقرة", ayahs: 286 },
  { n: 17, en: "The Night Journey", tr: "Al-Isrāʾ", ar: "الإسراء", ayahs: 111 },
  { n: 55, en: "The Most Merciful", tr: "Ar-Raḥmān", ar: "الرحمٰن", ayahs: 78 },
  { n: 81, en: "The Overthrowing", tr: "At-Takwīr", ar: "التكوير", ayahs: 29 },
  { n: 112, en: "Sincerity", tr: "Al-Ikhlāṣ", ar: "الإخلاص", ayahs: 4 },
];
const PSALM81 = [
  { v: 1, ar: "رَنِّمُوا لِلهِ قُوَّتِنَا. اهْتِفُوا لإِلٰهِ يَعْقُوبَ.", en: "Sing aloud unto God our strength: make a joyful noise unto the God of Jacob." },
  { v: 2, ar: "ارْفَعُوا نَغَمَةً وَهَاتُوا دُفًّا، عُودًا حُلْوًا مَعَ رَبَابٍ.", en: "Take a psalm, and bring hither the timbrel, the pleasant harp with the psaltery." },
  { v: 3, ar: "انْفُخُوا فِي رَأْسِ الشَّهْرِ بِالبُوقِ، عِنْدَ الهِلَالِ لِيَوْمِ عِيدِنَا.", en: "Blow up the trumpet in the new moon, in the time appointed, on our solemn feast day." },
  { v: 4, ar: "لأَنَّ هٰذَا فَرِيضَةٌ لإِسْرَائِيلَ، حُكْمٌ لإِلٰهِ يَعْقُوبَ.", en: "For this was a statute for Israel, and a law of the God of Jacob." },
];
function TextsScreen() {
  const [book, setBook] = React.useState("quran");
  const [reading, setReading] = React.useState(null); // psalm object when open
  if (reading) {
    return (
      <div>
        <Button variant="sunken" size="sm" onClick={() => setReading(null)}>‹ Texts</Button>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--gold)", marginTop: 8 }}>Mizmār 81 · Psalm 81</div>
        <div style={{ color: "var(--dim)", fontSize: 12, marginBottom: 8 }}>Van Dyck (Arabic) · King James (English)</div>
        <div style={{ border: "1px solid var(--line)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
          {PSALM81.map((v) => <VerseRow key={v.v} label={`81:${v.v}`} arabic={v.ar} english={v.en} highlight={v.v === 3} />)}
        </div>
      </div>
    );
  }
  return (
    <div>
      <SegmentedControl style={{ marginBottom: 12 }} value={book} onChange={setBook}
        options={[{ value: "quran", label: "Qur'ān" }, { value: "zabur", label: "Zabūr · Psalms" }]} />
      {book === "quran" ? (
        <div>
          {SURAHS.map((s) => (
            <div key={s.n} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 4px", borderBottom: "1px solid var(--line)" }}>
              <Medallion>{s.n}</Medallion>
              <div style={{ flex: 1 }}>
                <div style={{ color: "var(--text)", fontSize: 15, fontWeight: 600 }}>{s.en} <span style={{ color: "var(--dim)", fontWeight: 400, fontSize: 13 }}>· {s.tr}</span></div>
                <div style={{ color: "var(--dim)", fontSize: 12, marginTop: 2 }}>{s.ayahs} āyāt</div>
              </div>
              <div className="aq-arabic" style={{ fontSize: 22, color: "var(--lapis-light)" }}>{s.ar}</div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div style={{ color: "var(--dim)", fontSize: 12, padding: "4px 0 10px" }}>The 150 mizmār — Van Dyck Arabic with the King James rendering.</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 8 }}>
            {Array.from({ length: 36 }, (_, i) => i + 1).map((n) => (
              <button key={n} onClick={() => n === 81 && setReading(true)} style={{ aspectRatio: "1", borderRadius: "var(--radius-md)", background: n === 81 ? "var(--panel-soft)" : "var(--panel)", border: `1px solid ${n === 81 ? "var(--copper)" : "var(--line)"}`, color: "var(--text)", fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 13 }}>{n}</button>
            ))}
          </div>
          <div style={{ color: "var(--dim)", fontSize: 11, marginTop: 10 }}>Psalm 81 is a reading destination — tap it.</div>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────── Natal ────────────────────────────
const PLACEMENTS = [
  ["☉", "Sun", "H4 Cancer", "9 Al-Haq'a", "92.3°"], ["☾", "Moon", "H11 Aquarius", "22 Sa'd", "301.1°"],
  ["☿", "Mercury", "H4 Cancer", "8 Al-Han'a", "88.7°"], ["♀", "Venus", "H3 Gemini", "6 Al-Hak'a", "74.0°"],
  ["♂", "Mars", "H7 Libra", "15 Ghafr", "196.5°"], ["♃", "Jupiter", "H1 Aries", "1 Ash-Sharatan", "8.2°"],
  ["♄", "Saturn", "H10 Capricorn", "26 Fargh", "278.9°"],
];
function NatalScreen() {
  const [cast, setCast] = React.useState(false);
  const [y, setY] = React.useState("1990"), [mo, setMo] = React.useState("6"), [d, setD] = React.useState("15"), [h, setH] = React.useState("14"), [mi, setMi] = React.useState("30");
  return (
    <div>
      <Panel title="Birth moment">
        <div style={{ color: "var(--dim)", fontSize: 12, margin: "4px 0" }}>Date &amp; time (local to birthplace)</div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <Field value={y} onChange={setY} width="64px" align="center" />
          <Field value={mo} onChange={setMo} width="44px" align="center" />
          <Field value={d} onChange={setD} width="44px" align="center" />
          <span style={{ color: "var(--dim)" }}>·</span>
          <Field value={h} onChange={setH} width="44px" align="center" />
          <Field value={mi} onChange={setMi} width="44px" align="center" />
        </div>
        <div style={{ color: "var(--dim)", fontSize: 12, margin: "10px 0 4px" }}>Birthplace</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ flex: 1, color: "var(--text)", fontSize: 14, fontWeight: 600 }}>📍 Cairo, Egypt</span>
          <Button variant="ghost" size="sm">Use my location</Button>
        </div>
        <Field style={{ marginTop: 8 }} placeholder="Name in Arabic — for the identity mansion (optional)" />
        <Button full style={{ marginTop: 12 }} onClick={() => setCast(true)}>Cast the natal chart</Button>
      </Panel>
      {cast && (
        <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 12 }}>
          <Panel title="Natal Hexagram" accent="copper">
            <div style={{ color: "var(--gold)", fontSize: 20, fontWeight: 700, fontFamily: "var(--font-display)" }}>19 — Approach</div>
            <div style={{ color: "var(--dim)", marginTop: 4 }}>Earth over Lake · Water suit · Al-Latif</div>
          </Panel>
          <Panel title="The Seven — placements in AGOSS">
            {PLACEMENTS.map((p) => (
              <div key={p[1]} style={{ display: "flex", alignItems: "center", padding: "5px 0", borderBottom: "1px solid var(--line)", fontSize: 12 }}>
                <span style={{ color: "var(--gold)", fontSize: 16, width: 22 }}>{p[0]}</span>
                <span style={{ color: "var(--text)", width: 66 }}>{p[1]}</span>
                <span style={{ color: "var(--lapis-light)", width: 96 }}>{p[2]}</span>
                <span style={{ color: "var(--text)", flex: 1 }}>{p[3]}</span>
                <span style={{ color: "var(--dim)" }}>{p[4]}</span>
              </div>
            ))}
          </Panel>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────── Journal ───────────────────────────
const ENTRIES = [
  { at: "20 Jul 2026, 09:14", mode: "A", veil: 5, hex: "Hex 55 → 24", res: "sevenfold_seal", juz: 17, psalm: 81, names: "Al-Muhyi, An-Nur, Al-Fattah" },
  { at: "13 Jul 2026, 21:02", mode: "B", veil: 3, hex: "Hex 3 → 51", res: "base", juz: 4, psalm: 40, names: "Al-Qabid, Al-Hadi" },
  { at: "02 Jul 2026, 05:41", mode: "A", veil: 7, hex: "Hold and witness", res: "hold", juz: 30, psalm: 92, names: "As-Samad" },
];
function JournalScreen() {
  return (
    <div>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--text)" }}>Reading record</div>
      <div style={{ color: "var(--dim)", fontSize: 11, marginBottom: 4 }}>The accumulated record feeds the first Sirian Cycle review (~2076 CE).</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
        {ENTRIES.map((e, i) => (
          <Panel key={i}>
            <MonoLine>{e.at} · Mode {e.mode} · Veil {e.veil}</MonoLine>
            <div style={{ color: "var(--text)", marginTop: 4 }}>{e.hex} · {e.res.replace("_", " ")}</div>
            <div style={{ color: "var(--dim)", fontSize: 11, marginTop: 4 }}>Juz {e.juz} · Psalm {e.psalm} · {e.names}</div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { NowScreen, ReadingScreen, TextsScreen, NatalScreen, JournalScreen });
