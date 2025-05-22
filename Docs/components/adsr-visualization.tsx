"use client"

import { useEffect, RefObject } from "react"
import { drawEnvelopeCurve } from "@/utils/adsr-envelope-utils"
import type { ADSRVisualizationProps } from "@/types/adsr-envelope-types"

export function ADSRVisualization({
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
  visualizationHeight = 200,
  showLabels = true,
  showPlayhead = true,
  showValueIndicator = true,
  envelopeCurveColor = "rgba(255, 255, 255, 0.8)",
  envelopeFillColor = "rgba(255, 255, 255, 0.1)",
  playheadColor = "rgba(255, 255, 255, 0.9)",
  stageLineColor = "rgba(255, 255, 255, 0.3)",
  labelColor = "rgba(255, 255, 255, 0.6)",
  valueIndicatorColor = "rgba(255, 255, 255, 1)",
  canvasRef,
}: ADSRVisualizationProps) {
  // Draw the envelope curve on canvas
  useEffect(() => {
    // Make sure the canvas is properly sized
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const rect = canvas.getBoundingClientRect()
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }

    drawEnvelopeCurve(
      canvasRef.current!,
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
      showLabels,
      showPlayhead,
      showValueIndicator,
      envelopeCurveColor,
      envelopeFillColor,
      playheadColor,
      stageLineColor,
      labelColor,
      valueIndicatorColor,
    )
  }, [
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
    showLabels,
    showPlayhead,
    showValueIndicator,
    envelopeCurveColor,
    envelopeFillColor,
    playheadColor,
    stageLineColor,
    labelColor,
    valueIndicatorColor,
    canvasRef,
  ])

  return <canvas ref={canvasRef} width={800} height={visualizationHeight} className="w-full h-full rounded-lg" />
}
