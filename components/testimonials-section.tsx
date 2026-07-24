"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, type Variants } from "framer-motion"
import { Quote, Sparkles, Star, ChevronLeft, ChevronRight } from "lucide-react"
import data from "@/lib/data.json"
import { useLanguage } from "@/components/language-provider"
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
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

function TestimonialCard({
  t,
}: {
  t: Testimonial & { name: string; role: string; quote: string }
}) {
  return (
    <div className="group relative h-full rounded-3xl border border-border/60 bg-card/60 backdrop-blur-sm p-8 md:p-10 flex flex-col transition-all duration-300 hover:border-primary/20 hover:shadow-[0_20px_60px_-25px_hsl(var(--primary)/0.35)]">

      <Quote
        className="absolute top-7 right-7 w-10 h-10 text-primary/10 group-hover:text-primary/15 transition-colors duration-300"
        strokeWidth={1.5}
      />

      <div className="flex items-center gap-1 mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < t.rating
                ? "fill-primary text-primary"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>

      <p className="relative text-lg md:text-xl font-serif italic font-light leading-relaxed text-foreground mb-8 flex-1">
        "{t.quote}"
      </p>

      <div className="flex items-center gap-3.5 pt-6 border-t border-border/60">
        <div className="w-11 h-11 rounded-full overflow-hidden bg-muted shrink-0 ring-1 ring-border">
          <img
            src={t.avatar || "/placeholder-user.jpg"}
            alt={t.name}
            className="w-full h-full object-cover"
          />
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
}

export function TestimonialsSection() {
  const { t, locale } = useLanguage()

  const [api, setApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [count, setCount] = useState(0)

  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isHovering = useRef(false)

  const localized = data.testimonials.map((tm: any) => ({
    ...tm,
    name:
      locale === "uk" && tm.name_uk
        ? tm.name_uk
        : tm.name,
    role:
      locale === "uk" && tm.role_uk
        ? tm.role_uk
        : tm.role,
    quote:
      locale === "uk" && tm.quote_uk
        ? tm.quote_uk
        : tm.quote,
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
    }, 4500)

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [api])

  const scrollTo = useCallback(
    (i: number) => api?.scrollTo(i),
    [api]
  )

  return (
    <section
      id="testimonials"
      className="relative py-24 md:py-32 -mb-16 bg-background overflow-hidden z-10"
      onMouseEnter={() => (isHovering.current = true)}
      onMouseLeave={() => (isHovering.current = false)}
    >
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-primary/8 blur-[140px] pointer-events-none"
      />

      {/* Seamless bottom transition */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-b from-transparent to-background pointer-events-none"
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">

        <motion.div
          className="text-center mb-16 md:mb-20"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />

            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-foreground/70">
              {t.testimonials.eyebrow}
            </span>
          </motion.div>

          <motion.h2
            variants={item}
            className="text-5xl md:text-7xl font-serif tracking-tighter mb-6 text-foreground"
          >
            {t.testimonials.heading1}{" "}
            <span className="italic font-light text-primary">
              {t.testimonials.heading2}
            </span>
          </motion.h2>

          <motion.p
            variants={item}
            className="text-foreground/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-normal"
          >
            {t.testimonials.subheading}
          </motion.p>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
        >

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


          <div className="flex items-center justify-center gap-6 mt-10">

            <button
              onClick={() => api?.scrollPrev()}
              aria-label="Previous"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>


            <div className="flex items-center gap-2">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === selectedIndex
                      ? "w-6 bg-primary"
                      : "w-1.5 bg-border hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>


            <button
              onClick={() => api?.scrollNext()}
              aria-label="Next"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

          </div>

        </motion.div>

      </div>
    </section>
  )
}