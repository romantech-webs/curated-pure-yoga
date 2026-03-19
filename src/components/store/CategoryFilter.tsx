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
    <div className="flex flex-wrap gap-2 justify-center mb-10 md:mb-14">
      <button
        onClick={() => onChange(null)}
        className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
          active === null
            ? 'bg-primary text-white shadow-sm'
            : 'bg-neutral text-muted hover:text-secondary hover:bg-neutral-dark'
        }`}
      >
        Todos
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            active === cat.id
              ? 'bg-primary text-white shadow-sm'
              : 'bg-neutral text-muted hover:text-secondary hover:bg-neutral-dark'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}
