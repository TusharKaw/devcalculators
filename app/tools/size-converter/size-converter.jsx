"use client";

import { useState } from "react";

const SIZE_UNITS = [
  { label: "Bytes", value: "B" },
  { label: "Kilobytes", value: "KB" },
  { label: "Megabytes", value: "MB" },
  { label: "Gigabytes", value: "GB" },
  { label: "Terabytes", value: "TB" },
  { label: "Petabytes", value: "PB" },
];

const unitFactors = {
  B: 1,
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
  TB: 1024 * 1024 * 1024 * 1024,
  PB: 1024 * 1024 * 1024 * 1024 * 1024,
};

function convertSize(value, from, to) {
  if (isNaN(value) || value === "") return "";
  const bytes = parseFloat(value) * unitFactors[from];
  return bytes / unitFactors[to];
}

export default function SizeConverter() {
  const [input, setInput] = useState("");
  const [fromUnit, setFromUnit] = useState("MB");
  const [toUnit, setToUnit] = useState("GB");
  const [error, setError] = useState("");

  const handleConvert = () => {
    if (input === "" || isNaN(input)) {
      setError("Please enter a valid number.");
      return;
    }
    setError("");
  };

  const quickConvert = (unit) => {
    setToUnit(unit);
    setError("");
  };

  const result = input && !isNaN(input) ? convertSize(input, fromUnit, toUnit) : "";

  return (
    <div className="size-converter-container">
      <div className="main-content-wrapper">
        <div className="calculator-content">
          <div className="size-converter">
            <div className="header">
              <h2>Size Converter</h2>
              <p className="subtitle">Convert between bytes, KB, MB, GB, TB, and PB</p>
            </div>
            <div className="calculator-card">
              <div className="input-section">
                <div className="input-row">
                  <input
                    type="number"
                    className="size-input"
                    placeholder="Enter value"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                  />
                  <select
                    className="unit-select"
                    value={fromUnit}
                    onChange={e => setFromUnit(e.target.value)}
                  >
                    {SIZE_UNITS.map(u => (
                      <option key={u.value} value={u.value}>{u.label}</option>
                    ))}
                  </select>
                  <span className="arrow">→</span>
                  <select
                    className="unit-select"
                    value={toUnit}
                    onChange={e => setToUnit(e.target.value)}
                  >
                    {SIZE_UNITS.map(u => (
                      <option key={u.value} value={u.value}>{u.label}</option>
                    ))}
                  </select>
                </div>
                <div className="quick-convert-row">
                  <span>Quick convert to:</span>
                  {SIZE_UNITS.filter(u => u.value !== fromUnit).map(u => (
                    <button
                      key={u.value}
                      className={`quick-btn${toUnit === u.value ? " active" : ""}`}
                      onClick={() => quickConvert(u.value)}
                    >
                      {u.label}
                    </button>
                  ))}
                </div>
                <button className="convert-btn" onClick={handleConvert}>Convert</button>
                {error && <div className="error-message">{error}</div>}
              </div>
              {result !== "" && !error && (
                <div className="results-section">
                  <div className="results-card size-results">
                    <h2>
                      <span className="icon">🔄</span>
                      Conversion Result
                    </h2>
                    <div className="size-result-value">{input} {fromUnit} = {result} {toUnit}</div>
                  </div>
                  <div className="conversion-summary">
                    <h3>Summary</h3>
                    <ul>
                      {SIZE_UNITS.map(u => (
                        <li key={u.value}>
                          <span>{u.label}:</span> <span>{convertSize(input, fromUnit, u.value)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <div className="ad-placeholder mobile-ad">
              <span>300x250 Ad Banner</span>
            </div>
            <div className="about-section">
              <h2>About Size Converter</h2>
              <div className="size-converter-description">
                <p>The <strong>Size Converter</strong> helps you convert between digital storage units like bytes, kilobytes, megabytes, and more. Use the quick buttons for fast conversions.</p>
              </div>
              <div className="tip">
                <span>💡</span> Tip: 1 MB = 1024 KB
              </div>
            </div>
          </div>
        </div>
        <div className="ad-placeholder">
          <span>300x250 Ad Banner</span>
        </div>
      </div>
      <style jsx>{`
        .size-converter-container {
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
        .size-converter {
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
        .input-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .size-input {
          width: 120px;
          padding: 0.7rem 1rem;
          font-size: 1.2rem;
          border: 1px solid #cbd5e0;
          border-radius: 8px;
          color: #1a1a1a;
        }
        .unit-select {
          padding: 0.7rem 1rem;
          font-size: 1.1rem;
          border: 1px solid #cbd5e0;
          border-radius: 8px;
          color: #1a1a1a;
          background: #f7fafc;
        }
        .arrow {
          font-size: 1.5rem;
          color: #28A844;
          margin: 0 0.5rem;
        }
        .quick-convert-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .quick-btn {
          background: #e8f9ee;
          color: #28A844;
          border: none;
          border-radius: 6px;
          padding: 0.5rem 1rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .quick-btn.active, .quick-btn:hover {
          background: #28A844;
          color: #fff;
        }
        .convert-btn {
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
        .convert-btn:hover {
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
        .results-card.size-results {
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
        .size-result-value {
          font-size: 1.5rem;
          color: #28A844;
          font-weight: bold;
        }
        .conversion-summary {
          margin-top: 1.5rem;
          background: #f7fafc;
          border-radius: 8px;
          padding: 1rem;
        }
        .conversion-summary h3 {
          color: #28A844;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }
        .conversion-summary ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .conversion-summary li {
          display: flex;
          justify-content: space-between;
          padding: 0.2rem 0;
          font-size: 1rem;
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
          .input-row {
            flex-direction: column;
            gap: 0.3rem;
          }
          .quick-convert-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.3rem;
          }
        }
      `}</style>
    </div>
  );
} 