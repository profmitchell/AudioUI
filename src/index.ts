// This is a simple index file for the AudioUI library
// Since this is just for GitHub Pages deployment, we'll keep it minimal
// The actual library would include all component exports

// Just export a few basic types for now to avoid build errors
export interface AudioUIComponent {
  name: string;
  version: string;
}

// Constants
export const VERSION = '0.1.0';
export const AUTHOR = 'Cohen Concepts';

// Sample component placeholders
export const Components = {
  ADSREnvelope: 'ADSR Envelope',
  Dial: 'Rotary Dial',
  MIDIPad: 'MIDI Pad',
  PitchBend: 'Pitch Bend',
  ModWheel: 'Modulation Wheel',
  XYPad: 'XY Pad'
};
