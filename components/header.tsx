"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

import Link from "next/link"
import { Code2, Menu, Star, Heart, ChevronDown, Search, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCollections, CollectionTool } from "@/contexts/collections-context"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"

const categories = [
  { id: "converters", title: "Data Converters", href: "/tools/converters" },
  { id: "generators", title: "Generators", href: "/tools/generators" },
  { id: "testers", title: "Testing & Validation", href: "/tools/testers" },
  { id: "text-transformers", title: "Text Transformers", href: "/tools/text-transformers" },
  { id: "encoders", title: "Encoders & Decoders", href: "/tools/encoders" },
  { id: "hashing", title: "Hashing & Checksums", href: "/tools/hashing" },
  { id: "encryption", title: "Encryption & Decryption", href: "/tools/encryption" },
  { id: "qr-barcode", title: "QR Code & Barcode", href: "/tools/qr-barcode" },
  { id: "image-tools", title: "Image Processing", href: "/tools/image-tools" },
  { id: "diff", title: "Difference Checker", href: "/tools/diff" },
  { id: "formatters", title: "Minify/Prettify", href: "/tools/formatters" },
]

function CollectionsDropdown() {
  const { collections, activeCollection, getToolsInCollection } = useCollections()
  const router = useRouter()
  const pathname = usePathname()
  const [loadingTool, setLoadingTool] = useState<string | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  
  // Get tools from active collection
  const toolsInCollection = activeCollection ? getToolsInCollection(activeCollection.id) : []
  
  // Clear loading state when pathname changes (navigation completes)
  useEffect(() => {
    setLoadingTool(null)
    setDropdownOpen(false) // Close dropdown when navigation completes
  }, [pathname])
  
  const handleToolClick = (href: string) => {
    setLoadingTool(href)
    
    // Navigate to the tool page after a small delay to show loading state
    setTimeout(() => {
      router.push(href)
    }, 300)
    
    return false // Prevent default link behavior
  }

  if (collections.length === 0 || toolsInCollection.length === 0) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-gray-600 hover:text-[#2196f3] hover:bg-[#2196f3]/5 transition-all duration-200"
          >
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline font-medium">Collections</span>
            <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5">
              0
            </Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-72 p-0">
          <DropdownMenuLabel className="px-4 py-3 border-b bg-gray-50/50">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900">My Collections</span>
              <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                0
              </Badge>
            </div>
          </DropdownMenuLabel>
          <div className="p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-900 mb-1">No tools saved yet</p>
            <p className="text-xs text-gray-500">Click the ♥ icon on any tool to add it to your collection!</p>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-[#2196f3] hover:bg-[#2196f3]/5 transition-all duration-200"
        >
          <Star className="h-4 w-4 fill-current" />
          <span className="hidden sm:inline font-medium">Collections</span>
          <Badge className="bg-[#2196f3] text-white text-xs px-2 py-0.5">{toolsInCollection.length}</Badge>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <DropdownMenuLabel className="px-4 py-3 border-b bg-[#2196f3]/5">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-900">My Collections</span>
            <Badge className="bg-[#2196f3] text-white">{toolsInCollection.length}</Badge>
          </div>
        </DropdownMenuLabel>
        <div className="max-h-80 overflow-y-auto">
          {toolsInCollection.slice(0, 10).map((tool) => (
            <DropdownMenuItem key={tool.href} className="p-1" onSelect={(e) => e.preventDefault()}>
              <button
                onClick={() => handleToolClick(tool.href)}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors w-full text-left"
              >
                <div className="w-8 h-8 bg-[#2196f3]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  {loadingTool === tool.href ? (
                    <Loader2 className="h-4 w-4 text-[#2196f3] animate-spin" />
                  ) : (
                    <Code2 className="h-4 w-4 text-[#2196f3]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{tool.name}</p>
                  <p className="text-xs text-gray-500 truncate">{tool.description}</p>
                </div>
              </button>
            </DropdownMenuItem>
          ))}
        </div>
        {toolsInCollection.length > 10 && (
          <>
            <DropdownMenuSeparator />
            <div className="p-3">
              <Link
                href="/#collections"
                className="block text-center text-sm text-[#2196f3] font-medium hover:text-[#1976d2] transition-colors"
              >
                View all {toolsInCollection.length} tools →
              </Link>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function CategoriesDropdown() {
  const router = useRouter()
  const pathname = usePathname()
  const [loadingCategory, setLoadingCategory] = useState<string | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  
  // Clear loading state when pathname changes (navigation completes)
  useEffect(() => {
    setLoadingCategory(null)
    setDropdownOpen(false) // Close dropdown when navigation completes
  }, [pathname])
  
  const handleCategoryClick = (href: string, categoryId: string) => {
    setLoadingCategory(categoryId)
    
    // Navigate to the category page after a small delay to show loading state
    setTimeout(() => {
      router.push(href)
    }, 300)
    
    return false // Prevent default link behavior
  }
  
  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gray-600 hover:text-[#2196f3] hover:bg-[#2196f3]/5 transition-all duration-200"
        >
          <span className="font-medium">Categories</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64 p-0">
        <DropdownMenuLabel className="px-4 py-3 border-b bg-gray-50/50">
          <span className="font-semibold text-gray-900">Tool Categories</span>
        </DropdownMenuLabel>
        <div className="py-2">
          {categories.map((category) => (
            <DropdownMenuItem key={category.id} className="px-4 py-2" onSelect={(e) => e.preventDefault()}>
              <button
                onClick={() => handleCategoryClick(category.href, category.id)}
                className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#2196f3] transition-colors w-full text-left"
              >
                <div className="w-2 h-2 bg-[#2196f3] rounded-full flex-shrink-0" />
                {loadingCategory === category.id ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-3 w-3 animate-spin text-[#2196f3]" />
                    <span>{category.title}</span>
                  </div>
                ) : (
                  category.title
                )}
              </button>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator />
        <div className="p-3">
          <button
            onClick={() => handleCategoryClick("/tools", "all-tools")}
            className="block text-center text-sm text-[#2196f3] font-medium hover:text-[#1976d2] transition-colors w-full"
          >
            {loadingCategory === "all-tools" ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              "View All Tools →"
            )}
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function MobileMenu() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const [loadingItem, setLoadingItem] = useState<string | null>(null)
  
  // Clear loading state when pathname changes (navigation completes)
  useEffect(() => {
    setLoadingItem(null)
    setOpen(false) // Close mobile menu when navigation completes
  }, [pathname])
  
  const handleMobileClick = (href: string, itemId: string) => {
    setLoadingItem(itemId)
    
    // Navigate to the page after a small delay to show loading state
    setTimeout(() => {
      router.push(href)
    }, 300)
    
    return false // Prevent default link behavior
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-gray-600 hover:text-[#2196f3] hover:bg-[#2196f3]/5"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-96 p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle className="text-left flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Link href="https://www.securenexus.io/" target="_blank" rel="noopener noreferrer">
                <Image 
                  src="/xbiz_logo.png" 
                  alt="Secure Nexus" 
                  width={90} 
                  height={30}
                  className="!w-[90px] !h-[30px] !min-w-[90px] !min-h-[30px] !max-w-[90px] !max-h-[30px]"
                />
              </Link>
              <Image 
                src="/logo-network.svg" 
                alt="DevTools Logo" 
                width={60} 
                height={60}
                className="!w-[60px] !h-[60px] !min-w-[60px] !min-h-[60px] !max-w-[60px] !max-h-[60px]"
              />
            </div>
            <span className="text-lg font-semibold">DevTools</span>
          </SheetTitle>
          <SheetDescription className="text-left text-sm text-gray-600">
            Professional developer tools and utilities
          </SheetDescription>
        </SheetHeader>

        <div className="py-4">
          <div className="px-6 mb-4">
            <button
              onClick={() => handleMobileClick("/tools", "all-tools")}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors w-full text-left"
            >
              <Search className="h-5 w-5 text-[#2196f3]" />
              {loadingItem === "all-tools" ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-[#2196f3]" />
                  <span className="font-medium text-gray-900">Loading...</span>
                </div>
              ) : (
                <span className="font-medium text-gray-900">All Tools</span>
              )}
            </button>
          </div>

          <div className="px-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Categories</h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleMobileClick(category.href, category.id)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700 w-full text-left"
                >
                  <div className="w-2 h-2 bg-[#2196f3] rounded-full flex-shrink-0" />
                  {loadingItem === category.id ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-3 w-3 animate-spin text-[#2196f3]" />
                      <span>{category.title}</span>
                    </div>
                  ) : (
                    category.title
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [loadingAllTools, setLoadingAllTools] = useState(false)
  
  // Clear loading state when pathname changes (navigation completes)
  useEffect(() => {
    setLoadingAllTools(false)
  }, [pathname])
  
  const handleAllToolsClick = () => {
    setLoadingAllTools(true)
    
    // Navigate to the tools page after a small delay to show loading state
    setTimeout(() => {
      router.push("/tools")
    }, 300)
    
    return false // Prevent default link behavior
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Link href="https://www.securenexus.io/" target="_blank" rel="noopener noreferrer">
                <Image 
                  src="/xbiz_logo.png" 
                  alt="Secure Nexus" 
                  width={90} 
                  height={30}
                  className="!w-[90px] !h-[30px] !min-w-[90px] !min-h-[30px] !max-w-[90px] !max-h-[30px]"
                />
              </Link>
              <Image 
                src="/logo-network.svg" 
                alt="DevTools Logo" 
                width={60} 
                height={60}
                className="!w-[60px] !h-[60px] !min-w-[60px] !min-h-[60px] !max-w-[60px] !max-h-[60px]"
              />
            </div>
            <Link href="/" className="flex flex-col hover:opacity-80 transition-opacity">
              <span className="text-xl font-bold text-gray-900 leading-none">DevTools</span>
              <span className="text-xs text-gray-500 leading-none">Professional Utilities</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={handleAllToolsClick}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#2196f3] hover:bg-[#2196f3]/5 rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              {loadingAllTools ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-[#2196f3]" />
                  <span>Loading...</span>
                </>
              ) : (
                "All Tools"
              )}
            </button>
            <CategoriesDropdown />
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <CollectionsDropdown />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
