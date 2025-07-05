"use client"

import { useState } from "react"

function predictHeight(fatherHeight, motherHeight, gender) {
  if (gender === "male") {
    return (fatherHeight + motherHeight + 13) / 2
  } else {
    return (fatherHeight + motherHeight - 13) / 2
  }
}

export default function HeightCalculator() {
  const [fatherHeight, setFatherHeight] = useState("")
  const [motherHeight, setMotherHeight] = useState("")
  const [childGender, setChildGender] = useState("male")
  const [childAge, setChildAge] = useState("")
  const [result, setResult] = useState(null)

  const calculate = () => {
    const fHeight = parseFloat(fatherHeight)
    const mHeight = parseFloat(motherHeight)
    const age = parseInt(childAge)
    
    if (!fHeight || !mHeight || !age) return setResult(null)
    
    const predictedHeight = predictHeight(fHeight, mHeight, childGender)
    const range = predictedHeight * 0.1 // ±10% range
    
    setResult({
      predicted: predictedHeight.toFixed(1),
      min: (predictedHeight - range).toFixed(1),
      max: (predictedHeight + range).toFixed(1)
    })
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Height Calculator</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ marginBottom: 15 }}>
          <label>Father's Height (cm): </label>
          <input type="number" value={fatherHeight} onChange={e => setFatherHeight(e.target.value)} style={{ marginLeft: 10, width: 100 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Mother's Height (cm): </label>
          <input type="number" value={motherHeight} onChange={e => setMotherHeight(e.target.value)} style={{ marginLeft: 10, width: 100 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Child's Gender: </label>
          <select value={childGender} onChange={e => setChildGender(e.target.value)} style={{ marginLeft: 10 }}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Child's Age: </label>
          <input type="number" value={childAge} onChange={e => setChildAge(e.target.value)} style={{ marginLeft: 10, width: 80 }} min="0" max="18" />
        </div>
        <button onClick={calculate} style={{ background: "#009688", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Predict Height</button>
        {result && (
          <div style={{ marginTop: 20 }}>
            <div style={{ marginBottom: 10, fontSize: 18 }}>
              <strong>Predicted Adult Height:</strong> {result.predicted} cm
            </div>
            <div style={{ marginBottom: 10 }}>
              <strong>Height Range:</strong> {result.min} - {result.max} cm
            </div>
            <div style={{ fontSize: 14, color: "#666", marginTop: 10 }}>
              *This is an estimate based on parental heights. Actual height may vary due to genetics and environmental factors.
            </div>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Height Calculator</h2>
        <p>
          The Height Calculator helps you predict your child's adult height based on parental heights. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 