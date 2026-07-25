import type React from "react"
import { Quicksand, Merriweather, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { PageTransition } from "@/components/page-transition"
import { Header } from "@/components/header"
import { ErrorBoundary } from "@/components/error-boundary"
import type { Metadata } from "next"
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo"
import data from "@/lib/data.json"

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Alex Bodnia — UI/UX Designer & Developer",
    template: "%s | Alex Bodnia",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Alex Bodnia",
    "UX Designer",
    "UI Designer",
    "Creative Developer",
    "React Developer",
    "Next.js Developer",
    "Digital Design",
    "Product Design Portfolio",
    "Web Design Portfolio",
  ],
  authors: [{ name: "Alex Bodnia", url: SITE_URL }],
  creator: "Alex Bodnia",
  publisher: "Alex Bodnia",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      uk: "/",
    },
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Alex Bodnia Portfolio",
    type: "website",
    locale: "en_US",
    alternateLocale: ["uk_UA"],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
  generator: "v0.app",
  // The site ships its own EN/UA toggle (see LanguageProvider), so Chrome's
  // automatic page-translate feature must be disabled. Left enabled, Chrome
  // rewrites text nodes in-place with <font> wrapper elements; the next time
  // React re-renders (scroll state, animations, etc.) it tries to update
  // nodes Chrome already restructured and throws an uncaught DOM error,
  // which crashes the whole React tree and freezes the page on a blank
  // screen — exactly what was happening in production.
  other: {
    google: "notranslate",
  },
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Alex Bodnia",
  url: SITE_URL,
  image: `${SITE_URL}/photo-of-me-one.jpg`,
  jobTitle: "UI/UX Designer & React Developer",
  description: SITE_DESCRIPTION,
  email: `mailto:${data.personal.email}`,
  sameAs: [
    data.personal.linkedin,
    data.personal.github,
    "https://www.behance.net/bodniaalex",
    "https://dribbble.com/AlexBodnia",
  ],
  knowsAbout: ["UI Design", "UX Design", "React", "Next.js", "TypeScript", "3D Visualization"],
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Alex Bodnia Portfolio",
  url: SITE_URL,
  inLanguage: ["en", "uk"],
  author: { "@type": "Person", name: "Alex Bodnia" },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      translate="no"
      className={`${quicksand.variable} ${merriweather.variable} ${jetbrainsMono.variable} antialiased notranslate`}
      suppressHydrationWarning
    >
      <head>
        <meta name="google-site-verification" content="iY9Yp7VEkL7d0orO8mF_kCHkh2OCaiv4vQhZk_qmWhY" />
        <meta name="google" content="notranslate" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="overflow-x-hidden notranslate" translate="no">
        <ErrorBoundary>
          <ThemeProvider defaultTheme="light" storageKey="alex-portfolio-theme">
            <LanguageProvider defaultLocale="en" storageKey="alex-portfolio-locale">
              <Header />
              <PageTransition>{children}</PageTransition>
            </LanguageProvider>
          </ThemeProvider>
        </ErrorBoundary>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}