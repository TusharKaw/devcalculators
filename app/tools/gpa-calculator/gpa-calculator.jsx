"use client"

import { useState } from "react"

export default function GPACalculator() {
  const [grades, setGrades] = useState([{ grade: "", credits: "" }])
  const [result, setResult] = useState(null)

  const handleChange = (i, field, value) => {
    const newGrades = [...grades]
    newGrades[i][field] = value
    setGrades(newGrades)
  }

  const addRow = () => setGrades([...grades, { grade: "", credits: "" }])
  const removeRow = i => setGrades(grades.filter((_, idx) => idx !== i))

  const calculate = () => {
    let total = 0, totalCredits = 0
    for (const g of grades) {
      const grade = parseFloat(g.grade)
      const credits = parseFloat(g.credits)
      if (!grade || !credits) continue
      total += grade * credits
      totalCredits += credits
    }
    if (totalCredits === 0) return setResult(null)
    setResult((total / totalCredits).toFixed(2))
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>GPA Calculator</h1>
      <div style={{ background: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: "20px" }}>
        {grades.map((g, i) => (
          <div key={i} style={{ marginBottom: 10, display: "flex", alignItems: "center" }}>
            <label>Grade: </label>
            <input type="number" value={g.grade} onChange={e => handleChange(i, "grade", e.target.value)} style={{ marginLeft: 10, width: 80 }} step="0.01" min="0" max="4" />
            <label style={{ marginLeft: 15 }}>Credits: </label>
            <input type="number" value={g.credits} onChange={e => handleChange(i, "credits", e.target.value)} style={{ marginLeft: 10, width: 80 }} step="0.1" min="0" />
            {grades.length > 1 && <button onClick={() => removeRow(i)} style={{ marginLeft: 15 }}>Remove</button>}
          </div>
        ))}
        <button onClick={addRow} style={{ marginBottom: 15, marginRight: 10 }}>Add Course</button>
        <button onClick={calculate} style={{ background: "#28a745", color: "white", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", fontSize: "16px" }}>Calculate GPA</button>
        {result && (
          <div style={{ marginTop: 20, fontSize: 18 }}>
            <strong>GPA: {result}</strong>
          </div>
        )}
      </div>
      <div style={{ marginTop: "30px", background: "white", padding: "20px", borderRadius: "8px" }}>
        <h2>About GPA Calculator</h2>
        <p>
          The GPA Calculator helps you calculate your grade point average based on your grades and course credits. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 