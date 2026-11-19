import type { MetadataRoute } from "next"
import data from "@/lib/data.json"
import { SITE_URL, absoluteUrl } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [absoluteUrl("/photoofme/photo-of-me-one.webp")],
    },
  ]

  const projectRoutes: MetadataRoute.Sitemap = data.projects.map((project) => ({
    url: `${SITE_URL}/work/${project.id}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
    images: project.image ? [absoluteUrl(project.image)] : undefined,
  }))

  return [...staticRoutes, ...projectRoutes]
}
