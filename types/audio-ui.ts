// Common types for AudioUI components

// ADSR Envelope types
export interface ADSREnvelopeValues {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
}

export interface MIDIPadProps {
  note?: number;
  velocity?: number;
  channel?: number;
  onTrigger?: (note: number, velocity: number, channel: number) => void;
  onRelease?: (note: number, channel: number) => void;
  [key: string]: any;
}

export interface DialProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
  [key: string]: any;
}

export interface PitchBendProps {
  value?: number;
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
  [key: string]: any;
}

export interface ModWheelProps {
  value?: number;
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
  [key: string]: any;
}

export interface XYPadProps {
  xValue?: number;
  yValue?: number;
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
  onChange?: (xValue: number, yValue: number) => void;
  onChangeEnd?: (xValue: number, yValue: number) => void;
  [key: string]: any;
}

export interface SliderProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
  [key: string]: any;
}
