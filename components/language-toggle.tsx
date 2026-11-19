"use client"

import * as React from "react"
import { useLanguage } from "@/components/language-provider"
import type { Locale } from "@/lib/translations"

const LOCALES: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "uk", label: "UA" },
]

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLanguage()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div
        className={`h-9 w-17 rounded-full border border-border/60 bg-background/50 ${className}`}
        aria-hidden="true"
      />
    )
  }

  const activeIndex = Math.max(0, LOCALES.findIndex((l) => l.code === locale))

  return (
    <div
      role="group"
      aria-label="Language"
      className={`relative grid h-9 grid-cols-2 items-center gap-0.5 rounded-full border border-foreground/15 bg-background/70 p-1 dark:border-border/60 dark:bg-background/50 ${className}`}
    >
      {/* sliding pill - plain CSS transform, so it can never "fly" when the page scroll resets */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1 left-1 top-1 w-[calc((100%-0.5rem-0.125rem)/2)] rounded-full bg-foreground transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: activeIndex === 0 ? "translateX(0)" : "translateX(calc(100% + 0.125rem))" }}
      />
      {LOCALES.map((l) => {
        const isActive = locale === l.code
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLocale(l.code)}
            aria-pressed={isActive}
            className="group relative h-full min-w-9 rounded-full px-2.5 text-[11px] font-bold tracking-wide transition-colors duration-200"
          >
            <span
              className={`relative z-10 transition-colors duration-200 ${
                isActive ? "text-background" : "text-muted-foreground group-hover:text-foreground/80"
              }`}
            >
              {l.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
