/* @ds-bundle: {"format":4,"namespace":"AmraqiyyahOracleDesignSystem_484c79","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Field","sourcePath":"components/core/Field.jsx"},{"name":"SegmentedControl","sourcePath":"components/core/SegmentedControl.jsx"},{"name":"TabBar","sourcePath":"components/core/TabBar.jsx"},{"name":"VeilSelector","sourcePath":"components/core/VeilSelector.jsx"},{"name":"DivineName","sourcePath":"components/display/DivineName.jsx"},{"name":"LayerCard","sourcePath":"components/display/LayerCard.jsx"},{"name":"Medallion","sourcePath":"components/display/Medallion.jsx"},{"name":"MonoLine","sourcePath":"components/display/MonoLine.jsx"},{"name":"Panel","sourcePath":"components/display/Panel.jsx"},{"name":"DECK","sourcePath":"components/oracle/DeckCard.jsx"},{"name":"DeckCard","sourcePath":"components/oracle/DeckCard.jsx"},{"name":"Hexagram","sourcePath":"components/oracle/Hexagram.jsx"},{"name":"Meter","sourcePath":"components/oracle/Meter.jsx"},{"name":"OracleCard","sourcePath":"components/oracle/OracleCard.jsx"},{"name":"SolidView","sourcePath":"components/oracle/SolidView.jsx"},{"name":"VerseRow","sourcePath":"components/oracle/VerseRow.jsx"}],"sourceHashes":{"components/core/Button.jsx":"ed6d17653f13","components/core/Field.jsx":"aebb82b51d93","components/core/SegmentedControl.jsx":"7b7f71dcfe2c","components/core/TabBar.jsx":"061a934e07fd","components/core/VeilSelector.jsx":"3600227b60a4","components/display/DivineName.jsx":"b64e43b61992","components/display/LayerCard.jsx":"1bce7744c3a0","components/display/Medallion.jsx":"688f24796d19","components/display/MonoLine.jsx":"a39db9e312a6","components/display/Panel.jsx":"e5c16b32656e","components/oracle/DeckCard.jsx":"324b33b3d20a","components/oracle/Hexagram.jsx":"c6608fa509e5","components/oracle/Meter.jsx":"7730a97c9fa7","components/oracle/OracleCard.jsx":"b5a1f9bcac7f","components/oracle/SolidView.jsx":"c221b694b3dd","components/oracle/VerseRow.jsx":"6b396b437c74","deck/doc-page.js":"371bab66f42d","ui_kits/oracle-app/SacredClock.jsx":"9c3a60a431bc","ui_kits/oracle-app/screens.jsx":"96f77fd54c05"},"inlinedExternals":[],"unexposedExports":[{"name":"hexLines","sourcePath":"components/oracle/DeckCard.jsx"}]} */

(() => {

const __ds_ns = (window.AmraqiyyahOracleDesignSystem_484c79 = window.AmraqiyyahOracleDesignSystem_484c79 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — the Oracle's primary action ("Read the sky", "Cast the natal chart").
 * Gold fill with night-ink text is the primary; ghost is a copper outline used
 * for secondary/utility actions (GPS, back).
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  full = false,
  onClick,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      padding: "6px 12px",
      fontSize: "var(--text-sm)",
      radius: "var(--radius-sm)"
    },
    md: {
      padding: "12px 20px",
      fontSize: "var(--text-base)",
      radius: "var(--radius-md)"
    }
  };
  const s = sizes[size] || sizes.md;
  const base = {
    fontFamily: "var(--font-mono)",
    fontWeight: "var(--weight-bold)",
    fontSize: s.fontSize,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    padding: s.padding,
    borderRadius: s.radius,
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    width: full ? "100%" : "auto",
    transition: "var(--transition)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
  };
  const variants = {
    primary: {
      background: "var(--gold)",
      color: "var(--accent-ink)",
      borderColor: "var(--gold)"
    },
    ghost: {
      background: "transparent",
      color: "var(--copper-light)",
      borderColor: "var(--copper)"
    },
    sunken: {
      background: "var(--panel-soft)",
      color: "var(--copper-light)",
      borderColor: "var(--copper)"
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onClick: onClick,
    style: {
      ...base,
      ...(variants[variant] || variants.primary),
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Field — a sunken text input on panel-soft fill with a hairline border.
 * Used for the question, the querent's Arabic name, city search, natal date parts.
 */
function Field({
  value,
  onChange,
  placeholder,
  width,
  align = "left",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("input", _extends({
    value: value,
    onChange: e => onChange && onChange(e.target.value),
    placeholder: placeholder,
    style: {
      background: "var(--panel-soft)",
      color: "var(--text)",
      border: "1px solid var(--line)",
      borderRadius: "var(--radius-sm)",
      padding: "10px 12px",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-base)",
      width: width || "100%",
      textAlign: align,
      outline: "none",
      transition: "var(--transition)",
      ...style
    },
    onFocus: e => e.target.style.borderColor = "var(--copper)",
    onBlur: e => e.target.style.borderColor = "var(--line)"
  }, rest));
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Field.jsx", error: String((e && e.message) || e) }); }

// components/core/SegmentedControl.jsx
try { (() => {
/**
 * SegmentedControl — the framed multiple-choice selector: reading Mode (A/B/C),
 * book (Qur'ān / Zabūr). Selected segment lifts to sunken fill with a copper
 * border and lit-copper text.
 */
function SegmentedControl({
  options = [],
  value,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "8px",
      ...style
    }
  }, options.map(o => {
    const key = typeof o === "string" ? o : o.value;
    const label = typeof o === "string" ? o : o.label;
    const isActive = key === value;
    return /*#__PURE__*/React.createElement("button", {
      key: key,
      type: "button",
      onClick: () => onChange && onChange(key),
      style: {
        flex: 1,
        padding: "10px 12px",
        borderRadius: "var(--radius-sm)",
        cursor: "pointer",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-sm)",
        fontWeight: "var(--weight-semibold)",
        background: isActive ? "var(--panel-soft)" : "var(--panel)",
        color: isActive ? "var(--copper-light)" : "var(--dim)",
        border: `1px solid ${isActive ? "var(--copper)" : "var(--line)"}`,
        transition: "var(--transition)"
      }
    }, label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/core/TabBar.jsx
try { (() => {
/**
 * TabBar — the app's top-level pill navigation (Now · Reading · Texts · Natal ·
 * Journal). Active pill is gold with night-ink text; the rest sit on panel fill.
 * Horizontally scrollable when the tabs overflow.
 */
function TabBar({
  tabs = [],
  active,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "8px",
      overflowX: "auto",
      padding: "0 16px",
      alignItems: "center",
      scrollbarWidth: "none",
      ...style
    }
  }, tabs.map(t => {
    const key = typeof t === "string" ? t : t.key;
    const label = typeof t === "string" ? t : t.label;
    const isActive = key === active;
    return /*#__PURE__*/React.createElement("button", {
      key: key,
      type: "button",
      onClick: () => onChange && onChange(key),
      style: {
        flex: "0 0 auto",
        padding: "8px 16px",
        borderRadius: "var(--radius-pill)",
        border: "none",
        cursor: "pointer",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-sm)",
        fontWeight: "var(--weight-semibold)",
        letterSpacing: "0.04em",
        background: isActive ? "var(--gold)" : "var(--panel)",
        color: isActive ? "var(--accent-ink)" : "var(--dim)",
        transition: "var(--transition)"
      }
    }, label);
  }));
}
Object.assign(__ds_scope, { TabBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/TabBar.jsx", error: String((e && e.message) || e) }); }

// components/core/VeilSelector.jsx
try { (() => {
/**
 * VeilSelector — the nine Veils (question depth). Each Veil is a round token
 * numbered 1–9; the chosen one fills gold. The declared Veil sets how many
 * layers a reading engages, so the control reads as a dial of depth.
 */
function VeilSelector({
  value,
  onChange,
  style
}) {
  const veils = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "6px",
      ...style
    }
  }, veils.map(v => {
    const isActive = v === value;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      type: "button",
      onClick: () => onChange && onChange(v),
      style: {
        width: "36px",
        height: "36px",
        borderRadius: "var(--radius-full)",
        border: "none",
        cursor: "pointer",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-base)",
        fontWeight: "var(--weight-semibold)",
        background: isActive ? "var(--gold)" : "var(--panel-soft)",
        color: isActive ? "var(--accent-ink)" : "var(--dim)",
        transition: "var(--transition)"
      }
    }, v);
  }));
}
Object.assign(__ds_scope, { VeilSelector });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/VeilSelector.jsx", error: String((e && e.message) || e) }); }

// components/display/DivineName.jsx
try { (() => {
/**
 * DivineName — one of the 99 Names as the app names them: the transliteration
 * in gold, optional Arabic in lit lapis, an optional meaning, and an optional
 * role tag (e.g. "hexagram", "suit", "key"). The dhikr count, when given, is
 * the Name's Abjad value.
 */
function DivineName({
  name,
  arabic,
  meaning,
  role,
  count,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      flexWrap: "wrap",
      gap: "8px",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: "var(--weight-semibold)",
      fontSize: "var(--text-md)",
      color: "var(--gold)"
    }
  }, name), arabic ? /*#__PURE__*/React.createElement("span", {
    className: "aq-arabic",
    style: {
      fontSize: "var(--text-lg)",
      color: "var(--lapis-light)"
    }
  }, arabic) : null, meaning ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontStyle: "italic",
      fontSize: "var(--text-base)",
      color: "var(--text)"
    }
  }, "\u2014 ", meaning) : null, role ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-xs)",
      color: "var(--dim)"
    }
  }, "(", role, ")") : null, count != null ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-xs)",
      color: "var(--copper-light)"
    }
  }, "\xD7", count) : null);
}
Object.assign(__ds_scope, { DivineName });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/DivineName.jsx", error: String((e && e.message) || e) }); }

// components/display/LayerCard.jsx
try { (() => {
/**
 * LayerCard — one of the nine temporal layers on the Now screen. A small titled
 * cell: an uppercase layer title, its main reading, an optional sub-line, and
 * the layer's active Divine Name in gold at the foot.
 */
function LayerCard({
  title,
  main,
  sub,
  name,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--panel)",
      border: "1px solid var(--line)",
      borderRadius: "var(--radius-lg)",
      padding: "12px",
      minWidth: "220px",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-xs)",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "var(--dim)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-base)",
      fontWeight: "var(--weight-semibold)",
      color: "var(--text)",
      marginTop: "4px"
    }
  }, main), sub ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--dim)",
      marginTop: "2px"
    }
  }, sub) : null, name ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-sm)",
      color: "var(--gold)",
      marginTop: "6px"
    }
  }, name) : null);
}
Object.assign(__ds_scope, { LayerCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/LayerCard.jsx", error: String((e && e.message) || e) }); }

// components/display/Medallion.jsx
try { (() => {
/**
 * Medallion — a round copper-ringed numeral, used for surah numbers in the
 * Texts index and anywhere a single number needs a sacred frame.
 */
function Medallion({
  children,
  size = 40,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: "var(--radius-full)",
      border: "1px solid var(--copper)",
      background: "var(--panel)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-mono)",
      fontWeight: "var(--weight-bold)",
      fontSize: "var(--text-sm)",
      color: "var(--gold)",
      flex: "0 0 auto",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Medallion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Medallion.jsx", error: String((e && e.message) || e) }); }

// components/display/MonoLine.jsx
try { (() => {
/**
 * MonoLine — a teal monospace readout line, the app's voice for deterministic
 * output (oracle inputs, coordinates, substrate). When href/onClick is given it
 * becomes a lit-copper underlined link that opens a text or coordinate.
 */
function MonoLine({
  children,
  link = false,
  dim = false,
  gold = false,
  onClick,
  style
}) {
  let color = "var(--teal)";
  if (link) color = "var(--copper-light)";
  if (dim) color = "var(--dim)";
  if (gold) color = "var(--gold)";
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: link ? "var(--text-sm)" : "var(--text-sm)",
      color,
      marginTop: "3px",
      textDecoration: link ? "underline" : "none",
      cursor: link || onClick ? "pointer" : "default",
      lineHeight: 1.5,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { MonoLine });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/MonoLine.jsx", error: String((e && e.message) || e) }); }

// components/display/Panel.jsx
try { (() => {
/**
 * Panel — the Oracle's fundamental container. A bordered card on panel fill
 * with an optional title. The accent prop recolours the border to signal a
 * special state (gold = the Unmoved Axis; teal = Stellar Court).
 */
function Panel({
  title,
  accent,
  children,
  style
}) {
  const accents = {
    gold: "var(--gold)",
    teal: "var(--teal)",
    copper: "var(--copper)",
    crimson: "var(--crimson)"
  };
  const borderColor = accents[accent] || "var(--line)";
  const titleColor = accent ? accents[accent] || "var(--text)" : "var(--text)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--panel)",
      border: `1px solid ${borderColor}`,
      borderRadius: "var(--radius-lg)",
      padding: "14px",
      ...style
    }
  }, title ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: "var(--weight-bold)",
      fontSize: "var(--text-lg)",
      color: titleColor,
      marginBottom: "6px"
    }
  }, title) : null, children);
}
Object.assign(__ds_scope, { Panel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Panel.jsx", error: String((e && e.message) || e) }); }

// components/oracle/Hexagram.jsx
try { (() => {
/**
 * Hexagram — the six-line figure, drawn top (line 6) to bottom (line 1). A solid
 * bar is yang (gold), a split pair is yin (indigo); a moving line burns crimson
 * with a dot to its right. Header names the number and title; the foot gives the
 * trigram stack, suit, and Divine Name.
 *
 * lines: 6 booleans, index 0 = bottom line (1) … index 5 = top line (6); true = yang.
 * moving: line numbers (1–6) that are currently moving.
 */
function Hexagram({
  number,
  name,
  lines = [],
  moving = [],
  upper,
  lower,
  suit,
  divineName,
  title,
  style
}) {
  const rows = [5, 4, 3, 2, 1, 0].map(i => ({
    index: i + 1,
    yang: !!lines[i],
    moving: moving.includes(i + 1)
  }));
  const barW = 120;
  const barH = 9;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--panel)",
      border: "1px solid var(--line)",
      borderRadius: "var(--radius-lg)",
      padding: "14px",
      minWidth: "220px",
      ...style
    }
  }, title ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-xs)",
      color: "var(--dim)"
    }
  }, title) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: "var(--weight-bold)",
      fontSize: "var(--text-lg)",
      color: "var(--text)",
      marginBottom: "8px"
    }
  }, number, " \u2014 ", name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "5px"
    }
  }, rows.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.index,
    style: {
      display: "flex",
      alignItems: "center",
      height: barH
    }
  }, r.yang ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: barW,
      height: barH,
      borderRadius: "2px",
      background: r.moving ? "var(--crimson)" : "var(--yang)"
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      width: barW,
      gap: "24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: barH,
      borderRadius: "2px",
      background: r.moving ? "var(--crimson)" : "var(--yin)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: barH,
      borderRadius: "2px",
      background: r.moving ? "var(--crimson)" : "var(--yin)"
    }
  })), r.moving ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--crimson)",
      marginLeft: "8px",
      fontSize: "10px"
    }
  }, "\u25CF") : null))), upper || lower || suit ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-xs)",
      color: "var(--dim)",
      marginTop: "8px"
    }
  }, upper, " over ", lower, " \xB7 ", suit === "Axial" ? "Threshold/Axial" : `${suit} suit`) : null, divineName ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-xs)",
      color: "var(--gold)",
      marginTop: "2px"
    }
  }, divineName) : null);
}
Object.assign(__ds_scope, { Hexagram });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/oracle/Hexagram.jsx", error: String((e && e.message) || e) }); }

