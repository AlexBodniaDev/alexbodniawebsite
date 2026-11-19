"use client"

import { Children, Fragment, cloneElement, isValidElement, useEffect, useRef, useState } from "react"
import { animate, motion, useInView } from "framer-motion"
import type { ReactElement, ReactNode } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { DURATION, REVEAL_Y, VIEWPORT, VIEWPORT_MASK, revealTransition } from "@/lib/motion"

/** Fade + rise once when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  y = REVEAL_Y,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={revealTransition(reduce, delay)}
    >
      {children}
    </motion.div>
  )
}

type Wrap = (node: ReactNode, key: string) => ReactNode

/** Split any heading content (strings + <em>/<span> with text) into words, keeping the wrapping elements. */
function toWords(children: ReactNode, wrap?: Wrap, out: { node: ReactNode; key: string }[] = [], path = "") {
  Children.forEach(children, (child, i) => {
    const k = `${path}${i}`
    if (typeof child === "string" || typeof child === "number") {
      String(child)
        .split(/\s+/)
        .filter(Boolean)
        .forEach((w, j) => out.push({ node: wrap ? wrap(w, `${k}-${j}`) : w, key: `${k}-${j}` }))
    } else if (isValidElement(child)) {
      const el = child as ReactElement<{ children?: ReactNode }>
      toWords(
        el.props.children,
        (w, kk) => {
          const inner = cloneElement(el, { key: kk }, w)
          return wrap ? wrap(inner, kk) : inner
        },
        out,
        `${k}.`,
      )
    }
  })
  return out
}

/** Heading whose words slide up one after another from behind a mask when scrolled into view. */
export function MaskReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()
  const words = toWords(children)
  return (
    <span className={`block ${className ?? ""}`}>
      {words.map((w, i) => (
        <Fragment key={w.key}>
          <span className="inline-block overflow-hidden pt-[0.1em] pb-[0.2em] -mt-[0.1em] -mb-[0.2em] align-bottom">
            <motion.span
              className="inline-block will-change-transform"
              style={{ transformOrigin: "0% 100%" }}
              initial={{ y: reduce ? 0 : "112%", rotate: reduce ? 0 : 5 }}
              whileInView={{ y: 0, rotate: 0 }}
              viewport={VIEWPORT_MASK}
              transition={revealTransition(reduce, delay + Math.min(i, 10) * 0.055, DURATION.slow)}
            >
              {w.node}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  )
}

/** "30+" / "100%" → counts the number up once in view, keeps the suffix. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })
  const m = value.match(/^(\d+)(.*)$/)
  const target = m ? parseInt(m[1], 10) : 0
  const suffix = m ? m[2] : ""
  const [n, setN] = useState(reduce ? target : 0)

  useEffect(() => {
    if (!m || !inView) return
    if (reduce) return setN(target)
    const c = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    })
    return () => c.stop()
  }, [inView, reduce, target]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!m) return <span className={className}>{value}</span>
  return (
    <span ref={ref} className={className}>
      {n}
      {suffix}
    </span>
  )
}
