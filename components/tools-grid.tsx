"use client"

import type React from "react"
import { useState, useEffect } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCollections } from "@/contexts/collections-context"
import {
  FileText,
  Code,
  Key,
  Hash,
  Shuffle,
  Search,
  Lock,
  Unlock,
  FileCode,
  Globe,
  Calendar,
  Palette,
  Database,
  Table,
  Settings,
  ImageIcon,
  FileImage,
  Radio,
  Zap,
  RotateCcw,
  FlipVertical,
  Sparkles,
  Type,
  ArrowUpDown,
  RotateCwIcon as RotateClockwise,
  Repeat,
  Shield,
  ShieldCheck,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  Eye,
  EyeOff,
  FileCheck,
  CheckCircle,
  Cpu,
  HardDrive,
  QrCode,
  ScanLine,
  Wifi,
  ContactIcon,
  Grid3X3,
  Maximize2,
  Crop,
  Minimize2,
  Info,
  Eraser,
  Smile,
  Braces,
  Heart,
  HeartOff,
  Clock,
  Bot,
  Dices,
  Loader2,
  Binary,
} from "lucide-react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

// Add this interface before the toolCategories array
interface Tool {
  name: string;
  description: string;
  icon: React.ForwardRefExoticComponent<any>;
  href: string;
  tags: string[];
  status?: string;
  simulator?: {
    text: string;
    href: string;
  };
}

interface ToolCategory {
  id: string;
  title: string;
  description: string;
  tools: Tool[];
}

