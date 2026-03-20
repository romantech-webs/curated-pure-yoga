import { cn } from '@/lib/cn'
import type { ComponentPropsWithoutRef } from 'react'

interface ButtonProps extends ComponentPropsWithoutRef<'a'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <a
      className={cn(
        'inline-flex items-center justify-center tracking-widest uppercase transition-all duration-300 cursor-pointer',
        {
          'bg-secondary text-white hover:bg-secondary/80': variant === 'primary',
          'bg-accent text-white hover:bg-accent-light': variant === 'secondary',
          'border border-secondary text-secondary hover:bg-secondary hover:text-white': variant === 'outline',
          'text-secondary hover:text-muted': variant === 'ghost',
        },
        {
          'px-6 py-2.5 text-xs': size === 'sm',
          'px-8 py-3 text-xs': size === 'md',
          'px-10 py-4 text-xs': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
}
