"use client"

import { useEffect, useState } from 'react'
import { useScrollPosition } from '@/hooks/use-scroll-position'
import { SearchTools } from '@/components/search-tools'
import { ToolsGrid } from '@/components/tools-grid'
import { CollectionsGrid } from '@/components/collections-grid'

export function ToolsPageClient() {
  const { restoreScrollPosition } = useScrollPosition()
  const [isRestoring, setIsRestoring] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Restore scroll position when component mounts (client-side only)
  useEffect(() => {
    if (!isClient) return

    // Check if there's a saved scroll position
    const savedPosition = sessionStorage.getItem('tools-page-scroll-position')
    
    if (savedPosition) {
      try {
        const position = JSON.parse(savedPosition)
        const now = Date.now()
        
        // Check if position is still valid (not expired - 30 minutes)
        if (now - position.timestamp < 30 * 60 * 1000) {
          setIsRestoring(true)
          
          // Wait for the page to be fully rendered
          const timer = setTimeout(() => {
            restoreScrollPosition()
            setIsRestoring(false)
          }, 100)
          
          return () => clearTimeout(timer)
        } else {
          // Clear expired position
          sessionStorage.removeItem('tools-page-scroll-position')
        }
      } catch (error) {
        console.error('Error parsing saved scroll position:', error)
        sessionStorage.removeItem('tools-page-scroll-position')
      }
    }
  }, [restoreScrollPosition, isClient])

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Scroll restoration indicator - only show on client */}
      {isClient && isRestoring && (
        <div className="fixed top-4 right-4 z-50 bg-blue-500 text-white px-3 py-2 rounded-lg shadow-lg text-sm animate-pulse">
          Restoring position...
        </div>
      )}
      
      <SearchTools />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Developer Tools Collection</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A comprehensive collection of essential developer tools for data conversion, testing, encoding, and more.
          All tools work offline in your browser.
        </p>
      </div>

      {/* Collections Section */}
      <CollectionsGrid />

      {/* All Tools */}
      <ToolsGrid />
    </main>
  )
} 