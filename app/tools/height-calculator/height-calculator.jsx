"use client";

import React, { useState } from 'react';
import CalculatorLayout from '../../../components/CalculatorLayout';

const AVERAGE_HEIGHT = {
  male: 175,
  female: 162,
};

export default function HeightCalculator() {
  const [motherHeight, setMotherHeight] = useState('');
  const [fatherHeight, setFatherHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [predicted, setPredicted] = useState(null);
  const [showResult, setShowResult] = useState(false);

  function calculateHeight(e) {
    e.preventDefault();
    const m = parseFloat(motherHeight);
    const f = parseFloat(fatherHeight);
    if (isNaN(m) || isNaN(f)) return;
    // Mid-parental height formula
    let height;
    if (gender === 'male') {
      height = ((m + f + 13) / 2).toFixed(1);
    } else {
      height = ((m + f - 13) / 2).toFixed(1);
    }
    setPredicted(height);
    setShowResult(true);
  }

  return (
    <CalculatorLayout title="Child Height Predictor" adPosition="top">
      <div className="height-calc-card">
        <div className="header">Predict Your Child's Adult Height</div>
        <form className="form" onSubmit={calculateHeight}>
          <div className="input-group">
            <label htmlFor="motherHeight">Mother's Height (cm)</label>
            <input
              id="motherHeight"
              type="number"
              min="120"
              max="220"
              value={motherHeight}
              onChange={e => setMotherHeight(e.target.value)}
              required
              placeholder="e.g. 162"
            />
          </div>
          <div className="input-group">
            <label htmlFor="fatherHeight">Father's Height (cm)</label>
            <input
              id="fatherHeight"
              type="number"
              min="140"
              max="230"
              value={fatherHeight}
              onChange={e => setFatherHeight(e.target.value)}
              required
              placeholder="e.g. 175"
            />
          </div>
          <div className="input-group">
            <label>Child's Gender</label>
            <div className="gender-toggle">
              <button
                type="button"
                className={gender === 'male' ? 'active' : ''}
                onClick={() => setGender('male')}
              >
                Boy
              </button>
              <button
                type="button"
                className={gender === 'female' ? 'active' : ''}
                onClick={() => setGender('female')}
              >
                Girl
              </button>
            </div>
          </div>
          <button className="submit-btn" type="submit">Predict Height</button>
        </form>
        {showResult && (
          <div className="result-card">
            <h3>Predicted Adult Height</h3>
            <div className="predicted-value">{predicted} cm</div>
            <div className="height-bar-visual">
              <div className="bar-labels">
                <span>Avg. {gender === 'male' ? 'Boy' : 'Girl'}: {AVERAGE_HEIGHT[gender]} cm</span>
                <span>Your Child: {predicted} cm</span>
              </div>
              <div className="bar-bg">
                <div className="bar-average" style={{ width: `${(AVERAGE_HEIGHT[gender] / 230) * 100}%` }}></div>
                <div className="bar-predicted" style={{ left: `calc(${(predicted / 230) * 100}% - 8px)` }}></div>
              </div>
            </div>
            <div className="info-text">This is an estimate based on the mid-parental height formula. Actual adult height can vary due to genetics, nutrition, and other factors.</div>
          </div>
        )}
      </div>
      <div className="ad-banner ad-bottom"><span>300x250 Ad Banner</span></div>
      <div className="about-section">
        <h2>About the Child Height Predictor</h2>
        <p>
          The <strong>Child Height Predictor</strong> estimates a child's adult height based on the heights of the mother and father, using the mid-parental height formula. This method provides a statistical estimate, but actual adult height can vary due to genetics, nutrition, and other factors.
        </p>
        <div className="formula-box">
          <strong>Formula:</strong><br/>
          For boys: <span className="formula">(Mother's Height + Father's Height + 13) / 2</span><br/>
          For girls: <span className="formula">(Mother's Height + Father's Height - 13) / 2</span>
        </div>
        <div className="tip">
          <span>💡</span> This is an estimate. Individual growth may vary.
        </div>
      </div>
      <style jsx>{`
        .height-calc-card {
          max-width: 420px;
          margin: 2rem auto;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 2px 16px #28A84422;
          padding: 1.5rem 1.2rem 2rem 1.2rem;
        }
        .header {
          background: #28A844;
          color: #fff;
          font-size: 1.3rem;
          font-weight: 600;
          border-radius: 12px 12px 0 0;
          padding: 1rem 1.2rem;
          margin: -1.5rem -1.2rem 1.2rem -1.2rem;
          text-align: center;
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        label {
          font-weight: 500;
          color: #222;
        }
        input[type='number'] {
          border: 1px solid #d1d5db;
          border-radius: 6px;
          padding: 0.6rem 0.8rem;
          font-size: 1rem;
          outline: none;
          transition: border 0.2s;
        }
        input[type='number']:focus {
          border: 1.5px solid #28A844;
        }
        .gender-toggle {
          display: flex;
          gap: 0.7rem;
          margin-top: 0.2rem;
        }
        .gender-toggle button {
          flex: 1;
          padding: 0.5rem 0;
          border: 1.5px solid #28A844;
          background: #fff;
          color: #28A844;
          border-radius: 6px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .gender-toggle button.active {
          background: #28A844;
          color: #fff;
        }
        .submit-btn {
          background: #28A844;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 0.9rem 0;
          font-size: 1.1rem;
          font-weight: 600;
          margin-top: 0.5rem;
          cursor: pointer;
          box-shadow: 0 2px 8px #28A84422;
          transition: background 0.2s;
        }
        .submit-btn:hover {
          background: #21913a;
        }
        .result-card {
          margin-top: 2rem;
          background: #f7fafc;
          border-radius: 12px;
          padding: 1.2rem 1rem 1.5rem 1rem;
          box-shadow: 0 2px 8px #28A84411;
          text-align: center;
        }
        .predicted-value {
          font-size: 2.2rem;
          font-weight: 700;
          color: #28A844;
          margin: 0.7rem 0 1.2rem 0;
        }
        .height-bar-visual {
          margin: 1.2rem 0 0.7rem 0;
        }
        .bar-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.98rem;
          color: #444;
          margin-bottom: 0.2rem;
        }
        .bar-bg {
          position: relative;
          background: #e8f9ee;
          height: 18px;
          border-radius: 9px;
          width: 100%;
          margin: 0.2rem 0 0.7rem 0;
        }
        .bar-average {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          background: linear-gradient(90deg, #28A844 60%, #a7f3d0 100%);
          border-radius: 9px;
          opacity: 0.3;
        }
        .bar-predicted {
          position: absolute;
          top: -6px;
          width: 16px;
          height: 30px;
          background: #28A844;
          border-radius: 8px;
          box-shadow: 0 2px 8px #28A84433;
          border: 2px solid #fff;
        }
        .info-text {
          font-size: 0.98rem;
          color: #666;
          margin-top: 0.7rem;
        }
        .ad-banner {
          width: 100%;
          max-width: 340px;
          height: 250px;
          margin: 2rem auto 1.5rem auto;
          background: #f7fafc;
          border: 1.5px dashed #28A844;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #28A844;
          font-size: 1.1rem;
        }
        .ad-bottom {
          margin-top: 2.5rem;
        }
        .about-section {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem 1.2rem 1.2rem 1.2rem;
          margin: 2.5rem auto 1.5rem auto;
          max-width: 420px;
          box-shadow: 0 2px 12px #28A84411;
        }
        .about-section h2 {
          font-size: 1.3rem;
          font-weight: 700;
          color: #28A844;
          margin-bottom: 1rem;
        }
        .about-section p {
          color: #1a1a1a;
          line-height: 1.6;
          margin-bottom: 1.1rem;
        }
        .formula-box {
          background: #e8f9ee;
          border-radius: 8px;
          padding: 0.7rem 1rem;
          color: #28A844;
          font-size: 1.05rem;
          margin-bottom: 1rem;
        }
        .formula {
          font-family: 'Menlo', 'Monaco', 'Consolas', monospace;
          background: #fff;
          padding: 2px 6px;
          border-radius: 4px;
          color: #222;
        }
        .tip {
          background: #e8f9ee;
          border-radius: 8px;
          padding: 0.7rem 1rem;
          color: #28A844;
          font-size: 1.05rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        @media (max-width: 600px) {
          .height-calc-card {
            padding: 1rem 0.3rem 1.5rem 0.3rem;
          }
          .header {
            font-size: 1.05rem;
            padding: 0.8rem 0.5rem;
          }
          .result-card {
            padding: 0.8rem 0.3rem 1.1rem 0.3rem;
          }
          .about-section {
            padding: 1rem 0.3rem 1rem 0.3rem;
          }
          .ad-banner {
            max-width: 100%;
            height: 120px;
            font-size: 1rem;
          }
        }
      `}</style>
    </CalculatorLayout>
  );
} 