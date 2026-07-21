// @ts-nocheck
/**
 * The ratified 78-card DECK registry + shared card vocabulary — extracted
 * VERBATIM (scripted) from the Design System's
 * docs/design-system/components/oracle/DeckCard.jsx (Oracle §5, Appendix A/B).
 * Do not hand-edit the data; re-extract if the DS changes. The CSS-var color
 * maps (PLANET_COLOR / EL_COLOR) are intentionally NOT extracted — the RN
 * DeckCard redefines them from src/theme.ts.
 */
export const SIGIL = { Saturn: "♄", Jupiter: "♃", Mars: "♂", Sun: "☉", Venus: "♀", Mercury: "☿", Moon: "☾", Gen: "☶" };
export const TRIGRAM = { Saturn: "☷", Jupiter: "☲", Mars: "☳", Sun: "☰", Venus: "☱", Mercury: "☴", Moon: "☵", Gen: "☶" };
export const TRIG_LINES = { Saturn: [0, 0, 0], Jupiter: [1, 0, 1], Mars: [1, 0, 0], Sun: [1, 1, 1], Venus: [1, 1, 0], Mercury: [0, 1, 1], Moon: [0, 1, 0], Gen: [0, 0, 1] };
export const EL_GLYPH = { Fire: "𓊮", Earth: "𓇾", Ether: "𓇯", Air: "𓊡", Water: "𓈗", Axial: "𓊽" };
export function hexLines(upper, lower) { return [...TRIG_LINES[lower], ...TRIG_LINES[upper]]; }

