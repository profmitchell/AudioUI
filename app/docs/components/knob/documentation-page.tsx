"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Dial } from "@/components/ui/dial"
import { cn } from "@/lib/utils"

export function DocumentationPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview")
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli")
  const [packageManager, setPackageManager] = useState<"pnpm" | "npm" | "yarn" | "bun">("pnpm")
  const [copied, setCopied] = useState<string | null>(null)

  // Default colors without theme dependency
  const glowColor = "rgba(255, 255, 255, 0.2)"
  const trackColor = "rgba(255, 255, 255, 0.1)"
  const accentColor = "rgba(255, 255, 255, 0.8)"

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  // Sample values for dials
  const [defaultValue, setDefaultValue] = useState(35)
  const [glassValue, setGlassValue] = useState(50)
  const [frequencyValue, setFrequencyValue] = useState(440)

  return (
    <div className="w-full bg-gradient-to-b from-black to-zinc-900 py-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Preview/Code Tabs Section */}
        <div className="mb-16">
          <div className="flex border-b border-white/10 mb-6">
            <button
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors duration-200",
                activeTab === "preview" ? "text-white border-b-2 border-white" : "text-white/60 hover:text-white/80",
              )}
              onClick={() => setActiveTab("preview")}
            >
              Preview
            </button>
            <button
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors duration-200",
                activeTab === "code" ? "text-white border-b-2 border-white" : "text-white/60 hover:text-white/80",
              )}
              onClick={() => setActiveTab("code")}
            >
              Code
            </button>
          </div>

          <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] p-6">
            {activeTab === "preview" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                  <Dial
                    variant="default"
                    label="Default Variant"
                    value={defaultValue}
                    onChange={setDefaultValue}
                    showValue={true}
                    glowColor={glowColor}
                    trackColor={trackColor}
                    indicatorColor={accentColor}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <Dial
                    variant="glass"
                    indicatorStyle="glow"
                    label="Glass with Glow"
                    value={glassValue}
                    onChange={setGlassValue}
                    showValue={true}
                    valueFormat={(v) => `${v}%`}
                    glowColor={accentColor}
                    trackColor={trackColor}
                    indicatorColor={accentColor}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <Dial
                    variant="glass"
                    knobVariant="metallic"
                    label="Frequency Control"
                    value={frequencyValue}
                    onChange={setFrequencyValue}
                    min={20}
                    max={20000}
                    showValue={true}
                    valueFormat={(v) => `${v.toFixed(0)} Hz`}
                    glowColor={accentColor}
                    trackColor={trackColor}
                    trackGlowColor={accentColor}
                    indicatorColor={accentColor}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative">
                  <button
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors duration-200"
                    onClick={() =>
                      copyToClipboard(
                        `<Dial
  variant="default"
  label="Default Variant"
  value={value}
  onChange={setValue}
  showValue={true}
/>`,
                        "default-dial",
                      )
                    }
                  >
                    {copied === "default-dial" ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                  <pre className="bg-black/60 rounded-lg p-4 overflow-x-auto text-white/80 text-sm">
                    {`<Dial
  variant="default"
  label="Default Variant"
  value={value}
  onChange={setValue}
  showValue={true}
/>`}
                  </pre>
                </div>

                <div className="relative">
                  <button
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors duration-200"
                    onClick={() =>
                      copyToClipboard(
                        `<Dial
  variant="glass"
  indicatorStyle="glow"
  label="Glass with Glow"
  value={value}
  onChange={setValue}
  showValue={true}
  valueFormat={(v) => \`\${v}%\`}
/>`,
                        "glass-dial",
                      )
                    }
                  >
                    {copied === "glass-dial" ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                  <pre className="bg-black/60 rounded-lg p-4 overflow-x-auto text-white/80 text-sm">
                    {`<Dial
  variant="glass"
  indicatorStyle="glow"
  label="Glass with Glow"
  value={value}
  onChange={setValue}
  showValue={true}
  valueFormat={(v) => \`\${v}%\`}
/>`}
                  </pre>
                </div>

                <div className="relative">
                  <button
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors duration-200"
                    onClick={() =>
                      copyToClipboard(
                        `<Dial
  variant="glass"
  knobVariant="metallic"
  label="Frequency Control"
  value={value}
  onChange={setValue}
  min={20}
  max={20000}
  showValue={true}
  valueFormat={(v) => \`\${v.toFixed(0)} Hz\`}
/>`,
                        "freq-dial",
                      )
                    }
                  >
                    {copied === "freq-dial" ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                  <pre className="bg-black/60 rounded-lg p-4 overflow-x-auto text-white/80 text-sm">
                    {`<Dial
  variant="glass"
  knobVariant="metallic"
  label="Frequency Control"
  value={value}
  onChange={setValue}
  min={20}
  max={20000}
  showValue={true}
  valueFormat={(v) => \`\${v.toFixed(0)} Hz\`}
/>`}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Installation Section */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-white mb-4">Installation</h2>

          <div className="flex border-b border-white/10 mb-4">
            <button
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors duration-200",
                installTab === "cli" ? "text-white border-b-2 border-white" : "text-white/60 hover:text-white/80",
              )}
              onClick={() => setInstallTab("cli")}
            >
              CLI
            </button>
            <button
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors duration-200",
                installTab === "manual" ? "text-white border-b-2 border-white" : "text-white/60 hover:text-white/80",
              )}
              onClick={() => setInstallTab("manual")}
            >
              Manual
            </button>
          </div>

          <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] p-6">
            {installTab === "cli" ? (
              <div className="space-y-4">
                <div className="flex border-b border-white/10 mb-4">
                  <button
                    className={cn(
                      "px-3 py-1.5 text-xs font-medium transition-colors duration-200",
                      packageManager === "pnpm"
                        ? "text-white border-b-2 border-white"
                        : "text-white/60 hover:text-white/80",
                    )}
                    onClick={() => setPackageManager("pnpm")}
                  >
                    pnpm
                  </button>
                  <button
                    className={cn(
                      "px-3 py-1.5 text-xs font-medium transition-colors duration-200",
                      packageManager === "npm"
                        ? "text-white border-b-2 border-white"
                        : "text-white/60 hover:text-white/80",
                    )}
                    onClick={() => setPackageManager("npm")}
                  >
                    npm
                  </button>
                  <button
                    className={cn(
                      "px-3 py-1.5 text-xs font-medium transition-colors duration-200",
                      packageManager === "yarn"
                        ? "text-white border-b-2 border-white"
                        : "text-white/60 hover:text-white/80",
                    )}
                    onClick={() => setPackageManager("yarn")}
                  >
                    yarn
                  </button>
                  <button
                    className={cn(
                      "px-3 py-1.5 text-xs font-medium transition-colors duration-200",
                      packageManager === "bun"
                        ? "text-white border-b-2 border-white"
                        : "text-white/60 hover:text-white/80",
                    )}
                    onClick={() => setPackageManager("bun")}
                  >
                    bun
                  </button>
                </div>

                <div className="relative">
                  <button
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors duration-200"
                    onClick={() => copyToClipboard(`${packageManager === "npm" ? "npm i audioui" : packageManager === "pnpm" ? "pnpm add audioui" : packageManager === "yarn" ? "yarn add audioui" : "bun add audioui"}`, "cli-install")}
                  >
                    {copied === "cli-install" ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                  <pre className="bg-black/60 rounded-lg p-4 overflow-x-auto text-white/80 text-sm">
                    {packageManager === "npm" ? "npm i audioui" : packageManager === "pnpm" ? "pnpm add audioui" : packageManager === "yarn" ? "yarn add audioui" : "bun add audioui"}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-white/70 mb-2">Copy and paste the following files into your project:</p>
                <div className="relative">
                  <button
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors duration-200"
                    onClick={() =>
                      copyToClipboard(
                        `// components/ui/dial/constants.ts
export const START_ANGLE = -240
export const ROTATION_RANGE = 300
export const angleFromValue = (norm: number) => START_ANGLE + norm * ROTATION_RANGE`,
                        "constants-file",
                      )
                    }
                  >
                    {copied === "constants-file" ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                  <pre className="bg-black/60 rounded-lg p-4 overflow-x-auto text-white/80 text-sm">
                    {`// components/ui/dial/constants.ts
export const START_ANGLE = -240
export const ROTATION_RANGE = 300
export const angleFromValue = (norm: number) => START_ANGLE + norm * ROTATION_RANGE`}
                  </pre>
                </div>
                <div className="relative">
                  <button
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors duration-200"
                    onClick={() =>
                      copyToClipboard(
                        `// components/ui/dial.tsx
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { START_ANGLE, ROTATION_RANGE, angleFromValue } from "./dial/constants"

// ... rest of the component code`,
                        "component-file",
                      )
                    }
                  >
                    {copied === "component-file" ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                  <pre className="bg-black/60 rounded-lg p-4 overflow-x-auto text-white/80 text-sm">
                    {`// components/ui/dial.tsx
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { START_ANGLE, ROTATION_RANGE, angleFromValue } from "./dial/constants"

// ... rest of the component code`}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Usage Section */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-white mb-4">Usage</h2>

          <div className="space-y-6">
            <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] p-6">
              <h3 className="text-lg font-medium text-white mb-3">Import</h3>
              <div className="relative">
                <button
                  className="absolute top-2 right-2 p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors duration-200"
                  onClick={() => copyToClipboard(`import { Dial } from "audioui"`, "import-code")}
                >
                  {copied === "import-code" ? <Check size={16} /> : <Copy size={16} />}
                </button>
                <pre className="bg-black/60 rounded-lg p-4 overflow-x-auto text-white/80 text-sm">
                  {`import { Dial } from "audioui"`}
                </pre>
              </div>
            </div>
            
            <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] p-6">
              <h3 className="text-lg font-medium text-white mb-3">Basic Example</h3>
              <div className="relative">
                <button
                  className="absolute top-2 right-2 p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors duration-200"
                  onClick={() =>
                    copyToClipboard(
                      `import { Dial } from "audioui"
import { useState } from "react"

export default function MyComponent() {
  const [volume, setVolume] = useState(50)
  
  return (
    <Dial
      label="Volume"
      value={volume}
      onChange={setVolume}
      showValue={true}
      valueFormat={(v) => \`\${v}%\`}
    />
  )
}`,
                      "basic-example",
                    )
                  }
                >
                  {copied === "basic-example" ? <Check size={16} /> : <Copy size={16} />}
                </button>
                <pre className="bg-black/60 rounded-lg p-4 overflow-x-auto text-white/80 text-sm">
                  {`import { Dial } from "audioui"
import { useState } from "react"

export default function MyComponent() {
  const [volume, setVolume] = useState(50)
  
  return (
    <Dial
      label="Volume"
      value={volume}
      onChange={setVolume}
      showValue={true}
      valueFormat={(v) => \`\${v}%\`}
    />
  )
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
