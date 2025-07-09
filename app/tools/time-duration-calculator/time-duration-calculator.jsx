"use client";

import { useState } from "react";

export default function TimeDurationCalculator() {
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [animate, setAnimate] = useState(false);

  const calculateDuration = () => {
    if (!startDate || !endDate) {
      setError("Please enter both start and end dates");
      setResult(null);
      return;
    }
    const start = new Date(`${startDate}T${startTime || "00:00"}`);
    const end = new Date(`${endDate}T${endTime || "00:00"}`);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setError("Please enter valid dates and times");
      setResult(null);
      return;
    }
    if (end <= start) {
      setError("End date/time must be after start date/time");
      setResult(null);
      return;
    }
    setError("");
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      const diffMs = end - start;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);
      setResult({
        days: diffDays,
        hours: diffHours,
        minutes: diffMinutes,
        seconds: diffSeconds,
        totalHours: diffMs / (1000 * 60 * 60),
        totalMinutes: diffMs / (1000 * 60),
        totalSeconds: diffMs / 1000,
      });
    }, 300);
  };

  const formatDuration = (days, hours, minutes, seconds) => {
    const parts = [];
    if (days > 0) parts.push(`${days} day${days !== 1 ? "s" : ""}`);
    if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
    if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);
    if (seconds > 0) parts.push(`${seconds} second${seconds !== 1 ? "s" : ""}`);
    return parts.join(", ");
  };

  return (
    <div className="duration-calculator-container">
      <div className="main-content-wrapper">
        <div className="calculator-content">
          <div className="duration-calculator">
            <div className="header">
              <h2>Time Duration Calculator</h2>
              <p className="subtitle">Calculate the duration between two dates and times</p>
            </div>
            <div className="calculator-card">
              <div className="input-section">
                <div className="input-group">
                  <div className="input-field">
                    <label>Start Date</label>
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                  </div>
                  <div className="input-field">
                    <label>Start Time (optional)</label>
                    <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
                  </div>
                  <div className="input-field">
                    <label>End Date</label>
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                  </div>
                  <div className="input-field">
                    <label>End Time (optional)</label>
                    <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
                  </div>
                  <button onClick={calculateDuration} className="calc-btn">Calculate</button>
                </div>
                {error && <div className="error-message">{error}</div>}
              </div>
              {result && !error && (
                <div className={`results-section ${animate ? 'animate' : ''}`}>
                  <div className="results-card">
                    <h2>
                      <span className="icon">⏳</span>
                      Duration Result
                    </h2>
                    <div className="result-box">
                      {formatDuration(result.days, result.hours, result.minutes, result.seconds)}
                    </div>
                    <div className="result-details">
                      <div><span className="highlight">{result.totalHours.toFixed(2)}</span> total hours</div>
                      <div><span className="highlight">{result.totalMinutes.toFixed(0)}</span> total minutes</div>
                      <div><span className="highlight">{result.totalSeconds.toFixed(0)}</span> total seconds</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="ad-placeholder mobile-ad">
              <span>300x250 Ad Banner</span>
            </div>
            <div className="about-section">
              <h2>About Time Duration Calculator</h2>
              <div className="duration-calculator-description">
                <p>The <strong>Time Duration Calculator</strong> helps you find the duration between two dates and times. Useful for planning, scheduling, and more.</p>
              </div>
              <div className="tip">
                <span>💡</span> Tip: Use this tool for event planning, project management, and more!
              </div>
            </div>
          </div>
        </div>
        <div className="ad-placeholder">
          <span>300x250 Ad Banner</span>
        </div>
      </div>
      <style jsx>{`
        .duration-calculator-container {
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
        .duration-calculator {
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
        .input-section label {
          font-weight: 500;
          margin-top: 1rem;
          display: block;
          color: #28A844;
        }
        .input-group {
          margin-bottom: 1rem;
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .input-field {
          flex: 1;
          min-width: 150px;
        }
        .input-field input[type="date"],
        .input-field input[type="time"] {
          padding: 0.5rem;
          border-radius: 6px;
          border: 1px solid #cbd5e0;
          width: 100%;
          font-size: 1rem;
          color: #1a1a1a;
        }
        .calc-btn {
          background: #28A844;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 0.7rem 1.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          margin-top: 1.7rem;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .calc-btn:hover {
          background: #21913a;
          transform: translateY(-2px) scale(1.03);
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
        .results-card {
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
        .result-box {
          background: #fff;
          border-radius: 8px;
          padding: 1rem 2rem;
          box-shadow: 0 1px 6px rgba(0,0,0,0.04);
          font-size: 1.5rem;
          color: #28A844;
          font-weight: bold;
          display: inline-block;
        }
        .result-details {
          margin-top: 1rem;
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          justify-content: center;
          font-size: 1.1rem;
          color: #1a1a1a;
        }
        .highlight {
          font-size: 1.2em;
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
          .input-group {
            flex-direction: column;
            gap: 0.5rem;
          }
          .input-field input {
            width: 100%;
            margin-bottom: 0.5rem;
          }
          .calc-btn {
            width: 100%;
          }
          .result-details {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
} 