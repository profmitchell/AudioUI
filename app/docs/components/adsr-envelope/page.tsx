"use client"

import { useState } from "react"
import ADSREnvelope from "@/components/ui/adsr-envelope"
// We'll need sliders for the interactive example if we allow tweaking
import { Slider } from "@/components/ui/slider" 
import { Label } from "@/components/ui/label"

export default function AdsrEnvelopePage() {
  // State for the interactive ADSR Envelope example
  const [attack, setAttack] = useState(50)
  const [decay, setDecay] = useState(150)
  const [sustain, setSustain] = useState(0.6)
  const [release, setRelease] = useState(300)
  const [attackCurve, setAttackCurve] = useState(0.2)
  const [decayCurve, setDecayCurve] = useState(-0.3)
  const [releaseCurve, setReleaseCurve] = useState(0.5)

  const aboutText = `
    <p>The ADSR Envelope component provides a visual and interactive way to define and control Attack, Decay, Sustain, and Release phases, which are fundamental for shaping sounds in synthesizers, samplers, and other audio applications.</p>
    <p>This component offers:</p>
    <ul class="list-disc pl-5 space-y-1 mt-2">
      <li>Interactive visualization of the envelope shape.</li>
      <li>Controls for adjusting A, D, S, R parameters and their curve shapes.</li>
      <li>Playback functionality to see the envelope animate over time.</li>
      <li>Extensive customization options for appearance, behavior, and integration through props.</li>
    </ul>
    <p class="mt-2">It can be used to modulate various audio parameters like amplitude, filter cutoff, pitch, and more, giving dynamic character to sounds.</p>
  `

  const propsTable = `
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
          <tr class="border-b border-white/10"><td class="px-4 py-3 font-medium">initialAttack</td><td class="px-4 py-3"><code>number</code></td><td class="px-4 py-3"><code>10</code></td><td class="px-4 py-3">Initial attack time (ms).</td></tr>
          <tr class="border-b border-white/10"><td class="px-4 py-3 font-medium">initialDecay</td><td class="px-4 py-3"><code>number</code></td><td class="px-4 py-3"><code>120</code></td><td class="px-4 py-3">Initial decay time (ms).</td></tr>
          <tr class="border-b border-white/10"><td class="px-4 py-3 font-medium">initialSustain</td><td class="px-4 py-3"><code>number</code></td><td class="px-4 py-3"><code>0.75</code></td><td class="px-4 py-3">Initial sustain level (0-1).</td></tr>
          <tr class="border-b border-white/10"><td class="px-4 py-3 font-medium">initialRelease</td><td class="px-4 py-3"><code>number</code></td><td class="px-4 py-3"><code>250</code></td><td class="px-4 py-3">Initial release time (ms).</td></tr>
          <tr class="border-b border-white/10"><td class="px-4 py-3 font-medium">initialAttackCurve</td><td class="px-4 py-3"><code>number</code></td><td class="px-4 py-3"><code>0</code></td><td class="px-4 py-3">Attack curve shape (-1 to 1).</td></tr>
          <tr class="border-b border-white/10"><td class="px-4 py-3 font-medium">initialDecayCurve</td><td class="px-4 py-3"><code>number</code></td><td class="px-4 py-3"><code>0</code></td><td class="px-4 py-3">Decay curve shape (-1 to 1).</td></tr>
          <tr class="border-b border-white/10"><td class="px-4 py-3 font-medium">initialReleaseCurve</td><td class="px-4 py-3"><code>number</code></td><td class="px-4 py-3"><code>0</code></td><td class="px-4 py-3">Release curve shape (-1 to 1).</td></tr>
          <tr class="border-b border-white/10"><td class="px-4 py-3 font-medium">visualizationHeight</td><td class="px-4 py-3"><code>number</code></td><td class="px-4 py-3"><code>200</code></td><td class="px-4 py-3">Height of the envelope visualization area (px).</td></tr>
          <tr class="border-b border-white/10"><td class="px-4 py-3 font-medium">sustainHoldTime</td><td class="px-4 py-3"><code>number</code></td><td class="px-4 py-3"><code>1000</code></td><td class="px-4 py-3">Duration the sustain level is held during animation (ms).</td></tr>
          <tr class="border-b border-white/10"><td class="px-4 py-3 font-medium">showControls</td><td class="px-4 py-3"><code>boolean</code></td><td class="px-4 py-3"><code>true</code></td><td class="px-4 py-3">Show/hide parameter controls.</td></tr>
          <tr class="border-b border-white/10"><td class="px-4 py-3 font-medium">showCurveControls</td><td class="px-4 py-3"><code>boolean</code></td><td class="px-4 py-3"><code>true</code></td><td class="px-4 py-3">Show/hide curve shape controls.</td></tr>
          <tr class="border-b border-white/10"><td class="px-4 py-3 font-medium">controlsLayout</td><td class="px-4 py-3"><code>'grid' | 'horizontal' | 'vertical'</code></td><td class="px-4 py-3"><code>'grid'</code></td><td class="px-4 py-3">Layout of the controls.</td></tr>
          <tr class="border-b border-white/10"><td class="px-4 py-3 font-medium">controlsPosition</td><td class="px-4 py-3"><code>'top' | 'bottom' | 'left' | 'right'</code></td><td class="px-4 py-3"><code>'bottom'</code></td><td class="px-4 py-3">Position of controls relative to visualization.</td></tr>
          <tr class="border-b border-white/10"><td class="px-4 py-3 font-medium">className</td><td class="px-4 py-3"><code>string</code></td><td class="px-4 py-3"><code>""</code></td><td class="px-4 py-3">Custom CSS class for the main wrapper.</td></tr>
          <tr class="border-b border-white/10"><td class="px-4 py-3 font-medium">cardClassName</td><td class="px-4 py-3"><code>string</code></td><td class="px-4 py-3">Custom CSS for card.</td><td class="px-4 py-3">CSS classes for the card container.</td></tr>
          <tr class="border-b border-white/10"><td class="px-4 py-3 font-medium">title</td><td class="px-4 py-3"><code>React.ReactNode</code></td><td class="px-4 py-3"><code>"ADSR Envelope"</code></td><td class="px-4 py-3">Custom title for the component.</td></tr>
          <tr class="border-b border-white/10"><td class="px-4 py-3 font-medium">onAttackChange</td><td class="px-4 py-3"><code>(val: number) => void</code></td><td class="px-4 py-3"><code>-</code></td><td class="px-4 py-3">Callback when attack value changes.</td></tr>
          {/* ... Add more props like onDecayChange, onSustainChange, onReleaseChange, onEnvelopeValueChange, etc. ... */}
          {/* ... Add styling props like envelopeCurveColor, envelopeFillColor, etc. ... */}
          <tr class="border-b border-white/10"><td colspan="4" class="px-4 py-3 text-center text-white/50">... and many more props for detailed customization of appearance, ranges, and behavior. See component source for full list.</td></tr>
        </tbody>
      </table>
    </div>
  `

  const usageCode = `
import ADSREnvelope from "@/components/ui/adsr-envelope";
import { useState } from "react";

export default function MySynth() {
  const [adsrParams, setAdsrParams] = useState({
    attack: 50,
    decay: 100,
    sustain: 0.7,
    release: 400,
  });

  const handleAttackChange = (newAttack) => {
    setAdsrParams(prev => ({ ...prev, attack: newAttack }));
    // Update your audio node or state here
    console.log("New Attack:", newAttack);
  };

  const handleEnvelopeValueChange = (value) => {
    // Use this value to modulate an audio parameter
    // For example, gainNode.gain.setValueAtTime(value, audioContext.currentTime);
    console.log("Current envelope value:", value);
  };

  return (
    <div>
      <ADSREnvelope
        initialAttack={adsrParams.attack}
        initialDecay={adsrParams.decay}
        initialSustain={adsrParams.sustain}
        initialRelease={adsrParams.release}
        onAttackChange={handleAttackChange}
        // Add other callbacks as needed
        onEnvelopeValueChange={handleEnvelopeValueChange}
        title="Filter Envelope"
        description="Controls the filter cutoff over time."
        cardClassName="bg-neutral-800 border-neutral-700"
        envelopeCurveColor="rgba(100, 220, 255, 0.9)"
      />
      {/* Display current ADSR values 
      <div class="mt-4 text-white/80">
        Attack: {adsrParams.attack.toFixed(0)}ms, 
        Decay: {adsrParams.decay.toFixed(0)}ms, 
        Sustain: {adsrParams.sustain.toFixed(2)}, 
        Release: {adsrParams.release.toFixed(0)}ms
      </div>
      */}
    </div>
  );
}
  `

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-zinc-900">
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-light tracking-wide mb-2 text-white">ADSR Envelope</h1>
            <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto">
              Interactive Attack, Decay, Sustain, Release envelope shaper.
            </p>
          </header>

          {/* Interactive Example Section */}
          <div className="glass-container p-6 mb-8">
            <h2 className="text-xl font-medium text-white/80 mb-6 text-center">Interactive Example</h2>
            <ADSREnvelope
              initialAttack={attack}
              initialDecay={decay}
              initialSustain={sustain}
              initialRelease={release}
              initialAttackCurve={attackCurve}
              initialDecayCurve={decayCurve}
              initialReleaseCurve={releaseCurve}
              onAttackChange={setAttack}
              onDecayChange={setDecay}
              onSustainChange={setSustain}
              onReleaseChange={setRelease}
              onAttackCurveChange={setAttackCurve}
              onDecayCurveChange={setDecayCurve}
              onReleaseCurveChange={setReleaseCurve}
              controlsPosition="bottom" // Or "left" / "right" for a different layout
            />
            {/* Simple controls to modify the above instance (optional) */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-white/90">
              <div>
                <Label htmlFor="attack-slider" className="block mb-1 text-sm">Attack: {attack.toFixed(0)} ms</Label>
                <Slider id="attack-slider" min={1} max={1000} step={1} value={[attack]} onValueChange={(val) => setAttack(val[0])} />
              </div>
              <div>
                <Label htmlFor="decay-slider" className="block mb-1 text-sm">Decay: {decay.toFixed(0)} ms</Label>
                <Slider id="decay-slider" min={1} max={2000} step={1} value={[decay]} onValueChange={(val) => setDecay(val[0])} />
              </div>
              <div>
                <Label htmlFor="sustain-slider" className="block mb-1 text-sm">Sustain: {sustain.toFixed(2)}</Label>
                <Slider id="sustain-slider" min={0} max={1} step={0.01} value={[sustain]} onValueChange={(val) => setSustain(val[0])} />
              </div>
              <div>
                <Label htmlFor="release-slider" className="block mb-1 text-sm">Release: {release.toFixed(0)} ms</Label>
                <Slider id="release-slider" min={1} max={3000} step={1} value={[release]} onValueChange={(val) => setRelease(val[0])} />
              </div>
               <div>
                <Label htmlFor="attack-curve-slider" className="block mb-1 text-sm">Attack Curve: {attackCurve.toFixed(2)}</Label>
                <Slider id="attack-curve-slider" min={-1} max={1} step={0.01} value={[attackCurve]} onValueChange={(val) => setAttackCurve(val[0])} />
              </div>
            </div>
             <p className="mt-6 text-center text-white/70 max-w-xl mx-auto">
                Adjust the sliders above to see the ADSR envelope visualization change in real-time. 
                The component itself also contains built-in sliders and controls.
              </p>
          </div>

          {/* About Section */}
          <div className="glass-container p-6 mb-8">
            <h2 className="text-xl font-medium text-white mb-4">About the ADSR Envelope</h2>
            <div className="prose prose-invert max-w-none text-white/80 space-y-3" dangerouslySetInnerHTML={{ __html: aboutText }} />
          </div>

          {/* Props Section */}
          <div className="glass-container p-6 mb-8">
            <h2 className="text-xl font-medium text-white mb-4">Props</h2>
            <div dangerouslySetInnerHTML={{ __html: propsTable }} />
          </div>

          {/* Usage Section */}
          <div className="glass-container p-6">
            <h2 className="text-xl font-medium text-white mb-4">Usage</h2>
            <pre className="bg-black/60 rounded-lg p-4 overflow-x-auto text-white/80 text-sm">
              <code>
                {usageCode}
              </code>
            </pre>
          </div>
        </div>

        <footer className="text-center text-white/50 text-sm py-8 border-t border-zinc-800 max-w-4xl mx-auto mt-12">
          <p>AudioUI ADSR Envelope Component • MIT License</p>
        </footer>
      </div>
    </main>
  )
}
