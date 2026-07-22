# Glyph

A tiny, self-contained **spaced-repetition trainer for symbols and terms**. One HTML file. No build, no dependencies, no network. Open it and play.

**▶ Play:** https://daveremy.github.io/glyph/

Born from a math-notation decoder ring — the first deck teaches set-theory symbols (∈, ∪, ∀, ℝ, …) — but Glyph is **deck-agnostic**: feed it any JSON list and it trains that subject.

## What makes it different

- **Bidirectional recall** — it flips between *symbol → meaning* and *meaning → symbol*.
- **Leitner boxes** — right answers promote a card (you see it less); wrong answers send it back to box 1. The box *is* your score.
- **Latency as automaticity** — a card only reaches the top **Reflex** box when you answer *correctly **and** fast* (under 3.5s). Speed is treated as evidence that recall has become automatic, not just correct.
- **On reveal you get the whole picture** — the symbol's spoken name, its *proper name + origin* (∈ comes from Greek epsilon), a worked example, and the plain-English meaning.
- **Your progress stays on your device** (`localStorage`); export/import it as JSON anytime.

## Make your own deck

Load any deck from the in-app **Decks & data** panel. A deck is a JSON array:

```json
[
  {
    "sym": "∈",
    "name": "element-of sign — from Greek ε (epsilon)",
    "example": "3 ∈ {1, 2, 3}",
    "say": "is in",
    "mean": "x is an element of the set",
    "known": "SQL: x IN (…)"
  }
]
```

Only `sym` and `say` are required; `name`, `example`, `mean`, `known` are optional and shown on reveal.

## Keyboard

`Space` reveal · `1` / `←` missed · `2` / `→` / `Enter` got it

## Develop

It's one file — `index.html`. To run locally:

```bash
python3 -m http.server 8787   # then open http://localhost:8787
```

## Origin & roadmap

Glyph is the seed of a "re-assertion scheduler" for a larger intuition-first learning system (the [structural-intelligence](https://github.com/daveremy/structural-intelligence) project). Planned: per-term history charts, audio prompts, multiple decks, and exporting mastery back into a knowledge map.

MIT licensed.
