import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { existsSync } from "node:fs"
import { join } from "node:path"
import data from "@/lib/data.json"
import { ProjectDetail } from "@/components/project-detail"
import { SITE_URL, PERSON_ID, absoluteUrl, projectImageAlt } from "@/lib/seo"

// One static page per project in lib/data.json → /work/<id>
export const dynamicParams = false

export function generateStaticParams() {
  return data.projects.map((p) => ({ id: p.id }))
}

type Project = (typeof data.projects)[number]

// Search-friendly English page titles. The on-page titles of three projects are Ukrainian
// (МЕДІС / НАША ХАТА / ТВОЄ), which Google can't match to English searches - so the <title> uses
// the Latin brand names (taken from the testimonials in data.json).
const SEO_TITLES: Record<string, string> = {
  "medis-healthcare": "Medis - Healthcare Website UX/UI Design",
  "nasha-hata-real-estate": "Nasha Khata - Fences & Gates Website UX/UI & Mobile Design",
  "tvoe-web-design": "Tvoe - Emotion Factory - Gifts Website UX/UI & Mobile Design",
}

function seoTitle(project: Project) {
  const custom = SEO_TITLES[project.id]
  if (custom) return custom
  const withTags = `${project.title} - ${project.tags.slice(0, 2).join(" & ")}`
  return withTags.length <= 52 ? withTags : project.title
}

function seoDescription(project: Project) {
  const suffix = " Case study by Alex Bodnia."
  return project.description.length + suffix.length <= 158 ? project.description + suffix : project.description
}

/** Social cards (LinkedIn, Facebook, iMessage…) handle PNG/JPG more reliably than WebP - use the PNG twin when it exists. */
function socialImage(src: string) {
  const png = src.replace(/\.webp$/i, ".png")
  try {
    if (png !== src && existsSync(join(process.cwd(), "public", png))) return png
  } catch {}
  return src
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const project = data.projects.find((p) => p.id === id)
  if (!project) return {}
  const title = seoTitle(project)
  const description = seoDescription(project)
  const image = project.image ? absoluteUrl(socialImage(project.image)) : undefined
  const alt = projectImageAlt(project.title, project.tags)
  return {
    title,
    description,
    keywords: [...project.tags, project.title, "case study", "Alex Bodnia", "UX/UI designer portfolio"],
    alternates: { canonical: `/work/${project.id}` },
    openGraph: {
      title,
      description,
      url: `/work/${project.id}`,
      siteName: "Alex Bodnia Portfolio",
      type: "article",
      authors: ["Alex Bodnia"],
      images: image ? [{ url: image, width: 1920, height: 1440, alt }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  }
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = data.projects.find((p) => p.id === id)
  if (!project) notFound()

  const url = `${SITE_URL}/work/${project.id}`
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        url,
        name: seoTitle(project),
        headline: project.title,
        description: project.description,
        image: project.image ? absoluteUrl(socialImage(project.image)) : undefined,
        keywords: project.tags.join(", "),
        inLanguage: ["en", "uk"],
        creator: { "@id": PERSON_ID },
        author: { "@id": PERSON_ID },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Works", item: `${SITE_URL}/#works` },
          { "@type": "ListItem", position: 3, name: project.title, item: url },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetail project={project} />
    </>
  )
}
