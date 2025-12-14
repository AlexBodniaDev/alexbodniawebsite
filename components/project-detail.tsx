"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  year: string
  // NOTE: These properties are redundant in this specific file, as the data 
  // is pulled from projectDetails, but we keep them for interface correctness
  liveUrl?: string 
  githubUrl?: string
}

interface ProjectDetailProps {
  project: Project
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const router = useRouter()

  const projectDetails = {
    // NOTE: The data here IS the source of truth for the links in this file
    // for now. In a real app, you'd load ALL this data from an external source.

    "tennis-courts-3d": {
      overview:
        "An interactive 3D visualization platform for tennis court designs, featuring realistic lighting, materials and user interaction capabilities.",
      challenge:
        "Creating a performant 3D experience that works across different devices while maintaining visual fidelity and smooth interactions.",
      solution:
        "Implemented using Blender, with progressive loading and adaptive quality settings based on device capabilities.",
      process: [
        "Research and concept development",
        "3D modeling and texturing",
        "Performance optimization",
        "Visualization from scratch",
      ],
      technologies: ["Figma", "Adobe Photoshop", "Blender",],
      images: ["/alexbodniawebsite/entrance-view.png", "/alexbodniawebsite/all-courts-view.png", "/alexbodniawebsite/second-entrance-view.png", "/alexbodniawebsite/1-court-view.png", "/alexbodniawebsite/3-court-view.png", "/alexbodniawebsite/inventoty-boot-view.png",],
      liveUrl: "https://drive.google.com/file/d/1fCvXCnh6GpEOE-9ezJQq9DrB7j_E1OBw/view?usp=sharing", 
      githubUrl: undefined,
    },
    "dnipro-redesign": {
      overview:
        "Complete redesign of the Dnipro.net website focusing on improved user experience, modern interface design and enhanced accessibility.",
      challenge: "Modernizing an outdated website while maintaining brand identity and improving conversion rates.",
      solution:
        "Implemented a desktop view approach with clean typography, improved navigation and streamlined user flows.",
      process: [
        "User research and analysis",
        "Information architecture",
        "Wireframing and prototyping",
        "Visual design system",
        "Development and testing",
      ],
      technologies: ["Figma", "Adobe Photoshop"],
      images: ["/alexbodniawebsite/main-hero-section-dnepronet.jpg", "/alexbodniawebsite/internet-dnepronet.jpg", "/alexbodniawebsite/tv-dnepro-net.jpg", "/alexbodniawebsite/map-faq-dnepronet.jpg", "/alexbodniawebsite/footer-dnepronet.jpg", "/alexbodniawebsite/about-dnepronet.jpg"],
      liveUrl: "https://drive.google.com/file/d/1yDtr7PmPJqzxp4g4CTsx4sGefKuQHR3C/view?usp=sharing", 
      githubUrl: undefined,
    },
    "ketotox-package": {
      overview:
        "Medical packaging design for Ketotox Plus, focusing on clarity, safety and regulatory compliance while maintaining visual appeal.",
      challenge:
        "Balancing regulatory requirements with attractive design that builds trust and communicates product benefits clearly.",
      solution:
        "Created a clean, medical-grade design system with clear hierarchy, safety information and brand consistency.",
      process: [
        "Regulatory research",
        "Brand analysis",
        "Concept development",
        "Packaging prototypes",
      ],
      technologies: ["Adobe Illustrator", "Adobe Photoshop", "Figma"],
      images: ["/alexbodniawebsite/mockup-one-keto.jpg", "/alexbodniawebsite/mockup-second-keto.png", "/alexbodniawebsite/mockup-third-keto.jpg", "/alexbodniawebsite/illustrations.jpg"],
      liveUrl: "https://drive.google.com/file/d/1mrNA11sG5BVX7TRU8QoUoB2x8U7NYbxM/view?usp=sharing", 
      githubUrl: undefined,
    },
    "mobile-app-todo": {
      overview:
        "Cross-platform mobile application with intuitive user interface, focusing on seamless user experience and performance.",
      challenge:
        "Creating a consistent experience across iOS and Android while optimizing for different screen sizes and interaction patterns.",
      solution: "Developed using React Native with platform-specific optimizations and a comprehensive design system.",
      process: [
        "User journey mapping",
        "Wireframing and prototyping",
        "UI design system",
        "Development and testing",
      ],
      technologies: ["Adobe Photoshop", "Figma"],
      images: ["/alexbodniawebsite/welcome-screen-dsrk.jpg", "/alexbodniawebsite/task-screen.jpg", "/alexbodniawebsite/register-screen.jpg", "/alexbodniawebsite/pick-time-popup.jpg", "/alexbodniawebsite/pick-date-popup-green.jpg", "/alexbodniawebsite/main-screen-lightgreen.jpg"],
      // Links defined here
      liveUrl: "https://alexbodniadev.github.io/ToDoApp", 
      githubUrl: "https://github.com/AlexBodniaDev/ToDoApp/tree/main",
    },

    "mobile-app-cyclesense": {
      overview:
        "Cross-platform mobile application with intuitive user interface, focusing on female health and perion tracking system.",
      challenge:
        "Create an app for women where they can manage and see their cycle and manage their health habits.",
      solution: "Developed using React Native with platform-specific optimizations and a comprehensive design system.",
      process: [
        "User journey mapping",
        "Wireframing and prototyping",
        "UI design system",
        "Development and testing",
      ],
      technologies: ["Adobe Photoshop", "Figma", "React", "Next.js"],
      images: ["/alexbodniawebsite/predictions-page-cyclesense.jpg", "/alexbodniawebsite/period-calendar-cyclesense.jpg", "/alexbodniawebsite/symptomps-page-cyclesense.jpg", "/alexbodniawebsite/settings-page-cyclesense.jpg", "/alexbodniawebsite/insights-screen-cyclesense.jpg"],
      // Links defined here
      liveUrl: "https://alexbodniadev.github.io/PeriodTrackerApp", 
      githubUrl: "https://github.com/AlexBodniaDev/PeriodTrackerApp",
    },

    "mobile-app-cryptoxapp": {
      overview:
        "Cross-platform mobile application with intuitive user interface, focusing on seamless user experience and performance.",
      challenge:
        "Creating a consistent experience across iOS and Android while optimizing for different screen sizes and interaction patterns.",
      solution: "Developed using React Native with platform-specific optimizations and a comprehensive design system.",
      process: [
        "User journey mapping",
        "Wireframing and prototyping",
        "UI design system",
        "Development and testing",
      ],
      technologies: ["Adobe Photoshop", "Figma", "React", "Next.js"],
      images: ["/alexbodniawebsite/main-screen-cryptox.jpg", "/alexbodniawebsite/markets-page-cryptox.jpg", "/alexbodniawebsite/list-token-cryptox.jpg", "/alexbodniawebsite/notifications-cryptox.jpg", "/alexbodniawebsite/portfolio-page-cryptox.jpg", "/alexbodniawebsite/profile-settings-page-cryptox.jpg", "/alexbodniawebsite/settings-page-cryptox.jpg"],
      // Links defined here
      liveUrl: "https://alexbodniadev.github.io/CryptoXApp", 
      githubUrl: "https://github.com/AlexBodniaDev/CryptoXApp",
    }
  }

