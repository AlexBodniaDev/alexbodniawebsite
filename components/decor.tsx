"use client"

import { useEffect, useRef, type ReactNode } from "react"

/**
 * DECOR - design-tool chrome in the page margins.
 * Figma / Photoshop / Illustrator + code editor pieces: toolbar, multiplayer cursors,
 * code window, layers panel, pen-tool curve, swatches, terminal, selection box.
 *
 *  · each piece peeks in from the section edge (so it stays out of your text)
 *  · pointer near it → it slides fully into view, tilts toward the cursor and the
 *    item under the pointer lights up (tool, code line, layer, swatch…)
 *  · idle → a lime highlight walks through the items on its own
 *  · desktop only (≥1200px), behind the content, never blocks clicks
 *  · flat: no blur, no glow. prefers-reduced-motion stops animation.
 *  · drawn ~1.4× larger (CSS `zoom` on .dc-tilt, see globals.css) with thin, airy ink;
 *    animations pause while the section is off-screen.
 *
 * Hover is detected from one window pointermove listener (rAF-throttled, paused when
 * the section is off-screen), so the pieces can stay behind the content.
 * Kept deliberately quiet: faded at rest (one knob: --decor-opacity in globals.css), fully visible only on hover.
 * Same API: <Decor shapes={DECOR.works} />. Case-study pages: <Decor shapes={workDecor(project.id)} />.
 */
