"use client"

import { useState } from "react"

function checkPasswordStrength(password) {
  let score = 0
  let feedback = []
  
  if (password.length >= 8) {
    score += 1
    feedback.push("✓ At least 8 characters")
  } else {
    feedback.push("✗ At least 8 characters needed")
  }
  
  if (/[a-z]/.test(password)) {
    score += 1
    feedback.push("✓ Contains lowercase letter")
  } else {
    feedback.push("✗ Add lowercase letter")
  }
  
  if (/[A-Z]/.test(password)) {
    score += 1
    feedback.push("✓ Contains uppercase letter")
  } else {
    feedback.push("✗ Add uppercase letter")
  }
  
  if (/[0-9]/.test(password)) {
    score += 1
    feedback.push("✓ Contains number")
  } else {
    feedback.push("✗ Add number")
  }
  
  if (/[^A-Za-z0-9]/.test(password)) {
    score += 1
    feedback.push("✓ Contains special character")
  } else {
    feedback.push("✗ Add special character")
  }
  
  let strength = ""
  let color = ""
  
  if (score <= 1) {
    strength = "Very Weak"
    color = "#f44336"
  } else if (score <= 2) {
    strength = "Weak"
    color = "#ff9800"
  } else if (score <= 3) {
    strength = "Fair"
    color = "#ffc107"
  } else if (score <= 4) {
    strength = "Good"
    color = "#4caf50"
  } else {
    strength = "Strong"
    color = "#2e7d32"
  }
  
  return { score, strength, color, feedback }
}

export default function PasswordStrengthChecker() {
  const [password, setPassword] = useState("")
  const [result, setResult] = useState(null)

  const checkStrength = () => {
    if (!password) return setResult(null)
    setResult(checkPasswordStrength(password))
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Password Strength Checker</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ marginBottom: 15 }}>
          <label>Password: </label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ marginLeft: 10, width: 250 }} />
        </div>
        <button onClick={checkStrength} style={{ background: "#2196f3", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Check Strength</button>
        {result && (
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 18, marginBottom: 15 }}>
              <strong>Strength: </strong>
              <span style={{ color: result.color }}>{result.strength}</span>
            </div>
            <div style={{ marginBottom: 10 }}>
              <strong>Score: {result.score}/5</strong>
            </div>
            <div style={{ background: "#f5f5f5", padding: 15, borderRadius: 4 }}>
              <strong>Feedback:</strong>
              {result.feedback.map((item, index) => (
                <div key={index} style={{ marginTop: 5 }}>{item}</div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Password Strength Checker</h2>
        <p>
          The Password Strength Checker helps you evaluate the security of your passwords. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 