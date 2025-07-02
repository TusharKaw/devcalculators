"use client"

import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ArrowLeftRight } from "lucide-react"

export interface FormatOption {
  value: string
  label: string
}

export interface FormatSelectorProps {
  inputFormat: string
  outputFormat: string
  inputOptions: FormatOption[]
  outputOptions: FormatOption[]
  onInputFormatChange: (value: string) => void
  onOutputFormatChange: (value: string) => void
}

export function FormatSelector({
  inputFormat,
  outputFormat,
  inputOptions,
  outputOptions,
  onInputFormatChange,
  onOutputFormatChange
}: FormatSelectorProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <div className="flex items-center space-x-2">
        <Label htmlFor="input-format">Input Format:</Label>
        <Select value={inputFormat} onValueChange={onInputFormatChange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {inputOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ArrowLeftRight className="h-5 w-5 text-gray-400" />

      <div className="flex items-center space-x-2">
        <Label htmlFor="output-format">Output Format:</Label>
        <Select value={outputFormat} onValueChange={onOutputFormatChange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {outputOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
} 