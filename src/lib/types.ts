export interface NavItem {
  name?: string
  url?: string
  urlExternal?: string
  icon?: string
  description: string
}

export interface Category {
  name?: string
  icon?: string
  items: NavItem[]
}

export interface Remote {
  url: string
}

export interface NavConfig {
  title: string
  subtitle: string
  categories: Category[]
  remotes?: Remote[]
}

export type PartialNavConfig = Partial<NavConfig>
