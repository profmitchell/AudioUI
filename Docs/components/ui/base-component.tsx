import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Base props that all AudioUI components should support
 */
export interface AudioUIBaseProps {
  /** Component label */
  label?: string;
  
  /** Additional CSS class names */
  className?: string;
  
  /** Current value */
  value?: number | number[];
  
  /** Handler for value changes */
  onChange?: (value: number | number[]) => void;
  
  /** Minimum value */
  min?: number;
  
  /** Maximum value */
  max?: number;
  
  /** Step increment */
  step?: number;
  
  /** Whether the component is disabled */
  disabled?: boolean;
  
  /** Component size */
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  
  /** Whether to show the current value */
  showValue?: boolean;
  
  /** Component ID (for accessibility and labels) */
  id?: string;
  
  /** Aria label for accessibility */
  'aria-label'?: string;
  
  /** Variant style */
  variant?: string;
}

/**
 * Base container styles
 */
export const baseStyles = cva(
  'relative transition-all inline-flex',
  {
    variants: {
      size: {
        xxs: 'w-4 h-4 text-xs',
        xs: 'w-6 h-6 text-xs',
        sm: 'w-8 h-8 text-sm',
        md: 'w-12 h-12 text-base',
        lg: 'w-16 h-16 text-lg',
        xl: 'w-20 h-20 text-xl',
        xxl: 'w-24 h-24 text-2xl',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
        false: 'opacity-100',
      },
      variant: {
        default: '',
        glass: 'backdrop-blur-sm',
        flat: 'shadow-none',
        inset: 'shadow-inner',
        outline: 'border border-white/20',
      },
    },
    defaultVariants: {
      size: 'md',
      disabled: false,
      variant: 'default',
    },
  }
);

/**
 * Higher-order component to add accessibility attributes to AudioUI components
 */
export function withAudioUIAccessibility<T extends AudioUIBaseProps>(
  Component: React.ComponentType<T>,
  displayName: string
) {
  const WrappedComponent = React.forwardRef<HTMLDivElement, T>((props, ref) => {
    const {
      value,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      id,
      'aria-label': ariaLabel,
      ...rest
    } = props;
    
    const normalizedValue = typeof value === 'number' ? value : 
      Array.isArray(value) && value.length > 0 ? value[0] : 0;
    
    // Accessibility attributes
    const accessibilityProps = {
      role: 'slider',
      'aria-valuemin': min,
      'aria-valuemax': max,
      'aria-valuenow': normalizedValue,
      'aria-disabled': disabled,
      'aria-label': ariaLabel || props.label || displayName,
      tabIndex: disabled ? -1 : 0,
      id: id || `audioui-${displayName.toLowerCase()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    
    return (
      <Component
        {...props as T}
        {...accessibilityProps}
        ref={ref}
      />
    );
  });
  
  WrappedComponent.displayName = `AudioUI${displayName}`;
  
  return WrappedComponent;
}

/**
 * Hook to handle keyboard accessibility for controls
 */
export function useKeyboardControl(
  onChange: ((value: number) => void) | undefined,
  value: number,
  min: number,
  max: number,
  step: number,
  disabled: boolean
) {
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled || !onChange) return;
      
      let newValue = value;
      
      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowRight':
          newValue = Math.min(max, value + step);
          break;
        case 'ArrowDown':
        case 'ArrowLeft':
          newValue = Math.max(min, value - step);
          break;
        case 'Home':
          newValue = min;
          break;
        case 'End':
          newValue = max;
          break;
        default:
          return;
      }
      
      if (newValue !== value) {
        e.preventDefault();
        onChange(newValue);
      }
    },
    [onChange, value, min, max, step, disabled]
  );
  
  return { handleKeyDown };
}

/**
 * Component to consistently display labels for AudioUI components
 */
export function AudioUILabel({ 
  label, 
  htmlFor, 
  className 
}: { 
  label?: string; 
  htmlFor?: string;
  className?: string;
}) {
  if (!label) return null;
  
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "block text-center text-audioui-label-color text-sm mt-2",
        className
      )}
    >
      {label}
    </label>
  );
}

/**
 * Component to consistently display values for AudioUI components
 */
export function AudioUIValue({
  value,
  min,
  max,
  showValue,
  className,
  valuePrefix = '',
  valueSuffix = '',
}: {
  value: number | number[];
  min?: number;
  max?: number;
  showValue?: boolean;
  className?: string;
  valuePrefix?: string;
  valueSuffix?: string;
}) {
  if (!showValue) return null;
  
  const displayValue = typeof value === 'number'
    ? value
    : Array.isArray(value) && value.length > 0
    ? value[0]
    : 0;
  
  // Format the display value
  const formattedValue = Number.isInteger(displayValue)
    ? displayValue.toString()
    : displayValue.toFixed(1);
  
  return (
    <div className={cn("text-center text-audioui-label-color text-sm mt-1", className)}>
      {valuePrefix}{formattedValue}{valueSuffix}
    </div>
  );
} 