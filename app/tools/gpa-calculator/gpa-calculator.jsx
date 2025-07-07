"use client"

import { useState } from "react"

export default function GPACalculator() {
  const [grades, setGrades] = useState([{ grade: "", credits: "" }])
  const [result, setResult] = useState(null)

  const handleChange = (i, field, value) => {
    const newGrades = [...grades]
    newGrades[i][field] = value
    setGrades(newGrades)
  }

  const addRow = () => setGrades([...grades, { grade: "", credits: "" }])
  const removeRow = i => setGrades(grades.filter((_, idx) => idx !== i))

  const gradeToPoints = {
    "A+": 4.0,
    "A": 4.0,
    "A-": 3.7,
    "B+": 3.3,
    "B": 3.0,
    "B-": 2.7,
    "C+": 2.3,
    "C": 2.0,
    "C-": 1.7,
    "D+": 1.3,
    "D": 1.0,
    "D-": 0.7,
    "F": 0.0
  }

  const calculate = () => {
    let total = 0, totalCredits = 0
    for (const g of grades) {
      const gradePoints = gradeToPoints[g.grade]
      const credits = parseFloat(g.credits)
      if (gradePoints === undefined || !credits) continue
      total += gradePoints * credits
      totalCredits += credits
    }
    if (totalCredits === 0) return setResult(null)
    setResult((total / totalCredits).toFixed(2))
  }

  const getGradeInterpretation = (gpa) => {
    if (gpa >= 3.8) return { text: "Excellent", color: "#00cc14" }
    if (gpa >= 3.5) return { text: "Very Good", color: "#00ff44" }
    if (gpa >= 3.0) return { text: "Good", color: "#4fddff" }
    if (gpa >= 2.5) return { text: "Satisfactory", color: "#eab60c" }
    if (gpa >= 2.0) return { text: "Needs Improvement", color: "#db6767" }
    return { text: "Poor", color: "#991b1b" }
  }

  return (
    <div className="gpa-calculator-container">
      <div className="main-content-wrapper">
        <div className="calculator-content">
          <div className="gpa-calculator">
            <div className="header">
              <h2 style={{color:'white'}}>GPA Calculator</h2>
              <p className="subtitle" style={{color:'white'}}>Calculate your Grade Point Average accurately</p>
            </div>

            <div className="calculator-card">
              <div className="input-section">
                <h3>Enter Your Courses</h3>
                {grades.map((g, i) => (
                  <div key={i} className="course-row">
                    <div className="course-inputs">
                      <div className="input-group">
                        <label>Grade</label>
                        <select
                          value={g.grade}
                          onChange={e => handleChange(i, "grade", e.target.value)}
                          className="grade-select"
                        >
                          <option value="">Select Grade</option>
                          <option value="A+">A+ (4.0)</option>
                          <option value="A">A (4.0)</option>
                          <option value="A-">A- (3.7)</option>
                          <option value="B+">B+ (3.3)</option>
                          <option value="B">B (3.0)</option>
                          <option value="B-">B- (2.7)</option>
                          <option value="C+">C+ (2.3)</option>
                          <option value="C">C (2.0)</option>
                          <option value="C-">C- (1.7)</option>
                          <option value="D+">D+ (1.3)</option>
                          <option value="D">D (1.0)</option>
                          <option value="D-">D- (0.7)</option>
                          <option value="F">F (0.0)</option>
                        </select>
                      </div>
                      <div className="input-group">
                        <label>Credits</label>
                        <input
                          type="number"
                          value={g.credits}
                          onChange={e => handleChange(i, "credits", e.target.value)}
                          step="0.1"
                          min="0"
                          placeholder="3"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="action-buttons">
                  <button onClick={addRow} className="add-btn">
                    + Add Course
                  </button>
                  <button
                    onClick={calculate}
                    className="calculate-btn"
                    disabled={grades.every(g => !g.grade || !g.credits)}
                  >
                    Calculate GPA
                  </button>
                </div>
              </div>

              {result && (
                <div className="results-section">
                  <div className="results-card">
                    <h2>
                      <span className="icon">🎓</span>
                      Your GPA Results
                    </h2>
                    
                    <div className="gpa-result">
                      <div className="gpa-score">
                        <span className="gpa-number">{result}</span>
                        <span className="gpa-scale">/ 4.0</span>
                      </div>
                      <div className="gpa-interpretation">
                        <span 
                          className="interpretation-text"
                          style={{ color: getGradeInterpretation(parseFloat(result)).color }}
                        >
                          {getGradeInterpretation(parseFloat(result)).text}
                        </span>
                      </div>
                    </div>
                    
                    <div className="gpa-breakdown">
                      <h3>Grade Breakdown:</h3>
                      <div className="breakdown-grid">
                        {grades.filter(g => g.grade && g.credits).map((g, i) => (
                          <div key={i} className="breakdown-item">
                            <span className="course-number">Course {i + 1}:</span>
                            <span className="grade-info">{g.grade} ({gradeToPoints[g.grade]}) × {g.credits} credits</span>
                          </div>
                        ))}
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
              <h2>About GPA Calculator</h2>
              <div className="gpa-calculator-description">
                <p>Our comprehensive <strong>GPA calculator</strong> is designed to help students, parents, and educators accurately calculate <strong>Grade Point Average</strong> based on course grades and credit hours. This free tool supports the standard <strong>4.0 GPA scale</strong> and provides instant, precise calculations for academic planning.</p>

                <p>Whether you're a <strong>high school student</strong> planning for college admissions, a <strong>college student</strong> tracking academic progress, or a <strong>graduate student</strong> monitoring scholarship requirements, this calculator handles multiple courses and credit weights to give you accurate results.</p>

                <p>The calculator automatically computes your <strong>cumulative GPA</strong> by weighing each course grade by its credit hours, providing a true representation of your academic performance. It's particularly useful for <strong>semester planning</strong>, <strong>academic counseling</strong>, and <strong>scholarship applications</strong>.</p>

                <p>Our tool is completely <strong>free to use</strong>, requires <strong>no registration</strong>, and works perfectly on all devices including <strong>smartphones</strong> and <strong>tablets</strong>. The intuitive interface makes it easy to add multiple courses and get instant results.</p>
              </div>
              <div className="tip">
                <span>💡</span> Tip: Add all your courses to get the most accurate GPA calculation.
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
        .gpa-calculator-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 100%);
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
        
        .gpa-calculator {
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
          background: #fff;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .subtitle {
          font-size: 1.125rem;
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
        
        .course-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          padding: 1rem;
          background: #f8fafc;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }
        
        .course-inputs {
          display: flex;
          gap: 1rem;
          flex: 1;
        }
        
        .input-group {
          flex: 1;
          min-width: 0;
        }
        
        .input-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.5rem;
        }
        
        .input-group input,
        .input-group select {
          width: 100%;
          padding: 0.75rem;
          font-size: 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          transition: all 0.2s;
          background: white;
        }
        
        .input-group input:focus,
        .input-group select:focus {
          outline: none;
          border-color: #1E293C;
          box-shadow: 0 0 0 2px rgba(30, 41, 60, 0.2);
        }
        
        .grade-select {
          cursor: pointer;
        }
        
        .grade-select option {
          padding: 0.5rem;
        }
        
        .remove-btn {
          background: #ef4444;
          color: white;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        
        .remove-btn:hover {
          background: #dc2626;
        }
        
        .action-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        
        .add-btn {
          padding: 0.75rem 1.5rem;
          background: #1E293C;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          transition: all 0.2s;
        }
        
        .add-btn:hover {
          background: #4b5563;
        }
        
        .calculate-btn {
          padding: 0.75rem 1.5rem;
          background: #1E293C;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          transition: all 0.2s;
        }
        
        .calculate-btn:hover {
          background: #415066;
        }
        
        .calculate-btn:disabled {
          background: rgba(30, 41, 60, 0.60);
          cursor: not-allowed;
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
          background: rgb(65, 79, 102);
          border-radius: 8px;
          padding: 1.5rem;
          border: 2px solid #1E293C;
        }
        
        .results-card h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
        }
        
        .results-card .icon {
          font-size: 1.5rem;
          margin-right: 0.75rem;
        }
        
        .gpa-result {
          text-align: center;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
        }
        
        .gpa-score {
          display: flex;
          align-items: baseline;
          justify-content: center;
          margin-bottom: 0.5rem;
        }
        
        .gpa-number {
          font-size: 3rem;
          font-weight: 700;
          color: #fff;
        }
        
        .gpa-scale {
          font-size: 1.25rem;
          color: #cbd5e0;
          margin-left: 0.5rem;
        }
        
        .gpa-interpretation {
          margin-top: 0.5rem;
        }
        
        .interpretation-text {
          font-size: 1.125rem;
          font-weight: 600;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 6px;
        }
        
        .gpa-breakdown {
          margin-top: 1.5rem;
        }
        
        .gpa-breakdown h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 1rem;
        }
        
        .breakdown-grid {
          display: grid;
          gap: 0.5rem;
        }
        
        .breakdown-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          font-size: 0.875rem;
        }
        
        .course-number {
          color: #cbd5e0;
          font-weight: 500;
        }
        
        .grade-info {
          color: #fff;
          font-weight: 600;
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
        
        .gpa-calculator-description {
          line-height: 1.6;
          color: #4b5563;
        }
        
        .gpa-calculator-description p {
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
            font-size: 2rem;
          }
          
          .subtitle {
            font-size: 1rem;
          }
          
          .course-row {
            flex-direction: column;
            align-items: stretch;
          }
          
          .action-buttons {
            flex-direction: column;
          }
          
          .add-btn,
          .calculate-btn {
            width: 100%;
          }
          
          .breakdown-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
} 