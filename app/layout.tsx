import type React from "react"
import { Quicksand, Merriweather, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { PageTransition } from "@/components/page-transition"
import { Header } from "@/components/header"
import type { Metadata } from "next"

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
  preload: true,
  weight: ["300", "400", "500", "600", "700"],
})

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
  preload: true,
  weight: ["300", "400", "700"],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Alex — UX/UI Designer & Developer",
  description:
    "UX/UI designer and developer that can take the 'im' part of the word impossible and make your vision become possible.",
  keywords: ["UX Designer", "UI Designer", "Creative Developer", "Digital Design", "Portfolio"],
  authors: [{ name: "Alex", url: "https://alex-portfolio.vercel.app" }],
  creator: "AlexBodnia",
  openGraph: {
    title: "Alex — Creative Designer & Developer",
    description: "UX/UI designer and developer crafting exceptional digital experiences.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex — Creative Designer & Developer",
    description: "UX/UI designer and developer crafting exceptional digital experiences.",
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
      className={`${quicksand.variable} ${merriweather.variable} ${jetbrainsMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="overflow-x-hidden">
        <ThemeProvider defaultTheme="light" storageKey="alex-portfolio-theme">
          <Header />
          <PageTransition>{children}</PageTransition>
        </ThemeProvider>
      </body>
    </html>
  )
}
