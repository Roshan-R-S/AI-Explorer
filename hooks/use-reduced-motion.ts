import { useEffect, useState } from "react"

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false
    return localStorage.getItem("reduced-motion") === "true"
  })

  useEffect(() => {
    const root = window.document.documentElement
    if (reducedMotion) {
      root.classList.add("reduced-motion")
    } else {
      root.classList.remove("reduced-motion")
    }
    localStorage.setItem("reduced-motion", String(reducedMotion))
  }, [reducedMotion])

  return { reducedMotion, setReducedMotion }
} 