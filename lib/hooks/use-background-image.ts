import { useEffect } from "react"

export function useBackgroundImage(bg?: string) {
  useEffect(() => {
    if (bg) {
      document.body.style.backgroundImage = bg
    }
    return () => {
      document.body.style.backgroundImage = ""
    }
  }, [bg])
}
