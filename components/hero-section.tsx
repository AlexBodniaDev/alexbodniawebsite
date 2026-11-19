"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import { useRef } from "react"
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { useLanguage } from "@/components/language-provider"
import { useIntroOffset } from "@/components/loading-screen"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { InteractiveField } from "@/components/interactive-field"
import {
  DURATION,
  EASE,
  REVEAL_Y,
  revealTransition,
  scrollToSection,
} from "@/lib/motion"

/** Intro timeline (seconds): badge → role → headline lines → subline → CTAs */
const INTRO = {
  badge: 0.1,
  role: 0.2,
  headline: 0.34, // first line; +0.1 per line
  subline: 0.95,
  cta: 1.15, // first CTA; +0.08 for the next
  cue: 1.7,
} as const

/* ─────────────────────────── helpers ─────────────────────────── */

function Reveal({
  delay,
  reduce,
  className,
  children,
}: {
  delay: number
  reduce: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: REVEAL_Y }}
      animate={{ opacity: 1, y: 0 }}
      transition={revealTransition(reduce, delay)}
    >
      {children}
    </motion.div>
  )
}

/** One headline line, revealed from behind an overflow mask. */
function MaskLine({
  index,
  reduce,
  offset = 0,
  children,
}: {
  index: number
  reduce: boolean
  offset?: number
  children: React.ReactNode
}) {
  return (
    // padding + negative margin keep layout identical while giving
    // descenders / italic overhang room inside the mask
    <span className="block overflow-hidden pt-[0.06em] pb-[0.14em] -mt-[0.06em] -mb-[0.14em]">
      <motion.span
        className="relative inline-block will-change-transform"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={revealTransition(
          reduce,
          offset + INTRO.headline + index * 0.1,
          DURATION.slow,
        )}
      >
        {children}
      </motion.span>
    </span>
  )
}

/**
 * Small-radius magnetic pull. Desktop mouse only; off for touch / pen and
 * reduced motion. Uses motion values only - no React state per mousemove.
 * Pointer listeners live on a static outer wrapper so the measured rect
 * does not move with the transform (no feedback jitter).
 */
function Magnetic({
  reduce,
  children,
}: {
  reduce: boolean
  children: React.ReactNode
}) {
  const outerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const MAX = 10
  const STRENGTH = 0.22
  const clamp = (v: number) => Math.max(-MAX, Math.min(MAX, v))

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return
    const el = outerRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    x.set(clamp((e.clientX - (r.left + r.width / 2)) * STRENGTH))
    y.set(clamp((e.clientY - (r.top + r.height / 2)) * STRENGTH))
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div
      ref={outerRef}
      className="p-2 -m-2"
      onPointerMove={onMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      <motion.div style={reduce ? undefined : { x: sx, y: sy }}>
        {children}
      </motion.div>
    </div>
  )
}

/* ──────────────────────────── hero ──────────────────────────── */

