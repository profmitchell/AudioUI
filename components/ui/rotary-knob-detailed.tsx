"use client"

import type React from "react"

import { useRef, useState, useEffect, useCallback } from "react"

type ClassValue = string | number | boolean | undefined | null | Record<string, boolean | undefined | null>
const cn = (...inputs: ClassValue[]) => inputs.filter(Boolean).join(" ")

export interface RotaryKnobDetailedProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  size?: "sm" | "md" | "lg"
  color?: string
  className?: string
  lightX?: number
  lightY?: number
  metallic?: number
  sensitivity?: number
  showTicks?: boolean
  showIndicator?: boolean
  disabled?: boolean
  
  // Enhanced styling options
  baseColor?: string
  indicatorColor?: string
  tickColor?: string
  indicatorWidth?: number
  indicatorLength?: number
  tickSize?: number
  showValue?: boolean
  valueFormat?: (v: number) => string
  label?: string
  labelColor?: string
  valueColor?: string
  labelFontSize?: string
  valueFontSize?: string
  borderColor?: string
  borderStyle?: "none" | "thin" | "medium" | "thick"
  shadowIntensity?: "none" | "light" | "medium" | "strong"
  reflections?: boolean
  knobShape?: "circle" | "square" | "rounded" | "squircle"
  knobRatio?: number
  minAngle?: number
  maxAngle?: number
  glowOnActive?: boolean
  glowColor?: string
  tickFrequency?: number
  tickLabelFrequency?: number
  showTickLabels?: boolean
  useCustomColors?: boolean
}

