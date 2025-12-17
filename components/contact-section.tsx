"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, ExternalLink, Sparkles, Dribbble, Palette } from "lucide-react"
import data from "@/lib/data.json"

export function ContactSection() {
  const contactLinks = [
    { name: "Email Me", icon: Mail, href: `mailto:${data.personal.email}`, label: data.personal.email },
    { name: "Professional", icon: Linkedin, href: data.personal.linkedin, label: "LinkedIn" },
    { name: "Portfolio", icon: Palette, href: "https://www.behance.net/bodniaalex", label: "Behance" },
    { name: "Shots", icon: Dribbble, href: "https://dribbble.com/AlexBodnia", label: "Dribbble" },
    { name: "Code", icon: Github, href: data.personal.github, label: "GitHub" },
  ]

  return (
    <section id="contact" className="py-24 md:py-32 bg-background border-t border-border/50">
      <div className="container mx-auto px-6">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-foreground/70">Get in touch</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif tracking-tighter mb-8 text-foreground">
            Let's Work <span className="italic font-light text-primary">Together</span>
          </h2>
          <p className="text-foreground/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-normal">
            {data.personal.contact || "I'm always interested in hearing about new projects and opportunities."}
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* CONTACT LINKS - ONE COLUMN COMPACT */}
          <div className="grid grid-cols-1 gap-4">
            {contactLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                target={link.name === "Email Me" ? undefined : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-5 p-4 md:p-5 bg-card border border-border rounded-[1.5rem] hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-500 group"
              >
                <div className="w-11 h-11 md:w-12 md:h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <link.icon className="h-5 w-5" />
                </div>
                
                <div className="flex-grow">
                  <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-0.5">
                    {link.name}
                  </div>
                  <div className="text-base md:text-lg font-bold text-foreground">
                    {link.label}
                  </div>
                </div>

                <ExternalLink className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary transition-all" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* FOOTER - EXACTLY AS BEFORE */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-32 pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left"
        >
          <p className="text-muted-foreground text-sm font-medium">© 2025 All rights reserved.</p>
          <div className="font-serif italic text-2xl text-foreground">
            Alex <span className="text-primary">Bodnia</span>
          </div>
          <p className="text-muted-foreground text-sm font-light italic">Built with Passion and Precision.</p>
        </motion.footer>
      </div>
    </section>
  )
}