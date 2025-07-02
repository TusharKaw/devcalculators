"use client"

import type React from "react"
import { useState, useEffect } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCollections } from "@/contexts/collections-context"
import {
  Heart,
  Code,
  FileText,
  Search,
  Shuffle,
  Hash,
  Key,
  Palette,
  Globe,
  Calendar,
  FileCode,
  Lock,
  Unlock,
  ImageIcon,
  FileImage,
  Radio,
  Zap,
  RotateCcw,
  FlipVertical,
  Sparkles,
  Type,
  ArrowUpDown,
  RotateCwIcon,
  Repeat,
  Shield,
  ShieldCheck,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  Eye,
  EyeOff,
  FileCheck,
  CheckCircle,
  Cpu,
  HardDrive,
  QrCode,
  ScanLine,
  Wifi,
  ContactIcon,
  Grid3X3,
  Maximize2,
  Crop,
  Minimize2,
  Info,
  Eraser,
  Smile,
  Braces,
  Database,
  Table,
  Settings,
  X,
  Lightbulb,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

// Map of icon names to components
const iconMap: Record<string, React.ComponentType<any>> = {
  FileText,
  Code,
  Key,
  Hash,
  Shuffle,
  Search,
  Lock,
  Unlock,
  FileCode,
  Globe,
  Calendar,
  Palette,
  Database,
  Table,
  Settings,
  ImageIcon,
  FileImage,
  Radio,
  Zap,
  RotateCcw,
  FlipVertical,
  Sparkles,
  Type,
  ArrowUpDown,
  RotateClockwise: RotateCwIcon,
  Repeat,
  Shield,
  ShieldCheck,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  Eye,
  EyeOff,
  FileCheck,
  CheckCircle,
  Cpu,
  HardDrive,
  QrCode,
  ScanLine,
  Wifi,
  ContactIcon,
  Grid3X3,
  Maximize2,
  Crop,
  Minimize2,
  Info,
  Eraser,
  Smile,
  Braces,
}

// Tutorial tip component
function CollectionsTip() {
  const [showTip, setShowTip] = useState(false)

  useEffect(() => {
    // Check if user has seen the tip before
    const hasSeenTip = localStorage.getItem("collections-tip-seen")
    if (!hasSeenTip) {
      setShowTip(true)
    }
  }, [])

  const dismissTip = () => {
    setShowTip(false)
    localStorage.setItem("collections-tip-seen", "true")
  }

  if (!showTip) return null

  return (
    <div className="relative mb-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6 text-blue-600 hover:text-blue-800"
          onClick={dismissTip}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="flex items-start space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Lightbulb className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 mb-1">💡 Create Your Personal Collection</h3>
            <p className="text-blue-800 text-sm mb-2">
              Click the <Heart className="h-4 w-4 inline mx-1 text-gray-400" /> icon on any tool card to add it to your
              personal collection for quick access!
            </p>
            <p className="text-blue-700 text-xs">
              Your collection will appear here and is saved in your browser for future visits.
            </p>
          </div>
        </div>

        {/* Arrow pointing down */}
        <div className="absolute -bottom-2 left-8">
          <div className="w-4 h-4 bg-blue-50 border-r border-b border-blue-200 transform rotate-45"></div>
        </div>
      </div>
    </div>
  )
}

export function CollectionsGrid() {
  const { collections, activeCollection, getToolsInCollection, removeFromCollection } = useCollections()
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const [loadingTool, setLoadingTool] = useState<string | null>(null)
  
  // Get tools from active collection
  const toolsInCollection = activeCollection ? getToolsInCollection(activeCollection.id) : []
  
  // Clear loading state when pathname changes (navigation completes)
  useEffect(() => {
    setLoadingTool(null)
  }, [pathname])
  
  const handleToolClick = (href: string) => {
    setLoadingTool(href)
    
    // Save current scroll position before navigation
    if (typeof window !== 'undefined') {
      const position = {
        x: window.scrollX,
        y: window.scrollY,
        timestamp: Date.now()
      }
      sessionStorage.setItem('tools-page-scroll-position', JSON.stringify(position))
    }
    
    // Navigate to the tool page after a small delay to show loading state
    setTimeout(() => {
      router.push(href)
    }, 300)
    
    return false // Prevent default link behavior
  }

  // If no collections or no tools in active collection, show the tip for creating collections
  if (collections.length === 0 || toolsInCollection.length === 0) {
    return <CollectionsTip />
  }

  return (
    <section className="mb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">My Collection</h2>
        <p className="text-gray-600 text-lg">Your favorite tools for quick access</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {toolsInCollection.map((tool) => {
          // Get the icon component or default to Code
          const IconComponent = iconMap[tool.icon] || Code
          const isHovered = hoveredCard === tool.href
          // Safely handle tags - provide empty array if undefined
          const tags = tool.tags || []

          return (
            <div
              key={tool.href} 
              className="w-full text-left"
            >
              <Card
                className={`transition-all duration-300 hover:shadow-lg border-l-4 border-l-[#2196f3] group relative cursor-pointer ${
                  isHovered ? "scale-105 shadow-lg" : "hover:scale-102"
                }`}
                onMouseEnter={() => setHoveredCard(tool.href)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleToolClick(tool.href)}
                style={{
                  height: isHovered ? "auto" : "80px",
                  overflow: "hidden",
                }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 z-10 h-6 w-6 text-red-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    removeFromCollection(activeCollection?.id || 1, tool.id)
                  }}
                >
                  <Heart className="h-3 w-3 fill-current" />
                </Button>

                <CardHeader className={`pb-2 pr-10 transition-all duration-300 ${isHovered ? "pb-3" : ""}`}>
                  <div className="flex items-center space-x-3">
                    <div className="p-1.5 bg-[#2196f3]/10 rounded-lg group-hover:bg-[#2196f3]/20 transition-colors">
                      {loadingTool === tool.href ? (
                        <Loader2 className="h-4 w-4 text-[#2196f3] animate-spin" />
                      ) : (
                        <IconComponent className="h-4 w-4 text-[#2196f3]" />
                      )}
                    </div>
                    <CardTitle
                      className={`group-hover:text-[#2196f3] transition-colors ${isHovered ? "text-base" : "text-sm"}`}
                    >
                      {loadingTool === tool.href ? (
                        <div className="flex items-center gap-2">
                          <span>{tool.name}</span>
                          <Loader2 className="h-3 w-3 animate-spin text-[#2196f3]" />
                        </div>
                      ) : (
                        tool.name
                      )}
                    </CardTitle>
                  </div>

                  {/* Description only shows on hover */}
                  <div
                    className={`transition-all duration-300 ${
                      isHovered ? "opacity-100 max-h-20 mt-2" : "opacity-0 max-h-0 overflow-hidden"
                    }`}
                  >
                    <CardDescription className="text-xs">{tool.description}</CardDescription>
                  </div>
                </CardHeader>

                {/* Tags only show on hover */}
                <CardContent
                  className={`pt-0 transition-all duration-300 ${
                    isHovered ? "opacity-100 max-h-32" : "opacity-0 max-h-0 overflow-hidden"
                  }`}
                >
                  <div className="flex flex-wrap gap-1">
                    {tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs bg-gray-100 text-gray-700 hover:bg-[#2196f3]/10 hover:text-[#2196f3]"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                        +{tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>
    </section>
  )
}