export const RotaryKnobDetailed = ({
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0.01,
  size = "md",
  color,
  className,
  lightX = 75,
  lightY = 25,
  metallic = 50,
  sensitivity = 0.005,
  showTicks = true,
  showIndicator = true,
  disabled = false,
  baseColor,
  indicatorColor = "white",
  tickColor = "rgba(255,255,255,0.4)",
  indicatorWidth = 2,
  indicatorLength = 50,
  tickSize = 8,
  showValue = false,
  valueFormat = (v) => v.toFixed(2),
  label,
  labelColor,
  valueColor,
  labelFontSize = "0.875rem",
  valueFontSize = "0.875rem",
  borderColor,
  borderStyle = "none",
  shadowIntensity = "medium",
  reflections = true,
  knobShape = "circle",
  knobRatio = 60,
  minAngle = -135,
  maxAngle = 135,
  glowOnActive = true,
  glowColor = "rgba(255,255,255,0.15)",
  tickFrequency = 1,
  tickLabelFrequency = 5,
  showTickLabels = false,
  useCustomColors = false,
}: RotaryKnobDetailedProps) => {
  const knobRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const [startValue, setStartValue] = useState(0)
  const [lastAngle, setLastAngle] = useState(0)
  const [rotationSpeed, setRotationSpeed] = useState(0)
  const [isActive, setIsActive] = useState(false)

  const normalizedValue = (value - min) / (max - min)
  const totalRotation = maxAngle - minAngle
  const angle = normalizedValue * totalRotation + minAngle
  const metallicFactor = metallic / 100

  const specularSize = Math.max(10, 40 - metallicFactor * 25)
  const specularIntensity = 0.1 + metallicFactor * 0.5
  const specularFalloff = 1 + metallicFactor * 3
  const reflectionSharpness = metallicFactor * 0.8
  const reflectionIntensity = 0.05 + metallicFactor * 0.25
  const brushedEffectIntensity = Math.max(0.05, (1 - metallicFactor) * 0.2)
  const surfaceContrast = 0.3 + metallicFactor * 0.7
  const secondaryHighlightIntensity = metallicFactor * 0.3
  const fresnelIntensity = 0.1 + metallicFactor * 0.4
  const fresnelSize = 10 + metallicFactor * 15
  
  // Shadow intensity levels
  const shadowLevels = {
    none: "none",
    light: "0 0 10px rgba(0,0,0,0.3)",
    medium: "0 0 15px rgba(0,0,0,0.5)",
    strong: "0 0 20px rgba(0,0,0,0.8)"
  }
  
  // Border styles
  const borderStyles = {
    none: "none",
    thin: "1px solid",
    medium: "2px solid",
    thick: "3px solid"
  }
  
  // Inset ratio calculation for various shapes
  const knobSizeRatio = knobRatio / 100
  const knobInsetPct = `${(100 - knobRatio) / 2}%`;

  const sizeClasses = {
    sm: "w-20 h-20",
    md: "w-28 h-28",
    lg: "w-36 h-36",
  }
  
  // Shape radius
  const shapeRadius = {
    circle: "9999px",
    square: "0px",
    rounded: "0.75rem",
    squircle: "1.5rem",
  }

  const handleDragStart = useCallback(
    (clientY: number) => {
      if (disabled) return
      setIsDragging(true)
      setIsActive(true)
      setStartY(clientY)
      setStartValue(value)
      setLastAngle(angle)

      if (knobRef.current) {
        knobRef.current.style.transition = "none"
        const knobElements = knobRef.current.querySelectorAll("*")
        knobElements.forEach((el) => {
          if (el instanceof HTMLElement) {
            el.style.transition = "none"
          }
        })
      }
    },
    [value, angle, disabled],
  )

  const handleDrag = useCallback(
    (clientY: number) => {
      if (!isDragging || disabled) return

      const deltaY = startY - clientY
      let newValue = startValue + deltaY * sensitivity
      newValue = Math.max(min, Math.min(max, newValue))

      const newAngle = ((newValue - min) / (max - min)) * totalRotation + minAngle
      setLastAngle(newAngle)
      setRotationSpeed(0)

      newValue = Math.round(newValue / step) * step
      if (newValue !== value) {
        onChange(newValue)
      }
    },
    [isDragging, min, max, onChange, startValue, startY, step, value, lastAngle, sensitivity, disabled, totalRotation, minAngle],
  )

  const handleDragEnd = useCallback(() => {
    setIsDragging(false)

    if (knobRef.current) {
      knobRef.current.style.transition = ""
      const knobElements = knobRef.current.querySelectorAll("*")
      knobElements.forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.transition = ""
        }
      })
    }

    setRotationSpeed(0)
    setIsActive(false)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return
      let newValue = value

      switch (e.key) {
        case "ArrowUp":
        case "ArrowRight":
          newValue = Math.min(max, value + step)
          setIsActive(true)
          break
        case "ArrowDown":
        case "ArrowLeft":
          newValue = Math.max(min, value - step)
          setIsActive(true)
          break
        case "Home":
          newValue = min
          setIsActive(true)
          break
        case "End":
          newValue = max
          setIsActive(true)
          break
        default:
          return
      }

      if (newValue !== value) {
        e.preventDefault()
        onChange(newValue)
        setTimeout(() => setIsActive(false), 300)
      }
    },
    [max, min, onChange, step, value, disabled],
  )

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleDrag(e.clientY)
    const handleMouseUp = () => handleDragEnd()
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) handleDrag(e.touches[0].clientY)
    }
    const handleTouchEnd = () => handleDragEnd()

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.addEventListener("touchmove", handleTouchMove, { passive: false })
      document.addEventListener("touchend", handleTouchEnd)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isDragging, handleDrag, handleDragEnd])

  useEffect(() => {
    const preventScroll = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault()
      }
    }
    document.addEventListener("touchmove", preventScroll, { passive: false })
    return () => {
      document.removeEventListener("touchmove", preventScroll)
    }
  }, [isDragging])

  const shadowX = 100 - lightX
  const shadowY = 100 - lightY
  const lightAngleRad = Math.atan2(lightY - 50, lightX - 50)
  const lightAngleDeg = (lightAngleRad * 180) / Math.PI
  const dynamicReflectionOffset = isDragging ? 0 : rotationSpeed * metallicFactor * 0.5
  const distanceFromCenter = Math.sqrt(Math.pow(lightX - 50, 2) + Math.pow(lightY - 50, 2)) / 50
  const incidenceFactor = 1 - Math.min(0.7, distanceFromCenter * 0.7)
  const adjustedSpecularIntensity = specularIntensity * incidenceFactor

  return (
    <div className="flex flex-col items-center gap-2">
      {label && (
        <span style={{
          color: useCustomColors && labelColor ? labelColor : "inherit",
          fontSize: labelFontSize,
        }}>
          {label}
        </span>
      )}
      
      <div
        ref={knobRef}
        className={cn(
          "relative aspect-square",
          "backdrop-blur-[12px]",
          "select-none touch-none",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-grab active:cursor-grabbing",
          sizeClasses[size],
          className,
        )}
        style={
          {
            "--highlight-x": `${lightX}%`,
            "--highlight-y": `${lightY}%`,
            "--shadow-x": `${shadowX}%`,
            "--shadow-y": `${shadowY}%`,
            "--light-angle": `${lightAngleDeg}deg`,
            "--metallic": `${metallic}%`,
            "--specular-size": `${specularSize}%`,
            "--specular-intensity": adjustedSpecularIntensity,
            "--specular-falloff": specularFalloff,
            "--reflection-sharpness": reflectionSharpness,
            "--reflection-intensity": reflectionIntensity,
            "--brushed-effect": brushedEffectIntensity,
            "--surface-contrast": surfaceContrast,
            "--secondary-highlight": secondaryHighlightIntensity,
            "--fresnel-intensity": fresnelIntensity,
            "--fresnel-size": `${fresnelSize}%`,
            "--dynamic-offset": `${dynamicReflectionOffset}deg`,
            "--active-glow": isActive && glowOnActive ? "0.15" : "0",
            "--knob-color": color ? `var(--${color})` : "rgba(255, 255, 255, 0.1)",
            backgroundColor: useCustomColors && baseColor ? baseColor : undefined,
            borderRadius: shapeRadius[knobShape],
            boxShadow: shadowLevels[shadowIntensity],
            border: borderStyle !== "none" ? borderStyles[borderStyle] : "none",
            borderColor: useCustomColors && borderColor ? borderColor : "rgba(255, 255, 255, 0.05)",
          } as React.CSSProperties
        }
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={label || "Rotary control"}
        aria-disabled={disabled}
        onKeyDown={handleKeyDown}
        onMouseDown={(e) => handleDragStart(e.clientY)}
        onTouchStart={(e) => {
          if (e.touches[0]) handleDragStart(e.touches[0].clientY)
        }}
      >
        <div className="absolute inset-[-5%] rounded-full bg-gradient-to-b from-zinc-800 to-zinc-900 shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-zinc-800/90 to-black/90 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]" />
        <div className="absolute inset-[15%] rounded-full bg-black/80 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8),_0_1px_1px_rgba(255,255,255,0.05)]" />

        <div
          className="absolute inset-[20%] rounded-full overflow-hidden"
          style={{
            transform: `rotate(${angle}deg)`,
            transition: isDragging ? "none" : "transform 0.1s ease-out",
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `
                radial-gradient(circle at 50% 50%, 
                  rgba(${60 + metallic * 0.4}, ${60 + metallic * 0.4}, ${60 + metallic * 0.4}, 1) 0%, 
                  rgba(${40 + metallic * 0.3}, ${40 + metallic * 0.3}, ${40 + metallic * 0.3}, 1) 40%,
                  rgba(${30 + metallic * 0.2}, ${30 + metallic * 0.2}, ${30 + metallic * 0.2}, 1) 70%,
                  rgba(${20 + metallic * 0.1}, ${20 + metallic * 0.1}, ${20 + metallic * 0.1}, 1) 100%
                ),
                repeating-radial-gradient(
                  circle at center,
                  rgba(${80 + metallic * 0.5}, ${80 + metallic * 0.5}, ${80 + metallic * 0.5}, ${brushedEffectIntensity}) 0px,
                  rgba(${50 + metallic * 0.3}, ${50 + metallic * 0.3}, ${50 + metallic * 0.3}, ${brushedEffectIntensity}) 1px,
                  rgba(${70 + metallic * 0.4}, ${70 + metallic * 0.4}, ${70 + metallic * 0.4}, ${brushedEffectIntensity}) 2px,
                  rgba(${50 + metallic * 0.3}, ${50 + metallic * 0.3}, ${50 + metallic * 0.3}, ${brushedEffectIntensity}) 3px,
                  rgba(${80 + metallic * 0.5}, ${80 + metallic * 0.5}, ${80 + metallic * 0.5}, ${brushedEffectIntensity}) 4px
                ),
                repeating-conic-gradient(
                  rgba(${100 + metallic * 0.6}, ${100 + metallic * 0.6}, ${100 + metallic * 0.6}, ${reflectionIntensity}) 0deg 1deg,
                  rgba(${40 + metallic * 0.2}, ${40 + metallic * 0.2}, ${40 + metallic * 0.2}, ${reflectionIntensity}) 3deg 4deg
                )
              `,
              boxShadow: `inset 0 0 ${20 + metallic * 0.3}px rgba(0, 0, 0, ${0.7 - metallicFactor * 0.3})`,
              transition: isDragging ? "none" : "all 0.1s ease-out",
            }}
          >
            {showIndicator && (
              <div
                className="absolute top-0 left-1/2 w-[2px] h-[50%] bg-white rounded-full"
                style={{
                  boxShadow: `0 0 ${5 + metallicFactor * 5}px rgba(255, 255, 255, ${0.5 + metallicFactor * 0.3})`,
                  transform: "translateX(-50%)",
                  transition: isDragging ? "none" : "all 0.1s ease-out",
                }}
              />
            )}
          </div>
        </div>

        <div
          className="absolute inset-[46%] rounded-full bg-black/80 border border-white/5"
          style={{
            boxShadow: `inset 0 1px 2px rgba(0, 0, 0, 0.8), 0 0 ${metallicFactor * 3}px rgba(255, 255, 255, ${metallicFactor * 0.1})`,
            transition: isDragging ? "none" : "all 0.1s ease-out",
          }}
        />

        <div
          className="absolute inset-[20%] rounded-full pointer-events-none"
          style={{
            background: `
              radial-gradient(
                circle at var(--highlight-x) var(--highlight-y),
                rgba(255, 255, 255, ${adjustedSpecularIntensity}) 0%,
                rgba(255, 255, 255, ${adjustedSpecularIntensity / specularFalloff}) ${specularSize * 0.5}%,
                transparent ${specularSize}%
              )
            `,
            boxShadow: `inset 0 0 ${15 + metallicFactor * 10}px rgba(0, 0, 0, ${0.5 - metallicFactor * 0.2})`,
            transition: isDragging ? "none" : "all 0.1s ease-out",
          }}
        />

        <div
          className="absolute inset-[20%] rounded-full pointer-events-none"
          style={{
            opacity: secondaryHighlightIntensity,
            background: `
              radial-gradient(
                ellipse at ${lightX > 50 ? "100%" : "0%"} ${lightY > 50 ? "100%" : "0%"},
                rgba(255, 255, 255, 0.3) 0%,
                rgba(255, 255, 255, 0.1) 30%,
                transparent 70%
              )
            `,
            transition: isDragging ? "none" : "all 0.1s ease-out",
          }}
        />

        <div
          className="absolute inset-[20%] rounded-full pointer-events-none"
          style={{
            background: `
              radial-gradient(
                circle at var(--shadow-x) var(--shadow-y),
                rgba(0, 0, 0, ${0.4 + metallicFactor * 0.2}) 0%,
                rgba(0, 0, 0, ${0.2 + metallicFactor * 0.1}) 40%,
                transparent 70%
              )
            `,
            transition: isDragging ? "none" : "all 0.1s ease-out",
          }}
        />

        <div
          className="absolute inset-[20%] rounded-full pointer-events-none overflow-hidden"
          style={{
            background: `
              radial-gradient(
                circle at 50% 50%,
                transparent ${100 - fresnelSize}%,
                rgba(255, 255, 255, ${fresnelIntensity}) 100%
              )
            `,
            transition: isDragging ? "none" : "all 0.1s ease-out",
          }}
        />

        <div
          className="absolute inset-[20%] rounded-full pointer-events-none overflow-hidden"
          style={{
            opacity: metallicFactor,
            background: `
              linear-gradient(
                ${lightAngleDeg + dynamicReflectionOffset}deg,
                transparent 0%,
                rgba(255, 255, 255, 0.1) 45%,
                rgba(255, 255, 255, 0.3) 50%,
                rgba(255, 255, 255, 0.1) 55%,
                transparent 100%
              )
            `,
            transition: isDragging ? "none" : "all 0.1s ease-out",
          }}
        />

        <div
          className="absolute inset-[20%] rounded-full pointer-events-none transition-opacity duration-300"
          style={{
            boxShadow: `0 0 15px rgba(255, 255, 255, var(--active-glow))`,
            opacity: isActive ? 1 : 0,
            transition: isDragging ? "none" : "opacity 0.3s ease-out",
          }}
        />

        <div
          className="absolute inset-0 rounded-full pointer-events-none border border-white/5"
          style={{
            opacity: 0.5 + metallicFactor * 0.3,
            transition: isDragging ? "none" : "all 0.1s ease-out",
          }}
        />

        <div className="absolute inset-[-2%] -z-10 rounded-full bg-gradient-to-b from-zinc-900 to-black shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />

        {showTicks && (
          <div className="absolute inset-0 overflow-hidden z-10">
            <div className="absolute inset-[-5%] bottom-[-10%] rounded-full">
              <div
                className="absolute left-1/2 bottom-[5%] w-[110%] h-[110%] -translate-x-1/2"
                style={{
                  clipPath: "polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%)",
                }}
              >
                {Array.from({ length: 60 }).map((_, i) => {
                  if (i < 15 || i >= 45) return null
                  const isLarge = i % 10 === 0
                  const isMedium = i % 5 === 0 && !isLarge
                  return (
                    <div
                      key={i}
                      className={cn(
                        "absolute origin-top",
                        isLarge
                          ? "w-[3px] h-[16px] bg-white/70"
                          : isMedium
                            ? "w-[2.5px] h-[12px] bg-white/50"
                            : "w-[2px] h-[8px] bg-white/40",
                      )}
                      style={{
                        left: "50%",
                        top: "0%",
                        transform: `translateX(-50%) rotate(${i * 6}deg)`,
                        transformOrigin: "center bottom",
                        transition: isDragging ? "none" : "all 0.1s ease-out",
                      }}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {showValue && (
        <span style={{
          color: useCustomColors && valueColor ? valueColor : "inherit",
          fontSize: valueFontSize,
        }}>
          {valueFormat(value)}
        </span>
      )}
    </div>
  )
}
