"use client"

import { SearchTools } from "@/components/search-tools"
import { ToolsGrid } from "@/components/tools-grid"
import { CollectionsGrid } from "@/components/collections-grid"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"

interface CategoryPageProps {
  categoryId: string
  categoryTitle: string
  categoryDescription: string
  showCollections?: boolean
}

export function CategoryPage({
  categoryId,
  categoryTitle,
  categoryDescription,
  showCollections = false,
}: CategoryPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/tools">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to All Tools
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Home
            </Button>
          </Link>
        </div>

        {/* Search with category pre-selected */}
        <SearchTools defaultCategory={categoryTitle} />

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{categoryTitle}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{categoryDescription}</p>
        </div>

        {/* Collections Section - only show if requested */}
        {showCollections && <CollectionsGrid />}

        {/* Category Tools */}
        <ToolsGrid categoryFilter={categoryId} />
      </main>
    </div>
  )
}
