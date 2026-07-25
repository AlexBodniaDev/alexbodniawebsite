"use client"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type React from "react"

type Theme = "light" | "dark"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem(storageKey) as Theme) || defaultTheme
    }
    return defaultTheme
  })

  useEffect(() => {
    const root = window.document.documentElement

    // Briefly disable transitions so the theme swap doesn't animate every
    // element's colors at once.
    const css = document.createElement("style")
    css.appendChild(
      document.createTextNode(
        `* {
           -webkit-transition: none !important;
           -moz-transition: none !important;
           -o-transition: none !important;
           -ms-transition: none !important;
           transition: none !important;
         }`
      )
    )
    document.head.appendChild(css)

    root.classList.remove("light", "dark")
    root.classList.add(theme)

    // ── INP FIX ───────────────────────────────────────────────────────────
    // The previous version called `window.getComputedStyle(document.body).opacity`
    // here to "force a reflow". That's a synchronous layout read/recalculation
    // on the main thread, deliberately triggered on every single theme-toggle
    // click — exactly the kind of long task that shows up as poor INP. Adding
    // the class is already synchronous and the style tag above is already
    // applied before the next paint, so the forced read added cost without
    // adding any visual benefit. Just let the next frame clean up the
    // transition-disabling style tag.
    requestAnimationFrame(() => {
      document.head.removeChild(css)
    })
  }, [theme])

  // Memoize so consumers of useTheme() don't re-render on every parent
  // render — only when theme actually changes.
  const value = useMemo<ThemeProviderState>(
    () => ({
      theme,
      setTheme: (next: Theme) => {
        localStorage.setItem(storageKey, next)
        setTheme(next)
      },
    }),
    [theme, storageKey]
  )

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}