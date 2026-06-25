"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter, usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Download, ArrowUpRight, Home, User, Briefcase, Mail } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────
interface NavItem {
  label: string
  sectionId: string
  icon: React.ElementType
}

// ─── Nav items ────────────────────────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  { label: "Home",    sectionId: "hero",    icon: Home      },
  { label: "Works",   sectionId: "works",   icon: Briefcase },
  { label: "About",   sectionId: "about",   icon: User      },
  { label: "Contact", sectionId: "contact", icon: Mail      },
]

// ─── Tubelight pill — the glowing active indicator ───────────────────────────
function TubelightIndicator({ activeIndex }: { activeIndex: number }) {
  return (
    <motion.span
      className="absolute inset-0 rounded-full"
      layoutId="tubelight-pill"
      transition={{ type: "spring", stiffness: 380, damping: 36 }}
      style={{ zIndex: 0 }}
    >
      {/* Frosted pill */}
      <span className="absolute inset-0 rounded-full bg-white/10 dark:bg-white/8 border border-white/20 dark:border-white/10 backdrop-blur-sm" />
      {/* Glow bloom under the pill */}
      <span className="absolute inset-x-2 -bottom-2 h-4 rounded-full bg-white/30 dark:bg-white/20 blur-md" />
      {/* Inner top shimmer */}
      <span className="absolute inset-x-3 top-0 h-px rounded-full bg-white/60 dark:bg-white/30" />
    </motion.span>
  )
}

