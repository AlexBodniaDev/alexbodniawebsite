"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Github, Lightbulb, Zap, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function ProjectDetail({ project }: { project: any }) {
  const router = useRouter()
  const isMobileProject = project.id.includes("mobile")

  const projectDetails: any = {
    "tennis-courts-3d": {
      overview: "An interactive 3D visualization platform for tennis court designs, featuring realistic lighting, materials and user interaction capabilities.",
      challenge: "Creating a performant 3D experience that works across different devices while maintaining visual fidelity and smooth interactions.",
      solution: "Implemented using Blender, with progressive loading and adaptive quality settings based on device capabilities.",
      process: ["Research and concept development", "3D modeling and texturing", "Performance optimization", "Visualization from scratch"],
      technologies: ["Figma", "Adobe Photoshop", "Blender"],
      images: ["/alexbodniawebsite/entrance-view.png", "/alexbodniawebsite/all-courts-view.png", "/alexbodniawebsite/second-entrance-view.png", "/alexbodniawebsite/1-court-view.png", "/alexbodniawebsite/3-court-view.png", "/alexbodniawebsite/inventoty-boot-view.png"],
      liveUrl: "https://drive.google.com/file/d/1fCvXCnh6GpEOE-9ezJQq9DrB7j_E1OBw/view?usp=sharing",
    },
    "dnipro-redesign": {
      overview: "Complete redesign of the Dnipro.net website focusing on improved user experience, modern interface design and enhanced accessibility.",
      challenge: "Modernizing an outdated website while maintaining brand identity and improving conversion rates.",
      solution: "Implemented a desktop view approach with clean typography, improved navigation and streamlined user flows.",
      process: ["User research and analysis", "Information architecture", "Wireframing and prototyping", "Visual design system", "Development and testing"],
      technologies: ["Figma", "Adobe Photoshop"],
      images: ["/alexbodniawebsite/main-hero-section-dnepronet.jpg", "/alexbodniawebsite/internet-dnepronet.jpg", "/alexbodniawebsite/tv-dnepro-net.jpg", "/alexbodniawebsite/map-faq-dnepronet.jpg", "/alexbodniawebsite/footer-dnepronet.jpg", "/alexbodniawebsite/about-dnepronet.jpg"],
      liveUrl: "https://drive.google.com/file/d/1yDtr7PmPJqzxp4g4CTsx4sGefKuQHR3C/view?usp=sharing",
    },
    "ketotox-package": {
      overview: "Medical packaging design for Ketotox Plus, focusing on clarity, safety and regulatory compliance while maintaining visual appeal.",
      challenge: "Balancing regulatory requirements with attractive design that builds trust and communicates product benefits clearly.",
      solution: "Created a clean, medical-grade design system with clear hierarchy, safety information and brand consistency.",
      process: ["Regulatory research", "Brand analysis", "Concept development", "Packaging prototypes"],
      technologies: ["Adobe Illustrator", "Adobe Photoshop", "Figma"],
      images: ["/alexbodniawebsite/mockup-one-keto.jpg", "/alexbodniawebsite/mockup-second-keto.png", "/alexbodniawebsite/mockup-third-keto.jpg", "/alexbodniawebsite/illustrations.jpg"],
      liveUrl: "https://drive.google.com/file/d/1mrNA11sG5BVX7TRU8QoUoB2x8U7NYbxM/view?usp=sharing",
    },
    "mobile-app-todo": {
      overview: "Cross-platform mobile application with intuitive user interface, focusing on seamless user experience and performance.",
      challenge: "Creating a consistent experience across iOS and Android while optimizing for different screen sizes and interaction patterns.",
      solution: "Developed using React Native with platform-specific optimizations and a comprehensive design system.",
      process: ["User journey mapping", "Wireframing and prototyping", "UI design system", "Development and testing"],
      technologies: ["Adobe Photoshop", "Figma"],
      images: ["/alexbodniawebsite/welcome-screen-dsrk.jpg", "/alexbodniawebsite/task-screen.jpg", "/alexbodniawebsite/register-screen.jpg", "/alexbodniawebsite/pick-time-popup.jpg", "/alexbodniawebsite/pick-date-popup-green.jpg", "/alexbodniawebsite/main-screen-lightgreen.jpg"],
      liveUrl: "https://alexbodniadev.github.io/ToDoApp", 
      githubUrl: "https://github.com/AlexBodniaDev/ToDoApp",
    },
    "mobile-app-cyclesense": {
      overview: "Cross-platform mobile application with intuitive user interface, focusing on female health and period tracking system.",
      challenge: "Create an app for women where they can manage and see their cycle and manage their health habits.",
      solution: "Developed using React Native with platform-specific optimizations and a comprehensive design system.",
      process: ["UX Research", "UI Design", "Prototyping", "User journey mapping", "Wireframing", "Visual design system", "Development and testing"],
      technologies: ["Adobe Photoshop", "Figma", "React", "Next.js"],
      images: ["/alexbodniawebsite/predictions-page-cyclesense.jpg", "/alexbodniawebsite/period-calendar-cyclesense.jpg", "/alexbodniawebsite/symptomps-page-cyclesense.jpg", "/alexbodniawebsite/insights-screen-cyclesense.jpg", "/alexbodniawebsite/settings-page-cyclesense.jpg"],
      liveUrl: "https://alexbodniadev.github.io/PeriodTrackerApp", 
      githubUrl: "https://github.com/AlexBodniaDev/PeriodTrackerApp",
    },
    "mobile-app-cryptoxapp": {
      overview: "Cross-platform mobile application with intuitive user interface, focusing on seamless user experience and performance.",
      challenge: "Creating a consistent experience across iOS and Android while optimizing for different screen sizes and interaction patterns.",
      solution: "Developed using React Native with platform-specific optimizations and a comprehensive design system.",
      process: ["Architecture", "UI Design", "Testing", "User journey mapping", "Wireframing", "Visual design system", "Development and testing"],
      technologies: ["Adobe Photoshop", "Figma", "React", "Next.js"],
      images: ["/alexbodniawebsite/main-screen-cryptox.jpg", "/alexbodniawebsite/markets-page-cryptox.jpg", "/alexbodniawebsite/portfolio-page-cryptox.jpg", "/alexbodniawebsite/settings-page-cryptox.jpg", "/alexbodniawebsite/notifications-cryptox.jpg"],
      liveUrl: "https://alexbodniadev.github.io/CryptoXApp", 
      githubUrl: "https://github.com/AlexBodniaDev/CryptoXApp",
    }
  }

  const details = projectDetails[project.id]

  return (
    <div className="bg-background min-h-screen">
      {/* 1. HERO - BALANCED PREVIEW */}
      <section className="pt-24 md:pt-32 pb-16 border-b border-border/50">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Button variant="ghost" onClick={() => router.back()} className="mb-8 -ml-4 group text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span className="text-lg">Back</span>
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                <span className="text-sm font-black uppercase tracking-[0.3em] text-primary mb-4 block">{project.year} Case Study</span>
                <h1 className="text-5xl md:text-7xl font-serif tracking-tighter mb-8 leading-tight">{project.title}</h1>
                
                <div className="flex flex-wrap gap-4">
                  {details?.liveUrl && (
                    <Link href={details.liveUrl} target="_blank">
                      <Button size="lg" className="rounded-2xl gap-3 h-14 px-10 text-base shadow-xl shadow-primary/20">
                        View Live <ExternalLink className="h-5 w-5" />
                      </Button>
                    </Link>
                  )}
                  {details?.githubUrl && (
                    <Link href={details.githubUrl} target="_blank">
                      <Button size="lg" variant="outline" className="rounded-2xl gap-3 h-14 px-10 text-base">
                        Source Code <Github className="h-5 w-5" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>

              {/* SLIGHTLY BIGGER PREVIEW */}
              <div className="lg:col-span-6 relative rounded-[1rem] overflow-hidden border border-border shadow-2xl bg-muted/20">
                <img src={project.image} alt="Hero" className="w-full h-auto block" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. CONTENT */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 space-y-20">
              <div className="space-y-6">
                <h2 className="text-4xl font-serif italic text-primary">Overview</h2>
                <p className="text-2xl md:text-3xl text-foreground/90 leading-relaxed font-light font-sans">
                  {details?.overview}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-border pt-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-primary"><Zap className="h-6 w-6" /> Challenge</div>
                  <p className="text-xl text-muted-foreground leading-relaxed">{details?.challenge}</p>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-primary"><Lightbulb className="h-6 w-6" /> Solution</div>
                  <p className="text-xl text-muted-foreground leading-relaxed">{details?.solution}</p>
                </div>
              </div>

              <div className="space-y-12 border-t border-border pt-12">
                <h3 className="text-3xl font-serif italic text-primary">Full Process</h3>
                <div className="grid grid-cols-1 gap-4">
                  {details?.process.map((step: string, i: number) => (
                    <div key={i} className="flex items-center gap-8 p-6 bg-card border border-border rounded-[1.5rem] group hover:border-primary/50 transition-all">
                      <span className="text-4xl font-serif italic text-primary/20 group-hover:text-primary transition-colors">0{i + 1}</span>
                      <span className="text-lg font-bold uppercase tracking-tight">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-32 p-10 bg-card border border-border rounded-[2.5rem] space-y-12 shadow-sm">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-6 border-b border-border pb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-3">
                    {details?.technologies.map((tech: string) => (
                      <span key={tech} className="px-5 py-2 bg-primary/5 text-primary rounded-xl text-sm font-bold border border-primary/10">{tech}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-6 border-b border-border pb-2">My Deliverables</h4>
                  <ul className="space-y-4">
                    {["UI/UX Design", "Interactive Prototype", "User Research", "Visual Identity"].map(item => (
                      <li key={item} className="flex items-center gap-4 text-lg font-medium text-foreground/80"><CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" /> {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 3. GALLERY - SHARP & SMALLER */}
          <div className="mt-40 border-t border-border pt-20">
            <h2 className="text-5xl font-serif text-center mb-20">Project <span className="italic text-primary">Details</span></h2>
            
            <div className={`grid gap-8 ${isMobileProject ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto" : "grid-cols-1 md:grid-cols-2"}`}>
              {details?.images.map((image: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="overflow-hidden border border-border bg-muted/10 shadow-lg"
                >
                  <img 
                    src={image} 
                    alt={`Detail ${index}`} 
                    className="w-full h-auto block" 
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-24 border-t border-border text-center">
        <Link href="/#works">
          <Button variant="outline" className="rounded-full px-12 h-14 text-lg font-bold uppercase tracking-widest">Back to Projects</Button>
        </Link>
      </footer>
    </div>
  )
}