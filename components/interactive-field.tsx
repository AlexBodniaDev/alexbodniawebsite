"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

/**
 * INTERACTIVE FIELD - hero + footer background (same name / props as before).
 *
 * One quiet idea, rendered well: a sheet of silk lit by a single soft lime light.
 *
 *   · the fabric folds drift almost imperceptibly (a full cycle takes minutes),
 *   · the light follows the cursor (desktop) or your finger (mobile) with a floaty delay
 *     and slides across the folds, catching a soft sheen on each ridge,
 *   · the pointer gently presses into the fabric and leaves a slow, fading wake,
 *   · a click / tap sends one smooth wave through the cloth,
 *   · fine film grain over everything removes colour banding and gives it a printed, tactile feel.
 *
 * No lines, no hard shapes, no particles - only light and cloth.
 *
 * Theme aware: on light the cloth is ivory with soft charcoal shadow and a lime sheen;
 * on dark it is charcoal with a faint silver sheen and a lime sheen. Text contrast is preserved
 * in both (the lime glow is a light tint under charcoal text, a low-alpha glow under off-white text).
 *
 * v2 polish: the light is a damped spring (frame-rate independent, tiny overshoot - it has weight),
 * pressing / touching sinks the cloth deeper and tightens the light, fast movement makes the light
 * bloom wider and brighter, a whisper of thin-film colour rides the highlights, and the folds
 * parallax slightly with page scroll. Fingers are tracked through touchmove, so the light keeps
 * following while a page-scroll gesture is in progress (pointermove is cancelled by the browser then).
 *
 * Performance (v3): one full-screen triangle rendered at ~0.7M pixels max (the cloth is soft, so it upsamples cleanly),
 * an even 30fps cadence while idle (every 2nd vsync, no uneven 20fps stutter) and the display's full rate while the
 * pointer moves, a finger touches or the page scrolls, adaptive resolution (it quietly renders
 * fewer pixels if the device can't keep up), the edge fade is done inside the shader (no CSS mask on a live canvas),
 * the loop waits for the loading screen, is paused offscreen / tab hidden, and draws one static frame under
 * prefers-reduced-motion.
 * Listeners are passive and the layer is pointer-events-none, so touch scrolling is never blocked.
 * If WebGL2 is unavailable nothing is drawn.
 */
type Fade = "none" | "top" | "bottom" | "both"

// [length of the fade at the bottom edge, length at the top edge] as a share of the height (0 = no fade).
// Same shape as the old CSS masks: "bottom" = opaque for the top 62%, then fades out; "both" = 22% ramps on each side.
const FADES: Record<Fade, [number, number]> = {
  none: [0, 0],
  bottom: [0.38, 0],
  top: [0, 0.38],
  both: [0.22, 0.22],
}

const N_PTS = 7 // head + wake
const N_RIP = 3
const TRAIL_MS = 1500
const RIPPLE_MS = 2200

const VERT = `#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`

