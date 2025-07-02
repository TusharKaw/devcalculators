"use client"

import { useState } from "react"

const categories = {
  length: [
    { label: "Meters", value: "m" },
    { label: "Feet", value: "ft" },
    { label: "Inches", value: "in" },
    { label: "Kilometers", value: "km" },
    { label: "Miles", value: "mi" },
  ],
  weight: [
    { label: "Kilograms", value: "kg" },
    { label: "Pounds", value: "lb" },
    { label: "Ounces", value: "oz" },
    { label: "Grams", value: "g" },
  ],
  temperature: [
    { label: "Celsius", value: "C" },
    { label: "Fahrenheit", value: "F" },
    { label: "Kelvin", value: "K" },
  ],
}

function convert(value, from, to, category) {
  value = parseFloat(value)
  if (isNaN(value)) return ""
  if (category === "length") {
    // convert to meters first
    let meters = value
    if (from === "ft") meters = value * 0.3048
    else if (from === "in") meters = value * 0.0254
    else if (from === "km") meters = value * 1000
    else if (from === "mi") meters = value * 1609.34
    // convert meters to target
    if (to === "m") return meters
    if (to === "ft") return meters / 0.3048
    if (to === "in") return meters / 0.0254
    if (to === "km") return meters / 1000
    if (to === "mi") return meters / 1609.34
  }
  if (category === "weight") {
    // convert to kg first
    let kg = value
    if (from === "lb") kg = value * 0.453592
    else if (from === "oz") kg = value * 0.0283495
    else if (from === "g") kg = value / 1000
    // convert kg to target
    if (to === "kg") return kg
    if (to === "lb") return kg / 0.453592
    if (to === "oz") return kg / 0.0283495
    if (to === "g") return kg * 1000
  }
  if (category === "temperature") {
    if (from === to) return value
    if (from === "C") {
      if (to === "F") return value * 9/5 + 32
      if (to === "K") return value + 273.15
    }
    if (from === "F") {
      if (to === "C") return (value - 32) * 5/9
      if (to === "K") return (value - 32) * 5/9 + 273.15
    }
    if (from === "K") {
      if (to === "C") return value - 273.15
      if (to === "F") return (value - 273.15) * 9/5 + 32
    }
  }
  return ""
}

export default function ConversionCalculator() {
  const [category, setCategory] = useState("length")
  const [value, setValue] = useState("")
  const [from, setFrom] = useState("m")
  const [to, setTo] = useState("ft")
  const [result, setResult] = useState("")

  const handleCategory = e => {
    const cat = e.target.value
    setCategory(cat)
    setFrom(categories[cat][0].value)
    setTo(categories[cat][1].value)
    setValue("")
    setResult("")
  }

  const handleConvert = () => {
    const res = convert(value, from, to, category)
    setResult(res === "" ? "" : parseFloat(res).toFixed(4))
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Conversion Calculator</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <label>Category: </label>
          <select value={category} onChange={handleCategory} style={{ marginLeft: 10 }}>
            {Object.keys(categories).map(cat => <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Value: </label>
          <input type="number" value={value} onChange={e => setValue(e.target.value)} style={{ marginLeft: 10, width: 100 }} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>From: </label>
          <select value={from} onChange={e => setFrom(e.target.value)} style={{ marginLeft: 10 }}>
            {categories[category].map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
          <label style={{ marginLeft: 15 }}>To: </label>
          <select value={to} onChange={e => setTo(e.target.value)} style={{ marginLeft: 10 }}>
            {categories[category].map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
        <button onClick={handleConvert} style={{ background: "#009688", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Convert</button>
        {result !== "" && (
          <div style={{ marginTop: 20, fontSize: 18 }}>
            <strong>Result: {result} {to}</strong>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Conversion Calculator</h2>
        <p>
          The Conversion Calculator helps you convert between units of length, weight, and temperature. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 