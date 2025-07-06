"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Calculator, Heart, Users, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Name Compatibility Calculator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Discover the compatibility between two names using numerology and love calculations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Calculator */}
            <div className="lg:col-span-3">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-pink-600 to-red-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Love Compatibility
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Name Inputs */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Enter Names</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name1" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            First Name
                          </Label>
                          <Input
                            id="name1"
                            type="text"
                            value={name1}
                            onChange={(e) => setName1(e.target.value)}
                            placeholder="Enter first name"
                            className="mt-2"
                            maxLength="50"
                          />
                        </div>

                        <div>
                          <Label htmlFor="name2" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Second Name
                          </Label>
                          <Input
                            id="name2"
                            type="text"
                            value={name2}
                            onChange={(e) => setName2(e.target.value)}
                            placeholder="Enter second name"
                            className="mt-2"
                            maxLength="50"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Quick Name Pairs */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quick Name Pairs</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[
                          { name1: 'John', name2: 'Sarah' },
                          { name1: 'Michael', name2: 'Emma' },
                          { name1: 'David', name2: 'Lisa' },
                          { name1: 'James', name2: 'Maria' },
                          { name1: 'Robert', name2: 'Jennifer' },
                          { name1: 'William', name2: 'Jessica' }
                        ].map((pair, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            onClick={() => setPresetNames(pair.name1, pair.name2)}
                            className="justify-start h-auto p-3"
                          >
                            <div className="text-left">
                              <div className="font-medium">{pair.name1} & {pair.name2}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                Popular name combination
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-center">
                      <Button onClick={calculateCompatibility} className="px-8">
                        <Calculator className="h-4 w-4 mr-2" />
                        Calculate Compatibility
                      </Button>
                      <Button variant="outline" onClick={clearAll}>
                        Reset
                      </Button>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    {/* Result */}
                    {result && (
                      <div className="bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-900/20 dark:to-red-900/20 p-6 rounded-lg border border-pink-200 dark:border-pink-800">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Compatibility Result
                          </h3>
                          <div className="text-4xl mb-2">
                            {getCompatibilityEmoji(result.overallScore)}
                          </div>
                          <div className={`text-3xl font-bold ${result.compatibilityColor}`}>
                            {result.overallScore}%
                          </div>
                          <div className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
                            {result.compatibilityLevel}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            {result.compatibilityDescription}
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Love Score:</span>
                              <span className="font-semibold text-pink-600 dark:text-pink-400">
                                {result.loveScore}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Numerology Score:</span>
                              <span className="font-semibold text-purple-600 dark:text-purple-400">
                                {result.numerologyScore}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Letter Score:</span>
                              <span className="font-semibold text-blue-600 dark:text-blue-400">
                                {result.letterScore}%
                              </span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Vowel Harmony:</span>
                              <span className="font-semibold text-green-600 dark:text-green-400">
                                {result.vowelScore}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Overall Compatibility:</span>
                              <span className={`font-semibold ${result.compatibilityColor}`}>
                                {result.overallScore}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Names:</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {result.name1} & {result.name2}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Compatibility Breakdown */}
                        <div className="mt-6">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Compatibility Breakdown</h4>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                                <span>Love Score</span>
                                <span>{result.loveScore}%</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-pink-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${result.loveScore}%` }}
                                ></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                                <span>Numerology</span>
                                <span>{result.numerologyScore}%</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${result.numerologyScore}%` }}
                                ></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                                <span>Letter Harmony</span>
                                <span>{result.letterScore}%</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${result.letterScore}%` }}
                                ></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                                <span>Vowel Harmony</span>
                                <span>{result.vowelScore}%</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${result.vowelScore}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Summary Cards */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                                {result.loveScore}%
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Love Score</div>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                {result.numerologyScore}%
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Numerology</div>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {result.letterScore}%
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Letter Harmony</div>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {result.vowelScore}%
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Vowel Harmony</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Compatibility Tips */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Compatibility Insights</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">High Compatibility (80%+)</h4>
                          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <div>• Strong emotional connection</div>
                            <div>• Natural understanding</div>
                            <div>• Harmonious communication</div>
                            <div>• Shared values and goals</div>
                            <div>• Long-term potential</div>
                          </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Moderate Compatibility (50-79%)</h4>
                          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <div>• Good foundation for relationship</div>
                            <div>• Requires communication</div>
                            <div>• Growth opportunities</div>
                            <div>• Compromise needed</div>
                            <div>• Mutual effort required</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Ad Banner */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <Card className="shadow-lg border-0 bg-gradient-to-br from-pink-50 to-red-50 dark:from-gray-800 dark:to-gray-700">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-full h-64 bg-gradient-to-br from-pink-200 to-red-300 dark:from-pink-800 dark:to-red-700 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-pink-800 dark:text-pink-200 mb-2">
                            Ad Space
                          </div>
                          <div className="text-sm text-pink-600 dark:text-pink-300">
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
                <Info className="h-5 w-5 text-pink-600" />
                About Name Compatibility Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Our Name Compatibility Calculator uses multiple mystical and mathematical approaches to determine 
                the compatibility between two names. This tool combines numerology, letter analysis, vowel harmony, 
                and love calculations to provide insights into relationship potential.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Calculation Methods:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Love Score: Based on common letters and name length</li>
                    <li>• Numerology: Using traditional name numerology</li>
                    <li>• Letter Harmony: Analyzing letter patterns</li>
                    <li>• Vowel Harmony: Examining vowel compatibility</li>
                    <li>• Overall Score: Combined weighted average</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Compatibility Levels:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• 90-100%: Soulmates</li>
                    <li>• 80-89%: Perfect Match</li>
                    <li>• 70-79%: Great Match</li>
                    <li>• 60-69%: Good Match</li>
                    <li>• 50-59%: Fair Match</li>
                    <li>• Below 50%: Challenging</li>
                  </ul>
                </div>
              </div>

              <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-pink-900 dark:text-pink-100 mb-2">💕 Remember:</h4>
                <ul className="text-sm text-pink-800 dark:text-pink-200 space-y-1">
                  <li>• This is for entertainment purposes only</li>
                  <li>• Real relationships require communication and effort</li>
                  <li>• Compatibility scores are just one factor</li>
                  <li>• Love transcends numerical calculations</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NameCompatibilityCalculator; 