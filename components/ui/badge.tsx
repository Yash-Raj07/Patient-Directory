import * as React from "react"
import { cn } from "@/lib/utils"

const Badge = ({ className, variant = 'default', ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'outline' | 'fever' | 'headache' | 'sore throat' | 'sprained ankle' | 'rash' | 'ear infection' | 'sinusitis' | 'stomach ache' | 'broken arm' | 'allergic reaction' }) => {
  const variants = {
    default: 'bg-blue-100 text-blue-700',
    outline: 'border border-gray-200 text-gray-700',
    'fever': 'bg-red-100 text-red-700',
    'headache': 'bg-orange-100 text-orange-700',
    'sore throat': 'bg-yellow-100 text-yellow-700',
    'sprained ankle': 'bg-green-100 text-green-700',
    'rash': 'bg-pink-100 text-pink-700',
    'ear infection': 'bg-cyan-100 text-cyan-700',
    'sinusitis': 'bg-gray-100 text-gray-700',
    'stomach ache': 'bg-amber-100 text-amber-700',
    'broken arm': 'bg-purple-100 text-purple-700',
    'allergic reaction': 'bg-emerald-100 text-emerald-700',
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 capitalize",
        variants[variant as keyof typeof variants] || variants.default,
        className
      )}
      {...props}
    />
  )
}

export { Badge }
