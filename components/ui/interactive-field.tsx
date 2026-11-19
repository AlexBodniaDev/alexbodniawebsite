"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

/**
 * INTERACTIVE FIELD - replaces the static gradient in the hero and the footer.
 *
 * A grid of dots in the brand colour that reacts to the cursor:
 *   · dots near the pointer swell, light up and are pushed away,
 *   · thin lines connect the pointer to the closest dots,
 *   · click / tap sends a ripple through the grid.
 *
 * Performance: one canvas, DPR capped at 2, pointer state lives in refs (no React
 * re-renders), the loop stops when offscreen / tab hidden, and under
 * prefers-reduced-motion a single static frame is drawn.
 */
type Fade = "none" | "top" | "bottom" | "both"

const MASKS: Record<Fade, string> = {
  none: "none",
  bottom: "linear-gradient(to bottom, #000 62%, transparent)",
  top: "linear-gradient(to top, #000 62%, transparent)",
  both: "linear-gradient(to bottom, transparent, #000 22%, #000 78%, transparent)",
}

export function InteractiveField({
  fade = "bottom",
  className = "",
}: {
  fade?: Fade
  className?: string
}) {
  const reduce = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = 0
    let h = 0
    let dpr = 1
    let gap = 34
    let cols = 0
    let rows = 0
    let raf = 0
    let running = false
    let visible = true
    let primary = "#3b6cf6"
    let fg = "#111"
    let dotAlpha = 0.17

    // pointer state - plain numbers, never React state
    let tx = -9999
    let ty = -9999
    let cx = -9999
    let cy = -9999
    let hasPointer = false
    let lastMove = -1e9
    const ripples: { x: number; y: number; t0: number }[] = []

    const readColors = () => {
      const cs = getComputedStyle(wrap)
      primary = cs.getPropertyValue("--field-active").trim() || cs.getPropertyValue("--primary").trim() || primary
      fg = cs.getPropertyValue("--field-dot").trim() || cs.getPropertyValue("--foreground").trim() || fg
      dotAlpha = parseFloat(cs.getPropertyValue("--field-dot-alpha")) || dotAlpha
    }

    const resize = () => {
      const r = wrap.getBoundingClientRect()
      w = Math.max(1, r.width)
      h = Math.max(1, r.height)
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      gap = w < 640 ? 28 : 34
      cols = Math.ceil(w / gap) + 1
      rows = Math.ceil(h / gap) + 1
      if (!running) draw(performance.now())
    }

    const R = () => (w < 640 ? 130 : 210)

    function draw(now: number) {
      // pointer easing + idle drift (the glow keeps moving when nobody is hovering)
      const idle = now - lastMove > 2500 || !hasPointer
      let gx = tx
      let gy = ty
      if (idle) {
        gx = w * (0.5 + 0.28 * Math.sin(now * 0.00031))
        gy = h * (0.42 + 0.2 * Math.cos(now * 0.00043))
      }
      if (cx < -9000) {
        cx = gx
        cy = gy
      }
      cx += (gx - cx) * 0.12
      cy += (gy - cy) * 0.12
      const live = !idle // real pointer drives dots; idle drift only drives the glow
      const rad = R()

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx!.clearRect(0, 0, w, h)

      // base dots (one batched path)
      ctx!.fillStyle = fg
      ctx!.globalAlpha = dotAlpha
      ctx!.beginPath()
      const active: [number, number, number, number][] = [] // x, y, radius, strength

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x0 = i * gap
          const y0 = j * gap
          // slow ambient wave so the field is alive without a pointer
          const wv = Math.sin(x0 * 0.011 + now * 0.0007) + Math.cos(y0 * 0.013 + now * 0.0006)
          let x = x0 + wv * 1.6
          let y = y0 + wv * 1.6
          let f = 0

          if (live) {
            const dx = x0 - cx
            const dy = y0 - cy
            const d = Math.hypot(dx, dy)
            if (d < rad) {
              f = 1 - d / rad
              const push = f * f * 30
              if (d > 0.01) {
                x += (dx / d) * push
                y += (dy / d) * push
              }
            }
          }

          // ripples from clicks / taps
          let rp = 0
          for (let k = 0; k < ripples.length; k++) {
            const r = ripples[k]
            const age = (now - r.t0) / 1100
            if (age >= 1) continue
            const dx = x0 - r.x
            const dy = y0 - r.y
            const d = Math.hypot(dx, dy)
            const front = age * Math.max(w, h) * 0.55
            const band = 70
            const off = Math.abs(d - front)
            if (off < band) {
              const s = (1 - off / band) * (1 - age)
              rp = Math.max(rp, s)
              if (d > 0.01) {
                x += (dx / d) * s * 16
                y += (dy / d) * s * 16
              }
            }
          }

          const s = Math.max(f * f, rp)
          if (s > 0.02) {
            active.push([x, y, 1.2 + s * 2.6, Math.max(f, rp)])
          } else {
            ctx!.moveTo(x + 1.3, y)
            ctx!.arc(x, y, 1.3, 0, Math.PI * 2)
          }
        }
      }
      ctx!.fill()

      // active dots + connecting lines in the brand colour
      ctx!.fillStyle = primary
      ctx!.strokeStyle = primary
      for (let n = 0; n < active.length; n++) {
        const [x, y, r, s] = active[n]
        if (live && s > 0.38) {
          ctx!.globalAlpha = s * 0.34
          ctx!.lineWidth = 1
          ctx!.beginPath()
          ctx!.moveTo(cx, cy)
          ctx!.lineTo(x, y)
          ctx!.stroke()
        }
        ctx!.globalAlpha = 0.28 + s * 0.72
        ctx!.beginPath()
        ctx!.arc(x, y, r, 0, Math.PI * 2)
        ctx!.fill()
      }
      ctx!.globalAlpha = 1

      // drop finished ripples
      while (ripples.length && now - ripples[0].t0 > 1100) ripples.shift()
    }

    const loop = (now: number) => {
      draw(now)
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (running || reduce || !visible || document.hidden) return
      running = true
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    readColors()
    resize()
    if (reduce) {
      // one calm static frame
      cx = w * 0.62
      cy = h * 0.4
      draw(0)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      visible ? start() : stop()
    })
    io.observe(wrap)

    const onVis = () => (document.hidden ? stop() : start())
    document.addEventListener("visibilitychange", onVis)

    const mo = new MutationObserver(() => {
      readColors()
      if (!running) draw(performance.now())
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    const local = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top, inside: e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom }
    }
    const onMove = (e: PointerEvent) => {
      if (reduce) return
      const p = local(e)
      if (!p.inside) {
        hasPointer = false
        return
      }
      tx = p.x
      ty = p.y
      hasPointer = true
      lastMove = performance.now()
    }
    const onDown = (e: PointerEvent) => {
      if (reduce) return
      const p = local(e)
      if (p.inside) ripples.push({ x: p.x, y: p.y, t0: performance.now() })
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerdown", onDown, { passive: true })

    start()

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      document.removeEventListener("visibilitychange", onVis)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onDown)
    }
  }, [reduce])

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ WebkitMaskImage: MASKS[fade], maskImage: MASKS[fade] }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}
