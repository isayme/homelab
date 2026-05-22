# 配置指南

HomeLab 导航页面通过 `data/nav.yaml` 文件配置，修改后刷新页面即可生效，无需重新构建。

## 配置文件结构

```yaml
# 页面顶部标题
title: HomeLab 导航
# 页面顶部副标题
subtitle: 家庭服务器控制中心

# 服务分类列表
categories:
  - name: 分类名称          # 必填，分类标题
    icon: icon-name         # 可选，分类图标，默认为 link
    items:
      - name: 服务名称      # 必填，卡片标题
        url: https://...    # 必填，点击跳转链接
        icon: icon-name     # 可选，服务图标，默认为 link
        description: 描述   # 可选，卡片副标题，不填则显示 url
```

## 可用图标

图标名称对应 [Lucide](https://lucide.dev/icons/) 图标库的 kebab-case 名称。当前已注册的图标：

`film` `tv` `git-branch` `box` `shield` `server` `bar-chart-2` `database` `play` `code` `globe` `activity` `folder` `link` `home` `settings` `lock` `hard-drive` `cpu` `wifi` `cloud` `download` `image` `music` `video` `file-text` `mail` `calendar` `users` `bookmark` `star` `heart` `zap` `terminal`

如需使用其他图标，在 `src/components/icons.tsx` 的 `iconMap` 中添加映射即可。

## 示例

```yaml
title: 我的服务器
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
        description: 容器管理面板
```
