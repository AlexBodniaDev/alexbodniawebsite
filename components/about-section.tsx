"use client"

import { useState, useRef } from "react"
import data from "@/lib/data.json"

export function AboutSection() {
  const [activeImage, setActiveImage] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const profileImages = ["/alexbodniawebsite/photo-of-me-one.jpg", "/alexbodniawebsite/photo-of-me-second.jpg", "/alexbodniawebsite/photo-of-me-third.jpg"]

  const scrollTools = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const toolsWithIcons = [
    { name: "Figma", icon: "/alexbodniawebsite/figma-logo.jpg" },
    { name: "Adobe XD", icon: "/alexbodniawebsite/adobe-xd-logo-icon.jpg" },
    { name: "Sketch", icon: "/alexbodniawebsite/sketch-app-logo-icon.jpg" },
    { name: "React", icon: "/alexbodniawebsite/react-logo-icon.jpg" },
    { name: "Next.js", icon: "/alexbodniawebsite/next-js-logo-icon.jpg" },
    { name: "TypeScript", icon: "/alexbodniawebsite/tech/typescript.png" },
    { name: "Tailwind CSS", icon: "/alexbodniawebsite/tailwind-css-logo-icon.jpg" },
    { name: "Framer", icon: "/alexbodniawebsite/framer-logo-icon.jpg" },
    { name: "Webflow", icon: "/alexbodniawebsite/webflow-logo-icon.jpg" },
    { name: "Photoshop", icon: "/alexbodniawebsite/adobe-photoshop-logo-icon.jpg" },
    { name: "Illustrator", icon: "/alexbodniawebsite/adobe-illustrator-logo-icon.jpg" },
    { name: "After Effects", icon: "/alexbodniawebsite/adobe-after-effects-logo-icon.jpg" },
  ]

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-600">
          <h2 className="text-3xl md:text-4xl font-light mb-4">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A little showcase who I am and what i do.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Photo Stack and Introduction */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="relative animate-in fade-in slide-in-from-left duration-600">
              <div className="relative w-80 h-80 mx-auto">
                {profileImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 ${
                      index === activeImage ? "z-30" : index === 1 ? "z-20" : "z-10"
                    }`}
                    style={{
                      transform: `rotate(${(index - activeImage) * 5}deg) translate(${(index - activeImage) * 10}px, ${(index - activeImage) * 10}px)`,
                      scale: index === activeImage ? 1 : 0.95,
                    }}
                    onClick={() => setActiveImage(index)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Alex - Photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-all duration-300" />
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-in fade-in slide-in-from-right duration-600 delay-200">
              <h3 className="text-2xl font-light mb-6">{data.personal.about}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I believe that great design is not just about making things look beautiful—it's about solving real
                problems and creating meaningful experiences. My approach combines analytical thinking with creative
                intuition, always keeping the user at the center of every decision.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I'm not designing or coding, you can find me exploring new technologies, sketching ideas in my
                notebook, or seeking inspiration in everyday interactions and beautiful design patterns around us.
              </p>
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="mb-20 animate-in fade-in slide-in-from-bottom-4 duration-600">
            <h3 className="text-2xl font-light mb-12 text-center">Experience</h3>
            <div className="relative max-w-4xl mx-auto">
              {/* Timeline line - hidden on mobile */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-border" />

              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  className={`relative flex items-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-600 ${
                    index % 2 === 0 ? "md:flex-row flex-col" : "md:flex-row-reverse flex-col"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Mobile: full width, Desktop: half width with alternating sides */}
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                    <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <span className="text-sm font-mono text-muted-foreground">{exp.period}</span>
                      <h4 className="text-lg font-medium mt-2 mb-3">{exp.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{exp.description}</p>
                    </div>
                  </div>

                  {/* Timeline dot - positioned differently on mobile */}
                  <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10 md:top-1/2 md:-translate-y-1/2 mt-4 md:mt-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Tools Section */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-600">
            <h3 className="text-2xl font-light mb-8 text-center">Tools & Technologies</h3>
            <div className="relative">
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {toolsWithIcons.map((tool, index) => (
                  <div
                    key={tool.name}
                    className="flex-shrink-0 bg-card border border-border rounded-lg px-6 py-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-in fade-in scale-in-95 duration-400"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <img src={tool.icon || "/placeholder.svg"} alt={`${tool.name} icon`} className="w-6 h-6" />
                      <span className="font-medium text-sm whitespace-nowrap">{tool.name}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Scroll buttons - hidden on mobile where native scrolling is better */}
              <button
                onClick={() => scrollTools("left")}
                className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-background border border-border rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
              >
                ←
              </button>
              <button
                onClick={() => scrollTools("right")}
                className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-background border border-border rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
