"use client"

import { useState, useEffect, useRef } from "react"
import type React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronLeft, ChevronRight, Sparkles, GraduationCap, Award, ArrowUpRight } from "lucide-react"
import data from "@/lib/data.json"
import { useLanguage } from "@/components/language-provider"
import { Reveal, CountUp, MaskReveal } from "@/components/reveal"
import { Decor, DECOR } from "@/components/decor"
import { ScrollText, TextBand } from "@/components/text-fx"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

// ── Tool icons ──────────────────────────────────────────────────────────────
// Icons live in public/icons/tools/ and are served from the site root,
// e.g. `/icons/tools/figma.svg`.
const toolsWithIcons = [
  { name: "Figma",         icon: "/icons/tools/figma.svg" },
  { name: "Adobe XD",      icon: "/icons/tools/adobe-xd.svg" },
  { name: "Sketch",        icon: "/icons/tools/sketch.svg" },
  { name: "React",         icon: "/icons/tools/react.svg" },
  { name: "Next.js",       icon: "/icons/tools/nextjs.svg" },
  { name: "TypeScript",    icon: "/icons/tools/typescript.svg" },
  { name: "Tailwind CSS",  icon: "/icons/tools/tailwind-css.svg" },
  { name: "Framer",        icon: "/icons/tools/framer.svg" },
  { name: "Webflow",       icon: "/icons/tools/webflow.svg" },
  { name: "Photoshop",     icon: "/icons/tools/photoshop.svg" },
  { name: "Illustrator",   icon: "/icons/tools/illustrator.svg" },
  { name: "After Effects", icon: "/icons/tools/after-effects.svg" },
]

/** Tool card: cursor spotlight, soft 3D tilt and a parallax icon (mouse only - touch just gets a press state). */
function ToolCard({ name, icon, reduce }: { name: string; icon: string; reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    const px = x / r.width - 0.5 // -0.5 … 0.5
    const py = y / r.height - 0.5
    el.style.setProperty("--sx", `${x}px`)
    el.style.setProperty("--sy", `${y}px`)
    if (reduce) return
    el.style.setProperty("--rx", `${(-py * 9).toFixed(2)}deg`)
    el.style.setProperty("--ry", `${(px * 9).toFixed(2)}deg`)
    el.style.setProperty("--ix", `${(px * 10).toFixed(1)}px`)
    el.style.setProperty("--iy", `${(py * 10).toFixed(1)}px`)
  }
  const onLeave = () => {
    const el = ref.current
    if (!el) return
    for (const v of ["--rx", "--ry", "--ix", "--iy"]) el.style.removeProperty(v)
  }

  return (
    <div className="tool-scene h-full">
      <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className="tool-card flex h-full aspect-[5/4] flex-col justify-between p-4 sm:p-5 md:p-6">
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          width={44}
          height={44}
          className="tool-card-icon tech-icon h-9 w-9 object-contain sm:h-10 sm:w-10 md:h-11 md:w-11"
        />
        <span className="relative z-10 font-display text-[0.9rem] font-semibold leading-tight tracking-[-0.02em] sm:text-base md:text-lg">{name}</span>
      </div>
    </div>
  )
}

