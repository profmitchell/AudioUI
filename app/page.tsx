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
            <motion.div
              className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-md p-3 max-w-md mx-auto mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              <code className="text-green-400 font-mono">npm install audioui</code>
            </motion.div>
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
                className="bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 hover:text-white glass w-full sm:w-auto min-h-[50px]"
                asChild
              >
                <Link href="/docs/introduction">Get Started</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/10 text-white hover:bg-white/10 hover:text-white w-full sm:w-auto min-h-[50px]"
                asChild
              >
                <Link href="https://github.com/profmitchell/AudioUI" target="_blank" rel="noopener noreferrer">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub
                </Link>
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
