"use client"


/**
 * DECOR - vector shapes in the CTA colour (--primary) that fill the empty space
 * around a section. Each shape drifts with scroll (parallax, transform only) and
 * slowly floats / spins via CSS (both disabled under prefers-reduced-motion).
 * Purely decorative: aria-hidden, pointer-events-none, sits behind the content.
 */
export type ShapeKind = "ring" | "burst" | "plus" | "squiggle" | "dots" | "half" | "triangle" | "blob" | "cross" | "bracket" | "tick" | "square" | "arc"

export type ShapeSpec = {
  k: ShapeKind
  x: string // left, %
  y: string // top, %
  s: number // size, px
  speed?: number // parallax travel, px (±)
  rot?: number // static rotation, deg
  o?: number // opacity
  fx?: "spin" | "float" | "none"
  md?: boolean // desktop only
}

function Svg({ k, s }: { k: ShapeKind; s: number }) {
  const common = { fill: "none", stroke: "currentColor", vectorEffect: "non-scaling-stroke" as const }
  switch (k) {
    case "ring":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" {...common} strokeWidth={2.5} />
          <circle cx="50" cy="50" r="30" {...common} strokeWidth={2.5} strokeDasharray="2 7" strokeLinecap="round" />
          <circle cx="50" cy="50" r="6" fill="currentColor" />
        </svg>
      )
    case "burst":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100">
          <path
            d="M50 0C54 36 64 46 100 50C64 54 54 64 50 100C46 64 36 54 0 50C36 46 46 36 50 0Z"
            fill="currentColor"
          />
        </svg>
      )
    case "plus":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100">
          <path d="M50 8V92M8 50H92" {...common} strokeWidth={5} strokeLinecap="round" />
        </svg>
      )
    case "squiggle":
      return (
        <svg width={s} height={s * 0.34} viewBox="0 0 150 51">
          <path
            d="M4 26 Q 22 2 40 26 T 76 26 T 112 26 T 148 26"
            {...common}
            strokeWidth={4}
            strokeLinecap="round"
          />
        </svg>
      )
    case "dots":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100">
          {Array.from({ length: 25 }).map((_, i) => (
            <circle key={i} cx={10 + (i % 5) * 20} cy={10 + Math.floor(i / 5) * 20} r="3" fill="currentColor" />
          ))}
        </svg>
      )
    case "half":
      return (
        <svg width={s} height={s / 2} viewBox="0 0 100 50">
          <path d="M0 50A50 50 0 0 1 100 50Z" fill="currentColor" />
        </svg>
      )
    case "triangle":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100">
          <path d="M50 12L90 84H10Z" {...common} strokeWidth={3} strokeLinejoin="round" />
        </svg>
      )
    case "blob":
      // flat, hard-edged "plate": hairline square with a solid corner (replaces the soft blob)
      return (
        <svg width={s} height={s} viewBox="0 0 100 100">
          <rect x="1" y="1" width="98" height="98" {...common} strokeWidth={1} />
          <path d="M1 34H34V1" {...common} strokeWidth={1} />
          <rect x="66" y="66" width="33" height="33" fill="currentColor" />
        </svg>
      )
    case "cross":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100">
          <path d="M50 0V100M0 50H100" {...common} strokeWidth={1} />
          <circle cx="50" cy="50" r="4" fill="currentColor" />
        </svg>
      )
    case "bracket":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100">
          <path d="M30 4H4V30M70 4H96V30M30 96H4V70M70 96H96V70" {...common} strokeWidth={2} strokeLinecap="square" />
        </svg>
      )
    case "tick":
      return (
        <svg width={s} height={s * 0.2} viewBox="0 0 200 40">
          <path d="M0 20H200" {...common} strokeWidth={1} />
          {Array.from({ length: 21 }).map((_, i) => (
            <path key={i} d={`M${i * 10} ${i % 5 === 0 ? 4 : 12}V20`} {...common} strokeWidth={1} />
          ))}
        </svg>
      )
    case "square":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100">
          <rect x="0" y="0" width="100" height="100" fill="currentColor" />
        </svg>
      )
    case "arc":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100">
          <path d="M0 100A100 100 0 0 1 100 0" {...common} strokeWidth={1} />
          <path d="M0 100A70 70 0 0 1 70 30" {...common} strokeWidth={1} />
          <path d="M0 100A40 40 0 0 1 40 60" {...common} strokeWidth={1} />
        </svg>
      )
  }
}

