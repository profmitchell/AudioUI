"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AudioWaveformIcon as Waveform } from "lucide-react"
import { motion } from "framer-motion"
import { ComponentShowcase } from "@/components/showcase"

export default function HomePage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="flex flex-col min-h-screen">
      <motion.main className="flex-1" initial="hidden" animate="show" variants={container}>
        {/* Hero content (above showcase) */}
        <motion.section className="relative z-10 py-20 md:py-32 text-center" variants={item}>
          <div className="container mx-auto px-6">
            <motion.h1
              className="text-5xl md:text-7xl font-light tracking-wide mb-4 text-white drop-shadow-xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              AudioUI
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-3 drop-shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              A collection of high-quality audio interface components built with React and Tailwind CSS. Customizable,
              accessible, and open source.
            </motion.p>
            <motion.p
              className="text-sm md:text-base text-white/60 mb-10 drop-shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              By: Cohen Concepts
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                size="lg"
                className="bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 hover:text-white glass"
                asChild
              >
                <Link href="/docs/introduction">Get Started</Link>
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* Infinite Showcase (background, below hero) */}
        <div className="relative w-full overflow-hidden min-h-[180px] md:min-h-[220px]">
          {/* Gradient and blur overlays for smoothness */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
            <div className="absolute inset-0 backdrop-blur-[6px]" />
          </div>
          {/* Component showcase with smooth scroll animation */}
          <div className="w-full py-8 flex animate-scroll-left will-change-transform">
            <ComponentShowcase />
          </div>
        </div>

        {/* Features section (no border line above) */}
        <motion.section className="py-16 bg-black/40 backdrop-blur-md" variants={item}>
          <div className="container mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-light tracking-wide mb-10 text-center">Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
              <FeatureCard
                title="Customizable"
                description="Every component can be styled to match your brand and design system."
                href="/docs/components"
              />
              <FeatureCard
                title="Accessible"
                description="Built with accessibility in mind, following WAI-ARIA standards."
                href="/docs/introduction"
              />
              <FeatureCard
                title="Open Source"
                description="Free and open source under the MIT license. Use in any project."
                href="/docs/introduction"
              />
            </div>
          </div>
        </motion.section>

        <motion.section className="py-16" variants={item}>
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-light tracking-wide mb-6">Ready to get started?</h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-8">
              Start building beautiful audio interfaces with AudioUI components.
            </p>
            <Button
              size="lg"
              className="bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 hover:text-white glass"
              asChild
            >
              <Link href="/docs/introduction">Get Started</Link>
            </Button>
          </div>
        </motion.section>
      </motion.main>

      <footer className="border-t border-white/10 py-8 bg-black/40 backdrop-blur-md w-full">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center w-full">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Waveform className="h-5 w-5 text-white" />
              <span className="text-lg font-light">AudioUI</span>
            </div>
            <div className="text-sm text-white/60"> {new Date().getFullYear()} AudioUI. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

interface FeatureCardProps {
  title: string
  description: string
  href: string
}

function FeatureCard({ title, description, href }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        boxShadow: "0 0 30px rgba(255, 255, 255, 0.2)",
      }}
      whileTap={{ scale: 0.98 }}
      className="glass p-6 transition-all duration-300"
    >
      <Link href={href} className="block h-full">
        <h3 className="text-xl font-medium mb-3">{title}</h3>
        <p className="text-white/70">{description}</p>
      </Link>
    </motion.div>
  )
}
