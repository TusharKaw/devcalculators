import { SEOHead } from '@/components/seo-head'
import { ReactNode } from 'react'

interface ToolSEOProps {
  toolSlug: string
  title?: string
  description?: string
  schema?: any | any[]
  keywords?: string
  additionalTags?: ReactNode
  canonicalParams?: string[]
  sourceFormat?: string
  targetFormat?: string
}

export function ToolSEOHead({
  toolSlug,
  title,
  description,
  schema,
  keywords,
  additionalTags,
  canonicalParams,
  sourceFormat,
  targetFormat
}: ToolSEOProps) {
  // Generate format-specific keywords if source and target formats are provided
  const formatKeywords = sourceFormat && targetFormat 
    ? `${sourceFormat.toLowerCase()} to ${targetFormat.toLowerCase()}, ${sourceFormat.toLowerCase()} converter, ${targetFormat.toLowerCase()} converter, convert ${sourceFormat.toLowerCase()} to ${targetFormat.toLowerCase()}, data converter, format converter, online converter, free converter`
    : undefined
    
  // Combine keywords
  const combinedKeywords = formatKeywords 
    ? keywords ? `${keywords}, ${formatKeywords}` : formatKeywords
    : keywords
    
  return (
    <SEOHead
      toolSlug={toolSlug}
      customTitle={title}
      customDescription={description}
      schema={schema}
      additionalTags={
        <>
          {combinedKeywords && <meta name="keywords" content={combinedKeywords} />}
          {additionalTags}
        </>
      }
      canonicalParams={canonicalParams}
    />
  )
} 