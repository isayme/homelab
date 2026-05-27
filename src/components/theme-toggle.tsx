import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "../hooks/use-theme"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="relative inline-block">
      <button
        onClick={() => {
          const next: Record<string, "light" | "dark" | "system"> = {
            light: "dark",
            dark: "system",
            system: "light",
          }
          setTheme(next[theme] as "light" | "dark" | "system")
        }}
        title={
          theme === "dark" ? "暗色" : theme === "light" ? "亮色" : "跟随系统"
        }
        className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
      >
        {theme === "dark" ? (
          <Moon className="h-5 w-5" />
        ) : theme === "light" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Monitor className="h-5 w-5" />
        )}
        <span className="sr-only">切换主题</span>
      </button>
    </div>
  )
}
