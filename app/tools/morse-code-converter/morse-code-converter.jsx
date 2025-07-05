"use client"

import { useState } from "react"

const morseCode = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
  '!': '-.-.--', ' ': ' '
}

const reverseMorseCode = Object.fromEntries(
  Object.entries(morseCode).map(([key, value]) => [value, key])
)

export default function MorseCodeConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState("textToMorse")

  const convert = () => {
    if (!input.trim()) {
      setOutput("")
      return
    }

    if (mode === "textToMorse") {
      const result = input.toUpperCase().split('').map(char => {
        return morseCode[char] || char
      }).join(' ')
      setOutput(result)
    } else {
      const morseWords = input.split('   ')
      const result = morseWords.map(word => {
        const letters = word.split(' ')
        return letters.map(letter => {
          return reverseMorseCode[letter] || letter
        }).join('')
      }).join(' ')
      setOutput(result)
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Morse Code Converter</h1>
      <div style={{ background: "white", padding: 30, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
        <div style={{ marginBottom: 15 }}>
          <label>Mode: </label>
          <select value={mode} onChange={e => setMode(e.target.value)} style={{ marginLeft: 10, width: 150 }}>
            <option value="textToMorse">Text to Morse</option>
            <option value="morseToText">Morse to Text</option>
          </select>
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Input: </label>
          <textarea 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            style={{ marginLeft: 10, width: "calc(100% - 60px)", height: 100, padding: 10 }}
            placeholder={mode === "textToMorse" ? "Enter text to convert to morse code" : "Enter morse code (use . for dot, - for dash, space between letters, three spaces between words)"}
          />
        </div>
        <button onClick={convert} style={{ background: "#673ab7", color: "white", border: "none", padding: "10px 20px", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>Convert</button>
        {output && (
          <div style={{ marginTop: 20 }}>
            <div style={{ marginBottom: 10 }}>
              <strong>Output:</strong>
            </div>
            <div style={{ 
              background: "#f5f5f5", 
              padding: 15, 
              borderRadius: 5, 
              fontFamily: "monospace",
              fontSize: 16,
              wordBreak: "break-all"
            }}>
              {output}
            </div>
          </div>
        )}
      </div>
      <div style={{ marginTop: 30, background: "white", padding: 20, borderRadius: 8 }}>
        <h2>About Morse Code Converter</h2>
        <p>
          The Morse Code Converter helps you convert text to morse code and vice versa. (You can update this section later.)
        </p>
      </div>
    </div>
  )
}