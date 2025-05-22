import type React from "react"
interface Window {
  sliderComponentRef: React.RefObject<HTMLDivElement> | null
  updateComponentValue: ((value: number) => void) | null
}
