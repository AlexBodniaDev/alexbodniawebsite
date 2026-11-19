"use client"

import type { ReactNode } from "react"

/**
 * CHAPTER WRAPPER
 *
 * Every section on the home page is wrapped in one of these. Chapters now sit
 * one after another in normal document flow: nothing is pinned (`sticky`),
 * nothing is pulled over the previous chapter, and no section is ever drawn
 * on top of another. That means the content and buttons of the section you
 * are reading can never be covered by - or show through - a neighbour, and
 * every link stays easy to see and tap.
 *
 * The props are kept as they were so `app/page.tsx` does not need to change.
 * `data-slide` is also kept: `scrollToSection()` in `lib/motion.ts` uses it to
 * find where each chapter lives.
 */
export type TransitionVariant = "none" | "zoom" | "arch" | "stack" | "rise" | "reveal"

export function SlideSection({
  children,
}: {
  children: ReactNode
  index?: number
  variant?: TransitionVariant
  nextVariant?: TransitionVariant
  isLast?: boolean
}) {
  return (
    <div data-slide style={{ overflowAnchor: "none" }} className="relative isolate z-0 bg-background overflow-x-clip">
      {children}
    </div>
  )
}
