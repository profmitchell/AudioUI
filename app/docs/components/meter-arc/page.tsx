"use client"

import { useState } from "react"
import { Arc } from "@/components/ui/arc"

export default function Home() {
  const [defaultValue, setDefaultValue] = useState(65)
  const [glowValue, setGlowValue] = useState(35)
  const [bipolarValue, setBipolarValue] = useState(0)

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-zinc-900">
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-light tracking-wide mb-2 text-white">Arc Meter Component</h1>
            <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto">Meter - Arc</p>
          </header>

          <div className="glass-container p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <div className="flex flex-col items-center">
                <h2 className="text-lg font-medium text-white/80 mb-4">Standard Arc</h2>
                <Arc
                  variant="default"
                  label="Level"
                  value={defaultValue}
                  onChange={setDefaultValue}
                  showValue={true}
                  valueFormat={(v) => `${v}%`}
                  trackColor="rgba(255,255,255,0.1)"
                  valueColor="white"
                  size="lg"
                />
              </div>

              <div className="flex flex-col items-center">
                <h2 className="text-lg font-medium text-white/80 mb-4">Glow Arc</h2>
                <Arc
                  variant="default"
                  indicatorStyle="glow"
                  label="Level"
                  value={glowValue}
                  onChange={setGlowValue}
                  showValue={true}
                  valueFormat={(v) => `${v}%`}
                  trackColor="rgba(255,255,255,0.1)"
                  glowColor="rgba(255,255,255,0.6)"
                  valueColor="white"
                  size="lg"
                />
              </div>

              <div className="flex flex-col items-center">
                <h2 className="text-lg font-medium text-white/80 mb-4">Bipolar Arc</h2>
                <Arc
                  variant="default"
                  indicatorStyle="glow"
                  label="Pitch Bend"
                  value={bipolarValue}
                  onChange={setBipolarValue}
                  showValue={true}
                  valueFormat={(v) => (v > 0 ? `+${v}` : `${v}`)}
                  trackColor="rgba(255,255,255,0.1)"
                  glowColor="rgba(255,255,255,0.6)"
                  valueColor="white"
                  size="lg"
                  bipolar={true}
                />
              </div>
            </div>

            <div className="mt-8 text-center text-white/70 max-w-2xl mx-auto">
              <p className="mb-2">Drag up and down on the arcs to change their values!</p>
              <p>
                All the arc, none of the knob. It's like having your cake and eating it too, but for audio interfaces.
              </p>
            </div>
          </div>

          <div className="glass-container p-6 mb-8">
            <h2 className="text-xl font-medium text-white mb-4">About the Arc Component</h2>
            <div className="prose prose-invert max-w-none">
              <p>
                The Arc component uses SVG path elements to render circular arcs based on mathematical angle
                calculations. The component maps input values to angles along a circular path using trigonometric
                functions.
              </p>
              <p>
                For standard mode, the component calculates angles using a start angle of -240 degrees and a rotation
                range of 300 degrees. The value is normalized between 0 and 1, then mapped to this angle range. The SVG
                paths are drawn using the parametric equation of a circle where x = centerX + radius * cos(angle) and y
                = centerY + radius * sin(angle).
              </p>
              <p>
                For bipolar mode, the center position (0 value) is placed at the 12 o'clock position (top center of the
                arc). The component maps values from -127 to 0 to the left half of the arc, and values from 0 to 127 to
                the right half. This creates a symmetrical control where the center represents the neutral position.
              </p>
              <p>
                The SVG arc drawing uses the A command in the path data, which takes parameters for the x and y radii,
                rotation angle, large arc flag, sweep flag, and the end coordinates. For the value indicator, the
                component calculates the appropriate start and end points based on the current value and draws only the
                portion of the arc that represents that value.
              </p>
            </div>
          </div>

          <div className="glass-container p-6 mb-8">
            <h2 className="text-xl font-medium text-white mb-4">Props</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-white/80">
                <thead className="text-xs uppercase bg-white/5">
                  <tr>
                    <th className="px-4 py-3">Prop</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Default</th>
                    <th className="px-4 py-3">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 font-medium">variant</td>
                    <td className="px-4 py-3">
                      <code>{"'default' | 'minimal'"}</code>
                    </td>
                    <td className="px-4 py-3">
                      <code>{"'default'"}</code>
                    </td>
                    <td className="px-4 py-3">Visual style variant of the arc</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 font-medium">size</td>
                    <td className="px-4 py-3">
                      <code>{"'sm' | 'md' | 'lg' | 'xl'"}</code>
                    </td>
                    <td className="px-4 py-3">
                      <code>{"'md'"}</code>
                    </td>
                    <td className="px-4 py-3">Size of the arc component</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 font-medium">indicatorStyle</td>
                    <td className="px-4 py-3">
                      <code>{"'line' | 'glow'"}</code>
                    </td>
                    <td className="px-4 py-3">
                      <code>{"'line'"}</code>
                    </td>
                    <td className="px-4 py-3">Style of the value indicator</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 font-medium">value</td>
                    <td className="px-4 py-3">
                      <code>number</code>
                    </td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3">Controlled value</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 font-medium">defaultValue</td>
                    <td className="px-4 py-3">
                      <code>number</code>
                    </td>
                    <td className="px-4 py-3">
                      <code>min</code>
                    </td>
                    <td className="px-4 py-3">Initial value when uncontrolled</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 font-medium">min</td>
                    <td className="px-4 py-3">
                      <code>number</code>
                    </td>
                    <td className="px-4 py-3">
                      <code>0</code>
                    </td>
                    <td className="px-4 py-3">Minimum value</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 font-medium">max</td>
                    <td className="px-4 py-3">
                      <code>number</code>
                    </td>
                    <td className="px-4 py-3">
                      <code>100</code>
                    </td>
                    <td className="px-4 py-3">Maximum value</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 font-medium">step</td>
                    <td className="px-4 py-3">
                      <code>number</code>
                    </td>
                    <td className="px-4 py-3">
                      <code>1</code>
                    </td>
                    <td className="px-4 py-3">Step increment for value changes</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 font-medium">onChange</td>
                    <td className="px-4 py-3">
                      <code>{"(value: number) => void"}</code>
                    </td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3">Callback when value changes</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 font-medium">onValueCommit</td>
                    <td className="px-4 py-3">
                      <code>{"(value: number) => void"}</code>
                    </td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3">Callback when interaction ends</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 font-medium">showValue</td>
                    <td className="px-4 py-3">
                      <code>boolean</code>
                    </td>
                    <td className="px-4 py-3">
                      <code>false</code>
                    </td>
                    <td className="px-4 py-3">Whether to show the current value</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 font-medium">valueFormat</td>
                    <td className="px-4 py-3">
                      <code>{"(value: number) => string"}</code>
                    </td>
                    <td className="px-4 py-3">
                      <code>{"v => v.toString()"}</code>
                    </td>
                    <td className="px-4 py-3">Function to format the displayed value</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 font-medium">label</td>
                    <td className="px-4 py-3">
                      <code>string</code>
                    </td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3">Label text for the arc</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 font-medium">trackColor</td>
                    <td className="px-4 py-3">
                      <code>string</code>
                    </td>
                    <td className="px-4 py-3">
                      <code>{"'rgba(255,255,255,0.1)'"}</code>
                    </td>
                    <td className="px-4 py-3">Color for the background track</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 font-medium">valueColor</td>
                    <td className="px-4 py-3">
                      <code>string</code>
                    </td>
                    <td className="px-4 py-3">
                      <code>{"'white'"}</code>
                    </td>
                    <td className="px-4 py-3">Color for the value indicator</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 font-medium">glowColor</td>
                    <td className="px-4 py-3">
                      <code>string</code>
                    </td>
                    <td className="px-4 py-3">
                      <code>{"'rgba(255,255,255,0.2)'"}</code>
                    </td>
                    <td className="px-4 py-3">Color for glow effects (when indicatorStyle is 'glow')</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 font-medium">trackWidth</td>
                    <td className="px-4 py-3">
                      <code>number</code>
                    </td>
                    <td className="px-4 py-3">
                      <code>4</code>
                    </td>
                    <td className="px-4 py-3">Width of the track in pixels</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 font-medium">disabled</td>
                    <td className="px-4 py-3">
                      <code>boolean</code>
                    </td>
                    <td className="px-4 py-3">
                      <code>false</code>
                    </td>
                    <td className="px-4 py-3">Whether the arc is disabled</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">bipolar</td>
                    <td className="px-4 py-3">
                      <code>boolean</code>
                    </td>
                    <td className="px-4 py-3">
                      <code>false</code>
                    </td>
                    <td className="px-4 py-3">Whether the arc uses bipolar mode (center is 0, -127 to +127 range)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass-container p-6">
            <h2 className="text-xl font-medium text-white mb-4">Usage</h2>
            <pre className="bg-black/60 rounded-lg p-4 overflow-x-auto text-white/80 text-sm">
              {`import { Arc } from "@/components/ui/arc"
import { useState } from "react"

export default function MyComponent() {
  const [level, setLevel] = useState(50)
  const [pitch, setPitch] = useState(0)
  
  return (
    <>
      {/* Standard Arc */}
      <Arc
        variant="default"
        indicatorStyle="glow"
        label="Level"
        value={level}
        onChange={setLevel}
        showValue={true}
        valueFormat={(v) => \`\${v}%\`}
        trackColor="rgba(255,255,255,0.1)"
        glowColor="rgba(255,255,255,0.6)"
        valueColor="white"
      />
      
      {/* Bipolar Arc */}
      <Arc
        variant="default"
        indicatorStyle="glow"
        label="Pitch Bend"
        value={pitch}
        onChange={setPitch}
        showValue={true}
        valueFormat={(v) => v > 0 ? \`+\${v}\` : \`\${v}\`}
        bipolar={true}
      />
    </>
  )
}`}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-white/50 text-sm py-8 border-t border-zinc-800 max-w-4xl mx-auto">
          <p>AudioUI Meter - Arc Component • MIT License</p>
          <p className="mt-2">
            Created by{" "}
            <a href="https://cohen-concepts.com" className="text-white/70 hover:text-white underline">
              Cohen Concepts
            </a>
          </p>
        </footer>
      </div>
    </main>
  )
}
