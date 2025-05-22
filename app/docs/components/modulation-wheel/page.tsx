"use client"

import { useState, useEffect, useRef } from "react"
import { ModWheel } from "@/components/ui/mod-wheel"
import { cn } from "@/lib/utils"
import { Copy, ExternalLink } from "lucide-react"

export default function ModulationWheelPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview")
  const [activeInstallTab, setActiveInstallTab] = useState<"cli" | "manual">("cli")
  const [modValue, setModValue] = useState(0.5)
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const importCode = `import { ModWheel } from "@/components/ui/mod-wheel"`
  const usageCode = `const [modValue, setModValue] = useState(0)

return (
  <ModWheel 
    onChange={(value) => setModValue(value)} 
    spring={false}
    min={0}
    max={1}
  />
)`
  const installCode = `npx shadcn@latest add mod-wheel`
  const componentCode = `"use client"

import * as React from "react"
import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export interface ModWheelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Enable spring return to rest position */
  spring?: boolean
  /** Callback when value changes */
  onChange?: (value: number) => void
  /** Callback when wheel is released */
  onRelease?: (value: number) => void
  /** Rest position when released */
  restPosition?: "center" | "bottom"
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Strength of spring snap effect */
  snapStrength?: number
  /** Disabled state */
  disabled?: boolean
  /** Label text */
  label?: React.ReactNode
}

// ... rest of component code`

  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-2 text-white">Modulation Wheel</h1>
      <p className="text-white/60">A vertical wheel control inspired by the modulation wheels found on MIDI keyboards and synthesizers.</p>

      <div className="flex mt-6 space-x-4">
        <a href="#" className="flex items-center text-sm text-white/60 hover:text-white transition-colors">
          <span>Docs</span>
          <ExternalLink className="ml-1 w-3 h-3" />
        </a>
        <a href="#" className="flex items-center text-sm text-white/60 hover:text-white transition-colors">
          <span>API Reference</span>
          <ExternalLink className="ml-1 w-3 h-3" />
        </a>
      </div>

      {/* Preview/Code Tabs */}
      <div className="mb-8 mt-8">
        <div className="flex border-b border-white/10 mb-4">
          <button
            className={cn(
              "px-4 py-2 text-sm font-medium",
              activeTab === "preview" ? "text-white border-b border-white" : "text-white/60",
            )}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </button>
          <button
            className={cn(
              "px-4 py-2 text-sm font-medium",
              activeTab === "code" ? "text-white border-b border-white" : "text-white/60",
            )}
            onClick={() => setActiveTab("code")}
          >
            Code
          </button>
        </div>

        <div className="glass-container p-6">
          {activeTab === "preview" ? (
            <div className="space-y-12">
              {/* Example */}
              <div>
                <h2 className="text-xl font-semibold mb-6 text-white/90">Standard Modulation Wheel</h2>
                <div className="flex flex-col items-center">
                  <ModWheel onChange={(value) => setModValue(value)} />
                  <div className="mt-4 text-white/80">Current Value: {modValue.toFixed(2)}</div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4 text-white/90">Features</h3>
                  <ul className="list-disc list-inside text-white/80 space-y-2 ml-2">
                    <li>Authentic modulation wheel behavior that stays in position when released</li>
                    <li>Optional spring behavior that can be enabled when needed</li>
                    <li>Normalized value output (0-1) for easy integration with audio engines</li>
                    <li>Subtle 3D tilt effect that mimics physical mod wheels</li>
                    <li>Fully keyboard accessible with arrow keys for precise control</li>
                    <li>Dark glass aesthetic with backdrop blur matching modern audio interfaces</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <pre className="text-sm text-white/80 overflow-x-auto p-4 font-mono">
              <code>{componentCode}</code>
            </pre>
          )}
        </div>
      </div>

      {/* Installation */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-white">Installation</h2>

        <div className="flex border-b border-white/10 mb-4">
          <button
            className={cn(
              "px-4 py-2 text-sm font-medium",
              activeInstallTab === "cli" ? "text-white border-b border-white" : "text-white/60",
            )}
            onClick={() => setActiveInstallTab("cli")}
          >
            CLI
          </button>
          <button
            className={cn(
              "px-4 py-2 text-sm font-medium",
              activeInstallTab === "manual" ? "text-white border-b border-white" : "text-white/60",
            )}
            onClick={() => setActiveInstallTab("manual")}
          >
            Manual
          </button>
        </div>

        <div className="glass-container p-4">
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <span className="text-white/60">pnpm</span>
              <span className="text-white/60">npm</span>
              <span className="text-white/60">yarn</span>
              <span className="text-white/60">bun</span>
            </div>
            <button
              className="text-white/60 hover:text-white transition-colors"
              onClick={() => handleCopy(installCode, "install")}
            >
              <Copy className={cn("w-4 h-4", copied === "install" && "text-green-500")} />
            </button>
          </div>
          <div className="mt-2 font-mono text-sm text-white/80">{installCode}</div>
        </div>
      </section>

      {/* Usage */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-white">Usage</h2>

        <div className="glass-container p-4 mb-4">
          <div className="flex justify-end">
            <button
              className="text-white/60 hover:text-white transition-colors"
              onClick={() => handleCopy(importCode, "import")}
            >
              <Copy className={cn("w-4 h-4", copied === "import" && "text-green-500")} />
            </button>
          </div>
          <pre className="font-mono text-sm text-white/80">
            <code>{importCode}</code>
          </pre>
        </div>

        <div className="glass-container p-4">
          <div className="flex justify-end">
            <button
              className="text-white/60 hover:text-white transition-colors"
              onClick={() => handleCopy(usageCode, "usage")}
            >
              <Copy className={cn("w-4 h-4", copied === "usage" && "text-green-500")} />
            </button>
          </div>
          <pre className="font-mono text-sm text-white/80">
            <code>{usageCode}</code>
          </pre>
        </div>
      </section>

      {/* Props Section */}
      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4 text-white">Props</h2>

        <div className="glass-container p-4 overflow-x-auto">
          <table className="w-full text-sm text-white/80">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-2 px-4 font-medium text-white">Prop</th>
                <th className="text-left py-2 px-4 font-medium text-white">Type</th>
                <th className="text-left py-2 px-4 font-medium text-white">Default</th>
                <th className="text-left py-2 px-4 font-medium text-white">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5">
                <td className="py-2 px-4 font-mono">onChange</td>
                <td className="py-2 px-4 font-mono">function</td>
                <td className="py-2 px-4 font-mono">-</td>
                <td className="py-2 px-4">Callback function when value changes</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2 px-4 font-mono">onRelease</td>
                <td className="py-2 px-4 font-mono">function</td>
                <td className="py-2 px-4 font-mono">-</td>
                <td className="py-2 px-4">Callback function when wheel is released</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2 px-4 font-mono">spring</td>
                <td className="py-2 px-4 font-mono">boolean</td>
                <td className="py-2 px-4 font-mono">false</td>
                <td className="py-2 px-4">Enable spring return to rest position</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2 px-4 font-mono">restPosition</td>
                <td className="py-2 px-4 font-mono">string</td>
                <td className="py-2 px-4 font-mono">"bottom"</td>
                <td className="py-2 px-4">Rest position when released ("center" or "bottom")</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2 px-4 font-mono">min</td>
                <td className="py-2 px-4 font-mono">number</td>
                <td className="py-2 px-4 font-mono">0</td>
                <td className="py-2 px-4">Minimum value</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2 px-4 font-mono">max</td>
                <td className="py-2 px-4 font-mono">number</td>
                <td className="py-2 px-4 font-mono">1</td>
                <td className="py-2 px-4">Maximum value</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2 px-4 font-mono">snapStrength</td>
                <td className="py-2 px-4 font-mono">number</td>
                <td className="py-2 px-4 font-mono">0.8</td>
                <td className="py-2 px-4">Strength of spring snap effect (0.1 to 1)</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2 px-4 font-mono">disabled</td>
                <td className="py-2 px-4 font-mono">boolean</td>
                <td className="py-2 px-4 font-mono">false</td>
                <td className="py-2 px-4">Disables the control</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono">label</td>
                <td className="py-2 px-4 font-mono">ReactNode</td>
                <td className="py-2 px-4 font-mono">"Mod Wheel"</td>
                <td className="py-2 px-4">Label text for the component</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Examples Section */}
      <section className="mt-8 mb-12">
        <h2 className="text-xl font-bold mb-4 text-white">Examples</h2>

        <div className="glass-container p-6">
          <h3 className="text-lg font-medium mb-4 text-white/90">With Spring Behavior</h3>
          <div className="mb-6">
            <pre className="font-mono text-sm text-white/80 p-4 bg-black/30 rounded-lg overflow-x-auto">
              <code>{`const [modValue, setModValue] = useState(0)

return (
  <div>
    <ModWheel 
      onChange={setModValue}
      spring={true}
      restPosition="bottom"
      snapStrength={0.8}
      label="Vibrato Depth"
    />
    <div>Vibrato: {(modValue * 100).toFixed(0)}%</div>
  </div>
)`}</code>
            </pre>
          </div>

          <h3 className="text-lg font-medium mb-4 text-white/90">MIDI Integration</h3>
          <div>
            <pre className="font-mono text-sm text-white/80 p-4 bg-black/30 rounded-lg overflow-x-auto">
              <code>{`const [modValue, setModValue] = useState(0)

const handleModChange = (value) => {
  setModValue(value)
  
  // Send MIDI CC message (CC #1 is standard for mod wheel)
  if (midiOutput) {
    const midiValue = Math.round(value * 127)
    midiOutput.sendControlChange(1, midiValue, midiChannel)
  }
}

return (
  <ModWheel 
    onChange={handleModChange}
    min={0}
    max={1}
  />
)`}</code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  )
}
