import { cn } from '@/lib/utils'

export function Badge({ className, variant = 'default', children, ...props }) {
  const variants = {
    default: 'bg-foreground text-background dark:bg-white dark:text-black',
    secondary: 'bg-secondary text-secondary-foreground',
    success: 'bg-foreground text-background dark:bg-white dark:text-black',
    warning: 'bg-muted text-foreground',
    destructive: 'bg-destructive text-destructive-foreground',
    outline: 'border border-border/50 text-foreground bg-transparent',
  }

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
