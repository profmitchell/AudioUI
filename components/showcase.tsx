import React, { useState, useEffect } from 'react';
import { Dial } from '@/components/ui/dial';
import { RotaryKnobDetailed } from '@/components/ui/rotary-knob-detailed';
import { ModWheel } from '@/components/ui/mod-wheel';
import { CustomSlider } from '@/components/ui/custom-slider';
import { NegativeSlider } from '@/components/ui/negative-slider';
import { MidiPad } from '@/components/ui/midi-pad';
import { Arc } from '@/components/ui/arc';
import { PitchBend } from '@/components/ui/pitch-bend';
import { XYPad } from '@/components/ui/XYPad';
import ADSREnvelope from '@/components/ui/adsr-envelope';
import { EnhancedPitchBend } from '@/components/ui/enhanced-pitch-bend';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

interface ComponentShowcaseProps {
  speed?: 'slower' | 'slow' | 'medium';
}

export function ComponentShowcase({ speed = 'slow' }: ComponentShowcaseProps) {
  // State for interactive components
  const [dialValue, setDialValue] = useState(75);
  const [knobValue, setKnobValue] = useState(0.65);
  const [altKnobValue, setAltKnobValue] = useState(0.3);
  const [arcValue, setArcValue] = useState(70);
  const [sliderValue, setSliderValue] = useState([70]);
  const [verticalSliderValue, setVerticalSliderValue] = useState([45]);
  const [xyValues, setXyValues] = useState({ x: 0.7, y: 0.3 });
  const [padTriggered, setPadTriggered] = useState(false);
  const [pad2Triggered, setPad2Triggered] = useState(false);
  const [modWheelValue, setModWheelValue] = useState(0.65);
  const [pitchBendValue, setPitchBendValue] = useState(0.2);
  const [glassDialValue, setGlassDialValue] = useState(40);
  const [neomorphicValue, setNeomorphicValue] = useState([60]);

  // New states for added components and variations
  const [enhancedPitchBendValue, setEnhancedPitchBendValue] = useState(0.5);
  const [progressValue, setProgressValue] = useState(30);
  const [switchState, setSwitchState] = useState(false);
  const [basicSliderValue, setBasicSliderValue] = useState([50]);
  const [stealthDialValue, setStealthDialValue] = useState(60);
  const [simpleKnobValue, setSimpleKnobValue] = useState(0.4);

  // New states for additional variations
  const [metallicArcValue, setMetallicArcValue] = useState(45);
  const [altXyValues, setAltXyValues] = useState({ x: 0.25, y: 0.75 });
  const [mediumDialValue, setMediumDialValue] = useState(50);

  // Effect to animate progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgressValue(prev => (prev + 5) % 101);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Animation duration based on speed prop
  const animationDuration = {
    slower: '180s',
    slow: '120s',
    medium: '90s'
  }[speed];

  // Define a diverse collection of components with different sizes, styles, and functions
  // Arranged for maximum visual diversity - alternating sizes, colors, and component types
  const components = [
    // Larger Detailed Rotary Knob
    <div key="knob-container-1" className="scale-110 transform">
      <RotaryKnobDetailed 
        key="knob-specular-blue"
        value={knobValue} 
        onChange={(v) => setKnobValue(v)}
        showValue={true}
        size="lg"
        reflections={true}
        metallic={70}
        color="#3b82f6"
        label="Filter Cutoff"
      />
    </div>,
    
    // Small Arc Meter - Pink
    <Arc 
      key="meter-arc-1"
      value={arcValue} 
      onChange={(v) => setArcValue(v)}
      min={0} 
      max={100}
      showValue={false}
      variant="glass"
      trackWidth={4}
      valueColor="#ec4899"
      glowColor="rgba(236, 72, 153, 0.4)"
      trackColor="rgba(255,255,255,0.1)"
      size="sm"
    />,
    
    // Drum Pad Purple
    <MidiPad 
      key="drumpad-1"
      size="md"
      radius="sm"
      ledColor={padTriggered ? "rgba(147, 51, 234, 0.8)" : "rgba(147, 51, 234, 0.3)"}
      useTemperatureColor={true}
      animationStyle="radial"
      label="Kick"
      onPadTrigger={() => {
        setPadTriggered(true);
        setTimeout(() => setPadTriggered(false), 300);
      }}
    />,
    
    // Mod Wheel
    <div key="wheel-container" className="scale-90 transform">
      <ModWheel 
        key="modwheel-1"
        defaultValue={modWheelValue}
        onChange={(v) => setModWheelValue(v)}
        min={0} 
        max={1}
      />
    </div>,
    

    
    // XY Pad
    <XYPad 
      key="xypad-1"
      x={xyValues.x} 
      y={xyValues.y} 
      onChange={(x, y) => setXyValues({ x, y })}
      width={85} 
      height={85}
      showGrid={true}
      rippleEffect={true}
      theme="nightPurple"
    />,
    
    // Glass dial with value display
    <Dial 
      key="dial-glass"
      value={glassDialValue} 
      onChange={(v) => setGlassDialValue(v)}
      showValue={true}
      size="md"
      variant="glass"
      indicatorColor="#60a5fa"
      trackColor="rgba(96, 165, 250, 0.2)"
    />,
    
    // A large dark blue vertical slider
    <div key="slider-vertical" className="h-32 scale-90 transform">
      <CustomSlider 
        value={verticalSliderValue} 
        onValueChange={(v) => setVerticalSliderValue(v)}
        variant="neumorphic-inset"
        vertical={true}
        min={0}
        max={100}
        shadowIntensity="strong"
        trackColor="#1e3a8a"
        thumbColor="#3b82f6"
      />
    </div>,
    
    // Small detailed rotary knob - orange variant
    <RotaryKnobDetailed 
      key="knob-specular-orange"
      value={altKnobValue} 
      onChange={(v) => setAltKnobValue(v)}
      showValue={false}
      size="md"
      reflections={true}
      metallic={60}
      color="#f97316"
      showIndicator={true}
    />,
    
    // Ethereal Slider - wide
    <div key="slider-container" className="w-44 transform">
      <NegativeSlider 
        key="slider-ethereal-1" 
        value={sliderValue} 
        onValueChange={(v) => setSliderValue(v)}
        color="rgba(139, 92, 246, 0.8)"
      />
    </div>,
    
    // Pitch Bend
    <div key="pitch-container" className="scale-90 transform">
      <PitchBend 
        key="pitchbend-1"
        defaultValue={pitchBendValue}
        onChange={(v) => setPitchBendValue(v)} 
        spring={true}
        snapStrength={0.8}
      />
    </div>,
    
    // New: Basic Slider - Horizontal
    <div key="basic-slider-horizontal" className="w-36 scale-90 transform">
      <Slider
        value={basicSliderValue}
        onValueChange={setBasicSliderValue}
        max={100}
        step={1}
        className="[&>span:first-child]:h-4 [&>span:first-child]:w-4 [&>span:first-child]:bg-purple-500"
      />
    </div>,
    
    // New: Switch Component
    <div key="switch-1" className="scale-90 transform flex flex-col items-center">
      <Switch 
        checked={switchState} 
        onCheckedChange={setSwitchState} 
        aria-label="Toggle feature"
        className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-700"
      />
      {!true && <span className="text-xs mt-1 text-white/70">{switchState ? "ON" : "OFF"}</span>} {/* Hidden label, showcase is visual*/}
    </div>,

    // New: Stealth Dial (example variant)
    <div key="stealth-dial" className="scale-90 transform">
        <Dial
            key="dial-stealth"
            value={stealthDialValue}
            onChange={setStealthDialValue}
            size="md"
            variant="flat" // Changed from 'stealth' to 'flat'
            indicatorColor="#a78bfa" // Lavender
            trackColor="rgba(55, 48, 163, 0.5)" // Darker, less prominent purple track for 'flat' stealthy look
            showValue={false}
        />
    </div>,
    
    // New: Progress Bar (styled as a simple meter)
    <div key="progress-bar-1" className="w-32 scale-90 transform">
      <Progress value={progressValue} className="h-3 bg-slate-700 [&>div]:bg-sky-400" />
    </div>,

    // New: Simple Rotary Knob (less detailed)
    <div key="simple-knob" className="scale-100 transform">
      <RotaryKnobDetailed 
        key="knob-simple-green"
        value={simpleKnobValue} 
        onChange={(v) => setSimpleKnobValue(v)}
        showValue={false}
        size="md"
        reflections={false} // No reflections
        metallic={10}      // Less metallic
        color="#22c55e"    // Green
        label="Pan"
        showIndicator={true}
      />
    </div>,

    // New: Enhanced Pitch Bend
    <div key="enhanced-pitch-container" className="scale-90 transform">
      <EnhancedPitchBend 
        key="enhanced-pitchbend-1"
        defaultValue={enhancedPitchBendValue} // Changed from value to defaultValue
        onChange={(v) => setEnhancedPitchBendValue(v)}
        min={-1}
        max={1}
        spring={false} // Different from the other pitch bend
      />
    </div>,
    
    // Standard Dial - small
    <div key="standard-dial" className="scale-90 transform">
      <Dial 
        key="dial-1"
        value={dialValue} 
        onChange={(v) => setDialValue(v)}
        showValue={false}
        size="sm"
        variant="default"
        indicatorColor="white"
        trackColor="rgba(255,255,255,0.1)"
      />
    </div>,
    
    // Larger gold arc meter
    <Arc 
      key="meter-arc-2"
      value={arcValue * 0.6} 
      onChange={(v) => setArcValue(v / 0.6)}
      min={0} 
      max={100}
      showValue={true}
      variant="default"
      trackWidth={8}
      valueColor="#eab308"
      trackColor="rgba(255,255,255,0.05)"
      size="md"
    />,
    
    // Square Drum Pad - green
    <MidiPad 
      key="drumpad-2"
      size="sm"
      radius="none"
      ledColor={pad2Triggered ? "rgba(74, 222, 128, 0.8)" : "rgba(74, 222, 128, 0.3)"}
      useTemperatureColor={true}
      animationStyle="top-down"
      label="HH"
      onPadTrigger={() => {
        setPad2Triggered(true);
        setTimeout(() => setPad2Triggered(false), 300);
      }}
    />,

    // New: Medium Default Dial with Value
    <div key="medium-dial-default" className="scale-100 transform">
      <Dial
        key="dial-medium-default"
        value={mediumDialValue}
        onChange={setMediumDialValue}
        size="md"
        variant="default"
        showValue={true}
        label="Reverb Mix"
      />
    </div>,

    // New: Larger Metallic Arc
    <div key="metallic-arc-large" className="scale-100 transform">
      <Arc
        key="meter-arc-metallic"
        value={metallicArcValue}
        onChange={setMetallicArcValue}
        min={0}
        max={100}
        showValue={true}
        variant="default" // Changed from 'metallic' to 'default'
        trackWidth={6}
        valueColor="#10b981" // Emerald green
        glowColor="rgba(16, 185, 129, 0.4)"
        trackColor="rgba(128, 128, 128, 0.5)" // Mid-gray track for a somewhat metallic feel
        size="lg"
        label="Comp GR"
      />
    </div>,

    // New: Alternative XYPad
    <div key="xypad-alt" className="scale-100 transform">
      <XYPad
        key="xypad-2"
        x={altXyValues.x}
        y={altXyValues.y}
        onChange={(x, y) => setAltXyValues({ x, y })}
        width={110}
        height={110}
        showGrid={false}
        rippleEffect={false}
        theme="neon" // Changed from 'aquaMarine' to 'neon'
      />
    </div>
  ];

  return (
    <div className="w-full overflow-hidden py-4 my-6 relative">
      <style jsx>{`
        .showcase-row {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          /* justify-content: space-around; */ // Let flexbox handle spacing with margins
          width: max-content; /* Allow it to be wider than container for scrolling effect */
        }
        .component-wrapper {
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.4s ease, opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.85;
          transform-origin: center center;
          will-change: transform, filter, opacity;
          margin: 0 10px;
        }
        .component-wrapper:hover {
          transform: scale(1.15);
          filter: brightness(1.4) contrast(1.05);
          opacity: 1;
          z-index: 10;
        }
      `}</style>
      
      <div className="showcase-bg absolute inset-0 bg-gradient-to-r from-black via-zinc-900/50 to-black pointer-events-none"></div>
      
      <div className="showcase-row py-8">
        {components.map((component, index) => {
          // Create visual variety with different vertical positions
          const verticalOffset = Math.sin(index * 0.8) * 15; // Adjusted sine wave for more variation
          
          return (
            <div 
              key={`component-${index}`} 
              className="component-wrapper cursor-pointer"
              style={{ 
                transform: `translateY(${verticalOffset}px)`
              }}
            >
              {component}
            </div>
          );
        })}
      </div>
    </div>
  );
} 