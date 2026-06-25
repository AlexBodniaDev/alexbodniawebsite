"use client"

import { useState, useRef, useCallback } from "react"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import data from "@/lib/data.json"

type Project = typeof data.projects[0]

export function WorksSection() {
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [touchPreview, setTouchPreview] = useState<{ id: string; y: number } | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const didLongPress = useRef(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (rect) setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  // Touch: show preview on hold (300ms) or while finger is scrolling over the row
  const handleTouchStart = useCallback((project: Project, e: React.TouchEvent) => {
    didLongPress.current = false
    const touch = e.touches[0]
    const rowRect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const previewY = rowRect.top + rowRect.height / 2

    longPressTimer.current = setTimeout(() => {
      didLongPress.current = true
      setTouchPreview({ id: project.id, y: previewY })
    }, 300)
  }, [])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current)
    // If it was a long press, prevent navigation and hide preview after a moment
    if (didLongPress.current) {
      e.preventDefault()
      setTimeout(() => setTouchPreview(null), 600)
    } else {
      setTouchPreview(null)
    }
  }, [])

  const handleTouchMove = useCallback(() => {
    // Finger moved — cancel long-press but keep preview if already shown
    if (longPressTimer.current) clearTimeout(longPressTimer.current)
  }, [])

  const activeProjectData = activeProject
    ? data.projects.find(p => p.id === activeProject)
    : null

  const touchProjectData = touchPreview
    ? data.projects.find(p => p.id === touchPreview.id)
    : null

  return (
    <section
      id="works"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative py-24 md:py-32 bg-background overflow-hidden"
    >
      {/* Desktop: floating cursor-following preview */}
      {activeProjectData && (
        <div
          className="pointer-events-none absolute z-50"
          style={{
            left: cursorPos.x + 28,
            top: cursorPos.y - 90,
            transition: "left 0.06s linear, top 0.06s linear",
          }}
        >
          <div className="w-56 h-36 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border animate-in fade-in zoom-in-95 duration-150">
            <img
              src={activeProjectData.image || `/placeholder.svg?height=144&width=224`}
              alt={activeProjectData.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Mobile: centered overlay preview on long-press / hold */}
      {touchProjectData && (
        <div
          className="md:hidden pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-background/40 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="w-72 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-primary/20 animate-in zoom-in-90 duration-200">
            <img
              src={touchProjectData.image || `/placeholder.svg?height=200&width=288`}
              alt={touchProjectData.title}
              className="w-full aspect-video object-cover"
            />
            <div className="bg-background/95 px-5 py-4">
              <p className="font-bold text-foreground text-base">{touchProjectData.title}</p>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{touchProjectData.description}</p>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 max-w-6xl">

        {/* Section header */}
        <div className="flex items-end justify-between mb-16 md:mb-20 border-b border-border pb-8">
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight text-foreground">
            Selected{" "}
            <em className="not-italic italic font-light text-primary">Work</em>
          </h2>
          <span className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground mb-1">
            {data.projects.length} projects
          </span>
        </div>

        {/* Project list — editorial rows */}
        <div className="divide-y divide-border">
          {data.projects.map((project, index) => (
            <Link
              key={project.id}
              href={`/work/${project.id}`}
              // Prevent navigation if long-press was detected
              onClick={(e) => { if (didLongPress.current) e.preventDefault() }}
            >
              <div
                className="group relative grid grid-cols-[4rem_1fr_auto] md:grid-cols-[5rem_1fr_1fr_auto] items-center gap-6 py-8 md:py-10 cursor-pointer transition-all duration-300 hover:bg-muted/30 -mx-4 px-4 rounded-2xl select-none"
                onMouseEnter={() => setActiveProject(project.id)}
                onMouseLeave={() => setActiveProject(null)}
                onTouchStart={(e) => handleTouchStart(project, e)}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchMove}
              >
                {/* Index number */}
                <span className="font-serif text-3xl md:text-4xl font-light text-muted-foreground/40 group-hover:text-primary/40 transition-colors tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Title + tags */}
                <div className="min-w-0">
                  <h3 className="text-xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200 truncate mb-2">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-foreground/5 text-muted-foreground rounded-md border border-foreground/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description — hidden on mobile */}
                <p className="hidden md:block text-sm text-muted-foreground leading-relaxed max-w-xs line-clamp-2">
                  {project.description}
                </p>

                {/* Year + arrow */}
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <span className="text-xs font-mono font-bold text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
                    {project.year}
                  </span>
                  <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:border-primary group-hover:text-background transition-all duration-300 group-hover:scale-110">
                    <ArrowUpRight className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer line */}
        <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground/50">
            More coming soon
          </p>
          <div className="flex gap-1.5">
            {data.projects.map((_, i) => (
              <div key={i} className="h-px w-6 bg-primary/30 rounded-full" />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}