import type React from "react"
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { PageTransition } from "@/components/page-transition"
import type { Metadata } from "next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Alex — Creative Designer & Developer",
  description:
    "Award-winning UX/UI designer and developer crafting exceptional digital experiences with 4+ years of expertise.",
  keywords: ["UX Designer", "UI Designer", "Creative Developer", "Digital Design", "Portfolio"],
  authors: [{ name: "Alex", url: "https://alex-portfolio.vercel.app" }],
  creator: "Alex",
  openGraph: {
    title: "Alex — Creative Designer & Developer",
    description: "Award-winning UX/UI designer and developer crafting exceptional digital experiences.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex — Creative Designer & Developer",
    description: "Award-winning UX/UI designer and developer crafting exceptional digital experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="overflow-x-hidden">
        <ThemeProvider defaultTheme="light" storageKey="alex-portfolio-theme">
          <PageTransition>{children}</PageTransition>
        </ThemeProvider>
      </body>
    </html>
  )
}
