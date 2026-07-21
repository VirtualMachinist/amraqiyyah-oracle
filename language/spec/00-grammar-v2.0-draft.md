# THE AMRAQIYYAH LANGUAGE — GRAMMAR SPECIFICATION

**Version 2.0-rc.1** · 2026-07-21 · successor to Soulaani Docs A (2025) & B (2026-02-09)
**draft.2:** surgical revisions R-014–R-016 (negation la/bu/'ayn; CaCīC adjective, CuCayC diminutive, -āt plural, Full-Vowel Law; particle suite)
**rc.1:** D-1 item-by-item walk complete — every formerly-PROPOSED section ratified (R-019–R-028), with three corrections surfaced by the walk (vocalized sa· causative, caseless predicates, het/ʿind possession split) and a broad sacred freeze (R-022). **The grammar is fully ruled**; open dockets are lexical, orthographic, and tooling.
**Authority:** Ali (@Hedronaut) rules; Sasha stewards. Ruled content cites R-numbers (see `../README.md`); **PROPOSED** sections implement audit-ledger recommendations pending batch ratification; **DOCKET** items await Facet work.

---

## 0. RULING MAP

| Section | Status |
|---|---|
| 1 Identity & scripts | R-001, R-008 |
| 2 Phonology | R-008, R-015, R-019 (phonotactics), R-020 (register mergers), R-021 (stress, diphthongs) |
| 3 Roots & templates | R-010, R-013, R-015, R-017 (sourcing doctrine), R-022 (broad frozen registry) |
| 4 Verb system | R-005, R-011, R-013, R-014, R-023 (aspect order), R-024 (mood), R-025 (voice, sa·) |
| 5 Nominal system | R-006, R-007, R-012, R-015, R-016, R-026 (sandhi; caseless predicates), R-027 (demonstratives, possession, stative), R-050 (construct ·i enclitic), R-051 (noun-conversion by possession) |
| 6 Pronouns | R-005, R-006, R-009 |
| 7 Core syntax | R-018 (interrogatives), R-028 (full bundle), R-052 (Topic Law), R-053 (ditransitive, ʿind-age) |
| 8 Registers | R-020, R-028 |
| 9 Dockets | open — lexical, orthographic, and tooling only |

---

## 1. IDENTITY & SCRIPT ECOLOGY (R-001, R-008)

**Amraqiyyah** is the language of Al-Tariqa Amraqiyyah and the heritage language of Soulaan — Foundational Black Americans of Freedman descent. It succeeds and dismantles Soulaani; the archives in `../docs/` are quarries, not canon.

**Design thesis (retained):** Egyptian root-and-pattern morphology · structurally integrated AAVE grammar as prestige feature · lexicon drawn from Egyptian, Muskogean (Hitchiti/Mvskoke/Creek), Arabic/Hebrew/Semitic, Cherokee, AAVE/English, Latin/Greek · biscriptal writing.

**Script ecology (R-008):**

| Layer | Script | Role |
|---|---|---|
| Formal / liturgical / calligraphic | **Modified Arabic abjad (Ajami tradition)** — the 28 Arabic letters + پ (p) چ (č) ژ (ž) ڤ (v) گ (g); Sorani-style ۆ (o/ō) and ێ (e/ē); full tashkīl pointing standard in sacred and pedagogical text | Official formal script; enables calligraphy; heritage continuity with West African Ajami and with enslaved Muslim literacy in the American South (Omar ibn Said, Carolinas, 1831) |
| Everyday / digital | **Coptic script** (R-048): underdot = deep letters (ϩ̣ ḥ · ⲁ̣ ʿ · ⲥ̣ ṣ · ⲇ̣ ḍ · ⲧ̣ ṭ · ⲍ̣ ẓ), overline = soft letters (ⲇ̅ ḏ · ⲅ̅ ġ · ⲕ̅ q · ⲃ̅ v · ϫ̅ ž), natives elsewhere (ⲑ ṯ · ϧ ḫ · ϣ š · ϫ j · ϭ č · ϥ f · ⲟⲩ u · ⲓ̈ y · ⲁ̀ ʾ — Doc A's glottal redeemed); full table = data/scripts.json | Typing and daily use |
| Auxiliary | **Scholarly romanization** (diacritics: š ḥ ṭ ʿ …) | Canonical in data files |
| Auxiliary | **Community romanization** (digraphs: sh, kh, ') | Phrasebook, social media |

All four layers are generated from one phonemic representation; none may drift independently.

---

## 2. PHONOLOGY

### 2.1 Consonants — 33 (R-008)

The 28 Arabic consonants plus five Ajami extensions:

| Rom. | IPA | Ajami | Rom. | IPA | Ajami | Rom. | IPA | Ajami |
|---|---|---|---|---|---|---|---|---|
| ʾ | ʔ | ء | z | z | ز | ġ | ɣ | غ |
| b | b | ب | s | s | س | f | f | ف |
| t | t | ت | š | ʃ | ش | q | q | ق |
| ṯ | θ | ث | ṣ | sˤ | ص | k | k | ك |
| j | dʒ | ج | ḍ | dˤ | ض | l | l | ل |
| ḥ | ħ | ح | ṭ | tˤ | ط | m | m | م |
| ḫ | x | خ | ẓ | zˤ | ظ | n | n | ن |
| d | d | د | ʿ | ʕ | ع | h | h | ه |
| ḏ | ð | ذ | w | w | و | y | j | ي |
| r | r | ر | **p** | p | پ | **č** | tʃ | چ |
| **g** | g | گ | **v** | v | ڤ | **ž** | ʒ | ژ |

/ŋ/ is allophonic (n before velars; final -ng in loans).

### 2.2 Vowels — 10

Short a e i o u · long ā ē ī ō ū. Diphthongs: **ay aw ey oy** (R-021). Ajami: short vowels by pointing; ā = ا, ī = ي, ū = و, ē = ێ, ō = ۆ.

### 2.3 Register realization (R-020)

Spelling is etymological and constant; pronunciation varies lawfully by register:

| Phoneme | Prestige/liturgical | Casual (codified law, not error) |
|---|---|---|
| ṯ ḏ | θ ð | **t d** (AAVE th-stopping: *dis, dat*) |
| ḥ | ħ | h |
| ʿ | ʕ | ʔ or ∅ (with compensatory length) |
| ṭ ṣ ḍ ẓ | emphatic | t s d z |
| q | q | k |
| ḫ ġ | x ɣ | k~h, g |
| ž | ʒ | j |

### 2.4 Phonotactics (R-019 — Doc B §2.4–2.5 adopted)

Syllables V/CV/CVC/CVCC/CCVC/CVVC (max CCVCC); B's onset/coda cluster laws; root constraints (no adjacent identical consonants; pharyngeal and emphatic co-occurrence limits; homorganic avoidance); no vowel harmony. Open sub-dockets: geminate s·s- causatives; -tw syllabification; loan-cluster epenthesis (proposed vowel: e).

### 2.5 Stress (R-021)

Verbs: stem syllable. Nouns: penult. Compounds: first element. Monosyllables: inherent. Acute marks true exceptions.

### 2.6 The Full-Vowel Law (R-015)

Unstressed vowels are **never reduced** in the sacred and plain registers: every template vowel keeps its full quality, Arabic-style, because in a templatic language vowel quality *is* grammar (patient -on vs augmentative -an survive only if o and a stay o and a). The everyday register may reduce, AAVE-style; ambiguity there is absorbed by context, aspect particles, and the always-pronounced case vowels. Vowel **length is load-bearing** (perfective stem *hak·il-* vs adjective *hak·īl*) and is preserved in all registers.

---

## 3. ROOTS & TEMPLATES

### 3.1 Roots

Consonantal skeletons of 2/3/4 consonants, cited in scholarly romanization (ʿ-N-K, H-K-L, S-K-M, F-K). Extraction methodology: Doc B §5 (retained in full as the coinage law) with the R-008 inventory — **ḫ and q no longer convert to k** (see DOCKET D-3: restoration review for SKM→S-Ḫ-M, ʿNK→ʿ-N-Ḫ, KDR→Q-D-R, KMR→Q-M-R).

**The Synonym Principle (R-029):** Amraqiyyah is deliberately rich in synonyms. Words of same or similar meaning are imported from different source languages and **coexist**, each carrying its stream's register and flavor: *ʿanaku* person (Egyptian) beside *yesatu* citizen (Muskogean); *jeta* formal speech beside *talika* casual talk (AAVE). Synonym choice is expressive, not redundant.

**The Doublet Doctrine (R-032, closes D-3):** when a source word was phonologically naturalized (ḫ→k, q→k) before the full inventory existed, both skeletons may live as **doublets with split semantics** — the naturalized skeleton keeps the broad/worldly sense, the faithful skeleton carries the marked/sacred sense: S-K-M "worldly power" ↔ S-Ḫ-M "divine power" (Sekhmet stream; *soḫimon* "talisman"); ʿ-N-K "life, person" ↔ ʿ-N-Ḫ "existence, the life-principle" (*ʿanīḫ* "ever-living"). The casual register's ḫ→k merger collapses each doublet in everyday speech — by design, the worldly/divine distinction is audible only in careful and sacred speech.

**Sourcing doctrine (R-017):** English phonetic distillation is a last resort. New vocabulary is **concept-rooted from the source languages**: Egyptian is the primary neologism engine (a dead language with a vast attested lexicon — *ḥsb* "reckon" → Ḥ-S-B compute; *itrw* "river/Nile" → Y-T-R stream; *sš* "scribe" → S-Š write, the root of Seshat and of Sasha's own name); Muskogean leads land, life, kinship, and the everyday; Arabic/Hebrew lead the spiritual and legal; **Greek takes the technical-scientific-abstract seat** (diktyon → D-K-T network); AAVE remains the grammar stream and contributes genuinely vernacular culture. Doc B's English-distilled tech roots (KMPT, TLVZ, STR, PST, TKS, NT, KD) are queued for re-derivation at D-5.

### 3.2 Strict templates (R-010)

**Templates dictate every vowel. No theme vowels.** All predecessor forms renormalize.

**Triconsonantal derivation suite** (Doc B's tables, now exceptionless):

| Function | Template | S-K-M | H-K-L (renormalized) |
|---|---|---|---|
| Verb (Pattern I) | CaC·iC·a | sak·im·a | **hak·il·a** (was hak·ol·a) |
| Abstract | CiC·eC·i | sik·em·i | **hik·el·i** (was hik·ol·i) |
| Agent | CeC·aC·u | sek·am·u | **hek·al·u** (was hek·ol·u) |
| Patient | CoC·iC·on | sok·im·on | **hok·il·on** (was hok·ol·on) |
| Locative | CaC·eC·ow | sak·em·ow | **hak·el·ow** (was hak·ol·ow) |
| Instrumental | CaC·iC·et | sak·im·et | hak·il·et |
| Collective | CiC·eC·pa | sik·em·pa | hik·el·pa |
| Diminutive | CuC·ayC | suk·aym | huk·ayl |
| Augmentative | CiC·eC·an | sik·em·an | hik·el·an |
| Adjective | CaC·īC | sak·īm | hak·īl |
| Stative | CiC·eC | sik·em | hik·el |

**Biconsonantal suite:** verb CaC·a (fak·a) · abstract CiC·i (fik·i) · agent CeC·u (fek·u) · patient CoC·on (fok·on) · locative CaC·ow (**fak·ow** — resolves Doc A's fok·ow anomaly) · instrumental CaC·et · adjective CaC·āy (fak·āy, har·āy) · diminutive CuC·ay (fuk·ay) · stative CiC (R-027).

**Distinctiveness reforms (R-015)** — outcome of the full confusability sweep:

| Reform | Replaces | Kills this ambiguity |
|---|---|---|
| Adjective **CaCīC** (Arabic faʿīl — the divine-Name pattern: sak·īm ~ Ḥakīm, Karīm, Raḥīm) | CaC·iC·iy | -iy vs abstract -i neutralized word-finally |
| Diminutive **CuCayC** (Arabic CuCayC: suk·aym "small power") | CiC·eC·it | -it vs instrumental -et one vowel apart on shared base |
| Plural **-āt** (§5.2) | -w | -w inaudible after u-stems (fek·u·w); collided with case sandhi |
| **Full-Vowel Law** (§2.6) | — | schwa-reduction would collapse -on/-an, CiCeC-family tails |

Retired templates (CaCiCiy, CiCeCit) may not be reused for new functions. Note also that the always-pronounced case (R-007) armors noun templates in running speech: abstract *sik·em·i* never surfaces bare — it appears as *sikemyu / sikemya / sikemī* — so the stative verb *mi·sik·em* and the abstract noun can never be confused in a real clause.

**Quadriconsonantal:** Pattern I CaC·aC·iC·a (kam·ap·it·a); remaining patterns generated by analogy (DOCKET D-4).

**Binyanim (verb patterns, from Doc B §3.2):** I basic CaCiCa · II intensive CāCiCa · III iterative CaC-CaCiCa (reduplication) · IV causative **sa-** (R-025) · V passive -wi- (after C₂) · VI reflexive -tw · VII reciprocal -ba·a · VIII stative CiCeC.

### 3.3 Frozen Lexeme Registry (R-010, R-022 — broad freeze)

Sacred citation forms are lexical islands exempt from renormalization; their roots still derive regularly by strict template.

The freeze is **broad** (R-022): the **99 divine Names enter wholesale** as frozen Arabic forms (with their al- article per R-012), alongside **maʿat·i** (truth/justice — never ×miʿ·et·i), **ḏed** (stability), **ʿank** (life-sign) and its derivatives, **ḥetep**, **salām**, and the core liturgical vocabulary. Concrete enumeration lands with the liturgical lexicon at root-merge (D-5); the principle is law. Rationale: Arabic itself freezes *Allāh*; sacred forms carry their shape as inheritance.

### 3.4 Primary nouns & rootless lexemes (R-034)

Not every noun is template-derived. **Primary nouns** carry a lexical citation form with a root anchor for derivation (*din* day; *iška* mother, root Y-Š-K → *yašika* "to nurture"; *pokni*, *mafo*, *ala*, *kaz*, *banut*). **Rootless lexemes** have no consonantal root at all — nursery words (*mama*, *dadi*), which every natural language holds outside its template system. Both classes take the full nominal machinery: articles, plural -āt (*iškāt*, *pokniyāt*), possessive suffixes, case with sandhi, and derivational suffixes (*mamān* "Big Mama" = mama + augmentative -an).

### 3.4a Kinship — the Inalienability Rule (R-033) and the kin -t convention

**Inalienability (Muskogean grammatical import; R-033 kin, R-035 body):** kin terms and body parts form **one inalienable class**. In referential use they carry a possessor (suffix or construct): *iška·ku* "my mama," *pokni·to* "his grandmother," *ḏart·ku* "my hand," *ib·to* "his heart." Bare forms are reserved for roles and generics (*na·weladu* "the parent [as role]," *na·ib* "the heart [in general]"), vocatives (*Iška!*), poetry, and citation. Soft law: taught as the norm, not enforced as ungrammaticality.

**The kin -t convention:** female kin terms carry an etymological -t inherited from the sources (Eg. *snt*, Ar. *bint*): *sanu/sanut* sibling/sister · *saʾu/saʾut* son/daughter · *ʿamu/ʿamut*, *ḫalu/ḫalut* uncle/aunt · *banut*. A recognizable pattern, not productive gender (R-006 stands).

### 3.5 Biconsonantal perfective augment (R-013)

Perfective stem of C₁C₂ roots = CaC·**im** (*fak·im-*). Triconsonantal perfective stem = Pattern-I stem minus final -a (*hak·il-*, *sak·im-*).

---

## 4. THE VERB SYSTEM

### 4.1 Subject marking — the clitic architecture (R-005)

The prefix-imperfective / suffix-perfective split is ratified: it is the one point where Egyptian (sḏm.f), Coptic (ti-sōtm), and Arabic (yaktubu/kataba) agree.

- **mi / ti / i / ni** (+ plural closers -tin, -sen) are **weak subject pronouns (proclitics)** — obligatory on imperfective and stative, optional on perfective.
- Perfective marks subject by **suffix**: -ku, -ki, -Ø, -nun, -tin, -sen.
- Full-NP subjects may double with the 3rd-person clitic (AAVE topic-doubling): *na·bāt·u, i bi·i·kay·a* "my daddy, he be workin'."

**Paradigms (H-K-L "understand," renormalized):**

| | Imperfective | Perfective | Stative (H-K-L: hik·el) |
|---|---|---|---|
| 1SG | mi·hak·il·a | hak·il·ku | mi·hik·el |
| 2SG | ti·hak·il·a | hak·il·ki | ti·hik·el |
| 3SG | i·hak·il·a | hak·il | i·hik·el |
| 1PL | ni·hak·il·a | hak·il·nun | ni·hik·el |
| 2PL | ti·hak·il·a·tin | hak·il·tin | ti·hik·el·tin |
| 3PL | i·hak·il·a·sen | hak·il·sen | i·hik·el·sen |

Biconsonantal perfective: fak·im·ku … fak·im (3SG) … fak·im·sen.

### 4.2 Aspect — the Nine Markers (R-011)

| Marker | Type | Source | Meaning |
|---|---|---|---|
| **bi·** | proclitic | AAVE *be* | habitual/characteristic |
| **da·** | proclitic | AAVE *steady* | sustained/intent continuative |
| **dē·** | proclitic | AAVE *just* | recent perfect |
| **don** | particle | AAVE *done* | completive w/ current relevance |
| **bin** | particle | AAVE *BEEN* | remote past; stressed-BIN = focus prosody on bin |
| **f'na** | particle | AAVE *finna* | immediate future |
| **gon·** | infix (post-clitic) | AAVE *gon'* | distant future |
| Imperfective | conjugation | — | ongoing/general |
| Perfective | conjugation | — | completed |

**Stacking (R-023):**

`('ayn) → (la | bu) → bin → don → bi· → da· → dē· → [SUBJ-clitic] → gon· → STEM`

with f'na occupying the particle slot alternatively to gon· (they do not co-occur). Derived meanings are compositional: *bin don* = "been done" (remote completive), *bi·da·* = "be steady V-ing," *bin ni·sik·em* = "we BEEN powerful."

### 4.3 Mood (R-024)

Imperative: bare stem (+ -tin 2PL; hortative ni·) · Conditional: ko … (den), counterfactual law … den · Subjunctive ya· (wishes, purpose) · Jussive met ("must," pre-verbal). Final lane assignments ratified at batch review.

### 4.4 Negation — the Three Negators (R-014)

The en·…·š circumfix is **abolished** (the -š was cumbersome, and en returns to single duty as the preposition "in"). Negation is now light and preverbal, with each heritage stream owning one negator — the same tripled-stream architecture as the Two Definites:

| Negator | Source | Scope |
|---|---|---|
| **la** | Arabic lā | General negator: imperfective, stative, nominal/zero-copula, copulas — and the **prohibitive** (la + imperative, exactly Arabic lā an-nāhiya) |
| **bu** | Late Egyptian bw (ancestor of Coptic negation) | Perfective negator: bu + perfective |
| **'ayn** | AAVE *ain't* | Emphatic negator, any clause type; opener of concord chains |

- *la mi·hak·il·a* "I don't understand" · *Mi la har·āy* "I'm not good"
- *bu hak·il·ku* "I didn't understand"
- *La fak·a!* "Don't cultivate!"
- *Mi 'ayn har·āy* "I AIN'T good" · *la yit …* / *la wi …* (copular/existential negation)
- Negative series (la-family, now fully transparent): **la·šey** no-thing · **la·ʿanak·u** no-body · **la·wayen** never · **la·fen** no-where.
- **Negative concord is grammatical and reinforcing** (ratified AAVE feature): *'Ayn la·ʿanak·u la i·fak·a* "ain't nobody cultivating."

### 4.5 Voice (R-025)

**sa·** causative — vocalized, because bare s- would violate the R-019 onset laws (*×s·fak·a* has a forbidden fricative+fricative onset): *sa·fak·a* "make cultivate," *sa·hak·il·a* "make understand → to teach," agent *sa·hak·il·u* "teacher" · **-wi-** passive after C₂ · **-tw** reflexive · **-ba·a** reciprocal.

---

## 5. THE NOMINAL SYSTEM

### 5.1 Gender (R-006)

Grammar is genderless: no gendered articles, no agreement, no productive feminine -t. Natural sex is lexical (*san·u* son, *ban·u·t* daughter — frozen lexemes, not morphology). Gender appears **only** in 3rd-person pronouns (§6).

### 5.2 Number (R-015)

Plural **-āt**, universal (Arabic sound-plural stream): *šey·āt* "things," *din·āt* "days," *fek·wāt* "cultivators" (u+ā → wā by sandhi), *ʿanak·wāt* "people." This replaces Egyptian -w, which was inaudible after u-stems and collided with case sandhi; the Egyptian stream keeps its claim on number through the plural article **na·pa** (itself Late Egyptian nꜣ). Plurals decline regularly: *fek·wāt·u / fek·wāt·a / fek·wāt·i*. Collective **-pa** = group-as-unit (*hik·el·pa* "the understanding-community"). Dual: deferred (Doc B ruling stands).

### 5.3 The Two Definites (R-012)

| Article | Stream | Role |
|---|---|---|
| **na·** (pl. **na·pa·**) | Late Egyptian nꜣ → Coptic | The worldly definite — default "the" in every register |
| **al·/el·** | Arabic, with sun-letter assimilation (el·salām → **es·salām**) | The sacred-emphatic definite — uniqueness, sanctity, emphasis; obligatory with divine Names (harmonizing with the Oracle's 99 Al- Names); "THE one and only" in any register |

*na·maʿat·i* "the truth (an instance)" vs **al·maʿat·i** "THE Truth (Ma'at itself)."
Indefinites: **wa** "a/one" (Egyptian wꜥ) · **sam** "some." Generic = bare noun.
na· and al· never stack; al· substitutes for na· where sanctity/emphasis warrants.

### 5.4 Case — the Arabic–Muskogean fusion (R-007)

**Endings (Arabic):** subject **-u** · object **-a** · genitive **-i** (possessors; objects of prepositions).
**Placement (Muskogean):** once per noun phrase, on its final word.
**Always pronounced, every register.** Case marks **arguments only** (subject, object, genitive); **predicates are caseless** (R-026): *Mi har·āy* "I'm good" stands bare; **topics are caseless** (R-052 Topic Law, §7 — the everyday default for full-NP subjects).

**Sandhi (R-026):** after consonant: plain (-u/-a/-i). After u: u+u→**ū**, u+a→**wa**, u+i→**wi**. After i: i+i→**ī**, i+a→**ya**, i+u→**yu**. After a: a+a→**ā**, a+u→**aw**, a+i→**ay**.

*na·fek·**ū*** (the cultivator, subj) · *na·fek·**wa*** (obj) · *ben na·fek·**wi*** (to the cultivator) · *na·fek·u har·iy·**u*** (the good cultivator, subj — case at phrase edge).

Pronouns decline suppletively (clitic vs suffix series); case endings do not attach to pronouns.

### 5.5 Demonstratives (R-027)

Three-way distance, genderless: **pen / pek / pom** (this / that / yonder), plurals **nai / nak / nom**. Locative adverbs: **en·pen / en·pek / en·pom** (here / there / yonder).

### 5.6 Possession & genitive (R-027)

Possessive suffixes (§6); suffix order is **STEM(-PL)(-POSS)(-CASE)** — case is truly NP-final (*šey·kū* "my thing," subject, via u+u→ū). Genitive constructions: construct state (*šey na·ʿanak·wi* — tight/lexicalized) and **na**-particle (default analytic). **The two genitives (R-050):** word-level case -i (arguments, prep-governed) merges by R-026 sandhi (*fekwi*, *šeykū*, *en·hawtpay*); the **phrase-closing construct genitive ·i of D-14 is an enclitic — always syllabic, never vowel-merged** (*sanupa·i*, *pokni·ku·i*): the phrase-closer stays audible by design. Two homophonous -i's, distinguished by structure. **Noun-conversion by possession (R-051, AAVE grammatical import):** an adjective may be noun-converted by taking a possessive suffix directly — *Kapīl·ku!* "My bad!" (adjective *kapīl* owned as a noun, exactly AAVE "my bad"). The converted form takes the full nominal machinery. **Two possession predicates** (deliberate nuance): **het**-have for accompaniment and relations — *Mi het weld·wāt·i* "I have children (I'm with children)" (R-053 errata: u-stem plural weld·wāt per R-015's own sandhi, as *fek·wāt*, *saʾ·wāt*) — and **ʿind**-have for property and location — *ʿInd·ku wa·hawt* "I have a house (at-me is a house)." **Age is ʿind-possession (R-053):** *ʿInd·ki kam ranpetāt?* "how old are you?" — years as property, exactly Arabic *ʿindī ʿišrūna sana*.

### 5.7 The Particle Suite (R-016)

Prepositions govern the genitive (**-i** at the NP edge, per R-007), **inflect directly with the suffix pronouns** (Arabic-faithful: *het·ku* "with me," *min·to* "from him," *ʿala·ki* "on you"), and **stack** (*min taḥt na·hawt·i* "from under the house").

| Particle | Source | Meaning |
|---|---|---|
| **en** | inherited | in, at (single-jobbed again — its negation duty is abolished by R-014) |
| **ʿala** | Ar. ʿalā | on, upon, over |
| **taḥt** | Ar. taḥta | under, beneath |
| **qudām** | Ar. quddām | in front of, before (space) |
| **ḫalf** | Ar. khalfa | behind |
| **bayn** | Ar. bayna | between |
| **ḥawl** | Ar. ḥawla | around |
| **ben** | inherited | to, toward |
| **min** | Ar. min | from, out of — **replaces prepositional bin; bin is now exclusively remote-past BEEN** |
| **ʿind** | Ar. ʿinda | at the place of, by/chez (*ʿind·ku* "at my place") |
| **het** | inherited | with (comitative: alongside someone); predicative possession (*mi het X* "I have X") |
| **bi** | Ar. bi- | with (instrumental: by means of) — homophone of habitual bi· but never in the same slot (bi + NP vs bi· + clitic + verb) |
| **bilā** | Ar. bi-lā | without (transparently "with-no" — la-family) |
| **ḍid** | Ar. ḍidd | against |
| **ra** | inherited | for, for the sake of (cause ceded to sabab) |
| **bawt** | AAVE *bout* | about, concerning (*mi·tal·ik·a bawt …* "I'm talkin' bout …") |
| **kama** | Ar. kamā | like, as |
| **illa** | Ar. illā | except (liturgically resonant: *la … illa …*) |
| **qabl** | Ar. qabla | before (time) |
| **baʿd** | Ar. baʿda | after (time) |

**Assent & dissent:** **na'am** (formal yes) · **aywa** (everyday yes — Egyptian Arabic) · **la** (no — the same morpheme as the negator, Arabic-style). Tag particles ma / yani (§7).

**Design note:** the short inherited forms (en, ben, het, ra) are the core spatial grid; the Arabic layer is the relational lattice; AAVE supplies discourse flavor (bawt). The **het vs bi** split (comitative vs instrumental) is a deliberate expressiveness gain: *het na·krew·i* "with the crew" vs *bi na·sakimet·i* "with the tool."

---

## 6. PRONOUNS (R-005, R-006, R-009)

| Person | Strong (focus) | Weak clitic (subject) | Suffix (object/possessive) |
|---|---|---|---|
| 1SG | anok | mi | -ku |
| 2SG | entok | ti | -ki |
| 3SG m | entof | i | -to |
| 3SG f | entos | i | -ta |
| 3SG n | ento | i | -to |
| 1PL | anon | ni | -nun |
| 2PL | enton | ti…-tin | -tin |
| 3PL | entou | i…-sen | -sen |

Strong pronouns: emphasis, isolation, clefts (*Anok pe …* "I AM …"). Weak clitics: default subjects. Suffixes: *hak·il·a·ku* "understand me," *šey·ku* "my thing," *šim·on·to* "his name."

---

## 7. CORE SYNTAX (R-018, R-028)

- **Order:** SVO; VSO for emphasis/questions; topicalization with resumptive suffix (*Na·šey·a, mi hak·il·a·to* "the thing, I understand it").
- **The Topic Law (R-052):** full-NP subjects default to **topic position — caseless, resumed by the clitic** (visible on imperfective/stative: *Na·šaʿab i·gon·ḫayira*; Ø-agreement on 3SG perfective: *Na·ḫireji don waṣil*). In-situ **cased** subjects (*Na·fek·ū don fak·im*) remain grammatical as the formal/contrastive configuration — plain/sacred register flavor, Arabic-faithful. Copular and zero-copula subjects are caseless (*Na·pet zarīq*). This upgrades R-005's topic-doubling from "may" to the everyday default: the AAVE topic-prominent clause is the unmarked shape of the language.
- **Ditransitive (R-053):** recipient as object suffix on the verb, theme NP in -a: *ʿAṭiya·ku wa·ḫobizon·a, min faḍl·kī* "give me a loaf, please" (exactly Arabic *aʿṭi-nī l-ḫubz-a*).
- **Copulas (AX-21):** **yit** predicative (quality/class) · **wi** existential/locative · **pe** (sg) / **ne** (pl) identificational, genderless · zero copula in casual register (*Mi har·āy* "I'm good").
- **Existential:** *Wi sam·fek·u·w …* "there are cultivators…"; frozen presentational **yit·pen** ("it's…" — AAVE existential *it's*).
- **Heart-idiom predicates (R-038):** **ib + stative/adjective** forms an emotion predicate, grammaticalizing the Egyptian pattern (*ꜣwt-ib* "wideness of heart" = joy): *Ib·ku wasīʿ* "my heart is wide = I'm overjoyed" · *Ib·nun ḥitep* "our hearts are at rest = we are content" · *ib šajīʿ* "a brave heart." The idiom inventory grows in the phrasebook; the pattern is law.
- **Questions:** rising intonation (default); optional formal particle **hal** (Arabic); tags **ma** / **yani**; wh in-situ or fronted.
- **Interrogatives (R-018):** **miya** what · **nim** who (Eg. *in-m*) · **ta** which · **en·ta** where ("in-which" — completing the paradigm *en·pen / en·pek / en·pom / en·ta* here/there/yonder/where) · **mata** when (Ar.) · **kayf** how (Ar.) · **kam** how many (Ar.) · **ra·miya** why ("for-what") — plus free particle composition: *het nim?* "with whom?" · *min en·ta?* "from where?" · *bawt miya?* "bout what?" · *Ti wi en·ta?* "Where you at?"
- **Relatives:** **nin·ta** + clause with resumptive suffixes; reduced relative **et·** (Coptic ⲉⲧ-): *na·šey et·wi·har·āy·u* "the thing that is good."
- **Conjunctions:** ma (and) · ma·den (and then) · we·pen (but) · aw (or) · la (nor) · ko/law…den (if…then) · sabab (because) · ḥatta (until) · kadama (when/while — root re-source DOCKET) · **ša** = complementizer only (its article/future jobs retired by R-006/R-011).

**Showcase sentences (current rulings applied):**

- *Na·fek·ū don fak·im na·fok·on·a.* — "The cultivator done cultivated the field."
- *Bin ni·sik·em.* — "We BEEN powerful." (ancestral-power reading)
- *'Ayn la·ʿanak·u la i·hak·il·a es·salām·a.* — "Ain't nobody understand the peace." (triple concord + sun-letter al·)
- *Anok pe wa·ʿanak·u al·tariqa·wi.* — "I AM a person of THE Way."
- *Mi·tal·ik·a bawt al·maʿat·i het·ki.* — "I'm talkin' bout THE Truth with you." (particle suite: bawt + inflected het)

---

## 8. REGISTERS (R-020, R-028)

| Register | Script | Phonology | Grammar signature |
|---|---|---|---|
| **Sacred/liturgical** | Ajami, fully pointed | Full 33-consonant realization | al· with divine Names; overt copulas; full case sandhi careful; Egyptian/Arabic vocabulary stratum |
| **Plain/formal** | Ajami or Coptic | Prestige realization | na·; overt or zero copula; complete aspect marking |
| **Everyday** | Coptic | Casual mergers (th-stopping law, q→k, ʿ→ʔ) | zero copula; aspect-rich AAVE signature; topic-doubling; concord |

Names for the three registers: to be coined from the lexicon itself (DOCKET).

---

## 9. DOCKETS (open work, Facet → Refine)

| # | Item |
|---|---|
| D-1 | **CLOSED** — item-by-item walk completed 2026-07-21 (R-019–R-028) |
| D-2 | **CLOSED by R-048** — 33-consonant Coptic table (underdot deep / overline soft) + four-script converter live (tools/script.js, data/scripts.json, 10 golden conversions green) |
| D-3 | **CLOSED by R-032** — Doublet Doctrine: S-K-M/S-Ḫ-M and ʿ-N-K/ʿ-N-Ḫ split semantics; Q-D-R and Q-M-R proceed as clean restorations (no entrenched k-forms) |
| D-4 | **CLOSED by R-047** — quads: Pattern I + citation nominals; uniform passive law (-wi- after C₂ in every class) |
| D-5 | **IN PROGRESS** — Tranche 1 dispositions at `afro/02-root-merge.md` (four ALI blocks pending; tranches T-2…T-10 scheduled) |
| D-6 | **CLOSED by R-018** — interrogative paradigm ratified (miya, nim, ta, en·ta, mata, kayf, kam, ra·miya + particle composition) |
| D-7 | **CLOSED by R-026** — sandhi ratified; predicates caseless |
| D-8 | Numbers 1–10 rebuild + weekday system (AX-38; Saturday/Sunday values ruling) |
| D-9 | **CLOSED by R-022** — broad freeze ratified; enumeration lands at D-5 |
| D-10 | **Engine live** — `tools/morphology.js` + `tools/lint.js` + 58 golden tests green + `tools/cli.js` explorer; data single-source at `data/*.json`; sentence-level golden corpus still to seed |
| D-11 | **CLOSED by R-047** — no weak-verb morphophonology: w/y are ordinary consonants in templates (ḏawiqa, qayisa, nasiya) |
| D-12 | **CLOSED by R-047** — mēr more / al·mēr most (the sacred article builds the superlative) / aqel less / min than (Arabic-faithful) / kama as / ril very (AAVE) / tu too |
| D-13 | **CLOSED by R-047** — aya go · yawa come · mašiya walk · sayira travel · ʿabira cross · waṣila arrive · daḫila enter · ṣaʿida ascend · nazila descend · **rajiʿa return (na·Rijeʿi THE RETURN)** · **ḫarija exit (ḫireji THE EXODUS)** |
| D-14 | **CLOSED by R-047** — head-marking: the head bears the phrase case, genitive -i closes the phrase (sanefu sanupa·i); no Suffixaufnahme |
| D-15 | **CLOSED by R-047** — three types: juxtaposition (modifier+head, tanchi-palvska precedent: **yiteč-ḫobizon** cornbread, ruḥ-ḥisi soul music), construct-genitive, adjective phrase |

---

*Prepared by Sasha under the stewardship mandate. Every PROPOSED section implements a recorded audit recommendation and awaits Ali's batch ratification.*
