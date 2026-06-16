"use client"

import { useState } from "react"
import { ExternalLink, ArrowRight } from "lucide-react"
import Link from "next/link"
import data from "@/lib/data.json"

export function WorksSection() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  return (
    <section id="works" className="py-24 md:py-32 bg-muted/20">
      <div className="container mx-auto px-6">
        {/* Заголовок: стиль Hero, але чіткий */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-4 text-foreground">
            Selected <span className="italic font-light text-primary">Work</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            A collection of projects that showcase my approach to design and development, from concept to final implementation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {data.projects.map((project, index) => (
            <div
              key={project.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <Link href={`/work/${project.id}`}>
                {/* Картка: чіткі межі, хороший радіус */}
                <div className="relative overflow-hidden rounded-[2rem] bg-card border border-border shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500 h-full flex flex-col">
                  
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <img
                      src={project.image || `/placeholder.svg?height=400&width=600`}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Overlay: став м'якшим, не заважає сприйняттю */}
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-all duration-300 pointer-events-none" />

                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none ${
                        hoveredProject === project.id ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="bg-background shadow-2xl rounded-full p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <ExternalLink className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-xs font-mono font-bold bg-muted px-3 py-1 rounded-full text-muted-foreground">
                        {project.year}
                      </span>
                    </div>

                    <p className="text-foreground/80 text-base md:text-lg mb-6 leading-relaxed flex-grow">
                      {project.description}
                    </p>

                    {/* Теги: тепер вони читабельні */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-foreground/5 text-foreground/70 rounded-md border border-foreground/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.15em] text-primary group-hover:gap-4 transition-all duration-300">
                      <span>View Case Study</span>
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}