"use client"

import { useState } from "react"

function parseFraction(str) {
  const [num, den] = str.split("/").map(Number)
  return { num, den }
}
function gcd(a, b) {
  return b ? gcd(b, a % b) : a
}
function simplify(num, den) {
  const g = gcd(Math.abs(num), Math.abs(den))
  return { num: num / g, den: den / g }
}

export default function FractionCalculator() {
  const [f1, setF1] = useState("")
  const [f2, setF2] = useState("")
  const [op, setOp] = useState("+")
  const [result, setResult] = useState(null)

  const calculate = () => {
    try {
      const a = parseFraction(f1)
      const b = parseFraction(f2)
      let num, den
      if (op === "+") {
        num = a.num * b.den + b.num * a.den
        den = a.den * b.den
      } else if (op === "-") {
        num = a.num * b.den - b.num * a.den
        den = a.den * b.den
      } else if (op === "*") {
        num = a.num * b.num
        den = a.den * b.den
      } else {
        num = a.num * b.den
        den = a.den * b.num
      }
      const simp = simplify(num, den)
      setResult(`${simp.num}/${simp.den}`)
    } catch {
      setResult("Error")
    }
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Fraction Calculator</h1>
      <div style={{ background: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: "20px" }}>
        <div style={{ marginBottom: 15 }}>
          <label>Fraction 1: </label>
          <input type="text" value={f1} onChange={e => setF1(e.target.value)} placeholder="e.g. 1/2" style={{ marginLeft: 10, width: 80 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Operation: </label>
          <select value={op} onChange={e => setOp(e.target.value)} style={{ marginLeft: 10 }}>
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
          </select>
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Fraction 2: </label>
          <input type="text" value={f2} onChange={e => setF2(e.target.value)} placeholder="e.g. 3/4" style={{ marginLeft: 10, width: 80 }} />
        </div>
        <button onClick={calculate} style={{ background: "#28a745", color: "white", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", fontSize: "16px" }}>Calculate</button>
        {result && (
          <div style={{ marginTop: 20, fontSize: 18 }}>
            <strong>Result: {result}</strong>
          </div>
        )}
      </div>
      <div style={{ marginTop: "30px", background: "white", padding: "20px", borderRadius: "8px" }}>
        <h2>About Fraction Calculator</h2>
        <p>
          The Fraction Calculator lets you add, subtract, multiply, and divide fractions. Useful for math homework and more. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 