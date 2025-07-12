'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function SleepCalculator() {
  const [wakeTime, setWakeTime] = useState('')
  const [results, setResults] = useState(null)

  const calculateSleep = (e) => {
    e.preventDefault()
    
    if (!wakeTime) return

    const wake = new Date(`2000-01-01T${wakeTime}`)
    const sleepCycles = [4, 5, 6, 7, 8, 9] // hours of sleep
    const cycleLength = 90 // minutes per sleep cycle
    
    const bedTimes = sleepCycles.map(hours => {
      const bedTime = new Date(wake.getTime() - (hours * 60 * 60 * 1000))
      return {
        hours: hours,
        time: bedTime.toTimeString().slice(0, 5),
        cycles: Math.round((hours * 60) / cycleLength)
      }
    })

    setResults({
      wakeTime: wakeTime,
      bedTimes: bedTimes
    })
  }

  const clearForm = () => {
    setWakeTime('')
    setResults(null)
  }

  return (
    <div className="container">
      <div className="breadcrumb">
        <Link href="/">Home</Link> / Sleep Calculator
      </div>

      <header className="header">
        <h1>Sleep Calculator</h1>
        <p>Find optimal sleep schedule based on your wake time</p>
      </header>

      <div className="ad-banner">
        <h3>Advertisement Space</h3>
        <p>Desktop Ad Banner - 728x90</p>
      </div>

      <div className="calculator-container">
        <form onSubmit={calculateSleep}>
          <div className="form-group">
            <label htmlFor="wakeTime">Wake Time</label>
            <input
              type="time"
              id="wakeTime"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              required
            />
          </div>

          <div className="button-group">
            <button type="submit" className="calculate-btn">
              Calculate Sleep Times
            </button>
            <button type="button" className="clear-btn" onClick={clearForm}>
              Clear
            </button>
          </div>
        </form>

        {results && (
          <div className="results">
            <div className="result-item">
              <div className="result-value">{results.wakeTime}</div>
              <div className="result-label">Wake Time</div>
            </div>
            
            <div className="result-values">
              {results.bedTimes.map((bedTime, index) => (
                <div key={index} className="result-item">
                  <div className="result-value">{bedTime.time}</div>
                  <div className="result-label">{bedTime.hours}h ({bedTime.cycles} cycles)</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="info-section">
        <h3>About Sleep Cycles</h3>
        <ul>
          <li>Each sleep cycle lasts approximately 90 minutes.</li>
          <li>Waking up at the end of a complete cycle helps you feel more rested.</li>
          <li>Most adults need 6-9 hours of sleep per night.</li>
          <li>Individual sleep needs may vary based on age, activity level, and health.</li>
          <li>Consistent sleep schedule is important for quality sleep.</li>
        </ul>
      </div>

      <div className="ad-banner">
        <h3>Advertisement Space</h3>
        <p>Mobile Ad Banner - 320x50</p>
      </div>
    </div>
  )
} 