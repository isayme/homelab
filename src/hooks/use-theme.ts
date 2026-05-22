import { useState, useEffect, useCallback } from "react"

type Theme = "light" | "dark" | "system"

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function getResolvedTheme(theme: Theme): "light" | "dark" {
  if (theme === "system") return getSystemTheme()
  return theme
}

function applyTheme(theme: Theme) {
  const needsDark = getResolvedTheme(theme) === "dark"
  if (document.documentElement.classList.contains("dark") === needsDark) return
  const toggle = () =>
    document.documentElement.classList.toggle("dark", needsDark)
  if ("startViewTransition" in document) {
    document.startViewTransition(toggle)
  } else {
    toggle()
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system"
    return (localStorage.getItem("theme") as Theme) || "system"
  })

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = () => {
      if (theme === "system") {
        const toggle = () =>
          document.documentElement.classList.toggle("dark", getSystemTheme() === "dark")
        if ("startViewTransition" in document) {
          document.startViewTransition(toggle)
        } else {
          toggle()
        }
      }
    }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [theme])

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t)
    localStorage.setItem("theme", t)
  }, [])

  return { theme, setTheme, mounted, resolvedTheme: getResolvedTheme(theme) }
}
