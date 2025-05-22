"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw } from "lucide-react"
import { ADSRControls } from "@/components/adsr-controls"
import { ADSRVisualization } from "@/components/adsr-visualization"
import { calculateEnvelopeValue } from "@/utils/adsr-envelope-utils"
import type { ADSREnvelopeProps } from "@/types/adsr-envelope-types"

export default function ADSREnvelope({
  // Core ADSR parameters
  initialAttack = 10,
  initialDecay = 120,
  initialSustain = 0.75,
  initialRelease = 250,

  // Curve shapes
  initialAttackCurve = 0,
  initialDecayCurve = 0,
  initialReleaseCurve = 0,

  // Visualization options
  visualizationHeight = 200,
  sustainHoldTime = 1000,
  showLabels = true,
  showPlayhead = true,
  showValueIndicator = true,

  // Styling options
  className = "",
  envelopeCurveColor = "rgba(255, 255, 255, 0.8)",
  envelopeFillColor = "rgba(255, 255, 255, 0.1)",
  playheadColor = "rgba(255, 255, 255, 0.9)",
  stageLineColor = "rgba(255, 255, 255, 0.3)",
  labelColor = "rgba(255, 255, 255, 0.6)",
  valueIndicatorColor = "rgba(255, 255, 255, 1)",

  // Control options
  showControls = true,
  showCurveControls = true,
  showResetButton = true,
  showPlayButton = true,
  showValueDisplay = true,

  // Range limits
  attackRange = [0.1, 1000],
  decayRange = [0.1, 2000],
  releaseRange = [0.1, 3000],
  curveRange = [-1, 1],

  // Callbacks
  onAttackChange,
  onDecayChange,
  onSustainChange,
  onReleaseChange,
  onAttackCurveChange,
  onDecayCurveChange,
  onReleaseCurveChange,
  onEnvelopePlay,
  onEnvelopeStop,
  onEnvelopeReset,
  onEnvelopeValueChange,

  // Layout options
  controlsLayout = "grid",
  controlsPosition = "bottom",

  // Card styling
  cardClassName = "bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]",
  headerClassName = "border-b border-white/5",
  contentClassName = "p-6",
  title = "ADSR Envelope",
  description = "Shape how parameters change over time when a note is triggered",

  // Custom components
  renderControls,
  renderVisualization,
}: ADSREnvelopeProps) {
  // ADSR parameters (in milliseconds, except sustain which is 0-1)
  const [attack, setAttack] = useState(initialAttack)
  const [decay, setDecay] = useState(initialDecay)
  const [sustain, setSustain] = useState(initialSustain)
  const [release, setRelease] = useState(initialRelease)

  // Curve shapes (-1 to 1, where 0 is linear)
  const [attackCurve, setAttackCurve] = useState(initialAttackCurve)
  const [decayCurve, setDecayCurve] = useState(initialDecayCurve)
  const [releaseCurve, setReleaseCurve] = useState(initialReleaseCurve)

  // Animation state
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [noteOff, setNoteOff] = useState(false)
  const [envelopeValue, setEnvelopeValue] = useState(0)
  const animationRef = useRef<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const releaseStartTimeRef = useRef(0)
  const releaseStartValueRef = useRef(0)

  // Total duration for visualization (in milliseconds)
  const totalDuration = attack + decay + sustainHoldTime + release

  // Handle parameter changes with callbacks
  useEffect(() => {
    onAttackChange?.(attack)
  }, [attack, onAttackChange])

  useEffect(() => {
    onDecayChange?.(decay)
  }, [decay, onDecayChange])

  useEffect(() => {
    onSustainChange?.(sustain)
  }, [sustain, onSustainChange])

  useEffect(() => {
    onReleaseChange?.(release)
  }, [release, onReleaseChange])

  useEffect(() => {
    onAttackCurveChange?.(attackCurve)
  }, [attackCurve, onAttackCurveChange])

  useEffect(() => {
    onDecayCurveChange?.(decayCurve)
  }, [decayCurve, onDecayCurveChange])

  useEffect(() => {
    onReleaseCurveChange?.(releaseCurve)
  }, [releaseCurve, onReleaseCurveChange])

  useEffect(() => {
    onEnvelopeValueChange?.(envelopeValue)
  }, [envelopeValue, onEnvelopeValueChange])

  // Start/stop the animation
  const togglePlayback = useCallback(() => {
    if (isPlaying) {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
      }
      setIsPlaying(false)
      setCurrentTime(0)
      setNoteOff(false)
      setEnvelopeValue(0)
      onEnvelopeStop?.()
    } else {
      setIsPlaying(true)
      setCurrentTime(0)
      setNoteOff(false)
      const startTime = performance.now()
      onEnvelopePlay?.()

      const animate = (now: number) => {
        const elapsed = now - startTime
        setCurrentTime(elapsed)

        // Auto note-off after sustain visualization period
        if (elapsed > attack + decay + sustainHoldTime && !noteOff) {
          setNoteOff(true)
          // Store the current value and time at note-off for proper release calculation
          releaseStartTimeRef.current = elapsed
          // Important: Use the actual current envelope value, which should be the sustain level
          releaseStartValueRef.current = sustain
        }

        // Stop animation after release is complete
        if (noteOff && elapsed > releaseStartTimeRef.current + release + 100) {
          if (animationRef.current !== null) {
            cancelAnimationFrame(animationRef.current)
          }
          setIsPlaying(false)
          setCurrentTime(0)
          setNoteOff(false)
          setEnvelopeValue(0)
          onEnvelopeStop?.()
          return
        }

        // Calculate the current envelope value
        const value = calculateEnvelopeValue(
          elapsed,
          attack,
          decay,
          sustain,
          release,
          attackCurve,
          decayCurve,
          releaseCurve,
          noteOff,
          releaseStartTimeRef.current,
          releaseStartValueRef.current,
        )

        setEnvelopeValue(value)
        animationRef.current = requestAnimationFrame(animate)
      }

      animationRef.current = requestAnimationFrame(animate)
    }
  }, [
    isPlaying,
    attack,
    decay,
    sustain,
    release,
    attackCurve,
    decayCurve,
    releaseCurve,
    noteOff,
    onEnvelopePlay,
    onEnvelopeStop,
    sustainHoldTime,
  ])

  // Reset parameters to defaults
  const resetParameters = useCallback(() => {
    setAttack(initialAttack)
    setDecay(initialDecay)
    setSustain(initialSustain)
    setRelease(initialRelease)
    setAttackCurve(initialAttackCurve)
    setDecayCurve(initialDecayCurve)
    setReleaseCurve(initialReleaseCurve)
    onEnvelopeReset?.()
  }, [
    initialAttack,
    initialDecay,
    initialSustain,
    initialRelease,
    initialAttackCurve,
    initialDecayCurve,
    initialReleaseCurve,
    onEnvelopeReset,
  ])

  // Determine the order of visualization and controls based on controlsPosition
  const renderContent = () => {
    const visualizationComponent = renderVisualization ? (
      renderVisualization({
        attack,
        decay,
        sustain,
        release,
        attackCurve,
        decayCurve,
        releaseCurve,
        isPlaying,
        currentTime,
        envelopeValue,
        noteOff,
        totalDuration,
        visualizationHeight,
        showLabels,
        showPlayhead,
        showValueIndicator,
        envelopeCurveColor,
        envelopeFillColor,
        playheadColor,
        stageLineColor,
        labelColor,
        valueIndicatorColor,
        canvasRef: canvasRef as React.RefObject<HTMLCanvasElement>,
      })
    ) : (
      <div className="relative bg-black/30 rounded-xl p-4 border border-white/5">
        <ADSRVisualization
          attack={attack}
          decay={decay}
          sustain={sustain}
          release={release}
          attackCurve={attackCurve}
          decayCurve={decayCurve}
          releaseCurve={releaseCurve}
          isPlaying={isPlaying}
          currentTime={currentTime}
          envelopeValue={envelopeValue}
          noteOff={noteOff}
          totalDuration={totalDuration}
          visualizationHeight={visualizationHeight}
          showLabels={showLabels}
          showPlayhead={showPlayhead}
          showValueIndicator={showValueIndicator}
          envelopeCurveColor={envelopeCurveColor}
          envelopeFillColor={envelopeFillColor}
          playheadColor={playheadColor}
          stageLineColor={stageLineColor}
          labelColor={labelColor}
          valueIndicatorColor={valueIndicatorColor}
          canvasRef={canvasRef as React.RefObject<HTMLCanvasElement>}
        />

        <div className="absolute bottom-2 right-2 flex gap-2">
          {showPlayButton && (
            <Button
              onClick={togglePlayback}
              size="sm"
              variant="outline"
              className="bg-white/10 border-white/10 hover:bg-white/20 hover:border-white/20 text-white"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          )}
          {showResetButton && (
            <Button
              onClick={resetParameters}
              size="sm"
              variant="outline"
              className="bg-white/10 border-white/10 hover:bg-white/20 hover:border-white/20 text-white"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          )}
        </div>

        {showValueDisplay && (
          <div className="absolute top-2 left-2 text-xs text-white/60">Value: {envelopeValue.toFixed(2)}</div>
        )}
      </div>
    )

    const controlsComponent =
      showControls &&
      (renderControls ? (
        renderControls({
          attack,
          decay,
          sustain,
          release,
          attackCurve,
          decayCurve,
          releaseCurve,
          isPlaying,
          setAttack,
          setDecay,
          setSustain,
          setRelease,
          setAttackCurve,
          setDecayCurve,
          setReleaseCurve,
          togglePlayback,
          resetParameters,
          showCurveControls,
          showResetButton,
          showPlayButton,
          attackRange,
          decayRange,
          releaseRange,
          curveRange,
          controlsLayout,
        })
      ) : (
        <ADSRControls
          attack={attack}
          decay={decay}
          sustain={sustain}
          release={release}
          attackCurve={attackCurve}
          decayCurve={decayCurve}
          releaseCurve={releaseCurve}
          isPlaying={isPlaying}
          setAttack={setAttack}
          setDecay={setDecay}
          setSustain={setSustain}
          setRelease={setRelease}
          setAttackCurve={setAttackCurve}
          setDecayCurve={setDecayCurve}
          setReleaseCurve={setReleaseCurve}
          togglePlayback={togglePlayback}
          resetParameters={resetParameters}
          showCurveControls={showCurveControls}
          showResetButton={showResetButton}
          showPlayButton={showPlayButton}
          attackRange={attackRange}
          decayRange={decayRange}
          releaseRange={releaseRange}
          curveRange={curveRange}
          controlsLayout={controlsLayout}
        />
      ))

    if (controlsPosition === "top") {
      return (
        <>
          {controlsComponent && <div className="mb-8">{controlsComponent}</div>}
          {visualizationComponent}
        </>
      )
    } else if (controlsPosition === "bottom") {
      return (
        <>
          <div className="mb-8">{visualizationComponent}</div>
          {controlsComponent}
        </>
      )
    } else if (controlsPosition === "left") {
      return (
        <div className="flex flex-col md:flex-row gap-8">
          {controlsComponent && <div className="md:w-1/3">{controlsComponent}</div>}
          <div className="md:w-2/3">{visualizationComponent}</div>
        </div>
      )
    } else if (controlsPosition === "right") {
      return (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">{visualizationComponent}</div>
          {controlsComponent && <div className="md:w-1/3">{controlsComponent}</div>}
        </div>
      )
    }

    return visualizationComponent
  }

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <Card className={cardClassName}>
        {(title || description) && (
          <CardHeader className={headerClassName}>
            {title && <CardTitle className="text-white tracking-wide text-2xl font-light">{title}</CardTitle>}
            {description && <CardDescription className="text-white/60">{description}</CardDescription>}
          </CardHeader>
        )}
        <CardContent className={contentClassName}>{renderContent()}</CardContent>
      </Card>
    </div>
  )
}