  // The 'details' object is the one that contains the links you set above.
  const details = projectDetails[project.id as keyof typeof projectDetails]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Button variant="ghost" onClick={() => router.back()} className="mb-8 -ml-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Work
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <h1 className="text-4xl md:text-5xl font-light">{project.title}</h1>
                  <span className="text-muted-foreground font-mono">{project.year}</span>
                </div>

                <p className="text-xl text-muted-foreground mb-6 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* ✅ FIX APPLIED HERE: We check and use the 'details' object for links */}
                <div className="flex gap-4">
                  {/* Live Demo Button */}
                  {details.liveUrl && (
                    <Link href={details.liveUrl} target="_blank" rel="noopener noreferrer">
                      <Button>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Live
                      </Button>
                    </Link>
                  )}

                  {/* Source Code Button */}
                  {details.githubUrl && (
                    <Link href={details.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline">
                        <Github className="h-4 w-4 mr-2" />
                        Source Code
                      </Button>
                    </Link>
                  )}
                </div>
                {/* ---------------------------------------------------------------- */}
              </div>

              <div className="relative">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  loading="lazy"
                  className="w-full rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Project Details Section (Rest of the code remains the same) --- */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-2xl font-light mb-6">Overview</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{details.overview}</p>
            </motion.div>

            {/* Challenge & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-medium mb-4">Challenge</h3>
                <p className="text-muted-foreground leading-relaxed">{details.challenge}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-medium mb-4">Solution</h3>
                <p className="text-muted-foreground leading-relaxed">{details.solution}</p>
              </motion.div>
            </div>

            {/* Process */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h3 className="text-xl font-medium mb-6">Process</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {details.process.map((step, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h3 className="text-xl font-medium mb-6">Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {details.technologies.map((tech) => (
                  <span key={tech} className="px-4 py-2 bg-accent text-accent-foreground rounded-lg font-mono text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Additional Images */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-medium mb-6">Project Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {details.images.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`${project.title} - Image ${index + 1}`}
                    loading="lazy"
                    className="w-full rounded-lg shadow-lg"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Next Project */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <Link href="/#works">
              <Button variant="outline" size="lg">
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}