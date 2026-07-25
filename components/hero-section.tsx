"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import { useEffect, useRef } from "react"
import { useLanguage } from "@/components/language-provider"

const WAVES = [
  { baseAmp: 36, freq: 0.0048, speed: 0.006, phase: 0,   yFrac: 0.68 },
  { baseAmp: 28, freq: 0.0062, speed: 0.009, phase: 2.0, yFrac: 0.72 },
  { baseAmp: 20, freq: 0.0078, speed: 0.013, phase: 4.1, yFrac: 0.76 },
  { baseAmp: 42, freq: 0.0035, speed: 0.004, phase: 1.1, yFrac: 0.64 },
  { baseAmp: 14, freq: 0.0095, speed: 0.018, phase: 3.2, yFrac: 0.82 },
]

const ALPHAS = [0.05, 0.07, 0.08, 0.045, 0.04]

export function HeroSection() {
  const { t } = useLanguage()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const isMobile = window.matchMedia("(max-width: 767px)").matches

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let W = 0, H = 0, tick = 0, mAmp = 0, targetMamp = 0
    let isVisible = true
    let rafId = 0
    let lastFrameTime = 0

    // Mobile Optimizations: Lower FPS target (~18fps) & wider sampling step to reduce CPU work
    const FRAME_INTERVAL = isMobile ? 1000 / 18 : 1000 / 30
    const STEP = isMobile ? 8 : 4

    const mouse = { x: -1, y: -1, active: false }

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }

    const onMove = (e: MouseEvent) => {
      if (isMobile) return // Skip mouse interaction calculations on touch devices
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
      mouse.active = true
      targetMamp = 1
    }

    const onLeave = () => {
      mouse.active = false
      targetMamp = 0
    }

    if (!isMobile) {
      window.addEventListener("mousemove", onMove, { passive: true })
      window.addEventListener("mouseleave", onLeave)
    }
    window.addEventListener("resize", resize)
    resize()

    const getY = (w: typeof WAVES[0], x: number) => {
      let y = H * w.yFrac + Math.sin(x * w.freq + tick * w.speed + w.phase) * w.baseAmp
      if (!isMobile && mouse.active && mAmp > 0.005) {
        const hInf = Math.max(0, 1 - Math.abs(x - mouse.x) / 200)
        const vInf = Math.max(0, 1 - Math.abs(H * w.yFrac - mouse.y) / 160)
        y -= hInf * vInf * mAmp * 48
      }
      return y
    }

    const draw = (now: number) => {
      rafId = requestAnimationFrame(draw)

      // Throttle rendering to target frame interval
      if (now - lastFrameTime < FRAME_INTERVAL) return
      lastFrameTime = now

      ctx.clearRect(0, 0, W, H)
      if (!isMobile) {
        mAmp += (targetMamp - mAmp) * 0.05
      }

      const dark = document.documentElement.classList.contains("dark")

      const colors = dark
        ? [
            [59, 130, 246],
            [37, 99, 235],
            [96, 165, 250],
            [29, 78, 216],
            [147, 197, 253],
          ]
        : [
            [29, 78, 216],
            [37, 99, 235],
            [30, 64, 175],
            [2, 132, 199],
            [79, 70, 229],
          ]

      const alphaMult = dark ? 1.0 : 2.2

      WAVES.forEach((w, i) => {
        const c = colors[i].join(",")
        const a = ALPHAS[i] * alphaMult
        const baseY = H * w.yFrac

        const points: Array<[number, number]> = []
        for (let x = 0; x <= W; x += STEP) {
          points.push([x, getY(w, x)])
        }
        if (points.length === 0 || points[points.length - 1][0] !== W) {
          points.push([W, getY(w, W)])
        }

        ctx.beginPath()
        points.forEach(([x, y], idx) => (idx === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)))
        ctx.lineTo(W, H)
        ctx.lineTo(0, H)
        ctx.closePath()

        const grad = ctx.createLinearGradient(0, baseY - w.baseAmp - 20, 0, H)
        grad.addColorStop(0,    `rgba(${c},0)`)
        grad.addColorStop(0.1,  `rgba(${c},${a * 1.2})`)
        grad.addColorStop(0.4,  `rgba(${c},${a * 0.8})`)
        grad.addColorStop(0.8,  `rgba(${c},${a * 0.25})`)
        grad.addColorStop(1,    `rgba(${c},0)`)
        ctx.fillStyle = grad
        ctx.fill()

        ctx.beginPath()
        points.forEach(([x, y], idx) => (idx === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)))
        ctx.strokeStyle = dark
          ? `rgba(${c}, ${a * 1.5})`
          : `rgba(${c}, ${a * 1.8})`
        ctx.lineWidth = dark ? 1.2 : 1.5
        ctx.stroke()
      })

      tick++
    }

    const startLoop = () => {
      if (!rafId) rafId = requestAnimationFrame(draw)
    }
    const stopLoop = () => {
      cancelAnimationFrame(rafId)
      rafId = 0
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        isVisible && !document.hidden ? startLoop() : stopLoop()
      },
      { threshold: 0 }
    )
    io.observe(canvas)

    const onVisibilityChange = () => {
      document.hidden || !isVisible ? stopLoop() : startLoop()
    }
    document.addEventListener("visibilitychange", onVisibilityChange)

    return () => {
      stopLoop()
      io.disconnect()
      document.removeEventListener("visibilitychange", onVisibilityChange)
      if (!isMobile) {
        window.removeEventListener("mousemove", onMove)
        window.removeEventListener("mouseleave", onLeave)
      }
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20 px-6"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-background via-background/80 to-transparent pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="container mx-auto text-center relative max-w-5xl z-10">
        {/* Availability badge */}
        <div className="flex items-center justify-center gap-2.5 mb-4">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-black uppercase tracking-[0.3em] text-foreground/70">
            {t.hero.availableForProjects}
          </span>
        </div>

        {/* Role badge */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-foreground text-xs md:text-sm font-black tracking-[0.2em] uppercase shadow-xs backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-primary animate-pulse shrink-0" />
            {t.hero.role}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[0.95] tracking-tighter text-foreground mb-10">
          {t.hero.headline1}<br />
          <em className="italic font-light text-primary">{t.hero.headline2}</em> {t.hero.headline2Suffix}<br />
          <span className="relative inline-block">
            {t.hero.headline3}
            <svg
              viewBox="0 0 340 16"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              className="absolute left-0 w-full text-primary overflow-visible"
              style={{ bottom: "-0.06em", height: "0.13em" }}
              aria-hidden="true"
            >
              <path
                d="M3 11 Q85 4 170 9 Q255 14 337 6"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </span>
        </h1>

        {/* Subline */}
        <p className="text-xl md:text-2xl text-foreground/85 max-w-2xl mx-auto mb-16 font-light leading-relaxed">
          {t.hero.subline1}{" "}
          <span className="text-foreground font-semibold">{t.hero.subline2}</span>{" "}
          {t.hero.subline3}{" "}
          <span className="italic text-foreground font-medium">{t.hero.subline4}</span>{" "}
          {t.hero.subline5}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          {/* Primary CTA */}
          <button
            onClick={() => document.getElementById("works")?.scrollIntoView({ behavior: "smooth" })}
            className="group inline-flex items-center gap-3 px-9 py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-lg hover:bg-primary/90 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20 cursor-pointer"
          >
            {t.hero.viewPortfolio}
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1.5 transition-transform" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-3 px-9 py-4 border-2 border-border/80 rounded-2xl font-bold text-lg text-foreground bg-background/80 backdrop-blur-xl hover:bg-accent/60 hover:border-primary/50 hover:scale-[1.01] active:scale-95 transition-all shadow-none cursor-pointer"
          >
            {t.hero.letsTalk}
          </button>
        </div>
      </div>
    </section>
  )
}