/**
 * The Eight-Step Reading — the Mode B/C ceremony as a guided ritual, per the
 * Companion Book p.108 (Reading Protocol, Oracle §9). The engine computed the
 * whole reading in one pure call before the ceremony begins; nothing here
 * decides anything. The ceremony REVEALS, step by step, what the sky already
 * said — the pacing of directed dhikr, not suspense.
 *
 *   0  Place the Axial Witness      — always present, never moved
 *   1  Stellar Court check          — test the sky against the Court triggers
 *   2  Draw a Platonic Key          — always drawn, even at the Unmoved Axis
 *   3  Draw a Hexagram Field card   — what the moment is
 *   4  Moving lines — three checks  — never a fourth
 *   5  Draw an Archimedean Bridge   — oriented by the Key
 *   6  Draw a Planetary Agent       — placed sideways
 *   7  Transformed hexagram         — the trajectory (zanshin)
 *   8  Concordance check            — then the six coordinates
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { ReadingResult } from '@amraqiyyah/engine';
import { COLORS, FONTS, TRACK } from '../theme';
import { DeckCard, CARD_ASPECT, type CardOrientation } from './DeckCard';
import { HexagramFigure } from '../components/HexagramFigure';
import { DECK } from '../deck/registry';

// ------------------------------------------------------------- flip card

/** A face-down card that turns over when revealed (rotateY flip). */
function FlipCard({
  card,
  width,
  orientation = 'upright',
  revealed,
  onPress,
}: {
  card: number;
  width: number;
  orientation?: CardOrientation;
  revealed: boolean;
  onPress?: () => void;
}) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (revealed) {
      Animated.timing(anim, { toValue: 180, duration: 700, useNativeDriver: false }).start();
    } else {
      // React reuses this instance across ceremony steps — a fresh face-down
      // card must start unflipped.
      anim.setValue(0);
    }
  }, [revealed, card, anim]);
  const h = Math.round(width * CARD_ASPECT);
  const sideways = orientation === 'sideways';
  const boxW = sideways ? h : width;
  const boxH = sideways ? width : h;
  const backRot = anim.interpolate({ inputRange: [0, 180], outputRange: ['0deg', '180deg'] });
  const frontRot = anim.interpolate({ inputRange: [0, 180], outputRange: ['180deg', '360deg'] });
  return (
    <Pressable onPress={onPress} disabled={!onPress}>
      <View style={{ width: boxW, height: boxH }}>
        <Animated.View
          style={{
            position: 'absolute',
            backfaceVisibility: 'hidden',
            transform: [{ perspective: 1200 }, { rotateY: backRot }],
          }}
        >
          <DeckCard card="back" width={width} orientation={orientation} />
        </Animated.View>
        <Animated.View
          style={{
            position: 'absolute',
            backfaceVisibility: 'hidden',
            transform: [{ perspective: 1200 }, { rotateY: frontRot }],
          }}
        >
          <DeckCard card={card} width={width} orientation={orientation} />
        </Animated.View>
      </View>
    </Pressable>
  );
}

// ------------------------------------------------------------- the spread

interface SpreadSlot {
  card: number;
  label: string;
  orientation?: CardOrientation;
}

function Spread({ slots }: { slots: SpreadSlot[] }) {
  if (slots.length === 0) return null;
  return (
    <View style={styles.spread}>
      {slots.map((s) => (
        <View key={s.card} style={styles.spreadSlot}>
          <DeckCard card={s.card} width={s.orientation === 'sideways' ? 62 : 86} orientation={s.orientation} />
          <Text style={styles.spreadLabel}>{s.label}</Text>
        </View>
      ))}
    </View>
  );
}

// ------------------------------------------------------------- the steps

type StepId =
  | 'anchor'
  | 'witness'
  | 'court'
  | 'key'
  | 'field'
  | 'lines'
  | 'bridge'
  | 'agent'
  | 'transformed'
  | 'concordance';

const STEP_NUMBER: Record<StepId, string> = {
  anchor: '·',
  witness: '0',
  court: '1',
  key: '2',
  field: '3',
  lines: '4',
  bridge: '5',
  agent: '6',
  transformed: '7',
  concordance: '8',
};

const STEP_TITLE: Record<StepId, string> = {
  anchor: 'The Temporal Anchor',
  witness: 'Place the Axial Witness',
  court: 'Stellar Court Check',
  key: 'Draw a Platonic Key',
  field: 'Draw a Hexagram Field Card',
  lines: 'Moving Lines — Three Checks',
  bridge: 'Draw an Archimedean Bridge',
  agent: 'Draw a Planetary Agent',
  transformed: 'The Transformed Hexagram',
  concordance: 'Concordance Check',
};

