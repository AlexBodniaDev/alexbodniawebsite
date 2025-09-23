"use client"
import { Header } from "@/components/header"
import { ProjectDetail } from "@/components/project-detail"

interface ProjectPageClientProps {
  project: {
    id: string
    title: string
    description: string
    imageUrl: string
    technologies: string[]
    link: string
  }
}

export default function ProjectPageClient({ project }: ProjectPageClientProps) {
  return (
    <div className="min-h-screen">
      <Header />
      <ProjectDetail project={project} />
    </div>
  )
}
