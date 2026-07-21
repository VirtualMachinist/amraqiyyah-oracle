# DeckCard
Full card art for the 78-card Amraqiyyah Oracle deck — the ratified registry is built in (`DECK` export). Five strata: Stellar Court (1–3, hieroglyph sigils), Planetary Council (4–10, split yang/yin threshold hexagrams), Platonic Keys (11–15, glass Platonic solids), Archimedean Bridges (16–28, Archimedean over Catalan dual, chiral ⟳ on 22/28), Hexagram Field (29–78, hexagram figures; Pure Resonance rings; the Solar Crown on 54). `card="back"` renders the uniform back.

```jsx
<DeckCard card={11}/>                          {/* The Spark — tetrahedron */}
<DeckCard card={6} orientation="sideways"/>    {/* Agent placement */}
<DeckCard card={17} width={220}/>              {/* Bridge 2 */}
<DeckCard card="back" width={160}/>
```

`DECK` (also exported) is the full 78-card data registry: name, stratum, mansion/letter/abjad/ruler, Divine Name (+ Arabic), hexagram/solid assignments. `hexLines(upper, lower)` derives a hexagram's six lines from its planet pair.
