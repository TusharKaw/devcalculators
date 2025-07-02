"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface JsonViewerProps {
  data: any
  level?: number
  path?: string
}

export function JsonViewer({ data, level = 0, path = "" }: JsonViewerProps) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})
  const [copied, setCopied] = useState<string | null>(null)

  const toggleCollapse = (key: string) => {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const copyValue = async (value: any, key: string) => {
    const stringValue = typeof value === "string" ? value : JSON.stringify(value, null, 2)
    await navigator.clipboard.writeText(stringValue)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const getValueType = (value: any): string => {
    if (value === null) return "null"
    if (Array.isArray(value)) return "array"
    return typeof value
  }

  const getValueColor = (type: string): string => {
    switch (type) {
      case "string":
        return "text-green-600"
      case "number":
        return "text-blue-600"
      case "boolean":
        return "text-purple-600"
      case "null":
        return "text-gray-500"
      case "array":
        return "text-orange-600"
      case "object":
        return "text-[#2196f3]"
      default:
        return "text-gray-900"
    }
  }

  const renderValue = (value: any, key: string, currentPath: string) => {
    const type = getValueType(value)
    const colorClass = getValueColor(type)
    const isCollapsed = collapsed[currentPath]

    if (type === "object" && value !== null) {
      const keys = Object.keys(value)
      const isEmpty = keys.length === 0

      return (
        <div className="ml-4">
          <div className="flex items-center gap-2 group">
            <button
              onClick={() => toggleCollapse(currentPath)}
              className="flex items-center gap-1 hover:bg-gray-100 rounded px-1 py-0.5"
              disabled={isEmpty}
            >
              {!isEmpty && (isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
              <span className="font-medium text-gray-700">{key}:</span>
              <span className={`${colorClass} font-mono text-sm`}>
                {isEmpty ? "{}" : `{${keys.length} ${keys.length === 1 ? "property" : "properties"}}`}
              </span>
            </button>
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
              onClick={() => copyValue(value, currentPath)}
            >
              {copied === currentPath ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            </Button>
          </div>
          {!isEmpty && !isCollapsed && (
            <div className="ml-4 border-l border-gray-200 pl-4 mt-1">
              {keys.map((objKey) => (
                <div key={objKey} className="mb-1">
                  {renderValue(value[objKey], objKey, `${currentPath}.${objKey}`)}
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }

    if (type === "array") {
      const isEmpty = value.length === 0

      return (
        <div className="ml-4">
          <div className="flex items-center gap-2 group">
            <button
              onClick={() => toggleCollapse(currentPath)}
              className="flex items-center gap-1 hover:bg-gray-100 rounded px-1 py-0.5"
              disabled={isEmpty}
            >
              {!isEmpty && (isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
              <span className="font-medium text-gray-700">{key}:</span>
              <span className={`${colorClass} font-mono text-sm`}>
                {isEmpty ? "[]" : `[${value.length} ${value.length === 1 ? "item" : "items"}]`}
              </span>
            </button>
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
              onClick={() => copyValue(value, currentPath)}
            >
              {copied === currentPath ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            </Button>
          </div>
          {!isEmpty && !isCollapsed && (
            <div className="ml-4 border-l border-gray-200 pl-4 mt-1">
              {value.map((item: any, index: number) => (
                <div key={index} className="mb-1">
                  {renderValue(item, `[${index}]`, `${currentPath}[${index}]`)}
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }

    // Primitive values
    return (
      <div className="ml-4 flex items-center gap-2 group">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">{key}:</span>
          <span className={`${colorClass} font-mono text-sm`}>{type === "string" ? `"${value}"` : String(value)}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
          onClick={() => copyValue(value, currentPath)}
        >
          {copied === currentPath ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        </Button>
      </div>
    )
  }

  if (level === 0) {
    const type = getValueType(data)
    if (type === "object" && data !== null) {
      return (
        <div className="font-mono text-sm">
          {Object.keys(data).map((key) => (
            <div key={key} className="mb-2">
              {renderValue(data[key], key, key)}
            </div>
          ))}
        </div>
      )
    }
    if (type === "array") {
      return (
        <div className="font-mono text-sm">
          {data.map((item: any, index: number) => (
            <div key={index} className="mb-2">
              {renderValue(item, `[${index}]`, `[${index}]`)}
            </div>
          ))}
        </div>
      )
    }
    return (
      <div className="font-mono text-sm">
        <span className={getValueColor(type)}>{type === "string" ? `"${data}"` : String(data)}</span>
      </div>
    )
  }

  return null
}
