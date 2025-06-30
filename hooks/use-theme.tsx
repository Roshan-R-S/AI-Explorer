import { useEffect, useState } from "react"

type Theme = "light" | "dark" | "system"

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system"
    return (localStorage.getItem("theme") as Theme) || "system"
  })

  // Apply theme to <html> element
  useEffect(() => {
    const root = window.document.documentElement
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.remove("light", "dark")
      root.classList.add(systemTheme)
    } else {
      root.classList.remove("light", "dark")
      root.classList.add(theme)
    }
    localStorage.setItem("theme", theme)
  }, [theme])

  // Listen for system theme changes if 'system' is selected
  useEffect(() => {
    if (theme !== "system") return
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = () => {
      const systemTheme = media.matches ? "dark" : "light"
      window.document.documentElement.classList.remove("light", "dark")
      window.document.documentElement.classList.add(systemTheme)
    }
    media.addEventListener("change", handler)
    return () => media.removeEventListener("change", handler)
  }, [theme])

  const setTheme = (newTheme: Theme) => setThemeState(newTheme)

  return { theme, setTheme }
} 