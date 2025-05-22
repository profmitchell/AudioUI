"use client"

import { useState } from "react"
import { MidiPad, type MPEData } from "@/components/ui/midi-pad"
import { MidiPadGrid } from "@/components/ui/midi-pad-grid"
// We might need to add other imports like Slider, Label, Switch later from the original file
// For now, keeping it minimal to ensure the basic structure works.

export default function DrumPadPage() {
  // States for MidiPad example
  const [padTriggered, setPadTriggered] = useState(false)
  const [lastNote, setLastNote] = useState<number | null>(null)
  const [lastVelocity, setLastVelocity] = useState<number | null>(null)

  // States for MidiPadGrid example
  const [activeGridNotes, setActiveGridNotes] = useState<Set<number>>(new Set())

  const handleSinglePadTrigger = (note: number, velocity: number) => {
    setPadTriggered(true)
    setLastNote(note)
    setLastVelocity(velocity)
    setTimeout(() => setPadTriggered(false), 200) // Reset visual feedback
  }

  const handleGridPadTrigger = (note: number, velocity: number) => {
    setActiveGridNotes((prev) => new Set(prev).add(note))
  }

  const handleGridPadUp = (note: number) => {
    setActiveGridNotes((prev) => {
      const updated = new Set(prev)
      updated.delete(note)
      return updated
    })
  }

  const propsTablePlaceholder = `
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm text-left text-white/80">
        <thead class="text-xs text-white/60 uppercase bg-black/20">
          <tr>
            <th scope="col" class="px-4 py-3">Prop Name</th>
            <th scope="col" class="px-4 py-3">Type</th>
            <th scope="col" class="px-4 py-3">Default</th>
            <th scope="col" class="px-4 py-3">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-white/10">
            <td class="px-4 py-3 font-medium">note</td>
            <td class="px-4 py-3"><code>number</code></td>
            <td class="px-4 py-3"><code>60</code></td>
            <td class="px-4 py-3">The MIDI note number for the pad.</td>
          </tr>
          <tr class="border-b border-white/10">
            <td class="px-4 py-3 font-medium">label</td>
            <td class="px-4 py-3"><code>string</code></td>
            <td class="px-4 py-3"><code>''</code></td>
            <td class="px-4 py-3">A display label for the pad.</td>
          </tr>
          {/* ... more props for MidiPad and MidiPadGrid ... */}
        </tbody>
      </table>
    </div>
  `

  // Corrected unescaped backticks within the example code
  const usageCodePlaceholder = `
import { MidiPad, MidiPadGrid } from "@/components/ui/midi-pad"; // Adjust path if needed
import { useState } from "react";

export default function MyDrumComponent() {
  const [activeNotes, setActiveNotes] = useState(new Set());

  const handlePadTrigger = (note, velocity) => {
    console.log(\`Pad \${note} triggered with velocity \${velocity}\`);
    // Add to active notes or send MIDI message
  };

  return (
    <div>
      <MidiPad note={60} label="Kick" onPadTrigger={handlePadTrigger} />
      <MidiPadGrid 
        rows={2} 
        columns={2}
        baseNote={36}
        onPadTrigger={(note, vel) => console.log(\`Grid pad \${note} at \${vel}\`)}
        onPadUp={(note) => console.log(\`Grid pad \${note} released\`)}
      />
    </div>
  );
}
  `

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-zinc-900">
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-light tracking-wide mb-2 text-white">Drum Pad Component</h1>
            <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto">
              Interactive MIDI pad and grid controllers for expressive input.
            </p>
          </header>

          {/* Interactive Example Section */}
          <div className="glass-container p-6 mb-8">
            <h2 className="text-xl font-medium text-white/80 mb-6 text-center">Interactive Examples</h2>
            
            <div className="mb-10">
              <h3 className="text-lg font-semibold mb-4 text-white/90 text-center">Single Drumpad</h3>
              <div className="flex flex-col items-center space-y-4">
                <MidiPad
                  note={60}
                  label="Kick"
                  ledColor={padTriggered ? "rgba(56, 182, 255, 0.9)" : "rgba(56, 182, 255, 0.4)"}
                  onPadTrigger={handleSinglePadTrigger}
                  onPadUp={() => setPadTriggered(false)}
                  size="lg"
                  animationStyle="radial"
                />
                {lastNote !== null && (
                  <p className="text-white/70 text-sm">
                    Note: {lastNote}, Velocity: {lastVelocity}
                  </p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white/90 text-center">Drum Pad Grid (4x4)</h3>
              <div className="flex flex-col items-center">
                <MidiPadGrid
                  rows={4}
                  columns={4}
                  baseNote={36}
                  onPadTrigger={handleGridPadTrigger}
                  onPadUp={handleGridPadUp}
                  activeNotes={activeGridNotes}
                  labelMap={(row, col, note) => `N${note}`}
                />
                 <p className="text-white/70 text-sm mt-2">
                    Active Notes: {Array.from(activeGridNotes).join(', ')}
                  </p>
              </div>
            </div>
             <p className="mt-6 text-center text-white/70 max-w-xl mx-auto">
                Try clicking or tapping the pads! These examples showcase basic interaction.
                The components offer rich customization for velocity, MPE, and visual feedback.
              </p>
          </div>

          {/* About Section */}
          <div className="glass-container p-6 mb-8">
            <h2 className="text-xl font-medium text-white mb-4">About the Drum Pad Components</h2>
            <div className="prose prose-invert max-w-none text-white/80">
              <p>
                The Drum Pad components (<code>MidiPad</code> and <code>MidiPadGrid</code>) provide versatile interfaces for MIDI input. They are designed to be highly responsive and customizable, supporting features like velocity sensitivity, MPE (MIDI Polyphonic Expression), and various visual feedback styles.
              </p>
              <p>
                Whether you need a single expressive pad or a full grid controller, these components offer the building blocks for creating dynamic musical interfaces within your web applications. They can be integrated with the Web MIDI API or used as standalone UI elements.
              </p>
            </div>
          </div>

          {/* Props Section */}
          <div className="glass-container p-6 mb-8">
            <h2 className="text-xl font-medium text-white mb-4">Props</h2>
            <div dangerouslySetInnerHTML={{ __html: propsTablePlaceholder }} />
          </div>

          {/* Usage Section */}
          <div className="glass-container p-6">
            <h2 className="text-xl font-medium text-white mb-4">Usage</h2>
            <pre className="bg-black/60 rounded-lg p-4 overflow-x-auto text-white/80 text-sm">
              <code>
                {usageCodePlaceholder}
              </code>
            </pre>
          </div>
        </div>

        <footer className="text-center text-white/50 text-sm py-8 border-t border-zinc-800 max-w-4xl mx-auto mt-12">
          <p>AudioUI Drum Pad Component • MIT License</p>
        </footer>
      </div>
    </main>
  )
}