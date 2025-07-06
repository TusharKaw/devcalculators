"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Calculator, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const NetWorthCalculator = () => {
  const [assets, setAssets] = useState({
    cash: '10000',
    savings: '25000',
    investments: '50000',
    realEstate: '300000',
    vehicles: '25000',
    business: '0',
    otherAssets: '0'
  });
  
  const [liabilities, setLiabilities] = useState({
    mortgage: '250000',
    carLoans: '15000',
    studentLoans: '30000',
    creditCards: '5000',
    personalLoans: '0',
    otherDebts: '0'
  });
  
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculateNetWorth = () => {
    try {
      // Calculate total assets
      const totalAssets = Object.values(assets).reduce((sum, value) => {
        const numValue = parseFloat(value) || 0;
        return sum + numValue;
      }, 0);

      // Calculate total liabilities
      const totalLiabilities = Object.values(liabilities).reduce((sum, value) => {
        const numValue = parseFloat(value) || 0;
        return sum + numValue;
      }, 0);

      // Calculate net worth
      const netWorth = totalAssets - totalLiabilities;

      // Calculate ratios
      const debtToAssetRatio = totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0;
      const assetToDebtRatio = totalLiabilities > 0 ? totalAssets / totalLiabilities : 0;

      // Determine net worth category
      let category = '';
      let categoryColor = '';
      if (netWorth < 0) {
        category = 'Negative Net Worth';
        categoryColor = 'text-red-600';
      } else if (netWorth < 10000) {
        category = 'Low Net Worth';
        categoryColor = 'text-orange-600';
      } else if (netWorth < 100000) {
        category = 'Moderate Net Worth';
        categoryColor = 'text-yellow-600';
      } else if (netWorth < 1000000) {
        category = 'High Net Worth';
        categoryColor = 'text-green-600';
      } else {
        category = 'Ultra High Net Worth';
        categoryColor = 'text-blue-600';
      }

      setResult({
        totalAssets,
        totalLiabilities,
        netWorth,
        debtToAssetRatio,
        assetToDebtRatio,
        category,
        categoryColor
      });
      setError('');
    } catch (err) {
      setError('Error calculating net worth. Please check your inputs.');
    }
  };

  useEffect(() => {
    calculateNetWorth();
  }, [assets, liabilities]);

  const clearAll = () => {
    setAssets({
      cash: '10000',
      savings: '25000',
      investments: '50000',
      realEstate: '300000',
      vehicles: '25000',
      business: '0',
      otherAssets: '0'
    });
    setLiabilities({
      mortgage: '250000',
      carLoans: '15000',
      studentLoans: '30000',
      creditCards: '5000',
      personalLoans: '0',
      otherDebts: '0'
    });
    setResult(null);
    setError('');
  };

  const setPresetScenario = (scenario) => {
    switch (scenario) {
      case 'youngProfessional':
        setAssets({
          cash: '5000',
          savings: '15000',
          investments: '20000',
          realEstate: '0',
          vehicles: '15000',
          business: '0',
          otherAssets: '0'
        });
        setLiabilities({
          mortgage: '0',
          carLoans: '10000',
          studentLoans: '40000',
          creditCards: '3000',
          personalLoans: '0',
          otherDebts: '0'
        });
        break;
      case 'established':
        setAssets({
          cash: '20000',
          savings: '50000',
          investments: '100000',
          realEstate: '400000',
          vehicles: '30000',
          business: '0',
          otherAssets: '10000'
        });
        setLiabilities({
          mortgage: '300000',
          carLoans: '20000',
          studentLoans: '0',
          creditCards: '2000',
          personalLoans: '0',
          otherDebts: '0'
        });
        break;
      case 'retired':
        setAssets({
          cash: '50000',
          savings: '100000',
          investments: '500000',
          realEstate: '600000',
          vehicles: '20000',
          business: '0',
          otherAssets: '50000'
        });
        setLiabilities({
          mortgage: '100000',
          carLoans: '0',
          studentLoans: '0',
          creditCards: '1000',
          personalLoans: '0',
          otherDebts: '0'
        });
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

  const handleAssetChange = (key, value) => {
    setAssets(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleLiabilityChange = (key, value) => {
    setLiabilities(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Net Worth Calculator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Calculate your total net worth by subtracting liabilities from assets
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Calculator */}
            <div className="lg:col-span-3">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Net Worth Calculation
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Assets Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        Assets (What You Own)
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cash" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Cash & Checking
                          </Label>
                          <Input
                            id="cash"
                            type="number"
                            value={assets.cash}
                            onChange={(e) => handleAssetChange('cash', e.target.value)}
                            placeholder="Enter amount"
                            className="mt-2"
                            min="0"
                            step="1000"
                          />
                        </div>

                        <div>
                          <Label htmlFor="savings" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Savings Accounts
                          </Label>
                          <Input
                            id="savings"
                            type="number"
                            value={assets.savings}
                            onChange={(e) => handleAssetChange('savings', e.target.value)}
                            placeholder="Enter amount"
                            className="mt-2"
                            min="0"
                            step="1000"
                          />
                        </div>

                        <div>
                          <Label htmlFor="investments" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Investments (Stocks, Bonds, etc.)
                          </Label>
                          <Input
                            id="investments"
                            type="number"
                            value={assets.investments}
                            onChange={(e) => handleAssetChange('investments', e.target.value)}
                            placeholder="Enter amount"
                            className="mt-2"
                            min="0"
                            step="1000"
                          />
                        </div>

                        <div>
                          <Label htmlFor="realEstate" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Real Estate (Market Value)
                          </Label>
                          <Input
                            id="realEstate"
                            type="number"
                            value={assets.realEstate}
                            onChange={(e) => handleAssetChange('realEstate', e.target.value)}
                            placeholder="Enter amount"
                            className="mt-2"
                            min="0"
                            step="1000"
                          />
                        </div>

                        <div>
                          <Label htmlFor="vehicles" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Vehicles (Market Value)
                          </Label>
                          <Input
                            id="vehicles"
                            type="number"
                            value={assets.vehicles}
                            onChange={(e) => handleAssetChange('vehicles', e.target.value)}
                            placeholder="Enter amount"
                            className="mt-2"
                            min="0"
                            step="1000"
                          />
                        </div>

                        <div>
                          <Label htmlFor="business" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Business Value
                          </Label>
                          <Input
                            id="business"
                            type="number"
                            value={assets.business}
                            onChange={(e) => handleAssetChange('business', e.target.value)}
                            placeholder="Enter amount"
                            className="mt-2"
                            min="0"
                            step="1000"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <Label htmlFor="otherAssets" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Other Assets (Jewelry, Collectibles, etc.)
                          </Label>
                          <Input
                            id="otherAssets"
                            type="number"
                            value={assets.otherAssets}
                            onChange={(e) => handleAssetChange('otherAssets', e.target.value)}
                            placeholder="Enter amount"
                            className="mt-2"
                            min="0"
                            step="1000"
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Liabilities Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <TrendingDown className="h-5 w-5 text-red-600" />
                        Liabilities (What You Owe)
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="mortgage" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Mortgage Balance
                          </Label>
                          <Input
                            id="mortgage"
                            type="number"
                            value={liabilities.mortgage}
                            onChange={(e) => handleLiabilityChange('mortgage', e.target.value)}
                            placeholder="Enter amount"
                            className="mt-2"
                            min="0"
                            step="1000"
                          />
                        </div>

                        <div>
                          <Label htmlFor="carLoans" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Car Loans
                          </Label>
                          <Input
                            id="carLoans"
                            type="number"
                            value={liabilities.carLoans}
                            onChange={(e) => handleLiabilityChange('carLoans', e.target.value)}
                            placeholder="Enter amount"
                            className="mt-2"
                            min="0"
                            step="1000"
                          />
                        </div>

                        <div>
                          <Label htmlFor="studentLoans" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Student Loans
                          </Label>
                          <Input
                            id="studentLoans"
                            type="number"
                            value={liabilities.studentLoans}
                            onChange={(e) => handleLiabilityChange('studentLoans', e.target.value)}
                            placeholder="Enter amount"
                            className="mt-2"
                            min="0"
                            step="1000"
                          />
                        </div>

                        <div>
                          <Label htmlFor="creditCards" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Credit Card Debt
                          </Label>
                          <Input
                            id="creditCards"
                            type="number"
                            value={liabilities.creditCards}
                            onChange={(e) => handleLiabilityChange('creditCards', e.target.value)}
                            placeholder="Enter amount"
                            className="mt-2"
                            min="0"
                            step="1000"
                          />
                        </div>

                        <div>
                          <Label htmlFor="personalLoans" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Personal Loans
                          </Label>
                          <Input
                            id="personalLoans"
                            type="number"
                            value={liabilities.personalLoans}
                            onChange={(e) => handleLiabilityChange('personalLoans', e.target.value)}
                            placeholder="Enter amount"
                            className="mt-2"
                            min="0"
                            step="1000"
                          />
                        </div>

                        <div>
                          <Label htmlFor="otherDebts" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Other Debts
                          </Label>
                          <Input
                            id="otherDebts"
                            type="number"
                            value={liabilities.otherDebts}
                            onChange={(e) => handleLiabilityChange('otherDebts', e.target.value)}
                            placeholder="Enter amount"
                            className="mt-2"
                            min="0"
                            step="1000"
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
                          onClick={() => setPresetScenario('youngProfessional')}
                          className="justify-start h-auto p-3"
                        >
                          <div className="text-left">
                            <div className="font-medium">Young Professional</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Early career, student loans, building savings
                            </div>
                          </div>
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setPresetScenario('established')}
                          className="justify-start h-auto p-3"
                        >
                          <div className="text-left">
                            <div className="font-medium">Established</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Mid-career, home ownership, investments
                            </div>
                          </div>
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setPresetScenario('retired')}
                          className="justify-start h-auto p-3"
                        >
                          <div className="text-left">
                            <div className="font-medium">Retired</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Retirement savings, paid-off home, minimal debt
                            </div>
                          </div>
                        </Button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-center">
                      <Button onClick={calculateNetWorth} className="px-8">
                        <Calculator className="h-4 w-4 mr-2" />
                        Calculate Net Worth
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
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Net Worth Summary
                          </h3>
                          <div className={`text-4xl font-bold ${result.categoryColor}`}>
                            {formatCurrency(result.netWorth)}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            {result.category}
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Total Assets:</span>
                              <span className="font-semibold text-green-600 dark:text-green-400">
                                {formatCurrency(result.totalAssets)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Total Liabilities:</span>
                              <span className="font-semibold text-red-600 dark:text-red-400">
                                {formatCurrency(result.totalLiabilities)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Net Worth:</span>
                              <span className={`font-semibold ${result.categoryColor}`}>
                                {formatCurrency(result.netWorth)}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Debt-to-Asset Ratio:</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {result.debtToAssetRatio.toFixed(1)}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Asset-to-Debt Ratio:</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {result.assetToDebtRatio.toFixed(2)}:1
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Financial Health:</span>
                              <span className={`font-semibold ${result.categoryColor}`}>
                                {result.category}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Summary Cards */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {formatCurrency(result.totalAssets)}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Total Assets</div>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                                {formatCurrency(result.totalLiabilities)}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Total Liabilities</div>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                            <div className="text-center">
                              <div className={`text-2xl font-bold ${result.categoryColor}`}>
                                {formatCurrency(result.netWorth)}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Net Worth</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Financial Health Guidelines */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Financial Health Guidelines</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Net Worth Categories</h4>
                          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <div>• Negative: Less than $0</div>
                            <div>• Low: $0 - $10,000</div>
                            <div>• Moderate: $10,000 - $100,000</div>
                            <div>• High: $100,000 - $1,000,000</div>
                            <div>• Ultra High: Over $1,000,000</div>
                          </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Healthy Ratios</h4>
                          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <div>• Debt-to-Asset: Under 50%</div>
                            <div>• Asset-to-Debt: Above 2:1</div>
                            <div>• Emergency Fund: 3-6 months expenses</div>
                            <div>• Savings Rate: 10-20% of income</div>
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
                <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-full h-64 bg-gradient-to-br from-purple-200 to-indigo-300 dark:from-purple-800 dark:to-indigo-700 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-2">
                            Ad Space
                          </div>
                          <div className="text-sm text-purple-600 dark:text-purple-300">
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
                <Info className="h-5 w-5 text-purple-600" />
                About Net Worth Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Our Net Worth Calculator helps you assess your financial health by calculating the difference 
                between your total assets and liabilities. This comprehensive tool provides insights into your 
                financial position and helps you track your wealth-building progress over time.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Assets Included:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Cash and checking accounts</li>
                    <li>• Savings and investments</li>
                    <li>• Real estate equity</li>
                    <li>• Vehicle values</li>
                    <li>• Business ownership</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Liabilities Included:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Mortgage balances</li>
                    <li>• Car and student loans</li>
                    <li>• Credit card debt</li>
                    <li>• Personal loans</li>
                    <li>• Other outstanding debts</li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">💡 Tips:</h4>
                <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                  <li>• Update your net worth calculation regularly (monthly or quarterly)</li>
                  <li>• Use current market values for assets, not purchase prices</li>
                  <li>• Focus on increasing assets while reducing liabilities</li>
                  <li>• Aim for a positive net worth and healthy debt ratios</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NetWorthCalculator; 