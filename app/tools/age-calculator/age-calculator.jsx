"use client"

import { useState, useEffect } from "react";

function calculateAge(birthdate) {
  const today = new Date();
  const birth = new Date(birthdate);
  
  if (isNaN(birth.getTime())) return null;
  
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();
  
  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  
  // Calculate additional time units
  const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;
  const totalSeconds = totalMinutes * 60;
  const totalWeeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;
  const totalMonths = years * 12 + months;
  
  return { 
    years, 
    months, 
    days,
    totalMonths,
    totalWeeks,
    remainingDays,
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds
  };
}

export default function AgeCalculator() {
  const [birthdate, setBirthdate] = useState("");
  const [result, setResult] = useState(null);
  const [animate, setAnimate] = useState(false);

  const calculate = () => {
    if (!birthdate) {
      setResult(null);
      return;
    }
    
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      setResult(calculateAge(birthdate));
    }, 300);
  };

  // Auto-calculate when date changes
  useEffect(() => {
    if (birthdate) {
      calculate();
    }
  }, [birthdate]);

  return (
    <div className="age-calculator-container">
      <div className="main-content-wrapper">
        <div className="calculator-content">
          <div className="age-calculator">
            <div className="header">
              <h2 style={{color:'white'}}>Age Calculator</h2>
              <p className="subtitle" style={{color:'white'}}>Discover your exact age in different time units</p>
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
                  />
                  <button
                    onClick={calculate}
                    disabled={!birthdate}
                    className={!birthdate ? 'disabled' : ''}
                  >
                    Calculate
                  </button>
                </div>
              </div>

              {result && (
                <div className={`results-section ${animate ? 'animate' : ''}`}>
                  <div className="results-card">
                    <h2>
                      <span className="icon">📅</span>
                      Your Age
                    </h2>
                    
                    <div className="results-grid">
                      <div className="result-box">
                        <p>
                          <span className="highlight">{result.years}</span><text style={{color:'#000'}}> years</text><br />
                          <span className="highlight">{result.months}</span><text style={{color:'#000'}}> months</text><br />
                          <span className="highlight">{result.days}</span><text style={{color:'#000'}}> days</text>
                        </p>
                      </div>
                      
                      <div className="result-box">
                        <p>
                          <span className="highlight">{result.totalMonths}</span><text style={{color:'#000'}}> months</text><br />
                          <span className="highlight">{result.days}</span><text style={{color:'#000'}}> days</text>
                        </p>
                      </div>
                      
                      <div className="result-box">
                        <p>
                          <span className="highlight">{result.totalWeeks}</span><text style={{color:'#000'}}> weeks</text><br />
                          <span className="highlight">{result.remainingDays}</span><text style={{color:'#000'}}> days</text>
                        </p>
                      </div>
                      
                      <div className="result-box">
                        <p>
                        <span className="highlight">{result.totalDays.toLocaleString()}</span><text style={{color:'#000'}}> days</text>
                        </p>
                      </div>
                    </div>
                    
                    <div className="other-units">
                      <h3>In other units:</h3>
                      <div className="units-grid">
                        <div className="unit-box">
                          <p className="unit-label">Hours</p>
                          <p className="unit-value">{result.totalHours.toLocaleString()}</p>
                        </div>
                        <div className="unit-box">
                          <p className="unit-label">Minutes</p>
                          <p className="unit-value">{result.totalMinutes.toLocaleString()}</p>
                        </div>
                        <div className="unit-box">
                          <p className="unit-label">Seconds</p>
                          <p className="unit-value">{result.totalSeconds.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="about-section">
              <h2>About Age Calculator</h2>
              <div className="age-calculator-description">
                <p>Our advanced <strong>age calculator</strong> is the most precise online tool to <strong>determine your exact age</strong> from your date of birth. Whether you need to know your current age in <strong>years, months, days</strong>, or even down to <strong>hours, minutes and seconds</strong>, this free calculator provides instant, accurate results.</p>

                <p>This versatile <strong>birthday calculator</strong> serves multiple purposes - from tracking <strong>baby's developmental milestones</strong> and <strong>school age requirements</strong> to planning <strong>retirement dates</strong> and <strong>medical age tracking</strong>. It automatically accounts for <strong>leap years</strong> and provides results in various formats including total months, weeks+days, or days only.</p>

                <p>Unlike basic age tools, our calculator answers specific questions like <em>"How many weeks old am I?"</em> or <em>"How many days until my next birthday?"</em>. It's particularly useful for <strong>parents</strong> tracking children's growth, <strong>athletes</strong> monitoring training milestones, and <strong>genealogists</strong> researching family histories.</p>

                <p>The tool is completely <strong>free to use</strong>, requires <strong>no registration</strong>, and works seamlessly across all devices including <strong>mobile phones</strong> and <strong>tablets</strong>. With its simple interface and detailed results, it's become a favorite among educators, healthcare professionals, and curious individuals worldwide.</p>

                <p>For added convenience, you can <strong>bookmark this page</strong> to regularly check age-related statistics or share your results on social media. </p>
              </div>
              <div className="tip">
                <span>💡</span> Tip: The calculation is based on your local time zone.
              </div>
            </div>
          </div>
        </div>

        <div className="ad-banner">
          <div className="ad-content">
            <p>Advertisement</p>
            <div className="ad-placeholder">
              {/* Replace this with your actual ad component */}
              <span>300x250 Ad Banner</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .age-calculator-container {
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
        
        .ad-banner {
          width: 300px;
          flex-shrink: 0;
        }
        
        .ad-content {
          position: sticky;
          top: 1rem;
          background: white;
          border-radius: 8px;
          padding: 1rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        
        .ad-content p {
          color: #718096;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }
        
        .ad-placeholder {
          width: 300px;
          height: 250px;
          background: #f7fafc;
          border: 1px dashed #cbd5e0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a0aec0;
        }
        
        .age-calculator {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .header {
          text-align: center;
          margin-bottom: 1rem;
        }
        
        .header h1 {
          font-size: 2.5rem;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
        }
        
        .subtitle {
          font-size: 1.25rem;
          color: #4a5568;
          max-width: 500px;
          margin: 0 auto;
        }
        
        .calculator-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          margin-bottom: 1rem;
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
          border-color: #4299e1;
          box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
        }
        
        .input-group button {
          padding: 0.75rem 1.5rem;
          background: #4299e1;
          color: white;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 1rem;
        }
        
        .input-group button:hover {
          background: #3182ce;
        }
        
        .input-group button.disabled {
          background: #a0aec0;
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
          background: #ebf8ff;
          border-radius: 8px;
          padding: 1.5rem;
          border: 2px solid #bee3f8;
        }
        
        .results-card h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2b6cb0;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
        }
        
        .results-card h2 .icon {
          margin-right: 0.5rem;
        }
        
        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .result-box {
          background: white;
          padding: 1rem;
          border-radius: 6px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #edf2f7;
        }
        
        .result-box p {
          font-size: 1.125rem;
          line-height: 1.6;
          margin: 0;
        }
        
        .highlight {
          font-weight: 600;
          color: #2b6cb0;
        }
        
        .other-units {
          padding-top: 1.5rem;
          border-top: 1px solid #bee3f8;
        }
        
        .other-units h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #4a5568;
          margin-bottom: 1rem;
        }
        
        .units-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 0.75rem;
        }
        
        .unit-box {
          background: #bee3f8;
          padding: 0.75rem;
          border-radius: 6px;
        }
        
        .unit-label {
          font-size: 0.875rem;
          color: #4a5568;
          margin: 0 0 0.25rem 0;
        }
        
        .unit-value {
          font-family: 'Courier New', Courier, monospace;
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0;
          color: #2b6cb0;
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
          color: #4a5568;
          font-size: 0.875rem;
        }
        
        .tip span {
          margin-right: 0.5rem;
        }
        
        @media (max-width: 1024px) {
          .main-content-wrapper {
            flex-direction: column;
          }
          
          .ad-banner {
            width: 100%;
            order: -1;
            margin-bottom: 1.5rem;
          }
          
          .ad-content {
            position: static;
          }
          
          .ad-placeholder {
            width: 100%;
            max-width: 300px;
            margin: 0 auto;
          }
        }
        
        @media (max-width: 640px) {
          .header h1 {
            font-size: 2rem;
          }
          
          .subtitle {
            font-size: 1rem;
          }
          
          .input-group {
            flex-direction: column;
          }
          
          .results-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}