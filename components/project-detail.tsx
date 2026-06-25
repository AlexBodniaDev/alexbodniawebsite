"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Github, Zap, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

// ─── Fade-up helper ──────────────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Chapter divider — the signature element ─────────────────────────────────
// A hairline rule with a floating mono label notched into it.
function ChapterDivider({ label }: { label: string }) {
  return (
    <FadeUp>
      <div className="relative flex items-center py-2 my-20">
        <div className="flex-1 h-px bg-border" />
        <span className="mx-5 font-mono text-[10px] uppercase tracking-[0.3em] text-primary whitespace-nowrap select-none">
          {label}
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>
    </FadeUp>
  )
}

// ─── Eyebrow label ───────────────────────────────────────────────────────────
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3">
      {children}
    </p>
  )
}

// ─── Project data ─────────────────────────────────────────────────────────────
const projectDetails: Record<string, any> = {
  "tennis-courts-3d": {
    tagline: "Bringing sports architecture to life through interactive 3D visualization",
    overview:
      "An interactive 3D visualization platform for tennis court designs commissioned by a sports facility company. The goal was to let clients walk through court configurations before any physical construction began — reducing revision cycles and increasing client confidence at the proposal stage.",
    challenge:
      "The client had no way to show customers what finished courts would look like. Static renders felt flat and failed to convey scale, material quality, or spatial flow between areas like entrances, seating, and storage.",
    solution:
      "Built a fully navigable 3D environment in Blender with realistic PBR materials, natural lighting, and multiple camera paths. Delivered as an interactive walkthrough file that non-technical stakeholders could explore without any 3D software installed.",
    metrics: [
      { value: "6", label: "Unique Views Rendered" },
      { value: "3D", label: "Full Spatial Model" },
      { value: "100%", label: "Built from Scratch" },
    ],
    process: [
      { title: "Client Research", description: "Interviewed facility managers to understand which court aspects mattered most to their clients — primarily the entrance experience and the sense of space." },
      { title: "Concept & Blocking", description: "Roughed out the full court layout in Blender with low-poly blocking to agree on spatial proportions and camera angles before detailing." },
      { title: "3D Modeling & Texturing", description: "Modeled all structural elements and applied PBR materials — court surface, fencing, lighting poles, seating and inventory boot — with physically accurate material properties." },
      { title: "Lighting & Atmosphere", description: "Set up an HDRI environment combined with area lights to simulate afternoon sunlight, giving the renders a warm, inviting feel that matched the client's branding." },
      { title: "Final Renders & Delivery", description: "Produced six production renders from client-approved viewpoints, then packaged an interactive file for stakeholder walkthroughs." },
    ],
    role: ["3D Modeling", "Texturing & Materials", "Lighting Design", "Render Direction", "File Delivery"],
    technologies: ["Blender", "Figma", "Adobe Photoshop"],
    images: [
      { src: "/entrance-view.png", title: "Entrance View", description: "The primary establishing shot — designed to be the first image clients see. Warm afternoon lighting and clear branding signage create an immediate sense of quality and welcome." },
      { src: "/all-courts-view.png", title: "Full Court Overview", description: "Aerial perspective showing all courts simultaneously. Used in proposals to communicate the full footprint of the facility and how courts relate to each other spatially." },
      { src: "/second-entrance-view.png", title: "Secondary Entrance", description: "An alternate access point rendered to show the facility's second entrance, important for large events where crowd flow needs to be split across multiple entry points." },
      { src: "/1-court-view.png", title: "Single Court Close-Up", description: "A ground-level view of a single court to showcase surface material quality, line markings, and the net setup — the detail that matters most to serious players." },
      { src: "/3-court-view.png", title: "Three-Court Configuration", description: "Shows how three courts sit side by side with proper spacing. This view was specifically requested to help the client plan equipment and referee positioning." },
      { src: "/inventoty-boot-view.png", title: "Inventory Boot & Storage", description: "Close render of the storage and equipment boot area. Modeled with accurate dimensions so the client could verify storage capacity before finalizing construction plans." },
    ],
    liveUrl: "https://drive.google.com/file/d/1fCvXCnh6GpEOE-9ezJQq9DrB7j_E1OBw/view?usp=sharing",
  },
  "dnipro-redesign": {
    tagline: "Modernizing a regional ISP's digital presence without losing brand trust",
    overview:
      "A full UX and visual redesign of Dnipro.net, a regional internet and TV service provider in Ukraine. The existing site was built over a decade ago and suffered from poor information hierarchy, confusing navigation, and a dated visual language that undermined customer confidence.",
    challenge:
      "The client had strong brand recognition locally but was losing leads to competitors with more modern web presences. Their existing site buried key actions (plan selection, support contact) under layers of outdated navigation and dense text blocks.",
    solution:
      "Redesigned the entire site architecture with a mobile-first, conversion-focused approach. Introduced a clean design system with consistent spacing, a refreshed colour palette, and simplified navigation that brought the most critical actions — plan purchase, speed check, support — to the surface.",
    metrics: [
      { value: "5+", label: "Pages Redesigned" },
      { value: "↑3×", label: "CTA Clarity Improvement" },
      { value: "2023", label: "Year Delivered" },
    ],
    process: [
      { title: "Heuristic Audit", description: "Evaluated the existing site against Nielsen's 10 usability heuristics. Documented 23 critical usability issues ranging from inconsistent button states to missing error messages." },
      { title: "User Flow Mapping", description: "Mapped the primary user journeys — new customer sign-up, existing customer support, and plan upgrade — to identify where users were dropping off." },
      { title: "Information Architecture", description: "Restructured the site's navigation to surface the three most important actions on every page. Reduced the top-level navigation from 9 items to 5." },
      { title: "Wireframing", description: "Created low-fidelity wireframes for all key pages to test layout logic before adding visual design. Ran a quick hallway test with 5 participants." },
      { title: "Visual Design System", description: "Built a Figma component library with a refined colour palette, typography scale, button system, form elements, and icon set." },
      { title: "High-Fidelity Prototype", description: "Assembled a fully interactive prototype in Figma covering the main user flows, ready for developer handoff." },
    ],
    role: ["UX Research", "Information Architecture", "Wireframing", "UI Design", "Design System", "Prototype"],
    technologies: ["Figma", "Adobe Photoshop"],
    images: [
      { src: "/main-hero-section-dnepronet.jpg", title: "Hero & Navigation", description: "The redesigned homepage hero leads with a clear value proposition and a single primary CTA. Navigation was reduced and reorganised around user intent rather than company departments." },
      { src: "/internet-dnepronet.jpg", title: "Internet Plans Page", description: "Plan comparison layout designed to make the decision easy — speed, price, and key features visible at a glance without toggling or expanding hidden content." },
      { src: "/tv-dnepro-net.jpg", title: "TV Packages Section", description: "TV service section with visual channel group indicators. The goal was to let customers quickly identify which package includes their must-have channels." },
      { src: "/map-faq-dnepronet.jpg", title: "Coverage Map & FAQ", description: "Interactive coverage map paired with contextual FAQ. Users can check availability before going through the sign-up flow, reducing support calls about coverage." },
      { src: "/footer-dnepronet.jpg", title: "Footer Navigation", description: "Structured footer acting as a secondary navigation system — organising links by category so users who scroll past the main content still have clear pathways forward." },
      { src: "/about-dnepronet.jpg", title: "About & Trust Section", description: "About page section built to reinforce credibility — years in operation, number of customers, and local support team information that competitors couldn't match." },
    ],
    liveUrl: "https://drive.google.com/file/d/1yDtr7PmPJqzxp4g4CTsx4sGefKuQHR3C/view?usp=sharing",
  },
  "ketotox-package": {
    tagline: "Medical packaging that earns trust at first glance",
    overview:
      "Packaging design for Ketotox Plus, a dietary supplement in the medical-wellness space. The brief called for a design that would stand out on pharmacy shelves while communicating clinical credibility — a difficult balance in a category crowded with both sterile medical aesthetics and loud wellness branding.",
    challenge:
      "Competing products either looked aggressively medical (cold, unapproachable) or aggressively wellness (untrustworthy for a medical audience). Ketotox Plus needed to occupy the middle ground: approachable but credible, with all regulatory information clearly accessible.",
    solution:
      "Created a clean, structured packaging system anchored by hand-drawn botanical illustrations — a detail that signals craftsmanship and natural ingredients without sacrificing the clinical clarity required by medical labelling standards.",
    metrics: [
      { value: "4", label: "Packaging Concepts" },
      { value: "2", label: "Mockup Formats" },
      { value: "100%", label: "Regulation Compliant" },
    ],
    process: [
      { title: "Regulatory Research", description: "Reviewed applicable supplement labelling regulations to understand mandatory elements — active ingredients, dosage, warnings, and batch information placement requirements." },
      { title: "Competitive Analysis", description: "Audited 15 competing products across pharmacy and wellness channels. Identified a gap for a design that felt premium without feeling pharmaceutical." },
      { title: "Brand Direction", description: "Defined the visual direction: restrained colour palette, structured typographic hierarchy, and botanical illustration as the differentiating element." },
      { title: "Illustration Development", description: "Created custom hand-drawn botanical illustrations in Adobe Illustrator that referenced the product's key active ingredients." },
      { title: "Packaging Layout", description: "Structured all panels to meet labelling requirements while maintaining visual balance — front panel, back panel, and side information columns." },
      { title: "Mockup Presentation", description: "Produced photorealistic packaging mockups to allow the client to see the final design in context before going to print." },
    ],
    role: ["Brand Direction", "Illustration", "Packaging Design", "Regulatory Layout", "Mockup Production"],
    technologies: ["Adobe Illustrator", "Adobe Photoshop", "Figma"],
    images: [
      { src: "/mockup-one-keto.jpg", title: "Primary Product Mockup", description: "Hero product shot showing the front panel. The botanical illustration anchors the design, immediately communicating natural ingredients while the structured typographic hierarchy maintains clinical credibility." },
      { src: "/mockup-second-keto.png", title: "Angled Packaging View", description: "Three-quarter view showing both the front and side panels simultaneously. Designed to replicate how a customer sees the product when reaching for it on a pharmacy shelf." },
      { src: "/mockup-third-keto.jpg", title: "Detail & Scale", description: "Close-up showing the typographic detail and label hierarchy — active ingredient prominence, dosage instruction clarity, and the placement of required regulatory information." },
      { src: "/illustrations.jpg", title: "Botanical Illustration Set", description: "The custom illustration set developed for the packaging. Each plant references an active ingredient in the formula — a storytelling device that connects the packaging visually to the product's efficacy claims." },
    ],
    liveUrl: "https://drive.google.com/file/d/1mrNA11sG5BVX7TRU8QoUoB2x8U7NYbxM/view?usp=sharing",
  },
  "mobile-app-todo": {
    tagline: "A task manager that feels like it belongs in your pocket",
    overview:
      "A cross-platform to-do application designed and developed from scratch. The challenge was not to build another task list — the market is saturated — but to design one that feels genuinely pleasant to use daily, with interactions that reward the habit of completing tasks.",
    challenge:
      "Most to-do apps prioritise feature completeness over usability. The result is interfaces cluttered with folders, tags, priorities, and projects that overwhelm casual users. The brief was to strip the experience back to what people actually do: add a task, set a time, mark it done.",
    solution:
      "Designed a streamlined three-screen flow — welcome, task creation, main board — with native-feeling pickers for date and time, a clear visual distinction between pending and completed tasks, and a dark theme optimised for low-light use.",
    metrics: [
      { value: "3", label: "Core Screens" },
      { value: "Dark", label: "Primary Theme" },
      { value: "Live", label: "Deployed App" },
    ],
    process: [
      { title: "User Journey Mapping", description: "Mapped the end-to-end journey from first open to completing a recurring task. Identified that most competing apps lost users at the task creation step due to too many required fields." },
      { title: "Wireframing", description: "Created wireframes for all screens and interaction states, including empty states, loading states, and error states — often skipped in portfolio projects but critical to a real product feel." },
      { title: "UI Design System", description: "Built a dark-mode-first component library in Figma: typography scale, colour tokens, button states, form elements, and custom icons." },
      { title: "Custom Picker Design", description: "Designed native-style date and time pickers from scratch to match the app's aesthetic — the default OS pickers broke the visual language." },
      { title: "React Native Development", description: "Developed the full application in React Native, implementing the designed flows with smooth animations and platform-appropriate interaction patterns." },
    ],
    role: ["UX Research", "Wireframing", "UI Design", "React Native Development", "App Deployment"],
    technologies: ["Figma", "Adobe Photoshop", "React Native"],
    images: [
      { src: "/welcome-screen-dsrk.jpg", title: "Welcome & Onboarding", description: "The first screen a new user sees. Minimal — just the brand mark and a single action. The dark background establishes the app's calm, focused mood from the very first interaction." },
      { src: "/task-screen.jpg", title: "Task Detail View", description: "Where users configure a task's name, date, time, and priority. Kept to a single screen with a clear hierarchy to make task creation as fast as possible." },
      { src: "/register-screen.jpg", title: "Account Creation", description: "Sign-up screen designed to minimise friction — only the three fields truly required to get started. Social login options de-prioritised since the target audience values privacy." },
      { src: "/pick-time-popup.jpg", title: "Time Picker", description: "Custom-designed time picker that matches the app's dark aesthetic. Uses a drum-roll interaction pattern familiar to iOS users without looking like a borrowed system component." },
      { src: "/pick-date-popup-green.jpg", title: "Date Picker", description: "Calendar-style date picker with the accent green used consistently to highlight the current selection. Green was chosen as the app's signature colour — connoting progress and completion." },
      { src: "/main-screen-lightgreen.jpg", title: "Main Task Board", description: "The primary screen users return to daily. Tasks are grouped by status, with completed items visually de-emphasised rather than removed — giving users a sense of accomplishment without cluttering the to-do list." },
    ],
    liveUrl: "https://alexbodniadev.github.io/ToDoApp",
    githubUrl: "https://github.com/AlexBodniaDev/ToDoApp",
  },
  "mobile-app-cyclesense": {
    tagline: "Period tracking designed with empathy, not just features",
    overview:
      "CycleSense is a period and cycle tracking app designed for women who want clear, non-judgmental insight into their health patterns. The project covered the full design process — from UX research through to high-fidelity UI and a working React Native prototype.",
    challenge:
      "Most cycle tracking apps fall into one of two failure modes: they're either overly clinical and anxiety-inducing, or they're pastel and infantilising. Neither earns the ongoing daily engagement that makes a health tracker actually useful.",
    solution:
      "Designed a calm, information-rich experience with a colour language grounded in warm, natural tones. The app surfaces predictions proactively rather than making users dig for them, and frames cycle data as useful patterns rather than warnings.",
    metrics: [
      { value: "5", label: "Core Feature Screens" },
      { value: "UX+UI", label: "Full Design Ownership" },
      { value: "Live", label: "Deployed Prototype" },
    ],
    process: [
      { title: "UX Research", description: "Conducted interviews with 8 women who used competing apps. The primary finding: users wanted the app to surface insights proactively rather than requiring them to navigate to find information." },
      { title: "Information Architecture", description: "Mapped all data points the app needed to track and organised them into five core sections: predictions, calendar, symptoms, insights, and settings." },
      { title: "Wireframing", description: "Rapid wireframe iteration across all screens, with particular focus on the calendar interaction model — the most technically complex screen to get right." },
      { title: "Visual Design System", description: "Developed a warm, earthy palette and a type system that feels approachable without being childish. Avoided pink as the default — used it as a functional accent, not a category signal." },
      { title: "Prototyping & Testing", description: "Built an interactive prototype in Figma and tested it with 4 participants. Key finding: the symptom logging screen needed to reduce the number of taps to record a common symptom." },
      { title: "React Development", description: "Implemented the full UI in React Native with smooth screen transitions and a local data persistence layer for cycle history." },
    ],
    role: ["UX Research", "Information Architecture", "Wireframing", "UI Design", "React Native Development"],
    technologies: ["Figma", "Adobe Photoshop", "React", "Next.js"],
    images: [
      { src: "/predictions-page-cyclesense.jpg", title: "Predictions Dashboard", description: "The home screen surfaces the three things users care about most — next period date, fertile window, and ovulation day — without requiring any navigation. The timeline bar at the top gives a full-cycle overview at a glance." },
      { src: "/period-calendar-cyclesense.jpg", title: "Cycle Calendar", description: "Month view with colour-coded phase indicators. The calendar avoids overloading each day with data — symbols and colour do the work, with detail available on tap." },
      { src: "/symptomps-page-cyclesense.jpg", title: "Symptom Logging", description: "Redesigned after user testing to reduce symptom logging to a maximum of two taps. Grid layout lets users log multiple symptoms in a single session without scrolling." },
      { src: "/insights-screen-cyclesense.jpg", title: "Health Insights", description: "Pattern analysis surfaced as readable summaries, not raw charts. The design frames insights as observations rather than diagnoses — deliberately reducing anxiety while still being informative." },
      { src: "/settings-page-cyclesense.jpg", title: "Settings & Personalisation", description: "Settings screen designed to support the full range of cycle types and tracking goals — from contraception to conception — without making any single use case feel like the default." },
    ],
    liveUrl: "https://alexbodniadev.github.io/PeriodTrackerApp",
    githubUrl: "https://github.com/AlexBodniaDev/PeriodTrackerApp",
  },
  "mobile-app-cryptoxapp": {
    tagline: "Crypto trading made legible for everyday investors",
    overview:
      "CryptoX is a minimalist crypto trading app designed to make market data accessible to users who aren't day traders. Most crypto apps are designed for power users — dense with candles, order books, and jargon. CryptoX targets the growing segment of people who want exposure to crypto without the cognitive overload.",
    challenge:
      "The crypto UI space has converged on dark dashboards packed with real-time data. While powerful for experts, this aesthetic actively alienates the mainstream audience — the people most likely to adopt crypto next. The challenge was to strip the experience back without losing the data that matters.",
    solution:
      "Designed a clean, minimal trading interface that leads with the numbers users actually care about — portfolio value, percentage change, and their current holdings. Advanced features like detailed market data and notifications are available but progressively disclosed.",
    metrics: [
      { value: "5", label: "Core App Screens" },
      { value: "Live", label: "Deployed Prototype" },
      { value: "Min.", label: "Design Philosophy" },
    ],
    process: [
      { title: "Architecture Planning", description: "Defined the app's five core modules — markets, portfolio, trading, notifications, settings — and mapped how users would move between them based on typical investing behaviours." },
      { title: "Competitive Analysis", description: "Audited Coinbase, Binance, and Kraken's mobile apps. Found that all three prioritised feature depth over task clarity. Identified an opportunity in the 'first real trade' user journey." },
      { title: "UI Design", description: "Designed all screens in Figma with a strict minimal aesthetic: monochrome base with a single accent colour for interactive and positive elements, red only for losses and warnings." },
      { title: "Data Visualisation", description: "Designed custom chart components that communicate trend direction clearly without requiring the user to understand candlestick patterns or volume bars." },
      { title: "Interaction Design", description: "Specified micro-interactions for price updates, trade confirmation, and notification states — the moments where trust is built or broken in financial apps." },
      { title: "Development & Testing", description: "Built the interface in React Native and conducted usability testing focused on whether a crypto novice could successfully complete a simulated purchase in under 60 seconds." },
    ],
    role: ["Architecture", "Competitive Research", "UI Design", "Data Visualisation", "React Native Development"],
    technologies: ["Figma", "Adobe Photoshop", "React", "Next.js"],
    images: [
      { src: "/main-screen-cryptox.jpg", title: "Portfolio Overview", description: "The primary screen showing total portfolio value, 24h change, and a simplified holdings list. Designed to answer the one question investors ask when they open a trading app: 'Am I up or down today?'" },
      { src: "/markets-page-cryptox.jpg", title: "Markets Feed", description: "Live market data presented as a scannable list sorted by relevance to the user's holdings. Trend sparklines replace full charts, giving directional signal without demanding attention." },
      { src: "/portfolio-page-cryptox.jpg", title: "Portfolio Breakdown", description: "Detailed breakdown of individual holdings with entry price, current value, and gain/loss clearly distinguished. The allocation donut chart gives immediate visual sense of portfolio concentration." },
      { src: "/settings-page-cryptox.jpg", title: "Settings & Preferences", description: "Settings screen covering currency preferences, security options, and notification controls. Structured to mirror the mental model of a banking app — familiar territory for users new to crypto." },
      { src: "/notifications-cryptox.jpg", title: "Notifications Centre", description: "Price alert and activity notification feed. Designed with a clear visual hierarchy distinguishing price alerts (actionable) from system notifications (informational) so users know what requires their attention." },
    ],
    liveUrl: "https://alexbodniadev.github.io/CryptoXApp",
    githubUrl: "https://github.com/AlexBodniaDev/CryptoXApp",
  },
}

