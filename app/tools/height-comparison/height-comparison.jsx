"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Ruler, Users, TrendingUp } from 'lucide-react';

const HeightComparison = () => {
  const [height1, setHeight1] = useState("175")
  const [height2, setHeight2] = useState("165")
  const [unit, setUnit] = useState("cm")
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")

  const commonHeights = {
    cm: {
      "Average Male": 175,
      "Average Female": 162,
      "Basketball Player": 200,
      "Olympic Gymnast": 155,
      "Supermodel": 178,
      "Child (10 years)": 140,
      "Teenager (15 years)": 165,
      "Elderly Person": 170
    },
    ft: {
      "Average Male": 5.75,
      "Average Female": 5.32,
      "Basketball Player": 6.56,
      "Olympic Gymnast": 5.09,
      "Supermodel": 5.84,
      "Child (10 years)": 4.59,
      "Teenager (15 years)": 5.41,
      "Elderly Person": 5.58
    }
  }

  const convertHeight = (value, fromUnit, toUnit) => {
    if (fromUnit === toUnit) return value
    
    if (fromUnit === "cm" && toUnit === "ft") {
      return value / 30.48
    } else if (fromUnit === "ft" && toUnit === "cm") {
      return value * 30.48
    }
    return value
  }

  const calculateComparison = () => {
    const h1 = parseFloat(height1)
    const h2 = parseFloat(height2)

    if (isNaN(h1) || isNaN(h2) || h1 <= 0 || h2 <= 0) {
      setError("Please enter valid positive heights")
      return
    }

    const difference = Math.abs(h1 - h2)
    const percentage = (difference / Math.max(h1, h2)) * 100
    const taller = h1 > h2 ? "First person" : h2 > h1 ? "Second person" : "Equal"
    const shorter = h1 < h2 ? "First person" : h2 < h1 ? "Second person" : "Equal"

    setResult({
      height1: h1,
      height2: h2,
      difference: difference,
      percentage: percentage,
      taller: taller,
      shorter: shorter,
      ratio: Math.max(h1, h2) / Math.min(h1, h2)
    })
    setError("")
  }

  const setPresetHeight = (person, height) => {
    if (unit === "cm") {
      setHeight1(height.toString())
    } else {
      setHeight1(convertHeight(height, "cm", "ft").toFixed(2))
    }
  }

  const setPresetHeight2 = (person, height) => {
    if (unit === "cm") {
      setHeight2(height.toString())
    } else {
      setHeight2(convertHeight(height, "cm", "ft").toFixed(2))
    }
  }

  const formatHeight = (value) => {
    if (unit === "cm") {
      return `${value} cm`
    } else {
      const feet = Math.floor(value)
      const inches = Math.round((value - feet) * 12)
      return `${feet}' ${inches}"`
    }
  }

  const getHeightColor = (height) => {
    if (unit === "cm") {
      if (height < 150) return "bg-blue-200 dark:bg-blue-800"
      if (height < 170) return "bg-green-200 dark:bg-green-800"
      if (height < 190) return "bg-yellow-200 dark:bg-yellow-800"
      return "bg-red-200 dark:bg-red-800"
    } else {
      if (height < 5) return "bg-blue-200 dark:bg-blue-800"
      if (height < 5.6) return "bg-green-200 dark:bg-green-800"
      if (height < 6.2) return "bg-yellow-200 dark:bg-yellow-800"
      return "bg-red-200 dark:bg-red-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Height Comparison Visualizer
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Compare heights between two people with visual representation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Calculator */}
            <div className="lg:col-span-3">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Ruler className="h-5 w-5" />
                    Height Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Unit Selection */}
                    <div className="flex justify-center">
                      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                        <Button
                          variant={unit === "cm" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setUnit("cm")}
                          className="rounded-md"
                        >
                          Centimeters
                        </Button>
                        <Button
                          variant={unit === "ft" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setUnit("ft")}
                          className="rounded-md"
                        >
                          Feet & Inches
                        </Button>
                      </div>
                    </div>

                    {/* Height Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="height1" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          First Person's Height
                        </Label>
                        <Input
                          id="height1"
                          type="number"
                          value={height1}
                          onChange={(e) => setHeight1(e.target.value)}
                          placeholder={`Enter height in ${unit}`}
                          className="mt-2"
                          min="0"
                          step={unit === "cm" ? "1" : "0.01"}
                        />
                      </div>

                      <div>
                        <Label htmlFor="height2" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Second Person's Height
                        </Label>
                        <Input
                          id="height2"
                          type="number"
                          value={height2}
                          onChange={(e) => setHeight2(e.target.value)}
                          placeholder={`Enter height in ${unit}`}
                          className="mt-2"
                          min="0"
                          step={unit === "cm" ? "1" : "0.01"}
                        />
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex justify-center">
                      <Button onClick={calculateComparison} className="px-8">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Compare Heights
                      </Button>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    {/* Result */}
                    {result && (
                      <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Height Comparison Result
                          </h3>
                          
                          {/* Visual Comparison */}
                          <div className="flex items-end justify-center gap-8 mb-6">
                            <div className="text-center">
                              <div 
                                className={`w-16 mx-auto rounded-t-lg ${getHeightColor(result.height1)}`}
                                style={{ 
                                  height: `${Math.min(200, Math.max(50, (result.height1 / (unit === "cm" ? 200 : 7)) * 200))}px` 
                                }}
                              ></div>
                              <div className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                                {formatHeight(result.height1)}
                              </div>
                            </div>
                            
                            <div className="text-center">
                              <div 
                                className={`w-16 mx-auto rounded-t-lg ${getHeightColor(result.height2)}`}
                                style={{ 
                                  height: `${Math.min(200, Math.max(50, (result.height2 / (unit === "cm" ? 200 : 7)) * 200))}px` 
                                }}
                              ></div>
                              <div className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                                {formatHeight(result.height2)}
                              </div>
                            </div>
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Height Difference:</span>
                              <span className="font-semibold text-orange-600 dark:text-orange-400">
                                {formatHeight(result.difference)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Percentage Difference:</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {result.percentage.toFixed(1)}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Height Ratio:</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {result.ratio.toFixed(2)}:1
                              </span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Taller Person:</span>
                              <span className="font-semibold text-green-600 dark:text-green-400">
                                {result.taller}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Shorter Person:</span>
                              <span className="font-semibold text-blue-600 dark:text-blue-400">
                                {result.shorter}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Comparison:</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {result.height1 > result.height2 ? "First > Second" : result.height2 > result.height1 ? "Second > First" : "Equal"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Preset Heights */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quick Presets</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">First Person:</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(commonHeights[unit]).map(([person, height]) => (
                              <Button
                                key={person}
                                variant="outline"
                                size="sm"
                                onClick={() => setPresetHeight(person, height)}
                                className="justify-start text-xs"
                              >
                                {person}
                              </Button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Second Person:</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(commonHeights[unit]).map(([person, height]) => (
                              <Button
                                key={person}
                                variant="outline"
                                size="sm"
                                onClick={() => setPresetHeight2(person, height)}
                                className="justify-start text-xs"
                              >
                                {person}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Ad Banner */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-full h-64 bg-gradient-to-br from-orange-200 to-red-300 dark:from-orange-800 dark:to-red-700 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-800 dark:text-orange-200 mb-2">
                            Ad Space
                          </div>
                          <div className="text-sm text-orange-600 dark:text-orange-300">
                            300x250
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Advertisement
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* About Section */}
          <Card className="mt-8 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-orange-600" />
                About Height Comparison Visualizer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Our Height Comparison Visualizer helps you compare heights between two people with visual representation. 
                Whether you're comparing family members, athletes, or fictional characters, this tool provides 
                accurate height comparisons with detailed statistics and visual aids.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Visual height comparison</li>
                    <li>• Multiple unit support (cm/ft)</li>
                    <li>• Preset common heights</li>
                    <li>• Detailed statistics</li>
                    <li>• Mobile-friendly design</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Common Uses:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Family height comparisons</li>
                    <li>• Sports team analysis</li>
                    <li>• Character design</li>
                    <li>• Growth tracking</li>
                    <li>• Educational purposes</li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">💡 Tips:</h4>
                <ul className="text-sm text-orange-800 dark:text-orange-200 space-y-1">
                  <li>• Use presets for quick comparisons</li>
                  <li>• Switch between units as needed</li>
                  <li>• Visual bars show relative heights</li>
                  <li>• Percentage shows relative difference</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default HeightComparison 