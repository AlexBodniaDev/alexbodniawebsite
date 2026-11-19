"use client"

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "framer-motion"
import { useLanguage } from "@/components/language-provider"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { DURATION, EASE } from "@/lib/motion"

/**
 * Intro loader - same visual language as the site:
 * flat background, heavy Unbounded name, charcoal / lime, nothing else.
 *
 *   0.00s  the name sits there as a faint ghost
 *   0.00s  →  2.20s  it fills from the bottom up, a thin lime edge riding the fill line,
 *                    the counter climbs 000 → 100
 *   0.85s  role line rolls  →  "UX/UI Designer"  →  "Developer"
 *   2.40s  the screen splits open like a shutter, the hero intro takes over (see useIntroOffset)
 *
 * Plays once per full page load (not on client-side navigation).
 */

/** Seconds until the shutter starts opening (the hero waits for this). */
export const LOADER_HANDOFF = 2.4
const LOADER_HANDOFF_REDUCED = 0.9

type LoaderState = { active: boolean; offset: number }
const LoaderContext = createContext<LoaderState>({ active: false, offset: 0 })

/** Seconds a page's own intro animation should wait while the loader is still on screen. */
export function useIntroOffset(): number {
  return useContext(LoaderContext).offset
}

const LINE = "1.3em" // height of one rolling line

function RollingRole({ first, second, reduce }: { first: string; second: string; reduce: boolean }) {
  if (reduce) {
    return (
      <span className="block text-primary font-bold">
        {first} <span className="text-foreground/40">/</span> {second}
      </span>
    )
  }
  return (
    <span className="block overflow-hidden text-primary font-bold" style={{ height: LINE, lineHeight: LINE }}>
      <motion.span
        className="block will-change-transform"
        initial={{ y: "0em" }}
        animate={{ y: ["0em", `-${LINE}`, `-${LINE}`, `-${parseFloat(LINE) * 2}em`] }}
        transition={{
          duration: 1.45,
          delay: 0.85,
          times: [0, 0.38, 0.62, 1],
          ease: [EASE, "linear", EASE],
        }}
      >
        <span className="block" style={{ height: LINE }} aria-hidden="true" />
        <span className="block" style={{ height: LINE }}>{first}</span>
        <span className="block" style={{ height: LINE }}>{second}</span>
      </motion.span>
    </span>
  )
}

/** The name, set big and tight - used twice (ghost + fill) so both layers line up exactly. */
function Name() {
  return (
    <span
      className="h-mega block whitespace-nowrap !font-extrabold"
      style={{ fontSize: "clamp(2.75rem, 14vw, 9.5rem)", lineHeight: 0.98, letterSpacing: "-0.045em" }}
    >
      <span className="block">Alex</span>
      <span className="block">Bodnia</span>
    </span>
  )
}