// ─── Component ────────────────────────────────────────────────────────────────
export function ProjectDetail({ project }: { project: any }) {
  const router = useRouter()
  const isMobileProject = project.id.includes("mobile")
  const details = projectDetails[project.id]

  return (
    <div className="bg-background min-h-screen">

      {/* ════════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════════ */}
      <section className="pt-28 md:pt-36 pb-0">
        <div className="mx-auto max-w-5xl px-6">

          {/* Back */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
          >
            <button
              onClick={() => router.back()}
              className="group mb-14 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/60 hover:text-foreground transition-colors duration-200"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
              Back to projects
            </button>
          </motion.div>

          {/* Year + type eyebrow */}
            <Eyebrow>{project.year} · Case Study</Eyebrow>

          {/* Title */}
          <motion.h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight leading-[0.95] mb-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {project.title}
          </motion.h1>

          {/* Tagline */}
          {details?.tagline && (
            <motion.p
              className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-2xl mb-12"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
            >
              {details.tagline}
            </motion.p>
          )}

          {/* Metrics + CTAs row */}
          <motion.div
            className="flex flex-col sm:flex-row sm:items-end gap-8 sm:gap-0 pb-16 border-b border-border"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
          >
            {/* Metrics */}
            {details?.metrics && (
              <div className="flex gap-10 sm:gap-14 flex-1">
                {details.metrics.map((m: any, i: number) => (
                  <div key={i} className="space-y-1.5">
                    <div className="font-serif text-4xl md:text-5xl font-normal text-primary leading-none">
                      {m.value}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 leading-snug">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTAs */}
            <div className="flex items-center gap-3">
              {details?.liveUrl && (
                <Link href={details.liveUrl} target="_blank">
                  <button className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 shadow-lg shadow-primary/20">
                    View Project
                    <ExternalLink className="h-3.5 w-3.5 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </Link>
              )}
              {details?.githubUrl && (
                <Link href={details.githubUrl} target="_blank">
                  <button className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground/70 transition-all duration-200 hover:border-foreground/40 hover:text-foreground">
                    Source
                    <Github className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>

        {/* Hero image — full-bleed below the header text */}
        <motion.div
          className="mt-0 mx-auto max-w-5xl px-6 pt-10"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-muted/10">
            <img
              src={project.image}
              alt={project.title}
              className={`w-full block ${isMobileProject ? "max-h-[560px] object-contain" : "h-auto"}`}
            />
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          NARRATIVE BODY
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-0">
        <div className="mx-auto max-w-5xl px-6">

          <ChapterDivider label="Overview" />

          {/* Overview — editorial pull-quote size */}
          <FadeUp>
            <p className="text-2xl md:text-3xl font-serif font-normal text-foreground leading-[1.5] max-w-3xl">
              {details?.overview}
            </p>
          </FadeUp>

          <ChapterDivider label="The Brief" />

          {/* Challenge / Solution — two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <FadeUp delay={0}>
              <div className="space-y-5">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3">
                  <Zap className="h-3.5 w-3.5" />
                  The Challenge
                </div>
                <p className="text-lg text-foreground/90 leading-[1.75]">{details?.challenge}</p>
              </div>
            </FadeUp>
            <FadeUp delay={0.08}>
              <div className="space-y-5">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3">
                  <Lightbulb className="h-3.5 w-3.5" />
                  The Solution
                </div>
                <p className="text-lg text-foreground/90 leading-[1.75]">{details?.solution}</p>
              </div>
            </FadeUp>
          </div>

          <ChapterDivider label="Process" />

          {/* Process — timeline */}
          <div className="relative">
            {/* Vertical rail */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border hidden md:block" />

            <div className="space-y-0">
              {details?.process.map((step: any, i: number) => (
                <FadeUp key={i} delay={i * 0.06}>
                  <div className="relative md:pl-10 pb-10 group">
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-[6px] h-[15px] w-[15px] rounded-full border-2 border-border bg-background group-hover:border-primary transition-colors duration-300 hidden md:block" />

                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 mb-2">
                      {/* Step number */}
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/40 shrink-0 w-6 sm:w-auto">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {/* Step title */}
                      <h3 className="text-lg font-semibold text-foreground tracking-tight">
                        {step.title}
                      </h3>
                    </div>
                    {/* Description — indented under title on large screens */}
                    <div className="sm:pl-[3.25rem] md:pl-0">
                      <p className="text-base text-foreground/80 leading-[1.8]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          <ChapterDivider label="Deliverables" />

          {/* Role + Tools — two compact columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            <FadeUp>
              <div className="space-y-5">
                <Eyebrow>My Role</Eyebrow>
                <ul className="space-y-3">
                  {details?.role?.map((r: string) => (
                    <li key={r} className="flex items-center gap-3 text-base text-foreground/85">
                      <span className="h-px w-4 bg-primary/40 shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
            <FadeUp delay={0.08}>
              <div className="space-y-5">
                <Eyebrow>Tools & Technologies</Eyebrow>
                <div className="flex flex-wrap gap-2">
                  {details?.technologies.map((tech: string) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 font-mono text-sm text-primary hover:bg-primary/10 transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          VISUAL WALKTHROUGH
      ════════════════════════════════════════════════════════════════════ */}
      <section className="pb-0">
        <div className="mx-auto max-w-5xl px-6">
          <ChapterDivider label="Visual Walkthrough" />

          {/* Section opener */}
          <FadeUp>
            <p className="font-serif text-3xl md:text-4xl font-normal text-foreground leading-snug mb-16 max-w-xl">
              A closer look at every screen and{" "}
              <span className="text-primary">design decision.</span>
            </p>
          </FadeUp>
        </div>

        {/* Gallery */}
        <div className="mx-auto max-w-5xl px-6">
          <div
            className={`grid gap-x-10 gap-y-20 ${
              isMobileProject
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 md:grid-cols-2"
            }`}
          >
            {details?.images.map((img: any, index: number) => (
              <FadeUp key={index} delay={Math.min(index * 0.05, 0.25)}>
                <div className="group space-y-5">
                  {/* Image */}
                  <div className="overflow-hidden rounded-xl border border-border/50 bg-muted/5 transition-all duration-500 group-hover:border-primary/40">
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.015]"
                    />
                  </div>

                  {/* Annotation */}
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-primary/40 shrink-0">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-base font-semibold text-foreground tracking-tight">
                        {img.title}
                      </h3>
                    </div>
                    <p className="text-base text-foreground/75 leading-[1.75] pl-8">
                      {img.description}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FOOTER CTA
      ════════════════════════════════════════════════════════════════════ */}
      <footer className="mt-32 border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-24 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">Next step</p>
            <p className="text-lg font-serif text-foreground/80">Ready to see more <span className="text-primary">work?</span></p>
          </div>
          <Link href="/#works">
            <button className="group inline-flex items-center gap-3 rounded-full border border-border px-8 py-3.5 text-sm font-medium text-foreground/70 transition-all duration-200 hover:border-foreground/40 hover:text-foreground">
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
              Back to Projects
            </button>
          </Link>
        </div>
      </footer>

    </div>
  )
}