// components/oracle/Meter.jsx
try { (() => {
/**
 * Meter — a small arc dial for a slow temporal cycle (the week, mansion, season,
 * harmonic cycle, Great Year). A faint full ring with a coloured progress arc
 * from the top, clockwise; the value sits at the centre with a caption below.
 * The same clock made visible at a slower speed.
 */
function Meter({
  label,
  fraction = 0,
  center,
  sub,
  color = "var(--gold)",
  size = 104,
  style
}) {
  const CC = size / 2;
  const R = size * 0.385;
  const f = Math.max(0, Math.min(0.9999, fraction));
  const end = f * 360;
  const a = end * Math.PI / 180;
  const x1 = CC + R * Math.sin(a);
  const y1 = CC - R * Math.cos(a);
  const large = end > 180 ? 1 : 0;
  const d = `M ${CC} ${CC - R} A ${R} ${R} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "9px",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "var(--dim)",
      marginBottom: "4px"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: size,
      height: size
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${size} ${size}`,
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: CC,
    cy: CC,
    r: R,
    fill: "none",
    stroke: "var(--line)",
    strokeWidth: 5
  }), /*#__PURE__*/React.createElement("path", {
    d: d,
    fill: "none",
    stroke: color,
    strokeWidth: 5,
    strokeLinecap: "round",
    opacity: 0.95
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-base)",
      fontWeight: "var(--weight-bold)",
      color
    }
  }, center), sub ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "9px",
      color: "var(--dim)",
      marginTop: "2px",
      maxWidth: size - 14,
      textAlign: "center"
    }
  }, sub) : null)));
}
Object.assign(__ds_scope, { Meter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/oracle/Meter.jsx", error: String((e && e.message) || e) }); }

// components/oracle/OracleCard.jsx
try { (() => {
/**
 * OracleCard — a deck card slot honouring the ratified placeholder constraints:
 * uniform backs, split faces (two regions on one front), sideways placement for
 * the Planetary Agent. Card imagery is pending the Deck Design Document, so the
 * face carries a glyph or the yin/yang split. A gold-outlined slot with a label
 * and sub beneath.
 *
 *  kind:  "axial" (☶ · Hex 52) · "key" (◈ · Platonic Key) · "agent" (✶ · sideways) · "bridge" (split)
 *  orientation: "upright" | "inverted" | "sideways" — rotates the card face.
 */
function OracleCard({
  label,
  sub,
  kind = "key",
  split = false,
  sideways = false,
  orientation,
  style
}) {
  const glyphs = {
    axial: "☶",
    key: "◈",
    agent: "✶",
    bridge: "⯒"
  };
  const rotate = sideways || orientation === "sideways" ? "90deg" : orientation === "inverted" ? "180deg" : "0deg";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "130px",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "86px",
      height: "128px",
      borderRadius: "var(--radius-sm)",
      background: "var(--panel-soft)",
      border: "1.5px solid var(--gold)",
      overflow: "hidden",
      transform: `rotate(${rotate})`,
      transition: "var(--transition)"
    }
  }, split ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: "#2a2438",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--dim)",
      fontSize: "10px",
      textTransform: "uppercase",
      letterSpacing: "2px"
    }
  }, "yang")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: "#1c2436",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--dim)",
      fontSize: "10px",
      textTransform: "uppercase",
      letterSpacing: "2px"
    }
  }, "yin"))) : /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gold)",
      fontSize: "34px"
    }
  }, glyphs[kind] || "◈"))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-semibold)",
      color: "var(--text)",
      marginTop: "6px",
      textAlign: "center"
    }
  }, label), sub ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "10px",
      color: "var(--dim)",
      textAlign: "center",
      marginTop: "2px"
    }
  }, sub) : null);
}
Object.assign(__ds_scope, { OracleCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/oracle/OracleCard.jsx", error: String((e && e.message) || e) }); }

// components/oracle/SolidView.jsx
try { (() => {
/**
 * SolidView — the Hedronite glass-polyhedron visual language rendered as pure
 * SVG (crisp at print resolution; no WebGL): lapis-tinted translucent faces,
 * copper edges, glowing vertices. Covers all 5 Platonic, all 13 Archimedean,
 * and all 13 Catalan duals. Archimedean vertex data for the 9 complex solids
 * (incl. both snubs) is verbatim from hedronite-website's polyhedra-data.json;
 * the rest are generated; Catalan duals come from the same data or by polar
 * reciprocation of the Archimedean hull.
 */

// ---------- vector helpers ----------
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const norm = a => Math.sqrt(dot(a, a));
const scale = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
const normalize = a => scale(a, 1 / (norm(a) || 1));

// ---------- generated vertex sets ----------
const PHI = (1 + Math.sqrt(5)) / 2;
function permsSigned(base) {
  const out = [];
  const seen = new Set();
  const idx = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
  for (const p of idx) {
    const v0 = [base[p[0]], base[p[1]], base[p[2]]];
    for (let s = 0; s < 8; s++) {
      const v = [v0[0] * (s & 1 ? -1 : 1), v0[1] * (s & 2 ? -1 : 1), v0[2] * (s & 4 ? -1 : 1)];
      const k = v.map(x => x.toFixed(5)).join(",");
      if (!seen.has(k)) {
        seen.add(k);
        out.push(v);
      }
    }
  }
  return out;
}
function cyclicSigned(base) {
  const out = [];
  const seen = new Set();
  const rots = [[0, 1, 2], [2, 0, 1], [1, 2, 0]];
  for (const p of rots) {
    const v0 = [base[p[0]], base[p[1]], base[p[2]]];
    for (let s = 0; s < 8; s++) {
      const v = [v0[0] * (s & 1 ? -1 : 1), v0[1] * (s & 2 ? -1 : 1), v0[2] * (s & 4 ? -1 : 1)];
      const k = v.map(x => x.toFixed(5)).join(",");
      if (!seen.has(k)) {
        seen.add(k);
        out.push(v);
      }
    }
  }
  return out;
}
const TETRA = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]];
function truncTetra() {
  const out = [];
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
    if (i === j) continue;
    out.push([TETRA[i][0] + (TETRA[j][0] - TETRA[i][0]) / 3, TETRA[i][1] + (TETRA[j][1] - TETRA[i][1]) / 3, TETRA[i][2] + (TETRA[j][2] - TETRA[i][2]) / 3]);
  }
  return out;
}
const XI = Math.SQRT2 - 1;
const GENERATED = {
  tetrahedron: () => TETRA,
  cube: () => permsSigned([1, 1, 1]),
  octahedron: () => permsSigned([1, 0, 0]),
  dodecahedron: () => permsSigned([1, 1, 1]).concat(cyclicSigned([0, 1 / PHI, PHI])),
  icosahedron: () => cyclicSigned([0, 1, PHI]),
  truncated_tetrahedron: truncTetra,
  cuboctahedron: () => permsSigned([1, 1, 0]),
  truncated_cube: () => permsSigned([XI, 1, 1]),
  truncated_octahedron: () => permsSigned([0, 1, 2])
};
// dodeca/icosa perm filters above over-generate; dedupe + radius filter fixes:
function cleanSet(verts) {
  const seen = new Set();
  const out = [];
  for (const v of verts) {
    const k = v.map(x => x.toFixed(5)).join(",");
    if (!seen.has(k)) {
      seen.add(k);
      out.push(v);
    }
  }
  return out;
}

// ---------- exact data (from hedronite-website polyhedra-data.json) ----------
const EMBED = {
  truncated_icosidodecahedron: [[-0.1315, -0.1315, -0.9826], [-0.1315, -0.1315, 0.9826], [-0.1315, 0.1315, -0.9826], [-0.1315, 0.1315, 0.9826], [0.1315, -0.1315, -0.9826], [0.1315, -0.1315, 0.9826], [0.1315, 0.1315, -0.9826], [0.1315, 0.1315, 0.9826], [-0.1315, -0.9826, -0.1315], [-0.1315, -0.9826, 0.1315], [-0.1315, 0.9826, -0.1315], [-0.1315, 0.9826, 0.1315], [0.1315, -0.9826, -0.1315], [0.1315, -0.9826, 0.1315], [0.1315, 0.9826, -0.1315], [0.1315, 0.9826, 0.1315], [-0.9826, -0.1315, -0.1315], [-0.9826, -0.1315, 0.1315], [-0.9826, 0.1315, -0.1315], [-0.9826, 0.1315, 0.1315], [0.9826, -0.1315, -0.1315], [0.9826, -0.1315, 0.1315], [0.9826, 0.1315, -0.1315], [0.9826, 0.1315, 0.1315], [-0.263, -0.3443, -0.9013], [-0.263, -0.3443, 0.9013], [-0.263, 0.3443, -0.9013], [-0.263, 0.3443, 0.9013], [0.263, -0.3443, -0.9013], [0.263, -0.3443, 0.9013], [0.263, 0.3443, -0.9013], [0.263, 0.3443, 0.9013], [-0.3443, -0.9013, -0.263], [-0.3443, -0.9013, 0.263], [-0.3443, 0.9013, -0.263], [-0.3443, 0.9013, 0.263], [0.3443, -0.9013, -0.263], [0.3443, -0.9013, 0.263], [0.3443, 0.9013, -0.263], [0.3443, 0.9013, 0.263], [-0.9013, -0.263, -0.3443], [-0.9013, -0.263, 0.3443], [-0.9013, 0.263, -0.3443], [-0.9013, 0.263, 0.3443], [0.9013, -0.263, -0.3443], [0.9013, -0.263, 0.3443], [0.9013, 0.263, -0.3443], [0.9013, 0.263, 0.3443], [-0.1315, -0.557, -0.82], [-0.1315, -0.557, 0.82], [-0.1315, 0.557, -0.82], [-0.1315, 0.557, 0.82], [0.1315, -0.557, -0.82], [0.1315, -0.557, 0.82], [0.1315, 0.557, -0.82], [0.1315, 0.557, 0.82], [-0.557, -0.82, -0.1315], [-0.557, -0.82, 0.1315], [-0.557, 0.82, -0.1315], [-0.557, 0.82, 0.1315], [0.557, -0.82, -0.1315], [0.557, -0.82, 0.1315], [0.557, 0.82, -0.1315], [0.557, 0.82, 0.1315], [-0.82, -0.1315, -0.557], [-0.82, -0.1315, 0.557], [-0.82, 0.1315, -0.557], [-0.82, 0.1315, 0.557], [0.82, -0.1315, -0.557], [0.82, -0.1315, 0.557], [0.82, 0.1315, -0.557], [0.82, 0.1315, 0.557], [-0.4758, -0.4255, -0.7698], [-0.4758, -0.4255, 0.7698], [-0.4758, 0.4255, -0.7698], [-0.4758, 0.4255, 0.7698], [0.4758, -0.4255, -0.7698], [0.4758, -0.4255, 0.7698], [0.4758, 0.4255, -0.7698], [0.4758, 0.4255, 0.7698], [-0.4255, -0.7698, -0.4758], [-0.4255, -0.7698, 0.4758], [-0.4255, 0.7698, -0.4758], [-0.4255, 0.7698, 0.4758], [0.4255, -0.7698, -0.4758], [0.4255, -0.7698, 0.4758], [0.4255, 0.7698, -0.4758], [0.4255, 0.7698, 0.4758], [-0.7698, -0.4758, -0.4255], [-0.7698, -0.4758, 0.4255], [-0.7698, 0.4758, -0.4255], [-0.7698, 0.4758, 0.4255], [0.7698, -0.4758, -0.4255], [0.7698, -0.4758, 0.4255], [0.7698, 0.4758, -0.4255], [0.7698, 0.4758, 0.4255], [-0.3443, -0.6383, -0.6885], [-0.3443, -0.6383, 0.6885], [-0.3443, 0.6383, -0.6885], [-0.3443, 0.6383, 0.6885], [0.3443, -0.6383, -0.6885], [0.3443, -0.6383, 0.6885], [0.3443, 0.6383, -0.6885], [0.3443, 0.6383, 0.6885], [-0.6383, -0.6885, -0.3443], [-0.6383, -0.6885, 0.3443], [-0.6383, 0.6885, -0.3443], [-0.6383, 0.6885, 0.3443], [0.6383, -0.6885, -0.3443], [0.6383, -0.6885, 0.3443], [0.6383, 0.6885, -0.3443], [0.6383, 0.6885, 0.3443], [-0.6885, -0.3443, -0.6383], [-0.6885, -0.3443, 0.6383], [-0.6885, 0.3443, -0.6383], [-0.6885, 0.3443, 0.6383], [0.6885, -0.3443, -0.6383], [0.6885, -0.3443, 0.6383], [0.6885, 0.3443, -0.6383], [0.6885, 0.3443, 0.6383]],
  disdyakis_triacontahedron: [[0, 0.3347, -0.8762], [0.8507, -0.5257, 0], [-0.5257, 0, 0.8507], [0, 0.8507, 0.5257], [-0.8507, 0.5257, 0], [0.8507, 0.5257, 0], [0.5415, 0.5415, 0.5415], [0, 0.8507, -0.5257], [-0.5415, 0.5415, -0.5415], [-0.5257, 0, -0.8507], [0, -0.3347, -0.8762], [0.5257, 0, -0.8507], [0.7451, 0.2846, 0.4605], [0, -0.8507, -0.5257], [0, -0.8507, 0.5257], [0.5415, -0.5415, 0.5415], [0.2846, -0.4605, 0.7451], [0.8762, 0, -0.3347], [0.5415, 0.5415, -0.5415], [0.5415, -0.5415, -0.5415], [0, -0.3347, 0.8762], [-0.921, 0, 0], [0.5257, 0, 0.8507], [0, 0.3347, 0.8762], [0.3347, 0.8762, 0], [-0.5415, 0.5415, 0.5415], [-0.2846, 0.4605, 0.7451], [-0.4605, 0.7451, 0.2846], [-0.3347, 0.8762, 0], [0.4605, 0.7451, 0.2846], [0.4605, 0.7451, -0.2846], [0, 0.921, 0], [-0.8762, 0, -0.3347], [-0.2846, 0.4605, -0.7451], [-0.2846, -0.4605, -0.7451], [0, 0, -0.921], [0.921, 0, 0], [0.2846, -0.4605, -0.7451], [-0.8507, -0.5257, 0], [-0.5415, -0.5415, 0.5415], [0.7451, -0.2846, -0.4605], [0.2846, 0.4605, -0.7451], [0.7451, 0.2846, -0.4605], [-0.7451, 0.2846, -0.4605], [-0.8762, 0, 0.3347], [0.2846, 0.4605, 0.7451], [0, 0, 0.921], [-0.4605, 0.7451, -0.2846], [-0.5415, -0.5415, -0.5415], [0.8762, 0, 0.3347], [0.7451, -0.2846, 0.4605], [0.3347, -0.8762, 0], [0.4605, -0.7451, -0.2846], [0, -0.921, 0], [-0.7451, -0.2846, -0.4605], [-0.7451, -0.2846, 0.4605], [-0.3347, -0.8762, 0], [-0.2846, -0.4605, 0.7451], [-0.7451, 0.2846, 0.4605], [0.4605, -0.7451, 0.2846], [-0.4605, -0.7451, 0.2846], [-0.4605, -0.7451, -0.2846]],
  snub_dodecahedron: [[0.1739, 0.1535, 0.9727], [0.1739, -0.1535, -0.9727], [-0.1739, 0.1535, -0.9727], [-0.1739, -0.1535, 0.9727], [0.1535, 0.9727, 0.1739], [0.1535, -0.9727, -0.1739], [-0.1535, 0.9727, -0.1739], [-0.1535, -0.9727, 0.1739], [0.9727, 0.1739, 0.1535], [0.9727, -0.1739, -0.1535], [-0.9727, 0.1739, -0.1535], [-0.9727, -0.1739, 0.1535], [0.5117, 0.3931, 0.7639], [0.5117, -0.3931, -0.7639], [-0.5117, 0.3931, -0.7639], [-0.5117, -0.3931, 0.7639], [0.3931, 0.7639, 0.5117], [0.3931, -0.7639, -0.5117], [-0.3931, 0.7639, -0.5117], [-0.3931, -0.7639, 0.5117], [0.7639, 0.5117, 0.3931], [0.7639, -0.5117, -0.3931], [-0.7639, 0.5117, -0.3931], [-0.7639, -0.5117, 0.3931], [0.2633, -0.2983, 0.9174], [0.2633, 0.2983, -0.9174], [-0.2633, -0.2983, -0.9174], [-0.2633, 0.2983, 0.9174], [-0.2983, 0.9174, 0.2633], [-0.2983, -0.9174, -0.2633], [0.2983, 0.9174, -0.2633], [0.2983, -0.9174, 0.2633], [0.9174, 0.2633, -0.2983], [0.9174, -0.2633, 0.2983], [-0.9174, 0.2633, 0.2983], [-0.9174, -0.2633, -0.2983], [0.81, 0.0895, 0.5796], [0.81, -0.0895, -0.5796], [-0.81, 0.0895, -0.5796], [-0.81, -0.0895, 0.5796], [0.0895, 0.5796, 0.81], [0.0895, -0.5796, -0.81], [-0.0895, 0.5796, -0.81], [-0.0895, -0.5796, 0.81], [0.5796, 0.81, 0.0895], [0.5796, -0.81, -0.0895], [-0.5796, 0.81, -0.0895], [-0.5796, -0.81, 0.0895], [0.6565, -0.3378, 0.6745], [0.6565, 0.3378, -0.6745], [-0.6565, -0.3378, -0.6745], [-0.6565, 0.3378, 0.6745], [-0.3378, 0.6745, 0.6565], [-0.3378, -0.6745, -0.6565], [0.3378, 0.6745, -0.6565], [0.3378, -0.6745, 0.6565], [0.6745, 0.6565, -0.3378], [0.6745, -0.6565, 0.3378], [-0.6745, 0.6565, 0.3378], [-0.6745, -0.6565, -0.3378]],
  pentagonal_hexecontahedron: [[-0.5257, 0, 0.8507], [0.8507, 0.5257, 0], [0.8507, -0.5257, 0], [0.3403, 0.8909, 0], [0.5122, 0.7866, -0.1688], [0.5257, 0, -0.8507], [-0.5506, -0.5506, 0.5506], [-0.6882, -0.3281, 0.573], [0.3403, -0.8909, 0], [0.5122, -0.7866, 0.1688], [-0.8403, -0.2557, 0.3716], [-0.8507, -0.5257, 0], [-0.415, 0.4324, 0.7419], [-0.1688, 0.5122, 0.7866], [0, 0.8507, 0.5257], [0.2557, 0.3716, 0.8403], [0, 0.3403, 0.8909], [-0.0869, 0.0984, 0.9446], [0.0869, -0.0984, 0.9446], [0.5257, 0, 0.8507], [0.5506, 0.5506, 0.5506], [0.573, 0.6882, 0.3281], [0.3716, 0.8403, 0.2557], [0.3281, 0.573, 0.6882], [0, -0.8507, 0.5257], [0, -0.3403, 0.8909], [-0.2557, -0.3716, 0.8403], [-0.3281, -0.573, 0.6882], [0.8909, 0, 0.3403], [0.8403, 0.2557, 0.3716], [0.6882, 0.3281, 0.573], [0, 0.8507, -0.5257], [0.4324, 0.7419, -0.415], [0.5506, 0.5506, -0.5506], [0.415, 0.4324, -0.7419], [0.0984, 0.9446, -0.0869], [-0.3716, 0.8403, -0.2557], [-0.8507, 0.5257, 0], [-0.9446, 0.0869, 0.0984], [-0.8909, 0, 0.3403], [-0.7866, 0.1688, 0.5122], [-0.8403, 0.2557, -0.3716], [-0.573, 0.6882, -0.3281], [-0.5257, 0, -0.8507], [-0.6882, 0.3281, -0.573], [-0.5506, 0.5506, -0.5506], [0.0984, -0.9446, 0.0869], [0.7866, 0.1688, -0.5122], [0.7419, 0.415, -0.4324], [0.8403, -0.2557, -0.3716], [0.8909, 0, -0.3403], [0.9446, 0.0869, -0.0984], [0.9446, -0.0869, 0.0984], [0, -0.3403, -0.8909], [0, -0.8507, -0.5257], [0.573, -0.6882, -0.3281], [0.3716, -0.8403, -0.2557], [-0.0984, -0.9446, -0.0869], [0.1688, -0.5122, 0.7866], [0.4324, -0.7419, 0.415], [-0.9446, -0.0869, -0.0984], [-0.8909, 0, -0.3403], [-0.7866, -0.1688, -0.5122], [-0.7419, -0.415, -0.4324], [-0.0984, 0.9446, 0.0869], [-0.3403, 0.8909, 0], [-0.5506, 0.5506, 0.5506], [-0.4324, 0.7419, 0.415], [-0.5122, 0.7866, 0.1688], [-0.7419, 0.415, 0.4324], [0.7866, -0.1688, 0.5122], [0.415, -0.4324, 0.7419], [0.5506, -0.5506, 0.5506], [0.7419, -0.415, 0.4324], [0.1688, 0.5122, -0.7866], [-0.3281, 0.573, -0.6882], [-0.2557, 0.3716, -0.8403], [0, 0.3403, -0.8909], [0.0869, 0.0984, -0.9446], [-0.0869, -0.0984, -0.9446], [-0.5122, -0.7866, -0.1688], [-0.3403, -0.8909, 0], [-0.3716, -0.8403, 0.2557], [-0.573, -0.6882, 0.3281], [0.2557, -0.3716, -0.8403], [0.6882, -0.3281, -0.573], [0.5506, -0.5506, -0.5506], [0.3281, -0.573, -0.6882], [-0.4324, -0.7419, -0.415], [-0.5506, -0.5506, -0.5506], [-0.415, -0.4324, -0.7419], [-0.1688, -0.5122, -0.7866]],
  icosidodecahedron: [[0, 0, 1], [0, 1, 0], [1, 0, 0], [0, 0, -1], [0, -1, 0], [-1, 0, 0], [0.309, 0.5, 0.809], [0.309, 0.5, -0.809], [0.309, -0.5, 0.809], [0.309, -0.5, -0.809], [-0.309, 0.5, 0.809], [-0.309, 0.5, -0.809], [-0.309, -0.5, 0.809], [-0.309, -0.5, -0.809], [0.5, 0.809, 0.309], [0.5, 0.809, -0.309], [0.5, -0.809, 0.309], [0.5, -0.809, -0.309], [-0.5, 0.809, 0.309], [-0.5, 0.809, -0.309], [-0.5, -0.809, 0.309], [-0.5, -0.809, -0.309], [0.809, 0.309, 0.5], [0.809, 0.309, -0.5], [0.809, -0.309, 0.5], [0.809, -0.309, -0.5], [-0.809, 0.309, 0.5], [-0.809, 0.309, -0.5], [-0.809, -0.309, 0.5], [-0.809, -0.309, -0.5]],
  rhombic_triacontahedron: [[0, 0.3249, -0.8507], [0, 0.8507, -0.5257], [-0.5257, 0, 0.8507], [0, -0.3249, 0.8507], [0, -0.8507, 0.5257], [0.5257, 0, 0.8507], [-0.5257, 0, -0.8507], [0.5257, 0, -0.8507], [0.8507, 0.5257, 0], [0, 0.8507, 0.5257], [-0.8507, 0.5257, 0], [-0.8507, -0.5257, 0], [0.8507, -0.5257, 0], [-0.8507, 0, -0.3249], [-0.5257, 0.5257, -0.5257], [0.8507, 0, -0.3249], [-0.5257, 0.5257, 0.5257], [-0.3249, 0.8507, 0], [0, 0.3249, 0.8507], [0.5257, 0.5257, 0.5257], [-0.5257, -0.5257, 0.5257], [-0.8507, 0, 0.3249], [0.5257, -0.5257, 0.5257], [0.8507, 0, 0.3249], [0.3249, -0.8507, 0], [0, -0.8507, -0.5257], [-0.5257, -0.5257, -0.5257], [-0.3249, -0.8507, 0], [0.5257, -0.5257, -0.5257], [0, -0.3249, -0.8507], [0.5257, 0.5257, -0.5257], [0.3249, 0.8507, 0]],
  rhombicosidodecahedron: [[-0.2239, -0.2239, -0.9485], [-0.2239, -0.2239, 0.9485], [-0.2239, 0.2239, -0.9485], [-0.2239, 0.2239, 0.9485], [0.2239, -0.2239, -0.9485], [0.2239, -0.2239, 0.9485], [0.2239, 0.2239, -0.9485], [0.2239, 0.2239, 0.9485], [-0.9485, -0.2239, -0.2239], [-0.9485, -0.2239, 0.2239], [-0.9485, 0.2239, -0.2239], [-0.9485, 0.2239, 0.2239], [0.9485, -0.2239, -0.2239], [0.9485, -0.2239, 0.2239], [0.9485, 0.2239, -0.2239], [0.9485, 0.2239, 0.2239], [-0.2239, -0.9485, -0.2239], [-0.2239, -0.9485, 0.2239], [-0.2239, 0.9485, -0.2239], [-0.2239, 0.9485, 0.2239], [0.2239, -0.9485, -0.2239], [0.2239, -0.9485, 0.2239], [0.2239, 0.9485, -0.2239], [0.2239, 0.9485, 0.2239], [-0.5862, -0.3623, -0.7246], [-0.5862, -0.3623, 0.7246], [-0.5862, 0.3623, -0.7246], [-0.5862, 0.3623, 0.7246], [0.5862, -0.3623, -0.7246], [0.5862, -0.3623, 0.7246], [0.5862, 0.3623, -0.7246], [0.5862, 0.3623, 0.7246], [-0.7246, -0.5862, -0.3623], [-0.7246, -0.5862, 0.3623], [-0.7246, 0.5862, -0.3623], [-0.7246, 0.5862, 0.3623], [0.7246, -0.5862, -0.3623], [0.7246, -0.5862, 0.3623], [0.7246, 0.5862, -0.3623], [0.7246, 0.5862, 0.3623], [-0.3623, -0.7246, -0.5862], [-0.3623, -0.7246, 0.5862], [-0.3623, 0.7246, -0.5862], [-0.3623, 0.7246, 0.5862], [0.3623, -0.7246, -0.5862], [0.3623, -0.7246, 0.5862], [0.3623, 0.7246, -0.5862], [0.3623, 0.7246, 0.5862], [-0.8101, 0, -0.5862], [-0.8101, 0, 0.5862], [0.8101, 0, -0.5862], [0.8101, 0, 0.5862], [-0.5862, -0.8101, 0], [-0.5862, 0.8101, 0], [0.5862, -0.8101, 0], [0.5862, 0.8101, 0], [0, -0.5862, -0.8101], [0, -0.5862, 0.8101], [0, 0.5862, -0.8101], [0, 0.5862, 0.8101]],
  deltoidal_hexecontahedron: [[0, -0.3415, -0.8941], [0.3012, -0.4874, -0.7886], [0.5257, 0, -0.8507], [0, 0, -0.9748], [-0.5257, 0, -0.8507], [-0.3012, 0.4874, -0.7886], [-0.3012, -0.4874, -0.7886], [0.3415, -0.8941, 0], [0, -0.9748, 0], [0, -0.8507, -0.5257], [0.3012, 0.4874, 0.7886], [0.8507, -0.5257, 0], [0.7886, -0.3012, 0.4874], [0.4874, -0.7886, 0.3012], [0, 0.8507, 0.5257], [0.9748, 0, 0], [0.3012, 0.4874, -0.7886], [0, 0.8507, -0.5257], [0, 0.3415, -0.8941], [0.4874, 0.7886, -0.3012], [-0.4874, 0.7886, -0.3012], [0.4874, -0.7886, -0.3012], [0.7886, -0.3012, -0.4874], [0.5526, -0.5526, -0.5526], [0.5257, 0, 0.8507], [0, 0, 0.9748], [0, 0.3415, 0.8941], [-0.3012, 0.4874, 0.7886], [-0.8507, -0.5257, 0], [-0.7886, -0.3012, -0.4874], [-0.5526, -0.5526, -0.5526], [-0.4874, -0.7886, -0.3012], [0, -0.8507, 0.5257], [-0.7886, -0.3012, 0.4874], [-0.5257, 0, 0.8507], [-0.8941, 0, 0.3415], [-0.9748, 0, 0], [-0.7886, 0.3012, -0.4874], [-0.8941, 0, -0.3415], [-0.8507, 0.5257, 0], [-0.7886, 0.3012, 0.4874], [-0.4874, 0.7886, 0.3012], [-0.3415, 0.8941, 0], [0, 0.9748, 0], [0.7886, 0.3012, -0.4874], [0.8941, 0, -0.3415], [0.8941, 0, 0.3415], [0.8507, 0.5257, 0], [0.7886, 0.3012, 0.4874], [0.5526, 0.5526, -0.5526], [0.3012, -0.4874, 0.7886], [-0.5526, 0.5526, 0.5526], [-0.4874, -0.7886, 0.3012], [-0.3012, -0.4874, 0.7886], [-0.5526, -0.5526, 0.5526], [-0.3415, -0.8941, 0], [0, -0.3415, 0.8941], [-0.5526, 0.5526, -0.5526], [0.4874, 0.7886, 0.3012], [0.3415, 0.8941, 0], [0.5526, 0.5526, 0.5526], [0.5526, -0.5526, 0.5526]],
  rhombicuboctahedron: [[0.3574, 0.3574, 0.8629], [0.3574, 0.3574, -0.8629], [0.3574, -0.3574, 0.8629], [0.3574, -0.3574, -0.8629], [-0.3574, 0.3574, 0.8629], [-0.3574, 0.3574, -0.8629], [-0.3574, -0.3574, 0.8629], [-0.3574, -0.3574, -0.8629], [0.3574, 0.8629, 0.3574], [0.3574, 0.8629, -0.3574], [0.3574, -0.8629, 0.3574], [0.3574, -0.8629, -0.3574], [-0.3574, 0.8629, 0.3574], [-0.3574, 0.8629, -0.3574], [-0.3574, -0.8629, 0.3574], [-0.3574, -0.8629, -0.3574], [0.8629, 0.3574, 0.3574], [0.8629, 0.3574, -0.3574], [0.8629, -0.3574, 0.3574], [0.8629, -0.3574, -0.3574], [-0.8629, 0.3574, 0.3574], [-0.8629, 0.3574, -0.3574], [-0.8629, -0.3574, 0.3574], [-0.8629, -0.3574, -0.3574]],
  deltoidal_icositetrahedron: [[-0.7071, 0, 0.7071], [0, 0, 1], [0, -0.7071, 0.7071], [0.7071, 0, -0.7071], [-1, 0, 0], [-0.7071, -0.7071, 0], [-0.7071, 0.7071, 0], [0.7071, -0.7071, 0], [1, 0, 0], [0.7071, 0, 0.7071], [0.5469, -0.5469, 0.5469], [0.5469, 0.5469, 0.5469], [0, 0.7071, 0.7071], [-0.7071, 0, -0.7071], [-0.5469, 0.5469, -0.5469], [0, 0.7071, -0.7071], [0, 0, -1], [0, -0.7071, -0.7071], [-0.5469, -0.5469, -0.5469], [0, -1, 0], [0.5469, -0.5469, -0.5469], [-0.5469, -0.5469, 0.5469], [0, 1, 0], [-0.5469, 0.5469, 0.5469], [0.7071, 0.7071, 0], [0.5469, 0.5469, -0.5469]],
  snub_cube: [[0.4623, 0.2514, 0.8503], [-0.4623, -0.2514, 0.8503], [-0.4623, 0.2514, -0.8503], [0.4623, -0.2514, -0.8503], [0.2514, 0.8503, 0.4623], [-0.2514, -0.8503, 0.4623], [-0.2514, 0.8503, -0.4623], [0.2514, -0.8503, -0.4623], [0.8503, 0.4623, 0.2514], [-0.8503, -0.4623, 0.2514], [-0.8503, 0.4623, -0.2514], [0.8503, -0.4623, -0.2514], [-0.4623, 0.8503, 0.2514], [0.4623, -0.8503, 0.2514], [0.4623, 0.8503, -0.2514], [-0.4623, -0.8503, -0.2514], [-0.8503, 0.2514, 0.4623], [0.8503, -0.2514, 0.4623], [0.8503, 0.2514, -0.4623], [-0.8503, -0.2514, -0.4623], [-0.2514, 0.4623, 0.8503], [0.2514, -0.4623, 0.8503], [0.2514, 0.4623, -0.8503], [-0.2514, -0.4623, -0.8503]],
  pentagonal_icositetrahedron: [[1, 0, 0], [-0.5437, -0.5437, 0.5437], [-0.1607, -0.5437, 0.7519], [0.7519, 0.5437, -0.1607], [0, 0, 1], [0.5437, -0.1607, 0.7519], [0.7519, 0.1607, 0.5437], [-0.5437, -0.1607, -0.7519], [-1, 0, 0], [-0.7519, 0.1607, -0.5437], [-0.7519, -0.5437, -0.1607], [-0.5437, -0.5437, -0.5437], [-0.1607, -0.7519, -0.5437], [0, -1, 0], [-0.5437, -0.7519, 0.1607], [0, 0, -1], [0.5437, 0.5437, -0.5437], [0.1607, -0.7519, 0.5437], [0.5437, -0.7519, -0.1607], [0.7519, -0.5437, 0.1607], [0.5437, -0.5437, 0.5437], [-0.7519, 0.5437, 0.1607], [-0.7519, -0.1607, 0.5437], [0, 1, 0], [0.1607, 0.7519, -0.5437], [-0.1607, 0.5437, -0.7519], [-0.5437, 0.5437, -0.5437], [-0.5437, 0.7519, -0.1607], [0.5437, 0.5437, 0.5437], [0.5437, 0.7519, 0.1607], [0.1607, 0.5437, 0.7519], [-0.1607, 0.7519, 0.5437], [-0.5437, 0.5437, 0.5437], [-0.5437, 0.1607, 0.7519], [0.5437, 0.1607, -0.7519], [0.7519, -0.1607, -0.5437], [0.5437, -0.5437, -0.5437], [0.1607, -0.5437, -0.7519]],
  truncated_cuboctahedron: [[-0.2157, -0.5208, -0.8259], [-0.2157, -0.5208, 0.8259], [-0.2157, 0.5208, -0.8259], [-0.2157, 0.5208, 0.8259], [0.2157, -0.5208, -0.8259], [0.2157, -0.5208, 0.8259], [0.2157, 0.5208, -0.8259], [0.2157, 0.5208, 0.8259], [-0.2157, -0.8259, -0.5208], [-0.2157, -0.8259, 0.5208], [-0.2157, 0.8259, -0.5208], [-0.2157, 0.8259, 0.5208], [0.2157, -0.8259, -0.5208], [0.2157, -0.8259, 0.5208], [0.2157, 0.8259, -0.5208], [0.2157, 0.8259, 0.5208], [-0.5208, -0.2157, -0.8259], [-0.5208, -0.2157, 0.8259], [-0.5208, 0.2157, -0.8259], [-0.5208, 0.2157, 0.8259], [0.5208, -0.2157, -0.8259], [0.5208, -0.2157, 0.8259], [0.5208, 0.2157, -0.8259], [0.5208, 0.2157, 0.8259], [-0.5208, -0.8259, -0.2157], [-0.5208, -0.8259, 0.2157], [-0.5208, 0.8259, -0.2157], [-0.5208, 0.8259, 0.2157], [0.5208, -0.8259, -0.2157], [0.5208, -0.8259, 0.2157], [0.5208, 0.8259, -0.2157], [0.5208, 0.8259, 0.2157], [-0.8259, -0.2157, -0.5208], [-0.8259, -0.2157, 0.5208], [-0.8259, 0.2157, -0.5208], [-0.8259, 0.2157, 0.5208], [0.8259, -0.2157, -0.5208], [0.8259, -0.2157, 0.5208], [0.8259, 0.2157, -0.5208], [0.8259, 0.2157, 0.5208], [-0.8259, -0.5208, -0.2157], [-0.8259, -0.5208, 0.2157], [-0.8259, 0.5208, -0.2157], [-0.8259, 0.5208, 0.2157], [0.8259, -0.5208, -0.2157], [0.8259, -0.5208, 0.2157], [0.8259, 0.5208, -0.2157], [0.8259, 0.5208, 0.2157]],
  disdyakis_dodecahedron: [[0, -1, 0], [0.5286, -0.5286, -0.5286], [0.5286, -0.5286, 0.5286], [0, 1, 0], [-1, 0, 0], [-0.5286, -0.5286, 0.5286], [-0.5286, -0.5286, -0.5286], [0, 0, -1], [0, -0.6133, -0.6133], [1, 0, 0], [0, 0, 1], [0, -0.6133, 0.6133], [-0.5286, 0.5286, 0.5286], [-0.6133, -0.6133, 0], [-0.6133, 0, -0.6133], [0.5286, 0.5286, -0.5286], [0.6133, 0, -0.6133], [0.6133, -0.6133, 0], [-0.6133, 0, 0.6133], [0.6133, 0, 0.6133], [0.5286, 0.5286, 0.5286], [0, 0.6133, 0.6133], [0.6133, 0.6133, 0], [-0.6133, 0.6133, 0], [-0.5286, 0.5286, -0.5286], [0, 0.6133, -0.6133]],
  truncated_icosahedron: [[0, -0.2018, -0.9794], [0, -0.2018, 0.9794], [0, 0.2018, -0.9794], [0, 0.2018, 0.9794], [-0.2018, -0.9794, 0], [-0.2018, 0.9794, 0], [0.2018, -0.9794, 0], [0.2018, 0.9794, 0], [-0.9794, 0, -0.2018], [-0.9794, 0, 0.2018], [0.9794, 0, -0.2018], [0.9794, 0, 0.2018], [-0.2018, -0.73, -0.653], [-0.2018, -0.73, 0.653], [-0.2018, 0.73, -0.653], [-0.2018, 0.73, 0.653], [0.2018, -0.73, -0.653], [0.2018, -0.73, 0.653], [0.2018, 0.73, -0.653], [0.2018, 0.73, 0.653], [-0.73, -0.653, -0.2018], [-0.73, -0.653, 0.2018], [-0.73, 0.653, -0.2018], [-0.73, 0.653, 0.2018], [0.73, -0.653, -0.2018], [0.73, -0.653, 0.2018], [0.73, 0.653, -0.2018], [0.73, 0.653, 0.2018], [-0.653, -0.2018, -0.73], [-0.653, -0.2018, 0.73], [-0.653, 0.2018, -0.73], [-0.653, 0.2018, 0.73], [0.653, -0.2018, -0.73], [0.653, -0.2018, 0.73], [0.653, 0.2018, -0.73], [0.653, 0.2018, 0.73], [-0.3265, -0.4035, -0.8547], [-0.3265, -0.4035, 0.8547], [-0.3265, 0.4035, -0.8547], [-0.3265, 0.4035, 0.8547], [0.3265, -0.4035, -0.8547], [0.3265, -0.4035, 0.8547], [0.3265, 0.4035, -0.8547], [0.3265, 0.4035, 0.8547], [-0.4035, -0.8547, -0.3265], [-0.4035, -0.8547, 0.3265], [-0.4035, 0.8547, -0.3265], [-0.4035, 0.8547, 0.3265], [0.4035, -0.8547, -0.3265], [0.4035, -0.8547, 0.3265], [0.4035, 0.8547, -0.3265], [0.4035, 0.8547, 0.3265], [-0.8547, -0.3265, -0.4035], [-0.8547, -0.3265, 0.4035], [-0.8547, 0.3265, -0.4035], [-0.8547, 0.3265, 0.4035], [0.8547, -0.3265, -0.4035], [0.8547, -0.3265, 0.4035], [0.8547, 0.3265, -0.4035], [0.8547, 0.3265, 0.4035]],
  pentakis_dodecahedron: [[0, 0.9342, -0.3568], [0.5774, 0.5774, 0.5774], [0.9342, 0.3568, 0], [0.8287, 0, 0.5121], [0.9342, -0.3568, 0], [0.5121, -0.8287, 0], [0.5121, 0.8287, 0], [0.5774, 0.5774, -0.5774], [0.8287, 0, -0.5121], [0.3568, 0, -0.9342], [-0.3568, 0, -0.9342], [-0.9342, 0.3568, 0], [-0.9342, -0.3568, 0], [0, 0.9342, 0.3568], [-0.5774, 0.5774, 0.5774], [0, 0.5121, 0.8287], [-0.5774, 0.5774, -0.5774], [-0.5121, 0.8287, 0], [-0.8287, 0, 0.5121], [-0.3568, 0, 0.9342], [0, 0.5121, -0.8287], [0.3568, 0, 0.9342], [0.5774, -0.5774, 0.5774], [0, -0.9342, 0.3568], [-0.5774, -0.5774, 0.5774], [0.5774, -0.5774, -0.5774], [0, -0.9342, -0.3568], [0, -0.5121, -0.8287], [-0.5774, -0.5774, -0.5774], [-0.8287, 0, -0.5121], [-0.5121, -0.8287, 0], [0, -0.5121, 0.8287]],
  truncated_dodecahedron: [[0, -0.1684, -0.9857], [0, -0.1684, 0.9857], [0, 0.1684, -0.9857], [0, 0.1684, 0.9857], [-0.1684, -0.9857, 0], [-0.1684, 0.9857, 0], [0.1684, -0.9857, 0], [0.1684, 0.9857, 0], [-0.9857, 0, -0.1684], [-0.9857, 0, 0.1684], [0.9857, 0, -0.1684], [0.9857, 0, 0.1684], [-0.1684, -0.4408, -0.8817], [-0.1684, -0.4408, 0.8817], [-0.1684, 0.4408, -0.8817], [-0.1684, 0.4408, 0.8817], [0.1684, -0.4408, -0.8817], [0.1684, -0.4408, 0.8817], [0.1684, 0.4408, -0.8817], [0.1684, 0.4408, 0.8817], [-0.4408, -0.8817, -0.1684], [-0.4408, -0.8817, 0.1684], [-0.4408, 0.8817, -0.1684], [-0.4408, 0.8817, 0.1684], [0.4408, -0.8817, -0.1684], [0.4408, -0.8817, 0.1684], [0.4408, 0.8817, -0.1684], [0.4408, 0.8817, 0.1684], [-0.8817, -0.1684, -0.4408], [-0.8817, -0.1684, 0.4408], [-0.8817, 0.1684, -0.4408], [-0.8817, 0.1684, 0.4408], [0.8817, -0.1684, -0.4408], [0.8817, -0.1684, 0.4408], [0.8817, 0.1684, -0.4408], [0.8817, 0.1684, 0.4408], [-0.4408, -0.5449, -0.7133], [-0.4408, -0.5449, 0.7133], [-0.4408, 0.5449, -0.7133], [-0.4408, 0.5449, 0.7133], [0.4408, -0.5449, -0.7133], [0.4408, -0.5449, 0.7133], [0.4408, 0.5449, -0.7133], [0.4408, 0.5449, 0.7133], [-0.5449, -0.7133, -0.4408], [-0.5449, -0.7133, 0.4408], [-0.5449, 0.7133, -0.4408], [-0.5449, 0.7133, 0.4408], [0.5449, -0.7133, -0.4408], [0.5449, -0.7133, 0.4408], [0.5449, 0.7133, -0.4408], [0.5449, 0.7133, 0.4408], [-0.7133, -0.4408, -0.5449], [-0.7133, -0.4408, 0.5449], [-0.7133, 0.4408, -0.5449], [-0.7133, 0.4408, 0.5449], [0.7133, -0.4408, -0.5449], [0.7133, -0.4408, 0.5449], [0.7133, 0.4408, -0.5449], [0.7133, 0.4408, 0.5449]],
  triakis_icosahedron: [[0.8507, 0.5257, 0], [0, 0.8507, -0.5257], [0.5257, 0, 0.8507], [0.8507, -0.5257, 0], [-0.5257, 0, -0.8507], [0, 0.8507, 0.5257], [-0.8507, 0.5257, 0], [0, -0.8507, 0.5257], [0.5257, 0, -0.8507], [0, -0.8507, -0.5257], [-0.8507, -0.5257, 0], [-0.5257, 0, 0.8507], [0.7985, 0, 0.305], [0.4935, 0.4935, -0.4935], [-0.4935, -0.4935, -0.4935], [0, 0.305, 0.7985], [0.4935, 0.4935, 0.4935], [0.305, 0.7985, 0], [0, -0.305, 0.7985], [-0.4935, -0.4935, 0.4935], [0, 0.305, -0.7985], [0.7985, 0, -0.305], [0.4935, -0.4935, 0.4935], [0.305, -0.7985, 0], [-0.4935, 0.4935, -0.4935], [-0.7985, 0, -0.305], [0.4935, -0.4935, -0.4935], [0, -0.305, -0.7985], [-0.305, -0.7985, 0], [-0.305, 0.7985, 0], [-0.4935, 0.4935, 0.4935], [-0.7985, 0, 0.305]],
  cuboctahedron: [[0.7071, 0.7071, 0], [0.7071, -0.7071, 0], [-0.7071, 0.7071, 0], [-0.7071, -0.7071, 0], [0.7071, 0, 0.7071], [0.7071, 0, -0.7071], [-0.7071, 0, 0.7071], [-0.7071, 0, -0.7071], [0, 0.7071, 0.7071], [0, 0.7071, -0.7071], [0, -0.7071, 0.7071], [0, -0.7071, -0.7071]],
  rhombic_dodecahedron: [[0.5, 0.5, 0.5], [0.5, 0.5, -0.5], [0.5, -0.5, 0.5], [0.5, -0.5, -0.5], [-0.5, 0.5, 0.5], [-0.5, 0.5, -0.5], [-0.5, -0.5, 0.5], [-0.5, -0.5, -0.5], [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]]
};

// Catalan duals derived by polar reciprocation when not in EMBED
const DUAL_OF = {
  triakis_tetrahedron: "truncated_tetrahedron",
  rhombic_dodecahedron: "cuboctahedron",
  triakis_octahedron: "truncated_cube",
  tetrakis_hexahedron: "truncated_octahedron"
};

// ---------- convex hull (support-plane enumeration + refit; all solids are convex) ----------
function hullFaces(pts) {
  const n = pts.length;
  const faces = [];
  const seen = new Set();
  const EPS = 6e-3,
    TIGHT = 2.5e-3;
  const orderAround = (members, nv) => {
    const c = members.reduce((a, m) => [a[0] + pts[m][0], a[1] + pts[m][1], a[2] + pts[m][2]], [0, 0, 0]).map(x => x / members.length);
    const u = normalize(sub(pts[members[0]], c));
    const v = normalize(cross(nv, u));
    const sorted = members.slice().sort((a, b) => Math.atan2(dot(sub(pts[a], c), v), dot(sub(pts[a], c), u)) - Math.atan2(dot(sub(pts[b], c), v), dot(sub(pts[b], c), u)));
    return {
      c,
      sorted
    };
  };
  for (let i = 0; i < n - 2; i++) for (let j = i + 1; j < n - 1; j++) for (let k = j + 1; k < n; k++) {
    let nv = cross(sub(pts[j], pts[i]), sub(pts[k], pts[i]));
    const ln = norm(nv);
    if (ln < 1e-9) continue;
    nv = scale(nv, 1 / ln);
    let d = dot(nv, pts[i]);
    if (d < 0) {
      nv = scale(nv, -1);
      d = -d;
    }
    if (d < 1e-6) continue;
    let ok = true;
    for (let m = 0; m < n; m++) {
      if (dot(nv, pts[m]) > d + EPS) {
        ok = false;
        break;
      }
    }
    if (!ok) continue;
    let members = [];
    for (let m = 0; m < n; m++) if (dot(nv, pts[m]) > d - EPS) members.push(m);
    if (members.length < 3) continue;
    // refit the plane: order the loose member set, take its Newell normal
    const o1 = orderAround(members, nv);
    let nn = [0, 0, 0];
    for (let m = 0; m < o1.sorted.length; m++) {
      const a = pts[o1.sorted[m]],
        b = pts[o1.sorted[(m + 1) % o1.sorted.length]];
      nn = [nn[0] + (a[1] - b[1]) * (a[2] + b[2]), nn[1] + (a[2] - b[2]) * (a[0] + b[0]), nn[2] + (a[0] - b[0]) * (a[1] + b[1])];
    }
    nn = normalize(nn);
    if (dot(nn, o1.c) < 0) nn = scale(nn, -1);
    const dd = dot(nn, o1.c);
    // re-collect against the refitted plane with a tight tolerance
    let ok2 = true;
    const m2 = [];
    for (let m = 0; m < n; m++) {
      const t = dot(nn, pts[m]);
      if (t > dd + TIGHT) {
        ok2 = false;
        break;
      }
      if (t > dd - TIGHT) m2.push(m);
    }
    if (!ok2 || m2.length < 3) continue;
    const key = m2.join("-");
    if (seen.has(key)) continue;
    seen.add(key);
    const o2 = orderAround(m2, nn);
    faces.push({
      normal: nn,
      d: dd,
      verts: o2.sorted,
      centroid: o2.c
    });
  }
  return faces;
}
function polarDual(pts) {
  return hullFaces(pts).map(f => scale(f.normal, 1 / f.d));
}
const CACHE = {};
function getSolid(name) {
  if (CACHE[name]) return CACHE[name];
  let verts;
  if (EMBED[name]) verts = EMBED[name];else if (GENERATED[name]) verts = cleanSet(GENERATED[name]());else if (DUAL_OF[name]) verts = polarDual(getSolid(DUAL_OF[name]).verts);else verts = TETRA;
  const r = Math.max(...verts.map(norm));
  verts = verts.map(v => scale(v, 1 / r));
  const faces = hullFaces(verts);
  CACHE[name] = {
    verts,
    faces
  };
  return CACHE[name];
}

// ---------- render ----------
let GID = 0;
function SolidView({
  solid = "tetrahedron",
  size = 120,
  mirror = false,
  yaw = 0.55,
  pitch = -0.42,
  tone = "lapis",
  label,
  style
}) {
  const {
    verts,
    faces
  } = React.useMemo(() => getSolid(solid), [solid]);
  const gid = React.useMemo(() => `sv${++GID}`, []);
  const cy0 = Math.cos(yaw),
    sy = Math.sin(yaw),
    cx0 = Math.cos(pitch),
    sx = Math.sin(pitch);
  const rot = v => {
    let x = v[0] * cy0 + v[2] * sy,
      z = -v[0] * sy + v[2] * cy0,
      y = v[1];
    const y2 = y * cx0 - z * sx,
      z2 = y * sx + z * cx0;
    return [mirror ? -x : x, y2, z2];
  };
  const R = verts.map(rot);
  const C = size / 2,
    S = size * 0.4;
  const px = p => (C + p[0] * S).toFixed(2);
  const py = p => (C - p[1] * S).toFixed(2);
  const L = normalize([0.45, 0.75, 0.5]);
  const drawn = faces.map(f => {
    const rn = normalize(rot(f.normal));
    const depth = rot(f.centroid)[2];
    const front = rn[2] > 0;
    const lit = Math.max(0, dot(rn, L));
    const path = f.verts.map((i, k) => `${k ? "L" : "M"}${px(R[i])} ${py(R[i])}`).join(" ") + " Z";
    return {
      path,
      front,
      depth,
      lit
    };
  }).sort((a, b) => a.depth - b.depth);
  const edgeCopper = tone === "gold" ? "#d4af6a" : "#9d684e";
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`,
    style: style,
    "aria-label": label || solid
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: `${gid}g`,
    cx: "50%",
    cy: "46%",
    r: "52%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#26418f",
    stopOpacity: "0.5"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "70%",
    stopColor: "#1e3a8a",
    stopOpacity: "0.14"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#0b0b12",
    stopOpacity: "0"
  }))), /*#__PURE__*/React.createElement("circle", {
    cx: C,
    cy: C * 0.96,
    r: S * 1.18,
    fill: `url(#${gid}g)`
  }), drawn.filter(f => !f.front).map((f, i) => /*#__PURE__*/React.createElement("path", {
    key: `b${i}`,
    d: f.path,
    fill: "#1e3a8a",
    fillOpacity: "0.10",
    stroke: "#5d7fd0",
    strokeOpacity: "0.22",
    strokeWidth: size * 0.004
  })), drawn.filter(f => f.front).map((f, i) => /*#__PURE__*/React.createElement("path", {
    key: `f${i}`,
    d: f.path,
    fill: "#33468c",
    fillOpacity: (0.12 + 0.22 * f.lit).toFixed(3),
    stroke: edgeCopper,
    strokeOpacity: "0.9",
    strokeWidth: size * 0.008,
    strokeLinejoin: "round"
  })), R.map((p, i) => p[2] > 0.15 ? /*#__PURE__*/React.createElement("g", {
    key: `v${i}`
  }, /*#__PURE__*/React.createElement("circle", {
    cx: px(p),
    cy: py(p),
    r: size * 0.016,
    fill: "#5d7fd0",
    fillOpacity: "0.35"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: px(p),
    cy: py(p),
    r: size * 0.007,
    fill: "#aebfe8"
  })) : null));
}
Object.assign(__ds_scope, { SolidView });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/oracle/SolidView.jsx", error: String((e && e.message) || e) }); }

