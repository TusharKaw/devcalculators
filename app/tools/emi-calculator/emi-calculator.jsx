"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Calculator, TrendingUp, DollarSign } from 'lucide-react';

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState('100000');
  const [interestRate, setInterestRate] = useState('8.5');
  const [loanTerm, setLoanTerm] = useState('12');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const time = parseFloat(loanTerm) * 12; // Total months

    if (principal <= 0 || rate <= 0 || time <= 0) {
      setError('Please enter valid values for all fields');
      return;
    }

    if (rate >= 1) {
      setError('Interest rate seems too high. Please check your input.');
      return;
    }

    try {
      // EMI formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
      const emi = principal * rate * Math.pow(1 + rate, time) / (Math.pow(1 + rate, time) - 1);
      const totalAmount = emi * time;
      const totalInterest = totalAmount - principal;

      setResult({
        emi: emi,
        totalAmount: totalAmount,
        totalInterest: totalInterest,
        principal: principal,
        monthlyRate: rate * 100,
        totalMonths: time
      });
      setError('');
    } catch (err) {
      setError('Error calculating EMI. Please check your inputs.');
    }
  };

  useEffect(() => {
    if (loanAmount && interestRate && loanTerm) {
      calculateEMI();
    }
  }, [loanAmount, interestRate, loanTerm]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(2)}%`;
  };

  const clearAll = () => {
    setLoanAmount('100000');
    setInterestRate('8.5');
    setLoanTerm('12');
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              EMI Calculator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Calculate your Equated Monthly Installment (EMI) for loans and mortgages
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Calculator */}
            <div className="lg:col-span-3">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    EMI Calculation
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Input Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="loanAmount" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Loan Amount
                        </Label>
                        <Input
                          id="loanAmount"
                          type="number"
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(e.target.value)}
                          placeholder="Enter loan amount"
                          className="mt-2"
                          min="0"
                          step="1000"
                        />
                      </div>

                      <div>
                        <Label htmlFor="interestRate" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Annual Interest Rate (%)
                        </Label>
                        <Input
                          id="interestRate"
                          type="number"
                          value={interestRate}
                          onChange={(e) => setInterestRate(e.target.value)}
                          placeholder="Enter interest rate"
                          className="mt-2"
                          min="0"
                          max="100"
                          step="0.1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="loanTerm" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Loan Term (Years)
                        </Label>
                        <Input
                          id="loanTerm"
                          type="number"
                          value={loanTerm}
                          onChange={(e) => setLoanTerm(e.target.value)}
                          placeholder="Enter loan term"
                          className="mt-2"
                          min="1"
                          max="50"
                          step="1"
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-center">
                      <Button onClick={calculateEMI} className="px-8">
                        <Calculator className="h-4 w-4 mr-2" />
                        Calculate EMI
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
                      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-lg border border-emerald-200 dark:border-emerald-800">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            EMI Calculation Result
                          </h3>
                          <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                            {formatCurrency(result.emi)}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Monthly Payment
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Principal Amount:</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {formatCurrency(result.principal)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Total Interest:</span>
                              <span className="font-semibold text-red-600 dark:text-red-400">
                                {formatCurrency(result.totalInterest)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Total Amount:</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {formatCurrency(result.totalAmount)}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Monthly Rate:</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {formatPercentage(result.monthlyRate)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Total Months:</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {result.totalMonths}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Interest Ratio:</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {((result.totalInterest / result.principal) * 100).toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Summary Cards */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                {formatCurrency(result.emi)}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Monthly EMI</div>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {formatCurrency(result.principal)}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Principal</div>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                                {formatCurrency(result.totalInterest)}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Total Interest</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Quick Examples */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quick Examples</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[
                          { amount: '50000', rate: '7.5', term: '3', label: 'Small Personal Loan' },
                          { amount: '200000', rate: '8.5', term: '5', label: 'Home Renovation' },
                          { amount: '500000', rate: '6.5', term: '15', label: 'Home Loan' },
                          { amount: '1000000', rate: '7.0', term: '20', label: 'Large Mortgage' },
                          { amount: '25000', rate: '12.0', term: '2', label: 'Credit Card Debt' },
                          { amount: '750000', rate: '5.5', term: '25', label: 'Low Rate Mortgage' }
                        ].map((example, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            onClick={() => {
                              setLoanAmount(example.amount);
                              setInterestRate(example.rate);
                              setLoanTerm(example.term);
                            }}
                            className="justify-start h-auto p-3"
                          >
                            <div className="text-left">
                              <div className="font-medium">{example.label}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                ${parseInt(example.amount).toLocaleString()} @ {example.rate}% for {example.term} years
                              </div>
                            </div>
                          </Button>
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
                <Card className="shadow-lg border-0 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-full h-64 bg-gradient-to-br from-emerald-200 to-teal-300 dark:from-emerald-800 dark:to-teal-700 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-emerald-800 dark:text-emerald-200 mb-2">
                            Ad Space
                          </div>
                          <div className="text-sm text-emerald-600 dark:text-emerald-300">
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
                <Info className="h-5 w-5 text-emerald-600" />
                About EMI Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Our EMI Calculator helps you determine your Equated Monthly Installment for various types of loans. 
                Whether you're planning to take a home loan, personal loan, or any other credit, this tool provides 
                accurate monthly payment calculations with detailed breakdowns of principal and interest.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">What is EMI?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month.
                  </p>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Real-time EMI calculation</li>
                    <li>• Principal and interest breakdown</li>
                    <li>• Multiple loan scenarios</li>
                    <li>• Mobile-friendly interface</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Common Loan Types:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Home Loans (5-30 years)</li>
                    <li>• Personal Loans (1-7 years)</li>
                    <li>• Car Loans (3-7 years)</li>
                    <li>• Business Loans (1-10 years)</li>
                    <li>• Education Loans (5-15 years)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">💡 Tips:</h4>
                <ul className="text-sm text-emerald-800 dark:text-emerald-200 space-y-1">
                  <li>• Lower interest rates reduce total cost</li>
                  <li>• Longer terms mean lower EMI but higher total interest</li>
                  <li>• Consider prepayment options to reduce interest</li>
                  <li>• Factor in processing fees and other charges</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator; 