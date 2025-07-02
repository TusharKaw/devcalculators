import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get the base URL for the application
 * Uses NEXT_PUBLIC_BASE_URL environment variable with fallbacks
 */
export function getBaseUrl(): string {
  // Check for environment variable first
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL
  }
  
  // Fallback based on environment
  if (process.env.NODE_ENV === 'production') {
    return 'https://yourdomain.com'
  }
  
  return 'http://localhost:3000'
}

// Utility function to save scroll position before navigation
export function saveScrollPositionAndNavigate(href: string) {
  if (typeof window !== 'undefined') {
    const position = {
      x: window.scrollX,
      y: window.scrollY,
      timestamp: Date.now()
    }
    sessionStorage.setItem('tools-page-scroll-position', JSON.stringify(position))
  }
  
  // Navigate to the specified URL
  window.location.href = href
}

// Utility function to save scroll position (for use with Next.js Link onClick)
export function saveScrollPosition() {
  if (typeof window !== 'undefined') {
    const position = {
      x: window.scrollX,
      y: window.scrollY,
      timestamp: Date.now()
    }
    sessionStorage.setItem('tools-page-scroll-position', JSON.stringify(position))
  }
}
