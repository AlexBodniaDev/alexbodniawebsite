import { ImageResponse } from "next/og"
import { OgCard, getOgFonts, OG_SIZE, OG_ALT } from "@/lib/og-card"

//export const runtime = "edge"
export const alt = OG_ALT
export const size = OG_SIZE
export const contentType = "image/png"

export default async function Image() {
  const fonts = await getOgFonts()
  return new ImageResponse(<OgCard />, { ...OG_SIZE, fonts })
}
