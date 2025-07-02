"use client"

import { useState, useCallback, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export interface ConverterProps {
  defaultInputFormat: string
  defaultOutputFormat: string
  supportedFormats: string[]
  toolSlug: string
}

export function useConverter({
  defaultInputFormat,
  defaultOutputFormat,
  supportedFormats,
  toolSlug,
}: ConverterProps) {
  const params = useParams()
  const router = useRouter()
  
  // Parse URL parameters for format conversion
  const urlFormats = params?.formats as string[] | undefined
  
  const [inputFormat, setInputFormat] = useState<string>(() => {
    // Logic to extract input format from URL
    if (urlFormats && urlFormats.length >= 1) {
      const formatPair = urlFormats[0]
      if (formatPair && formatPair.includes("-to-")) {
        const [fromFormat] = formatPair.split("-to-")
        return supportedFormats.includes(fromFormat.toLowerCase())
          ? fromFormat.toLowerCase()
          : defaultInputFormat
      }
      const fromFormat = urlFormats[0].toLowerCase()
      return supportedFormats.includes(fromFormat) ? fromFormat : defaultInputFormat
    }
    return defaultInputFormat
  })
  
  const [outputFormat, setOutputFormat] = useState<string>(() => {
    // Logic to extract output format from URL
    if (urlFormats && urlFormats.length >= 1) {
      const formatPair = urlFormats[0]
      if (formatPair && formatPair.includes("-to-")) {
        const [, toFormat] = formatPair.split("-to-")
        return supportedFormats.includes(toFormat.toLowerCase()) ? toFormat.toLowerCase() : defaultOutputFormat
      }
    }
    if (urlFormats && urlFormats.length >= 2) {
      const toFormat = urlFormats[1].toLowerCase()
      return supportedFormats.includes(toFormat) ? toFormat : defaultOutputFormat
    }
    return defaultOutputFormat
  })
  
  // Handle input format change
  const handleInputFormatChange = useCallback((value: string) => {
    setInputFormat(value)
    updateURL(value, outputFormat)
  }, [outputFormat])
  
  // Handle output format change
  const handleOutputFormatChange = useCallback((value: string) => {
    setOutputFormat(value)
    updateURL(inputFormat, value)
  }, [inputFormat])
  
  // Update URL when formats change
  const updateURL = useCallback((newInputFormat: string, newOutputFormat: string) => {
    const newUrl = `/tools/${toolSlug}/${newInputFormat}-to-${newOutputFormat}`
    router.replace(newUrl, { scroll: false })
  }, [router, toolSlug])
  
  return {
    inputFormat,
    outputFormat,
    setInputFormat: handleInputFormatChange,
    setOutputFormat: handleOutputFormatChange,
    updateURL
  }
} 