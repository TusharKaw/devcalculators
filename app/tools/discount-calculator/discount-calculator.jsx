"use client"

import { useState } from "react"

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState("")
  const [discountPercent, setDiscountPercent] = useState("")
  const [result, setResult] = useState(null)

  const calculate = () => {
    const original = parseFloat(originalPrice)
    const discount = parseFloat(discountPercent)
    if (!original || !discount) return setResult(null)
    
    const savings = (original * discount) / 100
    const finalPrice = original - savings
    
    setResult({
      original: original,
      discount: discount,
      savings: savings.toFixed(2),
      finalPrice: finalPrice.toFixed(2)
    })
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Discount Calculator</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ marginBottom: 15 }}>
          <label>Original Price ($): </label>
          <input type="number" value={originalPrice} onChange={e => setOriginalPrice(e.target.value)} style={{ marginLeft: 10, width: 120 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Discount (%): </label>
          <input type="number" value={discountPercent} onChange={e => setDiscountPercent(e.target.value)} style={{ marginLeft: 10, width: 80 }} min="0" max="100" />
        </div>
        <button onClick={calculate} style={{ background: "#4caf50", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Calculate</button>
        {result && (
          <div style={{ marginTop: 20 }}>
            <div style={{ marginBottom: 10 }}>
              <strong>Original Price:</strong> ${result.original}
            </div>
            <div style={{ marginBottom: 10 }}>
              <strong>Discount:</strong> {result.discount}%
            </div>
            <div style={{ marginBottom: 10, color: "#4caf50" }}>
              <strong>You Save:</strong> ${result.savings}
            </div>
            <div style={{ marginBottom: 10, fontSize: 18 }}>
              <strong>Final Price:</strong> ${result.finalPrice}
            </div>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Discount Calculator</h2>
        <p>
          The Discount Calculator helps you calculate the final price after applying a discount. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 