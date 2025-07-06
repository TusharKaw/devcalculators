"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, RefreshCw, TrendingUp, Bitcoin } from "lucide-react"

const CryptoConverter = () => {
  const [amount, setAmount] = useState("1")
  const [fromCrypto, setFromCrypto] = useState("BTC")
  const [toCurrency, setToCurrency] = useState("USD")
  const [result, setResult] = useState(null)
  const [rates, setRates] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const cryptocurrencies = {
    BTC: { name: "Bitcoin", symbol: "₿" },
    ETH: { name: "Ethereum", symbol: "Ξ" },
    USDT: { name: "Tether", symbol: "₮" },
    BNB: { name: "BNB", symbol: "BNB" },
    SOL: { name: "Solana", symbol: "◎" },
    ADA: { name: "Cardano", symbol: "₳" },
    XRP: { name: "Ripple", symbol: "XRP" },
    DOT: { name: "Polkadot", symbol: "DOT" },
    DOGE: { name: "Dogecoin", symbol: "Ð" },
    AVAX: { name: "Avalanche", symbol: "AVAX" },
    MATIC: { name: "Polygon", symbol: "MATIC" },
    LINK: { name: "Chainlink", symbol: "LINK" },
    UNI: { name: "Uniswap", symbol: "UNI" },
    LTC: { name: "Litecoin", symbol: "Ł" },
    BCH: { name: "Bitcoin Cash", symbol: "BCH" }
  }

  const fiatCurrencies = {
    USD: { name: "US Dollar", symbol: "$" },
    EUR: { name: "Euro", symbol: "€" },
    GBP: { name: "British Pound", symbol: "£" },
    JPY: { name: "Japanese Yen", symbol: "¥" },
    CAD: { name: "Canadian Dollar", symbol: "C$" },
    AUD: { name: "Australian Dollar", symbol: "A$" },
    CHF: { name: "Swiss Franc", symbol: "CHF" },
    CNY: { name: "Chinese Yuan", symbol: "¥" },
    INR: { name: "Indian Rupee", symbol: "₹" },
    BRL: { name: "Brazilian Real", symbol: "R$" }
  }

  useEffect(() => {
    fetchCryptoRates()
  }, [])

  const fetchCryptoRates = async () => {
    setLoading(true)
    setError("")
    try {
      // Using CoinGecko API (free tier)
      const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${getCoinGeckoId(fromCrypto)}&vs_currencies=${toCurrency.toLowerCase()}`)
      const data = await response.json()
      const rate = data[getCoinGeckoId(fromCrypto)][toCurrency.toLowerCase()]
      setRates({ [toCurrency]: rate })
      convertCrypto()
    } catch (err) {
      setError("Failed to fetch crypto rates. Using demo rates.")
      // Fallback rates for demo
      const demoRates = {
        USD: { BTC: 45000, ETH: 3000, USDT: 1, BNB: 400, SOL: 100, ADA: 0.5, XRP: 0.8, DOT: 20, DOGE: 0.15, AVAX: 80, MATIC: 1.5, LINK: 15, UNI: 25, LTC: 150, BCH: 300 },
        EUR: { BTC: 38000, ETH: 2500, USDT: 0.85, BNB: 340, SOL: 85, ADA: 0.42, XRP: 0.68, DOT: 17, DOGE: 0.13, AVAX: 68, MATIC: 1.28, LINK: 12.75, UNI: 21.25, LTC: 127.5, BCH: 255 },
        GBP: { BTC: 33000, ETH: 2200, USDT: 0.73, BNB: 292, SOL: 73, ADA: 0.36, XRP: 0.58, DOT: 14.6, DOGE: 0.11, AVAX: 58.4, MATIC: 1.1, LINK: 10.95, UNI: 18.25, LTC: 109.5, BCH: 219 }
      }
      setRates({ [toCurrency]: demoRates[toCurrency]?.[fromCrypto] || 1 })
    } finally {
      setLoading(false)
    }
  }

  const getCoinGeckoId = (symbol) => {
    const mapping = {
      BTC: "bitcoin",
      ETH: "ethereum",
      USDT: "tether",
      BNB: "binancecoin",
      SOL: "solana",
      ADA: "cardano",
      XRP: "ripple",
      DOT: "polkadot",
      DOGE: "dogecoin",
      AVAX: "avalanche-2",
      MATIC: "matic-network",
      LINK: "chainlink",
      UNI: "uniswap",
      LTC: "litecoin",
      BCH: "bitcoin-cash"
    }
    return mapping[symbol] || "bitcoin"
  }

  const convertCrypto = () => {
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
      convertCrypto()
    }
  }, [amount, fromCrypto, toCurrency, rates])

  const formatCurrency = (value, currency) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  const formatCrypto = (value, crypto) => {
    const decimals = value < 0.01 ? 8 : value < 1 ? 4 : 2
    return `${parseFloat(value).toFixed(decimals)} ${crypto}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Crypto Converter
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Convert between cryptocurrencies and fiat currencies with real-time rates
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Calculator */}
            <div className="lg:col-span-3">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Bitcoin className="h-5 w-5" />
                    Crypto Conversion
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
                        step="0.00000001"
                      />
                    </div>

                    {/* Currency Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          From Cryptocurrency
                        </label>
                        <Select value={fromCrypto} onValueChange={setFromCrypto}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(cryptocurrencies).map(([code, info]) => (
                              <SelectItem key={code} value={code}>
                                {code} - {info.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                            {Object.entries(fiatCurrencies).map(([code, info]) => (
                              <SelectItem key={code} value={code}>
                                {code} - {info.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Update Button */}
                    <div className="flex justify-center">
                      <Button
                        onClick={fetchCryptoRates}
                        disabled={loading}
                        className="px-8"
                      >
                        {loading ? (
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4 mr-2" />
                        )}
                        Update Rates
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
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {formatCrypto(result.amount, fromCrypto)} = {formatCurrency(result.converted, toCurrency)}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Rate: 1 {fromCrypto} = {formatCurrency(result.rate, toCurrency)}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Popular Conversions */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Popular Conversions</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[
                          { from: "BTC", to: "USD", amount: "1" },
                          { from: "ETH", to: "USD", amount: "1" },
                          { from: "BTC", to: "EUR", amount: "1" },
                          { from: "SOL", to: "USD", amount: "10" },
                          { from: "ADA", to: "USD", amount: "1000" },
                          { from: "DOGE", to: "USD", amount: "10000" }
                        ].map((conversion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            onClick={() => {
                              setFromCrypto(conversion.from)
                              setToCurrency(conversion.to)
                              setAmount(conversion.amount)
                            }}
                            className="justify-start"
                          >
                            {conversion.amount} {conversion.from} → {conversion.to}
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
                <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-full h-64 bg-gradient-to-br from-purple-200 to-indigo-300 dark:from-purple-800 dark:to-indigo-700 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-2">
                            Ad Space
                          </div>
                          <div className="text-sm text-purple-600 dark:text-purple-300">
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
                <Info className="h-5 w-5 text-purple-600" />
                About Crypto Converter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Our Crypto Converter provides real-time conversion rates between major cryptocurrencies and fiat currencies. 
                Track the value of your digital assets, plan investments, or simply stay updated with current crypto prices 
                using our reliable and easy-to-use converter.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Supported Cryptocurrencies:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Bitcoin (BTC)</li>
                    <li>• Ethereum (ETH)</li>
                    <li>• Tether (USDT)</li>
                    <li>• BNB (BNB)</li>
                    <li>• Solana (SOL)</li>
                    <li>• Cardano (ADA)</li>
                    <li>• And 8 more...</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Real-time price updates</li>
                    <li>• 15+ major cryptocurrencies</li>
                    <li>• 10+ fiat currencies</li>
                    <li>• High precision calculations</li>
                    <li>• Mobile-friendly interface</li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">⚠️ Important Notes:</h4>
                <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                  <li>• Crypto prices are highly volatile</li>
                  <li>• Rates update every few minutes</li>
                  <li>• Always verify rates before trading</li>
                  <li>• Consider transaction fees in conversions</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CryptoConverter 