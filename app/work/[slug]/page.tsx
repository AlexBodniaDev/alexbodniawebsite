import { notFound } from "next/navigation"
import data from "@/lib/data.json"
import ProjectPageClient from "./ProjectPageClient"
import { SITE_URL } from "@/lib/seo"

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return data.projects.map((project) => ({
    slug: project.id,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = data.projects.find((p) => p.id === slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  const url = `${SITE_URL}/work/${project.id}`

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${project.title} | Alex Bodnia`,
      description: project.description,
      url,
      type: "article",
      images: [{ url: project.image, width: 1200, height: 675, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Alex Bodnia`,
      description: project.description,
      images: [project.image],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = data.projects.find((p) => p.id === slug)

  if (!project) {
    notFound()
  }

  return <ProjectPageClient project={project} />
}