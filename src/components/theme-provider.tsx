import { createContext, useCallback, useEffect, useState, type ReactNode } from "react"

export type Theme = "light" | "dark" | "system"

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: "light" | "dark"
}

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

const THEME_COLORS = { light: "#f6f9f6", dark: "#050b05" } as const

function setThemeColorMeta(theme: Theme) {
  document.querySelectorAll('meta[name="theme-color"]').forEach((el) => el.remove())
  if (theme === "system") {
    for (const mode of ["light", "dark"] as const) {
      const meta = document.createElement("meta")
      meta.name = "theme-color"
      meta.content = THEME_COLORS[mode]
      meta.setAttribute("media", `(prefers-color-scheme: ${mode})`)
      document.head.appendChild(meta)
    }
  } else {
    const meta = document.createElement("meta")
    meta.name = "theme-color"
    meta.content = THEME_COLORS[theme]
    document.head.appendChild(meta)
  }
}

function applyTheme(theme: Theme, systemDark: boolean) {
  const needsDark = theme === "system" ? systemDark : theme === "dark"
  if (document.documentElement.classList.contains("dark") === needsDark) return
  const toggle = () => document.documentElement.classList.toggle("dark", needsDark)
  if ("startViewTransition" in document) {
    document.startViewTransition(toggle)
  } else {
    toggle()
  }
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) || "system"
  })

  const [systemDark, setSystemDark] = useState(() => getSystemTheme() === "dark")

  useEffect(() => {
    applyTheme(theme, systemDark)
    setThemeColorMeta(theme)
  }, [theme, systemDark])

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = () => setSystemDark(mq.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t)
    localStorage.setItem("theme", t)
  }, [])

  const resolvedTheme = theme === "system" ? (systemDark ? "dark" : "light") : theme

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
