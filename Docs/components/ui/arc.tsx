"use client"

import * as React from "react"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs))
}

const START_ANGLE = -240
const ROTATION_RANGE = 300

const angleFromValue = (norm: number, bipolar: boolean, startAngle = START_ANGLE, rotationRange = ROTATION_RANGE) => {
  if (bipolar) {
    // For bipolar, 0.5 is the center (0 value)
    return startAngle + (norm * 0.5 + 0.5) * rotationRange
  }
  return startAngle + norm * rotationRange
}

const arcVariants = {
  variant: {
    default: "bg-black/40 shadow-[0_0_15px_rgba(255,255,255,0.1)]",
    minimal: "bg-transparent",
    glass: "bg-black/30 backdrop-blur-md border border-white/10",
    inset: "bg-black/50 border border-white/5 shadow-inner",
    flat: "bg-zinc-900 border border-zinc-800",
    custom: "", // Empty variant for fully custom styling
  },
  size: {
    xs: "w-16 h-16",
    sm: "w-20 h-20",
    md: "w-28 h-28",
    lg: "w-36 h-36",
    xl: "w-44 h-44",
    xxl: "w-52 h-52",
  },
  indicatorStyle: {
    line: "",
    glow: "",
    dotted: "",
    gradient: "",
    custom: "",
  },
  centerDisplayStyle: {
    default: "bg-black/30 backdrop-blur-sm border border-white/10",
    none: "hidden",
    minimal: "bg-transparent",
    glass: "bg-black/20 backdrop-blur-md border border-white/5",
    inset: "bg-black/40 border border-white/5 shadow-inner",
    custom: "",
  },
}

export interface ArcProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  // Core props
  variant?: keyof typeof arcVariants.variant
  size?: keyof typeof arcVariants.size
  indicatorStyle?: keyof typeof arcVariants.indicatorStyle
  value?: number
  min?: number
  max?: number
  defaultValue?: number
  step?: number
  onChange?: (value: number) => void
  onValueCommit?: (value: number) => void
  showValue?: boolean
  valueFormat?: (v: number) => string
  label?: string
  trackColor?: string
  valueColor?: string
  glowColor?: string
  trackWidth?: number
  disabled?: boolean
  bipolar?: boolean
  
  // Enhanced customization
  startAngle?: number
  rotationRange?: number
  trackGradient?: string[]
  valueGradient?: string[]
  gradientAngle?: number
  tickMarks?: number
  tickLength?: number
  tickWidth?: number
  tickColor?: string
  showTickLabels?: boolean
  tickLabelFrequency?: number
  tickLabelColor?: string
  tickLabelFormatter?: (v: number) => string
  centerDisplayStyle?: keyof typeof arcVariants.centerDisplayStyle
  centerDisplaySize?: number
  centerDisplayColor?: string
  centerDisplayBorderColor?: string
  centerDisplayBorderWidth?: number
  valueFontSize?: string
  labelFontSize?: string
  valueColor?: string
  labelColor?: string
  backgroundColor?: string
  borderColor?: string
  borderWidth?: number
  shadowColor?: string
  shadowSize?: number
  useCustomColors?: boolean
}

