"use client"

import { ChevronDown, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const scrollToWorks = () => {
    const element = document.getElementById("works")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/30 pt-20 md:pt-0">
      <div
        className="absolute inset-0 opacity-10 transition-all duration-1000 ease-out hidden md:block"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99, 63, 38, 0.1), transparent 50%)`,
        }}
      />

      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <div className="absolute top-1/4 right-1/4 w-40 h-40 rounded-full bg-gradient-to-br from-primary/15 to-accent/20 backdrop-blur-sm animate-float" />
        <div className="absolute bottom-1/3 left-1/5 w-32 h-32 rounded-2xl bg-gradient-to-tr from-accent/20 to-primary/15 backdrop-blur-sm" />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10 max-w-6xl">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <div className="mb-6 animate-in fade-in slide-in-from-bottom-4 duration-800 delay-300">
            <span className="inline-block px-4 py-2 rounded-full bg-muted/50 text-muted-foreground text-sm font-mono tracking-wider uppercase">
              UX/UI Designer & React Developer
            </span>
          </div>

          <h1 className="text-display font-serif leading-none text-balance mb-8 text-foreground animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-400">
            Together we transform
            <br />
            <span className="italic font-light text-primary">your vision</span> into
            <br />
            <span className="relative">
              excellent product.
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary/60 to-accent/60 rounded-full animate-in slide-in-from-left duration-800 delay-1200" />
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed font-light animate-in fade-in slide-in-from-bottom-4 duration-800 delay-600">
             My role is to help solve problems and create exceptional user experiences and innovative digital solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-800 delay-800">
            <button
              onClick={scrollToWorks}
              className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-all duration-500 flex items-center gap-3 font-medium overflow-hidden hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">Explore My Work</span>
              <div className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                <ArrowRight className="h-4 w-4" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </button>

            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 border-2 border-border rounded-2xl hover:bg-accent hover:border-accent-foreground/20 transition-all duration-500 font-medium hover:scale-105 active:scale-95"
            >
              Contacts
            </button>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-800 delay-1200 hover:scale-110 transition-transform"
        onClick={scrollToWorks}
      >
        <div className="flex flex-col items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300 animate-bounce">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-muted-foreground to-transparent" />
          <ChevronDown className="h-5 w-5" />
        </div>
      </div>
    </section>
  )
}
