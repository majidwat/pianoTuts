# Naghmeh architecture

Naghmeh is a static ES-module learning app. No bundler or backend is required.

- `index.html`: semantic app shell and page regions.
- `styles.css`: responsive layout, theme, piano styling, focus treatment.
- `src/curriculum.js`: canonical note curriculum, stable lesson IDs, localization.
- `src/music.js`: MIDI pitch conversion, frequency math, diatonic staff placement, SVG staff drawing.
- `src/app.js`: curriculum navigation, lesson UI, practice validation, Web Audio, and local progress.
- `tests/music.test.js`: Node built-in test coverage for music/curriculum invariants.

## Data flow

Each lesson stores MIDI pitch as its canonical identity. That same value drives notation, piano selection, and audio. Input comparison is MIDI- and octave-sensitive. Browser localStorage stores completed lesson IDs; storage errors are handled without disabling the app.

## Accessibility & localization

Semantic buttons, focus-visible styles, status feedback, RTL Persian and LTR English direction, and reduced-motion preferences are supported.

## Limitations

The app uses synthesized sine tones, not piano samples. The SVG is an educational single-note renderer, not a full score engraving engine. There are no accounts, cloud sync, server API, or cross-device persistence.