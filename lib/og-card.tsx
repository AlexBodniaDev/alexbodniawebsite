// Link-preview card (Open Graph + Twitter) in the site's own look:
// charcoal + neon lime, heavy Unbounded headline, mono-ish eyebrow, soft "silk" light.
// Shared by app/opengraph-image.tsx and app/twitter-image.tsx so the two never drift apart.
import { SITE_URL } from "@/lib/seo"

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_ALT = "Alex Bodnia - UI/UX Designer & Developer"

const BG = "#151a1e"
const LIME = "#cbef63"
const INK = "#edede9"
const MUTED = "#99a0a6"

const HEADLINE = "I design digital products."
const FONT_TEXT = `${HEADLINE}Available worldwide Alex Bodnia UX/UI & Product Designer Design from someone who also builds.WebsitesAppsPackaging3D${SITE_URL.replace(/^https?:\/\//, "")}`

type OgFont = { name: string; data: ArrayBuffer; weight: 500 | 800; style: "normal" }

// Loads a static Unbounded cut from Google Fonts (subset to the characters used, so it is tiny).
// If the request fails for any reason the card still renders with the default sans font.
async function loadUnbounded(weight: 500 | 800): Promise<OgFont | null> {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=Unbounded:wght@${weight}&text=${encodeURIComponent(FONT_TEXT)}`,
        { headers: { "User-Agent": "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1" } },
      )
    ).text()
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1]
    if (!url) return null
    const res = await fetch(url)
    if (!res.ok) return null
    return { name: "Unbounded", data: await res.arrayBuffer(), weight, style: "normal" }
  } catch {
    return null
  }
}

export async function getOgFonts(): Promise<OgFont[]> {
  const fonts = await Promise.all([loadUnbounded(800), loadUnbounded(500)])
  return fonts.filter((f): f is OgFont => f !== null)
}

export function OgCard() {
  const host = SITE_URL.replace(/^https?:\/\//, "")
  const pill = {
    display: "flex",
    padding: "10px 20px",
    borderRadius: 999,
    border: "1px solid rgba(237,237,233,0.22)",
    background: "rgba(237,237,233,0.05)",
    color: INK,
    fontSize: 22,
    fontWeight: 500,
    letterSpacing: -0.3,
  } as const

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        position: "relative",
        background: BG,
        backgroundImage: [
          "radial-gradient(ellipse 760px 520px at 88% 8%, rgba(203,239,99,0.30), rgba(203,239,99,0) 70%)",
          "radial-gradient(ellipse 620px 420px at 6% 112%, rgba(60,150,130,0.26), rgba(60,150,130,0) 70%)",
        ].join(","),
        fontFamily: "Unbounded, sans-serif",
        color: INK,
      }}
    >
      {/* hairline frame, like the cards on the site */}
      <div
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          right: 24,
          bottom: 24,
          borderRadius: 28,
          border: "1px solid rgba(237,237,233,0.10)",
          display: "flex",
        }}
      />

      {/* top row: availability badge + domain */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#10b981", display: "flex" }} />
          <div style={{ display: "flex", fontSize: 20, fontWeight: 500, letterSpacing: 3, textTransform: "uppercase", color: MUTED }}>
            Available worldwide
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, fontWeight: 500, color: MUTED }}>{host}</div>
      </div>

      {/* headline: two-tone, the accent word in lime (same idea as the hero) */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* three lines like the hero; Unbounded is wide, so each line stays short enough to never overflow */}
        <div style={{ display: "flex", fontSize: 82, fontWeight: 800, lineHeight: 1.04, letterSpacing: -3.5 }}>I design</div>
        <div style={{ display: "flex", fontSize: 82, fontWeight: 800, lineHeight: 1.04, letterSpacing: -3.5, color: LIME }}>digital</div>
        <div style={{ display: "flex", fontSize: 82, fontWeight: 800, lineHeight: 1.04, letterSpacing: -3.5 }}>products.</div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 26, fontWeight: 500, letterSpacing: -0.6, color: "rgba(237,237,233,0.72)" }}>
          Design from someone who also builds.
        </div>
      </div>

      {/* bottom row: name + what I make */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 800, letterSpacing: -1.2 }}>
            Alex <span style={{ color: "rgba(237,237,233,0.55)", marginLeft: 12 }}>Bodnia</span>
          </div>
          <div style={{ display: "flex", fontSize: 18, fontWeight: 500, letterSpacing: 2.5, textTransform: "uppercase", color: LIME }}>
            UX/UI &amp; Product Designer
          </div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={pill}>Websites</div>
          <div style={pill}>Apps</div>
          <div style={pill}>Packaging</div>
          <div style={pill}>3D</div>
        </div>
      </div>
    </div>
  )
}
