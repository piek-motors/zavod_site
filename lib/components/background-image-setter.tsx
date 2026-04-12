"use client"

import { useEffect } from "react"

export function BackgroundImageSetter({ bg }: { bg?: string }) {
  useEffect(() => {
    if (bg) {
      document.body.style.backgroundImage = bg
    }
    return () => {
      document.body.style.backgroundImage = ""
    }
  }, [bg])

  return null
}