export function Decor({ className = "" }: { shapes?: ShapeSpec[]; className?: string }) {
  // Static, very faint column guides in the page margins - no floating objects,
  // nothing moves, nothing can overlap text. Same API, so sections need no edits.
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      <div className="container-x relative h-full">
        <div className="absolute inset-y-0 left-[clamp(1.25rem,3.4vw,3.5rem)] w-px bg-[color:var(--decor-ink)]" />
        <div className="absolute inset-y-0 right-[clamp(1.25rem,3.4vw,3.5rem)] w-px bg-[color:var(--decor-ink)]" />
        <div className="absolute inset-y-0 left-1/2 hidden w-px bg-[color:var(--decor-ink)] lg:block" />
      </div>
    </div>
  )
}

/* ── Presets: every section gets its own composition ───────────────────────
   Flat, hairline, grid-aligned marks (blueprint / editorial look). No blur, no
   blobs, no glow. Kept sparse on purpose - fewer, more deliberate marks.      */
export const DECOR = {
  works: [
    { k: "bracket", x: "92%", y: "2.5%", s: 64, speed: 40, fx: "none" },
    { k: "tick", x: "3%", y: "13%", s: 200, speed: 30, fx: "none", md: true, o: 0.6 },
    { k: "cross", x: "95%", y: "36%", s: 56, speed: 50, fx: "none", o: 0.7 },
    { k: "arc", x: "1%", y: "52%", s: 190, speed: 50, fx: "none", md: true, o: 0.55 },
    { k: "square", x: "96%", y: "70%", s: 14, speed: 40, fx: "none" },
    { k: "blob", x: "88%", y: "80%", s: 120, speed: 60, fx: "none", md: true, o: 0.6 },
    { k: "cross", x: "3%", y: "94%", s: 44, speed: 30, fx: "none", o: 0.7 },
  ] as ShapeSpec[],
  about: [
    { k: "blob", x: "3%", y: "5%", s: 110, speed: 50, fx: "none", md: true, o: 0.6 },
    { k: "cross", x: "94%", y: "9%", s: 52, speed: 40, fx: "none", o: 0.7 },
    { k: "tick", x: "80%", y: "40%", s: 200, speed: 30, fx: "none", md: true, o: 0.55 },
    { k: "square", x: "4%", y: "46%", s: 14, speed: 40, fx: "none" },
    { k: "arc", x: "88%", y: "74%", s: 170, rot: 90, speed: 50, fx: "none", md: true, o: 0.55 },
    { k: "bracket", x: "4%", y: "90%", s: 58, speed: 30, fx: "none" },
  ] as ShapeSpec[],
  testimonials: [
    { k: "bracket", x: "3%", y: "7%", s: 60, speed: 30, fx: "none" },
    { k: "cross", x: "94%", y: "14%", s: 48, speed: 40, fx: "none", o: 0.7 },
    { k: "tick", x: "5%", y: "86%", s: 180, speed: 30, fx: "none", md: true, o: 0.55 },
    { k: "square", x: "92%", y: "78%", s: 14, speed: 30, fx: "none" },
  ] as ShapeSpec[],
  faq: [
    { k: "tick", x: "2%", y: "14%", s: 190, speed: 40, fx: "none", md: true, o: 0.55 },
    { k: "cross", x: "94%", y: "30%", s: 48, speed: 40, fx: "none", o: 0.7 },
    { k: "square", x: "4%", y: "60%", s: 14, speed: 40, fx: "none" },
    { k: "bracket", x: "92%", y: "84%", s: 58, speed: 40, fx: "none" },
  ] as ShapeSpec[],
  contact: [
    { k: "bracket", x: "4%", y: "10%", s: 60, speed: 40, fx: "none" },
    { k: "cross", x: "93%", y: "12%", s: 52, speed: 40, fx: "none", md: true, o: 0.7 },
    { k: "square", x: "94%", y: "62%", s: 14, speed: 30, fx: "none", md: true },
  ] as ShapeSpec[],
  work: [
    { k: "blob", x: "2%", y: "10%", s: 110, speed: 90, fx: "none", md: true, o: 0.6 },
    { k: "bracket", x: "93%", y: "4%", s: 60, speed: 70, fx: "none" },
    { k: "cross", x: "95%", y: "28%", s: 48, speed: 70, fx: "none", o: 0.7 },
    { k: "tick", x: "2%", y: "40%", s: 190, speed: 60, fx: "none", md: true, o: 0.55 },
    { k: "square", x: "96%", y: "52%", s: 14, speed: 60, fx: "none" },
    { k: "arc", x: "90%", y: "68%", s: 170, rot: 90, speed: 70, fx: "none", md: true, o: 0.55 },
    { k: "cross", x: "3%", y: "82%", s: 44, speed: 60, fx: "none", o: 0.7 },
    { k: "bracket", x: "92%", y: "93%", s: 56, speed: 60, fx: "none" },
  ] as ShapeSpec[],
}
