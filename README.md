# Arwen Coach 🎓

An AI-powered learning coach for Jinny (UK Year 3, age 8), built as a Claude Artifact.

## What it does

Arwen is a warm, encouraging study coach that runs a daily quiz session covering five core subjects plus optional bonus rounds. Points and streaks persist across sessions via `window.storage`.

## Subjects

### Core (every session)
| Subject | Format | Notes |
|---------|--------|-------|
| English | Write a sentence using a given word | Vocabulary from `english_word_bank.json` |
| Maths | Single question | Adaptive: Year 3 → Year 4 on first-try correct |
| Science | A/B/C multiple choice | Aligned to NGSS Grade 3 + UK Year 3/4 |
| Chinese | A/B/C — what does this character mean? | Beginner recognition, pinyin shown |
| Spanish | A/B/C — what does this word mean? | Starter vocabulary |

### Bonus (offered after core, player picks one)
- Geography 🌍 — UK, European, and world capitals; continents; oceans
- History 📜 — UK Year 3/4 history topics (Great Fire, Ancient Egypt, Tudors…)
- Music 🥁 — note values, drum kit, time signatures, dynamics, tempo

## Points system

| Result | Points |
|--------|--------|
| Correct first try | 8 |
| Correct / partial on retry | 7 |
| Engaged but wrong | 5 |
| Follow-up correct bonus | +2 |
| Daily streak bonus | +1 to +7 |

Points never decrease. Streak increments each day a full session is completed.

## Storage keys

| Key | Contents |
|-----|----------|
| `jinny:stats` | `{ totalPoints, streak, lastSaved }` — updated after every question |
| `jinny:checkpoint` | `{ totalPoints, streak, savedAt }` — updated only on session complete |
| `jinny:lastSession` | Date string of last completed session — used to compute streak |

Seed baseline: **197 pts, streak 1** (2026-04-20). On first load, the app takes the max of checkpoint and stats to prevent regression.

## Adaptive maths

The coach starts every session with Year 3 topics (`math_topics.json → year3`). If Jinny answers correctly on the first try, the next maths question is drawn from Year 4 (`year4`) and Arwen says *"Level up! 🌟"*. A wrong answer keeps her at the current level.

## Knowledge files

All word banks and topic lists live in `knowledge/` as plain JSON — easy to extend without touching the main artifact code.

```
knowledge/
├── english_word_bank.json   # Year 3 vocabulary (word + level + topics)
├── chinese_bank.json        # Characters with meaning + pinyin + stage
├── spanish_bank.json        # Starter vocabulary
├── math_topics.json         # { year3: [...], year4: [...] }
├── science_topics.json      # Topics with NGSS code references
├── geography_topics.json
├── history_topics.json
└── music_topics.json
```

To add a new word or topic, just append a line to the relevant JSON file and update the corresponding array inside `arwen_coach.jsx`.

## Standards alignment

Science topics are cross-referenced to NGSS (Next Generation Science Standards) codes, validated against the [Learning Commons Knowledge Graph](https://kg.mcp.learningcommons.org) (Chan Zuckerberg Initiative × Anthropic). NGSS Grade 3 topics map closely to the UK National Curriculum Year 3/4 science programme of study.

Maths topics align to CCSS Grade 3–4 (Common Core), which overlaps strongly with UK Year 3–4 expectations.

## How to use

1. Open `arwen_coach.jsx` as a Claude Artifact (save to your Artifacts library for easy access)
2. Hit **Start quiz ▶**
3. Complete all five core subjects
4. Pick a bonus subject or skip
5. Points save automatically

## Tech

- React 18 (via esm.sh)
- Anthropic API (`api.anthropic.com/v1/messages`, model: `claude-sonnet-4-20250514`)
- `window.storage` for persistence (Claude Artifact storage, synced to account)
- No external dependencies beyond React

## Project status

| Feature | Status |
|---------|--------|
| Core 5 subjects | ✅ |
| Bonus 3 subjects | ✅ |
| Adaptive maths difficulty | ✅ |
| Points + streak persistence | ✅ |
| Checkpoint anti-regression | ✅ |
| Subject badges in chat | ✅ |
| Parent progress query | ✅ |
| Weekly report | 🔜 |
| Per-subject weak-area tracking | 🔜 |
