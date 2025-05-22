"use client"

import { useState } from "react"
import { XYPad } from "@/components/ui/XYPad"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { Copy, ExternalLink } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function GraphXYPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview")
  const [activeInstallTab, setActiveInstallTab] = useState<"cli" | "manual">("cli")
  const [x, setX] = useState(0.5)
  const [y, setY] = useState(0.5)
  const [showGrid, setShowGrid] = useState(true)
  const [snapToGrid, setSnapToGrid] = useState(false)
  const [rippleEffect, setRippleEffect] = useState(true)
  const [size, setSize] = useState(300)
  const [copied, setCopied] = useState<string | null>(null)

  // Simulate audio parameters
  const pan = x * 2 - 1 // -1 to 1
  const gain = 1 - y // 1 to 0 (inverted)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const pnpmCode = `pnpm add audioui`
  const npmCode = `npm i audioui`
  const yarnCode = `yarn add audioui`
  const bunCode = `bun add audioui`
  const importCode = `import { XYPad } from "audioui"`
  const usageCode = `<XYPad x={x} y={y} onChange={handleChange} width={300} height={300} showGrid={true} />`

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl font-bold mb-2">XY Pad</h1>
          <p className="text-white/70">
            A two-dimensional control that lets users manipulate X and Y parameters simultaneously.
          </p>
        </header>

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
                  <h2 className="text-xl font-semibold mb-6 text-white/90">Interactive XY Pad</h2>
                  <div className="flex flex-col items-center">
                    <XYPad
                      x={x}
                      y={y}
                      onChange={(newX, newY) => {
                        setX(newX)
                        setY(newY)
                      }}
                      width={size}
                      height={size}
                      showGrid={showGrid}
                      snapToGrid={snapToGrid}
                      rippleEffect={rippleEffect}
                      theme="default"
                      stepX={0.05}
                      stepY={0.05}
                      className="mb-6"
                    />

                    <div className="grid grid-cols-2 gap-6 w-full max-w-xs mt-4">
                      <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                        <div className="text-white/60 text-sm mb-1">Pan</div>
                        <div className="text-white text-xl">{pan.toFixed(2)}</div>
                      </div>

                      <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                        <div className="text-white/60 text-sm mb-1">Gain</div>
                        <div className="text-white text-xl">{gain.toFixed(2)}</div>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="w-full max-w-md mt-6 space-y-4">
                      {/* Size slider */}
                      <div className="w-full">
                        <label className="block text-white/80 mb-2">Size: {size}px</label>
                        <Slider
                          value={[size]}
                          min={150}
                          max={500}
                          step={10}
                          onValueChange={(value) => setSize(value[0])}
                        />
                      </div>

                      {/* Options */}
                      <div className="flex flex-wrap gap-4">
                        <label className="flex items-center gap-2 text-white/80">
                          <input
                            type="checkbox"
                            checked={showGrid}
                            onChange={(e) => setShowGrid(e.target.checked)}
                            className="rounded bg-white/10 border-white/20 text-white"
                          />
                          Show Grid
                        </label>

                        <label className="flex items-center gap-2 text-white/80">
                          <input
                            type="checkbox"
                            checked={snapToGrid}
                            onChange={(e) => setSnapToGrid(e.target.checked)}
                            className="rounded bg-white/10 border-white/20 text-white"
                          />
                          Snap to Grid
                        </label>

                        <label className="flex items-center gap-2 text-white/80">
                          <input
                            type="checkbox"
                            checked={rippleEffect}
                            onChange={(e) => setRippleEffect(e.target.checked)}
                            className="rounded bg-white/10 border-white/20 text-white"
                          />
                          Ripple Effect
                        </label>
                      </div>
                    </div>

                    <div className="text-white/50 text-sm mt-6">Use mouse or arrow keys (with Shift for Y-axis)</div>
                  </div>
                </div>
              </div>
            ) : (
              <pre className="text-sm text-white/80 overflow-x-auto p-4 font-mono">
                <div>
                </div>
              </pre>
            )}
          </div>
        </div>

        {/* Installation */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-4">Installation</h2>
          <Tabs defaultValue="cli" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-6 bg-zinc-900/50 rounded-md overflow-hidden">
              <TabsTrigger
                value="cli"
                className="py-3 px-4 data-[state=active]:bg-zinc-800 data-[state=active]:text-white"
              >
                CLI
              </TabsTrigger>
              <TabsTrigger
                value="manual"
                className="py-3 px-4 data-[state=active]:bg-zinc-800 data-[state=active]:text-white"
              >
                Manual
              </TabsTrigger>
            </TabsList>
            <TabsContent value="cli" className="data-[state=inactive]:hidden">
              <div className="flex space-x-2 mb-2 text-sm">
                <span className="px-4 py-2 bg-zinc-800 rounded">pnpm</span>
                <span className="px-4 py-2 text-zinc-400">npm</span>
                <span className="px-4 py-2 text-zinc-400">yarn</span>
                <span className="px-4 py-2 text-zinc-400">bun</span>
              </div>
              <div className="relative">
                <pre className="bg-black rounded-md p-4 overflow-x-auto text-white/80 font-mono text-sm">
                  <code>{pnpmCode}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 h-8 w-8 rounded-md bg-zinc-800/50 hover:bg-zinc-700"
                  onClick={() => copyToClipboard(pnpmCode, "pnpm")}
                >
                  {copied === "pnpm" ? <Check size={16} /> : <Copy size={16} />}
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="manual" className="data-[state=inactive]:hidden">
              <div className="bg-black rounded-md p-4">
                <p className="text-white/80 mb-4">
                  To manually install the component, copy the component file into your project:
                </p>
                <ol className="list-decimal list-inside text-white/70 space-y-2 mb-4">
                  <li>
                    Copy the <code className="bg-zinc-800 px-2 py-1 rounded text-white/90">xy-pad.tsx</code> file into your project
                  </li>
                  <li>Make sure you have the required dependencies installed</li>
                  <li>Import and use the component in your application</li>
                </ol>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Usage */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-12">Usage</h2>
          <div className="space-y-8">
            <div className="relative">
              <pre className="bg-black rounded-md p-4 overflow-x-auto text-white/80 font-mono text-sm">
                <code>{importCode}</code>
              </pre>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 h-8 w-8 rounded-md bg-zinc-800/50 hover:bg-zinc-700"
                onClick={() => copyToClipboard(importCode, "import")}
              >
                {copied === "import" ? <Check size={16} /> : <Copy size={16} />}
              </Button>
            </div>
            <div className="relative">
              <pre className="bg-black rounded-md p-4 overflow-x-auto text-white/80 font-mono text-sm">
                <code>{usageCode}</code>
              </pre>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 h-8 w-8 rounded-md bg-zinc-800/50 hover:bg-zinc-700"
                onClick={() => copyToClipboard(usageCode, "usage")}
              >
                {copied === "usage" ? <Check size={16} /> : <Copy size={16} />}
              </Button>
            </div>
          </div>
        </section>

        {/* Props Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-4">Props</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="py-2 px-4 text-left font-medium text-white">Prop</th>
                  <th className="py-2 px-4 text-left font-medium text-white">Type</th>
                  <th className="py-2 px-4 text-left font-medium text-white">Default</th>
                  <th className="py-2 px-4 text-left font-medium text-white">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 px-4 font-mono text-sm">x</td>
                  <td className="py-2 px-4 font-mono text-sm">number</td>
                  <td className="py-2 px-4 font-mono text-sm">0.5</td>
                  <td className="py-2 px-4 text-white/80">X-axis value (0-1 range)</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 px-4 font-mono text-sm">y</td>
                  <td className="py-2 px-4 font-mono text-sm">number</td>
                  <td className="py-2 px-4 font-mono text-sm">0.5</td>
                  <td className="py-2 px-4 text-white/80">Y-axis value (0-1 range)</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 px-4 font-mono text-sm">onChange</td>
                  <td className="py-2 px-4 font-mono text-sm">function</td>
                  <td className="py-2 px-4 font-mono text-sm">-</td>
                  <td className="py-2 px-4 text-white/80">Callback function (newX, newY) =&gt; void</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 px-4 font-mono text-sm">width</td>
                  <td className="py-2 px-4 font-mono text-sm">number</td>
                  <td className="py-2 px-4 font-mono text-sm">200</td>
                  <td className="py-2 px-4 text-white/80">Width in pixels</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 px-4 font-mono text-sm">height</td>
                  <td className="py-2 px-4 font-mono text-sm">number</td>
                  <td className="py-2 px-4 font-mono text-sm">200</td>
                  <td className="py-2 px-4 text-white/80">Height in pixels</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 px-4 font-mono text-sm">stepX</td>
                  <td className="py-2 px-4 font-mono text-sm">number</td>
                  <td className="py-2 px-4 font-mono text-sm">0.01</td>
                  <td className="py-2 px-4 text-white/80">Step size for X-axis</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 px-4 font-mono text-sm">stepY</td>
                  <td className="py-2 px-4 font-mono text-sm">number</td>
                  <td className="py-2 px-4 font-mono text-sm">0.01</td>
                  <td className="py-2 px-4 text-white/80">Step size for Y-axis</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 px-4 font-mono text-sm">showGrid</td>
                  <td className="py-2 px-4 font-mono text-sm">boolean</td>
                  <td className="py-2 px-4 font-mono text-sm">false</td>
                  <td className="py-2 px-4 text-white/80">Show grid lines</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 px-4 font-mono text-sm">snapToGrid</td>
                  <td className="py-2 px-4 font-mono text-sm">boolean</td>
                  <td className="py-2 px-4 font-mono text-sm">false</td>
                  <td className="py-2 px-4 text-white/80">Snap values to grid</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 px-4 font-mono text-sm">theme</td>
                  <td className="py-2 px-4 font-mono text-sm">string</td>
                  <td className="py-2 px-4 font-mono text-sm">"default"</td>
                  <td className="py-2 px-4 text-white/80">Visual theme ("default", "neon", "midnight", "sunset", "nightPurple")</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 px-4 font-mono text-sm">rippleEffect</td>
                  <td className="py-2 px-4 font-mono text-sm">boolean</td>
                  <td className="py-2 px-4 font-mono text-sm">true</td>
                  <td className="py-2 px-4 text-white/80">Enable ripple effect on interaction</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Examples Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-4">Examples</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-medium mb-3">Filter Control</h3>
              <div className="relative">
                <pre className="bg-black rounded-md p-4 overflow-x-auto text-white/80 font-mono text-sm">
                  <code>{`const [x, setX] = useState(0.5)
const [y, setY] = useState(0.5)

const handleChange = (newX, newY) => {
  setX(newX)
  setY(newY)
  
  // Map to audio parameters
  const frequency = 20 + newX * 19980 // 20Hz to 20kHz
  const resonance = newY * 20 // 0 to 20
  
  audioNode.frequency.value = frequency
  audioNode.Q.value = resonance
}

return (
  <div>
    <XYPad
      x={x}
      y={y}
      onChange={handleChange}
      width={300}
      height={300}
      showGrid={true}
      theme="neon"
    />
    <div className="mt-2">
      <div>Frequency: {(20 + x * 19980).toFixed(0)}Hz</div>
      <div>Resonance: {(y * 20).toFixed(1)}</div>
    </div>
  </div>
)`}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 h-8 w-8 rounded-md bg-zinc-800/50 hover:bg-zinc-700"
                  onClick={() => copyToClipboard(`const [x, setX] = useState(0.5)\nconst [y, setY] = useState(0.5)\n\nconst handleChange = (newX, newY) => {\n  setX(newX)\n  setY(newY)\n  \n  // Map to audio parameters\n  const frequency = 20 + newX * 19980 // 20Hz to 20kHz\n  const resonance = newY * 20 // 0 to 20\n  \n  audioNode.frequency.value = frequency\n  audioNode.Q.value = resonance\n}\n\nreturn (\n  <div>\n    <XYPad\n      x={x}\n      y={y}\n      onChange={handleChange}\n      width={300}\n      height={300}\n      showGrid={true}\n      theme=\"neon\"\n    />\n    <div className=\"mt-2\">\n      <div>Frequency: {(20 + x * 19980).toFixed(0)}Hz</div>\n      <div>Resonance: {(y * 20).toFixed(1)}</div>\n    </div>\n  </div>\n)`,'example1')}
                >
                  {copied === "example1" ? <Check size={16} /> : <Copy size={16} />}
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3">Customized Theme</h3>
              <div className="relative">
                <pre className="bg-black rounded-md p-4 overflow-x-auto text-white/80 font-mono text-sm">
                  <code>{`<XYPad
  x={x}
  y={y}
  onChange={handleChange}
  width={200}
  height={200}
  trackColor="rgba(60, 20, 80, 0.6)"
  thumbColor="rgba(220, 140, 255, 0.9)"
  showGrid={true}
  snapToGrid={true}
  stepX={0.1}
  stepY={0.1}
/>`}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 h-8 w-8 rounded-md bg-zinc-800/50 hover:bg-zinc-700"
                  onClick={() => copyToClipboard(`<XYPad\n  x={x}\n  y={y}\n  onChange={handleChange}\n  width={200}\n  height={200}\n  trackColor=\"rgba(60, 20, 80, 0.6)\"\n  thumbColor=\"rgba(220, 140, 255, 0.9)\"\n  showGrid={true}\n  snapToGrid={true}\n  stepX={0.1}\n  stepY={0.1}\n/>`,'example2')}
                >
                  {copied === "example2" ? <Check size={16} /> : <Copy size={16} />}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-white/50 text-sm py-8 border-t border-zinc-800">
          <p>AudioUI XY Pad Component • MIT License</p>
          <p className="mt-2">
            Created by{" "}
            <a href="https://cohen-concepts.com" className="text-white/70 hover:text-white underline">
              Cohen Concepts
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}