function Loader({ onDone }: { onDone: () => void }) {
  const { t } = useLanguage()
  const reduce = useReducedMotion()
  const handoff = reduce ? LOADER_HANDOFF_REDUCED : LOADER_HANDOFF

  const progress = useMotionValue(0)
  const shown = useTransform(progress, (v) => String(Math.round(v * 100)).padStart(3, "0"))
  // fill rises from the bottom: clip away the part that is not filled yet
  const clip = useTransform(progress, (v) => `inset(${(1 - v) * 100}% 0 0 0)`)
  const edgeTop = useTransform(progress, (v) => `${(1 - v) * 100}%`)
  const edgeOpacity = useTransform(progress, [0, 0.03, 0.97, 1], [0, 1, 1, 0])

  useEffect(() => {
    const c = animate(progress, 1, { duration: handoff - 0.2, ease: EASE })
    const timer = window.setTimeout(onDone, handoff * 1000)
    return () => {
      c.stop()
      window.clearTimeout(timer)
    }
  }, [handoff, onDone, progress])

  const pad = "px-[clamp(1.25rem,3.4vw,3.5rem)]"

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label={t.loader.label}
      className="fixed inset-0 z-[100] overflow-hidden"
      initial={{ opacity: 1 }}
      // keeps the overlay mounted while the shutter opens (children carry the real exit)
      exit={{ opacity: 1, transition: { duration: reduce ? 0.3 : 0.95 } }}
    >
      {/* shutter: two flat halves that part on exit */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1/2 bg-background will-change-transform"
        initial={{ y: 0 }}
        exit={reduce ? { opacity: 0, transition: { duration: 0.3 } } : { y: "-100%", transition: { duration: 0.9, ease: EASE } }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2 bg-background will-change-transform"
        initial={{ y: 0 }}
        exit={reduce ? { opacity: 0, transition: { duration: 0.3 } } : { y: "100%", transition: { duration: 0.9, ease: EASE } }}
      />

      {/* lime seam that flashes along the split as it opens */}
      {!reduce && (
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 origin-center bg-[var(--lime)]"
          initial={{ scaleX: 0, opacity: 1 }}
          exit={{ scaleX: [0, 1, 1], opacity: [1, 1, 0], transition: { duration: 0.7, ease: EASE, times: [0, 0.5, 1] } }}
        />
      )}

      {/* content */}
      <motion.div
        className={`relative z-10 flex h-full flex-col justify-between pt-[calc(1.5rem+env(safe-area-inset-top,0px))] pb-[calc(2rem+env(safe-area-inset-bottom,0px))] ${pad}`}
        exit={{ opacity: 0, transition: { duration: reduce ? 0.2 : 0.3 } }}
      >
        {/* status */}
        <div className="flex items-center gap-2.5 eyebrow text-foreground/70">
          <span className="relative flex h-2 w-2 shrink-0">
            {!reduce && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--lime)] opacity-70" />}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--lime)]" />
          </span>
          {t.loader.label}
        </div>

        {/* name: ghost layer + fill layer + lime edge */}
        <div className="flex items-center justify-center">
          <motion.div
            className="relative"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.reveal, ease: EASE }}
          >
            <div aria-hidden="true" className="text-foreground/[0.12]">
              <Name />
            </div>
            <motion.div aria-hidden="true" className="absolute inset-0 text-primary" style={{ clipPath: clip, WebkitClipPath: clip }}>
              <Name />
            </motion.div>
            {!reduce && (
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-3 h-[2px] -translate-y-1/2 bg-[var(--lime)] shadow-[0_0_14px_2px_color-mix(in_oklch,var(--lime)_60%,transparent)]"
                style={{ top: edgeTop, opacity: edgeOpacity }}
              />
            )}
          </motion.div>
        </div>

        {/* role + counter */}
        <div className="flex items-end justify-between gap-6">
          <div className="h-title">
            <RollingRole first={t.loader.role1} second={t.loader.role2} reduce={reduce} />
          </div>
          <div className="flex items-baseline gap-1 font-[family-name:var(--font-display)] font-bold leading-none tracking-[-0.04em] text-foreground">
            <motion.span className="tabular-nums" style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}>
              {shown}
            </motion.span>
            <span className="text-foreground/40" style={{ fontSize: "clamp(1rem, 2.4vw, 1.75rem)" }}>%</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function LoaderProvider({ children }: { children: ReactNode }) {
  // `true` on the server AND the first client render → no hydration mismatch, no flash of the page.
  const [active, setActive] = useState(true)
  const reduce = useReducedMotion()
  const done = useCallback(() => setActive(false), [])

  useEffect(() => {
    if (!active) return
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = "hidden"
    return () => {
      root.style.overflow = prev
    }
  }, [active])

  const offset = active ? (reduce ? LOADER_HANDOFF_REDUCED : LOADER_HANDOFF) - 0.15 : 0

  return (
    <LoaderContext.Provider value={{ active, offset }}>
      {children}
      <AnimatePresence>{active && <Loader key="loader" onDone={done} />}</AnimatePresence>
    </LoaderContext.Provider>
  )
}

/** Kept so existing imports (`LoadingScreen`) keep working; the provider owns the overlay now. */
export function LoadingScreen() {
  return null
}
