import { getBaseUrl } from "@/lib/utils"

export const ColorFormatSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Color Converter Tool",
  "applicationCategory": "WebApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Free online color converter tool to easily convert colors between RGB, HEX, HSL, and CMYK formats with real-time preview.",
  "featureList": [
    "RGB to HEX conversion",
    "HEX to RGB conversion",
    "RGB to HSL conversion",
    "HSL to RGB conversion",
    "HEX to HSL conversion",
    "HSL to HEX conversion",
    "RGB to CMYK conversion",
    "CMYK to RGB conversion",
    "Real-time color preview",
    "Copy to clipboard functionality",
    "Random color generation"
  ],
  "keywords": "color converter, rgb to hex, hex to rgb, rgb to hsl, hsl to rgb, hex to hsl, hsl to hex, rgb to cmyk, cmyk to rgb",
  "softwareVersion": "1.0",
  "screenshot": {
    "@type": "ImageObject",
    "url": `${getBaseUrl()}/images/tools/color-converter-screenshot.jpg`
  }
} 