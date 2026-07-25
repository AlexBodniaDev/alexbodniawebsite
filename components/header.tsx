"use client"

import { useState, useEffect, useCallback, memo, startTransition } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter, usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/components/language-provider"
import { Download, ArrowUpRight, Home, User, Briefcase, Mail, Quote } from "lucide-react"

interface NavItem {
  label: string
  sectionId: string
  icon: React.ElementType
}

// ── CSS Tubelight Indicator ─────────────────────────────────────────────────
const TubelightIndicator = memo(function TubelightIndicator() {
  return (
    <motion.span
      className="absolute inset-0 rounded-full pointer-events-none"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      style={{ zIndex: 0 }}
    >
      <span className="absolute inset-0 rounded-full bg-foreground/10 dark:bg-white/10 border border-foreground/15 dark:border-white/20 backdrop-blur-xs" />
      <span className="absolute inset-x-2 -bottom-2 h-4 rounded-full bg-foreground/15 dark:bg-white/20 blur-xs" />
      <span className="absolute inset-x-3 top-0 h-px rounded-full bg-foreground/25 dark:bg-white/30" />
    </motion.span>
  )
})

export function Header() {
  const router   = useRouter()
  const pathname = usePathname()
  const { t }    = useLanguage()

  const NAV_ITEMS: NavItem[] = [
    { label: t.nav.home,         sectionId: "hero",         icon: Home      },
    { label: t.nav.works,        sectionId: "works",        icon: Briefcase },
    { label: t.nav.about,        sectionId: "about",        icon: User      },
    { label: t.nav.testimonials, sectionId: "testimonials", icon: Quote     },
    { label: t.nav.contact,      sectionId: "contact",      icon: Mail      },
  ]

  const [isScrolled,       setIsScrolled]       = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection,    setActiveSection]    = useState("hero")

  // ── Scroll handler ────────────────────────────────────────────────────────
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("works")
      return
    }

    let ticking = false
    const ids = ["hero", "works", "about", "testimonials", "contact"]

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY
          setIsScrolled(scrollY > 40)

          const viewThreshold = window.innerHeight * 0.35
          let current = "hero"
          for (let i = 0; i < ids.length; i++) {
            const el = document.getElementById(ids[i])
            if (el && el.getBoundingClientRect().top <= viewThreshold) {
              current = ids[i]
            }
          }
          
          startTransition(() => {
            setActiveSection(current)
          })
          ticking = false
        })
        ticking = true
      }
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [pathname])

  // ── Navigation action ─────────────────────────────────────────────────────
  const navigateTo = useCallback((sectionId: string) => {
    startTransition(() => {
      setActiveSection(sectionId)
    })

    if (pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    } else {
      router.push(`/#${sectionId}`)
    }
    setIsMobileMenuOpen(false)
  }, [pathname, router])

  return (
    <>
      {/* DESKTOP HEADER (Restored to md: / 768px+) */}
      <div className="fixed top-0 left-0 right-0 z-50 hidden md:block pointer-events-none">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-2 md:gap-4">

            {/* Left Zone: Logo & Status Badge */}
            <div className="pointer-events-auto flex items-center gap-3 shrink-0">
              <button
                onClick={() => navigateTo("hero")}
                className="flex items-center gap-2.5 touch-manipulation select-none"
              >
                <span className="font-mono text-sm font-semibold tracking-tight md:hover:opacity-75 transition-opacity duration-200 whitespace-nowrap">
                  Alex Bodnia
                </span>
                <span className="hidden xl:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-emerald-500 leading-none">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  {t.header.available}
                </span>
              </button>
            </div>

            {/* Center Zone: Central Nav Pill (In-Flow, Zero Overlap) */}
            <div className="pointer-events-auto flex items-center shrink-0">
              <nav
                className={`
                  relative flex items-center gap-0.5 rounded-full p-1 lg:p-1.5
                  border border-border/40 dark:border-white/10
                  transition-colors duration-300
                  ${isScrolled
                    ? "bg-background/80 backdrop-blur-md shadow-md border-border/60 dark:border-white/15"
                    : "bg-background/50 dark:bg-white/5 backdrop-blur-xs"
                  }
                `}
              >
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.sectionId
                  return (
                    <button
                      key={item.sectionId}
                      onClick={() => navigateTo(item.sectionId)}
                      className="relative flex items-center px-2 md:px-2.5 lg:px-3.5 py-1 md:py-1.5 rounded-full text-xs md:text-xs lg:text-sm font-medium transition-colors duration-200 touch-manipulation select-none whitespace-nowrap"
                    >
                      {isActive && <TubelightIndicator />}
                      <span
                        className={`relative z-10 transition-colors duration-200 ${
                          isActive
                            ? "text-foreground font-semibold"
                            : "text-muted-foreground md:hover:text-foreground"
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Right Zone: Controls & Full Resume Button */}
            <div className="pointer-events-auto flex items-center gap-1.5 md:gap-2 shrink-0">
              <LanguageToggle />
              <ThemeToggle />
              <button
                onClick={() => window.open("/cv.pdf", "_blank")}
                className="relative flex items-center gap-1.5 rounded-full bg-foreground px-3 md:px-3.5 lg:px-4 py-1.5 md:py-2 text-xs md:text-xs lg:text-sm font-medium text-background transition-transform duration-200 active:scale-95 md:hover:bg-foreground/85 touch-manipulation select-none whitespace-nowrap shrink-0"
              >
                <Download className="relative h-3.5 w-3.5" />
                <span className="relative">{t.header.resume}</span>
                <ArrowUpRight className="relative h-3 w-3 opacity-60" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* MOBILE — Top Bar (< 768px) */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 flex md:hidden items-center justify-between px-5 h-16 transition-colors duration-300 ${
          isScrolled
            ? "bg-background/95 border-b border-border/20"
            : "bg-transparent"
        }`}
      >
        <button onClick={() => navigateTo("hero")} className="flex items-center gap-2 touch-manipulation">
          <span className="font-mono text-sm font-semibold tracking-tight">Alex Bodnia</span>
        </button>

        <div className="flex items-center gap-2">
          <LanguageToggle className="h-9" />
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(v => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/80 active:scale-95 touch-manipulation"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileMenuOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-center"
                >
                  <span className="relative flex h-4 w-4">
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="block h-px w-full bg-foreground rounded-full rotate-45" />
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="block h-px w-full bg-foreground rounded-full -rotate-45" />
                    </span>
                  </span>
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ opacity: 0, rotate: 45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -45 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col gap-1.25 w-4.5"
                >
                  <span className="block h-px w-full bg-foreground rounded-full" />
                  <span className="block h-px w-3.25 bg-foreground rounded-full" />
                  <span className="block h-px w-full bg-foreground rounded-full" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* MOBILE — Bottom Dock (< 768px) */}
      {/*
        NOTE: no backdrop-blur here on purpose. This element is fixed and
        always mounted (unlike the top bar, which only blurs once scrolled).
        A fixed, always-on backdrop-filter sitting over actively scrolling
        content is one of the most expensive things to ask Android Chrome's
        compositor to do — it has to resample everything underneath every
        single frame. bg-background/95 is close to opaque so it reads almost
        identically without that per-frame cost.
      */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex md:hidden pointer-events-auto max-w-[calc(100vw-2rem)]">
        <div className="flex items-center gap-0.5 rounded-full border border-border/60 dark:border-white/15 bg-background/95 p-1.5 shadow-lg overflow-x-auto no-scrollbar">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.sectionId
            const Icon = item.icon
            return (
              <button
                key={item.sectionId}
                onClick={() => navigateTo(item.sectionId)}
                className={`relative flex flex-col items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full transition-colors duration-150 touch-manipulation select-none shrink-0 ${
                  isActive
                    ? "bg-foreground/10 dark:bg-white/10 text-foreground font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-[9px] sm:text-[10px] font-medium leading-none whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* MOBILE — Overlay Drawer (< 768px) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col md:hidden bg-background px-8 pt-20 pb-12"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="flex-1 flex flex-col justify-center">
              <nav className="flex flex-col">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.sectionId
                  return (
                    <button
                      key={item.sectionId}
                      onClick={() => navigateTo(item.sectionId)}
                      className="flex items-center justify-between border-b border-border/20 py-4 text-left active:opacity-70 touch-manipulation"
                    >
                      <div className="flex items-center gap-4">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/40 bg-muted/40">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        </span>
                        <span
                          className={`text-2xl sm:text-3xl font-semibold tracking-tight ${
                            isActive ? "text-foreground" : "text-foreground/50"
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                      <ArrowUpRight
                        className={`h-5 w-5 ${
                          isActive ? "text-foreground opacity-100" : "text-muted-foreground opacity-30"
                        }`}
                      />
                    </button>
                  )
                })}
              </nav>

              <div className="mt-8 flex flex-col gap-3">
                <button
                  onClick={() => {
                    window.open("/cv.pdf", "_blank")
                    setIsMobileMenuOpen(false)
                  }}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-muted/40 px-6 py-3.5 text-base font-medium active:scale-98 touch-manipulation"
                >
                  <Download className="h-4 w-4" />
                  {t.header.downloadResume}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-50" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}