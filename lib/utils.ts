import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(data: string) {
  return new Date(data).toLocaleDateString("en-US",{
    month: 'long',
    day: 'numeric',
  year: 'numeric'  })
}