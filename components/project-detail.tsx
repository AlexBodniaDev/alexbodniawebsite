"use client"

import { useEffect, useLayoutEffect, useRef } from "react"
import { motion, useScroll } from "framer-motion"
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Zap, Lightbulb, Building2, Clock, Users, Layers } from "lucide-react"
import Link from "next/link"
import siteData from "@/lib/data.json"
import { useLanguage } from "@/components/language-provider"
import { InteractiveField } from "@/components/interactive-field"
import { Decor, workDecor } from "@/components/decor"
import { ScrollText, TextBand } from "@/components/text-fx"
import { Reveal, MaskReveal } from "@/components/reveal"
import { ScrollProgress } from "@/components/scroll-progress"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { DURATION, EASE, STAGGER, onSheenMove, cancelScrollAnimation } from "@/lib/motion"
import { projectDetailsEn, projectDetailsUk } from "@/lib/project-details"

// ─── Heading with the last word in the site's italic accent ──────────────────
function AccentLabel({ text }: { text: string }) {
  const i = text.lastIndexOf(" ")
  if (i < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, i)} <em className="accent">{text.slice(i + 1)}</em>
    </>
  )
}

// ─── Chapter: numbered heading on the left, content on the right ─────────────
// Same editorial rhythm as the home page: hairline rule, mono eyebrow, serif title.
function Chapter({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <section className="rule-fade py-20 md:py-32">
      <div className="grid-12 gap-y-10">
        <div className="col-span-12 lg:col-span-3">
          <div className="lg:sticky lg:top-32">
            <span aria-hidden="true" className="mb-5 block h-px w-10 bg-[var(--cta)]/50" />
            <h2 className="h-title">
              <MaskReveal>
                <AccentLabel text={label} />
              </MaskReveal>
            </h2>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-9">{children}</div>
      </div>
    </section>
  )
}

// ─── Process step: the timeline line fills with ink as you scroll past it ─────
function ProcessStep({ index, title, description, last }: { index: number; title: string; description: string; last: boolean }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLLIElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.45"] })
  return (
    <li ref={ref} className="relative border-l border-border pb-14 pl-7 last:border-transparent last:pb-0 md:pl-10">
      {!last && (
        <motion.span
          aria-hidden="true"
          className="absolute -left-px top-0 h-full w-px origin-top bg-[var(--cta)]"
          style={{ scaleY: reduce ? 1 : scrollYProgress }}
        />
      )}
      <span
        aria-hidden="true"
        className="absolute -left-[0.4rem] top-1.5 h-3 w-3 rounded-full border-[1.5px] border-[var(--cta)] bg-background ring-4 ring-background"
      />
      <Reveal delay={Math.min(index, 3) * STAGGER} y={16}>
        <h3 className="h-item mb-3">{title}</h3>
        <p className="body-text max-w-2xl text-muted-foreground">{description}</p>
      </Reveal>
    </li>
  )
}

// ─── Interface labels (unchanged wording) ───────────────────────────────────
const LABELS_UK = { caseStudy: "Кейс", back: "Назад до проєктів", viewProject: "Переглянути проєкт", source: "Код", industry: "Індустрія", duration: "Тривалість", team: "Команда", platform: "Платформа", overview: "Огляд", brief: "Завдання", challenge: "Виклик", solution: "Рішення", goals: "Цілі", process: "Процес", deliverables: "Результати", role: "Моя роль", tools: "Інструменти та технології", walkthrough: "Візуальний огляд", walkthroughText: "Детальний погляд на кожен екран і", walkthroughAccent: "дизайнерське рішення.", learned: "Що я зрозумів", previous: "Попередній", next: "Наступний", explore: "Більше", ready: "Хочете побачити більше", work: "робіт?" }
const LABELS_EN = { caseStudy: "Case Study", back: "Back to projects", viewProject: "View Project", source: "Source", industry: "Industry", duration: "Duration", team: "Team", platform: "Platform", overview: "Overview", brief: "The Brief", challenge: "The Challenge", solution: "The Solution", goals: "Goals", process: "Process", deliverables: "Deliverables", role: "My Role", tools: "Tools & Technologies", walkthrough: "Visual Walkthrough", walkthroughText: "A closer look at every screen and", walkthroughAccent: "design decision.", learned: "What I Learned", previous: "Previous", next: "Next", explore: "Explore more", ready: "Ready to see more", work: "work?" }

