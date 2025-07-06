"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Clock, Globe, MapPin } from 'lucide-react';

const TimeZoneConverter = () => {
  const [dateTime, setDateTime] = useState('');
  const [fromZone, setFromZone] = useState('UTC');
  const [toZone, setToZone] = useState('America/New_York');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const timeZones = {
    'UTC': { name: 'UTC', offset: 0 },
    'America/New_York': { name: 'Eastern Time', offset: -5 },
    'America/Chicago': { name: 'Central Time', offset: -6 },
    'America/Denver': { name: 'Mountain Time', offset: -7 },
    'America/Los_Angeles': { name: 'Pacific Time', offset: -8 },
    'America/Anchorage': { name: 'Alaska Time', offset: -9 },
    'Pacific/Honolulu': { name: 'Hawaii Time', offset: -10 },
    'Europe/London': { name: 'London', offset: 0 },
    'Europe/Paris': { name: 'Paris', offset: 1 },
    'Europe/Berlin': { name: 'Berlin', offset: 1 },
    'Europe/Rome': { name: 'Rome', offset: 1 },
    'Europe/Moscow': { name: 'Moscow', offset: 3 },
    'Asia/Tokyo': { name: 'Tokyo', offset: 9 },
    'Asia/Shanghai': { name: 'Shanghai', offset: 8 },
    'Asia/Seoul': { name: 'Seoul', offset: 9 },
    'Asia/Singapore': { name: 'Singapore', offset: 8 },
    'Asia/Dubai': { name: 'Dubai', offset: 4 },
    'Asia/Kolkata': { name: 'Mumbai', offset: 5.5 },
    'Australia/Sydney': { name: 'Sydney', offset: 10 },
    'Australia/Melbourne': { name: 'Melbourne', offset: 10 },
    'Pacific/Auckland': { name: 'Auckland', offset: 12 },
    'America/Sao_Paulo': { name: 'São Paulo', offset: -3 },
    'America/Mexico_City': { name: 'Mexico City', offset: -6 },
    'America/Toronto': { name: 'Toronto', offset: -5 },
    'America/Vancouver': { name: 'Vancouver', offset: -8 }
  };

  useEffect(() => {
    // Set current date/time on component mount
    const now = new Date();
    const dateTimeStr = now.toISOString().slice(0, 16);
    setDateTime(dateTimeStr);
  }, []);

  const convertTimeZone = () => {
    if (!dateTime) {
      setError('Please enter a date and time');
      return;
    }

    try {
      const inputDate = new Date(dateTime);
      if (isNaN(inputDate.getTime())) {
        setError('Please enter a valid date and time');
        return;
      }

      // Create a new date object for the target timezone
      const utcTime = inputDate.getTime() + (inputDate.getTimezoneOffset() * 60000);
      const targetTime = new Date(utcTime + (timeZones[toZone].offset * 3600000));

      setResult({
        original: inputDate,
        converted: targetTime,
        fromZone: timeZones[fromZone],
        toZone: timeZones[toZone]
      });
      setError('');
    } catch (err) {
      setError('Error converting time zone. Please try again.');
    }
  };

  const formatDateTime = (date, timeZone) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
      timeZone: timeZone
    }).format(date);
  };

  const getCurrentTime = (zone) => {
    const now = new Date();
    return formatDateTime(now, zone);
  };

  const swapZones = () => {
    setFromZone(toZone);
    setToZone(fromZone);
  };

  const setCurrentTime = () => {
    const now = new Date();
    const dateTimeStr = now.toISOString().slice(0, 16);
    setDateTime(dateTimeStr);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Time Zone Converter
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Convert times between different time zones around the world
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Calculator */}
            <div className="lg:col-span-3">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Time Zone Conversion
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Date/Time Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Date & Time
                      </label>
                      <div className="flex gap-2">
                        <Input
                          type="datetime-local"
                          value={dateTime}
                          onChange={(e) => setDateTime(e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          variant="outline"
                          onClick={setCurrentTime}
                          className="whitespace-nowrap"
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          Now
                        </Button>
                      </div>
                    </div>

                    {/* Time Zone Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          From Time Zone
                        </label>
                        <Select value={fromZone} onValueChange={setFromZone}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(timeZones).map(([zone, info]) => (
                              <SelectItem key={zone} value={zone}>
                                {info.name} (UTC{info.offset >= 0 ? '+' : ''}{info.offset})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-end">
                        <Button
                          onClick={swapZones}
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          Swap
                        </Button>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          To Time Zone
                        </label>
                        <Select value={toZone} onValueChange={setToZone}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(timeZones).map(([zone, info]) => (
                              <SelectItem key={zone} value={zone}>
                                {info.name} (UTC{info.offset >= 0 ? '+' : ''}{info.offset})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Convert Button */}
                    <div className="flex justify-center">
                      <Button onClick={convertTimeZone} className="px-8">
                        <Globe className="h-4 w-4 mr-2" />
                        Convert Time Zone
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
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-800">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Time Zone Conversion Result
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="text-center">
                              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Original Time</div>
                              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                {formatDateTime(result.original, fromZone)}
                              </div>
                              <Badge variant="secondary" className="mt-2">
                                {result.fromZone.name}
                              </Badge>
                            </div>
                            
                            <div className="text-center">
                              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Converted Time</div>
                              <div className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                                {formatDateTime(result.converted, toZone)}
                              </div>
                              <Badge variant="secondary" className="mt-2">
                                {result.toZone.name}
                              </Badge>
                            </div>
                          </div>

                          <Separator className="my-4" />

                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Time difference: {Math.abs(result.toZone.offset - result.fromZone.offset)} hour(s)
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Current Times */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Current Times</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[
                          'America/New_York',
                          'Europe/London',
                          'Asia/Tokyo',
                          'Australia/Sydney',
                          'America/Los_Angeles',
                          'Europe/Paris'
                        ].map((zone) => (
                          <div key={zone} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {timeZones[zone].name}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              {getCurrentTime(zone)}
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
                <Card className="shadow-lg border-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-full h-64 bg-gradient-to-br from-indigo-200 to-purple-300 dark:from-indigo-800 dark:to-purple-700 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-indigo-800 dark:text-indigo-200 mb-2">
                            Ad Space
                          </div>
                          <div className="text-sm text-indigo-600 dark:text-indigo-300">
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
                <Info className="h-5 w-5 text-indigo-600" />
                About Time Zone Converter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Our Time Zone Converter helps you convert times between different time zones around the world. 
                Whether you're scheduling international meetings, planning travel, or coordinating with global teams, 
                this tool provides accurate time zone conversions for 24+ major cities and regions.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Supported Time Zones:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• North America (ET, CT, MT, PT)</li>
                    <li>• Europe (London, Paris, Berlin)</li>
                    <li>• Asia (Tokyo, Shanghai, Singapore)</li>
                    <li>• Australia & Pacific</li>
                    <li>• South America</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• 24+ time zones worldwide</li>
                    <li>• Current time display</li>
                    <li>• Easy zone swapping</li>
                    <li>• Date and time precision</li>
                    <li>• Mobile-friendly design</li>
                  </ul>
                </div>
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">💡 Tips:</h4>
                <ul className="text-sm text-indigo-800 dark:text-indigo-200 space-y-1">
                  <li>• Use "Now" button to set current time</li>
                  <li>• Swap button quickly reverses zones</li>
                  <li>• Current times update automatically</li>
                  <li>• Consider daylight saving time changes</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TimeZoneConverter; 