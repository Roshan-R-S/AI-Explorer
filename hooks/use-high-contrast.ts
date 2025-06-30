import { useEffect, useState } from "react"

export function useHighContrast() {
  const [highContrast, setHighContrast] = useState(() => {
    if (typeof window === "undefined") return false
    return localStorage.getItem("high-contrast") === "true"
  })

  useEffect(() => {
    const root = window.document.documentElement
    if (highContrast) {
      root.classList.add("high-contrast")
    } else {
      root.classList.remove("high-contrast")
    }
    localStorage.setItem("high-contrast", String(highContrast))
  }, [highContrast])

  return { highContrast, setHighContrast }
} 