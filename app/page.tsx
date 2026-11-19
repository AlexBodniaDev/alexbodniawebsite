import { HeroSection } from "@/components/hero-section"
import { WorksSection } from "@/components/works-section"
import { AboutSection } from "@/components/about-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { ContactSection } from "@/components/contact-section"
import { ScrollProgress } from "@/components/scroll-progress"
import { HashScroll } from "@/components/hash-scroll"
import { SlideSection, type TransitionVariant } from "@/components/slide-section"
import data from "@/lib/data.json"
import { SITE_URL, PERSON_ID, absoluteUrl } from "@/lib/seo"

// Machine-readable list of the portfolio's works (helps Google and AI assistants understand what Alex has built).
const worksJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Selected works by Alex Bodnia",
  itemListElement: data.projects.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE_URL}/work/${p.id}`,
    item: {
      "@type": "CreativeWork",
      name: p.title,
      description: p.description,
      image: p.image ? absoluteUrl(p.image) : undefined,
      keywords: p.tags.join(", "),
      creator: { "@id": PERSON_ID },
    },
  })),
}

// Story order: intro -> work -> who -> proof -> questions -> let's talk.
// `variant` = how that section arrives (see slide-section.tsx).
const SECTIONS: { Section: () => React.JSX.Element | null; variant: TransitionVariant }[] = [
  { Section: HeroSection, variant: "none" },
  { Section: WorksSection, variant: "zoom" },
  { Section: AboutSection, variant: "arch" },
  { Section: TestimonialsSection, variant: "stack" },
  { Section: FAQSection, variant: "rise" },
  { Section: ContactSection, variant: "reveal" },
]

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(worksJsonLd) }}
      />
      <ScrollProgress />
      <HashScroll />
      <div className="min-h-screen">
        <main>
          {SECTIONS.map(({ Section, variant }, i) => (
            <SlideSection
              key={i}
              index={i}
              variant={variant}
              nextVariant={SECTIONS[i + 1]?.variant}
              isLast={i === SECTIONS.length - 1}
            >
              <Section />
            </SlideSection>
          ))}
        </main>
      </div>
    </>
  )
}