// components/oracle/DeckCard.jsx
try { (() => {
/**
 * DeckCard — full card art for the 78-card Amraqiyyah Oracle deck, per the
 * ratified spec (Oracle §5, Appendix A/B) and the Hedronite glass-polyhedron
 * visual language. Honours: uniform backs, split faces (two regions on one
 * front, never reversible), sideways Agent placement, chiral marks on 22/28.
 * Kemetic accents are Unicode Mdw Ntr signs (Canon §13.4).
 */

// ---------- shared vocab ----------
const SIGIL = {
  Saturn: "♄",
  Jupiter: "♃",
  Mars: "♂",
  Sun: "☉",
  Venus: "♀",
  Mercury: "☿",
  Moon: "☾",
  Gen: "☶"
};
const TRIGRAM = {
  Saturn: "☷",
  Jupiter: "☲",
  Mars: "☳",
  Sun: "☰",
  Venus: "☱",
  Mercury: "☴",
  Moon: "☵",
  Gen: "☶"
};
const TRIG_LINES = {
  Saturn: [0, 0, 0],
  Jupiter: [1, 0, 1],
  Mars: [1, 0, 0],
  Sun: [1, 1, 1],
  Venus: [1, 1, 0],
  Mercury: [0, 1, 1],
  Moon: [0, 1, 0],
  Gen: [0, 0, 1]
};
const PLANET_COLOR = {
  Saturn: "var(--planet-saturn)",
  Jupiter: "var(--planet-jupiter)",
  Mars: "var(--planet-mars)",
  Sun: "var(--planet-sun)",
  Venus: "var(--planet-venus)",
  Mercury: "var(--planet-mercury)",
  Moon: "var(--planet-moon)",
  Gen: "var(--gold)"
};
const EL_COLOR = {
  Fire: "var(--element-fire)",
  Earth: "var(--element-earth)",
  Ether: "var(--element-ether)",
  Air: "var(--element-air)",
  Water: "var(--element-water)",
  Axial: "var(--gold)"
};
const EL_GLYPH = {
  Fire: "𓊮",
  Earth: "𓇾",
  Ether: "𓇯",
  Air: "𓊡",
  Water: "𓈗",
  Axial: "𓊽"
};
function hexLines(upper, lower) {
  return [...TRIG_LINES[lower], ...TRIG_LINES[upper]];
}

// ---------- the ratified 78-card registry ----------
const M = (mansion, mansionName, letter, letterName, abjad, ruler) => ({
  mansion,
  mansionName,
  letter,
  letterName,
  abjad,
  ruler
});
const COURT = [{
  n: 1,
  name: "The Unmoved Axis",
  identity: "Sgr A* · Gen ☶",
  trigger: "Both gates open simultaneously",
  divine: "Al-Ahad",
  divineAr: "الأحد",
  meaning: "The Unique One",
  glyph: "𓊽",
  ...M(1, "Al-Sharatain", "أ", "Alif", 1, "Saturn")
}, {
  n: 2,
  name: "The Witness Star",
  identity: "Sirius · Al-Shi'ra",
  trigger: "Heliacal rising · Moon within 1° of Sirius",
  divine: "Ash-Shahid",
  divineAr: "الشهيد",
  meaning: "The All-Observing Witness",
  glyph: "𓇼",
  ...M(2, "Al-Butain", "ب", "Ba", 2, "Saturn")
}, {
  n: 3,
  name: "The Pleiades Gate",
  identity: "Pleiades · Al-Thurayya",
  trigger: "Heliacal rising · Moon within 1° of Alcyone",
  divine: "Al-Fattah",
  divineAr: "الفتاح",
  meaning: "The Opener",
  glyph: "𓉐",
  ...M(3, "Al-Thurayya", "ج", "Jim", 3, "Saturn")
}].map(c => ({
  ...c,
  stratum: 1
}));
const COUNCIL = [{
  n: 4,
  name: "The Architect",
  planet: "Saturn",
  element: "Earth",
  divine: "As-Sabur",
  divineAr: "الصبور",
  meaning: "The Patient",
  yang: {
    hex: 15,
    hname: "Modesty",
    dn: "Al-Khafid"
  },
  yin: {
    hex: 23,
    hname: "Splitting Apart",
    dn: "Al-Hasib"
  },
  ...M(4, "Al-Dabaran", "د", "Dal", 4, "Saturn")
}, {
  n: 5,
  name: "The Illuminator",
  planet: "Jupiter",
  element: "Fire",
  divine: "Al-Karim",
  divineAr: "الكريم",
  meaning: "The Generous",
  yang: {
    hex: 56,
    hname: "The Wanderer",
    dn: "Al-Basit"
  },
  yin: {
    hex: 22,
    hname: "Grace",
    dn: "Al-Barr"
  },
  ...M(5, "Al-Haq'ah", "ه", "Ha", 5, "Jupiter")
}, {
  n: 6,
  name: "The Striker",
  planet: "Mars",
  element: "Fire",
  divine: "Al-Qawi",
  divineAr: "القوي",
  meaning: "The All-Strong",
  yang: {
    hex: 62,
    hname: "Preponderance of the Small",
    dn: "Al-Muqaddim"
  },
  yin: {
    hex: 27,
    hname: "Nourishment",
    dn: "Al-Muqit"
  },
  ...M(6, "Al-Han'ah", "و", "Waw", 6, "Jupiter")
}, {
  n: 7,
  name: "The Sovereign",
  planet: "Sun",
  element: "Ether",
  divine: "An-Nur",
  divineAr: "النور",
  meaning: "The Light",
  yang: {
    hex: 33,
    hname: "Retreat",
    dn: "Az-Zahir"
  },
  yin: {
    hex: 26,
    hname: "Taming Power of the Great",
    dn: "Al-Batin"
  },
  ...M(7, "Al-Dhira", "ز", "Zayn", 7, "Jupiter")
}, {
  n: 8,
  name: "The Harmonist",
  planet: "Venus",
  element: "Water",
  divine: "Al-Wadud",
  divineAr: "الودود",
  meaning: "The Loving",
  yang: {
    hex: 31,
    hname: "Influence",
    dn: "Al-Mujib"
  },
  yin: {
    hex: 41,
    hname: "Decrease",
    dn: "Al-Afuww"
  },
  ...M(8, "Al-Nathrah", "ح", "Haa", 8, "Jupiter")
}, {
  n: 9,
  name: "The Messenger",
  planet: "Mercury",
  element: "Air",
  divine: "Al-Khabir",
  divineAr: "الخبير",
  meaning: "The Fully Aware",
  yang: {
    hex: 53,
    hname: "Gradual Progress",
    dn: "Ar-Rashid"
  },
  yin: {
    hex: 18,
    hname: "Work on What Has Decayed",
    dn: "Al-Mu'id"
  },
  ...M(9, "Al-Tarf", "ط", "Tta", 9, "Mars")
}, {
  n: 10,
  name: "The Keeper",
  planet: "Moon",
  element: "Water",
  divine: "Al-Latif",
  divineAr: "اللطيف",
  meaning: "The Subtle",
  yang: {
    hex: 39,
    hname: "Obstruction",
    dn: "Al-Qabid"
  },
  yin: {
    hex: 4,
    hname: "Youthful Folly",
    dn: "Ar-Ra'uf"
  },
  ...M(10, "Al-Jabhah", "ي", "Ya", 10, "Mars")
}].map(c => ({
  ...c,
  stratum: 2
}));
const KEYS = [{
  n: 11,
  name: "The Spark",
  solid: "tetrahedron",
  faces: 4,
  element: "Fire",
  register: "Jalal",
  book: "Book I · Pss 1–41",
  orient: "Upright — yang primary",
  divine: "Al-Mubdi'",
  divineAr: "المبدئ",
  meaning: "The Originator",
  ...M(11, "Al-Zubrah", "ك", "Kaf", 20, "Mars")
}, {
  n: 12,
  name: "The Foundation",
  solid: "cube",
  faces: 6,
  element: "Earth",
  register: "Jalal",
  book: "Book III · Pss 73–89",
  orient: "Inverted — yin primary",
  divine: "Al-Qayyum",
  divineAr: "القيوم",
  meaning: "The Self-Sustaining",
  ...M(12, "Al-Sarfah", "ل", "Lam", 30, "Mars")
}, {
  n: 13,
  name: "The Bridge",
  solid: "octahedron",
  faces: 8,
  element: "Air",
  register: "Jamal",
  book: "Book V · Pss 107–150",
  orient: "Upright — yang primary",
  divine: "Al-Alim",
  divineAr: "العليم",
  meaning: "The All-Knowing",
  ...M(13, "Al-Awwa", "م", "Mim", 40, "Sun")
}, {
  n: 14,
  name: "The Cosmos",
  solid: "dodecahedron",
  faces: 12,
  element: "Ether",
  register: "Kamal",
  book: "Book IV · Pss 90–106",
  orient: "Sideways — both equal",
  divine: "Al-Wasi'",
  divineAr: "الواسع",
  meaning: "The All-Encompassing",
  ...M(14, "Al-Simak", "ن", "Nun", 50, "Sun")
}, {
  n: 15,
  name: "The Current",
  solid: "icosahedron",
  faces: 20,
  element: "Water",
  register: "Jamal",
  book: "Book II · Pss 42–72",
  orient: "Inverted — yin primary",
  divine: "Al-Muhyi",
  divineAr: "المحيي",
  meaning: "The Giver of Life",
  ...M(15, "Al-Ghafr", "س", "Sin", 60, "Sun")
}].map(c => ({
  ...c,
  stratum: 3
}));
const B = (n, bn, arch, archName, cat, catName, character, divine, divineAr, chiral, m) => ({
  n,
  stratum: 4,
  bn,
  name: `Bridge ${bn}`,
  arch,
  archName,
  cat,
  catName,
  character,
  divine,
  divineAr,
  chiral: !!chiral,
  ...m
});
const BRIDGES = [B(16, 1, "truncated_tetrahedron", "Truncated Tetrahedron", "triakis_tetrahedron", "Triakis Tetrahedron", "First emergence — pure form beginning to complexify", "Al-Badi'", "البديع", 0, M(16, "Al-Zubana", "ع", "Ayn", 70, "Sun")), B(17, 2, "cuboctahedron", "Cuboctahedron", "rhombic_dodecahedron", "Rhombic Dodecahedron", "Perfect equilibrium — the vector equilibrium", "Al-Adl", "العدل", 0, M(17, "Al-Iklil", "ف", "Fa", 80, "Venus")), B(18, 3, "truncated_cube", "Truncated Cube", "triakis_octahedron", "Triakis Octahedron", "Structure refined — cutting away excess", "Al-Muqsit", "المقسط", 0, M(18, "Al-Qalb", "ص", "Sad", 90, "Venus")), B(19, 4, "truncated_octahedron", "Truncated Octahedron", "tetrakis_hexahedron", "Tetrakis Hexahedron", "Expansion bounded — open form finding walls", "Al-Hafiz", "الحفيظ", 0, M(19, "Al-Shawlah", "ق", "Qaf", 100, "Venus")), B(20, 5, "rhombicuboctahedron", "Rhombicuboctahedron", "deltoidal_icositetrahedron", "Deltoidal Icositetrahedron", "Practical compound — many faces working together", "Al-Wakil", "الوكيل", 0, M(20, "Al-Na'aim", "ر", "Ra", 200, "Venus")), B(21, 6, "truncated_cuboctahedron", "Truncated Cuboctahedron", "disdyakis_dodecahedron", "Disdyakis Dodecahedron", "Maximum cubic complexity — all face types integrated", "Al-Hakim", "الحكيم", 0, M(21, "Al-Baldah", "ش", "Shin", 300, "Mercury")), B(22, 7, "snub_cube", "Snub Cube", "pentagonal_icositetrahedron", "Pentagonal Icositetrahedron", "Mirror paths — two valid routes; handedness decides", "Al-Wajid", "الواجد", 1, M(22, "Sa'd al-Dhabih", "ت", "Ta", 400, "Mercury")), B(23, 8, "icosidodecahedron", "Icosidodecahedron", "rhombic_triacontahedron", "Rhombic Triacontahedron", "Cosmic-emotional threshold — universal meets personal", "Ar-Raqib", "الرقيب", 0, M(23, "Sa'd Bula", "ث", "Tha", 500, "Mercury")), B(24, 9, "truncated_dodecahedron", "Truncated Dodecahedron", "triakis_icosahedron", "Triakis Icosahedron", "Cosmic rendered accessible — pentagons opening", "Al-Muhaymin", "المهيمن", 0, M(24, "Sa'd al-Su'ud", "خ", "Kha", 600, "Mercury")), B(25, 10, "truncated_icosahedron", "Truncated Icosahedron", "pentakis_dodecahedron", "Pentakis Dodecahedron", "Familiar deep pattern — the fullerene made visible", "Al-Muhsi", "المحصي", 0, M(25, "Sa'd al-Akhbiyah", "ذ", "Dhal", 700, "Moon")), B(26, 11, "rhombicosidodecahedron", "Rhombicosidodecahedron", "deltoidal_hexecontahedron", "Deltoidal Hexecontahedron", "Maximum compound short of totality — 62 of 64", "Al-Kabir", "الكبير", 0, M(26, "Al-Fargh al-Awwal", "ض", "Dad", 800, "Moon")), B(27, 12, "truncated_icosidodecahedron", "Truncated Icosidodecahedron", "disdyakis_triacontahedron", "Disdyakis Triacontahedron", "Maximum complexity — all face types present", "Al-Azim", "العظيم", 0, M(27, "Al-Fargh al-Thani", "ظ", "Dha", 900, "Moon")), B(28, 13, "snub_dodecahedron", "Snub Dodecahedron", "pentagonal_hexecontahedron", "Pentagonal Hexecontahedron", "Mirror paths at cosmic scale — highest-stakes handedness", "Al-Wahid", "الواحد", 1, M(28, "Batn al-Hut", "غ", "Ghayn", 1000, "Moon"))];
const F = (n, hex, hname, upper, lower, suit, divine, pure, crown) => ({
  n,
  stratum: 5,
  hex,
  hname,
  name: `Hex ${hex} — ${hname}`,
  upper,
  lower,
  suit,
  divine,
  divineAr: DIVINE_AR[divine],
  pure: !!pure,
  crown: !!crown
});
// Arabic script for the field cards' Divine Names (standard Tirmidhi orthography)
const DIVINE_AR = {
  "As-Sabur": "الصبور",
  "Ad-Darr": "الضار",
  "Al-Ba'ith": "الباعث",
  "As-Salam": "السلام",
  "Al-Waali": "الوالي",
  "Ar-Rafi'": "الرافع",
  "Al-Jabbar": "الجبار",
  "Al-Mu'izz": "المعز",
  "Al-Karim": "الكريم",
  "Al-Muntaqim": "المنتقم",
  "Al-Ghani": "الغني",
  "Al-Mani'": "المانع",
  "Al-Bari'": "البارئ",
  "Al-Muqtadir": "المقتدر",
  "Al-Hamid": "الحميد",
  "Al-Maajid": "الماجد",
  "Al-Qawi": "القوي",
  "Al-Qahhar": "القهار",
  "Al-Mudhill": "المذل",
  "Al-Warith": "الوارث",
  "An-Nafi'": "النافع",
  "Al-Muta'ali": "المتعالي",
  "Al-Mu'min": "المؤمن",
  "Al-Haqq": "الحق",
  "An-Nur": "النور",
  "Al-Ali": "العلي",
  "Al-Awwal": "الأول",
  "Al-Akhir": "الآخر",
  "Al-Jalil": "الجليل",
  "Al-Hakam": "الحكم",
  "Al-Majid": "المجيد",
  "Al-Mutakabbir": "المتكبر",
  "Dhul-Jalali-wal-Ikram": "ذو الجلال والإكرام",
  "Al-Khabir": "الخبير",
  "Al-Ghaffar": "الغفار",
  "Malik-ul-Mulk": "مالك الملك",
  "Al-Mumit": "المميت",
  "Al-Wali": "الولي",
  "Al-Ghafur": "الغفور",
  "Al-Halim": "الحليم",
  "Ash-Shakur": "الشكور",
  "Al-Hayy": "الحي",
  "Al-Basir": "البصير",
  "Al-Khaliq": "الخالق",
  "As-Sami'": "السميع",
  "Al-Mu'akhkhir": "المؤخر",
  "Al-Mughni": "المغني",
  "Al-Wadud": "الودود",
  "Al-Latif": "اللطيف"
};
const FIELD = [{
  ...F(29, 52, "The Axial Witness", "Gen", "Gen", "Axial", "As-Samad"),
  divineAr: "الصمد",
  meaning: "The Eternal Absolute",
  axial: true
}, F(30, 2, "The Receptive", "Saturn", "Saturn", "Earth", "As-Sabur", 1), F(31, 36, "Darkening of the Light", "Saturn", "Jupiter", "Earth", "Ad-Darr"), F(32, 24, "Return", "Saturn", "Mars", "Earth", "Al-Ba'ith"), F(33, 11, "Peace", "Saturn", "Sun", "Earth", "As-Salam"), F(34, 19, "Approach", "Saturn", "Venus", "Earth", "Al-Waali"), F(35, 46, "Pushing Upward", "Saturn", "Mercury", "Earth", "Ar-Rafi'"), F(36, 7, "The Army", "Saturn", "Moon", "Earth", "Al-Jabbar"), F(37, 35, "Progress", "Jupiter", "Saturn", "Fire", "Al-Mu'izz"), F(38, 30, "The Clinging", "Jupiter", "Jupiter", "Fire", "Al-Karim", 1), F(39, 21, "Biting Through", "Jupiter", "Mars", "Fire", "Al-Muntaqim"), F(40, 14, "Great Possession", "Jupiter", "Sun", "Fire", "Al-Ghani"), F(41, 38, "Opposition", "Jupiter", "Venus", "Fire", "Al-Mani'"), F(42, 50, "The Cauldron", "Jupiter", "Mercury", "Fire", "Al-Bari'"), F(43, 64, "Before Completion", "Jupiter", "Moon", "Fire", "Al-Muqtadir"), F(44, 16, "Enthusiasm", "Mars", "Saturn", "Fire", "Al-Hamid"), F(45, 55, "Abundance", "Mars", "Jupiter", "Fire", "Al-Maajid"), F(46, 51, "The Arousing", "Mars", "Mars", "Fire", "Al-Qawi", 1), F(47, 34, "Great Power", "Mars", "Sun", "Fire", "Al-Qahhar"), F(48, 54, "The Marrying Maiden", "Mars", "Venus", "Fire", "Al-Mudhill"), F(49, 32, "Duration", "Mars", "Mercury", "Fire", "Al-Warith"), F(50, 40, "Deliverance", "Mars", "Moon", "Fire", "An-Nafi'"), F(51, 12, "Standstill", "Sun", "Saturn", "Ether", "Al-Muta'ali"), F(52, 13, "Fellowship", "Sun", "Jupiter", "Ether", "Al-Mu'min"), F(53, 25, "Innocence", "Sun", "Mars", "Ether", "Al-Haqq"), F(54, 1, "The Creative", "Sun", "Sun", "Ether", "An-Nur", 1, 1), F(55, 10, "Treading", "Sun", "Venus", "Ether", "Al-Ali"), F(56, 44, "Coming to Meet", "Sun", "Mercury", "Ether", "Al-Awwal"), F(57, 6, "Conflict", "Sun", "Moon", "Ether", "Al-Akhir"), F(58, 20, "Contemplation", "Mercury", "Saturn", "Air", "Al-Jalil"), F(59, 37, "The Family", "Mercury", "Jupiter", "Air", "Al-Hakam"), F(60, 42, "Increase", "Mercury", "Mars", "Air", "Al-Majid"), F(61, 9, "Small Taming", "Mercury", "Sun", "Air", "Al-Mutakabbir"), F(62, 61, "Inner Truth", "Mercury", "Venus", "Air", "Dhul-Jalali-wal-Ikram"), F(63, 57, "The Gentle", "Mercury", "Mercury", "Air", "Al-Khabir", 1), F(64, 59, "Dispersion", "Mercury", "Moon", "Air", "Al-Ghaffar"), F(65, 45, "Gathering Together", "Venus", "Saturn", "Water", "Malik-ul-Mulk"), F(66, 49, "Revolution", "Venus", "Jupiter", "Water", "Al-Mumit"), F(67, 17, "Following", "Venus", "Mars", "Water", "Al-Wali"), F(68, 43, "Breakthrough", "Venus", "Sun", "Water", "Al-Ghafur"), F(69, 58, "The Joyous", "Venus", "Venus", "Water", "Al-Wadud", 1), F(70, 28, "Great Preponderance", "Venus", "Mercury", "Water", "Al-Halim"), F(71, 47, "Oppression", "Venus", "Moon", "Water", "Ash-Shakur"), F(72, 8, "Holding Together", "Moon", "Saturn", "Water", "Al-Hayy"), F(73, 63, "After Completion", "Moon", "Jupiter", "Water", "Al-Basir"), F(74, 3, "Difficulty at the Beginning", "Moon", "Mars", "Water", "Al-Khaliq"), F(75, 5, "Waiting", "Moon", "Sun", "Water", "As-Sami'"), F(76, 60, "Limitation", "Moon", "Venus", "Water", "Al-Mu'akhkhir"), F(77, 48, "The Well", "Moon", "Mercury", "Water", "Al-Mughni"), F(78, 29, "The Abysmal", "Moon", "Moon", "Water", "Al-Latif", 1)];
const DECK = [...COURT, ...COUNCIL, ...KEYS, ...BRIDGES, ...FIELD];

// ---------- small figures ----------
function HexFigure({
  upper,
  lower,
  w,
  k,
  accent
}) {
  const lines = hexLines(upper, lower);
  const bar = 8 * k,
    gap = 5 * k;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column-reverse",
      gap: gap,
      width: w
    }
  }, lines.map((y, i) => y ? /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      height: bar,
      borderRadius: 2 * k,
      background: accent || "var(--yang)"
    }
  }) : /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: w * 0.18,
      height: bar
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      borderRadius: 2 * k,
      background: "var(--yin)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      borderRadius: 2 * k,
      background: "var(--yin)"
    }
  }))));
}

