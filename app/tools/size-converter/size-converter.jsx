"use client"

import { useState } from "react"

const units = {
  length: {
    meters: 1,
    kilometers: 1000,
    centimeters: 0.01,
    millimeters: 0.001,
    miles: 1609.34,
    yards: 0.9144,
    feet: 0.3048,
    inches: 0.0254
  },
  area: {
    "square meters": 1,
    "square kilometers": 1000000,
    "square centimeters": 0.0001,
    "square miles": 2589988.11,
    "square yards": 0.836127,
    "square feet": 0.092903,
    "square inches": 0.00064516,
    acres: 4046.86,
    hectares: 10000
  },
  volume: {
    "cubic meters": 1,
    liters: 0.001,
    milliliters: 0.000001,
    gallons: 0.00378541,
    "cubic feet": 0.0283168,
    "cubic inches": 0.0000163871
  }
}

export default function SizeConverter() {
  const [category, setCategory] = useState("length")
  const [fromUnit, setFromUnit] = useState("meters")
  const [toUnit, setToUnit] = useState("feet")
  const [value, setValue] = useState("")
  const [result, setResult] = useState(null)

  const convert = () => {
    const inputValue = parseFloat(value)
    if (!inputValue) return setResult(null)
    
    const categoryUnits = units[category]
    const fromFactor = categoryUnits[fromUnit]
    const toFactor = categoryUnits[toUnit]
    
    if (!fromFactor || !toFactor) return setResult(null)
    
    const baseValue = inputValue * fromFactor
    const convertedValue = baseValue / toFactor
    
    setResult({
      original: inputValue,
      converted: convertedValue.toFixed(6),
      fromUnit: fromUnit,
      toUnit: toUnit
    })
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Size Converter</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ marginBottom: 15 }}>
          <label>Category: </label>
          <select value={category} onChange={e => setCategory(e.target.value)} style={{ marginLeft: 10, width: 150 }}>
            <option value="length">Length</option>
            <option value="area">Area</option>
            <option value="volume">Volume</option>
          </select>
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Value: </label>
          <input type="number" value={value} onChange={e => setValue(e.target.value)} style={{ marginLeft: 10, width: 120 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>From: </label>
          <select value={fromUnit} onChange={e => setFromUnit(e.target.value)} style={{ marginLeft: 10, width: 150 }}>
            {Object.keys(units[category]).map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>To: </label>
          <select value={toUnit} onChange={e => setToUnit(e.target.value)} style={{ marginLeft: 10, width: 150 }}>
            {Object.keys(units[category]).map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
        <button onClick={convert} style={{ background: "#607d8b", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Convert</button>
        {result && (
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <div style={{ fontSize: 18 }}>
              <strong>{result.original} {result.fromUnit}</strong> = <strong>{result.converted} {result.toUnit}</strong>
            </div>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Size Converter</h2>
        <p>
          The Size Converter helps you convert between different units of length, area, and volume. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 