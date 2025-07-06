"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, RefreshCw, TrendingUp } from "lucide-react"

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("1")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [result, setResult] = useState(null)
  const [rates, setRates] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const currencies = {
    USD: { name: "US Dollar", symbol: "$" },
    EUR: { name: "Euro", symbol: "€" },
    GBP: { name: "British Pound", symbol: "£" },
    JPY: { name: "Japanese Yen", symbol: "¥" },
    CAD: { name: "Canadian Dollar", symbol: "C$" },
    AUD: { name: "Australian Dollar", symbol: "A$" },
    CHF: { name: "Swiss Franc", symbol: "CHF" },
    CNY: { name: "Chinese Yuan", symbol: "¥" },
    INR: { name: "Indian Rupee", symbol: "₹" },
    BRL: { name: "Brazilian Real", symbol: "R$" },
    MXN: { name: "Mexican Peso", symbol: "$" },
    KRW: { name: "South Korean Won", symbol: "₩" },
    RUB: { name: "Russian Ruble", symbol: "₽" },
    ZAR: { name: "South African Rand", symbol: "R" },
    SEK: { name: "Swedish Krona", symbol: "kr" },
    NOK: { name: "Norwegian Krone", symbol: "kr" },
    DKK: { name: "Danish Krone", symbol: "kr" },
    PLN: { name: "Polish Złoty", symbol: "zł" },
    CZK: { name: "Czech Koruna", symbol: "Kč" },
    HUF: { name: "Hungarian Forint", symbol: "Ft" }
  }

  useEffect(() => {
    fetchExchangeRates()
  }, [])

  const fetchExchangeRates = async () => {
    setLoading(true)
    setError("")
    try {
      // Using a free API (you might want to use a paid service for production)
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      const data = await response.json()
      setRates(data.rates)
      convertCurrency()
    } catch (err) {
      setError("Failed to fetch exchange rates. Please try again.")
      // Fallback rates for demo
      setRates({
        EUR: 0.85, GBP: 0.73, JPY: 110.0, CAD: 1.25, AUD: 1.35,
        CHF: 0.92, CNY: 6.45, INR: 74.5, BRL: 5.2, MXN: 20.0,
        KRW: 1150, RUB: 75.0, ZAR: 14.5, SEK: 8.5, NOK: 8.8,
        DKK: 6.2, PLN: 3.8, CZK: 21.5, HUF: 300
      })
    } finally {
      setLoading(false)
    }
  }

  const convertCurrency = () => {
    if (!amount || !rates[toCurrency]) return
    
    const numAmount = parseFloat(amount)
    const rate = rates[toCurrency]
    const converted = numAmount * rate
    setResult({
      amount: numAmount,
      converted: converted,
      rate: rate
    })
  }

  useEffect(() => {
    if (rates[toCurrency]) {
      convertCurrency()
    }
  }, [amount, fromCurrency, toCurrency, rates])

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const formatCurrency = (value, currency) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Currency Converter
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Convert between 20+ world currencies with real-time exchange rates
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Calculator */}
            <div className="lg:col-span-3">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Currency Conversion
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Amount Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Amount
                      </label>
                      <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="text-lg"
                        min="0"
                        step="0.01"
                      />
                    </div>

                    {/* Currency Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          From Currency
                        </label>
                        <Select value={fromCurrency} onValueChange={setFromCurrency}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(currencies).map(([code, info]) => (
                              <SelectItem key={code} value={code}>
                                {code} - {info.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-end">
                        <Button
                          onClick={swapCurrencies}
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Swap
                        </Button>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          To Currency
                        </label>
                        <Select value={toCurrency} onValueChange={setToCurrency}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(currencies).map(([code, info]) => (
                              <SelectItem key={code} value={code}>
                                {code} - {info.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-end">
                        <Button
                          onClick={fetchExchangeRates}
                          disabled={loading}
                          className="w-full"
                        >
                          {loading ? (
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <RefreshCw className="h-4 w-4 mr-2" />
                          )}
                          Update Rates
                        </Button>
                      </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    {/* Result */}
                    {result && (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {formatCurrency(result.amount, fromCurrency)} = {formatCurrency(result.converted, toCurrency)}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Exchange Rate: 1 {fromCurrency} = {result.rate.toFixed(4)} {toCurrency}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Ad Banner */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-full h-64 bg-gradient-to-br from-blue-200 to-indigo-300 dark:from-blue-800 dark:to-indigo-700 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-2">
                            Ad Space
                          </div>
                          <div className="text-sm text-blue-600 dark:text-blue-300">
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
                <Info className="h-5 w-5 text-blue-600" />
                About Currency Converter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Our Currency Converter provides real-time exchange rates for over 20 major world currencies. 
                Whether you're planning a trip, making international purchases, or tracking currency markets, 
                this tool helps you get accurate conversion rates instantly.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Real-time exchange rates</li>
                    <li>• 20+ major currencies</li>
                    <li>• Easy currency swapping</li>
                    <li>• Mobile-friendly design</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Popular Conversions:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• USD to EUR (Euro)</li>
                    <li>• GBP to USD (Dollar)</li>
                    <li>• JPY to CNY (Yuan)</li>
                    <li>• CAD to AUD (Australian Dollar)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Tips:</h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Exchange rates update automatically</li>
                  <li>• Use the swap button to quickly reverse currencies</li>
                  <li>• Rates are approximate and may vary by provider</li>
                  <li>• Check with your bank for actual conversion rates</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CurrencyConverter 