"use client"

import { useState } from "react"

const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "INR", name: "Indian Rupee" },
  { code: "BRL", name: "Brazilian Real" }
]

// Mock exchange rates (in real app, these would come from an API)
const mockRates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110.5,
  CAD: 1.25,
  AUD: 1.35,
  CHF: 0.92,
  CNY: 6.45,
  INR: 74.5,
  BRL: 5.25
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [result, setResult] = useState(null)

  const convert = () => {
    const amt = parseFloat(amount)
    if (!amt) return setResult(null)
    
    // Convert to USD first, then to target currency
    const usdAmount = amt / mockRates[fromCurrency]
    const convertedAmount = usdAmount * mockRates[toCurrency]
    setResult(convertedAmount.toFixed(2))
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Currency Converter</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ marginBottom: 15 }}>
          <label>Amount: </label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} style={{ marginLeft: 10, width: 120 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>From: </label>
          <select value={fromCurrency} onChange={e => setFromCurrency(e.target.value)} style={{ marginLeft: 10, width: 150 }}>
            {currencies.map(curr => <option key={curr.code} value={curr.code}>{curr.code} - {curr.name}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>To: </label>
          <select value={toCurrency} onChange={e => setToCurrency(e.target.value)} style={{ marginLeft: 10, width: 150 }}>
            {currencies.map(curr => <option key={curr.code} value={curr.code}>{curr.code} - {curr.name}</option>)}
          </select>
        </div>
        <button onClick={convert} style={{ background: "#4caf50", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Convert</button>
        {result && (
          <div style={{ marginTop: 20, fontSize: 18 }}>
            <strong>{amount} {fromCurrency} = {result} {toCurrency}</strong>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Currency Converter</h2>
        <p>
          The Currency Converter helps you convert between different currencies using current exchange rates. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 