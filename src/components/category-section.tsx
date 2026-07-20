import { DynamicIcon } from "./icons"
import { NavCard } from "./nav-card"
import type { Category } from "../lib/types"

export function CategorySection({ category }: { category: Category }) {
  if (category.items.length === 0) return null

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
          <DynamicIcon name={category.icon} className="h-4 w-4" />
        </div>
        <h2 className="text-base font-medium text-foreground">{category.name}</h2>
        <div className="h-px flex-1 bg-border/50" />
        <span className="text-xs text-muted-foreground">{category.items.length} 项</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {category.items.map((item, idx) => (
          <NavCard key={`${item.name ?? ""}-${idx}`} item={item} />
        ))}
      </div>
    </section>
  )
}
