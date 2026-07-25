"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { ArrowUpRight, Eye, X } from "lucide-react"
import Link from "next/link"
import data from "@/lib/data.json"
import { useLanguage } from "@/components/language-provider"

type Project = typeof data.projects[0]

export function WorksSection() {
  const { t, locale } = useLanguage()

  const getTitle = (p: Project) => (locale === "uk" ? (p as any).title_uk ?? p.title : p.title)
  const getDescription = (p: Project) => (locale === "uk" ? (p as any).description_uk ?? p.description : p.description)
  const getTags = (p: Project) => (locale === "uk" ? (p as any).tags_uk ?? p.tags : p.tags)

  const [activeProject, setActiveProject] = useState<string | null>(null)
  const [previewProject, setPreviewProject] = useState<Project | null>(null)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

  const sectionRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const pendingPos = useRef<{ x: number; y: number } | null>(null)

  // ── INP FIX ───────────────────────────────────────────────────────────
  // onMouseMove previously called setState directly, which means a React
  // re-render was scheduled on every single mousemove event fired while
  // hovering the section (dozens per second). Batching it through a single
  // requestAnimationFrame means at most one state update — and one
  // re-render — per frame, regardless of how many mousemove events fire.
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return

    pendingPos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        if (pendingPos.current) setCursorPos(pendingPos.current)
        rafRef.current = 0
      })
    }
  }, [])

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const activeProjectData = activeProject
    ? data.projects.find((p) => p.id === activeProject)
    : null

  return (
    <section
      id="works"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative py-24 md:py-32 bg-background overflow-hidden"
    >

      {/* Desktop Hover Preview */}
      {activeProjectData && (
        <div
          className="hidden md:block pointer-events-none absolute z-50"
          style={{
            left: cursorPos.x + 28,
            top: cursorPos.y - 90,
            transition: "left .06s linear, top .06s linear",
          }}
        >
          <div className="w-56 h-36 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border animate-in fade-in zoom-in-95 duration-150">
            <img
              src={activeProjectData.image || "/placeholder.svg"}
              alt={getTitle(activeProjectData)}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}


      {/* Mobile Preview Modal */}
      {previewProject && (
        <div
          className="
            fixed
            inset-0
            z-50
            md:hidden
            bg-black/40
            flex
            items-center
            justify-center
            p-6
          "
          onClick={() => setPreviewProject(null)}
        >

          <div
            className="
              relative
              w-full
              max-w-sm
              rounded-3xl
              overflow-hidden
              bg-background
              shadow-2xl
              animate-in
              fade-in
              zoom-in-95
              duration-200
            "
            onClick={(e) => e.stopPropagation()}
          >

            <button
              onClick={() => setPreviewProject(null)}
              className="
                absolute
                right-4
                top-4
                z-10
                w-9
                h-9
                rounded-full
                bg-background/90
                border
                flex
                items-center
                justify-center
              "
            >
              <X className="w-4 h-4" />
            </button>


            <img
              src={previewProject.image || "/placeholder.svg"}
              alt={getTitle(previewProject)}
              className="
                w-full
                aspect-video
                object-cover
              "
            />


            <div className="p-5">

              <h3 className="text-xl font-bold">
                {getTitle(previewProject)}
              </h3>


              <p className="mt-2 text-sm text-muted-foreground">
                {getDescription(previewProject)}
              </p>


              <div className="flex flex-wrap gap-2 mt-4">
                {getTags(previewProject).map((tag: string) => (
                  <span
                    key={tag}
                    className="
                      px-2
                      py-1
                      text-xs
                      rounded-md
                      border
                      text-muted-foreground
                    "
                  >
                    {tag}
                  </span>
                ))}
              </div>


              <Link
                href={`/work/${previewProject.id}`}
                className="
                  block
                  mt-6
                  text-center
                  rounded-xl
                  bg-primary
                  text-background
                  py-3
                  font-bold
                "
              >
                {t.works.viewProject}
              </Link>

            </div>

          </div>

        </div>
      )}



      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <div className="flex items-end justify-between mb-16 md:mb-20 border-b border-border pb-8">

          <h2 className="text-4xl md:text-6xl font-serif tracking-tight">
            {t.works.heading1}{" "}
            <em className="italic font-light text-primary">
              {t.works.heading2}
            </em>
          </h2>

          <span className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">
            {data.projects.length} {t.works.projectsCount}
          </span>

        </div>



        {/* Projects */}
        <div className="divide-y divide-border">

          {data.projects.map((project, index) => (

            <Link
              key={project.id}
              href={`/work/${project.id}`}
            >

              <div
                className="
                  group
                  grid
                  grid-cols-[3rem_1fr_auto]
                  md:grid-cols-[5rem_1fr_1fr_auto]
                  items-center
                  gap-4
                  md:gap-6
                  py-8
                  md:py-10
                  -mx-4
                  px-4
                  rounded-2xl
                  cursor-pointer
                  transition-colors
                  hover:bg-muted/30
                  touch-manipulation
                "
                onMouseEnter={() => setActiveProject(project.id)}
                onMouseLeave={() => setActiveProject(null)}
              >

                {/* Number */}
                <span className="
                  font-serif
                  text-3xl
                  md:text-4xl
                  font-light
                  text-muted-foreground/40
                ">
                  {String(index + 1).padStart(2, "0")}
                </span>



                {/* Title */}
                <div className="min-w-0">

                  <h3 className="
                    text-xl
                    md:text-3xl
                    font-bold
                    truncate
                    mb-2
                  ">
                    {getTitle(project)}
                  </h3>


                  <div className="flex flex-wrap gap-1.5">
                    {getTags(project).slice(0, 3).map((tag: string) => (
                      <span
                        key={tag}
                        className="
                          px-2
                          py-0.5
                          text-[10px]
                          font-bold
                          uppercase
                          rounded-md
                          border
                        "
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>



                {/* Description */}
                <p className="
                  hidden
                  md:block
                  text-sm
                  text-muted-foreground
                ">
                  {getDescription(project)}
                </p>



                {/* Actions */}
                <div className="
                  flex
                  flex-col
                  items-end
                  gap-3
                ">

                  {/* Mobile Preview */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setPreviewProject(project)
                    }}
                    className="
                      md:hidden
                      w-9
                      h-9
                      rounded-full
                      border
                      flex
                      items-center
                      justify-center
                      text-muted-foreground
                    "
                  >
                    <Eye className="w-4 h-4" />
                  </button>


                  <span className="text-xs font-mono text-muted-foreground">
                    {project.year}
                  </span>


                  <div className="
                    w-9
                    h-9
                    rounded-full
                    border
                    flex
                    items-center
                    justify-center
                    text-muted-foreground
                    group-hover:bg-primary
                    group-hover:text-background
                    transition-all
                  ">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>

                </div>


              </div>

            </Link>

          ))}

        </div>

      </div>

    </section>
  )
}