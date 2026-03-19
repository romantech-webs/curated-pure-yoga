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
  ShoppingBag,
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
  ShoppingBag,
}

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Sparkles
}
