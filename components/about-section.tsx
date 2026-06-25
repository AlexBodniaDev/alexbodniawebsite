"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import data from "@/lib/data.json"

// ── SVG Icons ──────────────────────────────────────────────────────────────
const FigmaIcon = () => (
  <svg viewBox="0 0 38 57" fill="none" width="18" height="18" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M19 28.5A9.5 9.5 0 1 1 28.5 19 9.5 9.5 0 0 1 19 28.5Z" fill="#1ABCFE"/>
    <path d="M9.5 57A9.5 9.5 0 0 0 19 47.5V38H9.5A9.5 9.5 0 0 0 0 47.5 9.5 9.5 0 0 0 9.5 57Z" fill="#0ACF83"/>
    <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5Z" fill="#A259FF"/>
    <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5Z" fill="#F24E1E"/>
    <path d="M19 0V19H28.5A9.5 9.5 0 0 0 28.5 0Z" fill="#FF7262"/>
  </svg>
)
const AdobeXDIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true" style={{ flexShrink: 0 }}>
    <rect width="24" height="24" rx="5" fill="#FF2BC2"/>
    <path d="M14.5 7L18 17h-2l-.8-2.5h-3.4L11 17H9l3.5-10h2zm-.4 5.8L13 9l-1.1 3.8h2.2zM6 7l2.3 3.5L6 14H4.2l2.1-3.5L4 7H6z" fill="white"/>
  </svg>
)
const SketchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M12 2l9 7-9 13L3 9l9-7z" fill="#FDB300"/>
    <path d="M3 9h18L12 22 3 9z" fill="#EA6C00" opacity=".6"/>
    <path d="M3 9l4-6h10l4 6H3z" fill="#FDD231"/>
    <path d="M7 3l5 6L7 9 3 9l4-6z" fill="#FDB300"/>
    <path d="M17 3l-5 6 5 0 4 0-4-6z" fill="#FDAD00"/>
  </svg>
)
const ReactIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="2.5" fill="#61DAFB"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/>
  </svg>
)
const NextJsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="12" fill="#000"/>
    <path d="M19.07 20.49L8.56 7H7v10.003h1.44V9.006l9.655 12.357a11 11 0 0 0 .975-.873z" fill="#fff"/>
    <path d="M16.5 7h1.5v10h-1.5z" fill="#fff"/>
  </svg>
)
const TypeScriptIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true" style={{ flexShrink: 0 }}>
    <rect width="24" height="24" rx="3" fill="#3178C6"/>
    <path d="M13.5 10.5h3.5V9H10v1.5h2.5V18h1V10.5zM17 14.5c0 .9.7 1.6 1.7 1.6.9 0 1.5-.4 1.5-1 0-.6-.4-.9-1.2-1.2l-.5-.2c-1.2-.5-1.8-1.1-1.8-2 0-1 .9-1.7 2.1-1.7 1.3 0 2.1.7 2.1 1.8h-1c0-.6-.4-1-.9-1-.5 0-.9.3-.9.8 0 .5.3.7 1 1l.5.2c1.3.5 2 1.1 2 2.1 0 1.1-1 1.9-2.5 1.9-1.5 0-2.5-.8-2.5-2.1H17z" fill="white"/>
  </svg>
)
const TailwindIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M12 6C9.6 6 8.1 7.2 7.5 9.6c.9-1.2 1.95-1.65 3.15-1.35.685.17 1.174.665 1.716 1.215C13.259 10.39 14.096 11.25 16 11.25c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.17-1.174-.665-1.716-1.215C14.741 6.86 13.904 6 12 6zm-4.5 5.625c-2.4 0-3.9 1.2-4.5 3.6.9-1.2 1.95-1.65 3.15-1.35.685.17 1.174.665 1.716 1.215 1.087 1.065 1.924 1.91 3.834 1.91 2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.17-1.174-.665-1.716-1.215C11.147 12.47 10.31 11.625 7.5 11.625z" fill="#38BDF8"/>
  </svg>
)
const FramerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M4 0h16v8H4V0zM4 8h8l8 8H4V8zM4 16h8v8L4 16z" fill="#0055FF"/>
  </svg>
)
const WebflowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M17.777 8.004H24S20.467 19.998 20.44 20.09c-.25.85-.98 1.91-2.773 1.91H13.89l2.1-6.68h-.02S13.2 17.8 9.847 19.21C8.367 19.84 7.2 19.98 6.24 19.98c-2.153 0-4.24-1.65-4.24-4.547 0-4.547 4.24-9.44 9.827-9.44 2.973 0 4.16 1.587 4.16 1.587L17.777 4h-.003l2.427-3.996H24L17.777 8.004zm-4.584 4.76c0-1.56-.88-2.613-2.68-2.613-2.426 0-4.253 2.733-4.253 4.64 0 1.546.987 2.586 2.547 2.586 1.946 0 4.386-2.787 4.386-4.614z" fill="#4353FF"/>
  </svg>
)
const PhotoshopIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true" style={{ flexShrink: 0 }}>
    <rect width="24" height="24" rx="4" fill="#001E36"/>
    <path d="M8.5 6.5h-1v11h1V13h1.8c2 0 3.2-1 3.2-2.7 0-1.8-1.2-2.8-3.2-2.8H8.5zm0 1.2h1.7c1.2 0 2.1.7 2.1 1.8 0 1-.9 1.7-2.1 1.7H8.5V7.7zM17.5 9.3c-1.5 0-2.5.7-2.5 1.8 0 .8.5 1.3 1.7 1.8l.7.3c.8.3 1.1.6 1.1 1.1 0 .6-.5.9-1.3.9-.7 0-1.3-.3-1.8-.8l-.7.9c.6.7 1.5 1.1 2.5 1.1 1.5 0 2.5-.8 2.5-2 0-.9-.5-1.4-1.8-1.9l-.7-.3c-.7-.3-1-.5-1-1 0-.5.4-.9 1.2-.9.6 0 1.1.2 1.5.6l.7-.9c-.6-.5-1.3-.7-2.1-.7z" fill="#31A8FF"/>
  </svg>
)
const IllustratorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true" style={{ flexShrink: 0 }}>
    <rect width="24" height="24" rx="4" fill="#300"/>
    <path d="M9.5 16.5H7.3L6.8 18H5l3-8.5h2l3 8.5h-1.8l-.5-1.5zm-.4-1.3L8 11l-1.1 4.2h2.2zM15.5 9.5h1.5V18H15.5V9.5z" fill="#FF9A00"/>
  </svg>
)
const AfterEffectsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true" style={{ flexShrink: 0 }}>
    <rect width="24" height="24" rx="4" fill="#00005B"/>
    <path d="M8.5 16.5H6.3L5.8 18H4l3-8.5h2l3 8.5h-1.8l-.5-1.5zm-.4-1.3L7 11l-1.1 4.2h2.2zM14.5 15c0 .9.7 1.5 1.7 1.5.9 0 1.5-.4 1.5-1 0-.5-.4-.8-1.2-1.1l-.4-.15c-1.3-.5-1.9-1.1-1.9-2.05 0-1 .9-1.7 2.2-1.7 1.3 0 2.1.7 2.1 1.8h-1c0-.55-.4-.95-.9-.95-.5 0-.9.3-.9.8 0 .45.3.7 1 1l.4.15c1.3.5 2 1.1 2 2.1 0 1.1-1 1.9-2.5 1.9-1.5 0-2.5-.8-2.5-2.1h1z" fill="#9999FF"/>
  </svg>
)

