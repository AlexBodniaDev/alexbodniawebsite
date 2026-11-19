import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"

// Everything is open to search engines AND to AI assistants / answer engines,
// so they can read the site and describe Alex's work correctly.
const AI_AND_SEARCH_BOTS = [
  "Googlebot",
  "Bingbot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "CCBot",
  "cohere-ai",
  "DuckDuckBot",
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_AND_SEARCH_BOTS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