const toolCategories: ToolCategory[] = [
  {
    id: "converters",
    title: "Data Converters",
    description: "Convert between different data formats",
    tools: [
      
      {
        name: "Multi-Format Data Converter",
        description: "Convert between JSON, YAML, XML, TOML, CSV, TSV, INI, BSON, NDJSON, SQL, and MessagePack formats",
        icon: Shuffle,
        href: "/tools/universal-converter",
        tags: ["JSON", "YAML", "XML", "TOML", "CSV", "TSV", "INI", "BSON", "NDJSON", "SQL", "MessagePack", "Convert"],
      },
      {
        name: "JSON Parser & Formatter",
        description: "Format JSON and convert between JSON strings and objects",
        icon: FileCode,
        href: "/tools/json-formatter",
        tags: ["JSON", "Format", "Convert", "String"],
      },
      {
        name: "YAML to JSON Converter",
        description: "Convert between YAML and JSON formats with validation",
        icon: FileText,
        href: "/tools/yaml-converter",
        tags: ["YAML", "JSON", "Convert"],
      },
      {
        name: "XML to JSON Converter",
        description: "Convert between XML and JSON formats with validation",
        icon: Code,
        href: "/tools/xml-converter",
        tags: ["XML", "JSON", "Convert"],
      },
      {
        name: "SQL to JSON/CSV Converter",
        description: "Convert SQL query results to JSON/CSV, generate INSERT statements from JSON/CSV, and create table schemas. Support for MySQL, PostgreSQL, SQLite.",
        icon: Database,
        href: "/tools/sql-converter",
        tags: ["SQL", "JSON", "CSV", "Database", "INSERT", "CREATE TABLE", "MySQL", "PostgreSQL", "SQLite", "API", "Migration"],
      },
      {
        name: "Markdown to HTML Converter",
        description: "Convert between Markdown and HTML formats",
        icon: FileText,
        href: "/tools/markdown-converter",
        tags: ["Markdown", "HTML", "Convert"],
      },
      {
        name: "TSV to JSON/CSV Converter",
        description: "Convert between TSV and JSON/CSV formats",
        icon: Table,
        href: "/tools/tsv-converter",
        tags: ["TSV", "JSON", "CSV", "Tab"],
      },
      {
        name: "INI to JSON/YAML Converter",
        description: "Convert between INI and JSON/YAML formats",
        icon: Settings,
        href: "/tools/ini-converter",
        tags: ["INI", "Config", "JSON", "YAML"],
      },
      {
        name: "Text Case Converter",
        description: "Convert text case, encoding and format and change casing of text",
        icon: Code,
        href: "/tools/string-converter",
        tags: ["text", "format", "camelCase", "snake_case", "kebab-case", "PascalCase", "CONSTANT_CASE", "Coding"],
      },
      {
        name: "CSV to JSON",
        description: "Convert CSV data to JSON format",
        icon: Shuffle,
        href: "/tools/csv-to-json",
        tags: ["CSV", "JSON", "Convert"],
      },
      {
        name: "Timestamp Converter",
        description: "Convert Unix timestamps to human-readable dates and vice versa with support for multiple formats",
        icon: Clock,
        href: "/tools/timestamp-converter",
        tags: ["Timestamp", "Unix", "Epoch", "Date", "Time", "Convert", "Developer"],
      },
      {
        name: "Data Unit Converter",
        description: "Convert between bits, bytes, KB, MB, GB, TB and other data storage units",
        icon: HardDrive,
        href: "/tools/data-unit-converter",
        tags: ["Data", "Bits", "Bytes", "KB", "MB", "GB", "TB", "KiB", "MiB", "GiB", "Convert", "Storage"],
      },
      {
        name: "Color Converter",
        description: "Convert between RGB, HEX, HSL, and CMYK color formats with real-time preview",
        icon: Palette,
        href: "/tools/converters/color-converter",
        tags: ["Color", "RGB", "HEX", "HSL", "CMYK", "Convert"],
      },
    ],
  },
  {
    id: "generators",
    title: "Generators",
    description: "Generate various types of data and identifiers",
    tools: [
      {
        name: "UUID Generator",
        description: "Generate UUID v1, v4 and other variants",
        icon: Hash,
        href: "/tools/uuid-generator",
        tags: ["UUID", "Generate", "Unique"],
      },
      {
        name: "Password Generator",
        description: "Generate secure passwords with custom rules",
        icon: Key,
        href: "/tools/password-generator",
        tags: ["Password", "Security", "Generate"],
      },
      {
        name: "Lorem Ipsum",
        description: "Generate placeholder text for designs",
        icon: FileText,
        href: "/tools/lorem-ipsum",
        tags: ["Text", "Placeholder", "Lorem"],
      },
      {
        name: "Color Palette",
        description: "Generate color palettes and schemes",
        icon: Palette,
        href: "/tools/color-generator",
        tags: ["Color", "Palette", "Design"],
      },
      {
        name: "Meta Tag Generator",
        description: "Generate SEO-optimized meta tags for better search engine visibility and social media sharing",
        icon: Globe,
        href: "/tools/meta-tag-generator",
        tags: ["Meta Tags", "SEO", "Open Graph", "Twitter Card", "HTML", "Social Media"],
      },
      {
        name: "Robots.txt Generator",
        description:
          "Generate robots.txt files to control search engine crawling with sitemap URLs and user-agent rules",
        icon: Bot,
        href: "/tools/robots-txt-generator",
        tags: ["Robots.txt", "SEO", "Crawling", "Search Engine", "Sitemap", "User-Agent"],
      },
    ],
  },
  {
    id: "testers",
    title: "Testers & Validators",
    description: "Test and validate various data formats",
    tools: [
      {
        name: "Regex Tester",
        description: "Test regular expressions with live matching",
        icon: Search,
        href: "/tools/regex-tester",
        tags: ["Regex", "Test", "Pattern"],
      },
      {
        name: "JSON Validator",
        description: "Validate JSON syntax, structure and  minfied the json",
        icon: FileCode,
        href: "/tools/json-validator",
        tags: ["JSON", "Validate", "Syntax","minify","beautify","minified"],
      },
      {
        name: "URL Tester",
        description: "Test URL validity and structure",
        icon: Globe,
        href: "/tools/url-tester",
        tags: ["URL", "Test", "Validate"],
      },
      {
        name: "Cron Expression",
        description: "Test and validate cron expressions",
        icon: Calendar,
        href: "/tools/cron-tester",
        tags: ["Cron", "Schedule", "Test"],
      },
    ],
  },
  {
    id: "text-transformers",
    title: "Text Transformers",
    description: "Transform and manipulate text in creative and coding ways",
    tools: [
      {
        name: "Case Converter",
        description: "Convert between camelCase, snake_case, kebab-case, PascalCase, and CONSTANT_CASE",
        icon: Type,
        href: "/tools/string-converter",
        tags: ["camelCase", "snake_case", "kebab-case", "PascalCase", "CONSTANT_CASE", "Coding"],
      },
      {
        name: "Text Reverser & Zigzag",
        description: "Reverse text, create zigzag patterns, and other text manipulations",
        icon: ArrowUpDown,
        href: "/tools/text-reverser",
        tags: ["Reverse", "Zigzag", "Pattern", "Manipulation"],
      },
      {
        name: "ROT13 & Caesar Cipher",
        description: "Encode and decode text using ROT13 and Caesar cipher with custom shifts",
        icon: RotateClockwise,
        href: "/tools/rot13-caesar",
        tags: ["ROT13", "Caesar", "Cipher", "Encryption", "Decode"],
      },
      {
        name: "Text Repeater & Duplicator",
        description: "Repeat text multiple times with custom separators and patterns",
        icon: Repeat,
        href: "/tools/text-repeater",
        tags: ["Repeat", "Duplicate", "Pattern", "Multiple"],
      },
      {
        name: "Morse Code Translator",
        description: "Convert text to Morse code and vice versa with audio playback",
        icon: Radio,
        href: "/tools/morse-code-translator",
        tags: ["Morse", "Code", "Audio", "Telegraph", "SOS"],
      },
      {
        name: "Leet Speak (1337) Converter",
        description: "Convert text to leet speak (1337) and back to normal text",
        icon: Zap,
        href: "/tools/leet-speak-converter",
        tags: ["Leet", "1337", "Hacker", "Gaming", "Internet"],
      },
      {
        name: "Pig Latin Translator",
        description: "Translate text to Pig Latin and back to English",
        icon: RotateCcw,
        href: "/tools/pig-latin-translator",
        tags: ["Pig Latin", "Language", "Fun", "Word Game"],
      },
      {
        name: "Upside Down Text Generator",
        description: "Flip text upside down using Unicode characters",
        icon: FlipVertical,
        href: "/tools/upside-down-text",
        tags: ["Upside Down", "Flip", "Unicode", "Fun", "Social"],
      },
      {
        name: "Zalgo Text Generator",
        description: "Create creepy glitched text with combining characters",
        icon: Sparkles,
        href: "/tools/zalgo-text-generator",
        tags: ["Zalgo", "Glitch", "Creepy", "Unicode", "Meme"],
      },
      {
        name: "Emoji Translator",
        description: "Translate words or phrases into sequences of emojis for fun messages",
        icon: Smile,
        href: "/tools/emoji-translator",
        status:'Under Maintenance',
        tags: ["Emoji", "Translate", "Fun", "Text", "Social Media"],
      },
      {
        name: "ASCII Art Generator",
        description: "Convert images or text into ASCII art for plain text environments",
        icon: Braces,
        href: "/tools/ascii-art-generator",
        status:'Under Maintenance',
        tags: ["ASCII", "Art", "Generator", "Image", "Text", "Creative"],
      },
    ],
  },
  {
    id: "diff",
    title: "Difference Checker",
    description: "Compare and find differences between data",
    tools: [
      {
        name: "Text Diff",
        description: "Compare two text blocks and highlight differences",
        icon: FileText,
        href: "/tools/text-diff",
        tags: ["Text", "Compare", "Diff"],
      },
      {
        name: "Image Diff",
        description: "Compare two images and visualize differences",
        icon: ImageIcon,
        href: "/tools/image-diff",
        tags: ["Image", "Compare", "Visual"],
      },
    ],
  },
  {
    id: "formatters",
    title: "Minify/Prettify Tools",
    description: "Minify or beautify code in various languages",
    tools: [
      {
        name: "JavaScript Formatter",
        description: "Minify or beautify JavaScript code",
        icon: Code,
        href: "/tools/js-formatter",
        tags: ["JavaScript", "Minify", "Beautify"],
      },
      {
        name: "CSS Formatter",
        description: "Minify or beautify CSS stylesheets",
        icon: Palette,
        href: "/tools/css-formatter",
        tags: ["CSS", "Minify", "Beautify"],
      },
      {
        name: "HTML Formatter",
        description: "Minify or beautify HTML markup",
        icon: FileCode,
        href: "/tools/html-formatter",
        tags: ["HTML", "Minify", "Beautify"],
      },
      {
        name: "SQL Formatter",
        description:
          "Format and beautify SQL queries with support for multiple dialects including MySQL, PostgreSQL, SQL Server, and Oracle",
        icon: Database,
        href: "/tools/sql-formatter",
        tags: ["SQL", "Format", "Beautify", "MySQL", "PostgreSQL", "SQL Server", "Oracle", "Database"],
      },
      {
        name: "Format and Minfied the JSON",
        description: "Validate JSON syntax and structure and minfied the json",
        icon: FileCode,
        href: "/tools/json-validator",
        tags: ["JSON", "Validate", "Syntax","minify","beautify","minified"],
      },
    ],
  },
  {
    id: "encoders",
    title: "Encoders & Decoders",
    description: "Encode and decode various data formats",
    tools: [
      {
        name: "Image & Base64 Converter",
        description: "Convert images to/from Base64 and binary with live preview and download support",
        icon: FileImage,
        href: "/tools/image-base64-converter",
        tags: ["Image", "Base64", "Binary", "Convert", "Preview", "Download"],
      },
      {
        name: "Electronics & Number System Converter",
        description: "Convert between Base64, Base32, Binary, Decimal, Hexadecimal, Octal, BCD, Gray Code, Excess-3, ASCII, Unicode, UTF-8 and more. Perfect for electronics, computer science, and programming.",
        icon: Binary,
        href: "/tools/base64-binary-converter",
        tags: ["Base64", "Base32", "Binary", "Decimal", "Hexadecimal", "Octal", "BCD", "Gray Code", "Excess-3", "ASCII", "Unicode", "UTF-8", "Electronics", "Computer Science", "Programming", "Number Systems", "Data Conversion"],
      },
      {
        name: "Base64 Encoder/Decoder",
        description: "Encode and decode Base64 strings",
        icon: Lock,
        href: "/tools/base64-encoder",
        tags: ["Base64", "Encode", "Decode"],
      },
      {
        name: "URL Encoder/Decoder",
        description: "Encode and decode URL components",
        icon: Globe,
        href: "/tools/url-encoder",
        tags: ["URL", "Encode", "Decode"],
      },
      {
        name: "JWT Decoder",
        description: "Decode and inspect JWT tokens",
        icon: Unlock,
        href: "/tools/jwt-decoder",
        tags: ["JWT", "Token", "Decode"],
      },
      {
        name: "Hash Generator",
        description: "Generate MD5, SHA1, SHA256 hashes",
        icon: Hash,
        href: "/tools/hash-generator",
        tags: ["Hash", "MD5", "SHA"],
      },
    ],
  },
  {
    id: "hashing",
    title: "Hashing & Checksums",
    description: "Generate and verify cryptographic hashes and checksums",
    tools: [
      {
        name: "MD5 Hash Generator",
        description: "Generate MD5 hashes for text and files with verification",
        icon: Fingerprint,
        href: "/tools/md5-generator",
        tags: ["MD5", "Hash", "Checksum", "Verification", "File"],
      },
      {
        name: "SHA-1 Hash Generator",
        description: "Generate SHA-1 hashes for text and files",
        icon: ShieldCheck,
        href: "/tools/sha1-generator",
        tags: ["SHA-1", "Hash", "Checksum", "Security", "File"],
      },
      {
        name: "SHA-256 Hash Generator",
        description: "Generate SHA-256 hashes for text and files with high security",
        icon: Shield,
        href: "/tools/sha256-generator",
        tags: ["SHA-256", "Hash", "Checksum", "Security", "Cryptography"],
      },
      {
        name: "SHA-512 Hash Generator",
        description: "Generate SHA-512 hashes for maximum security applications",
        icon: Lock,
        href: "/tools/sha512-generator",
        tags: ["SHA-512", "Hash", "Checksum", "Security", "Cryptography"],
      },
      {
        name: "HMAC Generator",
        description: "Generate HMAC (Hash-based Message Authentication Code) with custom keys",
        icon: KeyRound,
        href: "/tools/hmac-generator",
        tags: ["HMAC", "Authentication", "MAC", "Security", "Key"],
      },
      {
        name: "CRC32 Checksum",
        description: "Generate CRC32 checksums for data integrity verification",
        icon: CheckCircle,
        href: "/tools/crc32-generator",
        tags: ["CRC32", "Checksum", "Integrity", "Verification", "Error Detection"],
      },
      {
        name: "Hash Verifier",
        description: "Verify and compare hash values for file integrity checking",
        icon: FileCheck,
        href: "/tools/hash-verifier",
        tags: ["Hash", "Verify", "Compare", "Integrity", "Validation"],
      },
      {
        name: "File Hash Calculator",
        description: "Calculate multiple hash types for uploaded files simultaneously",
        icon: HardDrive,
        href: "/tools/file-hash-calculator",
        tags: ["File", "Hash", "Multiple", "Calculate", "Upload"],
      },
      {
        name: "Bcrypt Hash Generator",
        description: "Generate bcrypt hashes for secure password storage",
        icon: LockKeyhole,
        href: "/tools/bcrypt-generator",
        tags: ["Bcrypt", "Password", "Security", "Salt", "Authentication"],
      },
      {
        name: "Argon2 Hash Generator",
        description: "Generate Argon2 hashes for modern password security",
        icon: Cpu,
        href: "/tools/argon2-generator",
        tags: ["Argon2", "Password", "Security", "Modern", "Memory-hard"],
      },
    ],
  },
  {
    id: "encryption",
    title: "Encryption & Decryption",
    description: "Encrypt and decrypt data using various cryptographic algorithms",
    tools: [
      {
        name: "AES Encryption/Decryption",
        description: "Encrypt and decrypt text using AES (Advanced Encryption Standard) with multiple modes",
        icon: Shield,
        href: "/tools/aes-encryption",
        tags: ["AES", "Encryption", "Decryption", "Symmetric", "Security"],
      },
      {
        name: "RSA Encryption/Decryption",
        description: "Encrypt and decrypt text using RSA public-key cryptography",
        icon: Key,
        href: "/tools/rsa-encryption",
        tags: ["RSA", "Public Key", "Private Key", "Asymmetric", "Encryption"],
      },
      {
        name: "DES/3DES Encryption",
        description: "Encrypt and decrypt text using DES and Triple DES algorithms",
        icon: Lock,
        href: "/tools/des-encryption",
        tags: ["DES", "3DES", "Triple DES", "Encryption", "Legacy"],
      },
      {
        name: "Blowfish Encryption",
        description: "Encrypt and decrypt text using the Blowfish symmetric cipher",
        icon: LockKeyhole,
        href: "/tools/blowfish-encryption",
        tags: ["Blowfish", "Symmetric", "Cipher", "Encryption", "Fast"],
      },
      {
        name: "Caesar Cipher",
        description: "Encrypt and decrypt text using the classic Caesar cipher with custom shifts",
        icon: RotateClockwise,
        href: "/tools/caesar-cipher",
        tags: ["Caesar", "Cipher", "Shift", "Classical", "Simple"],
      },
      {
        name: "Vigenère Cipher",
        description: "Encrypt and decrypt text using the Vigenère polyalphabetic cipher",
        icon: Code,
        href: "/tools/vigenere-cipher",
        tags: ["Vigenère", "Polyalphabetic", "Cipher", "Key", "Classical"],
      },
      {
        name: "Password Encryption Tool",
        description: "Encrypt passwords using various algorithms for secure storage",
        icon: Eye,
        href: "/tools/password-encryption",
        tags: ["Password", "Encryption", "Secure", "Storage", "Authentication"],
      },
      {
        name: "PGP Encryption/Decryption",
        description: "Encrypt and decrypt messages using PGP (Pretty Good Privacy)",
        icon: ShieldCheck,
        href: "/tools/pgp-encryption",
        tags: ["PGP", "GPG", "Public Key", "Email", "Security"],
      },
      {
        name: "JWT Token Generator",
        description: "Generate and sign JWT tokens with custom claims and algorithms",
        icon: Unlock,
        href: "/tools/jwt-generator",
        tags: ["JWT", "Token", "Generate", "Sign", "Claims"],
      },
      {
        name: "Fernet Encryption",
        description: "Encrypt and decrypt data using Fernet symmetric encryption",
        icon: EyeOff,
        href: "/tools/fernet-encryption",
        tags: ["Fernet", "Symmetric", "Encryption", "Python", "Secure"],
      },
    ],
  },
  {
    id: "digital-signatures",
    title: "Digital Signatures",
    description: "Create and verify digital signatures for data authentication",
    tools: [
      {
        name: "Digital Signature",
        description: "Create and verify digital signatures for data integrity and authentication",
        icon: FileCheck,
        href: "/tools/digital-signature",
        tags: ["Digital Signature", "Authentication", "Integrity", "Verification", "Cryptography"],
        simulator: {
          text: "Try the RSA Algorithm Simulator",
          href: "/tools/rsa-simulator"
        }
      },
      {
        name: "ElGamal Digital Signature",
        description: "Create and verify digital signatures using the ElGamal algorithm",
        icon: Shield,
        href: "/tools/elgamal-signature",
        tags: ["ElGamal", "Digital Signature", "Public Key", "Authentication", "Cryptography"],
      },
    ],
  },
  {
    id: "key-exchange",
    title: "Cryptographic Simulators",
    description: "Interactive simulators for various cryptographic protocols and algorithms",
    tools: [
      {
        name: "Key Exchange Simulator",
        description: "Simulate secure key exchange protocols like Diffie-Hellman",
        icon: KeyRound,
        href: "/tools/key-exchange-simulator",
        tags: ["Key Exchange", "Diffie-Hellman", "Protocol", "Simulation", "Secure Communication"],
      },
      {
        name: "RSA Algorithm Simulator",
        description: "Interactive simulation of RSA key generation, encryption and decryption process",
        icon: Cpu,
        href: "/tools/rsa-simulator",
        tags: ["RSA", "Asymmetric", "Simulation", "Educational", "Encryption"],
      },
      {
        name: "Hashing Algorithm Visualizer",
        description: "Visualize how different hashing algorithms transform input data",
        icon: Eye,
        href: "/tools/hash-visualizer",
        tags: ["Hash", "Visualization", "Educational", "Algorithm", "Cryptography"],
      },
      {
        name: "Block Cipher Simulator",
        description: "Simulate the operations of block ciphers like AES and DES",
        icon: Lock,
        href: "/tools/block-cipher-simulator",
        tags: ["Block Cipher", "AES", "DES", "Modes", "Simulation"],
      },
      {
        name: "Random Number Generator Simulator",
        description: "Visualize and compare different cryptographic random number generation algorithms",
        icon: Dices,
        href: "/tools/rng-simulator",
        tags: ["RNG", "PRNG", "CSPRNG", "Entropy", "Randomness"],
      },
    ],
  },
  {
    id: "qr-barcode",
    title: "QR Code & Barcode Generators",
    description: "Generate QR codes and barcodes for various purposes",
    tools: [
      {
        name: "QR Code Generator",
        description: "Generate QR codes for text, URLs, WiFi, contacts, and more with customization options",
        icon: QrCode,
        href: "/tools/qr-code-generator",
        tags: ["QR Code", "Generate", "URL", "WiFi", "Contact", "SMS", "Email"],
      },
      {
        name: "Barcode Generator",
        description: "Generate various barcode formats including Code128, Code39, EAN, UPC, and more",
        icon: ScanLine,
        href: "/tools/barcode-generator",
        tags: ["Barcode", "Code128", "Code39", "EAN", "UPC", "Generate"],
      },
      {
        name: "WiFi QR Generator",
        description: "Generate QR codes for WiFi network sharing with password encryption",
        icon: Wifi,
        href: "/tools/wifi-qr-generator",
        tags: ["WiFi", "QR Code", "Network", "Password", "Share"],
      },
      {
        name: "vCard QR Generator",
        description: "Generate QR codes for contact information sharing (vCard format)",
        icon: ContactIcon,
        href: "/tools/vcard-qr-generator",
        tags: ["vCard", "Contact", "QR Code", "Business Card", "Share"],
      },
      {
        name: "Bulk QR Generator",
        description: "Generate multiple QR codes at once from CSV or text list",
        icon: Grid3X3,
        href: "/tools/bulk-qr-generator",
        tags: ["Bulk", "Multiple", "QR Code", "CSV", "Batch"],
      },
    ],
  },
  // {
  //   id: "image-tools",
  //   title: "Image Processing Tools",
  //   description: "Manipulate and process images with various operations",
  //   tools: [
  //     {
  //       name: "Image Format Converter",
  //       description: "Convert images between different formats (PNG, JPG, WebP, GIF, BMP, TIFF)",
  //       icon: ImageIcon,
  //       href: "/tools/image-format-converter",
  //       tags: ["Image", "Convert", "PNG", "JPG", "WebP", "GIF", "BMP", "TIFF"],
  //     },
  //     {
  //       name: "Image Resizer",
  //       description: "Resize images with custom dimensions, aspect ratio lock, and quality settings",
  //       icon: Maximize2,
  //       href: "/tools/image-resizer",
  //       tags: ["Image", "Resize", "Dimensions", "Scale", "Quality"],
  //     },
  //     {
  //       name: "Image Cropper",
  //       description: "Crop images with custom selection, aspect ratios, and precise controls",
  //       icon: Crop,
  //       href: "/tools/image-cropper",
  //       tags: ["Image", "Crop", "Selection", "Aspect Ratio", "Trim"],
  //     },
  //     {
  //       name: "Image Compressor",
  //       description: "Compress images to reduce file size while maintaining quality",
  //       icon: Minimize2,
  //       href: "/tools/image-compressor",
  //       tags: ["Image", "Compress", "Optimize", "File Size", "Quality"],
  //     },
  //     {
  //       name: "Image Filters & Effects",
  //       description: "Apply various filters and effects to images (blur, brightness, contrast, etc.)",
  //       icon: Sparkles,
  //       href: "/tools/image-filters",
  //       tags: ["Image", "Filters", "Effects", "Blur", "Brightness", "Contrast"],
  //     },
  //     {
  //       name: "Image Metadata Viewer",
  //       description: "View and extract metadata information from images (EXIF, dimensions, etc.)",
  //       icon: Info,
  //       href: "/tools/image-metadata-viewer",
  //       tags: ["Image", "Metadata", "EXIF", "Information", "Properties"],
  //     },
  //     {
  //       name: "Color Palette Extractor",
  //       description: "Extract dominant colors and generate color palettes from images",
  //       icon: Palette,
  //       href: "/tools/color-palette-extractor",
  //       tags: ["Image", "Color", "Palette", "Extract", "Dominant Colors"],
  //     },
  //     {
  //       name: "Image Background Remover",
  //       description: "Remove or replace image backgrounds with transparency or solid colors",
  //       icon: Eraser,
  //       href: "/tools/image-background-remover",
  //       tags: ["Image", "Background", "Remove", "Transparency", "Replace"],
  //     },
  //   ],
  // },
]

