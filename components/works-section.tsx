"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { motion, type Variants } from "framer-motion"
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import data from "@/lib/data.json"
import { useLanguage } from "@/components/language-provider"
import { Reveal, MaskReveal } from "@/components/reveal"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { EASE } from "@/lib/motion"
import { Decor, DECOR } from "@/components/decor"

type Project = (typeof data.projects)[0]

/** Tiles visible before "Show more" is pressed (a multiple of 3 and of 2 would be ideal; 6 fills both grids). */
const INITIAL_VISIBLE_COUNT = 6

type TrackDetail = { kind: "enter" | "move" | "leave"; mouse?: boolean; x?: number; y?: number }

/**
 * ONE "active tile" at a time.
 *  · mouse  → the tile under the pointer. Re-checked on scroll too (smooth-scroll moves the page under a still
 *             cursor and the browser's :hover lags behind it, which is what made several tiles light up).
 *  · touch  → the tile whose centre is nearest the middle of the screen. Side-by-side tiles share the same
 *             scroll band, so exactly one is picked, with a little hysteresis so it never flickers between them.
 */
function useSingleActiveTile(gridRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const g: HTMLDivElement = grid

    let active: HTMLElement | null = null
    let mouse: { x: number; y: number } | null = null
    let raf = 0
    const touchMode = () => window.matchMedia("(hover: none)").matches

    const emit = (el: HTMLElement, detail: TrackDetail) => el.dispatchEvent(new CustomEvent("worktrack", { detail }))
    const setActive = (next: HTMLElement | null) => {
      if (next === active) return
      if (active) {
        delete active.dataset.active
        emit(active, { kind: "leave" })
      }
      active = next
      if (next) {
        next.dataset.active = "true"
        emit(next, { kind: "enter", mouse: !touchMode(), x: mouse?.x, y: mouse?.y })
      }
      g.dataset.hasActive = next ? "true" : "false"
    }

    const resolve = () => {
      raf = 0
      const tiles = Array.from(g.querySelectorAll<HTMLElement>(".work-tile"))
      if (touchMode()) {
        const mid = window.innerHeight / 2
        let best: HTMLElement | null = null
        let bestD = Infinity
        let curD = Infinity
        for (const t of tiles) {
          const r = t.getBoundingClientRect()
          if (r.bottom < mid - 8 || r.top > mid + 8) continue // must actually cross the middle line
          const d = Math.abs(r.top + r.height / 2 - mid)
          if (t === active) curD = d
          if (d < bestD - 0.5) {
            bestD = d
            best = t
          }
        }
        // hysteresis: keep the current one unless another is clearly closer to the middle
        setActive(active && curD < Infinity && curD - bestD < 40 ? active : best)
        return
      }
      if (!mouse) {
        setActive(null)
        return
      }
      const hit = (document.elementFromPoint(mouse.x, mouse.y) as HTMLElement | null)?.closest<HTMLElement>(".work-tile")
      if (hit && g.contains(hit)) {
        setActive(hit)
        emit(hit, { kind: "move", x: mouse.x, y: mouse.y })
      }
      // pointer in a gap between tiles: keep the current one (no flicker); it clears when the pointer leaves the grid
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(resolve)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      mouse = { x: e.clientX, y: e.clientY }
      schedule()
    }
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      mouse = null
      if (raf) cancelAnimationFrame(raf)
      raf = 0
      setActive(null)
    }

    g.addEventListener("pointermove", onMove, { passive: true })
    g.addEventListener("pointerleave", onLeave)
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule, { passive: true })
    const ro = new ResizeObserver(schedule) // "Show more / less" changes the layout
    ro.observe(g)
    schedule()

    return () => {
      if (raf) cancelAnimationFrame(raf)
      g.removeEventListener("pointermove", onMove)
      g.removeEventListener("pointerleave", onLeave)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      ro.disconnect()
      setActive(null)
    }
  }, [gridRef])
}

/**
 * Previews are 4:3 images, so every tile is 4:3 too (square on a phone, where the text needs room):
 * nothing in a preview (title, mockups) is ever cropped away.
 *   desktop: 3 columns · tablet: 2 columns · phone: 1 column
 */

/** Reveal trigger: fires as soon as a small slice of the tile is on screen (never leaves a tile stuck hidden). */
const TILE_VIEWPORT = { once: true, amount: 0.05 } as const

/** Brand-cover palettes for projects that don't have a screenshot yet (always readable, never a blank dark tile). */
const COVERS = [
  { bg: "oklch(0.91 0.006 100)", fg: "oklch(0.24 0.012 245)" },
  { bg: "oklch(0.3 0.013 245)", fg: "oklch(0.95 0.006 105)" },
  { bg: "oklch(0.84 0.01 100)", fg: "oklch(0.24 0.012 245)" },
  { bg: "oklch(0.36 0.014 245)", fg: "oklch(0.95 0.006 105)" },
]

