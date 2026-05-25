export interface NavItem {
  name: string
  url: string
  urlExternal?: string
  icon: string
  description: string
}

export interface Category {
  name: string
  icon: string
  items: NavItem[]
}

export interface NavConfig {
  title: string
  subtitle: string
  categories: Category[]
}
