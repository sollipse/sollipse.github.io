---
name: verify
description: Build/launch/drive recipe for verifying changes to this static site (sollipse.github.io) at runtime.
---

# Verifying this site

Static site — no build step. Serve the repo root and drive it in a headless browser.

## Serve

Use a server with HTTP Range support (`python3 -m http.server` lacks it — media
seeking silently stalls in Chromium, which breaks any test that seeks the
`<audio>` element; GitHub Pages prod does support ranges):

```bash
npx http-server -p 8420 -a 127.0.0.1 -c-1 --silent .
```

## Drive

Playwright Chromium works (install into a scratchpad dir: `npm i playwright &&
npx playwright install chromium`). Launch with
`--autoplay-policy=no-user-gesture-required`; audio + WebAudio analyser work
headless, and the particle field reacts.

Useful page hooks:
- `?fakeaudio` — drives the visualizer with synthetic bands, no sound
- `?still` — everything revealed, no transitions (screenshots)
- `?blob` — alternate field treatment (blob.js instead of field.js)

Key elements: `#sound` (play/pause toggle), `#track-title` (next-track button),
`#track-state` (PAUSED / NOW PLAYING), `#foot-audio` (footer credit),
`#audio` (media element; `PLAYLIST` array lives in js/main.js).

To test auto-advance without waiting out a track:
`audio.currentTime = audio.duration - 0.6` then wait for the src to change.

## Gotchas

- ES modules + top-level await in js/main.js — must be served over HTTP, not file://
- service-worker.js is a self-destructing cleanup worker; no caching to bust
