"use client"

import { useState } from "react"

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

function rgbToHsl(r, g, b) {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  }
}

export default function ColorConverter() {
  const [hexColor, setHexColor] = useState("#ff0000")
  const [result, setResult] = useState(null)

  const convert = () => {
    if (!hexColor) return setResult(null)
    
    const rgb = hexToRgb(hexColor)
    if (!rgb) return setResult(null)
    
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    
    setResult({
      hex: hexColor,
      rgb: `${rgb.r}, ${rgb.g}, ${rgb.b}`,
      hsl: `${hsl.h}°, ${hsl.s}%, ${hsl.l}%`
    })
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Color Converter</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ marginBottom: 15 }}>
          <label>HEX Color: </label>
          <input type="color" value={hexColor} onChange={e => setHexColor(e.target.value)} style={{ marginLeft: 10, width: 60, height: 40 }} />
          <input type="text" value={hexColor} onChange={e => setHexColor(e.target.value)} style={{ marginLeft: 10, width: 100 }} placeholder="#ff0000" />
        </div>
        <button onClick={convert} style={{ background: "#e91e63", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Convert</button>
        {result && (
          <div style={{ marginTop: 20 }}>
            <div style={{ marginBottom: 10 }}>
              <strong>HEX:</strong> {result.hex}
            </div>
            <div style={{ marginBottom: 10 }}>
              <strong>RGB:</strong> {result.rgb}
            </div>
            <div style={{ marginBottom: 10 }}>
              <strong>HSL:</strong> {result.hsl}
            </div>
            <div style={{ 
              width: 100, 
              height: 100, 
              backgroundColor: result.hex, 
              border: "2px solid #ccc",
              borderRadius: 8,
              marginTop: 15
            }}></div>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Color Converter</h2>
        <p>
          The Color Converter helps you convert between different color formats like RGB, HEX, and HSL. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 