"use client";

import { useState } from "react";

function calculateSD(numbers) {
  if (!numbers.length) return null;
  const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
  const variance = numbers.reduce((a, b) => a + (b - mean) ** 2, 0) / numbers.length;
  return Math.sqrt(variance);
}

export default function StandardDeviationCalculator() {
  const [input, setInput] = useState("");
  const [numbers, setNumbers] = useState([]);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const nums = input
      .split(/,|\s+/)
      .map(Number)
      .filter(n => !isNaN(n));
    if (!nums.length) {
      setError("Please enter a list of numbers, separated by commas or spaces.");
      setResult(null);
      setNumbers([]);
      return;
    }
    setError("");
    setNumbers(nums);
    setResult(calculateSD(nums));
  };

  return (
    <div className="sd-calculator-container">
      <div className="main-content-wrapper">
        <div className="calculator-content">
          <div className="sd-calculator">
            <div className="header">
              <h2>Standard Deviation Calculator</h2>
              <p className="subtitle">Calculate the standard deviation of a data set</p>
            </div>
            <div className="calculator-card">
              <div className="input-section">
                <input
                  type="text"
                  className="sd-input"
                  placeholder="Enter numbers (comma or space separated)"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                />
                <button className="calc-btn" onClick={handleCalculate}>Calculate</button>
                {error && <div className="error-message">{error}</div>}
              </div>
              {result !== null && !error && (
                <div className="results-section">
                  <div className="results-card sd-results">
                    <h2>
                      <span className="icon">📊</span>
                      Standard Deviation
                    </h2>
                    <div className="sd-result-value">{result}</div>
                  </div>
                  <div className="bar-chart-section">
                    <h3>Data Visualization</h3>
                    <div className="bar-chart">
                      {numbers.map((n, i) => (
                        <div key={i} className="bar-wrapper">
                          <div
                            className="bar"
                            style={{ height: `${(n / Math.max(...numbers)) * 100}%` }}
                            title={n}
                          ></div>
                          <span className="bar-label">{n}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="ad-placeholder mobile-ad">
              <span>300x250 Ad Banner</span>
            </div>
            <div className="about-section">
              <h2>About Standard Deviation Calculator</h2>
              <div className="sd-calculator-description">
                <p>The <strong>Standard Deviation Calculator</strong> helps you quickly find the standard deviation of a set of numbers. Enter your data and see a visual summary.</p>
              </div>
              <div className="tip">
                <span>💡</span> Tip: Standard deviation measures the spread of your data.
              </div>
            </div>
          </div>
        </div>
        <div className="ad-placeholder">
          <span>300x250 Ad Banner</span>
        </div>
      </div>
      <style jsx>{`
        .sd-calculator-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #e8f9ee 0%, #d2f4e3 100%);
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
          border: 1px dashed #28A844;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #28A844;
        }
        .mobile-ad {
          display: none;
        }
        .sd-calculator {
          max-width: 800px;
          margin: 0 auto;
        }
        .header {
          text-align: center;
          margin-bottom: 1rem;
          border-radius: 12px;
          background: #28A844;
          color: #fff;
          padding: 1.5rem 1rem 1rem 1rem;
        }
        .header h2 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          color: #fff;
        }
        .subtitle {
          font-size: 1.25rem;
          color: #fff;
          max-width: 500px;
          margin: 0 auto;
        }
        .calculator-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.07);
          padding: 2rem 1.5rem 1.5rem 1.5rem;
          margin-bottom: 2rem;
        }
        .input-section {
          margin-bottom: 1.5rem;
        }
        .sd-input {
          width: 100%;
          padding: 0.7rem 1rem;
          font-size: 1.2rem;
          border: 1px solid #cbd5e0;
          border-radius: 8px;
          margin-bottom: 1rem;
          color: #1a1a1a;
        }
        .calc-btn {
          background: #28A844;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 0.7rem 2rem;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          margin-top: 0.5rem;
          transition: background 0.2s;
        }
        .calc-btn:hover {
          background: #21913a;
        }
        .error-message {
          color: #e53e3e;
          font-size: 0.95rem;
          margin-top: 0.5rem;
        }
        .results-section {
          margin-top: 2rem;
        }
        .results-card.sd-results {
          background: #e8f9ee;
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          border: 2px solid #28A844;
        }
        .results-card h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #28A844;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .results-card h2 .icon {
          margin-right: 0.5rem;
        }
        .sd-result-value {
          font-size: 2rem;
          color: #28A844;
          font-weight: bold;
        }
        .bar-chart-section {
          margin-top: 1.5rem;
          background: #f7fafc;
          border-radius: 8px;
          padding: 1rem;
        }
        .bar-chart-section h3 {
          color: #28A844;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }
        .bar-chart {
          display: flex;
          align-items: flex-end;
          gap: 0.5rem;
          height: 120px;
          margin-top: 0.5rem;
        }
        .bar-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 24px;
        }
        .bar {
          width: 100%;
          background: #28A844;
          border-radius: 4px 4px 0 0;
          transition: height 0.3s;
        }
        .bar-label {
          font-size: 0.9rem;
          color: #1a1a1a;
          margin-top: 0.2rem;
        }
        .about-section {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          margin-top: 2rem;
        }
        .about-section h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #28A844;
          margin-bottom: 1rem;
        }
        .about-section p {
          color: #1a1a1a;
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        .tip {
          background: #e8f9ee;
          border-radius: 8px;
          padding: 0.7rem 1rem;
          color: #28A844;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
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
          .subtitle {
            font-size: 1rem;
          }
          .bar-chart {
            height: 80px;
          }
        }
      `}</style>
    </div>
  );
} 