export type ShapeSpec = {
  k: "toolbar" | "cursor" | "code" | "pen" | "layers" | "swatches" | "terminal" | "bbox" | "type" | "keys" | "toggles"
  side: "left" | "right"
  y: string
  /** optional per-piece content (file name, layer names, palette…) so the same piece can say something different */
  o?: Opt
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Opt = Record<string, any>
type PieceProps = { o?: Opt }

const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
const M = "var(--decor-mark)"
const INK = "var(--decor-dot)"
const LIME = "var(--lime)"
const LIME_FG = "var(--cta-fg)"
const PANEL = "color-mix(in oklch, var(--background) 55%, transparent)"

/* how much of the piece is visible at rest (px peeking in) + hover-scan config */
const CFG: Record<ShapeSpec["k"], { peek: number; n?: number; axis?: "x" | "y" }> = {
  toolbar: { peek: 20, n: 6, axis: "y" },
  cursor: { peek: 80 },
  code: { peek: 130, n: 5, axis: "y" },
  pen: { peek: 100 },
  layers: { peek: 80, n: 4, axis: "y" },
  swatches: { peek: 70, n: 6, axis: "x" },
  terminal: { peek: 110 },
  bbox: { peek: 60 },
  type: { peek: 70, axis: "x" },
  keys: { peek: 60 },
  toggles: { peek: 80 },
}

/* ── pieces ─────────────────────────────────────────────────────────────── */

const TOOLS = [
  "M6 3l12 6-5 2-2 5z", // move
  "M8 3v18M16 3v18M3 8h18M3 16h18", // frame
  "M4 20l4-1 11-11-3-3L5 16zM14 7l3 3", // pen
  "M4 6h16v12H4z", // rectangle
  "M12 4a8 8 0 100 16 8 8 0 000-16z", // ellipse
  "M5 6V4h14v2M12 4v16M9 20h6", // text
]

function Toolbar() {
  return (
    <div
      className="dc-auto flex w-[52px] flex-col items-center gap-1 rounded-[1.1rem] border p-1.5"
      style={{ borderColor: M, background: PANEL, color: M }}
    >
      {TOOLS.map((d, i) => (
        <span
          key={i}
          className="dc-item flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ animationDelay: `${i * 1.5}s` }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d={d} />
          </svg>
        </span>
      ))}
    </div>
  )
}

function Cursor({ o }: PieceProps) {
  const h = "absolute h-[7px] w-[7px] border"
  const hs = { borderColor: M, background: "var(--background)" }
  const Arrow = ({ fill }: { fill: string }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={fill} stroke={INK} strokeWidth="1.4" strokeLinejoin="round">
      <path d="M4 3l16 7-7 2.4L10.4 20z" />
    </svg>
  )
  const Chip = ({ children, bg, fg }: { children: string; bg: string; fg: string }) => (
    <span className="ml-4 -mt-0.5 inline-block rounded-full px-2.5 py-1 text-[11px] font-medium" style={{ background: bg, color: fg, fontFamily: MONO }}>
      {children}
    </span>
  )
  return (
    <div className="relative" style={{ width: 240, height: 150 }}>
      <div className="absolute inset-0 border" style={{ borderColor: M }}>
        <i className={`${h} -left-1 -top-1`} style={hs} />
        <i className={`${h} -right-1 -top-1`} style={hs} />
        <i className={`${h} -bottom-1 -left-1`} style={hs} />
        <i className={`${h} -bottom-1 -right-1`} style={hs} />
      </div>
      <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 text-[10px]" style={{ fontFamily: MONO, color: "var(--background)", background: M }}>
        {o?.label ?? "240 × 150"}
      </span>
      {/* collaborator - drifts on its own */}
      <div className="decor-cursor absolute left-[130px] top-[36px]">
        <Arrow fill={LIME} />
        <Chip bg={LIME} fg={LIME_FG}>{o?.name ?? "alex"}</Chip>
      </div>
      {/* "you" - mirrors the real pointer when it is near */}
      <div className="dc-you absolute left-[40px] top-[60px]">
        <Arrow fill={INK} />
        <Chip bg={INK} fg="var(--background)">you</Chip>
      </div>
    </div>
  )
}

const CODE_DEFAULT: [string, string][] = [
  ["const", ' stack = ["React", "Figma"]'],
  ["export function", " Alex() {"],
  ["  return", ' <Design with="code" />'],
  ["", "}"],
  ["", "// ship it"],
]

function Code({ o }: PieceProps) {
  const kw = { color: INK, fontWeight: 600 } as const
  const src: [string, string][] = o?.lines ?? CODE_DEFAULT
  const lines: ReactNode[] = src.map(([a, b], i) => (
    <>
      {a && <span style={kw}>{a}</span>}
      {b}
      {i === src.length - 1 && <span className="decor-blink ml-1 inline-block h-[1em] w-[0.5em] translate-y-[2px]" style={{ background: INK }} />}
    </>
  ))
  return (
    <div
      className="dc-auto w-[300px] overflow-hidden rounded-2xl border"
      style={{ borderColor: M, background: PANEL, fontFamily: MONO, color: M }}
    >
      <div className="flex items-center gap-1.5 border-b px-3.5 py-2.5" style={{ borderColor: M }}>
        <i className="h-2.5 w-2.5 rounded-full border" style={{ borderColor: M }} />
        <i className="h-2.5 w-2.5 rounded-full border" style={{ borderColor: M }} />
        <i className="h-2.5 w-2.5 rounded-full" style={{ background: LIME, boxShadow: `inset 0 0 0 1px ${INK}` }} />
        <span className="ml-3 text-[11px]">{o?.file ?? "hero.tsx"}</span>
      </div>
      <div className="py-2 text-[12.5px] leading-[1.9]">
        {lines.map((l, i) => (
          <div key={i} className="dc-item flex gap-3 px-3.5" style={{ animationDelay: `${i * 1.8}s` }}>
            <span className="w-3 text-right opacity-50">{i + 1}</span>
            <span className="whitespace-pre">{l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Pen(_: PieceProps) {
  const c = { stroke: M, vectorEffect: "non-scaling-stroke" as const, fill: "none" }
  return (
    <div className="relative">
      <svg width="290" height="160" viewBox="0 0 290 160" overflow="visible">
        <path d="M20 128 C 72 12, 156 12, 188 86 S 258 148, 272 42" {...c} strokeWidth="1.6" pathLength={1} className="decor-draw" />
        <path d="M20 128L72 12M188 86L156 12M188 86L220 158" {...c} strokeWidth="1" strokeDasharray="3 3" className="dc-flow" />
        {[[72, 12], [156, 12], [220, 158]].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r="3.5" fill="var(--background)" stroke={M} strokeWidth="1" />
        ))}
        {[[20, 128], [188, 86], [272, 42]].map(([x, y], i) => (
          <g key={i} className={i === 1 ? "dc-pop" : ""} style={{ transformOrigin: `${x}px ${y}px`, transformBox: "view-box" as never }}>
            <rect x={x - 4.5} y={y - 4.5} width="9" height="9" fill={i === 1 ? LIME : "var(--background)"} stroke={INK} strokeWidth="1.25" />
          </g>
        ))}
      </svg>
      <span className="dc-more absolute left-[196px] top-[100px] rounded-md px-2 py-1 text-[10px]" style={{ fontFamily: MONO, background: M, color: "var(--background)" }}>
        x 188 · y 86
      </span>
    </div>
  )
}

function Layers({ o }: PieceProps) {
  const rows: string[] = o?.rows ?? ["Hero", "Works", "About", "Contact"]
  return (
    <div className="dc-auto w-[210px] rounded-2xl border p-2" style={{ borderColor: M, background: PANEL, color: M, fontFamily: MONO }}>
      <div className="px-2 pb-1.5 pt-1 text-[10px] uppercase tracking-[0.12em] opacity-70">Layers</div>
      {rows.map((r, i) => (
        <div key={r} className="dc-item flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[12px]" style={{ animationDelay: `${i * 2.2}s` }}>
          <svg className="dc-eye" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <i className="h-4 w-6 rounded-[4px] border" style={{ borderColor: "currentColor", opacity: 0.8 }} />
          <span>{r}</span>
        </div>
      ))}
    </div>
  )
}

const SW_DEFAULT: [string, string][] = [
  ["var(--cta)", "#FB6C2B"],
  ["var(--iris)", "#AA95E8"],
  ["var(--butter)", "#FAE685"],
  ["var(--mint)", "#82D9B4"],
  ["var(--sky)", "#82C7F0"],
  ["oklch(0.25 0.016 285)", "#26242F"],
]

function Swatches({ o }: PieceProps) {
  const cols: [string, string][] = o?.cols ?? SW_DEFAULT
  return (
    <div className="relative rounded-2xl border p-3" style={{ borderColor: M, background: PANEL, color: M, fontFamily: MONO }}>
      <div className="mb-2.5 flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] opacity-70">
        <i className="h-2 w-2 rounded-full" style={{ background: LIME, boxShadow: `inset 0 0 0 1px ${INK}` }} />
        {o?.title ?? "Color"}
      </div>
      <div className="flex gap-2">
        {cols.map(([c, hex], i) => (
          <div key={i} className="dc-sw dc-item relative h-8 w-8 rounded-full border" style={{ background: c, borderColor: M }}>
            <span className="dc-hex absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded px-1.5 py-0.5 text-[10px]" style={{ background: INK, color: "var(--background)" }}>
              {hex}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Terminal({ o }: PieceProps) {
  return (
    <div className="w-[260px] overflow-hidden rounded-2xl border" style={{ borderColor: M, background: PANEL, color: M, fontFamily: MONO }}>
      <div className="flex items-center gap-1.5 border-b px-3.5 py-2.5" style={{ borderColor: M }}>
        <i className="h-2.5 w-2.5 rounded-full border" style={{ borderColor: M }} />
        <i className="h-2.5 w-2.5 rounded-full border" style={{ borderColor: M }} />
        <i className="h-2.5 w-2.5 rounded-full border" style={{ borderColor: M }} />
        <span className="ml-3 text-[11px]">{o?.dir ?? "~/portfolio"}</span>
      </div>
      <div className="space-y-1 px-3.5 py-3 text-[12px] leading-[1.6]">
        <div><span style={{ color: INK, fontWeight: 600 }}>$</span> {o?.cmd ?? "pnpm dev"}</div>
        <div className="dc-more">{o?.l1?.[0] ?? "▲ ready in"} <span style={{ background: LIME, color: LIME_FG, padding: "0 4px", borderRadius: 4 }}>{o?.l1?.[1] ?? "312ms"}</span></div>
        <div className="dc-more">{o?.l2 ?? "✓ compiled /works"}</div>
        <div>
          <span style={{ color: INK, fontWeight: 600 }}>$</span>
          <span className="decor-blink ml-1.5 inline-block h-[1em] w-[0.55em] translate-y-[2px]" style={{ background: INK }} />
        </div>
      </div>
    </div>
  )
}

function Bbox({ o }: PieceProps) {
  const hd = "absolute h-[7px] w-[7px] border"
  const hs = { borderColor: INK, background: "var(--background)" }
  const pos = ["-left-1 -top-1", "left-1/2 -top-1 -translate-x-1/2", "-right-1 -top-1", "-left-1 top-1/2 -translate-y-1/2", "-right-1 top-1/2 -translate-y-1/2", "-bottom-1 -left-1", "-bottom-1 left-1/2 -translate-x-1/2", "-bottom-1 -right-1"]
  return (
    <div className="dc-rot relative" style={{ width: 132, height: 96 }}>
      <div className="absolute inset-0 rounded-[10px]" style={{ background: LIME, boxShadow: `inset 0 0 0 1.25px ${INK}` }} />
      <div className="absolute inset-0 border" style={{ borderColor: INK }}>
        {pos.map((p) => <i key={p} className={`${hd} ${p}`} style={hs} />)}
      </div>
      <span className="absolute -top-8 left-1/2 h-8 w-px -translate-x-1/2" style={{ background: INK }} />
      <i className="absolute -top-10 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full border" style={{ borderColor: INK, background: "var(--background)" }} />
      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-medium" style={{ fontFamily: MONO, color: LIME_FG }}>
        {o?.label ?? "Button"}
      </span>
    </div>
  )
}

/* Type specimen - the "Aa" breathes between thin and black; the slider knob follows the pointer */
function TypeSpecimen({ o }: PieceProps) {
  return (
    <div className="relative w-[210px] rounded-2xl border p-4" style={{ borderColor: M, background: PANEL, color: M, fontFamily: MONO }}>
      <div className="flex items-end gap-3">
        <span className="dc-aa text-[68px] leading-none" style={{ color: INK, fontFamily: "var(--font-display)" }}>Aa</span>
        <span className="pb-1.5 text-[10px] leading-[1.6] opacity-80">
          {o?.name ?? "Display"}
          <br />
          <span style={{ background: LIME, color: LIME_FG, padding: "0 4px", borderRadius: 4 }}>{o?.weight ?? "800"}</span> · 68px
        </span>
      </div>
      <div className="relative mt-4 h-px" style={{ background: M }}>
        <i className="dc-fx absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border" style={{ left: "50%", borderColor: INK, background: LIME }} />
      </div>
      <div className="mt-2 flex justify-between text-[9px] opacity-70">
        <span>200</span>
        <span>900</span>
      </div>
    </div>
  )
}

/* Keycaps - they "press" on their own, light up lime when the pointer comes near */
function Keys({ o }: PieceProps) {
  const k: string[] = o?.keys ?? ["⌘", "K", "Enter", "⇧", "⌥", "P"]
  const Key = ({ children, w = 40 }: { children: ReactNode; w?: number }) => (
    <span
      className="dc-key flex h-10 items-center justify-center rounded-xl border text-[14px]"
      style={{ width: w, borderColor: M, background: PANEL, color: INK, fontFamily: MONO }}
    >
      {children}
    </span>
  )
  return (
    <div className="relative" style={{ color: M, fontFamily: MONO }}>
      <div className="flex gap-2">
        <Key>{k[0]}</Key>
        <Key>{k[1]}</Key>
        <Key w={64}>{k[2]}</Key>
      </div>
      <div className="mt-2 flex gap-2">
        <Key>{k[3]}</Key>
        <Key>{k[4]}</Key>
        <Key>{k[5]}</Key>
      </div>
      <span className="dc-more mt-3 block text-[10px]">{o?.hint ?? "Command palette"}</span>
    </div>
  )
}

/* Settings toggles - knobs slide on a loop */
function Toggles({ o }: PieceProps) {
  const rows: string[] = o?.rows ?? ["Dark mode", "Auto-layout", "Snap to grid"]
  return (
    <div className="w-[220px] rounded-2xl border p-3" style={{ borderColor: M, background: PANEL, color: M, fontFamily: MONO }}>
      <div className="px-1 pb-2 text-[10px] uppercase tracking-[0.12em] opacity-70">{o?.title ?? "Settings"}</div>
      {rows.map((r, i) => (
        <div key={r} className="flex items-center justify-between px-1 py-1.5 text-[12px]">
          <span>{r}</span>
          <span className="relative block h-5 w-9 rounded-full border" style={{ borderColor: M }}>
            <i
              className="dc-knob absolute left-[3px] top-[3px] block h-3 w-3 rounded-full"
              style={{ background: i === 1 ? LIME : INK, boxShadow: i === 1 ? `inset 0 0 0 1px ${INK}` : undefined, animationDelay: `${i * 1.3}s` }}
            />
          </span>
        </div>
      ))}
    </div>
  )
}

const PIECES: Record<ShapeSpec["k"], (p: PieceProps) => ReactNode> = { toolbar: Toolbar, cursor: Cursor, code: Code, pen: Pen, layers: Layers, swatches: Swatches, terminal: Terminal, bbox: Bbox, type: TypeSpecimen, keys: Keys, toggles: Toggles }

/* ── layer ──────────────────────────────────────────────────────────────── */
export function Decor({ shapes, className = "" }: { shapes: ShapeSpec[]; className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    let raf = 0
    let px = -1
    let py = -1
    let visible = false

    type Piece = { el: HTMLElement; items: HTMLElement[]; on: number; hot: boolean; dir: number; n: number; axis: string; left: number; top: number; w: number; h: number; shift: number }
    const pieces: Piece[] = Array.from(root.querySelectorAll<HTMLElement>("[data-piece]")).map((el) => ({
      el,
      items: Array.from(el.querySelectorAll<HTMLElement>(".dc-item")),
      on: -1,
      hot: false,
      dir: Number(el.dataset.dir || 1),
      n: Number(el.dataset.n || 0),
      axis: el.dataset.axis || "y",
      left: 0,
      top: 0,
      w: 0,
      h: 0,
      shift: 0,
    }))

    const setOn = (pc: Piece, idx: number) => {
      if (pc.on === idx) return
      pc.on = idx
      pc.items.forEach((it, i) => (i === idx ? it.setAttribute("data-on", "") : it.removeAttribute("data-on")))
    }
    const setHot = (pc: Piece, hot: boolean) => {
      if (pc.hot === hot) return
      pc.hot = hot
      pc.el.dataset.hot = hot ? "1" : "0"
      if (!hot) setOn(pc, -1)
    }

    /*
     * Flicker fix, part 1 - geometry is measured ONCE (and again on resize / font load / content growth),
     * never while the pointer moves. Before, every frame read getComputedStyle + offsetWidth/Height right
     * after the previous frame had written CSS variables → forced layout on a zoomed, transformed tree.
     * Hit-testing uses the piece's RESTING box (layout position, unaffected by transforms) plus, while hot,
     * the box it slides to; entering uses a tight zone, leaving a wider one (hysteresis).
     */
    const measure = () => {
      for (const pc of pieces) {
        const el = pc.el
        const dz = parseFloat(getComputedStyle(el).getPropertyValue("--dz")) || 1
        pc.left = el.offsetLeft
        pc.top = el.offsetTop
        pc.w = el.offsetWidth
        pc.h = el.offsetHeight
        pc.shift = pc.dir * (Number(el.dataset.peek || 0) + 30) * dz
      }
    }
    const ENTER = 44
    const LEAVE = 90
    let rr: DOMRect | null = null
    const tick = () => {
      raf = 0
      if (px < 0) return
      rr = root.getBoundingClientRect()
      for (const pc of pieces) {
        const left = rr.left + pc.left
        const top = rr.top + pc.top
        const pad = pc.hot ? LEAVE : ENTER
        const x0 = (pc.hot ? Math.min(left, left + pc.shift) : left) - pad
        const x1 = (pc.hot ? Math.max(left, left + pc.shift) : left) + pc.w + pad
        const inside = px > x0 && px < x1 && py > top - pad && py < top + pc.h + pad
        setHot(pc, inside)
        if (!inside) continue

        // pointer position inside the piece's final (slid-in) box - stable, independent of the animation
        const fx = (px - (left + pc.shift)) / pc.w
        const fy = (py - top) / pc.h
        const mx = Math.max(-1, Math.min(1, fx * 2 - 1))
        const my = Math.max(-1, Math.min(1, fy * 2 - 1))
        pc.el.style.setProperty("--mx", mx.toFixed(2))
        pc.el.style.setProperty("--my", my.toFixed(2))
        if (pc.n) {
          const t = pc.axis === "x" ? fx : fy
          setOn(pc, Math.max(0, Math.min(pc.n - 1, Math.floor(t * pc.n))))
        }
      }
    }
    const schedule = () => {
      if (visible && !raf) raf = requestAnimationFrame(tick)
    }
    const clear = () => {
      px = py = -1
      for (const pc of pieces) setHot(pc, false)
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      px = e.clientX
      py = e.clientY
      schedule()
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      root.dataset.paused = visible ? "0" : "1"
      if (!visible) {
        for (const pc of pieces) setHot(pc, false)
      } else {
        measure()
        schedule()
      }
    })
    io.observe(root)
    measure()
    const ro = new ResizeObserver(measure) // page grows when images load → positions in % move
    ro.observe(root)
    window.addEventListener("resize", measure)
    document.fonts?.ready.then(measure)
    window.addEventListener("pointermove", onMove, { passive: true })
    // smooth-scroll moves the page under a still cursor → re-check so pieces never get stuck hot/cold
    window.addEventListener("scroll", schedule, { passive: true })
    document.addEventListener("pointerleave", clear)
    return () => {
      io.disconnect()
      ro.disconnect()
      window.removeEventListener("resize", measure)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("scroll", schedule)
      document.removeEventListener("pointerleave", clear)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      data-paused="1"
      className={`decor-root pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden select-none min-[1200px]:block ${className}`}
    >
      {shapes.map((sp, i) => {
        const cfg = CFG[sp.k]
        const Piece = PIECES[sp.k]
        const dir = sp.side === "left" ? 1 : -1
        return (
          <div
            key={i}
            data-piece
            data-hot="0"
            data-n={cfg.n}
            data-axis={cfg.axis}
            data-dir={dir}
            data-peek={cfg.peek}
            className="dc absolute"
            style={{ [sp.side]: `calc(${-cfg.peek}px * var(--dz))`, top: sp.y, ["--in" as string]: `calc(${dir * (cfg.peek + 30)}px * var(--dz))` }}
          >
            <div className="dc-tilt">
              <div className="dc-life" style={{ animationDelay: `${(i % 5) * -1.4}s` }}>
                <Piece o={sp.o} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* Only 2–3 pieces per section, and no piece is repeated from one section to the next. */
export const DECOR = {
  works: [
    { k: "toolbar", side: "right", y: "8%" },
    { k: "type", side: "left", y: "44%" },
    { k: "swatches", side: "right", y: "76%" },
  ] as ShapeSpec[],
  about: [
    { k: "bbox", side: "left", y: "8%" },
    { k: "code", side: "right", y: "42%" },
  ] as ShapeSpec[],
  testimonials: [
    { k: "pen", side: "left", y: "10%" },
    { k: "layers", side: "right", y: "58%" },
  ] as ShapeSpec[],
  faq: [
    { k: "terminal", side: "left", y: "12%" },
    { k: "toggles", side: "right", y: "62%" },
  ] as ShapeSpec[],
  contact: [
    { k: "cursor", side: "right", y: "10%" },
    { k: "keys", side: "left", y: "62%" },
  ] as ShapeSpec[],
  // fallback for the case-study page (every real project has its own set - see WORK below)
  work: [
    { k: "toolbar", side: "right", y: "3%" },
    { k: "code", side: "left", y: "12%" },
    { k: "swatches", side: "right", y: "24%" },
    { k: "pen", side: "left", y: "37%" },
    { k: "layers", side: "right", y: "50%" },
    { k: "type", side: "left", y: "62%" },
    { k: "bbox", side: "right", y: "74%" },
    { k: "keys", side: "left", y: "86%" },
  ] as ShapeSpec[],
}

/* ── per-project decor ──────────────────────────────────────────────────────
 * Every case study gets its own 7 pieces: a different mix, order, sides and heights, and the
 * content inside (file names, layer names, palettes, shortcuts…) is written for that project.
 */
type Spec = [ShapeSpec["k"], Opt?]
const lay = (start: "left" | "right", ys: number[], items: Spec[]): ShapeSpec[] =>
  items.map(([k, o], i) => ({ k, o, side: (i % 2 === 0) === (start === "right") ? "right" : "left", y: `${ys[i]}%` }))

const WORK: Record<string, ShapeSpec[]> = {
  "nasha-hata-real-estate": lay("right", [3, 16, 29, 42, 55, 68, 82], [
    ["bbox", { label: "Listing card" }],
    ["layers", { rows: ["Map", "Filters", "Listings", "Footer"] }],
    ["swatches", { title: "Palette", cols: [["#C8643B", "#C8643B"], ["#E8D5B7", "#E8D5B7"], ["#6B7F4E", "#6B7F4E"], ["#2B2A28", "#2B2A28"], ["#F4EFE6", "#F4EFE6"], ["var(--cta)", "#FB6C2B"]] }],
    ["cursor", { name: "agent", label: "Map pin · 240 × 150" }],
    ["toggles", { title: "Filters", rows: ["Map view", "Show price", "Verified only"] }],
    ["code", { file: "listings.tsx", lines: [["const", " homes = filter(price, rooms)"], ["export function", " Listing() {"], ["  return", ' <Card.Photo ratio="4/3" />'], ["", "}"], ["", "// find your home"]] }],
    ["keys", { keys: ["⌘", "F", "Enter", "⇧", "⌥", "M"], hint: "Search listings" }],
  ]),
  "tvoe-web-design": lay("left", [5, 18, 30, 44, 57, 70, 84], [
    ["type", { name: "Display", weight: "800" }],
    ["toolbar"],
    ["code", { file: "hero.tsx", lines: [["const", " motion = spring(0.4)"], ["export function", " Tvoe() {"], ["  return", ' <Hero bold="true" />'], ["", "}"], ["", "// yours, not theirs"]] }],
    ["pen"],
    ["swatches", { title: "Brand", cols: [["#111111", "#111111"], ["#FF5A36", "#FF5A36"], ["#F4F1EA", "#F4F1EA"], ["#7C8187", "#7C8187"], ["var(--cta)", "#FB6C2B"], ["#FFFFFF", "#FFFFFF"]] }],
    ["keys", { keys: ["⌘", "D", "Enter", "⇧", "⌥", "A"], hint: "Duplicate frame" }],
    ["terminal", { dir: "~/tvoe", cmd: "pnpm dev" }],
  ]),
  "medis-healthcare": lay("right", [2, 14, 27, 41, 54, 67, 81], [
    ["layers", { rows: ["Booking", "Doctors", "Services", "Contacts"] }],
    ["toggles", { title: "Access", rows: ["High contrast", "Large text", "Reduced motion"] }],
    ["pen"],
    ["cursor", { name: "doctor", label: "Book · 240 × 150" }],
    ["bbox", { label: "Book visit" }],
    ["terminal", { dir: "~/medis", cmd: "npm run a11y", l1: ["✓ contrast", "AAA"], l2: "✓ 0 critical issues" }],
    ["swatches", { title: "Care", cols: [["#0E7C86", "#0E7C86"], ["#5CC8C0", "#5CC8C0"], ["#E8F6F5", "#E8F6F5"], ["#1B3A4B", "#1B3A4B"], ["#F2F8F8", "#F2F8F8"], ["var(--cta)", "#FB6C2B"]] }],
  ]),
  "vespera-funeral-home": lay("left", [4, 17, 31, 43, 56, 69, 83], [
    ["pen"],
    ["type", { name: "Serif", weight: "300" }],
    ["swatches", { title: "Calm", cols: [["#3B3A38", "#3B3A38"], ["#8A8578", "#8A8578"], ["#C9C2B4", "#C9C2B4"], ["#EDE8DD", "#EDE8DD"], ["#5B6B5F", "#5B6B5F"], ["#1C1C1C", "#1C1C1C"]] }],
    ["layers", { rows: ["Memorial", "Services", "Tributes", "Contact"] }],
    ["keys", { keys: ["⌘", "[", "Enter", "⇧", "⌥", "T"], hint: "Send to back" }],
    ["cursor", { name: "family", label: "Tribute · 240 × 150" }],
    ["toolbar"],
  ]),
  "dnipro-redesign": lay("right", [3, 15, 28, 42, 55, 68, 82], [
    ["terminal", { dir: "~/dnipro-net", cmd: "pnpm build", l1: ["▲ built in", "4.2s"], l2: "✓ 24 pages exported" }],
    ["code", { file: "plans.tsx", lines: [["const", " plans = [100, 300, 1000]"], ["export function", " Plans() {"], ["  return", ' <Speed unit="Mbps" />'], ["", "}"], ["", "// connect faster"]] }],
    ["toggles", { title: "Plans", rows: ["Monthly", "Router incl.", "Static IP"] }],
    ["toolbar"],
    ["layers", { rows: ["Plans", "Speed test", "Support", "Header"] }],
    ["bbox", { label: "Pay bill" }],
    ["type", { name: "Sans", weight: "600" }],
  ]),
  "ketotox-package": lay("left", [3, 16, 29, 41, 54, 68, 82], [
    ["bbox", { label: "Dieline" }],
    ["swatches", { title: "Pantone", cols: [["#0F8B6D", "#0F8B6D"], ["#F2B705", "#F2B705"], ["#FFFFFF", "#FFFFFF"], ["#1F2937", "#1F2937"], ["#E4F2EC", "#E4F2EC"], ["var(--cta)", "#FB6C2B"]] }],
    ["type", { name: "Label", weight: "700" }],
    ["pen"],
    ["toolbar"],
    ["keys", { keys: ["⌘", "P", "Enter", "⇧", "⌥", "K"], hint: "Export print PDF" }],
    ["toggles", { title: "Print", rows: ["CMYK", "Bleed 3mm", "Die-cut"] }],
  ]),
  "tennis-courts-3d": lay("right", [4, 17, 30, 43, 56, 69, 83], [
    ["terminal", { dir: "~/courts-3d", cmd: "blender -b -a", l1: ["▲ render", "1920×1080"], l2: "✓ Cycles · 256 samples" }],
    ["pen"],
    ["toolbar"],
    ["cursor", { name: "cam", label: "Camera · 240 × 150" }],
    ["keys", { keys: ["G", "R", "Enter", "⇧", "A", "Tab"], hint: "Grab · Rotate · Edit" }],
    ["layers", { rows: ["Court", "Net", "Lights", "Camera"] }],
    ["type", { name: "Title", weight: "700" }],
  ]),
  "mobile-app-todo": lay("left", [2, 15, 28, 41, 55, 68, 82], [
    ["toggles", { title: "Task", rows: ["Reminder", "Repeat", "Priority"] }],
    ["layers", { rows: ["Today", "Inbox", "Projects", "Tab bar"] }],
    ["keys", { keys: ["⌘", "N", "Enter", "⇧", "⌥", "D"], hint: "New task" }],
    ["bbox", { label: "Add task" }],
    ["code", { file: "tasks.tsx", lines: [["const", " [done, set] = useState(0)"], ["export function", " Task() {"], ["  return", ' <Swipe to="complete" />'], ["", "}"], ["", "// inbox zero"]] }],
    ["swatches", { title: "Accent", cols: [["#4F7CFF", "#4F7CFF"], ["#FF8A5B", "#FF8A5B"], ["#F5F7FF", "#F5F7FF"], ["#1E2340", "#1E2340"], ["#7BD88F", "#7BD88F"], ["var(--cta)", "#FB6C2B"]] }],
    ["cursor", { name: "sam", label: "Swipe · 240 × 150" }],
  ]),
  "mobile-app-cyclesense": lay("right", [3, 16, 29, 42, 55, 68, 81], [
    ["pen"],
    ["swatches", { title: "Soft", cols: [["#E5668C", "#E5668C"], ["#F6B8CB", "#F6B8CB"], ["#FBE9EF", "#FBE9EF"], ["#7A3E5B", "#7A3E5B"], ["#B79CED", "#B79CED"], ["#FFF6F0", "#FFF6F0"]] }],
    ["toggles", { title: "Privacy", rows: ["Face ID", "Local only", "Reminders"] }],
    ["cursor", { name: "luna", label: "Cycle ring · 240 × 150" }],
    ["type", { name: "Rounded", weight: "600" }],
    ["bbox", { label: "Log day" }],
    ["layers", { rows: ["Cycle ring", "Insights", "Log", "Tab bar"] }],
  ]),
  "mobile-app-cryptoxapp": lay("left", [4, 17, 30, 43, 56, 69, 83], [
    ["terminal", { dir: "~/cryptox", cmd: "npm run ws", l1: ["▲ socket", "12ms"], l2: "✓ BTC/USDT subscribed" }],
    ["code", { file: "chart.tsx", lines: [["const", ' pair = "BTC/USDT"'], ["export function", " Chart() {"], ["  return", " <Candles live />"], ["", "}"], ["", "// buy the dip"]] }],
    ["pen"],
    ["swatches", { title: "Market", cols: [["#0B0E14", "#0B0E14"], ["#16C784", "#16C784"], ["#EA3943", "#EA3943"], ["#F7931A", "#F7931A"], ["#2A2F3A", "#2A2F3A"], ["var(--cta)", "#FB6C2B"]] }],
    ["keys", { keys: ["⌘", "B", "Enter", "⇧", "⌥", "S"], hint: "Buy / Sell" }],
    ["toolbar"],
    ["toggles", { title: "Trade", rows: ["Limit order", "Stop loss", "Price alerts"] }],
  ]),
}

/** decor for one case-study page; unknown ids fall back to the generic set */
export function workDecor(id: string): ShapeSpec[] {
  return WORK[id] ?? DECOR.work
}
