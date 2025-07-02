"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Download, ArrowLeftRight } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface BaseConverterLayoutProps {
  title: string
  description: string
  icon: React.ReactNode
  inputLabel: string
  outputLabel: string
  inputValue: string
  outputValue: string
  onInputChange: (value: string) => void
  formatSelector?: React.ReactNode
  optionsPanel?: React.ReactNode
  infoContent?: React.ReactNode
  isProcessing?: boolean
  error?: string | null
}

export function BaseConverterLayout({
  title,
  description,
  icon,
  inputLabel,
  outputLabel,
  inputValue,
  outputValue,
  onInputChange,
  formatSelector,
  optionsPanel,
  infoContent,
  isProcessing,
  error
}: BaseConverterLayoutProps) {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success("Copied to clipboard")
    } catch (err) {
      toast.error("Failed to copy")
      console.error("Failed to copy:", err)
    }
  }

  const downloadFile = (content: string, filename: string) => {
    try {
      const blob = new Blob([content], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast.success("Download started")
    } catch (err) {
      toast.error("Download failed")
      console.error("Failed to download:", err)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-8">
        <Link href="/tools" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          Back to Tools
        </Link>

        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mr-4">
            {icon}
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-600 text-lg mt-2">{description}</p>
          </div>
        </div>
      </div>

      {/* Format Selector */}
      {formatSelector && (
        <Card className="mb-6 shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Format Options</CardTitle>
          </CardHeader>
          <CardContent>{formatSelector}</CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Input */}
          <Card className="shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">{inputLabel}</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={inputValue}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder={`Enter your ${inputLabel.toLowerCase()} here...`}
                className="min-h-[300px] font-mono text-sm"
              />
              {error && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Output */}
          <Card className="shadow-md">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{outputLabel}</CardTitle>
                <div className="flex items-center space-x-2">
                  {isProcessing && (
                    <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full mr-2" />
                  )}
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(outputValue)} disabled={!outputValue}>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadFile(outputValue, `output.txt`)}
                    disabled={!outputValue}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={outputValue}
                readOnly
                placeholder={`Converted ${outputLabel.toLowerCase()} will appear here...`}
                className="min-h-[300px] font-mono text-sm bg-gray-50"
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Options Panel */}
          {optionsPanel && (
            <Card className="shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Options</CardTitle>
              </CardHeader>
              <CardContent>{optionsPanel}</CardContent>
            </Card>
          )}

          {/* Info Content */}
          {infoContent && (
            <Card className="shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">About This Tool</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">{infoContent}</CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
} 