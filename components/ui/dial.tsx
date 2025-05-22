/* -------------------------------------------------------------------------- */
/* dial.tsx – self-contained VST-style knob (12 o'clock @ 50 %)              */
/* -------------------------------------------------------------------------- */
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { START_ANGLE, ROTATION_RANGE, angleFromValue } from "./dial/constants"

/* -------------------------------------------------------------------------- */
/* 1. Variant system                                                           */
/* -------------------------------------------------------------------------- */
const dialVariants = cva("relative select-none rounded-full transition-all duration-200", {
  variants: {
    variant: {
      default: "bg-secondary shadow-glass-outer",
      metallic: "bg-gradient-to-b from-zinc-700 to-zinc-800 shadow-glass-outer",
      flat: "bg-secondary border border-border",
      glass: "bg-black/40 backdrop-blur-md border border-white/10 shadow-glass-outer",
      custom: "", // Empty variant for fully custom styling
    },
    size: {
      xxs: "w-10 h-10",
      xs: "w-12 h-12",
      sm: "w-16 h-16",
      md: "w-24 h-24",
      lg: "w-32 h-32",
      xl: "w-40 h-40",
      xxl: "w-48 h-48",
    },
    shape: {
      circle: "rounded-full",
      square: "rounded-none",
      rounded: "rounded-lg",
      squircle: "rounded-2xl",
      hexagon: "rounded-none",
      octagon: "rounded-none",
    },
    indicatorStyle: { line: "", dot: "", glow: "", notch: "", triangle: "" },
    borderStyle: {
      none: "border-0",
      thin: "border border-border",
      medium: "border-2",
      thick: "border-4",
      inner: "ring-inset ring-2",
      double: "ring-2 border",
    },
    shadowStyle: {
      none: "",
      soft: "shadow-sm",
      medium: "shadow",
      hard: "shadow-md",
      inner: "shadow-inner",
      glass: "shadow-glass-outer",
      glow: "shadow-glow",
    },
  },
  defaultVariants: { 
    variant: "default", 
    size: "md", 
    indicatorStyle: "line",
    shape: "circle",
    borderStyle: "none",
    shadowStyle: "none",
  },
})

/* -------------------------------------------------------------------------- */
/* 2. Props                                                                    */
/* -------------------------------------------------------------------------- */
export interface DialProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>, VariantProps<typeof dialVariants> {
  value?: number
  min?: number
  max?: number
  step?: number
  defaultValue?: number
  onChange?: (v: number) => void
  onValueCommit?: (v: number) => void
  disabled?: boolean
  showValue?: boolean
  valueFormat?: (v: number) => string
  label?: string
  tickMarks?: number
  tickValues?: number[]
  
  // Enhanced color customization
  dialColor?: string
  knobColor?: string
  glowColor?: string
  indicatorColor?: string
  trackColor?: string
  trackGlowColor?: string
  borderColor?: string
  shadowColor?: string
  labelColor?: string
  valueColor?: string
  tickColor?: string
  
  // Enhanced shape and style customization
  knobVariant?: "default" | "metallic" | "brushed" | "inset" | "flat" | "glass" | "custom"
  knobSize?: number // Size as percentage of dial (20-90)
  knobShape?: "circle" | "square" | "rounded" | "squircle" | "hexagon" | "octagon"
  indicatorSize?: number
  indicatorLength?: number
  tickSize?: number
  tickWidth?: number
  
  // Typography customization
  labelFontSize?: string
  valueFontSize?: string
  labelFontWeight?: string
  valueFontWeight?: string
  
  // Additional customization
  rotationRange?: number // usually 300‒330
  startAngle?: number
  graduatedDial?: boolean
  useCustomColors?: boolean
}

