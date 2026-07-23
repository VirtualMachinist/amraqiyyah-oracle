# NA·KATEBOW — The Amraqiyyah Wing of the Atrium
## Vault Spec & Lattice Schema v0.1 (draft for the Sovereign's ratification)

*The library-word names itself: K-T-B gives kitebi the book, ketabu the author, and **katebow — the library**. The lattice beneath it takes the network-root: **ed·diketi**, THE web. One vault wing, one database: na·katebow ma ed·diketi.*

---

## §0 — The thesis (what this is)

The repo holds three instruments that were always one system: the **Language** (lexicon, rulings, corpus, Canon translations), the **Oracle** (78 cards, 64 hexagrams, the 99 Names, strata, thresholds), and the **Calendar** (nine temporal layers, 28 mansions, Salah windows, the week, the Ages). The constitution already says the quiet part: *the shared tables are ONE table.* This spec makes that law physical — **shared tables become shared nodes**, and the three instruments become one graph:

- **Obsidian is the human pane.** One note per entity; the graph view shows Al-Wāḥid pulled simultaneously by a lexicon root, an Oracle registry slot, and a dhikr count — because it IS one node.
- **SQLite is the machine pane** (Atrium Lattice Tier 2 discipline: local, sub-second, uncapped) with **three retrieval modes matching the three shapes the Way's knowledge takes**:
  - **semantic recall** → the concept-*fields* (R-066's synonym chorus: query "grief" and receive Ḥ-Z-N, F-R-Q, bluz);
  - **tree retrieval** → the *strata* (Canon tiers, Veil layers, calendar layers, lesson ladders);
  - **graph traversal** → the *correspondences* (Name ↔ hexagram ↔ mansion ↔ root — the Oracle's whole method is graph traversal done by hand).
- **The steward payoff:** R-071 diagnosed the bloated context window as the leading cause of error. This lattice is the cure's second half — future sessions query the lattice instead of re-ingesting the corpus, and PROOFREADING.md's error classes become standing queries. The vault remembers so the context window doesn't have to.

## §1 — Placement & the canon boundary

```
Atrium/Atrium/
  Amraqiyyah/                      ← the wing
    repo/                          ← git clone of the Amraqiyyah repo (obsidian-git manages pulls;
    │                                 the repo remains THE canon — R-002. Read-only from vault side.)
    lattice/
    │  lattice.db                  ← ed·diketi (SQLite; gitignored, rebuilt from source)
    │  embeddings.db               ← vector sidecar (sqlite-vec), rebuilt from source
    ├─ language/                   ← GENERATED notes (one per entity; banner + `generated: true`)
    │    roots/   rulings/   phrases/   canon/
    ├─ oracle/
    │    cards/   hexagrams/   names/   strata/
    ├─ calendar/
    │    layers/  mansions/  windows/  days/  ages/
    ├─ shared/                     ← THE SHARED TABLES — single nodes, every system links here
    │    names/ (99)   mansion-table/   salah-lines/
    ├─ hubs/                       ← MOCs: 00-Amraqiyyah.md · language.md · oracle.md · calendar.md
    └─ study/                      ← HUMAN notes (never generated, never pruned; the Sovereign's
                                      marginalia — links freely into the generated layer)
```

**The one law:** generated notes are regenerated, never hand-edited (the deliverables discipline, extended). Human thought lives in `study/` and in any note lacking `generated: true`. The sync tool may only ever create/update/prune notes it generated.

## §2 — Note schema (frontmatter contract)

```yaml
---
id: root.w-ḥ-d              # stable slug: <type>.<key> — the graph's primary key
type: root                   # root|ruling|phrase|verse|text|name|card|hexagram|trigram|
                             # mansion|window|day|layer|age|doc|lesson|hub
system: language             # language|oracle|calendar|shared
generated: true
source: language/data/roots.json#w-ḥ-d      # repo path + pointer (provenance, always)
status: ratified             # carries the honest chips: verified/pending/coined ride along
aliases: [waḥīd, ⲟⲩⲁϩⲓⲇ, وحيد, "one, alone"]   # four scripts + gloss — search finds every skin
---
```

Body = the entity rendered for humans (gloss, etymology, template family, flags) with **wikilinks doing the graph's work**: a root note links `[[name.al-wahid]]` (pairing), `[[ruling.R-070]]` (born-in), `[[verse.dokkodo.13]]` (attested-in), `[[root.w-ḥ-y]]` (near-collision, from the blessed advisories — even the lint graph becomes visible). Link *types* that Obsidian can't express live in the edge table (§3); the wikilink is the human shadow of the typed edge.

## §3 — ed·diketi: the SQLite schema

```sql
-- nodes: every entity in every system
CREATE TABLE nodes (
  id        TEXT PRIMARY KEY,          -- 'root.w-ḥ-d', 'name.al-wahid', 'hex.52', 'mansion.9'
  type      TEXT NOT NULL,
  system    TEXT NOT NULL,             -- language|oracle|calendar|shared
  title     TEXT NOT NULL,
  path      TEXT,                      -- vault-relative note path
  source    TEXT,                      -- repo provenance pointer
  meta      TEXT,                      -- frontmatter JSON (status, flags, aliases…)
  body      TEXT,
  hash      TEXT NOT NULL,             -- content hash: the idempotence key
  mtime     INTEGER
);

-- edges: typed, directed, weighted — the graph the Oracle walks by hand
CREATE TABLE edges (
  src TEXT NOT NULL REFERENCES nodes(id),
  dst TEXT NOT NULL REFERENCES nodes(id),
  rel TEXT NOT NULL,   -- pairing | derives-from | ratified-by | attests | shares-table |
                       -- upper-trigram | lower-trigram | threshold-of | rules(planet) |
                       -- window-line | mansion-of | near-collision | supersedes | cites
  weight REAL DEFAULT 1.0,
  PRIMARY KEY (src, dst, rel)
);
CREATE INDEX edges_dst ON edges(dst, rel);

-- tree: closure table — strata, tiers, layers, doc-heading hierarchies
CREATE TABLE tree (
  ancestor   TEXT NOT NULL REFERENCES nodes(id),
  descendant TEXT NOT NULL REFERENCES nodes(id),
  depth      INTEGER NOT NULL,
  PRIMARY KEY (ancestor, descendant)
);

-- lexical recall: FTS5 over every skin of every word
CREATE VIRTUAL TABLE nodes_fts USING fts5(
  id UNINDEXED, title, aliases, body, tokenize='unicode61 remove_diacritics 0'
);  -- diacritics KEPT: ḫ ≠ h is phonemic law (R-008)

-- semantic recall: sqlite-vec sidecar, nomic-embed-text vectors (the Atrium Lattice
-- Tier 2 stack — same embedder, same mesh; chunked by note section)
CREATE VIRTUAL TABLE vec_chunks USING vec0(
  node_id TEXT, chunk_ix INTEGER, embedding FLOAT[768]
);
```

**The three retrieval modes, as queries:**

```sql
-- GRAPH: everything within 2 hops of Al-Wāḥid (the Name as crossroads)
WITH RECURSIVE hood(id, d) AS (
  VALUES('name.al-wahid', 0)
  UNION SELECT e.dst, d+1 FROM edges e JOIN hood ON e.src=hood.id WHERE d<2
  UNION SELECT e.src, d+1 FROM edges e JOIN hood ON e.dst=hood.id WHERE d<2)
SELECT DISTINCT n.* FROM hood JOIN nodes n USING(id);

-- TREE: the full subtree of Canon Tier II-F (every Bushido text and verse beneath it)
SELECT n.* FROM tree t JOIN nodes n ON n.id=t.descendant
WHERE t.ancestor='text.tier-2f' ORDER BY t.depth;

-- HYBRID SEMANTIC: "words for grief" — vector ∪ FTS, reranked
--   (embed the query via nomic-embed; union vec_chunks KNN with nodes_fts MATCH;
--    dedupe by node, rank = max(vec_sim, bm25-normalized))
```

## §4 — The sync liturgy: `tools/atrium.js`

`node tools/atrium.js --vault "<path>/Atrium/Atrium/Amraqiyyah"` — joins the regeneration liturgy (after the five generators):

1. **Read** every `language/data/*.json` (structured truth) + parse `docs/01/02/03` tables (Oracle registry, matrix, mansion table, Salah lines, Canon tiers) into entities.
2. **Unify** the shared tables: the 99 Names, the mansion table, the Salah lines each emit ONE node under `shared/`; language pairings, Oracle slots, and Calendar consumers emit *edges* into them, never copies. (A divergence between two documents' copies of a shared table is a **build error** — the lattice becomes the constitution's enforcement arm.)
3. **Emit** notes idempotently by content-hash; prune generated orphans; never touch `study/` or any note without `generated: true`.
4. **Index**: upsert nodes/edges/tree; refresh FTS; re-embed only hash-changed chunks (nomic-embed via the local ollama, per Atrium Lattice Tier 2).
5. **Report** in the repo voice: nodes, edges, orphans pruned, embeddings refreshed, and any shared-table divergence caught.

## §5 — What the graph knows that the shelf doesn't (payoff queries)

- **"Show me Al-Wāḥid"** → the Name node pulls: Oracle registry slot + dhikr count (abjad value), the W-Ḥ-D pairing (R-070), Dokkodo verses 13/16, the Q 57:3 cluster with Az-Zāhir/Al-Bāṭin/Al-Āḫir — three instruments, one answer.
- **"What does lunar day 17 touch?"** → Calendar layer → Check-1 line bin → Juz 17 → the Appendix C worked reading → Hex 55 → its Name → its mansion — the golden test vector as a *path*.
- **"Grief vocabulary"** (semantic) → Ḥ-Z-N, F-R-Q's parting, bluz, ḥiqedi's neighbors — the R-066 field surfaces as a similarity cluster, which is what a concept-field *is*.
- **Steward recall:** "have we ever ruled on X?" hits rulings + PROOFREADING error classes + advisories before a fresh session re-derives (or re-breaks) anything. The lattice is institutional memory; the context window goes back to being a workbench.

## §6 — Phases

| Phase | Scope | Gate |
|---|---|---|
| **P1** | `tools/atrium.js` + language wing (roots · rulings · phrases · canon verses) + hubs; nodes/edges/tree/FTS live | notes render in Obsidian; graph view shows the pairing edges |
| **P2** | Oracle + Calendar wings parsed from docs; **shared/ unification + divergence guard** | the 99 Names exist exactly once; golden vector walkable as a path |
| **P3** | sqlite-vec + nomic-embed sidecar; hybrid recall CLI (`atrium recall "<query>"`) | the three example queries return true answers |
| **P4** | Recall surface for steward sessions (MCP or CLI) + PROOFREADING standing queries | a fresh session answers "what do we know about X?" without reading the repo |

*Ali ratifies the wing's name, the placement, and each phase gate. The repo stays canon; the vault stays mirror; the lattice stays rebuildable from zero — na·katebow can burn and be reprinted, ed·diketi can be dropped and re-woven, and nothing is lost, because the truth lives in the ledgered repo. Deterministic, transparent, worthy of ratification.*
