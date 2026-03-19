import {
  Sparkles,
  Shield,
  Heart,
  Leaf,
  Search,
  FileText,
  Play,
  Star,
  GraduationCap,
  Award,
  Syringe,
  Users,
  type LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Shield,
  Heart,
  Leaf,
  Search,
  FileText,
  Play,
  Star,
  GraduationCap,
  Award,
  Syringe,
  Users,
}

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Sparkles
}
