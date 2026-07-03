/* blob.js — fibonacci-phyllotaxis particle blob (alternate treatment)
   Points sit on a golden-angle spiral sphere; protrusions are parastichy
   waves at Fibonacci frequencies (8 / 13 / 21 lobes), amplitudes owned by
   bass / mids / treble on the musical clock. Same contract as field.js. */

import * as THREE from "../vendor/three.module.min.js";

const BANDS = 24;
const HUMPS = 13; // fibonacci count of camel humps
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

const VERT = /* glsl */ `
  attribute float aR;          // per-point random 0..1
  attribute float aFi;         // spiral fraction 0..1 (pole to pole)
  uniform float uTime;
  uniform float uAmp;
  uniform float uLevel;
  uniform float uBass, uMid, uAir;
  uniform float uMusic;        // 0 idle -> 1 music owns the surface
  uniform float uBeatT;        // musical clock
  uniform float uCentroid;     // spectral brightness
  uniform float uR;            // base radius
  uniform float uN;            // total point count (recovers the spiral index)
  uniform float uPx;
  uniform vec3  uHumpDir[${HUMPS}];   // golden-angle scattered hump headings
  uniform float uHumpMag[${HUMPS}];   // randomized magnitudes
  uniform float uHumpSharp[${HUMPS}]; // broad bass domes … sharp treble knuckles
  uniform float uHumpBand[${HUMPS}];  // which band each hump listens to
  uniform float uBands[${BANDS}];
  varying float vA;
  varying float vE;
  varying vec3 vHue;

  void main() {
    float t = uTime;
    float bt = uBeatT;
    float fi = aFi;
    vec3 dir = normalize(position);

    // slow rotation — paced by the musical clock, drifting at idle
    float ry = bt * 0.09 + t * 0.03;
    float cy = cos(ry), sy = sin(ry);
    mat3 RY = mat3(cy, 0.0, -sy,  0.0, 1.0, 0.0,  sy, 0.0, cy);
    float rx = 0.32 + sin(t * 0.05) * 0.05;
    float cx = cos(rx), sx = sin(rx);
    mat3 RX = mat3(1.0, 0.0, 0.0,  0.0, cx, sx,  0.0, -sx, cx);
    mat3 R = RX * RY;

    // this point's slice of the spectrum (spiral runs through all bands)
    float fb = fi * float(${BANDS} - 1);
    int i0 = int(floor(fb));
    float band = mix(uBands[i0], uBands[i0 + 1 > ${BANDS - 1} ? ${BANDS - 1} : i0 + 1], fract(fb));

    // ————— camel humps at fibonacci-scattered headings —————
    // ${HUMPS} gaussian lobes; directions golden-angle spread, magnitudes
    // randomized, each hump rises and falls with its own band's envelope.
    float idle = 1.0 - uMusic;
    float prot = 0.0;
    for (int j = 0; j < ${HUMPS}; j++) {
      float a = dot(dir, uHumpDir[j]);              // angular proximity
      float g = exp((a - 1.0) * uHumpSharp[j]);     // smooth hump falloff
      float be = uBands[int(uHumpBand[j])];         // this hump's band, live
      prot += g * uHumpMag[j] * (0.11 * idle + be * 0.62 * uMusic);
    }

    // faint 21-arm parastichy — fibonacci skin texture, not rings
    float idx = fi * uN;
    prot += sin(6.2831853 * fract(idx / 21.0) + bt * 0.6) * (0.012 + uAir * 0.03);

    float breathe = 1.0 + 0.045 * sin(t * 0.22) * idle;
    prot += band * 0.10 * uMusic       // its region swells with its band
          + (aR - 0.5) * 0.04;         // semirandom skin

    float r = uR * (breathe + prot);
    vec3 p = R * (dir * r);

    // stochastic wander — every point drifts on its own heading, music-paced
    float wa = aR * 6.2831 + fi * 47.0;
    float wAmp = (0.35 * idle + (band * 1.4 + uLevel * 0.6) * uMusic) * 0.9;
    p.x += sin(bt * (0.5 + aR * 0.8) + wa) * wAmp;
    p.y += cos(bt * (0.4 + aR * 0.7) + wa * 1.7) * wAmp * 0.8;
    p.z += sin(bt * (0.45 + aR * 0.6) + wa * 2.3) * wAmp * 0.7;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    // front of the sphere glows, the back recedes — cheap depth
    float facing = dot(normalize(R * dir), vec3(0.0, 0.0, 1.0)) * 0.5 + 0.5;
    vA = (0.16 + 0.84 * facing) * (0.55 + 0.45 * aR);

    float crest = clamp(prot * 2.6, 0.0, 0.65);
    float e = clamp(band * 1.05 + crest + uBass * 0.2, 0.0, 1.0) * (0.25 + 0.75 * uMusic);
    vE = e;

    // spectral hue along the spiral: ember -> gold -> blue; white at rest
    vec3 CB = vec3(1.0, 0.302, 0.0);
    vec3 CG = vec3(1.0, 0.678, 0.2);
    vec3 CA = vec3(0.369, 0.620, 1.0);
    vec3 hue = fi < 0.35 ? mix(CB, CG, fi / 0.35)
             : fi < 0.75 ? mix(CG, CA, (fi - 0.35) / 0.40)
             : CA;
    hue = mix(hue, CA, clamp((uCentroid - 0.48) * 1.6, 0.0, 0.55) * uMusic);
    hue = mix(hue, CA, clamp(uAir * 0.7, 0.0, 0.4));
    vHue = hue;

    float size = uPx * (1.5 + e * 2.4) * (0.75 + 0.5 * aR);
    gl_PointSize = clamp(size * (160.0 / max(-mv.z, 1.0)), 0.6, 7.0 * uPx);
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
    vec3 col = mix(uInk, vHue, vE);
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
    return null;
  }

  const small = Math.min(innerWidth, innerHeight) < 700 || /Mobi|Android/i.test(navigator.userAgent);
  let dpr = Math.min(devicePixelRatio || 1, small ? 1.75 : 2);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 1, 600);
  const CAM = { x: 0, y: 0, z: 118 };
  camera.position.set(CAM.x, CAM.y, CAM.z);

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
    uR:     { value: 31 },
    uN:     { value: 1 },
    uHumpDir:   { value: [] },
    uHumpMag:   { value: new Float32Array(HUMPS) },
    uHumpSharp: { value: new Float32Array(HUMPS) },
    uHumpBand:  { value: new Float32Array(HUMPS) },
    uBands: { value: new Float32Array(BANDS) },
    uPx:    { value: dpr },
    uInk:   { value: new THREE.Color(0.85, 0.84, 0.82) },
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

  // camel humps: golden-angle headings (even "random" spread), random sizes,
  // shuffled band assignments so neighbors don't listen to neighboring bands
  {
    const dirs = [];
    for (let j = 0; j < HUMPS; j++) {
      const fj = (j + 0.5) / HUMPS;
      const yy = 1 - 2 * fj;
      const rr = Math.sqrt(Math.max(0, 1 - yy * yy));
      const th = j * GOLDEN_ANGLE * 7.0; // extra stride scrambles the headings
      dirs.push(new THREE.Vector3(Math.cos(th) * rr, yy, Math.sin(th) * rr).normalize());
      uniforms.uHumpMag.value[j] = 0.5 + Math.random() * 0.95;
      uniforms.uHumpSharp.value[j] = 3.5 + Math.random() * 11;
      uniforms.uHumpBand.value[j] = (j * 7) % BANDS;
    }
    uniforms.uHumpDir.value = dirs;
  }

  let points = null;

  function buildSphere(n) {
    if (points) {
      scene.remove(points);
      points.geometry.dispose();
    }
    const pos = new Float32Array(n * 3);
    const rnd = new Float32Array(n);
    const fis = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const fi = (i + 0.5) / n;
      const y = 1 - 2 * fi;                        // pole to pole
      const rad = Math.sqrt(Math.max(0, 1 - y * y));
      const th = i * GOLDEN_ANGLE;
      const jitter = 1 + (Math.random() - 0.5) * 0.05; // semirandom shell
      pos[i * 3]     = Math.cos(th) * rad * jitter;
      pos[i * 3 + 1] = y * jitter;
      pos[i * 3 + 2] = Math.sin(th) * rad * jitter;
      rnd[i] = Math.random();
      fis[i] = fi;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aR", new THREE.BufferAttribute(rnd, 1));
    geo.setAttribute("aFi", new THREE.BufferAttribute(fis, 1));
    points = new THREE.Points(geo, material);
    points.frustumCulled = false;
    scene.add(points);
    uniforms.uN.value = n;
  }

  let count = small ? 36000 : 96000;
  buildSphere(count);

  let audioProvider = null;
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

  const clock = new THREE.Clock();
  let raf = 0, running = false;
  let frames = 0, slowFrames = 0, degraded = 0;

  function frame() {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(clock.getDelta(), 0.05);
    uniforms.uTime.value += reduced ? (audioProvider ? dt * 0.4 : 0) : dt;

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
      const drain = Math.exp(-dt * 1.9);
      uniforms.uLevel.value *= drain;
      uniforms.uBass.value *= drain;
      uniforms.uMid.value *= drain;
      uniforms.uAir.value *= drain;
      const b = uniforms.uBands.value;
      for (let i = 0; i < BANDS; i++) b[i] *= drain;
      uniforms.uCentroid.value += (0.45 - uniforms.uCentroid.value) * (1 - Math.exp(-dt * 0.8));
    }

    const mTarget = audioProvider ? 1 : 0;
    uniforms.uMusic.value += (mTarget - uniforms.uMusic.value) * (1 - Math.exp(-dt * 1.4));

    const u = uniforms;
    const rate = 0.35 + u.uLevel.value * 2.2 + u.uBass.value * 1.3;
    u.uBeatT.value += dt * (reduced && !audioProvider ? 0 : rate);

    if (!reduced) {
      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;
    }
    camera.position.x = CAM.x + pointer.x * 7;
    camera.position.y = CAM.y + pointer.y * -5 - scrollN * 26;
    camera.position.z = CAM.z + scrollN * 40;
    camera.lookAt(0, scrollN * -8, 0);

    renderer.render(scene, camera);

    if (++frames > 90 && degraded < 2) {
      if (dt > 0.034) slowFrames++;
      if (slowFrames > 45) {
        slowFrames = 0;
        degraded++;
        if (degraded === 1) {
          dpr = 1;
          renderer.setPixelRatio(1);
          uniforms.uPx.value = 1.25;
        } else {
          count = Math.floor(count / 1.7);
          buildSphere(count);
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

  uniforms.uTime.value = 4.2;
  renderer.render(scene, camera);
  start();

  return {
    setAudioProvider(fn) { audioProvider = fn; },
    setPointer(nx, ny) { pointer.tx = nx; pointer.ty = ny; },
    setScroll(n) { scrollN = n; },
    bandCount: BANDS,
  };
}
