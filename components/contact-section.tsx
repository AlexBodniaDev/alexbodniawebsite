"use client"

import type React from "react"
import { motion } from "framer-motion"
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Sparkles,
  Dribbble,
  Palette,
} from "lucide-react"
import data from "@/lib/data.json"
import { useLanguage } from "@/components/language-provider"

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
} as const

const item = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
} as const

type SocialLink = {
  name: string
  icon: React.ComponentType<{ className?: string }>
  href: string
}

function SocialIconButton({ link }: { link: SocialLink }) {
  return (
    <motion.a
      variants={item}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 400, damping: 34 }}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.name}
      className="group relative w-12 h-12 md:w-14 md:h-14 rounded-full border border-border/60 bg-card/60 backdrop-blur-sm flex items-center justify-center text-foreground/70 transition-all duration-300 hover:text-primary-foreground hover:bg-primary hover:border-primary hover:shadow-[0_18px_45px_-12px_color-mix(in_oklch,var(--primary)_55%,transparent)] touch-manipulation"
    >
      <link.icon className="h-5 w-5" />
      <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-foreground text-background text-[10px] font-semibold whitespace-nowrap opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
        {link.name}
      </span>
    </motion.a>
  )
}

export function ContactSection() {
  const { t, locale } = useLanguage()

  const contactBlurb =
    locale === "uk" && (data.personal as any).contact_uk
      ? (data.personal as any).contact_uk
      : data.personal.contact

  const socialLinks: SocialLink[] = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: data.personal.linkedin,
    },
    {
      name: "Behance",
      icon: Palette,
      href: "https://www.behance.net/bodniaalex",
    },
    {
      name: "Dribbble",
      icon: Dribbble,
      href: "https://dribbble.com/AlexBodnia",
    },
    {
      name: "GitHub",
      icon: Github,
      href: data.personal.github,
    },
  ]

  return (
    <section
      id="contact"
      className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 bg-background border-0"
    >
      {/* ── Fixed: Centered ambient glow to prevent overflow-clipping horizontal lines ── */}
      <motion.div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 md:w-xl h-96 md:h-144 rounded-full bg-primary/8 blur-[120px] pointer-events-none z-0"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-16"
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
              {t.contact.eyebrow}
            </span>
          </motion.div>

          <motion.h2
            variants={item}
            className="text-5xl md:text-7xl font-serif tracking-tighter mb-8 text-foreground"
          >
            {t.contact.heading1}{" "}
            <span className="italic font-light text-primary">
              {t.contact.heading2}
            </span>
          </motion.h2>

          <motion.p
            variants={item}
            className="text-foreground/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-normal"
          >
            {contactBlurb || t.contact.subheading}
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-10"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.a
            variants={item}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 34,
            }}
            href={`mailto:${data.personal.email}`}
            className="group inline-flex items-center gap-3 px-7 md:px-10 py-4 md:py-5 rounded-full bg-primary text-primary-foreground font-semibold text-base md:text-lg shadow-[0_20px_60px_-15px_color-mix(in_oklch,var(--primary)_50%,transparent)] transition-shadow duration-500 hover:shadow-[0_25px_70px_-12px_color-mix(in_oklch,var(--primary)_65%,transparent)] touch-manipulation"
          >
            <Mail className="h-5 w-5" />

            {data.personal.email}

            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.a>

          <motion.div
            variants={item}
            className="flex items-center gap-4 md:gap-5"
          >
            {socialLinks.map((link) => (
              <SocialIconButton key={link.name} link={link} />
            ))}
          </motion.div>
        </motion.div>

        {/* Footer */}
        <footer className="mt-28 md:mt-36 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-muted-foreground text-sm font-medium">
            {t.contact.rightsReserved}
          </p>

          <div className="font-serif italic text-2xl text-foreground">
            Alex <span className="text-primary">Bodnia</span>
          </div>

          <p className="text-muted-foreground text-sm font-light italic">
            {t.contact.builtWith}
          </p>
        </footer>
      </div>
    </section>
  )
}