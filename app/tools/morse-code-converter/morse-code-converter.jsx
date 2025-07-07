"use client"

import { useState, useEffect } from "react";

const morseCode = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
  '!': '-.-.--', ' ': ' ', "'": '.----.', '/': '-..-.', '(': '-.--.',
  ')': '-.--.-', '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-',
  '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-',
  '@': '.--.-.'
};

const reverseMorseCode = Object.fromEntries(
  Object.entries(morseCode).map(([key, value]) => [value, key])
);

export default function MorseCodeConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("textToMorse");
  const [animate, setAnimate] = useState(false);

  const convert = () => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      
      try {
        if (mode === "textToMorse") {
          const result = input.toUpperCase().split('').map(char => {
            return morseCode[char] || char;
          }).join(' ');
          setOutput(result);
        } else {
          const morseWords = input.split('   ');
          const result = morseWords.map(word => {
            const letters = word.split(' ');
            return letters.map(letter => {
              return reverseMorseCode[letter] || letter;
            }).join('');
          }).join(' ');
          setOutput(result);
        }
      } catch (error) {
        setOutput("Error in conversion. Please check your input.");
      }
    }, 300);
  };

  // Auto-convert when input or mode changes
  useEffect(() => {
    if (input) {
      convert();
    }
  }, [input, mode]);

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="morse-code-container">
      <div className="main-content-wrapper">
        <div className="calculator-content">
          <div className="morse-code-converter">
            <div className="header">
              <h2 style={{color:'white'}}>Morse Code Converter</h2>
              <p className="subtitle" style={{color:'white'}}>Translate between text and Morse code instantly</p>
            </div>

            <div className="calculator-card">
              <div className="input-section">
                <div className="mode-selector">
                  <label>Conversion Mode:</label>
                  <select 
                    value={mode} 
                    onChange={e => setMode(e.target.value)}
                    className="mode-select"
                  >
                    <option value="textToMorse">Text to Morse Code</option>
                    <option value="morseToText">Morse Code to Text</option>
                  </select>
                </div>

                <div className="input-group">
                  <label htmlFor="inputText">
                    {mode === "textToMorse" ? "Enter Text" : "Enter Morse Code"}
                  </label>
                  <textarea
                    id="inputText"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                      mode === "textToMorse" 
                        ? "Type or paste your text here (letters, numbers, punctuation)" 
                        : "Enter Morse code (use . for dot, - for dash, space between letters, three spaces between words)"
                    }
                    rows={5}
                    className="text-input"
                  />
                </div>

                <div className="action-buttons">
                  <button
                    onClick={convert}
                    disabled={!input.trim()}
                    className={!input.trim() ? 'disabled' : ''}
                  >
                    🔄 Convert
                  </button>
                  <button onClick={clearAll} className="reset-btn">
                    Clear All
                  </button>
                </div>
              </div>

              {output && (
                <div className={`results-section ${animate ? 'animate' : ''}`}>
                  <div className="results-card">
                    <h2>
                      <span className="icon">✉️</span>
                      {mode === "textToMorse" ? "Morse Code Result" : "Text Result"}
                    </h2>
                    
                    <div className="output-container">
                      <div className="output-box">
                        <pre>{output}</pre>
                      </div>
                      
                      {mode === "textToMorse" && (
                        <div className="morse-info">
                          <h3>Morse Code Guide:</h3>
                          <ul>
                            <li><strong>.</strong> = Dot (short mark)</li>
                            <li><strong>-</strong> = Dash (long mark)</li>
                            <li><strong>[space]</strong> = Letter separator</li>
                            <li><strong>&nbsp;&nbsp;&nbsp;</strong> = Word separator (3 spaces)</li>
                          </ul>
                        </div>
                      )}
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
              <h2>About Morse Code Converter</h2>
              <div className="morse-code-description">
                <p>Our comprehensive <strong>Morse Code Converter</strong> provides instant two-way translation between text and Morse code. This powerful tool supports all letters (A-Z), numbers (0-9), and common punctuation marks, making it perfect for learning, practicing, or practical communication needs.</p>

                <p>The converter handles both <strong>text-to-Morse</strong> and <strong>Morse-to-text</strong> translations with perfect accuracy. When converting to Morse code, letters are separated by single spaces and words by three spaces. The tool automatically formats the output for easy reading and copying.</p>

                <p>Morse code has been used for over 160 years since its invention in 1836 by Samuel Morse. While originally developed for telegraphy, it remains relevant today for <strong>amateur radio operators</strong>, <strong>emergency signaling</strong>, and as an <strong>accessibility tool</strong>. Our converter helps preserve this important communication method while making it accessible to everyone.</p>

                <p>This tool is completely <strong>free to use</strong>, requires <strong>no registration</strong>, and works perfectly on all devices. Whether you're a student, hobbyist, or professional, our Morse Code Converter provides the most accurate and user-friendly translation available online.</p>
              </div>
              
              <div className="morse-history">
                <h3>Morse Code History:</h3>
                <div className="history-grid">
                  <div className="history-card">
                    <h4>1836</h4>
                    <p>Samuel Morse develops the first version of Morse code</p>
                  </div>
                  <div className="history-card">
                    <h4>1844</h4>
                    <p>First public demonstration with "What hath God wrought" message</p>
                  </div>
                  <div className="history-card">
                    <h4>1912</h4>
                    <p>International Morse code standardized</p>
                  </div>
                  <div className="history-card">
                    <h4>1999</h4>
                    <p>Morse code requirement dropped for most radio licenses</p>
                  </div>
                </div>
              </div>
              
              <div className="tip">
                <span>💡</span> Tip: You can click on the Morse code output to copy it to your clipboard!
              </div>
            </div>
          </div>
        </div>

        <div className="ad-placeholder">
          <span>300x250 Ad Banner</span>
        </div>
      </div>

      <style jsx>{`
        .morse-code-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
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
        
        .morse-code-converter {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .header {
          text-align: center;
          margin-bottom: 1rem;
          border-radius: 12px;
          background: linear-gradient(135deg, #434343 0%, #000000 100%);
          padding: 1.5rem;
        }
        
        .header h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0;
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
        
        .mode-selector {
          margin-bottom: 1.5rem;
        }
        
        .mode-selector label {
          display: block;
          font-size: 1rem;
          font-weight: 500;
          color: #2d3748;
          margin-bottom: 0.5rem;
        }
        
        .mode-select {
          width: 100%;
          padding: 0.75rem;
          font-size: 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          background-color: white;
        }
        
        .mode-select:focus {
          outline: none;
          border-color: #4a5568;
        }
        
        .input-group {
          margin-bottom: 1.5rem;
        }
        
        .input-group label {
          display: block;
          font-size: 1rem;
          font-weight: 500;
          color: #2d3748;
          margin-bottom: 0.5rem;
        }
        
        .text-input {
          width: 100%;
          padding: 0.75rem;
          font-size: 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          min-height: 120px;
          resize: vertical;
          font-family: inherit;
        }
        
        .text-input:focus {
          outline: none;
          border-color: #4a5568;
          box-shadow: 0 0 0 2px rgba(74, 85, 104, 0.2);
        }
        
        .action-buttons {
          display: flex;
          gap: 1rem;
        }
        
        .action-buttons button {
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .action-buttons button:first-child {
          background: #4a5568;
          color: white;
          flex: 1;
        }
        
        .action-buttons button:first-child:hover {
          background: #2d3748;
        }
        
        .action-buttons button:first-child.disabled {
          background: #a0aec0;
          cursor: not-allowed;
        }
        
        .reset-btn {
          background: #e2e8f0;
          color: #2d3748;
        }
        
        .reset-btn:hover {
          background: #cbd5e0;
        }
        
        .results-section {
          padding: 0 1.5rem 1.5rem;
          transition: all 0.3s;
        }
        
        .results-section.animate {
          transform: scale(1.02);
          opacity: 0.9;
        }
        
        .results-card {
          background: #2d3748;
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
          margin-right: 0.75rem;
        }
        
        .output-container {
          display: flex;
          gap: 1.5rem;
        }
        
        .output-box {
          flex: 1;
          background: white;
          padding: 1rem;
          border-radius: 6px;
          color: #2d3748;
        }
        
        .output-box pre {
          margin: 0;
          white-space: pre-wrap;
          word-wrap: break-word;
          font-family: 'Courier New', monospace;
          font-size: 1.125rem;
          line-height: 1.6;
        }
        
        .morse-info {
          width: 250px;
          background: rgba(255, 255, 255, 0.1);
          padding: 1rem;
          border-radius: 6px;
        }
        
        .morse-info h3 {
          font-size: 1.125rem;
          margin-top: 0;
          margin-bottom: 0.75rem;
        }
        
        .morse-info ul {
          margin: 0;
          padding-left: 1.25rem;
        }
        
        .morse-info li {
          margin-bottom: 0.5rem;
        }
        
        .about-section {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        .about-section h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 1rem;
        }
        
        .morse-code-description p {
          color: #4a5568;
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        
        .morse-history {
          margin: 1.5rem 0;
        }
        
        .morse-history h3 {
          font-size: 1.25rem;
          color: #2d3748;
          margin-bottom: 1rem;
        }
        
        .history-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        
        .history-card {
          background: #f7fafc;
          padding: 1rem;
          border-radius: 6px;
          border-left: 4px solid #4a5568;
        }
        
        .history-card h4 {
          margin: 0 0 0.5rem 0;
          color: #2d3748;
        }
        
        .history-card p {
          margin: 0;
          color: #4a5568;
          font-size: 0.875rem;
        }
        
        .tip {
          display: flex;
          align-items: center;
          background: #f0fff4;
          padding: 1rem;
          border-radius: 6px;
          border-left: 4px solid #48bb78;
          color: #2f855a;
          font-size: 0.875rem;
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
          
          .output-container {
            flex-direction: column;
          }
          
          .morse-info {
            width: 100%;
          }
        }
        
        @media (max-width: 640px) {
          .header h2 {
            font-size: 1.8rem;
          }
          
          .subtitle {
            font-size: 1rem;
          }
          
          .action-buttons {
            flex-direction: column;
          }
          
          .action-buttons button {
            width: 100%;
          }
          
          .history-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}