// ─── Component ────────────────────────────────────────────────────────────────
export function ProjectDetail({ project }: { project: any }) {
  const reduce = useReducedMotion()
  const { locale } = useLanguage()
  const uk = locale === "uk"
  // A case study always opens at the very top (the home page's scroll position must not carry over,
  // and the smooth-scroll / page-fade must not leave us in the middle of the page).
  useLayoutEffect(() => {
    const root = document.documentElement
    const toTop = () => {
      cancelScrollAnimation()
      const prev = root.style.scrollBehavior
      root.style.scrollBehavior = "auto"
      window.scrollTo(0, 0)
      root.style.scrollBehavior = prev
    }
    toTop()
    const timers = [50, 200, 500].map((ms) => window.setTimeout(toTop, ms))
    return () => timers.forEach(window.clearTimeout)
  }, [project.id])
  // nothing on a freshly opened case study should look "selected": drop any focus carried over from the previous page
  useEffect(() => {
    const el = document.activeElement as HTMLElement | null
    if (el && el !== document.body) el.blur()
  }, [project.id])
  const isMobileProject = project.id.includes("mobile")
  const details = uk
    ? (projectDetailsUk[project.id] ?? projectDetailsEn[project.id])
    : (projectDetailsEn[project.id] ?? projectDetailsUk[project.id])
  const displayTitle = uk ? (project.title_uk ?? project.title) : project.title
  const tags: string[] = ((uk ? project.tags_uk : project.tags) ?? []).slice(0, 3)
  const labels = uk ? LABELS_UK : LABELS_EN

  // Hero visual: the project's preview; if it is still a placeholder, use the first screen of the case study.
  const heroSrc: string | undefined =
    !project.image || project.image.includes("placeholder") ? details?.images?.[0]?.src : project.image

  // Previous / next project
  const list = (siteData as any).projects as { id: string; title: string; title_uk?: string }[]
  const currentIndex = list.findIndex((p) => p.id === project.id)
  const prevProject = currentIndex > 0 ? list[currentIndex - 1] : list[list.length - 1]
  const nextProject = currentIndex < list.length - 1 ? list[currentIndex + 1] : list[0]
  const nameOf = (p: { title: string; title_uk?: string }) => (uk ? (p.title_uk ?? p.title) : p.title)

  // Gallery: phone screens and desktop screens are laid out separately so each one scales correctly
  const allShots: { src: string; title: string; description: string }[] = details?.images ?? []
  const isPhoneShot = (src: string) => isMobileProject || /\/(phone|nashakhata\/|tvoie\/)/i.test(src)
  const phoneShots = allShots.filter((i) => isPhoneShot(i.src))
  const deskShots = allShots.filter((i) => !isPhoneShot(i.src))

  const snapshot = details?.snapshot
    ? [
        { icon: Building2, label: labels.industry, value: details.snapshot.industry },
        { icon: Clock, label: labels.duration, value: details.snapshot.duration },
        { icon: Users, label: labels.team, value: details.snapshot.team },
        { icon: Layers, label: labels.platform, value: details.snapshot.platform },
      ]
    : null

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      {/* ════════════════════════════════════════════════════════════════════
          HERO - same mesh + type language as the home page
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
        <div aria-hidden="true" className="absolute inset-0 z-0">
          <InteractiveField fade="bottom" />
        </div>

        <div className="container-x relative z-10">
          <Reveal y={12}>
            <Link
              href="/#works"
              className="group cta cta-secondary eyebrow mb-12 px-5 py-3 md:mb-16"
            >
              <ArrowLeft className="cta-arrow h-4 w-4 group-hover:-translate-x-1" />
              {labels.back}
            </Link>
          </Reveal>

          <Reveal delay={STAGGER} y={12}>
            <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 md:mb-8">
              <span className="eyebrow text-foreground">
                {project.year ? `${project.year} · ` : ""}
                {labels.caseStudy}
              </span>
              {tags.length > 0 && <span aria-hidden="true" className="h-px w-10 bg-[var(--cta)]/50" />}
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="eyebrow tag-tint rounded-full px-3 py-1.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          <h1 className="mb-8 max-w-[20ch] break-words text-balance text-[clamp(2.5rem,1rem+6vw,8rem)] font-semibold leading-[1] tracking-[-0.045em] [html[lang=uk]_&]:text-[clamp(2.25rem,1rem+5vw,6.75rem)] md:mb-12">
            <MaskReveal delay={STAGGER * 2}>{displayTitle}</MaskReveal>
          </h1>

          {details?.tagline && (
            <Reveal delay={STAGGER * 3}>
              <p className="lead mb-14 max-w-2xl text-foreground/75 md:mb-20">{details.tagline}</p>
            </Reveal>
          )}

          {(details?.metrics || details?.liveUrl || details?.githubUrl) && (
            <Reveal delay={STAGGER * 4}>
              <div className="flex flex-col gap-10 border-t border-border pt-10 md:flex-row md:items-end md:justify-between md:gap-16 md:pt-12">
                {details?.metrics && (
                  <div className="flex flex-wrap gap-x-12 gap-y-8">
                    {details.metrics.map((m: any, i: number) => (
                      <div key={i} className={`space-y-2 ${i > 0 ? "md:border-l md:border-border md:pl-12" : ""}`}>
                        <p className="text-[clamp(2.5rem,1.5rem+3.6vw,5rem)] font-semibold leading-none tracking-[-0.05em] tabular-nums text-[var(--accent-ink)]">
                          {m.value}
                        </p>
                        <p className="eyebrow max-w-[11rem] leading-snug text-muted-foreground">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3 md:gap-4">
                  {details?.liveUrl && (
                    <a
                      href={details.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta cta-primary px-7 py-4 text-sm md:text-base"
                    >
                      {labels.viewProject}
                      <ArrowUpRight className="cta-arrow cta-arrow-ur h-4 w-4" />
                    </a>
                  )}
                  {details?.githubUrl && (
                    <a
                      href={details.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta cta-secondary px-7 py-4 text-sm md:text-base"
                    >
                      {labels.source}
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          COVER - same frame as the card on the home page
      ════════════════════════════════════════════════════════════════════ */}
      <div className="relative isolate">
      <Decor shapes={workDecor(project.id)} />
      <div className="container-x">
        <Reveal y={28}>
          <div className="relative">
          {heroSrc && (
            <div
              aria-hidden="true"
              className="cover-ambient pointer-events-none absolute inset-x-[6%] -bottom-6 -top-2 -z-10 rounded-[2rem] opacity-40 blur-3xl saturate-150 dark:opacity-30 md:-bottom-10"
              style={{ backgroundImage: `url("${heroSrc}")`, backgroundSize: "cover", backgroundPosition: "center" }}
            />
          )}
          <div
            // previews are 4:3 - the frame is 4:3 too, so the whole preview (incl. its text) is always visible
            className="relative mx-auto aspect-[4/3] w-full max-w-[min(100%,64rem)] overflow-hidden rounded-[1.5rem] bg-muted shadow-[0_40px_90px_-52px_rgb(0_0_0/0.55)] ring-1 ring-border md:rounded-[2rem]"
          >
            {heroSrc ? (
              <motion.div
                className="absolute inset-0"
                initial={{ scale: reduce ? 1 : 1.04 }}
                animate={{ scale: 1 }}
                transition={reduce ? { duration: 0 } : { duration: DURATION.slow + 0.2, ease: EASE, delay: 0.15 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={heroSrc}
                  alt={`${displayTitle} - ${tags.join(", ")} - ${uk ? "превʼю кейсу" : "case study preview"}`}
                  decoding="async"
                  draggable={false}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            ) : (
              <div
                aria-hidden="true"
                className="h-full w-full"
                style={{ background: "linear-gradient(135deg, oklch(0.32 0.012 245) 0%, oklch(0.2 0.01 245) 100%)" }}
              />
            )}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10 shadow-[inset_0_1px_0_rgb(255_255_255/0.28),inset_0_-140px_150px_-110px_rgb(0_0_0/0.32)]"
            />
          </div>
          </div>
        </Reveal>

        {/* Snapshot */}
        {snapshot && (
          <Reveal delay={STAGGER}>
            <dl className="surface-lit mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-border bg-border md:mt-12 lg:grid-cols-4">
              {snapshot.map((item) => (
                <div key={item.label} className="bg-background px-6 py-7 transition-colors duration-300 hover:bg-card md:px-8 md:py-10">
                  <dt className="eyebrow mb-2 text-muted-foreground">
                    <item.icon aria-hidden="true" className="mb-4 block h-4 w-4 text-[var(--accent-ink)]" />
                    {item.label}
                  </dt>
                  <dd className="text-lg font-semibold leading-snug tracking-[-0.02em] md:text-xl">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          NARRATIVE
      ════════════════════════════════════════════════════════════════════ */}
      <div className="container-x mt-24 md:mt-36">
        {details?.overview && (
          <Chapter label={labels.overview}>
            <Reveal>
              <ScrollText className="t-statement">{details.overview}</ScrollText>
            </Reveal>
          </Chapter>
        )}

        {(details?.challenge || details?.solution) && (
          <Chapter label={labels.brief}>
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              {[
                { icon: Zap, title: labels.challenge, body: details?.challenge },
                { icon: Lightbulb, title: labels.solution, body: details?.solution },
              ].map(
                (block, i) =>
                  block.body && (
                    <Reveal key={block.title} delay={i * STAGGER} className="h-full">
                      <div className="brief-card">
                        <span className="brief-icon">
                          <block.icon aria-hidden="true" className="h-5 w-5" />
                        </span>
                        <h3 className="h-item relative mb-4 text-foreground">{block.title}</h3>
                        <p className="body-text relative text-foreground/75">
                          {block.body}
                        </p>
                      </div>
                    </Reveal>
                  ),
              )}
            </div>
          </Chapter>
        )}

        {details?.goals && (
          <Chapter label={labels.goals}>
            <ul className="divide-y divide-border border-y border-border">
              {details.goals.map((goal: string, i: number) => (
                <li key={goal}>
                  <Reveal delay={Math.min(i, 3) * STAGGER} y={16}>
                    <div className="group flex items-baseline gap-5 py-6 md:gap-6 md:py-8">
                      <span aria-hidden="true" className="h-2 w-2 shrink-0 -translate-y-[0.15em] rounded-full bg-[var(--cta)] transition-transform duration-300 group-hover:scale-150" />
                      <p className="text-[clamp(1.125rem,1rem+0.6vw,1.625rem)] font-medium leading-snug tracking-[-0.02em] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">{goal}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Chapter>
        )}

        {details?.process && (
          <Chapter label={labels.process}>
            <ol className="ml-1.5">
              {details.process.map((step: any, i: number) => (
                <ProcessStep key={i} index={i} title={step.title} description={step.description} last={i === details.process.length - 1} />
              ))}
            </ol>
          </Chapter>
        )}

        {(details?.role || details?.technologies) && (
          <Chapter label={labels.deliverables}>
            <div className="grid gap-10 sm:grid-cols-2 sm:gap-12">
              {details?.role && (
                <Reveal>
                  <h3 className="eyebrow mb-5 text-[var(--accent-ink)]">{labels.role}</h3>
                  <ul className="space-y-3">
                    {details.role.map((r: string) => (
                      <li key={r} className="flex items-center gap-3 text-base">
                        <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--cta)]" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
              {details?.technologies && (
                <Reveal delay={STAGGER}>
                  <h3 className="eyebrow mb-5 text-[var(--accent-ink)]">{labels.tools}</h3>
                  <div className="flex flex-wrap gap-2">
                    {details.technologies.map((tech: string) => (
                      <span
                        key={tech}
                        className="eyebrow rounded-full border border-border bg-card/60 px-3.5 py-2 transition-colors duration-200 hover:border-[var(--cta)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Reveal>
              )}
            </div>
          </Chapter>
        )}
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          VISUAL WALKTHROUGH
      ════════════════════════════════════════════════════════════════════ */}
      {allShots.length > 0 && (
        <div className="container-x">
          <section className="rule-fade pt-20 md:pt-32">
            <div className="mb-14 md:mb-24">
              <p className="eyebrow mb-5 text-[var(--accent-ink)]">{labels.walkthrough}</p>
              <Reveal>
                <h2 className="h-display max-w-4xl">
                  {labels.walkthroughText} <em className="accent">{labels.walkthroughAccent}</em>
                </h2>
              </Reveal>
            </div>

            {/* Desktop screens: one shared 16:10 frame, whole screenshot scaled to fit */}
            {deskShots.length > 0 && (
              <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 md:gap-x-12 md:gap-y-20">
                {deskShots.map((img, index) => (
                  <Reveal key={img.src} delay={Math.min(index % 2, 1) * STAGGER}>
                    <figure className="group">
                      <div onPointerMove={onSheenMove} className="sheen-frame shot-frame relative aspect-[16/10] overflow-hidden rounded-[1.25rem] border border-border bg-muted/40 transition-[border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:border-[var(--cta)] group-hover:shadow-[0_40px_80px_-46px_rgb(0_0_0/0.5)] md:rounded-[1.5rem]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.src}
                          alt={`${displayTitle} - ${img.title}${img.description ? `: ${String(img.description).split(/(?<=[.!?])\s/)[0]}` : ""}`.slice(0, 180)}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-contain transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                        />
                      </div>
                      <figcaption className="mt-5 md:mt-6">
                        <h3 className="h-item mb-2">{img.title}</h3>
                        <p className="body-text max-w-xl text-muted-foreground">{img.description}</p>
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            )}

            {/* Phone screens: 2 per row on a phone, 3-4 on bigger screens; shown at their natural proportions (never cropped) */}
            {phoneShots.length > 0 && (
              <div
                className={`grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-4 lg:gap-x-10 ${
                  deskShots.length > 0 ? "mt-20 md:mt-28" : ""
                }`}
              >
                {phoneShots.map((img, index) => (
                  <Reveal key={img.src} delay={Math.min(index % 3, 2) * STAGGER}>
                    <figure className="group">
                      <div onPointerMove={onSheenMove} className="sheen-frame shot-frame relative overflow-hidden rounded-[1.25rem] border border-border bg-muted/40 transition-[border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:border-[var(--cta)] group-hover:shadow-[0_40px_80px_-46px_rgb(0_0_0/0.5)] md:rounded-[1.5rem]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.src}
                          alt={`${displayTitle} - ${img.title}${img.description ? `: ${String(img.description).split(/(?<=[.!?])\s/)[0]}` : ""}`.slice(0, 180)}
                          loading="lazy"
                          decoding="async"
                          className="block h-auto w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                        />
                      </div>
                      <figcaption className="mt-4 md:mt-5">
                        <h3 className="h-item mb-1.5 text-[clamp(0.95rem,0.85rem+0.4vw,1.15rem)]">{img.title}</h3>
                        <p className="body-text text-sm text-muted-foreground">{img.description}</p>
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          WHAT I LEARNED
      ════════════════════════════════════════════════════════════════════ */}
      {details?.learnings && (
        <div className="container-x mt-24 md:mt-36">
          <Chapter label={labels.learned}>
            <Reveal>
              <ScrollText className="t-statement">{details.learnings}</ScrollText>
            </Reveal>
          </Chapter>
        </div>
      )}

      {/* band: project name + categories, slides with scroll */}
      <TextBand
        className="mt-28 md:mt-44"
        items={[displayTitle, ...tags]}
      />
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          NEXT / PREVIOUS + FINAL CTA - same finish as the home page
      ════════════════════════════════════════════════════════════════════ */}
      <footer className="relative mt-12 overflow-hidden border-t border-border pb-36 pt-28 md:mt-24 md:pb-32 md:pt-40">
        <InteractiveField fade="top" />

        <div className="container-x relative z-10">
          <div className="mb-16 md:mb-24">
            <Reveal y={12}>
              <p className="eyebrow mb-6 text-muted-foreground">{labels.explore}</p>
            </Reveal>
            <h2 className="h-display">
              <MaskReveal>
                {labels.ready} <em className="accent">{labels.work}</em>
              </MaskReveal>
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 md:gap-8">
            {[
              { p: prevProject, label: labels.previous, dir: "prev" as const },
              { p: nextProject, label: labels.next, dir: "next" as const },
            ].map(({ p, label, dir }, i) => (
              <Reveal key={dir} delay={i * STAGGER} className="h-full">
                <Link
                  href={`/work/${p.id}`}
                  className={`group nav-card ${dir === "next" ? "sm:text-right" : ""}`}
                >
                  <p className={`eyebrow nav-label mb-8 flex items-center gap-3 ${dir === "next" ? "sm:justify-end" : ""}`}>
                    {dir === "prev" && (
                      <span className="nav-arrow">
                        <ArrowLeft className="cta-arrow h-4 w-4 group-hover:-translate-x-0.5" />
                      </span>
                    )}
                    {label}
                    {dir === "next" && (
                      <span className="nav-arrow">
                        <ArrowRight className="cta-arrow h-4 w-4 group-hover:translate-x-0.5" />
                      </span>
                    )}
                  </p>
                  <p className="break-words text-[clamp(1.35rem,1rem+1.3vw,2.25rem)] font-semibold leading-tight tracking-[-0.03em] text-balance">
                    {nameOf(p)}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={STAGGER * 2}>
            <div className="mt-16 flex justify-start md:mt-20">
              <Link href="/#works" className="cta cta-secondary eyebrow px-7 py-4">
                <ArrowLeft className="cta-arrow h-4 w-4 text-[var(--accent-ink)]" />
                {labels.back}
              </Link>
            </div>
          </Reveal>
        </div>
      </footer>
    </div>
  )
}