/* -------------------------------------------------------------------------- */
/* 3. Dial component                                                           */
/* -------------------------------------------------------------------------- */
export const Dial = React.forwardRef<HTMLDivElement, DialProps>(
  (
    {
      /* visual props */
      className,
      variant,
      size,
      shape,
      indicatorStyle,
      borderStyle,
      shadowStyle,
      
      /* enhanced color customization */
      dialColor,
      knobColor,
      glowColor = "rgba(255,255,255,0.2)",
      indicatorColor = "white",
      trackColor = "rgba(255,255,255,0.1)",
      trackGlowColor,
      borderColor,
      shadowColor,
      labelColor,
      valueColor,
      tickColor = "rgba(255,255,255,0.3)",
      
      /* enhanced shape/style customization */
      knobVariant = "default",
      knobSize = 60, // default to 60% of dial
      knobShape = "circle",
      indicatorSize = 2,
      indicatorLength = 40,
      tickSize = 8,
      tickWidth = 2,
      
      /* typography */
      labelFontSize = "0.875rem",
      valueFontSize = "0.875rem",
      labelFontWeight = "medium",
      valueFontWeight = "medium",
      
      /* additional customization */
      rotationRange = ROTATION_RANGE, // Use the constant as default
      startAngle = START_ANGLE,
      graduatedDial = false,
      useCustomColors = false,

      /* value props */
      value,
      min = 0,
      max = 100,
      step = 1,
      defaultValue,
      onChange,
      onValueCommit,
      disabled = false,
      showValue = false,
      valueFormat = (v: number) => v.toString(),

      /* extras */
      label,
      tickMarks = 0,
      tickValues = [],

      /* rest */
      ...props
    },
    ref,
  ) => {
    /* --------------------------- internal state --------------------------- */
    const [local, setLocal] = React.useState(value !== undefined ? value : (defaultValue ?? min))
    React.useEffect(() => {
      if (value !== undefined) setLocal(value)
    }, [value])

    /* --------------------------- derived values --------------------------- */
    const norm = React.useMemo(() => (local - min) / (max - min || 1), [local, min, max])

    /* Use the helper function for rotation calculation with custom angles if provided */
    const rotation = startAngle !== START_ANGLE || rotationRange !== ROTATION_RANGE
      ? startAngle + norm * rotationRange
      : angleFromValue(norm)

    /* --------------------------- dragging logic --------------------------- */
    const dragRef = React.useRef<number | null>(null)
    const valRef = React.useRef<number>(local)

    const beginDrag = (clientY: number) => {
      dragRef.current = clientY
      valRef.current = local
    }

    const updateDrag = (clientY: number) => {
      if (dragRef.current == null) return
      const dy = dragRef.current - clientY
      const delta = (dy / 200) * (max - min)
      let next = Math.round((valRef.current + delta) / step) * step
      next = Math.max(min, Math.min(max, next))
      setLocal(next)
      onChange?.(next)
    }

    const endDrag = () => {
      dragRef.current = null
      onValueCommit?.(local)
    }

    /* --------------------------- event handlers -------------------------- */
    const onMouseDown = (e: React.MouseEvent) => {
      if (disabled) return
      e.preventDefault()
      beginDrag(e.clientY)
      window.addEventListener("mousemove", onMouseMove)
      window.addEventListener("mouseup", onMouseUp)
    }
    const onMouseMove = (e: MouseEvent) => updateDrag(e.clientY)
    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
      endDrag()
    }

    const onTouchStart = (e: React.TouchEvent) => {
      if (disabled) return
      const y = e.touches[0]?.clientY
      if (y == null) return
      beginDrag(y)
      window.addEventListener("touchmove", onTouchMove, { passive: false })
      window.addEventListener("touchend", onTouchEnd)
    }
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      updateDrag(e.touches[0]?.clientY ?? 0)
    }
    const onTouchEnd = () => {
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", onTouchEnd)
      endDrag()
    }

    /* --------------------------- tick marks ------------------------------ */
    const ticks = React.useMemo(() => {
      const out: { rotation: number; value: number }[] = []
      const add = (v: number) => {
        const n = (v - min) / (max - min || 1)
        const tickRotation = startAngle !== START_ANGLE || rotationRange !== ROTATION_RANGE
          ? startAngle + n * rotationRange
          : angleFromValue(n)
        out.push({ value: v, rotation: tickRotation })
      }
      if (tickValues.length) tickValues.forEach(add)
      else if (tickMarks) {
        for (let i = 0; i <= tickMarks; i++) add(min + ((max - min) * i) / tickMarks)
      }
      return out
    }, [min, max, tickMarks, tickValues, startAngle, rotationRange])

    /* --------------------------- helper sub-components ------------------- */
    const DialTrack = () => {
      const radius = 45
      const toXY = (deg: number) => {
        const rad = (deg * Math.PI) / 180
        return [50 + radius * Math.cos(rad), 50 + radius * Math.sin(rad)]
      }

      // Use provided angles or constants
      const actualStartAngle = startAngle !== START_ANGLE ? startAngle : START_ANGLE
      const actualRotationRange = rotationRange !== ROTATION_RANGE ? rotationRange : ROTATION_RANGE
      
      const [sx, sy] = toXY(actualStartAngle)
      const [ex, ey] = toXY(actualStartAngle + actualRotationRange)
      
      // For value position, use the calculated rotation value
      const valRotation = actualStartAngle + norm * actualRotationRange
      const [fx, fy] = toXY(valRotation)

      const bgArcLarge = actualRotationRange > 180 ? 1 : 0
      const valLarge = norm * actualRotationRange > 180 ? 1 : 0

      // Generate graduated marks for the track if enabled
      const graduationMarks = graduatedDial && tickMarks ? Array.from({ length: tickMarks + 1 }, (_, i) => {
        const n = i / tickMarks
        const deg = actualStartAngle + n * actualRotationRange
        const [x, y] = toXY(deg)
        return { x, y, major: i % Math.ceil(tickMarks / 5) === 0 }
      }) : []

      return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          {/* background */}
          <path
            d={`M ${sx} ${sy} A ${radius} ${radius} 0 ${bgArcLarge} 1 ${ex} ${ey}`}
            stroke={useCustomColors ? trackColor : trackColor}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          
          {/* value */}
          {norm > 0 && (
            <path
              d={`M ${sx} ${sy} A ${radius} ${radius} 0 ${valLarge} 1 ${fx} ${fy}`}
              stroke={useCustomColors ? trackGlowColor || glowColor : trackGlowColor || glowColor}
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              className={trackGlowColor ? "filter drop-shadow-md" : ""}
            />
          )}
          
          {/* graduated marks */}
          {graduatedDial && graduationMarks.map((mark, i) => (
            <circle
              key={i}
              cx={mark.x}
              cy={mark.y}
              r={mark.major ? 1.5 : 1}
              fill={useCustomColors ? tickColor : "currentColor"}
              className={!useCustomColors ? "text-white/30" : ""}
            />
          ))}
        </svg>
      )
    }

    // Helper to get the shape path for non-circular shapes
    const getShapePath = (shape: string) => {
      if (shape === 'hexagon') {
        return "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)"
      }
      if (shape === 'octagon') {
        return "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"
      }
      return undefined
    }

    const DialKnob = () => {
      // Adjust indicator rotation so 0 means 12 o'clock
      const knobRotation = rotation + 90

      // Get shape-specific styles
      const shapeStyles = knobShape !== 'circle' ? { 
        clipPath: getShapePath(knobShape),
        borderRadius: knobShape === 'square' ? '0' : 
                     knobShape === 'rounded' ? '0.5rem' : 
                     knobShape === 'squircle' ? '1rem' : undefined
      } : {}

      return (
        <div
          className={cn(
            "absolute rounded-full",
            knobShape === 'circle' && "rounded-full",
            knobShape === 'square' && "rounded-none",
            knobShape === 'rounded' && "rounded-lg",
            knobShape === 'squircle' && "rounded-2xl",
          )}
          style={{ 
            inset: `${(100 - knobSize) / 2}%`,
            transform: `rotate(${knobRotation}deg)`,
            background: useCustomColors && knobColor ? knobColor : 
                        knobVariant === "metallic" ? "linear-gradient(to bottom, #d4d4d8, #3f3f46)" :
                        knobVariant === "brushed" ? "linear-gradient(to bottom, #a1a1aa, #52525b)" :
                        knobVariant === "inset" ? "#00000080" :
                        knobVariant === "flat" ? "#27272a" :
                        knobVariant === "glass" ? "rgba(0,0,0,0.3)" :
                        "#27272a",
            boxShadow: knobVariant === "inset" ? "inset 0 2px 4px rgba(0,0,0,0.3)" :
                       knobVariant === "glass" ? "0 4px 12px rgba(0,0,0,0.5)" : 
                       undefined,
            backdropFilter: knobVariant === "glass" ? "blur(4px)" : undefined,
            ...shapeStyles
          }}
        >
          {/* indicator line / dot */}
          {indicatorStyle === "line" && (
            <div
              className="absolute"
              style={{
                background: useCustomColors ? indicatorColor : indicatorColor,
                width: `${indicatorSize}px`,
                height: `${indicatorLength}%`,
                top: "10%",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            />
          )}
          {indicatorStyle === "dot" && (
            <div
              className="absolute rounded-full"
              style={{
                background: useCustomColors ? indicatorColor : indicatorColor,
                width: `${indicatorSize * 4}px`,
                height: `${indicatorSize * 4}px`,
                top: "15%",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            />
          )}
          {indicatorStyle === "notch" && (
            <div
              className="absolute"
              style={{
                background: useCustomColors ? indicatorColor : indicatorColor,
                width: `${indicatorSize * 3}px`,
                height: `${indicatorSize * 2}px`,
                top: "5%",
                left: "50%",
                transform: "translateX(-50%)",
                borderRadius: `0 0 ${indicatorSize}px ${indicatorSize}px`,
              }}
            />
          )}
          {indicatorStyle === "triangle" && (
            <div
              className="absolute"
              style={{
                width: 0,
                height: 0,
                borderLeft: `${indicatorSize * 2}px solid transparent`,
                borderRight: `${indicatorSize * 2}px solid transparent`,
                borderBottom: `${indicatorSize * 4}px solid ${useCustomColors ? indicatorColor : indicatorColor}`,
                top: "10%",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            />
          )}
        </div>
      )
    }

    /* --------------------------- render ---------------------------------- */
    return (
      <div className="flex flex-col items-center gap-2" ref={ref} {...props}>
        {label && (
          <span 
            className={cn("text-sm font-medium text-foreground/80")}
            style={{
              color: useCustomColors && labelColor ? labelColor : undefined,
              fontSize: labelFontSize,
              fontWeight: labelFontWeight,
            }}
          >
            {label}
          </span>
        )}

        <div
          className={cn(dialVariants({ variant, size, indicatorStyle, shape, borderStyle, shadowStyle }), className)}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          style={{
            cursor: disabled ? "not-allowed" : "grab",
            opacity: disabled ? 0.5 : 1,
            background: useCustomColors && dialColor ? dialColor : undefined,
            borderColor: useCustomColors && borderColor ? borderColor : undefined,
            boxShadow: useCustomColors && shadowColor ? `0 4px 12px ${shadowColor}` : undefined,
          }}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={local}
          aria-label={label}
        >
          <DialTrack />

          {/* tick marks */}
          {ticks.map((t, i) => (
            <div
              key={i}
              className="absolute bg-white/30"
              style={{
                width: `${tickWidth}px`,
                height: `${tickSize}px`,
                top: "10%",
                left: "calc(50% - 1px)",
                transformOrigin: "bottom center",
                transform: `rotate(${t.rotation}deg) translateY(-100%)`,
                backgroundColor: useCustomColors && tickColor ? tickColor : undefined,
              }}
            />
          ))}

          <DialKnob />

          {/* glow ring for "glow" style */}
          {indicatorStyle === "glow" && (
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: `conic-gradient(${useCustomColors ? glowColor : glowColor} 0deg, ${
                  useCustomColors ? glowColor : glowColor
                } ${norm * rotationRange}deg, transparent ${norm * rotationRange}deg 360deg)`,
                mask: `radial-gradient(transparent ${100 - knobSize - 10}%, black ${100 - knobSize}%)`,
                WebkitMask: `radial-gradient(transparent ${100 - knobSize - 10}%, black ${100 - knobSize}%)`,
                filter: "blur(4px)",
                transform: `rotate(${startAngle + 90}deg)`,
                opacity: 0.7,
              }}
            />
          )}
        </div>

        {showValue && (
          <span 
            className="text-sm font-medium text-foreground/80 mt-1"
            style={{
              color: useCustomColors && valueColor ? valueColor : undefined,
              fontSize: valueFontSize,
              fontWeight: valueFontWeight,
            }}
          >
            {valueFormat(local)}
          </span>
        )}
      </div>
    )
  },
)

Dial.displayName = "Dial"
