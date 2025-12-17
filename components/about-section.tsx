"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import data from "@/lib/data.json" 

const useHideScrollbar = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (ref.current) {
      const styleElement = document.createElement('style');
      styleElement.textContent = `.scrollbar-hide-dynamic::-webkit-scrollbar { display: none !important; }`;
      ref.current.classList.add('scrollbar-hide-dynamic');
      document.head.appendChild(styleElement);
      return () => {
        ref.current?.classList.remove('scrollbar-hide-dynamic');
        const existingStyle = document.head.querySelector('style:last-child');
        if (existingStyle) document.head.removeChild(existingStyle);
      };
    }
  }, [ref]);
};

export function AboutSection() {
  const [activeImage, setActiveImage] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  useHideScrollbar(scrollRef);

  const profileImages = [
    "/alexbodniawebsite/photo-of-me-one.jpg", 
    "/alexbodniawebsite/photo-of-me-second.jpg", 
    "/alexbodniawebsite/photo-of-me-third.jpg"
  ]

  const scrollTools = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === "left" ? -300 : 300, behavior: "smooth" })
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
    <section id="about" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-20 md:mb-28">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-foreground/70">Who I Am</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif tracking-tighter mb-6">
            About <span className="italic font-light text-primary">Me</span>
          </h2>
          <p className="text-foreground/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-normal">
            A little showcase of my journey, my principles, and the craft behind my work.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* PHOTO STACK & TEXT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
            <div className="relative group">
              <div className="relative w-full max-w-sm mx-auto aspect-[4/5] rounded-[2.5rem] overflow-hidden border-2 border-border shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                {profileImages.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt="Alex"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${index === activeImage ? "opacity-100" : "opacity-0 scale-105"}`}
                  />
                ))}
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                  <button onClick={() => setActiveImage(p => (p - 1 + profileImages.length) % profileImages.length)} className="pointer-events-auto p-3 bg-background/90 backdrop-blur-md rounded-full shadow-lg hover:bg-primary hover:text-white transition-all">
                    <ChevronLeft className="w-5 h-5"/>
                  </button>
                  <button onClick={() => setActiveImage(p => (p + 1) % profileImages.length)} className="pointer-events-auto p-3 bg-background/90 backdrop-blur-md rounded-full shadow-lg hover:bg-primary hover:text-white transition-all">
                    <ChevronRight className="w-5 h-5"/>
                  </button>
                </div>
              </div>
              <div className="flex justify-center gap-2 mt-8">
                {profileImages.map((_, i) => (
                  <button key={i} onClick={() => setActiveImage(i)} className={`h-1.5 rounded-full transition-all duration-500 ${i === activeImage ? "bg-primary w-8" : "bg-muted-foreground/30 w-2"}`} />
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-3xl md:text-4xl font-serif leading-tight text-foreground">
                {data.personal.about}
              </h3>
              <div className="space-y-6 text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
                <p>I believe that great design is not just about aesthetics—it's about <strong className="text-foreground font-semibold underline decoration-primary/30 underline-offset-4">solving real problems</strong> and creating meaningful experiences.</p>
                <p>My approach combines analytical thinking with creative intuition, always keeping the user at the center of every decision.</p>
              </div>
            </div>
          </div>

          {/* EXPERIENCE WITH NEW CARDS */}
          <div className="mb-32">
            <h3 className="text-3xl md:text-5xl font-serif text-center mb-20 italic">Experience</h3>
            <div className="relative max-w-5xl mx-auto space-y-12">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-border to-transparent" />
              
              {data.experience.map((exp, index) => (
                <div key={index} className={`relative flex items-center flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                  <div className="w-full md:w-1/2 px-4 md:px-10">
                    <div className="group relative bg-card/40 backdrop-blur-md border border-primary/10 p-8 md:p-10 rounded-[2.5rem] shadow-sm transition-all duration-500 hover:shadow-2xl hover:border-primary/30 hover:-translate-y-2 overflow-hidden">
                      <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors" />
                      <div className={`absolute top-10 bottom-10 w-1 bg-primary/20 rounded-full ${index % 2 === 0 ? "right-0" : "left-0"}`} />
                      
                      <div className="relative z-10">
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] bg-primary/5 px-4 py-1.5 rounded-full border border-primary/10 mb-6 inline-block">
                          {exp.period}
                        </span>
                        <h4 className="text-2xl md:text-3xl font-serif mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                          {exp.title}
                        </h4>
                        <p className="text-foreground/70 leading-relaxed font-normal text-base md:text-lg">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-6 h-6 rounded-full bg-background border-2 border-primary/30 z-10 absolute left-1/2 -translate-x-1/2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TOOLS & TECH */}
          <div className="pb-12">
            <h3 className="text-2xl font-serif text-center mb-12 italic text-muted-foreground">Tech Stack & Tools</h3>
            <div className="relative flex items-center group max-w-5xl mx-auto">
              <button onClick={() => scrollTools("left")} className="p-3 text-muted-foreground hover:text-primary transition-all hover:scale-125">
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-8 px-4 no-scrollbar scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                {toolsWithIcons.map((tool) => (
                  <div key={tool.name} className="flex-shrink-0 flex items-center gap-4 bg-card border border-border px-7 py-5 rounded-[1.5rem] shadow-sm hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group/tool">
                    <img src={tool.icon} alt={tool.name} className="w-7 h-7 object-contain transition-transform group-hover/tool:scale-110" />
                    <span className="font-bold text-sm tracking-tight text-foreground/90">{tool.name}</span>
                  </div>
                ))}
              </div>

              <button onClick={() => scrollTools("right")} className="p-3 text-muted-foreground hover:text-primary transition-all hover:scale-125">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}