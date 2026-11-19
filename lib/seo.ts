// Central place for site-wide SEO constants.
// IMPORTANT: keep this in sync with the actual deployed domain - a wrong
// domain here silently breaks canonical URLs, the sitemap, robots.txt and
// Open Graph previews.
// When you connect a custom domain (e.g. alexbodnia.com) just set
// NEXT_PUBLIC_SITE_URL in Vercel → everything (canonicals, sitemap, JSON-LD) follows.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://alexbodniawebsite.vercel.app").replace(/\/$/, "")
export const SITE_NAME = "Alex Bodnia - UI/UX Designer & Developer"
export const SITE_DESCRIPTION =
  "Alex Bodnia is a UI/UX designer and React/Next.js developer crafting bespoke digital products - web design, mobile apps, and 3D product visualization."

// ── Extra SEO constants (additive - nothing above changed) ─────────────────
export const SITE_TITLE = "Alex Bodnia - UX/UI Designer & Front-End Developer"
export const SITE_DESCRIPTION_LONG =
  "Alex Bodnia - UX/UI designer and front-end developer (React, Next.js, Figma). Websites, mobile apps, packaging and 3D visualization, from structure and interface to a finished build."
export const SITE_DESCRIPTION_UK =
  "Олександр (Alex) Бодня - UX/UI дизайнер і front-end розробник (React, Next.js, Figma). Сайти, мобільні застосунки, упаковка та 3D-візуалізація: від структури й інтерфейсу до готової збірки."

export const PERSON_ID = `${SITE_URL}/#person`
export const WEBSITE_ID = `${SITE_URL}/#website`

export const SOCIAL_LINKS = [
  "https://www.linkedin.com/in/oleksandr-bodnia-13489920b/",
  "https://github.com/AlexBodniaDev",
  "https://www.behance.net/bodniaalex",
  "https://dribbble.com/AlexBodnia",
]

export const SEO_KEYWORDS = [
  "Alex Bodnia",
  "Oleksandr Bodnia",
  "Олександр Бодня",
  "UX/UI designer",
  "UI/UX designer portfolio",
  "front-end developer",
  "React developer",
  "Next.js developer",
  "Figma designer",
  "web design",
  "mobile app design",
  "packaging design",
  "3D visualization",
  "Framer developer",
  "product designer",
  "UX/UI дизайнер",
  "веб-дизайнер",
  "дизайн мобільних застосунків",
  "front-end розробник",
]

/** Absolute URL helper for paths and /public assets. */
export const absoluteUrl = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`

/** Descriptive alt text for a project preview image. */
export const projectImageAlt = (title: string, tags: string[] = [], suffix = "case study preview") =>
  [title, tags.slice(0, 2).join(", "), suffix].filter(Boolean).join(" - ")
