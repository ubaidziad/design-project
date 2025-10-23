import { cn } from '@/lib/utils'

export function Button({ 
  className, 
  variant = 'default', 
  size = 'default',
  disabled = false,
  children, 
  ...props 
}) {
  const variants = {
    default: 'bg-foreground text-background hover:bg-foreground/90 dark:bg-white dark:text-black dark:hover:bg-white/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-border/50 bg-transparent hover:bg-accent hover:border-border',
    ghost: 'hover:bg-accent/50',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  }

  const sizes = {
    default: 'h-12 px-6 py-3',
    sm: 'h-10 rounded-md px-4',
    lg: 'h-14 rounded-md px-10',
  }

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl text-base font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
