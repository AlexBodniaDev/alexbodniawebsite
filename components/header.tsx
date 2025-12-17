"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Download, Menu, X } from "lucide-react"

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const navigateToSection = (sectionId: string) => {
    if (pathname === "/") {
      // On home page, scroll to section
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // On other pages, navigate to home with hash
      router.push(`/#${sectionId}`)
    }
    // Close mobile menu after navigation
    setTimeout(() => setIsMobileMenuOpen(false), 100)
  }

  const navItems = [
    { label: "Home", sectionId: "hero" },
    { label: "About Me", sectionId: "about" },
    { label: "Works", sectionId: "works" },
    { label: "Contact", sectionId: "contact" },
  ]

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <motion.button
            onClick={() => navigateToSection("hero")}
            className="text-xl font-mono font-semibold hover:opacity-80 transition-opacity"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Alex Bodnia
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.sectionId}
                onClick={() => navigateToSection(item.sectionId)}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <Button
              size="sm"
              className="flex items-center gap-2 px-4"
              onClick={() => {
                window.open("/alexbodniawebsite/cv.pdf", "_blank")
              }}
            >
              <Download className="h-4 w-4" />
              Download CV
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu - Positioned absolutely to not push content */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 z-[60] bg-background border-b border-border/50 overflow-hidden">
          <div className="container mx-auto px-6 py-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.sectionId}
                onClick={() => navigateToSection(item.sectionId)}
                className="block w-full text-left px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-border/50">
              <Button
                size="sm"
                className="w-full flex items-center justify-center gap-2 mt-2"
                onClick={() => {
                  window.open("/alexbodniawebsite/cv.pdf", "_blank")
                  setTimeout(() => setIsMobileMenuOpen(false), 100)
                }}
              >
                <Download className="h-4 w-4" />
                Download CV
              </Button>
            </div>
          </div>
        </div>
      )}
    </motion.header>
  )
}
