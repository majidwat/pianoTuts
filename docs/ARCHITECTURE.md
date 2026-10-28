# Naghmeh architecture

Naghmeh is a static ES-module educational app. It requires no bundler or backend and can be served from any static host.

- `index.html`: semantic app shell, bilingual controls, curriculum/lesson regions, and the 88-key keyboard host.
- `styles.css`: responsive visual system, RTL/LTR layout, key styling, focus states, and reduced-motion support.
- `src/curriculum.js`: canonical lesson data with unique stable IDs, clefs, MIDI pitches, and Persian/English explanations.
- `src/music.js`: MIDI/note/octave conversion, equal-tempered frequency mapping, diatonic staff coordinates, and inline SVG notation.
- `src/practice.js`: reusable quiz generation, exact MIDI answer checking, and score/accuracy summaries.
- `src/progress.js`: versioned progress schema, legacy v1 migration, completion/resume state, per-note attempts, assessment history, and storage-failure handling.
- `src/app.js`: UI orchestration, curriculum navigation, practice and quiz flows, Web Audio playback, localization, and PWA registration.
- `sw.js` / `manifest.webmanifest` / `icon.svg`: installable app metadata and offline app-shell cache.
- `tests/music.test.js`: note conversion, clef line/space geometry, ledger positions, and SVG output.
- `tests/progress-practice.test.js`: quiz question generation, score calculations, progress migration, persistence, and storage failure behavior.

## Canonical musical data

MIDI pitch is the canonical identity for each note. The same pitch drives staff placement, virtual-key mapping, audio frequency, answer checking, and lesson records. Note identity includes octave. Treble staff bottom line is E4; bass staff bottom line is G2. Middle C4 is ledgered below treble and above bass; C3 is a space in the bass staff.

## Progress and assessment

Progress is stored in localStorage under schema version 2. The reader also migrates the earlier v1 completed-ID array. The state includes completed lesson IDs, last visited lesson, per-note attempt/correct counts, and a bounded assessment history. Invalid JSON and storage exceptions degrade to an empty in-memory state instead of crashing the app.

The mixed assessment selects up to ten unique lessons per attempt. Quiz responses are checked against exact MIDI values; the completion summary includes score and accuracy. The course-wide accuracy indicator derives from stored attempt records.

## Accessibility & localization

Semantic buttons, accessible piano-key labels, focus-visible states, live feedback, Persian RTL and English LTR direction, and reduced-motion preferences are supported. Piano keys can be operated as standard buttons with keyboard activation.

## Offline behavior

On supported HTTPS origins, the service worker caches the app shell and uses cached resources when the network is unavailable. Progress remains browser-local; no cloud sync is included.

## Limitations

The app uses synthesized sine tones, not sampled piano audio. The SVG renderer is for single-note teaching and does not engrave complete scores, rhythms, key signatures, or complex accidental notation. There are no accounts, server API, cross-device sync, or microphone pitch detection.
