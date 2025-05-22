"use client"

export default function FilterPage() {
  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-3xl font-light tracking-wide mb-6">Filter</h1>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-white/80">
          The Filter component provides a visual representation and control for audio filter parameters.
        </p>

        <h2 className="text-2xl font-light tracking-wide mt-8 mb-4">Usage</h2>

        <p className="text-white/80">Import the Filter component and use it in your application:</p>

        <pre className="bg-black/60 p-4 rounded-lg overflow-x-auto">
          <code className="text-white">{`import { Filter } from '@audioui/react'

export default function MyComponent() {
  const [values, setValues] = React.useState({
    frequency: 1000,
    resonance: 5,
    type: 'lowpass'
  })
  
  return (
    <Filter
      values={values}
      onChange={setValues}
      width={400}
      height={200}
    />
  )
}`}</code>
        </pre>

        <h2 className="text-2xl font-light tracking-wide mt-8 mb-4">Examples</h2>

        <h3 className="text-xl font-light tracking-wide mt-6 mb-3">Basic Filter</h3>

        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 mb-6 flex justify-center">
          {/* Example would be rendered here */}
          <div className="w-64 h-40 bg-black/60 rounded-lg border border-white/10 p-2 relative">
            <svg width="100%" height="100%" viewBox="0 0 256 144">
              <path
                d="M 0,120 L 80,120 Q 120,120 120,40 L 140,40 Q 140,120 180,120 L 256,120"
                fill="none"
                stroke="rgba(255,255,255,0.8)"
                strokeWidth="2"
              />
              <circle cx="120" cy="40" r="4" fill="white" />
            </svg>
            <div className="absolute bottom-2 left-2 text-xs text-white/60">20Hz</div>
            <div className="absolute bottom-2 right-2 text-xs text-white/60">20kHz</div>
          </div>
        </div>

        <h2 className="text-2xl font-light tracking-wide mt-8 mb-4">API Reference</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-2 px-4 text-left text-white">Prop</th>
                <th className="py-2 px-4 text-left text-white">Type</th>
                <th className="py-2 px-4 text-left text-white">Default</th>
                <th className="py-2 px-4 text-left text-white">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-2 px-4 text-white">values</td>
                <td className="py-2 px-4 text-white/80">object</td>
                <td className="py-2 px-4 text-white/80">-</td>
                <td className="py-2 px-4 text-white/80">The filter values</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 px-4 text-white">onChange</td>
                <td className="py-2 px-4 text-white/80">(values: object) =&gt; void</td>
                <td className="py-2 px-4 text-white/80">-</td>
                <td className="py-2 px-4 text-white/80">Callback when values change</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 px-4 text-white">type</td>
                <td className="py-2 px-4 text-white/80">string</td>
                <td className="py-2 px-4 text-white/80">"lowpass"</td>
                <td className="py-2 px-4 text-white/80">Filter type (lowpass, highpass, bandpass, etc.)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
