"use client";

import { useState } from "react";

export default function GSTCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("18");
  const [error, setError] = useState("");
  const [type, setType] = useState("exclusive"); // exclusive or inclusive

  let gstAmount = "";
  let netPrice = "";
  let grossPrice = "";
  if (amount && rate && !isNaN(amount) && !isNaN(rate)) {
    if (type === "exclusive") {
      gstAmount = (Number(amount) * Number(rate) / 100).toFixed(2);
      netPrice = Number(amount).toFixed(2);
      grossPrice = (Number(amount) + Number(gstAmount)).toFixed(2);
    } else {
      gstAmount = (Number(amount) * Number(rate) / (100 + Number(rate))).toFixed(2);
      netPrice = (Number(amount) - Number(gstAmount)).toFixed(2);
      grossPrice = Number(amount).toFixed(2);
    }
  }

  return (
    <div className="gst-calculator-container">
      <div className="main-content-wrapper">
        <div className="calculator-content">
          <div className="gst-calculator">
            <div className="header">
              <h2>GST Calculator</h2>
              <p className="subtitle">Calculate GST amount, net price, and gross price</p>
            </div>
            <div className="calculator-card">
              <div className="input-section">
                <input
                  type="number"
                  className="amount-input"
                  placeholder="Amount"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  min="0"
                />
                <input
                  type="number"
                  className="rate-input"
                  placeholder="GST Rate %"
                  value={rate}
                  onChange={e => setRate(e.target.value)}
                  min="0"
                  max="100"
                />
                <div className="type-row">
                  <button
                    className={`type-btn${type === "exclusive" ? " active" : ""}`}
                    onClick={() => setType("exclusive")}
                  >
                    GST Exclusive
                  </button>
                  <button
                    className={`type-btn${type === "inclusive" ? " active" : ""}`}
                    onClick={() => setType("inclusive")}
                  >
                    GST Inclusive
                  </button>
                </div>
                {error && <div className="error-message">{error}</div>}
              </div>
              {gstAmount && !error && (
                <div className="results-section">
                  <div className="results-card gst-results">
                    <h2>
                      <span className="icon">🧾</span>
                      GST Breakdown
                    </h2>
                    <div className="gst-summary">
                      <div><strong>Net Price:</strong> ${netPrice}</div>
                      <div><strong>GST Rate:</strong> {rate}%</div>
                      <div><strong>GST Amount:</strong> ${gstAmount}</div>
                      <div><strong>Gross Price:</strong> <span className="gross-price">${grossPrice}</span></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="ad-placeholder mobile-ad">
              <span>300x250 Ad Banner</span>
            </div>
            <div className="about-section">
              <h2>About GST Calculator</h2>
              <div className="gst-calculator-description">
                <p>The <strong>GST Calculator</strong> helps you calculate GST amount, net price, and gross price for both GST exclusive and inclusive amounts. Enter the amount and GST rate to get started.</p>
              </div>
              <div className="tip">
                <span>💡</span> Tip: Use GST Inclusive for prices that already include GST.
              </div>
            </div>
          </div>
        </div>
        <div className="ad-placeholder">
          <span>300x250 Ad Banner</span>
        </div>
      </div>
      <style jsx>{`
        .gst-calculator-container {
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
        .gst-calculator {
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
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .amount-input, .rate-input {
          width: 160px;
          padding: 0.7rem 1rem;
          font-size: 1.2rem;
          border: 1px solid #cbd5e0;
          border-radius: 8px;
          color: #1a1a1a;
        }
        .type-row {
          display: flex;
          gap: 0.5rem;
        }
        .type-btn {
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
        .type-btn.active, .type-btn:hover {
          background: #28A844;
          color: #fff;
        }
        .error-message {
          color: #e53e3e;
          font-size: 0.95rem;
          margin-top: 0.5rem;
        }
        .results-section {
          margin-top: 2rem;
        }
        .results-card.gst-results {
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
        .gst-summary {
          font-size: 1.1rem;
          color: #1a1a1a;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          align-items: center;
        }
        .gross-price {
          color: #28A844;
          font-weight: bold;
          font-size: 1.2rem;
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
          .input-section {
            flex-direction: column;
            gap: 0.3rem;
          }
        }
      `}</style>
    </div>
  );
} 