// ---------- the card ----------
function DeckCard({
  card = "back",
  width = 300,
  orientation = "upright",
  backSrc = "../assets/hedronite-glyph-copper.png",
  style
}) {
  const k = width / 300;
  const h = Math.round(width * 1.714);
  const c = card === "back" ? null : typeof card === "number" ? DECK[card - 1] : card;
  const rot = orientation === "sideways" ? "90deg" : orientation === "inverted" ? "180deg" : "0deg";
  const el = c && (c.element || c.suit);
  const accent = c ? c.stratum === 1 ? "var(--gold)" : EL_COLOR[el] || "var(--gold)" : "var(--gold)";
  const fs = n => `${(n * k).toFixed(1)}px`;
  const frame = {
    width,
    height: h,
    flex: "0 0 auto",
    boxSizing: "border-box",
    position: "relative",
    overflow: "hidden",
    background: "radial-gradient(ellipse 120% 90% at 50% 38%, #12122000 0%, #0b0b12 100%), #0e0e18",
    borderRadius: 14 * k,
    border: `1px solid var(--line)`,
    transform: `rotate(${rot})`,
    fontFamily: "var(--font-body)",
    color: "var(--text)",
    boxShadow: "0 10px 30px rgba(0,0,0,.5)",
    display: "flex",
    flexDirection: "column"
  };
  const inner = {
    position: "absolute",
    inset: 8 * k,
    border: `1px solid ${c && (c.axial || c.crown || c.stratum === 1) ? "var(--gold)" : "rgba(184,115,51,.55)"}`,
    borderRadius: 8 * k,
    pointerEvents: "none"
  };
  const ripple = {
    position: "absolute",
    inset: 0,
    opacity: 0.5,
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cg fill='none' stroke='%2326418f' stroke-opacity='0.3' stroke-width='0.5'%3E%3Ccircle cx='100' cy='100' r='36'/%3E%3Ccircle cx='100' cy='100' r='72'/%3E%3Ccircle cx='100' cy='100' r='108'/%3E%3C/g%3E%3C/svg%3E\")",
    backgroundSize: `${200 * k}px ${200 * k}px`,
    backgroundPosition: "center 30%",
    pointerEvents: "none"
  };
  if (!c) {
    // ---- uniform back ----
    return /*#__PURE__*/React.createElement("div", {
      style: {
        ...frame,
        ...style
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: ripple
    }), /*#__PURE__*/React.createElement("div", {
      style: inner
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14 * k
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-hieroglyph)",
        fontSize: fs(15),
        color: "var(--copper)",
        letterSpacing: `${6 * k}px`
      }
    }, "\uD80C\uDDFC \uD80C\uDEAE \uD80C\uDDFE \uD80C\uDEA1 \uD80C\uDE17 \uD80C\uDDEF \uD80C\uDDFC"), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 120 * k,
        height: 120 * k,
        borderRadius: "50%",
        border: "1px solid var(--copper)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 30px rgba(38,65,143,.5), inset 0 0 24px rgba(38,65,143,.35)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 92 * k,
        height: 92 * k,
        borderRadius: "50%",
        border: "1px solid rgba(212,175,106,.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: backSrc,
      alt: "",
      onError: e => {
        e.target.style.display = "none";
      },
      style: {
        width: 74 * k,
        height: 74 * k,
        objectFit: "contain",
        objectPosition: "center 32%",
        filter: "drop-shadow(0 0 8px rgba(184,115,51,.55))"
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-hieroglyph)",
        fontSize: fs(15),
        color: "var(--copper)",
        letterSpacing: `${6 * k}px`,
        transform: "rotate(180deg)"
      }
    }, "\uD80C\uDDFC \uD80C\uDEAE \uD80C\uDDFE \uD80C\uDEA1 \uD80C\uDE17 \uD80C\uDDEF \uD80C\uDDFC")));
  }

  // ---- shared chrome ----
  const header = /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: `${16 * k}px ${18 * k}px 0`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 26 * k,
      height: 26 * k,
      borderRadius: "50%",
      border: "1px solid var(--copper)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-mono)",
      fontSize: fs(10),
      color: "var(--gold)"
    }
  }, c.n), c.letter ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-arabic)",
      fontSize: fs(17),
      color: "var(--lapis-light)"
    }
  }, c.letter), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: fs(8),
      color: "var(--dim)",
      marginLeft: 4 * k
    }
  }, c.abjad)) : /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-hieroglyph)",
      fontSize: fs(14),
      color: accent,
      opacity: 0.9
    }
  }, EL_GLYPH[el]));
  const title = (t, sub) => /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: `${6 * k}px ${16 * k}px 0`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: fs(c.stratum === 5 ? 16 : 19),
      lineHeight: 1.15,
      color: c.crown || c.axial || c.stratum === 1 ? "var(--gold)" : "var(--text)"
    }
  }, t), sub ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontStyle: "italic",
      fontSize: fs(10.5),
      color: "var(--dim)",
      marginTop: 3 * k
    }
  }, sub) : null);
  const frieze = /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      fontFamily: "var(--font-hieroglyph)",
      fontSize: fs(11),
      color: "var(--copper)",
      opacity: 0.85,
      letterSpacing: `${4 * k}px`
    }
  }, EL_GLYPH[el] || "𓇼", " \xB7 ", c.stratum === 1 ? c.glyph : c.stratum === 4 ? "𓊛" : EL_GLYPH[el], " \xB7 ", EL_GLYPH[el] || "𓇼");
  const nameBlock = /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: `${4 * k}px ${14 * k}px ${12 * k}px`
    }
  }, frieze, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6 * k,
      fontFamily: "var(--font-body)",
      fontWeight: 600,
      fontSize: fs(13),
      color: "var(--gold)"
    }
  }, c.divine, c.divineAr ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-arabic)",
      marginLeft: 6 * k,
      color: "var(--lapis-light)",
      fontWeight: 400
    }
  }, c.divineAr) : null), c.meaning ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontStyle: "italic",
      fontSize: fs(9.5),
      color: "var(--dim)",
      marginTop: 1 * k
    }
  }, c.meaning) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6 * k,
      fontFamily: "var(--font-mono)",
      fontSize: fs(7),
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--dim)"
    }
  }, c.mansion ? `Mansion ${c.mansion} · ${c.mansionName} · ${c.ruler}` : c.suit === "Axial" ? "Gen over Gen · The Permanent Center" : `${c.upper} over ${c.lower} · ${c.suit} suit`));

  // ---- stratum-specific art ----
  let art = null,
    sub = "";
  if (c.stratum === 1) {
    sub = c.identity;
    art = /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10 * k,
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        width: 170 * k,
        height: 170 * k,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(38,65,143,.5) 0%, rgba(38,65,143,.12) 55%, transparent 75%)"
      }
    }), c.n === 1 && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        width: 130 * k,
        height: 130 * k,
        borderRadius: "50%",
        border: "1px solid rgba(212,175,106,.45)"
      }
    }), c.n === 1 && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        width: 96 * k,
        height: 96 * k,
        borderRadius: "50%",
        border: "1px solid rgba(212,175,106,.3)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-hieroglyph)",
        fontSize: fs(76),
        color: "var(--gold)",
        textShadow: "0 0 26px rgba(212,175,106,.5)",
        position: "relative"
      }
    }, c.glyph), c.n === 3 && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: "18%",
        display: "flex",
        gap: 7 * k
      }
    }, [3, 5, 4, 6, 4, 5, 3].map((r, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        width: r * k * 0.9,
        height: r * k * 0.9,
        borderRadius: "50%",
        background: "#aebfe8",
        boxShadow: "0 0 6px #6d8fd8",
        marginTop: i % 3 * 4 * k
      }
    }))), c.n === 2 && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: "20%",
        right: "24%",
        width: 7 * k,
        height: 7 * k,
        borderRadius: "50%",
        background: "#eaf0ff",
        boxShadow: "0 0 14px #aebfe8, 0 0 30px #6d8fd8"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: fs(7.5),
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--dim)",
        maxWidth: "80%",
        textAlign: "center",
        position: "relative"
      }
    }, c.trigger));
  } else if (c.stratum === 2) {
    sub = `${c.planet} ${TRIGRAM[c.planet]} · Planetary Council`;
    const half = (hx, lbl, up, lo, tint) => /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        background: tint,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12 * k,
        padding: `${8 * k}px 0`
      }
    }, /*#__PURE__*/React.createElement(HexFigure, {
      upper: up,
      lower: lo,
      w: 52 * k,
      k: k * 0.8
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: fs(7),
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--dim)"
      }
    }, lbl), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: fs(11),
        color: "var(--text)",
        maxWidth: 110 * k,
        lineHeight: 1.2
      }
    }, "Hex ", hx.hex, " \u2014 ", hx.hname), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: fs(7.5),
        color: "var(--gold)",
        marginTop: 2 * k
      }
    }, hx.dn)));
    art = /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        margin: `${8 * k}px ${16 * k}px`,
        borderRadius: 8 * k,
        overflow: "hidden",
        border: "1px solid var(--line)",
        position: "relative"
      }
    }, half(c.yang, "Yang · Pleiadian", c.planet, "Gen", "#2a2438"), half(c.yin, "Yin · Sirian", "Gen", c.planet, "#1c2436"), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        width: 44 * k,
        height: 44 * k,
        borderRadius: "50%",
        background: "var(--panel)",
        border: `1.5px solid ${PLANET_COLOR[c.planet]}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: fs(20),
        color: PLANET_COLOR[c.planet],
        boxShadow: "0 0 16px rgba(0,0,0,.6)"
      }
    }, SIGIL[c.planet]));
  } else if (c.stratum === 3) {
    sub = `${c.element} · ${c.register} · ${c.faces} faces`;
    art = /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4 * k
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.SolidView, {
      solid: c.solid,
      size: 182 * k
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: fs(7.5),
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--dim)",
        textAlign: "center"
      }
    }, c.orient, /*#__PURE__*/React.createElement("br", null), c.book));
  } else if (c.stratum === 4) {
    sub = c.character;
    art = /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.SolidView, {
      solid: c.arch,
      size: 148 * k
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: fs(7.5),
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "var(--copper-light)",
        marginTop: -6 * k
      }
    }, c.archName, " \xB7 yang")), /*#__PURE__*/React.createElement("div", {
      style: {
        width: "62%",
        borderTop: "1px solid var(--line)",
        margin: `${7 * k}px 0`
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        opacity: 0.8
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.SolidView, {
      solid: c.cat,
      size: 96 * k,
      tone: "lapis"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: fs(7),
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "var(--lapis-light)",
        marginTop: -4 * k
      }
    }, c.catName, " \xB7 yin")), c.chiral && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: 2 * k,
        right: 14 * k,
        fontFamily: "var(--font-mono)",
        fontSize: fs(13),
        color: "var(--teal)"
      },
      title: "Chiral \u2014 handedness by lunar illumination"
    }, "\u27F3"));
  } else {
    sub = c.axial ? "Hex 52 · Never drawn · Placed before every reading" : `${c.hname}`;
    art = /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
      }
    }, c.pure && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        width: 168 * k,
        height: 168 * k,
        borderRadius: "50%",
        border: `1px solid ${accent}`,
        opacity: 0.4
      }
    }), c.pure && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        width: 186 * k,
        height: 186 * k,
        borderRadius: "50%",
        border: `1px solid ${accent}`,
        opacity: 0.2
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 16 * k
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: 120 * k,
        fontSize: fs(15),
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: PLANET_COLOR[c.upper]
      }
    }, SIGIL[c.upper]), /*#__PURE__*/React.createElement("span", {
      style: {
        color: PLANET_COLOR[c.lower]
      }
    }, SIGIL[c.lower])), /*#__PURE__*/React.createElement(HexFigure, {
      upper: c.upper,
      lower: c.lower,
      w: 104 * k,
      k: k * 1.35,
      accent: c.crown ? "var(--gold)" : undefined
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: 120 * k,
        fontSize: fs(13),
        textAlign: "center",
        color: "var(--dim)"
      }
    }, /*#__PURE__*/React.createElement("span", null, TRIGRAM[c.upper]), /*#__PURE__*/React.createElement("span", null, TRIGRAM[c.lower]))), (c.pure || c.crown) && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10 * k,
        fontFamily: "var(--font-mono)",
        fontSize: fs(7.5),
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: accent
      }
    }, c.crown ? "✦ The Solar Crown ✦" : "✦ Pure Resonance"));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...frame,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: ripple
  }), /*#__PURE__*/React.createElement("div", {
    style: inner
  }), header, title(c.stratum === 4 ? `Bridge ${c.bn}` : c.stratum === 5 && !c.axial ? `Hex ${c.hex}` : c.name, c.stratum === 4 ? c.archName : c.stratum === 5 && !c.axial ? c.hname : sub), c.stratum === 4 || c.stratum === 5 && !c.axial ? null : null, art, nameBlock);
}
Object.assign(__ds_scope, { hexLines, DECK, DeckCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/oracle/DeckCard.jsx", error: String((e && e.message) || e) }); }

// components/oracle/VerseRow.jsx
try { (() => {
/**
 * VerseRow — a single āyah or mizmār verse: the reference on a pill, the Arabic
 * source (large, right-to-left), and the translation beneath. A jumped-to verse
 * (the one a reading points at) is haloed gold with a gold left rule.
 */
function VerseRow({
  label,
  arabic,
  english,
  highlight = false,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "14px 16px",
      borderBottom: "1px solid var(--line)",
      background: highlight ? "var(--highlight-wash)" : "transparent",
      borderLeft: highlight ? "2px solid var(--gold)" : "2px solid transparent",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "8px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-bold)",
      color: "var(--gold)",
      padding: "2px 8px",
      borderRadius: "var(--radius-pill)",
      border: `1px solid ${highlight ? "var(--gold)" : "var(--line)"}`,
      background: "var(--panel)"
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    className: "aq-arabic",
    style: {
      fontSize: "var(--text-arabic)",
      color: "var(--text)"
    }
  }, arabic), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-base)",
      color: "var(--dim)",
      marginTop: "10px",
      lineHeight: 1.5
    }
  }, english));
}
Object.assign(__ds_scope, { VerseRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/oracle/VerseRow.jsx", error: String((e && e.message) || e) }); }

// deck/doc-page.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).
/* BEGIN USAGE */
/**
 * <doc-page> — paged-document shell for printable HTML.
 *
 * FIRST, decide how the document paginates — up front, before building:
 *
 * - FLOWING document (the default): write the whole document as one
 *   normal HTML flow inside <doc-page>; the browser's print engine
 *   splits it onto pages at export. Use for long-form documents with a
 *   single text flow: reports, memos, letters, essays.
 * - EXPLICIT pagination: a fixed set of pre-paginated pages, one
 *   <section class="page"> child per page. Use when the user asks for a
 *   specific page count, or the design implies one: a one-page resume, a
 *   two-sided flier, a poster, a certificate, a brochure — any richly
 *   laid-out document without a single text flow.
 * - If in doubt, ask the user as part of the build.
 *
 * PAGE SIZING — paper differs by country (letter vs A4), so the printed
 * sheet is not one fixed truth:
 * - FLOWING documents pin NO paper size: the print engine paginates
 *   onto the user's real paper, and the content reflows to it.
 * - EXPLICITLY PAGINATED documents print each page at a FIXED page box
 *   with overflow hidden — letter by default, size="a4" for a clearly
 *   metric user, the user's chosen paper when they export. Design each
 *   page to FILL that box, fitting letter and A4 alike without overlap.
 * - width/height pin an explicit fixed size, ONLY when the user gives
 *   one.
 * Never write your own @page rule or hard-code paper dimensions in the
 * content.
 *
 * Sizing modes (attributes):
 *   (none)                      — portrait: flowing docs use the user's
 *           paper; explicitly paginated pages use the named size box
 *           (letter unless size="a4")
 *   orientation="landscape"     — the same, landscape
 *   width / height              — explicit fixed size, ONLY when the user
 *           gives one (e.g. width="22in" height="30in" for a 22×30
 *           poster): the page IS the design's size, printed at true
 *           dimensions (or scaled onto the user's paper at print time).
 *           Any absolute CSS length: px/in/mm/cm/pt/pc.
 * The component announces the chosen mode to the host app at runtime (a
 * meta tag it injects), so the print path can inject the user's true
 * paper size.
 *
 * On screen the document renders on a desk background: a flowing
 * document as one tall scrolling sheet (Google Docs' pageless view);
 * explicitly paginated documents as one card per page.
 *
 * EXPLICIT pagination usage:
 *   <style>doc-page:not(:defined){visibility:hidden}</style>
 *   <doc-page>
 *     <section class="page" id="p1">…one page's design…</section>
 *     <section class="page" id="p2">…</section>
 *   </doc-page>
 *   <script src="doc-page.js"></script>
 * How the page box works, concretely: each .page prints as ONE full-bleed
 * sheet at a FIXED physical size — letter by default (set size="a4" for
 * a clearly metric user), the user's chosen paper when they export —
 * with overflow hidden. Nothing scrolls and nothing reflows onto a next
 * sheet: content that misses the box is CLIPPED. Design each page to
 * FILL that page box, and to fit it — letter and A4 alike — without
 * overlap. Each page is a size container; don't size anything in
 * viewport units (they track the window, not the page), and never set
 * width or height on the .page section itself (the component sizes the
 * page box; an authored height like 100% is meaningless at print and is
 * overridden). The component owns the page box, the screen card chrome,
 * and the page breaks (never add your own break-before/after). Don't mix
 * .page sections with flowing content or header/footer slots in the same
 * document.
 *
 * FLOWING usage:
 *   <style>doc-page:not(:defined){visibility:hidden}</style>
 *   <doc-page margin="0.75in">
 *     <h1>Title</h1>
 *     <p>…body…</p>
 *   </doc-page>
 *   <script src="doc-page.js"></script>
 * There is no manual page-splitting — the browser's print engine
 * paginates at export. Standard break-hygiene rules (`break-inside:
 * avoid` on figures, code blocks, images and table rows; `orphans/
 * widows: 3`) are applied so paragraphs and groups split cleanly. On
 * screen and at print, headings default to `text-wrap: balance` and
 * body text to `text-wrap: pretty`; the defaults have zero specificity,
 * so any text-wrap you declare wins.
 *
 * Other attributes:
 *   size    — letter | a4 | legal (default letter). Flowing documents:
 *           preview proportion only — it does NOT pin their printed
 *           paper (the print dialog's paper governs); leave it alone
 *           there. Explicitly paginated documents: it sets the page box
 *           the cards and the pinned @page share (the export dialog's
 *           choice overrides both at print) — set size="a4" for a
 *           clearly metric user. Scaled-fit: names the sheet the fit is
 *           computed against, same a4-for-metric-users advice.
 *   content-width / content-height — the design's own fixed dimensions
 *           (CSS lengths), for scaling a fixed-size design ONTO the
 *           named sheet: content lays out at exactly this size, and the
 *           component scales it to fit that sheet's printable area
 *           (centered horizontally, top-aligned; the export dialog
 *           re-fits to the user's actual paper choice where available).
 *           Both must be set; they do not change the page box. For pages
 *           WITHOUT running header/footer slots.
 *   margin  — printable inset on every page of a FLOWING document
 *           (default 0.75in); margin="0" makes pages full-bleed.
 *           Explicitly paginated pages are always full-bleed.
 *
 * Running header/footer (flowing documents only): give an element
 * `slot="header"` or `slot="footer"` and it repeats on every printed
 * page via `position: fixed`. To keep body text from sliding under it,
 * the component prints inside a single-cell table whose <thead>/<tfoot>
 * are spacers sized to the header/footer height — browsers repeat
 * thead/tfoot on every page, so each sheet's content starts below the
 * header and ends above the footer. On screen the header/footer render
 * once at the top/bottom of the sheet.
 *
 * At print the component injects `@page { margin: 0 }` (which leaves
 * Chrome no margin box to draw its date/URL/page-count header in) and
 * moves the visual margin onto the sheet's own padding. It also marks
 * the document as owning its print CSS (a
 * `meta[name="omelette-owns-print"]` it injects at runtime), so the
 * PDF export never injects page-geometry CSS of its own on top.
 *
 * Print best practices for the content you author:
 * - Multi-column text: use CSS columns (`column-count` +
 *   `column-gap`), never side-by-side flex/grid columns — only real
 *   CSS columns flow and break across pages. `column-span: all` lets
 *   a heading span the columns; `hyphens: auto` (needs `lang` on
 *   the html element) keeps narrow columns readable.
 * - Page breaks in flowing documents: `break-before: page` on an
 *   element that must start a new page (a chapter, an appendix). Add
 *   your own kept-together blocks (callouts, stat tiles, cards) to a
 *   `break-inside: avoid` rule, and keep each one shorter than a page.
 * - Extend `orphans: 3; widows: 3` to any custom text blocks you add
 *   (p and li are covered by default).
 * - Give long tables a <thead> — browsers repeat it on every printed
 *   page.
 * - No `position: fixed`/`sticky` and no viewport units in content:
 *   fixed elements stamp every printed page (running headers/footers go
 *   in the component's slots) and `100vh` mis-sizes at print.
 *
 * Author content as static HTML so the user can click-to-edit any text
 * directly. Do not set width/padding/background on the document body —
 * the component owns the sheet box.
 */
/* END USAGE */

(() => {
  const PAPER = {
    letter: ['8.5in', '11in'],
    a4: ['210mm', '297mm'],
    legal: ['8.5in', '14in']
  };
  const CSS_LENGTH = /^\d+(\.\d+)?(px|in|mm|cm|pt|pc)$/;
  // Unitless "0" is a valid CSS length and the natural way to write
  // margin="0"; normalise it to 0px so max()/calc() (which reject a bare
  // number) keep working.
  const safeLen = (v, fb) => {
    v = (v || '').trim();
    return v === '0' ? '0px' : CSS_LENGTH.test(v) ? v : fb;
  };
  // WebKit (Safari and every iOS browser shell) never repeats a table's
  // thead/tfoot on printed pages (WebKit bug 17205), so the spacer-borne
  // vertical margins of a FLOWING document reach only the first page
  // there. Engine check, not browser check: vendor is 'Apple Computer,
  // Inc.' exactly for WebKit and 'Google Inc.' for Blink.
  const WK_PRINT = /apple/i.test(navigator.vendor || '');
  // CSS length → px number (CSS absolute units are exact: 1in = 96px).
  // Returns NaN for anything safeLen would reject — callers gate on it.
  const PX_PER = {
    px: 1,
    in: 96,
    mm: 96 / 25.4,
    cm: 96 / 2.54,
    pt: 96 / 72,
    pc: 16
  };
  const toPx = v => {
    const m = /^(\d+(?:\.\d+)?)(px|in|mm|cm|pt|pc)$/.exec((v || '').trim());
    return m ? parseFloat(m[1]) * PX_PER[m[2]] : NaN;
  };
  const stylesheet = `
    :host {
      position: relative;
      display: block;
      /* When the viewport is narrower than the page, grow to wrap the
       * sheet (plus this padding) instead of staying viewport-width, so
       * the desk background and right margin reach the sheet's far edge
       * in the horizontal scroll. */
      min-width: max-content;
      min-height: 100vh;
      background: #f5f5f4;
      padding: 48px 24px;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
      --doc-page-w: 8.5in;
      --doc-page-h: 11in;
      --doc-page-margin: 0.75in;
      --doc-hdr-h: 0px;
      --doc-ftr-h: 0px;
      --doc-hdr-pad: 0px;
      --doc-ftr-pad: 0px;
    }
    .sheet {
      width: var(--doc-page-w);
      margin: 0 auto;
      background: #fff;
      box-shadow: 0 2px 10px rgba(20, 20, 19, 0.12);
      border-radius: 7px;
      box-sizing: border-box;
      padding: var(--doc-page-margin);
    }
    .frame { width: 100%; border-collapse: collapse; }
    /* Scaled-fit mode (content-width/content-height): the inner .fit box
     * lays the content out at its authored fixed size and scales it onto
     * the printable area; .fit-box reserves the scaled footprint in flow
     * (transforms don't affect layout) and centers it. Without the mode,
     * both divs are unstyled block pass-throughs. */
    /* Explicit pagination: direct .page children are the pages. The sheet
     * becomes a transparent stack and each page carries the card look on
     * screen; at print each page is exactly one full-bleed sheet. The
     * ::slotted defaults are deliberately weak (document CSS wins), so
     * authored page styling can override any of this. */
    .sheet.paginated {
      background: transparent;
      box-shadow: none;
      border-radius: 0;
      padding: 0;
    }
    .paginated ::slotted(.page) {
      position: relative;
      display: block;
      width: 100%;
      aspect-ratio: var(--doc-page-ar);
      container-type: size;
      overflow: hidden;
      box-sizing: border-box;
      background: #fff;
      border-radius: 7px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
      break-inside: avoid;
    }
    .paginated ::slotted(.page:not(:first-child)) { margin-top: 1rem; }
    @media print {
      .sheet.paginated { padding: 0; }
      /* The flowing-document vertical inset lives on the repeating
       * thead/tfoot spacers, not the sheet padding — they must go too,
       * or each full-sheet .page is pushed ~margin down and spills onto
       * a second sheet. Paginated pages are full-bleed by definition
       * (content owns its insets). */
      .sheet.paginated .hdr-space,
      .sheet.paginated .ftr-space { height: 0; }
      .paginated ::slotted(.page) {
        border-radius: 0 !important;
        box-shadow: none !important;
        margin: 0 !important;
        /* Physical page-box sizing, no viewport units: Safari resolves
         * 100vh against the window, not the page box, so a vh-sized card
         * paginates wrong there. --doc-page-w/h are the named size by
         * default and are overridden to the user's chosen paper by the
         * export path, so every card is exactly one sheet either way.
         * Width + height (same source values as @page size) rather than
         * width + aspect-ratio: the ratio is a 6-decimal rounding of the
         * same division, and a few millionths of overflow would spill a
         * blank sheet after every page. The screen-only aspect-ratio
         * (preview proportions) must not leak into print. cqh typography
         * tracks the same box.
         *
         * Every declaration is !important: per CSS Scoping, unimportant
         * shadow ::slotted rules LOSE to the document context, so a page
         * section's authored inline style would silently beat this print
         * geometry. A model-authored height:100% did exactly that — the
         * percentage resolves as auto in the all-auto print ancestry, the
         * base rule's size containment turns auto into ZERO, and
         * overflow:hidden then paints nothing: a blank PDF with perfect
         * page boxes. At print the component's geometry is the design's
         * whole contract, so it must win over any authored sizing. */
        aspect-ratio: auto !important;
        width: var(--doc-page-w) !important;
        height: var(--doc-page-h) !important;
        overflow: hidden !important;
      }
      .paginated ::slotted(.page:not(:first-child)) {
        break-before: page !important;
        margin-top: 0 !important;
      }
    }
    .fit-mode .fit-box {
      width: calc(var(--doc-fit-w) * var(--doc-fit-scale));
      height: calc(var(--doc-fit-h) * var(--doc-fit-scale));
      margin: 0 auto;
      break-inside: avoid;
    }
    .fit-mode .fit {
      width: var(--doc-fit-w);
      height: var(--doc-fit-h);
      transform: scale(var(--doc-fit-scale));
      transform-origin: top left;
    }
    .frame td, .frame th { padding: 0; text-align: left; font-weight: inherit; }
    .hdr-space { height: var(--doc-hdr-h); }
    .ftr-space { height: var(--doc-ftr-h); }
    ::slotted([slot="header"]),
    ::slotted([slot="footer"]) { display: block; box-sizing: border-box; }
    @media print {
      :host { background: none; padding: 0; min-width: 0; min-height: 0; }
      .sheet {
        width: auto; margin: 0; box-shadow: none; border-radius: 0;
        padding: 0 var(--doc-page-margin);
      }
      /* The thead/tfoot spacers repeat on every page, so they carry the
       * vertical page margin (which the sheet's own padding cannot, since
       * that padding is consumed once on the first/last page). The running
       * header/footer are fixed inside that band. */
      /* The 0.35in is breathing room between a running header/footer and
       * the body; without one the spacer is exactly the page margin, so a
       * margin="0" full-bleed document gets truly full-bleed pages. */
      .hdr-space { height: max(var(--doc-page-margin), calc(var(--doc-hdr-h) + var(--doc-hdr-pad))); }
      .ftr-space { height: max(var(--doc-page-margin), calc(var(--doc-ftr-h) + var(--doc-ftr-pad))); }
      /* WebKit flowing documents: @page carries the vertical margin (see
       * _syncPrintPageRule), so the spacers keep only whatever a running
       * header/footer needs BEYOND it — page 1 would otherwise double its
       * top inset. Paginated sheets already zero their spacers above. */
      .sheet.wk-print:not(.paginated) .hdr-space { height: max(0px, calc(max(var(--doc-page-margin), calc(var(--doc-hdr-h) + var(--doc-hdr-pad))) - var(--doc-page-margin))); }
      .sheet.wk-print:not(.paginated) .ftr-space { height: max(0px, calc(max(var(--doc-page-margin), calc(var(--doc-ftr-h) + var(--doc-ftr-pad))) - var(--doc-page-margin))); }
      ::slotted([slot="header"]) {
        position: fixed; top: 0; left: 0; right: 0; margin: 0;
        padding: calc(var(--doc-page-margin) * 0.45) var(--doc-page-margin) 0;
      }
      ::slotted([slot="footer"]) {
        position: fixed; bottom: 0; left: 0; right: 0; margin: 0;
        padding: 0 var(--doc-page-margin) calc(var(--doc-page-margin) * 0.45);
      }
    }
  `;
  class DocPage extends HTMLElement {
    static get observedAttributes() {
      return ['size', 'width', 'height', 'margin', 'orientation', 'content-width', 'content-height'];
    }
    constructor() {
      super();
      this._root = this.attachShadow({
        mode: 'open'
      });
      this._mo = typeof MutationObserver === 'function' ? new MutationObserver(() => this._scheduleMeasure()) : null;
    }

    /** The named paper's [w, h], swapped when orientation="landscape".
     *  Only the named size swaps — explicit width/height are exact values
     *  the author already oriented. */
    _paperSize() {
      const named = PAPER[(this.getAttribute('size') || '').toLowerCase()] || PAPER.letter;
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      return landscape ? [named[1], named[0]] : named;
    }
    get pageWidth() {
      return safeLen(this.getAttribute('width'), this._paperSize()[0]);
    }
    get pageHeight() {
      return safeLen(this.getAttribute('height'), this._paperSize()[1]);
    }
    get pageMargin() {
      return safeLen(this.getAttribute('margin'), '0.75in');
    }

    /** Scaled-fit mode's content box [w, h] as CSS lengths, or null when
     *  the mode is off (either attribute missing/invalid/zero — a partial
     *  declaration falls back to normal flow rather than guessing). */
    _contentFit() {
      const w = safeLen(this.getAttribute('content-width'), null);
      const h = safeLen(this.getAttribute('content-height'), null);
      if (!w || !h) return null;
      const wPx = toPx(w),
        hPx = toPx(h);
      return wPx > 0 && hPx > 0 ? [w, h, wPx, hPx] : null;
    }
    connectedCallback() {
      if (!this._sheet) this._render();
      this._syncSize();
      this._syncPrintPageRule();
      this._ensureTextWrapDefaults();
      this._ensureOwnsPrintMeta();
      this._syncFixedSizeMeta();
      this._syncPrintSizingMeta();
      if (this._mo) this._mo.observe(this, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true
      });
      this._onResize = () => this._scheduleMeasure();
      window.addEventListener('resize', this._onResize);
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => this._scheduleMeasure());
      }
      this._scheduleMeasure();
    }
    disconnectedCallback() {
      window.removeEventListener('resize', this._onResize);
      if (this._mo) this._mo.disconnect();
      if (this._raf) {
        cancelAnimationFrame(this._raf);
        this._raf = null;
      }
      // Drop the head rules when the last doc-page leaves, so a deleted
      // document's @page geometry and text-wrap defaults can't apply to
      // whatever replaces it.
      const survivor = document.querySelector('doc-page');
      if (!survivor) {
        ['doc-page-print', 'doc-page-text-wrap', 'doc-page-owns-print', 'doc-page-fixed-size', 'doc-page-print-sizing'].forEach(id => {
          const tag = document.getElementById(id);
          if (tag) tag.remove();
        });
        // A live deck-stage deferred its own print-sizing meta to ours —
        // hand the page-global meta over so the deck isn't left unmarked.
        const deck = document.querySelector('deck-stage');
        if (deck && typeof deck._ensurePrintSizingMeta === 'function') {
          deck._ensurePrintSizingMeta();
        }
      } else {
        // A departed owner hands each page-global meta to whatever
        // doc-page remains (or it's removed).
        if (typeof survivor._syncFixedSizeMeta === 'function') {
          survivor._syncFixedSizeMeta();
        }
        if (typeof survivor._syncPrintSizingMeta === 'function') {
          survivor._syncPrintSizingMeta();
        }
      }
    }
    attributeChangedCallback() {
      if (!this._sheet) return;
      this._syncSize();
      this._syncPrintPageRule();
      this._syncFixedSizeMeta();
      this._syncPrintSizingMeta();
      this._scheduleMeasure();
    }
    _render() {
      this._root.innerHTML = `
        <style>${stylesheet}</style>
        <style id="vars"></style>
        <div class="sheet" data-screen-label="Document">
          <table class="frame" role="presentation">
            <thead><tr><th><div class="hdr-space"><slot name="header"></slot></div></th></tr></thead>
            <tbody><tr><td class="body"><div class="fit-box"><div class="fit"><slot></slot></div></div></td></tr></tbody>
            <tfoot><tr><td><div class="ftr-space"><slot name="footer"></slot></div></td></tr></tfoot>
          </table>
        </div>`;
      this._sheet = this._root.querySelector('.sheet');
      this._vars = this._root.getElementById('vars');
    }

    /** Runtime sizing lives in a shadow <style> :host rule, never on the
     *  light-DOM host element, so serialize-persist can't write it back. */
    _syncSize(hdrH, ftrH) {
      // Scaled-fit mode: content at its authored size, scaled onto the
      // printable area (page minus margins on both axes). The factor is a
      // plain number var so calc(length * number) stays valid; 4 decimals
      // keeps the shadow style stable across re-measures. Upscaling is
      // allowed — print transforms are vector, so text and CSS stay crisp
      // (raster images soften, which the catalog bullet warns about).
      const fit = this._contentFit();
      let fitVars = '';
      if (fit) {
        const marginPx = toPx(this.pageMargin) || 0;
        const availW = toPx(this.pageWidth) - 2 * marginPx;
        const availH = toPx(this.pageHeight) - 2 * marginPx;
        const scale = Math.min(availW / fit[2], availH / fit[3]);
        if (scale > 0 && Number.isFinite(scale)) {
          fitVars = '--doc-fit-w:' + fit[0] + ';' + '--doc-fit-h:' + fit[1] + ';' + '--doc-fit-scale:' + scale.toFixed(4) + ';';
        }
      }
      this._sheet.classList.toggle('fit-mode', !!fitVars);
      // Numeric w/h ratio for the paginated page cards' aspect-ratio —
      // aspect-ratio takes a number, not a length ratio, so compute it
      // here (CSS length division isn't portable). 6 decimals keeps the
      // shadow style stable across re-syncs.
      const arW = toPx(this.pageWidth);
      const arH = toPx(this.pageHeight);
      const ar = arW > 0 && arH > 0 ? (arW / arH).toFixed(6) : '0.772727';
      this._vars.textContent = ':host{' + fitVars + '--doc-page-ar:' + ar + ';' + '--doc-page-w:' + this.pageWidth + ';' + '--doc-page-h:' + this.pageHeight + ';' + '--doc-page-margin:' + this.pageMargin + ';' + '--doc-hdr-h:' + (hdrH || 0) + 'px;' + '--doc-ftr-h:' + (ftrH || 0) + 'px;' + '--doc-hdr-pad:' + (hdrH ? '0.35in' : '0px') + ';' + '--doc-ftr-pad:' + (ftrH ? '0.35in' : '0px') + '}';
    }

    /** @page is a no-op inside shadow DOM, so the rule lives in <head>.
     *  Re-appended on every sync so it stays last in source order — the
     *  @page cascade is source-order per descriptor, so this rule wins
     *  over any other @page rule in the document.
     *
     *  The @page SIZE is pinned where the page box IS part of the design:
     *  explicit-fixed-size mode (width + height authored), scaled-fit
     *  mode (the named sheet the fit targets), and explicit pagination
     *  (the named size the cards share — so card and sheet agree on
     *  every print path, and the export path's chosen paper overrides
     *  BOTH with one later rule). For FLOWING documents no paper size is
     *  emitted at all — the true size comes from the user's preference,
     *  injected by the export path or chosen in the print dialog — so a
     *  flowing document never fights the paper it lands on.
     *  margin: 0 is emitted in every mode: it leaves Chrome no margin box
     *  to draw its date/URL/page-count header in, and the visual margin
     *  lives on the sheet's own padding. */
    _syncPrintPageRule() {
      const id = 'doc-page-print';
      let tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement('style');
        tag.id = id;
      }
      document.head.appendChild(tag);
      // Three print-geometry regimes:
      // - true-size: the page IS the design — pin its exact size.
      // - scaled-fit (content-width/height): the fit factor is computed
      //   against the NAMED paper's printable area, so that paper must
      //   stay pinned or the scaled content overflows a smaller sheet
      //   (the export path re-fits and re-pins at print time on top).
      // - default modes: no paper size — but landscape still needs the
      //   paper-agnostic 'size: landscape' keyword, because the size
      //   descriptor is what carries orientation; without it a landscape
      //   document prints portrait whenever nothing injects a size.
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      // Explicit pagination pins the page box to the SAME values that
      // size the cards (the named size by default, the export path's
      // chosen paper when its later rule overrides both) — card and
      // sheet agree on every print path, and a mismatched real paper
      // shrinks-to-fit in the dialog instead of clipping a Letter card
      // on A4. Declared before the paginated read below so both derive
      // from one check.
      const paginatedNow = this.querySelector(':scope > .page') !== null;
      const sizeDescriptor = this._trueSizePx() ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : this._contentFit() ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : paginatedNow ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : landscape ? 'size: landscape; ' : '';
      // WebKit never repeats the thead/tfoot spacers that carry a flowing
      // document's vertical page margins (see WK_PRINT above), so pages
      // after the first print edge-to-edge there. Carry the VERTICAL
      // margins on @page for WebKit instead, and the shadow print CSS
      // trims the first-page spacers by the same amount (.sheet.wk-print
      // rules). Horizontal inset stays on the sheet's own padding in
      // every engine. Blink keeps margin: 0 (a nonzero margin there
      // re-opens the box Chrome draws its header furniture in). One cost,
      // learned in testing: Safari's own date/URL headers are a USER
      // dialog setting ("Print headers and footers") that renders in the
      // margin area when room exists — margin: 0 only suppressed it by
      // leaving no room, and no CSS controls it. The export dialog's
      // Safari guide teaches turning the setting off for flowing
      // documents. Explicitly paginated and fixed-size documents keep
      // margin: 0 everywhere: their pages ARE the sheet.
      const wkFlowing = WK_PRINT && !paginatedNow && !this._trueSizePx() && !this._contentFit();
      const marginDescriptor = wkFlowing ? 'margin: ' + this.pageMargin + ' 0; ' : 'margin: 0; ';
      // Shadow-internal marker (never serialized), kept in lockstep with
      // the @page decision above: the print CSS trims the first-page
      // spacers ONLY while @page actually carries the margins — a
      // true-size or scaled-fit sheet keeps margin: 0 and must keep its
      // spacers too. Re-synced here so attribute changes and pagination
      // flips move both together.
      if (this._sheet) this._sheet.classList.toggle('wk-print', wkFlowing);
      tag.textContent = '@page { ' + sizeDescriptor + marginDescriptor + '} ' + '@media print { html, body { margin: 0 !important; padding: 0 !important; background: none !important; height: auto !important; overflow: visible !important; } ' + 'h1,h2,h3,h4,h5,h6 { break-after: avoid; } ' + 'figure,pre,blockquote,img,svg,tr { break-inside: avoid; } ' + 'p,li { orphans: 3; widows: 3; } ' + '* { -webkit-print-color-adjust: exact; print-color-adjust: exact; ' + 'backdrop-filter: none !important; -webkit-backdrop-filter: none !important; } ' + '*, *::before, *::after { animation-delay: -99s !important; animation-duration: .001s !important; ' + 'animation-iteration-count: 1 !important; animation-fill-mode: both !important; ' + 'animation-play-state: running !important; transition-duration: 0s !important; } }';
    }

    /** Typographic defaults for document text: balance headings, avoid
     *  widowed/orphaned words in body copy (browsers without text-wrap
     *  support drop the declarations). Zero-specificity via :where() so
     *  any text-wrap authored on those elements wins; document-level so the
     *  rules reach the slotted (light DOM) content — shadow styles can't.
     *  data-omelette-injected marks the tag for the host editor to strip
     *  at serialize, so it is never written back as authored source. */
    _ensureTextWrapDefaults() {
      if (document.getElementById('doc-page-text-wrap')) return;
      const tag = document.createElement('style');
      tag.id = 'doc-page-text-wrap';
      tag.setAttribute('data-omelette-injected', '');
      tag.textContent = ':where(h1,h2,h3,h4,h5,h6){text-wrap:balance}' + ':where(p,li,blockquote,figcaption){text-wrap:pretty}';
      document.head.appendChild(tag);
    }

    /** Declares that this document owns its print CSS. The instant-PDF
     *  export checks for the meta by NAME PRESENCE alone (content is
     *  ignored) and skips its automatic print-CSS injections, so the
     *  component's @page geometry is never overridden by a heuristic.
     *  data-omelette-injected keeps it out of serialized source. */
    _ensureOwnsPrintMeta() {
      if (document.getElementById('doc-page-owns-print')) return;
      const tag = document.createElement('meta');
      tag.id = 'doc-page-owns-print';
      tag.name = 'omelette-owns-print';
      tag.content = 'true';
      tag.setAttribute('data-omelette-injected', '');
      document.head.appendChild(tag);
    }

    /** This page's valid true-size page box (explicit width AND height)
     *  as [w, h] px ints, or null when the mode is off. */
    _trueSizePx() {
      if (!safeLen(this.getAttribute('width'), null) || !safeLen(this.getAttribute('height'), null)) return null;
      const w = Math.round(toPx(this.pageWidth));
      const h = Math.round(toPx(this.pageHeight));
      return w > 0 && h > 0 ? [w, h] : null;
    }

    /** True-size pages (explicit width AND height) also declare the page
     *  box as the preview size: the in-app preview reads
     *  meta[name="omelette-fixed-size"] (content "W,H" in px ints) and
     *  scales the sheet into view — without it an 18in poster previews at
     *  true size with scrollbars. Never overrides an author-set meta
     *  (only the component's own id is managed). The meta is page-global
     *  while doc-page instances are not, so every sync recomputes the
     *  page-wide owner — the first connected true-size doc-page — and a
     *  non-true-size sibling's sync can never delete the owner's meta.
     *  Removed when no true-size page remains (the owner's disconnect
     *  re-syncs via any survivor) or when an author-set meta exists. */
    _syncFixedSizeMeta() {
      const id = 'doc-page-fixed-size';
      const own = document.getElementById(id);
      const authored = document.querySelector('meta[name="omelette-fixed-size"]:not([data-omelette-injected])');
      // The page-wide owner, not this instance: an upgraded true-size page
      // anywhere in the document keeps the meta alive and sized.
      let box = null;
      for (const el of document.querySelectorAll('doc-page')) {
        box = typeof el._trueSizePx === 'function' ? el._trueSizePx() : null;
        if (box) break;
      }
      if (!box || authored) {
        if (own) own.remove();
        return;
      }
      const tag = own || document.createElement('meta');
      tag.id = id;
      tag.name = 'omelette-fixed-size';
      tag.content = box[0] + ',' + box[1];
      tag.setAttribute('data-omelette-injected', '');
      if (!own) document.head.appendChild(tag);
    }

    /** This page's print-sizing mode: 'fixed' when an explicit width AND
     *  height are authored (the page is the design's own size), else the
     *  default paper in the authored orientation. */
    _printSizingMode() {
      if (this._trueSizePx()) return 'fixed';
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      return landscape ? 'default-landscape' : 'default-portrait';
    }

    /** Announces the print-sizing mode to the host app:
     *  meta[name="omelette-print-sizing"] with content 'default-portrait',
     *  'default-landscape', or 'fixed' (fixed pages also carry the
     *  omelette-fixed-size meta with the page box in px). The export path
     *  probes it to decide what true paper size to inject at print time —
     *  in the default modes the component emits no paper size of its own.
     *  Same page-global ownership rules as the fixed-size meta above:
     *  first connected doc-page owns it, an authored meta is never
     *  overridden, removed when no doc-page remains. */
    _syncPrintSizingMeta() {
      const id = 'doc-page-print-sizing';
      const own = document.getElementById(id);
      const authored = document.querySelector('meta[name="omelette-print-sizing"]:not([data-omelette-injected])');
      // A fixed page wins outright (mirroring the fixed-size loop above,
      // so the two metas can never contradict each other in a mixed
      // multi-page document); otherwise the first page's mode holds.
      let mode = null;
      for (const el of document.querySelectorAll('doc-page')) {
        if (typeof el._printSizingMode !== 'function') continue;
        const m = el._printSizingMode();
        if (m === 'fixed') {
          mode = m;
          break;
        }
        if (mode === null) mode = m;
      }
      if (!mode || authored) {
        if (own) own.remove();
        return;
      }
      // A deck-stage that connected first injected its own meta and
      // defers to any existing one — take it over, or the document ends
      // up with two conflicting injected metas (a doc-page page is the
      // document; the deck re-ensures its meta if every doc-page leaves).
      const deckMeta = document.getElementById('deck-stage-print-sizing');
      if (deckMeta) deckMeta.remove();
      const tag = own || document.createElement('meta');
      tag.id = id;
      tag.name = 'omelette-print-sizing';
      tag.content = mode;
      tag.setAttribute('data-omelette-injected', '');
      if (!own) document.head.appendChild(tag);
    }
    _scheduleMeasure() {
      if (this._raf) return;
      this._raf = requestAnimationFrame(() => {
        this._raf = null;
        this._measure();
      });
    }

    /** Slot heights feed the print spacers (--doc-hdr-h / --doc-ftr-h), so
     *  they re-measure on content mutation, resize, and font load. The
     *  same pass detects explicit pagination (direct .page children) and
     *  toggles the sheet between the flowing-document card and the
     *  page-per-card stack — content edits can add or remove pages at any
     *  time, so this tracks the same mutations the measurement does. */
    _measure() {
      const hdr = this.querySelector(':scope > [slot="header"]');
      const ftr = this.querySelector(':scope > [slot="footer"]');
      const wasPaginated = this._sheet.classList.contains('paginated');
      this._sheet.classList.toggle('paginated', this.querySelector(':scope > .page') !== null);
      // The WebKit @page margin is flowing-only, so a pagination flip
      // must re-emit the rule (content edits can add or remove .page
      // sections at any time).
      if (this._sheet.classList.contains('paginated') !== wasPaginated) {
        this._syncPrintPageRule();
      }
      this._syncSize(hdr ? hdr.offsetHeight : 0, ftr ? ftr.offsetHeight : 0);
    }
  }
  if (!customElements.get('doc-page')) {
    customElements.define('doc-page', DocPage);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "deck/doc-page.js", error: String((e && e.message) || e) }); }

// ui_kits/oracle-app/SacredClock.jsx
try { (() => {
/**
 * SacredClock — a faithful HTML/SVG port of the Oracle app's astrolabe
 * (apps/app/src/screens/SacredClock.tsx). One dial, three concentric temporal
 * layers sharing the same clock angle (noon top, midnight bottom, clockwise):
 *   · sky band       — daylight (gold) and night (lapis)
 *   · planetary hours — 24 unequal hours, current one lit
 *   · salah windows   — the six prayer windows, current one lit
 * A gold needle marks the present; the centre names the hour.
 *
 * Schedule is expressed in fractional local hours (0–24) for a self-contained,
 * ephemeris-free recreation.
 */
const CLK = 180,
  R_TICK = 173,
  R_SKY = 160,
  R_HOUR = 139,
  R_SALAH = 110,
  R_DISC = 90;
const CHALDEAN = ["Saturn", "Jupiter", "Mars", "Sun", "Venus", "Mercury", "Moon"];
const PLANET = {
  Saturn: {
    glyph: "♄",
    color: "var(--planet-saturn)"
  },
  Jupiter: {
    glyph: "♃",
    color: "var(--planet-jupiter)"
  },
  Mars: {
    glyph: "♂",
    color: "var(--planet-mars)"
  },
  Sun: {
    glyph: "☉",
    color: "var(--planet-sun)"
  },
  Venus: {
    glyph: "♀",
    color: "var(--planet-venus)"
  },
  Mercury: {
    glyph: "☿",
    color: "var(--planet-mercury)"
  },
  Moon: {
    glyph: "☾",
    color: "var(--planet-moon)"
  }
};
const SALAH = {
  tahajjud: {
    label: "Tahajjud",
    short: "Tah",
    color: "#2f3c78"
  },
  fajr: {
    label: "Fajr",
    short: "Fajr",
    color: "#b87333"
  },
  duha: {
    label: "Duha",
    short: "Duha",
    color: "#d4af6a"
  },
  dhuhr_asr: {
    label: "Dhuhr–Asr",
    short: "Ẓuhr",
    color: "#caa23f"
  },
  asr_maghrib: {
    label: "Asr–Maghrib",
    short: "Aṣr",
    color: "#c98a3f"
  },
  maghrib_isha: {
    label: "Maghrib–Isha",
    short: "Mag",
    color: "#7a5aa0"
  }
};
function pol(r, deg) {
  const a = deg * Math.PI / 180;
  return [CLK + r * Math.sin(a), CLK - r * Math.cos(a)];
}
function hourDeg(h) {
  return (h - 12) / 24 * 360;
}
function arcPath(r, startDeg, deltaDeg) {
  const [x0, y0] = pol(r, startDeg);
  const [x1, y1] = pol(r, startDeg + deltaDeg);
  const large = Math.abs(deltaDeg) > 180 ? 1 : 0;
  const sweep = deltaDeg >= 0 ? 1 : 0;
  return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${large} ${sweep} ${x1.toFixed(2)} ${y1.toFixed(2)}`;
}

