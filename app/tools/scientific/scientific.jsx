'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [angleMode, setAngleMode] = useState('deg') // deg or rad

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+': return firstValue + secondValue
      case '-': return firstValue - secondValue
      case '×': return firstValue * secondValue
      case '÷': return firstValue / secondValue
      case '^': return Math.pow(firstValue, secondValue)
      default: return secondValue
    }
  }

  const performFunction = (func) => {
    const inputValue = parseFloat(display)
    let result

    switch (func) {
      case 'sin':
        result = Math.sin(angleMode === 'deg' ? inputValue * Math.PI / 180 : inputValue)
        break
      case 'cos':
        result = Math.cos(angleMode === 'deg' ? inputValue * Math.PI / 180 : inputValue)
        break
      case 'tan':
        result = Math.tan(angleMode === 'deg' ? inputValue * Math.PI / 180 : inputValue)
        break
      case 'log':
        result = Math.log10(inputValue)
        break
      case 'ln':
        result = Math.log(inputValue)
        break
      case 'sqrt':
        result = Math.sqrt(inputValue)
        break
      case 'square':
        result = Math.pow(inputValue, 2)
        break
      case 'cube':
        result = Math.pow(inputValue, 3)
        break
      case 'factorial':
        result = factorial(inputValue)
        break
      case 'inverse':
        result = 1 / inputValue
        break
      case 'abs':
        result = Math.abs(inputValue)
        break
      case 'exp':
        result = Math.exp(inputValue)
        break
      default:
        return
    }

    setDisplay(String(result))
    setWaitingForOperand(true)
  }

  const factorial = (n) => {
    if (n < 0) return NaN
    if (n === 0 || n === 1) return 1
    let result = 1
    for (let i = 2; i <= n; i++) {
      result *= i
    }
    return result
  }

  const toggleAngleMode = () => {
    setAngleMode(angleMode === 'deg' ? 'rad' : 'deg')
  }

  const handleEquals = () => {
    if (!previousValue || !operation) return

    const inputValue = parseFloat(display)
    const newValue = calculate(previousValue, inputValue, operation)

    setDisplay(String(newValue))
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(true)
  }

  return (
    <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link> / Scientific Calculator
        </div>

        <header className="header">
          <h1>Scientific Calculator</h1>
          <p>Advanced mathematical functions and calculations</p>
        </header>

        <div className="ad-banner">
          <h3>Advertisement Space</h3>
          <p>Desktop Ad Banner - 728x90</p>
        </div>

        <div className="calculator">
          <div className="display">{display}</div>
          
          <div className="angle-mode">
            <button
              className={`angle-btn ${angleMode === 'deg' ? 'active' : ''}`}
              onClick={toggleAngleMode}
            >
              DEG
            </button>
            <button
              className={`angle-btn ${angleMode === 'rad' ? 'active' : ''}`}
              onClick={toggleAngleMode}
            >
              RAD
            </button>
          </div>

          <div className="buttons">
            {/* Function buttons */}
            <button className="btn btn-function" onClick={() => performFunction('sin')}>sin</button>
            <button className="btn btn-function" onClick={() => performFunction('cos')}>cos</button>
            <button className="btn btn-function" onClick={() => performFunction('tan')}>tan</button>
            <button className="btn btn-function" onClick={() => performFunction('log')}>log</button>
            <button className="btn btn-function" onClick={() => performFunction('ln')}>ln</button>

            <button className="btn btn-function" onClick={() => performFunction('sqrt')}>√</button>
            <button className="btn btn-function" onClick={() => performFunction('square')}>x²</button>
            <button className="btn btn-function" onClick={() => performFunction('cube')}>x³</button>
            <button className="btn btn-function" onClick={() => performFunction('factorial')}>x!</button>
            <button className="btn btn-function" onClick={() => performFunction('inverse')}>1/x</button>

            <button className="btn btn-function" onClick={() => performFunction('abs')}>|x|</button>
            <button className="btn btn-function" onClick={() => performFunction('exp')}>eˣ</button>
            <button className="btn btn-clear" onClick={clear}>C</button>
            <button className="btn btn-operator" onClick={() => performOperation('÷')}>÷</button>
            <button className="btn btn-operator" onClick={() => performOperation('^')}>^</button>

            {/* Number buttons */}
            <button className="btn btn-number" onClick={() => inputDigit(7)}>7</button>
            <button className="btn btn-number" onClick={() => inputDigit(8)}>8</button>
            <button className="btn btn-number" onClick={() => inputDigit(9)}>9</button>
            <button className="btn btn-operator" onClick={() => performOperation('×')}>×</button>
            <button className="btn btn-number" onClick={() => inputDigit(4)}>4</button>

            <button className="btn btn-number" onClick={() => inputDigit(5)}>5</button>
            <button className="btn btn-number" onClick={() => inputDigit(6)}>6</button>
            <button className="btn btn-operator" onClick={() => performOperation('-')}>-</button>
            <button className="btn btn-number" onClick={() => inputDigit(1)}>1</button>
            <button className="btn btn-number" onClick={() => inputDigit(2)}>2</button>

            <button className="btn btn-number" onClick={() => inputDigit(3)}>3</button>
            <button className="btn btn-operator" onClick={() => performOperation('+')}>+</button>
            <button className="btn btn-number btn-wide" onClick={() => inputDigit(0)}>0</button>
            <button className="btn btn-number" onClick={inputDecimal}>.</button>
            <button className="btn btn-equals btn-tall" onClick={handleEquals}>=</button>
          </div>
        </div>

        <div className="info-section">
          <h3>Scientific Calculator Functions</h3>
          <ul>
            <li><strong>Trigonometric:</strong> sin, cos, tan (supports degrees and radians)</li>
            <li><strong>Logarithmic:</strong> log (base 10), ln (natural logarithm)</li>
            <li><strong>Power:</strong> square (x²), cube (x³), power (x^y)</li>
            <li><strong>Other:</strong> square root (√), factorial (x!), inverse (1/x), absolute value (|x|), exponential (eˣ)</li>
            <li><strong>Basic:</strong> Addition, subtraction, multiplication, division</li>
          </ul>
        </div>

              <div className="ad-banner">
        <h3>Advertisement Space</h3>
        <p>Mobile Ad Banner - 320x50</p>
      </div>
    </div>
  )
} 