/** Large visual for a project: the real image, or a generated brand cover (mini web-layout) when there is no screenshot yet. */
function Cover({ project, title, index, alt }: { project: Project; title: string; index: number; alt?: string }) {
  const real = !!project.image && !project.image.includes("placeholder")
  if (real) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.image}
        alt={alt ?? title}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="h-full w-full object-cover object-center"
      />
    )
  }
  const pal = COVERS[index % COVERS.length]
  return (
    <div
      aria-hidden="true"
      className="relative h-full w-full overflow-hidden"
      style={{ background: pal.bg, color: pal.fg }}
    >
      {/* wireframe of a page */}
      <div className="absolute inset-x-[12%] top-[14%] h-[46%] rounded-2xl border-[1.5px] border-current/40 p-3 md:p-4">
        <div className="flex items-center gap-1.5">
          <i className="h-2 w-2 rounded-full bg-current/40" />
          <i className="h-2 w-2 rounded-full bg-current/40" />
          <i className="h-2 w-2 rounded-full bg-current" />
          <i className="ml-3 h-1.5 w-1/3 rounded-full bg-current/25" />
        </div>
        <div className="mt-3 h-[38%] rounded-xl bg-current/15" />
        <div className="mt-2.5 grid grid-cols-3 gap-2">
          <i className="h-5 rounded-lg bg-current/25 md:h-7" />
          <i className="h-5 rounded-lg bg-current/15 md:h-7" />
          <i className="h-5 rounded-lg bg-current/25 md:h-7" />
        </div>
      </div>
      <span className="absolute -right-[2%] top-[2%] select-none font-display text-[clamp(6rem,16vw,12rem)] font-extrabold leading-none text-current opacity-[0.14]">
        {title.trim().charAt(0)}
      </span>
    </div>
  )
}

