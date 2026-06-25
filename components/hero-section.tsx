"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const WAVES = [
  { baseAmp: 44, freq: 0.0048, speed: 0.006, phase: 0,   yFrac: 0.60 },
  { baseAmp: 32, freq: 0.0062, speed: 0.009, phase: 2.0, yFrac: 0.66 },
  { baseAmp: 22, freq: 0.0078, speed: 0.013, phase: 4.1, yFrac: 0.72 },
  { baseAmp: 54, freq: 0.0035, speed: 0.004, phase: 1.1, yFrac: 0.55 },
  { baseAmp: 16, freq: 0.0095, speed: 0.018, phase: 3.2, yFrac: 0.78 },
]
const ALPHAS = [0.055, 0.072, 0.09, 0.042, 0.038]

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef  = useRef({ x: -1, y: -1, active: false })
  const rafRef    = useRef<number>(0)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => { setHasMounted(true) }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let W = 0, H = 0, t = 0, mAmp = 0, targetMamp = 0

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top, active: true }
      targetMamp = 1
    }
    const onLeave = () => { mouseRef.current.active = false; targetMamp = 0 }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseleave", onLeave)
    window.addEventListener("resize", resize)
    resize()

    const getY = (w: typeof WAVES[0], x: number) => {
      let y = H * w.yFrac + Math.sin(x * w.freq + t * w.speed + w.phase) * w.baseAmp
      const { x: mx, y: my, active } = mouseRef.current
      if (active && mAmp > 0.005) {
        const hInf = Math.max(0, 1 - Math.abs(x - mx) / 200)
        const vInf = Math.max(0, 1 - Math.abs(H * w.yFrac - my) / 160)
        y -= hInf * vInf * mAmp * 48
      }
      return y
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      mAmp += (targetMamp - mAmp) * 0.05
      const dark = document.documentElement.classList.contains("dark")
      const colors = dark
        ? [[120,85,240],[90,55,200],[140,100,255],[80,50,185],[110,75,225]]
        : [[95,55,195],[70,40,170],[115,75,215],[65,38,165],[90,60,200]]

      WAVES.forEach((w, i) => {
        const c = colors[i].join(",")
        const a = ALPHAS[i]
        const baseY = H * w.yFrac

        ctx.beginPath()
        for (let x = 0; x <= W; x += 3) {
          const y = getY(w, x)
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.lineTo(W, H)
        ctx.lineTo(0, H)
        ctx.closePath()

        const grad = ctx.createLinearGradient(0, baseY - w.baseAmp - 20, 0, H)
        grad.addColorStop(0,    `rgba(${c},0)`)
        grad.addColorStop(0.08, `rgba(${c},${a * 1.6})`)
        grad.addColorStop(0.35, `rgba(${c},${a * 1.1})`)
        grad.addColorStop(0.75, `rgba(${c},${a * 0.5})`)
        grad.addColorStop(1,    `rgba(${c},0)`)
        ctx.fillStyle = grad
        ctx.fill()
      })

      t++
      rafRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseleave", onLeave)
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
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      <div
        className={`container mx-auto text-center relative max-w-5xl transition-all duration-700 ${
          hasMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
        style={{ zIndex: 1 }}
      >
        {/* Availability badge */}
        <div className="flex items-center justify-center gap-2.5 mb-4">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">
            Available for projects
          </span>
        </div>

        {/* Role badge */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/5 border-2 border-primary/20 text-foreground text-xs md:text-sm font-black tracking-[0.2em] uppercase shadow-lg">
            <Sparkles className="w-4 h-4 text-primary animate-pulse shrink-0" />
            UI/UX designer &amp; React developer
          </span>
        </div>

        {/* Headline — original Tailwind sizing */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[0.95] tracking-tighter text-foreground mb-10">
          Together we transform<br />
          <em className="not-italic italic font-light text-primary">your vision</em> into<br />
          <span className="relative inline-block">
            excellent product.
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
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-16 font-light leading-relaxed">
          Engineering{" "}
          <span className="text-foreground font-semibold">bespoke digital systems</span>{" "}
          where{" "}
          <span className="italic text-foreground font-medium">art</span>{" "}
          meets logic.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={() => document.getElementById("works")?.scrollIntoView({ behavior: "smooth" })}
            className="group inline-flex items-center gap-4 px-10 py-5 bg-foreground text-background rounded-2xl font-bold text-lg hover:scale-[1.03] active:scale-95 transition-all shadow-xl shadow-foreground/10"
          >
            View Portfolio
            <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-2 transition-transform" />
          </button>

          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-4 px-10 py-5 border-2 border-primary/20 rounded-2xl font-bold text-lg text-foreground bg-background/40 backdrop-blur-sm hover:bg-foreground hover:text-background transition-all active:scale-95"
          >
            Let's Talk
          </button>
        </div>
      </div>
    </section>
  )
}