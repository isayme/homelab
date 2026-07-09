import { load } from "js-yaml"
import { ArrowLeft, BookOpen, Home, RefreshCw } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { version } from "../package.json"
import { CategorySection } from "./components/category-section"
import { ConfigGuide } from "./components/config-guide"
import { ThemeToggle } from "./components/theme-toggle"
import { mergeNavConfig } from "./lib/merge"
import type { NavConfig, PartialNavConfig } from "./lib/types"

function HomePage({ data }: { data: NavConfig | null }) {
  if (data?.categories && data.categories.length > 0) {
    return (
      <div className="space-y-10">
        {data.categories.map((category) => (
          <CategorySection key={category.name} category={category} />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Home className="h-16 w-16 text-muted-foreground/50" />
      <h2 className="mt-4 text-xl font-medium text-muted-foreground">暂无导航数据</h2>
      <p className="mt-2 text-sm text-muted-foreground/70">
        请编辑 data/nav.yaml 添加服务配置
      </p>
    </div>
  )
}

export default function App() {
  const [data, setData] = useState<NavConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const hasDataRef = useRef(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === "/"

  const fetchData = useCallback(async () => {
    const minTime = 1000
    const startedAt = Date.now()
    try {
      setError(null)
      setRefreshing(true)

      const res = await fetch("/data/nav.yaml")
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const text = await res.text()
      const config = load(text) as NavConfig

      if (config.remotes && config.remotes.length > 0) {
        const results = await Promise.allSettled(
          config.remotes.map(async (remote) => {
            const r = await fetch(remote.url)
            if (!r.ok) throw new Error(`Remote HTTP ${r.status} from ${remote.url}`)
            const t = await r.text()
            return load(t) as PartialNavConfig
          }),
        )

        for (const result of results) {
          if (result.status === "fulfilled") {
            Object.assign(config, mergeNavConfig(config, result.value))
          } else {
            console.warn("加载远程配置失败:", result.reason)
          }
        }
      }

      setData({ ...config })
      hasDataRef.current = true
    } catch (e) {
      console.error("获取数据失败:", e)
      if (!hasDataRef.current) setError("无法加载配置文件 data/nav.yaml")
    } finally {
      const elapsed = Date.now() - startedAt
      const remaining = Math.ceil(elapsed / minTime) * minTime - elapsed
      if (remaining > 0) await new Promise((r) => setTimeout(r, remaining))
      setLoading(false)
      setRefreshing(false)
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
              {isHome ? (
                <>
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
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/")}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    title="返回首页"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <div>
                    <h1 className="text-xl font-semibold text-foreground">
                      配置说明
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      data/nav.yaml 格式参考
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-1">
              {isHome && (
                <>
                  <button
                    onClick={fetchData}
                    disabled={refreshing}
                    className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors disabled:opacity-50"
                    title="刷新"
                  >
                    <RefreshCw className={`h-5 w-5 ${refreshing ? "animate-spin" : ""}`} />
                    <span className="sr-only">刷新</span>
                  </button>
                  <Link
                    to="/guide"
                    className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                    title="配置说明"
                  >
                    <BookOpen className="h-5 w-5" />
                    <span className="sr-only">配置说明</span>
                  </Link>
                </>
              )}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage data={data} />} />
          <Route path="/guide" element={<ConfigGuide />} />
        </Routes>
      </main>

      <footer className="border-t border-border/50 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-5">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()}{" "}
            <a
              href="https://github.com/isayme/homelab"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              homelab v{version}
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