/** The three clocks, named as the booklet names them (p.109). */
const CLOCK_NAMES: Record<string, string> = {
  lunar: 'Lunar Day',
  planetary: 'Sevenfold Weave',
  solar: 'Solar Season',
};

/** The step sequence adapts to the Stellar Court state. */
function stepsFor(result: ReadingResult): StepId[] {
  if (result.holdAndWitness) return ['anchor', 'witness', 'court', 'key', 'concordance'];
  return ['anchor', 'witness', 'court', 'key', 'field', 'lines', 'bridge', 'agent', 'transformed', 'concordance'];
}

export function Ceremony({
  result,
  onComplete,
}: {
  result: ReadingResult;
  /** Called when step 8 resolves — the parent shows the complete reading. */
  onComplete: () => void;
}) {
  const steps = useMemo(() => stepsFor(result), [result]);
  const [stepIndex, setStepIndex] = useState(0);
  // The flip belongs to a specific step — advancing is synchronously face-down.
  const [flippedStep, setFlippedStep] = useState<StepId | null>(null);
  const fade = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView>(null);

  const step = steps[stepIndex]!;
  const flipped = flippedStep === step;
  const setFlipped = () => setFlippedStep(step);
  const courtState = result.stellarCourt.state;
  const cal = result.calendar;
  const L = cal.layers;

  useEffect(() => {
    fade.setValue(0);
    Animated.timing(fade, { toValue: 1, duration: 450, useNativeDriver: false }).start();
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, [stepIndex, fade]);

  const isDrawStep = step === 'key' || step === 'field' || step === 'bridge' || step === 'agent';
  // In Court states 1/2 the field card is not drawn — the sky gives the hexagram.
  const fieldSuspended = step === 'field' && courtState !== 'none';
  const needsFlip = isDrawStep && !fieldSuspended;
  const canContinue = !needsFlip || flipped;

  const advance = () => {
    if (stepIndex + 1 < steps.length) setStepIndex(stepIndex + 1);
    else onComplete();
  };

  // The spread accumulates what has been placed so far.
  const spread: SpreadSlot[] = [];
  const placed = (id: StepId) => steps.indexOf(id) !== -1 && steps.indexOf(id) < stepIndex;
  if (placed('witness')) spread.push({ card: 29, label: 'Axial Witness' });
  if (placed('court') && courtState !== 'none') {
    const courtCard = courtState === 'both' ? 1 : courtState === 'witness_star' ? 2 : 3;
    spread.push({ card: courtCard, label: DECK[courtCard - 1]!.name });
  }
  if (placed('key')) spread.push({ card: result.platonicKey.card, label: `Key · ${result.platonicKey.element}` });
  if (placed('field') && courtState === 'none' && result.hexagram) {
    // The drawn field card (its face IS the situation hexagram).
    const fieldCard = DECK.findIndex((c: any) => c.stratum === 5 && c.hex === result.hexagram!.number) + 1;
    if (fieldCard > 0) spread.push({ card: fieldCard, label: `Hex ${result.hexagram.number}` });
  }
  if (placed('bridge') && result.bridge)
    spread.push({ card: result.bridge.card, label: `Bridge ${result.bridge.bridgeNumber}`, orientation: result.bridge.orientation });
  if (placed('agent') && result.agent) spread.push({ card: result.agent.card, label: result.agent.name, orientation: 'sideways' });

  // ---------------------------------------------------------- step bodies

  let body: React.ReactNode = null;

  if (step === 'anchor') {
    body = (
      <View>
        <Text style={styles.text}>
          Before any draw, establish the complete Calendar state. Every subsequent step references it.
        </Text>
        <View style={styles.anchorPanel}>
          <AnchorRow n="01" text={`Lunar mansion ${L.mansion.number} — ${L.mansion.name_ar}, ruled by ${L.mansion.planetary_ruler}`} />
          <AnchorRow n="02" text={`Planetary hour: ${L.planetary_hour.planet}, hour ${L.planetary_hour.hour_number} (${L.planetary_hour.is_day ? 'day' : 'night'})`} />
          <AnchorRow n="03" text={`Lunar day ${L.hijri.day} of the synodic month`} />
          <AnchorRow n="04" text={`Salah window: ${L.salah.current_window} → Line ${L.salah.hexagram_line}`} />
          <AnchorRow n="05" text={`Day ${L.solar_season.day_of_season} of ${L.solar_season.current}`} />
          <AnchorRow n="06" text={`Stellar Court: ${courtState === 'none' ? 'no activation' : courtState.replace('_', ' ')}`} />
          {result.coordinates.abjad.natal ? (
            <AnchorRow n="07" text={`Natal mansion ${result.coordinates.abjad.natal.mansionNumber}${result.coordinates.abjad.natal.natalTransit ? ' — NATAL TRANSIT' : ''}`} />
          ) : null}
        </View>
        <Text style={styles.dimSmall}>{cal.amraqiyyah_date}</Text>
      </View>
    );
  } else if (step === 'witness') {
    body = (
      <View style={styles.centered}>
        <Text style={styles.text}>
          Card 29 (Hex 52) at the center. Always present, never moved. The galactic center is the anchor.
        </Text>
        <View style={{ marginTop: 14 }}>
          <DeckCard card={29} width={168} />
        </View>
      </View>
    );
  } else if (step === 'court') {
    body = (
      <View style={styles.centered}>
        <Text style={styles.text}>Test the sky against the Court triggers — conjunction or heliacal rising, never mansion transit.</Text>
        {courtState === 'none' ? (
          <Text style={[styles.verdict, { color: COLORS.dim }]}>The Court is silent. The reading proceeds.</Text>
        ) : (
          <View style={styles.centered}>
            <View style={{ marginTop: 14 }}>
              <DeckCard card={courtState === 'both' ? 1 : courtState === 'witness_star' ? 2 : 3} width={168} />
            </View>
            <Text style={[styles.verdict, { color: courtState === 'both' ? COLORS.gold : COLORS.teal }]}>
              {courtState === 'witness_star'
                ? 'State 1 — The Witness Star. Heaven goes silent; the ground speaks without instruction from above.'
                : courtState === 'pleiades_gate'
                  ? 'State 2 — The Pleiades Gate. The sky declares itself over a silenced ground.'
                  : 'State 3 — The Unmoved Axis. Both gates are open. The Court holds: hold and witness.'}
            </Text>
          </View>
        )}
      </View>
    );
  } else if (step === 'key') {
    body = (
      <View style={styles.centered}>
        <Text style={styles.text}>
          One of Cards 11–15. Sets the question's element, the Bridge orientation, the Zabur Book, and the elemental
          Name. Always drawn{result.platonicKey.mirrorOnly ? ' — here, a mirror only' : ''}.
        </Text>
        <View style={{ marginTop: 14 }}>
          <FlipCard card={result.platonicKey.card} width={168} revealed={flipped} onPress={setFlipped} />
        </View>
        {flipped ? (
          <Text style={styles.revealNote}>
            {result.platonicKey.name} — {result.platonicKey.element}. Bridge orientation: {result.platonicKey.bridgeOrientation}. Zabur Book {result.platonicKey.zaburBook}. {result.platonicKey.divineName}.
          </Text>
        ) : (
          <Text style={styles.tapNote}>Tap the deck to draw</Text>
        )}
      </View>
    );
  } else if (step === 'field') {
    if (fieldSuspended) {
      body = (
        <View style={styles.centered}>
          <Text style={styles.text}>
            The Court speaks — the hexagram is given by the sky, not drawn. The field draw is suspended.
          </Text>
          {result.hexagram && (
            <View style={{ marginTop: 14 }}>
              <HexagramFigure hexagram={result.hexagram} movingLines={[]} title="Given by the Court" />
            </View>
          )}
        </View>
      );
    } else {
      const fieldCard = result.hexagram
        ? DECK.findIndex((c: any) => c.stratum === 5 && c.hex === result.hexagram!.number) + 1
        : 0;
      body = (
        <View style={styles.centered}>
          <Text style={styles.text}>One of the 49 drawable cards. The oracle's primary statement — what the moment is.</Text>
          {fieldCard > 0 && (
            <View style={{ marginTop: 14 }}>
              <FlipCard card={fieldCard} width={168} revealed={flipped} onPress={setFlipped} />
            </View>
          )}
          {flipped && result.hexagram ? (
            <Text style={styles.revealNote}>
              Hexagram {result.hexagram.number} — {result.hexagram.name}. {result.hexagram.upper} over {result.hexagram.lower} · {result.hexagram.suit === 'Axial' ? 'Axial' : `${result.hexagram.suit} suit`}. {result.hexagram.divineName}.
            </Text>
          ) : (
            <Text style={styles.tapNote}>Tap the deck to draw</Text>
          )}
        </View>
      );
    }
  } else if (step === 'lines') {
    const ml = result.movingLines!;
    body = (
      <View>
        <Text style={styles.text}>
          A line moves only when a clock says so. The lunar day, the Sevenfold Weave, and the season day name the
          lines under pressure. Never a fourth check.
        </Text>
        <View style={styles.anchorPanel}>
          {ml.checks.map((c) => (
            <AnchorRow key={c.check} n={String(c.check)} text={`${CLOCK_NAMES[c.clock] ?? c.clock} → Line ${c.line}`} />
          ))}
          {ml.checks.length === 0 && <Text style={styles.dimSmall}>No checks active in this window.</Text>}
        </View>
        <Text style={[styles.verdict, { color: COLORS.gold }]}>
          {ml.resonance.replace(/_/g, ' ').toUpperCase()}
          {ml.resonance === 'triple_seal' ? ' — the oracle issues a statement, not options' : ''}
        </Text>
        {ml.thresholdLines && (
          <Text style={[styles.dimSmall, { color: COLORS.gold }]}>
            Solar Threshold — Lines 6 and 1 together: the reading is about the turn itself.
          </Text>
        )}
        {result.hexagram && (
          <View style={{ marginTop: 12 }}>
            <HexagramFigure hexagram={result.hexagram} movingLines={ml.movingLines} title="The situation — lines under pressure" />
          </View>
        )}
      </View>
    );
  } else if (step === 'bridge') {
    const b = result.bridge;
    body = b ? (
      <View style={styles.centered}>
        <Text style={styles.text}>
          One of Cards 16–28, oriented by the Key ({result.platonicKey.element} → {b.orientation}). The dynamic
          complexity the seeker is moving through.
        </Text>
        <View style={{ marginTop: 14 }}>
          <FlipCard card={b.card} width={168} orientation={b.orientation} revealed={flipped} onPress={setFlipped} />
        </View>
        {flipped ? (
          <Text style={styles.revealNote}>
            Bridge {b.bridgeNumber} — {b.yangFace} over {b.yinFace}, {b.orientation}.
            {b.handedness ? ` Chiral: ${b.handedness === 'threshold' ? 'exact balance — suspended' : `${b.handedness}-handed by lunar light`}.` : ''} {b.divineName}.
          </Text>
        ) : (
          <Text style={styles.tapNote}>Tap the deck to draw</Text>
        )}
      </View>
    ) : (
      <Text style={styles.text}>No Bridge is drawn in this reading.</Text>
    );
  } else if (step === 'agent') {
    const a = result.agent;
    body = a ? (
      <View style={styles.centered}>
        <Text style={styles.text}>One of Cards 4–10, placed sideways. The operative personal force.</Text>
        <View style={{ marginTop: 14 }}>
          <FlipCard card={a.card} width={150} orientation="sideways" revealed={flipped} onPress={setFlipped} />
        </View>
        {flipped ? (
          <Text style={styles.revealNote}>
            {a.name} — {a.planet}. {a.divineName}.
            {a.agentResonance ? ' The Agent matches the hour ruler — AGENT RESONANCE.' : ''}
          </Text>
        ) : (
          <Text style={styles.tapNote}>Tap the deck to draw</Text>
        )}
      </View>
    ) : (
      <Text style={styles.text}>No Agent is drawn in this reading.</Text>
    );
  } else if (step === 'transformed') {
    body = (
      <View>
        <Text style={styles.text}>
          Flip the moving lines. The result is the trajectory — what awareness must be carried forward (zanshin).
        </Text>
        <View style={styles.hexPair}>
          {result.hexagram && (
            <HexagramFigure hexagram={result.hexagram} movingLines={result.movingLines?.movingLines ?? []} title="The situation" />
          )}
          {result.transformed && <HexagramFigure hexagram={result.transformed} movingLines={[]} title="The trajectory (zanshin)" />}
        </View>
        {result.movingLines && result.movingLines.movingLines.length === 0 && (
          <Text style={styles.dimSmall}>No lines move — the situation stands as it is.</Text>
        )}
      </View>
    );
  } else {
    // concordance — the final step before the complete reading
    body = (
      <View>
        {result.holdAndWitness ? (
          <View>
            <Text style={[styles.verdict, { color: COLORS.gold }]}>Hold position. Do not act. Witness.</Text>
            <Text style={styles.text}>
              No hexagram is named. No lines move. The Platonic Key stands as a mirror only, and the texts speak where
              geometry has gone still.
            </Text>
          </View>
        ) : result.concordance ? (
          <View>
            <Text style={styles.text}>
              Compare the drawn hexagram's suit with the Key's element: {result.concordance.keyElement} against{' '}
              {result.concordance.comparedTo}.
            </Text>
            <Text
              style={[
                styles.verdict,
                {
                  color:
                    result.concordance.result === 'concordance'
                      ? COLORS.teal
                      : result.concordance.result === 'partial'
                        ? COLORS.gold
                        : COLORS.crimson,
                },
              ]}
            >
              {result.concordance.result.toUpperCase()}
              {result.concordance.result === 'concordance'
                ? ' — the question aligns with the cosmic grain'
                : result.concordance.result === 'partial'
                  ? ' — the register partly agrees'
                  : ' — moving against the grain'}
            </Text>
          </View>
        ) : (
          <Text style={styles.text}>No concordance is taken in this reading.</Text>
        )}
        {result.resonanceCheck && (
          <View style={styles.anchorPanel}>
            <AnchorRow n="C" text={`Mode C — astronomical Hex ${result.resonanceCheck.astronomicalHexagram} vs drawn Hex ${result.resonanceCheck.drawnHexagram}: ${result.resonanceCheck.verdict.replace('_', ' ')}`} />
          </View>
        )}
      </View>
    );
  }

  const isLast = stepIndex === steps.length - 1;

  return (
    <ScrollView ref={scrollRef} style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 48 }}>
      <Spread slots={spread} />
      <Animated.View style={[styles.stepPanel, { opacity: fade }]}>
        <Text style={styles.stepEyebrow}>
          {step === 'anchor' ? 'BEFORE THE READING' : `STEP ${STEP_NUMBER[step]} OF 8`} · VEIL {result.veil} · MODE {result.mode}
        </Text>
        <Text style={styles.stepTitle}>{STEP_TITLE[step]}</Text>
        {body}
        <Pressable
          style={[styles.button, !canContinue && styles.buttonDisabled]}
          onPress={advance}
          disabled={!canContinue}
        >
          <Text style={styles.buttonText}>
            {isLast ? 'The complete reading' : step === 'anchor' ? 'Begin — Bismillah' : 'Continue'}
          </Text>
        </Pressable>
      </Animated.View>
    </ScrollView>
  );
}

