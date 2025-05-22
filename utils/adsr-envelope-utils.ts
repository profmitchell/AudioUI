// Format time value for display
export function formatTime(ms: number): string {
  if (ms < 1000) {
    return `${ms.toFixed(1)}ms`
  } else {
    const seconds = ms / 1000
    return `${seconds.toFixed(2)}s`
  }
}

// Apply easing curve based on curve parameter
export const applyEasingCurve = (t: number, curve: number): number => {
  if (curve === 0) return t // Linear
  if (curve > 0) {
    // Concave (ease-in)
    return Math.pow(t, 1 + curve * 2)
  } else {
    // Convex (ease-out)
    return 1 - Math.pow(1 - t, 1 + Math.abs(curve) * 2)
  }
}

// Calculate the current envelope value based on ADSR parameters and time
export function calculateEnvelopeValue(
  currentTime: number,
  attack: number,
  decay: number,
  sustain: number,
  release: number,
  attackCurve: number,
  decayCurve: number,
  releaseCurve: number,
  noteOff: boolean,
  releaseStartTime: number,
  releaseStartValue: number
): number {
  if (noteOff) {
    // Release phase
    const releaseTime = currentTime - releaseStartTime
    if (releaseTime >= release) {
      return 0
    }
    
    const releaseProgress = releaseTime / release
    return applyEaseOutCubic(1 - releaseProgress, releaseCurve) * releaseStartValue
  } else {
    // Attack phase
    if (currentTime < attack) {
      const attackProgress = currentTime / attack
      return applyEaseInCubic(attackProgress, attackCurve)
    }
    
    // Decay phase
    if (currentTime < attack + decay) {
      const decayProgress = (currentTime - attack) / decay
      const decayValue = 1 - (1 - sustain) * applyEaseOutCubic(decayProgress, decayCurve)
      return decayValue
    }
    
    // Sustain phase
    return sustain
  }
}

// Apply easing curves with customizable shape
function applyEaseInCubic(progress: number, curve: number): number {
  if (curve === 0) {
    // Linear when curve is 0
    return progress
  } else if (curve > 0) {
    // More exponential (steep at end) when curve is positive
    return Math.pow(progress, 1 + curve * 2)
  } else {
    // More logarithmic (steep at start) when curve is negative
    return 1 - Math.pow(1 - progress, 1 + Math.abs(curve) * 2)
  }
}

function applyEaseOutCubic(progress: number, curve: number): number {
  if (curve === 0) {
    // Linear when curve is 0
    return progress
  } else if (curve > 0) {
    // More logarithmic (steep at start) when curve is positive
    return 1 - Math.pow(1 - progress, 1 + curve * 2)
  } else {
    // More exponential (steep at end) when curve is negative
    return Math.pow(progress, 1 + Math.abs(curve) * 2)
  }
}

