// Define common property types
export type PropType = 'number' | 'string' | 'boolean' | 'function' | 'array' | 'object' | 'enum' | 'color';

export interface PropSchema {
  name: string;
  type: PropType;
  default: any;
  description: string;
  min?: number;
  max?: number;
  step?: number;
  options?: string[] | number[];
  required?: boolean;
  group?: string;
}

export interface ComponentSchema {
  id: string;
  name: string;
  description: string;
  category: 'input' | 'display' | 'control';
  props: PropSchema[];
  component: React.ComponentType<any>;
}

// Import actual components
import { Dial } from '@/components/ui/dial';
import { RotaryKnobDetailed } from '@/components/ui/rotary-knob-detailed';
import { XYPad } from '@/components/XYPad';
import { PitchBend } from '@/components/ui/pitch-bend';
import { EnhancedPitchBend } from '@/components/ui/enhanced-pitch-bend';
import { MidiPad } from '@/components/ui/midi-pad';
import { MidiPadGrid } from '@/components/midi-pad-grid';
import { CustomSlider } from '@/components/ui/custom-slider';
import { NegativeSlider } from '@/components/ui/negative-slider';
import ADSREnvelope from '@/components/ui/adsr-envelope';
import { ModWheel } from '@/components/ui/mod-wheel';
import { Arc } from '@/components/ui/arc';

