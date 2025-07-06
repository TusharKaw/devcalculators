'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Clock, Calendar, Timer } from 'lucide-react';

const TimeDurationCalculator = () => {
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculateDuration = () => {
    if (!startDate || !endDate) {
      setError('Please enter both start and end dates');
      return;
    }

    const start = new Date(`${startDate}T${startTime || '00:00'}`);
    const end = new Date(`${endDate}T${endTime || '00:00'}`);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setError('Please enter valid dates and times');
      return;
    }

    if (end <= start) {
      setError('End date/time must be after start date/time');
      return;
    }

    const diffMs = end - start;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    setResult({
      days: diffDays,
      hours: diffHours,
      minutes: diffMinutes,
      seconds: diffSeconds,
      totalHours: diffMs / (1000 * 60 * 60),
      totalMinutes: diffMs / (1000 * 60),
      totalSeconds: diffMs / 1000
    });
    setError('');
  };

  const formatDuration = (days, hours, minutes, seconds) => {
    const parts = [];
    if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
    if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
    if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
    if (seconds > 0) parts.push(`${seconds} second${seconds !== 1 ? 's' : ''}`);
    return parts.join(', ');
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0];
    return { date: dateStr, time: timeStr };
  };

  const setCurrentDateTime = (type) => {
    const { date, time } = getCurrentDateTime();
    if (type === 'start') {
      setStartDate(date);
      setStartTime(time);
    } else {
      setEndDate(date);
      setEndTime(time);
    }
  };

  const clearAll = () => {
    setStartDate('');
    setStartTime('');
    setEndDate('');
    setEndTime('');
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Time Duration Calculator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Calculate the duration between two dates and times with precision
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Calculator */}
            <div className="lg:col-span-3">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Timer className="h-5 w-5" />
                    Duration Calculation
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Start Date/Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Start Date
                        </Label>
                        <div className="flex gap-2 mt-2">
                          <Input
                            id="startDate"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentDateTime('start')}
                            className="whitespace-nowrap"
                          >
                            Now
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="startTime" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Start Time (Optional)
                        </Label>
                        <Input
                          id="startTime"
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    {/* End Date/Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="endDate" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          End Date
                        </Label>
                        <div className="flex gap-2 mt-2">
                          <Input
                            id="endDate"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentDateTime('end')}
                            className="whitespace-nowrap"
                          >
                            Now
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="endTime" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          End Time (Optional)
                        </Label>
                        <Input
                          id="endTime"
                          type="time"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-center">
                      <Button onClick={calculateDuration} className="px-8">
                        <Clock className="h-4 w-4 mr-2" />
                        Calculate Duration
                      </Button>
                      <Button variant="outline" onClick={clearAll}>
                        Clear All
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
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="text-center mb-4">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Duration Result
                          </h3>
                          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                            {formatDuration(result.days, result.hours, result.minutes, result.seconds)}
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                              {result.totalHours.toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Total Hours</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                              {result.totalMinutes.toFixed(0)}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Total Minutes</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                              {result.totalSeconds.toFixed(0)}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Total Seconds</div>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                          <Badge variant="secondary" className="justify-center">
                            {result.days} Days
                          </Badge>
                          <Badge variant="secondary" className="justify-center">
                            {result.hours} Hours
                          </Badge>
                          <Badge variant="secondary" className="justify-center">
                            {result.minutes} Minutes
                          </Badge>
                          <Badge variant="secondary" className="justify-center">
                            {result.seconds} Seconds
                          </Badge>
                        </div>
                      </div>
                    )}

                    {/* Quick Examples */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quick Examples</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[
                          { label: '1 Week', days: 7 },
                          { label: '1 Month', days: 30 },
                          { label: '3 Months', days: 90 },
                          { label: '6 Months', days: 180 },
                          { label: '1 Year', days: 365 },
                          { label: '2 Years', days: 730 }
                        ].map((example, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            onClick={() => {
                              const start = new Date();
                              const end = new Date();
                              end.setDate(end.getDate() + example.days);
                              setStartDate(start.toISOString().split('T')[0]);
                              setEndDate(end.toISOString().split('T')[0]);
                              setStartTime('');
                              setEndTime('');
                            }}
                            className="justify-start"
                          >
                            {example.label}
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
                <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-full h-64 bg-gradient-to-br from-green-200 to-emerald-300 dark:from-green-800 dark:to-emerald-700 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
                            Ad Space
                          </div>
                          <div className="text-sm text-green-600 dark:text-green-300">
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
                <Info className="h-5 w-5 text-green-600" />
                About Time Duration Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Our Time Duration Calculator helps you calculate the exact time difference between two dates and times. 
                Whether you're planning projects, tracking events, or calculating time intervals, this tool provides 
                precise duration calculations in multiple formats.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Date and time precision</li>
                    <li>• Multiple output formats</li>
                    <li>• Quick preset examples</li>
                    <li>• Current time shortcuts</li>
                    <li>• Mobile-friendly interface</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Common Uses:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Project timeline planning</li>
                    <li>• Event duration tracking</li>
                    <li>• Age calculations</li>
                    <li>• Work time tracking</li>
                    <li>• Travel planning</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">💡 Tips:</h4>
                <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                  <li>• Use "Now" buttons to quickly set current date/time</li>
                  <li>• Time is optional - defaults to 00:00 if not specified</li>
                  <li>• Results show in multiple formats for convenience</li>
                  <li>• Quick examples help with common calculations</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TimeDurationCalculator; 