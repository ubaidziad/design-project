import { cn } from '@/lib/utils'

export function Progress({ className, value = 0, max = 100, ...props }) {
  const percentage = (value / max) * 100

  return (
    <div
      className={cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-secondary',
        className
      )}
      {...props}
    >
      <div
        className="h-full bg-primary transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}
