"use client"

import { useState } from "react"

export default function GSTCalculator() {
  const [amount, setAmount] = useState("")
  const [rate, setRate] = useState("18")
  const [result, setResult] = useState(null)

  const calculate = () => {
    const amt = parseFloat(amount)
    const gstRate = parseFloat(rate)
    if (!amt || !gstRate) return setResult(null)
    
    const gstAmount = (amt * gstRate) / 100
    const totalAmount = amt + gstAmount
    
    setResult({
      original: amt,
      gstAmount: gstAmount.toFixed(2),
      total: totalAmount.toFixed(2)
    })
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>GST Calculator</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ marginBottom: 15 }}>
          <label>Amount (₹): </label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} style={{ marginLeft: 10, width: 120 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>GST Rate (%): </label>
          <select value={rate} onChange={e => setRate(e.target.value)} style={{ marginLeft: 10, width: 100 }}>
            <option value="5">5%</option>
            <option value="12">12%</option>
            <option value="18">18%</option>
            <option value="28">28%</option>
          </select>
        </div>
        <button onClick={calculate} style={{ background: "#ff5722", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Calculate GST</button>
        {result && (
          <div style={{ marginTop: 20 }}>
            <div style={{ marginBottom: 10 }}>
              <strong>Original Amount:</strong> ₹{result.original}
            </div>
            <div style={{ marginBottom: 10 }}>
              <strong>GST Amount:</strong> ₹{result.gstAmount}
            </div>
            <div style={{ marginBottom: 10, fontSize: 18 }}>
              <strong>Total Amount:</strong> ₹{result.total}
            </div>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About GST Calculator</h2>
        <p>
          The GST Calculator helps you calculate Goods and Services Tax on your purchases. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 