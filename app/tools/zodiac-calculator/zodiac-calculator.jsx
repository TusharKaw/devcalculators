"use client"

import { useState, useEffect } from "react";

const zodiacSigns = [
  { 
    name: "Aries", 
    dates: "Mar 21 - Apr 19", 
    element: "Fire", 
    traits: "Energetic, courageous, determined", 
    emoji: "♈",
    color: "#FF6B6B",
    luckyNumbers: [1, 9, 19],
    rulingPlanet: "Mars"
  },
  { 
    name: "Taurus", 
    dates: "Apr 20 - May 20", 
    element: "Earth", 
    traits: "Patient, reliable, devoted", 
    emoji: "♉",
    color: "#4ECDC4",
    luckyNumbers: [2, 6, 9],
    rulingPlanet: "Venus"
  },
  { 
    name: "Gemini", 
    dates: "May 21 - Jun 20", 
    element: "Air", 
    traits: "Adaptable, versatile, communicative", 
    emoji: "♊",
    color: "#45B7D1",
    luckyNumbers: [5, 7, 14],
    rulingPlanet: "Mercury"
  },
  { 
    name: "Cancer", 
    dates: "Jun 21 - Jul 22", 
    element: "Water", 
    traits: "Nurturing, protective, intuitive", 
    emoji: "♋",
    color: "#A5D8FF",
    luckyNumbers: [2, 3, 15],
    rulingPlanet: "Moon"
  },
  { 
    name: "Leo", 
    dates: "Jul 23 - Aug 22", 
    element: "Fire", 
    traits: "Creative, passionate, generous", 
    emoji: "♌",
    color: "#FFD166",
    luckyNumbers: [1, 5, 9],
    rulingPlanet: "Sun"
  },
  { 
    name: "Virgo", 
    dates: "Aug 23 - Sep 22", 
    element: "Earth", 
    traits: "Analytical, kind, hardworking", 
    emoji: "♍",
    color: "#06D6A0",
    luckyNumbers: [5, 14, 23],
    rulingPlanet: "Mercury"
  },
  { 
    name: "Libra", 
    dates: "Sep 23 - Oct 22", 
    element: "Air", 
    traits: "Diplomatic, gracious, fair-minded", 
    emoji: "♎",
    color: "#A78AFF",
    luckyNumbers: [4, 6, 13],
    rulingPlanet: "Venus"
  },
  { 
    name: "Scorpio", 
    dates: "Oct 23 - Nov 21", 
    element: "Water", 
    traits: "Passionate, assertive, magnetic", 
    emoji: "♏",
    color: "#EF476F",
    luckyNumbers: [8, 11, 18],
    rulingPlanet: "Pluto"
  },
  { 
    name: "Sagittarius", 
    dates: "Nov 22 - Dec 21", 
    element: "Fire", 
    traits: "Optimistic, adventurous, honest", 
    emoji: "♐",
    color: "#FF9A5A",
    luckyNumbers: [3, 7, 9],
    rulingPlanet: "Jupiter"
  },
  { 
    name: "Capricorn", 
    dates: "Dec 22 - Jan 19", 
    element: "Earth", 
    traits: "Responsible, disciplined, self-controlled", 
    emoji: "♑",
    color: "#7FDBFF",
    luckyNumbers: [4, 8, 13],
    rulingPlanet: "Saturn"
  },
  { 
    name: "Aquarius", 
    dates: "Jan 20 - Feb 18", 
    element: "Air", 
    traits: "Progressive, original, independent", 
    emoji: "♒",
    color: "#9BF6FF",
    luckyNumbers: [4, 7, 11],
    rulingPlanet: "Uranus"
  },
  { 
    name: "Pisces", 
    dates: "Feb 19 - Mar 20", 
    element: "Water", 
    traits: "Compassionate, artistic, intuitive", 
    emoji: "♓",
    color: "#BDB2FF",
    luckyNumbers: [3, 9, 12],
    rulingPlanet: "Neptune"
  }
];

function getZodiacSign(birthDate) {
  const date = new Date(birthDate);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return zodiacSigns[0];
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return zodiacSigns[1];
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return zodiacSigns[2];
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return zodiacSigns[3];
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return zodiacSigns[4];
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return zodiacSigns[5];
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return zodiacSigns[6];
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return zodiacSigns[7];
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return zodiacSigns[8];
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return zodiacSigns[9];
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return zodiacSigns[10];
  return zodiacSigns[11]; // Pisces
}

