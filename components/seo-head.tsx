"use client"

import { generateStructuredData, generateBreadcrumbStructuredData, toolsData } from "@/lib/seo"
import Head from "next/head"
import { useSearchParams } from "next/navigation"
import { useEffect, useState, useMemo } from "react"

interface SEOHeadProps {
  toolSlug: string
  customTitle?: string
  customDescription?: string
  schema?: Record<string, any> | Record<string, any>[]
  canonicalParams?: string[]
  additionalTags?: React.ReactNode
}

export function SEOHead({ 
  toolSlug, 
  customTitle, 
  customDescription, 
  schema,
  canonicalParams = [],
  additionalTags
}: SEOHeadProps) {
  const searchParams = useSearchParams()
  const [canonicalUrl, setCanonicalUrl] = useState<string>("")
  
  // Memoize structured data to prevent hydration mismatches
  const structuredData = useMemo(() => generateStructuredData(toolSlug), [toolSlug])
  const breadcrumbData = useMemo(() => generateBreadcrumbStructuredData(toolSlug), [toolSlug])
  
  // Memoize schema JSON strings to prevent hydration mismatches
  const schemaScripts = useMemo(() => {
    if (!schema) return []
    
    const schemas = Array.isArray(schema) ? schema : [schema]
    return schemas.map((data, index) => ({
      key: `schema-${index}`,
      json: JSON.stringify(data)
    }))
  }, [schema])
  
  // Generate canonical URL with allowed parameters
  useEffect(() => {
    if (typeof window !== "undefined") {
      const baseUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`
      
      if (canonicalParams.length > 0) {
        const params = new URLSearchParams()
        canonicalParams.forEach(param => {
          const value = searchParams.get(param)
          if (value) {
            params.append(param, value)
          }
        })
        
        const queryString = params.toString()
        setCanonicalUrl(queryString ? `${baseUrl}?${queryString}` : baseUrl)
      } else {
        setCanonicalUrl(baseUrl)
      }
    }
  }, [searchParams, canonicalParams])

  const toolData = toolsData[toolSlug]
  
  return (
    <>
      {/* Structured data */}
      {Array.isArray(structuredData) ? (
        // Handle array of structured data objects
        structuredData.map((data, index) => (
          <script 
            key={`structured-data-${index}`} 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} 
          />
        ))
      ) : structuredData ? (
        // Handle single structured data object
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      ) : null}
      
      {breadcrumbData && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      )}
      
      {/* Schema scripts */}
      {schemaScripts.map(({ key, json }) => (
        <script key={key} type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
      ))}
      
      {/* Canonical URL */}
      {canonicalUrl && (
        <Head>
          <link rel="canonical" href={canonicalUrl} />
          
          {/* Open Graph tags */}
          <meta property="og:title" content={customTitle || toolData?.title || ""} />
          <meta property="og:description" content={customDescription || toolData?.description || ""} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:image" content={`https://tools.vercel.app/og-images/${toolSlug}.png`} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:site_name" content="Developer Tools" />
          <meta property="og:locale" content="en_US" />
          
          {/* Twitter Card tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={customTitle || toolData?.title || ""} />
          <meta name="twitter:description" content={customDescription || toolData?.description || ""} />
          <meta name="twitter:image" content={`https://tools.vercel.app/og-images/${toolSlug}.png`} />
          <meta name="twitter:creator" content="@devtools" />
          
          {/* Additional SEO tags */}
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
          <meta name="author" content="Developer Tools" />
          <meta name="revisit-after" content="7 days" />
          
          {/* Additional custom tags */}
          {additionalTags}
        </Head>
      )}
    </>
  )
}

// Special SEO component for converter tools with enhanced metadata
export function ConverterSEOHead({
  toolSlug,
  sourceFormat,
  targetFormat,
  customTitle,
  customDescription
}: {
  toolSlug: string,
  sourceFormat?: string,
  targetFormat?: string,
  customTitle?: string,
  customDescription?: string
}) {
  // Generate format-specific title and description if formats are provided
  let title = customTitle
  let description = customDescription
  
  if (!title && sourceFormat && targetFormat) {
    title = `${sourceFormat} to ${targetFormat} Converter | Free Online ${sourceFormat}↔${targetFormat} Conversion Tool`
  }
  
  if (!description && sourceFormat && targetFormat) {
    description = `Free online ${sourceFormat} to ${targetFormat} converter. Convert between ${sourceFormat} and ${targetFormat} formats with syntax highlighting, validation, and advanced options. No installation required.`
  }
  
  // Additional metadata specific to converter tools
  const additionalTags = (
    <>
      <meta name="application-name" content={`${sourceFormat || ''} to ${targetFormat || ''} Converter`} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={`${sourceFormat || ''} to ${targetFormat || ''} Converter`} />
    </>
  )
  
  return (
    <SEOHead 
      toolSlug={toolSlug}
      customTitle={title}
      customDescription={description}
      additionalTags={additionalTags}
      canonicalParams={['from', 'to']} // Allow format parameters in canonical URL
    />
  )
}
