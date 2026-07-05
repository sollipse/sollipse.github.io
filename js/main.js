/* main.js — UI, scroll reveals, audio engine
   HYO KANG — sollipse.github.io */

const PARAMS = new URLSearchParams(location.search);

// two field treatments — the wave-field ocean is the default;
// ?blob switches to the fibonacci camel-hump experiment
const FIELD_MODULE = PARAMS.has("blob") ? "./blob.js" : "./field.js";
const { createField } = await import(FIELD_MODULE);

/* ——— FX switches — modular experiments ———
   URL:      ?agc=off       raw spectrum (beat-dominant)
   console:  fx.agc(false)  — back to the raw spectrum */
const FX = {
  agc: true, // per-band auto gain: melody pulls as hard as the kick
};
if (PARAMS.get("agc") === "off") FX.agc = false;

const $ = (s) => document.querySelector(s);
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

// test hook: ?still renders everything revealed, no transitions (screenshots)
if (location.search.includes("still")) document.documentElement.classList.add("still");

/* ——— particle field ——— */

const canvas = $("#field");
let field = null;
try {
  field = createField(canvas, { reducedMotion });
} catch (e) {
  field = null;
}
if (!field) canvas.style.opacity = "0.5"; // CSS gradient still carries the mood

// live tweaking from the console
window.fx = {
  agc(on = true) { FX.agc = !!on; },
};


/* ——— hero: word-by-word blur-in ——— */

document.querySelectorAll("[data-words]").forEach((el) => {
  let i = 0;
  const split = (node) => {
    for (const child of [...node.childNodes]) {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        // split on regular spaces only — &nbsp; keeps compound tokens whole
        for (const part of child.textContent.split(/([ \n]+)/)) {
          if (!part) continue;
          if (/^[ \n]+$/.test(part)) {
            frag.appendChild(document.createTextNode(" "));
          } else {
            const w = document.createElement("span");
            w.className = "w";
            w.style.setProperty("--i", i++);
            w.textContent = part;
            frag.appendChild(w);
          }
        }
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        split(child);
      }
    }
  };
  split(el);
});

/* ——— unified scroll engine ———
   hero exit (opacity/blur/lift), timeline beams, node ignition, camera dolly */

const stillMode = document.documentElement.classList.contains("still");
const heroInner = $("#hero-inner");
const groups = [...document.querySelectorAll(".tl-group")].map((g) => ({
  list: g.querySelector(".tl-list"),
  rows: [...g.querySelectorAll(".tl-row")],
}));

let scrollTicking = false;

function onScrollFrame() {
  scrollTicking = false;
  const vh = innerHeight;
  const y = scrollY;

  if (field) field.setScroll(Math.min(y / vh, 4));

  // HUD corners become control bars once the hero starts leaving
  document.documentElement.classList.toggle("scrolled", y > vh * 0.3);

  // veil: base tint over the hero → near-opaque midnight over the timeline
  const vp = Math.min(Math.max((y - vh * 0.9) / (vh * 0.4), 0), 1);
  document.documentElement.style.setProperty("--veil", (0.36 + vp * 0.58).toFixed(3));

  // hero hands off to the timeline: lift, dim, defocus — the field stays alive
  if (heroInner && !stillMode && !reducedMotion) {
    const p = Math.min(Math.max(y / (vh * 0.85), 0), 1);
    heroInner.style.opacity = String(1 - p * 1.02);
    heroInner.style.transform = `translateY(${p * -64}px)`;
    heroInner.style.filter = p > 0.01 ? `blur(${p * 7}px)` : "none";
    // backing shadow fades out seamlessly over the first quarter viewport
    const hs = Math.max(0, 1 - y / (vh * 0.25));
    heroInner.style.setProperty("--hs-a", (0.85 * hs).toFixed(3));
  }

  // timeline: beam draws to the read-line; nodes ignite as it passes them
  const readY = vh * 0.42;
  for (const g of groups) {
    if (!g.list) continue;
    const r = g.list.getBoundingClientRect();
    const p = Math.min(Math.max((readY - r.top) / r.height, 0), 1);
    g.list.style.setProperty("--p", p.toFixed(4));
    for (const row of g.rows) {
      const rr = row.getBoundingClientRect();
      row.classList.toggle("lit", rr.top + 14 < readY);
    }
  }
}

function requestScrollFrame() {
  if (!scrollTicking) {
    scrollTicking = true;
    requestAnimationFrame(onScrollFrame);
  }
}

addEventListener("scroll", requestScrollFrame, { passive: true });
addEventListener("resize", requestScrollFrame, { passive: true });
onScrollFrame();

/* ——— scroll reveals ——— */

