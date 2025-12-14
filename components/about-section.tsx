"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
// Assuming your data.json structure is correct and accessible
import data from "@/lib/data.json" 

// Custom hook to hide the scrollbar for Webkit browsers (Chrome, Safari, etc.)
// This is necessary since Tailwind utility classes (like scrollbar-hide) require 
// global CSS which is not guaranteed to be present.
const useHideScrollbar = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (ref.current) {
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        .scrollbar-hide-dynamic::-webkit-scrollbar {
          display: none !important;
        }
      `;
      ref.current.classList.add('scrollbar-hide-dynamic');
      document.head.appendChild(styleElement);

      return () => {
        // Clean up the style element when the component unmounts
        ref.current?.classList.remove('scrollbar-hide-dynamic');
        const existingStyle = document.head.querySelector('style:last-child');
        if (existingStyle && existingStyle.textContent?.includes('scrollbar-hide-dynamic')) {
            document.head.removeChild(existingStyle);
        }
      };
    }
  }, [ref]);
};

export function AboutSection() {
  const [activeImage, setActiveImage] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  
  // Activate scrollbar hiding hook
  useHideScrollbar(scrollRef);

  const profileImages = ["/alexbodniawebsite/photo-of-me-one.jpg", "/alexbodniawebsite/photo-of-me-second.jpg", "/alexbodniawebsite/photo-of-me-third.jpg"]

  const goToPrevious = () => {
    setActiveImage((prev) => (prev - 1 + profileImages.length) % profileImages.length)
  }

  const goToNext = () => {
    setActiveImage((prev) => (prev + 1) % profileImages.length)
  }

  const goToImage = (index: number) => {
    setActiveImage(index)
  }

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
    <section id="about" className="py-16 md:py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl md:text-4xl font-light mb-3 md:mb-4">About Me</h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            A little showcase who I am and what i do.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Photo Stack and Introduction (UNCHANGED) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            <div className="relative animate-in fade-in slide-in-from-left duration-600">
              <div className="relative w-full max-w-sm mx-auto">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-muted/30 shadow-lg">
                  {profileImages.map((image, index) => (
                    <img
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`Alex - Photo ${index + 1}`}
                      loading="lazy"
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                        index === activeImage ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}
                </div>

                {/* Navigation Buttons */}
                <button
                  onClick={goToPrevious}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-black/90 hover:bg-white dark:hover:bg-black rounded-full p-2 transition-all duration-300 hover:scale-110 active:scale-95"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-black/90 hover:bg-white dark:hover:bg-black rounded-full p-2 transition-all duration-300 hover:scale-110 active:scale-95"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Indicator Dots */}
                <div className="flex justify-center gap-2 mt-4">
                  {profileImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === activeImage
                          ? "bg-primary w-6"
                          : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2"
                      }`}
                      aria-label={`View photo ${index + 1}`}
                    />
                  ))}
                </div>
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

          {/* Experience Timeline (UNCHANGED) */}
          <div className="mb-16 md:mb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-light mb-8 md:mb-12 text-center">Experience</h3>
            <div className="relative max-w-4xl mx-auto">
              {/* Timeline line - hidden on mobile */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-border" />

              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  className={`relative flex items-center mb-6 md:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-400 ${
                    index % 2 === 0 ? "md:flex-row flex-col" : "md:flex-row-reverse flex-col"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Mobile: full width, Desktop: half width with alternating sides */}
                  <div className="w-full md:w-1/2 mt-4 md:mt-0">
                    <div className={`bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 ${index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                      <span className="text-sm font-mono text-muted-foreground">{exp.period}</span>
                      <h4 className="text-lg font-medium mt-2 mb-3">{exp.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{exp.description}</p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10 md:top-1/2 md:-translate-y-1/2 mt-4 md:mt-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Tools Section (FINAL FIXES APPLIED) */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-light mb-8 text-center">Tools & Technologies</h3>
            <div className="relative max-w-5xl mx-auto md:px-16">
              
              {/* Scroll Left Button: Hidden on mobile */}
              <button
                onClick={() => scrollTools("left")}
                className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full items-center justify-center w-8 h-8 bg-card border border-border rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 z-20"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5 text-foreground" />
              </button>
              
              {/* Outer Centering Wrapper: Uses flex and justify-center to center the scroll area when it's short */}
              <div className="flex justify-center w-full"> 
                {/* Scroll Container: Handles overflow/scroll, receives the ref, and applies inline CSS to hide scrollbar */}
                <div
                  ref={scrollRef}
                  className="flex gap-3 md:gap-4 overflow-x-auto pb-4 px-4 md:px-0"
                  // Inline styles to hide scrollbar in Firefox and Edge/IE
                  style={{ 
                    scrollbarWidth: "none", // For Firefox
                    msOverflowStyle: "none"  // For IE and Edge
                  }}
                >
                  {toolsWithIcons.map((tool, index) => (
                    <div
                      key={tool.name}
                      // *** 16px Top Padding Applied (pt-4) ***
                      className="flex-shrink-0 bg-card border border-border rounded-xl px-4 md:px-6 pt-4 pb-3 md:pb-4 shadow-sm hover:shadow-md transition-all hover:scale-105 hover:-translate-y-1 animate-in fade-in scale-in-95 duration-300"
                      style={{ animationDelay: `${index * 25}ms` }}
                    >
                      <div className="flex items-center gap-3">
                        <img src={tool.icon || "/placeholder.svg"} alt={`${tool.name} icon`} loading="lazy" className="w-6 h-6" />
                        <span className="font-medium text-sm whitespace-nowrap">{tool.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Scroll Right Button: Hidden on mobile */}
              <button
                onClick={() => scrollTools("right")}
                className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-full items-center justify-center w-8 h-8 bg-card border border-border rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 z-20"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}