"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useTouchInteractions } from "@/hooks/use-touch-interactions"

type LayoutContextType = {
  sidebarCollapsed: boolean
  toggleSidebar: () => void
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export function LayoutProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { isTouchDevice } = useTouchInteractions()

  useEffect(() => {
    setIsMounted(true)

    // Check if we should collapse sidebar on mobile
    const checkWidth = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true)
      }
    }

    // Get saved state from localStorage if available
    const savedState = localStorage.getItem("sidebar-collapsed")
    if (savedState) {
      setSidebarCollapsed(savedState === "true")
    }

    checkWidth()
    window.addEventListener("resize", checkWidth)
    return () => window.removeEventListener("resize", checkWidth)
  }, [])

  const toggleSidebar = () => {
    const newState = !sidebarCollapsed
    setSidebarCollapsed(newState)
    // Save state to localStorage
    localStorage.setItem("sidebar-collapsed", String(newState))
  }

  if (!isMounted) {
    return null
  }

  return (
    <LayoutContext.Provider value={{ sidebarCollapsed, toggleSidebar }}>
      <div className={cn("flex min-h-screen", sidebarCollapsed && "sidebar-collapsed")}>{children}</div>
    </LayoutContext.Provider>
  )
}

export function useLayout() {
  const context = useContext(LayoutContext)
  if (context === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider")
  }
  return context
}
