"use client"

import * as React from "react"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export type AnimationStyle = "instant" | "fade" | "radial" | "top-down" | "bottom-up" | "left-right" | "right-left"
export type MPEMode = "none" | "aftertouch" | "pitchbend" | "timbre" | "full"
export type MidiOutputMode = "none" | "web-midi" | "mpe" | "virtual"

export interface MidiPadProps extends React.HTMLAttributes<HTMLButtonElement> {
  label?: string
  subLabel?: string
  note?: number
  channel?: number
  velocity?: number
  disabled?: boolean
  size?: "sm" | "md" | "lg" | "xl" | "xxl"
  radius?: "none" | "sm" | "md" | "lg" | "full"
  ledColor?: string
  use1DVelocity?: boolean
  invert1DVelocity?: boolean
  useTemperatureColor?: boolean
  animationStyle?: AnimationStyle
  animationDuration?: number
  mpeMode?: MPEMode
  mpeSensitivity?: number
  longPressDuration?: number
  ledClassName?: string
  padClassName?: string
  isForcePressed?: boolean
  midiOutput?: MidiOutputMode
  midiOutputId?: string
  onPadDown?: (note: number, velocity: number, channel: number, mpeData?: MPEData) => void
  onPadUp?: (note: number, velocity: number, channel: number, mpeData?: MPEData) => void
  onPadTrigger?: (note: number, velocity: number, channel: number, mpeData?: MPEData) => void
  onMPEChange?: (note: number, mpeData: MPEData) => void
}

export interface MPEData {
  aftertouch?: number
  pitchBend?: number
  timbre?: number
  pressure?: number
  x?: number
  y?: number
}

export interface MidiDeviceInfo {
  id: string
  name: string
  manufacturer: string
  type: "input" | "output"
}

interface MidiContextType {
  outputs: MidiDeviceInfo[]
  inputs: MidiDeviceInfo[]
  isSupported: boolean
  isEnabled: boolean
  requestMidiAccess: () => Promise<boolean>
  sendNoteOn: (note: number, velocity: number, channel: number) => void
  sendNoteOff: (note: number, velocity: number, channel: number) => void
  sendAftertouch: (note: number, pressure: number, channel: number) => void
  sendChannelAftertouch: (pressure: number, channel: number) => void
  sendPitchBend: (value: number, channel: number) => void
  sendControlChange: (controller: number, value: number, channel: number) => void
  setActiveOutput: (deviceId: string | null) => void
}

export const MidiContext = React.createContext<MidiContextType>({
  outputs: [],
  inputs: [],
  isSupported: false,
  isEnabled: false,
  requestMidiAccess: async () => false,
  sendNoteOn: () => {},
  sendNoteOff: () => {},
  sendAftertouch: () => {},
  sendChannelAftertouch: () => {},
  sendPitchBend: () => {},
  sendControlChange: () => {},
  setActiveOutput: () => {},
})

export const useMidi = () => React.useContext(MidiContext)

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs))
}

function useMobileDetector() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      const userAgent = typeof window !== "undefined" ? window.navigator.userAgent : ""
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      setIsMobile(mobileRegex.test(userAgent))
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  return isMobile
}

