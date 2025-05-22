"use client"

import React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  FileText,
  Sliders,
  Disc3,
  ToggleLeft,
  Volume2,
  AudioWaveformIcon as Waveform,
  Settings,
  Layers,
  ChevronLeft,
  ChevronRight,
  Code,
  Gauge,
  Gamepad2,
  BarChart3,
  LockKeyholeIcon as KnobIcon,
  Folder,
} from "lucide-react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useLayout } from "@/components/layout-provider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dial } from "@/components/ui/dial"

// Miniature Dial component for sidebar icon
const DialIcon = () => (
  <div className="w-5 h-5 flex items-center justify-center overflow-hidden">
    <div style={{ transform: 'scale(0.5)', transformOrigin: 'center center' }}>
      <Dial
        value={75}
        min={0}
        max={100}
        size="xxs"
        indicatorColor="currentColor"
        trackColor="rgba(255,255,255,0.2)"
        showValue={false}
        disabled={true}
        variant="flat"
      />
    </div>
  </div>
);

export function SiteSidebar() {
  const pathname = usePathname()
  const { sidebarCollapsed, toggleSidebar } = useLayout()

  // Sidebar should always be visible now

  const isActive = (path: string) => {
    return pathname === path
  }

  const iconVariants = {
    expanded: { scale: 1 },
    collapsed: { scale: 1.5 },
  }

  const sidebarVariants = {
    expanded: { width: 256 },
    collapsed: { width: 80 },
  }

  // Add this new useEffect to handle mobile sidebar behavior
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && !sidebarCollapsed) {
        toggleSidebar()
      }
    }

    window.addEventListener("resize", handleResize)
    // Initial check
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [sidebarCollapsed, toggleSidebar])

  return (
    <motion.div
      initial={sidebarCollapsed ? "collapsed" : "expanded"}
      animate={sidebarCollapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn("sidebar fixed top-0 left-0 h-screen z-40 max-h-screen overflow-y-auto", sidebarCollapsed && "w-[80px]")}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-white/10 sticky top-0 bg-black z-10">
          <Link href="/" className="flex items-center gap-2">
            <Waveform className="h-6 w-6 text-white" />
            {!sidebarCollapsed && <span className="text-xl font-light tracking-wide">AudioUI</span>}
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="p-1 h-8 w-8 rounded-full hover:bg-white/10"
            onClick={toggleSidebar}
          >
            {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
          <TooltipProvider delayDuration={300}>
            <div className="px-3 py-2">
              {!sidebarCollapsed && (
                <div className="sidebar-section text-base font-medium tracking-wider text-white mb-2 px-4 py-1 border-b border-white/10">
                  Main
                </div>
              )}
              <nav className="space-y-3 mt-1">
                <NavItem href="/" icon={Home} label="Home" isActive={isActive("/")} isCollapsed={sidebarCollapsed} />
              </nav>
            </div>

            <div className="px-3 py-2">
              {!sidebarCollapsed && (
                <div className="sidebar-section text-base font-medium tracking-wider text-white mb-2 px-4 py-1 border-b border-white/10">
                  Getting Started
                </div>
              )}
              <nav className="space-y-3 mt-1">
                <NavItem
                  href="/docs/introduction"
                  icon={FileText}
                  label="Introduction"
                  isActive={isActive("/docs/introduction")}
                  isCollapsed={sidebarCollapsed}
                />
              </nav>
            </div>

            <div className="px-3 py-2">
              {!sidebarCollapsed && (
                <div className="sidebar-section text-lg font-bold tracking-wider text-white mb-2 px-4 py-1 border-b border-white/10">
                  Components
                </div>
              )}
              <nav className="space-y-2 mt-2">
                <NavItem
                  href="/docs/components/drum-pad"
                  icon={Gamepad2}
                  label="Drum Pad"
                  isActive={isActive("/docs/components/drum-pad")}
                  isCollapsed={sidebarCollapsed}
                />
                {/* <NavItem
                  href="/docs/components/filter"
                  icon={ToggleLeft}
                  label="Filter"
                  isActive={isActive("/docs/components/filter")}
                  isCollapsed={sidebarCollapsed}
                /> */}
                <NavItem
                  href="/docs/components/adsr-envelope"
                  icon={FileText}
                  label="ADSR Envelope"
                  isActive={isActive("/docs/components/adsr-envelope")}
                  isCollapsed={sidebarCollapsed}
                />
                <NavItem
                  href="/docs/components/XYPad"
                  icon={BarChart3}
                  label="XY Pad"
                  isActive={isActive("/docs/components/XYPad")}
                  isCollapsed={sidebarCollapsed}
                />
                <NavItem
                  href="/docs/components/knob"
                  icon={DialIcon}
                  label="Knob"
                  isActive={isActive("/docs/components/knob")}
                  isCollapsed={sidebarCollapsed}
                />
                <NavItem
                  href="/docs/components/knob-specular"
                  icon={KnobIcon}
                  label="Knob - Specular"
                  isActive={isActive("/docs/components/knob-specular")}
                  isCollapsed={sidebarCollapsed}
                />
                <NavItem
                  href="/docs/components/meter-arc"
                  icon={Gauge}
                  label="Meter - Arc"
                  isActive={isActive("/docs/components/meter-arc")}
                  isCollapsed={sidebarCollapsed}
                />
                <NavItem
                  href="/docs/components/modulation-wheel"
                  icon={Volume2}
                  label="Modulation Wheel"
                  isActive={isActive("/docs/components/modulation-wheel")}
                  isCollapsed={sidebarCollapsed}
                />
                <NavItem
                  href="/docs/components/pitch-bend-wheel"
                  icon={Volume2}
                  label="Pitch-Bend Wheel"
                  isActive={isActive("/docs/components/pitch-bend-wheel")}
                  isCollapsed={sidebarCollapsed}
                />
                {/* <NavItem
                  href="/docs/components/preset-browser"
                  icon={Folder}
                  label="Preset Browser"
                  isActive={isActive("/docs/components/preset-browser")}
                  isCollapsed={sidebarCollapsed}
                /> */}
                <NavItem
                  href="/docs/components/slider-ethereal"
                  icon={Sliders}
                  label="Slider - Ethereal"
                  isActive={isActive("/docs/components/slider-ethereal")}
                  isCollapsed={sidebarCollapsed}
                />
              </nav>
            </div>
          </TooltipProvider>
        </div>

        <div className="p-4 border-t border-white/10">
          {!sidebarCollapsed ? (
            <div className="text-xs text-white/60">AudioUI v1.0.0</div>
          ) : (
            <div className="flex justify-center">
              <motion.div
                initial={sidebarCollapsed ? "collapsed" : "expanded"}
                animate={sidebarCollapsed ? "collapsed" : "expanded"}
                variants={iconVariants}
              >
                <Waveform className="h-5 w-5 text-white/60" />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

interface NavItemProps {
  href: string
  icon: React.ElementType
  label: string
  isActive: boolean
  isCollapsed: boolean
  indent?: boolean
}

function NavItem({ href, icon: Icon, label, isActive, isCollapsed, indent = false }: NavItemProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={cn(
            "sidebar-item flex items-center py-2 px-4 rounded-md",
            isActive ? "bg-white/10 text-white font-medium" : "text-white/70 hover:text-white hover:bg-white/5",
            isCollapsed && "justify-center p-2",
            indent && "ml-2",
          )}
        >
          {!isCollapsed ? <span>{label}</span> : <span className="text-xs">{label.charAt(0)}</span>}
        </Link>
      </TooltipTrigger>
      {isCollapsed && <TooltipContent side="right">{label}</TooltipContent>}
    </Tooltip>
  )
}
