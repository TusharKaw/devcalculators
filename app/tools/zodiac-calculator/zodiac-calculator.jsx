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
    <div className="zodiac-container">
      <style jsx>{`
        .zodiac-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .header {
          text-align: center;
          padding: 20px 0;
          background: linear-gradient(135deg, #6e48aa 0%, #9d50bb 100%);
          color: white;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          position: relative;
          overflow: hidden;
        }
        
        .header h1 {
          margin: 0;
          font-size: 2.5rem;
          text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .header p {
          margin: 10px 0 0;
          font-size: 1.1rem;
          opacity: 0.9;
        }
        
        .content-wrapper {
          display: flex;
          gap: 20px;
        }
        
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .calculator-card {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transition: transform 0.3s ease;
        }
        
        .calculator-card:hover {
          transform: translateY(-5px);
        }
        
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 20px;
        }
        
        .input-group label {
          font-weight: 600;
          color: #555;
          font-size: 1.1rem;
        }
        
        .input-group input {
          padding: 12px 15px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        
        .input-group input:focus {
          border-color: #9c27b0;
          outline: none;
          box-shadow: 0 0 0 3px rgba(156, 39, 176, 0.2);
        }
        
        .calculate-btn {
          background: linear-gradient(to right, #9c27b0, #673ab7);
          color: white;
          border: none;
          padding: 14px 28px;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(156, 39, 176, 0.3);
        }
        
        .calculate-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(156, 39, 176, 0.4);
        }
        
        .result-container {
          margin-top: 20px;
          text-align: center;
          animation: fadeIn 0.5s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .sign-emoji {
          font-size: 4rem;
          margin-bottom: 10px;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        .sign-name {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 5px;
          color: #333;
        }
        
        .sign-dates {
          font-size: 1.1rem;
          color: #777;
          margin-bottom: 15px;
        }
        
        .sign-detail {
          font-size: 1.1rem;
          margin-bottom: 10px;
          color: #555;
        }
        
        .sign-detail strong {
          color: #333;
        }
        
        .disclaimer {
          font-size: 0.9rem;
          color: #999;
          margin-top: 20px;
          font-style: italic;
        }
        
        .about-section {
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        
        .about-section h2 {
          color: #6e48aa;
          margin-top: 0;
        }
        
        .about-section p {
          line-height: 1.6;
          color: #555;
        }
        
        .ad-banner {
          width: 300px;
          height: 250px;
          background: #f5f5f5;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
          font-weight: bold;
          border: 1px dashed #ccc;
        }
        
        .mobile-ad {
          display: none;
          width: 300px;
          height: 300px;
          background: #f5f5f5;
          border-radius: 8px;
          margin-bottom: 20px;
          align-items: center;
          justify-content: center;
          color: #999;
          font-weight: bold;
          border: 1px dashed #ccc;
        }
        
        @media (max-width: 768px) {
          .content-wrapper {
            flex-direction: column;
          }
          
          .ad-banner {
            display: none;
          }
          
          .mobile-ad {
            display: flex;
          }
          
          .header h1 {
            font-size: 2rem;
          }
        }
        
        .share-section {
          display: flex;
          gap: 10px;
          margin-top: 20px;
          justify-content: center;
        }
        
        .share-btn {
          padding: 8px 15px;
          border-radius: 20px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .share-btn.facebook {
          background: #3b5998;
          color: white;
        }
        
        .share-btn.twitter {
          background: #1da1f2;
          color: white;
        }
        
        .share-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        
        .element-indicator {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-left: 5px;
        }
        
        .element-fire {
          background: #ff5722;
          color: white;
        }
        
        .element-earth {
          background: #795548;
          color: white;
        }
        
        .element-air {
          background: #00bcd4;
          color: white;
        }
        
        .element-water {
          background: #2196f3;
          color: white;
        }
      `}</style>

      <div className="mobile-ad">
        Advertisement
      </div>
      
      <div className="header">
        <h1>🌟 Zodiac Sign Finder 🌟</h1>
        <p>Discover your astrological sign and unlock cosmic insights about your personality</p>
      </div>
      
      <div className="content-wrapper">
        <div className="main-content">
          <div className="calculator-card">
            <div className="input-group">
              <label htmlFor="birthdate">Enter Your Birth Date</label>
              <input 
                type="date" 
                id="birthdate"
                value={birthDate} 
                onChange={e => setBirthDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            <button className="calculate-btn" onClick={calculate}>
              Reveal My Zodiac Sign
            </button>
            
            {result && (
              <div className="result-container">
                <div className="sign-emoji">
                  {result.sign.emoji}
                </div>
                <h2 className="sign-name">{result.sign.name}</h2>
                <div className="sign-dates">{result.sign.dates}</div>
                
                <div className="sign-detail">
                  <strong>Element:</strong> {result.sign.element}
                  <span className={`element-indicator element-${result.sign.element.toLowerCase()}`}>
                    {result.sign.element}
                  </span>
                </div>
                
                <div className="sign-detail">
                  <strong>Key Traits:</strong> {result.sign.traits}
                </div>
                
                <div className="sign-detail">
                  <strong>Best Compatibility:</strong> {result.compatibility}
                </div>
              </div>
            )}
          </div>
          
          <div className="about-section">
            <h2>About Zodiac Signs</h2>
            <p>
              Zodiac signs are based on the position of the sun at the time of your birth and are part of 
              Western astrology. Each sign has unique characteristics, strengths, and weaknesses that can 
              provide insight into your personality and relationships. Our calculator helps you discover 
              your sun sign and learn about its key traits.
            </p>
            <p>
              Remember that astrology is complex, and your full birth chart includes many other factors 
              beyond just your sun sign. Many people find zodiac signs to be a fun way to reflect on 
              personality traits and relationships.
            </p>
          </div>
        </div>
        
        <div className="ad-banner">
          Advertisement
        </div>
      </div>
    </div>
  )
}