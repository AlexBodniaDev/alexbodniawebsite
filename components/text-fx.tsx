"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

/* ──────────────────────────────────────────────────────────────────────────
   ScrollText - a big statement whose words light up one by one as you scroll
   (opacity only). Pass a plain string.
   ────────────────────────────────────────────────────────────────────────── */
function Word({
  word,
  i,
  n,
  progress,
}: {
  word: string
  i: number
  n: number
  progress: MotionValue<number>
}) {
  const start = (i / n) * 0.85
  const opacity = useTransform(progress, [start, start + 0.15], [0.16, 1])
  return (
    <>
      <motion.span style={{ opacity }} className="inline-block">
        {word}
      </motion.span>{" "}
    </>
  )
}

export function ScrollText({ children, className = "" }: { children: string; className?: string }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.88", "end 0.55"] })
  const words = children.split(/\s+/).filter(Boolean)
  if (reduce) return <p className={className}>{children}</p>
  return (
    <p ref={ref} className={className} aria-label={children}>
      {words.map((w, i) => (
        <Word key={i} word={w} i={i} n={words.length} progress={scrollYProgress} />
      ))}
    </p>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
   TextBand - tilted band in the CTA colour with giant type that slides
   sideways as the page scrolls. Decorative (the words exist elsewhere on the
   page), so it is aria-hidden.
   ────────────────────────────────────────────────────────────────────────── */
function Spark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" className="h-[0.7em] w-[0.7em] shrink-0">
      <path d="M50 0C54 36 64 46 100 50C64 54 54 64 50 100C46 64 36 54 0 50C36 46 46 36 50 0Z" fill="currentColor" />
    </svg>
  )
}

export function TextBand({
  items,
  reverse = false,
  tilt = -1.4,
  className = "",
}: {
  items: string[]
  reverse?: boolean
  tilt?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const x = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : reverse ? ["-38%", "0%"] : ["0%", "-38%"])
  const list = items.filter(Boolean)
  const run = Array.from({ length: Math.max(10, list.length * 5) }, (_, i) => list[i % list.length])

  return (
    <div className={`relative overflow-x-clip ${className}`} aria-hidden="true">
      <div
        ref={ref}
        className="-ml-[3%] w-[106%] overflow-hidden text-band py-4 md:py-6"
        style={{ transform: `rotate(${tilt}deg)` }}
      >
        <motion.div
          style={{ x }}
          className="flex w-max items-center gap-6 whitespace-nowrap text-[clamp(1.75rem,1rem+3.6vw,4.5rem)] font-semibold leading-none tracking-[-0.045em] will-change-transform md:gap-10"
        >
          {run.map((t, i) => (
            <span key={i} className="flex items-center gap-6 md:gap-10">
              <span>{t}</span>
              <Spark />
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
