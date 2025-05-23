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
- 🎚️ **JUCE Integration**: Ready-to-use starter template for integrating with JUCE 8's WebView feature

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

## 🎚️ JUCE Integration - AudioUIJUCEStarterTemplate

AudioUI provides a starter template for integrating with JUCE 8's WebView feature, allowing you to build audio plugins with React-based UIs.

### Key Features

- JUCE 8 audio processing backend with C++
- React frontend for modern UI development
- Hot-reloading capability for rapid UI development
- Seamless communication between C++ and JavaScript
- Cross-platform compatibility

### Getting Started

```bash
# Clone the starter template
git clone https://github.com/profmitchell/AudioUIJUCEStarterTemplate

# Set up the React frontend
cd AudioUIJUCEStarterTemplate/frontend
npm install
npm start
```

Open the JUCE project in your IDE (Xcode/Visual Studio), build and run it. The application will automatically connect to the React development server and display your UI with hot-reloading support.

[View JUCE Starter Template →](https://github.com/profmitchell/AudioUIJUCEStarterTemplate)

### Resources for JUCE WebView Development

- [JUCE 8 WebView UIs Documentation](https://juce.com/blog/juce-8-feature-overview-webview-uis/) - Official documentation from JUCE about the WebView feature
- [JUCE WebView Tutorial by Jan Wilczek](https://github.com/JanWilczek/juce-webview-tutorial) - Excellent step-by-step tutorial on integrating WebViews with JUCE

### Acknowledgments

Special thanks to the JUCE team for creating the WebView feature that makes this integration possible, and to Jan Wilczek for his invaluable tutorial that helped shape our implementation approach.

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

We welcome contributions to AudioUI! Whether it's new components, bug fixes, or documentation improvements, your help is greatly appreciated.

### Getting Started with Contributions

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:

   ```bash
   git clone https://github.com/YOUR-USERNAME/AudioUI.git
   cd AudioUI
   ```
3. **Create your feature branch**:

   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Commit your changes** with descriptive commit messages:

   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**:

   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request** on GitHub

### Contribution Guidelines

We have comprehensive documentation for contributors:

- [Detailed Contributing Guidelines](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)

### Component Contributions

Contributing a new audio component? Ensure it meets these criteria:

- Accessible (keyboard navigable, ARIA compliant)
- Mobile responsive
- Well-documented with clear prop interfaces
- Includes basic tests
- Follows AudioUI's design system

### Documentation Contributions

Documentation improvements are just as valuable as code! Consider:

- Adding usage examples
- Creating tutorials
- Improving component documentation
- Fixing typos and clarifying instructions

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

## 🙏 Acknowledgements

AudioUI is built on the foundation of [shadcn/ui](https://ui.shadcn.com/), a collection of re-usable components built using Radix UI and Tailwind CSS. We extend our gratitude to the shadcn/ui team for their excellent work that made this project possible.

---

<div align="center">
Made with ❤️ for audio developers and music enthusiasts.
</div>
