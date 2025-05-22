"use client"
import { useState } from "react"
import { RotaryKnobDetailed } from "@/components/ui/rotary-knob-detailed"
import { Slider } from "@/components/ui/slider"

export default function RotaryKnobDetailedDemo() {
  const [volume, setVolume] = useState(0.32)
  const [filter, setFilter] = useState(0.49)
  const [reverb, setReverb] = useState(0.5)
  const [lightX, setLightX] = useState(75)
  const [lightY, setLightY] = useState(25)
  const [metallic, setMetallic] = useState(50)
  const [isDraggingSlider, setIsDraggingSlider] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-black/40 backdrop-blur-[12px] rounded-xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] p-6">
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-white text-3xl font-light tracking-wide">AudioUI</h1>
          <h2 className="text-white/80 text-xl font-light">Knob - Specular</h2>
          <a
            href="https://cohen-concepts.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 text-sm hover:text-white/90 transition-colors inline-block"
          >
            By: Cohen-Concepts.com
          </a>
        </div>

        <div className="flex justify-center gap-8 mb-6">
          <div className="flex flex-col items-center gap-3">
            <RotaryKnobDetailed
              value={volume}
              onChange={setVolume}
              size="md"
              lightX={lightX}
              lightY={lightY}
              metallic={metallic}
            />
            <span className="text-white/80 text-sm">Volume</span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <RotaryKnobDetailed
              value={filter}
              onChange={setFilter}
              size="md"
              lightX={lightX}
              lightY={lightY}
              metallic={metallic}
            />
            <span className="text-white/80 text-sm">Filter</span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <RotaryKnobDetailed
              value={reverb}
              onChange={setReverb}
              size="md"
              lightX={lightX}
              lightY={lightY}
              metallic={metallic}
            />
            <span className="text-white/80 text-sm">Reverb</span>
          </div>
        </div>

        <div className="mt-6 p-4 bg-black/60 backdrop-blur-[8px] rounded-lg border border-white/5">
          <div className="flex justify-around gap-4 text-white/60 text-xs">
            <div className="text-center">
              <div className="text-white/90 text-xl font-light tabular-nums">{Math.round(volume * 100)}%</div>
              <div className="text-white/50">Output Level</div>
            </div>
            <div className="text-center">
              <div className="text-white/90 text-xl font-light tabular-nums">{Math.round(filter * 100)}%</div>
              <div className="text-white/50">Cutoff Freq</div>
            </div>
            <div className="text-center">
              <div className="text-white/90 text-xl font-light tabular-nums">{Math.round(reverb * 100)}%</div>
              <div className="text-white/50">Room Size</div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-black/60 backdrop-blur-[8px] rounded-lg border border-white/5">
          <h2 className="text-white text-lg font-light mb-4">Surface Properties</h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-white/70 text-sm">Metallic: {metallic}%</label>
              </div>
              <Slider
                value={[metallic]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => setMetallic(value[0])}
                className="w-full touch-manipulation"
                onTouchStart={() => setIsDraggingSlider(true)}
                onTouchEnd={() => setIsDraggingSlider(false)}
              />
              <div className="text-white/40 text-xs mt-1">
                Controls surface shininess and specular reflection properties
              </div>
            </div>

            <h3 className="text-white/80 text-base font-light mt-4 mb-2">Light Position</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-white/70 text-sm">X Position: {lightX}%</label>
                </div>
                <Slider
                  value={[lightX]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setLightX(value[0])}
                  className="w-full touch-manipulation"
                  onTouchStart={() => setIsDraggingSlider(true)}
                  onTouchEnd={() => setIsDraggingSlider(false)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-white/70 text-sm">Y Position: {lightY}%</label>
                </div>
                <Slider
                  value={[lightY]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setLightY(value[0])}
                  className="w-full touch-manipulation"
                  onTouchStart={() => setIsDraggingSlider(true)}
                  onTouchEnd={() => setIsDraggingSlider(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
