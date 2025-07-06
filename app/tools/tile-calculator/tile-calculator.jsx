"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, Calculator, Square, Ruler, Package } from "lucide-react"

const TileCalculator = () => {
  const [roomLength, setRoomLength] = useState("10")
  const [roomWidth, setRoomWidth] = useState("8")
  const [tileLength, setTileLength] = useState("12")
  const [tileWidth, setTileWidth] = useState("12")
  const [wastage, setWastage] = useState("10")
  const [unit, setUnit] = useState("ft")
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")

  const calculateTiles = () => {
    const length = parseFloat(roomLength)
    const width = parseFloat(roomWidth)
    const tileL = parseFloat(tileLength)
    const tileW = parseFloat(tileWidth)
    const wastagePercent = parseFloat(wastage)

    if (isNaN(length) || length <= 0) {
      setError("Please enter a valid room length")
      return
    }

    if (isNaN(width) || width <= 0) {
      setError("Please enter a valid room width")
      return
    }

    if (isNaN(tileL) || tileL <= 0) {
      setError("Please enter a valid tile length")
      return
    }

    if (isNaN(tileW) || tileW <= 0) {
      setError("Please enter a valid tile width")
      return
    }

    if (isNaN(wastagePercent) || wastagePercent < 0 || wastagePercent > 100) {
      setError("Please enter a valid wastage percentage (0-100)")
      return
    }

    try {
      // Calculate room area
      const roomArea = length * width
      
      // Calculate tile area
      const tileArea = tileL * tileW
      
      // Calculate tiles needed (including wastage)
      const tilesNeeded = Math.ceil((roomArea / tileArea) * (1 + wastagePercent / 100))
      
      // Calculate boxes needed (assuming 10 tiles per box)
      const tilesPerBox = 10
      const boxesNeeded = Math.ceil(tilesNeeded / tilesPerBox)
      
      // Calculate total cost (assuming $2 per tile)
      const costPerTile = 2
      const totalCost = tilesNeeded * costPerTile
      
      // Calculate grout needed (1 lb per 100 sq ft)
      const groutPerSqFt = 0.01
      const groutNeeded = roomArea * groutPerSqFt

      setResult({
        roomArea: roomArea,
        tileArea: tileArea,
        tilesNeeded: tilesNeeded,
        boxesNeeded: boxesNeeded,
        totalCost: totalCost,
        groutNeeded: groutNeeded,
        wastagePercent: wastagePercent,
        tilesPerBox: tilesPerBox
      })
      setError("")
    } catch (err) {
      setError("Error calculating tiles. Please check your inputs.")
    }
  }

  useEffect(() => {
    if (roomLength && roomWidth && tileLength && tileWidth && wastage) {
      calculateTiles()
    }
  }, [roomLength, roomWidth, tileLength, tileWidth, wastage, unit])

  const formatArea = (area) => {
    return `${area.toFixed(2)} sq ${unit}`
  }

  const formatLength = (length) => {
    return `${length.toFixed(2)} ${unit}`
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  const clearAll = () => {
    setRoomLength("10")
    setRoomWidth("8")
    setTileLength("12")
    setTileWidth("12")
    setWastage("10")
    setResult(null)
    setError("")
  }

  const setPresetRoom = (length, width) => {
    setRoomLength(length.toString())
    setRoomWidth(width.toString())
  }

  const setPresetTile = (length, width) => {
    setTileLength(length.toString())
    setTileWidth(width.toString())
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tile Calculator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Calculate tiles needed for your flooring project with wastage allowance
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Calculator */}
            <div className="lg:col-span-3">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Square className="h-5 w-5" />
                    Tile Calculation
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Unit Selection */}
                    <div className="flex justify-center">
                      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                        <Button
                          variant={unit === "ft" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setUnit("ft")}
                          className="rounded-md"
                        >
                          Feet
                        </Button>
                        <Button
                          variant={unit === "m" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setUnit("m")}
                          className="rounded-md"
                        >
                          Meters
                        </Button>
                      </div>
                    </div>

                    {/* Room Dimensions */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Room Dimensions</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="roomLength" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Room Length ({unit})
                          </Label>
                          <Input
                            id="roomLength"
                            type="number"
                            value={roomLength}
                            onChange={(e) => setRoomLength(e.target.value)}
                            placeholder="Enter room length"
                            className="mt-2"
                            min="0"
                            step="0.1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="roomWidth" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Room Width ({unit})
                          </Label>
                          <Input
                            id="roomWidth"
                            type="number"
                            value={roomWidth}
                            onChange={(e) => setRoomWidth(e.target.value)}
                            placeholder="Enter room width"
                            className="mt-2"
                            min="0"
                            step="0.1"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Tile Dimensions */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Tile Dimensions</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="tileLength" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Tile Length ({unit})
                          </Label>
                          <Input
                            id="tileLength"
                            type="number"
                            value={tileLength}
                            onChange={(e) => setTileLength(e.target.value)}
                            placeholder="Enter tile length"
                            className="mt-2"
                            min="0"
                            step="0.1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="tileWidth" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Tile Width ({unit})
                          </Label>
                          <Input
                            id="tileWidth"
                            type="number"
                            value={tileWidth}
                            onChange={(e) => setTileWidth(e.target.value)}
                            placeholder="Enter tile width"
                            className="mt-2"
                            min="0"
                            step="0.1"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Wastage */}
                    <div>
                      <Label htmlFor="wastage" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Wastage Percentage (%)
                      </Label>
                      <Input
                        id="wastage"
                        type="number"
                        value={wastage}
                        onChange={(e) => setWastage(e.target.value)}
                        placeholder="Enter wastage percentage"
                        className="mt-2"
                        min="0"
                        max="100"
                        step="0.1"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-center">
                      <Button onClick={calculateTiles} className="px-8">
                        <Calculator className="h-4 w-4 mr-2" />
                        Calculate Tiles
                      </Button>
                      <Button variant="outline" onClick={clearAll}>
                        Reset
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
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-lg border border-amber-200 dark:border-amber-800">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Tile Calculation Result
                          </h3>
                          <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                            {result.tilesNeeded} Tiles
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Total Tiles Needed (Including {result.wastagePercent}% Wastage)
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Room Area:</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {formatArea(result.roomArea)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Tile Area:</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {formatArea(result.tileArea)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Tiles Needed:</span>
                              <span className="font-semibold text-amber-600 dark:text-amber-400">
                                {result.tilesNeeded}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Boxes Needed:</span>
                              <span className="font-semibold text-blue-600 dark:text-blue-400">
                                {result.boxesNeeded} ({result.tilesPerBox} tiles/box)
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Total Cost:</span>
                              <span className="font-semibold text-green-600 dark:text-green-400">
                                {formatCurrency(result.totalCost)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Grout Needed:</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {result.groutNeeded.toFixed(1)} lbs
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Summary Cards */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                                {result.tilesNeeded}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Total Tiles</div>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {result.boxesNeeded}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Boxes</div>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {formatCurrency(result.totalCost)}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Total Cost</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Quick Room Sizes */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quick Room Sizes</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[
                          { length: 10, width: 8, label: "Small Bedroom" },
                          { length: 12, width: 10, label: "Medium Bedroom" },
                          { length: 15, width: 12, label: "Large Bedroom" },
                          { length: 20, width: 15, label: "Living Room" },
                          { length: 12, width: 8, label: "Kitchen" },
                          { length: 8, width: 6, label: "Bathroom" }
                        ].map((room, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            onClick={() => setPresetRoom(room.length, room.width)}
                            className="justify-start h-auto p-3"
                          >
                            <div className="text-left">
                              <div className="font-medium">{room.label}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {room.length}' × {room.width}' = {room.length * room.width} sq ft
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Common Tile Sizes */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Common Tile Sizes</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                        {[
                          { length: 12, width: 12, label: "12×12\"" },
                          { length: 18, width: 18, label: "18×18\"" },
                          { length: 24, width: 24, label: "24×24\"" },
                          { length: 6, width: 24, label: "6×24\"" },
                          { length: 12, width: 24, label: "12×24\"" },
                          { length: 8, width: 48, label: "8×48\"" }
                        ].map((tile, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            onClick={() => setPresetTile(tile.length, tile.width)}
                            className="justify-center"
                          >
                            {tile.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Ad Banner */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <Card className="shadow-lg border-0 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-700">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-full h-64 bg-gradient-to-br from-amber-200 to-orange-300 dark:from-amber-800 dark:to-orange-700 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-amber-800 dark:text-amber-200 mb-2">
                            Ad Space
                          </div>
                          <div className="text-sm text-amber-600 dark:text-amber-300">
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
                <Info className="h-5 w-5 text-amber-600" />
                About Tile Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Our Tile Calculator helps you determine the exact number of tiles needed for your flooring project. 
                Whether you're tiling a bathroom, kitchen, or entire home, this tool provides accurate calculations 
                including wastage allowance and cost estimates.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Room area calculation</li>
                    <li>• Tile quantity estimation</li>
                    <li>• Wastage allowance</li>
                    <li>• Cost calculation</li>
                    <li>• Grout estimation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Common Tile Sizes:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• 12×12" - Standard ceramic</li>
                    <li>• 18×18" - Large format</li>
                    <li>• 24×24" - Porcelain</li>
                    <li>• 6×24" - Plank tiles</li>
                    <li>• 12×24" - Rectangular</li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">💡 Tips:</h4>
                <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-1">
                  <li>• Include 10-15% wastage for cuts and breakage</li>
                  <li>• Consider tile pattern when calculating</li>
                  <li>• Buy extra tiles for future repairs</li>
                  <li>• Factor in grout and adhesive costs</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default TileCalculator 