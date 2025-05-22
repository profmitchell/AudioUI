"use client"

import { useState } from "react"
import { CustomSlider } from "@/components/ui/custom-slider"

export default function SliderEtherealPage() {
  const [sliderValue, setSliderValue] = useState(50)

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-zinc-900">
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-light tracking-wide mb-2 text-white">Slider - Ethereal Component</h1>
            <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto">Slider - Ethereal</p>
          </header>

          <div className="glass-container p-6 mb-8">
            <h2 className="text-xl font-medium text-white/80 mb-4 text-center">Interactive Example</h2>
            <div className="max-w-md mx-auto flex flex-col items-center">
              <CustomSlider
                value={[sliderValue]}
                onValueChange={(value) => setSliderValue(value[0])}
                min={0}
                max={100}
                step={1}
                className="w-full"
              />
              <p className="text-center mt-4 text-white/80">Value: {sliderValue}</p>
              <p className="mt-4 text-center text-white/70 max-w-xl">
                Experience the smooth and visually appealing Ethereal Slider. Drag to change its value.
              </p>
            </div>
          </div>

          <div className="glass-container p-6 mb-8">
            <h2 className="text-xl font-medium text-white mb-4">About the Ethereal Slider</h2>
            <div className="prose prose-invert max-w-none">
              <p>
                The Ethereal Slider offers a unique visual experience for range selection.
                Detailed information about its design philosophy and core functionality will be provided here.
              </p>
              {/* Add more descriptive paragraphs as needed */}
            </div>
          </div>

          <div className="glass-container p-6 mb-8">
            <h2 className="text-xl font-medium text-white mb-4">Props</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-white/80">
                <thead className="text-xs text-white/60 uppercase bg-black/20">
                  <tr>
                    <th scope="col" className="px-4 py-3">Prop Name</th>
                    <th scope="col" className="px-4 py-3">Type</th>
                    <th scope="col" className="px-4 py-3">Default</th>
                    <th scope="col" className="px-4 py-3">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 font-medium">value</td>
                    <td className="px-4 py-3"><code>number[]</code></td>
                    <td className="px-4 py-3"><code>[0]</code></td>
                    <td className="px-4 py-3">The current value(s) of the slider.</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 font-medium">onValueChange</td>
                    <td className="px-4 py-3"><code>(value: number[]) ={'>'} void</code></td>
                    <td className="px-4 py-3"><code>-</code></td>
                    <td className="px-4 py-3">Callback when the slider value changes.</td>
                  </tr>
                  {/* Add more prop rows here as they are defined for CustomSlider */}
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 font-medium">min</td>
                    <td className="px-4 py-3"><code>number</code></td>
                    <td className="px-4 py-3"><code>0</code></td>
                    <td className="px-4 py-3">The minimum value of the slider.</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 font-medium">max</td>
                    <td className="px-4 py-3"><code>number</code></td>
                    <td className="px-4 py-3"><code>100</code></td>
                    <td className="px-4 py-3">The maximum value of the slider.</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 font-medium">step</td>
                    <td className="px-4 py-3"><code>number</code></td>
                    <td className="px-4 py-3"><code>1</code></td>
                    <td className="px-4 py-3">The step increment of the slider.</td>
                  </tr>
                   <tr className="border-b border-white/10">
                    <td className="px-4 py-3 font-medium">className</td>
                    <td className="px-4 py-3"><code>string</code></td>
                    <td className="px-4 py-3"><code>''</code></td>
                    <td className="px-4 py-3">Additional CSS classes for styling.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass-container p-6">
            <h2 className="text-xl font-medium text-white mb-4">Usage</h2>
            <pre className="bg-black/60 rounded-lg p-4 overflow-x-auto text-white/80 text-sm">
{`import { CustomSlider } from "@/components/ui/custom-slider"
import { useState } from "react"

export default function MySliderComponent() {
  const [sliderValue, setSliderValue] = useState(50)
  
  return (
    <CustomSlider
      value={[sliderValue]}
      onValueChange={(value) => setSliderValue(value[0])}
      min={0}
      max={100}
      step={1}
    />
  )
}`}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-white/50 text-sm py-8 border-t border-zinc-800 max-w-4xl mx-auto mt-12">
          <p>AudioUI Slider - Ethereal Component • MIT License</p>
        </footer>
      </div>
    </main>
  )
}
