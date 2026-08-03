"use client"
import { createContext, useContext, useEffect, useState } from "react"
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

    // ⚡ ОПТИМІЗАЦІЯ INP: Тимчасово вимикаємо всі CSS transition,
    // щоб браузер не намагався анімувати кольори всього сайту одночасно
    const css = document.createElement("style")
    css.type = "text/css"
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

    // Змінюємо тему
    root.classList.remove("light", "dark")
    root.classList.add(theme)

    // Примусово застосовуємо нові стилі без анімації (force reflow)
    const _ = window.getComputedStyle(document.body).opacity

    // Повертаємо CSS-переходи у наступному кадрі
    requestAnimationFrame(() => {
      document.head.removeChild(css)
    })
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
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