"use client";

import { useState } from "react";

const BUTTONS = [
  ["7", "8", "9", "/"],
  ["4", "5", "6", "*"],
  ["1", "2", "3", "-"],
  ["0", ".", "(", ")"],
  ["+", "^", "C", "="]
];

function safeEval(expr) {
  try {
    // eslint-disable-next-line no-eval
    return eval(expr.replace(/\^/g, "**"));
  } catch {
    return "Error";
  }
}

export default function ScientificCalculator() {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [animate, setAnimate] = useState(false);

  const handleButton = (val) => {
    if (val === "C") {
      setExpr("");
      setResult(null);
      setError("");
      return;
    }
    if (val === "=") {
      const res = safeEval(expr);
      setResult(res);
      setHistory([{ expr, res }, ...history.slice(0, 9)]);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
      setError(res === "Error" ? "Invalid expression" : "");
      return;
    }
    setExpr(expr + val);
    setError("");
  };

  return (
    <div className="scientific-calculator-container">
      <div className="main-content-wrapper">
        <div className="calculator-content">
          <div className="scientific-calculator">
            <div className="header">
              <h2>Scientific Calculator</h2>
              <p className="subtitle">Perform advanced math calculations</p>
            </div>
            <div className="calculator-card">
              <div className="input-section">
                <input
                  type="text"
                  value={expr}
                  onChange={e => setExpr(e.target.value)}
                  className="expr-input"
                  placeholder="Enter expression"
                />
                <div className="button-grid">
                  {BUTTONS.map((row, i) => (
                    <div className="button-row" key={i}>
                      {row.map((btn) => (
                        <button
                          key={btn}
                          className={btn === "=" ? "equals-btn" : btn === "C" ? "clear-btn" : "calc-btn"}
                          onClick={() => handleButton(btn)}
                        >
                          {btn}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
                {error && <div className="error-message">{error}</div>}
              </div>
              {result !== null && !error && (
                <div className={`results-section ${animate ? 'animate' : ''}`}>
                  <div className="results-card sci-results">
                    <h2>
                      <span className="icon">🧮</span>
                      Result
                    </h2>
                    <div className="sci-result-value">{result}</div>
                  </div>
                </div>
              )}
            </div>
            <div className="history-section">
              <h3>History</h3>
              <ul className="history-list">
                {history.length === 0 && <li className="history-empty">No calculations yet.</li>}
                {history.map((h, i) => (
                  <li key={i} className="history-item">
                    <span className="history-expr">{h.expr}</span>
                    <span className="history-res">= {h.res}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ad-placeholder mobile-ad">
              <span>300x250 Ad Banner</span>
            </div>
            <div className="about-section">
              <h2>About Scientific Calculator</h2>
              <div className="scientific-calculator-description">
                <p>The <strong>Scientific Calculator</strong> lets you evaluate math expressions, including parentheses and exponents. Use the button grid or type directly.</p>
              </div>
              <div className="tip">
                <span>💡</span> Tip: Use ^ for exponents (e.g., 2^3 = 8)
              </div>
            </div>
          </div>
        </div>
        <div className="ad-placeholder">
          <span>300x250 Ad Banner</span>
        </div>
      </div>
      <style jsx>{`
        .scientific-calculator-container {
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
        .scientific-calculator {
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
        .expr-input {
          width: 100%;
          padding: 0.7rem 1rem;
          font-size: 1.2rem;
          border: 1px solid #cbd5e0;
          border-radius: 8px;
          margin-bottom: 1rem;
          color: #1a1a1a;
        }
        .button-grid {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .button-row {
          display: flex;
          gap: 0.5rem;
        }
        .calc-btn, .equals-btn, .clear-btn {
          flex: 1;
          padding: 0.7rem 0;
          font-size: 1.1rem;
          font-weight: 600;
          border: none;
          border-radius: 6px;
          background: #e8f9ee;
          color: #28A844;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, transform 0.2s;
        }
        .calc-btn:hover {
          background: #d2f4e3;
        }
        .equals-btn {
          background: #28A844;
          color: #fff;
        }
        .equals-btn:hover {
          background: #21913a;
        }
        .clear-btn {
          background: #e53e3e;
          color: #fff;
        }
        .clear-btn:hover {
          background: #c53030;
        }
        .error-message {
          color: #e53e3e;
          font-size: 0.95rem;
          margin-top: 0.5rem;
        }
        .results-section {
          margin-top: 2rem;
          transition: opacity 0.3s;
        }
        .results-section.animate {
          opacity: 0.5;
        }
        .results-card.sci-results {
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
        .sci-result-value {
          font-size: 2rem;
          color: #28A844;
          font-weight: bold;
        }
        .history-section {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          margin-top: 2rem;
          box-shadow: 0 1px 6px rgba(0,0,0,0.04);
        }
        .history-section h3 {
          font-size: 1.2rem;
          color: #28A844;
          margin-bottom: 1rem;
        }
        .history-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .history-item {
          display: flex;
          justify-content: space-between;
          padding: 0.3rem 0;
          border-bottom: 1px solid #e8f9ee;
          font-size: 1rem;
        }
        .history-empty {
          color: #aaa;
          text-align: center;
          padding: 1rem 0;
        }
        .history-expr {
          color: #1a1a1a;
        }
        .history-res {
          color: #28A844;
          font-weight: bold;
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
          .button-row {
            flex-direction: row;
            gap: 0.3rem;
          }
          .input-section {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
} 