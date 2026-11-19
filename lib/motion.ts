/**
 * ONE MOTION SYSTEM - shared constants for every step.
 * Animate only transform / opacity. Reveals: opacity + translateY, once.
 */

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const DURATION = {
  micro: 0.2, // hovers, small state changes
  reveal: 0.7, // standard reveal (0.6–0.9s range)
  slow: 0.9, // large headline / hero reveals
} as const

/** Stagger between siblings (0.06–0.1s range) */
export const STAGGER = 0.08

/** Max translateY (px) for reveals */
export const REVEAL_Y = 24

/** Transition for a reveal; collapses to instant under reduced motion. */
export function revealTransition(
  reduce: boolean,
  delay = 0,
  duration: number = DURATION.reveal,
) {
  return reduce ? { duration: 0 } : { duration, delay, ease: EASE }
}

/**
 * Document offset of a section's NATURAL (un-pinned) top. Sections are
 * `position: sticky` chapters, so getBoundingClientRect() of a pinned one is
 * not where it lives in the page - compute it from the stack instead.
 */
function sectionTop(el: HTMLElement): number {
  const wrap = el.closest<HTMLElement>("[data-slide]")
  const parent = wrap?.parentElement
  if (!wrap || !parent) return el.getBoundingClientRect().top + window.scrollY
  let before = 0
  for (const sib of Array.from(parent.children)) {
    if (sib === wrap) break
    before += (sib as HTMLElement).offsetHeight
  }
  return parent.getBoundingClientRect().top + window.scrollY + before
}

let scrollRaf = 0

/** Stop any running programmatic scroll (called when the user takes over with wheel / touch / keys). */
export function cancelScrollAnimation() {
  if (scrollRaf) cancelAnimationFrame(scrollRaf)
  scrollRaf = 0
}

/** Eased programmatic scroll (ease-in-out, duration scales with distance). Instant under reduced motion. */
export function animateScrollTo(target: number, reduce: boolean) {
  cancelScrollAnimation()
  const from = window.scrollY
  const max = document.documentElement.scrollHeight - window.innerHeight
  const to = Math.max(0, Math.min(target, max))
  const dist = Math.abs(to - from)
  if (reduce || dist < 2) {
    window.scrollTo({ top: to, behavior: "instant" as ScrollBehavior })
    return
  }
  const duration = Math.min(1500, Math.max(700, dist * 0.45))
  const t0 = performance.now()
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2) // easeInOutCubic
  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / duration)
    window.scrollTo({ top: from + (to - from) * ease(p), behavior: "instant" as ScrollBehavior })
    scrollRaf = p < 1 ? requestAnimationFrame(step) : 0
  }
  scrollRaf = requestAnimationFrame(step)
}

/** Smooth-scroll to a section id (instant under reduced motion). */
export function scrollToSection(id: string, reduce: boolean) {
  const el = document.getElementById(id)
  if (!el) return
  animateScrollTo(sectionTop(el), reduce)
}

/**
 * Shared scroll-reveal viewport: an element animates only once it has really
 * entered the screen (a slice of it is visible, and it's clear of the bottom edge).
 */
export const VIEWPORT = { once: true, amount: 0.15, margin: "0px 0px -10% 0px" } as const

/**
 * Viewport for masked headings (MaskReveal). The words start hidden BEHIND an
 * overflow mask, so their visible area is 0 - an `amount` threshold would never
 * fire. Trigger on entering the screen instead (no `amount`).
 */
export const VIEWPORT_MASK = { once: true, margin: "0px 0px -8% 0px" } as const

/**
 * Cursor-aware sheen: stores the pointer position (px, relative to the element) in --sx / --sy.
 * The soft highlight itself is pure CSS (.sheen-frame in globals.css). Mouse only - touch ignores it.
 */
export function onSheenMove(e: { pointerType: string; clientX: number; clientY: number; currentTarget: HTMLElement }) {
  if (e.pointerType !== "mouse") return
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty("--sx", `${e.clientX - r.left}px`)
  el.style.setProperty("--sy", `${e.clientY - r.top}px`)
}
