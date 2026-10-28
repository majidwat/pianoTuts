# Testing and validation

## Local checks

Use Node.js 18 or newer:

```bash
npm run check
```

This runs JavaScript syntax checks for the application and music/curriculum modules, followed by Node's built-in test runner.

The test suite currently covers:

- MIDI/note-name/octave round-trips and the A0/C8 range boundaries.
- A4 = 440 Hz and octave-sensitive answer comparison.
- Treble and bass line/space staff-step mapping.
- Ledger-line SVG output, including C4 above bass and below treble.
- Sharp accidental SVG rendering.
- Curriculum lesson and unique-ID invariants.
- Bounded, non-duplicate quiz generation and score/accuracy summaries.
- Legacy progress migration, invalid JSON, resume state, attempt counts, assessment persistence, and storage exceptions.

## Continuous integration

GitHub Actions runs `npm run check` on pushes to `main` and pull requests. The current verified run is linked from the repository's Actions tab.

## Browser checks

The current repository CI is headless Node-based. It does not automate real-browser visual snapshots or screen-reader testing. Before a production release, test the UI in current Chromium, Firefox, and Safari, including mobile viewport widths, audio gesture behavior, install prompts, and offline startup after the first successful load.
