"use client"

import { useState } from "react"

function calculateLove(name1, name2) {
  const combined = (name1 + name2).toLowerCase()
  let score = 0
  
  // Simple algorithm based on character codes
  for (let i = 0; i < combined.length; i++) {
    score += combined.charCodeAt(i)
  }

  // Add some randomness based on name lengths
  score += name1.length * name2.length
  
  // Get percentage between 50-100
  const percentage = 50 + (score % 50)
  
  return {
    percentage: percentage,
    description: getLoveDescription(percentage)
  }
}

function getLoveDescription(percentage) {
  if (percentage >= 95) return "💕 True love! You two are soulmates! 💕"
  if (percentage >= 85) return "💖 Amazing love! You have a very special connection! 💖"
  if (percentage >= 75) return "💝 Great love! You're perfect for each other! 💝"
  if (percentage >= 65) return "💗 Good love! You have a strong relationship! 💗"
  if (percentage >= 55) return "💓 Nice love! There's potential here! 💓"
  if (percentage >= 50) return "💔 Moderate love. Give it time to grow! 💔"
  return "💔 Challenging love. Communication is key! 💔"
}

export default function LoveCalculator() {
  const [name1, setName1] = useState("")
  const [name2, setName2] = useState("")
  const [result, setResult] = useState(null)

  const calculate = () => {
    if (!name1.trim() || !name2.trim()) return setResult(null)
    
    const love = calculateLove(name1, name2)
    
    setResult({
      name1: name1,
      name2: name2,
      percentage: love.percentage,
      description: love.description
    })
  }

  const getCompatibilityColor = (percentage) => {
    if (percentage >= 95) return "#e91e63"
    if (percentage >= 85) return "#ff4081"
    if (percentage >= 75) return "#f06292"
    if (percentage >= 65) return "#f48fb1"
    if (percentage >= 55) return "#f8bbd9"
    return "#ffcdd2"
  }

  return (
    <div className="love-calculator-container">
      <div className="main-content-wrapper">
        <div className="calculator-content">
          <div className="love-calculator">
            <div className="header">
              <h2>💕 Love Calculator 💕</h2>
              <p className="subtitle">Discover your love compatibility!</p>
            </div>

            <div className="calculator-card">
              <div className="input-section">
                <h3>Enter Your Names</h3>
                <div className="names-input">
                  <div className="input-group">
                    <input
                      id="name1"
                      type="text"
                      value={name1}
                      onChange={e => setName1(e.target.value)}
                      placeholder="Enter first name"
                      className="name-input"
                    />
                  </div>
                  <div className="love-icon">❤️</div>
                  <div className="input-group">
                    <input
                      id="name2"
                      type="text"
                      value={name2}
                      onChange={e => setName2(e.target.value)}
                      placeholder="Enter second name"
                      className="name-input"
                    />
                  </div>
                </div>
                
                <button
                  onClick={calculate}
                  className="calculate-btn"
                  disabled={!name1.trim() || !name2.trim()}
                >
                  💕 Calculate Love 💕
                </button>
              </div>

              {result && (
                <div className="results-section">
                  <div className="results-card">
                    <h2>
                      <span className="icon">💖</span>
                      Love Compatibility Results
                    </h2>
                    
                    <div className="love-result">
                      <div className="couple-names">
                        <span className="name">{result.name1}</span>
                        <span className="heart-animation">💕</span>
                        <span className="name">{result.name2}</span>
                      </div>
                      
                      <div className="compatibility-score">
                        <div className="score-circle" style={{ background: `conic-gradient(${getCompatibilityColor(result.percentage)} ${result.percentage * 3.6}deg, #e2e8f0 0deg)` }}>
                          <div className="score-inner">
                            <span className="percentage">{result.percentage}%</span>
                            <span className="label">Love Match</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="love-description">
                        <p>{result.description}</p>
                      </div>
                      
                      <div className="compatibility-bar">
                        <div className="bar-background">
                          <div 
                            className="bar-fill" 
                            style={{ 
                              width: `${result.percentage}%`, 
                              backgroundColor: getCompatibilityColor(result.percentage) 
                            }}
                          ></div>
                        </div>
                        <div className="bar-labels">
                          <span>0%</span>
                          <span>50%</span>
                          <span>100%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="disclaimer">
                      <p>*This is for entertainment purposes only! True love is about much more than names. 💝</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Mobile Ad Placeholder */}
            <div className="ad-placeholder mobile-ad">
              <span>300x250 Ad Banner</span>
            </div>
            
            <div className="about-section">
              <h2>About Love Calculator</h2>
              <div className="love-calculator-description">
                <p>Our fun <strong>Love Calculator</strong> is designed to calculate the <strong>love compatibility</strong> between two people based on their names. This entertaining tool uses a unique algorithm to determine your <strong>love percentage</strong> and provides playful insights about your romantic compatibility.</p>

                <p>Whether you're curious about a <strong>crush</strong>, want to test your <strong>relationship compatibility</strong>, or just looking for some fun with friends, our <strong>love compatibility calculator</strong> offers instant results with beautiful visualizations and personalized descriptions.</p>

                <p>The calculator analyzes the <strong>names</strong> you input and generates a <strong>love score</strong> along with a detailed compatibility description. It's perfect for <strong>entertainment</strong>, <strong>parties</strong>, or just satisfying your curiosity about love matches.</p>

                <p>Our tool is completely <strong>free to use</strong>, requires <strong>no registration</strong>, and works perfectly on all devices. Share your results with friends and discover your love compatibility today!</p>
              </div>
              <div className="tip">
                <span>💡</span> Tip: Try different name combinations to see how compatibility changes!
              </div>
            </div>
          </div>
        </div>

        <div className="ad-placeholder">
          <span>300x250 Ad Banner</span>
        </div>
      </div>

      <style jsx>{`
        .love-calculator-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #ffeef3 0%, #ffe0e8 100%);
          padding: 1rem 1rem 2rem 1rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        .main-content-wrapper {
          display: flex;
          max-width: 1200px;
          margin: 0 auto;
          gap: 2rem;
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
          border-radius: 8px;
          margin-top: 2rem;
        }
        
        .mobile-ad {
          display: none;
        }
        
        .love-calculator {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .header {
          text-align: center;
          margin-bottom: 1rem;
          border-radius: 12px;
        }
        
        .header h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0;
          background: linear-gradient(135deg, #e91e63 0%, #f06292 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .subtitle {
          font-size: 1.125rem;
          color: #fff;
          margin-top: 0.5rem;
          margin-bottom: 0;
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
        
        .input-section h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 1rem;
        }
        
        .names-input {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .input-group {
          flex: 1;
        }
        
        .input-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.5rem;
        }
        
        .name-input {
          width: 100%;
          padding: 0.75rem;
          font-size: 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          transition: all 0.2s;
        }
        
        .name-input:focus {
          outline: none;
          border-color: #e91e63;
          box-shadow: 0 0 0 2px rgba(233, 30, 99, 0.2);
        }
        
        .love-icon {
          font-size: 1.5rem;
          animation: heartbeat 2s infinite;
        }
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        .calculate-btn {
          width: 100%;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #e91e63 0%, #f06292 100%);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          transition: all 0.2s;
        }
        
        .calculate-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(233, 30, 99, 0.3);
        }
        
        .calculate-btn:disabled {
          background:rgb(255, 148, 184);
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        .results-section {
          padding: 0 1.5rem 1.5rem;
          animation: fadeIn 0.3s ease-in;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .results-card {
          background: linear-gradient(135deg, #e91e63 0%, #f06292 100%);
          border-radius: 8px;
          padding: 1.5rem;
          color: white;
        }
        
        .results-card h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
        }
        
        .results-card .icon {
          font-size: 1.5rem;
          margin-right: 0.75rem;
        }
        
        .love-result {
          text-align: center;
        }
        
        .couple-names {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .name {
          font-size: 1.125rem;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 20px;
        }
        
        .heart-animation {
          font-size: 1.5rem;
          animation: pulse 1.5s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        
        .compatibility-score {
          margin-bottom: 1.5rem;
        }
        
        .score-circle {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          margin: 0 auto 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        
        .score-inner {
          width: 120px;
          height: 120px;
          background: white;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #e91e63;
        }
        
        .percentage {
          font-size: 2rem;
          font-weight: 700;
          line-height: 1;
        }
        
        .label {
          font-size: 0.75rem;
          font-weight: 500;
          margin-top: 0.25rem;
        }
        
        .love-description {
          margin-bottom: 1.5rem;
        }
        
        .love-description p {
          font-size: 1.125rem;
          line-height: 1.6;
          background: rgba(255, 255, 255, 0.1);
          padding: 1rem;
          border-radius: 8px;
          margin: 0;
        }
        
        .compatibility-bar {
          margin-bottom: 1rem;
        }
        
        .bar-background {
          height: 8px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }
        
        .bar-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.8s ease;
        }
        
        .bar-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.8);
        }
        
        .disclaimer {
          text-align: center;
          margin-top: 1rem;
        }
        
        .disclaimer p {
          font-size: 0.875rem;
          opacity: 0.8;
          font-style: italic;
          margin: 0;
        }
        
        .about-section {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          margin-top: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        .about-section h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 1rem;
        }
        
        .love-calculator-description {
          line-height: 1.6;
          color: #4b5563;
        }
        
        .love-calculator-description p {
          margin-bottom: 1rem;
        }
        
        .tip {
          display: flex;
          align-items: center;
          background: #fef3c7;
          padding: 1rem;
          border-radius: 8px;
          margin-top: 1.5rem;
          border-left: 4px solid #f59e0b;
          font-size: 0.875rem;
          color: #92400e;
        }
        
        .tip span {
          margin-right: 0.5rem;
        }
        
        @media (max-width: 1024px) {
          .main-content-wrapper {
            flex-direction: column;
          }
          
          .main-content-wrapper > .ad-placeholder {
            display: none;
          }
          
          .mobile-ad {
            display: flex !important;
            width: 100%;
            max-width: 300px;
            margin: 1rem auto;
          }
        }
        
        @media (max-width: 640px) {
          .header h2 {
            font-size: 2rem;
          }
          
          .names-input {
            flex-direction: column;
            gap: 1rem;
          }
          
          .love-icon {
            order: -1;
          }
          
          .input-group {
            width: 100%;
          }
          
          .name-input {
            width: 100%;
          }
          
          .calculate-btn {
            width: 100%;
          }
          
          .couple-names {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .heart-animation {
            order: 1;
          }
          
          .score-circle {
            width: 120px;
            height: 120px;
          }
          
          .score-inner {
            width: 100px;
            height: 100px;
          }
          
          .percentage {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}