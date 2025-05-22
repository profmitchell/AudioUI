"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

interface NegativeSliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  color?: string
}

const NegativeSlider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, NegativeSliderProps>(
  ({ className, color = "rgba(255,255,255,", ...props }, ref) => {
    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-black/20 backdrop-blur-sm">
          <SliderPrimitive.Range className="absolute h-full bg-white/80" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className={`
            block w-7 h-7 rounded-full border-0 bg-transparent 
            shadow-[0_0_20px_10px_rgba(255,255,255,0.3),0_0_30px_15px_rgba(255,255,255,0.1)] 
            cursor-grab active:cursor-grabbing focus:outline-none focus:ring-0 focus:ring-offset-0 
            before:absolute before:top-[-10px] before:left-[-10px] before:right-[-10px] before:bottom-[-10px] before:content-[''] before:cursor-grab 
            after:absolute after:top-[-3.5px] after:left-[-3.5px] after:right-[-3.5px] after:bottom-[-3.5px] after:content-[''] after:rounded-full after:bg-black after:z-10
          `}
        />
      </SliderPrimitive.Root>
    )
  },
)

NegativeSlider.displayName = "NegativeSlider"

export { NegativeSlider } 