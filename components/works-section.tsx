"use client"

import { useState } from "react"
import { ExternalLink, ArrowRight } from "lucide-react"
import Link from "next/link"
import data from "@/lib/data.json"

export function WorksSection() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  return (
    <section id="works" className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl md:text-4xl font-light mb-3 md:mb-4">Selected Work</h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            A collection of projects that showcase my approach to design and development, from concept to final
            implementation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {data.projects.map((project, index) => (
            <div
              key={project.id}
              className="group cursor-pointer animate-in fade-in slide-in-from-bottom-6 duration-400"
              style={{ animationDelay: `${index * 50}ms` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <Link href={`/work/${project.id}`}>
                <div className="relative overflow-hidden rounded-lg bg-card border border-border hover:shadow-lg transition-all duration-500 h-full">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={
                        project.image ||
                        `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(project.title + " design project preview")}`
                      }
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 pointer-events-none" />

                    {/* Hover overlay - visible only on hover (desktop) and always hidden on mobile */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none ${
                        hoveredProject === project.id ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="bg-white/90 dark:bg-black/90 rounded-full p-3">
                        <ExternalLink className="h-6 w-6" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-medium group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-sm text-muted-foreground font-mono">{project.year}</span>
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center text-sm text-primary group-hover:gap-2 transition-all duration-300">
                      <span>View Project</span>
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
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
