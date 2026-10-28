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
- Independent lesson groups for treble and bass line/space notes, ledger examples, octaves, five sharp-note lessons, and review.
- Inline SVG notation rendering; no external notation image dependencies.
- Full 88-key piano range (MIDI 21/A0 through MIDI 108/C8).
- Synthesized note playback and exact MIDI/octave-sensitive answer checking.
- Lesson navigation and local browser progress persistence.
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

Learning progress stays in browser localStorage; no backend, account, or cloud sync is present. Audio is a synthesized sine tone. The notation view is a single-note teaching renderer, not a full score engraving engine.
