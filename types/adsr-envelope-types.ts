import { RefObject } from "react"

export interface ADSREnvelopeProps {
  // Core ADSR parameters
  initialAttack?: number
  initialDecay?: number
  initialSustain?: number
  initialRelease?: number

  // Curve shapes
  initialAttackCurve?: number
  initialDecayCurve?: number
  initialReleaseCurve?: number

  // Visualization options
  visualizationHeight?: number
  sustainHoldTime?: number
  showLabels?: boolean
  showPlayhead?: boolean
  showValueIndicator?: boolean

  // Styling options
  className?: string
  envelopeCurveColor?: string
  envelopeFillColor?: string
  playheadColor?: string
  stageLineColor?: string
  labelColor?: string
  valueIndicatorColor?: string

  // Control options
  showControls?: boolean
  showCurveControls?: boolean
  showResetButton?: boolean
  showPlayButton?: boolean
  showValueDisplay?: boolean

  // Range limits
  attackRange?: [number, number]
  decayRange?: [number, number]
  releaseRange?: [number, number]
  curveRange?: [number, number]

  // Callbacks
  onAttackChange?: (value: number) => void
  onDecayChange?: (value: number) => void
  onSustainChange?: (value: number) => void
  onReleaseChange?: (value: number) => void
  onAttackCurveChange?: (value: number) => void
  onDecayCurveChange?: (value: number) => void
  onReleaseCurveChange?: (value: number) => void
  onEnvelopePlay?: () => void
  onEnvelopeStop?: () => void
  onEnvelopeReset?: () => void
  onEnvelopeValueChange?: (value: number) => void

  // Layout options
  controlsLayout?: "grid" | "horizontal" | "vertical"
  controlsPosition?: "top" | "bottom" | "left" | "right"

  // Card styling
  cardClassName?: string
  headerClassName?: string
  contentClassName?: string
  title?: string
  description?: string

  // Custom components
  renderControls?: (controlsProps: ADSRControlsProps) => React.ReactNode
  renderVisualization?: (visualizationProps: ADSRVisualizationProps) => React.ReactNode
}

export interface ADSRVisualizationProps {
  attack: number
  decay: number
  sustain: number
  release: number
  attackCurve: number
  decayCurve: number
  releaseCurve: number
  isPlaying: boolean
  currentTime: number
  envelopeValue: number
  noteOff: boolean
  totalDuration: number
  visualizationHeight?: number
  showLabels?: boolean
  showPlayhead?: boolean
  showValueIndicator?: boolean
  envelopeCurveColor?: string
  envelopeFillColor?: string
  playheadColor?: string
  stageLineColor?: string
  labelColor?: string
  valueIndicatorColor?: string
  canvasRef: RefObject<HTMLCanvasElement>
}

export interface ADSRControlsProps {
  attack: number
  decay: number
  sustain: number
  release: number
  attackCurve: number
  decayCurve: number
  releaseCurve: number
  isPlaying: boolean
  setAttack: (value: number) => void
  setDecay: (value: number) => void
  setSustain: (value: number) => void
  setRelease: (value: number) => void
  setAttackCurve: (value: number) => void
  setDecayCurve: (value: number) => void
  setReleaseCurve: (value: number) => void
  togglePlayback: () => void
  resetParameters: () => void
  showCurveControls?: boolean
  showResetButton?: boolean
  showPlayButton?: boolean
  attackRange?: [number, number]
  decayRange?: [number, number]
  releaseRange?: [number, number]
  curveRange?: [number, number]
  controlsLayout?: "grid" | "horizontal" | "vertical"
}
