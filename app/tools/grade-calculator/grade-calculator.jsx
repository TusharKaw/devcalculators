"use client";

import { useState } from "react";

function calculateWeightedGrade(entries) {
  let total = 0, weightSum = 0;
  for (const { score, weight } of entries) {
    if (!isNaN(score) && !isNaN(weight)) {
      total += Number(score) * Number(weight);
      weightSum += Number(weight);
    }
  }
  return weightSum ? (total / weightSum) : 0;
}

export default function GradeCalculator() {
  const [entries, setEntries] = useState([
    { score: "", weight: "" },
    { score: "", weight: "" },
  ]);
  const [error, setError] = useState("");

  const handleEntryChange = (idx, field, value) => {
    setEntries(entries => entries.map((e, i) => i === idx ? { ...e, [field]: value } : e));
  };
  const addEntry = () => setEntries([...entries, { score: "", weight: "" }]);
  const removeEntry = idx => setEntries(entries.filter((_, i) => i !== idx));

  const validEntries = entries.filter(e => e.score !== "" && e.weight !== "" && !isNaN(e.score) && !isNaN(e.weight));
  const grade = validEntries.length ? calculateWeightedGrade(validEntries) : null;

  return (
    <div className="grade-calculator-container">
      <div className="main-content-wrapper">
        <div className="calculator-content">
          <div className="grade-calculator">
            <div className="header">
              <h2>Grade Calculator</h2>
              <p className="subtitle">Calculate your weighted grade and see a visual distribution</p>
            </div>
            <div className="calculator-card">
              <div className="input-section">
                {entries.map((entry, idx) => (
                  <div className="entry-row" key={idx}>
                    <input
                      type="number"
                      className="score-input"
                      placeholder="Score"
                      value={entry.score}
                      onChange={e => handleEntryChange(idx, "score", e.target.value)}
                      min="0"
                      max="100"
                    />
                    <input
                      type="number"
                      className="weight-input"
                      placeholder="Weight %"
                      value={entry.weight}
                      onChange={e => handleEntryChange(idx, "weight", e.target.value)}
                      min="0"
                      max="100"
                    />
                    {entries.length > 2 && (
                      <button className="remove-btn" onClick={() => removeEntry(idx)} title="Remove entry">✕</button>
                    )}
                  </div>
                ))}
                <button className="add-btn" onClick={addEntry}>+ Add Row</button>
                {error && <div className="error-message">{error}</div>}
              </div>
              {grade !== null && !error && (
                <div className="results-section">
                  <div className="results-card grade-results">
                    <h2>
                      <span className="icon">🎓</span>
                      Weighted Grade
                    </h2>
                    <div className="grade-result-value">{grade.toFixed(2)}%</div>
                  </div>
                  <div className="bar-chart-section">
                    <h3>Grade Distribution</h3>
                    <div className="bar-chart">
                      {validEntries.map((e, i) => (
                        <div key={i} className="bar-wrapper">
                          <div
                            className="bar"
                            style={{ height: `${e.score}%`, background: '#28A844' }}
                            title={`Score: ${e.score}% (Weight: ${e.weight}%)`}
                          ></div>
                          <span className="bar-label">{e.score}%</span>
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
              <h2>About Grade Calculator</h2>
              <div className="grade-calculator-description">
                <p>The <strong>Grade Calculator</strong> helps you calculate your weighted grade and see a visual distribution of your scores. Add as many rows as you need for assignments, exams, or projects.</p>
              </div>
              <div className="tip">
                <span>💡</span> Tip: Weights should add up to 100% for a complete calculation.
              </div>
            </div>
          </div>
        </div>
        <div className="ad-placeholder">
          <span>300x250 Ad Banner</span>
        </div>
      </div>
      <style jsx>{`
        .grade-calculator-container {
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
        .grade-calculator {
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
        .entry-row {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          align-items: center;
        }
        .score-input, .weight-input {
          width: 120px;
          padding: 0.7rem 1rem;
          font-size: 1.1rem;
          border: 1px solid #cbd5e0;
          border-radius: 8px;
          color: #1a1a1a;
        }
        .remove-btn {
          background: #e53e3e;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 0.3rem 0.7rem;
          font-size: 1.1rem;
          cursor: pointer;
        }
        .remove-btn:hover {
          background: #c53030;
        }
        .add-btn {
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
        .add-btn:hover {
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
        .results-card.grade-results {
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
        .grade-result-value {
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