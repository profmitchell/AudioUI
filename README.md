# AudioUI

Modern, accessible audio interface components for React applications

[![npm version](https://img.shields.io/npm/v/audioui.svg?style=flat)](https://www.npmjs.com/package/audioui)
[![MIT License](https://img.shields.io/github/license/profmitchell/AudioUI)](https://github.com/profmitchell/AudioUI/blob/main/LICENSE)
[![GitHub](https://img.shields.io/github/stars/profmitchell/AudioUI?style=social)](https://github.com/profmitchell/AudioUI)

<img width="600" alt="AudioUI Overview" src="https://github.com/user-attachments/assets/2e36a122-af19-453d-af62-f96e3b3852d8" />

<a href="https://profmitchell.github.io/AudioUI/">Documentation</a> | 
<a href="https://profmitchell.github.io/AudioUI/docs/components/knob">Components</a> | 
<a href="https://github.com/profmitchell/AudioUI">GitHub</a>
    

## 🎛️ What is AudioUI?

AudioUI is a comprehensive library of React components specifically designed for audio applications, digital audio workstations (DAWs), synthesizers, and music production tools. It provides professionally crafted UI elements with modern design principles and full accessibility support.

## Component Gallery


<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 20px;">
  <img width="300" alt="Component Example 1" src="https://github.com/user-attachments/assets/c8f8f698-60e4-4f0c-b279-31eb8ad71325" />
  <img width="300" alt="Component Example 2" src="https://github.com/user-attachments/assets/b1cb8595-ea02-4a27-9249-f8689911b3a0" />
  <img width="300" alt="Component Example 3" src="https://github.com/user-attachments/assets/738aed4a-69c5-4884-892b-9fdf160dad8a" />
  <img width="300" alt="Component Example 4" src="https://github.com/user-attachments/assets/a4cdac42-cbb9-4ec4-973a-a3b3c6a60de5" />
  <img width="300" alt="Component Example 5" src="https://github.com/user-attachments/assets/2bf92985-a4a4-4732-bb10-3eb9240b4d48" />
</div>


## 📦 Installation

```bash
# npm
npm install audioui

# yarn
yarn add audioui

# pnpm
pnpm add audioui
```

AudioUI is compatible with React 18+ and works with frameworks like Next.js, Vite, and Create React App.

[View Documentation](https://profmitchell.github.io/AudioUI/)

## Overview

AudioUI is a comprehensive library of React components specifically designed for audio applications, digital audio workstations (DAWs), synthesizers, and other music production tools. It provides professionally crafted UI elements common in music software with modern design principles and full accessibility support.

## ✨ Key Features

- 🎛️ **Professional Audio Controls**: Knobs, faders, XY pads, and other audio-specific UI components
- 🎹 **MIDI Integration**: Built-in MIDI support for components like drum pads and keyboards
- 📱 **Responsive**: Fully responsive components that work across desktop and mobile devices
- ♿ **Accessible**: ARIA-compliant components with keyboard navigation and screen reader support
- 🎨 **Customizable**: Easily themeable to match your application's design system
- ⚡ **Optimized**: High-performance components with minimal re-renders for low-latency audio applications
- 🔌 **Framework Agnostic**: Works with any React-based project, including Next.js, Remix, and more

## Quick Start

```jsx
import { ADSREnvelope, Dial, MIDIPad, PitchBend } from 'audioui';

function MySynthUI() {
  return (
    <div className="synth-container">
      <Dial 
        value={75} 
        min={0} 
        max={100} 
        onChange={(value) => console.log('Dial value:', value)} 
      />
      
      <ADSREnvelope
        attack={0.1}
        decay={0.3}
        sustain={0.5}
        release={1.0}
        onValueChange={(values) => console.log('ADSR values:', values)}
      />
      
      <PitchBend 
        onChange={(value) => console.log('Pitch bend:', value)} 
      />
      
      <MIDIPad 
        note={60} 
        onTrigger={(note, velocity) => console.log('Note on:', note, velocity)}
        onRelease={(note) => console.log('Note off:', note)}
      />
    </div>
  );
}
```

## 📚 Component Documentation

### Core Components

| Component | Description | Documentation |
|-----------|-------------|---------------|
| **Dial/Knob** | Rotary control for parameters | [View docs](https://profmitchell.github.io/AudioUI/docs/components/knob) |
| **Knob Specular** | Photorealistic knob with specular highlights | [View docs](https://profmitchell.github.io/AudioUI/docs/components/knob-specular) |
| **Slider - Ethereal** | Linear control with ethereal visual style | [View docs](https://profmitchell.github.io/AudioUI/docs/components/slider-ethereal) |
| **XY Pad** | Two-dimensional control surface | [View docs](https://profmitchell.github.io/AudioUI/docs/components/XYPad) |
| **ADSR Envelope** | Attack, Decay, Sustain, Release envelope editor | [View docs](https://profmitchell.github.io/AudioUI/docs/components/adsr-envelope) |
| **Pitch Bend Wheel** | Vertical/horizontal pitch bend control | [View docs](https://profmitchell.github.io/AudioUI/docs/components/pitch-bend-wheel) |
| **Modulation Wheel** | Modulation wheel control | [View docs](https://profmitchell.github.io/AudioUI/docs/components/modulation-wheel) |
| **Meter - Arc** | Circular level meter display | [View docs](https://profmitchell.github.io/AudioUI/docs/components/meter-arc) |

### Additional Components

- **MIDI Provider** - Context provider for MIDI functionality
- **Filter Display** - Visual representation of filter curves
- **Drum Pad** - Trigger pad for percussion samples
- **Preset Browser** - Interface for managing and selecting presets

## 🔧 Advanced Usage

### Theme Customization

AudioUI components can be customized to match your application's theme:

```jsx
<Dial 
  value={50}
  size="lg"
  trackColor="rgba(0,0,0,0.2)"
  indicatorColor="#6366f1"
  variant="flat"
  showValue={true}
  valueFormatter={(v) => `${v}%`}
/>
```

### Integration with Web Audio API

```jsx
import { useEffect, useRef } from 'react';
import { Dial } from 'audioui';

function AudioProcessor() {
  const audioContextRef = useRef(null);
  const filterRef = useRef(null);
  
  useEffect(() => {
    audioContextRef.current = new AudioContext();
    filterRef.current = audioContextRef.current.createBiquadFilter();
    // Additional audio setup...
  }, []);
  
  const handleFilterChange = (value) => {
    if (filterRef.current) {
      filterRef.current.frequency.value = value * 100;
    }
  };
  
  return (
    <div>
      <h3>Filter Frequency</h3>
      <Dial
        min={20}
        max={20000}
        value={1000}
        onChange={handleFilterChange}
        logScale={true}
      />
    </div>
  );
}
```

## 📂 Project Structure

```
/
├── components/
│   ├── ui/                 # Core UI components
│   │   ├── dial.tsx        # Rotary knob component
│   │   ├── adsr-envelope.tsx
│   │   ├── XYPad.tsx
│   │   └── ...
│   ├── site-sidebar.tsx    # Documentation site components
│   └── ...
├── app/
│   ├── docs/               # Documentation pages
│   │   ├── components/     # Component documentation
│   │   ├── installation/   # Installation guide
│   │   └── introduction/   # Introduction to AudioUI
│   └── ...
└── ...
```

## 🤝 Contributing

We welcome contributions to AudioUI! Whether it's new components, bug fixes, or documentation improvements.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please see our [contributing guidelines](https://github.com/profmitchell/AudioUI/blob/main/CONTRIBUTING.md) for more details.

## 🔄 Development Workflow

```bash
# Clone the repository
git clone https://github.com/profmitchell/AudioUI.git
cd AudioUI

# Install dependencies
pnpm install

# Start the development server
pnpm dev

# Build for production
pnpm build

# Deploy to GitHub Pages
pnpm deploy:pages
```

## 📝 License

AudioUI is [MIT licensed](https://github.com/profmitchell/AudioUI/blob/main/LICENSE).

## 🏢 Created By

[Cohen Concepts](https://cohen-concepts.com) - Building the future of audio software interfaces.
[Mitchell Cohen](https://college.berklee.edu/electronic-production-design/faculty/mitchell-cohen) - Professor of Electronic Music Production and Sound Design at Berklee College of Music in Boston. 

---

<div align="center">
Made with ❤️ for audio developers and music enthusiasts.
</div>
