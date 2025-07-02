"use client"

import { useState } from "react"

export default function SalesTaxCalculator() {
  const [price, setPrice] = useState("")
  const [rate, setRate] = useState("")
  const [result, setResult] = useState(null)

  const calculate = () => {
    const p = parseFloat(price)
    const r = parseFloat(rate) / 100
    if (!p || !r) return setResult(null)
    const tax = p * r
    const total = p + tax
    setResult({ tax: tax.toFixed(2), total: total.toFixed(2) })
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Sales Tax Calculator</h1>
      <div style={{ background: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: "20px" }}>
        <div style={{ marginBottom: 15 }}>
          <label>Price ($): </label>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} style={{ marginLeft: 10, width: 120 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Tax Rate (%): </label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} style={{ marginLeft: 10, width: 80 }} />
        </div>
        <button onClick={calculate} style={{ background: "#28a745", color: "white", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", fontSize: "16px" }}>Calculate</button>
        {result && (
          <div style={{ marginTop: 20, fontSize: 18 }}>
            <div><strong>Tax: ${result.tax}</strong></div>
            <div><strong>Total Price: ${result.total}</strong></div>
          </div>
        )}
      </div>
      <div style={{ marginTop: "30px", background: "white", padding: "20px", borderRadius: "8px" }}>
        <h2>About Sales Tax Calculator</h2>
        <p>
          The Sales Tax Calculator helps you find the tax amount and total price for a given price and tax rate. Useful for shopping, business, and accounting. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 