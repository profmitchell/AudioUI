"use client"

import * as React from "react"
import { MidiPad, type MidiPadProps, type AnimationStyle, type MPEData } from "@/components/ui/midi-pad"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export interface MidiPadGridProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: number
  columns?: number
  baseNote?: number
  channel?: number
  padSize?: MidiPadProps["size"]
  padRadius?: MidiPadProps["radius"]
  gap?: "none" | "sm" | "md" | "lg"
  animationStyle?: AnimationStyle
  colorMap?: (row: number, col: number) => string
  labelMap?: (row: number, col: number, note: number) => string
  onPadDown?: (note: number, velocity: number, channel: number, mpeData?: MPEData) => void
  onPadUp?: (note: number, velocity: number, channel: number, mpeData?: MPEData) => void
  onPadTrigger?: (note: number, velocity: number, channel: number, mpeData?: MPEData) => void
  onMPEChange?: (note: number, mpeData: MPEData) => void
  use1DVelocity?: boolean
  useTemperatureColor?: boolean
  mpeMode?: MidiPadProps["mpeMode"]
  mpeSensitivity?: number
  multiTouchEnabled?: boolean
  midiOutput?: MidiPadProps["midiOutput"]
  midiOutputId?: string
}

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs))
}

export function MidiPadGrid({
  className,
  rows = 4,
  columns = 4,
  baseNote = 36,
  channel = 1,
  padSize = "md",
  padRadius = "md",
  gap = "md",
  animationStyle = "instant",
  colorMap,
  labelMap,
  onPadDown,
  onPadUp,
  onPadTrigger,
  onMPEChange,
  use1DVelocity = false,
  useTemperatureColor = false,
  mpeMode = "none",
  mpeSensitivity = 5,
  multiTouchEnabled = true,
  midiOutput,
  midiOutputId,
  ...props
}: MidiPadGridProps) {
  const [activeTouches, setActiveTouches] = React.useState<Map<number, number>>(new Map())
  const gridRef = React.useRef<HTMLDivElement>(null)

  const defaultColorMap = (row: number, col: number) => {
    const hue = ((row * columns + col) / (rows * columns)) * 360
    return `hsla(${hue}, 100%, 70%, 0.9)`
  }

  const defaultLabelMap = (_row: number, _col: number, note: number) => {
    return `${note}`
  }

  const gapClasses = {
    none: "gap-0",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
  }

  const handleTouchStart = React.useCallback(
    (e: React.TouchEvent) => {
      if (!multiTouchEnabled) return

      e.preventDefault()
      e.stopPropagation()

      const gridRect = gridRef.current?.getBoundingClientRect()
      if (!gridRect) return

      const newActiveTouches = new Map(activeTouches)

      Array.from(e.touches).forEach((touch) => {
        const x = touch.clientX - gridRect.left
        const y = touch.clientY - gridRect.top

        const col = Math.floor(x / (gridRect.width / columns))
        const row = Math.floor(y / (gridRect.height / rows))

        if (row >= 0 && row < rows && col >= 0 && col < columns) {
          const noteIndex = row * columns + col
          const note = baseNote + noteIndex
          newActiveTouches.set(touch.identifier, note)
        }
      })

      setActiveTouches(newActiveTouches)
    },
    [activeTouches, baseNote, columns, multiTouchEnabled, rows],
  )

  const handleTouchMove = React.useCallback(
    (e: React.TouchEvent) => {
      if (!multiTouchEnabled) return

      e.preventDefault()
      e.stopPropagation()

      const gridRect = gridRef.current?.getBoundingClientRect()
      if (!gridRect) return

      const newActiveTouches = new Map(activeTouches)

      Array.from(e.touches).forEach((touch) => {
        const x = touch.clientX - gridRect.left
        const y = touch.clientY - gridRect.top

        const col = Math.floor(x / (gridRect.width / columns))
        const row = Math.floor(y / (gridRect.height / rows))

        if (row >= 0 && row < rows && col >= 0 && col < columns) {
          const noteIndex = row * columns + col
          const note = baseNote + noteIndex

          if (newActiveTouches.has(touch.identifier) && newActiveTouches.get(touch.identifier) !== note) {
            newActiveTouches.set(touch.identifier, note)
          }
        } else {
          newActiveTouches.delete(touch.identifier)
        }
      })

      setActiveTouches(newActiveTouches)
    },
    [activeTouches, baseNote, columns, multiTouchEnabled, rows],
  )

  const handleTouchEnd = React.useCallback(
    (e: React.TouchEvent) => {
      if (!multiTouchEnabled) return

      e.preventDefault()
      e.stopPropagation()

      const newActiveTouches = new Map(activeTouches)

      Array.from(e.changedTouches).forEach((touch) => {
        newActiveTouches.delete(touch.identifier)
      })

      setActiveTouches(newActiveTouches)
    },
    [activeTouches, multiTouchEnabled],
  )

  const isPadActive = React.useCallback(
    (note: number) => {
      return Array.from(activeTouches.values()).includes(note)
    },
    [activeTouches],
  )

  const renderPads = () => {
    const pads = []

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const noteNumber = baseNote + (row * columns + col)
        const padColor = colorMap ? colorMap(row, col) : defaultColorMap(row, col)
        const padLabel = labelMap ? labelMap(row, col, noteNumber) : defaultLabelMap(row, col, noteNumber)

        pads.push(
          <MidiPad
            key={`pad-${row}-${col}`}
            note={noteNumber}
            channel={channel}
            label={padLabel}
            size={padSize}
            radius={padRadius}
            ledColor={padColor}
            animationStyle={animationStyle}
            onPadDown={onPadDown}
            onPadUp={onPadUp}
            onPadTrigger={onPadTrigger}
            use1DVelocity={use1DVelocity}
            useTemperatureColor={useTemperatureColor}
            mpeMode={mpeMode}
            mpeSensitivity={mpeSensitivity}
            isForcePressed={isPadActive(noteNumber)}
            onMPEChange={onMPEChange}
            midiOutput={midiOutput}
            midiOutputId={midiOutputId}
          />,
        )
      }
    }

    return pads
  }

  React.useEffect(() => {
    const gridElement = gridRef.current
    if (!gridElement || !multiTouchEnabled) return

    const preventDefaultTouch = (e: TouchEvent) => {
      e.preventDefault()
    }

    gridElement.addEventListener("touchstart", preventDefaultTouch, { passive: false })
    gridElement.addEventListener("touchmove", preventDefaultTouch, { passive: false })
    gridElement.addEventListener("touchend", preventDefaultTouch, { passive: false })

    return () => {
      gridElement.removeEventListener("touchstart", preventDefaultTouch)
      gridElement.removeEventListener("touchmove", preventDefaultTouch)
      gridElement.removeEventListener("touchend", preventDefaultTouch)
    }
  }, [multiTouchEnabled])

  return (
    <div
      ref={gridRef}
      className={cn(
        "grid",
        gapClasses[gap],
        "bg-black/30 backdrop-blur-glass p-6 rounded-2xl border border-white/5 shadow-glass-outer touch-none",
        className,
      )}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      {...props}
    >
      {renderPads()}
    </div>
  )
}
