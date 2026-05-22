import { useState, useEffect, useCallback } from "react"
import { RefreshCw, Home } from "lucide-react"
import yaml from "js-yaml"
import { CategorySection } from "./components/category-section"
import { ThemeToggle } from "./components/theme-toggle"
import type { NavConfig } from "./lib/types"

export default function App() {
  const [data, setData] = useState<NavConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setError(null)
      const res = await fetch("/data/nav.yaml")
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const text = await res.text()
      const config = yaml.load(text) as NavConfig
      setData(config)
    } catch (e) {
      console.error("获取数据失败:", e)
      setError("无法加载配置文件 data/nav.yaml")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <RefreshCw className="h-5 w-5 animate-spin" />
          <span>加载中...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-destructive font-medium">{error}</p>
          <button
            onClick={fetchData}
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:opacity-90"
          >
            <RefreshCw className="h-4 w-4" />
            重试
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Home className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">
                  {data?.title || "HomeLab 导航"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {data?.subtitle || "家庭服务器控制中心"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={fetchData}
                className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                title="刷新"
              >
                <RefreshCw className="h-5 w-5" />
                <span className="sr-only">刷新</span>
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {data?.categories && data.categories.length > 0 ? (
          <div className="space-y-10">
            {data.categories.map((category) => (
              <CategorySection key={category.name} category={category} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Home className="h-16 w-16 text-muted-foreground/50" />
            <h2 className="mt-4 text-xl font-medium text-muted-foreground">暂无导航数据</h2>
            <p className="mt-2 text-sm text-muted-foreground/70">
              请编辑 data/nav.yaml 添加服务配置
            </p>
          </div>
        )}
      </main>

      <footer className="border-t border-border/50 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-5">
          <p className="text-center text-sm text-muted-foreground">
            HomeLab 导航
          </p>
        </div>
      </footer>
    </div>
  )
}