function getCompatibility(element) {
  const compatibility = {
    "Fire": "Best with Fire (Aries, Leo, Sagittarius) and Air (Gemini, Libra, Aquarius) signs",
    "Earth": "Best with Earth (Taurus, Virgo, Capricorn) and Water (Cancer, Scorpio, Pisces) signs",
    "Air": "Best with Air (Gemini, Libra, Aquarius) and Fire (Aries, Leo, Sagittarius) signs",
    "Water": "Best with Water (Cancer, Scorpio, Pisces) and Earth (Taurus, Virgo, Capricorn) signs"
  };
  return compatibility[element] || "All signs can have meaningful relationships";
}

export default function ZodiacCalculator() {
  const [birthdate, setBirthdate] = useState("");
  const [result, setResult] = useState(null);
  const [animate, setAnimate] = useState(false);
  const [activeTab, setActiveTab] = useState("traits");

  const calculate = () => {
    if (!birthdate) {
      setResult(null);
      return;
    }
    
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      const sign = getZodiacSign(birthdate);
      const compatibility = getCompatibility(sign.element);
      
      setResult({
        sign,
        compatibility
      });
    }, 300);
  };

  // Auto-calculate when date changes
  useEffect(() => {
    if (birthdate) {
      calculate();
    }
  }, [birthdate]);

  return (
    <div className="zodiac-calculator-container">
      <div className="main-content-wrapper">
        <div className="calculator-content">
          <div className="zodiac-calculator">
            <div className="header">
              <h2 style={{color:'white'}}>Zodiac Sign Calculator</h2>
              <p className="subtitle" style={{color:'white'}}>Discover your astrological sign and personality traits</p>
            </div>

            <div className="calculator-card">
              <div className="input-section">
                <label htmlFor="birthdate">Enter your birthdate</label>
                <div className="input-group">
                  <input
                    type="date"
                    id="birthdate"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                  />
                  <button
                    onClick={calculate}
                    disabled={!birthdate}
                    className={!birthdate ? 'disabled' : ''}
                  >
                    Reveal Sign
                  </button>
                </div>
              </div>

              {result && (
                <div className={`results-section ${animate ? 'animate' : ''}`}>
                  <div className="results-card" style={{backgroundColor: "rgba(110, 72, 170, 0.7)"}}>
                    <div className="sign-header">
                      <span className="sign-emoji">{result.sign.emoji}</span>
                      <h2 style={{color: 'white'}}>{result.sign.name}</h2>
                      <p className="sign-dates" style={{color: 'white'}}>{result.sign.dates}</p>
                    </div>
                    
                    <div className="tabs">
                      <button 
                        className={`tab ${activeTab === 'traits' ? 'active' : ''}`}
                        onClick={() => setActiveTab('traits')}
                      >
                        Personality
                      </button>
                      <button 
                        className={`tab ${activeTab === 'details' ? 'active' : ''}`}
                        onClick={() => setActiveTab('details')}
                      >
                        Details
                      </button>
                      <button 
                        className={`tab ${activeTab === 'compatibility' ? 'active' : ''}`}
                        onClick={() => setActiveTab('compatibility')}
                      >
                        Compatibility
                      </button>
                    </div>
                    
                    <div className="tab-content">
                      {activeTab === 'traits' && (
                        <div className="traits-content">
                          <h3 style={{color: 'white'}}>Key Personality Traits</h3>
                          <p style={{color: 'white'}}>{result.sign.traits}</p>
                          <div className="traits-grid">
                            {result.sign.traits.split(', ').map((trait, index) => (
                              <div key={index} className="trait-bubble">
                                {trait}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {activeTab === 'details' && (
                        <div className="details-content">
                          <div className="detail-item">
                            <span style={{color: 'white'}}>Element:</span>
                            <span className="detail-value">{result.sign.element}</span>
                          </div>
                          <div className="detail-item">
                            <span style={{color: 'white'}}>Ruling Planet:</span>
                            <span className="detail-value">{result.sign.rulingPlanet}</span>
                          </div>
                          <div className="detail-item">
                            <span style={{color: 'white'}}>Lucky Numbers:</span>
                            <span className="detail-value">{result.sign.luckyNumbers.join(', ')}</span>
                          </div>
                          <div className="detail-item">
                            <span style={{color: 'white'}}>Color:</span>
                            <span className="detail-value">{result.sign.color}</span>
                          </div>
                        </div>
                      )}
                      
                      {activeTab === 'compatibility' && (
                        <div className="compatibility-content">
                          <h3 style={{color: 'white'}}>Best Matches</h3>
                          <p style={{color: 'white'}}>{result.compatibility}</p>
                          <div className="compatibility-meter">
                            <div className="meter-bar" style={{width: '90%', backgroundColor: '#FF6B6B'}}>
                              Fire Signs: 90%
                            </div>
                            <div className="meter-bar" style={{width: '80%', backgroundColor: '#4ECDC4'}}>
                              Air Signs: 80%
                            </div>
                            <div className="meter-bar" style={{width: '60%', backgroundColor: '#A5D8FF'}}>
                              Earth Signs: 60%
                            </div>
                            <div className="meter-bar" style={{width: '40%', backgroundColor: '#BDB2FF'}}>
                              Water Signs: 40%
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Mobile Ad Placeholder */}
            <div className="ad-placeholder mobile-ad">
              {/* Replace this with your actual ad component */}
              <span>300x250 Ad Banner</span>
            </div>
            
            <div className="about-section">
              <h2>About Zodiac Signs</h2>
              <div className="zodiac-description">
                <p>Our <strong>Zodiac Sign Calculator</strong> helps you discover your astrological sign based on your exact birth date. Each of the <strong>12 zodiac signs</strong> has unique personality traits, characteristics, strengths, and weaknesses that can provide fascinating insights into your life.</p>

                <p>The zodiac is divided into <strong>four elements</strong> - Fire, Earth, Air, and Water - which represent different types of energy that influence our basic personality traits. Your sun sign (determined by your birth date) represents your core identity and life purpose.</p>

                <p>This tool is perfect for anyone interested in <strong>astrology</strong>, whether you're checking your own sign, learning about a friend's personality traits, or exploring <strong>compatibility</strong> between different signs. Many people find zodiac signs helpful for understanding relationships, career paths, and personal growth.</p>

                <p>The calculator is completely <strong>free to use</strong>, requires <strong>no registration</strong>, and works on all devices. While astrology is complex and your full birth chart includes many factors beyond your sun sign, this provides an entertaining and often surprisingly accurate starting point for self-discovery.</p>
              </div>
              <div className="tip">
                <span>💡</span> Tip: For the most accurate astrological reading, you would need your exact birth time and location.
              </div>
            </div>
          </div>
        </div>

        <div className="ad-placeholder">
          {/* Replace this with your actual ad component */}
          <span>300x250 Ad Banner</span>
        </div>
      </div>

      <style jsx>{`
        .zodiac-calculator-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 100%);
          padding: 1rem 1rem 2rem 1rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        .main-content-wrapper {
          display: flex;
          max-width: 1200px;
          margin: 0 auto;
          gap: 0rem;
        }
        
        .calculator-content {
          flex: 1;
          min-width: 0;
        }
        
        .ad-placeholder {
          width: 300px;
          height: 250px;
          padding: 1rem;
          background: #f7fafc;
          border: 1px dashed #cbd5e0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a0aec0;
        }
        
        .mobile-ad {
          display: none;
        }
        
        .zodiac-calculator {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .header {
          text-align: center;
          margin-bottom: 1rem;
          border-radius: 12px;
          background: linear-gradient(135deg, #6e48aa 0%, #9d50bb 100%);
          padding: 1.5rem;
        }
        
        .header h2 {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }
        
        .subtitle {
          font-size: 1.1rem;
          max-width: 500px;
          margin: 0 auto;
          opacity: 0.9;
        }
        
        .calculator-card {
          background: white;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          margin-bottom: 1rem;
          border-radius: 12px;
        }
        
        .input-section {
          padding: 1.5rem;
        }
        
        .input-section label {
          display: block;
          font-size: 1.125rem;
          font-weight: 500;
          color: #2d3748;
          margin-bottom: 0.75rem;
        }
        
        .input-group {
          display: flex;
          gap: 0.75rem;
        }
        
        .input-group input {
          flex: 1;
          min-width: 0;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          transition: all 0.2s;
        }
        
        .input-group input:focus {
          outline: none;
          border-color: #6e48aa;
          box-shadow: 0 0 0 2px rgba(110, 72, 170, 0.2);
        }
        
        .input-group button {
          padding: 0.75rem 1.5rem;
          background: #6e48aa;
          color: white;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 1rem;
        }
        
        .input-group button:hover {
          background: #9d50bb;
        }
        
        .input-group button.disabled {
          background: rgba(110, 72, 170, 0.6);
          cursor: not-allowed;
        }
        
        .results-section {
          padding: 0 1.5rem 1.5rem;
          transition: all 0.3s;
        }
        
        .results-section.animate {
          transform: scale(1.02);
          opacity: 0.9;
        }
        
        .results-card {
          border-radius: 8px;
          padding: 1.5rem;
          overflow: hidden;
        }
        
        .sign-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        
        .sign-emoji {
          font-size: 3rem;
          display: block;
          margin-bottom: 0.5rem;
        }
        
        .sign-dates {
          font-size: 1.1rem;
          opacity: 0.9;
        }
        
        .tabs {
          display: flex;
          margin-bottom: 1rem;
          border-bottom: 2px solid rgba(255,255,255,0.2);
        }
        
        .tab {
          flex: 1;
          padding: 0.75rem;
          background: transparent;
          border: none;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }
        
        .tab.active {
          color: white;
        }
        
        .tab.active:after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: white;
        }
        
        .tab:hover:not(.active) {
          background: rgba(255,255,255,0.1);
        }
        
        .tab-content {
          min-height: 150px;
        }
        
        .traits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 0.75rem;
          margin-top: 1rem;
        }
        
        .trait-bubble {
          background: rgba(255,255,255,0.2);
          color: white;
          padding: 0.5rem;
          border-radius: 20px;
          text-align: center;
          font-size: 0.9rem;
          transition: all 0.2s;
        }
        
        .trait-bubble:hover {
          transform: translateY(-2px);
          background: rgba(255,255,255,0.3);
        }
        
        .detail-item {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        
        .detail-value {
          font-weight: 600;
          color: white;
        }
        
        .compatibility-meter {
          margin-top: 1rem;
        }
        
        .meter-bar {
          height: 30px;
          margin-bottom: 0.5rem;
          border-radius: 4px;
          display: flex;
          align-items: center;
          padding-left: 10px;
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
          transition: width 0.5s ease;
        }
        
        .about-section {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        .about-section h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 1rem;
        }
        
        .about-section p {
          color: #4a5568;
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        
        .tip {
          display: flex;
          align-items: center;
          background: rgba(110,72,170, 0.2);
          padding: 1rem;
          border-radius: 6px;
          border-left: 4px solid rgb(110,72,170);
          color: #2d3748;
          font-size: 0.875rem;
        }
        
        .tip span {
          margin-right: 0.5rem;
        }
        
        @media (max-width: 1024px) {
          .main-content-wrapper {
            flex-direction: column;
          }
          
          .ad-placeholder {
            width: 100%;
            max-width: 300px;
            margin: 0 auto;
          }
          
          /* Hide desktop ad on mobile */
          .main-content-wrapper > .ad-placeholder {
            display: none;
          }
          
          /* Show mobile ad */
          .mobile-ad {
            display: flex !important;
            width: 100%;
            max-width: 300px;
            margin: 1rem auto;
          }
        }
        
        @media (max-width: 640px) {
          .header h2 {
            font-size: 1.75rem;
          }
          
          .subtitle {
            font-size: 1rem;
          }
          
          .input-group {
            flex-direction: column;
          }
          
          .input-group input {
            width: 100%;
            margin-bottom: 0.5rem;
          }
          
          .input-group button {
            width: 100%;
          }
          
          .tabs {
            flex-direction: column;
            border-bottom: none;
          }
          
          .tab {
            border-bottom: 1px solid rgba(255,255,255,0.2);
          }
          
          .tab.active:after {
            display: none;
          }
          
          .traits-grid {
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          }
        }
      `}</style>
    </div>
  );
}