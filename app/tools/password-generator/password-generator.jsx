"use client"

import { useState } from "react"

function generatePassword(length, opts) {
  let chars = ""
  if (opts.upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  if (opts.lower) chars += "abcdefghijklmnopqrstuvwxyz"
  if (opts.numbers) chars += "0123456789"
  if (opts.symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?"
  let pwd = ""
  for (let i = 0; i < length; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return pwd
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(12)
  const [upper, setUpper] = useState(true)
  const [lower, setLower] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(false)
  const [result, setResult] = useState("")

  const generate = () => {
    if (!upper && !lower && !numbers && !symbols) return setResult("")
    setResult(generatePassword(length, { upper, lower, numbers, symbols }))
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Password Generator</h1>
      <div style={{ background: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: "20px" }}>
        <div style={{ marginBottom: 15 }}>
          <label>Password Length: </label>
          <input type="number" min={4} max={64} value={length} onChange={e => setLength(Number(e.target.value))} style={{ marginLeft: 10, width: 80 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label><input type="checkbox" checked={upper} onChange={e => setUpper(e.target.checked)} /> Uppercase</label>
          <label style={{ marginLeft: 15 }}><input type="checkbox" checked={lower} onChange={e => setLower(e.target.checked)} /> Lowercase</label>
          <label style={{ marginLeft: 15 }}><input type="checkbox" checked={numbers} onChange={e => setNumbers(e.target.checked)} /> Numbers</label>
          <label style={{ marginLeft: 15 }}><input type="checkbox" checked={symbols} onChange={e => setSymbols(e.target.checked)} /> Symbols</label>
        </div>
        <button onClick={generate} style={{ background: "#28a745", color: "white", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", fontSize: "16px" }}>Generate</button>
        {result && (
          <div style={{ marginTop: 20, fontSize: 18, wordBreak: "break-all" }}>
            <strong>Password: {result}</strong>
          </div>
        )}
      </div>
      <div style={{ marginTop: "30px", background: "white", padding: "20px", borderRadius: "8px" }}>
        <h2>About Password Generator</h2>
        <p>
          The Password Generator creates strong, random passwords with your chosen length and character types. Useful for online security and privacy. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 