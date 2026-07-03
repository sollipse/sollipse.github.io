/* field.js — audio-reactive particle ocean
   ~100k GPU-displaced points. All motion lives in the vertex shader;
   the CPU only feeds a handful of uniforms per frame. */

import * as THREE from "../vendor/three.module.min.js";

const BANDS = 24;

const VERT = /* glsl */ `
  attribute float aR;          // per-point random 0..1
  uniform float uTime;
  uniform float uAmp;          // global motion multiplier
  uniform float uLevel;        // overall loudness 0..1
  uniform float uBass, uMid, uAir;
  uniform float uMusic;        // 0 idle -> 1 music owns the surface
  uniform float uBeatT;        // musical time — advances with the music's energy
  uniform float uCentroid;     // spectral brightness 0..1 — bends the wavelengths
  uniform float uBands[${BANDS}];
  uniform float uPx;           // point scale (dpr-aware)
  uniform float uZMin, uZMax;  // grid depth range
  varying float vA;            // alpha
  varying float vE;            // energy (hue mix)
  varying vec3 vHue;           // spectral color for this vertex

  void main() {
    vec3 p = position;
    float t = uTime;
    float rn = clamp((uZMax - position.z) / (uZMax - uZMin), 0.0, 1.0);

    // ————— gerstner waves PLAYED BY THE MUSIC —————
    // amplitude of each component = a band envelope (damped, no jerk);
    // phase advances on uBeatT, the musical clock — loud music rolls the sea
    // fast, quiet music stills it. Nothing is emitted; nothing is random.
    float idle = 1.0 - uMusic;
    float breathe = 1.0 + 0.18 * sin(t * 0.10);
    float bt = uBeatT;

    // bass owns the long swell, mids the chop, air the short shimmer
    float A1 = 2.6 * breathe * idle + uBass * 3.8;
    float A2 = 1.8 * breathe * idle + uMid  * 2.7;
    float A3 = 0.9 * idle           + uAir  * 1.7;

    // spectral brightness bends the wavelengths: dark = long, bright = short
    float kMod = 1.0 + (uCentroid - 0.45) * 0.6;

    // ...and steers the swell: the sea's direction drifts with the music's tone
    float ang = (uCentroid - 0.45) * 0.9;
    mat2 R = mat2(cos(ang), -sin(ang), sin(ang), cos(ang));
    vec2 D1 = R * vec2(0.913, 0.407);
    vec2 D2 = R * vec2(-0.447, 0.894);
    vec2 D3 = R * vec2(0.196, -0.981);

    // domain warp — wave phases live in a slowly meandering coordinate space,
    // so crests bend and wander instead of drawing straight lines
    float wt = t * 0.07 + bt * 0.05;
    vec2 q = position.xz
      + 15.0 * vec2(sin(position.z * 0.021 + wt * 1.7), cos(position.x * 0.018 - wt * 1.3))
      + 9.0  * vec2(sin((position.x + position.z) * 0.013 - wt), cos((position.x - position.z) * 0.011 + wt * 0.8));

    float ph1 = dot(D1, q) * 0.042 * kMod + bt * 0.62;
    float ph2 = dot(D2, q) * 0.027 * kMod - bt * 0.45;
    float ph3 = dot(D3, q) * 0.075 * kMod + bt * 0.92;

    // orbital motion: crests pull particles through ellipses, real-water style
    p.x += (D1.x * cos(ph1) * A1 + D2.x * cos(ph2) * A2 + D3.x * cos(ph3) * A3) * 0.85 * uAmp;
    p.z += (D1.y * cos(ph1) * A1 + D2.y * cos(ph2) * A2 + D3.y * cos(ph3) * A3) * 0.85 * uAmp;
    float y = sin(ph1) * A1 + sin(ph2) * A2 + sin(ph3) * A3;

    // slow cross-currents — faint ambient texture, calmer under music
    p.x += sin(position.z * 0.011 + t * 0.15) * 2.4 * (0.4 + 0.6 * idle) * uAmp;
    p.z += cos(position.x * 0.008 - t * 0.11) * 1.6 * (0.4 + 0.6 * idle) * uAmp;

    // ————— the spectrum, spatialized: a FIELD of waves, no origin —————
    // each depth region is one band of the waveform: lows roll long and slow
    // through the near field, highs shimmer short and fast at the horizon.
    // amplitude = that band's envelope; speed & wavelength = its frequency.
    float fb = rn * float(${BANDS} - 1);
    int i0 = int(floor(fb));
    float band = mix(uBands[i0], uBands[i0 + 1 > ${BANDS - 1} ? ${BANDS - 1} : i0 + 1], fract(fb));

    float kx  = mix(0.018, 0.085, rn) * kMod;   // wavelength from band pitch
    float spd = mix(0.55, 2.8, rn);             // phase speed from band pitch
    float phF = q.x * kx + bt * spd + aR * 0.9;
    float phG = (q.x * 0.6 + q.y * 0.8) * kx * 0.8 - bt * spd * 0.8 + 1.3;

    y += band * sin(phF) * (3.6 - rn * 1.2) * uMusic;     // lows carry more water
    y += band * sin(phG) * (1.7 - rn * 0.6) * uMusic;

    // directional surge along the wave train (orbital, never radial)
    p.x += band * cos(phF) * 1.3 * uMusic * uAmp;
    p.z += band * cos(phG) * 0.9 * uMusic * uAmp;

    // lateral swim rides the slow level envelope — momentum, not jitter
    float sw = (band * 0.4 + uLevel * 0.6) * uMusic;
    p.x += sin(aR * 6.2831 + bt * 0.5 + position.z * 0.050) * sw * 2.6 * uAmp;
    p.z += cos(aR * 4.712 + bt * 0.4 + position.x * 0.045) * sw * 2.2 * uAmp;

    // stochastic wander: every particle drifts on its own random heading,
    // paced by the musical clock and scaled by its band's energy
    float wa = aR * 6.2831 + position.x * 0.013 + position.z * 0.017;
    float wAmp = 0.7 * idle + (band * 1.7 + uLevel * 0.7) * uMusic;
    p.x += sin(bt * (0.45 + aR * 0.75) + wa)       * wAmp * 1.9 * uAmp;
    p.z += cos(bt * (0.35 + aR * 0.65) + wa * 1.7) * wAmp * 1.5 * uAmp;
    p.y += sin(bt * (0.30 + aR * 0.55) + wa * 2.3) * wAmp * 0.5 * uAmp;

    p.y += y * uAmp;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    // crests glow: energy follows the actual height of the water here
    float crest = clamp(y * 0.10, 0.0, 0.65);
    float e = clamp(band * 1.05 + crest + uBass * 0.2, 0.0, 1.0) * (0.25 + 0.75 * uMusic);
    vE = e;

    // spectral hue: where this vertex sits in the waveform decides its color —
    // bass runs ember, mids gold, treble blue. vE gates it, so white at rest.
    vec3 CB = vec3(1.0, 0.302, 0.0);     // ember  — bass, near field
    vec3 CG = vec3(1.0, 0.678, 0.2);     // gold   — mids
    vec3 CA = vec3(0.369, 0.620, 1.0);   // blue   — treble, from mid-field out
    vec3 hue = rn < 0.35 ? mix(CB, CG, rn / 0.35)
             : rn < 0.75 ? mix(CG, CA, (rn - 0.35) / 0.40)
             : CA;
    // bright passages wash the whole sea toward blue (spectral centroid)
    hue = mix(hue, CA, clamp((uCentroid - 0.48) * 1.6, 0.0, 0.55) * uMusic);
    // treble energy itself cools even the near field
    hue = mix(hue, CA, clamp(uAir * 0.7, 0.0, 0.4));
    vHue = hue;

    // manual depth fade (fog) + slight per-point variance
    float fog = exp(-max(-mv.z - 40.0, 0.0) * 0.0048);
    vA = (0.4 + 0.6 * fog) * (0.6 + 0.4 * aR) * (0.62 + 0.38 * fog);

    float size = uPx * (1.6 + e * 2.4) * (0.75 + 0.5 * aR);
    gl_PointSize = clamp(size * (150.0 / max(-mv.z, 1.0)), 0.6, 7.0 * uPx);
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3 uInk;
  varying float vA;
  varying float vE;
  varying vec3 vHue;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    float dot = smoothstep(0.5, 0.16, r);
    if (dot < 0.02) discard;
    vec3 col = mix(uInk, vHue, vE); // white at rest, spectral color with energy
    gl_FragColor = vec4(col, dot * vA);
  }
`;

