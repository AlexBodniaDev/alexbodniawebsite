"use client"

import { useId, useState } from "react"
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

function FaqCard({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: FaqItem
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const uid = useId()
  const panelId = `${uid}-panel`
  const buttonId = `${uid}-button`

  return (
    <motion.div variants={item} className={`flex ${LG_SPAN[index % LG_SPAN.length]}`}>
      <div data-open={isOpen} className="faq-card flex w-full flex-col">
        <h3 className="flex flex-1">
          <button
            id={buttonId}
            type="button"
            onClick={onToggle}
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
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 transition-[background-color,color,border-color] duration-300 md:h-14 md:w-14 ${
                  isOpen
                    ? "border-[var(--background)] bg-[var(--background)] text-[var(--foreground)]"
                    : "border-current/30 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background"
                }`}
              >
                <Plus
                  className={`h-5 w-5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:h-6 md:w-6 ${
                    isOpen ? "rotate-45" : "rotate-0"
                  }`}
                />
              </span>
            </span>
            <span className="h-item block max-w-[26ch]">{faq.question}</span>
          </button>
        </h3>

        {/* grid-rows 0fr → 1fr: the browser animates to the real content height (no JS measuring) */}
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          inert={!isOpen}
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <p className="body-text max-w-xl px-7 pb-8 pr-9 md:px-10 md:pb-12">{faq.answer}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function FAQSection() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = t.faq.items as unknown as FaqItem[]

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
      className="relative section-y bg-background overflow-hidden z-10 border-none"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Decor shapes={DECOR.faq} />

      <div className="container-x relative z-10">
        <motion.div
          className="section-head mb-12 md:mb-20"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.h2 variants={item} className="h-display mb-6 text-foreground">
            <MaskReveal>
              {t.faq.heading1}{" "}
              <span className="accent">{t.faq.heading2}</span>
            </MaskReveal>
          </motion.h2>

          <motion.p variants={item} className="lead text-foreground/70 max-w-2xl">
            {t.faq.subheading}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-12 lg:gap-8"
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
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
