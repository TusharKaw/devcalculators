"use client"

import { useState } from "react"

const animals = [
  { name: "Giraffe", height: 550, emoji: "🦒" },
  { name: "Elephant", height: 350, emoji: "🐘" },
  { name: "Horse", height: 180, emoji: "🐎" },
  { name: "Lion", height: 120, emoji: "🦁" },
  { name: "Bear", height: 150, emoji: "🐻" },
  { name: "Deer", height: 140, emoji: "🦌" },
  { name: "Wolf", height: 85, emoji: "🐺" },
  { name: "Dog", height: 60, emoji: "🐕" },
  { name: "Cat", height: 25, emoji: "🐱" },
  { name: "Rabbit", height: 20, emoji: "🐰" }
]

export default function AnimalHeightComparison() {
  const [humanHeight, setHumanHeight] = useState("")
  const [selectedAnimal, setSelectedAnimal] = useState("Giraffe")
  const [result, setResult] = useState(null)

  const compare = () => {
    const hHeight = parseFloat(humanHeight)
    if (!hHeight) return setResult(null)
    
    const animal = animals.find(a => a.name === selectedAnimal)
    if (!animal) return setResult(null)
    
    const ratio = hHeight / animal.height
    const animalHeight = animal.height
    
    setResult({
      humanHeight: hHeight,
      animalHeight: animalHeight,
      animalName: animal.name,
      animalEmoji: animal.emoji,
      ratio: ratio.toFixed(2)
    })
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h1>Animal Height Comparison</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ marginBottom: 15 }}>
          <label>Your Height (cm): </label>
          <input type="number" value={humanHeight} onChange={e => setHumanHeight(e.target.value)} style={{ marginLeft: 10, width: 100 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Compare with: </label>
          <select value={selectedAnimal} onChange={e => setSelectedAnimal(e.target.value)} style={{ marginLeft: 10, width: 150 }}>
            {animals.map(animal => (
              <option key={animal.name} value={animal.name}>
                {animal.emoji} {animal.name} ({animal.height}cm)
              </option>
            ))}
          </select>
        </div>
        <button onClick={compare} style={{ background: "#8bc34a", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Compare</button>
        {result && (
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 18, marginBottom: 15 }}>
              <strong>Comparison Results:</strong>
            </div>
            <div style={{ display: "flex", alignItems: "end", justifyContent: "center", gap: 30, marginTop: 20 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ 
                  width: 40, 
                  height: result.humanHeight * 1.5, 
                  backgroundColor: "#2196f3", 
                  margin: "0 auto 10px",
                  borderRadius: "5px 5px 0 0",
                  maxHeight: 300
                }}></div>
                <div>You: {result.humanHeight} cm</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ 
                  width: 60, 
                  height: result.animalHeight * 1.5, 
                  backgroundColor: "#ff9800", 
                  margin: "0 auto 10px",
                  borderRadius: "5px 5px 0 0",
                  maxHeight: 300
                }}></div>
                <div>{result.animalEmoji} {result.animalName}: {result.animalHeight} cm</div>
              </div>
            </div>
            <div style={{ marginTop: 15, fontSize: 16, textAlign: "center" }}>
              {result.ratio > 1 ? (
                <div>You are <strong>{result.ratio}x</strong> taller than a {result.animalName}</div>
              ) : (
                <div>A {result.animalName} is <strong>{(1/result.ratio).toFixed(2)}x</strong> taller than you</div>
              )}
            </div>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Animal Height Comparison</h2>
        <p>
          The Animal Height Comparison helps you visualize how your height compares to different animals. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 