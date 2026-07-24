import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Alex Bodnia — UI/UX Designer & Developer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "90px",
          background: "linear-gradient(135deg, #17171c 0%, #1f1a33 55%, #2a1f4d 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 18px",
            borderRadius: 999,
            border: "1px solid rgba(150,130,255,0.4)",
            background: "rgba(150,130,255,0.08)",
            color: "#b7a8ff",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 40,
          }}
        >
          UI/UX Designer &amp; React Developer
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 84,
            fontWeight: 700,
            color: "#f5f4fb",
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          <span>
            Alex <span style={{ color: "#a48bff" }}>Bodnia</span>
          </span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 32,
            color: "#9d9cae",
            maxWidth: 900,
          }}
        >
          Engineering bespoke digital systems where art meets logic.
        </div>
      </div>
    ),
    { ...size }
  )
}
