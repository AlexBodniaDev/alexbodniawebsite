import type { MetadataRoute } from "next"
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Alex Bodnia",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#151a1e",
    theme_color: "#151a1e",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  }
}
