import type { MetadataRoute } from "next"
import data from "@/lib/data.json"
import { SITE_URL } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
  ]

  const projectRoutes: MetadataRoute.Sitemap = data.projects.map((project) => ({
    url: `${SITE_URL}/work/${project.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  return [...staticRoutes, ...projectRoutes]
}
