"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, ArrowUpRight, Sparkles, Dribbble, Palette } from "lucide-react"
import data from "@/lib/data.json"

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

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
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.name}
      className="group relative w-12 h-12 md:w-14 md:h-14 rounded-full border border-border bg-card/60 backdrop-blur-sm flex items-center justify-center text-foreground/70 transition-all duration-300 hover:text-primary-foreground hover:bg-primary hover:border-primary hover:shadow-[0_18px_45px_-12px_hsl(var(--primary)/0.55)]"
    >
      <link.icon className="h-5 w-5" />
      <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-foreground text-background text-[10px] font-semibold whitespace-nowrap opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
        {link.name}
      </span>
    </motion.a>
  )
}

export function ContactSection() {
  const socialLinks: SocialLink[] = [
    { name: "LinkedIn", icon: Linkedin, href: data.personal.linkedin },
    { name: "Behance", icon: Palette, href: "https://www.behance.net/bodniaalex" },
    { name: "Dribbble", icon: Dribbble, href: "https://dribbble.com/AlexBodnia" },
    { name: "GitHub", icon: Github, href: data.personal.github },
  ]

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32 bg-background border-t border-border/50">
      {/* Ambient glow — restrained, single signature touch */}
      <motion.div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full bg-primary/10 blur-[140px] pointer-events-none"
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative z-10">

        {/* HEADER */}
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
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-foreground/70">Get in touch</span>
          </motion.div>
          <motion.h2
            variants={item}
            className="text-5xl md:text-7xl font-serif tracking-tighter mb-8 text-foreground"
          >
            Let's Work <span className="italic font-light text-primary">Together</span>
          </motion.h2>
          <motion.p
            variants={item}
            className="text-foreground/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-normal"
          >
            {data.personal.contact || "I'm always interested in hearing about new projects and opportunities."}
          </motion.p>
        </motion.div>

        {/* CONTACT — one clear CTA, then a tidy row of social icons */}
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
            href={`mailto:${data.personal.email}`}
            className="group inline-flex items-center gap-3 px-7 md:px-10 py-4 md:py-5 rounded-full bg-primary text-primary-foreground font-semibold text-base md:text-lg shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.5)] transition-shadow duration-500 hover:shadow-[0_25px_70px_-12px_hsl(var(--primary)/0.65)]"
          >
            <Mail className="h-5 w-5" />
            {data.personal.email}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.a>

          <motion.div variants={item} className="flex items-center gap-4 md:gap-5">
            {socialLinks.map((link) => (
              <SocialIconButton key={link.name} link={link} />
            ))}
          </motion.div>
        </motion.div>

        {/* FOOTER */}
        <footer className="mt-32 pt-12 relative flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <span aria-hidden="true" className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <p className="text-muted-foreground text-sm font-medium">© 2026 All rights reserved.</p>
          <div className="font-serif italic text-2xl text-foreground">
            Alex <span className="text-primary">Bodnia</span>
          </div>
          <p className="text-muted-foreground text-sm font-light italic">Built with Passion and Precision.</p>
        </footer>
      </div>
    </section>
  )
}