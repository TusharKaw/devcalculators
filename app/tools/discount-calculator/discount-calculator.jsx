"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, Calculator, Percent, DollarSign, TrendingDown } from "lucide-react"

const DiscountCalculator = () => {
  const [originalPrice, setOriginalPrice] = useState("100")
  const [discountPercentage, setDiscountPercentage] = useState("20")
  const [calculationType, setCalculationType] = useState("percentage") // 'percentage' or 'amount'
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")

  const calculateDiscount = () => {
    const price = parseFloat(originalPrice)
    const discount = parseFloat(discountPercentage)

    if (isNaN(price) || price <= 0) {
      setError("Please enter a valid positive original price")
      return
    }

    if (isNaN(discount) || discount < 0) {
      setError("Please enter a valid discount value")
      return
    }

    try {
      let discountAmount, finalPrice, savingsPercentage

      if (calculationType === "percentage") {
        if (discount > 100) {
          setError("Discount percentage cannot exceed 100%")
          return
        }
        discountAmount = (price * discount) / 100
        finalPrice = price - discountAmount
        savingsPercentage = discount
      } else {
        if (discount > price) {
          setError("Discount amount cannot exceed original price")
          return
        }
        discountAmount = discount
        finalPrice = price - discountAmount
        savingsPercentage = (discountAmount / price) * 100
      }

      setResult({
        originalPrice: price,
        discountAmount: discountAmount,
        finalPrice: finalPrice,
        savingsPercentage: savingsPercentage,
        type: calculationType
      })
      setError("")
    } catch (err) {
      setError("Error calculating discount. Please check your inputs.")
    }
  }

  useEffect(() => {
    if (originalPrice && discountPercentage) {
      calculateDiscount()
    }
  }, [originalPrice, discountPercentage, calculationType])

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  const clearAll = () => {
    setOriginalPrice("100")
    setDiscountPercentage("20")
    setCalculationType("percentage")
    setResult(null)
    setError("")
  }

  const setPresetDiscount = (percentage) => {
    setDiscountPercentage(percentage.toString())
    setCalculationType("percentage")
  }

  const setPresetPrice = (price) => {
    setOriginalPrice(price.toString())
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Discount Calculator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Calculate discounts, savings, and final prices with ease
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Calculator */}
            <div className="lg:col-span-3">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5" />
                    Discount Calculation
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Calculation Type */}
                    <div className="flex justify-center">
                      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                        <Button
                          variant={calculationType === "percentage" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setCalculationType("percentage")}
                          className="rounded-md"
                        >
                          <Percent className="h-4 w-4 mr-2" />
                          Percentage
                        </Button>
                        <Button
                          variant={calculationType === "amount" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setCalculationType("amount")}
                          className="rounded-md"
                        >
                          <DollarSign className="h-4 w-4 mr-2" />
                          Amount
                        </Button>
                      </div>
                    </div>

                    {/* Input Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="originalPrice" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Original Price ($)
                        </Label>
                        <Input
                          id="originalPrice"
                          type="number"
                          value={originalPrice}
                          onChange={(e) => setOriginalPrice(e.target.value)}
                          placeholder="Enter original price"
                          className="mt-2"
                          min="0"
                          step="0.01"
                        />
                      </div>

                      <div>
                        <Label htmlFor="discount" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {calculationType === "percentage" ? "Discount Percentage (%)" : "Discount Amount ($)"}
                        </Label>
                        <Input
                          id="discount"
                          type="number"
                          value={discountPercentage}
                          onChange={(e) => setDiscountPercentage(e.target.value)}
                          placeholder={calculationType === "percentage" ? "Enter percentage" : "Enter amount"}
                          className="mt-2"
                          min="0"
                          max={calculationType === "percentage" ? "100" : undefined}
                          step={calculationType === "percentage" ? "0.1" : "0.01"}
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-center">
                      <Button onClick={calculateDiscount} className="px-8">
                        <Calculator className="h-4 w-4 mr-2" />
                        Calculate Discount
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
                      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 p-6 rounded-lg border border-teal-200 dark:border-teal-800">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Discount Calculation Result
                          </h3>
                          <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                            {formatCurrency(result.finalPrice)}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Final Price After Discount
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Original Price:</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {formatCurrency(result.originalPrice)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Discount Amount:</span>
                              <span className="font-semibold text-red-600 dark:text-red-400">
                                -{formatCurrency(result.discountAmount)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Savings Percentage:</span>
                              <span className="font-semibold text-green-600 dark:text-green-400">
                                {result.savingsPercentage.toFixed(1)}%
                              </span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Final Price:</span>
                              <span className="font-semibold text-teal-600 dark:text-teal-400">
                                {formatCurrency(result.finalPrice)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Total Savings:</span>
                              <span className="font-semibold text-green-600 dark:text-green-400">
                                {formatCurrency(result.discountAmount)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Calculation Type:</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {calculationType === "percentage" ? "Percentage Discount" : "Amount Discount"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Summary Cards */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                                {formatCurrency(result.finalPrice)}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Final Price</div>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {formatCurrency(result.discountAmount)}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">You Save</div>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                                {result.savingsPercentage.toFixed(1)}%
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Discount</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Quick Discounts */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quick Discounts</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                        {[5, 10, 15, 20, 25, 50].map((percentage) => (
                          <Button
                            key={percentage}
                            variant="outline"
                            onClick={() => setPresetDiscount(percentage)}
                            className="justify-center"
                          >
                            {percentage}%
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Quick Prices */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quick Prices</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                        {[10, 25, 50, 100, 200, 500].map((price) => (
                          <Button
                            key={price}
                            variant="outline"
                            onClick={() => setPresetPrice(price)}
                            className="justify-center"
                          >
                            ${price}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Common Scenarios */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Common Scenarios</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[
                          { price: 100, discount: 20, label: "20% off $100" },
                          { price: 50, discount: 10, label: "10% off $50" },
                          { price: 200, discount: 25, label: "25% off $200" },
                          { price: 75, discount: 15, label: "15% off $75" },
                          { price: 150, discount: 30, label: "30% off $150" },
                          { price: 300, discount: 40, label: "40% off $300" }
                        ].map((scenario, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            onClick={() => {
                              setOriginalPrice(scenario.price.toString())
                              setDiscountPercentage(scenario.discount.toString())
                              setCalculationType("percentage")
                            }}
                            className="justify-start h-auto p-3"
                          >
                            <div className="text-left">
                              <div className="font-medium">{scenario.label}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                Final: ${(scenario.price * (1 - scenario.discount / 100)).toFixed(2)}
                              </div>
                            </div>
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
                <Card className="shadow-lg border-0 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-full h-64 bg-gradient-to-br from-teal-200 to-cyan-300 dark:from-teal-800 dark:to-cyan-700 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-teal-800 dark:text-teal-200 mb-2">
                            Ad Space
                          </div>
                          <div className="text-sm text-teal-600 dark:text-teal-300">
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
                <Info className="h-5 w-5 text-teal-600" />
                About Discount Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Our Discount Calculator helps you calculate discounts, savings, and final prices. 
                Whether you're shopping online, planning a sale, or comparing prices, this tool provides 
                accurate calculations for both percentage and amount-based discounts.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Calculation Types:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Percentage Discount - Calculate by discount %</li>
                    <li>• Amount Discount - Calculate by discount amount</li>
                    <li>• Automatic savings calculation</li>
                    <li>• Final price determination</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Real-time calculations</li>
                    <li>• Multiple discount formats</li>
                    <li>• Quick preset options</li>
                    <li>• Detailed breakdown</li>
                    <li>• Mobile-friendly design</li>
                  </ul>
                </div>
              </div>

              <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-teal-900 dark:text-teal-100 mb-2">💡 Tips:</h4>
                <ul className="text-sm text-teal-800 dark:text-teal-200 space-y-1">
                  <li>• Use percentage for sales and promotions</li>
                  <li>• Use amount for fixed dollar discounts</li>
                  <li>• Compare multiple discount scenarios</li>
                  <li>• Check if discounts stack or are exclusive</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DiscountCalculator 