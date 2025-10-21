import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { WorksSection } from "@/components/works-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
//import { LoadingScreen } from "@/components/loading-screen"
import { ScrollProgress } from "@/components/scroll-progress"

export default function Home() {
  return (
    <>
      <ScrollProgress />
      {/* <LoadingScreen /> */}
      <div className="min-h-screen">
        <Header />
        <main>
          <HeroSection />
          <WorksSection />
          <AboutSection />
          <ContactSection />
        </main>
      </div>
    </>
  )
}
