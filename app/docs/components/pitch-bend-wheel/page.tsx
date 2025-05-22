"use client"

import { useState } from "react"
import { EnhancedPitchBend } from "@/components/ui/enhanced-pitch-bend"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ExternalLink, Copy, Check, Terminal, FileCode } from "lucide-react"

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview")
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli")
  const [packageManager, setPackageManager] = useState<"pnpm" | "npm" | "yarn" | "bun">("pnpm")
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({})

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedStates({ ...copiedStates, [id]: true })
    setTimeout(() => {
      setCopiedStates({ ...copiedStates, [id]: false })
    }, 2000)
  }

  const installCommands = {
    pnpm: "pnpm add audioui",
    npm: "npm i audioui",
    yarn: "yarn add audioui",
    bun: "bun add audioui",
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <header className="mb-12">
          <h1 className="text-3xl font-bold mb-3 tracking-tight">AudioUI</h1>
          <p className="text-white/70 text-lg mb-4 max-w-2xl">Pitch Bend</p>
          <div className="flex gap-6">
            <Link href="/docs" className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
              Docs
            </Link>
            <Link href="/api" className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
              API Reference <ExternalLink size={14} />
            </Link>
          </div>
        </header>

        <section className="mb-12">
          <div className="flex border-b border-white/10 mb-6">
            <button
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors",
                activeTab === "preview" ? "text-white border-b-2 border-white" : "text-white/60 hover:text-white/80",
              )}
              onClick={() => setActiveTab("preview")}
            >
              Preview
            </button>
            <button
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors",
                activeTab === "code" ? "text-white border-b-2 border-white" : "text-white/60 hover:text-white/80",
              )}
              onClick={() => setActiveTab("code")}
            >
              Code
            </button>
          </div>

          <div className="rounded-2xl backdrop-blur-md bg-black/40 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] p-6 md:p-8">
            {activeTab === "preview" ? (
              <div className="space-y-10">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Pitch Bend Component</h2>
                  <p className="text-white/70 mb-6">
                    Vertical wheel control inspired by MIDI keyboards and synthesizers.
                  </p>
                  <div className="flex flex-wrap justify-center gap-12 py-6">
                    <div className="flex flex-col items-center">
                      <EnhancedPitchBend />
                      <p className="mt-2 text-white/60 text-sm">Spring-loaded, returns to center</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4">Component Features</h2>
                  <ul className="list-disc list-inside text-white/80 space-y-2 ml-2">
                    <li>Realistic physics with configurable spring behavior</li>
                    <li>Normalized value output for easy integration</li>
                    <li>Subtle 3D tilt effect during interaction</li>
                    <li>Fully keyboard accessible with arrow keys</li>
                    <li>Dark glass aesthetic with backdrop blur</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4">PitchBend Component</h2>
                  <div className="relative">
                    <pre className="rounded-lg bg-black/60 p-4 overflow-x-auto text-sm font-mono text-white/90">
                      {`import { PitchBend } from "@cohen-concepts/audio-ui"

export default function MyComponent() {
  const handleChange = (value) => {
    console.log("Pitch bend value:", value)
    // Value will be 0 at center
    // Positive when moved up (max at top)
    // Negative when moved down (min at bottom)
  }
  
  // Enhanced visibility with custom styling
  return (
    <PitchBend 
      onChange={handleChange}
      className="border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
    />
  )
}`}
                    </pre>
                    <button
                      className="absolute top-3 right-3 p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
                      onClick={() =>
                        handleCopy(
                          `import { PitchBend } from "@cohen-concepts/audio-ui"

export default function MyComponent() {
  const handleChange = (value) => {
    console.log("Pitch bend value:", value)
    // Value will be 0 at center
    // Positive when moved up (max at top)
    // Negative when moved down (min at bottom)
  }
  
  // Enhanced visibility with custom styling
  return (
    <PitchBend 
      onChange={handleChange}
      className="border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
    />
  )
}`,
                          "pitch-bend-code",
                        )
                      }
                    >
                      {copiedStates["pitch-bend-code"] ? (
                        <Check size={16} className="text-green-400" />
                      ) : (
                        <Copy size={16} className="text-white/70" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Installation</h2>
          <div className="flex border-b border-white/10 mb-4">
            <button
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors",
                installTab === "cli" ? "text-white border-b-2 border-white" : "text-white/60 hover:text-white/80",
              )}
              onClick={() => setInstallTab("cli")}
            >
              <Terminal size={16} />
              CLI
            </button>
            <button
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors",
                installTab === "manual" ? "text-white border-b-2 border-white" : "text-white/60 hover:text-white/80",
              )}
              onClick={() => setInstallTab("manual")}
            >
              <FileCode size={16} />
              Manual
            </button>
          </div>

          <div className="rounded-2xl backdrop-blur-md bg-black/40 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] p-6">
            {installTab === "cli" ? (
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(["pnpm", "npm", "yarn", "bun"] as const).map((pm) => (
                    <button
                      key={pm}
                      className={cn(
                        "px-3 py-1 text-sm rounded-full transition-colors",
                        packageManager === pm
                          ? "bg-white/10 text-white"
                          : "bg-transparent text-white/60 hover:text-white/80",
                      )}
                      onClick={() => setPackageManager(pm)}
                    >
                      {pm}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <pre className="rounded-lg bg-black/60 p-4 overflow-x-auto text-sm font-mono text-white/90">
                    {installCommands[packageManager]}
                  </pre>
                  <button
                    className="absolute top-3 right-3 p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
                    onClick={() => handleCopy(installCommands[packageManager], "install-command")}
                  >
                    {copiedStates["install-command"] ? (
                      <Check size={16} className="text-green-400" />
                    ) : (
                      <Copy size={16} className="text-white/70" />
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-white/70">To install manually, download the component and add it to your project:</p>
                <ol className="list-decimal list-inside text-white/70 space-y-2">
                  <li>Download the component file from the repository</li>
                  <li>Place it in your components directory</li>
                  <li>Import and use it in your application</li>
                </ol>
                <div className="relative mt-4">
                  <pre className="rounded-lg bg-black/60 p-4 overflow-x-auto text-sm font-mono text-white/90">
                    {`// 1. Copy the component file to your project
// 2. Import it in your application
import { PitchBend } from "@/components/ui"`}
                  </pre>
                  <button
                    className="absolute top-3 right-3 p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
                    onClick={() =>
                      handleCopy(
                        `// 1. Copy the component file to your project
// 2. Import it in your application
import { PitchBend } from "@/components/ui"`,
                        "manual-install",
                      )
                    }
                  >
                    {copiedStates["manual-install"] ? (
                      <Check size={16} className="text-green-400" />
                    ) : (
                      <Copy size={16} className="text-white/70" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Usage</h2>
          <div className="space-y-6">
            <div className="rounded-2xl backdrop-blur-md bg-black/40 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] p-6">
              <h3 className="text-lg font-medium mb-4">Basic Usage</h3>
              <div className="relative">
                <pre className="rounded-lg bg-black/60 p-4 overflow-x-auto text-sm font-mono text-white/90">
                  {`import { PitchBend } from "@cohen-concepts/audio-ui"

export default function AudioControls() {
  return (
    <div className="flex justify-center">
      <PitchBend 
        onChange={(value) => console.log("Pitch:", value)} 
        // The wheel automatically springs back to center (value: 0) when released
        spring={true}
        // Enhanced visibility with brighter borders and glow
        className="border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
      />
    </div>
  )
}`}
                </pre>
                <button
                  className="absolute top-3 right-3 p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
                  onClick={() =>
                    handleCopy(
                      `import { PitchBend } from "@cohen-concepts/audio-ui"

export default function AudioControls() {
  return (
    <div className="flex justify-center">
      <PitchBend 
        onChange={(value) => console.log("Pitch:", value)} 
        // The wheel automatically springs back to center (value: 0) when released
        spring={true}
        // Enhanced visibility with brighter borders and glow
        className="border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
      />
    </div>
  )
}`,
                      "basic-usage",
                    )
                  }
                >
                  {copiedStates["basic-usage"] ? (
                    <Check size={16} className="text-green-400" />
                  ) : (
                    <Copy size={16} className="text-white/70" />
                  )}
                </button>
              </div>
            </div>

            <div className="rounded-2xl backdrop-blur-md bg-black/40 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] p-6">
              <h3 className="text-lg font-medium mb-4">With Web Audio API</h3>
              <div className="relative">
                <pre className="rounded-lg bg-black/60 p-4 overflow-x-auto text-sm font-mono text-white/90">
                  {`import { useState, useEffect } from "react"
import { PitchBend } from "@cohen-concepts/audio-ui"

export default function Synthesizer() {
  const [audioContext, setAudioContext] = useState(null)
  const [oscillator, setOscillator] = useState(null)
  
  useEffect(() => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    osc.connect(ctx.destination)
    osc.frequency.value = 440 // A4 note
    osc.start()
    
    setAudioContext(ctx)
    setOscillator(osc)
    
    return () => {
      osc.stop()
      ctx.close()
    }
  }, [])
  
  const handlePitchBend = (value) => {
    if (oscillator) {
      // MIDI pitch bend typically affects pitch by ±2 semitones
      // 1 semitone is approximately a factor of 2^(1/12)
      const semitones = value * 2 // ±2 semitone range
      const frequencyRatio = Math.pow(2, semitones / 12)
      oscillator.frequency.value = 440 * frequencyRatio
    }
  }
  
  return (
    <PitchBend 
      onChange={handlePitchBend}
      className="border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
    />
  )
}`}
                </pre>
                <button
                  className="absolute top-3 right-3 p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
                  onClick={() =>
                    handleCopy(
                      `import { useState, useEffect } from "react"
import { PitchBend } from "@cohen-concepts/audio-ui"

export default function Synthesizer() {
  const [audioContext, setAudioContext] = useState(null)
  const [oscillator, setOscillator] = useState(null)
  
  useEffect(() => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    osc.connect(ctx.destination)
    osc.frequency.value = 440 // A4 note
    osc.start()
    
    setAudioContext(ctx)
    setOscillator(osc)
    
    return () => {
      osc.stop()
      ctx.close()
    }
  }, [])
  
  const handlePitchBend = (value) => {
    if (oscillator) {
      // MIDI pitch bend typically affects pitch by ±2 semitones
      // 1 semitone is approximately a factor of 2^(1/12)
      const semitones = value * 2 // ±2 semitone range
      const frequencyRatio = Math.pow(2, semitones / 12)
      oscillator.frequency.value = 440 * frequencyRatio
    }
  }
  
  return (
    <PitchBend 
      onChange={handlePitchBend}
      className="border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
    />
  )
}`,
                      "web-audio-usage",
                    )
                  }
                >
                  {copiedStates["web-audio-usage"] ? (
                    <Check size={16} className="text-green-400" />
                  ) : (
                    <Copy size={16} className="text-white/70" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Props</h2>
          <div className="rounded-2xl backdrop-blur-md bg-black/40 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-white/70 border-b border-white/10">
                  <tr>
                    <th className="px-4 py-2">Prop</th>
                    <th className="px-4 py-2">Type</th>
                    <th className="px-4 py-2">Default</th>
                    <th className="px-4 py-2">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className="px-4 py-3 font-mono text-white/90">spring</td>
                    <td className="px-4 py-3 font-mono text-white/70">boolean</td>
                    <td className="px-4 py-3 font-mono text-white/70">true</td>
                    <td className="px-4 py-3 text-white/80">Whether the wheel returns to rest when released</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-white/90">onChange</td>
                    <td className="px-4 py-3 font-mono text-white/70">{"(value: number) => void"}</td>
                    <td className="px-4 py-3 font-mono text-white/70">-</td>
                    <td className="px-4 py-3 text-white/80">Called continuously during drag with the current value</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-white/90">onRelease</td>
                    <td className="px-4 py-3 font-mono text-white/70">{"(value: number) => void"}</td>
                    <td className="px-4 py-3 font-mono text-white/70">-</td>
                    <td className="px-4 py-3 text-white/80">Called when the drag ends with the final value</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-white/90">restPosition</td>
                    <td className="px-4 py-3 font-mono text-white/70">"center" | "bottom"</td>
                    <td className="px-4 py-3 font-mono text-white/70">"center"</td>
                    <td className="px-4 py-3 text-white/80">Where the wheel returns to when released</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-white/90">min</td>
                    <td className="px-4 py-3 font-mono text-white/70">number</td>
                    <td className="px-4 py-3 font-mono text-white/70">-1</td>
                    <td className="px-4 py-3 text-white/80">Minimum output value (top position)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-white/90">max</td>
                    <td className="px-4 py-3 font-mono text-white/70">number</td>
                    <td className="px-4 py-3 font-mono text-white/70">1</td>
                    <td className="px-4 py-3 text-white/80">Maximum output value (bottom position)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Theme Variants</h3>
                <p className="mb-2 text-white/80">
                  <code className="font-mono text-white/90">variant</code>: Predefined color themes including:
                </p>
                <ul className="list-disc list-inside text-white/80 space-y-1 ml-4">
                  <li>
                    <code className="font-mono text-white/90">default</code>: Enhanced white glow
                  </li>
                  <li>
                    <code className="font-mono text-white/90">subtle</code>: Minimal, understated styling
                  </li>
                  <li>
                    <code className="font-mono text-white/90">neon</code>: Cyan/teal accent colors
                  </li>
                  <li>
                    <code className="font-mono text-white/90">purple</code>: Purple accent colors
                  </li>
                  <li>
                    <code className="font-mono text-white/90">amber</code>: Amber/gold accent colors
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Size Options</h3>
                <p className="mb-2 text-white/80">
                  <code className="font-mono text-white/90">size</code>: Component size variants:
                </p>
                <ul className="list-disc list-inside text-white/80 space-y-1 ml-4">
                  <li>
                    <code className="font-mono text-white/90">sm</code>: Smaller size (32px height)
                  </li>
                  <li>
                    <code className="font-mono text-white/90">default</code>: Standard size (40px height)
                  </li>
                  <li>
                    <code className="font-mono text-white/90">lg</code>: Larger size (48px height)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Visual Effects</h3>
                <p className="mb-2 text-white/80">
                  <code className="font-mono text-white/90">glowIntensity</code>: Control the intensity of glow effects:
                </p>
                <ul className="list-disc list-inside text-white/80 space-y-1 ml-4">
                  <li>
                    <code className="font-mono text-white/90">none</code>: No glow effect
                  </li>
                  <li>
                    <code className="font-mono text-white/90">low</code>: Subtle glow
                  </li>
                  <li>
                    <code className="font-mono text-white/90">medium</code>: Standard glow (default)
                  </li>
                  <li>
                    <code className="font-mono text-white/90">high</code>: Intense glow effect
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Custom Styling</h3>
                <ul className="list-disc list-inside text-white/80 space-y-1 ml-4">
                  <li>
                    <code className="font-mono text-white/90">accentColor</code>: Override the accent color with any
                    custom color value
                  </li>
                  <li>
                    <code className="font-mono text-white/90">glowColor</code>: Override the glow effect color
                  </li>
                  <li>
                    <code className="font-mono text-white/90">backdropBlurAmount</code>: Control the backdrop blur
                    intensity (<code>none</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>)
                  </li>
                  <li>
                    <code className="font-mono text-white/90">borderWidth</code>: Adjust border thickness (
                    <code>thin</code>, <code>default</code>, <code>thick</code>)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Animation Control</h3>
                <p className="mb-2 text-white/80">
                  <code className="font-mono text-white/90">animationSpeed</code>: Adjust the spring animation speed:
                </p>
                <ul className="list-disc list-inside text-white/80 space-y-1 ml-4">
                  <li>
                    <code className="font-mono text-white/90">slow</code>: Slower, more gradual spring
                  </li>
                  <li>
                    <code className="font-mono text-white/90">default</code>: Standard spring animation
                  </li>
                  <li>
                    <code className="font-mono text-white/90">medium</code>: Faster, more responsive spring
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Accessibility</h3>
                <ul className="list-disc list-inside text-white/80 space-y-1 ml-4">
                  <li>
                    <code className="font-mono text-white/90">ariaLabel</code>: Custom aria-label for improved
                    accessibility
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Class Customization</h3>
                <ul className="list-disc list-inside text-white/80 space-y-1 ml-4">
                  <li>
                    <code className="font-mono text-white/90">className</code>: Custom classes for the main component
                  </li>
                  <li>
                    <code className="font-mono text-white/90">handleClassName</code>: Custom classes for the handle
                    element
                  </li>
                  <li>
                    <code className="font-mono text-white/90">glowClassName</code>: Custom classes for the glow effect
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-12 text-center text-white/60 text-sm">
          <p>
            Developed by{" "}
            <Link href="https://cohen-concepts.com" className="text-white/80 hover:text-white transition-colors">
              Cohen-Concepts.com
            </Link>
          </p>
        </footer>
      </div>
    </main>
  )
}
