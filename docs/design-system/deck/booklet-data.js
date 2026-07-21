/* ─────────────────────────────────────────────────────────────────────────
   booklet-data.js — the ratified tables, transcribed for the Companion Book.

   Every table here is a faithful transcription of the versioned engine data
   (packages/engine/src/data/*.ts) and the ratified Calendar / Oracle / Canon
   specifications. The engine is TypeScript and not in the browser bundle, so
   these constants are mirrored here as plain data for the print page. Where a
   value is shared across documents ("the two documents publish one table"),
   it is the SAME value — do not diverge it.

   Exposes window.BookletData.
   ───────────────────────────────────────────────────────────────────────── */
(function () {
  "use strict";

  // ── Planet signatures ────────────────────────────────────────────────────
  const PLANET_GLYPH = {
    Saturn: "♄", Jupiter: "♃", Mars: "♂", Sun: "☉",
    Venus: "♀", Mercury: "☿", Moon: "☾", Gen: "☶",
  };
  const CHALDEAN_ORDER = ["Saturn", "Jupiter", "Mars", "Sun", "Venus", "Mercury", "Moon"];

  // ── The eight trigrams (Oracle §3; engine trigrams.ts) ────────────────────
  // lines are bottom-to-top; true = yang (unbroken). element = suit carried
  // when this trigram is UPPER (Gen carries none).
  const TRIGRAMS = {
    Sun:     { symbol: "☰", chinese: "Qian", english: "Heaven",   planet: "Sun",     element: "Ether", lines: [true, true, true],   character: "Authority, sovereignty — pure yang" },
    Saturn:  { symbol: "☷", chinese: "Kun",  english: "Earth",    planet: "Saturn",  element: "Earth", lines: [false, false, false], character: "Foundation, discipline — pure yin" },
    Mars:    { symbol: "☳", chinese: "Zhen", english: "Thunder",  planet: "Mars",    element: "Fire",  lines: [true, false, false],  character: "Force, shock, ignition" },
    Mercury: { symbol: "☴", chinese: "Xun",  english: "Wind",     planet: "Mercury", element: "Air",   lines: [false, true, true],   character: "Penetration, communication" },
    Moon:    { symbol: "☵", chinese: "Kan",  english: "Water",    planet: "Moon",    element: "Water", lines: [false, true, false],  character: "Depth, cycles, the tidal pull" },
    Jupiter: { symbol: "☲", chinese: "Li",   english: "Fire",     planet: "Jupiter", element: "Fire",  lines: [true, false, true],   character: "Radiance, expansion, illumination" },
    Venus:   { symbol: "☱", chinese: "Dui",  english: "Lake",     planet: "Venus",   element: "Water", lines: [true, true, false],   character: "Harmony, joy, the reflecting surface" },
    Gen:     { symbol: "☶", chinese: "Gen",  english: "Mountain", planet: "Sgr A*",  element: null,    lines: [false, false, true],  character: "Absolute stillness — the unmoved axis" },
  };

  // Bottom-to-top 6-line pattern for a hexagram, from its two planetary trigrams.
  function hexLines(upperPlanet, lowerPlanet) {
    const lo = TRIGRAMS[lowerPlanet].lines;
    const up = TRIGRAMS[upperPlanet].lines;
    return [lo[0], lo[1], lo[2], up[0], up[1], up[2]];
  }

  // ── Suits (Oracle §3) ─────────────────────────────────────────────────────
  const SUITS = [
    { element: "Fire",  register: "Jalal", trigrams: "Jupiter ☲ + Mars ☳",  size: 14, name: "Al-Aziz",  ar: "العزيز", meaning: "The All-Mighty" },
    { element: "Earth", register: "Jalal", trigrams: "Saturn ☷",            size: 7,  name: "Al-Matin", ar: "المتين", meaning: "The Firm, the Steadfast" },
    { element: "Air",   register: "Jamal", trigrams: "Mercury ☴",           size: 7,  name: "Ar-Rahman", ar: "الرحمن", meaning: "The Most Merciful" },
    { element: "Water", register: "Jamal", trigrams: "Venus ☱ + Moon ☵",    size: 14, name: "Ar-Rahim", ar: "الرحيم", meaning: "The Most Compassionate" },
    { element: "Ether", register: "Kamal", trigrams: "Sun ☰",               size: 7,  name: "Al-Quddus", ar: "القدوس", meaning: "The Absolutely Pure, the Holy" },
  ];

  // ── King Wen names (engine hexagrams.ts HEXAGRAM_NAMES) ────────────────────
  const HEX_NAME = {
    1: "The Creative", 2: "The Receptive", 3: "Difficulty at the Beginning", 4: "Youthful Folly",
    5: "Waiting", 6: "Conflict", 7: "The Army", 8: "Holding Together", 9: "Small Taming",
    10: "Treading", 11: "Peace", 12: "Standstill", 13: "Fellowship", 14: "Great Possession",
    15: "Modesty", 16: "Enthusiasm", 17: "Following", 18: "Work on What Has Decayed",
    19: "Approach", 20: "Contemplation", 21: "Biting Through", 22: "Grace", 23: "Splitting Apart",
    24: "Return", 25: "Innocence", 26: "Taming Power of the Great", 27: "Nourishment",
    28: "Great Preponderance", 29: "The Abysmal", 30: "The Clinging", 31: "Influence",
    32: "Duration", 33: "Retreat", 34: "Great Power", 35: "Progress", 36: "Darkening of the Light",
    37: "The Family", 38: "Opposition", 39: "Obstruction", 40: "Deliverance", 41: "Decrease",
    42: "Increase", 43: "Breakthrough", 44: "Coming to Meet", 45: "Gathering Together",
    46: "Pushing Upward", 47: "Oppression", 48: "The Well", 49: "Revolution", 50: "The Cauldron",
    51: "The Arousing", 52: "The Axial Witness", 53: "Gradual Progress", 54: "The Marrying Maiden",
    55: "Abundance", 56: "The Wanderer", 57: "The Gentle", 58: "The Joyous", 59: "Dispersion",
    60: "Limitation", 61: "Inner Truth", 62: "Preponderance of the Small", 63: "After Completion",
    64: "Before Completion",
  };

  // ── Divine Name per hexagram (engine HEXAGRAM_DIVINE_NAMES) [name, ar, meaning] ─
  const HEX_DIVINE = {
    1: ["An-Nur", "النور", "The Light — the Solar Crown"],
    2: ["As-Sabur", "الصبور", "The Patient"],
    3: ["Al-Khaliq", "الخالق", "Creation's birth-struggle"],
    4: ["Ar-Ra'uf", "الرؤوف", "The Tender — hidden tenderness toward the unformed"],
    5: ["As-Sami'", "السميع", "The waiting that is heard"],
    6: ["Al-Akhir", "الآخر", "The Last, final arbiter of disputes"],
    7: ["Al-Jabbar", "الجبار", "The Compeller"],
    8: ["Al-Hayy", "الحي", "Union as one life"],
    9: ["Al-Mutakabbir", "المتكبر", "The Supreme that yields only briefly to gentle restraint"],
    10: ["Al-Ali", "العلي", "Conduct beneath the Most High"],
    11: ["As-Salam", "السلام", "Peace itself"],
    12: ["Al-Muta'ali", "المتعالي", "Heaven withdrawn above"],
    13: ["Al-Mu'min", "المؤمن", "Security granted to the community"],
    14: ["Al-Ghani", "الغني", "The Rich beyond need"],
    15: ["Al-Khafid", "الخافض", "The Abaser — the manifest lowering"],
    16: ["Al-Hamid", "الحميد", "Praise and music"],
    17: ["Al-Wali", "الولي", "The Friend one follows"],
    18: ["Al-Mu'id", "المعيد", "The Restorer — the hidden Restorer"],
    19: ["Al-Waali", "الوالي", "The Patron drawing near"],
    20: ["Al-Jalil", "الجليل", "Majesty beheld from the tower"],
    21: ["Al-Muntaqim", "المنتقم", "The Avenger — the penal hexagram"],
    22: ["Al-Barr", "البر", "The Kind — kindness working unseen"],
    23: ["Al-Hasib", "الحسيب", "The Reckoner — the hidden reckoning"],
    24: ["Al-Ba'ith", "الباعث", "The Resurrector"],
    25: ["Al-Haqq", "الحق", "Alignment with what is"],
    26: ["Al-Batin", "الباطن", "The Hidden"],
    27: ["Al-Muqit", "المقيت", "The Nourisher"],
    28: ["Al-Halim", "الحليم", "Bearing the sagging beam"],
    29: ["Al-Latif", "اللطيف", "The Subtle"],
    30: ["Al-Karim", "الكريم", "The Generous"],
    31: ["Al-Mujib", "المجيب", "The Responsive — the manifest response"],
    32: ["Al-Warith", "الوارث", "The Inheritor — what endures"],
    33: ["Az-Zahir", "الظاهر", "The Manifest"],
    34: ["Al-Qahhar", "القهار", "The Subduer"],
    35: ["Al-Mu'izz", "المعز", "The Honorer"],
    36: ["Ad-Darr", "الضار", "The Distresser — ordained affliction"],
    37: ["Al-Hakam", "الحكم", "Right order within the household"],
    38: ["Al-Mani'", "المانع", "The Withholder"],
    39: ["Al-Qabid", "القابض", "The Constrictor — the manifest halt"],
    40: ["An-Nafi'", "النافع", "The rain that benefits"],
    41: ["Al-Afuww", "العفو", "The Pardoner — the hidden release that purifies"],
    42: ["Al-Majid", "المجيد", "Overflowing glory that gives below"],
    43: ["Al-Ghafur", "الغفور", "The flood that washes clean"],
    44: ["Al-Awwal", "الأول", "The First who precedes every encounter"],
    45: ["Malik-ul-Mulk", "مالك الملك", "Around whom all gathers"],
    46: ["Ar-Rafi'", "الرافع", "The Exalter"],
    47: ["Ash-Shakur", "الشكور", "Gratitude in exhaustion"],
    48: ["Al-Mughni", "المغني", "The inexhaustible Enricher"],
    49: ["Al-Mumit", "المميت", "Death of the old order"],
    50: ["Al-Bari'", "البارئ", "The Maker who proportions within the vessel"],
    51: ["Al-Qawi", "القوي", "The All-Strong"],
    52: ["As-Samad", "الصمد", "The Eternal Absolute, the Self-Sufficient"],
    53: ["Ar-Rashid", "الرشيد", "The Guide to Right Procedure"],
    54: ["Al-Mudhill", "المذل", "The Humbler"],
    55: ["Al-Maajid", "الماجد", "The Noble-Glorious at zenith"],
    56: ["Al-Basit", "الباسط", "The Expander — expansion declared"],
    57: ["Al-Khabir", "الخبير", "The Fully Aware"],
    58: ["Al-Wadud", "الودود", "The Loving"],
    59: ["Al-Ghaffar", "الغفار", "The Ever-Forgiving who scatters what hardened"],
    60: ["Al-Mu'akhkhir", "المؤخر", "The boundary that holds back"],
    61: ["Dhul-Jalali-wal-Ikram", "ذو الجلال والإكرام", "Majesty and Generosity united at the sincere center"],
    62: ["Al-Muqaddim", "المقدم", "The Advancer — the careful advance"],
    63: ["Al-Basir", "البصير", "Vigilance when all is in place"],
    64: ["Al-Muqtadir", "المقتدر", "The outcome held in power"],
  };

  // ── The 28 lunar mansions (Calendar §6 = Oracle App B; engine mansions.ts) ──
  // Abjadi order — the Moon's circuit ascends 1 → 1000. 4 mansions per planet,
  // Chaldean descent. agossStart = (n−1) × 360/28.
  const MANSION_ROWS = [
    ["Al-Sharatain", "The Two Signs", "أ", "Alif", 1],
    ["Al-Butain", "The Belly", "ب", "Ba", 2],
    ["Al-Thurayya", "The Many Little Ones", "ج", "Jim", 3],
    ["Al-Dabaran", "The Follower", "د", "Dal", 4],
    ["Al-Haq'ah", "The White Spot", "ه", "Ha", 5],
    ["Al-Han'ah", "The Brand", "و", "Waw", 6],
    ["Al-Dhira", "The Forearm", "ز", "Zayn", 7],
    ["Al-Nathrah", "The Gap", "ح", "Haa", 8],
    ["Al-Tarf", "The Glance", "ط", "Tta", 9],
    ["Al-Jabhah", "The Forehead", "ي", "Ya", 10],
    ["Al-Zubrah", "The Mane", "ك", "Kaf", 20],
    ["Al-Sarfah", "The Changer", "ل", "Lam", 30],
    ["Al-Awwa", "The Barker", "م", "Mim", 40],
    ["Al-Simak", "The Unarmed", "ن", "Nun", 50],
    ["Al-Ghafr", "The Cover", "س", "Sin", 60],
    ["Al-Zubana", "The Claws", "ع", "Ayn", 70],
    ["Al-Iklil", "The Crown", "ف", "Fa", 80],
    ["Al-Qalb", "The Heart", "ص", "Sad", 90],
    ["Al-Shawlah", "The Sting", "ق", "Qaf", 100],
    ["Al-Na'aim", "The Ostriches", "ر", "Ra", 200],
    ["Al-Baldah", "The City", "ش", "Shin", 300],
    ["Sa'd al-Dhabih", "Luck of the Slaughterer", "ت", "Ta", 400],
    ["Sa'd Bula", "Luck of the Swallower", "ث", "Tha", 500],
    ["Sa'd al-Su'ud", "Luckiest of the Lucky", "خ", "Kha", 600],
    ["Sa'd al-Akhbiyah", "Luck of the Tents", "ذ", "Dhal", 700],
    ["Al-Fargh al-Awwal", "The First Spout", "ض", "Dad", 800],
    ["Al-Fargh al-Thani", "The Second Spout", "ظ", "Dha", 900],
    ["Batn al-Hut", "The Belly of the Fish", "غ", "Ghayn", 1000],
  ];
  function dms(deg) {
    const d = Math.floor(deg);
    const m = Math.round((deg - d) * 60);
    return m === 60 ? `${d + 1}°00'` : `${d}°${String(m).padStart(2, "0")}'`;
  }
  const MANSIONS = MANSION_ROWS.map((r, i) => ({
    number: i + 1,
    nameAr: r[0], translation: r[1], letter: r[2], letterName: r[3], abjad: r[4],
    ruler: CHALDEAN_ORDER[Math.floor(i / 4)],
    agossStart: dms((i * 360) / 28),
  }));

  // ── LAYER 1 — planetary hours (Calendar §3) ────────────────────────────────
  const DAY_LORDS = [
    { day: "Sunday", lord: "Sun" }, { day: "Monday", lord: "Moon" },
    { day: "Tuesday", lord: "Mars" }, { day: "Wednesday", lord: "Mercury" },
    { day: "Thursday", lord: "Jupiter" }, { day: "Friday", lord: "Venus" },
    { day: "Saturday", lord: "Saturn" },
  ];
  const PLANET_HOUR_CHARACTER = {
    Saturn:  { character: "Discipline, restriction, audit", application: "Fasting, review of practice, accounting of the self (muhasabah)" },
    Jupiter: { character: "Expansion, growth, generosity", application: "Teaching, charity, the planning of growth" },
    Mars:    { character: "Action, decisiveness, force", application: "Training, decisive execution, the futuwwa disciplines" },
    Sun:     { character: "Authority, clarity, sovereignty", application: "Sovereign decisions, leadership, command of the day" },
    Venus:   { character: "Harmony, beauty, relation", application: "Family, partnership, aesthetic and relational work" },
    Mercury: { character: "Communication, analysis, precision", application: "Study, writing, analysis, correspondence" },
    Moon:    { character: "Intuition, cycles, reflection", application: "Dhikr, memory work, reflection, salah alignment" },
  };

  // ── LAYER 2 — the six Salah windows → hexagram lines (Calendar §4) ──────────
  const SALAH_WINDOWS = [
    { name: "Tahajjud", bounds: "Isha → Fajr", character: "Night vigil — the deep, autonomous forces", line: 1 },
    { name: "Fajr", bounds: "Astronomical dawn → Sunrise", character: "Dawn — emergence, what becomes visible", line: 2 },
    { name: "Duha", bounds: "Sunrise → Dhuhr", character: "Morning — peak engagement, primary exertion", line: 3 },
    { name: "Dhuhr–Asr", bounds: "Dhuhr → Asr", character: "Midday — assessment, the hinge, course correction", line: 4 },
    { name: "Asr–Maghrib", bounds: "Asr → Maghrib", character: "Afternoon — sovereign position, consequence", line: 5 },
    { name: "Maghrib–Isha", bounds: "Maghrib → Isha", character: "Evening — completion, review, transcendence", line: 6 },
  ];

  // ── LAYER 3 — the week (Calendar §5; engine WEEK) ──────────────────────────
  const WEEK = [
    { ar: "al-Ahad", en: "Sunday", lord: "Sun", line: 1, character: "Foundation — sovereignty at the root" },
    { ar: "al-Ithnayn", en: "Monday", lord: "Moon", line: 2, character: "Emergence — the tide becomes visible" },
    { ar: "al-Thulatha", en: "Tuesday", lord: "Mars", line: 3, character: "Peak engagement — exertion, force" },
    { ar: "al-Arbiʿa", en: "Wednesday", lord: "Mercury", line: 4, character: "The hinge — analysis, correction" },
    { ar: "al-Khamis", en: "Thursday", lord: "Jupiter", line: 5, character: "Sovereign — expansion at authority" },
    { ar: "al-Jumuʿah", en: "Friday", lord: "Venus", line: 6, character: "Completion — the Gathering, assembly, harmony" },
    { ar: "al-Sabt", en: "Saturday", lord: "Saturn", line: null, character: "The Cessation — the still point, the week's Hex 52" },
  ];

  // ── LAYER 5 — the twelve Hijri months (Calendar §7; engine HIJRI_MONTHS) ────
  const HIJRI_MONTHS = [
    { n: 1, name: "Muharram", gloss: "The Sacred Opening", sacred: true, line: 1 },
    { n: 2, name: "Safar", gloss: "The Departure", sacred: false, line: 1 },
    { n: 3, name: "Rabi al-Awwal", gloss: "First Spring", sacred: false, line: 2 },
    { n: 4, name: "Rabi al-Thani", gloss: "Second Spring", sacred: false, line: 2 },
    { n: 5, name: "Jumada al-Ula", gloss: "First Stillness", sacred: false, line: 3 },
    { n: 6, name: "Jumada al-Thani", gloss: "Second Stillness", sacred: false, line: 3 },
    { n: 7, name: "Rajab", gloss: "The Revered", sacred: true, line: 4 },
    { n: 8, name: "Sha'ban", gloss: "The Branching", sacred: false, line: 4 },
    { n: 9, name: "Ramadan", gloss: "The Burning", sacred: false, line: 5 },
    { n: 10, name: "Shawwal", gloss: "The Lifting", sacred: false, line: 5 },
    { n: 11, name: "Dhul Qi'dah", gloss: "The Sitting", sacred: true, line: 6 },
    { n: 12, name: "Dhul Hijjah", gloss: "The Pilgrimage", sacred: true, line: 6 },
  ];

  // ── LAYER 6 — solar seasons (Calendar §8) ──────────────────────────────────
  const SEASON_ANCHORS = [
    { event: "Vernal Equinox", date: "~March 20", function: "Annual opening, strategy refresh" },
    { event: "Summer Solstice", date: "~June 21", function: "Mid-year assessment" },
    { event: "Autumnal Equinox", date: "~September 22", function: "Harvest accounting" },
    { event: "Winter Solstice", date: "~December 21", function: "Annual close, generational accounting" },
  ];
  const SEASON_LINE_BINS = [
    { days: "Days 1–15", line: 1, character: "Foundation — the season just opened" },
    { days: "Days 16–30", line: 2, character: "Emerging — the seasonal character becoming visible" },
    { days: "Days 31–45", line: 3, character: "Peak engagement — deepest expression" },
    { days: "Days 46–60", line: 4, character: "The hinge — mid-season assessment" },
    { days: "Days 61–75", line: 5, character: "Sovereign — full authority" },
    { days: "Days 76–91", line: 6, character: "Completion — the final arc, threshold to next" },
  ];

  // ── LAYER 9 — the Twelve Ages (Calendar §11; engine AGES) ──────────────────
  // The vernal point DESCENDS: ages run VI → V → IV → III → II → I toward the Return.
  const AGES = [
    { numeral: "VI", label: "Taurus", arc: "150°–180°", character: "Accumulation — wealth, permanence", entry: "~4216 BCE", exit: "~2069 BCE", record: "The bull cults; Apis; the pyramid age of Kemet" },
    { numeral: "V", label: "Aries", arc: "120°–150°", character: "Ignition — initiative, emergence", entry: "~2069 BCE", exit: "~78 CE", record: "The ram; the Abrahamic emergence; the iron-age empires" },
    { numeral: "IV", label: "Pisces", arc: "90°–120°", character: "Dissolution — faith, surrender", entry: "~78 CE", exit: "~2225 CE", record: "The fish as the era's own symbol; the age of faith and surrender" },
    { numeral: "III", label: "Aquarius", arc: "60°–90°", character: "Innovation — disruption, flow", entry: "~2225 CE", exit: "~4373 CE", record: "" },
    { numeral: "II", label: "Capricorn", arc: "30°–60°", character: "Structure — foundation, discipline", entry: "~4373 CE", exit: "~6520 CE", record: "" },
    { numeral: "I", label: "Sagittarius", arc: "0°–30°", character: "The Center — convergence, the Return", entry: "~6520 CE", exit: "~8667 CE", record: "" },
  ];

  // ── The nine temporal layers (Calendar §2) ─────────────────────────────────
  const NINE_LAYERS = [
    { n: 1, cycle: "Planetary Hours", scope: "Sub-daily", duration: "~1–2 hours", quran: "—" },
    { n: 2, cycle: "Salah", scope: "Daily", duration: "24 hours", quran: "11:114 · 17:78 · 20:130" },
    { n: 3, cycle: "Jumu'ah & Sabt", scope: "Weekly", duration: "7 days", quran: "62:9–10 · 4:154" },
    { n: 4, cycle: "Mansions", scope: "Sub-monthly", duration: "~1 day each (28/orbit)", quran: "36:39" },
    { n: 5, cycle: "Lunar Month", scope: "Monthly", duration: "29–30 days", quran: "9:36" },
    { n: 6, cycle: "Solar Season", scope: "Quarterly", duration: "~91 days", quran: "—" },
    { n: 7, cycle: "The Year", scope: "Annual", duration: "354 lunar / 365 solar", quran: "10:5" },
    { n: 8, cycle: "Harmonic Cycle", scope: "Generational", duration: "~33 lunar / ~32 solar years", quran: "—" },
    { n: 9, cycle: "The Great Year", scope: "Civilizational", duration: "~25,772 years", quran: "55:5" },
  ];

  // ── The Nine Names of Time (Calendar §12; engine TEMPORAL_LAYER_NAMES) ──────
  const NINE_NAMES_OF_TIME = [
    { layer: 1, scale: "Planetary Hour", name: "Al-Qadir", ar: "القادر", meaning: "The All-Powerful — power concentrated in the immediate moment" },
    { layer: 2, scale: "Salah / Daily", name: "Ar-Razzaq", ar: "الرزاق", meaning: "The Provider — daily sustenance and divine presence" },
    { layer: 3, scale: "Jumu'ah / Weekly", name: "Al-Jami'", ar: "الجامع", meaning: "The Gatherer — weekly assembly and reconciliation" },
    { layer: 4, scale: "Mansions", name: "Al-Hadi", ar: "الهادي", meaning: "The Guide — the lunar mansions as directional instruction" },
    { layer: 5, scale: "Lunar Month", name: "At-Tawwab", ar: "التواب", meaning: "The Ever-Returning — the monthly cycle of renewal" },
    { layer: 6, scale: "Solar Season", name: "Al-Musawwir", ar: "المصور", meaning: "The Fashioner of Forms — seasonal creation and dissolution" },
    { layer: 7, scale: "Annual", name: "Al-Malik", ar: "الملك", meaning: "The King — annual sovereign review" },
    { layer: 8, scale: "33-Year Harmonic", name: "Al-Wahhab", ar: "الوهاب", meaning: "The Bestower — the generational gift" },
    { layer: 9, scale: "Great Year", name: "Al-Baqi", ar: "الباقي", meaning: "The Everlasting — the only Name commensurate with civilizational time" },
  ];

  // ── The Nine Veils binding (Calendar §13) ──────────────────────────────────
  const NINE_VEILS = [
    { veil: 1, layer: "Planetary Hour", provides: "Hour ruler (Mode A lower trigram; Check 2 input)" },
    { veil: 2, layer: "Salah", provides: "Window and line (Check 2 line; verse coordinate; Hizb selection)" },
    { veil: 3, layer: "Jumu'ah & Sabt", provides: "Standing weekly line (or Sabt axial resonance); the day's planetary lord" },
    { veil: 4, layer: "Mansion", provides: "Mansion ruler (Mode A upper trigram); letter and standing Abjad line; natal transit" },
    { veil: 5, layer: "Lunar Month", provides: "Lunar day (Check 1 line; Juz; Zabur day-in-window); sacred-month weight" },
    { veil: 6, layer: "Solar Season", provides: "Season day (Check 3 line); Solar Threshold state" },
    { veil: 7, layer: "Annual", provides: "Sacred-cycle position; heliacal rising windows" },
    { veil: 8, layer: "Harmonic", provides: "Cycle and year; boundary obligations" },
    { veil: 9, layer: "Great Year", provides: "Age, age-year, and the descent toward the Return" },
  ];

  // ── The five strata (Oracle §5) ────────────────────────────────────────────
  const STRATA = [
    { numeral: "I", name: "The Stellar Court", cards: "Cards 1–3", mansions: "Mansions 1–3", descriptor: "placed only by the sky's own conditions" },
    { numeral: "II", name: "The Planetary Council", cards: "Cards 4–10", mansions: "Mansions 4–10", descriptor: "split faces carrying the 14 threshold hexagrams" },
    { numeral: "III", name: "The Platonic Keys", cards: "Cards 11–15", mansions: "Mansions 11–15", descriptor: "drawn first in every reading, never suspended" },
    { numeral: "IV", name: "The Archimedean Bridges", cards: "Cards 16–28", mansions: "Mansions 16–28", descriptor: "naming the question's dynamic complexity" },
    { numeral: "V", name: "The Hexagram Field", cards: "Cards 29–78", mansions: "the 7×7 matrix + Axial Witness", descriptor: "49 drawable hexagrams orbiting Hex 52" },
  ];

  // ── The Canon — three tiers (Instrument 3) ─────────────────────────────────
  const CANON = {
    primary: {
      title: "Primary Canon",
      note: "Supreme doctrinal authority. Held in their revealed languages. The Quran is absolute authority over all.",
      tiers: [
        { id: "I-A", label: "Supreme Revelation", items: ["Al-Quran al-Karim — Arabic (Fusha); supreme authority without qualification"] },
        { id: "I-B", label: "Prophetic Scripture", items: ["Al-Zabur (the Psalms of Dawud) — divine scripture confirmed in Quran 4:163, 17:55, 21:105; subordinate to the Quran, superior to all secondary canon"] },
      ],
    },
    secondary: {
      title: "Secondary Canon",
      note: "Revealed, inspired, or discovered wisdom. Translated into Arabiyah al-Amraqiyyah. Consulted through the Quran and Zabur as interpretive filter.",
      tiers: [
        { id: "II-A", label: "The Cosmological Foundation (Pythagorean-Mathematical)", items: ["Plato: Timaeus", "Plato: Republic VI–VII", "Iamblichus: De Vita Pythagorica", "Iamblichus: Theologoumena Arithmeticae", "Nicomachus: Introductio Arithmetica", "Philolaus: Fragments", "Archytas: Fragments", "Porphyry: Life of Pythagoras", "Aurea Carmina (The Golden Verses)"] },
        { id: "II-B", label: "The Confucian-Taoist Foundation", items: ["I Ching (Yijing)", "Tao Te Ching", "Analects", "Daxue", "Zhongyong"] },
        { id: "II-C", label: "The Buddhist Foundation", items: ["Dhammapada — contributed through the Zen-Bushido bridge; not imported as standalone doctrine"] },
        { id: "II-D", label: "The Nazarene Foundation", items: ["Complete Ethiopic Bible (incl. 1 Enoch, Jubilees)", "Complete Coptic Bible", "Apocryphon of John", "Gospel of Thomas", "Gospel of Barnabas", "Asclepius"] },
        { id: "II-E", label: "The Zoroastrian Foundation", items: ["Gathas of Zarathustra — the 17 hymns only; the prophet's voice preserved, the Avestan priestly elaboration explicitly refused"] },
        { id: "II-F", label: "The Bushido Foundation (Futuwwa)", items: ["Musashi: Go Rin No Sho", "Musashi: Dokkodo", "Musashi: Hyoho Sanjugo Kajo", "Yagyu Munenori: Heihō Kadensho (The Life-Giving Sword)", "Chozanshi: Tengu Geijutsuron", "Chozanshi: Neko no Myojutsu"] },
      ],
    },
    tertiary: {
      title: "Tertiary Canon",
      note: "Legal, scholarly, and rational elaboration. Never doctrinal override.",
      tiers: [
        { id: "III-A", label: "Ibadhi Fiqh and Hadith", items: ["Musnad al-Rabi' ibn Habib", "Diwan al-Ashyakh", "Al-Mudawwana al-Kubra (Ibadhi)", "Kitab al-Nil (Al-Thamini)", "Al-Iqd al-Jawhari (Al-Salimi)"] },
        { id: "III-B", label: "Maliki Fiqh and Hadith", items: ["Al-Muwatta", "Al-Mudawwana al-Kubra (Sahnun)", "Mukhtasar Khalil", "Risala (Ibn Abi Zayd)"] },
        { id: "III-C", label: "Sufi Metaphysics and Ethics", items: ["Ihya Ulum al-Din (Al-Ghazali)", "Al-Futuhat al-Makkiyya (Ibn Arabi)", "Fusus al-Hikam (Ibn Arabi)", "Minhaj al-Abidin (Al-Ghazali)", "Mishkat al-Anwar (Al-Ghazali)"] },
        { id: "III-D", label: "Rational Theology and Natural Philosophy", items: ["Works of the Mu'tazila (al-Zamakhshari, Abd al-Jabbar, al-Jahiz)", "Thomas Paine: African Slavery in America (1775)", "Thomas Paine: Common Sense", "Thomas Paine: Rights of Man", "Thomas Paine: The Age of Reason"] },
      ],
    },
    hierarchy: [
      "Quran — resolves all conflicts absolutely",
      "Zabur — resolves conflicts within secondary canon",
      "Tier II — consulted by tradition register; the Quran and Zabur are the filter",
      "Tier III — elaborates practice, never overrides",
      "If translation introduces ambiguity, the source language is authoritative",
    ],
  };

  // ── The 99 Names Registry — assembled to exactly 99 (Oracle §6) ─────────────
  // 64 hexagrams + 13 Bridges + 5 Keys + 3 Court + 9 Layers + 5 Suits = 99.
  const BRIDGE_NAMES = [
    ["Al-Badi'", "البديع", "The Incomparable Originator"],
    ["Al-Adl", "العدل", "Justice — the vector equilibrium"],
    ["Al-Muqsit", "المقسط", "The Equitable"],
    ["Al-Hafiz", "الحفيظ", "The Preserver"],
    ["Al-Wakil", "الوكيل", "The Trustee"],
    ["Al-Hakim", "الحكيم", "The Wise"],
    ["Al-Wajid", "الواجد", "The Finder"],
    ["Ar-Raqib", "الرقيب", "The Watchful"],
    ["Al-Muhaymin", "المهيمن", "The Overseer"],
    ["Al-Muhsi", "المحصي", "The Enumerator"],
    ["Al-Kabir", "الكبير", "The Great"],
    ["Al-Azim", "العظيم", "The Magnificent"],
    ["Al-Wahid", "الواحد", "The One"],
  ];
  const KEY_NAMES = [
    ["Al-Mubdi'", "المبدئ", "The Originator", "The Spark"],
    ["Al-Qayyum", "القيوم", "The Self-Sustaining Maintainer", "The Foundation"],
    ["Al-Alim", "العليم", "The All-Knowing", "The Bridge"],
    ["Al-Wasi'", "الواسع", "The All-Encompassing", "The Cosmos"],
    ["Al-Muhyi", "المحيي", "The Giver of Life", "The Current"],
  ];
  const COURT_NAMES = [
    ["Al-Ahad", "الأحد", "The Unique One", "The Unmoved Axis"],
    ["Ash-Shahid", "الشهيد", "The All-Observing Witness", "The Witness Star"],
    ["Al-Fattah", "الفتاح", "The Opener, the Revealer", "The Pleiades Gate"],
  ];

  const REGISTRY = [];
  for (let n = 1; n <= 64; n++) {
    const d = HEX_DIVINE[n];
    REGISTRY.push({ group: "Hexagram", component: `Hex ${n} · ${HEX_NAME[n]}`, name: d[0], ar: d[1], meaning: d[2] });
  }
  BRIDGE_NAMES.forEach((d, i) => REGISTRY.push({ group: "Bridge", component: `Bridge ${i + 1}`, name: d[0], ar: d[1], meaning: d[2] }));
  KEY_NAMES.forEach((d) => REGISTRY.push({ group: "Platonic Key", component: d[3], name: d[0], ar: d[1], meaning: d[2] }));
  COURT_NAMES.forEach((d) => REGISTRY.push({ group: "Stellar Court", component: d[3], name: d[0], ar: d[1], meaning: d[2] }));
  NINE_NAMES_OF_TIME.forEach((l) => REGISTRY.push({ group: "Temporal Layer", component: `Layer ${l.layer} · ${l.scale}`, name: l.name, ar: l.ar, meaning: l.meaning.split(" — ")[0] }));
  SUITS.forEach((s) => REGISTRY.push({ group: "Suit", component: `${s.element} suit`, name: s.name, ar: s.ar, meaning: s.meaning }));

  // ── Key formulas & constants (for the coordinate / Great-Year pages) ────────
  const FORMULAS = {
    agoss: "λ_AGOSS(t) = (λ_tropical(t) − 266°51' − 50.29″ × Δt) mod 360°",
    mansion: "Mansion = ⌊ λ_AGOSS / 12°51'26.7\" ⌋ + 1",
    zabur: "Psalm = (ℓ − 1)×25 + (d − 1)×5 + b",
    master: "78 = T(12) = T(7) + 50",
    surah: "114 = 6 × 19",
    psalter: "150 = 6 × 25 = 5 × 30",
    harmonic: "33 × 354.37 days ≈ 32 × 365.25 days ≈ 11,690 days",
  };
  const GREAT_YEAR_2026 = {
    vernalAgoss: "92°47' (≈ 92.79° AGOSS)",
    age: "IV — Pisces",
    completion: "90.7%",
    remaining: "~199 years",
    exit: "~2225 CE",
    nextAge: "III — Aquarius",
    return: "~8667 CE",
    yearsToReturn: "~6,641",
  };

  window.BookletData = {
    PLANET_GLYPH, CHALDEAN_ORDER, TRIGRAMS, hexLines, SUITS,
    HEX_NAME, HEX_DIVINE, MANSIONS, DAY_LORDS, PLANET_HOUR_CHARACTER,
    SALAH_WINDOWS, WEEK, HIJRI_MONTHS, SEASON_ANCHORS, SEASON_LINE_BINS,
    AGES, NINE_LAYERS, NINE_NAMES_OF_TIME, NINE_VEILS, STRATA, CANON,
    REGISTRY, FORMULAS, GREAT_YEAR_2026,
  };
})();