// Draw the envelope curve on canvas
export function drawEnvelopeCurve(
  canvas: HTMLCanvasElement | null,
  attack: number,
  decay: number,
  sustain: number,
  release: number,
  attackCurve: number,
  decayCurve: number,
  releaseCurve: number,
  isPlaying: boolean,
  currentTime: number,
  envelopeValue: number,
  noteOff: boolean,
  totalDuration: number,
  showLabels = true,
  showPlayhead = true,
  showValueIndicator = true,
  envelopeCurveColor = "rgba(255, 255, 255, 0.8)",
  envelopeFillColor = "rgba(255, 255, 255, 0.1)",
  playheadColor = "rgba(255, 255, 255, 0.9)",
  stageLineColor = "rgba(255, 255, 255, 0.3)",
  labelColor = "rgba(255, 255, 255, 0.6)",
  valueIndicatorColor = "rgba(255, 255, 255, 1)"
): void {
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  const width = canvas.width
  const height = canvas.height
  
  // Clear canvas
  ctx.clearRect(0, 0, width, height)
  
  // Calculate time positions and pixel positions
  const attackTime = attack
  const decayTime = attackTime + decay
  const sustainTime = decayTime + (totalDuration - attack - decay - release)
  const releaseTime = sustainTime + release
  
  const attackX = (attackTime / totalDuration) * width
  const decayX = (decayTime / totalDuration) * width
  const sustainX = (sustainTime / totalDuration) * width
  
  // Draw stage dividers
  if (showLabels) {
    ctx.strokeStyle = stageLineColor
    ctx.setLineDash([4, 4])
    ctx.beginPath()
    
    // Attack line
    ctx.moveTo(attackX, 0)
    ctx.lineTo(attackX, height)
    
    // Decay line
    ctx.moveTo(decayX, 0)
    ctx.lineTo(decayX, height)
    
    // Sustain line
    ctx.moveTo(sustainX, 0)
    ctx.lineTo(sustainX, height)
    
    ctx.stroke()
    ctx.setLineDash([])
  }
  
  // Draw curve
  ctx.beginPath()
  ctx.moveTo(0, height)
  
  // Attack curve
  for (let x = 0; x <= attackX; x++) {
    const progress = x / attackX
    const y = height - applyEaseInCubic(progress, attackCurve) * height
    ctx.lineTo(x, y)
  }
  
  // Decay curve
  for (let x = attackX; x <= decayX; x++) {
    const progress = (x - attackX) / (decayX - attackX)
    const value = 1 - (1 - sustain) * applyEaseOutCubic(progress, decayCurve)
    const y = height - value * height
    ctx.lineTo(x, y)
  }
  
  // Sustain level
  ctx.lineTo(sustainX, height - sustain * height)
  
  // Release curve
  for (let x = sustainX; x <= width; x++) {
    const progress = (x - sustainX) / (width - sustainX)
    const value = sustain * (1 - applyEaseOutCubic(progress, releaseCurve))
    const y = height - value * height
    ctx.lineTo(x, y)
  }
  
  // Complete path for fill
  ctx.lineTo(width, height)
  ctx.lineTo(0, height)
  
  // Fill envelope area
  ctx.fillStyle = envelopeFillColor
  ctx.fill()
  
  // Draw envelope curve
  ctx.beginPath()
  ctx.moveTo(0, height)
  
  // Re-draw attack curve
  for (let x = 0; x <= attackX; x++) {
    const progress = x / attackX
    const y = height - applyEaseInCubic(progress, attackCurve) * height
    ctx.lineTo(x, y)
  }
  
  // Re-draw decay curve
  for (let x = attackX; x <= decayX; x++) {
    const progress = (x - attackX) / (decayX - attackX)
    const value = 1 - (1 - sustain) * applyEaseOutCubic(progress, decayCurve)
    const y = height - value * height
    ctx.lineTo(x, y)
  }
  
  // Re-draw sustain level
  ctx.lineTo(sustainX, height - sustain * height)
  
  // Re-draw release curve
  for (let x = sustainX; x <= width; x++) {
    const progress = (x - sustainX) / (width - sustainX)
    const value = sustain * (1 - applyEaseOutCubic(progress, releaseCurve))
    const y = height - value * height
    ctx.lineTo(x, y)
  }
  
  // Stroke envelope curve
  ctx.strokeStyle = envelopeCurveColor
  ctx.lineWidth = 2
  ctx.stroke()
  
  // Draw labels if enabled
  if (showLabels) {
    ctx.fillStyle = labelColor
    ctx.font = '12px sans-serif'
    ctx.textAlign = 'center'
    
    ctx.fillText('A', attackX / 2, height - 10)
    ctx.fillText('D', attackX + (decayX - attackX) / 2, height - 10)
    ctx.fillText('S', decayX + (sustainX - decayX) / 2, height - 10)
    ctx.fillText('R', sustainX + (width - sustainX) / 2, height - 10)
  }
  
  // Draw playhead and value indicator if playing
  if (isPlaying && showPlayhead) {
    const playheadX = (currentTime / totalDuration) * width
    
    // Draw playhead line
    ctx.strokeStyle = playheadColor
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(playheadX, 0)
    ctx.lineTo(playheadX, height)
    ctx.stroke()
    
    // Draw current value indicator
    if (showValueIndicator) {
      const valueY = height - envelopeValue * height
      
      ctx.fillStyle = valueIndicatorColor
      ctx.beginPath()
      ctx.arc(playheadX, valueY, 5, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}
