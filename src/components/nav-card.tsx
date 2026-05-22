import { DynamicIcon } from "./icons"
import type { NavItem } from "../lib/types"

export function NavCard({ item }: { item: NavItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg border border-border/60 bg-card p-4 transition-all duration-200 hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <DynamicIcon name={item.icon} className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-medium text-foreground transition-colors group-hover:text-primary">
            {item.name}
          </h3>
          <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">
            {item.description || item.url}
          </p>
        </div>
      </div>
    </a>
  )
}
