"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Palette, Copy, Check, EyeDropper } from 'lucide-react';

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

function rgbToHsl(r, g, b) {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  }
}

const ColorConverter = () => {
  const [inputColor, setInputColor] = useState('#3B82F6');
  const [inputFormat, setInputFormat] = useState('hex');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');

  const convertColor = () => {
    if (!inputColor.trim()) {
      setError('Please enter a color value');
      return;
    }

    try {
      let r, g, b, a = 1;
      let isValid = false;

      // Parse different input formats
      switch (inputFormat) {
        case 'hex':
          const hex = inputColor.replace('#', '');
          if (/^[0-9A-Fa-f]{3}$/.test(hex)) {
            r = parseInt(hex[0] + hex[0], 16);
            g = parseInt(hex[1] + hex[1], 16);
            b = parseInt(hex[2] + hex[2], 16);
            isValid = true;
          } else if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
            r = parseInt(hex.substring(0, 2), 16);
            g = parseInt(hex.substring(2, 4), 16);
            b = parseInt(hex.substring(4, 6), 16);
            isValid = true;
          } else if (/^[0-9A-Fa-f]{8}$/.test(hex)) {
            r = parseInt(hex.substring(0, 2), 16);
            g = parseInt(hex.substring(2, 4), 16);
            b = parseInt(hex.substring(4, 6), 16);
            a = parseInt(hex.substring(6, 8), 16) / 255;
            isValid = true;
          }
          break;

        case 'rgb':
          const rgbMatch = inputColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
          if (rgbMatch) {
            r = parseInt(rgbMatch[1]);
            g = parseInt(rgbMatch[2]);
            b = parseInt(rgbMatch[3]);
            if (rgbMatch[4]) a = parseFloat(rgbMatch[4]);
            isValid = true;
          }
          break;

        case 'hsl':
          const hslMatch = inputColor.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([\d.]+))?\)/);
          if (hslMatch) {
            const h = parseInt(hslMatch[1]) / 360;
            const s = parseInt(hslMatch[2]) / 100;
            const l = parseInt(hslMatch[3]) / 100;
            if (hslMatch[4]) a = parseFloat(hslMatch[4]);
            
            // Convert HSL to RGB
            const hue2rgb = (p, q, t) => {
              if (t < 0) t += 1;
              if (t > 1) t -= 1;
              if (t < 1/6) return p + (q - p) * 6 * t;
              if (t < 1/2) return q;
              if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
              return p;
            };

            if (s === 0) {
              r = g = b = l;
            } else {
              const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
              const p = 2 * l - q;
              r = hue2rgb(p, q, h + 1/3);
              g = hue2rgb(p, q, h);
              b = hue2rgb(p, q, h - 1/3);
            }
            
            r = Math.round(r * 255);
            g = Math.round(g * 255);
            b = Math.round(b * 255);
            isValid = true;
          }
          break;
      }

      if (!isValid) {
        setError('Invalid color format. Please check your input.');
        return;
      }

      // Validate RGB values
      if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255 || a < 0 || a > 1) {
        setError('Color values out of range.');
        return;
      }

      // Convert to different formats
      const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      const hexAlpha = hex + Math.round(a * 255).toString(16).padStart(2, '0');
      const rgb = `rgb(${r}, ${g}, ${b})`;
      const rgba = `rgba(${r}, ${g}, ${b}, ${a.toFixed(3)})`;

      // Convert to HSL
      const hsl = rgbToHsl(r, g, b);
      const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
      const hslaStr = `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${a.toFixed(3)})`;

      setResult({
        hex: hex,
        hexAlpha: hexAlpha,
        rgb: rgb,
        rgba: rgba,
        hsl: hslStr,
        hsla: hslaStr,
        r: r,
        g: g,
        b: b,
        a: a,
        hslValues: hsl
      });
      setError('');
    } catch (err) {
      setError('Error converting color. Please check your input.');
    }
  };

  useEffect(() => {
    if (inputColor) {
      convertColor();
    }
  }, [inputColor, inputFormat]);

  const copyToClipboard = async (text, format) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(format);
      setTimeout(() => setCopied(''), 2000);
    } catch (err) {
      console.error('Failed to copy color');
    }
  };

  const getColorPreview = () => {
    if (!result) return null;
    return `rgba(${result.r}, ${result.g}, ${result.b}, ${result.a})`;
  };

  const getContrastColor = () => {
    if (!result) return '#000000';
    const brightness = (result.r * 299 + result.g * 587 + result.b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Color Converter
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Convert colors between HEX, RGB, and HSL formats with live preview
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Calculator */}
            <div className="lg:col-span-3">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-pink-600 to-rose-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Color Conversion
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Input Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="inputFormat" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Input Format
                        </Label>
                        <select
                          id="inputFormat"
                          value={inputFormat}
                          onChange={(e) => setInputFormat(e.target.value)}
                          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        >
                          <option value="hex">HEX</option>
                          <option value="rgb">RGB/RGBA</option>
                          <option value="hsl">HSL/HSLA</option>
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="inputColor" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Color Value
                        </Label>
                        <div className="flex gap-2 mt-2">
                          <Input
                            id="inputColor"
                            value={inputColor}
                            onChange={(e) => setInputColor(e.target.value)}
                            placeholder={inputFormat === 'hex' ? '#3B82F6' : inputFormat === 'rgb' ? 'rgb(59, 130, 246)' : 'hsl(217, 91%, 60%)'}
                            className="flex-1"
                          />
                          <input
                            type="color"
                            value={inputFormat === 'hex' ? inputColor : '#3B82F6'}
                            onChange={(e) => setInputColor(e.target.value)}
                            className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    {/* Result */}
                    {result && (
                      <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 p-6 rounded-lg border border-pink-200 dark:border-pink-800">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Color Conversion Result
                          </h3>
                          
                          {/* Color Preview */}
                          <div 
                            className="w-32 h-32 mx-auto rounded-lg border-4 border-white shadow-lg mb-4"
                            style={{ backgroundColor: getColorPreview() }}
                          >
                            <div 
                              className="w-full h-full flex items-center justify-center text-lg font-bold"
                              style={{ color: getContrastColor() }}
                            >
                              {result.a < 1 ? 'A' : 'C'}
                            </div>
                          </div>
                        </div>

                        <Separator className="my-4" />

                        {/* Color Formats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <h4 className="font-semibold text-gray-900 dark:text-white">HEX Formats:</h4>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary">HEX</Badge>
                                <code className="flex-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                                  {result.hex}
                                </code>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => copyToClipboard(result.hex, 'hex')}
                                >
                                  {copied === 'hex' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </Button>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary">HEX+A</Badge>
                                <code className="flex-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                                  {result.hexAlpha}
                                </code>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => copyToClipboard(result.hexAlpha, 'hexAlpha')}
                                >
                                  {copied === 'hexAlpha' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="font-semibold text-gray-900 dark:text-white">RGB Formats:</h4>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary">RGB</Badge>
                                <code className="flex-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                                  {result.rgb}
                                </code>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => copyToClipboard(result.rgb, 'rgb')}
                                >
                                  {copied === 'rgb' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </Button>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary">RGBA</Badge>
                                <code className="flex-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                                  {result.rgba}
                                </code>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => copyToClipboard(result.rgba, 'rgba')}
                                >
                                  {copied === 'rgba' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 space-y-3">
                          <h4 className="font-semibold text-gray-900 dark:text-white">HSL Formats:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">HSL</Badge>
                              <code className="flex-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                                {result.hsl}
                              </code>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(result.hsl, 'hsl')}
                              >
                                {copied === 'hsl' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                              </Button>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">HSLA</Badge>
                              <code className="flex-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                                {result.hsla}
                              </code>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(result.hsla, 'hsla')}
                              >
                                {copied === 'hsla' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Color Values */}
                        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                              {result.r}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Red</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                              {result.g}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Green</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                              {result.b}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Blue</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                              {result.a.toFixed(3)}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Alpha</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Color Palettes */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quick Color Palettes</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                        {[
                          '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899',
                          '#06B6D4', '#84CC16', '#F97316', '#6366F1', '#14B8A6', '#F43F5E'
                        ].map((color, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            onClick={() => {
                              setInputFormat('hex');
                              setInputColor(color);
                            }}
                            className="h-16 p-0"
                            style={{ backgroundColor: color }}
                          >
                            <span className="sr-only">Select color {color}</span>
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
                <Card className="shadow-lg border-0 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-800 dark:to-gray-700">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-full h-64 bg-gradient-to-br from-pink-200 to-rose-300 dark:from-pink-800 dark:to-rose-700 rounded-lg flex items-center justify-center mb-4">
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
                About Color Converter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Our Color Converter helps you convert colors between different formats including HEX, RGB, RGBA, HSL, and HSLA. 
                Whether you're a designer, developer, or just need to work with colors, this tool provides 
                accurate conversions with live preview and easy copying functionality.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Supported Formats:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• HEX (#RRGGBB, #RGB, #RRGGBBAA)</li>
                    <li>• RGB (rgb(r, g, b))</li>
                    <li>• RGBA (rgba(r, g, b, a))</li>
                    <li>• HSL (hsl(h, s%, l%))</li>
                    <li>• HSLA (hsla(h, s%, l%, a))</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Live color preview</li>
                    <li>• One-click copying</li>
                    <li>• Color picker integration</li>
                    <li>• Quick color palettes</li>
                    <li>• Mobile-friendly design</li>
                  </ul>
                </div>
              </div>

              <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-pink-900 dark:text-pink-100 mb-2">💡 Tips:</h4>
                <ul className="text-sm text-pink-800 dark:text-pink-200 space-y-1">
                  <li>• Use the color picker for visual selection</li>
                  <li>• Copy formats with one click</li>
                  <li>• Preview shows how the color looks</li>
                  <li>• Quick palettes for common colors</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ColorConverter; 