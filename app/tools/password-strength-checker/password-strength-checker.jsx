"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Info, Shield, Eye, EyeOff, Copy, Check } from "lucide-react"

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [strength, setStrength] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [copied, setCopied] = useState(false)

  const checkPasswordStrength = (pass) => {
    if (!pass) {
      setStrength(null)
      setSuggestions([])
      return
    }

    let score = 0
    const feedback = []

    // Length check
    if (pass.length >= 8) score += 1
    else feedback.push("Use at least 8 characters")

    if (pass.length >= 12) score += 1
    if (pass.length >= 16) score += 1

    // Character variety checks
    if (/[a-z]/.test(pass)) score += 1
    else feedback.push("Add lowercase letters")

    if (/[A-Z]/.test(pass)) score += 1
    else feedback.push("Add uppercase letters")

    if (/[0-9]/.test(pass)) score += 1
    else feedback.push("Add numbers")

    if (/[^A-Za-z0-9]/.test(pass)) score += 1
    else feedback.push("Add special characters")

    // Bonus points for complexity
    if (pass.length > 8 && /[a-z]/.test(pass) && /[A-Z]/.test(pass) && /[0-9]/.test(pass)) {
      score += 1
    }

    if (pass.length > 12 && /[a-z]/.test(pass) && /[A-Z]/.test(pass) && /[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) {
      score += 1
    }

    // Penalties for common patterns
    if (/(.)\1{2,}/.test(pass)) {
      score = Math.max(0, score - 1)
      feedback.push("Avoid repeated characters")
    }

    if (/123|abc|qwe|password|admin/i.test(pass)) {
      score = Math.max(0, score - 2)
      feedback.push("Avoid common patterns")
    }

    // Determine strength level
    let strengthLevel = "Very Weak"
    let color = "bg-red-500"
    let textColor = "text-red-600 dark:text-red-400"

    if (score >= 8) {
      strengthLevel = "Very Strong"
      color = "bg-green-500"
      textColor = "text-green-600 dark:text-green-400"
    } else if (score >= 6) {
      strengthLevel = "Strong"
      color = "bg-green-400"
      textColor = "text-green-600 dark:text-green-400"
    } else if (score >= 4) {
      strengthLevel = "Moderate"
      color = "bg-yellow-500"
      textColor = "text-yellow-600 dark:text-yellow-400"
    } else if (score >= 2) {
      strengthLevel = "Weak"
      color = "bg-orange-500"
      textColor = "text-orange-600 dark:text-orange-400"
    }

    setStrength({
      score: score,
      level: strengthLevel,
      color: color,
      textColor: textColor,
      percentage: Math.min(100, (score / 10) * 100)
    })

    setSuggestions(feedback)
  }

  useEffect(() => {
    checkPasswordStrength(password)
  }, [password])

  const generateStrongPassword = () => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const numbers = "0123456789"
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"
    
    let generated = ""
    
    // Ensure at least one of each type
    generated += lowercase[Math.floor(Math.random() * lowercase.length)]
    generated += uppercase[Math.floor(Math.random() * uppercase.length)]
    generated += numbers[Math.floor(Math.random() * numbers.length)]
    generated += symbols[Math.floor(Math.random() * symbols.length)]
    
    // Fill the rest randomly
    const allChars = lowercase + uppercase + numbers + symbols
    for (let i = 4; i < 16; i++) {
      generated += allChars[Math.floor(Math.random() * allChars.length)]
    }
    
    // Shuffle the password
    generated = generated.split("").sort(() => Math.random() - 0.5).join("")
    
    setPassword(generated)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy password")
    }
  }

  const getStrengthIcon = () => {
    if (!strength) return <Shield className="h-5 w-5" />
    
    switch (strength.level) {
      case "Very Strong":
      case "Strong":
        return <Shield className="h-5 w-5 text-green-600" />
      case "Moderate":
        return <Shield className="h-5 w-5 text-yellow-600" />
      case "Weak":
        return <Shield className="h-5 w-5 text-orange-600" />
      default:
        return <Shield className="h-5 w-5 text-red-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Password Strength Checker
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Check your password strength and get suggestions for improvement
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Calculator */}
            <div className="lg:col-span-3">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Password Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Password Input */}
                    <div>
                      <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Enter Password
                      </Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password to check"
                          className="flex-1"
                        />
                        <Button
                          variant="outline"
                          onClick={() => setShowPassword(!showPassword)}
                          size="icon"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={copyToClipboard}
                          size="icon"
                          disabled={!password}
                        >
                          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    {/* Generate Password Button */}
                    <div className="flex justify-center">
                      <Button onClick={generateStrongPassword} variant="outline" className="px-8">
                        <Shield className="h-4 w-4 mr-2" />
                        Generate Strong Password
                      </Button>
                    </div>

                    {/* Strength Result */}
                    {strength && (
                      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-6 rounded-lg border border-cyan-200 dark:border-cyan-800">
                        <div className="text-center mb-4">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            {getStrengthIcon()}
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                              Password Strength: {strength.level}
                            </h3>
                          </div>
                          <div className={`text-2xl font-bold ${strength.textColor}`}>
                            Score: {strength.score}/10
                          </div>
                        </div>

                        <Separator className="my-4" />

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                            <span>Strength Level</span>
                            <span>{strength.percentage}%</span>
                          </div>
                          <Progress value={strength.percentage} className="h-3" />
                        </div>

                        {/* Strength Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Password Analysis:</h4>
                            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                              <li>• Length: {password.length} characters</li>
                              <li>• Contains lowercase: {/[a-z]/.test(password) ? "✓" : "✗"}</li>
                              <li>• Contains uppercase: {/[A-Z]/.test(password) ? "✓" : "✗"}</li>
                              <li>• Contains numbers: {/[0-9]/.test(password) ? "✓" : "✗"}</li>
                              <li>• Contains symbols: {/[^A-Za-z0-9]/.test(password) ? "✓" : "✗"}</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Security Features:</h4>
                            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                              <li>• No repeated patterns: {/(.)\1{2,}/.test(password) ? "✗" : "✓"}</li>
                              <li>• No common words: {/password|admin|123|qwe/i.test(password) ? "✗" : "✓"}</li>
                              <li>• Good complexity: {password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password) ? "✓" : "✗"}</li>
                              <li>• Excellent complexity: {password.length >= 12 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password) ? "✓" : "✗"}</li>
                            </ul>
                          </div>
                        </div>

                        {/* Suggestions */}
                        {suggestions.length > 0 && (
                          <div className="mt-4">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Suggestions for improvement:</h4>
                            <ul className="space-y-1">
                              {suggestions.map((suggestion, index) => (
                                <li key={index} className="text-sm text-orange-600 dark:text-orange-400 flex items-center gap-2">
                                  <span>•</span>
                                  {suggestion}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Password Tips */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Password Security Tips</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[
                          "Use at least 12 characters",
                          "Include uppercase and lowercase letters",
                          "Add numbers and special characters",
                          "Avoid common words and patterns",
                          "Don't reuse passwords",
                          "Use a password manager"
                        ].map((tip, index) => (
                          <div key={index} className="bg-white dark:bg-gray-800 p-3 rounded-lg border">
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              {tip}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Ad Banner */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <Card className="shadow-lg border-0 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-full h-64 bg-gradient-to-br from-cyan-200 to-blue-300 dark:from-cyan-800 dark:to-blue-700 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-cyan-800 dark:text-cyan-200 mb-2">
                            Ad Space
                          </div>
                          <div className="text-sm text-cyan-600 dark:text-cyan-300">
                            300x250
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Advertisement
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* About Section */}
          <Card className="mt-8 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-cyan-600" />
                About Password Strength Checker
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Our Password Strength Checker helps you evaluate the security of your passwords. 
                It analyzes various factors including length, character variety, complexity, and common patterns 
                to provide a comprehensive strength assessment with actionable suggestions for improvement.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Strength Levels:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Very Strong (8-10 points): Excellent security</li>
                    <li>• Strong (6-7 points): Good security</li>
                    <li>• Moderate (4-5 points): Acceptable security</li>
                    <li>• Weak (2-3 points): Poor security</li>
                    <li>• Very Weak (0-1 points): Very poor security</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Real-time strength analysis</li>
                    <li>• Password generation tool</li>
                    <li>• Detailed security breakdown</li>
                    <li>• Improvement suggestions</li>
                    <li>• Copy to clipboard function</li>
                  </ul>
                </div>
              </div>

              <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-cyan-900 dark:text-cyan-100 mb-2">🔒 Security Note:</h4>
                <ul className="text-sm text-cyan-800 dark:text-cyan-200 space-y-1">
                  <li>• Passwords are analyzed locally in your browser</li>
                  <li>• No passwords are stored or transmitted</li>
                  <li>• Use this tool to improve your password security</li>
                  <li>• Consider using a password manager for better security</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PasswordStrengthChecker 