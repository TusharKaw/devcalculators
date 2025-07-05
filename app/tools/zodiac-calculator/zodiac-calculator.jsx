"use client"

import { useState } from "react"

const zodiacSigns = [
  { name: "Aries", dates: "Mar 21 - Apr 19", element: "Fire", traits: "Energetic, courageous, determined", emoji: "♈" },
  { name: "Taurus", dates: "Apr 20 - May 20", element: "Earth", traits: "Patient, reliable, devoted", emoji: "♉" },
  { name: "Gemini", dates: "May 21 - Jun 20", element: "Air", traits: "Adaptable, versatile, communicative", emoji: "♊" },
  { name: "Cancer", dates: "Jun 21 - Jul 22", element: "Water", traits: "Nurturing, protective, intuitive", emoji: "♋" },
  { name: "Leo", dates: "Jul 23 - Aug 22", element: "Fire", traits: "Creative, passionate, generous", emoji: "♌" },
  { name: "Virgo", dates: "Aug 23 - Sep 22", element: "Earth", traits: "Analytical, kind, hardworking", emoji: "♍" },
  { name: "Libra", dates: "Sep 23 - Oct 22", element: "Air", traits: "Diplomatic, gracious, fair-minded", emoji: "♎" },
  { name: "Scorpio", dates: "Oct 23 - Nov 21", element: "Water", traits: "Passionate, assertive, magnetic", emoji: "♏" },
  { name: "Sagittarius", dates: "Nov 22 - Dec 21", element: "Fire", traits: "Optimistic, adventurous, honest", emoji: "♐" },
  { name: "Capricorn", dates: "Dec 22 - Jan 19", element: "Earth", traits: "Responsible, disciplined, self-controlled", emoji: "♑" },
  { name: "Aquarius", dates: "Jan 20 - Feb 18", element: "Air", traits: "Progressive, original, independent", emoji: "♒" },
  { name: "Pisces", dates: "Feb 19 - Mar 20", element: "Water", traits: "Compassionate, artistic, intuitive", emoji: "♓" }
]

function getZodiacSign(birthDate) {
  const date = new Date(birthDate)
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return zodiacSigns[0]
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return zodiacSigns[1]
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return zodiacSigns[2]
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return zodiacSigns[3]
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return zodiacSigns[4]
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return zodiacSigns[5]
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return zodiacSigns[6]
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return zodiacSigns[7]
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return zodiacSigns[8]
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return zodiacSigns[9]
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return zodiacSigns[10]
  return zodiacSigns[11] // Pisces
}

function getCompatibility(element) {
  const compatibility = {
    "Fire": "Fire signs (Aries, Leo, Sagittarius) and Air signs (Gemini, Libra, Aquarius)",
    "Earth": "Earth signs (Taurus, Virgo, Capricorn) and Water signs (Cancer, Scorpio, Pisces)",
    "Air": "Air signs (Gemini, Libra, Aquarius) and Fire signs (Aries, Leo, Sagittarius)",
    "Water": "Water signs (Cancer, Scorpio, Pisces) and Earth signs (Taurus, Virgo, Capricorn)"
  }
  return compatibility[element] || "All signs can have meaningful relationships"
}

export default function ZodiacCalculator() {
  const [birthDate, setBirthDate] = useState("")
  const [result, setResult] = useState(null)

  const calculate = () => {
    if (!birthDate) return setResult(null)
    
    const sign = getZodiacSign(birthDate)
    const compatibility = getCompatibility(sign.element)
    
    setResult({
      sign: sign,
      compatibility: compatibility
    })
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>🌟 Zodiac Calculator 🌟</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ marginBottom: 15 }}>
          <label>Birth Date: </label>
          <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} style={{ marginLeft: 10, width: 150 }} />
        </div>
        <button onClick={calculate} style={{ background: "#9c27b0", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Find Your Sign</button>
        {result && (
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 10 }}>
              {result.sign.emoji}
            </div>
            <div style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
              {result.sign.name}
            </div>
            <div style={{ fontSize: 16, color: "#666", marginBottom: 10 }}>
              {result.sign.dates}
            </div>
            <div style={{ fontSize: 18, marginBottom: 10 }}>
              <strong>Element:</strong> {result.sign.element}
            </div>
            <div style={{ fontSize: 16, color: "#666", marginBottom: 15, lineHeight: 1.5 }}>
              <strong>Traits:</strong> {result.sign.traits}
            </div>
            <div style={{ fontSize: 14, color: "#666", lineHeight: 1.5 }}>
              <strong>Best Compatibility:</strong> {result.compatibility}
            </div>
            <div style={{ fontSize: 14, color: "#999", marginTop: 15, fontStyle: "italic" }}>
              *This is for entertainment purposes. Your personality is unique!
            </div>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Zodiac Calculator</h2>
        <p>
          The Zodiac Calculator helps you find your astrological sign and learn about its traits and compatibility. (You can update this section later.)
        </p>
      </div>
    </div>
  )
} 