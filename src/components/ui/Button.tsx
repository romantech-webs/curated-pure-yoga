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
        'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 cursor-pointer',
        {
          'bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-md': variant === 'primary',
          'bg-secondary text-white hover:bg-secondary/90': variant === 'secondary',
          'border-2 border-primary text-primary hover:bg-primary hover:text-white': variant === 'outline',
          'text-primary hover:text-primary-dark hover:bg-primary/5': variant === 'ghost',
        },
        {
          'px-5 py-2.5 text-sm': size === 'sm',
          'px-7 py-3 text-sm': size === 'md',
          'px-9 py-4 text-base': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
}