export function HeroSection() {
  const { t } = useLanguage()
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  // seconds to wait while the loading screen is still covering the page (0 after the first load)
  const o = useIntroOffset()

  // Scroll parallax: content drifts slightly and fades, background drifts slower
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  // Parallax fade/drift is desktop-only: on phones the content scrolls away
  // normally (a half-faded hero over the next section looks broken).
  const isDesktop = () => typeof window !== "undefined" && window.innerWidth >= 768
  const contentY = useTransform(scrollYProgress, (v) => (isDesktop() ? v * 40 : 0))
  const contentOpacity = useTransform(scrollYProgress, (v) =>
    isDesktop() ? Math.min(1, Math.max(0, 1 - (v - 0.06) / 0.36)) : 1,
  )
  const bgY = useTransform(scrollYProgress, (v) => (isDesktop() ? v * 24 : 0))

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-32 pb-40 md:pt-36 md:pb-32"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={reduce ? undefined : { y: bgY }}
        aria-hidden="true"
      >
        <InteractiveField fade="bottom" delay={o + 0.2} />
      </motion.div>

      <motion.div
        className="container-x relative z-10"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-3 md:mb-16">
        {/* Availability badge */}
        <Reveal
          delay={o + INTRO.badge}
          reduce={reduce}
          className="flex items-center gap-2.5"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="eyebrow text-foreground/70">
            {t.hero.availableForProjects}
          </span>
        </Reveal>

        </div>

        {/* Headline - line-by-line mask reveal */}
        <h1 className="h-mega text-foreground mb-12 md:mb-20">
          <MaskLine index={0} reduce={reduce} offset={o}>
            {t.hero.headline1}
          </MaskLine>
          <MaskLine index={1} reduce={reduce} offset={o}>
            <em className="accent">{t.hero.headline2}</em>{" "}
            {t.hero.headline2Suffix}
          </MaskLine>
          <MaskLine index={2} reduce={reduce} offset={o}>
            {t.hero.headline3}
          </MaskLine>
        </h1>

        {/* hairline that draws itself under the headline - the one quiet, orchestrated moment after the title */}
        <motion.span
          aria-hidden="true"
          className="mb-10 block h-px origin-left bg-foreground/15 md:mb-14"
          initial={{ scaleX: reduce ? 1 : 0 }}
          animate={{ scaleX: 1 }}
          transition={reduce ? { duration: 0 } : { duration: 1.6, ease: EASE, delay: o + INTRO.subline - 0.1 }}
        />

        {/* Subline */}
        <div className="grid-12 items-end gap-y-10">
        <motion.p
          className="lead col-span-12 max-w-xl font-normal text-foreground/80 md:col-span-7 lg:col-span-6"
          initial={{ opacity: 0, y: REVEAL_Y }}
          animate={{ opacity: 1, y: 0 }}
          transition={revealTransition(reduce, o + INTRO.subline)}
        >
          {t.hero.subline1}{" "}
          <span className="text-foreground font-semibold">{t.hero.subline2}</span>{" "}
          {t.hero.subline3}{" "}
          <span className="text-foreground font-medium">{t.hero.subline4}</span>{" "}
          {t.hero.subline5}
        </motion.p>

        {/* CTAs */}
        <div className="col-span-12 flex flex-col items-center justify-center gap-4 sm:flex-row md:col-span-5 md:justify-end lg:col-span-6">
          <Reveal delay={o + INTRO.cta} reduce={reduce}>
            <Magnetic reduce={reduce}>
              <button
                onClick={() => scrollToSection("works", reduce)}
                className="group cta cta-primary gap-3 px-8 py-4 text-base md:text-lg"
              >
                {t.hero.viewPortfolio}
                <ArrowRight className="cta-arrow h-5 w-5" />
              </button>
            </Magnetic>
          </Reveal>

          <Reveal delay={o + INTRO.cta + 0.08} reduce={reduce}>
            <Magnetic reduce={reduce}>
              <button
                onClick={() => scrollToSection("contact", reduce)}
                className="cta cta-secondary px-8 py-4 text-base md:text-lg"
              >
                {t.hero.letsTalk}
              </button>
            </Magnetic>
          </Reveal>
        </div>
        </div>
      </motion.div>

      {/* Scroll cue → Works (decorative; only on tall desktop viewports) */}
      <motion.div
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 md:[@media(min-height:800px)]:block"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={revealTransition(reduce, o + INTRO.cue, DURATION.reveal)}
      >
        <span className="relative block h-10 w-px overflow-hidden bg-foreground/15">
          <motion.span
            className="absolute inset-x-0 top-0 block h-4 bg-primary"
            initial={{ y: "-100%" }}
            animate={reduce ? { y: "0%" } : { y: ["-100%", "250%"] }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 1.8, ease: EASE, repeat: Infinity, repeatDelay: 0.4 }
            }
          />
        </span>
      </motion.div>
    </section>
  )
}
