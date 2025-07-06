"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Calculator, Ruler, ArrowUpDown, TrendingUp } from 'lucide-react';

const HeightCalculator = () => {
  const [feet, setFeet] = useState('5');
  const [inches, setInches] = useState('8');
  const [centimeters, setCentimeters] = useState('');
  const [meters, setMeters] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculateHeight = () => {
    const feetValue = parseFloat(feet);
    const inchesValue = parseFloat(inches);

    if (isNaN(feetValue) || feetValue < 0) {
      setError('Please enter a valid feet value');
      return;
    }

    if (isNaN(inchesValue) || inchesValue < 0 || inchesValue >= 12) {
      setError('Please enter a valid inches value (0-11)');
      return;
    }

    try {
      // Convert feet and inches to total inches
      const totalInches = (feetValue * 12) + inchesValue;
      
      // Convert to centimeters (1 inch = 2.54 cm)
      const cmValue = totalInches * 2.54;
      
      // Convert to meters
      const mValue = cmValue / 100;
      
      // Calculate height in different units
      const heightInFeet = feetValue + (inchesValue / 12);
      const heightInYards = heightInFeet / 3;
      const heightInMiles = heightInFeet / 5280;

      setResult({
        feet: feetValue,
        inches: inchesValue,
        totalInches: totalInches,
        centimeters: cmValue,
        meters: mValue,
        yards: heightInYards,
        miles: heightInMiles
      });
      setError('');
    } catch (err) {
      setError('Error calculating height. Please check your inputs.');
    }
  };

  const calculateFromCm = () => {
    const cmValue = parseFloat(centimeters);

    if (isNaN(cmValue) || cmValue < 0) {
      setError('Please enter a valid centimeters value');
      return;
    }

    try {
      // Convert centimeters to inches
      const totalInches = cmValue / 2.54;
      
      // Convert to feet and inches
      const feetValue = Math.floor(totalInches / 12);
      const inchesValue = Math.round(totalInches % 12);
      
      // Convert to meters
      const mValue = cmValue / 100;
      
      // Calculate height in different units
      const heightInFeet = totalInches / 12;
      const heightInYards = heightInFeet / 3;
      const heightInMiles = heightInFeet / 5280;

      setResult({
        feet: feetValue,
        inches: inchesValue,
        totalInches: totalInches,
        centimeters: cmValue,
        meters: mValue,
        yards: heightInYards,
        miles: heightInMiles
      });
      setError('');
    } catch (err) {
      setError('Error calculating height. Please check your inputs.');
    }
  };

  const calculateFromM = () => {
    const mValue = parseFloat(meters);

    if (isNaN(mValue) || mValue < 0) {
      setError('Please enter a valid meters value');
      return;
    }

    try {
      // Convert meters to centimeters
      const cmValue = mValue * 100;
      
      // Convert to inches
      const totalInches = cmValue / 2.54;
      
      // Convert to feet and inches
      const feetValue = Math.floor(totalInches / 12);
      const inchesValue = Math.round(totalInches % 12);
      
      // Calculate height in different units
      const heightInFeet = totalInches / 12;
      const heightInYards = heightInFeet / 3;
      const heightInMiles = heightInFeet / 5280;

      setResult({
        feet: feetValue,
        inches: inchesValue,
        totalInches: totalInches,
        centimeters: cmValue,
        meters: mValue,
        yards: heightInYards,
        miles: heightInMiles
      });
      setError('');
    } catch (err) {
      setError('Error calculating height. Please check your inputs.');
    }
  };

  useEffect(() => {
    if (feet && inches) {
      calculateHeight();
    }
  }, [feet, inches]);

  const clearAll = () => {
    setFeet('5');
    setInches('8');
    setCentimeters('');
    setMeters('');
    setResult(null);
    setError('');
  };

  const setPresetHeight = (feetValue, inchesValue) => {
    setFeet(feetValue.toString());
    setInches(inchesValue.toString());
  };

  const formatHeight = (value, unit) => {
    return `${value.toFixed(2)} ${unit}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Height Calculator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Convert height between feet, inches, centimeters, and meters
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Calculator */}
            <div className="lg:col-span-3">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Ruler className="h-5 w-5" />
                    Height Conversion
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Feet and Inches Input */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Enter Height</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="feet" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Feet
                          </Label>
                          <Input
                            id="feet"
                            type="number"
                            value={feet}
                            onChange={(e) => setFeet(e.target.value)}
                            placeholder="Enter feet"
                            className="mt-2"
                            min="0"
                            step="1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="inches" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Inches
                          </Label>
                          <Input
                            id="inches"
                            type="number"
                            value={inches}
                            onChange={(e) => setInches(e.target.value)}
                            placeholder="Enter inches"
                            className="mt-2"
                            min="0"
                            max="11"
                            step="0.1"
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Alternative Input Methods */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Alternative Input</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="centimeters" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Centimeters
                          </Label>
                          <div className="flex gap-2 mt-2">
                            <Input
                              id="centimeters"
                              type="number"
                              value={centimeters}
                              onChange={(e) => setCentimeters(e.target.value)}
                              placeholder="Enter centimeters"
                              min="0"
                              step="0.1"
                            />
                            <Button onClick={calculateFromCm} variant="outline">
                              Convert
                            </Button>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="meters" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Meters
                          </Label>
                          <div className="flex gap-2 mt-2">
                            <Input
                              id="meters"
                              type="number"
                              value={meters}
                              onChange={(e) => setMeters(e.target.value)}
                              placeholder="Enter meters"
                              min="0"
                              step="0.01"
                            />
                            <Button onClick={calculateFromM} variant="outline">
                              Convert
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-center">
                      <Button onClick={calculateHeight} className="px-8">
                        <Calculator className="h-4 w-4 mr-2" />
                        Calculate Height
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
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Height Conversion Result
                          </h3>
                          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                            {result.feet}' {result.inches}"
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {formatHeight(result.centimeters, 'cm')} / {formatHeight(result.meters, 'm')}
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Feet & Inches:</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {result.feet}' {result.inches}"
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Total Inches:</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {formatHeight(result.totalInches, 'inches')}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Centimeters:</span>
                              <span className="font-semibold text-blue-600 dark:text-blue-400">
                                {formatHeight(result.centimeters, 'cm')}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Meters:</span>
                              <span className="font-semibold text-blue-600 dark:text-blue-400">
                                {formatHeight(result.meters, 'm')}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Yards:</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {formatHeight(result.yards, 'yd')}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Miles:</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {formatHeight(result.miles, 'mi')}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Summary Cards */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {result.feet}' {result.inches}"
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Imperial</div>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {formatHeight(result.centimeters, 'cm')}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Centimeters</div>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {formatHeight(result.meters, 'm')}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Meters</div>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {formatHeight(result.totalInches, 'in')}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Total Inches</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Common Heights */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Common Heights</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[
                          { feet: 5, inches: 0, label: '5\'0" - Average Female' },
                          { feet: 5, inches: 8, label: '5\'8" - Average Male' },
                          { feet: 6, inches: 0, label: '6\'0" - Tall Male' },
                          { feet: 4, inches: 10, label: '4\'10" - Petite Female' },
                          { feet: 5, inches: 4, label: '5\'4" - Average Female' },
                          { feet: 6, inches: 2, label: '6\'2" - Very Tall Male' }
                        ].map((height, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            onClick={() => setPresetHeight(height.feet, height.inches)}
                            className="justify-start h-auto p-3"
                          >
                            <div className="text-left">
                              <div className="font-medium">{height.label}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {height.feet}'{height.inches}" = {((height.feet * 12) + height.inches) * 2.54} cm
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Height Categories */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Height Categories</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Adult Height Ranges</h4>
                          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <div>• Very Short: Under 5'2" (157 cm)</div>
                            <div>• Short: 5'2" - 5'6" (157-168 cm)</div>
                            <div>• Average: 5'6" - 5'10" (168-178 cm)</div>
                            <div>• Tall: 5'10" - 6'2" (178-188 cm)</div>
                            <div>• Very Tall: Over 6'2" (188 cm)</div>
                          </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Children Height Ranges</h4>
                          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <div>• Newborn: 18-22" (46-56 cm)</div>
                            <div>• 1 Year: 28-32" (71-81 cm)</div>
                            <div>• 5 Years: 40-46" (102-117 cm)</div>
                            <div>• 10 Years: 50-58" (127-147 cm)</div>
                            <div>• 15 Years: 60-68" (152-173 cm)</div>
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
                <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-full h-64 bg-gradient-to-br from-blue-200 to-indigo-300 dark:from-blue-800 dark:to-indigo-700 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-2">
                            Ad Space
                          </div>
                          <div className="text-sm text-blue-600 dark:text-blue-300">
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
                <Info className="h-5 w-5 text-blue-600" />
                About Height Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Our Height Calculator provides accurate conversions between different height measurement units. 
                Whether you need to convert from feet and inches to metric units or vice versa, this tool makes 
                it easy to get precise measurements for any purpose.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Supported Units:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Feet and Inches (Imperial)</li>
                    <li>• Centimeters (Metric)</li>
                    <li>• Meters (Metric)</li>
                    <li>• Yards</li>
                    <li>• Miles</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Common Uses:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Medical records</li>
                    <li>• Sports statistics</li>
                    <li>• Clothing measurements</li>
                    <li>• Construction projects</li>
                    <li>• International travel</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Tips:</h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• 1 foot = 12 inches = 30.48 centimeters</li>
                  <li>• 1 inch = 2.54 centimeters</li>
                  <li>• 1 meter = 100 centimeters = 39.37 inches</li>
                  <li>• For precise measurements, use decimal inches</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HeightCalculator; 