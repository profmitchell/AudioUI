import React, { useState, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { 
  AudioUIBaseProps, 
  baseStyles, 
  useKeyboardControl, 
  withAudioUIAccessibility,
  AudioUILabel,
  AudioUIValue
} from '@/components/ui/base-component';

/**
 * Dial-specific props
 */
export interface DialProps extends AudioUIBaseProps, VariantProps<typeof dialStyles> {
  /**
   * Indicator style 
   */
  indicatorStyle?: 'line' | 'dot' | 'glow' | 'notch' | 'triangle';
  
  /**
   * Track color
   */
  trackColor?: string;
  
  /**
   * Indicator color
   */
  indicatorColor?: string;
  
  /**
   * Indicator size
   */
  indicatorSize?: number;
  
  /**
   * Rotation range in degrees
   */
  rotationRange?: number;
  
  /**
   * Start angle in degrees
   */
  startAngle?: number;
  
  /**
   * Track width
   */
  trackWidth?: number;
  
  /**
   * Value prefix for display
   */
  valuePrefix?: string;
  
  /**
   * Value suffix for display
   */
  valueSuffix?: string;
}

/**
 * Dial-specific styles
 */
const dialStyles = cva(
  'flex items-center justify-center overflow-hidden',
  {
    variants: {
      size: {
        xxs: 'w-4 h-4',
        xs: 'w-6 h-6',
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-20 h-20',
        xxl: 'w-24 h-24',
      },
      variant: {
        default: 'bg-black/20 rounded-full',
        metallic: 'bg-gradient-to-b from-zinc-700 to-zinc-900 rounded-full',
        flat: 'bg-zinc-800 rounded-full',
        glass: 'backdrop-blur-sm bg-white/5 rounded-full',
        custom: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

/**
 * Internal implementation of the Dial component
 */
const DialComponent = React.forwardRef<HTMLDivElement, DialProps>((props, ref) => {
  const {
    // Core properties
    value = 50,
    min = 0,
    max = 100,
    step = 1,
    onChange,
    disabled = false,
    
    // Visual properties
    variant = 'default',
    size = 'md',
    className,
    indicatorStyle = 'line',
    indicatorColor = 'var(--audioui-indicator-color)',
    indicatorSize = 2,
    trackColor = 'var(--audioui-track-color)',
    trackWidth = 2,
    rotationRange = 300,
    startAngle = -240,
    
    // Label and value properties
    label,
    showValue = true,
    valuePrefix = '',
    valueSuffix = '',
    
    // Rest of props including accessibility attributes
    ...rest
  } = props;
  
  // State for tracking drag operations
  const [isDragging, setIsDragging] = useState(false);
  const startPositionRef = useRef({ x: 0, y: 0 });
  const startValueRef = useRef(value);
  
  // Get keyboard handler
  const { handleKeyDown } = useKeyboardControl(
    onChange,
    value as number,
    min,
    max,
    step,
    disabled
  );
  
  // Calculate rotation angle based on value
  const getRotationAngle = () => {
    const valuePercent = ((value as number) - min) / (max - min);
    return startAngle + (valuePercent * rotationRange);
  };
  
  // Handle mouse/touch events
  const handlePointerDown = (e: React.PointerEvent) => {
    if (disabled) return;
    
    // Capture pointer to ensure we get events even if pointer leaves component
    if ((e.target as HTMLElement).setPointerCapture) {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    }
    
    startPositionRef.current = { x: e.clientX, y: e.clientY };
    startValueRef.current = value as number;
    setIsDragging(true);
  };
  
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || disabled) return;
    
    // Calculate movement and adjust value
    const deltaY = startPositionRef.current.y - e.clientY;
    const deltaX = e.clientX - startPositionRef.current.x;
    
    // Use y movement for up/down control, optional x movement for horizontal
    const delta = deltaY + deltaX * 0.5;
    
    // Scale factor based on size
    const sizeFactor = size === 'sm' ? 0.5 : size === 'lg' ? 2 : 1;
    
    // Calculate new value based on drag distance
    const sensitivity = 0.5 * sizeFactor;
    const valueRange = max - min;
    const newValue = startValueRef.current + delta * sensitivity * (valueRange / 100);
    
    // Clamp and round to step
    const clampedValue = Math.max(min, Math.min(max, newValue));
    const steppedValue = Math.round(clampedValue / step) * step;
    
    if (steppedValue !== value && onChange) {
      onChange(steppedValue);
    }
  };
  
  const handlePointerUp = () => {
    setIsDragging(false);
  };
  
  // Render indicator based on style
  const renderIndicator = () => {
    const angle = getRotationAngle();
    
    switch (indicatorStyle) {
      case 'line':
        return (
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 origin-center" 
            style={{ 
              height: `${indicatorSize}px`, 
              width: '45%', 
              backgroundColor: indicatorColor,
              transformOrigin: 'left center',
              transform: `rotate(${angle}deg) translateY(-50%)`,
              borderRadius: '9999px',
            }}
          />
        );
      case 'dot':
        return (
          <div 
            className="absolute rounded-full"
            style={{
              width: `${indicatorSize * 2}px`,
              height: `${indicatorSize * 2}px`,
              backgroundColor: indicatorColor,
              top: '50%',
              left: '50%',
              transform: `rotate(${angle}deg) translateX(${size === 'sm' ? '30%' : size === 'lg' ? '40%' : '35%'}) translateY(-50%)`,
              transformOrigin: 'center center',
            }}
          />
        );
      case 'glow':
        return (
          <div 
            className="absolute rounded-full"
            style={{
              width: `${indicatorSize * 3}px`,
              height: `${indicatorSize * 3}px`,
              backgroundColor: indicatorColor,
              boxShadow: `0 0 ${indicatorSize * 2}px ${indicatorColor}`,
              top: '50%',
              left: '50%',
              transform: `rotate(${angle}deg) translateX(${size === 'sm' ? '30%' : size === 'lg' ? '40%' : '35%'}) translateY(-50%)`,
              transformOrigin: 'center center',
            }}
          />
        );
      default:
        return (
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 origin-center" 
            style={{ 
              height: `${indicatorSize}px`, 
              width: '45%', 
              backgroundColor: indicatorColor,
              transformOrigin: 'left center',
              transform: `rotate(${angle}deg) translateY(-50%)`,
              borderRadius: '9999px',
            }}
          />
        );
    }
  };
  
  return (
    <div 
      className="flex flex-col items-center"
      ref={ref}
      {...rest}
    >
      <div 
        className={cn(
          baseStyles({ size, disabled, variant }),
          dialStyles({ size, variant }),
          className,
          isDragging && 'cursor-ns-resize',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
      >
        {/* Track */}
        {trackWidth > 0 && (
          <div 
            className="absolute rounded-full"
            style={{
              width: '90%',
              height: '90%',
              border: `${trackWidth}px solid ${trackColor}`,
            }}
          />
        )}
        
        {/* Indicator */}
        {renderIndicator()}
      </div>
      
      {/* Label */}
      <AudioUILabel label={label} htmlFor={rest.id} />
      
      {/* Value display */}
      <AudioUIValue 
        value={value} 
        showValue={showValue} 
        valuePrefix={valuePrefix}
        valueSuffix={valueSuffix}
      />
    </div>
  );
});

DialComponent.displayName = 'Dial';

/**
 * Dial component with accessibility features
 * 
 * A rotary control that allows users to adjust values by rotation.
 */
export const Dial = withAudioUIAccessibility(DialComponent, 'Dial'); 