// Component schemas
const componentSchemasArray: ComponentSchema[] = [
  {
    id: 'dial',
    name: 'Dial',
    description: 'A rotary dial control with various visual styles',
    category: 'input',
    component: Dial,
    props: [
      // Core Properties
      {
        name: 'value',
        type: 'number',
        default: 50,
        description: 'Current value of the dial',
        min: 0,
        max: 100,
        group: 'Core'
      },
      {
        name: 'min',
        type: 'number',
        default: 0,
        description: 'Minimum value',
        group: 'Core'
      },
      {
        name: 'max',
        type: 'number',
        default: 100,
        description: 'Maximum value',
        group: 'Core'
      },
      {
        name: 'step',
        type: 'number',
        default: 1,
        description: 'Step increment',
        min: 0.01,
        max: 10,
        group: 'Core'
      },
      {
        name: 'label',
        type: 'string',
        default: '',
        description: 'Label text',
        group: 'Core'
      },
      {
        name: 'showValue',
        type: 'boolean',
        default: true,
        description: 'Show value label',
        group: 'Core'
      },
      // Appearance Properties
      {
        name: 'variant',
        type: 'enum',
        default: 'default',
        description: 'Visual style',
        options: ['default', 'metallic', 'flat', 'glass', 'custom'],
        group: 'Appearance'
      },
      {
        name: 'size',
        type: 'enum',
        default: 'md',
        description: 'Size of the dial',
        options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
        group: 'Appearance'
      },
      {
        name: 'shape',
        type: 'enum',
        default: 'circle',
        description: 'Shape of the dial',
        options: ['circle', 'square', 'rounded', 'squircle', 'hexagon', 'octagon'],
        group: 'Appearance'
      },
      {
        name: 'indicatorStyle',
        type: 'enum',
        default: 'line',
        description: 'Style of indicator',
        options: ['line', 'dot', 'glow', 'notch', 'triangle'],
        group: 'Appearance'
      },
      {
        name: 'borderStyle',
        type: 'enum',
        default: 'none',
        description: 'Border style',
        options: ['none', 'thin', 'medium', 'thick', 'inner', 'double'],
        group: 'Appearance'
      },
      {
        name: 'shadowStyle',
        type: 'enum',
        default: 'none',
        description: 'Shadow style',
        options: ['none', 'soft', 'medium', 'hard', 'inner', 'glass', 'glow'],
        group: 'Appearance'
      },
      // Knob Customization
      {
        name: 'knobVariant',
        type: 'enum',
        default: 'default',
        description: 'Knob visual style',
        options: ['default', 'metallic', 'brushed', 'inset', 'flat', 'glass', 'custom'],
        group: 'Knob'
      },
      {
        name: 'knobSize',
        type: 'number',
        default: 60,
        description: 'Knob size as percentage of dial',
        min: 20,
        max: 90,
        step: 1,
        group: 'Knob'
      },
      {
        name: 'knobShape',
        type: 'enum',
        default: 'circle',
        description: 'Shape of the knob',
        options: ['circle', 'square', 'rounded', 'squircle', 'hexagon', 'octagon'],
        group: 'Knob'
      },
      // Indicator and Ticks
      {
        name: 'indicatorSize',
        type: 'number',
        default: 2,
        description: 'Indicator thickness/size',
        min: 1,
        max: 10,
        step: 1,
        group: 'Indicator'
      },
      {
        name: 'indicatorLength',
        type: 'number',
        default: 40,
        description: 'Indicator length as percentage',
        min: 10,
        max: 80,
        step: 1,
        group: 'Indicator'
      },
      {
        name: 'tickMarks',
        type: 'number',
        default: 0,
        description: 'Number of tick marks',
        min: 0,
        max: 24,
        group: 'Indicator'
      },
      {
        name: 'tickSize',
        type: 'number',
        default: 8,
        description: 'Tick marks size',
        min: 2,
        max: 20,
        step: 1,
        group: 'Indicator'
      },
      {
        name: 'tickWidth',
        type: 'number',
        default: 2,
        description: 'Tick marks width',
        min: 1,
        max: 6,
        step: 1,
        group: 'Indicator'
      },
      {
        name: 'graduatedDial',
        type: 'boolean',
        default: false,
        description: 'Show graduated marks on dial track',
        group: 'Indicator'
      },
      // Typography
      {
        name: 'labelFontSize',
        type: 'string',
        default: '0.875rem',
        description: 'Label font size',
        group: 'Typography'
      },
      {
        name: 'valueFontSize',
        type: 'string',
        default: '0.875rem',
        description: 'Value font size',
        group: 'Typography'
      },
      {
        name: 'labelFontWeight',
        type: 'string',
        default: 'medium',
        description: 'Label font weight',
        group: 'Typography'
      },
      {
        name: 'valueFontWeight',
        type: 'string',
        default: 'medium',
        description: 'Value font weight',
        group: 'Typography'
      },
      // Advanced
      {
        name: 'rotationRange',
        type: 'number',
        default: 300,
        description: 'Rotation range in degrees',
        min: 90,
        max: 360,
        step: 10,
        group: 'Advanced'
      },
      {
        name: 'startAngle',
        type: 'number',
        default: -240,
        description: 'Start angle in degrees',
        min: -360,
        max: 0,
        step: 10,
        group: 'Advanced'
      },
      // Color Customization
      {
        name: 'useCustomColors',
        type: 'boolean',
        default: false,
        description: 'Use custom colors instead of theme colors',
        group: 'Colors'
      },
      {
        name: 'dialColor',
        type: 'color',
        default: '',
        description: 'Custom dial background color',
        group: 'Colors'
      },
      {
        name: 'knobColor',
        type: 'color',
        default: '',
        description: 'Custom knob color',
        group: 'Colors'
      },
      {
        name: 'indicatorColor',
        type: 'color',
        default: 'white',
        description: 'Indicator color',
        group: 'Colors'
      },
      {
        name: 'trackColor',
        type: 'color',
        default: 'rgba(255,255,255,0.1)',
        description: 'Track background color',
        group: 'Colors'
      },
      {
        name: 'trackGlowColor',
        type: 'color',
        default: '',
        description: 'Track value color (falls back to glowColor if not set)',
        group: 'Colors'
      },
      {
        name: 'glowColor',
        type: 'color',
        default: 'rgba(255,255,255,0.2)',
        description: 'Glow color for glow indicator style',
        group: 'Colors'
      },
      {
        name: 'borderColor',
        type: 'color',
        default: '',
        description: 'Border color',
        group: 'Colors'
      },
      {
        name: 'shadowColor',
        type: 'color',
        default: '',
        description: 'Shadow color',
        group: 'Colors'
      },
      {
        name: 'labelColor',
        type: 'color',
        default: '',
        description: 'Label text color',
        group: 'Colors'
      },
      {
        name: 'valueColor',
        type: 'color',
        default: '',
        description: 'Value text color',
        group: 'Colors'
      },
      {
        name: 'tickColor',
        type: 'color',
        default: 'rgba(255,255,255,0.3)',
        description: 'Tick marks color',
        group: 'Colors'
      },
      // Events
      {
        name: 'onChange',
        type: 'function',
        default: () => {},
        description: 'Callback when value changes',
        group: 'Events'
      }
    ]
  },
  {
    id: 'knob-specular',
    name: 'Specular Knob',
    description: 'A detailed knob with specular lighting effects',
    category: 'input',
    component: RotaryKnobDetailed,
    props: [
      // Core properties
      {
        name: 'value',
        type: 'number',
        default: 0.5,
        description: 'Current value of the knob',
        min: 0,
        max: 1,
        step: 0.01,
        group: 'Core'
      },
      {
        name: 'min',
        type: 'number',
        default: 0,
        description: 'Minimum value',
        group: 'Core'
      },
      {
        name: 'max',
        type: 'number',
        default: 1,
        description: 'Maximum value',
        group: 'Core'
      },
      {
        name: 'step',
        type: 'number',
        default: 0.01,
        description: 'Step increment',
        min: 0.001,
        max: 0.1,
        group: 'Core'
      },
      {
        name: 'label',
        type: 'string',
        default: '',
        description: 'Label text',
        group: 'Core'
      },
      {
        name: 'showValue',
        type: 'boolean',
        default: false,
        description: 'Show value below knob',
        group: 'Core'
      },
      // Appearance
      {
        name: 'size',
        type: 'enum',
        default: 'md',
        description: 'Size of the knob',
        options: ['sm', 'md', 'lg'],
        group: 'Appearance'
      },
      {
        name: 'knobShape',
        type: 'enum',
        default: 'circle',
        description: 'Shape of the knob',
        options: ['circle', 'square', 'rounded', 'squircle'],
        group: 'Appearance'
      },
      {
        name: 'knobRatio',
        type: 'number',
        default: 60,
        description: 'Size of the knob as percentage of container',
        min: 40,
        max: 90,
        step: 1,
        group: 'Appearance'
      },
      {
        name: 'borderStyle',
        type: 'enum',
        default: 'none',
        description: 'Border style',
        options: ['none', 'thin', 'medium', 'thick'],
        group: 'Appearance'
      },
      {
        name: 'shadowIntensity',
        type: 'enum',
        default: 'medium',
        description: 'Shadow intensity',
        options: ['none', 'light', 'medium', 'strong'],
        group: 'Appearance'
      },
      // Material properties
      {
        name: 'metallic',
        type: 'number',
        default: 50,
        description: 'Metallic finish amount',
        min: 0,
        max: 100,
        group: 'Material'
      },
      {
        name: 'reflections',
        type: 'boolean',
        default: true,
        description: 'Enable reflections',
        group: 'Material'
      },
      {
        name: 'lightX',
        type: 'number',
        default: 75,
        description: 'Light source X position',
        min: 0,
        max: 100,
        group: 'Material'
      },
      {
        name: 'lightY',
        type: 'number',
        default: 25,
        description: 'Light source Y position',
        min: 0,
        max: 100,
        group: 'Material'
      },
      {
        name: 'glowOnActive',
        type: 'boolean',
        default: true,
        description: 'Add glow effect when active',
        group: 'Material'
      },
      // Indicator and Ticks
      {
        name: 'showIndicator',
        type: 'boolean',
        default: true,
        description: 'Show indicator line',
        group: 'Indicator'
      },
      {
        name: 'indicatorWidth',
        type: 'number',
        default: 2,
        description: 'Width of indicator in pixels',
        min: 1,
        max: 10,
        group: 'Indicator'
      },
      {
        name: 'indicatorLength',
        type: 'number',
        default: 50,
        description: 'Length of indicator as percentage',
        min: 20,
        max: 80,
        group: 'Indicator'
      },
      {
        name: 'showTicks',
        type: 'boolean',
        default: true,
        description: 'Show tick marks',
        group: 'Indicator'
      },
      {
        name: 'tickSize',
        type: 'number',
        default: 8,
        description: 'Size of tick marks in pixels',
        min: 4,
        max: 16,
        group: 'Indicator'
      },
      {
        name: 'tickFrequency',
        type: 'number',
        default: 1,
        description: 'Frequency multiplier for tick marks',
        min: 0.5,
        max: 2,
        step: 0.5,
        group: 'Indicator'
      },
      {
        name: 'showTickLabels',
        type: 'boolean',
        default: false,
        description: 'Show labels on tick marks',
        group: 'Indicator'
      },
      {
        name: 'tickLabelFrequency',
        type: 'number',
        default: 5,
        description: 'Show label every N ticks',
        min: 1,
        max: 10,
        step: 1,
        group: 'Indicator'
      },
      // Rotation
      {
        name: 'minAngle',
        type: 'number',
        default: -135,
        description: 'Minimum rotation angle',
        min: -360,
        max: 0,
        group: 'Advanced'
      },
      {
        name: 'maxAngle',
        type: 'number',
        default: 135,
        description: 'Maximum rotation angle',
        min: 0,
        max: 360,
        group: 'Advanced'
      },
      {
        name: 'sensitivity',
        type: 'number',
        default: 0.005,
        description: 'Drag sensitivity',
        min: 0.001,
        max: 0.02,
        step: 0.001,
        group: 'Advanced'
      },
      // Colors
      {
        name: 'useCustomColors',
        type: 'boolean',
        default: false,
        description: 'Use custom colors',
        group: 'Colors'
      },
      {
        name: 'color',
        type: 'color',
        default: '#00AAFF',
        description: 'Accent color',
        group: 'Colors'
      },
      {
        name: 'baseColor',
        type: 'color',
        default: '',
        description: 'Base background color',
        group: 'Colors'
      },
      {
        name: 'indicatorColor',
        type: 'color',
        default: 'white',
        description: 'Indicator color',
        group: 'Colors'
      },
      {
        name: 'tickColor',
        type: 'color',
        default: 'rgba(255,255,255,0.4)',
        description: 'Tick marks color',
        group: 'Colors'
      },
      {
        name: 'borderColor',
        type: 'color',
        default: 'rgba(255,255,255,0.05)',
        description: 'Border color',
        group: 'Colors'
      },
      {
        name: 'glowColor',
        type: 'color',
        default: 'rgba(255,255,255,0.15)',
        description: 'Glow effect color',
        group: 'Colors'
      },
      {
        name: 'labelColor',
        type: 'color',
        default: '',
        description: 'Label text color',
        group: 'Colors'
      },
      {
        name: 'valueColor',
        type: 'color',
        default: '',
        description: 'Value text color',
        group: 'Colors'
      },
      // Typography
      {
        name: 'labelFontSize',
        type: 'string',
        default: '0.875rem',
        description: 'Label font size',
        group: 'Typography'
      },
      {
        name: 'valueFontSize',
        type: 'string',
        default: '0.875rem',
        description: 'Value font size',
        group: 'Typography'
      },
      // Events
      {
        name: 'onChange',
        type: 'function',
        default: () => {},
        description: 'Callback when value changes',
        group: 'Events'
      }
    ]
  },
  {
    id: 'slider',
    name: 'Custom Slider',
    description: 'A highly customizable slider control with neumorphic styling',
    category: 'input',
    component: CustomSlider,
    props: [
      {
        name: 'value',
        type: 'array',
        default: [50],
        description: 'Current value(s) of the slider',
      },
      {
        name: 'min',
        type: 'number',
        default: 0,
        description: 'Minimum value',
      },
      {
        name: 'max',
        type: 'number',
        default: 100,
        description: 'Maximum value',
      },
      {
        name: 'step',
        type: 'number',
        default: 1,
        description: 'Step increment',
        min: 0.01,
        max: 10
      },
      {
        name: 'variant',
        type: 'enum',
        default: 'neumorphic-inset',
        description: 'Visual style',
        options: ['neumorphic-inset', 'neumorphic-outset']
      },
      {
        name: 'vertical',
        type: 'boolean',
        default: false,
        description: 'Vertical orientation'
      },
      {
        name: 'bipolar',
        type: 'boolean',
        default: false,
        description: 'Bipolar mode (center at zero)'
      },
      {
        name: 'showValue',
        type: 'boolean',
        default: true,
        description: 'Show value label'
      },
      {
        name: 'valuePrefix',
        type: 'string',
        default: '',
        description: 'Prefix for displayed value'
      },
      {
        name: 'valueSuffix',
        type: 'string',
        default: '',
        description: 'Suffix for displayed value'
      },
      {
        name: 'shadowIntensity',
        type: 'enum',
        default: 'medium',
        description: 'Shadow intensity',
        options: ['light', 'medium', 'strong']
      },
      {
        name: 'effectTightness',
        type: 'enum',
        default: 'medium',
        description: 'Effect tightness',
        options: ['tight', 'medium', 'loose']
      },
      {
        name: 'borderRadius',
        type: 'enum',
        default: 'medium',
        description: 'Border radius',
        options: ['small', 'medium', 'large', 'pill']
      },
      {
        name: 'onValueChange',
        type: 'function',
        default: () => {},
        description: 'Callback when value changes'
      }
    ]
  },
  {
    id: 'slider-neumorphic',
    name: 'Neumorphic Slider',
    description: 'A slider with neumorphic design',
    category: 'input',
    component: CustomSlider,
    props: [
      {
        name: 'value',
        type: 'array',
        default: [50],
        description: 'Current value(s) of the slider',
      },
      {
        name: 'min',
        type: 'number',
        default: 0,
        description: 'Minimum value',
      },
      {
        name: 'max',
        type: 'number',
        default: 100,
        description: 'Maximum value',
      },
      {
        name: 'step',
        type: 'number',
        default: 1,
        description: 'Step increment',
        min: 0.01,
        max: 10
      },
      {
        name: 'variant',
        type: 'enum',
        default: 'neumorphic-inset',
        description: 'Visual style',
        options: ['neumorphic-inset', 'neumorphic-outset']
      },
      {
        name: 'vertical',
        type: 'boolean',
        default: false,
        description: 'Vertical orientation'
      },
      {
        name: 'bipolar',
        type: 'boolean',
        default: false,
        description: 'Bipolar mode (center at zero)'
      },
      {
        name: 'shadowIntensity',
        type: 'enum',
        default: 'medium',
        description: 'Shadow intensity',
        options: ['light', 'medium', 'strong']
      },
      {
        name: 'effectTightness',
        type: 'enum',
        default: 'medium',
        description: 'Effect tightness',
        options: ['tight', 'medium', 'loose']
      },
      {
        name: 'borderRadius',
        type: 'enum',
        default: 'medium',
        description: 'Border radius',
        options: ['small', 'medium', 'large', 'pill']
      },
      {
        name: 'onValueChange',
        type: 'function',
        default: () => {},
        description: 'Callback when value changes'
      }
    ]
  },
  {
    id: 'slider-ethereal',
    name: 'Ethereal Slider',
    description: 'A slider with ethereal glow effects',
    category: 'input',
    component: NegativeSlider,
    props: [
      {
        name: 'value',
        type: 'array',
        default: [50],
        description: 'Current value(s) of the slider',
      },
      {
        name: 'min',
        type: 'number',
        default: 0,
        description: 'Minimum value',
      },
      {
        name: 'max',
        type: 'number',
        default: 100,
        description: 'Maximum value',
      },
      {
        name: 'step',
        type: 'number',
        default: 1,
        description: 'Step increment',
        min: 0.01,
        max: 10
      },
      {
        name: 'color',
        type: 'color',
        default: 'rgba(255,255,255,0.8)',
        description: 'Slider glow color'
      },
      {
        name: 'onValueChange',
        type: 'function',
        default: () => {},
        description: 'Callback when value changes'
      }
    ]
  },
  {
    id: 'pitch-bend-wheel',
    name: 'Pitch Bend Wheel',
    description: 'A vertical pitch bend wheel control',
    category: 'input',
    component: PitchBend,
    props: [
      {
        name: 'value',
        type: 'number',
        default: 0,
        description: 'Current value (-1 to 1)',
        min: -1,
        max: 1,
        step: 0.01
      },
      {
        name: 'spring',
        type: 'boolean',
        default: true,
        description: 'Enable spring return to center'
      },
      {
        name: 'restPosition',
        type: 'enum',
        default: 'center',
        description: 'Rest position when released',
        options: ['center', 'bottom']
      },
      {
        name: 'min',
        type: 'number',
        default: -1,
        description: 'Minimum value',
      },
      {
        name: 'max',
        type: 'number',
        default: 1,
        description: 'Maximum value',
      },
      {
        name: 'snapStrength',
        type: 'number',
        default: 0.8,
        description: 'Strength of spring snap effect',
        min: 0.1,
        max: 1
      },
      {
        name: 'onChange',
        type: 'function',
        default: () => {},
        description: 'Callback when value changes'
      },
      {
        name: 'onRelease',
        type: 'function',
        default: () => {},
        description: 'Callback when wheel is released'
      }
    ]
  },
  {
    id: 'modulation-wheel',
    name: 'Modulation Wheel',
    description: 'A standard modulation wheel control for synthesizer parameters',
    category: 'input',
    component: ModWheel,
    props: [
      {
        name: 'value',
        type: 'number',
        default: 0,
        description: 'Current value (0 to 1)',
        min: 0,
        max: 1,
        step: 0.01
      },
      {
        name: 'spring',
        type: 'boolean',
        default: false,
        description: 'Enable spring return to rest position'
      },
      {
        name: 'restPosition',
        type: 'enum',
        default: 'bottom',
        description: 'Rest position when released',
        options: ['center', 'bottom']
      },
      {
        name: 'min',
        type: 'number',
        default: 0,
        description: 'Minimum value',
      },
      {
        name: 'max',
        type: 'number',
        default: 1,
        description: 'Maximum value',
      },
      {
        name: 'snapStrength',
        type: 'number',
        default: 0.8,
        description: 'Strength of spring snap effect',
        min: 0.1,
        max: 1
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: false,
        description: 'Disables the control',
      },
      {
        name: 'label',
        type: 'string',
        default: 'Mod Wheel',
        description: 'Label text',
      },
      {
        name: 'onChange',
        type: 'function',
        default: () => {},
        description: 'Callback when value changes'
      },
      {
        name: 'onRelease',
        type: 'function',
        default: () => {},
        description: 'Callback when wheel is released'
      }
    ]
  },
  {
    id: 'graph-xy',
    name: 'XY Pad',
    description: 'A 2D control surface for manipulating X and Y parameters',
    category: 'input',
    component: XYPad,
    props: [
      {
        name: 'x',
        type: 'number',
        default: 0.5,
        description: 'X-axis value (0 to 1)',
        min: 0,
        max: 1,
        step: 0.01
      },
      {
        name: 'y',
        type: 'number',
        default: 0.5,
        description: 'Y-axis value (0 to 1)',
        min: 0,
        max: 1,
        step: 0.01
      },
      {
        name: 'width',
        type: 'number',
        default: 200,
        description: 'Width in pixels',
        min: 100,
        max: 500
      },
      {
        name: 'height',
        type: 'number',
        default: 200,
        description: 'Height in pixels',
        min: 100,
        max: 500
      },
      {
        name: 'stepX',
        type: 'number',
        default: 0.01,
        description: 'Step size for X-axis',
        min: 0.001,
        max: 0.1
      },
      {
        name: 'stepY',
        type: 'number',
        default: 0.01,
        description: 'Step size for Y-axis',
        min: 0.001,
        max: 0.1
      },
      {
        name: 'showGrid',
        type: 'boolean',
        default: false,
        description: 'Show grid lines'
      },
      {
        name: 'snapToGrid',
        type: 'boolean',
        default: false,
        description: 'Snap values to grid'
      },
      {
        name: 'theme',
        type: 'enum',
        default: 'default',
        description: 'Visual theme',
        options: ['default', 'neon', 'midnight', 'sunset', 'nightPurple']
      },
      {
        name: 'rippleEffect',
        type: 'boolean',
        default: true,
        description: 'Enable ripple effect on interaction'
      },
      {
        name: 'trackColor',
        type: 'color',
        default: '',
        description: 'Track background color (overrides theme)'
      },
      {
        name: 'thumbColor',
        type: 'color',
        default: '',
        description: 'Thumb indicator color (overrides theme)'
      },
      {
        name: 'onChange',
        type: 'function',
        default: () => {},
        description: 'Callback when values change'
      }
    ]
  },
  {
    id: 'drum-pad',
    name: 'Drum Pad',
    description: 'A pressure-sensitive drum pad with lighting effects',
    category: 'input',
    component: MidiPad,
    props: [
      {
        name: 'note',
        type: 'number',
        default: 60,
        description: 'MIDI note number',
        min: 0,
        max: 127
      },
      {
        name: 'channel',
        type: 'number',
        default: 1,
        description: 'MIDI channel',
        min: 1,
        max: 16
      },
      {
        name: 'size',
        type: 'enum',
        default: 'md',
        description: 'Size of the pad',
        options: ['sm', 'md', 'lg', 'xl', 'xxl']
      },
      {
        name: 'radius',
        type: 'enum',
        default: 'md',
        description: 'Corner radius',
        options: ['none', 'sm', 'md', 'lg', 'full']
      },
      {
        name: 'ledColor',
        type: 'color',
        default: 'rgba(255, 255, 255, 0.9)',
        description: 'LED color when pressed'
      },
      {
        name: 'label',
        type: 'string',
        default: '',
        description: 'Label text'
      },
      {
        name: 'subLabel',
        type: 'string',
        default: '',
        description: 'Secondary label text'
      },
      {
        name: 'animationStyle',
        type: 'enum',
        default: 'instant',
        description: 'Animation style when triggered',
        options: ['instant', 'fade', 'radial', 'top-down', 'bottom-up', 'left-right', 'right-left']
      },
      {
        name: 'use1DVelocity',
        type: 'boolean',
        default: false,
        description: 'Use vertical position for velocity'
      },
      {
        name: 'useTemperatureColor',
        type: 'boolean',
        default: false,
        description: 'Color changes with velocity'
      },
      {
        name: 'onPadTrigger',
        type: 'function',
        default: () => {},
        description: 'Callback when pad is triggered'
      }
    ]
  },
  {
    id: 'graph-adsr',
    name: 'ADSR Envelope',
    description: 'An ADSR envelope generator with visualization',
    category: 'control',
    component: ADSREnvelope,
    props: [
      {
        name: 'initialAttack',
        type: 'number',
        default: 10,
        description: 'Attack time (ms)',
        min: 0.1,
        max: 1000
      },
      {
        name: 'initialDecay',
        type: 'number',
        default: 120,
        description: 'Decay time (ms)',
        min: 0.1,
        max: 2000
      },
      {
        name: 'initialSustain',
        type: 'number',
        default: 0.75,
        description: 'Sustain level (0-1)',
        min: 0,
        max: 1
      },
      {
        name: 'initialRelease',
        type: 'number',
        default: 250,
        description: 'Release time (ms)',
        min: 0.1,
        max: 3000
      },
      {
        name: 'showControls',
        type: 'boolean',
        default: true,
        description: 'Show parameter controls'
      },
      {
        name: 'showCurveControls',
        type: 'boolean',
        default: true,
        description: 'Show curve shape controls'
      },
      {
        name: 'showPlayButton',
        type: 'boolean',
        default: true,
        description: 'Show play/pause button'
      },
      {
        name: 'visualizationHeight',
        type: 'number',
        default: 200,
        description: 'Height of visualization',
        min: 100,
        max: 400
      },
      {
        name: 'envelopeCurveColor',
        type: 'color',
        default: 'rgba(255, 255, 255, 0.8)',
        description: 'Curve line color'
      },
      {
        name: 'envelopeFillColor',
        type: 'color',
        default: 'rgba(255, 255, 255, 0.1)',
        description: 'Envelope fill color'
      },
      {
        name: 'controlsPosition',
        type: 'enum',
        default: 'bottom',
        description: 'Controls position',
        options: ['top', 'bottom', 'left', 'right']
      }
    ]
  },
  {
    id: 'meter-arc',
    name: 'Arc Meter',
    description: 'A circular meter/arc display with customizable appearance',
    category: 'display',
    component: Arc,
    props: [
      // Core properties
      {
        name: 'value',
        type: 'number',
        default: 50,
        description: 'Current value (0-100)',
        min: 0,
        max: 100,
        group: 'Core'
      },
      {
        name: 'min',
        type: 'number',
        default: 0,
        description: 'Minimum value',
        group: 'Core'
      },
      {
        name: 'max',
        type: 'number',
        default: 100,
        description: 'Maximum value',
        group: 'Core'
      },
      {
        name: 'step',
        type: 'number',
        default: 1,
        description: 'Step increment',
        min: 0.1,
        max: 10,
        group: 'Core'
      },
      {
        name: 'label',
        type: 'string',
        default: '',
        description: 'Label text',
        group: 'Core'
      },
      {
        name: 'showValue',
        type: 'boolean',
        default: true,
        description: 'Show numeric value',
        group: 'Core'
      },
      {
        name: 'bipolar',
        type: 'boolean',
        default: false,
        description: 'Enable bipolar mode (values centered around 0)',
        group: 'Core'
      },
      // Appearance
      {
        name: 'variant',
        type: 'enum',
        default: 'default',
        description: 'Visual style',
        options: ['default', 'minimal', 'glass', 'inset', 'flat', 'custom'],
        group: 'Appearance'
      },
      {
        name: 'size',
        type: 'enum',
        default: 'md',
        description: 'Size of the meter',
        options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
        group: 'Appearance'
      },
      {
        name: 'indicatorStyle',
        type: 'enum',
        default: 'line',
        description: 'Style of the value indicator',
        options: ['line', 'glow', 'dotted', 'gradient', 'custom'],
        group: 'Appearance'
      },
      {
        name: 'trackWidth',
        type: 'number',
        default: 4,
        description: 'Width of the track',
        min: 1,
        max: 20,
        group: 'Appearance'
      },
      {
        name: 'centerDisplayStyle',
        type: 'enum',
        default: 'default',
        description: 'Style of the center display',
        options: ['default', 'none', 'minimal', 'glass', 'inset', 'custom'],
        group: 'Appearance'
      },
      {
        name: 'centerDisplaySize',
        type: 'number',
        default: 30,
        description: 'Size of center display as percentage',
        min: 0,
        max: 90,
        group: 'Appearance'
      },
      // Arc Configuration
      {
        name: 'startAngle',
        type: 'number',
        default: -240,
        description: 'Starting angle in degrees',
        min: -360,
        max: 0,
        group: 'Arc'
      },
      {
        name: 'rotationRange',
        type: 'number',
        default: 300,
        description: 'Rotation range in degrees',
        min: 90,
        max: 360,
        group: 'Arc'
      },
      // Tick Marks
      {
        name: 'tickMarks',
        type: 'number',
        default: 0,
        description: 'Number of tick marks',
        min: 0,
        max: 24,
        group: 'Ticks'
      },
      {
        name: 'tickLength',
        type: 'number',
        default: 5,
        description: 'Length of tick marks',
        min: 1,
        max: 20,
        group: 'Ticks'
      },
      {
        name: 'tickWidth',
        type: 'number',
        default: 1,
        description: 'Width of tick marks',
        min: 0.5,
        max: 5,
        step: 0.5,
        group: 'Ticks'
      },
      {
        name: 'showTickLabels',
        type: 'boolean',
        default: false,
        description: 'Show labels on tick marks',
        group: 'Ticks'
      },
      {
        name: 'tickLabelFrequency',
        type: 'number',
        default: 2,
        description: 'Label frequency (every Nth tick)',
        min: 1,
        max: 10,
        group: 'Ticks'
      },
      // Typography
      {
        name: 'labelFontSize',
        type: 'string',
        default: '0.875rem',
        description: 'Size of the label font',
        group: 'Typography'
      },
      {
        name: 'valueFontSize',
        type: 'string',
        default: '0.875rem',
        description: 'Size of the value font',
        group: 'Typography'
      },
      // Gradients
      {
        name: 'gradientAngle',
        type: 'number',
        default: 0,
        description: 'Angle for gradient rotation',
        min: 0,
        max: 360,
        group: 'Gradients'
      },
      // Custom Colors
      {
        name: 'useCustomColors',
        type: 'boolean',
        default: false,
        description: 'Enable custom color settings',
        group: 'Colors'
      },
      {
        name: 'trackColor',
        type: 'color',
        default: 'rgba(255,255,255,0.1)',
        description: 'Color of the track',
        group: 'Colors'
      },
      {
        name: 'valueColor',
        type: 'color',
        default: 'white',
        description: 'Color of the value arc',
        group: 'Colors'
      },
      {
        name: 'glowColor',
        type: 'color',
        default: 'rgba(255,255,255,0.2)',
        description: 'Glow color for glow indicator style',
        group: 'Colors'
      },
      {
        name: 'tickColor',
        type: 'color',
        default: 'rgba(255,255,255,0.3)',
        description: 'Color of tick marks',
        group: 'Colors'
      },
      {
        name: 'tickLabelColor',
        type: 'color',
        default: 'rgba(255,255,255,0.6)',
        description: 'Color of tick labels',
        group: 'Colors'
      },
      {
        name: 'labelColor',
        type: 'color',
        default: '',
        description: 'Color of the label text',
        group: 'Colors'
      },
      {
        name: 'backgroundColor',
        type: 'color',
        default: '',
        description: 'Background color (for custom variant)',
        group: 'Colors'
      },
      {
        name: 'borderColor',
        type: 'color',
        default: '',
        description: 'Border color (for custom variant)',
        group: 'Colors'
      },
      {
        name: 'shadowColor',
        type: 'color',
        default: '',
        description: 'Shadow color',
        group: 'Colors'
      },
      {
        name: 'centerDisplayColor',
        type: 'color',
        default: '',
        description: 'Center display background color',
        group: 'Colors'
      },
      {
        name: 'centerDisplayBorderColor',
        type: 'color',
        default: '',
        description: 'Center display border color',
        group: 'Colors'
      },
      // Advanced props
      {
        name: 'borderWidth',
        type: 'number',
        default: 1,
        description: 'Border width for custom variant',
        min: 0,
        max: 5,
        group: 'Advanced'
      },
      {
        name: 'shadowSize',
        type: 'number',
        default: 10,
        description: 'Shadow size in pixels',
        min: 0,
        max: 30,
        group: 'Advanced'
      },
      {
        name: 'centerDisplayBorderWidth',
        type: 'number',
        default: 1,
        description: 'Center display border width',
        min: 0,
        max: 5,
        group: 'Advanced'
      },
      // Events
      {
        name: 'onChange',
        type: 'function',
        default: () => {},
        description: 'Callback when value changes',
        group: 'Events'
      }
    ]
  }
];

// Export as map and lookup function
export const componentSchemas = componentSchemasArray.reduce((acc, schema) => {
  acc[schema.id] = schema;
  return acc;
}, {} as Record<string, ComponentSchema>);

export const getComponentSchemaById = (id: string): ComponentSchema | undefined => {
  return componentSchemas[id];
}; 