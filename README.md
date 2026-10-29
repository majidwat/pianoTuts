# Naghmeh — Piano Learning

A bilingual Persian/English interactive piano-learning app. It teaches treble and bass clef line/space notes, ledger notes, octave identity, and note-to-key practice.

## Run locally

Requires Node.js 18+ for tests. Since the app is static, serve the root directory using any local HTTP server:

```bash
python -m http.server 8080
```

Then open http://localhost:8080. ES modules and Web Audio work in modern browsers.

## Features

- Persian RTL and English LTR interface.
- Independent lesson groups for treble and bass line/space notes, ledger examples, octaves, sharp-note lessons, rhythm durations, rests, and review.
- Inline SVG notation rendering; no external notation image dependencies.
- Full 88-key piano range (MIDI 21/A0 through MIDI 108/C8).
- Synthesized note playback and exact MIDI/octave-sensitive answer checking.
- Selectable learner profiles on one browser, with isolated completion, attempts, assessment scores, and answer history per profile.\n- Direct lesson selection without score-based lesson locks; cumulative practice can include the current and earlier note lessons.\n- Lesson navigation, versioned browser progress, per-note attempt/accuracy stats, and saved assessment summaries.
- Responsive layout, focus states, and reduced-motion support.

## Tests

```bash
npm run check
```

## Documentation

- [User guide (Persian / English)](docs/USER_GUIDE.md)

- [Architecture](docs/ARCHITECTURE.md)
- [Curriculum and music conventions](docs/CURRICULUM.md)

## Privacy and scope

Learner profiles and their progress stay in this browser’s localStorage. Profiles are local learner spaces, not authenticated accounts, and do not sync between devices or browsers. Audio is a synthesized sine tone. The notation view is a single-note teaching renderer, not a full score engraving engine.
