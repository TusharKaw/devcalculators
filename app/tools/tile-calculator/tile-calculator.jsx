"use client"

import { useState } from "react"

export default function TileCalculator() {
  const [roomLength, setRoomLength] = useState("")
  const [roomWidth, setRoomWidth] = useState("")
  const [tileLength, setTileLength] = useState("")
  const [tileWidth, setTileWidth] = useState("")
  const [wastage, setWastage] = useState("10")
  const [result, setResult] = useState(null)

  const calculate = () => {
    const rLength = parseFloat(roomLength)
    const rWidth = parseFloat(roomWidth)
    const tLength = parseFloat(tileLength)
    const tWidth = parseFloat(tileWidth)
    const wastagePercent = parseFloat(wastage)
    
    if (!rLength || !rWidth || !tLength || !tWidth) return setResult(null)
    
    const roomArea = rLength * rWidth
    const tileArea = tLength * tWidth
    const tilesNeeded = roomArea / tileArea
    const tilesWithWastage = tilesNeeded * (1 + wastagePercent / 100)
    
    setResult({
      roomArea: roomArea.toFixed(2),
      tileArea: tileArea.toFixed(2),
      tilesNeeded: Math.ceil(tilesNeeded),
      tilesWithWastage: Math.ceil(tilesWithWastage)
    })
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Tile Calculator</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ marginBottom: 15 }}>
          <label>Room Length (ft): </label>
          <input type="number" value={roomLength} onChange={e => setRoomLength(e.target.value)} style={{ marginLeft: 10, width: 100 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Room Width (ft): </label>
          <input type="number" value={roomWidth} onChange={e => setRoomWidth(e.target.value)} style={{ marginLeft: 10, width: 100 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Tile Length (inches): </label>
          <input type="number" value={tileLength} onChange={e => setTileLength(e.target.value)} style={{ marginLeft: 10, width: 100 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Tile Width (inches): </label>
          <input type="number" value={tileWidth} onChange={e => setTileWidth(e.target.value)} style={{ marginLeft: 10, width: 100 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Wastage (%): </label>
          <input type="number" value={wastage} onChange={e => setWastage(e.target.value)} style={{ marginLeft: 10, width: 80 }} min="0" max="50" />
        </div>
        <button onClick={calculate} style={{ background: "#795548", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Calculate</button>
        {result && (
          <div style={{ marginTop: 20 }}>
            <div style={{ marginBottom: 10 }}>
              <strong>Room Area:</strong> {result.roomArea} sq ft
            </div>
            <div style={{ marginBottom: 10 }}>
              <strong>Tile Area:</strong> {result.tileArea} sq inches
            </div>
            <div style={{ marginBottom: 10 }}>
              <strong>Tiles Needed:</strong> {result.tilesNeeded}
            </div>
            <div style={{ marginBottom: 10, fontSize: 18 }}>
              <strong>Recommended (with wastage):</strong> {result.tilesWithWastage} tiles
            </div>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Tile Calculator</h2>
        <p>
          The Tile Calculator helps you estimate the number of tiles needed for your flooring project. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 