import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {

  
  clsx(inputs)

  return twMerge(inputs as any)
}