export function AboutSection() {
  const { t, locale } = useLanguage()
  const [activeImage, setActiveImage] = useState(0)
  const [holdSlides, setHoldSlides] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const photoRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: photoP } = useScroll({ target: photoRef, offset: ["start end", "end start"] })
  const photoY = useTransform(photoP, [0, 1], reduce ? ["0%", "0%"] : ["-7%", "7%"])

  const profileImages = [
    "/photoofme/photo-of-me-one.webp",
    "/photoofme/photo-of-me-second.webp",
    "/photoofme/photo-of-me-third.webp",
  ]

  // auto-advance only when nobody is interacting with the photo, and never under reduced motion
  useEffect(() => {
    if (reduce || holdSlides) return
    const t = setInterval(
      () => setActiveImage(p => (p + 1) % profileImages.length),
      5000
    )
    return () => clearInterval(t)
  }, [reduce, holdSlides])

  const prev = () =>
    setActiveImage(p => (p - 1 + profileImages.length) % profileImages.length)
  const next = () =>
    setActiveImage(p => (p + 1) % profileImages.length)

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative isolate bg-background pb-[var(--space-section)] overflow-x-clip"
    >
      <Decor shapes={DECOR.about} />

      {/* ── BAND: tilted CTA-colour strip, type slides with scroll ── */}
      <TextBand
        className="mb-[var(--space-section)] pt-[clamp(1.5rem,3vw,3rem)]"
        items={[t.hero.role, t.hero.availableForProjects]}
      />

      {/* ── INTRO ─────────────────────────────────────────── */}
      <div className="container-x mb-[var(--space-block)]">

        {/* Header - restored pill-badge eyebrow + italic accent on "Me" */}
        {<div className="section-head mb-[var(--space-head)]">
          {/* <div className="sh-label inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 mb-4 lg:mb-0">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="eyebrow text-foreground/70">{t.about.eyebrow}</span>
          </div> */}
          <h2 className="h-display mb-6 lg:mb-8">
            <MaskReveal>{t.about.heading1} <span className="accent">{t.about.heading2}</span></MaskReveal>
          </h2>
          <p className="lead text-foreground/70 max-w-2xl">
            {t.about.subheading}
          </p>
        </div>}

        {/* Two-column */}
        <div className="grid-12 gap-y-16 items-start">

          {/* ── Photo ── */}
          <div className="col-span-12 max-w-md lg:col-span-4 lg:max-w-none lg:sticky lg:top-28 space-y-5">
            <div
              ref={photoRef}
              onMouseEnter={() => setHoldSlides(true)}
              onMouseLeave={() => setHoldSlides(false)}
              onFocus={() => setHoldSlides(true)}
              onBlur={() => setHoldSlides(false)}
              className="relative aspect-4/5 rounded-[2rem] overflow-hidden bg-muted"
            >
              <motion.div style={{ y: photoY }} className="absolute -inset-[8%]">
              {profileImages.map((src, i) => (
                <img
                  key={i}
                  src={src || "/placeholder.svg"}
                  alt={i === activeImage ? "Alex Bodnia - UX/UI designer and front-end developer, portrait" : ""}
                  aria-hidden={i === activeImage ? undefined : true}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                    i === activeImage
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-[1.04]"
                  }`}
                />
              ))}
              </motion.div>
              <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />

              {/* Controls */}
              <div className="absolute bottom-5 inset-x-5 flex items-center justify-between">
                <div className="flex items-center">
                  {profileImages.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`${locale === "uk" ? "Фото" : "Photo"} ${i + 1}`}
                      aria-current={i === activeImage ? "true" : undefined}
                      onClick={() => setActiveImage(i)}
                      className="group flex h-9 items-center px-[3px] touch-manipulation"
                    >
                      <span
                        className={`block h-1 rounded-full transition-all duration-500 ${
                          i === activeImage ? "w-7 bg-white" : "w-2.5 bg-white/40 group-hover:bg-white/70"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    aria-label={locale === "uk" ? "Попереднє фото" : "Previous photo"}
                    onClick={prev}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white hover:text-black active:bg-white active:text-black focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label={locale === "uk" ? "Наступне фото" : "Next photo"}
                    onClick={next}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white hover:text-black active:bg-white active:text-black focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Name plate */}
            <div data-static="true" className="bento-card flex items-center justify-between gap-4 px-6 py-5">
              <div className="min-w-0">
                <p className="font-display text-base font-extrabold leading-tight tracking-[-0.03em]">
                  Alex Bodnia
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  UI/UX Designer & React Developer
                </p>
              </div>
              <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
            </div>
          </div>

          {/* ── Bio ── */}
          <div className="col-span-12 space-y-10 pt-1 lg:col-span-7 lg:col-start-6 lg:space-y-14">

            {/*
              Key fix: NO font-serif here - your site's lead statement on the
              about section renders as a sans-serif medium weight statement,
              not a decorative serif. Force text-foreground explicitly so no
              accent bleed can happen.
            */}
            <ScrollText className="t-statement text-foreground">{t.about.intro}</ScrollText>

            <div className="body-text space-y-6 text-muted-foreground">
              <p>
                {t.about.p1a}{" "}
                <span className="text-foreground font-medium">
                  {t.about.p1b}
                </span>{" "}
                {t.about.p1c}
              </p>
              <p>
                {t.about.p2}
              </p>
            </div>

            {/* ── Minimal Editorial Stats ── */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 pt-8 md:pt-10">

              {[
                {
                  value: "5+",
                  top: t.about.statYears,
                  bot: t.about.statExperience,
                },
                {
                  value: String(data.projects.length),
                  top: t.about.statProjects,
                  bot: t.about.statShipped,
                },
                {
                  value: "2",
                  top: t.about.statLanguages,
                  bot: t.about.statLanguagesSub,
                },
              ].map((stat, i) => (

                <div
                  key={i}
                  data-static="true"
                  className="bento-card flex flex-col justify-between px-4 py-6 md:px-7 md:py-9"
                >
                  <p className="font-display text-[clamp(2rem,1.2rem+3.4vw,4.75rem)] font-extrabold leading-none tracking-[-0.045em]">
                    <CountUp value={stat.value} />
                  </p>

                  <div className="mt-8">
                    <p className="text-sm font-semibold">{stat.top}</p>
                    <p className="mt-1 text-sm opacity-70">{stat.bot}</p>
                  </div>
                </div>

              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── EXPERIENCE ──────────────────────────────────────── */}
      <div className="container-x mb-[var(--space-block)]">

        {/* Same size + two-tone treatment as "About Me" / "Let's Work Together" */}
        <h3 className="h-display mb-[var(--space-head)] text-foreground">
          <MaskReveal>{t.about.experienceHeading1} <span className="accent">{t.about.experienceHeading2}</span></MaskReveal>
        </h3>

        <div className="grid gap-5 md:gap-6">
          {data.experience.map((exp: any, index) => (
            <Reveal key={index} delay={index * 0.06}>
              <article
                data-static="true"
                className="bento-card p-7 md:p-12"
              >
                <div className="grid items-start gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-x-[clamp(1.5rem,3vw,3.5rem)]">
                  <div className="flex flex-col items-start gap-3">
                    <span className="eyebrow rounded-full px-3 py-1.5 tabular-nums shadow-[inset_0_0_0_1.5px_color-mix(in_oklch,currentColor_35%,transparent)]">
                      {exp.period}
                    </span>
                    <h3 className="h-item">
                      {locale === "uk" && exp.title_uk ? exp.title_uk : exp.title}
                    </h3>
                  </div>

                  <p className="body-text opacity-75">
                    {locale === "uk" && exp.description_uk ? exp.description_uk : exp.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* ── CREDENTIALS ──────────────────────────────────────── */}
        <div data-static="true" className="bento-card mt-5 p-7 md:mt-6 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-1.5">
              <p className="eyebrow text-muted-foreground">
                {locale === "uk" ? "Кваліфікація" : "Credentials"}
              </p>
              <p className="font-display text-lg font-bold leading-snug tracking-[-0.025em] text-pretty md:text-2xl">
                {locale === "uk"
                  ? "UX/UI Product Designer із бекграундом у комп’ютерних науках та практичним досвідом frontend-розробки."
                  : "UX/UI Product Designer with a Computer Science background and hands-on frontend development experience."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="/documents/degree.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group cta cta-secondary gap-2.5 px-6 py-3 text-sm"
              >
                <GraduationCap className="h-4 w-4" />
                {locale === "uk" ? "Диплом бакалавра" : "View Bachelor Degree"}
                <ArrowUpRight className="cta-arrow cta-arrow-ur h-3.5 w-3.5 opacity-70" />
              </a>

              <a
                href="/documents/certifications.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group cta cta-secondary gap-2.5 px-6 py-3 text-sm"
              >
                <Award className="h-4 w-4" />
                {locale === "uk" ? "Сертифікати" : "View Certifications"}
                <ArrowUpRight className="cta-arrow cta-arrow-ur h-3.5 w-3.5 opacity-70" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── TECH STACK ──────────────────────────────────────── */}
      <div>
        <div className="container-x mb-12 md:mb-16">
          <h3 className="h-display text-foreground">
            <MaskReveal>{t.about.techHeading1} <span className="accent">{t.about.techHeading2}</span></MaskReveal>
          </h3>
        </div>

        {/* Static grid: icon + name, aligned in clean rows (2 → 3 → 4 → 6 columns) */}
        <div className="container-x">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5 xl:grid-cols-6">
            {toolsWithIcons.map(({ name, icon }, i) => (
              <li key={name}>
                <Reveal delay={Math.min(i % 6, 5) * 0.04} y={14} className="h-full">
                  <ToolCard name={name} icon={icon} reduce={reduce} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}