function AnchorRow({ n, text }: { n: string; text: string }) {
  return (
    <View style={styles.anchorRow}>
      <Text style={styles.anchorNum}>{n}</Text>
      <Text style={styles.anchorText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  spread: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingTop: 8,
    paddingBottom: 4,
  },
  spreadSlot: { alignItems: 'center' },
  spreadLabel: {
    color: COLORS.dim,
    fontFamily: FONTS.mono,
    fontSize: 9,
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    maxWidth: 110,
    textAlign: 'center',
  },
  stepPanel: {
    backgroundColor: COLORS.panel,
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  stepEyebrow: {
    color: COLORS.dim,
    fontFamily: FONTS.mono,
    fontSize: 10,
    letterSpacing: TRACK.eyebrow,
    textTransform: 'uppercase',
  },
  stepTitle: { color: COLORS.gold, fontFamily: FONTS.displayBold, fontSize: 21, marginTop: 6, marginBottom: 8 },
  text: { color: COLORS.text, fontFamily: FONTS.body, fontSize: 15, lineHeight: 22, marginTop: 2 },
  dimSmall: { color: COLORS.dim, fontFamily: FONTS.mono, fontSize: 11, marginTop: 8 },
  centered: { alignItems: 'center' },
  verdict: { fontFamily: FONTS.displaySemi, fontSize: 16, marginTop: 12, textAlign: 'center', lineHeight: 23 },
  revealNote: {
    color: COLORS.text,
    fontFamily: FONTS.body,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 12,
    textAlign: 'center',
    maxWidth: 340,
  },
  tapNote: {
    color: COLORS.copperLight,
    fontFamily: FONTS.mono,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginTop: 12,
  },
  anchorPanel: {
    backgroundColor: COLORS.panelSoft,
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: COLORS.line,
    gap: 6,
  },
  anchorRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  anchorNum: { color: COLORS.copperLight, fontFamily: FONTS.monoMed, fontSize: 11, width: 20, marginTop: 2 },
  anchorText: { color: COLORS.text, fontFamily: FONTS.body, fontSize: 14, lineHeight: 20, flex: 1 },
  hexPair: { flexDirection: 'row', gap: 12, marginTop: 12, flexWrap: 'wrap' },
  button: {
    backgroundColor: COLORS.gold,
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: { opacity: 0.35 },
  buttonText: {
    color: COLORS.bg,
    fontFamily: FONTS.monoSemi,
    fontSize: 13,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});
