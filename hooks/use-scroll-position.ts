"use client"

import { useEffect, useRef, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'

interface ScrollPosition {
  x: number
  y: number
  timestamp: number
}

const SCROLL_POSITION_KEY = 'tools-page-scroll-position'
const SCROLL_POSITION_EXPIRY = 30 * 60 * 1000 // 30 minutes

export function useScrollPosition() {
  const router = useRouter()
  const isRestoring = useRef(false)
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Save scroll position before navigation
  const saveScrollPosition = useCallback(() => {
    if (!isClient || typeof window === 'undefined') return
    
    const position: ScrollPosition = {
      x: window.scrollX,
      y: window.scrollY,
      timestamp: Date.now()
    }
    sessionStorage.setItem(SCROLL_POSITION_KEY, JSON.stringify(position))
  }, [isClient])

  // Restore scroll position
  const restoreScrollPosition = useCallback(() => {
    if (!isClient || typeof window === 'undefined' || isRestoring.current) return

    try {
      const savedPosition = sessionStorage.getItem(SCROLL_POSITION_KEY)
      if (!savedPosition) return

      const position: ScrollPosition = JSON.parse(savedPosition)
      const now = Date.now()

      // Check if position is still valid (not expired)
      if (now - position.timestamp > SCROLL_POSITION_EXPIRY) {
        sessionStorage.removeItem(SCROLL_POSITION_KEY)
        return
      }

      isRestoring.current = true

      // Use requestAnimationFrame for smooth restoration
      requestAnimationFrame(() => {
        window.scrollTo({
          left: position.x,
          top: position.y,
          behavior: 'instant' // Use instant to avoid animation
        })

        // Clear the saved position after restoration
        sessionStorage.removeItem(SCROLL_POSITION_KEY)
        
        // Reset the flag after a short delay
        setTimeout(() => {
          isRestoring.current = false
        }, 100)
      })
    } catch (error) {
      console.error('Error restoring scroll position:', error)
      sessionStorage.removeItem(SCROLL_POSITION_KEY)
      isRestoring.current = false
    }
  }, [isClient])

  // Auto-save scroll position on scroll events (client-side only)
  useEffect(() => {
    if (!isClient || typeof window === 'undefined') return

    const handleScroll = () => {
      if (!isRestoring.current) {
        saveScrollPosition()
      }
    }

    // Throttle scroll events for better performance
    let timeoutId: NodeJS.Timeout
    const throttledScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleScroll, 100)
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', throttledScroll)
      clearTimeout(timeoutId)
    }
  }, [saveScrollPosition, isClient])

  // Save position before page unload (client-side only)
  useEffect(() => {
    if (!isClient || typeof window === 'undefined') return

    const handleBeforeUnload = () => {
      saveScrollPosition()
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        saveScrollPosition()
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [saveScrollPosition, isClient])

  return {
    saveScrollPosition,
    restoreScrollPosition,
    isRestoring: isRestoring.current
  }
} 