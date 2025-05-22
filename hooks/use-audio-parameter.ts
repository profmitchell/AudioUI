import { useEffect, useRef } from 'react';

/**
 * Hook to control an AudioParam with automated value changes
 * 
 * @param audioParam - The Web Audio API AudioParam to control
 * @param value - The target value to set
 * @param timeConstant - Time constant for exponential approach (default: 0.1)
 * @returns void
 */
export function useAudioParameter(
  audioParam: AudioParam | null,
  value: number,
  options: {
    immediate?: boolean;
    timeConstant?: number;
  } = {}
) {
  const { immediate = false, timeConstant = 0.1 } = options;
  const prevValueRef = useRef<number>(value);

  useEffect(() => {
    if (!audioParam) return;

    const now = audioParam.context.currentTime;
    
    // Set the value based on the mode
    if (immediate) {
      // Immediate mode - set value directly
      audioParam.setValueAtTime(value, now);
    } else {
      // Smooth transition mode
      if (prevValueRef.current !== value) {
        // Use exponentialRampToValueAtTime for smoother transitions
        // But avoid zero values which are invalid for exponential ramps
        if (value === 0 || prevValueRef.current === 0) {
          audioParam.linearRampToValueAtTime(value, now + timeConstant);
        } else {
          audioParam.exponentialRampToValueAtTime(value, now + timeConstant);
        }
      }
    }

    prevValueRef.current = value;
  }, [audioParam, value, immediate, timeConstant]);
}
