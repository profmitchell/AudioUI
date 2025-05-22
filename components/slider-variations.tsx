"use client"

import { useState } from "react"
import { CustomSlider } from "@/components/ui/custom-slider"

export function NeumorphicInsetSlider() {
  const [value, setValue] = useState([55])

  return (
    <div className="space-y-2">
      <h3 className="text-white/80 font-medium">Neumorphic Inset</h3>
      <div className="py-4 px-4 bg-zinc-900/60 rounded-xl">
        <div className="p-4 rounded-lg bg-zinc-800/50 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.05)]">
          <CustomSlider variant="neumorphic-inset" defaultValue={value} max={100} step={1} className="flex-1" />
        </div>
      </div>
    </div>
  )
}

export function NeumorphicOutsetSlider() {
  const [value, setValue] = useState([65])

  return (
    <div className="space-y-2">
      <h3 className="text-white/80 font-medium">Neumorphic Outset</h3>
      <div className="py-4 px-4 bg-zinc-900/60 rounded-xl">
        <div className="p-4 rounded-lg bg-zinc-800/50 shadow-[5px_5px_10px_rgba(0,0,0,0.5),-5px_-5px_10px_rgba(255,255,255,0.05)]">
          <CustomSlider variant="neumorphic-outset" defaultValue={value} max={100} step={1} className="flex-1" />
        </div>
      </div>
    </div>
  )
}

export function VerticalInsetSlider() {
  const [value, setValue] = useState([60])

  return (
    <div className="h-80 flex flex-col items-center w-full">
      <h3 className="text-white/80 font-medium mb-2">Vertical Inset</h3>
      <div className="flex-1 w-full flex justify-center">
        <div className="h-full py-8 px-8 bg-zinc-900/60 rounded-xl flex items-center justify-center">
          <div className="h-full w-16 py-8 px-6 rounded-lg bg-zinc-800/50 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.05)] flex items-center justify-center">
            <CustomSlider
              variant="neumorphic-inset"
              defaultValue={value}
              max={100}
              step={1}
              vertical
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export function VerticalOutsetSlider() {
  const [value, setValue] = useState([70])

  return (
    <div className="h-80 flex flex-col items-center w-full">
      <h3 className="text-white/80 font-medium mb-2">Vertical Outset</h3>
      <div className="flex-1 w-full flex justify-center">
        <div className="h-full py-8 px-8 bg-zinc-900/60 rounded-xl flex items-center justify-center">
          <div className="h-full w-16 py-8 px-6 rounded-lg bg-zinc-800/50 shadow-[5px_5px_10px_rgba(0,0,0,0.5),-5px_-5px_10px_rgba(255,255,255,0.05)] flex items-center justify-center">
            <CustomSlider
              variant="neumorphic-outset"
              defaultValue={value}
              max={100}
              step={1}
              vertical
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Add new bipolar slider examples
export function BipolarInsetSlider() {
  const [value, setValue] = useState([50])

  return (
    <div className="space-y-2">
      <h3 className="text-white/80 font-medium">Bipolar Inset</h3>
      <div className="py-4 px-4 bg-zinc-900/60 rounded-xl">
        <div className="p-4 rounded-lg bg-zinc-800/50 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.05)]">
          <CustomSlider
            variant="neumorphic-inset"
            defaultValue={value}
            min={0}
            max={100}
            step={1}
            className="flex-1"
            bipolar
            showValue
            valueSuffix="%"
          />
        </div>
      </div>
    </div>
  )
}

export function BipolarOutsetSlider() {
  const [value, setValue] = useState([50])

  return (
    <div className="space-y-2">
      <h3 className="text-white/80 font-medium">Bipolar Outset</h3>
      <div className="py-4 px-4 bg-zinc-900/60 rounded-xl">
        <div className="p-4 rounded-lg bg-zinc-800/50 shadow-[5px_5px_10px_rgba(0,0,0,0.5),-5px_-5px_10px_rgba(255,255,255,0.05)]">
          <CustomSlider
            variant="neumorphic-outset"
            defaultValue={value}
            min={0}
            max={100}
            step={1}
            className="flex-1"
            bipolar
            showValue
            valueSuffix="%"
          />
        </div>
      </div>
    </div>
  )
}

export function VerticalBipolarSlider() {
  const [value, setValue] = useState([50])

  return (
    <div className="h-80 flex flex-col items-center w-full">
      <h3 className="text-white/80 font-medium mb-2">Vertical Bipolar</h3>
      <div className="flex-1 w-full flex justify-center">
        <div className="h-full py-8 px-8 bg-zinc-900/60 rounded-xl flex items-center justify-center">
          <div className="h-full w-16 py-8 px-6 rounded-lg bg-zinc-800/50 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.05)] flex items-center justify-center">
            <CustomSlider
              variant="neumorphic-inset"
              defaultValue={value}
              min={0}
              max={100}
              step={1}
              vertical
              bipolar
              showValue
              valueSuffix="%"
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export function CustomizedNeumorphicSlider() {
  const [value, setValue] = useState([60])

  return (
    <div className="space-y-2">
      <h3 className="text-white/80 font-medium">Customized Neumorphic</h3>
      <div className="py-4 px-4 bg-zinc-900/60 rounded-xl">
        <div className="p-4 rounded-lg bg-zinc-800/50 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.05)]">
          <CustomSlider
            variant="neumorphic-inset"
            defaultValue={value}
            max={100}
            step={1}
            className="flex-1"
            shadowIntensity="strong"
            effectTightness="loose"
            borderRadius="pill"
            showValue
          />
        </div>
      </div>
    </div>
  )
}
