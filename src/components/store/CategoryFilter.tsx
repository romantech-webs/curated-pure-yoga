'use client'

import type { Category } from '@/types/store'

interface CategoryFilterProps {
  categories: Category[]
  active: string | null
  onChange: (id: string | null) => void
}

export function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  if (categories.length <= 1) return null

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-10 md:mb-14">
      <button
        onClick={() => onChange(null)}
        className={`px-6 py-2.5 text-xs tracking-widest uppercase transition-all duration-200 ${
          active === null
            ? 'bg-secondary text-white'
            : 'border border-neutral-dark text-muted hover:text-secondary hover:border-secondary'
        }`}
      >
        Todos
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`px-6 py-2.5 text-xs tracking-widest uppercase transition-all duration-200 ${
            active === cat.id
              ? 'bg-secondary text-white'
              : 'border border-neutral-dark text-muted hover:text-secondary hover:border-secondary'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}
