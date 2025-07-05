"use client"

import { useState } from "react"

function calculateLove(name1, name2) {
  const combined = (name1 + name2).toLowerCase()
  let score = 0
  
  // Simple algorithm based on character codes
  for (let i = 0; i < combined.length; i++) {
    score += combined.charCodeAt(i)
  }
  
  // Add some randomness based on name lengths
  score += name1.length * name2.length
  
  // Get percentage between 50-100
  const percentage = 50 + (score % 50)
  
  return {
    percentage: percentage,
    description: getLoveDescription(percentage)
  }
}

function getLoveDescription(percentage) {
  if (percentage >= 95) return "💕 True love! You two are soulmates! 💕"
  if (percentage >= 85) return "💖 Amazing love! You have a very special connection! 💖"
  if (percentage >= 75) return "💝 Great love! You're perfect for each other! 💝"
  if (percentage >= 65) return "💗 Good love! You have a strong relationship! 💗"
  if (percentage >= 55) return "💓 Nice love! There's potential here! 💓"
  if (percentage >= 50) return "💔 Moderate love. Give it time to grow! 💔"
  return "💔 Challenging love. Communication is key! 💔"
}

export default function LoveCalculator() {
  const [name1, setName1] = useState("")
  const [name2, setName2] = useState("")
  const [result, setResult] = useState(null)

  const calculate = () => {
    if (!name1.trim() || !name2.trim()) return setResult(null)
    
    const love = calculateLove(name1, name2)
    
    setResult({
      name1: name1,
      name2: name2,
      percentage: love.percentage,
      description: love.description
    })
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>💕 Love Calculator 💕</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ marginBottom: 15 }}>
          <label>First Name: </label>
          <input type="text" value={name1} onChange={e => setName1(e.target.value)} style={{ marginLeft: 10, width: 200 }} placeholder="Enter first name" />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Second Name: </label>
          <input type="text" value={name2} onChange={e => setName2(e.target.value)} style={{ marginLeft: 10, width: 200 }} placeholder="Enter second name" />
        </div>
        <button onClick={calculate} style={{ background: "#e91e63", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Calculate Love</button>
        {result && (
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <div style={{ fontSize: 24, marginBottom: 10 }}>
              <strong>{result.name1}</strong> ❤️ <strong>{result.name2}</strong>
            </div>
            <div style={{ fontSize: 48, fontWeight: "bold", color: "#e91e63", marginBottom: 15 }}>
              {result.percentage}%
            </div>
            <div style={{ fontSize: 18, color: "#666", lineHeight: 1.5 }}>
              {result.description}
            </div>
            <div style={{ fontSize: 14, color: "#999", marginTop: 15, fontStyle: "italic" }}>
              *This is for fun only! True love is about much more than names.
            </div>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Love Calculator</h2>
        <p>
          The Love Calculator is a fun tool that calculates love compatibility between two names. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 