"use client"

import type React from "react"
import { useRef, useEffect, useState, type KeyboardEvent, useCallback } from "react"
import { cn } from "@/lib/utils"

export interface XYPadProps {
  /** X-axis value (0-1) */
  x: number
  /** Y-axis value (0-1) */
  y: number
  /** Callback when values change */
  onChange?: (newX: number, newY: number) => void
  /** Width of the pad in pixels */
  width?: number
  /** Height of the pad in pixels */
  height?: number
  /** Step size for X-axis */
  stepX?: number
  /** Step size for Y-axis */
  stepY?: number
  /** Show grid lines */
  showGrid?: boolean
  /** Snap values to grid */
  snapToGrid?: boolean
  /** Track background color */
  trackColor?: string
  /** Thumb indicator color */
  thumbColor?: string
  /** Theme for the XYPad */
  theme?: "default" | "neon" | "midnight" | "sunset" | "nightPurple"
  /** Enable ripple effect */
  rippleEffect?: boolean
  /** Additional class names */
  className?: string
  /** Ref forwarding */
  ref?: React.Ref<HTMLDivElement>
}

interface Ripple {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  timestamp: number
}

export const XYPad = ({
  x = 0.5,
  y = 0.5,
  onChange,
  width = 200,
  height = 200,
  stepX = 0.01,
  stepY = 0.01,
  showGrid = false,
  snapToGrid = false,
  trackColor,
  thumbColor,
  theme = "default",
  rippleEffect = true,
  className,
  ref,
}: XYPadProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [ripples, setRipples] = useState<Ripple[]>([])
  const rippleIdRef = useRef(0)
  const lastPositionRef = useRef({ x, y })
  const animationFrameRef = useRef<number | null>(null)
  const lastRippleTimeRef = useRef(0)

  // Theme-based colors
  const themeStyles = {
    default: {
      track: trackColor || "rgba(0,0,0,0.4)",
      thumb: thumbColor || "rgba(255,255,255,0.8)",
      ripple: "rgba(255,255,255,0.8)",
    },
    neon: {
      track: trackColor || "rgba(0,0,0,0.6)",
      thumb: thumbColor || "rgba(0,255,255,0.9)",
      ripple: "rgba(0,255,255,0.8)",
    },
    midnight: {
      track: trackColor || "rgba(10,10,30,0.6)",
      thumb: thumbColor || "rgba(147,112,219,0.9)",
      ripple: "rgba(147,112,219,0.8)",
    },
    sunset: {
      track: trackColor || "rgba(20,0,20,0.5)",
      thumb: thumbColor || "rgba(255,100,50,0.9)",
      ripple: "rgba(255,100,50,0.8)",
    },
    nightPurple: {
      track: trackColor || "rgba(25,10,40,0.7)",
      thumb: thumbColor || "rgba(180,130,230,0.9)",
      ripple: "rgba(140,80,220,0.8)",
    },
  }

  const currentTheme = themeStyles[theme]

  // Clamp values between 0 and 1
  const clamp = (value: number): number => Math.min(1, Math.max(0, value))

  // Snap value to grid if enabled
  const snapValue = (value: number, step: number): number => {
    return snapToGrid ? Math.round(value / step) * step : value
  }

  // Create a ripple effect - optimized with throttling
  const createRipple = useCallback(
    (clientX: number, clientY: number) => {
      if (!rippleEffect || !containerRef.current) return

      // Throttle ripple creation for performance (max 1 ripple per 50ms)
      const now = Date.now()
      if (now - lastRippleTimeRef.current < 50) return
      lastRippleTimeRef.current = now

      const rect = containerRef.current.getBoundingClientRect()
      const rippleX = (clientX - rect.left) / rect.width
      const rippleY = (clientY - rect.top) / rect.height

      if (rippleX < 0 || rippleX > 1 || rippleY < 0 || rippleY > 1) return

      const newRipple: Ripple = {
        id: rippleIdRef.current++,
        x: rippleX,
        y: rippleY,
        size: 0,
        opacity: 0.9, // Start with higher opacity
        timestamp: now,
      }

      setRipples((prev) => [...prev, newRipple])
    },
    [rippleEffect],
  )

  // Animate ripples - optimized for performance
  const animateRipples = useCallback(() => {
    setRipples((prev) => {
      // Moderate decay for ripples (about 20% of original length)
      return prev
        .map((ripple) => {
          const age = Date.now() - ripple.timestamp
          const lifetime = 800 // Ripple visible for 800ms
          if (age > lifetime) return null

          return {
            ...ripple,
            size: (age / lifetime) * (Math.min(width, height) * 0.75), // Max size relative to pad
            opacity: 0.9 * (1 - age / lifetime), // Linear fade
          }
        })
        .filter((r): r is Ripple => r !== null)
    })
    animationFrameRef.current = requestAnimationFrame(animateRipples)
  }, [width, height])

  // Start/stop ripple animation
  useEffect(() => {
    if (rippleEffect) {
      animationFrameRef.current = requestAnimationFrame(animateRipples)
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      setRipples([]) // Clear ripples if effect is turned off
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [rippleEffect, animateRipples])

  const handlePointerMove = useCallback(
    (event: React.PointerEvent | PointerEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const newX = clamp((event.clientX - rect.left) / rect.width)
      const newY = clamp((event.clientY - rect.top) / rect.height)

      const snappedX = snapValue(newX, stepX)
      const snappedY = snapValue(newY, stepY)

      if (lastPositionRef.current.x !== snappedX || lastPositionRef.current.y !== snappedY) {
        lastPositionRef.current = { x: snappedX, y: snappedY }
        onChange?.(snappedX, snappedY)
      }
    },
    [clamp, snapValue, stepX, stepY, onChange],
  )

  // Pointer down and move handler
  useEffect(() => {
    const currentRef = containerRef.current
    if (!currentRef || !isDragging) return

    const pointerMoveHandler = (event: PointerEvent) => {
      handlePointerMove(event)
    }

    const pointerUpHandler = () => {
      setIsDragging(false)
    }

    window.addEventListener("pointermove", pointerMoveHandler)
    window.addEventListener("pointerup", pointerUpHandler)

    return () => {
      window.removeEventListener("pointermove", pointerMoveHandler)
      window.removeEventListener("pointerup", pointerUpHandler)
    }
  }, [isDragging, handlePointerMove])

  // Handle keyboard navigation
  const handleKeyDown = (event: KeyboardEvent) => {
    let newX = x
    let newY = y
    switch (event.key) {
      case "ArrowUp":
        newY = clamp(y - stepY)
        break
      case "ArrowDown":
        newY = clamp(y + stepY)
        break
      case "ArrowLeft":
        newX = clamp(x - stepX)
        break
      case "ArrowRight":
        newX = clamp(x + stepX)
        break
      default:
        return
    }
    event.preventDefault()
    onChange?.(newX, newY)
  }

  // Cleanup animation frame
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Format values for accessibility - Fix the potential undefined error with default values
  const getAriaValueText = () => {
    const xValue = x !== undefined ? x : 0;
    const yValue = y !== undefined ? y : 0;
    return `X: ${xValue.toFixed(2)}, Y: ${yValue.toFixed(2)}`;
  }

  // Calculate grid size based on step values
  const gridSizeX = stepX * width
  const gridSizeY = stepY * height

  return (
    <div
      ref={containerRef}
      role="application"
      aria-label="X Y Pad"
      aria-valuetext={getAriaValueText()}
      tabIndex={0}
      className={cn(
        "relative select-none rounded-xl backdrop-blur-[12px] border border-white/10",
        "shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-all duration-200",
        "hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]",
        "focus:outline-none focus:shadow-[0_0_0_2px_rgba(255,255,255,0.3)]",
        "overflow-hidden touch-none",
        className,
      )}
      style={
        {
          width,
          height,
          "--thumb-x": x,
          "--thumb-y": y,
          "--track-color": currentTheme.track,
          "--thumb-color": currentTheme.thumb,
          "--ripple-color": currentTheme.ripple,
          "--glow-color": "rgba(255,255,255,0.3)",
          "--grid-opacity": showGrid ? 0.15 : 0,
        } as React.CSSProperties
      }
      onPointerDown={(e) => {
        e.preventDefault() // Prevent default to stop scrolling on mobile
        setIsDragging(true)
        handlePointerMove(e)
        createRipple(e.clientX, e.clientY)
      }}
      onKeyDown={handleKeyDown}
      onTouchStart={(e) => e.stopPropagation()} // Prevent touch events from propagating
      onTouchMove={(e) => e.stopPropagation()} // Prevent touch events from propagating
    >
      {/* Track area */}
      <div
        className="absolute inset-0 rounded-xl bg-[var(--track-color)] overflow-hidden"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              to right,
              rgba(255, 255, 255, var(--grid-opacity)) 0px,
              rgba(255, 255, 255, var(--grid-opacity)) 1px,
              transparent 1px,
              transparent ${gridSizeX}px
            ),
            repeating-linear-gradient(
              to bottom,
              rgba(255, 255, 255, var(--grid-opacity)) 0px,
              rgba(255, 255, 255, var(--grid-opacity)) 1px,
              transparent 1px,
              transparent ${gridSizeY}px
            )
          `,
        }}
      />

      {/* Ripple effects - enhanced to be more visible */}
      {rippleEffect &&
        ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              border: `2px solid var(--ripple-color)`, // Thicker border
              boxShadow: "0 0 8px rgba(255,255,255,0.3)", // Consistent white glow
              backgroundColor: "transparent", // No fill, just stroke
              left: `${ripple.x * 100}%`,
              top: `${ripple.y * 100}%`,
              width: `${ripple.size * 100}px`,
              height: `${ripple.size * 100}px`,
              opacity: ripple.opacity,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

      {/* Thumb indicator */}
      <div
        className={cn(
          "absolute w-4 h-4 rounded-full",
          isDragging ? "scale-110" : "scale-100",
          "transition-transform duration-100",
        )}
        style={{
          backgroundColor: "var(--thumb-color)",
          boxShadow: isDragging
            ? "0 0 20px rgba(255,255,255,0.3), 0 0 30px rgba(255,255,255,0.2)"
            : "0 0 10px rgba(255,255,255,0.3)",
          left: `calc(var(--thumb-x) * 100%)`,
          top: `calc(var(--thumb-y) * 100%)`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  )
}
