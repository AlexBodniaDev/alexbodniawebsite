"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // First paint: no wrapper fade (the hero runs its own staged intro).
  // Route changes: fade as before.
  const isFirstRender = useRef(true)
  useEffect(() => {
    isFirstRender.current = false
  }, [])

  return (
    // NOTE: no `initial={false}` here - it silently disables the `initial`
    // animations of every motion element inside (it killed the hero intro).
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        // the new page mounts only after the old one has faded out: start it at the top, not wherever the old page was scrolled
        const root = document.documentElement
        const prev = root.style.scrollBehavior
        root.style.scrollBehavior = "auto"
        if (!window.location.hash) window.scrollTo(0, 0)
        root.style.scrollBehavior = prev
      }}
    >
      <motion.div
        key={pathname}
        initial={isFirstRender.current ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
