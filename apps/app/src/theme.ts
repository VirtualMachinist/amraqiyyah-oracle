/**
 * The Amraqiyyah Oracle — design tokens (React Native port of the ratified
 * Design System). Sacred, ancient, geometric: copper metallic trim, lapis
 * lazuli blue, gold leaf, on deep night. Serif display/body voice (Crimson Pro
 * / EB Garamond), IBM Plex Mono for the deterministic readouts, Amiri for the
 * sacred Arabic.
 */
export const COLORS = {
  // Surfaces — the deep night
  bg: '#0b0b12',
  panel: '#14141f',
  panelSoft: '#1b1b2a',
  line: '#2b2b40',
  core1: '#161428', // dial-core radial inner
  core2: '#0b0b12', // dial-core radial outer

  // Ink
  text: '#e8e6f0',
  dim: '#9a96b8',

  // Metals — the sacred trim
  gold: '#d4af6a',
  copper: '#b87333',
  copperLight: '#d99a5c',

  // Lapis — the night sky
  lapis: '#26418f',
  lapisLight: '#6d8fd8',

  // Signal
  teal: '#5ac8c8',
  crimson: '#c85a6e',

  // Yin / Yang — hexagram lines
  yang: '#d4af6a',
  yin: '#5a6ac8',

  // Washes
  highlightWash: 'rgba(212,175,106,0.08)', // jumped-to verse halo
};

/** Elemental suits (deck) — drawn from the planetary palette. */
export const ELEMENT: Record<string, string> = {
  Fire: '#c85a6e',
  Earth: '#b87333',
  Ether: '#d4af6a',
  Air: '#5ac8c8',
  Water: '#6d8fd8',
};

/** Glass-polyhedron language (Hedronite canonical). */
export const GLASS = {
  face: '#33468c',
  deep: '#1e3a8a',
  edge: '#9d684e',
  glow: '#5d7fd0',
};

/** Planetary sigil colours (Sacred Clock). */
export const PLANET_COLOR: Record<string, string> = {
  Saturn: '#9a93a8',
  Jupiter: '#6d8fd8',
  Mars: '#c85a6e',
  Sun: '#d4af6a',
  Venus: '#7bbf9e',
  Mercury: '#d99a5c',
  Moon: '#c8ccda',
};

/**
 * Font families — each weight is its own family (RN convention). Keys match the
 * @expo-google-fonts export names loaded in App via useFonts.
 */
export const FONTS = {
  display: 'CrimsonPro_400Regular',
  displaySemi: 'CrimsonPro_600SemiBold',
  displayBold: 'CrimsonPro_700Bold',
  body: 'EBGaramond_400Regular',
  bodyMed: 'EBGaramond_500Medium',
  bodySemi: 'EBGaramond_600SemiBold',
  mono: 'IBMPlexMono_400Regular',
  monoMed: 'IBMPlexMono_500Medium',
  monoSemi: 'IBMPlexMono_600SemiBold',
  arabic: 'Amiri_400Regular',
  arabicBold: 'Amiri_700Bold',
};

/** Spacing scale (px) — the app's rhythm. */
export const SPACE = {
  1: 4, 2: 6, 3: 8, 4: 10, 5: 12, 6: 14, 7: 16, 8: 20, 10: 24, 12: 32, 16: 48,
} as const;

/** Corner radii. */
export const RADIUS = {
  sm: 8, md: 10, lg: 12, pill: 20, full: 999,
} as const;

/** Type scale (px). */
export const TYPE = {
  xs: 11, sm: 12, base: 15, md: 16, lg: 20, xl: 24, xxl: 32, xxxl: 40, arabic: 26,
} as const;

/** Letter-spacing (RN uses absolute px, not em; values ≈ em×fontSize). */
export const TRACK = {
  eyebrow: 1.6, // ~0.18em on ~11px eyebrows
  wide: 0.9,
  tight: -0.2,
} as const;
