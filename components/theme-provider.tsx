"use client"
import { createContext, useContext, useEffect, useState } from "react"
import type React from "react"

type Theme = "light" | "dark"

type ThemeProviderProps = {
  children: React.ReactNode
  /** used only when nothing is saved AND the device does not report a preference */
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

/** saved choice → device preference → defaultTheme (dark) */
function resolveTheme(storageKey: string, fallback: Theme): Theme {
  try {
    const saved = localStorage.getItem(storageKey)
    if (saved === "light" || saved === "dark") return saved
  } catch {}
  if (window.matchMedia("(prefers-color-scheme: light)").matches) return "light"
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark"
  return fallback
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  // The <html> class is already set by the inline script in layout.tsx (no flash),
  // so the first client render just reads it. The server renders the default.
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme
    return document.documentElement.classList.contains("light") ? "light" : resolveTheme(storageKey, defaultTheme)
  })

  useEffect(() => {
    const root = window.document.documentElement

    // ⚡ INP: briefly disable CSS transitions so the whole site doesn't animate colours at once
    const css = document.createElement("style")
    css.appendChild(
      document.createTextNode(
        `* { -webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; -ms-transition: none !important; transition: none !important; }`
      )
    )
    document.head.appendChild(css)

    root.classList.remove("light", "dark")
    root.classList.add(theme)
    root.style.colorScheme = theme

    // force reflow, then give transitions back on the next frame
    void window.getComputedStyle(document.body).opacity
    requestAnimationFrame(() => {
      if (css.parentNode) document.head.removeChild(css)
    })
  }, [theme])

  // No saved choice → keep following the device (OS switches light/dark → site follows)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = (e: MediaQueryListEvent) => {
      let saved: string | null = null
      try {
        saved = localStorage.getItem(storageKey)
      } catch {}
      if (saved === "light" || saved === "dark") return
      setThemeState(e.matches ? "dark" : "light")
    }
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [storageKey])

  const value = {
    theme,
    setTheme: (next: Theme) => {
      try {
        localStorage.setItem(storageKey, next)
      } catch {}
      setThemeState(next)
    },
  }

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