export function createField(canvas, opts = {}) {
  const reduced = !!opts.reducedMotion;
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      powerPreference: "high-performance",
      failIfMajorPerformanceCaveat: false,
    });
  } catch (e) {
    return null; // caller falls back to the CSS gradient
  }

  const small = Math.min(innerWidth, innerHeight) < 700 || /Mobi|Android/i.test(navigator.userAgent);
  let dpr = Math.min(devicePixelRatio || 1, small ? 1.75 : 2);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 1, 900);
  const CAM = { x: 0, y: 27, z: 150 };
  camera.position.set(CAM.x, CAM.y, CAM.z);

  // wide enough that the field always spills past the viewport edges
  const X_SPAN = 560, Z_MIN = -430, Z_MAX = 112;

  const uniforms = {
    uTime:  { value: 0 },
    uAmp:   { value: reduced ? 0.45 : 1 },
    uLevel: { value: 0 },
    uBass:  { value: 0 },
    uMid:   { value: 0 },
    uAir:   { value: 0 },
    uMusic: { value: 0 },
    uBeatT: { value: 0 },
    uCentroid: { value: 0.45 },
    uBands: { value: new Float32Array(BANDS) },
    uPx:    { value: dpr },
    uZMin:  { value: Z_MIN },
    uZMax:  { value: Z_MAX },
    uInk:    { value: new THREE.Color(0.85, 0.84, 0.82) },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: VERT,
    fragmentShader: FRAG,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  });

  let points = null;

  function buildGrid(cols, rows) {
    if (points) {
      scene.remove(points);
      points.geometry.dispose();
    }
    const n = cols * rows;
    const pos = new Float32Array(n * 3);
    const rnd = new Float32Array(n);
    // stratified scatter: one point ANYWHERE inside each cell — uniform
    // coverage with zero row/column structure, so no linear strata can form
    const cellW = X_SPAN / cols;
    const cellD = (Z_MAX - Z_MIN) / rows;
    let k = 0;
    for (let r = 0; r < rows; r++) {
      const z0 = Z_MIN + cellD * r;
      for (let c = 0; c < cols; c++) {
        pos[k * 3]     = -X_SPAN / 2 + cellW * (c + Math.random());
        pos[k * 3 + 1] = 0;
        pos[k * 3 + 2] = z0 + cellD * Math.random();
        rnd[k] = Math.random();
        k++;
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aR", new THREE.BufferAttribute(rnd, 1));
    points = new THREE.Points(geo, material);
    points.frustumCulled = false;
    scene.add(points);
  }

  let cols = small ? 304 : 560;
  let rows = small ? 144 : 248;
  buildGrid(cols, rows);

  // ——— state fed from outside ———
  let audioProvider = null; // () => {bands: Float32Array, level, bass, mid, air, centroid}
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  let scrollN = 0;

  function resize() {
    const w = canvas.clientWidth || innerWidth;
    const h = canvas.clientHeight || innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  addEventListener("resize", resize, { passive: true });

  // ——— frame loop ———
  const clock = new THREE.Clock();
  let raf = 0, running = false;
  let frames = 0, slowFrames = 0, degraded = 0;

  function frame() {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(clock.getDelta(), 0.05);
    // reduced motion: hold time still (static field) unless the user has
    // opted into the audio visualizer — then move gently
    uniforms.uTime.value += reduced ? (audioProvider ? dt * 0.4 : 0) : dt;

    // audio
    if (audioProvider) {
      const a = audioProvider();
      if (a) {
        uniforms.uBands.value.set(a.bands);
        uniforms.uLevel.value = a.level;
        uniforms.uBass.value = a.bass || 0;
        uniforms.uMid.value = a.mid || 0;
        uniforms.uAir.value = a.air || 0;
        if (a.centroid !== undefined) {
          uniforms.uCentroid.value += (a.centroid - uniforms.uCentroid.value) * (1 - Math.exp(-dt * 3));
        }
      }
    } else {
      // audio stopped: envelopes drain slowly back to the idle sea
      const drain = Math.exp(-dt * 1.9);
      uniforms.uLevel.value *= drain;
      uniforms.uBass.value *= drain;
      uniforms.uMid.value *= drain;
      uniforms.uAir.value *= drain;
      const b = uniforms.uBands.value;
      for (let i = 0; i < BANDS; i++) b[i] *= drain;
      uniforms.uCentroid.value += (0.45 - uniforms.uCentroid.value) * (1 - Math.exp(-dt * 0.8));
    }

    // music envelope: idle swell crossfades out as the music takes the surface
    const mTarget = audioProvider ? 1 : 0;
    uniforms.uMusic.value += (mTarget - uniforms.uMusic.value) * (1 - Math.exp(-dt * 1.4));

    // the musical clock: loud music rolls the sea fast, silence stills it —
    // this is what makes wave FREQUENCY follow the music, continuously
    const u = uniforms;
    const rate = 0.35 + u.uLevel.value * 2.2 + u.uBass.value * 1.3;
    u.uBeatT.value += dt * (reduced && !audioProvider ? 0 : rate);

    // fixed framing — only the scroll dolly moves the camera
    camera.position.x = CAM.x;
    camera.position.y = CAM.y + scrollN * 9;
    camera.position.z = CAM.z + scrollN * 6;
    camera.lookAt(0, -7 + scrollN * -4, -170);

    renderer.render(scene, camera);

    // one-way perf degrade: dpr first, then grid density
    if (++frames > 90 && degraded < 2) {
      if (dt > 0.034) slowFrames++;
      if (slowFrames > 45) {
        slowFrames = 0;
        degraded++;
        if (degraded === 1) {
          dpr = 1;
          renderer.setPixelRatio(1);
          uniforms.uPx.value = 1.25; // keep dots visible at dpr 1
        } else {
          cols = Math.floor(cols / 1.6);
          rows = Math.floor(rows / 1.6);
          buildGrid(cols, rows);
        }
      }
    }
  }

  function start() {
    if (running) return;
    running = true;
    clock.start();
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });

  // paint one frame synchronously so the field exists at first paint,
  // before the rAF loop takes over
  uniforms.uTime.value = 7.3;
  camera.lookAt(0, -7, -170);
  renderer.render(scene, camera);
  start();

  return {
    setAudioProvider(fn) {
      audioProvider = fn;
    },
    setPointer(nx, ny) { pointer.tx = nx; pointer.ty = ny; },
    setScroll(n) { scrollN = n; },
    bandCount: BANDS,
  };
}
