"use client"

import { useState } from "react"
import { RotaryKnobDetailed } from "@/components/ui/rotary-knob-detailed"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Check, Copy } from "lucide-react"

export default function Documentation() {
  const [volume, setVolume] = useState(0.32)
  const [filter, setFilter] = useState(0.49)
  const [reverb, setReverb] = useState(0.5)
  const [lightX, setLightX] = useState(75)
  const [lightY, setLightY] = useState(25)
  const [metallic, setMetallic] = useState(50)
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const installationCode = `npm i audioui`
  const pnpmCode = `pnpm add audioui`
  const yarnCode = `yarn add audioui`
  const bunCode = `bun add audioui`

  const importCode = `import { RotaryKnobDetailed } from "audioui"`

  const basicUsageCode = `<RotaryKnobDetailed
  value={0.5}
  onChange={setValue}
  min={0}
  max={1}
  step={0.01}
  size="md"
  lightX={75}
  lightY={25}
  metallic={50}
/>`

  const customDisplayCode = `const [value, setValue] = useState(0.5)

return (
  <div>
    <div className="flex justify-between">
      <span>Volume</span>
      <span>{Math.round(value * 100)}%</span>
    </div>
    <RotaryKnobDetailed
      value={value}
      onChange={setValue}
      size="md"
      lightX={75}
      lightY={25}
      metallic={50}
    />
  </div>
)`

  const customMaterialCode = `<RotaryKnobDetailed
  value={value}
  onChange={setValue}
  min={0}
  max={1}
  step={0.01}
  size="lg"
  lightX={80}
  lightY={20}
  metallic={90} // Chrome-like material
  showTicks={true}
  showIndicator={true}
/>`

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Knob - Specular</h1>
          <p className="text-white/70">
            A high-fidelity, customizable rotary knob component with realistic metallic effects
          </p>
        </header>

        {/* Interactive Examples Section */}
        <section className="mb-16 bg-zinc-900/50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
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

          <div className="bg-black/40 rounded-md p-4 mb-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between">
                  <label className="text-white/70 text-sm">Metallic: {metallic}%</label>
                </div>
                <Slider
                  value={[metallic]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setMetallic(value[0])}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between">
                  <label className="text-white/70 text-sm">Light X: {lightX}%</label>
                </div>
                <Slider
                  value={[lightX]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setLightX(value[0])}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between">
                  <label className="text-white/70 text-sm">Light Y: {lightY}%</label>
                </div>
                <Slider
                  value={[lightY]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setLightY(value[0])}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Installation Section */}
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
                  <code>pnpm add audioui</code>
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
                    Copy the{" "}
                    <code className="bg-zinc-800 px-2 py-1 rounded text-white/90">rotary-knob-detailed.tsx</code> file
                    into your project
                  </li>
                  <li>Make sure you have the required dependencies installed</li>
                  <li>Import and use the component in your application</li>
                </ol>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Usage Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-12">Usage</h2>

          <div className="space-y-8">
            <div className="relative">
              <pre className="bg-black rounded-md p-4 overflow-x-auto text-white/80 font-mono text-sm">
                <code>{`import { RotaryKnobDetailed } from "@audioui/rotary-knob"`}</code>
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
                <code>{basicUsageCode}</code>
              </pre>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 h-8 w-8 rounded-md bg-zinc-800/50 hover:bg-zinc-700"
                onClick={() => copyToClipboard(basicUsageCode, "basic")}
              >
                {copied === "basic" ? <Check size={16} /> : <Copy size={16} />}
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
                  <td className="py-2 px-4 font-mono text-sm">value</td>
                  <td className="py-2 px-4 font-mono text-sm">number</td>
                  <td className="py-2 px-4 font-mono text-sm">-</td>
                  <td className="py-2 px-4 text-white/80">The controlled value of the knob</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 px-4 font-mono text-sm">onChange</td>
                  <td className="py-2 px-4 font-mono text-sm">function</td>
                  <td className="py-2 px-4 font-mono text-sm">-</td>
                  <td className="py-2 px-4 text-white/80">Callback function when the value changes</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 px-4 font-mono text-sm">min</td>
                  <td className="py-2 px-4 font-mono text-sm">number</td>
                  <td className="py-2 px-4 font-mono text-sm">0</td>
                  <td className="py-2 px-4 text-white/80">The minimum value of the knob</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 px-4 font-mono text-sm">max</td>
                  <td className="py-2 px-4 font-mono text-sm">number</td>
                  <td className="py-2 px-4 font-mono text-sm">1</td>
                  <td className="py-2 px-4 text-white/80">The maximum value of the knob</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 px-4 font-mono text-sm">step</td>
                  <td className="py-2 px-4 font-mono text-sm">number</td>
                  <td className="py-2 px-4 font-mono text-sm">0.01</td>
                  <td className="py-2 px-4 text-white/80">The step value of the knob</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 px-4 font-mono text-sm">size</td>
                  <td className="py-2 px-4 font-mono text-sm">"sm" | "md" | "lg"</td>
                  <td className="py-2 px-4 font-mono text-sm">"md"</td>
                  <td className="py-2 px-4 text-white/80">The size of the knob</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 px-4 font-mono text-sm">lightX</td>
                  <td className="py-2 px-4 font-mono text-sm">number</td>
                  <td className="py-2 px-4 font-mono text-sm">75</td>
                  <td className="py-2 px-4 text-white/80">The X position of the light source (0-100)</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 px-4 font-mono text-sm">lightY</td>
                  <td className="py-2 px-4 font-mono text-sm">number</td>
                  <td className="py-2 px-4 font-mono text-sm">25</td>
                  <td className="py-2 px-4 text-white/80">The Y position of the light source (0-100)</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 px-4 font-mono text-sm">metallic</td>
                  <td className="py-2 px-4 font-mono text-sm">number</td>
                  <td className="py-2 px-4 font-mono text-sm">50</td>
                  <td className="py-2 px-4 text-white/80">The metallic/shininess level (0-100)</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 px-4 font-mono text-sm">sensitivity</td>
                  <td className="py-2 px-4 font-mono text-sm">number</td>
                  <td className="py-2 px-4 font-mono text-sm">0.005</td>
                  <td className="py-2 px-4 text-white/80">The drag sensitivity for value changes</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 px-4 font-mono text-sm">showTicks</td>
                  <td className="py-2 px-4 font-mono text-sm">boolean</td>
                  <td className="py-2 px-4 font-mono text-sm">true</td>
                  <td className="py-2 px-4 text-white/80">Whether to show tick marks around the knob</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 px-4 font-mono text-sm">showIndicator</td>
                  <td className="py-2 px-4 font-mono text-sm">boolean</td>
                  <td className="py-2 px-4 font-mono text-sm">true</td>
                  <td className="py-2 px-4 text-white/80">Whether to show the indicator line</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 px-4 font-mono text-sm">disabled</td>
                  <td className="py-2 px-4 font-mono text-sm">boolean</td>
                  <td className="py-2 px-4 font-mono text-sm">false</td>
                  <td className="py-2 px-4 text-white/80">Whether the knob is disabled</td>
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
              <h3 className="text-xl font-medium mb-3">With Custom Value Display</h3>
              <div className="relative">
                <pre className="bg-black rounded-md p-4 overflow-x-auto text-white/80 font-mono text-sm">
                  <code>{customDisplayCode}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 h-8 w-8 rounded-md bg-zinc-800/50 hover:bg-zinc-700"
                  onClick={() => copyToClipboard(customDisplayCode, "custom-display")}
                >
                  {copied === "custom-display" ? <Check size={16} /> : <Copy size={16} />}
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3">With Custom Material</h3>
              <div className="relative">
                <pre className="bg-black rounded-md p-4 overflow-x-auto text-white/80 font-mono text-sm">
                  <code>{customMaterialCode}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 h-8 w-8 rounded-md bg-zinc-800/50 hover:bg-zinc-700"
                  onClick={() => copyToClipboard(customMaterialCode, "custom-material")}
                >
                  {copied === "custom-material" ? <Check size={16} /> : <Copy size={16} />}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-white/50 text-sm py-8 border-t border-zinc-800">
          <p>AudioUI Knob - Specular Component • MIT License</p>
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
