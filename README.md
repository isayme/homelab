# HomeLab 导航

YAML 驱动的家庭服务器导航页面。编辑配置文件即可增减服务入口，无需改代码。

## 快速开始

```bash
npm i
npm run dev      # 开发模式，默认 http://localhost:5173
npm run build    # 构建到 dist/
npm run preview  # 预览生产构建
```

## 配置

编辑 `data/nav.yaml`，页面会自动更新：

```yaml
title: HomeLab 导航
subtitle: 家庭服务器控制中心
categories:
  - name: 媒体服务
    icon: play
    items:
      - name: Jellyfin
        url: http://192.168.1.100:8096
        urlExternal: https://jellyfin.example.com
        icon: film
        description: 开源媒体服务器
```

页面内置 `/guide` 路由可查看完整配置说明，详见 [doc/config-guide.md](doc/config-guide.md)。

支持通过 `remotes` 字段从远程 URL 拉取配置片段并自动合并（同名 category 合并 items），详见 [doc/config-guide.md#远程配置合并remotes](doc/config-guide.md#远程配置合并remotes)。

## 部署

### Docker

```bash
docker run -d -p 80:80 isayme/homelab:latest
```

挂载自定义 `nav.yaml`：

```bash
docker run -d -p 80:80 \
  -v /path/to/your/nav.yaml:/usr/share/nginx/html/data/nav.yaml \
  isayme/homelab:latest
```

### Docker Compose

```yaml
services:
  homelab:
    image: isayme/homelab:latest
    ports:
      - "80:80"
    volumes:
      - /path/to/your/nav.yaml:/usr/share/nginx/html/data/nav.yaml
```

Tag 推送后 GitHub Actions 自动构建多架构镜像（amd64/arm64）并推送至 Docker Hub。

### GitHub Pages

Tag 推送后自动构建并部署到 gh-pages 分支。

## 技术栈

React 19 + TypeScript + Vite + Tailwind CSS v4 + React Router
