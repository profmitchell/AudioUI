"use client"

import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw } from "lucide-react"
import { formatTime } from "@/utils/adsr-envelope-utils"
import type { ADSRControlsProps } from "@/types/adsr-envelope-types"

export function ADSRControls({
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
  showCurveControls = true,
  showResetButton = true,
  showPlayButton = true,
  attackRange = [0.1, 1000],
  decayRange = [0.1, 2000],
  releaseRange = [0.1, 3000],
  curveRange = [-1, 1],
  controlsLayout = "grid",
}: ADSRControlsProps) {
  const containerClass =
    controlsLayout === "horizontal"
      ? "flex flex-row gap-6"
      : controlsLayout === "vertical"
        ? "flex flex-col gap-6"
        : "grid grid-cols-1 md:grid-cols-4 gap-6"

  return (
    <div className={containerClass}>
      {/* Attack Controls */}
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-white font-medium">Attack</div>
          <div className="text-white/60 text-sm">{formatTime(attack)}</div>
        </div>
        <Slider
          value={[attack]}
          min={attackRange[0]}
          max={attackRange[1]}
          step={0.1}
          onValueChange={(value) => setAttack(value[0])}
          className="w-full"
        />
        {showCurveControls && (
          <div className="space-y-2">
            <div className="text-white/80 text-xs">Curve</div>
            <Slider
              value={[attackCurve]}
              min={curveRange[0]}
              max={curveRange[1]}
              step={0.01}
              onValueChange={(value) => setAttackCurve(value[0])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-white/60">
              <span>Convex</span>
              <span>{attackCurve.toFixed(2)}</span>
              <span>Concave</span>
            </div>
          </div>
        )}
      </div>

      {/* Decay Controls */}
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-white font-medium">Decay</div>
          <div className="text-white/60 text-sm">{formatTime(decay)}</div>
        </div>
        <Slider
          value={[decay]}
          min={decayRange[0]}
          max={decayRange[1]}
          step={0.1}
          onValueChange={(value) => setDecay(value[0])}
          className="w-full"
        />
        {showCurveControls && (
          <div className="space-y-2">
            <div className="text-white/80 text-xs">Curve</div>
            <Slider
              value={[decayCurve]}
              min={curveRange[0]}
              max={curveRange[1]}
              step={0.01}
              onValueChange={(value) => setDecayCurve(value[0])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-white/60">
              <span>Convex</span>
              <span>{decayCurve.toFixed(2)}</span>
              <span>Concave</span>
            </div>
          </div>
        )}
      </div>

      {/* Sustain Controls */}
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-white font-medium">Sustain</div>
          <div className="text-white/60 text-sm">{(sustain * 100).toFixed(0)}%</div>
        </div>
        <Slider
          value={[sustain]}
          min={0}
          max={1}
          step={0.01}
          onValueChange={(value) => setSustain(value[0])}
          className="w-full"
        />
        {showCurveControls && (
          <div className="space-y-2 opacity-0 pointer-events-none">
            <div className="text-white/80 text-xs">Curve</div>
            <Slider value={[0]} min={-1} max={1} step={0.01} className="w-full" />
            <div className="flex justify-between text-xs text-white/60">
              <span>Convex</span>
              <span>0.00</span>
              <span>Concave</span>
            </div>
          </div>
        )}
      </div>

      {/* Release Controls */}
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-white font-medium">Release</div>
          <div className="text-white/60 text-sm">{formatTime(release)}</div>
        </div>
        <Slider
          value={[release]}
          min={releaseRange[0]}
          max={releaseRange[1]}
          step={0.1}
          onValueChange={(value) => setRelease(value[0])}
          className="w-full"
        />
        {showCurveControls && (
          <div className="space-y-2">
            <div className="text-white/80 text-xs">Curve</div>
            <Slider
              value={[releaseCurve]}
              min={curveRange[0]}
              max={curveRange[1]}
              step={0.01}
              onValueChange={(value) => setReleaseCurve(value[0])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-white/60">
              <span>Convex</span>
              <span>{releaseCurve.toFixed(2)}</span>
              <span>Concave</span>
            </div>
          </div>
        )}
      </div>

      {/* Buttons */}
      {(showPlayButton || showResetButton) && (
        <div className="flex justify-center gap-2 mt-4 md:col-span-4">
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
      )}
    </div>
  )
}
