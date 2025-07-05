"use client"

import { useState } from "react"

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState("")
  const [tipPercent, setTipPercent] = useState("15")
  const [numPeople, setNumPeople] = useState("1")
  const [result, setResult] = useState(null)

  const calculate = () => {
    const bill = parseFloat(billAmount)
    const tip = parseFloat(tipPercent)
    const people = parseInt(numPeople)
    
    if (!bill || !tip || !people) return setResult(null)
    
    const tipAmount = (bill * tip) / 100
    const totalAmount = bill + tipAmount
    const tipPerPerson = tipAmount / people
    const totalPerPerson = totalAmount / people
    
    setResult({
      bill: bill,
      tipAmount: tipAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      tipPerPerson: tipPerPerson.toFixed(2),
      totalPerPerson: totalPerPerson.toFixed(2)
    })
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Tip Calculator</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ marginBottom: 15 }}>
          <label>Bill Amount ($): </label>
          <input type="number" value={billAmount} onChange={e => setBillAmount(e.target.value)} style={{ marginLeft: 10, width: 120 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Tip Percentage: </label>
          <select value={tipPercent} onChange={e => setTipPercent(e.target.value)} style={{ marginLeft: 10, width: 100 }}>
            <option value="10">10%</option>
            <option value="15">15%</option>
            <option value="18">18%</option>
            <option value="20">20%</option>
            <option value="25">25%</option>
          </select>
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Number of People: </label>
          <input type="number" value={numPeople} onChange={e => setNumPeople(e.target.value)} style={{ marginLeft: 10, width: 80 }} min="1" />
        </div>
        <button onClick={calculate} style={{ background: "#ff9800", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Calculate Tip</button>
        {result && (
          <div style={{ marginTop: 20 }}>
            <div style={{ marginBottom: 10 }}>
              <strong>Bill Amount:</strong> ${result.bill}
            </div>
            <div style={{ marginBottom: 10 }}>
              <strong>Tip Amount:</strong> ${result.tipAmount}
            </div>
            <div style={{ marginBottom: 10 }}>
              <strong>Total Amount:</strong> ${result.totalAmount}
            </div>
            <div style={{ marginBottom: 10, fontSize: 18 }}>
              <strong>Tip per Person:</strong> ${result.tipPerPerson}
            </div>
            <div style={{ marginBottom: 10, fontSize: 18 }}>
              <strong>Total per Person:</strong> ${result.totalPerPerson}
            </div>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Tip Calculator</h2>
        <p>
          The Tip Calculator helps you calculate tip amounts and split bills among multiple people. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 