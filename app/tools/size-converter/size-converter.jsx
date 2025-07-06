"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Calculator, Ruler, ArrowUpDown } from 'lucide-react';

const SizeConverter = () => {
  const [inputValue, setInputValue] = useState('100');
  const [fromUnit, setFromUnit] = useState('cm');
  const [toUnit, setToUnit] = useState('inches');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const units = {
    // Length units
    mm: { name: 'Millimeters', symbol: 'mm', category: 'length' },
    cm: { name: 'Centimeters', symbol: 'cm', category: 'length' },
    m: { name: 'Meters', symbol: 'm', category: 'length' },
    km: { name: 'Kilometers', symbol: 'km', category: 'length' },
    inches: { name: 'Inches', symbol: 'in', category: 'length' },
    feet: { name: 'Feet', symbol: 'ft', category: 'length' },
    yards: { name: 'Yards', symbol: 'yd', category: 'length' },
    miles: { name: 'Miles', symbol: 'mi', category: 'length' },
    
    // Area units
    sqmm: { name: 'Square Millimeters', symbol: 'mm²', category: 'area' },
    sqcm: { name: 'Square Centimeters', symbol: 'cm²', category: 'area' },
    sqm: { name: 'Square Meters', symbol: 'm²', category: 'area' },
    sqkm: { name: 'Square Kilometers', symbol: 'km²', category: 'area' },
    sqin: { name: 'Square Inches', symbol: 'in²', category: 'area' },
    sqft: { name: 'Square Feet', symbol: 'ft²', category: 'area' },
    sqyd: { name: 'Square Yards', symbol: 'yd²', category: 'area' },
    acres: { name: 'Acres', symbol: 'acres', category: 'area' },
    
    // Volume units
    ml: { name: 'Milliliters', symbol: 'ml', category: 'volume' },
    l: { name: 'Liters', symbol: 'L', category: 'volume' },
    cuin: { name: 'Cubic Inches', symbol: 'in³', category: 'volume' },
    cuft: { name: 'Cubic Feet', symbol: 'ft³', category: 'volume' },
    gallons: { name: 'Gallons', symbol: 'gal', category: 'volume' }
  };

  const convertSize = () => {
    const value = parseFloat(inputValue);

    if (isNaN(value) || value < 0) {
      setError('Please enter a valid positive number');
      return;
    }

    try {
      let convertedValue = 0;
      const fromUnitData = units[fromUnit];
      const toUnitData = units[toUnit];

      // Check if units are in the same category
      if (fromUnitData.category !== toUnitData.category) {
        setError('Cannot convert between different unit categories');
        return;
      }

      // Convert to base unit first, then to target unit
      let baseValue = 0;

      if (fromUnitData.category === 'length') {
        // Convert to millimeters (base unit)
        switch (fromUnit) {
          case 'mm': baseValue = value; break;
          case 'cm': baseValue = value * 10; break;
          case 'm': baseValue = value * 1000; break;
          case 'km': baseValue = value * 1000000; break;
          case 'inches': baseValue = value * 25.4; break;
          case 'feet': baseValue = value * 304.8; break;
          case 'yards': baseValue = value * 914.4; break;
          case 'miles': baseValue = value * 1609344; break;
        }

        // Convert from millimeters to target unit
        switch (toUnit) {
          case 'mm': convertedValue = baseValue; break;
          case 'cm': convertedValue = baseValue / 10; break;
          case 'm': convertedValue = baseValue / 1000; break;
          case 'km': convertedValue = baseValue / 1000000; break;
          case 'inches': convertedValue = baseValue / 25.4; break;
          case 'feet': convertedValue = baseValue / 304.8; break;
          case 'yards': convertedValue = baseValue / 914.4; break;
          case 'miles': convertedValue = baseValue / 1609344; break;
        }
      } else if (fromUnitData.category === 'area') {
        // Convert to square millimeters (base unit)
        switch (fromUnit) {
          case 'sqmm': baseValue = value; break;
          case 'sqcm': baseValue = value * 100; break;
          case 'sqm': baseValue = value * 1000000; break;
          case 'sqkm': baseValue = value * 1000000000000; break;
          case 'sqin': baseValue = value * 645.16; break;
          case 'sqft': baseValue = value * 92903.04; break;
          case 'sqyd': baseValue = value * 836127.36; break;
          case 'acres': baseValue = value * 4046856422.4; break;
        }

        // Convert from square millimeters to target unit
        switch (toUnit) {
          case 'sqmm': convertedValue = baseValue; break;
          case 'sqcm': convertedValue = baseValue / 100; break;
          case 'sqm': convertedValue = baseValue / 1000000; break;
          case 'sqkm': convertedValue = baseValue / 1000000000000; break;
          case 'sqin': convertedValue = baseValue / 645.16; break;
          case 'sqft': convertedValue = baseValue / 92903.04; break;
          case 'sqyd': convertedValue = baseValue / 836127.36; break;
          case 'acres': convertedValue = baseValue / 4046856422.4; break;
        }
      } else if (fromUnitData.category === 'volume') {
        // Convert to milliliters (base unit)
        switch (fromUnit) {
          case 'ml': baseValue = value; break;
          case 'l': baseValue = value * 1000; break;
          case 'cuin': baseValue = value * 16.387064; break;
          case 'cuft': baseValue = value * 28316.846592; break;
          case 'gallons': baseValue = value * 3785.411784; break;
        }

        // Convert from milliliters to target unit
        switch (toUnit) {
          case 'ml': convertedValue = baseValue; break;
          case 'l': convertedValue = baseValue / 1000; break;
          case 'cuin': convertedValue = baseValue / 16.387064; break;
          case 'cuft': convertedValue = baseValue / 28316.846592; break;
          case 'gallons': convertedValue = baseValue / 3785.411784; break;
        }
      }

      setResult({
        fromValue: value,
        fromUnit: fromUnitData,
        toValue: convertedValue,
        toUnit: toUnitData,
        category: fromUnitData.category
      });
      setError('');
    } catch (err) {
      setError('Error converting size. Please check your inputs.');
    }
  };

  useEffect(() => {
    if (inputValue && fromUnit && toUnit) {
      convertSize();
    }
  }, [inputValue, fromUnit, toUnit]);

  const clearAll = () => {
    setInputValue('100');
    setFromUnit('cm');
    setToUnit('inches');
    setResult(null);
    setError('');
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const setPresetConversion = (from, to) => {
    setFromUnit(from);
    setToUnit(to);
  };

  const formatNumber = (num) => {
    if (num === 0) return '0';
    if (Math.abs(num) < 0.000001) return num.toExponential(6);
    if (Math.abs(num) >= 1000000) return num.toExponential(6);
    return num.toFixed(6).replace(/\.?0+$/, '');
  };

  const getUnitOptions = (category) => {
    return Object.entries(units).filter(([key, unit]) => unit.category === category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Size Converter
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Convert between different units of length, area, and volume
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Calculator */}
            <div className="lg:col-span-3">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Ruler className="h-5 w-5" />
                    Size Conversion
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Unit Category Selection */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Unit Category</h3>
                      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                        <Button
                          variant={units[fromUnit].category === 'length' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => {
                            setFromUnit('cm');
                            setToUnit('inches');
                          }}
                          className="rounded-md"
                        >
                          Length
                        </Button>
                        <Button
                          variant={units[fromUnit].category === 'area' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => {
                            setFromUnit('sqcm');
                            setToUnit('sqin');
                          }}
                          className="rounded-md"
                        >
                          Area
                        </Button>
                        <Button
                          variant={units[fromUnit].category === 'volume' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => {
                            setFromUnit('ml');
                            setToUnit('cuin');
                          }}
                          className="rounded-md"
                        >
                          Volume
                        </Button>
                      </div>
                    </div>

                    {/* Conversion Input */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Convert</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div>
                          <Label htmlFor="inputValue" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Value
                          </Label>
                          <Input
                            id="inputValue"
                            type="number"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Enter value"
                            className="mt-2"
                            min="0"
                            step="any"
                          />
                        </div>

                        <div>
                          <Label htmlFor="fromUnit" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            From Unit
                          </Label>
                          <select
                            id="fromUnit"
                            value={fromUnit}
                            onChange={(e) => setFromUnit(e.target.value)}
                            className="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          >
                            {getUnitOptions(units[fromUnit].category).map(([key, unit]) => (
                              <option key={key} value={key}>
                                {unit.name} ({unit.symbol})
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <Label htmlFor="toUnit" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            To Unit
                          </Label>
                          <select
                            id="toUnit"
                            value={toUnit}
                            onChange={(e) => setToUnit(e.target.value)}
                            className="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          >
                            {getUnitOptions(units[fromUnit].category).map(([key, unit]) => (
                              <option key={key} value={key}>
                                {unit.name} ({unit.symbol})
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-center mt-4">
                        <Button onClick={swapUnits} variant="outline">
                          <ArrowUpDown className="h-4 w-4 mr-2" />
                          Swap Units
                        </Button>
                      </div>
                    </div>

                    {/* Quick Conversions */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quick Conversions</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {units[fromUnit].category === 'length' && [
                          { from: 'cm', to: 'inches', label: 'cm to inches' },
                          { from: 'm', to: 'feet', label: 'm to feet' },
                          { from: 'km', to: 'miles', label: 'km to miles' },
                          { from: 'inches', to: 'cm', label: 'inches to cm' },
                          { from: 'feet', to: 'm', label: 'feet to m' },
                          { from: 'miles', to: 'km', label: 'miles to km' }
                        ].map((conversion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            onClick={() => setPresetConversion(conversion.from, conversion.to)}
                            className="justify-center"
                          >
                            {conversion.label}
                          </Button>
                        ))}
                        {units[fromUnit].category === 'area' && [
                          { from: 'sqcm', to: 'sqin', label: 'cm² to in²' },
                          { from: 'sqm', to: 'sqft', label: 'm² to ft²' },
                          { from: 'sqkm', to: 'acres', label: 'km² to acres' },
                          { from: 'sqin', to: 'sqcm', label: 'in² to cm²' },
                          { from: 'sqft', to: 'sqm', label: 'ft² to m²' },
                          { from: 'acres', to: 'sqkm', label: 'acres to km²' }
                        ].map((conversion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            onClick={() => setPresetConversion(conversion.from, conversion.to)}
                            className="justify-center"
                          >
                            {conversion.label}
                          </Button>
                        ))}
                        {units[fromUnit].category === 'volume' && [
                          { from: 'ml', to: 'cuin', label: 'ml to in³' },
                          { from: 'l', to: 'gallons', label: 'L to gallons' },
                          { from: 'cuft', to: 'l', label: 'ft³ to L' },
                          { from: 'cuin', to: 'ml', label: 'in³ to ml' },
                          { from: 'gallons', to: 'l', label: 'gallons to L' },
                          { from: 'l', to: 'cuft', label: 'L to ft³' }
                        ].map((conversion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            onClick={() => setPresetConversion(conversion.from, conversion.to)}
                            className="justify-center"
                          >
                            {conversion.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-center">
                      <Button onClick={convertSize} className="px-8">
                        <Calculator className="h-4 w-4 mr-2" />
                        Convert
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
                      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 p-6 rounded-lg border border-teal-200 dark:border-teal-800">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Conversion Result
                          </h3>
                          <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                            {formatNumber(result.fromValue)} {result.fromUnit.symbol} = {formatNumber(result.toValue)} {result.toUnit.symbol}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            {result.fromUnit.name} to {result.toUnit.name}
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">From:</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {formatNumber(result.fromValue)} {result.fromUnit.symbol}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">To:</span>
                              <span className="font-semibold text-teal-600 dark:text-teal-400">
                                {formatNumber(result.toValue)} {result.toUnit.symbol}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Category:</span>
                              <span className="font-semibold text-gray-900 dark:text-white capitalize">
                                {result.category}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Conversion Factor:</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {formatNumber(result.toValue / result.fromValue)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Precision:</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {result.toValue.toString().includes('.') ? result.toValue.toString().split('.')[1].length : 0} decimal places
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Summary Cards */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                                {formatNumber(result.fromValue)}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">{result.fromUnit.symbol}</div>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                                {formatNumber(result.toValue)}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">{result.toUnit.symbol}</div>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-teal-600 dark:text-teal-400 capitalize">
                                {result.category}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Unit Type</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Common Conversions */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Common Conversions</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Length Conversions</h4>
                          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <div>• 1 inch = 2.54 centimeters</div>
                            <div>• 1 foot = 0.3048 meters</div>
                            <div>• 1 mile = 1.609 kilometers</div>
                            <div>• 1 yard = 0.9144 meters</div>
                            <div>• 1 meter = 39.37 inches</div>
                          </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Area & Volume</h4>
                          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <div>• 1 square foot = 0.0929 square meters</div>
                            <div>• 1 acre = 4046.86 square meters</div>
                            <div>• 1 gallon = 3.785 liters</div>
                            <div>• 1 cubic foot = 28.317 liters</div>
                            <div>• 1 liter = 61.024 cubic inches</div>
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
                <Card className="shadow-lg border-0 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-full h-64 bg-gradient-to-br from-teal-200 to-cyan-300 dark:from-teal-800 dark:to-cyan-700 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-teal-800 dark:text-teal-200 mb-2">
                            Ad Space
                          </div>
                          <div className="text-sm text-teal-600 dark:text-teal-300">
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
                <Info className="h-5 w-5 text-teal-600" />
                About Size Converter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Our Size Converter provides accurate conversions between different units of length, area, and volume. 
                Whether you're working with metric or imperial units, this tool helps you convert measurements 
                quickly and precisely for any project or calculation.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Supported Categories:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Length (mm, cm, m, km, inches, feet, yards, miles)</li>
                    <li>• Area (mm², cm², m², km², in², ft², yd², acres)</li>
                    <li>• Volume (ml, L, in³, ft³, gallons)</li>
                    <li>• Metric and Imperial units</li>
                    <li>• High precision calculations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Common Uses:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Construction and engineering</li>
                    <li>• Scientific calculations</li>
                    <li>• International travel</li>
                    <li>• Cooking and recipes</li>
                    <li>• Academic projects</li>
                  </ul>
                </div>
              </div>

              <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-teal-900 dark:text-teal-100 mb-2">💡 Tips:</h4>
                <ul className="text-sm text-teal-800 dark:text-teal-200 space-y-1">
                  <li>• Use the swap button to quickly reverse conversions</li>
                  <li>• Choose the appropriate unit category for accurate results</li>
                  <li>• Results are displayed with appropriate precision</li>
                  <li>• Quick conversion buttons for common transformations</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SizeConverter; 