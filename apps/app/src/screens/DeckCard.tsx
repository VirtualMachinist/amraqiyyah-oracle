/**
 * DeckCard — full card art for the 78-card Amraqiyyah Oracle deck, ported to
 * React Native from the ratified Design System (Oracle §5, Appendix A/B) and
 * the Hedronite glass-polyhedron visual language. Honours: uniform backs,
 * split faces (two regions on one front, never reversible), sideways Agent
 * placement, chiral marks on 22/28. Kemetic accents are Unicode Mdw Ntr signs
 * (Canon §13.4) — left on the system font (no custom family), like the astro
 * sigils, so they render wherever the platform provides them.
 */
import React, { useMemo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, G, Pattern, RadialGradient, Rect, Stop } from 'react-native-svg';
import { COLORS, ELEMENT, FONTS, PLANET_COLOR as THEME_PLANET_COLOR } from '../theme';
import { SolidView } from './SolidView';
import { DECK, EL_GLYPH, SIGIL, TRIGRAM, hexLines } from '../deck/registry';

const PLANET_COLOR: Record<string, string> = { ...THEME_PLANET_COLOR, Gen: COLORS.gold };
const EL_COLOR: Record<string, string> = { ...ELEMENT, Axial: COLORS.gold };

/** Card aspect per the physical deck: 2.75 × 4.75 in. */
export const CARD_ASPECT = 1.714;

let GID = 0;

export type CardOrientation = 'upright' | 'inverted' | 'sideways';

interface DeckCardProps {
  card?: number | 'back';
  width?: number;
  orientation?: CardOrientation;
}

// ---------- small figures ----------

function HexFigure({
  upper,
  lower,
  w,
  k,
  accent,
}: {
  upper: string;
  lower: string;
  w: number;
  k: number;
  accent?: string;
}) {
  const lines = hexLines(upper, lower) as number[];
  const bar = 8 * k;
  const gap = 5 * k;
  return (
    <View style={{ flexDirection: 'column-reverse', gap, width: w }}>
      {lines.map((y, i) =>
        y ? (
          <View key={i} style={{ height: bar, borderRadius: 2 * k, backgroundColor: accent || COLORS.yang }} />
        ) : (
          <View key={i} style={{ flexDirection: 'row', gap: w * 0.18, height: bar }}>
            <View style={{ flex: 1, borderRadius: 2 * k, backgroundColor: COLORS.yin }} />
            <View style={{ flex: 1, borderRadius: 2 * k, backgroundColor: COLORS.yin }} />
          </View>
        )
      )}
    </View>
  );
}

/** The card ground: night radial gradient + the concentric-lapis ripple. */
function Ground({ w, h, k }: { w: number; h: number; k: number }) {
  const gid = useMemo(() => `dc${++GID}`, []);
  const tile = 200 * k;
  return (
    <Svg width={w} height={h} style={StyleSheet.absoluteFill} pointerEvents="none">
      <Defs>
        <RadialGradient id={`${gid}v`} cx="50%" cy="38%" rx="62%" ry="48%" gradientUnits="objectBoundingBox">
          <Stop offset="0%" stopColor="#121220" stopOpacity="0" />
          <Stop offset="100%" stopColor="#0b0b12" stopOpacity="1" />
        </RadialGradient>
        <Pattern id={`${gid}r`} width={tile} height={tile} patternUnits="userSpaceOnUse">
          <G fill="none" stroke={COLORS.lapis} strokeOpacity={0.3} strokeWidth={0.5}>
            <Circle cx={tile / 2} cy={tile / 2} r={36 * k} />
            <Circle cx={tile / 2} cy={tile / 2} r={72 * k} />
            <Circle cx={tile / 2} cy={tile / 2} r={108 * k} />
          </G>
        </Pattern>
      </Defs>
      <Rect width={w} height={h} fill={`url(#${gid}v)`} />
      <Rect width={w} height={h} fill={`url(#${gid}r)`} opacity={0.5} />
    </Svg>
  );
}

