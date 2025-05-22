"use client"

export default function PresetBrowserPage() {
  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-3xl font-light tracking-wide mb-6">Preset Browser</h1>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-white/80">
          The Preset Browser component provides an interface for browsing and selecting audio presets.
        </p>

        <h2 className="text-2xl font-light tracking-wide mt-8 mb-4">Usage</h2>

        <p className="text-white/80">Import the PresetBrowser component and use it in your application:</p>

        <pre className="bg-black/60 p-4 rounded-lg overflow-x-auto">
          <code className="text-white">{`import { PresetBrowser } from '@audioui/react'

export default function MyComponent() {
  const presets = [
    { id: '1', name: 'Deep Bass', category: 'Bass', author: 'AudioUI' },
    { id: '2', name: 'Ambient Pad', category: 'Pads', author: 'AudioUI' },
    { id: '3', name: 'Plucky Lead', category: 'Leads', author: 'AudioUI' },
  ]
  
  const handleSelect = (preset) => {
    console.log('Selected preset:', preset)
  }
  
  return (
    <PresetBrowser
      presets={presets}
      onSelect={handleSelect}
      categories={['All', 'Bass', 'Pads', 'Leads']}
    />
  )
}`}</code>
        </pre>

        <h2 className="text-2xl font-light tracking-wide mt-8 mb-4">Examples</h2>

        <h3 className="text-xl font-light tracking-wide mt-6 mb-3">Basic Preset Browser</h3>

        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 mb-6">
          {/* Example would be rendered here */}
          <div className="w-full bg-black/60 rounded-lg border border-white/10 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                <div className="px-3 py-1 bg-white/10 rounded-md text-white/80 text-sm">All</div>
                <div className="px-3 py-1 bg-white/5 rounded-md text-white/60 text-sm">Bass</div>
                <div className="px-3 py-1 bg-white/5 rounded-md text-white/60 text-sm">Pads</div>
                <div className="px-3 py-1 bg-white/5 rounded-md text-white/60 text-sm">Leads</div>
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="bg-black/40 border border-white/10 rounded-md px-3 py-1 text-sm text-white/80"
              />
            </div>
            <div className="space-y-2">
              <div className="px-3 py-2 bg-white/10 rounded-md flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">Deep Bass</div>
                  <div className="text-white/60 text-xs">Bass • AudioUI</div>
                </div>
                <button className="px-2 py-1 bg-white/10 rounded-md text-xs text-white/80">Load</button>
              </div>
              <div className="px-3 py-2 bg-black/40 rounded-md flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">Ambient Pad</div>
                  <div className="text-white/60 text-xs">Pads • AudioUI</div>
                </div>
                <button className="px-2 py-1 bg-white/10 rounded-md text-xs text-white/80">Load</button>
              </div>
              <div className="px-3 py-2 bg-black/40 rounded-md flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">Plucky Lead</div>
                  <div className="text-white/60 text-xs">Leads • AudioUI</div>
                </div>
                <button className="px-2 py-1 bg-white/10 rounded-md text-xs text-white/80">Load</button>
              </div>
            </div>
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
                <td className="py-2 px-4 text-white">presets</td>
                <td className="py-2 px-4 text-white/80">Preset[]</td>
                <td className="py-2 px-4 text-white/80">[]</td>
                <td className="py-2 px-4 text-white/80">Array of preset objects</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 px-4 text-white">onSelect</td>
                <td className="py-2 px-4 text-white/80">(preset: Preset) =&gt; void</td>
                <td className="py-2 px-4 text-white/80">-</td>
                <td className="py-2 px-4 text-white/80">Callback when a preset is selected</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 px-4 text-white">categories</td>
                <td className="py-2 px-4 text-white/80">string[]</td>
                <td className="py-2 px-4 text-white/80">["All"]</td>
                <td className="py-2 px-4 text-white/80">List of preset categories</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
