"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Calculator, DollarSign, TrendingUp } from 'lucide-react';

const GSTCalculator = () => {
  const [amount, setAmount] = useState('1000');
  const [gstRate, setGstRate] = useState('18');
  const [calculationType, setCalculationType] = useState('add'); // 'add' or 'remove'
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const gstRates = [
    { value: '0', label: '0% - Exempt' },
    { value: '5', label: '5% - Reduced Rate' },
    { value: '12', label: '12% - Standard Rate' },
    { value: '18', label: '18% - Standard Rate' },
    { value: '28', label: '28% - Luxury Rate' }
  ];

  const calculateGST = () => {
    const baseAmount = parseFloat(amount);
    const rate = parseFloat(gstRate);

    if (isNaN(baseAmount) || baseAmount <= 0) {
      setError('Please enter a valid positive amount');
      return;
    }

    if (isNaN(rate) || rate < 0 || rate > 100) {
      setError('Please enter a valid GST rate between 0 and 100');
      return;
    }

    try {
      let originalAmount, gstAmount, totalAmount;

      if (calculationType === 'add') {
        // Calculate GST to be added
        originalAmount = baseAmount;
        gstAmount = (originalAmount * rate) / 100;
        totalAmount = originalAmount + gstAmount;
      } else {
        // Calculate GST from total amount
        totalAmount = baseAmount;
        originalAmount = (totalAmount * 100) / (100 + rate);
        gstAmount = totalAmount - originalAmount;
      }

      setResult({
        originalAmount: originalAmount,
        gstAmount: gstAmount,
        totalAmount: totalAmount,
        rate: rate,
        type: calculationType
      });
      setError('');
    } catch (err) {
      setError('Error calculating GST. Please check your inputs.');
    }
  };

  useEffect(() => {
    if (amount && gstRate) {
      calculateGST();
    }
  }, [amount, gstRate, calculationType]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const clearAll = () => {
    setAmount('1000');
    setGstRate('18');
    setCalculationType('add');
    setResult(null);
    setError('');
  };

  const setPresetAmount = (value) => {
    setAmount(value.toString());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              GST Calculator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Calculate Goods and Services Tax (GST) for Indian businesses and consumers
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Calculator */}
            <div className="lg:col-span-3">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-violet-600 to-purple-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    GST Calculation
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Calculation Type */}
                    <div className="flex justify-center">
                      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                        <Button
                          variant={calculationType === 'add' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setCalculationType('add')}
                          className="rounded-md"
                        >
                          Add GST
                        </Button>
                        <Button
                          variant={calculationType === 'remove' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setCalculationType('remove')}
                          className="rounded-md"
                        >
                          Remove GST
                        </Button>
                      </div>
                    </div>

                    {/* Input Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="amount" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {calculationType === 'add' ? 'Base Amount (₹)' : 'Total Amount (₹)'}
                        </Label>
                        <Input
                          id="amount"
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="Enter amount"
                          className="mt-2"
                          min="0"
                          step="0.01"
                        />
                      </div>

                      <div>
                        <Label htmlFor="gstRate" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          GST Rate (%)
                        </Label>
                        <select
                          id="gstRate"
                          value={gstRate}
                          onChange={(e) => setGstRate(e.target.value)}
                          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                        >
                          {gstRates.map((rate) => (
                            <option key={rate.value} value={rate.value}>
                              {rate.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-center">
                      <Button onClick={calculateGST} className="px-8">
                        <Calculator className="h-4 w-4 mr-2" />
                        Calculate GST
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
                      <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-violet-200 dark:border-violet-800">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            GST Calculation Result
                          </h3>
                          <div className="text-3xl font-bold text-violet-600 dark:text-violet-400">
                            {formatCurrency(result.totalAmount)}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {calculationType === 'add' ? 'Total Amount (Including GST)' : 'Total Amount'}
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">
                                {calculationType === 'add' ? 'Base Amount:' : 'Original Amount:'}
                              </span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {formatCurrency(result.originalAmount)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">GST Amount:</span>
                              <span className="font-semibold text-red-600 dark:text-red-400">
                                {formatCurrency(result.gstAmount)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">GST Rate:</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {result.rate}%
                              </span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">GST Percentage:</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {((result.gstAmount / result.originalAmount) * 100).toFixed(2)}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Calculation Type:</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {calculationType === 'add' ? 'GST Added' : 'GST Removed'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Net Amount:</span>
                              <span className="font-semibold text-green-600 dark:text-green-400">
                                {formatCurrency(result.originalAmount)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Summary Cards */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                                {formatCurrency(result.totalAmount)}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Total Amount</div>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {formatCurrency(result.originalAmount)}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {calculationType === 'add' ? 'Base Amount' : 'Net Amount'}
                              </div>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                                {formatCurrency(result.gstAmount)}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">GST Amount</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Quick Amounts */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quick Amounts</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                        {[100, 500, 1000, 5000, 10000, 50000].map((value) => (
                          <Button
                            key={value}
                            variant="outline"
                            onClick={() => setPresetAmount(value)}
                            className="justify-center"
                          >
                            ₹{value.toLocaleString()}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* GST Information */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">GST Rate Information</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {gstRates.map((rate) => (
                          <div key={rate.value} className="bg-white dark:bg-gray-800 p-3 rounded-lg border">
                            <div className="text-center">
                              <div className="text-lg font-bold text-violet-600 dark:text-violet-400">
                                {rate.value}%
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {rate.label.split(' - ')[1]}
                              </div>
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
                <Card className="shadow-lg border-0 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-full h-64 bg-gradient-to-br from-violet-200 to-purple-300 dark:from-violet-800 dark:to-purple-700 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-violet-800 dark:text-violet-200 mb-2">
                            Ad Space
                          </div>
                          <div className="text-sm text-violet-600 dark:text-violet-300">
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
                <Info className="h-5 w-5 text-violet-600" />
                About GST Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Our GST Calculator helps you calculate Goods and Services Tax for Indian businesses and consumers. 
                Whether you need to add GST to a base amount or remove GST from a total amount, this tool provides 
                accurate calculations with detailed breakdowns.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">GST Rates in India:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• 0% - Essential goods and services</li>
                    <li>• 5% - Basic necessities</li>
                    <li>• 12% - Standard rate for some goods</li>
                    <li>• 18% - Standard rate for most goods</li>
                    <li>• 28% - Luxury items and demerit goods</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Add GST to base amount</li>
                    <li>• Remove GST from total amount</li>
                    <li>• All standard GST rates</li>
                    <li>• Detailed breakdown</li>
                    <li>• Mobile-friendly design</li>
                  </ul>
                </div>
              </div>

              <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-violet-900 dark:text-violet-100 mb-2">💡 Tips:</h4>
                <ul className="text-sm text-violet-800 dark:text-violet-200 space-y-1">
                  <li>• Use "Add GST" to calculate total including tax</li>
                  <li>• Use "Remove GST" to find original amount from total</li>
                  <li>• Different rates apply to different goods/services</li>
                  <li>• Always verify rates with official sources</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GSTCalculator; 