/** Build a plausible day: 24 unequal planetary hours + six salah arcs. */
function buildSchedule(nowH, sunrise, sunset, dayLord) {
  const nightLen = 24 - (sunset - sunrise);
  const dayHour = (sunset - sunrise) / 12;
  const nightHour = nightLen / 12;
  const start = CHALDEAN.indexOf(dayLord);
  const hours = [];
  for (let i = 0; i < 24; i++) {
    const isDay = i < 12;
    const s = isDay ? sunrise + i * dayHour : sunset + (i - 12) * nightHour;
    const e = s + (isDay ? dayHour : nightHour);
    hours.push({
      index: i,
      planet: CHALDEAN[(start + i) % 7],
      start: s % 24,
      end: (e - 0.0001) % 24,
      rawStart: s,
      rawEnd: e,
      isDay
    });
  }
  const cur = hours.findIndex(h => nowH >= h.rawStart % 24 && nowH < h.rawEnd % 24);
  const salahArcs = [{
    window: "tahajjud",
    start: (sunset + nightLen * 0.66) % 24,
    end: sunrise
  }, {
    window: "fajr",
    start: sunrise,
    end: sunrise + 1.4
  }, {
    window: "duha",
    start: sunrise + 1.4,
    end: 11.7
  }, {
    window: "dhuhr_asr",
    start: 11.7,
    end: 15.3
  }, {
    window: "asr_maghrib",
    start: 15.3,
    end: sunset
  }, {
    window: "maghrib_isha",
    start: sunset,
    end: (sunset + nightLen * 0.66) % 24
  }];
  const inArc = a => {
    const s = a.start,
      e = a.end;
    return s < e ? nowH >= s && nowH < e : nowH >= s || nowH < e;
  };
  const curSalah = salahArcs.find(inArc) || salahArcs[3];
  return {
    hours,
    currentHourIndex: cur < 0 ? 0 : cur,
    sunrise,
    sunset,
    salahArcs,
    currentSalahWindow: curSalah.window,
    dayLord,
    salahLine: salahArcs.indexOf(curSalah) + 1
  };
}
function segDelta(s, e) {
  let d = e - s;
  if (d <= 0) d += 24;
  return d / 24 * 360;
}
function SacredClock({
  time
}) {
  const now = time || new Date();
  const nowH = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
  const sched = React.useMemo(() => buildSchedule(nowH, 6.2, 18.78, "Sun"), [Math.floor(nowH * 60)]);
  const nowDeg = hourDeg(nowH);
  const cur = sched.hours[sched.currentHourIndex];
  const curPlanet = PLANET[cur.planet];
  const curSalah = SALAH[sched.currentSalahWindow];
  const clock = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit"
  });
  const [handX, handY] = pol(R_HOUR + 8, nowDeg);
  const [srX, srY] = pol(R_SKY, hourDeg(sched.sunrise));
  const [ssX, ssY] = pol(R_SKY, hourDeg(sched.sunset));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 360,
      aspectRatio: "1",
      alignSelf: "center",
      margin: "0 auto",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 360 360",
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: "core",
    cx: "50%",
    cy: "50%",
    r: "50%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#161428"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#0b0b12"
  }))), [R_TICK, R_SKY, R_HOUR, R_SALAH, R_DISC].map(r => /*#__PURE__*/React.createElement("circle", {
    key: r,
    cx: CLK,
    cy: CLK,
    r: r,
    fill: "none",
    stroke: "var(--line)",
    strokeWidth: 0.5,
    opacity: 0.5
  })), /*#__PURE__*/React.createElement("path", {
    d: arcPath(R_SKY, hourDeg(sched.sunrise), segDelta(sched.sunrise, sched.sunset)),
    stroke: "var(--gold)",
    strokeWidth: 7,
    fill: "none",
    opacity: 0.28,
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: arcPath(R_SKY, hourDeg(sched.sunset), segDelta(sched.sunset, sched.sunrise)),
    stroke: "var(--lapis)",
    strokeWidth: 7,
    fill: "none",
    opacity: 0.5,
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: srX,
    cy: srY,
    r: 3,
    fill: "var(--gold)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: ssX,
    cy: ssY,
    r: 3,
    fill: "var(--lapis-light)"
  }), Array.from({
    length: 24
  }, (_, h) => {
    const d = hourDeg(h);
    const [x0, y0] = pol(R_TICK, d);
    const [x1, y1] = pol(R_TICK - (h % 6 === 0 ? 9 : 5), d);
    return /*#__PURE__*/React.createElement("line", {
      key: h,
      x1: x0,
      y1: y0,
      x2: x1,
      y2: y1,
      stroke: "var(--dim)",
      strokeWidth: h % 6 === 0 ? 1.2 : 0.6,
      opacity: 0.6
    });
  }), [["0", 180], ["6", 270], ["12", 0], ["18", 90]].map(([lbl, d]) => {
    const [x, y] = pol(R_TICK - 20, d);
    return /*#__PURE__*/React.createElement("text", {
      key: lbl,
      x: x,
      y: y + 4,
      fill: "var(--dim)",
      fontSize: 10,
      textAnchor: "middle"
    }, lbl);
  }), sched.hours.map(h => {
    const start = hourDeg(h.rawStart % 24);
    const delta = segDelta(h.rawStart % 24, h.rawEnd % 24);
    const isCur = h.index === sched.currentHourIndex;
    const p = PLANET[h.planet];
    const [gx, gy] = pol(R_HOUR, start + delta / 2);
    return /*#__PURE__*/React.createElement("g", {
      key: h.index
    }, /*#__PURE__*/React.createElement("path", {
      d: arcPath(R_HOUR, start + 0.6, delta - 1.2),
      stroke: p.color,
      strokeWidth: isCur ? 22 : 15,
      fill: "none",
      opacity: isCur ? 0.95 : h.isDay ? 0.34 : 0.22
    }), /*#__PURE__*/React.createElement("text", {
      x: gx,
      y: gy + (isCur ? 5 : 4),
      fill: isCur ? "#0b0b12" : p.color,
      fontSize: isCur ? 15 : 10,
      fontWeight: isCur ? 700 : 400,
      textAnchor: "middle",
      opacity: isCur ? 1 : 0.85
    }, p.glyph));
  }), sched.salahArcs.map(a => {
    const start = hourDeg(a.start);
    const delta = segDelta(a.start, a.end);
    const s = SALAH[a.window];
    const isCur = a.window === sched.currentSalahWindow;
    const [lx, ly] = pol(R_SALAH, start + delta / 2);
    return /*#__PURE__*/React.createElement("g", {
      key: a.window
    }, /*#__PURE__*/React.createElement("path", {
      d: arcPath(R_SALAH, start + 0.8, delta - 1.6),
      stroke: s.color,
      strokeWidth: isCur ? 18 : 12,
      fill: "none",
      opacity: isCur ? 0.95 : 0.32
    }), /*#__PURE__*/React.createElement("text", {
      x: lx,
      y: ly + 3,
      fill: isCur ? "#0b0b12" : s.color,
      fontSize: 8,
      fontWeight: isCur ? 700 : 400,
      textAnchor: "middle",
      opacity: isCur ? 1 : 0.9
    }, s.short));
  }), /*#__PURE__*/React.createElement("circle", {
    cx: CLK,
    cy: CLK,
    r: R_DISC,
    fill: "url(#core)",
    stroke: "var(--copper)",
    strokeWidth: 1,
    opacity: 0.95
  }), /*#__PURE__*/React.createElement("line", {
    x1: CLK,
    y1: CLK,
    x2: handX,
    y2: handY,
    stroke: "var(--gold)",
    strokeWidth: 2,
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: handX,
    cy: handY,
    r: 4,
    fill: "var(--gold)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: CLK,
    cy: CLK,
    r: 4,
    fill: "var(--copper)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--text)",
      fontSize: 40,
      fontWeight: 200,
      letterSpacing: 2,
      fontFamily: "var(--font-mono)",
      fontVariantNumeric: "tabular-nums"
    }
  }, clock), /*#__PURE__*/React.createElement("div", {
    style: {
      color: curPlanet.color,
      fontSize: 15,
      fontWeight: 600,
      marginTop: 2
    }
  }, curPlanet.glyph, " ", cur.planet, " \xB7 hour ", cur.index % 12 + 1), /*#__PURE__*/React.createElement("div", {
    style: {
      color: curSalah.color,
      fontSize: 12,
      marginTop: 4
    }
  }, curSalah.label, " \xB7 Line ", sched.salahLine), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--dim)",
      fontSize: 11,
      marginTop: 6
    }
  }, "day of ", PLANET[sched.dayLord].glyph, " ", sched.dayLord)));
}
window.SacredClock = SacredClock;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/oracle-app/SacredClock.jsx", error: String((e && e.message) || e) }); }

