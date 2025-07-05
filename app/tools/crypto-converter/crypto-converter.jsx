"use client"

import { useState } from "react"

const cryptos = [
  { code: "BTC", name: "Bitcoin" },
  { code: "ETH", name: "Ethereum" },
  { code: "USDT", name: "Tether" },
  { code: "BNB", name: "Binance Coin" },
  { code: "ADA", name: "Cardano" },
  { code: "SOL", name: "Solana" },
  { code: "DOT", name: "Polkadot" },
  { code: "DOGE", name: "Dogecoin" }
]

const fiatCurrencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "CAD", name: "Canadian Dollar" }
]

// Mock prices (in real app, these would come from an API)
const mockPrices = {
  BTC: 45000,
  ETH: 3200,
  USDT: 1,
  BNB: 380,
  ADA: 1.2,
  SOL: 140,
  DOT: 18,
  DOGE: 0.15,
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110.5,
  CAD: 1.25
}

export default function CryptoConverter() {
  const [amount, setAmount] = useState("")
  const [fromAsset, setFromAsset] = useState("BTC")
  const [toAsset, setToAsset] = useState("USD")
  const [result, setResult] = useState(null)

  const convert = () => {
    const amt = parseFloat(amount)
    if (!amt) return setResult(null)
    
    // Convert to USD first, then to target asset
    const usdAmount = amt * mockPrices[fromAsset]
    const convertedAmount = usdAmount / mockPrices[toAsset]
    setResult(convertedAmount.toFixed(6))
  }

  const allAssets = [...cryptos, ...fiatCurrencies]

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Crypto Converter</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ marginBottom: 15 }}>
          <label>Amount: </label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} style={{ marginLeft: 10, width: 120 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>From: </label>
          <select value={fromAsset} onChange={e => setFromAsset(e.target.value)} style={{ marginLeft: 10, width: 150 }}>
            {allAssets.map(asset => <option key={asset.code} value={asset.code}>{asset.code} - {asset.name}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>To: </label>
          <select value={toAsset} onChange={e => setToAsset(e.target.value)} style={{ marginLeft: 10, width: 150 }}>
            {allAssets.map(asset => <option key={asset.code} value={asset.code}>{asset.code} - {asset.name}</option>)}
          </select>
        </div>
        <button onClick={convert} style={{ background: "#ff9800", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Convert</button>
        {result && (
          <div style={{ marginTop: 20, fontSize: 18 }}>
            <strong>{amount} {fromAsset} = {result} {toAsset}</strong>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Crypto Converter</h2>
        <p>
          The Crypto Converter helps you convert between cryptocurrencies and fiat currencies using current market prices. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 