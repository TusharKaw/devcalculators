"use client"

import React, { useState, useEffect } from 'react';

const NameCompatibilityCalculator = () => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculateCompatibility = () => {
    const firstName = name1.trim().toLowerCase();
    const secondName = name2.trim().toLowerCase();

    if (!firstName || !secondName) {
      setError('Please enter both names');
      return;
    }

    if (firstName.length < 2 || secondName.length < 2) {
      setError('Names must be at least 2 characters long');
      return;
    }

    try {
      // Calculate name values using different methods
      const loveScore = calculateLoveScore(firstName, secondName);
      const numerologyScore = calculateNumerologyScore(firstName, secondName);
      const letterScore = calculateLetterScore(firstName, secondName);
      const vowelScore = calculateVowelScore(firstName, secondName);
      
      // Calculate overall compatibility
      const overallScore = Math.round((loveScore + numerologyScore + letterScore + vowelScore) / 4);
      
      // Determine compatibility level
      let compatibilityLevel = '';
      let compatibilityColor = '';
      let compatibilityDescription = '';
      
      if (overallScore >= 90) {
        compatibilityLevel = 'Soulmates';
        compatibilityColor = 'text-red-600';
        compatibilityDescription = 'Exceptional compatibility! You two are meant to be together.';
      } else if (overallScore >= 80) {
        compatibilityLevel = 'Perfect Match';
        compatibilityColor = 'text-pink-600';
        compatibilityDescription = 'Excellent compatibility with great potential for a lasting relationship.';
      } else if (overallScore >= 70) {
        compatibilityLevel = 'Great Match';
        compatibilityColor = 'text-orange-600';
        compatibilityDescription = 'Very good compatibility with strong relationship potential.';
      } else if (overallScore >= 60) {
        compatibilityLevel = 'Good Match';
        compatibilityColor = 'text-yellow-600';
        compatibilityDescription = 'Good compatibility with room for growth and understanding.';
      } else if (overallScore >= 50) {
        compatibilityLevel = 'Fair Match';
        compatibilityColor = 'text-blue-600';
        compatibilityDescription = 'Moderate compatibility that may require more effort and communication.';
      } else if (overallScore >= 40) {
        compatibilityLevel = 'Challenging';
        compatibilityColor = 'text-purple-600';
        compatibilityDescription = 'Challenging compatibility that will require significant effort and compromise.';
      } else {
        compatibilityLevel = 'Difficult';
        compatibilityColor = 'text-gray-600';
        compatibilityDescription = 'Difficult compatibility that may require professional guidance.';
      }

      setResult({
        name1: name1.trim(),
        name2: name2.trim(),
        loveScore,
        numerologyScore,
        letterScore,
        vowelScore,
        overallScore,
        compatibilityLevel,
        compatibilityColor,
        compatibilityDescription
      });
      setError('');
    } catch (err) {
      setError('Error calculating compatibility. Please check your inputs.');
    }
  };

  const calculateLoveScore = (name1, name2) => {
    // Simple love score based on name length and common letters
    const commonLetters = [...new Set(name1.split('').filter(letter => name2.includes(letter)))];
    const uniqueLetters1 = [...new Set(name1.split(''))];
    const uniqueLetters2 = [...new Set(name2.split(''))];
    
    const commonRatio = commonLetters.length / Math.max(uniqueLetters1.length, uniqueLetters2.length);
    const lengthRatio = Math.min(name1.length, name2.length) / Math.max(name1.length, name2.length);
    
    return Math.round((commonRatio * 60 + lengthRatio * 40));
  };

  const calculateNumerologyScore = (name1, name2) => {
    // Numerology calculation based on letter values
    const letterValues = {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
      'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
      's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
    };
    
    const value1 = name1.split('').reduce((sum, letter) => sum + (letterValues[letter] || 0), 0);
    const value2 = name2.split('').reduce((sum, letter) => sum + (letterValues[letter] || 0), 0);
    
    const sum1 = value1.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    const sum2 = value2.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    
    const final1 = sum1 > 9 ? sum1.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0) : sum1;
    const final2 = sum2 > 9 ? sum2.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0) : sum2;
    
    const compatibility = Math.abs(final1 - final2);
    return Math.max(0, 100 - compatibility * 10);
  };

  const calculateLetterScore = (name1, name2) => {
    // Score based on letter patterns and arrangements
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
    
    const vowels1 = name1.split('').filter(letter => vowels.includes(letter)).length;
    const vowels2 = name2.split('').filter(letter => vowels.includes(letter)).length;
    const consonants1 = name1.split('').filter(letter => consonants.includes(letter)).length;
    const consonants2 = name2.split('').filter(letter => consonants.includes(letter)).length;
    
    const vowelBalance = Math.abs(vowels1 - vowels2) / Math.max(vowels1, vowels2, 1);
    const consonantBalance = Math.abs(consonants1 - consonants2) / Math.max(consonants1, consonants2, 1);
    
    return Math.round((1 - (vowelBalance + consonantBalance) / 2) * 100);
  };

  const calculateVowelScore = (name1, name2) => {
    // Score based on vowel harmony
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const vowelPattern1 = name1.split('').filter(letter => vowels.includes(letter)).join('');
    const vowelPattern2 = name2.split('').filter(letter => vowels.includes(letter)).join('');
    
    if (vowelPattern1 === vowelPattern2) return 100;
    if (vowelPattern1.length === vowelPattern2.length) return 80;
    if (Math.abs(vowelPattern1.length - vowelPattern2.length) === 1) return 60;
    if (Math.abs(vowelPattern1.length - vowelPattern2.length) === 2) return 40;
    return 20;
  };

  useEffect(() => {
    if (name1 && name2) {
      calculateCompatibility();
    }
  }, [name1, name2]);

  const clearAll = () => {
    setName1('');
    setName2('');
    setResult(null);
    setError('');
  };

  const setPresetNames = (name1, name2) => {
    setName1(name1);
    setName2(name2);
  };

  const getCompatibilityEmoji = (score) => {
    if (score >= 90) return '💕';
    if (score >= 80) return '❤️';
    if (score >= 70) return '💖';
    if (score >= 60) return '💗';
    if (score >= 50) return '💙';
    if (score >= 40) return '💜';
    return '💔';
  };

  return (
    <div className="name-compatibility-container">
      <div className="main-content-wrapper">
        <div className="calculator-content">
          <div className="name-compatibility-calculator">
            <div className="header">
              <h2>Name Compatibility Calculator</h2>
              <p className="subtitle">Discover compatibility between 2 names!</p>
            </div>

            <div className="calculator-card">
              <div className="input-section">
                <h3>Enter Names to Compare</h3>
                <div className="names-input">
                  <div className="input-group">
                    <input
                      id="name1"
                      type="text"
                      value={name1}
                      onChange={(e) => setName1(e.target.value)}
                      placeholder="Enter first name"
                      className="name-input"
                      maxLength="50"
                    />
                  </div>
                  <div className="vs-icon">⚡</div>
                  <div className="input-group">
                    <input
                      id="name2"
                      type="text"
                      value={name2}
                      onChange={(e) => setName2(e.target.value)}
                      placeholder="Enter second name"
                      className="name-input"
                      maxLength="50"
                    />
                  </div>
                </div>
                
                <div className="quick-pairs">
                  <h4>Quick Name Pairs:</h4>
                  <div className="pairs-grid">
                    {[
                      { name1: 'John', name2: 'Sarah', id: 1 },
                      { name1: 'Michael', name2: 'Emma', id: 2 },
                      { name1: 'David', name2: 'Lisa', id: 3 },
                      { name1: 'James', name2: 'Maria', id: 4 },
                      { name1: 'Robert', name2: 'Jennifer', id: 5 },
                      { name1: 'William', name2: 'Jessica', id: 6 }
                    ].map((pair) => (
                      <button
                        key={pair.id}
                        onClick={() => setPresetNames(pair.name1, pair.name2)}
                        className="pair-btn"
                      >
                        {pair.name1} & {pair.name2}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="action-buttons">
                  <button
                    onClick={calculateCompatibility}
                    className="calculate-btn"
                    disabled={!name1.trim() || !name2.trim()}
                  >
                    🔮 Calculate Compatibility 🔮
                  </button>
                  <button onClick={clearAll} className="reset-btn">
                    Reset
                  </button>
                </div>

                {error && (
                  <div className="error-message">
                    {error}
                  </div>
                )}
              </div>
              
              {result && (
                <div className="results-section">
                  <div className="results-card">
                    <h2>
                      <span className="icon">🔮</span>
                      Name Compatibility Results
                    </h2>
                    
                    <div className="compatibility-result">
                      <div className="names-display">
                        <span className="name-badge">{result.name1}</span>
                        <span className="connection-icon">⚡</span>
                        <span className="name-badge">{result.name2}</span>
                      </div>
                      
                      <div className="overall-score">
                        <div className="score-circle">
                          <div className="score-inner">
                            <span className="percentage">{result.overallScore}%</span>
                            <span className="compatibility-level">{result.compatibilityLevel}</span>
                          </div>
                        </div>
                        <div className="compatibility-emoji">
                          {getCompatibilityEmoji(result.overallScore)}
                        </div>
                      </div>
                      
                      <div className="compatibility-description">
                        <p>{result.compatibilityDescription}</p>
                      </div>
                      
                      <div className="scores-breakdown">
                        <div className="score-item">
                          <span className="score-label">Love Score</span>
                          <div className="score-bar">
                            <div className="score-fill love-score" style={{ width: `${result.loveScore}%` }}></div>
                          </div>
                          <span className="score-value">{result.loveScore}%</span>
                        </div>
                        
                        <div className="score-item">
                          <span className="score-label">Numerology</span>
                          <div className="score-bar">
                            <div className="score-fill numerology-score" style={{ width: `${result.numerologyScore}%` }}></div>
                          </div>
                          <span className="score-value">{result.numerologyScore}%</span>
                        </div>
                        
                        <div className="score-item">
                          <span className="score-label">Letter Harmony</span>
                          <div className="score-bar">
                            <div className="score-fill letter-score" style={{ width: `${result.letterScore}%` }}></div>
                          </div>
                          <span className="score-value">{result.letterScore}%</span>
                        </div>
                        
                        <div className="score-item">
                          <span className="score-label">Vowel Harmony</span>
                          <div className="score-bar">
                            <div className="score-fill vowel-score" style={{ width: `${result.vowelScore}%` }}></div>
                          </div>
                          <span className="score-value">{result.vowelScore}%</span>
                        </div>
                      </div>
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
              <h2>About Name Compatibility Calculator</h2>
              <div className="name-compatibility-description">
                <p>Our comprehensive <strong>Name Compatibility Calculator</strong> uses advanced algorithms to analyze the <strong>compatibility between two names</strong> using multiple mystical and mathematical approaches. This entertaining tool combines <strong>numerology</strong>, <strong>letter analysis</strong>, <strong>vowel harmony</strong>, and <strong>love calculations</strong> to provide insights into relationship potential.</p>

                <p>Whether you're curious about a <strong>crush</strong>, want to test your <strong>relationship compatibility</strong>, or exploring <strong>name numerology</strong>, our calculator offers instant results with beautiful visualizations and detailed breakdowns of different compatibility factors.</p>

                <p>The calculator analyzes <strong>Love Score</strong> based on common letters and name patterns, <strong>Numerology Score</strong> using traditional name numerology, <strong>Letter Harmony</strong> examining letter patterns, and <strong>Vowel Harmony</strong> for vowel compatibility. All scores are combined to provide an overall compatibility percentage.</p>

                <p>Our tool is completely <strong>free to use</strong>, requires <strong>no registration</strong>, and works perfectly on all devices. Perfect for <strong>entertainment</strong>, <strong>parties</strong>, or just satisfying your curiosity about name compatibility!</p>
              </div>
              <div className="calculation-methods">
                <h3>Calculation Methods:</h3>
                <div className="methods-grid">
                  <div className="method-card">
                    <h4>Love Score</h4>
                    <p>Based on common letters and name length compatibility</p>
                  </div>
                  <div className="method-card">
                    <h4>Numerology</h4>
                    <p>Using traditional name numerology calculations</p>
                  </div>
                  <div className="method-card">
                    <h4>Letter Harmony</h4>
                    <p>Analyzing letter patterns and arrangements</p>
                  </div>
                  <div className="method-card">
                    <h4>Vowel Harmony</h4>
                    <p>Examining vowel compatibility and resonance</p>
                  </div>
                </div>
              </div>
              <div className="tip">
                <span>💡</span> Tip: Try different name combinations to discover interesting compatibility patterns!
              </div>
            </div>
          </div>
        </div>

        <div className="ad-placeholder">
          <span>300x250 Ad Banner</span>
        </div>
      </div>

      <style jsx>{`
        .name-compatibility-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f3e8ff 0%, #e0e7ff 100%);
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
        
        .name-compatibility-calculator {
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
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
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
          border-color: #8b5cf6;
          box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
        }
        
        .vs-icon {
          font-size: 1.5rem;
          animation: sparkle 2s infinite;
        }
        
        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(180deg); }
        }
        
        .quick-pairs {
          margin-bottom: 1.5rem;
        }
        
        .quick-pairs h4 {
          font-size: 1rem;
          font-weight: 600;
          color: #4b5563;
          margin-bottom: 0.75rem;
        }
        
        .pairs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 0.5rem;
        }
        
        .pair-btn {
          padding: 0.5rem 1rem;
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.875rem;
          transition: all 0.2s;
        }
        
        .pair-btn:hover {
          background: #e5e7eb;
          border-color: #8b5cf6;
        }
        
        .action-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
        
        .calculate-btn {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
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
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
        }
        
        .calculate-btn:disabled {
          background:rgba(138, 92, 246, 0.60);
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        .reset-btn {
          padding: 0.75rem 1.5rem;
          background: #6b7280;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          transition: all 0.2s;
        }
        
        .reset-btn:hover {
          background: #4b5563;
        }
        
        .error-message {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 0.75rem;
          border-radius: 6px;
          margin-top: 1rem;
          font-size: 0.875rem;
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
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
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
        
        .compatibility-result {
          text-align: center;
        }
        
        .names-display {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .name-badge {
          font-size: 1.125rem;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 20px;
        }
        
        .connection-icon {
          font-size: 1.5rem;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        
        .overall-score {
          margin-bottom: 1.5rem;
        }
        
        .score-circle {
          width: 150px;
          height: 150px;
          border: 8px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          margin: 0 auto 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
        }
        
        .score-inner {
          text-align: center;
        }
        
        .percentage {
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1;
          display: block;
        }
        
        .compatibility-level {
          font-size: 0.875rem;
          opacity: 0.9;
          margin-top: 0.25rem;
        }
        
        .compatibility-emoji {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        
        .compatibility-description {
          margin-bottom: 1.5rem;
        }
        
        .compatibility-description p {
          font-size: 1.125rem;
          line-height: 1.6;
          background: rgba(255, 255, 255, 0.1);
          padding: 1rem;
          border-radius: 8px;
          margin: 0;
        }
        
        .scores-breakdown {
          display: grid;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        
        .score-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .score-label {
          font-size: 0.875rem;
          font-weight: 500;
          min-width: 100px;
          text-align: left;
        }
        
        .score-bar {
          flex: 1;
          height: 8px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          overflow: hidden;
        }
        
        .score-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.8s ease;
        }
        
        .love-score { background:rgb(255, 66, 160); }
        .numerology-score { background:rgb(247, 234, 85); }
        .letter-score { background:rgb(89, 255, 249); }
        .vowel-score { background:rgb(0, 255, 34); }
        
        .score-value {
          font-size: 0.875rem;
          font-weight: 600;
          min-width: 40px;
          text-align: right;
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
        
        .name-compatibility-description {
          line-height: 1.6;
          color: #4b5563;
          margin-bottom: 1.5rem;
        }
        
        .name-compatibility-description p {
          margin-bottom: 1rem;
        }
        
        .calculation-methods h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 1rem;
        }
        
        .methods-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .method-card {
          background: #f9fafb;
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }
        
        .method-card h4 {
          font-size: 1rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }
        
        .method-card p {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0;
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
            font-size: 1.5rem;
          }
          
          .names-input {
            flex-direction: column;
            gap: 1rem;
          }
          
          .vs-icon {
            order: -1;
          }
          
          .names-display {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .connection-icon {
            order: 1;
          }
          
          .score-circle {
            width: 120px;
            height: 120px;
          }
          
          .percentage {
            font-size: 2rem;
          }
          
          .action-buttons {
            flex-direction: column;
          }

          .input-group {
            width: 100%;
          }
          
          .name-input {
            width: 100%;
          }
          
          .calculate-btn,
          .reset-btn {
            width: 100%;
          }
          
          .methods-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default NameCompatibilityCalculator;