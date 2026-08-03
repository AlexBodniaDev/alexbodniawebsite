"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"
import type { Locale } from "@/lib/translations"

const LOCALES: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "uk", label: "UA" },
]

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLanguage()
  const [mounted, setMounted] = React.useState(false)
  
  // Генеруємо унікальний ідентифікатор для кожного екземпляра компонента
  const uniqueId = React.useId()

  React.useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div
        className={`h-9 w-17 rounded-full border border-border/60 bg-background/50 ${className}`}
        aria-hidden="true"
      />
    )
  }

  return (
    <div
      role="group"
      aria-label="Language"
      className={`relative flex items-center gap-0.5 h-9 rounded-full border border-border/60 bg-background/50 p-1 ${className}`}
    >
      {LOCALES.map((l) => {
        const isActive = locale === l.code
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLocale(l.code)}
            aria-pressed={isActive}
            className="group relative px-2.5 h-full rounded-full text-[11px] font-bold tracking-wide transition-colors duration-200"
          >
            {isActive && (
              <motion.span
                layoutId={`language-pill-${uniqueId}`}
                className="absolute inset-0 rounded-full bg-foreground"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
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