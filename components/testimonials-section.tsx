"use client"

import { useEffect, useRef, useState, useCallback, memo } from "react"
import { motion, type Variants } from "framer-motion"
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react"
import data from "@/lib/data.json"
import { useLanguage } from "@/components/language-provider"
import { VIEWPORT } from "@/lib/motion"
import { MaskReveal } from "@/components/reveal"
import { Decor, DECOR } from "@/components/decor"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"

type Testimonial = (typeof data.testimonials)[number]

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

/** "Tvoe - Emotion Factory" → "TE", "Medis" → "ME" */
function initials(name: string) {
  const words = name.split(/[^\p{L}\p{N}]+/u).filter(Boolean)
  const letters = words.length > 1 ? words[0][0] + words[1][0] : (words[0] ?? "").slice(0, 2)
  return letters.toUpperCase()
}

const TestimonialCard = memo(function TestimonialCard({
  t,
}: {
  t: Testimonial & { name: string; role: string; quote: string }
}) {
  return (
    <div className="group relative h-full rounded-3xl border border-border/60 bg-card/80 p-6 md:p-8 flex flex-col transition-all duration-200">
      <Quote
        className="absolute top-6 right-6 w-8 h-8 text-primary/10 transition-colors duration-200"
        strokeWidth={1.5}
      />

      <div className="flex items-center gap-1 mb-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < t.rating
                ? "fill-primary text-primary"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>

      <p className="relative text-lg md:text-xl font-medium tracking-[-0.015em] leading-snug text-foreground mb-8 flex-1">
        "{t.quote}"
      </p>

      <div className="flex items-center gap-3 pt-4 border-t border-border/60">
        <div
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-[0.8rem] font-extrabold tracking-[-0.02em] text-foreground ring-1 ring-border"
        >
          {initials(t.name)}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">
            {t.name}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {t.role}
          </p>
        </div>
      </div>
    </div>
  )
})

export function TestimonialsSection() {
  const { t, locale } = useLanguage()

  const [api, setApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [count, setCount] = useState(0)

  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isHovering = useRef(false)

  const localized = data.testimonials.map((tm: any) => ({
    ...tm,
    name: locale === "uk" && tm.name_uk ? tm.name_uk : tm.name,
    role: locale === "uk" && tm.role_uk ? tm.role_uk : tm.role,
    quote: locale === "uk" && tm.quote_uk ? tm.quote_uk : tm.quote,
  }))

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setSelectedIndex(api.selectedScrollSnap())

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap())
    }

    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  useEffect(() => {
    if (!api) return

    autoplayRef.current = setInterval(() => {
      if (isHovering.current) return

      if (api.canScrollNext()) {
        api.scrollNext()
      } else {
        api.scrollTo(0)
      }
    }, 5000)

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [api])

  const scrollTo = useCallback((i: number) => api?.scrollTo(i), [api])

  return (
    <section
      id="testimonials"
      className="relative section-y bg-background overflow-hidden z-10 border-none"
      onMouseEnter={() => (isHovering.current = true)}
      onMouseLeave={() => (isHovering.current = false)}
    >
      <Decor shapes={DECOR.testimonials} />

      <div className="container-x relative z-10">
        <motion.div
          className="section-head mb-12 md:mb-20"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {/* <motion.div
            variants={item}
            className="sh-label inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 mb-4 lg:mb-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="eyebrow text-foreground/70">
              {t.testimonials.eyebrow}
            </span>
          </motion.div> */}

          <motion.h2
            variants={item}
            className="h-display mb-6 text-foreground"
          >
            <MaskReveal>{t.testimonials.heading1}{" "}
            <span className="accent">
              {t.testimonials.heading2}
            </span></MaskReveal>
          </motion.h2>

          <motion.p
            variants={item}
            className="lead text-foreground/70 max-w-2xl"
          >
            {t.testimonials.subheading}
          </motion.p>
        </motion.div>

        <div>
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {localized.map((tm) => (
                <CarouselItem
                  key={tm.id}
                  className="pl-4 md:pl-6 basis-full sm:basis-[85%] md:basis-1/2 lg:basis-1/3"
                >
                  <TestimonialCard t={tm} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={() => api?.scrollPrev()}
              aria-label="Previous slide"
              className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground active:scale-95 transition-transform touch-manipulation"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-200 touch-manipulation ${
                    i === selectedIndex
                      ? "w-6 bg-primary"
                      : "w-1.5 bg-border"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => api?.scrollNext()}
              aria-label="Next slide"
              className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground active:scale-95 transition-transform touch-manipulation"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}