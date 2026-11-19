"use client"

import { useState, useEffect, useCallback, useRef, memo, startTransition } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter, usePathname } from "next/navigation"
import data from "@/lib/data.json"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/components/language-provider"
import { Download, ArrowUpRight, Mail } from "lucide-react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { DURATION, EASE, REVEAL_Y, revealTransition, scrollToSection } from "@/lib/motion"

interface NavItem {
  label: string
  sectionId: string
}

// ── Active-link indicator: solid ink pill, same language as the EN/UA toggle ─
const ActivePill = memo(function ActivePill() {
  const reduce = useReducedMotion()
  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-full bg-foreground"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={reduce ? { duration: 0 } : { duration: DURATION.micro, ease: EASE }}
      style={{ zIndex: 0 }}
    />
  )
})

export function Header() {
  const router   = useRouter()
  const pathname = usePathname()
  const { t }    = useLanguage()

  const NAV_ITEMS: NavItem[] = [
    { label: t.nav.home,         sectionId: "hero" },
    { label: t.nav.works,        sectionId: "works" },
    { label: t.nav.about,        sectionId: "about" },
    { label: t.nav.testimonials, sectionId: "testimonials" },
    { label: t.nav.faq,          sectionId: "faq" },
    { label: t.nav.contact,      sectionId: "contact" },
  ]

  const [isScrolled,       setIsScrolled]       = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection,    setActiveSection]    = useState("hero")
  const reduce = useReducedMotion()

  // While a nav click is smooth-scrolling, ignore scroll-spy so the
  // tubelight doesn't hop through every section on the way.
  const navLock   = useRef(false)
  const lockTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Scroll handler with requestAnimationFrame ─────────────────────────────
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("works")
      return
    }

    let ticking = false
    const ids = ["hero", "works", "about", "testimonials", "faq", "contact"]

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY
          setIsScrolled(scrollY > 40)

          if (navLock.current) {
            // release once scrolling has been idle for a moment
            if (lockTimer.current) clearTimeout(lockTimer.current)
            lockTimer.current = setTimeout(() => { navLock.current = false }, 140)
            ticking = false
            return
          }

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

  useEffect(() => () => {
    if (lockTimer.current) clearTimeout(lockTimer.current)
  }, [])

  // ── Mobile menu: lock body scroll, close on Esc / when resized to desktop ─
  useEffect(() => {
    if (!isMobileMenuOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false)
    }
    const mq = window.matchMedia("(min-width: 1280px)")
    const onMq = () => { if (mq.matches) setIsMobileMenuOpen(false) }

    window.addEventListener("keydown", onKey)
    mq.addEventListener("change", onMq)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener("keydown", onKey)
      mq.removeEventListener("change", onMq)
    }
  }, [isMobileMenuOpen])

  // ── Navigation action wrapped in startTransition ──────────────────────────
  const navigateTo = useCallback((sectionId: string) => {
    startTransition(() => {
      setActiveSection(sectionId)
    })

    if (pathname === "/") {
      navLock.current = true
      if (lockTimer.current) clearTimeout(lockTimer.current)
      lockTimer.current = setTimeout(() => { navLock.current = false }, 700) // failsafe

      if (isMobileMenuOpen) {
        // let the body-scroll lock release before the smooth scroll starts
        setIsMobileMenuOpen(false)
        window.setTimeout(() => scrollToSection(sectionId, reduce), 60)
      } else {
        scrollToSection(sectionId, reduce)
      }
    } else {
      router.push(`/#${sectionId}`)
      setIsMobileMenuOpen(false)
    }
  }, [pathname, router, reduce, isMobileMenuOpen])

  // ── Mobile overlay variants (instant under reduced motion) ────────────────
  const overlayVariants = {
    hidden: { opacity: 0, y: reduce ? 0 : -10 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduce
        ? { duration: 0 }
        : { duration: 0.35, ease: EASE, staggerChildren: 0.06, delayChildren: 0.12 },
    },
    exit: {
      opacity: 0,
      y: reduce ? 0 : -10,
      transition: reduce ? { duration: 0 } : { duration: DURATION.micro, ease: EASE },
    },
  }
  const menuItemVariants = {
    hidden: { opacity: 0, y: reduce ? 0 : REVEAL_Y },
    show: { opacity: 1, y: 0, transition: revealTransition(reduce, 0, 0.6) },
  }

  const closeMenu = () => setIsMobileMenuOpen(false)

  return (
    <>
      {/* ───────────────────────── DESKTOP HEADER - one long pill ───────────────────────── */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 hidden justify-center px-4 pt-4 xl:flex xl:px-8">
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={revealTransition(reduce, 0.1, 0.6)}
          className={`glass-edge pointer-events-auto flex w-full max-w-[72rem] items-center gap-2 rounded-full border p-1.5 pl-5 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ${
            isScrolled
              ? "border-foreground/25 bg-background/90 shadow-[0_14px_40px_-18px_rgb(0_0_0/0.45)] dark:border-border"
              : "border-foreground/15 bg-background/75 dark:border-border/60 dark:bg-background/55"
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => navigateTo("hero")}
            className="group flex shrink-0 items-center gap-2.5 rounded-full pr-2 touch-manipulation select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <span className="relative flex h-2 w-2" title={t.header.available}>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-display text-[0.8rem] font-extrabold tracking-[-0.04em] transition-opacity duration-200 group-hover:opacity-75">
              Alex <span className="text-foreground/55">Bodnia</span>
            </span>
          </button>

          <span aria-hidden="true" className="h-6 w-px shrink-0 bg-border" />

          {/* Nav */}
          <nav className="flex min-w-0 flex-1 items-center justify-center gap-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.sectionId
              return (
                <button
                  key={item.sectionId}
                  onClick={() => navigateTo(item.sectionId)}
                  aria-current={isActive ? "true" : undefined}
                  className="group relative flex items-center rounded-full px-3.5 py-2.5 font-display text-[0.75rem] font-semibold tracking-[-0.01em] touch-manipulation select-none transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-primary 2xl:px-4"
                >
                  {!isActive && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-full bg-foreground/[0.07] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    />
                  )}
                  <AnimatePresence initial={false}>
                    {isActive && <ActivePill key="active" />}
                  </AnimatePresence>
                  <span
                    className={`relative z-10 transition-[color,transform] duration-200 ${
                      isActive ? "text-background" : "text-muted-foreground group-hover:-translate-y-px group-hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              )
            })}
          </nav>

          <span aria-hidden="true" className="h-6 w-px shrink-0 bg-border" />

          {/* Actions - same height, same pill shape as everything else */}
          <div className="flex shrink-0 items-center gap-1.5">
            <LanguageToggle className="h-10 border-transparent! bg-foreground/[0.06]!" />
            <ThemeToggle className="h-10 w-10 rounded-full! bg-foreground/[0.06] p-0 hover:bg-foreground/15!" />
            <a
              href="/documents/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group cta cta-primary h-10 min-h-0 gap-2 px-5 text-[0.75rem]"
            >
              <Download className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-px" />
              <span>{t.header.resume}</span>
              <ArrowUpRight className="h-3 w-3 opacity-70 transition-[transform,opacity] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* ───────────── MOBILE - centered top pill ───────────── */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 mx-auto flex w-full justify-center px-3 pt-[calc(0.75rem+env(safe-area-inset-top,0px))] xl:hidden">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={revealTransition(reduce, 0.1, 0.6)}
          className={`glass-edge pointer-events-auto mx-auto flex w-max max-w-full items-center justify-center gap-6 rounded-full border py-1.5 pl-5 pr-1.5 transition-[background-color,border-color,box-shadow] duration-300 ${
            isScrolled || isMobileMenuOpen
              ? "border-foreground/20 bg-background/95 dark:border-border"
              : "border-foreground/15 bg-background/85 dark:border-border/60 dark:bg-background/55"
          }`}
        >
          <button
            onClick={() => { closeMenu(); navigateTo("hero") }}
            className="rounded-full font-display text-[0.85rem] font-extrabold tracking-[-0.04em] touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Alex <span className="text-foreground/55">Bodnia</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label={isMobileMenuOpen ? t.header.closeMenu : t.header.menu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-foreground text-background touch-manipulation transition-transform duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span className="relative block h-3 w-[18px]" aria-hidden="true">
              <motion.span
                className="absolute left-0 top-0 block h-[1.5px] w-full rounded-full bg-current"
                animate={isMobileMenuOpen ? { y: 5.25, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={reduce ? { duration: 0 } : { duration: 0.3, ease: EASE }}
              />
              <motion.span
                className="absolute bottom-0 left-0 block h-[1.5px] w-full rounded-full bg-current"
                animate={isMobileMenuOpen ? { y: -5.25, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={reduce ? { duration: 0 } : { duration: 0.3, ease: EASE }}
              />
            </span>
          </button>
        </motion.div>
      </div>

      {/* ───────────── MOBILE - fullscreen menu ───────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t.header.menu}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-background px-[clamp(1.25rem,6vw,2rem)] pb-[calc(2rem+env(safe-area-inset-bottom,0px))] pt-28 xl:hidden"
            variants={overlayVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <div className="flex flex-1 flex-col">
              <nav aria-label={t.header.menu}>
                <ul className="border-t border-border">
                  {NAV_ITEMS.map((item) => {
                    const isActive = activeSection === item.sectionId
                    return (
                      <motion.li key={item.sectionId} variants={menuItemVariants} className="border-b border-border">
                        <button
                          type="button"
                          onClick={() => navigateTo(item.sectionId)}
                          aria-current={isActive ? "true" : undefined}
                          className="group flex min-h-[4.5rem] w-full items-center gap-4 py-4 text-left touch-manipulation focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-primary"
                        >
                          <span
                            aria-hidden="true"
                            className={`h-2 w-2 shrink-0 rounded-full bg-foreground transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                              isActive ? "scale-100" : "scale-0"
                            }`}
                          />
                          <span
                            className={`font-display text-[clamp(1.6rem,1.05rem+2.7vw,2.25rem)] font-bold leading-tight tracking-[-0.035em] transition-colors duration-300 ${
                              isActive ? "text-foreground" : "text-foreground/50 group-active:text-foreground"
                            }`}
                          >
                            {item.label}
                          </span>
                        </button>
                      </motion.li>
                    )
                  })}
                </ul>
              </nav>

              {/* one action, then the quiet settings */}
              <motion.div variants={menuItemVariants} className="mt-auto space-y-8 pt-14">
                <a
                  href="/documents/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="cta cta-primary w-full gap-2.5 px-6 py-4 text-base"
                >
                  <Download className="h-4 w-4" />
                  {t.header.downloadResume}
                </a>

                <div className="flex items-center justify-between gap-4">
                  <a
                    href={`mailto:${data.personal.email}`}
                    onClick={closeMenu}
                    className="flex min-w-0 items-center gap-2.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="truncate">{data.personal.email}</span>
                  </a>
                  <div className="flex shrink-0 items-center gap-2">
                    <LanguageToggle className="h-11" />
                    <ThemeToggle className="h-11 w-11 rounded-full! border border-border p-0" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