// ─── Main header ─────────────────────────────────────────────────────────────
export function Header() {
  const router   = useRouter()
  const pathname = usePathname()

  const [isScrolled,      setIsScrolled     ] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection,   setActiveSection  ] = useState("hero")

  // Derived active index for the pill
  const activeIndex = NAV_ITEMS.findIndex(i => i.sectionId === activeSection)

  // ── Scroll listener ──────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40)

      // Use getBoundingClientRect so position is always accurate regardless of layout
      // Walk in actual page order; last section whose top edge is at/above 30% viewport height wins
      const ids = ["hero", "works", "about", "contact"]
      let current = "hero"
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) {
          current = id
        }
      }
      setActiveSection(current)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // ── Body scroll lock ─────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isMobileMenuOpen])

  // ── Navigate ─────────────────────────────────────────────────────────────
  const navigateTo = (sectionId: string) => {
    if (pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    } else {
      router.push(`/#${sectionId}`)
    }
    setTimeout(() => setIsMobileMenuOpen(false), 120)
  }

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          DESKTOP HEADER — three-column layout
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="fixed top-0 left-0 right-0 z-50 hidden md:block pointer-events-none">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex h-[72px] items-center justify-between">

            {/* ── Logo ──────────────────────────────────────────────────── */}
            <motion.button
              onClick={() => navigateTo("hero")}
              className="pointer-events-auto flex items-center gap-3 group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-mono text-sm font-semibold tracking-tight group-hover:opacity-75 transition-opacity duration-200">Alex Bodnia</span>

              {/* Available pill */}
              <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/8 px-2.5 py-1 text-[10px] font-medium text-emerald-500 leading-none">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                Available
              </span>
            </motion.button>

            {/* ── Floating pill nav — absolutely centered ───────────────── */}
            <motion.nav
              className="pointer-events-auto absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Outer pill shell */}
              <div
                className={`
                  relative flex items-center gap-0.5 rounded-full p-1.5
                  border border-white/10 dark:border-white/8
                  transition-all duration-500
                  ${isScrolled
                    ? "bg-background/60 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.18)] border-white/15"
                    : "bg-white/5 backdrop-blur-lg"
                  }
                `}
              >
                {NAV_ITEMS.map((item, i) => {
                  const isActive = activeSection === item.sectionId
                  return (
                    <button
                      key={item.sectionId}
                      onClick={() => navigateTo(item.sectionId)}
                      className="relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
                    >
                      {/* Shared sliding pill + glow */}
                      {isActive && <TubelightIndicator activeIndex={i} />}

                      <span
                        className={`relative z-10 transition-colors duration-200 ${
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground/80"
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </motion.nav>

            {/* ── Right actions ─────────────────────────────────────────── */}
            <motion.div
              className="pointer-events-auto flex items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <ThemeToggle />

              {/* Resume CTA */}
              <motion.button
                onClick={() => window.open("/cv.pdf", "_blank")}
                className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-all duration-300 hover:bg-foreground/85"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
              >
                {/* Sweep shimmer on hover */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <Download className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
                <span className="relative">Resume</span>
                <ArrowUpRight className="relative h-3 w-3 opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          MOBILE — top bar + bottom dock
      ═══════════════════════════════════════════════════════════════════ */}

      {/* Top bar (logo + toggle + hamburger) */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 flex md:hidden items-center justify-between px-5 h-16"
        style={{
          background: isScrolled ? "hsl(var(--background)/0.75)" : "transparent",
          backdropFilter: isScrolled ? "blur(20px)" : "none",
          borderBottom: isScrolled ? "1px solid hsl(var(--border)/0.4)" : "none",
          transition: "all 0.4s ease",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => navigateTo("hero")}
          className="flex items-center gap-2"
        >
          <span className="font-mono text-sm font-semibold tracking-tight">Alex Bodnia</span>
        </button>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(v => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/50 transition-colors hover:bg-muted"
            aria-label="Menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileMenuOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center justify-center"
                >
                  {/* Clean X made of two spans */}
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
                  initial={{ opacity: 0, rotate: 45, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -45, scale: 0.7 }}
                  transition={{ duration: 0.18 }}
                  className="flex flex-col gap-[5px] w-[18px]"
                >
                  <span className="block h-px w-full bg-foreground rounded-full" />
                  <span className="block h-px w-[13px] bg-foreground rounded-full" />
                  <span className="block h-px w-full bg-foreground rounded-full" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.div>

      {/* Bottom dock nav — always visible on mobile */}
      <motion.div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex md:hidden"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-0 rounded-full border border-white/12 bg-background/70 backdrop-blur-2xl p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.sectionId
            const Icon = item.icon
            return (
              <button
                key={item.sectionId}
                onClick={() => navigateTo(item.sectionId)}
                className="relative flex flex-col items-center gap-1 px-4 py-2 rounded-full"
              >
                {isActive && (
                  <motion.span
                    layoutId="mobile-dock-pill"
                    className="absolute inset-0 rounded-full bg-white/10 border border-white/20"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  >
                    <span className="absolute inset-x-2 -bottom-1.5 h-3 rounded-full bg-white/25 blur-md" />
                  </motion.span>
                )}
                <Icon
                  className={`relative z-10 h-[18px] w-[18px] transition-colors duration-200 ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                />
                <span
                  className={`relative z-10 text-[10px] font-medium leading-none transition-colors duration-200 ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════════
          MOBILE FULLSCREEN MENU OVERLAY
      ═══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col md:hidden bg-background"
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 44px) 32px)" }}
            animate={{ opacity: 1, clipPath: "circle(170% at calc(100% - 44px) 32px)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 44px) 32px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Decorative radial blur blob */}
            <div className="absolute top-1/4 right-0 h-64 w-64 rounded-full bg-foreground/3 blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/3 left-0 h-48 w-48 rounded-full bg-foreground/2 blur-3xl pointer-events-none" />

            <div className="flex-1 flex flex-col justify-center px-8 pb-20">
              {/* Big nav links */}
              <nav className="flex flex-col">
                {NAV_ITEMS.map((item, i) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.sectionId
                  return (
                    <motion.button
                      key={item.sectionId}
                      onClick={() => navigateTo(item.sectionId)}
                      className="group flex items-center justify-between border-b border-border/20 py-5 text-left"
                      initial={{ opacity: 0, x: -28 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.065, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="flex items-center gap-4">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/40 bg-muted/40">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        </span>
                        <span
                          className={`text-[2.5rem] font-semibold tracking-tight leading-none transition-colors duration-150 ${
                            isActive ? "text-foreground" : "text-foreground/50 group-hover:text-foreground/80"
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                      <ArrowUpRight
                        className={`h-5 w-5 transition-all duration-200 ${
                          isActive
                            ? "text-foreground opacity-100"
                            : "text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0"
                        }`}
                      />
                    </motion.button>
                  )
                })}
              </nav>

              {/* Bottom actions */}
              <motion.div
                className="mt-10 flex flex-col gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.45 }}
              >
                <button
                  onClick={() => {
                    window.open("/cv.pdf", "_blank")
                    setTimeout(() => setIsMobileMenuOpen(false), 100)
                  }}
                  className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl border border-border bg-muted/40 px-6 py-4 text-base font-medium transition-colors hover:bg-muted"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                  <Download className="h-4 w-4" />
                  Download Resume
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-40 group-hover:opacity-80 transition-opacity" />
                </button>

                <div className="flex items-center justify-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-xs text-muted-foreground">Open to freelance opportunities</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}