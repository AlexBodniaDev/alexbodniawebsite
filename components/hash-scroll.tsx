"use client"

import { useEffect } from "react"
import { scrollToSection } from "@/lib/motion"

/**
 * Lands on the right section when the home page is opened with a hash
 * (e.g. "Back to projects" from a case study → /#works).
 *
 * A page RELOAD must always start on the hero: the browser would otherwise
 * restore the old scroll position / re-apply a leftover "#works". The hash is
 * removed from the URL once it has been used, so it can't fire again later.
 */
export function HashScroll() {
  useEffect(() => {
    const clearHash = () =>
      window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search)

    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined
    const isReload = nav?.type === "reload"

    if (isReload) {
      if (window.location.hash) clearHash()
      const toTop = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior })
      toTop()
      // the browser may restore the old position a moment later - win that race
      const timers = [60, 250, 700].map((ms) => window.setTimeout(toTop, ms))
      return () => timers.forEach(window.clearTimeout)
    }

    const id = window.location.hash.replace("#", "")
    if (!id) return
    const timer = window.setTimeout(() => {
      scrollToSection(id, false)
      clearHash()
    }, 450)
    return () => window.clearTimeout(timer)
  }, [])
  return null
}