const io = new IntersectionObserver(
  (entries) => {
    for (const en of entries) {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        io.unobserve(en.target);
      }
    }
  },
  { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ——— audio engine ——— */

// playlist — tracks play in sequence and wrap around; clicking the
// track title in the HUD skips ahead. To add a song, drop the mp3 in
// /assets/audio and append a line here.
const PLAYLIST = [
  { title: "MAX COOPER, RESYNTHESIS", src: "/assets/audio/resynthesis.mp3" },
  { title: "MAX COOPER, SUPINE", src: "/assets/audio/supine.mp3" },
];

const BANDS = field ? field.bandCount : 24;
const audioEl = $("#audio");
const soundBtn = $("#sound");
const soundLabel = soundBtn.querySelector(".sound-label");
const trackLine = $("#track");
const trackState = $("#track-state");
const trackTitle = $("#track-title");
const footAudio = $("#foot-audio");

let ctx = null, analyser = null, gain = null;
let freqData = null;
const bands = new Float32Array(BANDS);
const smoothed = new Float32Array(BANDS);
const agcPeak = new Float32Array(BANDS).fill(0.12); // per-band running peak
let bandEdges = null;
let level = 0, lastFrameAt = 0;
let playing = false;

function buildAudioGraph() {
  ctx = new (window.AudioContext || window.webkitAudioContext)();
  const src = ctx.createMediaElementSource(audioEl);
  analyser = ctx.createAnalyser();
  analyser.fftSize = 2048;
  analyser.smoothingTimeConstant = 0.78;
  gain = ctx.createGain();
  gain.gain.value = 0;
  src.connect(analyser);
  analyser.connect(gain);
  gain.connect(ctx.destination);
  freqData = new Uint8Array(analyser.frequencyBinCount);

  // log-spaced band edges, 32 Hz … 13.5 kHz
  const nyq = ctx.sampleRate / 2;
  const f0 = 32, f1 = Math.min(13500, nyq * 0.92);
  bandEdges = new Array(BANDS + 1);
  for (let i = 0; i <= BANDS; i++) {
    const f = f0 * Math.pow(f1 / f0, i / BANDS);
    bandEdges[i] = Math.min(
      analyser.frequencyBinCount - 1,
      Math.max(1, Math.round((f / nyq) * analyser.frequencyBinCount))
    );
  }
}

function audioFrame() {
  analyser.getByteFrequencyData(freqData);

  const now = performance.now();
  const dt = Math.min((now - (lastFrameAt || now)) / 1000, 0.05);
  lastFrameAt = now;
  // dt-normalized damping: musical tails instead of per-frame snaps
  const release = Math.exp(-dt * 3.1);  // ~320ms tau
  const attack = 1 - Math.exp(-dt * 22);

  const agcDecay = Math.exp(-dt / 4); // peaks remember ~4s of music

  let sum = 0;
  for (let i = 0; i < BANDS; i++) {
    const a = bandEdges[i], b = Math.max(bandEdges[i + 1], bandEdges[i] + 1);
    let s = 0;
    for (let j = a; j < b; j++) s += freqData[j];
    let v = s / (b - a) / 255;
    if (FX.agc) {
      // per-band auto gain: each band rides against its own recent peak, so
      // pads, melody and texture move the sea as hard as the kick drum does
      const pk = (agcPeak[i] = Math.max(v, agcPeak[i] * agcDecay));
      v = Math.pow(v / (pk + 0.1), 1.35) * 0.92;
    } else {
      v = Math.pow(v, 1.5) * (0.75 + (i / (BANDS - 1)) * 1.15); // perceptual lift for highs
    }
    v = Math.min(v, 1);
    // smooth attack, damped exponential release — no jerking back
    smoothed[i] = v > smoothed[i]
      ? smoothed[i] + (v - smoothed[i]) * attack
      : Math.max(v, smoothed[i] * release);
    bands[i] = smoothed[i];
    sum += smoothed[i];
  }
  // AGC-normalized bands run hotter on average — temper the level sum
  level = Math.min((sum / BANDS) * (FX.agc ? 1.5 : 1.9), 1);

  const bass = (bands[0] + bands[1] + bands[2]) / 3;
  const mid = (bands[9] + bands[11] + bands[13]) / 3;
  const air = (bands[19] + bands[21] + bands[23]) / 3;

  // spectral centroid — the music's brightness steers wavelength & direction
  let esum = 0, wsum = 0;
  for (let i = 0; i < BANDS; i++) {
    esum += bands[i];
    wsum += bands[i] * (i / (BANDS - 1));
  }
  const centroid = esum > 0.001 ? wsum / esum : 0.45;

  return { bands, level, bass, mid, air, centroid };
}

async function toggleSound() {
  if (!playing) {
    if (!ctx) {
      try {
        buildAudioGraph();
      } catch (e) {
        soundBtn.disabled = true;
        return;
      }
    }
    try {
      if (ctx.state === "suspended") await ctx.resume();
      await audioEl.play();
    } catch (e) {
      return; // autoplay refused or fetch failed — stay off
    }
    playing = true;
    gain.gain.cancelScheduledValues(ctx.currentTime);
    gain.gain.setTargetAtTime(0.9, ctx.currentTime, 0.35);
    soundBtn.setAttribute("aria-pressed", "true");
    soundBtn.setAttribute("aria-label", "Pause music");
    soundLabel.innerHTML = "SOUND&nbsp;OFF";
    trackState.textContent = "NOW PLAYING";
    trackLine.classList.add("live");
    if (field) field.setAudioProvider(audioFrame);
  } else {
    playing = false;
    gain.gain.cancelScheduledValues(ctx.currentTime);
    gain.gain.setTargetAtTime(0, ctx.currentTime, 0.18);
    setTimeout(() => { if (!playing) audioEl.pause(); }, 700);
    soundBtn.setAttribute("aria-pressed", "false");
    soundBtn.setAttribute("aria-label", "Play music and enable the audio visualizer");
    soundLabel.innerHTML = "SOUND&nbsp;ON";
    trackState.textContent = "PAUSED";
    trackLine.classList.remove("live");
    if (field) field.setAudioProvider(null);
  }
}

soundBtn.addEventListener("click", toggleSound);

/* ——— playlist: sequence + manual switch ——— */

let trackIndex = 0;

function loadTrack(i) {
  trackIndex = ((i % PLAYLIST.length) + PLAYLIST.length) % PLAYLIST.length;
  const t = PLAYLIST[trackIndex];
  audioEl.src = t.src;
  trackTitle.textContent = t.title;
  if (footAudio) footAudio.textContent = `AUDIO — ${t.title}`;
}

async function switchTrack(i) {
  const wasPlaying = playing;
  loadTrack(i);
  if (wasPlaying) {
    try {
      await audioEl.play();
    } catch (e) {
      toggleSound(); // fetch failed or playback refused — settle into paused
    }
  }
}

audioEl.addEventListener("ended", () => switchTrack(trackIndex + 1));
trackTitle.addEventListener("click", () => switchTrack(trackIndex + 1));
$("#track-next").addEventListener("click", () => switchTrack(trackIndex + 1));
$("#track-prev").addEventListener("click", () => switchTrack(trackIndex - 1));
loadTrack(0);

// test hook: ?fakeaudio drives the field with synthetic bands (no sound)
if (field && location.search.includes("fakeaudio")) {
  const fake = new Float32Array(BANDS);
  const t0 = performance.now();
  field.setAudioProvider(() => {
    const t = (performance.now() - t0) / 1000;
    for (let i = 0; i < BANDS; i++) {
      fake[i] = Math.max(0, 0.45 + 0.5 * Math.sin(t * 2.6 + i * 0.55) - i * 0.006);
    }
    return {
      bands: fake,
      level: 0.45 + 0.25 * Math.sin(t * 0.9),
      bass: 0.45 + 0.4 * Math.sin(t * 2.1),
      mid: 0.4 + 0.3 * Math.sin(t * 3.3 + 1),
      air: 0.3 + 0.3 * Math.sin(t * 4.7 + 2),
      centroid: 0.45 + 0.2 * Math.sin(t * 0.5),
    };
  });
}

/* ——— video rows: hover slides open, one click plays inline ——— */

document.querySelectorAll(".row-video").forEach((row) => {
  const frame = row.querySelector(".row-media-frame");
  const id = row.dataset.video;
  let hydrated = false, vidPlaying = false;

  const hydrate = () => {
    if (hydrated) return;
    hydrated = true;
    frame.style.backgroundImage = `url("https://i.ytimg.com/vi/${id}/hqdefault.jpg")`;
    const hi = new Image(); // upgrade to maxres when it exists
    hi.onload = () => { if (hi.width > 320) frame.style.backgroundImage = `url("${hi.src}")`; };
    hi.src = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
  };

  const close = () => {
    vidPlaying = false;
    frame.querySelectorAll("iframe, .row-media-close").forEach((n) => n.remove());
    row.classList.remove("open", "playing");
    row.setAttribute("aria-expanded", "false");
  };
  row.__closeVideo = close;

  const play = () => {
    if (vidPlaying) return;
    hydrate();
    vidPlaying = true;
    // one player at a time
    document.querySelectorAll(".row-video.open").forEach((o) => {
      if (o !== row && o.__closeVideo) o.__closeVideo();
    });
    // duck the site music
    if (playing) toggleSound();
    row.classList.add("open", "playing");
    row.setAttribute("aria-expanded", "true");

    const ifr = document.createElement("iframe");
    ifr.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    ifr.allow = "autoplay; encrypted-media; picture-in-picture";
    ifr.allowFullscreen = true;
    ifr.title = row.getAttribute("aria-label") || "Launch video";
    frame.appendChild(ifr);

    const btn = document.createElement("button");
    btn.className = "row-media-close mono";
    btn.textContent = "CLOSE ✕";
    btn.setAttribute("aria-label", "Close video");
    btn.addEventListener("click", (e) => { e.stopPropagation(); close(); });
    frame.appendChild(btn);
  };

  row.addEventListener("pointerenter", hydrate);
  row.addEventListener("focus", hydrate);
  row.addEventListener("click", (e) => {
    if (e.target.closest(".row-media-close")) return;
    play();
  });
  row.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); play(); }
    if (e.key === "Escape") close();
  });
});

/* ——— footer year ——— */

const yearEl = document.querySelector(".foot span");
if (yearEl) yearEl.textContent = `© ${new Date().getFullYear()} HYO KANG`;
