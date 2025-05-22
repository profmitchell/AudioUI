"use client"

import { Dial } from "@/components/ui/dial"
import { useState } from "react"
import { DocumentationPage } from "@/app/docs/components/knob/documentation-page"

export default function Documentation() {
  // Static props for the Dial component
  const staticDialProps = {
    variant: "default" as const, // Ensure type safety
    label: "Interactive Knob",
    min: 0,
    max: 100,
    step: 1,
    showValue: true,
    knobVariant: "default" as const, // Ensure type safety
    indicatorStyle: "line" as const, // Ensure type safety
    glowColor: "rgba(255, 255, 255, 0.2)",
    trackColor: "rgba(255, 255, 255, 0.1)",
    indicatorColor: "rgba(255, 255, 255, 0.8)",
  };

  const [dialValue, setDialValue] = useState(50); // Manage only the value

  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      {/* Component Showcase Area - Simplified to just the Dial and Docs */}
      <div className="flex-grow p-4 md:p-8 flex flex-col items-center justify-start gap-8">
        <div className="glass-container p-6 mt-8 md:mt-16">
          <Dial
            {...staticDialProps}
            value={dialValue}
            onChange={setDialValue}
          />
        </div>
        {/* Documentation Page - Remains */}
        <div className="w-full max-w-4xl">
          <DocumentationPage />
        </div>
      </div>
    </main>
  )
}
