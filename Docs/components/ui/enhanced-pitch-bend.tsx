"use client"
import { PitchBend, type PitchBendProps } from "@/components/ui/pitch-bend"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

// Define variants for the pitch bend component using class-variance-authority
const pitchBendVariants = cva(
  // Base styles that apply to all variants
  "border shadow-[0_0_15px_rgba(255,255,255,0.1)]",
  {
    variants: {
      // Visual theme variants
      variant: {
        default: "border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.2)] bg-black/40",
        subtle: "border-white/10 shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-black/30",
        neon: "border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.3)] bg-black/50",
        purple: "border-purple-500/40 shadow-[0_0_25px_rgba(168,85,247,0.3)] bg-black/50",
        amber: "border-amber-500/40 shadow-[0_0_25px_rgba(245,158,11,0.3)] bg-black/50",
      },
      // Size variants
      size: {
        sm: "h-32 w-8",
        default: "h-40 w-10",
        lg: "h-48 w-12",
      },
      // Glow intensity variants
      glowIntensity: {
        none: "",
        low: "",
        medium: "",
        high: "",
      },
    },
    // Default variants
    defaultVariants: {
      variant: "default",
      size: "default",
      glowIntensity: "medium",
    },
  },
)

// Define the handle variants
const handleVariants = cva(
  // Base styles for the handle
  "absolute left-0 rounded-full backdrop-blur-lg border transition-colors cursor-ns-resize select-none",
  {
    variants: {
      // Handle variants matching the main component variants
      variant: {
        default: "bg-white/20 border-white/20 hover:bg-white/30 active:bg-white/40",
        subtle: "bg-white/15 border-white/15 hover:bg-white/25 active:bg-white/35",
        neon: "bg-cyan-500/20 border-cyan-500/30 hover:bg-cyan-500/30 active:bg-cyan-500/40",
        purple: "bg-purple-500/20 border-purple-500/30 hover:bg-purple-500/30 active:bg-purple-500/40",
        amber: "bg-amber-500/20 border-amber-500/30 hover:bg-amber-500/30 active:bg-amber-500/40",
      },
      // Size variants for the handle
      size: {
        sm: "w-8 h-5",
        default: "w-10 h-6",
        lg: "w-12 h-7",
      },
      // Glow intensity for the handle
      glowIntensity: {
        none: "shadow-none",
        low: "shadow-[0_0_5px_rgba(255,255,255,0.1)]",
        medium: "shadow-[0_0_10px_rgba(255,255,255,0.15)]",
        high: "shadow-[0_0_15px_rgba(255,255,255,0.2)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      glowIntensity: "medium",
    },
  },
)

// Define the background glow variants
const glowVariants = cva("absolute inset-0 -z-10 blur-xl", {
  variants: {
    variant: {
      default: "bg-white/5",
      subtle: "bg-white/3",
      neon: "bg-cyan-500/5",
      purple: "bg-purple-500/5",
      amber: "bg-amber-500/5",
    },
    glowIntensity: {
      none: "opacity-0",
      low: "opacity-25",
      medium: "opacity-50",
      high: "opacity-75",
    },
    size: {
      sm: "h-32 w-8",
      default: "h-40 w-10",
      lg: "h-48 w-12",
    },
  },
  defaultVariants: {
    variant: "default",
    glowIntensity: "medium",
    size: "default",
  },
})

// Extend the PitchBendProps with our custom theming props
export interface EnhancedPitchBendProps extends PitchBendProps, VariantProps<typeof pitchBendVariants> {
  // Additional custom props
  handleClassName?: string
  glowClassName?: string
  // Custom colors (overrides variant colors)
  accentColor?: string
  glowColor?: string
  // Additional styling options
  backdropBlurAmount?: "none" | "sm" | "md" | "lg" | "xl"
  borderWidth?: "thin" | "default" | "thick"
  // Animation options
  animationSpeed?: "slow" | "default" | "fast"
  // Accessibility
  ariaLabel?: string
}

export function EnhancedPitchBend({
  // Extract our custom props
  className,
  variant,
  size,
  glowIntensity,
  handleClassName,
  glowClassName,
  accentColor,
  glowColor,
  backdropBlurAmount = "md",
  borderWidth = "default",
  animationSpeed = "default",
  ariaLabel,
  // All other props go to the PitchBend component
  ...props
}: EnhancedPitchBendProps) {
  // Map backdrop blur values to actual classes
  const backdropBlurMap = {
    none: "",
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl",
  }

  // Map border width values to actual classes
  const borderWidthMap = {
    thin: "border",
    default: "border-2",
    thick: "border-4",
  }

  // Map animation speed to CSS variables
  const animationSpeedMap = {
    slow: { "--animation-speed": "0.6" },
    default: { "--animation-speed": "0.8" },
    fast: { "--animation-speed": "0.95" },
  }

  // Custom style for accent color and glow color if provided
  const customStyle = {
    ...(accentColor ? { "--accent-color": accentColor } : {}),
    ...(glowColor ? { "--glow-color": glowColor } : {}),
    ...animationSpeedMap[animationSpeed],
  } as React.CSSProperties

  return (
    <div className="relative flex flex-col items-center" style={customStyle}>
      {/* Background glow effect */}
      <div
        className={cn(glowVariants({ variant, glowIntensity, size }), "rounded-full", glowClassName)}
        style={glowColor ? { backgroundColor: `color-mix(in srgb, ${glowColor}, transparent 95%)` } as React.CSSProperties : {}}
      />

      {/* Enhanced PitchBend with custom styling */}
      <PitchBend
        className={cn(
          pitchBendVariants({ variant, size, glowIntensity }),
          backdropBlurMap[backdropBlurAmount],
          borderWidthMap[borderWidth],
          "rounded-full overflow-hidden",
          className,
        )}
        snapStrength={animationSpeed === "slow" ? 0.6 : animationSpeed === "fast" ? 0.95 : 0.8}
        aria-label={ariaLabel}
        {...props}
      />
    </div>
  )
}