interface ToolsGridProps {
  categoryFilter?: string
}

export function ToolsGrid({ categoryFilter }: ToolsGridProps = {}) {
  const { collections, addToCollection, removeFromCollection, isInCollection } = useCollections()
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [loadingTool, setLoadingTool] = useState<string | null>(null)
  const [showHeartPulse, setShowHeartPulse] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Clear loading state when pathname changes (navigation completes)
  useEffect(() => {
    setLoadingTool(null)
  }, [pathname])

  // Show heart pulse animation for new users
  useEffect(() => {
    const hasSeenTip = localStorage.getItem("collections-tip-seen")
    if (!hasSeenTip && collections.length === 0) {
      setShowHeartPulse(true)
      // Stop the pulse after 10 seconds
      const timer = setTimeout(() => setShowHeartPulse(false), 10000)
      return () => clearTimeout(timer)
    }
  }, [collections.length])

  const handleCollectionToggle = (e: React.MouseEvent, tool: any) => {
    e.preventDefault()
    e.stopPropagation()

    // Get the active collection or first collection
    const targetCollection = collections.length > 0 ? collections[0] : null
    const targetCollectionId = targetCollection?.id || 1

    // Check if tool is in the target collection
    const inCollection = isInCollection(targetCollectionId, tool.href)

    if (inCollection) {
      // Find the tool ID in the collection to remove it
      const toolInCollection = targetCollection?.items.find(itemId => {
        // This is a simplified approach - in a real app you'd have proper tool lookup
        return true // We'll remove the first matching tool for now
      })
      if (toolInCollection) {
        removeFromCollection(targetCollectionId, toolInCollection)
      }
    } else {
      addToCollection(targetCollectionId, {
        id: Date.now() + Math.random(), // Generate a unique ID
        name: tool.name,
        description: tool.description,
        href: tool.href,
        icon: tool.icon.name || "Code",
        tags: tool.tags,
      })
      // Stop the pulse animation when user adds their first tool
      setShowHeartPulse(false)
    }
  }

  const handleToolClick = (e: React.MouseEvent, tool: any) => {
    e.preventDefault()
    setLoadingTool(tool.href)
    
    // Save current scroll position before navigation
    if (typeof window !== 'undefined') {
      const position = {
        x: window.scrollX,
        y: window.scrollY,
        timestamp: Date.now()
      }
      sessionStorage.setItem('tools-page-scroll-position', JSON.stringify(position))
    }
    
    // Add a small delay to show the loading state
    // This makes the loading indicator visible even for fast navigations
    setTimeout(() => {
      router.push(tool.href)
    }, 300) // Slightly longer delay to ensure loading state is visible
  }

  // Filter categories if categoryFilter is provided
  const filteredCategories = categoryFilter
    ? toolCategories.filter((category) => category.id === categoryFilter)
    : toolCategories

  return (
    <div className="space-y-16">
      {filteredCategories.map((category) => (
        <section key={category.id} id={category.id} className="scroll-mt-24">
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="h-1 w-12 bg-gradient-to-r from-[#2196f3] to-[#1976d2] rounded-full"></div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {category.title}
                </h2>
              </div>
              {!categoryFilter && (
                <Link href={`/tools/${category.id}`}>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 hover:bg-[#2196f3] hover:text-white transition-colors"
                  >
                    View All
                    <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                  </Button>
                </Link>
              )}
            </div>
            <p className="text-gray-600 text-lg ml-16">{category.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {category.tools.map((tool) => {
              const IconComponent = tool.icon
              // Get the target collection ID for checking if tool is in collection
              const targetCollectionId = collections.length > 0 ? collections[0].id : 1
              const inCollection = isInCollection(targetCollectionId, tool.href)
              const isLoading = loadingTool === tool.href

              return (
                <a key={tool.name} href={tool.href} onClick={(e) => handleToolClick(e, tool)}>
                  <Card className={`group relative h-full overflow-hidden bg-gradient-to-br from-white to-gray-50/50 hover:from-white hover:to-[#2196f3]/5 border border-gray-200/60 hover:border-[#2196f3]/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#2196f3]/10 active:scale-[0.98] active:shadow-inner ${isLoading ? 'scale-[1.02] shadow-xl shadow-[#2196f3]/10 border-[#2196f3]/30' : ''}`}>
                    {/* Loading overlay */}
                    {isLoading && (
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-30 rounded-lg opacity-0 transition-opacity duration-200 ease-in-out" style={{ opacity: isLoading ? 1 : 0 }}>
                        <div className="flex flex-col items-center">
                          <div className="relative">
                            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#2196f3] to-[#1976d2] opacity-30 blur-sm animate-pulse"></div>
                            <Loader2 className="h-8 w-8 text-[#2196f3] animate-spin relative" />
                          </div>
                          <span className="text-sm text-[#2196f3] font-medium mt-2">Loading tool...</span>
                        </div>
                      </div>
                    )}

                    {/* Gradient border effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2196f3]/0 via-[#2196f3]/0 to-[#2196f3]/0 group-hover:from-[#2196f3]/20 group-hover:via-[#1976d2]/20 group-hover:to-[#2196f3]/20 rounded-lg transition-all duration-300 -z-10"></div>

                    {/* Collection heart button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`absolute top-3 right-3 z-20 h-9 w-9 rounded-full transition-all duration-300 ${inCollection
                        ? "text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 shadow-sm"
                        : "text-gray-400 hover:text-red-500 bg-white/80 hover:bg-red-50 opacity-0 group-hover:opacity-100 shadow-sm"
                        } ${showHeartPulse && !inCollection ? "animate-pulse ring-2 ring-red-300 ring-opacity-50" : ""}`}
                      onClick={(e) => handleCollectionToggle(e, tool)}
                    >
                      {inCollection ? (
                        <Heart className="h-4 w-4 fill-current drop-shadow-sm" />
                      ) : (
                        <HeartOff className="h-4 w-4" />
                      )}
                    </Button>

                    <CardHeader className="pb-4 pr-14">
                      <div className="flex items-start space-x-4 mb-3">
                        <div className="p-3 bg-gradient-to-br from-[#2196f3]/10 to-[#1976d2]/10 rounded-xl group-hover:from-[#2196f3]/20 group-hover:to-[#1976d2]/20 group-hover:scale-110 transition-all duration-300 shadow-sm">
                          <IconComponent className="h-6 w-6 text-[#2196f3] group-hover:text-[#1976d2] transition-colors duration-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-[#2196f3] transition-colors duration-300 leading-tight">
                            {tool.name}
                          </CardTitle>
                          <div className="mt-1 flex items-center space-x-2">
                            <div className="h-1 w-8 bg-gradient-to-r from-[#2196f3]/30 to-[#1976d2]/30 rounded-full group-hover:from-[#2196f3]/60 group-hover:to-[#1976d2]/60 transition-all duration-300"></div>
                            <span className="text-xs text-gray-500 font-medium">{tool?.status ? tool?.status : "Ready to use"}</span>
                          </div>
                        </div>
                      </div>
                      <CardDescription className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2">
                        {tool.tags.slice(0, 4).map((tag, index) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className={`text-xs px-2 py-1 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 border border-gray-200/50 hover:from-[#2196f3]/10 hover:to-[#1976d2]/10 hover:text-[#2196f3] hover:border-[#2196f3]/20 transition-all duration-200 transform hover:scale-105 ${index === 0 ? "group-hover:animate-pulse" : ""
                              }`}
                          >
                            {tag}
                          </Badge>
                        ))}
                        {tool.tags.length > 4 && (
                          <Badge
                            variant="secondary"
                            className="text-xs px-2 py-1 bg-gradient-to-r from-[#2196f3]/10 to-[#1976d2]/10 text-[#2196f3] border border-[#2196f3]/20"
                          >
                            +{tool.tags.length - 4}
                          </Badge>
                        )}
                      </div>

                      {/* Interactive bottom section */}
                      <div className="mt-4 pt-3 border-t border-gray-100 group-hover:border-[#2196f3]/20 transition-colors duration-300">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div
                              className={`h-2 w-2 rounded-full animate-pulse ${tool?.status ? "bg-yellow-400" : "bg-green-400"
                                }`}
                            ></div>
                            <span className="text-xs text-gray-500 group-hover:text-[#2196f3] transition-colors duration-300">
                              {tool?.status ? "Under Maintenance" : "Ready to use"}
                            </span>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex items-center space-x-1 text-[#2196f3]">
                              <span className="text-xs font-medium">Open tool</span>
                              <ChevronDown className="h-3 w-3 rotate-[-90deg]" />
                            </div>
                          </div>
                        </div>
                      </div>

                    </CardContent>

                    {/* Hover overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2196f3]/0 via-transparent to-transparent group-hover:from-[#2196f3]/5 transition-all duration-300 pointer-events-none rounded-lg"></div>
                  </Card>
                </a>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
