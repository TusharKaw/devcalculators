"use client"

import { useState } from "react"

function calculateAge(birthdate) {
  const today = new Date()
  const birth = new Date(birthdate)
  let years = today.getFullYear() - birth.getFullYear()
  let months = today.getMonth() - birth.getMonth()
  let days = today.getDate() - birth.getDate()
  if (days < 0) {
    months--
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate()
  }
  if (months < 0) {
    years--
    months += 12
  }
  return { years, months, days }
}

export default function AgeCalculator() {
  const [birthdate, setBirthdate] = useState("")
  const [result, setResult] = useState(null)

  const calculate = () => {
    if (!birthdate) return setResult(null)
    setResult(calculateAge(birthdate))
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Age Calculator</h1>
      <div style={{ background: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: "20px" }}>
        <div style={{ marginBottom: 15 }}>
          <label>Birthdate: </label>
          <input type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)} style={{ marginLeft: 10 }} />
        </div>
        <button onClick={calculate} style={{ background: "#28a745", color: "white", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", fontSize: "16px" }}>Calculate</button>
        {result && (
          <div style={{ marginTop: 20, fontSize: 18 }}>
            <strong>Age: {result.years} years, {result.months} months, {result.days} days</strong>
          </div>
        )}
      </div>
      <div style={{ marginTop: "30px", background: "white", padding: "20px", borderRadius: "8px" }}>
        <h2>About Age Calculator</h2>
        <p>
          The Age Calculator finds your age in years, months, and days from your birthdate. Useful for birthdays, milestones, and more. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 