export function ConfigGuide() {
  const icons = [
    "film", "tv", "git-branch", "box", "shield", "server",
    "bar-chart-2", "database", "play", "code", "globe", "activity",
    "folder", "link", "home", "settings", "lock", "hard-drive",
    "cpu", "wifi", "cloud", "download", "image", "music", "video",
    "file-text", "mail", "calendar", "users", "bookmark", "star",
    "heart", "zap", "terminal",
  ]

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">配置文件结构</h2>
        <p className="text-sm text-muted-foreground">
          配置文件位于 <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">data/nav.yaml</code>，修改后刷新页面即可生效，无需重新构建。
        </p>
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-secondary/50 p-4 text-sm leading-relaxed text-foreground">
          <code>{`# 页面顶部标题
title: HomeLab 导航
# 页面顶部副标题
subtitle: 家庭服务器控制中心

# 服务分类列表
categories:
  - name: 分类名称          # 必填，分类标题
    icon: icon-name         # 可选，分类图标，默认 link
    items:
      - name: 服务名称      # 必填，卡片标题
        url: https://...    # 必填，点击跳转链接
        icon: icon-name     # 可选，服务图标，默认 link
        description: 描述   # 可选，卡片副标题，不填则显示 url`}</code>
        </pre>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">可用图标</h2>
        <p className="text-sm text-muted-foreground">
          图标名称对应{" "}
          <a
            href="https://lucide.dev/icons/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 hover:opacity-80"
          >
            Lucide
          </a>
          {" "}图标库的 kebab-case 名称。如需使用其他图标，在{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">src/components/icons.tsx</code>
          {" "}的 iconMap 中添加映射即可。
        </p>
        <div className="rounded-lg border border-border/60 bg-secondary/50 p-4">
          <div className="flex flex-wrap gap-1.5">
            {icons.map((name) => (
              <code
                key={name}
                className="rounded bg-background px-2 py-0.5 text-xs text-foreground border border-border/40"
              >
                {name}
              </code>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">完整示例</h2>
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-secondary/50 p-4 text-sm leading-relaxed text-foreground">
          <code>{`title: 我的服务器
subtitle: 所有服务尽在掌握
categories:
  - name: 影音娱乐
    icon: play
    items:
      - name: Jellyfin
        url: http://192.168.1.100:8096
        icon: film
        description: 开源媒体服务器
      - name: Navidrome
        url: http://192.168.1.100:4533
        icon: music
        description: 音乐流媒体

  - name: 开发运维
    icon: terminal
    items:
      - name: Gitea
        url: http://192.168.1.100:3000
        icon: git-branch
        description: 私有 Git 服务
      - name: Portainer
        url: http://192.168.1.100:9443
        icon: box
        description: 容器管理面板`}</code>
        </pre>
      </section>
    </div>
  )
}