const FRAG = `#version 300 es
precision highp float;
out vec4 o;

uniform vec2 uRes;
uniform float uTime, uR, uAmp, uGrain, uK, uPress, uSpeed, uDark;
uniform vec2 uFade; // x: bottom fade length, y: top fade length (share of height)
uniform vec2 uPar;
uniform vec3 uPts[${N_PTS}];
uniform vec3 uRip[${N_RIP}];
uniform vec3 uShadow, uHi, uLime;
uniform vec4 uA; // x shadow, y highlight, z veil, w lime gain

// the cloth: wide, slow, domain-warped folds
float cloth(vec2 p, float t) {
  vec2 q = p * 1.1;
  q += 0.45 * vec2(sin(q.y * 1.3 + t * 0.07), cos(q.x * 1.1 - t * 0.06));
  q += 0.22 * vec2(sin(q.y * 2.7 - t * 0.05 + 1.7), cos(q.x * 2.3 + t * 0.045));
  return 0.5 * sin(q.x * 1.7 + sin(q.y * 1.1 + t * 0.05) * 1.3)
       + 0.3 * sin(q.y * 1.25 - q.x * 0.8 + t * 0.04)
       + 0.12 * sin((q.x + q.y) * 3.1 - t * 0.06);
}

// cloth + the pointer pressing into it + click waves
float height(vec2 p) {
  float h = cloth((p + uPar) * uK, uTime) / uK; // uK keeps fold density the same on tall phone screens
  for (int i = 0; i < ${N_PTS}; i++) {
    vec3 pt = uPts[i];
    if (pt.z <= 0.001) continue;
    float r = uR * (0.6 + 0.4 * min(pt.z, 1.0));
    vec2 d = (p - pt.xy) / r;
    float dd = dot(d, d);
    if (dd > 9.0) continue; // far from this dent: skip the exp()
    float press = i == 0 ? 1.0 + 0.9 * uPress : 1.0;
    h -= pt.z * 0.11 * press * exp(-dd);
  }
  for (int i = 0; i < ${N_RIP}; i++) {
    vec3 r = uRip[i];
    if (r.z >= 0.0 && r.z < 1.0) {
      float x = (length(p - r.xy) - r.z * 1.5) / 0.1;
      float k = 1.0 - r.z;
      h += 0.1 * k * k * exp(-x * x) * cos(x * 1.8);
    }
  }
  return h;
}

float hash(vec2 v) { return fract(sin(dot(v, vec2(12.9898, 78.233))) * 43758.5453); }

void main() {
  vec2 p = gl_FragCoord.xy / uRes.y;
  float e = 1.5 / uRes.y;
  float h0 = height(p);
  vec2 g = vec2(height(p + vec2(e, 0.0)) - h0, height(p + vec2(0.0, e)) - h0) / e * 0.55;
  vec3 n = normalize(vec3(-g, 1.0));

  // key light, fixed: always a faint sheen on the folds, even with no pointer
  vec3 La = normalize(vec3(-0.55, 0.65, 0.75));
  float amb = dot(n, La) - La.z;
  float sh = clamp(-amb * 3.4, 0.0, 1.0);
  float hi = clamp(amb * 3.4, 0.0, 1.0);

  // the lime light that follows the pointer
  vec3 Lv = vec3(uPts[0].xy, 0.5) - vec3(p, 0.0);
  float dl = length(Lv);
  vec3 Ld = Lv / dl;
  float R = uR * (1.0 + 0.22 * uSpeed - 0.18 * uPress); // blooms when flicked, tightens when pressed
  float att = 1.0 / (1.0 + pow(dl / (R * 1.6), 2.0));
  float diff = max(dot(n, Ld) - Ld.z, 0.0);
  float spec = pow(max(dot(n, normalize(Ld + vec3(0.0, 0.0, 1.0))), 0.0), 22.0);
  float bloom = exp(-pow(dl / (R * 1.3), 2.0));
  float lime = ((spec * 0.55 + diff * 0.45) * att + bloom * 0.1) * uAmp * uA.w * (1.0 + 0.3 * uSpeed + 0.2 * uPress);
  // a whisper of thin-film colour on the brightest ridges (stays inside the lime family)
  vec3 film = 0.5 + 0.5 * cos(6.2831 * (vec3(0.0, 0.33, 0.67) + amb * 2.2 + dl * 1.4));
  vec3 limeCol = mix(uLime, mix(uLime, film, 0.5), 0.1 * clamp(spec * 2.2, 0.0, 1.0));

  // premium layer 1 - aurora: two slow neon-lime light pools drift under the cloth and only catch where the folds
  // face the light (satin), grading from the pure lime core to a deep teal-green at the edges. Pointer independent.
  float asp = uRes.x / uRes.y;
  vec2 c1 = vec2(asp * (0.5 + 0.32 * sin(uTime * 0.05)), 0.55 + 0.2 * cos(uTime * 0.043));
  vec2 c2 = vec2(asp * (0.95 + 0.25 * cos(uTime * 0.037)), 0.3 + 0.22 * sin(uTime * 0.052));
  float pool = exp(-dot(p - c1, p - c1) * 2.4) * 0.6 + exp(-dot(p - c2, p - c2) * 3.2) * 0.45;
  float sat = 0.35 + 1.5 * (hi + diff * 0.6);
  vec3 deep = mix(uLime, vec3(0.04, 0.42, 0.36), mix(0.25, 0.55, uDark));
  vec3 aurCol = mix(deep, uLime, clamp(pool * 1.3, 0.0, 1.0));
  float ap = clamp(pool * sat * mix(0.2, 0.3, uDark), 0.0, 0.55);
  // premium layer 2 - rim: a hairline of light along the crest of every fold, like the edge of satin
  float rim = clamp(pow(clamp(1.0 - n.z, 0.0, 1.0), 1.4) * 7.0, 0.0, 1.0);
  float ra = rim * mix(0.2, 0.24, uDark) * (0.4 + pool);
  vec3 rimCol = mix(uLime, uHi, uDark * 0.45);

  // composite (premultiplied)
  vec4 col = vec4(uShadow * uA.z, uA.z);
  float a = sh * uA.x;
  col = vec4(uShadow * a, a) + col * (1.0 - a);
  a = hi * uA.y;
  col = vec4(uHi * a, a) + col * (1.0 - a);
  a = ap;
  col = vec4(aurCol * a, a) + col * (1.0 - a);
  a = ra;
  col = vec4(rimCol * a, a) + col * (1.0 - a);
  a = clamp(lime, 0.0, 0.85);
  col = vec4(limeCol * a, a) + col * (1.0 - a);

  // film grain / dither
  float gn = hash(gl_FragCoord.xy) - 0.5;
  float ga = abs(gn) * uGrain;
  col = vec4(vec3(step(0.0, gn)) * ga, ga) + col * (1.0 - ga);

  // edge fade (replaces the CSS mask): premultiplied, so every channel scales together
  float v = gl_FragCoord.y / uRes.y;
  float fade = 1.0;
  if (uFade.x > 0.0) fade *= clamp(v / uFade.x, 0.0, 1.0);
  if (uFade.y > 0.0) fade *= clamp((1.0 - v) / uFade.y, 0.0, 1.0);

  o = col * fade;
}`

