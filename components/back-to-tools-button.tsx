"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface BackToToolsButtonProps {
  variant?: "default" | "outline" | "ghost"
  className?: string
  showIcon?: boolean
  children?: React.ReactNode
}

export function BackToToolsButton({ 
  variant = "outline", 
  className = "", 
  showIcon = true,
  children = "Back to Tools"
}: BackToToolsButtonProps) {
  const router = useRouter()

  const handleBackToTools = () => {
    // Save current scroll position before navigation
    if (typeof window !== 'undefined') {
      const position = {
        x: window.scrollX,
        y: window.scrollY,
        timestamp: Date.now()
      }
      sessionStorage.setItem('tools-page-scroll-position', JSON.stringify(position))
    }
    
    // Navigate to tools page
    router.push('/tools')
  }

  return (
    <Button 
      variant={variant} 
      onClick={handleBackToTools}
      className={`flex items-center gap-2 ${className}`}
    >
      {showIcon && <ArrowLeft className="h-4 w-4" />}
      {children}
    </Button>
  )
} 