function WorkTile({
  project,
  index,
  total,
  mode,
  delay,
}: {
  project: Project
  index: number
  total: number
  /** "view": reveal when scrolled into view · "mount": reveal immediately (tiles that appear after pressing the button) */
  mode: "view" | "mount"
  delay: number
}) {
  const { t, locale } = useLanguage()
  const reduce = useReducedMotion()
  const uk = locale === "uk"
  const title = uk ? project.title_uk : project.title
  const desc = uk ? project.description_uk : project.description
  const tags = (uk ? project.tags_uk : project.tags).slice(0, 2)
  const wide = false

  // the single "active tile" controller emits cursor coordinates → feed the soft sheen (--sx / --sy)
  const tileRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = tileRef.current
    if (!el) return
    const onTrack = (e: Event) => {
      const d = (e as CustomEvent<TrackDetail>).detail
      if (d.x == null || d.y == null) return
      const r = el.getBoundingClientRect()
      el.style.setProperty("--sx", `${d.x - r.left}px`)
      el.style.setProperty("--sy", `${d.y - r.top}px`)
    }
    el.addEventListener("worktrack", onTrack)
    return () => el.removeEventListener("worktrack", onTrack)
  }, [])

  // Reveal: fade + rise while the image settles from a slight zoom. (No clip-path: a clipped-to-nothing tile
  // can report "not visible" to the scroll observer and never appear.)
  const variants: Variants = reduce
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 48 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay } },
      }
  const imgVariants: Variants = reduce
    ? { hidden: { scale: 1 }, show: { scale: 1 } }
    : { hidden: { scale: 1.2 }, show: { scale: 1, transition: { duration: 1.3, ease: EASE, delay } } }
  const trigger =
    mode === "mount"
      ? ({ animate: "show" } as const)
      : ({ whileInView: "show", viewport: TILE_VIEWPORT } as const)

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      {...trigger}
      className="work-wrap relative aspect-square min-h-0 rounded-[1.75rem] sm:aspect-[4/3]"
    >
      <div
        ref={tileRef}
        className="work-tile group relative h-full w-full overflow-hidden rounded-[1.75rem] bg-muted"
      >
        {/* Whole tile is one link → /work/[id] */}
        <Link
          href={`/work/${project.id}`}
          aria-label={`${t.works.viewProject}: ${title}`}
          className="absolute inset-0 z-30 rounded-[1.75rem] outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-primary"
        />

        {/* border drawn ON TOP of the image (an outer ring would be cut by the reveal's clip-path) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[25] rounded-[inherit] ring-1 ring-inset ring-border transition-shadow duration-300 group-data-[active=true]:ring-2 group-data-[active=true]:ring-white/70"
        />

        {/* image */}
        <motion.div variants={imgVariants} className="absolute inset-0">
          <div className="h-full w-full saturate-[0.94] transition-[transform,filter] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[active=true]:scale-[1.06] group-data-[active=true]:saturate-[1.08]">
            <Cover project={project} title={title} index={index} alt={`${title} - ${tags.join(", ")} - ${uk ? "превʼю кейсу" : "case study preview"}`} />
          </div>
        </motion.div>

        {/* legibility veil (always) + deeper veil on hover */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-t from-black/80 via-black/20 to-black/5" />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] bg-black/25 opacity-0 transition-opacity duration-500 group-data-[active=true]:opacity-100" />
        {/* darkens the tile when another project is the selected one */}
       {/*  <span aria-hidden="true" className="work-dim pointer-events-none absolute inset-0 z-[8]" /> */}
        {/* lime spotlight that follows the cursor */}
        {/* <span aria-hidden="true" className="work-spot pointer-events-none absolute inset-0 z-[6]" />
 */}
        {/* soft white sheen that follows the cursor (premium "light on glass" feel) */}
        <span aria-hidden="true" className="work-sheen pointer-events-none absolute inset-0 z-[6]" />
        {/* title block */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col gap-4 p-6 text-white md:p-8">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span key={tag} className="eyebrow rounded-full border border-white/40 bg-black/25 px-2.5 py-1 text-white backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
          <h3
            className={`font-display font-extrabold leading-[1.06] tracking-[-0.035em] text-balance text-white ${
              wide ? "text-[clamp(1.35rem,0.95rem+1.5vw,2.5rem)]" : "text-[clamp(1.1rem,0.9rem+0.75vw,1.65rem)]"
            }`}
          >
            {title}
          </h3>
          {/* description + lime CTA slide open on hover (mouse) / when the tile is in the middle of the screen (touch) */}
          <div className="work-desc">
            <div>
              <p className="line-clamp-2 max-w-xl text-[0.9rem] leading-snug text-white/85 md:line-clamp-3">{desc}</p>
              <span className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--lime)] px-5 font-display text-[0.8rem] font-semibold text-[var(--cta-fg)]">
                {t.works.viewProject}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function WorksSection() {
  const { t } = useLanguage()
  const [showAll, setShowAll] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const keepTop = useRef<number | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  useSingleActiveTile(gridRef)

  const total = data.projects.length
  const visible = showAll ? data.projects : data.projects.slice(0, INITIAL_VISIBLE_COUNT)
  const hiddenCount = Math.max(0, total - INITIAL_VISIBLE_COUNT)
  const hasMore = hiddenCount > 0

  // Show more → the page stays exactly where it is (new tiles appear right below).
  // Show less → the button stays under your finger/cursor instead of jumping to the top of Works.
  useLayoutEffect(() => {
    if (keepTop.current === null) return
    const el = btnRef.current
    if (el) {
      const root = document.documentElement
      const prev = root.style.scrollBehavior
      root.style.scrollBehavior = "auto" // beat the global smooth-scroll for this correction
      window.scrollTo(0, window.scrollY + el.getBoundingClientRect().top - keepTop.current)
      root.style.scrollBehavior = prev
    }
    keepTop.current = null
  }, [showAll])

  const toggle = () => {
    if (showAll) keepTop.current = btnRef.current?.getBoundingClientRect().top ?? null
    setShowAll((v) => !v)
  }

  return (
    <section
      id="works"
      // stop the browser's scroll anchoring from "following" the button when the grid grows
      style={{ overflowAnchor: "none" }}
      className="relative isolate section-y bg-background overflow-hidden"
    >
      <Decor shapes={DECOR.works} />
      <div className="container-x relative">
        {/* Header */}
        <div className="mb-[var(--space-head)] flex items-end justify-between gap-6 border-b border-border pb-10">
          <h2 className="h-display">
            <MaskReveal>
              {t.works.heading1} <span className="accent">{t.works.heading2}</span>
            </MaskReveal>
          </h2>
          <Reveal delay={0.15}>
            <span className="eyebrow whitespace-nowrap text-muted-foreground">
              {total} {t.works.projectsCount}
            </span>
          </Reveal>
        </div>

        {/* Mosaic */}
        <div ref={gridRef} className="works-grid grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
          {visible.map((project, index) => {
            const late = index >= INITIAL_VISIBLE_COUNT
            return (
              <WorkTile
                key={project.id}
                project={project}
                index={index}
                total={total}
                mode={late ? "mount" : "view"}
                delay={late ? (index - INITIAL_VISIBLE_COUNT) * 0.1 : Math.min(index, 4) * 0.06}
              />
            )
          })}
        </div>

        {hasMore && (
          <div className="mt-16 flex justify-center md:mt-24">
            <button
              ref={btnRef}
              type="button"
              onClick={toggle}
              aria-expanded={showAll}
              className="cta cta-primary eyebrow gap-3 px-7 py-4"
            >
              {showAll ? t.works.showLessWork : t.works.showMoreWork}
              {!showAll && (
                <span className="rounded-full bg-[var(--cta-fg)] px-2.5 py-1 text-[0.7rem] tabular-nums text-[var(--lime)]">
                  +{hiddenCount}
                </span>
              )}
              {showAll ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
