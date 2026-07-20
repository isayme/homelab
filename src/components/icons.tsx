import {
  Film,
  Tv,
  GitBranch,
  Box,
  Shield,
  Server,
  BarChart2,
  Database,
  Play,
  Code,
  Globe,
  Activity,
  Folder,
  Link,
  Home,
  Settings,
  Lock,
  HardDrive,
  Cpu,
  Wifi,
  Cloud,
  Download,
  Image,
  Music,
  Video,
  FileText,
  Mail,
  Calendar,
  Users,
  Bookmark,
  Star,
  Heart,
  Zap,
  Terminal,
  type LucideIcon,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  film: Film,
  tv: Tv,
  "git-branch": GitBranch,
  box: Box,
  shield: Shield,
  server: Server,
  "bar-chart-2": BarChart2,
  database: Database,
  play: Play,
  code: Code,
  globe: Globe,
  activity: Activity,
  folder: Folder,
  link: Link,
  home: Home,
  settings: Settings,
  lock: Lock,
  "hard-drive": HardDrive,
  cpu: Cpu,
  wifi: Wifi,
  cloud: Cloud,
  download: Download,
  image: Image,
  music: Music,
  video: Video,
  "file-text": FileText,
  mail: Mail,
  calendar: Calendar,
  users: Users,
  bookmark: Bookmark,
  star: Star,
  heart: Heart,
  zap: Zap,
  terminal: Terminal,
}

export function getIcon(name?: string): LucideIcon {
  if (!name) return Link
  return iconMap[name.toLowerCase()] || Link
}

export function DynamicIcon({
  name,
  className,
}: {
  name?: string
  className?: string
}) {
  const Icon = getIcon(name)
  return <Icon className={className} />
}
