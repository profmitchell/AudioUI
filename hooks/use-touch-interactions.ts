"use client"

import { useEffect, useState } from "react"

export function useTouchInteractions() {
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Check if device supports touch
    const touchSupported =
      "ontouchstart" in window || navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0

    setIsTouchDevice(touchSupported)

    // Add touch-specific class to body for CSS targeting
    if (touchSupported) {
      document.body.classList.add("touch-device")
    } else {
      document.body.classList.remove("touch-device")
    }

    return () => {
      document.body.classList.remove("touch-device")
    }
  }, [])

  return { isTouchDevice }
}
