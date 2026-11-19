"use client"

import { useEffect } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cancelScrollAnimation } from "@/lib/motion"

/**
 * Soft, inertial mouse-wheel scrolling (no extra library).
 * The wheel only moves a *target*; every frame the page glides toward it.
 * Off for: touch devices (native momentum is already smooth), reduced motion,
 * pinch-zoom, nested scrollable areas, and while the page is scroll-locked
 * (loader / mobile menu). Keyboard, scrollbar drag and anchors keep working.
 */
const LERP = 0.1 // 0–1 : lower = floatier

function canScrollInside(el: HTMLElement | null, dy: number): boolean {
  while (el && el !== document.body && el !== document.documentElement) {
    const s = getComputedStyle(el)
    if ((s.overflowY === "auto" || s.overflowY === "scroll") && el.scrollHeight > el.clientHeight) {
      const atTop = el.scrollTop <= 0
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1
      if ((dy < 0 && !atTop) || (dy > 0 && !atBottom)) return true
    }
    el = el.parentElement
  }
  return false
}

export function SmoothScroll() {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return

    let target = window.scrollY
    let raf = 0
    let last = 0
    let lastSet = window.scrollY

    const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight
    const locked = () =>
      document.documentElement.style.overflow === "hidden" || document.body.style.overflow === "hidden"

    const tick = (now: number) => {
      const dt = Math.min(48, now - last || 16.67)
      last = now
      const cur = window.scrollY
      if (Math.abs(cur - lastSet) > 3) {
        // something else moved the page (scrollbar drag, keyboard, anchor) → follow it
        target = cur
        raf = 0
        return
      }
      const diff = target - cur
      if (Math.abs(diff) < 0.5) {
        window.scrollTo({ top: target, behavior: "instant" as ScrollBehavior })
        lastSet = window.scrollY
        raf = 0
        return
      }
      const next = cur + diff * (1 - Math.pow(1 - LERP, dt / 16.67))
      window.scrollTo({ top: next, behavior: "instant" as ScrollBehavior })
      lastSet = window.scrollY
      raf = requestAnimationFrame(tick)
    }

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.defaultPrevented || e.deltaY === 0 || locked()) return
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
      if (canScrollInside(e.target as HTMLElement | null, e.deltaY)) return

      e.preventDefault()
      cancelScrollAnimation()
      const unit = e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? window.innerHeight : 1
      if (!raf) {
        target = window.scrollY
        lastSet = window.scrollY
      }
      target = Math.max(0, Math.min(maxScroll(), target + e.deltaY * unit))
      if (!raf) {
        last = 0
        raf = requestAnimationFrame(tick)
      }
    }

    const onScroll = () => {
      if (!raf) {
        target = window.scrollY
        lastSet = window.scrollY
      }
    }
    const takeOver = () => cancelScrollAnimation()

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("touchstart", takeOver, { passive: true })
    window.addEventListener("keydown", takeOver)
    return () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("touchstart", takeOver)
      window.removeEventListener("keydown", takeOver)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduce])

  return null
}