// ---------- the ratified 78-card registry ----------
const M = (mansion, mansionName, letter, letterName, abjad, ruler) => ({ mansion, mansionName, letter, letterName, abjad, ruler });
const COURT = [
  { n: 1, name: "The Unmoved Axis", identity: "Sgr A* · Gen ☶", trigger: "Both gates open simultaneously", divine: "Al-Ahad", divineAr: "الأحد", meaning: "The Unique One", glyph: "𓊽", ...M(1, "Al-Sharatain", "أ", "Alif", 1, "Saturn") },
  { n: 2, name: "The Witness Star", identity: "Sirius · Al-Shi'ra", trigger: "Heliacal rising · Moon within 1° of Sirius", divine: "Ash-Shahid", divineAr: "الشهيد", meaning: "The All-Observing Witness", glyph: "𓇼", ...M(2, "Al-Butain", "ب", "Ba", 2, "Saturn") },
  { n: 3, name: "The Pleiades Gate", identity: "Pleiades · Al-Thurayya", trigger: "Heliacal rising · Moon within 1° of Alcyone", divine: "Al-Fattah", divineAr: "الفتاح", meaning: "The Opener", glyph: "𓉐", ...M(3, "Al-Thurayya", "ج", "Jim", 3, "Saturn") },
].map((c) => ({ ...c, stratum: 1 }));
const COUNCIL = [
  { n: 4, name: "The Architect", planet: "Saturn", element: "Earth", divine: "As-Sabur", divineAr: "الصبور", meaning: "The Patient", yang: { hex: 15, hname: "Modesty", dn: "Al-Khafid" }, yin: { hex: 23, hname: "Splitting Apart", dn: "Al-Hasib" }, ...M(4, "Al-Dabaran", "د", "Dal", 4, "Saturn") },
  { n: 5, name: "The Illuminator", planet: "Jupiter", element: "Fire", divine: "Al-Karim", divineAr: "الكريم", meaning: "The Generous", yang: { hex: 56, hname: "The Wanderer", dn: "Al-Basit" }, yin: { hex: 22, hname: "Grace", dn: "Al-Barr" }, ...M(5, "Al-Haq'ah", "ه", "Ha", 5, "Jupiter") },
  { n: 6, name: "The Striker", planet: "Mars", element: "Fire", divine: "Al-Qawi", divineAr: "القوي", meaning: "The All-Strong", yang: { hex: 62, hname: "Preponderance of the Small", dn: "Al-Muqaddim" }, yin: { hex: 27, hname: "Nourishment", dn: "Al-Muqit" }, ...M(6, "Al-Han'ah", "و", "Waw", 6, "Jupiter") },
  { n: 7, name: "The Sovereign", planet: "Sun", element: "Ether", divine: "An-Nur", divineAr: "النور", meaning: "The Light", yang: { hex: 33, hname: "Retreat", dn: "Az-Zahir" }, yin: { hex: 26, hname: "Taming Power of the Great", dn: "Al-Batin" }, ...M(7, "Al-Dhira", "ز", "Zayn", 7, "Jupiter") },
  { n: 8, name: "The Harmonist", planet: "Venus", element: "Water", divine: "Al-Wadud", divineAr: "الودود", meaning: "The Loving", yang: { hex: 31, hname: "Influence", dn: "Al-Mujib" }, yin: { hex: 41, hname: "Decrease", dn: "Al-Afuww" }, ...M(8, "Al-Nathrah", "ح", "Haa", 8, "Jupiter") },
  { n: 9, name: "The Messenger", planet: "Mercury", element: "Air", divine: "Al-Khabir", divineAr: "الخبير", meaning: "The Fully Aware", yang: { hex: 53, hname: "Gradual Progress", dn: "Ar-Rashid" }, yin: { hex: 18, hname: "Work on What Has Decayed", dn: "Al-Mu'id" }, ...M(9, "Al-Tarf", "ط", "Tta", 9, "Mars") },
  { n: 10, name: "The Keeper", planet: "Moon", element: "Water", divine: "Al-Latif", divineAr: "اللطيف", meaning: "The Subtle", yang: { hex: 39, hname: "Obstruction", dn: "Al-Qabid" }, yin: { hex: 4, hname: "Youthful Folly", dn: "Ar-Ra'uf" }, ...M(10, "Al-Jabhah", "ي", "Ya", 10, "Mars") },
].map((c) => ({ ...c, stratum: 2 }));
const KEYS = [
  { n: 11, name: "The Spark", solid: "tetrahedron", faces: 4, element: "Fire", register: "Jalal", book: "Book I · Pss 1–41", orient: "Upright — yang primary", divine: "Al-Mubdi'", divineAr: "المبدئ", meaning: "The Originator", ...M(11, "Al-Zubrah", "ك", "Kaf", 20, "Mars") },
  { n: 12, name: "The Foundation", solid: "cube", faces: 6, element: "Earth", register: "Jalal", book: "Book III · Pss 73–89", orient: "Inverted — yin primary", divine: "Al-Qayyum", divineAr: "القيوم", meaning: "The Self-Sustaining", ...M(12, "Al-Sarfah", "ل", "Lam", 30, "Mars") },
  { n: 13, name: "The Bridge", solid: "octahedron", faces: 8, element: "Air", register: "Jamal", book: "Book V · Pss 107–150", orient: "Upright — yang primary", divine: "Al-Alim", divineAr: "العليم", meaning: "The All-Knowing", ...M(13, "Al-Awwa", "م", "Mim", 40, "Sun") },
  { n: 14, name: "The Cosmos", solid: "dodecahedron", faces: 12, element: "Ether", register: "Kamal", book: "Book IV · Pss 90–106", orient: "Sideways — both equal", divine: "Al-Wasi'", divineAr: "الواسع", meaning: "The All-Encompassing", ...M(14, "Al-Simak", "ن", "Nun", 50, "Sun") },
  { n: 15, name: "The Current", solid: "icosahedron", faces: 20, element: "Water", register: "Jamal", book: "Book II · Pss 42–72", orient: "Inverted — yin primary", divine: "Al-Muhyi", divineAr: "المحيي", meaning: "The Giver of Life", ...M(15, "Al-Ghafr", "س", "Sin", 60, "Sun") },
].map((c) => ({ ...c, stratum: 3 }));
const B = (n, bn, arch, archName, cat, catName, character, divine, divineAr, chiral, m) => ({ n, stratum: 4, bn, name: `Bridge ${bn}`, arch, archName, cat, catName, character, divine, divineAr, chiral: !!chiral, ...m });
const BRIDGES = [
  B(16, 1, "truncated_tetrahedron", "Truncated Tetrahedron", "triakis_tetrahedron", "Triakis Tetrahedron", "First emergence — pure form beginning to complexify", "Al-Badi'", "البديع", 0, M(16, "Al-Zubana", "ع", "Ayn", 70, "Sun")),
  B(17, 2, "cuboctahedron", "Cuboctahedron", "rhombic_dodecahedron", "Rhombic Dodecahedron", "Perfect equilibrium — the vector equilibrium", "Al-Adl", "العدل", 0, M(17, "Al-Iklil", "ف", "Fa", 80, "Venus")),
  B(18, 3, "truncated_cube", "Truncated Cube", "triakis_octahedron", "Triakis Octahedron", "Structure refined — cutting away excess", "Al-Muqsit", "المقسط", 0, M(18, "Al-Qalb", "ص", "Sad", 90, "Venus")),
  B(19, 4, "truncated_octahedron", "Truncated Octahedron", "tetrakis_hexahedron", "Tetrakis Hexahedron", "Expansion bounded — open form finding walls", "Al-Hafiz", "الحفيظ", 0, M(19, "Al-Shawlah", "ق", "Qaf", 100, "Venus")),
  B(20, 5, "rhombicuboctahedron", "Rhombicuboctahedron", "deltoidal_icositetrahedron", "Deltoidal Icositetrahedron", "Practical compound — many faces working together", "Al-Wakil", "الوكيل", 0, M(20, "Al-Na'aim", "ر", "Ra", 200, "Venus")),
  B(21, 6, "truncated_cuboctahedron", "Truncated Cuboctahedron", "disdyakis_dodecahedron", "Disdyakis Dodecahedron", "Maximum cubic complexity — all face types integrated", "Al-Hakim", "الحكيم", 0, M(21, "Al-Baldah", "ش", "Shin", 300, "Mercury")),
  B(22, 7, "snub_cube", "Snub Cube", "pentagonal_icositetrahedron", "Pentagonal Icositetrahedron", "Mirror paths — two valid routes; handedness decides", "Al-Wajid", "الواجد", 1, M(22, "Sa'd al-Dhabih", "ت", "Ta", 400, "Mercury")),
  B(23, 8, "icosidodecahedron", "Icosidodecahedron", "rhombic_triacontahedron", "Rhombic Triacontahedron", "Cosmic-emotional threshold — universal meets personal", "Ar-Raqib", "الرقيب", 0, M(23, "Sa'd Bula", "ث", "Tha", 500, "Mercury")),
  B(24, 9, "truncated_dodecahedron", "Truncated Dodecahedron", "triakis_icosahedron", "Triakis Icosahedron", "Cosmic rendered accessible — pentagons opening", "Al-Muhaymin", "المهيمن", 0, M(24, "Sa'd al-Su'ud", "خ", "Kha", 600, "Mercury")),
  B(25, 10, "truncated_icosahedron", "Truncated Icosahedron", "pentakis_dodecahedron", "Pentakis Dodecahedron", "Familiar deep pattern — the fullerene made visible", "Al-Muhsi", "المحصي", 0, M(25, "Sa'd al-Akhbiyah", "ذ", "Dhal", 700, "Moon")),
  B(26, 11, "rhombicosidodecahedron", "Rhombicosidodecahedron", "deltoidal_hexecontahedron", "Deltoidal Hexecontahedron", "Maximum compound short of totality — 62 of 64", "Al-Kabir", "الكبير", 0, M(26, "Al-Fargh al-Awwal", "ض", "Dad", 800, "Moon")),
  B(27, 12, "truncated_icosidodecahedron", "Truncated Icosidodecahedron", "disdyakis_triacontahedron", "Disdyakis Triacontahedron", "Maximum complexity — all face types present", "Al-Azim", "العظيم", 0, M(27, "Al-Fargh al-Thani", "ظ", "Dha", 900, "Moon")),
  B(28, 13, "snub_dodecahedron", "Snub Dodecahedron", "pentagonal_hexecontahedron", "Pentagonal Hexecontahedron", "Mirror paths at cosmic scale — highest-stakes handedness", "Al-Wahid", "الواحد", 1, M(28, "Batn al-Hut", "غ", "Ghayn", 1000, "Moon")),
];
const F = (n, hex, hname, upper, lower, suit, divine, pure, crown) => ({ n, stratum: 5, hex, hname, name: `Hex ${hex} — ${hname}`, upper, lower, suit, divine, divineAr: DIVINE_AR[divine], pure: !!pure, crown: !!crown });
// Arabic script for the field cards' Divine Names (standard Tirmidhi orthography)
const DIVINE_AR = {
  "As-Sabur": "الصبور", "Ad-Darr": "الضار", "Al-Ba'ith": "الباعث", "As-Salam": "السلام", "Al-Waali": "الوالي", "Ar-Rafi'": "الرافع", "Al-Jabbar": "الجبار",
  "Al-Mu'izz": "المعز", "Al-Karim": "الكريم", "Al-Muntaqim": "المنتقم", "Al-Ghani": "الغني", "Al-Mani'": "المانع", "Al-Bari'": "البارئ", "Al-Muqtadir": "المقتدر",
  "Al-Hamid": "الحميد", "Al-Maajid": "الماجد", "Al-Qawi": "القوي", "Al-Qahhar": "القهار", "Al-Mudhill": "المذل", "Al-Warith": "الوارث", "An-Nafi'": "النافع",
  "Al-Muta'ali": "المتعالي", "Al-Mu'min": "المؤمن", "Al-Haqq": "الحق", "An-Nur": "النور", "Al-Ali": "العلي", "Al-Awwal": "الأول", "Al-Akhir": "الآخر",
  "Al-Jalil": "الجليل", "Al-Hakam": "الحكم", "Al-Majid": "المجيد", "Al-Mutakabbir": "المتكبر", "Dhul-Jalali-wal-Ikram": "ذو الجلال والإكرام", "Al-Khabir": "الخبير", "Al-Ghaffar": "الغفار",
  "Malik-ul-Mulk": "مالك الملك", "Al-Mumit": "المميت", "Al-Wali": "الولي", "Al-Ghafur": "الغفور", "Al-Halim": "الحليم", "Ash-Shakur": "الشكور",
  "Al-Hayy": "الحي", "Al-Basir": "البصير", "Al-Khaliq": "الخالق", "As-Sami'": "السميع", "Al-Mu'akhkhir": "المؤخر", "Al-Mughni": "المغني", "Al-Wadud": "الودود", "Al-Latif": "اللطيف",
};
const FIELD = [
  { ...F(29, 52, "The Axial Witness", "Gen", "Gen", "Axial", "As-Samad"), divineAr: "الصمد", meaning: "The Eternal Absolute", axial: true },
  F(30, 2, "The Receptive", "Saturn", "Saturn", "Earth", "As-Sabur", 1), F(31, 36, "Darkening of the Light", "Saturn", "Jupiter", "Earth", "Ad-Darr"), F(32, 24, "Return", "Saturn", "Mars", "Earth", "Al-Ba'ith"), F(33, 11, "Peace", "Saturn", "Sun", "Earth", "As-Salam"), F(34, 19, "Approach", "Saturn", "Venus", "Earth", "Al-Waali"), F(35, 46, "Pushing Upward", "Saturn", "Mercury", "Earth", "Ar-Rafi'"), F(36, 7, "The Army", "Saturn", "Moon", "Earth", "Al-Jabbar"),
  F(37, 35, "Progress", "Jupiter", "Saturn", "Fire", "Al-Mu'izz"), F(38, 30, "The Clinging", "Jupiter", "Jupiter", "Fire", "Al-Karim", 1), F(39, 21, "Biting Through", "Jupiter", "Mars", "Fire", "Al-Muntaqim"), F(40, 14, "Great Possession", "Jupiter", "Sun", "Fire", "Al-Ghani"), F(41, 38, "Opposition", "Jupiter", "Venus", "Fire", "Al-Mani'"), F(42, 50, "The Cauldron", "Jupiter", "Mercury", "Fire", "Al-Bari'"), F(43, 64, "Before Completion", "Jupiter", "Moon", "Fire", "Al-Muqtadir"),
  F(44, 16, "Enthusiasm", "Mars", "Saturn", "Fire", "Al-Hamid"), F(45, 55, "Abundance", "Mars", "Jupiter", "Fire", "Al-Maajid"), F(46, 51, "The Arousing", "Mars", "Mars", "Fire", "Al-Qawi", 1), F(47, 34, "Great Power", "Mars", "Sun", "Fire", "Al-Qahhar"), F(48, 54, "The Marrying Maiden", "Mars", "Venus", "Fire", "Al-Mudhill"), F(49, 32, "Duration", "Mars", "Mercury", "Fire", "Al-Warith"), F(50, 40, "Deliverance", "Mars", "Moon", "Fire", "An-Nafi'"),
  F(51, 12, "Standstill", "Sun", "Saturn", "Ether", "Al-Muta'ali"), F(52, 13, "Fellowship", "Sun", "Jupiter", "Ether", "Al-Mu'min"), F(53, 25, "Innocence", "Sun", "Mars", "Ether", "Al-Haqq"), F(54, 1, "The Creative", "Sun", "Sun", "Ether", "An-Nur", 1, 1), F(55, 10, "Treading", "Sun", "Venus", "Ether", "Al-Ali"), F(56, 44, "Coming to Meet", "Sun", "Mercury", "Ether", "Al-Awwal"), F(57, 6, "Conflict", "Sun", "Moon", "Ether", "Al-Akhir"),
  F(58, 20, "Contemplation", "Mercury", "Saturn", "Air", "Al-Jalil"), F(59, 37, "The Family", "Mercury", "Jupiter", "Air", "Al-Hakam"), F(60, 42, "Increase", "Mercury", "Mars", "Air", "Al-Majid"), F(61, 9, "Small Taming", "Mercury", "Sun", "Air", "Al-Mutakabbir"), F(62, 61, "Inner Truth", "Mercury", "Venus", "Air", "Dhul-Jalali-wal-Ikram"), F(63, 57, "The Gentle", "Mercury", "Mercury", "Air", "Al-Khabir", 1), F(64, 59, "Dispersion", "Mercury", "Moon", "Air", "Al-Ghaffar"),
  F(65, 45, "Gathering Together", "Venus", "Saturn", "Water", "Malik-ul-Mulk"), F(66, 49, "Revolution", "Venus", "Jupiter", "Water", "Al-Mumit"), F(67, 17, "Following", "Venus", "Mars", "Water", "Al-Wali"), F(68, 43, "Breakthrough", "Venus", "Sun", "Water", "Al-Ghafur"), F(69, 58, "The Joyous", "Venus", "Venus", "Water", "Al-Wadud", 1), F(70, 28, "Great Preponderance", "Venus", "Mercury", "Water", "Al-Halim"), F(71, 47, "Oppression", "Venus", "Moon", "Water", "Ash-Shakur"),
  F(72, 8, "Holding Together", "Moon", "Saturn", "Water", "Al-Hayy"), F(73, 63, "After Completion", "Moon", "Jupiter", "Water", "Al-Basir"), F(74, 3, "Difficulty at the Beginning", "Moon", "Mars", "Water", "Al-Khaliq"), F(75, 5, "Waiting", "Moon", "Sun", "Water", "As-Sami'"), F(76, 60, "Limitation", "Moon", "Venus", "Water", "Al-Mu'akhkhir"), F(77, 48, "The Well", "Moon", "Mercury", "Water", "Al-Mughni"), F(78, 29, "The Abysmal", "Moon", "Moon", "Water", "Al-Latif", 1),
];
export const DECK = [...COURT, ...COUNCIL, ...KEYS, ...BRIDGES, ...FIELD];