const MidiPad = React.forwardRef<HTMLButtonElement, MidiPadProps>(
  (
    {
      className,
      label,
      subLabel,
      note = 60,
      channel = 1,
      velocity = 127,
      disabled = false,
      size = "md",
      radius = "md",
      ledColor = "rgba(255, 255, 255, 0.9)",
      use1DVelocity = false,
      invert1DVelocity = false,
      useTemperatureColor = false,
      animationStyle = "instant",
      animationDuration = 200,
      mpeMode = "none",
      mpeSensitivity = 5,
      longPressDuration = 300,
      ledClassName,
      padClassName,
      isForcePressed = false,
      midiOutput = "none",
      midiOutputId,
      onPadDown,
      onPadUp,
      onPadTrigger,
      onMPEChange,
      ...props
    },
    ref,
  ) => {
    const [isPressed, setIsPressed] = React.useState(false)
    const [currentVelocity, setCurrentVelocity] = React.useState(velocity)
    const [triggerAnimation, setTriggerAnimation] = React.useState(false)
    const [mpeData, setMpeData] = React.useState<MPEData>({})
    const [intensity, setIntensity] = React.useState(1)
    const padRef = React.useRef<HTMLButtonElement>(null)
    const longPressTimer = React.useRef<NodeJS.Timeout | null>(null)
    const isLongPress = React.useRef(false)
    const startY = React.useRef(0)
    const startX = React.useRef(0)
    const isMobile = useMobileDetector()
    const midi = useMidi()
    const effectiveIsPressed = isPressed || isForcePressed
    const prevIsForcePressed = React.useRef(isForcePressed)
    const prevIsPressed = React.useRef(isPressed)

    // Fix for infinite loop - use a ref to track previous state and only trigger effects when needed
    React.useEffect(() => {
      // Only trigger effects when the pressed state actually changes
      const wasPressed = prevIsForcePressed.current || prevIsPressed.current
      const isNowPressed = isForcePressed || isPressed

      if (!wasPressed && isNowPressed) {
        // Pad was just pressed
        setTriggerAnimation(true)
        onPadDown?.(note, currentVelocity, channel, mpeData)
        onPadTrigger?.(note, currentVelocity, channel, mpeData)

        if (midiOutput === "web-midi" || midiOutput === "mpe") {
          midi.sendNoteOn(note, currentVelocity, channel)
        }
      } else if (wasPressed && !isNowPressed) {
        // Pad was just released
        onPadUp?.(note, currentVelocity, channel, mpeData)

        if (midiOutput === "web-midi" || midiOutput === "mpe") {
          midi.sendNoteOff(note, currentVelocity, channel)
        }
      }

      // Update refs for next comparison
      prevIsForcePressed.current = isForcePressed
      prevIsPressed.current = isPressed
    }, [
      isForcePressed,
      isPressed,
      note,
      currentVelocity,
      channel,
      mpeData,
      onPadDown,
      onPadTrigger,
      onPadUp,
      midiOutput,
      midi,
    ])

    // Handle MPE data changes - moved inside the component
    React.useEffect(() => {
      if (mpeMode !== "none" && isLongPress.current && onMPEChange && Object.keys(mpeData).length > 0) {
        onMPEChange(note, mpeData)
      }
    }, [mpeMode, note, mpeData, onMPEChange])

    const effectiveLongPressDuration = isMobile ? Math.max(100, longPressDuration / 2) : longPressDuration

    const sizeClasses = {
      sm: "w-16 h-16 text-xs",
      md: "w-20 h-20 text-sm",
      lg: "w-24 h-24 text-base",
      xl: "w-32 h-32 text-lg",
      xxl: "w-40 h-40 text-xl",
    }

    const radiusClasses = {
      none: "rounded-none",
      sm: "rounded-md",
      md: "rounded-lg",
      lg: "rounded-xl",
      full: "rounded-full",
    }

    const calculateVelocity = (clientY: number): number => {
      if (!padRef.current || !use1DVelocity) return velocity

      const rect = padRef.current.getBoundingClientRect()
      const padHeight = rect.height
      const relativeY = clientY - rect.top

      let percentage = Math.max(0, Math.min(1, relativeY / padHeight))
      percentage = invert1DVelocity ? percentage : 1 - percentage
      return Math.round(percentage * 126) + 1
    }

    const calculateColor = (baseColor: string, velocityValue: number): string => {
      if (!useTemperatureColor) return baseColor

      const rgbaMatch = baseColor.match(/rgba?$$(\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?$$/)

      if (!rgbaMatch) {
        return baseColor
      }

      const normalizedVelocity = (velocityValue - 1) / 126

      const r = Math.min(255, Number.parseInt(rgbaMatch[1]) + Math.round(normalizedVelocity * 100))
      const g = Number.parseInt(rgbaMatch[2])
      const b = Math.min(255, Number.parseInt(rgbaMatch[3]) + Math.round((1 - normalizedVelocity) * 100))

      const alpha = baseColor.includes("rgba") ? baseColor.match(/rgba?$$[\d\s,]+,\s*([\d.]+)$$/)![1] : "0.9"

      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }

    const updateMPEData = (clientX: number, clientY: number) => {
      if (mpeMode === "none" || !isLongPress.current) return

      if (!padRef.current) return

      const rect = padRef.current.getBoundingClientRect()
      const padHeight = rect.height
      const padWidth = rect.width

      const deltaY = startY.current - clientY
      const normalizedDeltaY = Math.max(-1, Math.min(1, deltaY / (padHeight / 2)))

      const deltaX = clientX - startX.current
      const normalizedDeltaX = Math.max(-1, Math.min(1, deltaX / (padWidth / 2)))

      const scaledValueY = normalizedDeltaY * (mpeSensitivity / 5)
      const scaledValueX = normalizedDeltaX * (mpeSensitivity / 5)

      const newMPEData: MPEData = {
        ...mpeData,
        y: normalizedDeltaY,
        x: normalizedDeltaX,
      }

      if (mpeMode === "aftertouch" || mpeMode === "full") {
        newMPEData.aftertouch = Math.round(Math.max(0, Math.min(127, 64 + scaledValueY * 63)))
        newMPEData.pressure = Math.max(0, Math.min(1, 0.5 + scaledValueY * 0.5))

        if (midiOutput === "web-midi" || midiOutput === "mpe") {
          midi.sendAftertouch(note, newMPEData.aftertouch, channel)
        }
      }

      if (mpeMode === "pitchbend" || mpeMode === "full") {
        newMPEData.pitchBend = Math.round(Math.max(0, Math.min(16383, 8192 + scaledValueX * 8191)))

        if (midiOutput === "web-midi" || midiOutput === "mpe") {
          midi.sendPitchBend(newMPEData.pitchBend, channel)
        }
      }

      if (mpeMode === "timbre" || mpeMode === "full") {
        newMPEData.timbre = Math.round(Math.max(0, Math.min(127, 64 + scaledValueY * 63)))

        if (midiOutput === "web-midi" || midiOutput === "mpe") {
          // CC74 is commonly used for timbre/brightness in MPE
          midi.sendControlChange(74, newMPEData.timbre, channel)
        }
      }

      updateIntensity(newMPEData)

      setMpeData(newMPEData)
      if (onMPEChange) {
        onMPEChange(note, newMPEData)
      }
    }

    const updateIntensity = (data?: MPEData) => {
      if (mpeMode !== "none" && data) {
        if (data.pressure !== undefined) {
          setIntensity(data.pressure)
        } else if (data.aftertouch !== undefined) {
          setIntensity(data.aftertouch / 127)
        }
      } else if (use1DVelocity) {
        setIntensity(currentVelocity / 127)
      }
    }

    const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
      if (disabled) return

      e.preventDefault()

      const touch = e.touches[0]

      const newVelocity = calculateVelocity(touch.clientY)
      setCurrentVelocity(newVelocity)

      setIntensity(newVelocity / 127)

      startX.current = touch.clientX
      startY.current = touch.clientY

      if (mpeMode !== "none") {
        isLongPress.current = false

        longPressTimer.current = setTimeout(() => {
          isLongPress.current = true
          const initialMPEData: MPEData = {
            aftertouch: 0,
            pitchBend: 8192,
            timbre: 64,
            pressure: 0,
            x: 0,
            y: 0,
          }
          setMpeData(initialMPEData)
        }, effectiveLongPressDuration)
      }

      setIsPressed(true)
      setTriggerAnimation(true)

      // Note: We don't call onPadDown or send MIDI here - that's handled by the effect
    }

    const handleTouchMove = (e: React.TouchEvent<HTMLButtonElement>) => {
      if (disabled || !isPressed) return

      e.preventDefault()

      const touch = e.touches[0]

      if (mpeMode !== "none" && isLongPress.current) {
        updateMPEData(touch.clientX, touch.clientY)
      } else if (use1DVelocity) {
        const newVelocity = calculateVelocity(touch.clientY)
        setCurrentVelocity(newVelocity)
        setIntensity(newVelocity / 127)
      }
    }

    const handleTouchEnd = (e: React.TouchEvent<HTMLButtonElement>) => {
      if (disabled || !isPressed) return

      e.preventDefault()

      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current)
        longPressTimer.current = null
      }

      setIsPressed(false)

      isLongPress.current = false

      // Note: We don't call onPadUp or send MIDI here - that's handled by the effect
    }

    const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
      if (e.pointerType === "touch") return

      if (disabled) return

      const newVelocity = calculateVelocity(e.clientY)
      setCurrentVelocity(newVelocity)

      setIntensity(newVelocity / 127)

      startX.current = e.clientX
      startY.current = e.clientY

      if (mpeMode !== "none") {
        isLongPress.current = false

        longPressTimer.current = setTimeout(() => {
          isLongPress.current = true
          const initialMPEData: MPEData = {
            aftertouch: 0,
            pitchBend: 8192,
            timbre: 64,
            pressure: 0,
            x: 0,
            y: 0,
          }
          setMpeData(initialMPEData)
        }, longPressDuration)
      }

      setIsPressed(true)
      setTriggerAnimation(true)

      // Note: We don't call onPadDown or send MIDI here - that's handled by the effect

      e.currentTarget.setPointerCapture(e.pointerId)
    }

    const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
      if (e.pointerType === "touch") return

      if (disabled || !isPressed) return

      if (mpeMode !== "none" && isLongPress.current) {
        updateMPEData(e.clientX, e.clientY)
      } else if (use1DVelocity) {
        const newVelocity = calculateVelocity(e.clientY)
        setCurrentVelocity(newVelocity)
        setIntensity(newVelocity / 127)
      }
    }

    const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
      if (e.pointerType === "touch") return

      if (disabled || !isPressed) return

      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current)
        longPressTimer.current = null
      }

      setIsPressed(false)

      isLongPress.current = false

      // Note: We don't call onPadUp or send MIDI here - that's handled by the effect

      e.currentTarget.releasePointerCapture(e.pointerId)
    }

    React.useEffect(() => {
      if (triggerAnimation) {
        const timer = setTimeout(() => {
          setTriggerAnimation(false)
        }, animationDuration)
        return () => clearTimeout(timer)
      }
    }, [triggerAnimation, animationDuration])

    React.useEffect(() => {
      return () => {
        if (longPressTimer.current) {
          clearTimeout(longPressTimer.current)
        }
      }
    }, [])

    const getAnimationClasses = () => {
      if (!triggerAnimation) return ""

      const baseClasses = "absolute inset-0 pointer-events-none"
      const durationClass = `duration-${animationDuration}`

      switch (animationStyle) {
        case "fade":
          return cn(baseClasses, "opacity-0 animate-in fade-in", durationClass)
        case "radial":
          return cn(baseClasses, "scale-0 origin-center animate-in zoom-in", durationClass)
        case "top-down":
          return cn(baseClasses, "scale-y-0 origin-top animate-in slide-in-from-top", durationClass)
        case "bottom-up":
          return cn(baseClasses, "scale-y-0 origin-bottom animate-in slide-in-from-bottom", durationClass)
        case "left-right":
          return cn(baseClasses, "scale-x-0 origin-left animate-in slide-in-from-left", durationClass)
        case "right-left":
          return cn(baseClasses, "scale-x-0 origin-right animate-in slide-in-from-right", durationClass)
        case "instant":
        default:
          return cn(baseClasses)
      }
    }

    const currentLedColor = calculateColor(ledColor, currentVelocity)

    const glowIntensity = Math.max(0.3, intensity)
    const glowSize = Math.max(5, Math.round(20 * intensity))
    const glowOpacity = Math.max(0.3, intensity)

    return (
      <button
        ref={(el) => {
          if (typeof ref === "function") {
            ref(el)
          } else if (ref) {
            ref.current = el
          }
          padRef.current = el
        }}
        type="button"
        disabled={disabled}
        className={cn(
          "relative flex flex-col items-center justify-center select-none overflow-hidden touch-none",
          sizeClasses[size],
          radiusClasses[radius],
          "bg-black/40 backdrop-blur-glass border border-white/10",
          "shadow-glass-outer hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]",
          effectiveIsPressed && "shadow-glass-inner transform scale-[0.98] transition-transform",
          disabled && "opacity-50 cursor-not-allowed",
          padClassName,
          className,
        )}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
        {...(() => {
          // Remove custom props that shouldn't be passed to the DOM
          const {
            note: _note,
            channel: _channel,
            velocity: _velocity,
            ledColor: _ledColor,
            use1DVelocity: _use1DVelocity,
            invert1DVelocity: _invert1DVelocity,
            useTemperatureColor: _useTemperatureColor,
            animationStyle: _animationStyle,
            animationDuration: _animationDuration,
            mpeMode: _mpeMode,
            mpeSensitivity: _mpeSensitivity,
            longPressDuration: _longPressDuration,
            ledClassName: _ledClassName,
            padClassName: _padClassName,
            isForcePressed: _isForcePressed,
            midiOutput: _midiOutput,
            midiOutputId: _midiOutputId,
            onPadDown: _onPadDown,
            onPadUp: _onPadUp,
            onPadTrigger: _onPadTrigger,
            onMPEChange: _onMPEChange,
            ...domProps
          } = props
          return domProps
        })()}
      >
        <div
          className={cn(
            "absolute inset-0 transition-opacity",
            effectiveIsPressed ? "opacity-100" : "opacity-0",
            ledClassName,
          )}
          style={{
            backgroundColor: currentLedColor,
            opacity: effectiveIsPressed ? glowOpacity : 0,
            boxShadow: effectiveIsPressed
              ? `0 0 ${glowSize}px ${Math.round(glowSize / 2)}px ${currentLedColor}, inset 0 0 ${Math.round(
                  glowSize / 2,
                )}px ${Math.round(glowSize / 4)}px ${currentLedColor}`
              : "none",
            transition: `opacity ${animationDuration}ms, box-shadow ${animationDuration}ms`,
          }}
        >
          {effectiveIsPressed && <div className={getAnimationClasses()} style={{ backgroundColor: currentLedColor }} />}
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center">
          {label && (
            <span
              className={cn("font-medium tracking-wide text-shadow", effectiveIsPressed ? "text-black" : "text-white")}
            >
              {label}
            </span>
          )}
          {subLabel && (
            <span className={cn("text-xs mt-1 opacity-80", effectiveIsPressed ? "text-black/80" : "text-white/80")}>
              {subLabel}
            </span>
          )}
        </div>

        <div
          className={cn(
            "absolute bottom-1 right-1 text-[0.6rem] opacity-60",
            effectiveIsPressed ? "text-black/80" : "text-white/80",
          )}
        >
          {note}
        </div>

        {use1DVelocity && effectiveIsPressed && (
          <div
            className="absolute top-1 left-1 text-[0.6rem] bg-black/40 px-1 rounded"
            style={{ color: currentLedColor }}
          >
            {currentVelocity}
          </div>
        )}

        {mpeMode !== "none" && isLongPress.current && (
          <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-white animate-pulse" />
        )}
      </button>
    )
  },
)

MidiPad.displayName = "MidiPad"

export { MidiPad }
