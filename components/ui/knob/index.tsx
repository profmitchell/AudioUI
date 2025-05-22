"use client"

import React, { useState, useRef, useEffect } from "react"
// Define styles inline instead of importing
const styles = {
  container: (size: number): React.CSSProperties => ({
    position: 'relative',
    width: `${size}px`,
    height: `${size}px`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'grab',
    userSelect: 'none',
    touchAction: 'none'
  }),

  knob: (size: number, angle: number, color: string, isDragging: boolean): React.CSSProperties => ({
    position: 'relative',
    width: `${size * 0.8}px`,
    height: `${size * 0.8}px`,
    borderRadius: '50%',
    backgroundColor: '#333',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: isDragging 
      ? 'inset 0 0 10px rgba(0, 0, 0, 0.8), 0 0 15px rgba(255, 255, 255, 0.2)' 
      : 'inset 0 0 10px rgba(0, 0, 0, 0.6), 0 0 5px rgba(0, 0, 0, 0.3)',
    transform: `rotate(${angle}deg)`,
    transition: isDragging ? 'none' : 'transform 0.1s ease-out',
    cursor: isDragging ? 'grabbing' : 'grab'
  }),

  indicator: (size: number, color: string): React.CSSProperties => ({
    position: 'absolute',
    top: '10%',
    left: '50%',
    width: '2px',
    height: '30%',
    backgroundColor: color,
    transform: 'translateX(-50%)',
    borderRadius: '1px',
    boxShadow: `0 0 5px ${color}`
  }),

  valueDisplay: {
    marginTop: '8px',
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center'
  } as React.CSSProperties
}

export interface KnobProps {
  value?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  size?: number
  showValue?: boolean
  bipolar?: boolean
  color?: string
  step?: number
}

export function Knob({
  value = 50,
  onChange,
  min = 0,
  max = 100,
  size = 80,
  showValue = true,
  bipolar = false,
  color = "#00AAFF",
  step = 1,
}: KnobProps) {
  // Ensure value prop is a valid number before setting initial state
  const safeInitialValue = (val: any): number => {
    const num = Number(val);
    return isNaN(num) ? 50 : Math.max(min, Math.min(max, num));
  };
  
  // Store the internal value as a normalized value - useful for drag operations
  const [internalValue, setInternalValue] = useState<number>(safeInitialValue(value));
  const [isDragging, setIsDragging] = useState(false);
  const knobRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef(0);
  const startValueRef = useRef(0);

  // Update internal value when prop changes
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(safeInitialValue(value));
    }
  }, [value, min, max]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (knobRef.current) {
      knobRef.current.setPointerCapture(e.pointerId)
      setIsDragging(true)
      startYRef.current = e.clientY
      startValueRef.current = internalValue
    }
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      // Calculate value change based on vertical movement
      const deltaY = startYRef.current - e.clientY
      const range = max - min
      const sensitivity = range / 200 // Adjust for sensitivity
      
      let newValue = startValueRef.current + deltaY * sensitivity
      
      // Snap to step
      newValue = Math.round(newValue / step) * step
      
      // Clamp value
      newValue = Math.max(min, Math.min(max, newValue))
      
      // Only update if value has changed
      if (newValue !== internalValue) {
        setInternalValue(newValue)
        if (onChange) onChange(newValue)
      }
    }
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (knobRef.current) {
      knobRef.current.releasePointerCapture(e.pointerId)
      setIsDragging(false)
    }
  }

  // Calculate rotation angle
  const getRotationAngle = () => {
    const range = max - min
    const valuePercent = (internalValue - min) / range
    const angle = valuePercent * 270 - 135 // -135° to 135°
    return angle
  }

  // Format value display
  const formattedValue = () => {
    // Ensure internalValue is a number before using toFixed
    const numValue = Number(internalValue);
    
    if (isNaN(numValue)) {
      return '0';
    }
    
    if (Number.isInteger(numValue)) {
      return numValue.toString();
    }
    
    return numValue.toFixed(1);
  }

  return (
    <div 
      style={styles.container(size)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      ref={knobRef}
    >
      <div 
        style={styles.knob(size, getRotationAngle(), color, isDragging)}
      >
        <div style={styles.indicator(size, color)}></div>
      </div>
      {showValue && (
        <div style={styles.valueDisplay}>
          {formattedValue()}
        </div>
      )}
    </div>
  )
} 