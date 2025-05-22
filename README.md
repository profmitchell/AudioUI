# AudioUI

[![npm version](https://img.shields.io/npm/v/audioui.svg?style=flat)](https://www.npmjs.com/package/audioui)
[![MIT License](https://img.shields.io/github/license/profmitchell/AudioUI)](https://github.com/profmitchell/AudioUI/blob/main/LICENSE)
[![GitHub](https://img.shields.io/github/stars/profmitchell/AudioUI?style=social)](https://github.com/profmitchell/AudioUI)
<div align="center">
  <img width="600" alt="AudioUI Overview" src="https://github.com/user-attachments/assets/2e36a122-af19-453d-af62-f96e3b3852d8" />
</div>


Modern, accessible audio interface components for React applications
## Component Gallery


<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 20px;">
  <img width="300" alt="Component Example 1" src="https://github.com/user-attachments/assets/c8f8f698-60e4-4f0c-b279-31eb8ad71325" />
  <img width="300" alt="Component Example 2" src="https://github.com/user-attachments/assets/b1cb8595-ea02-4a27-9249-f8689911b3a0" />
  <img width="300" alt="Component Example 3" src="https://github.com/user-attachments/assets/738aed4a-69c5-4884-892b-9fdf160dad8a" />
  <img width="300" alt="Component Example 4" src="https://github.com/user-attachments/assets/a4cdac42-cbb9-4ec4-973a-a3b3c6a60de5" />
  <img width="300" alt="Component Example 5" src="https://github.com/user-attachments/assets/2bf92985-a4a4-4732-bb10-3eb9240b4d48" />
</div>


## Installation

```bash
npm install audioui
# or
yarn add audioui
# or
pnpm add audioui
```

[View Documentation](https://profmitchell.github.io/AudioUI/)

## Overview

AudioUI is a comprehensive library of React components specifically designed for audio applications, digital audio workstations (DAWs), synthesizers, and other music production tools. It provides professionally crafted UI elements common in music software with modern design principles and full accessibility support.

## Features

- 🎛️ **Professional Audio Controls**: Knobs, faders, XY pads, and other audio-specific UI components
- 🎹 **MIDI Integration**: Built-in MIDI support for components like drum pads and keyboards
- 📱 **Responsive**: Fully responsive components that work across devices
- ♿ **Accessible**: ARIA-compliant components with keyboard navigation
- 🎨 **Customizable**: Easily themeable to match your application's design
- ⚡ **Optimized**: High-performance components with minimal re-renders

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

## Component Documentation

### Core Components

- **Dial/Knob** - Rotary control for parameters
- **Slider** - Linear control for parameters
- **XY Pad** - Two-dimensional control surface
- **ADSR Envelope** - Attack, Decay, Sustain, Release envelope editor
- **MIDI Pad** - Trigger pad for MIDI notes
- **Pitch Bend** - Vertical/horizontal pitch bend control
- **Mod Wheel** - Modulation wheel control

### UI Helper Components

- **MIDI Provider** - Context provider for MIDI functionality
- **Custom Slider** - Enhanced slider with specialized audio features
- **Negative Slider** - Slider with support for negative values

## Examples and Documentation

Visit our [documentation site](https://github.com/profmitchell/AudioUI) for comprehensive examples, API reference, and usage guidelines.

## Contributing

We welcome contributions! Please see our [contributing guidelines](https://github.com/profmitchell/AudioUI/blob/main/CONTRIBUTING.md) for details.

## License

AudioUI is [MIT licensed](https://github.com/profmitchell/AudioUI/blob/main/LICENSE).

## Documentation Structure

The documentation is organized as follows:

- `/app/docs/introduction` - Introduction to AudioUI
- `/app/docs/installation` - Installation instructions
- `/app/docs/components` - Documentation for individual components

## Components

All UI components are located in the `/components/ui` directory. These components are imported and showcased in the documentation pages.

## Created By

[Cohen Concepts](https://cohen-concepts.com)
