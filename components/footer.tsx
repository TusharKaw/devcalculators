"use client"

import { useState, useEffect } from "react"
import { Code2, Github, Twitter, Heart, Linkedin, Mail, Globe, MapPin, Phone, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"

export function Footer() {
  const router = useRouter()
  const pathname = usePathname()
  const currentYear = new Date().getFullYear()
  const [loadingTool, setLoadingTool] = useState<string | null>(null)

  // Clear loading state when pathname changes (navigation completes)
  useEffect(() => {
    setLoadingTool(null)
  }, [pathname])

  const handleToolClick = (href: string) => {
    setLoadingTool(href)

    // Save current scroll position before navigation
    if (typeof window !== 'undefined') {
      const position = {
        x: window.scrollX,
        y: window.scrollY,
        timestamp: Date.now()
      }
      sessionStorage.setItem('tools-page-scroll-position', JSON.stringify(position))
    }

    // Navigate to the tool page after a small delay to show loading state
    setTimeout(() => {
      router.push(href)
    }, 300)

    return false // Prevent default link behavior
  }

  // Helper function to render tool links with loading state
  const ToolLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <div className="flex items-center">
      <button
        onClick={() => handleToolClick(href)}
        className="text-gray-600 hover:text-[#2196f3] text-left"
      >
        {loadingTool === href ? (
          <div className="flex items-center">
            <Loader2 className="h-3 w-3 mr-1 animate-spin text-[#2196f3]" />
            <span>{children}</span>
          </div>
        ) : children}
      </button>
    </div>
  )

  return (
    <footer className="bg-white border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
            <Link href="https://www.securenexus.io/" target="_blank" rel="noopener noreferrer">
            <Image src="/xbiz_logo.png" alt="secure-nexus" width={120} height={60} /> </Link>
            
              <Image
                src="/logo-network.svg"
                alt="DevTools Logo"
                width={60}
                height={60}
              />
              
              <span className="text-lg font-bold text-gray-900">DevTools</span>
            </div>
            <p className="text-gray-600 text-sm">
              Essential developer tools for everyday coding tasks. Fast, secure, and works offline. Our tools help developers, data scientists, and IT professionals streamline their workflow.
            </p>
            <div className="flex space-x-4">
              <Link href="https://github.com/devtools" className="text-gray-600 hover:text-[#2196f3]" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com/devtools" className="text-gray-600 hover:text-[#2196f3]" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com/company/devtools" className="text-gray-600 hover:text-[#2196f3]" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
            <div className="pt-4">
              <h4 className="font-medium text-gray-900 mb-2">Contact Us</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#2196f3]" />
                  <a href="mailto:contact@devtools.com" className="hover:underline">contact@devtools.com</a>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-[#2196f3]" />
                  <a href="https://www.devtools.com" className="hover:underline">www.devtools.com</a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Data Converters</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <ToolLink href="/tools/json-formatter">
                  JSON Formatter
                </ToolLink>
              </li>
              <li>
                <ToolLink href="/tools/yaml-converter">
                  YAML Converter
                </ToolLink>
              </li>
              <li>
                <ToolLink href="/tools/csv-to-json">
                  CSV ↔ JSON
                </ToolLink>
              </li>
              <li>
                <ToolLink href="/tools/xml-converter">
                  XML Converter
                </ToolLink>
              </li>
              <li>
                <ToolLink href="/tools/tsv-converter">
                  TSV Converter
                </ToolLink>
              </li>
              <li>
                <ToolLink href="/tools/ini-converter">
                  INI Converter
                </ToolLink>
              </li>
              <li>
                <ToolLink href="/tools/markdown-converter">
                  Markdown Converter
                </ToolLink>
              </li>
              <li>
                <ToolLink href="/tools/sql-converter">
                  SQL Converter
                </ToolLink>
              </li>
              <li>
                <ToolLink href="/tools/universal-converter">
                  Universal Converter
                </ToolLink>
              </li>
              <li>
                <ToolLink href="/tools/data-unit-converter">
                  Data Unit Converter
                </ToolLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Generators</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <ToolLink href="/tools/uuid-generator">
                  UUID Generator
                </ToolLink>
              </li>
              <li>
                <ToolLink href="/tools/password-generator">
                  Password Generator
                </ToolLink>
              </li>
              <li>
                <ToolLink href="/tools/lorem-ipsum">
                  Lorem Ipsum
                </ToolLink>
              </li>
              <li>
                <ToolLink href="/tools/color-generator">
                  Color Palette
                </ToolLink>
              </li>
              <li>
                <ToolLink href="/tools/qr-code-generator">
                  QR Code Generator
                </ToolLink>
              </li>
              <li>
                <ToolLink href="/tools/barcode-generator">
                  Barcode Generator
                </ToolLink>
              </li>
              <li>
                <ToolLink href="/tools/wifi-qr-generator">
                  WiFi QR Generator
                </ToolLink>
              </li>
              <li>
                <ToolLink href="/tools/vcard-qr-generator">
                  vCard QR Generator
                </ToolLink>
              </li>
              <li>
                <ToolLink href="/tools/bulk-qr-generator">
                  Bulk QR Generator
                </ToolLink>
              </li>
              <li>
                <ToolLink href="/tools/meta-tag-generator">
                  Meta Tag Generator
                </ToolLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Cryptography</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <ToolLink href="/tools/hash-generator">
                  Hash Generator
                </ToolLink>
              </li>
              <li>
                <ToolLink href="/tools/md5-generator">
                  MD5 Generator
                </ToolLink>
              </li>
              <li>
                <ToolLink href="/tools/sha1-generator">
                  SHA1 Generator
                </ToolLink>
              </li>
              <li>
                <ToolLink href="/tools/sha256-generator">
                  SHA256 Generator
                </ToolLink>
              </li>
              <li>
                <ToolLink href="/tools/sha512-generator">
                  SHA512 Generator
                </ToolLink>
              </li>
              <li>
                <ToolLink href="/tools/crc32-generator">
                  CRC32 Generator
                </ToolLink>
              </li>
              <li>
                <ToolLink href="/tools/hmac-generator">
                  HMAC Generator
                </ToolLink>
              </li>
              <li>
                <ToolLink href="/tools/bcrypt-generator">
                  Bcrypt Generator
                </ToolLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Electronics & Number Systems</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <ToolLink href="/tools/base64-binary-converter/text-to-bcd">
                  Text → BCD
                </ToolLink>
              </li>
              <li>
                <ToolLink href="/tools/base64-binary-converter/text-to-excess-3">
                  Text → Excess-3
                </ToolLink>
              </li>
              <li>
                <ToolLink href="/tools/base64-binary-converter/binary-to-gray-code">
                  Binary → Gray Code
                </ToolLink>
              </li>
              <li>
                <ToolLink href="/tools/base64-binary-converter/decimal-to-bcd">
                  Decimal → BCD
                </ToolLink>
              </li>
              <li>
                <ToolLink href="/tools/base64-binary-converter/hex-to-binary">
                  Hex → Binary
                </ToolLink>
              </li>
              <li>
                <ToolLink href="/tools/base64-binary-converter/decimal-to-binary">
                  Decimal → Binary
                </ToolLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Additional Footer Sections */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Text Transformers</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <ToolLink href="/tools/string-converter">
                    String Case Converter
                  </ToolLink>
                </li>
                <li>
                  <ToolLink href="/tools/morse-code-translator">
                    Morse Code Translator
                  </ToolLink>
                </li>
                <li>
                  <ToolLink href="/tools/leet-speak-converter">
                    Leet Speak Converter
                  </ToolLink>
                </li>
                <li>
                  <ToolLink href="/tools/pig-latin-translator">
                    Pig Latin Translator
                  </ToolLink>
                </li>
                <li>
                  <ToolLink href="/tools/upside-down-text">
                    Upside Down Text
                  </ToolLink>
                </li>
                <li>
                  <ToolLink href="/tools/zalgo-text-generator">
                    Zalgo Text Generator
                  </ToolLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Encoders & Decoders</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <ToolLink href="/tools/base64-encoder">
                    Base64 Encoder/Decoder
                  </ToolLink>
                </li>
                <li>
                  <ToolLink href="/tools/url-encoder">
                    URL Encoder/Decoder
                  </ToolLink>
                </li>
                <li>
                  <ToolLink href="/tools/jwt-decoder">
                    JWT Decoder
                  </ToolLink>
                </li>
                <li>
                  <ToolLink href="/tools/jwt-generator">
                    JWT Generator
                  </ToolLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Data Unit Conversions</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <ToolLink href="/tools/data-unit-converter/byte-to-kilobyte">
                    Bytes → KB
                  </ToolLink>
                </li>
                <li>
                  <ToolLink href="/tools/data-unit-converter/kilobyte-to-megabyte">
                    KB → MB
                  </ToolLink>
                </li>
                <li>
                  <ToolLink href="/tools/data-unit-converter/megabyte-to-gigabyte">
                    MB → GB
                  </ToolLink>
                </li>
                <li>
                  <ToolLink href="/tools/data-unit-converter/gigabyte-to-terabyte">
                    GB → TB
                  </ToolLink>
                </li>
                <li>
                  <ToolLink href="/tools/data-unit-converter/bit-to-byte">
                    Bits → Bytes
                  </ToolLink>
                </li>
                <li>
                  <ToolLink href="/tools/data-unit-converter/byte-to-mebibyte">
                    Bytes → MiB
                  </ToolLink>
                </li>
                <li>
                  <ToolLink href="/tools/data-unit-converter/kibibyte-to-kilobyte">
                    KiB → KB
                  </ToolLink>
                </li>
                <li>
                  <ToolLink href="/tools/data-unit-converter/megabit-to-megabyte">
                    Mbit → MB
                  </ToolLink>
                </li>
              </ul>
            </div>

            {/* <div>
              <h3 className="font-semibold text-gray-900 mb-4">Image Tools</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <ToolLink href="/tools/image-compressor">
                    Image Compressor
                  </ToolLink>
                </li>
                <li>
                  <ToolLink href="/tools/image-resizer">
                    Image Resizer
                  </ToolLink>
                </li>
                <li>
                  <ToolLink href="/tools/image-cropper">
                    Image Cropper
                  </ToolLink>
                </li>
                <li>
                  <ToolLink href="/tools/image-filters">
                    Image Filters
                  </ToolLink>
                </li>
                <li>
                  <ToolLink href="/tools/image-format-converter">
                    Image Format Converter
                  </ToolLink>
                </li>
                <li>
                  <ToolLink href="/tools/image-metadata-viewer">
                    Image Metadata Viewer
                  </ToolLink>
                </li>
              </ul>
            </div> */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Encryption & Decryption</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <ToolLink href="/tools/aes-encryption">
                    AES Encryption
                  </ToolLink>
                </li>
                <li>
                  <ToolLink href="/tools/rsa-encryption">
                    RSA Encryption
                  </ToolLink>
                </li>
                <li>
                  <ToolLink href="/tools/des-encryption">
                    DES Encryption
                  </ToolLink>
                </li>
                <li>
                  <ToolLink href="/tools/blowfish-encryption">
                    Blowfish Encryption
                  </ToolLink>
                </li>
                <li>
                  <ToolLink href="/tools/pgp-encryption">
                    PGP Encryption
                  </ToolLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Tools Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">


            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Internal Converters</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <ToolLink href="/tools/image-base64-converter">
                    Image ↔ Base64
                  </ToolLink>
                </li>
                <li>
                  <ToolLink href="/tools/base64-binary-converter/image-to-binary">
                    Image → Binary
                  </ToolLink>
                </li>
                <li>
                  <ToolLink href="/tools/base64-binary-converter/binary-to-image">
                    Binary → Image
                  </ToolLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Popular Conversions</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <ToolLink href="/tools/base64-binary-converter/text-to-base64">
                    Text → Base64
                  </ToolLink>
                </li>
                <li>
                  <ToolLink href="/tools/base64-binary-converter/decimal-to-binary">
                    Decimal → Binary
                  </ToolLink>
                </li>
                <li>
                  <ToolLink href="/tools/base64-binary-converter/hex-to-decimal">
                    Hex → Decimal
                  </ToolLink>
                </li>
                <li>
                  <ToolLink href="/tools/data-unit-converter/byte-to-gigabyte">
                    Bytes → GB
                  </ToolLink>
                </li>
                <li>
                  <ToolLink href="/tools/csv-json-converter/csv-to-json">
                    CSV → JSON
                  </ToolLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <p className="text-sm text-gray-600 mr-4">
                © {currentYear} DevTools. All rights reserved.
              </p>
              <div className="flex items-center">
                Powered by: 
                <Link href="https://www.securenexus.io/" target="_blank" rel="noopener noreferrer">
                  <Image 
                    src="/xbiz_logo.png" 
                    alt="Secure Nexus" 
                    width={80} 
                    height={20} 
                    className="h-5 w-auto opacity-85 ml-2"
                  />
                </Link>
              </div>
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-[#2196f3]">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-[#2196f3]">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-sm text-gray-600 hover:text-[#2196f3]">
                Sitemap
              </Link>
            </div>
          </div>
        </div>

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "DevTools",
              "url": "https://www.devtools.com",
              "logo": "https://www.devtools.com/logo.svg",
              "description": "Essential developer tools for everyday coding tasks. Fast, secure, and works offline.",
              "email": "contact@devtools.com",
              "sameAs": [
                "https://github.com/devtools",
                "https://twitter.com/devtools",
                "https://linkedin.com/company/devtools"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-555-555-5555",
                "contactType": "customer service",
                "availableLanguage": ["English"]
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.devtools.com/tools?search={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </div>
    </footer>
  )
}
