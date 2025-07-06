"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Calculator, Ruler, PawPrint, TrendingUp } from 'lucide-react';

const AnimalHeightComparison = () => {
  const [userHeight, setUserHeight] = useState('5');
  const [userHeightInches, setUserHeightInches] = useState('8');
  const [selectedAnimal, setSelectedAnimal] = useState('giraffe');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const animals = {
    giraffe: { name: 'Giraffe', height: 18, unit: 'ft', description: 'Tallest land animal' },
    elephant: { name: 'African Elephant', height: 13, unit: 'ft', description: 'Largest land animal' },
    horse: { name: 'Horse', height: 5.5, unit: 'ft', description: 'Domestic horse' },
    cow: { name: 'Cow', height: 4.5, unit: 'ft', description: 'Domestic cattle' },
    dog: { name: 'Great Dane', height: 3, unit: 'ft', description: 'Large dog breed' },
    cat: { name: 'Domestic Cat', height: 1, unit: 'ft', description: 'Average house cat' },
    mouse: { name: 'House Mouse', height: 0.1, unit: 'ft', description: 'Small rodent' },
    ant: { name: 'Ant', height: 0.01, unit: 'ft', description: 'Tiny insect' },
    blueWhale: { name: 'Blue Whale', height: 30, unit: 'ft', description: 'Largest animal ever' },
    ostrich: { name: 'Ostrich', height: 9, unit: 'ft', description: 'Tallest bird' },
    penguin: { name: 'Emperor Penguin', height: 4, unit: 'ft', description: 'Largest penguin' },
    kangaroo: { name: 'Red Kangaroo', height: 6, unit: 'ft', description: 'Largest marsupial' }
  };

  const calculateComparison = () => {
    const feet = parseFloat(userHeight);
    const inches = parseFloat(userHeightInches);

    if (isNaN(feet)) {
      setError('Please enter a valid feet value');
      return;
    }

    if (isNaN(inches) || inches < 0 || inches >= 12) {
      setError('Please enter a valid inches value (0-11)');
      return;
    }

    try {
      // Convert user height to total inches
      const userHeightInches = (feet * 12) + inches;
      const userHeightCm = userHeightInches * 2.54;
      const userHeightM = userHeightCm / 100;

      // Get selected animal data
      const animal = animals[selectedAnimal];
      const animalHeightInches = animal.height * 12; // Convert feet to inches
      const animalHeightCm = animalHeightInches * 2.54;
      const animalHeightM = animalHeightCm / 100;

      // Calculate comparison
      const ratio = userHeightInches / animalHeightInches;
      const timesTaller = ratio > 1 ? ratio : 1 / ratio;
      const isUserTaller = ratio > 1;

      // Calculate how many of you would equal the animal
      const howManyYou = isUserTaller ? ratio : 1 / ratio;

      // Calculate percentage
      const percentage = (userHeightInches / animalHeightInches) * 100;

      setResult({
        userHeight: {
          feet: feet,
          inches: inches,
          totalInches: userHeightInches,
          cm: userHeightCm,
          m: userHeightM
        },
        animal: {
          name: animal.name,
          height: animal.height,
          unit: animal.unit,
          description: animal.description,
          totalInches: animalHeightInches,
          cm: animalHeightCm,
          m: animalHeightM
        },
        comparison: {
          ratio: ratio,
          timesTaller: timesTaller,
          isUserTaller: isUserTaller,
          howManyYou: howManyYou,
          percentage: percentage
        }
      });
      setError('');
    } catch (err) {
      setError('Error calculating comparison. Please check your inputs.');
    }
  };

  useEffect(() => {
    if (userHeight && userHeightInches) {
      calculateComparison();
    }
  }, [userHeight, userHeightInches, selectedAnimal]);

  const clearAll = () => {
    setUserHeight('5');
    setUserHeightInches('8');
    setSelectedAnimal('giraffe');
    setResult(null);
    setError('');
  };

  const setPresetHeight = (feet, inches) => {
    setUserHeight(feet.toString());
    setUserHeightInches(inches.toString());
  };

  const formatHeight = (value, unit) => {
    return `${value.toFixed(2)} ${unit}`;
  };

  const getComparisonText = () => {
    if (!result) return '';
    
    const { comparison, animal } = result;
    
    if (comparison.isUserTaller) {
      return `You are ${comparison.timesTaller.toFixed(1)}x taller than a ${animal.name.toLowerCase()}`;
    } else {
      return `A ${animal.name.toLowerCase()} is ${comparison.timesTaller.toFixed(1)}x taller than you`;
    }
  };

  return (
    <div className="calculator-container">
      <div className="main-content-wrapper">
        <div className="calculator-content">
          <h1 className="calculator-title">Animal Height Comparison</h1>
          
          <div className="calculator-card">
            <div className="calculator-grid">
              <div className="input-section">
                <div className="input-group">
                  <div className="input-field">
                    <label>Your Height (Feet)</label>
                    <input 
                      type="number" 
                      value={userHeight} 
                      onChange={(e) => setUserHeight(e.target.value)}
                      min="0" 
                      step="1"
                      placeholder="5"
                      className={error && isNaN(parseFloat(userHeight)) ? 'error' : ''}
                    />
                  </div>
                  
                  <div className="input-field">
                    <label>Your Height (Inches)</label>
                    <input 
                      type="number" 
                      value={userHeightInches} 
                      onChange={(e) => setUserHeightInches(e.target.value)}
                      min="0" 
                      max="11"
                      step="0.1"
                      placeholder="8"
                      className={error && (isNaN(parseFloat(userHeightInches)) || parseFloat(userHeightInches) < 0 || parseFloat(userHeightInches) >= 12) ? 'error' : ''}
                    />
                  </div>
                </div>
                
                <div className="animal-selection">
                  <label>Compare With</label>
                  <div className="animal-buttons">
                    {Object.entries(animals).map(([key, animal]) => (
                      <button
                        key={key}
                        className={`animal-btn ${selectedAnimal === key ? 'active' : ''}`}
                        onClick={() => setSelectedAnimal(key)}
                      >
                        {animal.name} ({animal.height} {animal.unit})
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="quick-presets">
                  <label>Quick Height Presets</label>
                  <div className="preset-buttons">
                    {[
                      { feet: 4, inches: 10, label: '4\'10"' },
                      { feet: 5, inches: 0, label: '5\'0"' },
                      { feet: 5, inches: 4, label: '5\'4"' },
                      { feet: 5, inches: 8, label: '5\'8"' },
                      { feet: 6, inches: 0, label: '6\'0"' },
                      { feet: 6, inches: 4, label: '6\'4"' }
                    ].map((height, index) => (
                      <button
                        key={index}
                        className="preset-btn"
                        onClick={() => setPresetHeight(height.feet, height.inches)}
                      >
                        {height.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="action-buttons">
                  <button className="calculate-btn" onClick={calculateComparison}>
                    <Calculator className="icon" />
                    Compare Heights
                  </button>
                  <button className="reset-btn" onClick={clearAll}>
                    Reset
                  </button>
                </div>
                
                {error && (
                  <div className="error-message">
                    {error}
                  </div>
                )}
              </div>
              
              <div className="result-section">
                {result && (
                  <div className="results-container">
                    <h2 className="result-title">
                      <span className="icon">📏</span>
                      Comparison Results
                    </h2>
                    
                    <div className="comparison-text">
                      {getComparisonText()}
                    </div>
                    
                    <div className="height-details">
                      <div className="height-item">
                        <span>Your Height:</span>
                        <strong>{result.userHeight.feet}'{result.userHeight.inches}" ({formatHeight(result.userHeight.cm, 'cm')})</strong>
                      </div>
                      <div className="height-item">
                        <span>{result.animal.name} Height:</span>
                        <strong>{result.animal.height} {result.animal.unit} ({formatHeight(result.animal.cm, 'cm')})</strong>
                      </div>
                    </div>
                    
                    <div className="visual-comparison">
                      <div className="comparison-bar">
                        <div className="bar-label">You ({result.userHeight.feet}'{result.userHeight.inches}")</div>
                        <div className="bar-container">
                          <div 
                            className="bar user-bar" 
                            style={{ width: `${Math.min(result.comparison.percentage, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="comparison-bar">
                        <div className="bar-label">{result.animal.name} ({result.animal.height} {result.animal.unit})</div>
                        <div className="bar-container">
                          <div 
                            className="bar animal-bar" 
                            style={{ width: `${Math.min((1 / result.comparison.ratio) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="stats-grid">
                      <div className="stat-card">
                        <div className="stat-value">{result.comparison.ratio.toFixed(2)}:1</div>
                        <div className="stat-label">Height Ratio</div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-value">{result.comparison.percentage.toFixed(1)}%</div>
                        <div className="stat-label">Percentage</div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-value">{result.comparison.timesTaller.toFixed(1)}x</div>
                        <div className="stat-label">{result.comparison.isUserTaller ? 'Taller' : 'Shorter'}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="about-section">
            <h2>About Animal Height Comparison</h2>
            <p>Our Animal Height Comparison tool lets you see how your height measures up against various animals. From the towering giraffe to the tiny ant, discover fascinating size comparisons and learn about the incredible diversity of animal sizes in nature.</p>
            
            <div className="features-grid">
              <div className="feature-card">
                <h3>Features</h3>
                <ul>
                  <li>Compare with 12 different animals</li>
                  <li>Visual height comparison bars</li>
                  <li>Multiple unit conversions</li>
                  <li>Height ratio calculations</li>
                </ul>
              </div>
              <div className="feature-card">
                <h3>Animals Included</h3>
                <ul>
                  <li>Giraffe (18 ft)</li>
                  <li>African Elephant (13 ft)</li>
                  <li>Horse (5.5 ft)</li>
                  <li>Blue Whale (30 ft)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="ad-banner">
          <div className="ad-content">
            <p>Advertisement</p>
            <div className="ad-placeholder">
              <span>300x250 Ad Banner</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .calculator-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 100%);
          padding: 2rem 1rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        .main-content-wrapper {
          display: flex;
          max-width: 1200px;
          margin: 0 auto;
          gap: 1.5rem;
        }
        
        .calculator-content {
          flex: 1;
          min-width: 0;
        }
        
        .calculator-title {
          color: #2c3e50;
          text-align: center;
          margin-bottom: 30px;
          font-size: 1.8rem;
        }
        
        .calculator-card {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          margin-bottom: 20px;
        }
        
        .calculator-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        
        .input-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .input-group {
          display: flex;
          gap: 15px;
        }
        
        .input-field {
          flex: 1;
        }
        
        .input-field label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #34495e;
          font-size: 14px;
        }
        
        .input-field input {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 16px;
          transition: all 0.3s;
        }
        
        .input-field input.error {
          border-color: #e74c3c;
          background-color: #fdf3f2;
        }
        
        .animal-selection label,
        .quick-presets label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #34495e;
          font-size: 14px;
        }
        
        .animal-buttons {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        
        .animal-btn {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 6px;
          background: white;
          cursor: pointer;
          font-size: 14px;
          text-align: left;
          transition: all 0.2s;
        }
        
        .animal-btn.active {
          background: #3498db;
          color: white;
          border-color: #3498db;
        }
        
        .animal-btn:hover {
          border-color: #3498db;
        }
        
        .preset-buttons {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        
        .preset-btn {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 6px;
          background: white;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }
        
        .preset-btn:hover {
          border-color: #3498db;
        }
        
        .action-buttons {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }
        
        .calculate-btn {
          flex: 1;
          padding: 12px;
          background: #3498db;
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
        }
        
        .calculate-btn:hover {
          background: #2980b9;
        }
        
        .reset-btn {
          padding: 12px 20px;
          background: white;
          color: #3498db;
          border: 1px solid #3498db;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .reset-btn:hover {
          background: #f8f9fa;
        }
        
        .error-message {
          color: #e74c3c;
          font-size: 14px;
          margin-top: 10px;
        }
        
        .result-section {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
        }
        
        .results-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .result-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.5rem;
          color: #2c3e50;
          margin-bottom: 10px;
        }
        
        .comparison-text {
          font-size: 1.2rem;
          font-weight: 500;
          color: #3498db;
          text-align: center;
          margin-bottom: 20px;
        }
        
        .height-details {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }
        
        .height-item {
          display: flex;
          justify-content: space-between;
        }
        
        .visual-comparison {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 20px;
        }
        
        .comparison-bar {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .bar-label {
          font-size: 14px;
          color: #7f8c8d;
        }
        
        .bar-container {
          height: 20px;
          background: #ecf0f1;
          border-radius: 10px;
          overflow: hidden;
        }
        
        .bar {
          height: 100%;
          border-radius: 10px;
        }
        
        .user-bar {
          background: #3498db;
        }
        
        .animal-bar {
          background: #2ecc71;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        
        .stat-card {
          background: white;
          border-radius: 8px;
          padding: 15px;
          text-align: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        
        .stat-value {
          font-size: 1.5rem;
          font-weight: 600;
          color: #2c3e50;
        }
        
        .stat-label {
          font-size: 14px;
          color: #7f8c8d;
        }
        
        .about-section {
          background: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        
        .about-section h2 {
          color: #2c3e50;
          margin-bottom: 15px;
          font-size: 1.6rem;
        }
        
        .about-section p {
          color: #34495e;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        
        .feature-card {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 15px;
        }
        
        .feature-card h3 {
          color: #2c3e50;
          margin-bottom: 10px;
        }
        
        .feature-card ul {
          list-style-type: disc;
          padding-left: 20px;
          color: #34495e;
          line-height: 1.6;
        }
        
        .ad-banner {
          width: 300px;
          flex-shrink: 0;
        }
        
        .ad-content {
          position: sticky;
          top: 1rem;
          background: white;
          border-radius: 8px;
          padding: 1rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        
        .ad-content p {
          color: #718096;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }
        
        .ad-placeholder {
          width: 300px;
          height: 250px;
          background: #f7fafc;
          border: 1px dashed #cbd5e0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a0aec0;
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
          
          .calculator-grid {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 768px) {
          .animal-buttons {
            grid-template-columns: 1fr;
          }
          
          .preset-buttons {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default AnimalHeightComparison;