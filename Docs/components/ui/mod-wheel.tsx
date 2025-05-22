"use client"

import * as React from "react"
import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export interface ModWheelProps extends React.HTMLAttributes<HTMLDivElement> {
  spring?: boolean
  onChange?: (value: number) => void
  onRelease?: (value: number) => void
  restPosition?: "center" | "bottom"
  min?: number
  max?: number
  snapStrength?: number
  disabled?: boolean
  label?: React.ReactNode
}

const ModWheel = React.forwardRef<HTMLDivElement, ModWheelProps>(
  (
    {
      spring = false,
      onChange,
      onRelease,
      restPosition = "bottom",
      min = 0,
      max = 1,
      snapStrength = 0.8,
      className,
      disabled = false,
      label = "Mod Wheel",
      ...props
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const mergedRef = React.useMemo(
      () =>
        ref
          ? (node: HTMLDivElement) => {
              if (typeof ref === "function") ref(node)
              else if (ref) ref.current = node
              containerRef.current = node
            }
          : containerRef,
      [ref],
    )

    const [isDragging, setIsDragging] = useState(false)
    const [value, setValue] = useState(restPosition === "center" ? 0 : min)
    const [position, setPosition] = useState(restPosition === "center" ? 50 : 100)
    const [tilt, setTilt] = useState(0)

    const restPositionPercent = restPosition === "center" ? 50 : 100

    const handleMove = (clientY: number) => {
      if (!containerRef.current || disabled) return

      const rect = containerRef.current.getBoundingClientRect()
      const containerHeight = rect.height
      const relativeY = clientY - rect.top

      const newPosition = Math.max(0, Math.min(100, (relativeY / containerHeight) * 100))

      const range = max - min
      const normalizedValue = min + range * (1 - newPosition / 100)

      const tiltAmount = (newPosition / 100 - 0.5) * 5
      setTilt(tiltAmount)

      setValue(normalizedValue)
      setPosition(newPosition)
      onChange?.(normalizedValue)
    }

    const handleMouseDown = (e: React.MouseEvent) => {
      if (disabled) return
      setIsDragging(true)
      handleMove(e.clientY)
      e.preventDefault()
    }

    const handleTouchStart = (e: React.TouchEvent) => {
      if (disabled) return
      setIsDragging(true)
      handleMove(e.touches[0].clientY)
    }

    const handleRelease = () => {
      if (!isDragging) return

      setIsDragging(false)
      onRelease?.(value)

      if (spring) {
        const animateSpring = () => {
          setPosition((prev) => {
            const diff = restPositionPercent - prev
            const step = diff * snapStrength

            const newPosition = prev + step

            const range = max - min
            const normalizedValue = min + range * (1 - newPosition / 100)
            setValue(normalizedValue)

            setTilt((prev) => prev * 0.8)

            if (Math.abs(diff) < 0.1) {
              setPosition(restPositionPercent)
              setValue(restPosition === "center" ? 0 : min)
              setTilt(0)
              return restPositionPercent
            }

            requestAnimationFrame(animateSpring)
            return newPosition
          })
        }

        requestAnimationFrame(animateSpring)
      }
    }

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) handleMove(e.clientY)
      }

      const handleTouchMove = (e: TouchEvent) => {
        if (isDragging && e.touches[0]) handleMove(e.touches[0].clientY)
      }

      const handleMouseUp = () => handleRelease()
      const handleTouchEnd = () => handleRelease()

      if (isDragging) {
        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("touchmove", handleTouchMove)
        window.addEventListener("mouseup", handleMouseUp)
        window.addEventListener("touchend", handleTouchEnd)
      }

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("touchmove", handleTouchMove)
        window.removeEventListener("mouseup", handleMouseUp)
        window.removeEventListener("touchend", handleTouchEnd)
      }
    }, [isDragging])

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return

      const step = 5

      switch (e.key) {
        case "ArrowUp":
          setPosition((prev) => Math.max(0, prev - step))
          break
        case "ArrowDown":
          setPosition((prev) => Math.min(100, prev + step))
          break
        case " ":
          setPosition(restPositionPercent)
          setValue(restPosition === "center" ? 0 : min)
          break
        default:
          return
      }

      const range = max - min
      const normalizedValue = min + range * (1 - position / 100)
      setValue(normalizedValue)
      onChange?.(normalizedValue)
      e.preventDefault()
    }

    return (
      <div className="flex flex-col items-center" {...props}>
        <div
          className={cn(
            "relative h-40 w-10 rounded-full backdrop-blur-md bg-black/40 border border-white/10",
            "shadow-[0_0_15px_rgba(255,255,255,0.1)] overflow-hidden",
            disabled && "opacity-50 cursor-not-allowed",
            className,
          )}
          ref={mergedRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={handleKeyDown}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-disabled={disabled}
        >
          <motion.div
            className={cn(
              "absolute w-10 h-6 left-0 rounded-full bg-white/20 backdrop-blur-lg",
              "border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.05)]",
              "hover:bg-white/30 active:bg-white/40 transition-colors",
              "cursor-ns-resize select-none",
              isDragging && "shadow-[0_0_15px_rgba(255,255,255,0.2)] bg-white/30",
            )}
            style={{
              top: `calc(${position}% - 12px)`,
              transform: `rotateX(${tilt}deg)`,
              boxShadow: isDragging
                ? "0 0 15px rgba(255,255,255,0.2), inset 0 0 15px rgba(255,255,255,0.05)"
                : "0 0 10px rgba(255,255,255,0.05), inset 0 0 15px rgba(255,255,255,0.05)",
            }}
          />
        </div>
        {label && (
          <div className="mt-4 text-center">
            <h3 className="text-white tracking-wide text-sm font-light">{label}</h3>
          </div>
        )}
      </div>
    )
  },
)
ModWheel.displayName = "ModWheel"

export { ModWheel }
