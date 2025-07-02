"use client"

import { useState } from "react"

export default function GradeCalculator() {
  const [assignments, setAssignments] = useState([{ score: "", max: "", weight: "" }])
  const [result, setResult] = useState(null)

  const handleChange = (i, field, value) => {
    const newAssignments = [...assignments]
    newAssignments[i][field] = value
    setAssignments(newAssignments)
  }

  const addRow = () => setAssignments([...assignments, { score: "", max: "", weight: "" }])
  const removeRow = i => setAssignments(assignments.filter((_, idx) => idx !== i))

  const calculate = () => {
    let total = 0, totalWeight = 0
    for (const a of assignments) {
      const score = parseFloat(a.score)
      const max = parseFloat(a.max)
      const weight = parseFloat(a.weight)
      if (!score || !max || !weight) continue
      total += (score / max) * weight
      totalWeight += weight
    }
    if (totalWeight === 0) return setResult(null)
    setResult(((total / totalWeight) * 100).toFixed(2))
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Grade Calculator</h1>
      <div style={{ background: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: "20px" }}>
        {assignments.map((a, i) => (
          <div key={i} style={{ marginBottom: 10, display: "flex", alignItems: "center" }}>
            <label>Score: </label>
            <input type="number" value={a.score} onChange={e => handleChange(i, "score", e.target.value)} style={{ marginLeft: 10, width: 80 }} min="0" />
            <label style={{ marginLeft: 15 }}>Max: </label>
            <input type="number" value={a.max} onChange={e => handleChange(i, "max", e.target.value)} style={{ marginLeft: 10, width: 80 }} min="1" />
            <label style={{ marginLeft: 15 }}>Weight: </label>
            <input type="number" value={a.weight} onChange={e => handleChange(i, "weight", e.target.value)} style={{ marginLeft: 10, width: 80 }} min="0" />
            {assignments.length > 1 && <button onClick={() => removeRow(i)} style={{ marginLeft: 15 }}>Remove</button>}
          </div>
        ))}
        <button onClick={addRow} style={{ marginBottom: 15, marginRight: 10 }}>Add Assignment</button>
        <button onClick={calculate} style={{ background: "#007bff", color: "white", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", fontSize: "16px" }}>Calculate Grade</button>
        {result && (
          <div style={{ marginTop: 20, fontSize: 18 }}>
            <strong>Final Grade: {result}%</strong>
          </div>
        )}
      </div>
      <div style={{ marginTop: "30px", background: "white", padding: "20px", borderRadius: "8px" }}>
        <h2>About Grade Calculator</h2>
        <p>
          The Grade Calculator helps you determine your final grade based on assignment scores and weights. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 