# ArwenGo 🌟

A personalised AI learning coach for Jinny (age 8, UK Year 3), built as a Claude React artifact.

## What it does

ArwenGo runs a daily quiz across five core subjects in order, then offers an optional bonus round:

1. **English** - Year 3 vocabulary in sentence form
2. **Maths** - Adaptive: starts with Year 3 topics and levels up to Year 4 on first-try success
3. **Science** - UK Year 3/4-aligned A/B/C questions
4. **Chinese** - Character + pinyin recognition
5. **Spanish** - Vocabulary recognition
6. **Bonus round** - Geography 🌍, History 📜, or Music 🥁

## Features

- Persistent points and day-streak tracking
- Checkpoint protection to avoid score regression
- Adaptive maths difficulty
- Warm, encouraging coach persona ("Arwen")
- Pause / resume flow
- Parent progress report mode (`progress`, `report`, `weak`)
- Subject badges and quick-launch buttons for science and bonus rounds
- Timed storage reads/writes with fallback to `localStorage` when Claude artifact storage is unavailable

## Tech stack

- React artifact component in [arwen_coach.jsx](./arwen_coach.jsx)
- Anthropic Messages API (`claude-sonnet-4-20250514`) called from the artifact component
- `window.storage` for persistent score data inside Claude artifacts
- `localStorage` fallback for persistence when artifact storage is unavailable

## Word banks and topics

The current artifact keeps its banks inline inside `arwen_coach.jsx` for portability:

- 39 English vocabulary words
- 67 Chinese characters / words with pinyin
- 47 Spanish vocabulary items
- Year 3 and Year 4 maths topic lists
- Science, Geography, History, and Music topic lists

The repository also includes mirrored JSON files in [`knowledge/`](./knowledge) for easier editing and future extraction:

```text
knowledge/
├── english_word_bank.json
├── chinese_bank.json
├── spanish_bank.json
├── math_topics.json
├── science_topics.json
├── geography_topics.json
├── history_topics.json
└── music_topics.json
```

## Scoring

| Result | Points |
|---|---|
| Correct first try | 8 pts |
| Correct / partial second try | 7 pts |
| Engaged but wrong both times | 5 pts |
| Follow-up bonus | +2 pts |
| Streak bonus (up to 7 days) | +1-7 pts |

## Storage

The app uses these keys for progress:

| Key | Contents |
|---|---|
| `jinny:stats` | Running total, streak, and last save time |
| `jinny:checkpoint` | Session-complete snapshot |
| `jinny:lastSession` | Date of the last completed session |

Seed baseline: **197 points, streak 1**. On load, the app prefers the higher of checkpoint and running stats to avoid regressions.

## Notes

- The exported component name is `ArwenGo`, while the repo entry file remains `arwen_coach.jsx`
- The app is designed first for Claude.ai artifacts
- If you run it outside Claude, persistence can fall back to `localStorage`, but you will still need to adapt the Anthropic API call for your environment
