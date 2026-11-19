"use client"

import type React from "react"
import { useId, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Check,
  Send,
  Dribbble,
  Palette,
  ArrowUp,
} from "lucide-react"
import data from "@/lib/data.json"
import { useLanguage } from "@/components/language-provider"
import { InteractiveField } from "@/components/interactive-field"
import { Decor, DECOR } from "@/components/decor"
import { VIEWPORT, scrollToSection } from "@/lib/motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { MaskReveal } from "@/components/reveal"

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

type Status = "idle" | "sending" | "sent" | "error"

/** Social button - quiet outline, fills with ink on hover (lime is reserved for the send button). */
function SocialIconButton({ link }: { link: SocialLink }) {
  return (
    <motion.a
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 400, damping: 34 }}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.name}
      className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-[var(--ink)]/30 text-[var(--ink)] transition-colors duration-300 hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--background)] touch-manipulation md:h-14 md:w-14"
    >
      <link.icon className="h-5 w-5" />
      <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-[var(--ink)] px-2.5 py-1 text-xs font-semibold text-[var(--background)] opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
        {link.name}
      </span>
    </motion.a>
  )
}

export function ContactSection() {
  const { t, locale } = useLanguage()
  const reduce = useReducedMotion()
  const uid = useId()
  const [status, setStatus] = useState<Status>("idle")

  // footer wordmark rises into place as the page ends
  const markRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: markP } = useScroll({ target: markRef, offset: ["start end", "end end"] })
  const markY = useTransform(markP, [0, 1], reduce ? ["0%", "0%"] : ["34%", "0%"])

  const f = t.contact.form

  const contactBlurb =
    locale === "uk" && (data.personal as any).contact_uk
      ? (data.personal as any).contact_uk
      : data.personal.contact

  const socialLinks: SocialLink[] = [
    { name: "LinkedIn", icon: Linkedin, href: data.personal.linkedin },
    { name: "Behance", icon: Palette, href: "https://www.behance.net/bodniaalex" },
    { name: "Dribbble", icon: Dribbble, href: "https://dribbble.com/AlexBodnia" },
    { name: "GitHub", icon: Github, href: data.personal.github },
  ]

  // Same links as the header
  const navLinks = [
    { label: t.nav.home, id: "hero" },
    { label: t.nav.works, id: "works" },
    { label: t.nav.about, id: "about" },
    { label: t.nav.testimonials, id: "testimonials" },
    { label: t.nav.faq, id: "faq" },
    { label: t.nav.contact, id: "contact" },
  ]

  /**
   * Sends the message straight to the inbox through FormSubmit (no server needed - the site stays static).
   * First submission ever: FormSubmit emails a one-time "activate this form" link to the address - click it once.
   */
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === "sending") return
    const form = e.currentTarget
    const fd = new FormData(form)
    if (fd.get("_honey")) { // a bot filled the hidden field - pretend it worked
      setStatus("sent")
      return
    }
    setStatus("sending")
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${data.personal.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          message: fd.get("message"),
          _subject: `Portfolio message from ${fd.get("name")}`,
          _template: "table",
          _captcha: "false",
        }),
      })
      const json = await res.json().catch(() => null)
      if (res.ok && json && (json.success === true || json.success === "true")) {
        form.reset()
        setStatus("sent")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden section-y pb-0 bg-background border-0"
    >
      <Decor shapes={DECOR.contact} />
      <InteractiveField fade="top" />

      <div className="container-x relative z-10">
        <motion.div
          className="mb-16 text-left md:mb-24"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <h2 className="h-mega mb-8 text-foreground md:mb-12">
            <MaskReveal>{t.contact.heading1}{" "}
            <span className="accent">
              {t.contact.heading2}
            </span></MaskReveal>
          </h2>

          <motion.p
            variants={item}
            className="lead max-w-xl text-foreground/70"
          >
            {contactBlurb || t.contact.subheading}
          </motion.p>
        </motion.div>

        {/* ── Neutral card: form + direct contact. The only lime in here is the send button. ── */}
        <motion.div
          className="contact-panel relative grid gap-14 rounded-[2rem] p-7 sm:p-10 md:rounded-[2.5rem] md:p-14 lg:grid-cols-12 lg:gap-24 lg:p-20"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {/* left: direct email + socials (the page links live in the footer) */}
          <motion.div variants={item} className="flex flex-col gap-12 lg:col-span-5">
            <div>
              <p className="contact-label">{f.emailTitle}</p>
              <a
                href={`mailto:${data.personal.email}`}
                className="group inline-flex items-start gap-2 break-all font-display text-[clamp(1.05rem,0.8rem+1vw,1.5rem)] font-extrabold leading-tight tracking-[-0.03em] underline decoration-2 underline-offset-[6px] decoration-[color-mix(in_oklch,var(--ink)_35%,transparent)] transition-[text-decoration-color] duration-200 hover:decoration-[var(--ink)]"
              >
                <Mail className="mt-1 h-5 w-5 shrink-0" />
                {data.personal.email}
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
            </div>

            <div className="flex items-center gap-3 md:gap-4">
              {socialLinks.map((link) => (
                <SocialIconButton key={link.name} link={link} />
              ))}
            </div>

            {/* page links - live in the card, right under the socials */}
            <nav aria-label={f.navTitle} className="pt-2">
              <p className="contact-label">{f.navTitle}</p>
              <ul className="link-list">
                {navLinks.map((l) => (
                  <li key={l.id}>
                    <button type="button" onClick={() => scrollToSection(l.id, reduce)} className="text-link touch-manipulation">
                      {l.label}
                      <ArrowUpRight aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

          </motion.div>

          {/* right: the form */}
          <motion.div variants={item} className="lg:col-span-7">
            <h3 className="mb-8 font-display text-[clamp(1.25rem,0.9rem+1.2vw,2rem)] font-bold leading-snug tracking-[-0.035em] md:mb-10">
              {f.title}
            </h3>

            {status === "sent" ? (
              <div role="status" aria-live="polite" className="flex min-h-[20rem] flex-col items-start justify-center gap-5">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--ink)] text-[var(--background)]">
                  <Check className="h-8 w-8" />
                </span>
                <p className="font-display text-[clamp(1.4rem,1rem+1.6vw,2.4rem)] font-extrabold leading-tight tracking-[-0.035em]">
                  {f.successTitle}
                </p>
                <p className="max-w-md text-lg font-medium">{f.successText}</p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="cta border border-[var(--ink)]/30 px-6 py-3 text-sm transition-colors duration-200 hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--background)]"
                >
                  {f.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-6" noValidate={false}>
                {/* honeypot - hidden from people, bots fill it in */}
                <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`${uid}-name`} className="contact-label">{f.name}</label>
                    <input
                      id={`${uid}-name`}
                      name="name"
                      type="text"
                      required
                      maxLength={120}
                      autoComplete="name"
                      placeholder={f.namePlaceholder}
                      className="contact-field"
                    />
                  </div>
                  <div>
                    <label htmlFor={`${uid}-email`} className="contact-label">{f.email}</label>
                    <input
                      id={`${uid}-email`}
                      name="email"
                      type="email"
                      required
                      maxLength={200}
                      autoComplete="email"
                      placeholder={f.emailPlaceholder}
                      className="contact-field"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor={`${uid}-message`} className="contact-label">{f.message}</label>
                  <textarea
                    id={`${uid}-message`}
                    name="message"
                    required
                    minLength={10}
                    maxLength={4000}
                    rows={6}
                    placeholder={f.messagePlaceholder}
                    className="contact-field resize-y"
                  />
                </div>

                <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:gap-6">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="cta cta-primary group w-full gap-3 px-9 py-5 text-sm disabled:cursor-wait disabled:opacity-70 sm:w-auto"
                  >
                    {status === "sending" ? f.sending : f.send}
                    <Send className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                  </button>

                  {status === "error" && (
                    <p role="alert" className="text-sm font-semibold leading-snug">
                      {f.error}
                    </p>
                  )}
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>

        {/* Footer */}
        <footer className="mt-32 md:mt-48">
          <div className="flex flex-col gap-6 border-t border-border pt-8 md:flex-row md:items-center md:justify-between md:gap-10">
            <div className="flex flex-col gap-2 text-sm font-medium text-foreground [text-shadow:0_0_10px_var(--background),0_0_3px_var(--background)] md:flex-row md:items-center md:gap-8">
              <p>{t.contact.rightsReserved}</p>
              <p>{t.contact.builtWith}</p>
            </div>
            <button
              type="button"
              onClick={() => scrollToSection("hero", reduce)}
              aria-label={t.nav.home}
              className="cta cta-secondary h-11 w-11 min-h-0 shrink-0 self-start p-0 md:self-auto"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>

          <div ref={markRef} aria-hidden="true" className="footer-mark-wrap mt-16 overflow-hidden md:mt-24">
            <motion.p style={{ y: markY }} className="footer-mark">
              <span>Alex</span> <span>Bodnia</span>
            </motion.p>
          </div>
        </footer>
      </div>
    </section>
  )
}
