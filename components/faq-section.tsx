"use client"

import { memo, useCallback, useEffect, useId, useMemo, useRef, useState } from "react"
import { motion, type Variants } from "framer-motion"
import { Plus } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { VIEWPORT } from "@/lib/motion"
import { MaskReveal } from "@/components/reveal"
import { Decor, DECOR } from "@/components/decor"

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

/**
 * Opening a card swaps its colours (light card <-> dark card). Animating that swap made the text visibly fade
 * white -> black in dark mode, so every colour / background change inside a card is instant; only the
 * panel height, its fade and the plus-icon rotation (marked data-faq-anim) are animated.
 */
const FAQ_CSS = `
/* globals.css puts a 300ms colour transition on EVERY element (*) and a 350ms one on .faq-card:
   that is what faded the text white <-> black. Inside a card colours now switch instantly. */
.faq-card,
.faq-card::before,
.faq-card::after,
.faq-card :is(h3, button, span, p, i, div, svg):not([data-faq-anim]) {
  transition: none !important;
  animation: none !important;
}
/* no hover lift: the card moved 4px up/down under the pointer while it was resizing -> hover flicker */
.faq-card:hover { transform: none !important; }
.faq-card[data-open="true"] :is(h3, button, span, p):not(.faq-num):not(.faq-icon) {
  color: var(--background);
}
/* light theme: the open card is the accent colour with DARK text (not a dark card with light text) */
html:not(.dark) .faq-card[data-open="true"] {
  background: var(--cta);
  color: var(--cta-fg);
  --num-ink: var(--cta-fg);
}
html:not(.dark) .faq-card[data-open="true"] :is(h3, button, span, p):not(.faq-icon),
html:not(.dark) .faq-card[data-open="true"] .faq-num,
html:not(.dark) .faq-card[data-open="true"]:hover .faq-num {
  color: var(--cta-fg) !important;
}
`

type FaqItem = {
  question: string
  answer: string
}

/**
 * Bento rhythm on the 12-col grid (6 questions):
 *   [   7   |  5  ]
 *   [  5  |   7   ]
 *   [   6   |  6  ]
 * Tablet: two equal columns. Phone: one column.
 */
const LG_SPAN = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-6",
  "lg:col-span-6",
]

const FaqCard = memo(function FaqCard({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: FaqItem
  index: number
  isOpen: boolean
  onToggle: (index: number) => void
}) {
  const uid = useId()
  const panelId = `${uid}-panel`
  const buttonId = `${uid}-button`

  // Panel height is measured once (and on resize) and animated as a plain pixel height:
  // steadier than animating grid rows, which re-wrapped the text on every frame.
  const innerRef = useRef<HTMLDivElement>(null)
  const [panelH, setPanelH] = useState(0)
  useEffect(() => {
    const el = innerRef.current
    if (!el) return
    const measure = () => setPanelH(el.offsetHeight)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <motion.div variants={item} className={`flex self-start ${LG_SPAN[index % LG_SPAN.length]}`}>
      <div data-open={isOpen} className="faq-card flex w-full flex-col">
        <h3 className="flex flex-1">
          <button
            id={buttonId}
            type="button"
            onClick={() => onToggle(index)}
            aria-expanded={isOpen}
            aria-controls={panelId}
            className="group flex min-h-[15rem] flex-1 cursor-pointer flex-col justify-between gap-12 p-7 text-left touch-manipulation focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-current md:min-h-[18rem] md:p-10"
          >
            <span className="flex w-full items-start justify-between gap-4">
              <span aria-hidden="true" className="faq-num">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden="true"
                className={`faq-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 md:h-14 md:w-14 ${
                  isOpen
                    ? "border-[var(--background)] bg-[var(--background)] text-[var(--foreground)]"
                    : "border-current/30 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background"
                }`}
              >
                <Plus
                  data-faq-anim
                  className={`h-5 w-5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:h-6 md:w-6 ${
                    isOpen ? "rotate-45" : "rotate-0"
                  }`}
                />
              </span>
            </span>
            <span className="h-item block max-w-[26ch]">{faq.question}</span>
          </button>
        </h3>

        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          inert={!isOpen}
          data-faq-anim
          style={{ height: isOpen ? panelH : 0 }}
          className="overflow-hidden transition-[height] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        >
          <div
            ref={innerRef}
            data-faq-anim
            style={{ opacity: isOpen ? 1 : 0, transition: `opacity ${isOpen ? "260ms 90ms" : "140ms"} ease-out` }}
          >
            <p className="body-text max-w-xl px-7 pb-8 pr-9 md:px-10 md:pb-12">{faq.answer}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
})

export function FAQSection() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = t.faq.items as unknown as FaqItem[]
  const toggle = useCallback((i: number) => setOpenIndex((cur) => (cur === i ? null : i)), [])
  const decor = useMemo(() => <Decor shapes={DECOR.faq} />, [])

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <section
      id="faq"
      style={{ overflowAnchor: "none" }}
      className="relative section-y bg-background overflow-hidden z-10 border-none"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <style>{FAQ_CSS}</style>

      {decor}

      <div className="container-x relative z-10">
        <motion.div
          className="section-head mb-12 md:mb-20"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <h2 className="h-display mb-6 text-foreground">
            <MaskReveal>
              {t.faq.heading1}{" "}
              <span className="accent">{t.faq.heading2}</span>
            </MaskReveal>
          </h2>

          <motion.p variants={item} className="lead text-foreground/70 max-w-2xl">
            {t.faq.subheading}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-12 lg:gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {faqs.map((faq, i) => (
            <FaqCard
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={toggle}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
