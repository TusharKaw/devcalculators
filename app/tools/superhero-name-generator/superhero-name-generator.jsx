"use client"

import { useState } from "react"

const prefixes = ["Captain", "Doctor", "The", "Super", "Ultra", "Mega", "Power", "Shadow", "Light", "Dark", "Golden", "Silver", "Iron", "Steel", "Fire", "Ice", "Thunder", "Storm", "Star", "Moon"]

const suffixes = ["Man", "Woman", "Boy", "Girl", "Hero", "Avenger", "Guardian", "Protector", "Warrior", "Knight", "Phoenix", "Dragon", "Wolf", "Eagle", "Hawk", "Tiger", "Lion", "Bear", "Shark", "Spider"]

const powers = {
  "strength": ["Super Strength", "Invincibility", "Enhanced Durability", "Power Punch"],
  "speed": ["Super Speed", "Lightning Fast", "Time Manipulation", "Teleportation"],
  "intelligence": ["Genius Intellect", "Mind Reading", "Telepathy", "Technopathy"],
  "energy": ["Energy Blasts", "Force Fields", "Energy Absorption", "Power Generation"],
  "nature": ["Elemental Control", "Weather Manipulation", "Plant Control", "Animal Communication"]
}

const colors = {
  "red": "Crimson",
  "blue": "Azure", 
  "green": "Emerald",
  "yellow": "Golden",
  "purple": "Violet",
  "orange": "Amber",
  "black": "Shadow",
  "white": "Light",
  "pink": "Rose",
  "brown": "Terra"
}

function generateSuperheroName(name, color, power) {
  const nameLength = name.length
  const colorName = colors[color] || "Mystic"
  
  // Generate name based on inputs
  let prefix = prefixes[nameLength % prefixes.length]
  let suffix = suffixes[nameLength % suffixes.length]
  
  // Sometimes use color in name
  if (Math.random() > 0.5) {
    prefix = colorName
  }
  
  const superheroName = `${prefix} ${suffix}`
  const powerList = powers[power] || powers["strength"]
  const power = powerList[Math.floor(Math.random() * powerList.length)]
  
  return {
    name: superheroName,
    power: power,
    description: generateDescription(superheroName, power, color)
  }
}

function generateDescription(name, power, color) {
  const descriptions = [
    `${name} is a legendary hero with the power of ${power}. Clad in ${color} armor, they protect the innocent and fight for justice.`,
    `When danger strikes, ${name} appears with incredible ${power} abilities. Their ${color} costume strikes fear into the hearts of villains.`,
    `${name} is known throughout the world for their mastery of ${power}. The ${color} symbol on their chest represents hope and courage.`,
    `With the extraordinary ability of ${power}, ${name} has become a symbol of justice. Their ${color} uniform is instantly recognizable.`
  ]
  
  return descriptions[Math.floor(Math.random() * descriptions.length)]
}

export default function SuperheroNameGenerator() {
  const [realName, setRealName] = useState("")
  const [favoriteColor, setFavoriteColor] = useState("blue")
  const [powerPreference, setPowerPreference] = useState("strength")
  const [result, setResult] = useState(null)

  const generate = () => {
    if (!realName.trim()) return setResult(null)
    
    const superhero = generateSuperheroName(realName, favoriteColor, powerPreference)
    
    setResult({
      realName: realName,
      superhero: superhero
    })
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>🦸‍♂️ Superhero Name Generator 🦸‍♀️</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ marginBottom: 15 }}>
          <label>Your Real Name: </label>
          <input type="text" value={realName} onChange={e => setRealName(e.target.value)} style={{ marginLeft: 10, width: 200 }} placeholder="Enter your name" />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Favorite Color: </label>
          <select value={favoriteColor} onChange={e => setFavoriteColor(e.target.value)} style={{ marginLeft: 10, width: 120 }}>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
            <option value="purple">Purple</option>
            <option value="orange">Orange</option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="pink">Pink</option>
            <option value="brown">Brown</option>
          </select>
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Power Preference: </label>
          <select value={powerPreference} onChange={e => setPowerPreference(e.target.value)} style={{ marginLeft: 10, width: 150 }}>
            <option value="strength">Strength</option>
            <option value="speed">Speed</option>
            <option value="intelligence">Intelligence</option>
            <option value="energy">Energy</option>
            <option value="nature">Nature</option>
          </select>
        </div>
        <button onClick={generate} style={{ background: "#ff5722", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Generate Superhero</button>
        {result && (
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10, color: "#ff5722" }}>
              {result.superhero.name}
            </div>
            <div style={{ fontSize: 18, marginBottom: 10 }}>
              <strong>Power:</strong> {result.superhero.power}
            </div>
            <div style={{ fontSize: 16, color: "#666", lineHeight: 1.6, marginBottom: 15 }}>
              {result.superhero.description}
            </div>
            <div style={{ fontSize: 14, color: "#999", fontStyle: "italic" }}>
              *Your superhero identity has been revealed! Use your powers for good!
            </div>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Superhero Name Generator</h2>
        <p>
          The Superhero Name Generator creates unique superhero identities based on your name, favorite color, and power preferences. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 