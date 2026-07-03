# sollipse.github.io

Hyo Kang — Builder. https://sollipse.github.io/

Hand-built: one HTML file, one stylesheet, vanilla ES modules + three.js. No
framework, no build step — what's in the repo is what ships.

- `js/field.js` — audio-reactive particle ocean (~100k GPU-displaced points,
  custom vertex/fragment shaders; FFT bands mapped across the field's depth).
- `js/main.js` — UI, scroll reveals, WebAudio analyser → shader uniforms.
- `service-worker.js` — self-destructing; evicts the old CRA precache from
  returning visitors.
- Audio: Max Cooper — Resynthesis.

Local dev: `python3 -m http.server` and open `http://localhost:8000`.