// ui_kits/oracle-app/screens.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Oracle app screens — compose the design-system primitives into the five
   product surfaces. Demo data stands in for the deterministic engine. */
const NS = window.AmraqiyyahOracleDesignSystem_484c79;
const {
  Button,
  TabBar,
  SegmentedControl,
  VeilSelector,
  Field,
  Panel,
  LayerCard,
  Medallion,
  DivineName,
  MonoLine,
  Meter,
  Hexagram,
  OracleCard,
  VerseRow,
  DeckCard
} = NS;
const eyebrow = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--dim)",
  margin: "20px 0 6px"
};

// ───────────────────────────── Now ─────────────────────────────
const LAYERS = [{
  title: "Planetary Hour",
  main: "Sun — hour 3 (day)",
  name: "Al-Malik"
}, {
  title: "Salah Window",
  main: "Duha → Line 3",
  sub: "Hizb: 1",
  name: "Al-Fattah"
}, {
  title: "The Week",
  main: "al-Ahad (Sun)",
  sub: "Standing line 1",
  name: "Al-Jami'"
}, {
  title: "Lunar Mansion",
  main: "9 — Al-Haq'a (Mercury)",
  sub: "Letter Ṭ · abjad 9 · standing line 3",
  name: "Al-Alim"
}, {
  title: "Lunar Month",
  main: "17 Ramaḍān 1447",
  sub: "✦ Sacred month — Line 6 resonance",
  name: "At-Tawwab"
}, {
  title: "Solar Season",
  main: "Spring — day 40 → Line 3",
  name: "Al-Musawwir"
}, {
  title: "Harmonic Cycle",
  main: "Cycle 61, year 20 of 33",
  sub: "Next boundary ~2031 CE",
  name: "Al-Muhsi"
}, {
  title: "Great Year",
  main: "Age IV — 90.7% complete",
  sub: "Vernal 92.79° AGOSS · exits ~2225 · Return ~8667",
  name: "Al-Baqi"
}];
function NowScreen() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 16,
      fontWeight: 600,
      color: "var(--text)",
      marginBottom: 8
    }
  }, "al-Ahad \xB7 17 Rama\u1E0D\u0101n 1447 \xB7 Mansion 9 \xB7 Age IV"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      color: "var(--text)",
      fontSize: 14,
      fontWeight: 600
    }
  }, "\uD83D\uDCCD Chicago, United States"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "Use my location")), /*#__PURE__*/React.createElement(window.SacredClock, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 12,
      marginTop: 20,
      justifyItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Meter, {
    label: "THE WEEK",
    fraction: 1 / 7,
    center: "Ahad",
    sub: "Sun",
    color: "var(--lapis-light)",
    size: 92
  }), /*#__PURE__*/React.createElement(Meter, {
    label: "MANSION",
    fraction: 9 / 28,
    center: "9/28",
    sub: "Al-Haq'a",
    color: "var(--copper-light)",
    size: 92
  }), /*#__PURE__*/React.createElement(Meter, {
    label: "LUNAR MONTH",
    fraction: 16 / 29.53,
    center: "day 17",
    sub: "Rama\u1E0D\u0101n",
    color: "var(--lapis-light)",
    size: 92
  }), /*#__PURE__*/React.createElement(Meter, {
    label: "SEASON",
    fraction: 40 / 91,
    center: "40/91",
    sub: "Spring",
    color: "var(--gold)",
    size: 92
  }), /*#__PURE__*/React.createElement(Meter, {
    label: "HARMONIC",
    fraction: 20 / 33,
    center: "20/33",
    sub: "cycle 61",
    color: "var(--teal)",
    size: 92
  }), /*#__PURE__*/React.createElement(Meter, {
    label: "GREAT YEAR",
    fraction: 0.907,
    center: "91%",
    sub: "Age IV",
    color: "var(--copper)",
    size: 92
  })), /*#__PURE__*/React.createElement("div", {
    style: eyebrow
  }, "All nine layers \u2014 in full"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10
    }
  }, LAYERS.map(l => /*#__PURE__*/React.createElement(LayerCard, _extends({
    key: l.title
  }, l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "Oracle inputs (Mode A)"
  }, /*#__PURE__*/React.createElement(MonoLine, null, "upper (sky): Fire \u2014 mansion ruler"), /*#__PURE__*/React.createElement(MonoLine, null, "lower (ground): Earth \u2014 hour ruler"), /*#__PURE__*/React.createElement(MonoLine, null, "Check 1 line 4 \xB7 Check 2 ACTIVE line 3 \xB7 Check 3 line 6"), /*#__PURE__*/React.createElement(MonoLine, null, "Stellar Court: none"))));
}

