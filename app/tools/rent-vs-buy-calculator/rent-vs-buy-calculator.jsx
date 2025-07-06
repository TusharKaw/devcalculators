"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Calculator, Home, DollarSign, TrendingUp } from 'lucide-react';

const RentVsBuyCalculator = () => {
  const [rentAmount, setRentAmount] = useState('2000');
  const [homePrice, setHomePrice] = useState('400000');
  const [downPayment, setDownPayment] = useState('80000');
  const [interestRate, setInterestRate] = useState('6.5');
  const [loanTerm, setLoanTerm] = useState('30');
  const [propertyTax, setPropertyTax] = useState('4000');
  const [insurance, setInsurance] = useState('1200');
  const [maintenance, setMaintenance] = useState('2000');
  const [hoaFees, setHoaFees] = useState('0');
  const [appreciationRate, setAppreciationRate] = useState('3');
  const [rentIncrease, setRentIncrease] = useState('2');
  const [timeHorizon, setTimeHorizon] = useState('5');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculateComparison = () => {
    const rent = parseFloat(rentAmount);
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment);
    const rate = parseFloat(interestRate);
    const term = parseInt(loanTerm);
    const tax = parseFloat(propertyTax);
    const ins = parseFloat(insurance);
    const maint = parseFloat(maintenance);
    const hoa = parseFloat(hoaFees);
    const appreciation = parseFloat(appreciationRate);
    const rentGrowth = parseFloat(rentIncrease);
    const years = parseInt(timeHorizon);

    if (isNaN(rent) || rent <= 0) {
      setError('Please enter a valid rent amount');
      return;
    }

    if (isNaN(price) || price <= 0) {
      setError('Please enter a valid home price');
      return;
    }

    if (isNaN(down) || down < 0 || down > price) {
      setError('Please enter a valid down payment amount');
      return;
    }

    if (isNaN(rate) || rate < 0 || rate > 20) {
      setError('Please enter a valid interest rate (0-20%)');
      return;
    }

    if (isNaN(years) || years <= 0 || years > 30) {
      setError('Please enter a valid time horizon (1-30 years)');
      return;
    }

    try {
      // Calculate loan amount
      const loanAmount = price - down;
      
      // Calculate monthly mortgage payment
      const monthlyRate = rate / 100 / 12;
      const numberOfPayments = term * 12;
      const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      
      // Calculate total monthly housing cost
      const monthlyTax = tax / 12;
      const monthlyInsurance = ins / 12;
      const monthlyMaintenance = maint / 12;
      const monthlyHoa = hoa / 12;
      const totalMonthlyCost = monthlyPayment + monthlyTax + monthlyInsurance + monthlyMaintenance + monthlyHoa;
      
      // Calculate total costs over time horizon
      let totalRentCost = 0;
      let totalBuyCost = 0;
      let currentRent = rent;
      let currentHomeValue = price;
      
      for (let year = 1; year <= years; year++) {
        // Rent costs
        totalRentCost += currentRent * 12;
        currentRent *= (1 + rentGrowth / 100);
        
        // Buy costs
        totalBuyCost += totalMonthlyCost * 12;
        currentHomeValue *= (1 + appreciation / 100);
      }
      
      // Calculate equity and final home value
      const totalPaid = totalMonthlyCost * 12 * years;
      const principalPaid = loanAmount * (1 - Math.pow(1 + monthlyRate, -numberOfPayments * years / term)) / Math.pow(1 + monthlyRate, -numberOfPayments * years / term);
      const equity = down + principalPaid;
      const finalHomeValue = currentHomeValue;
      const netBuyCost = totalBuyCost - finalHomeValue + down;
      
      // Calculate break-even point
      let breakEvenYear = 0;
      let cumulativeRent = 0;
      let cumulativeBuy = 0;
      let currentRentForBreakEven = rent;
      let currentHomeValueForBreakEven = price;
      
      for (let year = 1; year <= 30; year++) {
        cumulativeRent += currentRentForBreakEven * 12;
        cumulativeBuy += totalMonthlyCost * 12;
        currentRentForBreakEven *= (1 + rentGrowth / 100);
        currentHomeValueForBreakEven *= (1 + appreciation / 100);
        
        const buyNetCost = cumulativeBuy - currentHomeValueForBreakEven + down;
        
        if (cumulativeRent >= buyNetCost && breakEvenYear === 0) {
          breakEvenYear = year;
        }
      }
      
      // Determine recommendation
      let recommendation = '';
      let recommendationColor = '';
      if (netBuyCost < totalRentCost) {
        recommendation = 'Buying is financially better';
        recommendationColor = 'text-green-600';
      } else {
        recommendation = 'Renting is financially better';
        recommendationColor = 'text-blue-600';
      }

      setResult({
        rent: {
          monthly: rent,
          total: totalRentCost,
          finalMonthly: currentRent
        },
        buy: {
          monthly: totalMonthlyCost,
          total: totalBuyCost,
          netCost: netBuyCost,
          equity: equity,
          finalValue: finalHomeValue
        },
        comparison: {
          breakEvenYear: breakEvenYear,
          recommendation: recommendation,
          recommendationColor: recommendationColor,
          savings: Math.abs(totalRentCost - netBuyCost)
        },
        details: {
          loanAmount: loanAmount,
          monthlyPayment: monthlyPayment,
          monthlyTax: monthlyTax,
          monthlyInsurance: monthlyInsurance,
          monthlyMaintenance: monthlyMaintenance,
          monthlyHoa: monthlyHoa
        }
      });
      setError('');
    } catch (err) {
      setError('Error calculating comparison. Please check your inputs.');
    }
  };

  useEffect(() => {
    if (rentAmount && homePrice && downPayment && interestRate && timeHorizon) {
      calculateComparison();
    }
  }, [rentAmount, homePrice, downPayment, interestRate, loanTerm, propertyTax, insurance, maintenance, hoaFees, appreciationRate, rentIncrease, timeHorizon]);

  const clearAll = () => {
    setRentAmount('2000');
    setHomePrice('400000');
    setDownPayment('80000');
    setInterestRate('6.5');
    setLoanTerm('30');
    setPropertyTax('4000');
    setInsurance('1200');
    setMaintenance('2000');
    setHoaFees('0');
    setAppreciationRate('3');
    setRentIncrease('2');
    setTimeHorizon('5');
    setResult(null);
    setError('');
  };

  const setPresetScenario = (scenario) => {
    switch (scenario) {
      case 'starter':
        setRentAmount('1500');
        setHomePrice('250000');
        setDownPayment('50000');
        setInterestRate('6.5');
        setPropertyTax('2500');
        setInsurance('800');
        setMaintenance('1500');
        setHoaFees('0');
        break;
      case 'family':
        setRentAmount('2500');
        setHomePrice('500000');
        setDownPayment('100000');
        setInterestRate('6.0');
        setPropertyTax('6000');
        setInsurance('1500');
        setMaintenance('3000');
        setHoaFees('2000');
        break;
      case 'luxury':
        setRentAmount('5000');
        setHomePrice('1000000');
        setDownPayment('200000');
        setInterestRate('5.5');
        setPropertyTax('12000');
        setInsurance('3000');
        setMaintenance('8000');
        setHoaFees('5000');
        break;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatMonthly = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Rent vs Buy Calculator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Compare the financial implications of renting versus buying a home
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Calculator */}
            <div className="lg:col-span-3">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Rent vs Buy Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Basic Inputs */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Basic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="rentAmount" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Monthly Rent ($)
                          </Label>
                          <Input
                            id="rentAmount"
                            type="number"
                            value={rentAmount}
                            onChange={(e) => setRentAmount(e.target.value)}
                            placeholder="Enter monthly rent"
                            className="mt-2"
                            min="0"
                            step="100"
                          />
                        </div>

                        <div>
                          <Label htmlFor="homePrice" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Home Price ($)
                          </Label>
                          <Input
                            id="homePrice"
                            type="number"
                            value={homePrice}
                            onChange={(e) => setHomePrice(e.target.value)}
                            placeholder="Enter home price"
                            className="mt-2"
                            min="0"
                            step="1000"
                          />
                        </div>

                        <div>
                          <Label htmlFor="downPayment" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Down Payment ($)
                          </Label>
                          <Input
                            id="downPayment"
                            type="number"
                            value={downPayment}
                            onChange={(e) => setDownPayment(e.target.value)}
                            placeholder="Enter down payment"
                            className="mt-2"
                            min="0"
                            step="1000"
                          />
                        </div>

                        <div>
                          <Label htmlFor="interestRate" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Interest Rate (%)
                          </Label>
                          <Input
                            id="interestRate"
                            type="number"
                            value={interestRate}
                            onChange={(e) => setInterestRate(e.target.value)}
                            placeholder="Enter interest rate"
                            className="mt-2"
                            min="0"
                            max="20"
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

                        <div>
                          <Label htmlFor="timeHorizon" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Time Horizon (Years)
                          </Label>
                          <Input
                            id="timeHorizon"
                            type="number"
                            value={timeHorizon}
                            onChange={(e) => setTimeHorizon(e.target.value)}
                            placeholder="Enter time horizon"
                            className="mt-2"
                            min="1"
                            max="30"
                            step="1"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Additional Costs */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Additional Home Costs</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="propertyTax" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Annual Property Tax ($)
                          </Label>
                          <Input
                            id="propertyTax"
                            type="number"
                            value={propertyTax}
                            onChange={(e) => setPropertyTax(e.target.value)}
                            placeholder="Enter property tax"
                            className="mt-2"
                            min="0"
                            step="100"
                          />
                        </div>

                        <div>
                          <Label htmlFor="insurance" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Annual Insurance ($)
                          </Label>
                          <Input
                            id="insurance"
                            type="number"
                            value={insurance}
                            onChange={(e) => setInsurance(e.target.value)}
                            placeholder="Enter insurance"
                            className="mt-2"
                            min="0"
                            step="100"
                          />
                        </div>

                        <div>
                          <Label htmlFor="maintenance" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Annual Maintenance ($)
                          </Label>
                          <Input
                            id="maintenance"
                            type="number"
                            value={maintenance}
                            onChange={(e) => setMaintenance(e.target.value)}
                            placeholder="Enter maintenance"
                            className="mt-2"
                            min="0"
                            step="100"
                          />
                        </div>

                        <div>
                          <Label htmlFor="hoaFees" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Annual HOA Fees ($)
                          </Label>
                          <Input
                            id="hoaFees"
                            type="number"
                            value={hoaFees}
                            onChange={(e) => setHoaFees(e.target.value)}
                            placeholder="Enter HOA fees"
                            className="mt-2"
                            min="0"
                            step="100"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Growth Rates */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Growth Rates</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="appreciationRate" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Home Appreciation Rate (%)
                          </Label>
                          <Input
                            id="appreciationRate"
                            type="number"
                            value={appreciationRate}
                            onChange={(e) => setAppreciationRate(e.target.value)}
                            placeholder="Enter appreciation rate"
                            className="mt-2"
                            min="0"
                            max="20"
                            step="0.1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="rentIncrease" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Annual Rent Increase (%)
                          </Label>
                          <Input
                            id="rentIncrease"
                            type="number"
                            value={rentIncrease}
                            onChange={(e) => setRentIncrease(e.target.value)}
                            placeholder="Enter rent increase"
                            className="mt-2"
                            min="0"
                            max="20"
                            step="0.1"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Preset Scenarios */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quick Scenarios</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <Button
                          variant="outline"
                          onClick={() => setPresetScenario('starter')}
                          className="justify-start h-auto p-3"
                        >
                          <div className="text-left">
                            <div className="font-medium">Starter Home</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              $250k home, $1.5k rent
                            </div>
                          </div>
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setPresetScenario('family')}
                          className="justify-start h-auto p-3"
                        >
                          <div className="text-left">
                            <div className="font-medium">Family Home</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              $500k home, $2.5k rent
                            </div>
                          </div>
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setPresetScenario('luxury')}
                          className="justify-start h-auto p-3"
                        >
                          <div className="text-left">
                            <div className="font-medium">Luxury Home</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              $1M home, $5k rent
                            </div>
                          </div>
                        </Button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-center">
                      <Button onClick={calculateComparison} className="px-8">
                        <Calculator className="h-4 w-4 mr-2" />
                        Calculate Comparison
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
                            Financial Comparison Result
                          </h3>
                          <div className={`text-3xl font-bold ${result.comparison.recommendationColor}`}>
                            {result.comparison.recommendation}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            Over {timeHorizon} years
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Monthly Rent:</span>
                              <span className="font-semibold text-blue-600 dark:text-blue-400">
                                {formatMonthly(result.rent.monthly)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Total Rent Cost:</span>
                              <span className="font-semibold text-blue-600 dark:text-blue-400">
                                {formatCurrency(result.rent.total)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Final Monthly Rent:</span>
                              <span className="font-semibold text-blue-600 dark:text-blue-400">
                                {formatMonthly(result.rent.finalMonthly)}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Monthly Home Cost:</span>
                              <span className="font-semibold text-green-600 dark:text-green-400">
                                {formatMonthly(result.buy.monthly)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Net Home Cost:</span>
                              <span className="font-semibold text-green-600 dark:text-green-400">
                                {formatCurrency(result.buy.netCost)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Home Equity:</span>
                              <span className="font-semibold text-green-600 dark:text-green-400">
                                {formatCurrency(result.buy.equity)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Monthly Breakdown */}
                        <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg border">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Monthly Home Cost Breakdown</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Mortgage:</span>
                              <span className="font-semibold">{formatMonthly(result.details.monthlyPayment)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Property Tax:</span>
                              <span className="font-semibold">{formatMonthly(result.details.monthlyTax)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Insurance:</span>
                              <span className="font-semibold">{formatMonthly(result.details.monthlyInsurance)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Maintenance:</span>
                              <span className="font-semibold">{formatMonthly(result.details.monthlyMaintenance)}</span>
                            </div>
                            {result.details.monthlyHoa > 0 && (
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">HOA Fees:</span>
                                <span className="font-semibold">{formatMonthly(result.details.monthlyHoa)}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Summary Cards */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {formatCurrency(result.rent.total)}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Total Rent Cost</div>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {formatCurrency(result.buy.netCost)}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Net Home Cost</div>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                {result.comparison.breakEvenYear}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Break-Even Year</div>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {formatCurrency(result.buy.finalValue)}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Final Home Value</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Considerations */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Additional Considerations</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Renting Advantages</h4>
                          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <div>• Lower upfront costs</div>
                            <div>• Flexibility to move</div>
                            <div>• No maintenance responsibility</div>
                            <div>• No property tax or insurance</div>
                            <div>• Predictable monthly costs</div>
                          </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Buying Advantages</h4>
                          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <div>• Build equity over time</div>
                            <div>• Potential appreciation</div>
                            <div>• Tax benefits</div>
                            <div>• Stability and control</div>
                            <div>• No rent increases</div>
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
                About Rent vs Buy Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Our Rent vs Buy Calculator helps you make an informed decision about whether to rent or buy a home. 
                This comprehensive tool considers all the costs associated with both options, including mortgage payments, 
                property taxes, maintenance, and potential appreciation over time.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Renting Costs:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Monthly rent payments</li>
                    <li>• Security deposits</li>
                    <li>• Rent increases over time</li>
                    <li>• Renter's insurance</li>
                    <li>• Moving costs</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Buying Costs:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Down payment</li>
                    <li>• Mortgage payments</li>
                    <li>• Property taxes</li>
                    <li>• Home insurance</li>
                    <li>• Maintenance and repairs</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Tips:</h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Consider your time horizon - longer periods favor buying</li>
                  <li>• Factor in closing costs and moving expenses</li>
                  <li>• Account for potential home value appreciation</li>
                  <li>• Consider your lifestyle and future plans</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RentVsBuyCalculator; 