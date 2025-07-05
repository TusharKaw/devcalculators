"use client"

import { useState } from "react"

const countries = [
  { name: "Russia", area: 17098246, population: 144100000, emoji: "🇷🇺" },
  { name: "Canada", area: 9984670, population: 38000000, emoji: "🇨🇦" },
  { name: "China", area: 9596961, population: 1402000000, emoji: "🇨🇳" },
  { name: "United States", area: 9372610, population: 331000000, emoji: "🇺🇸" },
  { name: "Brazil", area: 8515767, population: 212600000, emoji: "🇧🇷" },
  { name: "Australia", area: 7692024, population: 25600000, emoji: "🇦🇺" },
  { name: "India", area: 3287263, population: 1380000000, emoji: "🇮🇳" },
  { name: "Argentina", area: 2780400, population: 45100000, emoji: "🇦🇷" },
  { name: "Kazakhstan", area: 2724900, population: 18700000, emoji: "🇰🇿" },
  { name: "Algeria", area: 2381741, population: 44600000, emoji: "🇩🇿" },
  { name: "DR Congo", area: 2344858, population: 86900000, emoji: "🇨🇩" },
  { name: "Saudi Arabia", area: 2149690, population: 34800000, emoji: "🇸🇦" },
  { name: "Mexico", area: 1964375, population: 128900000, emoji: "🇲🇽" },
  { name: "Indonesia", area: 1904569, population: 273500000, emoji: "🇮🇩" },
  { name: "Sudan", area: 1886068, population: 43800000, emoji: "🇸🇩" }
]

export default function CountrySizeComparison() {
  const [selectedCountry, setSelectedCountry] = useState("United States")
  const [comparisonType, setComparisonType] = useState("area")
  const [result, setResult] = useState(null)

  const compare = () => {
    const country = countries.find(c => c.name === selectedCountry)
    if (!country) return setResult(null)
    
    // Get top 5 countries for comparison
    const sortedCountries = [...countries].sort((a, b) => b[comparisonType] - a[comparisonType]).slice(0, 5)
    const maxValue = sortedCountries[0][comparisonType]
    
    setResult({
      selectedCountry: country,
      comparisonCountries: sortedCountries,
      maxValue: maxValue,
      type: comparisonType
    })
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h1>Country Size Comparison</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ marginBottom: 15 }}>
          <label>Select Country: </label>
          <select value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)} style={{ marginLeft: 10, width: 200 }}>
            {countries.map(country => (
              <option key={country.name} value={country.name}>
                {country.emoji} {country.name}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Compare by: </label>
          <select value={comparisonType} onChange={e => setComparisonType(e.target.value)} style={{ marginLeft: 10, width: 120 }}>
            <option value="area">Land Area</option>
            <option value="population">Population</option>
          </select>
        </div>
        <button onClick={compare} style={{ background: "#3f51b5", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Compare</button>
        {result && (
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 18, marginBottom: 15, textAlign: "center" }}>
              <strong>Top 5 Countries by {result.type === 'area' ? 'Land Area' : 'Population'}</strong>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {result.comparisonCountries.map((country, index) => {
                const percentage = (country[result.type] / result.maxValue) * 100
                const isSelected = country.name === result.selectedCountry.name
                return (
                  <div key={country.name} style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 10,
                    padding: 10,
                    background: isSelected ? "#e3f2fd" : "transparent",
                    borderRadius: 5,
                    border: isSelected ? "2px solid #2196f3" : "1px solid #ddd"
                  }}>
                    <div style={{ width: 30, textAlign: "center" }}>{country.emoji}</div>
                    <div style={{ width: 150, fontWeight: isSelected ? "bold" : "normal" }}>
                      {country.name}
                    </div>
                    <div style={{ 
                      flex: 1, 
                      height: 30, 
                      background: isSelected ? "#2196f3" : "#ddd",
                      borderRadius: 15,
                      position: "relative"
                    }}>
                      <div style={{ 
                        position: "absolute", 
                        left: 10, 
                        top: 5, 
                        color: isSelected ? "white" : "black",
                        fontSize: 12
                      }}>
                        {result.type === 'area' 
                          ? `${(country.area / 1000000).toFixed(1)}M km²`
                          : `${(country.population / 1000000).toFixed(1)}M`
                        }
                      </div>
                    </div>
                    <div style={{ width: 60, textAlign: "right" }}>
                      {percentage.toFixed(1)}%
                    </div>
                  </div>
                )
              })}
            </div>
            {result.comparisonCountries.find(c => c.name === result.selectedCountry.name) && (
              <div style={{ marginTop: 15, textAlign: "center", fontSize: 14, color: "#666" }}>
                <strong>{result.selectedCountry.name}</strong> is highlighted above
              </div>
            )}
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Country Size Comparison</h2>
        <p>
          The Country Size Comparison helps you visualize how different countries compare in terms of land area and population. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 