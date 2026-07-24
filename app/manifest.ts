import type { MetadataRoute } from "next"
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Alex Bodnia",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#fcfcfd",
    theme_color: "#1e2327",
    icons: [
      {
        src: "/placeholder-logo.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  }
}