export const Arc = React.forwardRef<HTMLDivElement, ArcProps>(
  (
    {
      // Core props
      className,
      variant = "default",
      size = "md",
      indicatorStyle = "line",
      trackColor = "rgba(255,255,255,0.1)",
      valueColor = "white",
      glowColor = "rgba(255,255,255,0.2)",
      trackWidth = 4,
      value,
      min = 0,
      max = 100,
      step = 1,
      defaultValue,
      onChange,
      onValueCommit,
      showValue = false,
      valueFormat = (v) => v.toString(),
      label,
      disabled = false,
      bipolar = false,
      
      // Enhanced customization
      startAngle = START_ANGLE,
      rotationRange = ROTATION_RANGE,
      trackGradient,
      valueGradient,
      gradientAngle = 0,
      tickMarks = 0,
      tickLength = 5,
      tickWidth = 1,
      tickColor = "rgba(255,255,255,0.3)",
      showTickLabels = false,
      tickLabelFrequency = 2,
      tickLabelColor = "rgba(255,255,255,0.6)",
      tickLabelFormatter = (v) => v.toString(),
      centerDisplayStyle = "default",
      centerDisplaySize = 30,
      centerDisplayColor,
      centerDisplayBorderColor,
      centerDisplayBorderWidth,
      valueFontSize = "0.875rem",
      labelFontSize = "0.875rem",
      backgroundColor,
      borderColor,
      borderWidth,
      shadowColor,
      shadowSize,
      useCustomColors = false,
      
      ...props
    },
    ref,
  ) => {
    // If bipolar, adjust min/max to be centered around 0
    const effectiveMin = bipolar ? -127 : min
    const effectiveMax = bipolar ? 127 : max
    const effectiveDefault = bipolar ? 0 : (defaultValue ?? min)

    const [local, setLocal] = React.useState(value !== undefined ? value : effectiveDefault)

    React.useEffect(() => {
      if (value !== undefined) setLocal(value)
    }, [value])

    // Calculate normalized value (0-1) for rendering
    const norm = React.useMemo(() => {
      const range = effectiveMax - effectiveMin
      if (bipolar) {
        // For bipolar, map -127 to 127 to -1 to 1
        return ((local - effectiveMin) / range) * 2 - 1
      }
      return (local - effectiveMin) / (range || 1)
    }, [local, effectiveMin, effectiveMax, bipolar])

    const variantStyles = arcVariants.variant[variant]
    const sizeStyles = arcVariants.size[size]
    const centerDisplayStyles = arcVariants.centerDisplayStyle[centerDisplayStyle]

    const radius = 45
    const toXY = (deg: number) => {
      const rad = (deg * Math.PI) / 180
      return [50 + radius * Math.cos(rad), 50 + radius * Math.sin(rad)]
    }

    // For bipolar mode, we need to calculate the center angle
    const centerAngle = bipolar ? startAngle + rotationRange / 2 : 0
    const [sx, sy] = toXY(startAngle)
    const [ex, ey] = toXY(startAngle + rotationRange)

    // For bipolar, we need to calculate the angle differently
    let valueAngle, arcStart, arcEnd, isLarge

    const dragRef = React.useRef<number | null>(null)
    const valRef = React.useRef<number>(local)

    const beginDrag = (clientY: number) => {
      if (disabled) return
      dragRef.current = clientY
      valRef.current = local
    }

    const updateDrag = (clientY: number) => {
      if (dragRef.current == null || disabled) return
      const dy = dragRef.current - clientY
      const delta = (dy / 200) * (effectiveMax - effectiveMin)
      let next = Math.round((valRef.current + delta) / step) * step
      next = Math.max(effectiveMin, Math.min(effectiveMax, next))
      setLocal(next)
      onChange?.(next)
    }

    const endDrag = () => {
      dragRef.current = null
      onValueCommit?.(local)
    }

    const onMouseDown = (e: React.MouseEvent) => {
      e.preventDefault()
      beginDrag(e.clientY)
      window.addEventListener("mousemove", onMouseMove)
      window.addEventListener("mouseup", onMouseUp)
    }

    const onMouseMove = (e: MouseEvent) => updateDrag(e.clientY)

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
      endDrag()
    }

    const onTouchStart = (e: React.TouchEvent) => {
      const y = e.touches[0]?.clientY
      if (y == null) return
      beginDrag(y)
      window.addEventListener("touchmove", onTouchMove, { passive: false })
      window.addEventListener("touchend", onTouchEnd)
    }

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      updateDrag(e.touches[0]?.clientY ?? 0)
    }

    const onTouchEnd = () => {
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", onTouchEnd)
      endDrag()
    }
    
    // Generate tick marks if specified
    const generateTicks = () => {
      if (tickMarks <= 0) return null;
      
      const ticks = [];
      const tickStep = rotationRange / tickMarks;
      const valueStep = (effectiveMax - effectiveMin) / tickMarks;
      
      for (let i = 0; i <= tickMarks; i++) {
        const tickAngle = startAngle + i * tickStep;
        const [tx1, ty1] = toXY(tickAngle);
        const innerRadius = radius - tickLength;
        const rad = (tickAngle * Math.PI) / 180;
        const tx2 = 50 + innerRadius * Math.cos(rad);
        const ty2 = 50 + innerRadius * Math.sin(rad);
        
        // Only show labels for certain ticks
        const shouldShowLabel = showTickLabels && i % tickLabelFrequency === 0;
        const tickValue = effectiveMin + i * valueStep;
        const labelRadius = innerRadius - 8;  // Position labels a bit inward
        const lx = 50 + labelRadius * Math.cos(rad);
        const ly = 50 + labelRadius * Math.sin(rad);
        
        ticks.push(
          <React.Fragment key={i}>
            <line
              x1={tx1}
              y1={ty1}
              x2={tx2}
              y2={ty2}
              stroke={useCustomColors ? tickColor : "currentColor"}
              strokeWidth={tickWidth}
              className={!useCustomColors ? "text-white/30" : ""}
            />
            {shouldShowLabel && (
              <text
                x={lx}
                y={ly}
                fontSize="8"
                fill={useCustomColors ? tickLabelColor : "currentColor"}
                textAnchor="middle"
                dominantBaseline="middle"
                className={!useCustomColors ? "text-white/60" : ""}
              >
                {tickLabelFormatter(tickValue)}
              </text>
            )}
          </React.Fragment>
        );
      }
      
      return ticks;
    };
    
    // Create gradient definitions if specified
    const createGradientDefinitions = () => {
      return (
        <>
          {trackGradient && trackGradient.length > 1 && (
            <linearGradient id="trackGradient" gradientTransform={`rotate(${gradientAngle})`}>
              {trackGradient.map((color, index) => (
                <stop
                  key={index}
                  offset={`${(index / (trackGradient.length - 1)) * 100}%`}
                  stopColor={color}
                />
              ))}
            </linearGradient>
          )}
          {valueGradient && valueGradient.length > 1 && (
            <linearGradient id="valueGradient" gradientTransform={`rotate(${gradientAngle})`}>
              {valueGradient.map((color, index) => (
                <stop
                  key={index}
                  offset={`${(index / (valueGradient.length - 1)) * 100}%`}
                  stopColor={color}
                />
              ))}
            </linearGradient>
          )}
        </>
      );
    };

    // Determine the effective track and value colors, accounting for gradients
    const effectiveTrackColor = trackGradient && trackGradient.length > 1
      ? "url(#trackGradient)"
      : useCustomColors && trackColor ? trackColor : trackColor;
      
    const effectiveValueColor = valueGradient && valueGradient.length > 1
      ? "url(#valueGradient)"
      : indicatorStyle === "glow"
        ? useCustomColors && glowColor ? glowColor : glowColor
        : useCustomColors && valueColor ? valueColor : valueColor;

    // Custom styles for variant overrides
    const customStyles = variant === 'custom' ? {
      backgroundColor: useCustomColors && backgroundColor ? backgroundColor : undefined,
      borderColor: useCustomColors && borderColor ? borderColor : undefined,
      borderWidth: borderWidth,
      boxShadow: useCustomColors && shadowColor && shadowSize ? `0 0 ${shadowSize}px ${shadowColor}` : undefined,
    } : {};
    
    // Custom styles for center display
    const centerCustomStyles = centerDisplayStyle === 'custom' ? {
      backgroundColor: useCustomColors && centerDisplayColor ? centerDisplayColor : undefined,
      borderColor: useCustomColors && centerDisplayBorderColor ? centerDisplayBorderColor : undefined,
      borderWidth: centerDisplayBorderWidth,
    } : {};

    if (bipolar) {
      // Center point (0 value)
      const [centerX, centerY] = toXY(centerAngle)

      if (norm >= 0) {
        // Positive values: draw arc from center to value
        arcStart = centerAngle
        valueAngle = angleFromValue(norm, bipolar, startAngle, rotationRange)
        arcEnd = valueAngle
        isLarge = valueAngle - centerAngle > 180 ? 1 : 0

        // For rendering
        const [fx, fy] = toXY(valueAngle)
        return (
          <div className="flex flex-col items-center gap-2" ref={ref} {...props}>
            {label && (
              <span 
                className="text-sm font-medium text-white/80"
                style={{
                  fontSize: labelFontSize,
                  color: useCustomColors && labelColor ? labelColor : undefined
                }}
              >
                {label}
              </span>
            )}

            <div
              className={cn(
                "relative select-none rounded-full transition-all duration-200",
                variantStyles,
                sizeStyles,
                disabled ? "opacity-50 cursor-not-allowed" : "cursor-ns-resize",
                className,
              )}
              style={customStyles}
              role="slider"
              aria-valuemin={effectiveMin}
              aria-valuemax={effectiveMax}
              aria-valuenow={local}
              aria-label={label}
              aria-disabled={disabled}
              onMouseDown={onMouseDown}
              onTouchStart={onTouchStart}
            >
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <defs>
                  {createGradientDefinitions()}
                </defs>
                
                {/* Tick marks */}
                {generateTicks()}
                
                {/* Full track */}
                <path
                  d={`M ${sx} ${sy} A ${radius} ${radius} 0 1 1 ${ex} ${ey}`}
                  stroke={effectiveTrackColor}
                  strokeWidth={trackWidth}
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Center marker */}
                <circle cx={centerX} cy={centerY} r={trackWidth / 2} fill={effectiveTrackColor} />

                {/* Value arc - positive */}
                {norm > 0 && (
                  <path
                    d={`M ${centerX} ${centerY} A ${radius} ${radius} 0 ${isLarge} 1 ${fx} ${fy}`}
                    stroke={effectiveValueColor}
                    strokeWidth={trackWidth}
                    strokeLinecap="round"
                    fill="none"
                    className={indicatorStyle === "glow" ? "filter drop-shadow-md" : ""}
                  />
                )}

                {/* Value arc - negative */}
                {norm < 0 && (
                  <path
                    d={`M ${centerX} ${centerY} A ${radius} ${radius} 0 ${isLarge} 0 ${fx} ${fy}`}
                    stroke={effectiveValueColor}
                    strokeWidth={trackWidth}
                    strokeLinecap="round"
                    fill="none"
                    className={indicatorStyle === "glow" ? "filter drop-shadow-md" : ""}
                  />
                )}
              </svg>

              <div 
                className={cn(
                  "absolute rounded-full flex items-center justify-center",
                  centerDisplayStyles
                )}
                style={{
                  inset: `${(100 - centerDisplaySize) / 2}%`,
                  ...centerCustomStyles
                }}
              >
                {showValue && (
                  <span 
                    className="text-sm font-medium text-white/80"
                    style={{
                      fontSize: valueFontSize,
                      color: useCustomColors && valueColor ? valueColor : undefined
                    }}
                  >
                    {valueFormat(local)}
                  </span>
                )}
              </div>
            </div>
          </div>
        )
      } else {
        // Negative values: draw arc from value to center
        valueAngle = angleFromValue(norm, bipolar, startAngle, rotationRange)
        arcStart = valueAngle
        arcEnd = centerAngle
        isLarge = centerAngle - valueAngle > 180 ? 1 : 0
      }

      const [fx, fy] = toXY(valueAngle)

      return (
        <div className="flex flex-col items-center gap-2" ref={ref} {...props}>
          {label && (
            <span 
              className="text-sm font-medium text-white/80"
              style={{
                fontSize: labelFontSize,
                color: useCustomColors && labelColor ? labelColor : undefined
              }}
            >
              {label}
            </span>
          )}

          <div
            className={cn(
              "relative select-none rounded-full transition-all duration-200",
              variantStyles,
              sizeStyles,
              disabled ? "opacity-50 cursor-not-allowed" : "cursor-ns-resize",
              className,
            )}
            style={customStyles}
            role="slider"
            aria-valuemin={effectiveMin}
            aria-valuemax={effectiveMax}
            aria-valuenow={local}
            aria-label={label}
            aria-disabled={disabled}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
          >
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <defs>
                {createGradientDefinitions()}
              </defs>
              
              {/* Tick marks */}
              {generateTicks()}
              
              {/* Full track */}
              <path
                d={`M ${sx} ${sy} A ${radius} ${radius} 0 1 1 ${ex} ${ey}`}
                stroke={effectiveTrackColor}
                strokeWidth={trackWidth}
                strokeLinecap="round"
                fill="none"
              />

              {/* Center marker */}
              <circle cx={centerX} cy={centerY} r={trackWidth / 2} fill={effectiveTrackColor} />

              {/* Value arc */}
              {norm !== 0 && (
                <path
                  d={
                    norm > 0
                      ? `M ${centerX} ${centerY} A ${radius} ${radius} 0 ${isLarge} 1 ${fx} ${fy}`
                      : `M ${fx} ${fy} A ${radius} ${radius} 0 ${isLarge} 1 ${centerX} ${centerY}`
                  }
                  stroke={effectiveValueColor}
                  strokeWidth={trackWidth}
                  strokeLinecap="round"
                  fill="none"
                  className={indicatorStyle === "glow" ? "filter drop-shadow-md" : ""}
                />
              )}
            </svg>

            <div 
              className={cn(
                "absolute rounded-full flex items-center justify-center",
                centerDisplayStyles
              )}
              style={{
                inset: `${(100 - centerDisplaySize) / 2}%`,
                ...centerCustomStyles
              }}
            >
              {showValue && (
                <span 
                  className="text-sm font-medium text-white/80"
                  style={{
                    fontSize: valueFontSize,
                    color: useCustomColors && valueColor ? valueColor : undefined
                  }}
                >
                  {valueFormat(local)}
                </span>
              )}
            </div>
          </div>
        </div>
      )
    }

    // Non-bipolar mode (original implementation)
    const [fx, fy] = toXY(angleFromValue(norm, false, startAngle, rotationRange))
    const bgArcLarge = rotationRange > 180 ? 1 : 0
    const valLarge = norm * rotationRange > 180 ? 1 : 0

    return (
      <div className="flex flex-col items-center gap-2" ref={ref} {...props}>
        {label && (
          <span 
            className="text-sm font-medium text-white/80"
            style={{
              fontSize: labelFontSize,
              color: useCustomColors && labelColor ? labelColor : undefined
            }}
          >
            {label}
          </span>
        )}

        <div
          className={cn(
            "relative select-none rounded-full transition-all duration-200",
            variantStyles,
            sizeStyles,
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-ns-resize",
            className,
          )}
          style={customStyles}
          role="slider"
          aria-valuemin={effectiveMin}
          aria-valuemax={effectiveMax}
          aria-valuenow={local}
          aria-label={label}
          aria-disabled={disabled}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
        >
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <defs>
              {createGradientDefinitions()}
            </defs>
            
            {/* Tick marks */}
            {generateTicks()}
            
            <path
              d={`M ${sx} ${sy} A ${radius} ${radius} 0 ${bgArcLarge} 1 ${ex} ${ey}`}
              stroke={effectiveTrackColor}
              strokeWidth={trackWidth}
              strokeLinecap="round"
              fill="none"
            />
            {norm > 0 && (
              <path
                d={`M ${sx} ${sy} A ${radius} ${radius} 0 ${valLarge} 1 ${fx} ${fy}`}
                stroke={effectiveValueColor}
                strokeWidth={trackWidth}
                strokeLinecap="round"
                fill="none"
                className={indicatorStyle === "glow" ? "filter drop-shadow-md" : ""}
              />
            )}
          </svg>

          <div 
            className={cn(
              "absolute rounded-full flex items-center justify-center",
              centerDisplayStyles
            )}
            style={{
              inset: `${(100 - centerDisplaySize) / 2}%`,
              ...centerCustomStyles
            }}
          >
            {showValue && (
              <span 
                className="text-sm font-medium text-white/80"
                style={{
                  fontSize: valueFontSize,
                  color: useCustomColors && valueColor ? valueColor : undefined
                }}
              >
                {valueFormat(local)}
              </span>
            )}
          </div>
        </div>
      </div>
    )
  },
)

Arc.displayName = "Arc"
