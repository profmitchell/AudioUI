"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

type SliderVariant = "neumorphic-inset" | "neumorphic-outset" | "glass"

interface CustomSliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  variant?: SliderVariant
  showValue?: boolean
  valuePrefix?: string
  valueSuffix?: string
  vertical?: boolean
  bipolar?: boolean
  shadowIntensity?: "light" | "medium" | "strong"
  effectTightness?: "tight" | "medium" | "loose"
  borderRadius?: "small" | "medium" | "large" | "pill"
  trackColor?: string
  thumbColor?: string
}

const CustomSlider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, CustomSliderProps>(
  (
    {
      className,
      variant = "neumorphic-inset",
      showValue = false,
      valuePrefix = "",
      valueSuffix = "",
      vertical = false,
      bipolar = false,
      shadowIntensity = "medium",
      effectTightness = "medium",
      borderRadius = "medium",
      trackColor,
      thumbColor,
      ...props
    },
    ref,
  ) => {
    const [displayValue, setDisplayValue] = React.useState(props.defaultValue || props.value || [0])

    React.useEffect(() => {
      if (props.value) {
        setDisplayValue(props.value)
      }
    }, [props.value])

    const handleValueChange = (value: number[]) => {
      setDisplayValue(value)
      if (props.onValueChange) {
        props.onValueChange(value)
      }
    }

    // Calculate the display value for bipolar mode
    const getBipolarDisplayValue = (value: number) => {
      if (bipolar) {
        // Convert from 0-100 range to -100 to 100 range
        const min = props.min || 0
        const max = props.max || 100
        const range = max - min
        const midpoint = min + range / 2
        return Math.round((value - midpoint) * 2)
      }
      return value
    }

    // Get shadow values based on intensity
    const getShadowValues = () => {
      const intensityValues = {
        light: {
          inset: "inset_1px_1px_2px_rgba(0,0,0,0.3),inset_-1px_-1px_2px_rgba(255,255,255,0.03)",
          outset: "1px_1px_2px_rgba(0,0,0,0.3),-1px_-1px_2px_rgba(255,255,255,0.03)",
        },
        medium: {
          inset: "inset_2px_2px_4px_rgba(0,0,0,0.4),inset_-2px_-2px_4px_rgba(255,255,255,0.05)",
          outset: "2px_2px_4px_rgba(0,0,0,0.4),-2px_-2px_4px_rgba(255,255,255,0.05)",
        },
        strong: {
          inset: "inset_3px_3px_6px_rgba(0,0,0,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.07)",
          outset: "3px_3px_6px_rgba(0,0,0,0.5),-3px_-3px_6px_rgba(255,255,255,0.07)",
        },
      }

      return variant === "neumorphic-inset"
        ? intensityValues[shadowIntensity].inset
        : intensityValues[shadowIntensity].outset
    }

    // Get border radius based on size
    const getBorderRadiusValue = () => {
      const radiusValues = {
        small: "rounded-md",
        medium: "rounded-lg",
        large: "rounded-xl",
        pill: "rounded-full",
      }

      return radiusValues[borderRadius]
    }

    // Get track width/height based on tightness
    const getTrackSize = () => {
      const sizeValues = {
        tight: vertical ? "w-1" : "h-1",
        medium: vertical ? "w-2" : "h-2",
        loose: vertical ? "w-3" : "h-3",
      }

      return sizeValues[effectTightness]
    }

    const getTrackClassName = () => {
      const baseClass = vertical
        ? `relative h-full ${getTrackSize()} grow overflow-hidden ${getBorderRadiusValue()}`
        : `relative ${getTrackSize()} w-full grow overflow-hidden ${getBorderRadiusValue()}`

      const variantClasses = {
        "neumorphic-inset": `bg-zinc-800/80 shadow-[${getShadowValues()}]`,
        "neumorphic-outset": `bg-zinc-800/80 shadow-[${getShadowValues()}]`,
        "glass": `bg-zinc-800/50 backdrop-blur-sm border border-white/10`,
      }

      return cn(baseClass, variantClasses[variant])
    }

    const getTrackStyle = () => {
      return trackColor ? { backgroundColor: trackColor } : undefined
    }

    const getRangeClass = () => {
      const baseClass = vertical ? "absolute bottom-0 w-full" : "absolute left-0 h-full"
      return cn(baseClass, "bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.3)]")
    }

    const getThumbClassName = () => {
      const sizeValues = {
        tight: "h-3 w-3",
        medium: "h-4 w-4",
        loose: "h-5 w-5",
      }

      const baseClass = `block cursor-pointer bg-white shadow-[0_0_10px_rgba(255,255,255,0.2)] ${sizeValues[effectTightness]}`

      const variantClasses = {
        "neumorphic-inset": `rounded-full shadow-[${getShadowValues()}]`,
        "neumorphic-outset": `rounded-full shadow-[${getShadowValues()}]`,
        "glass": `rounded-full border border-white/20 backdrop-blur-sm`,
      }

      return cn(baseClass, variantClasses[variant])
    }

    const getThumbStyle = () => {
      return thumbColor ? { backgroundColor: thumbColor } : undefined
    }

    const getValueClass = () => {
      return cn("text-sm font-medium text-white/80")
    }

    // Calculate the range position for bipolar sliders
    const getRangeStyle = () => {
      if (!bipolar) return {}

      const value = Array.isArray(displayValue) ? displayValue[0] : displayValue
      const min = props.min || 0
      const max = props.max || 100
      const range = max - min
      const midpoint = min + range / 2

      if (vertical) {
        const height = `${Math.abs((value - midpoint) / range) * 100}%`
        return value >= midpoint ? { height, bottom: "50%" } : { height, top: "50%" }
      } else {
        const width = `${Math.abs((value - midpoint) / range) * 100}%`
        return value >= midpoint ? { width, left: "50%" } : { width, right: "50%" }
      }
    }

    return (
      <div className={cn("space-y-2", vertical ? "h-40 flex items-center" : "")}>
        <div className={cn("relative", vertical ? "h-full" : "w-full")}>
          {bipolar && (
            <div
              className={cn(
                "absolute z-10 bg-white/20",
                vertical ? "w-full h-[1px] top-1/2 -translate-y-1/2" : "h-full w-[1px] left-1/2 -translate-x-1/2",
              )}
            />
          )}
          <SliderPrimitive.Root
            ref={ref}
            className={cn(
              "relative flex touch-none select-none items-center",
              vertical ? "flex-col h-full" : "w-full",
              className,
            )}
            orientation={vertical ? "vertical" : "horizontal"}
            onValueChange={handleValueChange}
            {...props}
          >
            <SliderPrimitive.Track 
              className={getTrackClassName()} 
              style={getTrackStyle()}
            >
              {bipolar ? (
                <div
                  className={cn(
                    "absolute bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.3)]",
                    vertical ? "w-full" : "h-full",
                  )}
                  style={getRangeStyle()}
                />
              ) : (
                <SliderPrimitive.Range className={getRangeClass()} />
              )}
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb 
              className={getThumbClassName()} 
              style={getThumbStyle()}
            />
          </SliderPrimitive.Root>
        </div>

        {showValue && (
          <div className={getValueClass()}>
            {valuePrefix}
            {Array.isArray(displayValue)
              ? bipolar
                ? getBipolarDisplayValue(displayValue[0])
                : displayValue[0]
              : bipolar
                ? getBipolarDisplayValue(displayValue as number)
                : displayValue}
            {valueSuffix}
          </div>
        )}
      </div>
    )
  },
)

CustomSlider.displayName = "CustomSlider"

export { CustomSlider }
