"use client"

import { useReducedMotion as useFramerReducedMotion } from "framer-motion"

/**
 * Shared reduced-motion helper - reuse in every step.
 * Wraps framer-motion's hook and always returns a boolean
 * (framer returns `null` on the server / before first read).
 */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false
}