const toolsWithIcons = [
  { name: "Figma",         Icon: FigmaIcon },
  { name: "Adobe XD",      Icon: AdobeXDIcon },
  { name: "Sketch",        Icon: SketchIcon },
  { name: "React",         Icon: ReactIcon },
  { name: "Next.js",       Icon: NextJsIcon },
  { name: "TypeScript",    Icon: TypeScriptIcon },
  { name: "Tailwind CSS",  Icon: TailwindIcon },
  { name: "Framer",        Icon: FramerIcon },
  { name: "Webflow",       Icon: WebflowIcon },
  { name: "Photoshop",     Icon: PhotoshopIcon },
  { name: "Illustrator",   Icon: IllustratorIcon },
  { name: "After Effects", Icon: AfterEffectsIcon },
]

// Double for seamless loop
const marqueeItems = [...toolsWithIcons, ...toolsWithIcons]

export function AboutSection() {
  const [activeImage, setActiveImage] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  const profileImages = [
    "/photo-of-me-one.jpg",
    "/photo-of-me-second.jpg",
    "/photo-of-me-third.jpg",
  ]

  useEffect(() => {
    const t = setInterval(
      () => setActiveImage(p => (p + 1) % profileImages.length),
      4000
    )
    return () => clearInterval(t)
  }, [])

  const prev = () =>
    setActiveImage(p => (p - 1 + profileImages.length) % profileImages.length)
  const next = () =>
    setActiveImage(p => (p + 1) % profileImages.length)

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-36 bg-background"
    >
      {/* ── INTRO ─────────────────────────────────────────── */}
      <div className="container mx-auto px-6 max-w-6xl mb-24 md:mb-32">

        {/* Header — restored pill-badge eyebrow + italic accent on "Me" */}
        <div className="text-center mb-20 md:mb-28">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-foreground/70">Who I Am</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif tracking-tighter mb-6">
            About <span className="italic font-light text-primary">Me</span>
          </h2>
          <p className="text-foreground/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-normal">
            A little showcase of my journey, my principles, and the craft behind my work.
          </p>
        </div>

        {/* Two-column */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-20 items-start">

          {/* ── Photo ── */}
          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
              {profileImages.map((src, i) => (
                <img
                  key={i}
                  src={src || "/placeholder.svg"}
                  alt="Alex Bodnia"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                    i === activeImage
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-[1.04]"
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

              {/* Controls */}
              <div className="absolute bottom-5 inset-x-5 flex items-center justify-between">
                <div className="flex gap-1.5">
                  {profileImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`h-[3px] rounded-full transition-all duration-500 ${
                        i === activeImage
                          ? "bg-white w-7"
                          : "bg-white/30 w-2.5"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={prev}
                    className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/22 transition-colors flex items-center justify-center"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={next}
                    className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/22 transition-colors flex items-center justify-center"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Name plate */}
            <div>
              <p className="text-base font-semibold text-foreground leading-tight">
                Alex Bodnia
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                UI/UX Designer & React Developer
              </p>
            </div>
          </div>

          {/* ── Bio ── */}
          <div className="space-y-8 pt-1">

            {/*
              Key fix: NO font-serif here — your site's lead statement on the
              about section renders as a sans-serif medium weight statement,
              not a decorative serif. Force text-foreground explicitly so no
              accent bleed can happen.
            */}
            <p className="text-2xl md:text-[1.75rem] font-medium leading-[1.35] text-foreground">
              Hello there, I'm Alex, creative UX/UI designer and developer
              with 4+ years of experience making truly stand-out things.
            </p>

            <div className="space-y-4 text-base md:text-[17px] text-muted-foreground leading-[1.75]">
              <p>
                I believe that great design is not just about aesthetics — it's
                about{" "}
                <span className="text-foreground font-medium">
                  solving real problems
                </span>{" "}
                and creating meaningful experiences.
              </p>
              <p>
                My approach combines analytical thinking with creative
                intuition, always keeping the user at the center of every
                decision.
              </p>
            </div>

            {/* ── Stat cards ── */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { value: "5+",   top: "Years",    bot: "Experience" },
                { value: "30+",  top: "Projects", bot: "Shipped"    },
                { value: "100%", top: "Passion",  bot: "For Craft"  },
              ].map(stat => (
                <div
                  key={stat.top}
                  className="rounded-xl bg-foreground text-background px-4 py-5 md:px-5 md:py-6 flex flex-col gap-3"
                >
                  <p className="text-[2rem] md:text-[2.5rem] font-serif font-light leading-none tracking-tight">
                    {stat.value}
                  </p>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] opacity-55 leading-none">
                      {stat.top}
                    </p>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] opacity-55 leading-none mt-0.5">
                      {stat.bot}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── EXPERIENCE ──────────────────────────────────────── */}
      <div className="container mx-auto px-6 max-w-6xl mb-24 md:mb-32">

        {/* Same size + two-tone treatment as "About Me" / "Let's Work Together" */}
        <h3 className="text-5xl md:text-7xl font-serif tracking-tighter text-center mb-16 md:mb-20 text-foreground">
          My <span className="italic font-light text-primary">Experience</span>
        </h3>

        <div>
          {data.experience.map((exp, index) => (
            <div
              key={index}
              className="group grid grid-cols-[100px_1fr] md:grid-cols-[160px_1fr] gap-6 md:gap-12 py-8 border-t border-border last:border-b"
            >
              {/* Period — plain, no accent color */}
              <p className="text-sm text-muted-foreground font-normal tabular-nums pt-0.5">
                {exp.period}
              </p>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-lg md:text-xl font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-200">
                  {exp.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TECH STACK ──────────────────────────────────────── */}
      <div>
        <div className="container mx-auto px-6 max-w-6xl mb-10">
          <h3 className="text-5xl md:text-7xl font-serif tracking-tighter text-center text-foreground">
            Tech Stack & <span className="italic font-light text-primary">Tools</span>
          </h3>
        </div>

        {/* Marquee — full bleed */}
        <div className="relative overflow-hidden mt-6">
          <div className="pointer-events-none absolute left-0 inset-y-0 w-16 md:w-24 z-10 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 inset-y-0 w-16 md:w-24 z-10 bg-gradient-to-l from-background to-transparent" />

          <div
            className="ab-marquee-track flex w-max"
            style={{ animation: "ab-marquee 32s linear infinite" }}
          >
            {marqueeItems.map(({ name, Icon }, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 mx-2 px-4 py-2.5 rounded-xl border border-border/70 bg-card whitespace-nowrap flex-shrink-0"
              >
                <Icon />
                <span className="text-sm font-medium text-foreground/80">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ab-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ab-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}