/** A soft lapis radial glow (the Court cards' halo). */
function Halo({ size }: { size: number }) {
  const gid = useMemo(() => `dh${++GID}`, []);
  return (
    <Svg width={size} height={size} style={{ position: 'absolute' }} pointerEvents="none">
      <Defs>
        <RadialGradient id={gid} cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor={COLORS.lapis} stopOpacity="0.5" />
          <Stop offset="55%" stopColor={COLORS.lapis} stopOpacity="0.12" />
          <Stop offset="75%" stopColor={COLORS.lapis} stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Circle cx={size / 2} cy={size / 2} r={size / 2} fill={`url(#${gid})`} />
    </Svg>
  );
}

// ---------- the card ----------

export function DeckCard({ card = 'back', width = 300, orientation = 'upright' }: DeckCardProps) {
  const k = width / 300;
  const h = Math.round(width * CARD_ASPECT);
  const c: any = card === 'back' ? null : DECK[(card as number) - 1];
  const el = c && (c.element || c.suit);
  const accent = c ? (c.stratum === 1 ? COLORS.gold : EL_COLOR[el] || COLORS.gold) : COLORS.gold;
  const fs = (n: number) => n * k;
  const ls = (em: number, size: number) => em * size * k;

  const frame = {
    width,
    height: h,
    backgroundColor: '#0e0e18',
    borderRadius: 14 * k,
    borderWidth: 1,
    borderColor: COLORS.line,
    overflow: 'hidden' as const,
  };
  const innerBorder = {
    position: 'absolute' as const,
    top: 8 * k,
    left: 8 * k,
    right: 8 * k,
    bottom: 8 * k,
    borderWidth: 1,
    borderColor: c && (c.axial || c.crown || c.stratum === 1) ? COLORS.gold : 'rgba(184,115,51,.55)',
    borderRadius: 8 * k,
  };

  let body: React.ReactNode;

  if (!c) {
    // ---- uniform back ----
    const frieze = (flip: boolean) => (
      <Text
        style={{
          fontSize: fs(15),
          color: COLORS.copper,
          letterSpacing: 6 * k,
          transform: flip ? [{ rotate: '180deg' }] : undefined,
        }}
      >
        𓇼 𓊮 𓇾 𓊡 𓈗 𓇯 𓇼
      </Text>
    );
    body = (
      <View
        style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center', gap: 14 * k }]}
      >
        {frieze(false)}
        <View
          style={{
            width: 120 * k,
            height: 120 * k,
            borderRadius: 60 * k,
            borderWidth: 1,
            borderColor: COLORS.copper,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              width: 92 * k,
              height: 92 * k,
              borderRadius: 46 * k,
              borderWidth: 1,
              borderColor: 'rgba(212,175,106,.5)',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <Image
              source={require('../../assets/hedronite-glyph-copper.png')}
              style={{ width: 74 * k, height: 74 * k, marginTop: -10 * k }}
              resizeMode="contain"
            />
          </View>
        </View>
        {frieze(true)}
      </View>
    );
  } else {
    // ---- shared chrome ----
    const header = (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 16 * k,
          paddingHorizontal: 18 * k,
        }}
      >
        <View
          style={{
            width: 26 * k,
            height: 26 * k,
            borderRadius: 13 * k,
            borderWidth: 1,
            borderColor: COLORS.copper,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontFamily: FONTS.mono, fontSize: fs(10), color: COLORS.gold }}>{c.n}</Text>
        </View>
        {c.letter ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontFamily: FONTS.arabic, fontSize: fs(17), color: COLORS.lapisLight }}>{c.letter}</Text>
            <Text style={{ fontFamily: FONTS.mono, fontSize: fs(8), color: COLORS.dim, marginLeft: 4 * k }}>
              {c.abjad}
            </Text>
          </View>
        ) : (
          <Text style={{ fontSize: fs(14), color: accent, opacity: 0.9 }}>{EL_GLYPH[el as keyof typeof EL_GLYPH]}</Text>
        )}
      </View>
    );

    // ---- stratum-specific art (also sets the title's subline) ----
    let art: React.ReactNode = null;
    let sub = '';

    if (c.stratum === 1) {
      sub = c.identity;
      art = (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 * k }}>
          <Halo size={170 * k} />
          {c.n === 1 && (
            <View
              style={{
                position: 'absolute',
                width: 130 * k,
                height: 130 * k,
                borderRadius: 65 * k,
                borderWidth: 1,
                borderColor: 'rgba(212,175,106,.45)',
              }}
            />
          )}
          {c.n === 1 && (
            <View
              style={{
                position: 'absolute',
                width: 96 * k,
                height: 96 * k,
                borderRadius: 48 * k,
                borderWidth: 1,
                borderColor: 'rgba(212,175,106,.3)',
              }}
            />
          )}
          <Text
            style={{
              fontSize: fs(76),
              color: COLORS.gold,
              textShadowColor: 'rgba(212,175,106,.5)',
              textShadowRadius: 26 * k,
              textShadowOffset: { width: 0, height: 0 },
            }}
          >
            {c.glyph}
          </Text>
          {c.n === 3 && (
            <View style={{ position: 'absolute', top: '18%', flexDirection: 'row', gap: 7 * k }}>
              {[3, 5, 4, 6, 4, 5, 3].map((r, i) => (
                <View
                  key={i}
                  style={{
                    width: r * k * 0.9,
                    height: r * k * 0.9,
                    borderRadius: r * k,
                    backgroundColor: '#aebfe8',
                    marginTop: (i % 3) * 4 * k,
                    shadowColor: '#6d8fd8',
                    shadowOpacity: 1,
                    shadowRadius: 6 * k,
                    shadowOffset: { width: 0, height: 0 },
                  }}
                />
              ))}
            </View>
          )}
          {c.n === 2 && (
            <View
              style={{
                position: 'absolute',
                top: '20%',
                right: '24%',
                width: 7 * k,
                height: 7 * k,
                borderRadius: 4 * k,
                backgroundColor: '#eaf0ff',
                shadowColor: '#aebfe8',
                shadowOpacity: 1,
                shadowRadius: 14 * k,
                shadowOffset: { width: 0, height: 0 },
              }}
            />
          )}
          <Text
            style={{
              fontFamily: FONTS.mono,
              fontSize: fs(7.5),
              letterSpacing: ls(0.12, 7.5),
              textTransform: 'uppercase',
              color: COLORS.dim,
              maxWidth: '80%',
              textAlign: 'center',
            }}
          >
            {c.trigger}
          </Text>
        </View>
      );
    } else if (c.stratum === 2) {
      sub = `${c.planet} ${TRIGRAM[c.planet as keyof typeof TRIGRAM]} · Planetary Council`;
      const half = (hx: any, lbl: string, up: string, lo: string, tint: string) => (
        <View
          style={{
            flex: 1,
            backgroundColor: tint,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12 * k,
            paddingVertical: 8 * k,
          }}
        >
          <HexFigure upper={up} lower={lo} w={52 * k} k={k * 0.8} />
          <View>
            <Text
              style={{
                fontFamily: FONTS.mono,
                fontSize: fs(7),
                letterSpacing: ls(0.14, 7),
                textTransform: 'uppercase',
                color: COLORS.dim,
              }}
            >
              {lbl}
            </Text>
            <Text
              style={{
                fontFamily: FONTS.displayBold,
                fontSize: fs(11),
                color: COLORS.text,
                maxWidth: 110 * k,
                lineHeight: fs(13.2),
              }}
            >
              Hex {hx.hex} — {hx.hname}
            </Text>
            <Text style={{ fontFamily: FONTS.mono, fontSize: fs(7.5), color: COLORS.gold, marginTop: 2 * k }}>
              {hx.dn}
            </Text>
          </View>
        </View>
      );
      art = (
        <View
          style={{
            flex: 1,
            marginVertical: 8 * k,
            marginHorizontal: 16 * k,
            borderRadius: 8 * k,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: COLORS.line,
          }}
        >
          {half(c.yang, 'Yang · Pleiadian', c.planet, 'Gen', '#2a2438')}
          {half(c.yin, 'Yin · Sirian', 'Gen', c.planet, '#1c2436')}
          <View
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: -22 * k,
              marginLeft: -22 * k,
              width: 44 * k,
              height: 44 * k,
              borderRadius: 22 * k,
              backgroundColor: COLORS.panel,
              borderWidth: 1.5,
              borderColor: PLANET_COLOR[c.planet],
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: fs(20), color: PLANET_COLOR[c.planet] }}>
              {SIGIL[c.planet as keyof typeof SIGIL]}
            </Text>
          </View>
        </View>
      );
    } else if (c.stratum === 3) {
      sub = `${c.element} · ${c.register} · ${c.faces} faces`;
      art = (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 4 * k }}>
          <SolidView solid={c.solid} size={182 * k} />
          <Text
            style={{
              fontFamily: FONTS.mono,
              fontSize: fs(7.5),
              letterSpacing: ls(0.14, 7.5),
              textTransform: 'uppercase',
              color: COLORS.dim,
              textAlign: 'center',
            }}
          >
            {c.orient}
            {'\n'}
            {c.book}
          </Text>
        </View>
      );
    } else if (c.stratum === 4) {
      sub = c.character;
      art = (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ alignItems: 'center' }}>
            <SolidView solid={c.arch} size={148 * k} />
            <Text
              style={{
                fontFamily: FONTS.mono,
                fontSize: fs(7.5),
                letterSpacing: ls(0.1, 7.5),
                textTransform: 'uppercase',
                color: COLORS.copperLight,
                marginTop: -6 * k,
              }}
            >
              {c.archName} · yang
            </Text>
          </View>
          <View style={{ width: '62%', borderTopWidth: 1, borderTopColor: COLORS.line, marginVertical: 7 * k }} />
          <View style={{ alignItems: 'center', opacity: 0.8 }}>
            <SolidView solid={c.cat} size={96 * k} tone="lapis" />
            <Text
              style={{
                fontFamily: FONTS.mono,
                fontSize: fs(7),
                letterSpacing: ls(0.1, 7),
                textTransform: 'uppercase',
                color: COLORS.lapisLight,
                marginTop: -4 * k,
              }}
            >
              {c.catName} · yin
            </Text>
          </View>
          {c.chiral && (
            <Text
              style={{ position: 'absolute', top: 2 * k, right: 14 * k, fontFamily: FONTS.mono, fontSize: fs(13), color: COLORS.teal }}
            >
              ⟳
            </Text>
          )}
        </View>
      );
    } else {
      sub = c.axial ? 'Hex 52 · Never drawn · Placed before every reading' : `${c.hname}`;
      const ring = (size: number, opacity: number) => (
        <View
          style={{
            position: 'absolute',
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 1,
            borderColor: accent,
            opacity,
          }}
        />
      );
      art = (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {c.pure && ring(168 * k, 0.4)}
          {c.pure && ring(186 * k, 0.2)}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 * k }}>
            <View style={{ justifyContent: 'space-between', height: 120 * k }}>
              <Text style={{ fontSize: fs(15), textAlign: 'center', color: PLANET_COLOR[c.upper] }}>
                {SIGIL[c.upper as keyof typeof SIGIL]}
              </Text>
              <Text style={{ fontSize: fs(15), textAlign: 'center', color: PLANET_COLOR[c.lower] }}>
                {SIGIL[c.lower as keyof typeof SIGIL]}
              </Text>
            </View>
            <HexFigure upper={c.upper} lower={c.lower} w={104 * k} k={k * 1.35} accent={c.crown ? COLORS.gold : undefined} />
            <View style={{ justifyContent: 'space-between', height: 120 * k }}>
              <Text style={{ fontSize: fs(13), textAlign: 'center', color: COLORS.dim }}>
                {TRIGRAM[c.upper as keyof typeof TRIGRAM]}
              </Text>
              <Text style={{ fontSize: fs(13), textAlign: 'center', color: COLORS.dim }}>
                {TRIGRAM[c.lower as keyof typeof TRIGRAM]}
              </Text>
            </View>
          </View>
          {(c.pure || c.crown) && (
            <Text
              style={{
                marginTop: 10 * k,
                fontFamily: FONTS.mono,
                fontSize: fs(7.5),
                letterSpacing: ls(0.16, 7.5),
                textTransform: 'uppercase',
                color: accent,
              }}
            >
              {c.crown ? '✦ The Solar Crown ✦' : '✦ Pure Resonance'}
            </Text>
          )}
        </View>
      );
    }

    const titleText =
      c.stratum === 4 ? `Bridge ${c.bn}` : c.stratum === 5 && !c.axial ? `Hex ${c.hex}` : c.name;
    const titleSub = c.stratum === 4 ? c.archName : c.stratum === 5 && !c.axial ? c.hname : sub;

    const title = (
      <View style={{ paddingTop: 6 * k, paddingHorizontal: 16 * k, alignItems: 'center' }}>
        <Text
          style={{
            fontFamily: FONTS.displayBold,
            fontSize: fs(c.stratum === 5 ? 16 : 19),
            lineHeight: fs((c.stratum === 5 ? 16 : 19) * 1.15),
            color: c.crown || c.axial || c.stratum === 1 ? COLORS.gold : COLORS.text,
            textAlign: 'center',
          }}
        >
          {titleText}
        </Text>
        {titleSub ? (
          <Text
            style={{
              fontFamily: FONTS.display,
              fontStyle: 'italic',
              fontSize: fs(10.5),
              color: COLORS.dim,
              marginTop: 3 * k,
              textAlign: 'center',
            }}
          >
            {titleSub}
          </Text>
        ) : null}
      </View>
    );

    const nameBlock = (
      <View style={{ paddingTop: 4 * k, paddingHorizontal: 14 * k, paddingBottom: 12 * k, alignItems: 'center' }}>
        <Text style={{ fontSize: fs(11), color: COLORS.copper, opacity: 0.85, letterSpacing: 4 * k }}>
          {(EL_GLYPH[el as keyof typeof EL_GLYPH] || '𓇼') +
            ' · ' +
            (c.stratum === 1 ? c.glyph : c.stratum === 4 ? '𓊛' : EL_GLYPH[el as keyof typeof EL_GLYPH]) +
            ' · ' +
            (EL_GLYPH[el as keyof typeof EL_GLYPH] || '𓇼')}
        </Text>
        <View style={{ marginTop: 6 * k, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontFamily: FONTS.bodySemi, fontSize: fs(13), color: COLORS.gold }}>{c.divine}</Text>
          {c.divineAr ? (
            <Text style={{ fontFamily: FONTS.arabic, fontSize: fs(13), color: COLORS.lapisLight, marginLeft: 6 * k }}>
              {c.divineAr}
            </Text>
          ) : null}
        </View>
        {c.meaning ? (
          <Text style={{ fontFamily: FONTS.body, fontStyle: 'italic', fontSize: fs(9.5), color: COLORS.dim, marginTop: 1 * k }}>
            {c.meaning}
          </Text>
        ) : null}
        <Text
          style={{
            marginTop: 6 * k,
            fontFamily: FONTS.mono,
            fontSize: fs(7),
            letterSpacing: ls(0.14, 7),
            textTransform: 'uppercase',
            color: COLORS.dim,
            textAlign: 'center',
          }}
        >
          {c.mansion
            ? `Mansion ${c.mansion} · ${c.mansionName} · ${c.ruler}`
            : c.suit === 'Axial'
              ? 'Gen over Gen · The Permanent Center'
              : `${c.upper} over ${c.lower} · ${c.suit} suit`}
        </Text>
      </View>
    );

    body = (
      <>
        {header}
        {title}
        {art}
        {nameBlock}
      </>
    );
  }

  const face = (
    <View style={frame}>
      <Ground w={width} h={h} k={k} />
      {body}
      <View style={innerBorder} pointerEvents="none" />
    </View>
  );

  // Orientation: rotation happens visually; sideways gets a bounding box that
  // matches the rotated footprint so surrounding layout stays honest.
  if (orientation === 'sideways') {
    return (
      <View style={{ width: h, height: width, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ transform: [{ rotate: '90deg' }] }}>{face}</View>
      </View>
    );
  }
  if (orientation === 'inverted') {
    return <View style={{ transform: [{ rotate: '180deg' }] }}>{face}</View>;
  }
  return face;
}