// ─────────────────────────── Reading ───────────────────────────
const VEIL_LABELS = {
  1: "This hour's decision — Al-Qadir",
  2: "Today's conduct — Ar-Razzaq",
  3: "The week's work — Al-Jami'",
  4: "The current station — Al-Hadi",
  5: "The month's project — At-Tawwab",
  6: "The season's strategy — Al-Musawwir",
  7: "The year's direction — Al-Malik",
  8: "The life-stage — Al-Wahhab",
  9: "The civilizational question — Al-Baqi"
};
function ReadingScreen({
  onOpenText
}) {
  const [mode, setMode] = React.useState("A");
  const [veil, setVeil] = React.useState(5);
  const [q, setQ] = React.useState("");
  const [name, setName] = React.useState("");
  const [result, setResult] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Panel, {
    title: "Mode",
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(SegmentedControl, {
    style: {
      marginBottom: 12
    },
    value: mode,
    onChange: setMode,
    options: [{
      value: "A",
      label: "A — Astronomical"
    }, {
      value: "B",
      label: "B — Deck"
    }, {
      value: "C",
      label: "C — Resonance"
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 20,
      color: "var(--text)",
      margin: "6px 0"
    }
  }, "Veil (question depth)"), /*#__PURE__*/React.createElement(VeilSelector, {
    value: veil,
    onChange: setVeil
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--dim)",
      fontSize: 12,
      marginTop: 6
    }
  }, VEIL_LABELS[veil]), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Field, {
    value: q,
    onChange: setQ,
    placeholder: "The question (optional)"
  }), /*#__PURE__*/React.createElement(Field, {
    value: name,
    onChange: setName,
    placeholder: "Querent name in Arabic \u2014 natal mansion (optional)"
  })), /*#__PURE__*/React.createElement(Button, {
    full: true,
    style: {
      marginTop: 12
    },
    onClick: () => setResult(true)
  }, mode === "A" ? "Read the sky" : mode === "B" ? "Draw and read" : "Draw and compare")), result && /*#__PURE__*/React.createElement(ReadingResult, null));
}
function ReadingResult() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(DeckCard, {
    card: 29,
    width: 108,
    backSrc: "../../assets/hedronite-glyph-copper.png"
  }), /*#__PURE__*/React.createElement(DeckCard, {
    card: 11,
    width: 108,
    backSrc: "../../assets/hedronite-glyph-copper.png"
  }), /*#__PURE__*/React.createElement(DeckCard, {
    card: 6,
    width: 108,
    orientation: "sideways",
    style: {
      margin: "0 38px"
    },
    backSrc: "../../assets/hedronite-glyph-copper.png"
  }), /*#__PURE__*/React.createElement(DeckCard, {
    card: 17,
    width: 108,
    backSrc: "../../assets/hedronite-glyph-copper.png"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      color: "var(--dim)",
      fontSize: 10,
      fontFamily: "var(--font-mono)",
      letterSpacing: "0.1em",
      textTransform: "uppercase"
    }
  }, "Axial Witness \xB7 The Spark (Key) \xB7 The Striker (Agent, sideways) \xB7 Bridge 2"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Hexagram, {
    style: {
      flex: 1
    },
    title: "The situation",
    number: 55,
    name: "Abundance",
    lines: [true, true, false, true, false, false],
    moving: [3, 4],
    upper: "Thunder",
    lower: "Fire",
    suit: "Fire",
    divineName: "Al-Muhyi"
  }), /*#__PURE__*/React.createElement(Hexagram, {
    style: {
      flex: 1
    },
    title: "The trajectory (zanshin)",
    number: 24,
    name: "Return",
    lines: [true, false, false, false, false, false],
    upper: "Earth",
    lower: "Thunder",
    suit: "Earth",
    divineName: "Al-Ba\u02BFith"
  })), /*#__PURE__*/React.createElement(Panel, {
    title: "Resonance: SEVENFOLD SEAL"
  }, /*#__PURE__*/React.createElement(MonoLine, null, "Check 1 (lunar day): Line 4"), /*#__PURE__*/React.createElement(MonoLine, null, "Check 2 (Sevenfold Weave): Line 3"), /*#__PURE__*/React.createElement(MonoLine, null, "Check 3 (season day): Line 6"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--dim)",
      fontSize: 11,
      marginTop: 4
    }
  }, "Dominant check for Veil 5: Check 1")), /*#__PURE__*/React.createElement(Panel, {
    title: "The six coordinates"
  }, /*#__PURE__*/React.createElement(MonoLine, null, "1 \xB7 Hexagram: 55 Abundance \u2192 24 Return"), /*#__PURE__*/React.createElement(MonoLine, null, "2 \xB7 Divine Names: Al-Muhyi \xB7 An-Nur \xB7 Al-Fattah"), /*#__PURE__*/React.createElement(MonoLine, {
    link: true
  }, "3 \xB7 Quranic: Juz 17, Hizb 33 \u2014 read \u203A"), /*#__PURE__*/React.createElement(MonoLine, {
    link: true
  }, "4 \xB7 Zabur: Psalm 81:3 (royal: 81) \u2014 read \u203A"), /*#__PURE__*/React.createElement(MonoLine, null, "5 \xB7 Abjad: mansion letter \u1E6C (9) \u2192 standing line 3"), /*#__PURE__*/React.createElement(MonoLine, null, "6 \xB7 Temporal: 17 Rama\u1E0D\u0101n 1447 \xB7 Mansion 9")), /*#__PURE__*/React.createElement(Panel, {
    title: "Active Names \u2014 dhikr before interpretation"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(DivineName, {
    name: "Al-Muhyi",
    arabic: "\u0627\u0644\u0645\u062D\u064A\u064A",
    meaning: "The Giver of Life",
    role: "hexagram",
    count: 68
  }), /*#__PURE__*/React.createElement(DivineName, {
    name: "An-Nur",
    arabic: "\u0627\u0644\u0646\u0648\u0631",
    meaning: "The Light",
    role: "key",
    count: 256
  }), /*#__PURE__*/React.createElement(DivineName, {
    name: "Al-Fattah",
    arabic: "\u0627\u0644\u0641\u062A\u0651\u0627\u062D",
    meaning: "The Opener",
    role: "suit",
    count: 489
  }))), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    full: true
  }, "Save to journal"));
}

