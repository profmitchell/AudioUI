"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Menu, AudioWaveformIcon as Waveform } from "lucide-react"
import { useLayout } from "@/components/layout-provider"
import { motion } from "framer-motion"

export function TopNav() {
  const pathname = usePathname()
  const { sidebarCollapsed, toggleSidebar } = useLayout()

  const isActive = (path: string) => {
    if (path === "/") return pathname === path
    return pathname.startsWith(path)
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="top-nav fixed top-0 right-0 z-30 h-14 w-full"
    >
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden p-1 h-10 w-10 rounded-full hover:bg-white/10 mr-2 flex items-center justify-center"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="md:hidden flex items-center mr-4 flex-1 justify-center">
            <Waveform className="h-5 w-5 text-white mr-2" />
            <span className="text-lg font-light">AudioUI</span>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="sm" className="glass glass-hover hidden md:flex" asChild>
            <Link href="https://github.com/audioui/components">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className="glass glass-hover" asChild>
            <Link href="/studio">
              <ExternalLink className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Studio</span>
            </Link>
          </Button>
        </div>
      </div>
    </motion.header>
  )
}
