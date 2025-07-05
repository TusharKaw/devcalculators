"use client"

import { useState } from "react"

function calculateCompatibility(name1, name2) {
  const letters = "abcdefghijklmnopqrstuvwxyz"
  let score1 = 0
  let score2 = 0
  
  // Calculate scores based on letter positions
  for (let char of name1.toLowerCase()) {
    if (letters.includes(char)) {
      score1 += letters.indexOf(char) + 1
    }
  }
  
  for (let char of name2.toLowerCase()) {
    if (letters.includes(char)) {
      score2 += letters.indexOf(char) + 1
    }
  }
  
  // Calculate compatibility percentage
  const totalScore = score1 + score2
  const compatibility = (totalScore % 100) + 1
  
  return {
    percentage: compatibility,
    description: getDescription(compatibility)
  }
}

function getDescription(percentage) {
  if (percentage >= 90) return "Excellent compatibility! You two are meant to be together."
  if (percentage >= 80) return "Great compatibility! You have a strong connection."
  if (percentage >= 70) return "Good compatibility! You work well together."
  if (percentage >= 60) return "Fair compatibility. There's potential for growth."
  if (percentage >= 50) return "Moderate compatibility. Communication is key."
  if (percentage >= 40) return "Challenging compatibility. Understanding each other takes effort."
  if (percentage >= 30) return "Difficult compatibility. Patience and compromise needed."
  return "Very challenging compatibility. Focus on mutual respect and understanding."
}

export default function NameCompatibilityCalculator() {
  const [name1, setName1] = useState("")
  const [name2, setName2] = useState("")
  const [result, setResult] = useState(null)

  const calculate = () => {
    if (!name1.trim() || !name2.trim()) return setResult(null)
    
    const compatibility = calculateCompatibility(name1, name2)
    
    setResult({
      name1: name1,
      name2: name2,
      percentage: compatibility.percentage,
      description: compatibility.description
    })
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Name Compatibility Calculator</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ marginBottom: 15 }}>
          <label>First Name: </label>
          <input type="text" value={name1} onChange={e => setName1(e.target.value)} style={{ marginLeft: 10, width: 200 }} placeholder="Enter first name" />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Second Name: </label>
          <input type="text" value={name2} onChange={e => setName2(e.target.value)} style={{ marginLeft: 10, width: 200 }} placeholder="Enter second name" />
        </div>
        <button onClick={calculate} style={{ background: "#e91e63", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Calculate Compatibility</button>
        {result && (
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <div style={{ fontSize: 24, marginBottom: 10 }}>
              <strong>{result.name1}</strong> & <strong>{result.name2}</strong>
            </div>
            <div style={{ fontSize: 36, fontWeight: "bold", color: "#e91e63", marginBottom: 15 }}>
              {result.percentage}%
            </div>
            <div style={{ fontSize: 16, color: "#666", lineHeight: 1.5 }}>
              {result.description}
            </div>
            <div style={{ fontSize: 14, color: "#999", marginTop: 15, fontStyle: "italic" }}>
              *This is for entertainment purposes only. True compatibility depends on many factors beyond names.
            </div>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Name Compatibility Calculator</h2>
        <p>
          The Name Compatibility Calculator analyzes the compatibility between two names using numerology principles. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 