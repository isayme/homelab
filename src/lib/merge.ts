import type { NavConfig, Category, PartialNavConfig } from "./types"

export function mergeNavConfig(base: NavConfig, remote: PartialNavConfig): NavConfig {
  const title = base.title || remote.title || ""
  const subtitle = base.subtitle || remote.subtitle || ""

  const categoryMap = new Map<string, Category>()
  for (const cat of base.categories) {
    categoryMap.set(cat.name ?? "", { ...cat, items: [...cat.items] })
  }

  for (const remoteCat of remote.categories ?? []) {
    const key = remoteCat.name ?? ""
    const existing = categoryMap.get(key)
    if (existing) {
      existing.items.push(...remoteCat.items)
    } else {
      categoryMap.set(key, { ...remoteCat, items: [...remoteCat.items] })
    }
  }

  return {
    ...base,
    title,
    subtitle,
    categories: [...categoryMap.values()],
  }
}
