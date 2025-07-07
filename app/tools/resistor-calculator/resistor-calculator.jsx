"use client"

import { useState, useEffect } from "react";

const colorCodes = {
  "black": { value: 0, multiplier: 1 },
  "brown": { value: 1, multiplier: 10, tolerance: 1 },
  "red": { value: 2, multiplier: 100, tolerance: 2 },
  "orange": { value: 3, multiplier: 1000 },
  "yellow": { value: 4, multiplier: 10000 },
  "green": { value: 5, multiplier: 100000, tolerance: 0.5 },
  "blue": { value: 6, multiplier: 1000000, tolerance: 0.25 },
  "violet": { value: 7, multiplier: 10000000, tolerance: 0.1 },
  "gray": { value: 8, multiplier: 100000000, tolerance: 0.05 },
  "white": { value: 9, multiplier: 1000000000 },
  "gold": { value: -1, multiplier: 0.1, tolerance: 5 },
  "silver": { value: -1, multiplier: 0.01, tolerance: 10 }
};

export default function ResistorCalculator() {
  const [band1, setBand1] = useState("brown");
  const [band2, setBand2] = useState("black");
  const [band3, setBand3] = useState("red");
  const [band4, setBand4] = useState("gold");
  const [result, setResult] = useState(null);
  const [animate, setAnimate] = useState(false);

  const calculate = () => {
    const firstDigit = colorCodes[band1].value;
    const secondDigit = colorCodes[band2].value;
    const multiplier = colorCodes[band3].multiplier;
    const tolerance = colorCodes[band4]?.tolerance || 20;
    
    if (firstDigit === -1 || secondDigit === -1) {
      setResult({ error: "Invalid color combination" });
      return;
    }
    
    const resistance = (firstDigit * 10 + secondDigit) * multiplier;
    const formattedResistance = formatResistance(resistance);
    
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      setResult({
        resistance: resistance,
        formatted: formattedResistance,
        tolerance: tolerance,
        range: {
          min: resistance * (1 - tolerance / 100),
          max: resistance * (1 + tolerance / 100)
        },
        colors: [band1, band2, band3, band4]
      });
    }, 300);
  };

  const formatResistance = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)} MΩ`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)} kΩ`;
    } else {
      return `${value.toFixed(2)} Ω`;
    }
  };

  // Auto-calculate when any band changes
  useEffect(() => {
    calculate();
  }, [band1, band2, band3, band4]);

  return (
    <div className="resistor-calculator-container">
      <div className="main-content-wrapper">
        <div className="calculator-content">
          <div className="resistor-calculator">
            <div className="header">
              <h1 style={{color:'white'}}>🔌 Resistor Color Code Calculator</h1>
              <p className="subtitle" style={{color:'white'}}>Determine resistor values from color bands</p>
            </div>

            <div className="calculator-card">
            <div className="input-section">
  <div className="band-selectors">
    <div className="band-row">
      <div className="band-selector">
        <label htmlFor="band1">1st Band (1st digit)</label>
        <select 
          id="band1" 
          value={band1} 
          onChange={e => setBand1(e.target.value)}
          style={{ borderLeft: `10px solid ${band1}` }}
        >
          {Object.keys(colorCodes)
            .filter(color => colorCodes[color].value >= 0)
            .map(color => (
              <option key={color} value={color}>
                {color.charAt(0).toUpperCase() + color.slice(1)} ({colorCodes[color].value})
              </option>
            ))}
        </select>
      </div>

      <div className="band-selector">
        <label htmlFor="band2">2nd Band (2nd digit)</label>
        <select 
          id="band2" 
          value={band2} 
          onChange={e => setBand2(e.target.value)}
          style={{ borderLeft: `10px solid ${band2}` }}
        >
          {Object.keys(colorCodes)
            .filter(color => colorCodes[color].value >= 0)
            .map(color => (
              <option key={color} value={color}>
                {color.charAt(0).toUpperCase() + color.slice(1)} ({colorCodes[color].value})
              </option>
            ))}
        </select>
      </div>
    </div>

    <div className="band-row">
      <div className="band-selector">
        <label htmlFor="band3">3rd Band (Multiplier)</label>
        <select 
          id="band3" 
          value={band3} 
          onChange={e => setBand3(e.target.value)}
          style={{ borderLeft: `10px solid ${band3}` }}
        >
          {Object.keys(colorCodes).map(color => (
            <option key={color} value={color}>
              {color.charAt(0).toUpperCase() + color.slice(1)} (×{colorCodes[color].multiplier})
            </option>
          ))}
        </select>
      </div>

      <div className="band-selector">
        <label htmlFor="band4">4th Band (Tolerance)</label>
        <select 
          id="band4" 
          value={band4} 
          onChange={e => setBand4(e.target.value)}
          style={{ borderLeft: `10px solid ${band4}` }}
        >
          {Object.keys(colorCodes)
            .filter(color => colorCodes[color].tolerance !== undefined)
            .map(color => (
              <option key={color} value={color}>
                {color.charAt(0).toUpperCase() + color.slice(1)} (±{colorCodes[color].tolerance}%)
              </option>
            ))}
        </select>
      </div>
    </div>
  </div>
</div>

              {result && (
                <div className={`results-section ${animate ? 'animate' : ''}`}>
                  <div className="results-card">
                    <h2>
                      <span className="icon">Ω</span>
                      Resistor Specifications
                    </h2>
                    
                    <div className="resistor-display">
                      <div className="resistor-body">
                        {result.colors.map((color, index) => (
                          <div 
                            key={index} 
                            className="resistor-band" 
                            style={{ backgroundColor: color }}
                            title={`Band ${index+1}: ${color}`}
                          ></div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="results-grid">
                      <div className="result-box">
                        <p className="result-label">Resistance Value</p>
                        <p className="result-value">{result.formatted}</p>
                      </div>
                      
                      <div className="result-box">
                        <p className="result-label">Tolerance</p>
                        <p className="result-value">±{result.tolerance}%</p>
                      </div>
                      
                      <div className="result-box">
                        <p className="result-label">Minimum Value</p>
                        <p className="result-value">{formatResistance(result.range.min)}</p>
                      </div>
                      
                      <div className="result-box">
                        <p className="result-label">Maximum Value</p>
                        <p className="result-value">{formatResistance(result.range.max)}</p>
                      </div>
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
              <h2>About Resistor Color Codes</h2>
              <div className="resistor-calculator-description">
                <p>Our <strong>Resistor Color Code Calculator</strong> instantly decodes the value and tolerance of resistors based on their colored bands. This essential tool helps engineers, students, and electronics enthusiasts quickly identify resistor specifications without manual calculations.</p>

                <p>The calculator supports the standard <strong>4-band resistor</strong> coding system, where:
                  <ul>
                    <li>First band represents the first significant digit</li>
                    <li>Second band represents the second significant digit</li>
                    <li>Third band indicates the multiplier</li>
                    <li>Fourth band specifies the tolerance percentage</li>
                  </ul>
                </p>

                <p>This tool automatically handles all standard color codes including special values like <strong>gold (±5%)</strong> and <strong>silver (±10%)</strong> tolerance bands. It calculates both the nominal resistance value and the minimum/maximum range based on tolerance.</p>

                <p>Perfect for <strong>electronics hobbyists</strong> building circuits, <strong>students</strong> learning electronics, and <strong>technicians</strong> repairing equipment. The visual resistor display helps verify your color band selections match your physical component.</p>
              </div>
              <div className="tip">
                <span>💡</span> Tip: Hover over the resistor bands in the results to see which color represents each band!
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
        .resistor-calculator-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #8e9eab 0%, #eef2f3 100%);
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
        
        .resistor-calculator {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .header {
          text-align: center;
          margin-bottom: 1rem;
          border-radius: 12px;
        }
        
        .header h1 {
          font-size: 1.2rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }
        
        .subtitle {
          font-size: 1.25rem;
          max-width: 500px;
          margin: 0 auto;
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
        
        .band-selectors {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.band-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.2rem;
}

.band-selector {
  display: flex;
  flex-direction: column;
}

.band-selector label {
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: #2d3748;
  margin-bottom: 0.2rem;
}

.band-selector select {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  background-color: white;
  transition: all 0.2s;
  padding-left: 15px;
}

@media (max-width: 640px) {
  .band-row {
    grid-template-columns: 1fr;
  }
}
        
        .band-selector select:focus {
          outline: none;
          border-color: #5d9cec;
          box-shadow: 0 0 0 2px rgba(93, 156, 236, 0.2);
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
          background: #3a5169;
          border-radius: 8px;
          padding: 1.5rem;
          border: 2px solid #5d9cec;
          color: white;
        }
        
        .results-card h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
        }
        
        .results-card h2 .icon {
          margin-right: 0.5rem;
          font-size: 1.8rem;
        }
        
        .resistor-display {
          display: flex;
          justify-content: center;
          margin: 1.5rem 0;
        }
        
        .resistor-body {
          display: flex;
          align-items: center;
          background: #f5d7b3;
          height: 40px;
          width: 200px;
          position: relative;
          border-radius: 4px;
        }
        
        .resistor-body:before,
        .resistor-body:after {
          content: "";
          position: absolute;
          width: 20px;
          height: 10px;
          background: #c0c0c0;
          top: 15px;
        }
        
        .resistor-body:before {
          left: -20px;
        }
        
        .resistor-body:after {
          right: -20px;
        }
        
        .resistor-band {
          height: 100%;
          width: 20px;
          margin: 0 5px;
        }
        
        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        
        .result-box {
          background: rgba(255, 255, 255, 0.1);
          padding: 1rem;
          border-radius: 6px;
          text-align: center;
        }
        
        .result-label {
          font-size: 0.875rem;
          color: #a3b8d1;
          margin: 0 0 0.5rem 0;
        }
        
        .result-value {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
          color: white;
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
        
        .about-section ul {
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        
        .about-section li {
          margin-bottom: 0.5rem;
        }
        
        .tip {
          display: flex;
          align-items: center;
          background:rgba(30, 41, 60, 0.30);
          padding: 1rem;
          border-radius: 6px;
          border-left: 4px solid #1E293C;
          color: #1E293C;
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
            font-size: 1.2rem;
          }
          
          .subtitle {
            font-size: 1rem;
          }
          
          .results-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}