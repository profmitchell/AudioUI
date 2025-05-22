export const START_ANGLE = -240 // 8 o'clock → 12 o'clock at 50 %
export const ROTATION_RANGE = 300 // 60° gap at the top

// Helper so every place uses the exact same formula
export const angleFromValue = (norm: number) => START_ANGLE + norm * ROTATION_RANGE

// Helper for custom angle calculations
export const customAngleFromValue = (norm: number, startAngle: number, rotationRange: number) => 
  startAngle + norm * rotationRange

// Helper to convert polar coordinates to cartesian
export const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = (angleInDegrees * Math.PI) / 180.0
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  }
}

// Helper to describe an arc path for SVG
export const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
  const start = polarToCartesian(x, y, radius, endAngle)
  const end = polarToCartesian(x, y, radius, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"
  return [
    "M", start.x, start.y, 
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ")
}
