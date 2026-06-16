import { notFound } from "next/navigation"
import data from "@/lib/data.json"
import ProjectPageClient from "./ProjectPageClient"

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

  return {
    title: `${project.title} - Alex Portfolio`,
    description: project.description,
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