// ──────────────────────────── Texts ────────────────────────────
const SURAHS = [{
  n: 1,
  en: "The Opening",
  tr: "Al-Fātiḥa",
  ar: "الفاتحة",
  ayahs: 7
}, {
  n: 2,
  en: "The Cow",
  tr: "Al-Baqara",
  ar: "البقرة",
  ayahs: 286
}, {
  n: 17,
  en: "The Night Journey",
  tr: "Al-Isrāʾ",
  ar: "الإسراء",
  ayahs: 111
}, {
  n: 55,
  en: "The Most Merciful",
  tr: "Ar-Raḥmān",
  ar: "الرحمٰن",
  ayahs: 78
}, {
  n: 81,
  en: "The Overthrowing",
  tr: "At-Takwīr",
  ar: "التكوير",
  ayahs: 29
}, {
  n: 112,
  en: "Sincerity",
  tr: "Al-Ikhlāṣ",
  ar: "الإخلاص",
  ayahs: 4
}];
const PSALM81 = [{
  v: 1,
  ar: "رَنِّمُوا لِلهِ قُوَّتِنَا. اهْتِفُوا لإِلٰهِ يَعْقُوبَ.",
  en: "Sing aloud unto God our strength: make a joyful noise unto the God of Jacob."
}, {
  v: 2,
  ar: "ارْفَعُوا نَغَمَةً وَهَاتُوا دُفًّا، عُودًا حُلْوًا مَعَ رَبَابٍ.",
  en: "Take a psalm, and bring hither the timbrel, the pleasant harp with the psaltery."
}, {
  v: 3,
  ar: "انْفُخُوا فِي رَأْسِ الشَّهْرِ بِالبُوقِ، عِنْدَ الهِلَالِ لِيَوْمِ عِيدِنَا.",
  en: "Blow up the trumpet in the new moon, in the time appointed, on our solemn feast day."
}, {
  v: 4,
  ar: "لأَنَّ هٰذَا فَرِيضَةٌ لإِسْرَائِيلَ، حُكْمٌ لإِلٰهِ يَعْقُوبَ.",
  en: "For this was a statute for Israel, and a law of the God of Jacob."
}];
function TextsScreen() {
  const [book, setBook] = React.useState("quran");
  const [reading, setReading] = React.useState(null); // psalm object when open
  if (reading) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
      variant: "sunken",
      size: "sm",
      onClick: () => setReading(null)
    }, "\u2039 Texts"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 20,
        color: "var(--gold)",
        marginTop: 8
      }
    }, "Mizm\u0101r 81 \xB7 Psalm 81"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: "var(--dim)",
        fontSize: 12,
        marginBottom: 8
      }
    }, "Van Dyck (Arabic) \xB7 King James (English)"), /*#__PURE__*/React.createElement("div", {
      style: {
        border: "1px solid var(--line)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden"
      }
    }, PSALM81.map(v => /*#__PURE__*/React.createElement(VerseRow, {
      key: v.v,
      label: `81:${v.v}`,
      arabic: v.ar,
      english: v.en,
      highlight: v.v === 3
    }))));
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SegmentedControl, {
    style: {
      marginBottom: 12
    },
    value: book,
    onChange: setBook,
    options: [{
      value: "quran",
      label: "Qur'ān"
    }, {
      value: "zabur",
      label: "Zabūr · Psalms"
    }]
  }), book === "quran" ? /*#__PURE__*/React.createElement("div", null, SURAHS.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.n,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 4px",
      borderBottom: "1px solid var(--line)"
    }
  }, /*#__PURE__*/React.createElement(Medallion, null, s.n), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--text)",
      fontSize: 15,
      fontWeight: 600
    }
  }, s.en, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--dim)",
      fontWeight: 400,
      fontSize: 13
    }
  }, "\xB7 ", s.tr)), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--dim)",
      fontSize: 12,
      marginTop: 2
    }
  }, s.ayahs, " \u0101y\u0101t")), /*#__PURE__*/React.createElement("div", {
    className: "aq-arabic",
    style: {
      fontSize: 22,
      color: "var(--lapis-light)"
    }
  }, s.ar)))) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--dim)",
      fontSize: 12,
      padding: "4px 0 10px"
    }
  }, "The 150 mizm\u0101r \u2014 Van Dyck Arabic with the King James rendering."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(6,1fr)",
      gap: 8
    }
  }, Array.from({
    length: 36
  }, (_, i) => i + 1).map(n => /*#__PURE__*/React.createElement("button", {
    key: n,
    onClick: () => n === 81 && setReading(true),
    style: {
      aspectRatio: "1",
      borderRadius: "var(--radius-md)",
      background: n === 81 ? "var(--panel-soft)" : "var(--panel)",
      border: `1px solid ${n === 81 ? "var(--copper)" : "var(--line)"}`,
      color: "var(--text)",
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "var(--font-mono)",
      fontSize: 13
    }
  }, n))), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--dim)",
      fontSize: 11,
      marginTop: 10
    }
  }, "Psalm 81 is a reading destination \u2014 tap it.")));
}

// ──────────────────────────── Natal ────────────────────────────
const PLACEMENTS = [["☉", "Sun", "H4 Cancer", "9 Al-Haq'a", "92.3°"], ["☾", "Moon", "H11 Aquarius", "22 Sa'd", "301.1°"], ["☿", "Mercury", "H4 Cancer", "8 Al-Han'a", "88.7°"], ["♀", "Venus", "H3 Gemini", "6 Al-Hak'a", "74.0°"], ["♂", "Mars", "H7 Libra", "15 Ghafr", "196.5°"], ["♃", "Jupiter", "H1 Aries", "1 Ash-Sharatan", "8.2°"], ["♄", "Saturn", "H10 Capricorn", "26 Fargh", "278.9°"]];
function NatalScreen() {
  const [cast, setCast] = React.useState(false);
  const [y, setY] = React.useState("1990"),
    [mo, setMo] = React.useState("6"),
    [d, setD] = React.useState("15"),
    [h, setH] = React.useState("14"),
    [mi, setMi] = React.useState("30");
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Panel, {
    title: "Birth moment"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--dim)",
      fontSize: 12,
      margin: "4px 0"
    }
  }, "Date & time (local to birthplace)"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    value: y,
    onChange: setY,
    width: "64px",
    align: "center"
  }), /*#__PURE__*/React.createElement(Field, {
    value: mo,
    onChange: setMo,
    width: "44px",
    align: "center"
  }), /*#__PURE__*/React.createElement(Field, {
    value: d,
    onChange: setD,
    width: "44px",
    align: "center"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--dim)"
    }
  }, "\xB7"), /*#__PURE__*/React.createElement(Field, {
    value: h,
    onChange: setH,
    width: "44px",
    align: "center"
  }), /*#__PURE__*/React.createElement(Field, {
    value: mi,
    onChange: setMi,
    width: "44px",
    align: "center"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--dim)",
      fontSize: 12,
      margin: "10px 0 4px"
    }
  }, "Birthplace"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      color: "var(--text)",
      fontSize: 14,
      fontWeight: 600
    }
  }, "\uD83D\uDCCD Cairo, Egypt"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "Use my location")), /*#__PURE__*/React.createElement(Field, {
    style: {
      marginTop: 8
    },
    placeholder: "Name in Arabic \u2014 for the identity mansion (optional)"
  }), /*#__PURE__*/React.createElement(Button, {
    full: true,
    style: {
      marginTop: 12
    },
    onClick: () => setCast(true)
  }, "Cast the natal chart")), cast && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "Natal Hexagram",
    accent: "copper"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--gold)",
      fontSize: 20,
      fontWeight: 700,
      fontFamily: "var(--font-display)"
    }
  }, "19 \u2014 Approach"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--dim)",
      marginTop: 4
    }
  }, "Earth over Lake \xB7 Water suit \xB7 Al-Latif")), /*#__PURE__*/React.createElement(Panel, {
    title: "The Seven \u2014 placements in AGOSS"
  }, PLACEMENTS.map(p => /*#__PURE__*/React.createElement("div", {
    key: p[1],
    style: {
      display: "flex",
      alignItems: "center",
      padding: "5px 0",
      borderBottom: "1px solid var(--line)",
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gold)",
      fontSize: 16,
      width: 22
    }
  }, p[0]), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text)",
      width: 66
    }
  }, p[1]), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--lapis-light)",
      width: 96
    }
  }, p[2]), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text)",
      flex: 1
    }
  }, p[3]), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--dim)"
    }
  }, p[4]))))));
}

// ─────────────────────────── Journal ───────────────────────────
const ENTRIES = [{
  at: "20 Jul 2026, 09:14",
  mode: "A",
  veil: 5,
  hex: "Hex 55 → 24",
  res: "sevenfold_seal",
  juz: 17,
  psalm: 81,
  names: "Al-Muhyi, An-Nur, Al-Fattah"
}, {
  at: "13 Jul 2026, 21:02",
  mode: "B",
  veil: 3,
  hex: "Hex 3 → 51",
  res: "base",
  juz: 4,
  psalm: 40,
  names: "Al-Qabid, Al-Hadi"
}, {
  at: "02 Jul 2026, 05:41",
  mode: "A",
  veil: 7,
  hex: "Hold and witness",
  res: "hold",
  juz: 30,
  psalm: 92,
  names: "As-Samad"
}];
function JournalScreen() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 20,
      color: "var(--text)"
    }
  }, "Reading record"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--dim)",
      fontSize: 11,
      marginBottom: 4
    }
  }, "The accumulated record feeds the first Sirian Cycle review (~2076 CE)."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      marginTop: 8
    }
  }, ENTRIES.map((e, i) => /*#__PURE__*/React.createElement(Panel, {
    key: i
  }, /*#__PURE__*/React.createElement(MonoLine, null, e.at, " \xB7 Mode ", e.mode, " \xB7 Veil ", e.veil), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--text)",
      marginTop: 4
    }
  }, e.hex, " \xB7 ", e.res.replace("_", " ")), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--dim)",
      fontSize: 11,
      marginTop: 4
    }
  }, "Juz ", e.juz, " \xB7 Psalm ", e.psalm, " \xB7 ", e.names)))));
}
Object.assign(window, {
  NowScreen,
  ReadingScreen,
  TextsScreen,
  NatalScreen,
  JournalScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/oracle-app/screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.TabBar = __ds_scope.TabBar;

__ds_ns.VeilSelector = __ds_scope.VeilSelector;

__ds_ns.DivineName = __ds_scope.DivineName;

__ds_ns.LayerCard = __ds_scope.LayerCard;

__ds_ns.Medallion = __ds_scope.Medallion;

__ds_ns.MonoLine = __ds_scope.MonoLine;

__ds_ns.Panel = __ds_scope.Panel;

__ds_ns.DECK = __ds_scope.DECK;

__ds_ns.DeckCard = __ds_scope.DeckCard;

__ds_ns.Hexagram = __ds_scope.Hexagram;

__ds_ns.Meter = __ds_scope.Meter;

__ds_ns.OracleCard = __ds_scope.OracleCard;

__ds_ns.SolidView = __ds_scope.SolidView;

__ds_ns.VerseRow = __ds_scope.VerseRow;

})();
