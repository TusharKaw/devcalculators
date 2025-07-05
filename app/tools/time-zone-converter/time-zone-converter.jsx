"use client"

import { useState } from "react"

const timeZones = [
  { code: "UTC", name: "UTC" },
  { code: "EST", name: "Eastern Standard Time" },
  { code: "PST", name: "Pacific Standard Time" },
  { code: "CST", name: "Central Standard Time" },
  { code: "MST", name: "Mountain Standard Time" },
  { code: "GMT", name: "Greenwich Mean Time" },
  { code: "CET", name: "Central European Time" },
  { code: "JST", name: "Japan Standard Time" },
  { code: "IST", name: "India Standard Time" },
  { code: "AEST", name: "Australian Eastern Standard Time" }
]

// Mock timezone offsets (in real app, these would be more accurate)
const timezoneOffsets = {
  UTC: 0,
  EST: -5,
  PST: -8,
  CST: -6,
  MST: -7,
  GMT: 0,
  CET: 1,
  JST: 9,
  IST: 5.5,
  AEST: 10
}

export default function TimeZoneConverter() {
  const [time, setTime] = useState("")
  const [fromTZ, setFromTZ] = useState("UTC")
  const [toTZ, setToTZ] = useState("EST")
  const [result, setResult] = useState(null)

  const convert = () => {
    if (!time) return setResult(null)
    
    const [hours, minutes] = time.split(':').map(Number)
    const fromOffset = timezoneOffsets[fromTZ]
    const toOffset = timezoneOffsets[toTZ]
    
    let totalMinutes = hours * 60 + minutes
    totalMinutes += (toOffset - fromOffset) * 60
    
    // Handle day wrapping
    while (totalMinutes < 0) totalMinutes += 24 * 60
    while (totalMinutes >= 24 * 60) totalMinutes -= 24 * 60
    
    const newHours = Math.floor(totalMinutes / 60)
    const newMinutes = totalMinutes % 60
    
    setResult(`${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`)
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Time Zone Converter</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ marginBottom: 15 }}>
          <label>Time: </label>
          <input type="time" value={time} onChange={e => setTime(e.target.value)} style={{ marginLeft: 10 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>From Timezone: </label>
          <select value={fromTZ} onChange={e => setFromTZ(e.target.value)} style={{ marginLeft: 10, width: 200 }}>
            {timeZones.map(tz => <option key={tz.code} value={tz.code}>{tz.code} - {tz.name}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>To Timezone: </label>
          <select value={toTZ} onChange={e => setToTZ(e.target.value)} style={{ marginLeft: 10, width: 200 }}>
            {timeZones.map(tz => <option key={tz.code} value={tz.code}>{tz.code} - {tz.name}</option>)}
          </select>
        </div>
        <button onClick={convert} style={{ background: "#9c27b0", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Convert</button>
        {result && (
          <div style={{ marginTop: 20, fontSize: 18 }}>
            <strong>{time} {fromTZ} = {result} {toTZ}</strong>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Time Zone Converter</h2>
        <p>
          The Time Zone Converter helps you convert times between different time zones for meeting planning and scheduling. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 