type Palette = {
  shadow: [number, number, number]
  hi: [number, number, number]
  lime: [number, number, number]
  a: [number, number, number, number]
}

export function InteractiveField({
  fade = "bottom",
  className = "",
  delay = 0,
}: {
  fade?: Fade
  className?: string
  /** seconds to wait (e.g. while the loading screen is up) before the cloth fades in */
  delay?: number
}) {
  const reduce = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const cv: HTMLCanvasElement = canvas

    const gl = cv.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    })
    if (!gl) return

    /* ── program ─────────────────────────────────────────────── */
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const vs = compile(gl.VERTEX_SHADER, VERT)
    const fs = compile(gl.FRAGMENT_SHADER, FRAG)
    const prog = gl.createProgram()!
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      return
    }
    gl.useProgram(prog)
    const U = (n: string) => gl.getUniformLocation(prog, n)
    const uRes = U("uRes")
    const uTime = U("uTime")
    const uR = U("uR")
    const uAmp = U("uAmp")
    const uGrain = U("uGrain")
    const uK = U("uK")
    const uPts = U("uPts")
    const uRip = U("uRip")
    const uShadow = U("uShadow")
    const uHi = U("uHi")
    const uLime = U("uLime")
    const uA = U("uA")
    const uPress = U("uPress")
    const uSpeed = U("uSpeed")
    const uDark = U("uDark")
    const uFade = U("uFade")
    const uPar = U("uPar")
    gl.clearColor(0, 0, 0, 0)
    gl.uniform2f(uFade, FADES[fade][0], FADES[fade][1])

    /* ── colours: the site's own tokens (oklch → sRGB via a 1px canvas) ── */
    const probe = document.createElement("canvas")
    probe.width = probe.height = 1
    const pctx = probe.getContext("2d", { willReadFrequently: true })
    const toRgb = (css: string, fb: [number, number, number]): [number, number, number] => {
      if (!pctx || !css) return fb
      try {
        pctx.clearRect(0, 0, 1, 1)
        pctx.fillStyle = "#000"
        pctx.fillStyle = css
        pctx.fillRect(0, 0, 1, 1)
        const d = pctx.getImageData(0, 0, 1, 1).data
        return [d[0] / 255, d[1] / 255, d[2] / 255]
      } catch {
        return fb
      }
    }
    let pal: Palette = {
      shadow: [0.15, 0.17, 0.19],
      hi: [1, 1, 1],
      lime: [0.85, 0.95, 0.42],
      a: [0.1, 0.55, 0.025, 1],
    }
    const readColors = () => {
      const cs = getComputedStyle(wrap)
      const dark = document.documentElement.classList.contains("dark")
      const lime = toRgb(cs.getPropertyValue("--lime").trim(), pal.lime)
      const charcoal = toRgb(cs.getPropertyValue("--cta-fg").trim(), [0.15, 0.17, 0.19])
      const silver = toRgb(cs.getPropertyValue("--foreground").trim(), [0.93, 0.93, 0.9])
      // The light is the site's neon lime, softened with pearl (dark) / champagne (light) so it reads as light, not paint.
      // `lime` is only read as a whisper of warmth so the glow never looks flat grey.
      const pearl: [number, number, number] = [0.9, 0.92, 0.9]
      const champagne: [number, number, number] = [0.8, 0.79, 0.73]
      const tint = (base: [number, number, number], k: number): [number, number, number] =>
        [base[0] + (lime[0] - base[0]) * k, base[1] + (lime[1] - base[1]) * k, base[2] + (lime[2] - base[2]) * k]
      pal = dark
        ? { shadow: [0, 0, 0], hi: silver, lime: tint(pearl, 0.8), a: [0.5, 0.17, 0, 1.15] }
        : { shadow: charcoal, hi: [1, 1, 1], lime: tint(champagne, 0.92), a: [0.2, 0.8, 0.02, 1.35] }
    }

    /* ── size ────────────────────────────────────────────────── */
    let w = 1
    let h = 1
    let quality = 1 // adaptive resolution multiplier (only ever goes down)
    const MAX_PIXELS = 0.7e6
    const resize = (force = false) => {
      const r = wrap.getBoundingClientRect()
      // ignore sub-pixel / no-op observer callbacks (e.g. the mobile address bar) so the canvas is not re-allocated mid-scroll
      if (!force && cv.width > 1 && Math.abs(r.width - w) < 1 && Math.abs(r.height - h) < 1) return
      w = Math.max(1, r.width)
      h = Math.max(1, r.height)
      let scale = Math.min(window.devicePixelRatio || 1, 1.5) * quality
      const px = w * h * scale * scale
      if (px > MAX_PIXELS) scale *= Math.sqrt(MAX_PIXELS / px)
      cv.width = Math.max(1, Math.round(w * scale))
      cv.height = Math.max(1, Math.round(h * scale))
      cv.style.width = `${w}px`
      cv.style.height = `${h}px`
      gl.viewport(0, 0, cv.width, cv.height)
      if (!running) draw(performance.now())
    }

    /* ── pointer state (plain variables, never React state) ──── */
    let tx = -9999
    let ty = -9999
    let cx = -9999
    let cy = -9999
    let vx = 0
    let vy = 0
    let amp = 0.8 // eases between idle (0.8) and live (1)
    let press = 0
    let pressT = 0
    let speed = 0
    let lastT = 0
    let hasPointer = false
    let lastMove = -1e9
    const trail: { x: number; y: number; t: number }[] = []
    const ripples: { x: number; y: number; t0: number }[] = []
    const pts = new Float32Array(N_PTS * 3)
    const rips = new Float32Array(N_RIP * 3)

    let raf = 0
    let running = false
    let visible = true
    let ready = reduce || delay <= 0 // false while the loading screen is still covering the page
    let lastScroll = -1e9

    function draw(now: number) {
      const idle = !hasPointer || now - lastMove > 2500
      let gx = tx
      let gy = ty
      if (idle) {
        // the light wanders on its own, very slowly
        gx = w * (0.5 + 0.3 * Math.sin(now * 0.00022))
        gy = h * (0.44 + 0.2 * Math.cos(now * 0.0003))
      }
      if (cx < -9000) {
        cx = gx
        cy = gy
      }
      // the light is a damped spring: it has weight, glides, and overshoots a hair (frame-rate independent)
      const dt = Math.min(0.05, Math.max(0.001, lastT ? (now - lastT) / 1000 : 0.016))
      lastT = now
      const k = idle ? 12 : 72
      const c = idle ? 7 : 12.5
      vx += ((gx - cx) * k - vx * c) * dt
      vy += ((gy - cy) * k - vy * c) * dt
      cx += vx * dt
      cy += vy * dt
      const ease = (rate: number) => 1 - Math.exp(-rate * dt)
      amp += ((idle ? 0.8 : 1) - amp) * ease(3)
      const spd = idle ? 0 : Math.min(1, Math.hypot(vx, vy) / (h * 1.1))
      speed += (spd - speed) * ease(spd > speed ? 10 : 3)
      press += (pressT - press) * ease(pressT > press ? 14 : 6)

      // wake: a soft dent every ~34px of travel, newest first
      const last = trail[0]
      if (!last || Math.hypot(cx - last.x, cy - last.y) > 34) {
        trail.unshift({ x: cx, y: cy, t: now })
        if (trail.length > N_PTS - 1) trail.pop()
      }
      while (trail.length && now - trail[trail.length - 1].t > TRAIL_MS) trail.pop()

      pts.fill(0)
      pts[0] = cx / h
      pts[1] = (h - cy) / h
      pts[2] = amp
      for (let i = 0; i < trail.length; i++) {
        const k = Math.pow(Math.max(0, 1 - (now - trail[i].t) / TRAIL_MS), 1.4) * amp * 0.8
        pts[(i + 1) * 3] = trail[i].x / h
        pts[(i + 1) * 3 + 1] = (h - trail[i].y) / h
        pts[(i + 1) * 3 + 2] = k
      }

      rips.fill(0)
      for (let i = 0; i < N_RIP; i++) {
        const r = ripples[i]
        const age = r ? (now - r.t0) / RIPPLE_MS : 2
        rips[i * 3] = r ? r.x / h : 0
        rips[i * 3 + 1] = r ? (h - r.y) / h : 0
        rips[i * 3 + 2] = age >= 1 ? 2 : age
      }
      while (ripples.length && now - ripples[0].t0 > RIPPLE_MS) ripples.shift()

      gl!.clear(gl!.COLOR_BUFFER_BIT)
      gl!.uniform2f(uRes, cv.width, cv.height)
      gl!.uniform1f(uTime, now * 0.001)
      gl!.uniform1f(uR, w < 640 ? 0.2 : 0.24)
      gl!.uniform1f(uAmp, amp)
      gl!.uniform1f(uGrain, 0.03)
      gl!.uniform1f(uK, Math.min(4, Math.max(1, 1.68 / (cv.width / cv.height))))
      gl!.uniform1f(uPress, press)
      gl!.uniform1f(uSpeed, speed)
      gl!.uniform1f(uDark, document.documentElement.classList.contains("dark") ? 1 : 0)
      // the folds drift a little against the page as it scrolls (depth)
      gl!.uniform2f(uPar, 0, -wrap!.getBoundingClientRect().top / h * 0.3)
      gl!.uniform3fv(uPts, pts)
      gl!.uniform3fv(uRip, rips)
      gl!.uniform3fv(uShadow, pal.shadow)
      gl!.uniform3fv(uHi, pal.hi)
      gl!.uniform3fv(uLime, pal.lime)
      gl!.uniform4fv(uA, pal.a)
      gl!.drawArrays(gl!.TRIANGLES, 0, 3)
    }

    // Pacing. Calm (nobody touching, no wave, page still) → an even 30fps: on a 60Hz screen that is exactly every
    // 2nd vsync, which looks steady for something this slow (the old fixed 40ms gate landed on every 3rd vsync = 20fps
    // with uneven gaps). Anything live (pointer, finger, click wave, page scroll) → every frame at the display rate.
    const CALM_GAP = 1000 / 30
    let lastDraw = 0
    let slow = 0
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      const calm =
        (!hasPointer || now - lastMove > 2500) &&
        ripples.length === 0 &&
        press < 0.01 &&
        pressT === 0 &&
        now - lastScroll > 220
      const gap = now - lastDraw
      if (calm && gap < CALM_GAP - 4) return // 4ms of slack so vsync jitter never skips a whole extra frame
      // adaptive resolution: if frames keep arriving much later than asked for, quietly render fewer pixels
      if (lastDraw && gap < 250) {
        slow = gap > (calm ? 50 : 24) ? slow + 1 : Math.max(0, slow - 1)
        if (slow > 24 && quality > 0.5) {
          quality *= 0.85
          slow = 0
          resize(true)
        }
      }
      lastDraw = now
      draw(now)
    }
    const start = () => {
      if (running || reduce || !ready || !visible || document.hidden) return
      running = true
      lastT = 0
      lastDraw = 0
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    readColors()
    resize(true)
    if (reduce) {
      // one calm static composition
      cx = w * 0.64
      cy = h * 0.42
      tx = cx
      ty = cy
      amp = 1
      draw(3000)
    }

    const ro = new ResizeObserver(() => resize())
    ro.observe(wrap)

    let liveTimer: ReturnType<typeof setTimeout> | undefined
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      visible ? start() : stop()
      if (visible && !wrap.dataset.live && liveTimer === undefined) {
        liveTimer = setTimeout(() => {
          ready = true
          wrap.dataset.live = "1"
          start()
        }, reduce ? 0 : delay * 1000)
      }
    })
    io.observe(wrap)

    const onVis = () => (document.hidden ? stop() : start())
    document.addEventListener("visibilitychange", onVis)

    // theme switch → re-read tokens
    const mo = new MutationObserver(() => {
      readColors()
      if (!running) draw(performance.now())
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    /* ── input: mouse hover, pen, and finger ─────────────────── */
    const local = (cx: number, cy: number) => {
      const r = wrap.getBoundingClientRect()
      return {
        x: cx - r.left,
        y: cy - r.top,
        inside: cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom,
      }
    }
    const follow = (cx: number, cy: number) => {
      const p = local(cx, cy)
      if (!p.inside) {
        hasPointer = false
        return
      }
      tx = p.x
      ty = p.y
      hasPointer = true
      lastMove = performance.now()
    }
    // mouse / pen: pointermove. Finger: touchmove (pointermove is cancelled the moment the browser starts scrolling).
    const onMove = (e: PointerEvent) => {
      if (!reduce && e.pointerType !== "touch") follow(e.clientX, e.clientY)
    }
    const pressAt = (x: number, y: number) => {
      follow(x, y)
      const p = local(x, y)
      if (p.inside) {
        pressT = 1
        ripples.push({ x: p.x, y: p.y, t0: performance.now() })
        if (ripples.length > N_RIP) ripples.shift()
      }
    }
    const onDown = (e: PointerEvent) => {
      if (!reduce) pressAt(e.clientX, e.clientY)
    }
    // release: the cloth springs back; a lifted finger leaves the light lingering ~0.8s, then it drifts off on its own
    const onUp = (e: PointerEvent) => {
      pressT = 0
      if (e.pointerType !== "mouse") lastMove = performance.now() - 1700
    }
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!reduce && t) follow(t.clientX, t.clientY)
    }
    const onTouchEnd = () => {
      pressT = 0
      lastMove = performance.now() - 1700
    }
    const onLeave = () => {
      hasPointer = false
    }
    // scrolling counts as "live": the folds parallax with the page, so they must update at the display rate while it moves
    const onScroll = () => {
      lastScroll = performance.now()
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerdown", onDown, { passive: true })
    window.addEventListener("pointerup", onUp, { passive: true })
    window.addEventListener("pointercancel", onUp, { passive: true })
    window.addEventListener("touchstart", onTouch, { passive: true })
    window.addEventListener("touchmove", onTouch, { passive: true })
    window.addEventListener("touchend", onTouchEnd, { passive: true })
    window.addEventListener("touchcancel", onTouchEnd, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)

    start()

    return () => {
      stop()
      if (liveTimer !== undefined) clearTimeout(liveTimer)
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      document.removeEventListener("visibilitychange", onVis)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
      window.removeEventListener("pointercancel", onUp)
      window.removeEventListener("touchstart", onTouch)
      window.removeEventListener("touchmove", onTouch)
      window.removeEventListener("touchend", onTouchEnd)
      window.removeEventListener("touchcancel", onTouchEnd)
      document.documentElement.removeEventListener("pointerleave", onLeave)
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [reduce, delay, fade])

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`field-wrap pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}
