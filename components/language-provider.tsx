"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type React from "react"
import { translations, type Locale } from "@/lib/translations"

type TranslationShape = typeof translations.en

type LanguageProviderProps = {
  children: React.ReactNode
  defaultLocale?: Locale
  storageKey?: string
}

type LanguageProviderState = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: TranslationShape
}

const initialState: LanguageProviderState = {
  locale: "en",
  setLocale: () => null,
  t: translations.en,
}

const LanguageProviderContext =
  createContext<LanguageProviderState>(initialState)

export function LanguageProvider({
  children,
  defaultLocale = "en",
  storageKey = "alex-portfolio-locale",
  ...props
}: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  useEffect(() => {
    const stored = localStorage.getItem(storageKey) as Locale | null

    if (stored && stored !== locale) {
      setLocaleState(stored)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  // ── INP FIX ─────────────────────────────────────────────────────────────
  // This provider wraps the entire app (Header, every section). Before, a
  // brand-new `value` object literal was created on every render, which
  // forces every component calling useLanguage() to re-render even when
  // locale hasn't changed. Memoizing it means consumers only re-render when
  // locale actually changes.
  const value = useMemo<LanguageProviderState>(
    () => ({
      locale,
      setLocale: (next: Locale) => {
        localStorage.setItem(storageKey, next)
        setLocaleState(next)
      },
      t: translations[locale] as TranslationShape,
    }),
    [locale, storageKey]
  )

  return (
    <LanguageProviderContext.Provider {...props} value={value}>
      {children}
    </LanguageProviderContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext)

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }

  return context
}