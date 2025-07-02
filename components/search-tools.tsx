"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { Search, Filter, Keyboard, ArrowRight, RotateCcw, Clock, Heart, Star, TrendingUp, Zap, Bookmark, History, Settings, X, CheckCircle, AlertCircle, Info, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { getBaseUrl } from "@/lib/utils"

// Comprehensive tools data with detailed format mappings and internal functionalities
const allTools = [
  // Data Converters
  {
    name: "JSON Formatter & Validator",
    description:
      "Format, validate, and minify JSON with syntax highlighting. Parse nested JSON strings and convert between JSON objects and strings.",
    category: "Data Converters",
    href: "/tools/json-formatter",
    tags: ["json", "format", "validate", "syntax", "minify", "prettify", "nested", "parse"],
    inputFormats: ["json", "json string", "nested json", "text", "string"],
    outputFormats: ["json", "formatted json", "minified json", "json string", "validated json"],
    internalFeatures: [
      "nested parsing",
      "depth control",
      "syntax validation",
      "error detection",
      "minification",
      "beautification",
    ],
  },
  {
    name: "Color Converter",
    description: "Convert between RGB, HEX, HSL, and CMYK color formats with real-time preview",
    category: "Data Converters",
    href: "/tools/converters/color-converter",
    tags: ["color", "rgb", "hex", "hsl", "cmyk", "convert", "palette", "design"],
    inputFormats: ["rgb", "hex", "hsl", "cmyk", "color values", "color codes"],
    outputFormats: ["rgb", "hex", "hsl", "cmyk", "color values", "color codes"],
    internalFeatures: ["real-time preview", "color picker", "format conversion", "color validation"],
  },
  {
    name: "YAML ↔ JSON Converter",
    description: "Convert between YAML and JSON formats with validation and syntax highlighting",
    category: "Data Converters",
    href: "/tools/yaml-converter",
    tags: ["yaml", "json", "convert", "format", "yml"],
    inputFormats: ["yaml", "yml", "json"],
    outputFormats: ["yaml", "yml", "json"],
    internalFeatures: ["bidirectional conversion", "syntax validation", "error highlighting"],
  },
  {
    name: "CSV ↔ JSON Converter",
    description: "Convert CSV files to JSON and vice versa with custom delimiters, headers, and data types",
    category: "Data Converters",
    href: "/tools/csv-to-json",
    tags: ["csv", "json", "convert", "data", "spreadsheet", "table"],
    inputFormats: ["csv", "json", "spreadsheet", "table data"],
    outputFormats: ["csv", "json", "table"],
    internalFeatures: ["custom delimiters", "header detection", "data type inference", "bidirectional conversion"],
  },
  {
    name: "XML ↔ JSON Converter",
    description: "Convert between XML and JSON formats with validation and attribute handling",
    category: "Data Converters",
    href: "/tools/xml-converter",
    tags: ["xml", "json", "convert", "format", "markup"],
    inputFormats: ["xml", "json"],
    outputFormats: ["xml", "json"],
    internalFeatures: ["attribute handling", "namespace support", "validation", "bidirectional conversion"],
  },
  {
    name: "SQL ↔ JSON/CSV Converter",
    description:
      "Convert SQL data to JSON/CSV and vice versa. Parse INSERT statements, table format, and generate SQL from data",
    category: "Data Converters",
    href: "/tools/sql-converter",
    tags: ["sql", "json", "csv", "database", "insert", "table", "query"],
    inputFormats: ["sql", "insert statements", "table format", "json", "csv", "database"],
    outputFormats: ["sql", "insert statements", "json", "csv", "table"],
    internalFeatures: ["INSERT statement parsing", "table format parsing", "SQL generation", "multiple output formats"],
  },
  {
    name: "Markdown ↔ HTML Converter",
    description: "Convert Markdown to HTML and vice versa with live preview and syntax highlighting",
    category: "Data Converters",
    href: "/tools/markdown-converter",
    tags: ["markdown", "html", "convert", "preview", "md"],
    inputFormats: ["markdown", "md", "html"],
    outputFormats: ["markdown", "md", "html"],
    internalFeatures: ["live preview", "syntax highlighting", "bidirectional conversion"],
  },
  {
    name: "TSV ↔ JSON Converter",
    description: "Convert Tab-Separated Values to JSON and vice versa with custom handling",
    category: "Data Converters",
    href: "/tools/tsv-converter",
    tags: ["tsv", "json", "convert", "tab", "separated"],
    inputFormats: ["tsv", "tab separated", "json"],
    outputFormats: ["tsv", "tab separated", "json"],
    internalFeatures: ["tab delimiter handling", "header detection", "bidirectional conversion"],
  },
  {
    name: "INI ↔ JSON Converter",
    description: "Convert INI configuration files to JSON and vice versa with section handling",
    category: "Data Converters",
    href: "/tools/ini-converter",
    tags: ["ini", "json", "config", "convert", "configuration"],
    inputFormats: ["ini", "config", "configuration", "json"],
    outputFormats: ["ini", "config", "json"],
    internalFeatures: ["section handling", "comment preservation", "bidirectional conversion"],
  },
  {
    name: "Timestamp Converter",
    description: "Convert Unix timestamps to human-readable dates and vice versa with support for multiple formats",
    category: "Data Converters",
    href: "/tools/timestamp-converter",
    tags: ["timestamp", "unix", "epoch", "date", "time", "convert", "developer"],
    inputFormats: ["unix timestamp", "epoch time", "date", "time", "iso date"],
    outputFormats: ["human readable date", "unix timestamp", "epoch time", "formatted date"],
    internalFeatures: ["multiple date formats", "timezone support", "epoch conversion", "date validation"],
  },
  {
    name: "Universal Data Converter",
    description:
      "Convert between multiple data formats: JSON, YAML, XML, CSV, TSV, INI, TOML, BSON, NDJSON, SQL, MessagePack with format detection",
    category: "Data Converters",
    href: "/tools/universal-converter",
    tags: ["universal", "convert", "multiple", "formats", "all", "any"],
    inputFormats: [
      "json",
      "yaml",
      "xml",
      "csv",
      "tsv",
      "ini",
      "toml",
      "bson",
      "ndjson",
      "sql",
      "messagepack",
      "any format",
    ],
    outputFormats: ["json", "yaml", "xml", "csv", "tsv", "ini", "toml", "bson", "ndjson", "sql", "messagepack"],
    internalFeatures: ["format detection", "nested parsing", "multiple format support", "swap functionality"],
  },
  {
    name: "Data Unit Converter",
    description: "Convert between data storage units like bits, bytes, KB, MB, GB, TB, KiB, MiB, GiB and other storage units with decimal and binary conversions",
    category: "Data Converters",
    href: "/tools/data-unit-converter",
    tags: [
      "data", 
      "units", 
      "bits", 
      "bytes", 
      "kb", 
      "mb", 
      "gb", 
      "tb", 
      "kib", 
      "mib", 
      "gib", 
      "storage", 
      "convert", 
      "size",
      "storage converter",
      "data converter",
      "bytes to mb",
      "gb to tb", 
      "kb to bytes",
      "bytes to kb",
      "mb to gb",
      "storage units"
    ],
    inputFormats: ["bits", "bytes", "kilobytes", "megabytes", "gigabytes", "terabytes", "kibibytes", "mebibytes", "gibibytes", "storage units", "kb", "mb", "gb", "tb"],
    outputFormats: ["bits", "bytes", "kilobytes", "megabytes", "gigabytes", "terabytes", "kibibytes", "mebibytes", "gibibytes", "storage units", "kb", "mb", "gb", "tb"],
    internalFeatures: ["unit categories", "decimal and binary units", "real-time conversion", "unit comparisons", "bytes to MB conversion", "GB to TB conversion", "KB to bytes conversion"],
  },

  // Encoders & Decoders
  {
    name: "Base64 Encoder & Decoder",
    description: "Encode and decode Base64 strings with file support, image handling, and multiple encoding types",
    category: "Encoders & Decoders",
    href: "/tools/base64-encoder",
    tags: ["base64", "encode", "decode", "file", "image", "text"],
    inputFormats: ["text", "file", "image", "binary", "string"],
    outputFormats: ["base64", "text", "decoded"],
    internalFeatures: ["file upload", "image support", "bidirectional conversion", "copy functionality"],
  },
  {
    name: "URL Encoder & Decoder",
    description: "Encode and decode URLs with different encoding types: URI Component, URL Encode, Form Data, Base64",
    category: "Encoders & Decoders",
    href: "/tools/url-encoder",
    tags: ["url", "encode", "decode", "percent", "uri", "component", "form"],
    inputFormats: ["url", "text", "uri", "form data"],
    outputFormats: ["encoded url", "decoded url", "percent encoded", "uri component"],
    internalFeatures: [
      "multiple encoding types",
      "URI component encoding",
      "form data encoding",
      "bidirectional conversion",
    ],
  },
  {
    name: "JWT Decoder & Validator",
    description: "Decode and validate JSON Web Tokens with header/payload inspection and signature verification",
    category: "Encoders & Decoders",
    href: "/tools/jwt-decoder",
    tags: ["jwt", "decode", "token", "validate", "json web token"],
    inputFormats: ["jwt", "token", "json web token"],
    outputFormats: ["json", "decoded payload", "header", "signature"],
    internalFeatures: ["header inspection", "payload extraction", "signature verification", "expiration checking"],
  },
  {
    name: "Base64, Binary & Number System Converter",
    description:
      "Convert between Base64, Binary, Decimal, Hex, Octal, BCD, Gray Code, Excess-3, ASCII, Unicode. Supports text, files, and images with multiple number systems for electronics and computer science",
    category: "Encoders & Decoders",
    href: "/tools/base64-binary-converter",
    tags: [
      "base64",
      "binary",
      "hex",
      "decimal",
      "octal",
      "ascii",
      "unicode",
      "image",
      "file",
      "number system",
      "bcd",
      "gray code",
      "excess-3",
      "electronics",
      "converter",
      "number converter",
      "binary converter",
      "electronics converter",
      "text to bcd",
      "text to excess-3",
      "bcd to excess-3",
      "binary to gray code",
      "decimal to bcd",
    ],
    inputFormats: [
      "base64",
      "binary",
      "decimal",
      "hex",
      "hexadecimal",
      "octal",
      "ascii",
      "unicode",
      "text",
      "file",
      "image",
      "bcd",
      "gray code",
      "excess-3",
      "number",
    ],
    outputFormats: [
      "base64",
      "binary",
      "decimal",
      "hex",
      "hexadecimal",
      "octal",
      "ascii",
      "unicode",
      "text",
      "bcd",
      "gray code",
      "excess-3",
      "image",
    ],
    internalFeatures: [
      "multiple number systems",
      "image conversion",
      "file upload",
      "format selection",
      "bidirectional conversion",
      "number base conversion",
      "BCD to Excess-3 conversion",
      "text to BCD conversion",
      "binary to gray code conversion",
    ],
  },
  {
    name: "Image to Binary and Base64 Converter",
    description:
      "Convert images to/from Base64 and binary with live preview, format conversion, quality control, and download support",
    category: "Encoders & Decoders",
    href: "/tools/image-base64-converter",
    tags: ["image", "base64", "binary", "convert", "preview", "jpg", "png", "gif", "webp", "photo"],
    inputFormats: ["image", "jpg", "jpeg", "png", "gif", "webp", "bmp", "svg", "base64", "photo", "picture"],
    outputFormats: ["base64", "binary", "image", "jpg", "jpeg", "png", "webp", "download"],
    internalFeatures: [
      "live preview",
      "drag and drop",
      "format conversion",
      "quality control",
      "binary view",
      "download support",
    ],
  },

  // Text Transformers
  {
    name: "String Case Converter",
    description:
      "Convert text between different cases: camelCase, snake_case, kebab-case, PascalCase, CONSTANT_CASE, Title Case",
    category: "Text Transformers",
    href: "/tools/string-converter",
    tags: ["string", "case", "camel", "snake", "pascal", "kebab", "constant", "title", "text"],
    inputFormats: ["text", "string", "code", "variable names"],
    outputFormats: ["camelcase", "snake_case", "kebab-case", "pascalcase", "constant_case", "title case"],
    internalFeatures: ["multiple case types", "variable name conversion", "code formatting"],
  },
  {
    name: "Morse Code Translator",
    description: "Convert text to/from Morse code with audio playback, SOS signals, and international morse support",
    category: "Text Transformers",
    href: "/tools/morse-code-translator",
    tags: ["morse", "code", "translate", "audio", "sos", "telegraph", "dots", "dashes"],
    inputFormats: ["text", "morse code", "dots and dashes"],
    outputFormats: ["morse code", "text", "audio", "sos"],
    internalFeatures: ["audio playback", "SOS generation", "international morse", "bidirectional conversion"],
  },
  {
    name: "Leet Speak Converter",
    description: "Convert text to/from 1337 speak with multiple levels and gaming/hacker style text",
    category: "Text Transformers",
    href: "/tools/leet-speak-converter",
    tags: ["leet", "1337", "speak", "convert", "hacker", "gaming", "l33t"],
    inputFormats: ["text", "leet speak", "1337", "l33t"],
    outputFormats: ["leet speak", "1337", "l33t", "text"],
    internalFeatures: ["multiple leet levels", "gaming style", "hacker text", "bidirectional conversion"],
  },
  {
    name: "Pig Latin Translator",
    description: "Convert English to Pig Latin with proper grammar rules and word handling",
    category: "Text Transformers",
    href: "/tools/pig-latin-translator",
    tags: ["pig", "latin", "translate", "english", "word game"],
    inputFormats: ["english", "text", "pig latin"],
    outputFormats: ["pig latin", "english", "text"],
    internalFeatures: ["grammar rules", "word handling", "bidirectional conversion"],
  },
  {
    name: "Upside Down Text Generator",
    description: "Flip text upside down using Unicode characters for social media and fun text effects",
    category: "Text Transformers",
    href: "/tools/upside-down-text",
    tags: ["upside", "down", "flip", "unicode", "social media", "fun"],
    inputFormats: ["text", "normal text"],
    outputFormats: ["upside down text", "flipped text", "unicode"],
    internalFeatures: ["unicode conversion", "social media ready", "copy functionality"],
  },
  {
    name: "Zalgo Text Generator",
    description: "Create creepy glitched text with combining characters and customizable chaos levels",
    category: "Text Transformers",
    href: "/tools/zalgo-text-generator",
    tags: ["zalgo", "glitch", "creepy", "text", "chaos", "combining characters"],
    inputFormats: ["text", "normal text"],
    outputFormats: ["zalgo text", "glitched text", "creepy text"],
    internalFeatures: ["chaos level control", "combining characters", "creepy effects"],
  },
  {
    name: "Case Converter",
    description: "Convert between camelCase, snake_case, kebab-case, PascalCase, and CONSTANT_CASE for programming",
    category: "Text Transformers",
    href: "/tools/case-converter",
    tags: ["case", "camel", "snake", "kebab", "pascal", "constant", "programming"],
    inputFormats: ["text", "variable names", "code"],
    outputFormats: ["camelcase", "snake_case", "kebab-case", "pascalcase", "constant_case"],
    internalFeatures: ["programming focused", "variable naming", "code conversion"],
  },
  {
    name: "Text Reverser & Zigzag",
    description: "Reverse text and create zigzag patterns with various text manipulation options",
    category: "Text Transformers",
    href: "/tools/text-reverser",
    tags: ["reverse", "zigzag", "pattern", "text", "manipulation"],
    inputFormats: ["text"],
    outputFormats: ["reversed text", "zigzag text", "pattern text"],
    internalFeatures: ["text reversal", "zigzag patterns", "pattern creation"],
  },
  {
    name: "ROT13 & Caesar Cipher",
    description: "Encode/decode with ROT13 and custom Caesar shifts with historical cipher support",
    category: "Text Transformers",
    href: "/tools/rot13-caesar",
    tags: ["rot13", "caesar", "cipher", "encode", "decode", "shift"],
    inputFormats: ["text", "cipher text"],
    outputFormats: ["rot13", "caesar cipher", "encoded text", "decoded text"],
    internalFeatures: ["custom shifts", "ROT13", "caesar cipher", "historical ciphers"],
  },
  {
    name: "Text Repeater & Duplicator",
    description: "Repeat text with custom patterns, separators, and multiple repetition options",
    category: "Text Transformers",
    href: "/tools/text-repeater",
    tags: ["repeat", "duplicate", "pattern", "text", "multiple"],
    inputFormats: ["text"],
    outputFormats: ["repeated text", "duplicated text", "pattern text"],
    internalFeatures: ["custom separators", "pattern creation", "repetition control"],
  },
  {
    name: "Emoji Translator",
    description: "Translate words or phrases into sequences of emojis for fun messages",
    category: "Text Transformers",
    href: "/tools/emoji-translator",
    tags: ["emoji", "translate", "fun", "text", "social media"],
    inputFormats: ["text", "words", "phrases", "sentences"],
    outputFormats: ["emoji sequence", "emoji text", "fun messages"],
    internalFeatures: ["emoji dictionary", "phrase translation", "social media ready"],
  },
  {
    name: "ASCII Art Generator",
    description: "Convert images or text into ASCII art for plain text environments",
    category: "Text Transformers",
    href: "/tools/ascii-art-generator",
    tags: ["ascii", "art", "generator", "image", "text", "creative"],
    inputFormats: ["image", "text", "photo", "picture"],
    outputFormats: ["ascii art", "text art", "plain text art"],
    internalFeatures: ["image conversion", "text styling", "art generation", "plain text output"],
  },

  // Generators
  {
    name: "UUID Generator",
    description: "Generate UUID v1, v4 and other variants with bulk generation, validation, and format options",
    category: "Generators",
    href: "/tools/uuid-generator",
    tags: ["uuid", "generate", "unique", "identifier", "guid", "v1", "v4"],
    inputFormats: [],
    outputFormats: ["uuid", "guid", "unique identifier", "uuid v1", "uuid v4"],
    internalFeatures: ["bulk generation", "UUID validation", "multiple versions", "format options"],
  },
  {
    name: "Password Generator",
    description: "Generate secure passwords with customizable length, character sets, and security options",
    category: "Generators",
    href: "/tools/password-generator",
    tags: ["password", "generate", "secure", "random", "strong"],
    inputFormats: [],
    outputFormats: ["password", "secure password", "strong password"],
    internalFeatures: ["length control", "character sets", "security options", "strength meter"],
  },
  {
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text with word/paragraph control, different variants, and custom length",
    category: "Generators",
    href: "/tools/lorem-ipsum",
    tags: ["lorem", "ipsum", "placeholder", "text", "dummy", "filler"],
    inputFormats: [],
    outputFormats: ["lorem ipsum", "placeholder text", "dummy text", "filler text"],
    internalFeatures: ["word control", "paragraph control", "length options", "text variants"],
  },
  {
    name: "Color Palette Generator",
    description: "Generate beautiful color palettes with hex/rgb values, color schemes, and export options",
    category: "Generators",
    href: "/tools/color-generator",
    tags: ["color", "palette", "generate", "hex", "rgb", "scheme"],
    inputFormats: [],
    outputFormats: ["color", "hex", "rgb", "color palette", "color scheme"],
    internalFeatures: ["color schemes", "hex values", "rgb values", "palette export"],
  },
  {
    name: "Meta Tag Generator",
    description: "Generate SEO-optimized meta tags for better search engine visibility and social media sharing",
    category: "Generators",
    href: "/tools/meta-tag-generator",
    tags: ["meta tags", "seo", "open graph", "twitter card", "html", "social media", "generate"],
    inputFormats: ["website info", "title", "description", "keywords", "social media data"],
    outputFormats: ["meta tags", "html", "open graph tags", "twitter cards", "seo tags"],
    internalFeatures: ["SEO optimization", "social media tags", "Open Graph", "Twitter Cards", "HTML generation"],
  },
  {
    name: "Robots.txt Generator",
    description: "Generate robots.txt files to control search engine crawling with sitemap URLs and user-agent rules",
    category: "Generators",
    href: "/tools/robots-txt-generator",
    tags: ["robots.txt", "seo", "crawling", "search engine", "sitemap", "user-agent", "generate"],
    inputFormats: ["website info", "sitemap url", "user agent rules", "crawling preferences"],
    outputFormats: ["robots.txt", "text file", "crawling rules", "search engine directives"],
    internalFeatures: ["crawling control", "sitemap integration", "user-agent rules", "SEO optimization"],
  },
  {
    name: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes for text and files with verification",
    category: "Generators",
    href: "/tools/hash-generator",
    tags: ["hash", "md5", "sha", "generate", "checksum", "file"],
    inputFormats: ["text", "file", "string"],
    outputFormats: ["hash", "md5", "sha1", "sha256", "sha512", "checksum"],
    internalFeatures: ["multiple hash types", "file support", "hash verification", "checksum generation"],
  },

  // Testing & Validation
  {
    name: "JSON Validator",
    description: "Validate JSON syntax with detailed error reporting, line numbers, and formatting suggestions",
    category: "Testing & Validation",
    href: "/tools/json-validator",
    tags: ["json", "validate", "syntax", "error", "check", "minify", "beautify", "minified"],
    inputFormats: ["json", "json string"],
    outputFormats: ["validation result", "error report", "formatted json"],
    internalFeatures: ["syntax validation", "error reporting", "line numbers", "formatting suggestions"],
  },
  {
    name: "Regex Tester & Generator",
    description: "Test regular expressions with match highlighting, pattern explanation, and regex generation",
    category: "Testing & Validation",
    href: "/tools/regex-tester",
    tags: ["regex", "test", "pattern", "match", "regular expression"],
    inputFormats: ["regex", "pattern", "text"],
    outputFormats: ["matches", "regex result", "pattern explanation"],
    internalFeatures: ["match highlighting", "pattern explanation", "regex generation", "test cases"],
  },
  {
    name: "URL Tester & Validator",
    description: "Test URL accessibility, validate URL format, and check HTTP status codes",
    category: "Testing & Validation",
    href: "/tools/url-tester",
    tags: ["url", "test", "validate", "accessibility", "http", "status"],
    inputFormats: ["url", "link"],
    outputFormats: ["validation result", "status code", "accessibility report"],
    internalFeatures: ["accessibility testing", "status code checking", "URL validation", "response analysis"],
  },
  {
    name: "Cron Expression Tester",
    description: "Test and validate cron expressions with next run times, schedule preview, and syntax help",
    category: "Testing & Validation",
    href: "/tools/cron-tester",
    tags: ["cron", "test", "schedule", "expression", "time"],
    inputFormats: ["cron", "cron expression"],
    outputFormats: ["schedule", "next run times", "validation result"],
    internalFeatures: ["schedule preview", "next run calculation", "syntax validation", "cron help"],
  },

  // Formatters
  {
    name: "JavaScript Formatter",
    description: "Minify or beautify JavaScript code with syntax highlighting and error detection",
    category: "Formatters",
    href: "/tools/js-formatter",
    tags: ["javascript", "minify", "beautify", "format", "js"],
    inputFormats: ["javascript", "js", "code"],
    outputFormats: ["minified js", "beautified js", "formatted javascript"],
    internalFeatures: ["syntax highlighting", "error detection", "minification", "beautification"],
  },
  {
    name: "CSS Formatter",
    description: "Minify or beautify CSS stylesheets with property sorting and optimization",
    category: "Formatters",
    href: "/tools/css-formatter",
    tags: ["css", "minify", "beautify", "format", "stylesheet"],
    inputFormats: ["css", "stylesheet", "style"],
    outputFormats: ["minified css", "beautified css", "formatted css"],
    internalFeatures: ["property sorting", "optimization", "minification", "beautification"],
  },
  {
    name: "HTML Formatter",
    description: "Minify or beautify HTML markup with tag formatting and validation",
    category: "Formatters",
    href: "/tools/html-formatter",
    tags: ["html", "minify", "beautify", "format", "markup"],
    inputFormats: ["html", "markup", "web page"],
    outputFormats: ["minified html", "beautified html", "formatted html"],
    internalFeatures: ["tag formatting", "validation", "minification", "beautification"],
  },
  {
    name: "SQL Formatter",
    description: "Format and beautify SQL queries with support for multiple dialects including MySQL, PostgreSQL, SQL Server, and Oracle",
    category: "Formatters",
    href: "/tools/sql-formatter",
    tags: ["sql", "format", "beautify", "mysql", "postgresql", "database"],
    inputFormats: ["sql", "query", "database query"],
    outputFormats: ["formatted sql", "beautified sql", "structured query"],
    internalFeatures: ["multiple dialects", "query optimization", "syntax highlighting", "formatting"],
  },

  // Difference Checkers
  {
    name: "Text Difference Checker",
    description: "Compare two texts and highlight differences with line-by-line comparison and merge options",
    category: "Difference Checkers",
    href: "/tools/text-diff",
    tags: ["text", "diff", "compare", "difference", "merge"],
    inputFormats: ["text", "document"],
    outputFormats: ["diff", "comparison", "highlighted differences"],
    internalFeatures: ["line-by-line comparison", "difference highlighting", "merge options", "side-by-side view"],
  },
  {
    name: "Image Difference Checker",
    description: "Compare two images and highlight visual differences with overlay and analysis tools",
    category: "Difference Checkers",
    href: "/tools/image-diff",
    tags: ["image", "diff", "compare", "visual", "photo"],
    inputFormats: ["image", "photo", "jpg", "png"],
    outputFormats: ["diff", "visual comparison", "highlighted differences"],
    internalFeatures: ["visual comparison", "difference overlay", "analysis tools", "side-by-side view"],
  },

  // Hashing & Checksums
  {
    name: "MD5 Hash Generator",
    description: "Generate MD5 hashes with verification, file support, and checksum validation",
    category: "Hashing & Checksums",
    href: "/tools/md5-generator",
    tags: ["md5", "hash", "generate", "checksum", "file"],
    inputFormats: ["text", "file", "string"],
    outputFormats: ["md5", "hash", "checksum"],
    internalFeatures: ["file support", "hash verification", "checksum validation"],
  },
  {
    name: "SHA-1 Hash Generator",
    description: "Generate SHA-1 hashes for text and files with security analysis",
    category: "Hashing & Checksums",
    href: "/tools/sha1-generator",
    tags: ["sha1", "hash", "generate", "secure", "file"],
    inputFormats: ["text", "file", "string"],
    outputFormats: ["sha1", "hash", "secure hash"],
    internalFeatures: ["file support", "security analysis", "hash verification"],
  },
  {
    name: "SHA-256 Hash Generator",
    description: "Generate SHA-256 hashes with high security and cryptographic strength",
    category: "Hashing & Checksums",
    href: "/tools/sha256-generator",
    tags: ["sha256", "hash", "generate", "security", "cryptographic"],
    inputFormats: ["text", "file", "string"],
    outputFormats: ["sha256", "hash", "secure hash"],
    internalFeatures: ["high security", "cryptographic strength", "file support"],
  },
  {
    name: "SHA-512 Hash Generator",
    description: "Generate SHA-512 hashes with maximum security for critical applications",
    category: "Hashing & Checksums",
    href: "/tools/sha512-generator",
    tags: ["sha512", "hash", "generate", "maximum", "security"],
    inputFormats: ["text", "file", "string"],
    outputFormats: ["sha512", "hash", "maximum security hash"],
    internalFeatures: ["maximum security", "critical applications", "file support"],
  },
  {
    name: "HMAC Generator",
    description: "Generate Hash-based Message Authentication Code with custom keys and algorithms",
    category: "Hashing & Checksums",
    href: "/tools/hmac-generator",
    tags: ["hmac", "hash", "authentication", "message", "key"],
    inputFormats: ["text", "message", "key"],
    outputFormats: ["hmac", "authenticated hash", "message authentication code"],
    internalFeatures: ["custom keys", "multiple algorithms", "message authentication"],
  },
  {
    name: "CRC32 Checksum",
    description: "Generate CRC32 checksums for data integrity verification and error detection",
    category: "Hashing & Checksums",
    href: "/tools/crc32-generator",
    tags: ["crc32", "checksum", "integrity", "data", "error detection"],
    inputFormats: ["text", "file", "data"],
    outputFormats: ["crc32", "checksum", "integrity hash"],
    internalFeatures: ["data integrity", "error detection", "file support"],
  },
  {
    name: "Hash Verifier",
    description: "Compare and verify hash values for file integrity checking and validation",
    category: "Hashing & Checksums",
    href: "/tools/hash-verifier",
    tags: ["hash", "verify", "compare", "check", "integrity"],
    inputFormats: ["hash", "file", "checksum"],
    outputFormats: ["verification result", "comparison", "integrity status"],
    internalFeatures: ["hash comparison", "integrity checking", "verification status"],
  },
  {
    name: "File Hash Calculator",
    description: "Calculate multiple hash types for files simultaneously with batch processing",
    category: "Hashing & Checksums",
    href: "/tools/file-hash-calculator",
    tags: ["file", "hash", "calculate", "multiple", "batch"],
    inputFormats: ["file", "multiple files"],
    outputFormats: ["multiple hashes", "hash report", "file analysis"],
    internalFeatures: ["multiple hash types", "batch processing", "file analysis"],
  },
  {
    name: "Bcrypt Hash Generator",
    description: "Generate bcrypt hashes for secure password storage with salt and rounds control",
    category: "Hashing & Checksums",
    href: "/tools/bcrypt-generator",
    tags: ["bcrypt", "password", "hash", "secure", "salt"],
    inputFormats: ["password", "text"],
    outputFormats: ["bcrypt hash", "secure hash", "salted hash"],
    internalFeatures: ["salt generation", "rounds control", "password security"],
  },
  {
    name: "Argon2 Hash Generator",
    description: "Generate Argon2 hashes for modern password security with memory-hard functions",
    category: "Hashing & Checksums",
    href: "/tools/argon2-generator",
    tags: ["argon2", "password", "hash", "modern", "memory"],
    inputFormats: ["password", "text"],
    outputFormats: ["argon2 hash", "modern hash", "memory-hard hash"],
    internalFeatures: ["memory-hard function", "modern security", "password protection"],
  },

  // Encryption & Decryption
  {
    name: "AES Encryption/Decryption",
    description: "Encrypt/decrypt text using Advanced Encryption Standard with multiple modes and key sizes",
    category: "Encryption & Decryption",
    href: "/tools/aes-encryption",
    tags: ["aes", "encrypt", "decrypt", "advanced", "symmetric"],
    inputFormats: ["text", "plaintext", "encrypted text"],
    outputFormats: ["encrypted", "decrypted", "ciphertext"],
    internalFeatures: ["multiple modes", "key sizes", "symmetric encryption"],
  },
  {
    name: "RSA Encryption/Decryption",
    description: "Public-key cryptography with RSA algorithm, key generation, and digital signatures",
    category: "Encryption & Decryption",
    href: "/tools/rsa-encryption",
    tags: ["rsa", "encrypt", "decrypt", "public", "private", "key"],
    inputFormats: ["text", "public key", "private key"],
    outputFormats: ["encrypted", "decrypted", "digital signature"],
    internalFeatures: ["key generation", "digital signatures", "public-key cryptography"],
  },
  {
    name: "DES/3DES Encryption",
    description: "Legacy DES and Triple DES encryption algorithms with compatibility modes",
    category: "Encryption & Decryption",
    href: "/tools/des-encryption",
    tags: ["des", "3des", "encrypt", "legacy", "triple"],
    inputFormats: ["text", "plaintext"],
    outputFormats: ["encrypted", "des encrypted", "3des encrypted"],
    internalFeatures: ["legacy support", "triple DES", "compatibility modes"],
  },
  {
    name: "Blowfish Encryption",
    description: "Fast symmetric cipher encryption and decryption with variable key lengths",
    category: "Encryption & Decryption",
    href: "/tools/blowfish-encryption",
    tags: ["blowfish", "encrypt", "symmetric", "fast", "cipher"],
    inputFormats: ["text", "plaintext"],
    outputFormats: ["encrypted", "blowfish encrypted"],
    internalFeatures: ["variable key lengths", "fast encryption", "symmetric cipher"],
  },
  {
    name: "Caesar Cipher",
    description: "Classic shift cipher with custom shift values and alphabet support",
    category: "Encryption & Decryption",
    href: "/tools/caesar-cipher",
    tags: ["caesar", "cipher", "shift", "classic", "alphabet"],
    inputFormats: ["text", "plaintext"],
    outputFormats: ["cipher", "encrypted", "shifted text"],
    internalFeatures: ["custom shifts", "alphabet support", "classic cipher"],
  },
  {
    name: "Vigenère Cipher",
    description: "Polyalphabetic cipher with keyword encryption and historical cipher support",
    category: "Encryption & Decryption",
    href: "/tools/vigenere-cipher",
    tags: ["vigenere", "cipher", "polyalphabetic", "keyword", "historical"],
    inputFormats: ["text", "keyword"],
    outputFormats: ["cipher", "encrypted", "vigenere encrypted"],
    internalFeatures: ["keyword encryption", "polyalphabetic", "historical cipher"],
  },
  {
    name: "Fernet Encryption",
    description: "Python-style symmetric encryption with timestamps and authenticated encryption",
    category: "Encryption & Decryption",
    href: "/tools/fernet-encryption",
    tags: ["fernet", "encrypt", "python", "symmetric", "authenticated"],
    inputFormats: ["text", "plaintext"],
    outputFormats: ["encrypted", "fernet encrypted", "authenticated"],
    internalFeatures: ["timestamps", "authenticated encryption", "python compatibility"],
  },
  {
    name: "PGP Encryption/Decryption",
    description: "Pretty Good Privacy encryption and decryption with key management",
    category: "Encryption & Decryption",
    href: "/tools/pgp-encryption",
    tags: ["pgp", "encrypt", "decrypt", "privacy", "gpg"],
    inputFormats: ["text", "public key", "private key"],
    outputFormats: ["encrypted", "decrypted", "pgp encrypted"],
    internalFeatures: ["key management", "privacy protection", "GPG compatibility"],
  },
  {
    name: "Password Encryption Tool",
    description: "Encrypt passwords with various algorithms for secure storage and authentication",
    category: "Encryption & Decryption",
    href: "/tools/password-encryption",
    tags: ["password", "encrypt", "secure", "algorithm", "storage"],
    inputFormats: ["password", "plaintext"],
    outputFormats: ["encrypted password", "secure hash", "encrypted"],
    internalFeatures: ["multiple algorithms", "secure storage", "authentication"],
  },
  {
    name: "JWT Token Generator",
    description: "Generate signed JSON Web Tokens with custom claims, algorithms, and expiration",
    category: "Encryption & Decryption",
    href: "/tools/jwt-generator",
    tags: ["jwt", "token", "generate", "signed", "claims"],
    inputFormats: ["claims", "payload", "secret"],
    outputFormats: ["jwt", "signed token", "json web token"],
    internalFeatures: ["custom claims", "multiple algorithms", "expiration control"],
  },

  // Digital Signatures
  {
    name: "Digital Signature",
    description: "Create and verify digital signatures for data integrity and authentication",
    category: "Digital Signatures",
    href: "/tools/digital-signature",
    tags: ["digital signature", "authentication", "integrity", "verification", "cryptography"],
    inputFormats: ["data", "message", "document", "file"],
    outputFormats: ["digital signature", "signed data", "verification result"],
    internalFeatures: ["signature creation", "verification", "integrity checking", "authentication"],
  },
  {
    name: "ElGamal Digital Signature",
    description: "Create and verify digital signatures using the ElGamal algorithm",
    category: "Digital Signatures",
    href: "/tools/elgamal-signature",
    tags: ["elgamal", "digital signature", "public key", "authentication", "cryptography"],
    inputFormats: ["data", "message", "public key", "private key"],
    outputFormats: ["elgamal signature", "signed data", "verification result"],
    internalFeatures: ["ElGamal algorithm", "public key cryptography", "signature verification"],
  },

  // Cryptographic Simulators
  {
    name: "Key Exchange Simulator",
    description: "Simulate secure key exchange protocols like Diffie-Hellman",
    category: "Cryptographic Simulators",
    href: "/tools/key-exchange-simulator",
    tags: ["key exchange", "diffie-hellman", "protocol", "simulation", "secure communication"],
    inputFormats: ["public parameters", "private keys"],
    outputFormats: ["shared secret", "simulation result", "protocol steps"],
    internalFeatures: ["Diffie-Hellman simulation", "protocol visualization", "educational"],
  },
  {
    name: "RSA Algorithm Simulator",
    description: "Interactive simulation of RSA key generation, encryption and decryption process",
    category: "Cryptographic Simulators",
    href: "/tools/rsa-simulator",
    tags: ["rsa", "asymmetric", "simulation", "educational", "encryption"],
    inputFormats: ["message", "public key", "private key"],
    outputFormats: ["encrypted message", "decrypted message", "simulation steps"],
    internalFeatures: ["RSA simulation", "key generation", "step-by-step process", "educational"],
  },
  {
    name: "Hashing Algorithm Visualizer",
    description: "Visualize how different hashing algorithms transform input data",
    category: "Cryptographic Simulators",
    href: "/tools/hash-visualizer",
    tags: ["hash", "visualization", "educational", "algorithm", "cryptography"],
    inputFormats: ["data", "text", "file"],
    outputFormats: ["hash visualization", "algorithm steps", "educational content"],
    internalFeatures: ["algorithm visualization", "step-by-step process", "educational content"],
  },
  {
    name: "Block Cipher Simulator",
    description: "Simulate the operations of block ciphers like AES and DES",
    category: "Cryptographic Simulators",
    href: "/tools/block-cipher-simulator",
    tags: ["block cipher", "aes", "des", "modes", "simulation"],
    inputFormats: ["plaintext", "key", "initialization vector"],
    outputFormats: ["ciphertext", "simulation steps", "mode visualization"],
    internalFeatures: ["AES simulation", "DES simulation", "mode visualization", "educational"],
  },
  {
    name: "Random Number Generator Simulator",
    description: "Visualize and compare different cryptographic random number generation algorithms",
    category: "Cryptographic Simulators",
    href: "/tools/rng-simulator",
    tags: ["rng", "prng", "csprng", "entropy", "randomness"],
    inputFormats: ["seed", "parameters"],
    outputFormats: ["random numbers", "entropy analysis", "algorithm comparison"],
    internalFeatures: ["algorithm comparison", "entropy analysis", "randomness testing", "educational"],
  },

  // QR Code & Barcode Generators
  {
    name: "QR Code Generator",
    description: "Create custom QR codes for URLs, text, WiFi, contacts, and more with customization options",
    category: "QR Code & Barcode Generators",
    href: "/tools/qr-code-generator",
    tags: ["qr code", "generate", "url", "wifi", "contact", "sms", "email", "custom"],
    inputFormats: ["url", "text", "phone number", "email", "contact info", "wifi details"],
    outputFormats: ["qr code", "png", "svg", "jpg", "downloadable image"],
    internalFeatures: ["custom colors", "logo overlay", "error correction", "size control", "format options"],
  },
  {
    name: "Barcode Generator",
    description: "Generate various barcode formats including Code128, Code39, EAN, UPC, and more",
    category: "QR Code & Barcode Generators",
    href: "/tools/barcode-generator",
    tags: ["barcode", "code128", "code39", "ean", "upc", "generate", "product"],
    inputFormats: ["text", "numbers", "product codes", "inventory codes"],
    outputFormats: ["barcode", "png", "svg", "jpg", "downloadable image"],
    internalFeatures: ["multiple formats", "validation", "size control", "format options"],
  },
  {
    name: "WiFi QR Generator",
    description: "Generate QR codes for WiFi network sharing with password encryption",
    category: "QR Code & Barcode Generators",
    href: "/tools/wifi-qr-generator",
    tags: ["wifi", "qr code", "network", "password", "share", "connect"],
    inputFormats: ["wifi name", "password", "security type", "network details"],
    outputFormats: ["wifi qr code", "png", "svg", "jpg", "downloadable image"],
    internalFeatures: ["security type selection", "password encryption", "auto-connect", "format options"],
  },
  {
    name: "vCard QR Generator",
    description: "Generate QR codes for contact information sharing (vCard format)",
    category: "QR Code & Barcode Generators",
    href: "/tools/vcard-qr-generator",
    tags: ["vcard", "contact", "qr code", "business card", "share", "contact info"],
    inputFormats: ["name", "phone", "email", "address", "company", "contact details"],
    outputFormats: ["vcard qr code", "png", "svg", "jpg", "downloadable image"],
    internalFeatures: ["contact fields", "business card format", "contact sharing", "format options"],
  },
  {
    name: "Bulk QR Generator",
    description: "Generate multiple QR codes at once from CSV or text list",
    category: "QR Code & Barcode Generators",
    href: "/tools/bulk-qr-generator",
    tags: ["bulk", "multiple", "qr code", "csv", "batch", "mass generation"],
    inputFormats: ["csv file", "excel file", "text list", "bulk data"],
    outputFormats: ["multiple qr codes", "zip file", "individual images", "batch download"],
    internalFeatures: ["csv import", "excel import", "batch processing", "zip download", "customization"],
  },
]

const categories = [
  "All Categories",
  "Data Converters",
  "Encoders & Decoders",
  "Text Transformers",
  "Generators",
  "Testing & Validation",
  "Formatters",
  "Difference Checkers",
  "Hashing & Checksums",
  "Encryption & Decryption",
  "Digital Signatures",
  "Cryptographic Simulators",
  "QR Code & Barcode Generators",
]

const popularSearches = [
  "JSON formatter",
  "Base64 encoder",
  "UUID Generator",
  "Password generator",
  "Hash generator",
  "URL encoder",
  "Text converter",
  "Image converter",
  "Number system converter",
  "Electronics converter",
  "Binary converter",
  "Data unit converter",
  "Storage converter",
  "File converter",
  "Color generator",
  "QR code generator",
  "Text transformer",
  "String converter",
]

const conversionSuggestions = [
  { input: "JSON", output: "YAML" },
  { input: "Image", output: "Base64" },
  { input: "Text", output: "Hash" },
  { input: "CSV", output: "JSON" },
  { input: "XML", output: "JSON" },
  { input: "Text", output: "Morse" },
  { input: "URL", output: "Encoded" },
  { input: "Password", output: "Hash" },
  { input: "Text", output: "Binary" },
  { input: "Binary", output: "Decimal" },
  { input: "Decimal", output: "Hex" },
  { input: "Binary", output: "Octal" },
  { input: "Bytes", output: "KB" },
  { input: "KB", output: "MB" },
  { input: "MB", output: "GB" },
  { input: "GB", output: "TB" },
  { input: "Base64", output: "Text" },
  { input: "Hex", output: "Binary" },
]

interface SearchToolsProps {
  defaultCategory?: string
}

// Enhanced search features
interface SearchHistoryItem {
  query: string
  timestamp: number
  results: number
}

interface FavoriteTool {
  href: string
  name: string
  category: string
  addedAt: number
}

interface SearchAnalytics {
  totalSearches: number
  popularQueries: { [key: string]: number }
  categoryUsage: { [key: string]: number }
}

export function SearchTools({ defaultCategory }: SearchToolsProps = {}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [inputFormat, setInputFormat] = useState("")
  const [outputFormat, setOutputFormat] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory || "All Categories")
  const [searchMode, setSearchMode] = useState<"simple" | "conversion">("simple")
  const [showResults, setShowResults] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingTool, setLoadingTool] = useState<string | null>(null)

  // Enhanced Search Features state
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [includeFavorites, setIncludeFavorites] = useState(false)
  const [sortBy, setSortBy] = useState<"relevance" | "name" | "category" | "popularity">("relevance")
  const [showOnlyNew, setShowOnlyNew] = useState(false)
  const [complexityFilter, setComplexityFilter] = useState<"all" | "simple" | "advanced">("all")

  // Enhanced search features
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([])
  const [favoriteTools, setFavoriteTools] = useState<FavoriteTool[]>([])
  const [searchAnalytics, setSearchAnalytics] = useState<SearchAnalytics>({
    totalSearches: 0,
    popularQueries: {},
    categoryUsage: {}
  })

  // Client-side detection to prevent hydration errors
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Performance tracking
  const [searchPerformance, setSearchPerformance] = useState(0)

  useEffect(() => {
    if (defaultCategory) {
      setSelectedCategory(defaultCategory)
    }
  }, [defaultCategory])

  // Enhanced search utilities
  const addToSearchHistory = (query: string, results: number) => {
    const newHistoryItem: SearchHistoryItem = {
      query,
      timestamp: typeof window !== 'undefined' ? Date.now() : 0,
      results
    }
    setSearchHistory(prev => {
      const filtered = prev.filter(item => item.query !== query)
      return [newHistoryItem, ...filtered].slice(0, 10) // Keep last 10 searches
    })
  }

  const toggleFavorite = (tool: any) => {
    setFavoriteTools(prev => {
      const exists = prev.find(fav => fav.href === tool.href)
      if (exists) {
        return prev.filter(fav => fav.href !== tool.href)
      } else {
        return [...prev, {
          href: tool.href,
          name: tool.name,
          category: tool.category,
          addedAt: typeof window !== 'undefined' ? Date.now() : 0
        }]
      }
    })
  }

  const updateSearchAnalytics = useCallback((query: string, category: string) => {
    setSearchAnalytics(prev => ({
      totalSearches: prev.totalSearches + 1,
      popularQueries: {
        ...prev.popularQueries,
        [query]: (prev.popularQueries[query] || 0) + 1
      },
      categoryUsage: {
        ...prev.categoryUsage,
        [category]: (prev.categoryUsage[category] || 0) + 1
      }
    }))
  }, [])

  // Enhanced search suggestions with intelligent length handling
  const generateSuggestions = useCallback((query: string) => {
    if (!query.trim()) return []

    const suggestions: string[] = []
    const lowerQuery = query.toLowerCase().trim()

    // Exact tool name matches (highest priority) - prioritize shorter names
    allTools.forEach(tool => {
      const lowerToolName = tool.name.toLowerCase()
      if (lowerToolName.startsWith(lowerQuery)) {
        suggestions.push(tool.name)
      }
    })

    // Partial tool name matches
    allTools.forEach(tool => {
      const lowerToolName = tool.name.toLowerCase()
      if (lowerToolName.includes(lowerQuery) && !suggestions.includes(tool.name)) {
        suggestions.push(tool.name)
      }
    })

    // Tag suggestions that start with query
    allTools.forEach(tool => {
      tool.tags.forEach(tag => {
        const lowerTag = tag.toLowerCase()
        if (lowerTag.startsWith(lowerQuery) && !suggestions.includes(tag)) {
          suggestions.push(tag)
        }
      })
    })

    // Tag suggestions that contain query
    allTools.forEach(tool => {
      tool.tags.forEach(tag => {
        const lowerTag = tag.toLowerCase()
        if (lowerTag.includes(lowerQuery) && !suggestions.includes(tag)) {
          suggestions.push(tag)
        }
      })
    })

    // Format-based suggestions
    allTools.forEach(tool => {
      tool.inputFormats.concat(tool.outputFormats).forEach(format => {
        const lowerFormat = format.toLowerCase()
        if (lowerFormat.includes(lowerQuery) && !suggestions.includes(format)) {
          suggestions.push(format)
        }
      })
    })

    // Popular conversion suggestions based on query
    if (lowerQuery.includes('to') || lowerQuery.includes('convert') || lowerQuery.includes('↔')) {
      const conversionSuggestions = [
        'JSON to YAML', 'XML to JSON', 'CSV to JSON', 'Image to Base64',
        'Text to Hash', 'Base64 to Text', 'Binary to Decimal', 'Hex to Binary'
      ]
      conversionSuggestions.forEach(suggestion => {
        if (suggestion.toLowerCase().includes(lowerQuery) && !suggestions.includes(suggestion)) {
          suggestions.push(suggestion)
        }
      })
    }

    // Category-based suggestions
    const categories = [...new Set(allTools.map(tool => tool.category))]
    categories.forEach(category => {
      if (category.toLowerCase().includes(lowerQuery) && !suggestions.includes(category)) {
        suggestions.push(category)
      }
    })

    // Sort suggestions by length and relevance (shorter, more relevant first)
    const sortedSuggestions = suggestions.sort((a, b) => {
      const aLower = a.toLowerCase()
      const bLower = b.toLowerCase()
      
      // Exact matches first
      if (aLower === lowerQuery && bLower !== lowerQuery) return -1
      if (bLower === lowerQuery && aLower !== lowerQuery) return 1
      
      // Then by how early the query appears
      const aIndex = aLower.indexOf(lowerQuery)
      const bIndex = bLower.indexOf(lowerQuery)
      if (aIndex !== bIndex) return aIndex - bIndex
      
      // Finally by length (shorter first for better usability)
      return a.length - b.length
    })

    return sortedSuggestions.slice(0, 8) // Limit to 8 suggestions
  }, [])

  // Helper function to check if text contains all words from query in order
  const containsWordsInOrder = (text: string, query: string): boolean => {
    const textWords = text.split(/\s+/)
    const queryWords = query.split(/\s+/)

    let textIndex = 0
    let queryIndex = 0

    while (textIndex < textWords.length && queryIndex < queryWords.length) {
      if (textWords[textIndex].includes(queryWords[queryIndex])) {
        queryIndex++
      }
      textIndex++
    }

    return queryIndex === queryWords.length
  }

  // Enhanced search algorithm with scoring
  const enhancedSearchInTool = (tool: (typeof allTools)[0], query: string) => {
    const lowerQuery = query.toLowerCase().trim()
    const lowerToolName = tool.name.toLowerCase()
    const lowerDescription = tool.description.toLowerCase()
    const lowerCategory = tool.category.toLowerCase()

    let score = 0

    // Perfect exact match (highest priority)
    if (lowerToolName === lowerQuery) {
      score += 1000
    }
    // Exact match without special characters
    else if (lowerToolName.replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim() === lowerQuery.replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim()) {
      score += 950
    }
    // Tool name starts with query (very high priority)
    else if (lowerToolName.startsWith(lowerQuery)) {
      score += 800
    }
    // Tool name contains all words from query in order
    else if (containsWordsInOrder(lowerToolName, lowerQuery)) {
      score += 700
    }
    // Tool name contains query as substring
    else if (lowerToolName.includes(lowerQuery)) {
      score += 600
    }
    // Description starts with query
    else if (lowerDescription.startsWith(lowerQuery)) {
      score += 500
    }
    // Description contains all words from query in order
    else if (containsWordsInOrder(lowerDescription, lowerQuery)) {
      score += 400
    }
    // Description contains query
    else if (lowerDescription.includes(lowerQuery)) {
      score += 300
    }
    // Category exact match
    else if (lowerCategory === lowerQuery) {
      score += 250
    }
    // Category contains query
    else if (lowerCategory.includes(lowerQuery)) {
      score += 200
    }

    // Boost score for exact tag matches and special conversions
    const queryWords = lowerQuery.split(/\s+/)
    tool.tags.forEach(tag => {
      const lowerTag = tag.toLowerCase()
      if (lowerTag === lowerQuery) {
        score += 400
      } else if (queryWords.every(word => lowerTag.includes(word))) {
        score += 200
      } else if (lowerTag.includes(lowerQuery)) {
        score += 100
      }
    })

    // Special scoring for specific conversion patterns
    if (lowerQuery.includes('uuid') && lowerToolName.includes('uuid')) {
      score += 300
    }
    if (lowerQuery.includes('excess') && (lowerToolName.includes('number system') || lowerToolName.includes('binary'))) {
      score += 250
    }
    if (lowerQuery.includes('bcd') && (lowerToolName.includes('number system') || lowerToolName.includes('binary'))) {
      score += 250
    }
    if ((lowerQuery.includes('bytes') || lowerQuery.includes(' kb') || lowerQuery.includes(' mb') || lowerQuery.includes(' gb') || lowerQuery.includes(' tb')) && 
        (lowerToolName.includes('data unit') || lowerDescription.includes('storage'))) {
      score += 250
    }
    if (lowerQuery.includes('storage') && lowerToolName.includes('data unit')) {
      score += 200
    }

    // Input/Output format matches with higher precision
    const inputMatches = tool.inputFormats.filter(format => {
      const lowerFormat = format.toLowerCase()
      return lowerFormat === lowerQuery ||
        lowerFormat.includes(lowerQuery) ||
        lowerQuery.includes(lowerFormat)
    })
    const outputMatches = tool.outputFormats.filter(format => {
      const lowerFormat = format.toLowerCase()
      return lowerFormat === lowerQuery ||
        lowerFormat.includes(lowerQuery) ||
        lowerQuery.includes(lowerFormat)
    })

    // Higher score for exact format matches
    inputMatches.forEach(format => {
      if (format.toLowerCase() === lowerQuery) score += 300
      else score += 150
    })
    outputMatches.forEach(format => {
      if (format.toLowerCase() === lowerQuery) score += 300
      else score += 150
    })

    // Feature matches
    const featureMatches = tool.internalFeatures?.filter(feature =>
      feature.toLowerCase().includes(lowerQuery)
    ) || []
    score += featureMatches.length * 50

    // Boost for conversion pattern matches
    if (lowerQuery.includes('↔') || lowerQuery.includes('to') || lowerQuery.includes('convert')) {
      if (lowerToolName.includes('convert') || lowerDescription.includes('convert')) {
        score += 100
      }
    }

    // Penalty for very long tool names when query is short (improves relevance)
    if (lowerQuery.length < 10 && lowerToolName.length > 50) {
      score -= 50
    }

    return score > 0 ? { tool, score } : null
  }

  // Enhanced conversion matching with scoring
  const enhancedMatchesConversion = (tool: (typeof allTools)[0], inputQuery: string, outputQuery: string) => {
    let score = 0

    if (inputQuery) {
      const inputMatch = tool.inputFormats.some(format => {
        const formatLower = format.toLowerCase()
        const queryLower = inputQuery.toLowerCase()
        return formatLower.includes(queryLower) || queryLower.includes(formatLower)
      })
      if (inputMatch) score += 50
    }

    if (outputQuery) {
      const outputMatch = tool.outputFormats.some(format => {
        const formatLower = format.toLowerCase()
        const queryLower = outputQuery.toLowerCase()
        return formatLower.includes(queryLower) || queryLower.includes(formatLower)
      })
      if (outputMatch) score += 50
    }

    return score > 0 ? { tool, score } : null
  }
  // Original search functions (kept for compatibility)
  const detectConversionPattern = (query: string) => {
    const conversionWords = ["to", "→", "->", "convert", "from", "into", "as", "↔"]
    const lowerQuery = query.toLowerCase()

    for (const word of conversionWords) {
      if (lowerQuery.includes(word)) {
        const parts = lowerQuery.split(word)
        if (parts.length === 2) {
          return {
            input: parts[0].trim(),
            output: parts[1].trim(),
          }
        }
      }
    }
    return null
  }
  const matchesConversion = (tool: (typeof allTools)[0], inputQuery: string, outputQuery: string) => {
    const inputMatch =
      !inputQuery ||
      tool.inputFormats.some((format) => {
        const formatLower = format.toLowerCase()
        const queryLower = inputQuery.toLowerCase()
        return (
          formatLower.includes(queryLower) ||
          queryLower.includes(formatLower) ||
          // Additional synonyms
          (queryLower.includes("img") && formatLower.includes("image")) ||
          (queryLower.includes("pic") && formatLower.includes("image")) ||
          (queryLower.includes("photo") && formatLower.includes("image")) ||
          (queryLower.includes("file") && (formatLower.includes("image") || formatLower.includes("file"))) ||
          (queryLower.includes("number") &&
            (formatLower.includes("decimal") || formatLower.includes("hex") || formatLower.includes("binary"))) ||
          // Enhanced number system matching
          (queryLower.includes("text") && (formatLower.includes("text") || formatLower.includes("string"))) ||
          (queryLower.includes("binary") && formatLower.includes("binary")) ||
          (queryLower.includes("bcd") && formatLower.includes("bcd")) ||
          (queryLower.includes("decimal") && formatLower.includes("decimal")) ||
          // Data unit matching
          (queryLower.includes("bytes") && (formatLower.includes("bytes") || formatLower.includes("storage"))) ||
          (queryLower.includes("kb") && (formatLower.includes("kilobytes") || formatLower.includes("storage"))) ||
          (queryLower.includes("mb") && (formatLower.includes("megabytes") || formatLower.includes("storage"))) ||
          (queryLower.includes("gb") && (formatLower.includes("gigabytes") || formatLower.includes("storage"))) ||
          (queryLower.includes("tb") && (formatLower.includes("terabytes") || formatLower.includes("storage")))
        )
      }) ||
      // Enhanced tool name and description matching for conversions
      tool.name.toLowerCase().includes(inputQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(inputQuery.toLowerCase()) ||
      tool.tags.some(tag => tag.toLowerCase().includes(inputQuery.toLowerCase()))

    const outputMatch =
      !outputQuery ||
      tool.outputFormats.some((format) => {
        const formatLower = format.toLowerCase()
        const queryLower = outputQuery.toLowerCase()
        return (
          formatLower.includes(queryLower) ||
          queryLower.includes(formatLower) ||
          // Additional synonyms
          (queryLower.includes("64") && formatLower.includes("base64")) ||
          (queryLower.includes("hash") &&
            (formatLower.includes("md5") || formatLower.includes("sha") || formatLower.includes("hash"))) ||
          (queryLower.includes("encode") && formatLower.includes("base64")) ||
          // Enhanced number system matching
          (queryLower.includes("excess-3") && formatLower.includes("excess")) ||
          (queryLower.includes("excess3") && formatLower.includes("excess")) ||
          (queryLower.includes("bcd") && formatLower.includes("bcd")) ||
          (queryLower.includes("gray") && formatLower.includes("gray")) ||
          (queryLower.includes("grey") && formatLower.includes("gray")) ||
          (queryLower.includes("binary") && formatLower.includes("binary")) ||
          (queryLower.includes("octal") && formatLower.includes("octal")) ||
          // Data unit matching
          (queryLower.includes("bytes") && (formatLower.includes("bytes") || formatLower.includes("storage"))) ||
          (queryLower.includes("kb") && (formatLower.includes("kilobytes") || formatLower.includes("storage"))) ||
          (queryLower.includes("mb") && (formatLower.includes("megabytes") || formatLower.includes("storage"))) ||
          (queryLower.includes("gb") && (formatLower.includes("gigabytes") || formatLower.includes("storage"))) ||
          (queryLower.includes("tb") && (formatLower.includes("terabytes") || formatLower.includes("storage")))
        )
      }) ||
      // Enhanced tool name and description matching for conversions
      tool.name.toLowerCase().includes(outputQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(outputQuery.toLowerCase()) ||
      tool.tags.some(tag => tag.toLowerCase().includes(outputQuery.toLowerCase()))

    return inputMatch && outputMatch
  }

  // Filter tools based on search criteria
  const filteredTools = useMemo(() => {
    const startTime = performance.now()

    let tools = allTools

    // Filter by category
    if (selectedCategory !== "All Categories") {
      tools = tools.filter((tool) => tool.category === selectedCategory)
    }

    // Apply advanced filters
    if (includeFavorites && favoriteTools.length > 0) {
      const favoriteHrefs = favoriteTools.map(fav => fav.href)
      tools = tools.filter(tool => favoriteHrefs.includes(tool.href))
    }

    if (showOnlyNew) {
      // Consider tools added in the last 30 days as "new"
      const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000)
      tools = tools.filter(tool => {
        // This is a placeholder - in a real app, you'd have creation dates
        return Math.random() > 0.7 // Simulate some tools as "new"
      })
    }

    if (complexityFilter !== "all") {
      tools = tools.filter(tool => {
        const isComplex = tool.internalFeatures && tool.internalFeatures.length > 5
        return complexityFilter === "advanced" ? isComplex : !isComplex
      })
    }

    if (searchMode === "simple") {
      // Check for conversion patterns first
      const conversionPattern = detectConversionPattern(searchQuery)

      if (conversionPattern && searchQuery.trim()) {
        // Search for conversion tools
        tools = tools.filter((tool) => matchesConversion(tool, conversionPattern.input, conversionPattern.output))
      } else if (searchQuery.trim()) {
        // Enhanced regular search with scoring
        const scoredTools = tools
          .map(tool => enhancedSearchInTool(tool, searchQuery))
          .filter(result => result !== null)
          .sort((a, b) => b!.score - a!.score)
          .map(result => result!.tool)

        // If we have a very high scoring exact match, prioritize it heavily
        const exactMatch = tools.find(tool =>
          tool.name.toLowerCase() === searchQuery.toLowerCase().trim()
        )

        if (exactMatch && scoredTools.length > 1) {
          // Move exact match to the front and limit other results
          tools = [exactMatch, ...scoredTools.filter(t => t !== exactMatch).slice(0, 9)]
        } else if (scoredTools.length === 0 && searchQuery.length > 10) {
          // Fallback for long queries that might have been processed from suggestions
          // Try a more lenient search with individual words
          const queryWords = searchQuery.toLowerCase().split(/\s+/).filter(word => word.length > 2)
          if (queryWords.length > 0) {
            const fallbackTools = tools.filter(tool => {
              const toolText = `${tool.name} ${tool.description} ${tool.tags.join(' ')}`.toLowerCase()
              return queryWords.some(word => toolText.includes(word))
            })
            tools = fallbackTools
          } else {
            tools = scoredTools
          }
        } else {
          tools = scoredTools
        }
      }
    } else {
      // Conversion mode search
      if (inputFormat || outputFormat) {
        const scoredTools = tools
          .map(tool => enhancedMatchesConversion(tool, inputFormat, outputFormat))
          .filter(result => result !== null)
          .sort((a, b) => b!.score - a!.score)
          .map(result => result!.tool)

        tools = scoredTools
      }
    }

    // Apply sorting
    if (sortBy !== "relevance") {
      tools.sort((a, b) => {
        switch (sortBy) {
          case "name":
            return a.name.localeCompare(b.name)
          case "category":
            return a.category.localeCompare(b.category)
          case "popularity":
            // Simulate popularity based on search analytics
            const aPopularity = searchAnalytics.popularQueries[a.name] || 0
            const bPopularity = searchAnalytics.popularQueries[b.name] || 0
            return bPopularity - aPopularity
          default:
            return 0
        }
      })
    }

    // Track performance
    const endTime = performance.now()
    setSearchPerformance(endTime - startTime)

    // Update analytics
    if (searchQuery.trim() || inputFormat || outputFormat) {
      const query = searchMode === "simple" ? searchQuery : `${inputFormat} ${outputFormat}`
      updateSearchAnalytics(query, selectedCategory)
      addToSearchHistory(query, tools.length)
    }

    return tools
  }, [searchQuery, inputFormat, outputFormat, selectedCategory, searchMode, defaultCategory, includeFavorites, showOnlyNew, complexityFilter, sortBy, favoriteTools, updateSearchAnalytics])

  // Group results by category
  const groupedResults = useMemo(() => {
    const groups: { [key: string]: typeof allTools } = {}
    filteredTools.forEach((tool) => {
      if (!groups[tool.category]) {
        groups[tool.category] = []
      }
      groups[tool.category].push(tool)
    })
    return groups
  }, [filteredTools])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key === "k") || e.key === "/") {
        e.preventDefault()
        const searchInput = document.getElementById("search-tools") || document.getElementById("input-format")
        searchInput?.focus()
      }

      if (showResults && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
        e.preventDefault()
        const maxIndex = filteredTools.length - 1
        if (e.key === "ArrowDown") {
          setSelectedIndex((prev) => (prev < maxIndex ? prev + 1 : 0))
        } else {
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : maxIndex))
        }
      }

      if (e.key === "Enter" && selectedIndex >= 0 && filteredTools[selectedIndex]) {
        window.location.href = filteredTools[selectedIndex].href
      }

      if (e.key === "Escape") {
        setShowResults(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [showResults, selectedIndex, filteredTools])

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200 font-medium">
          {part}
        </span>
      ) : (
        part
      ),
    )
  }

  // Utility functions for enhanced features
  const clearSearchHistory = () => {
    setSearchHistory([])
  }

  const removeFavorite = (href: string) => {
    setFavoriteTools(prev => prev.filter(fav => fav.href !== href))
  }

  const handleSuggestionClick = (suggestion: string) => {
    if (searchMode === "simple") {
      // Intelligent handling of long suggestions to prevent "no results" issue
      // This addresses the problem where clicking on suggestions >10-11 chars shows no results
      let processedSuggestion = suggestion.trim()
      
      // Special mappings for specific popular searches
      const specialMappings: Record<string, string> = {
        "UUID generator": "UUID Generator",
        "uuid generator": "UUID Generator",
        "Text to Excess-3": "number system converter",
        "text to excess-3": "number system converter",
        "BCD to Excess-3": "number system converter", 
        "bcd to excess-3": "number system converter",
        "Text to BCD": "number system converter",
        "text to bcd": "number system converter",
        "Binary to Gray Code": "number system converter",
        "binary to gray code": "number system converter",
        "Decimal to BCD": "number system converter",
        "decimal to bcd": "number system converter",
        "Bytes to MB": "data unit converter",
        "bytes to mb": "data unit converter",
        "GB to TB": "data unit converter",
        "gb to tb": "data unit converter", 
        "KB to bytes": "data unit converter",
        "kb to bytes": "data unit converter",
        "Storage converter": "data unit converter",
        "storage converter": "data unit converter",
        "Electronics converter": "number system converter",
        "electronics converter": "number system converter",
        "Binary converter": "number system converter",
        "binary converter": "number system converter"
      }
      
      // Check if we have a special mapping
      if (specialMappings[processedSuggestion]) {
        processedSuggestion = specialMappings[processedSuggestion]
      }
      // If suggestion is very long (>15 chars), try to find the most relevant part
      else if (processedSuggestion.length > 15) {
        // Check if it's an exact tool name first
        const exactTool = allTools.find(tool =>
          tool.name.toLowerCase() === processedSuggestion.toLowerCase()
        )
        
        if (exactTool) {
          // For exact tool matches, use the exact name
          processedSuggestion = exactTool.name
        } else {
          // For non-exact matches, try to extract the most relevant keywords
          // Split by common separators and take the most meaningful parts
          const words = processedSuggestion.split(/[\s\-_]+/).filter(word => word.length > 2)
          
          if (words.length > 1) {
            // Prioritize tool-related words (common tool types)
            const toolKeywords = ['generator', 'converter', 'encoder', 'decoder', 'formatter', 'validator', 'tester', 'calculator']
            const hasToolKeyword = words.some(word => toolKeywords.includes(word.toLowerCase()))
            
            if (hasToolKeyword) {
              // If we have tool keywords, prioritize them along with the first meaningful word
              const toolWord = words.find(word => toolKeywords.includes(word.toLowerCase()))
              const firstMeaningfulWord = words.find(word => !toolKeywords.includes(word.toLowerCase()) && word.length > 2)
              processedSuggestion = firstMeaningfulWord && toolWord ? `${firstMeaningfulWord} ${toolWord}` : toolWord || firstMeaningfulWord || words[0]
            } else {
              // Take first 2 most meaningful words, prioritizing longer ones
              const sortedWords = words
                .sort((a, b) => b.length - a.length)
                .slice(0, 2)
                .sort((a, b) => processedSuggestion.indexOf(a) - processedSuggestion.indexOf(b))
              
              processedSuggestion = sortedWords.join(' ')
            }
          } else {
            // If it's a single long word, truncate intelligently
            processedSuggestion = processedSuggestion.substring(0, 12)
          }
        }
      }
      
      // Set the processed query
      setSearchQuery(processedSuggestion)
      setShowSuggestions(false)
      setShowResults(true)
      
      // Force results to show even for shorter processed queries if they match exactly
      setTimeout(() => {
        setShowResults(true)
      }, 50)
      
      // Debug info (only in development)
      if (process.env.NODE_ENV === 'development') {
        console.log('Search suggestion clicked:', {
          original: suggestion,
          processed: processedSuggestion,
          originalLength: suggestion.length,
          processedLength: processedSuggestion.length
        })
      }
    } else {
      // For conversion mode, try to parse the suggestion
      if (suggestion.includes(' to ') || suggestion.includes(' → ') || suggestion.includes(' ↔ ')) {
        const parts = suggestion.split(/ to | → | ↔ /)
        if (parts.length === 2) {
          setInputFormat(parts[0].trim())
          setOutputFormat(parts[1].trim())
        }
      } else {
        // If it's a single format, try to set it as input format
        setInputFormat(suggestion)
      }
      setShowSuggestions(false)
      setShowResults(true)
    }
  }

  // Check if we should show suggestions (only for 3 or fewer characters)
  // Updated from 2 to 3 characters to be consistent with suggestion generation
  const shouldShowSuggestions = useMemo(() => {
    const queryLength = searchMode === "simple" ? searchQuery.length : (inputFormat.length + outputFormat.length)
    return queryLength <= 3 && queryLength > 0
  }, [searchQuery, inputFormat, outputFormat, searchMode])

  // Check if we should show results (more than 2 characters or conversion mode or exact tool match)
  const shouldShowResults = useMemo(() => {
    const queryLength = searchMode === "simple" ? searchQuery.length : (inputFormat.length + outputFormat.length)

    // Always show results for conversion mode if we have input/output
    if (searchMode === "conversion" && (inputFormat || outputFormat)) {
      return true
    }

    // For simple mode, check if we have an exact tool match even with fewer characters
    if (searchMode === "simple" && searchQuery.trim()) {
      const exactMatch = allTools.some(tool =>
        tool.name.toLowerCase() === searchQuery.toLowerCase().trim()
      )
      if (exactMatch) return true
      
      // Also check for partial matches that are meaningful (3+ chars)
      if (queryLength >= 3) return true
    }

    // Default threshold of 2 characters
    return queryLength > 2
  }, [searchQuery, inputFormat, outputFormat, searchMode, allTools])

  // Generate structured data for search results
  const generateSearchResultsSchema = () => {
    if (!filteredTools.length) return null

    const baseUrl = getBaseUrl()
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Developer Tools Search Results",
      "description": `Search results for "${searchQuery}" - ${filteredTools.length} tools found`,
      "numberOfItems": filteredTools.length,
      "itemListElement": filteredTools.slice(0, 10).map((tool, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "SoftwareApplication",
          "name": tool.name,
          "description": tool.description,
          "url": `${baseUrl}${tool.href}`,
          "applicationCategory": tool.category,
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": tool.internalFeatures || []
        }
      }))
    }
  }

  // SEO-friendly search suggestions with structured data
  const generateSuggestionsSchema = () => {
    if (!suggestions.length) return null

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Search Suggestions",
      "description": "Suggested search terms and tools",
      "numberOfItems": suggestions.length,
      "itemListElement": suggestions.map((suggestion, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Text",
          "text": suggestion
        }
      }))
    }
  }

  // Handle tool click with loading state
  const handleToolClick = useCallback((toolHref: string) => {
    setLoadingTool(toolHref)
    setIsLoading(true)

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
      window.location.href = toolHref
    }, 300)
  }, [])



  const searchInTool = (tool: (typeof allTools)[0], query: string) => {
    const lowerQuery = query.toLowerCase()

    // Search in basic fields
    const basicMatch =
      tool.name.toLowerCase().includes(lowerQuery) ||
      tool.description.toLowerCase().includes(lowerQuery) ||
      tool.category.toLowerCase().includes(lowerQuery)

    // Search in tags
    const tagMatch = tool.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))

    // Search in input/output formats
    const formatMatch =
      tool.inputFormats.some(
        (format) => format.toLowerCase().includes(lowerQuery) || lowerQuery.includes(format.toLowerCase()),
      ) ||
      tool.outputFormats.some(
        (format) => format.toLowerCase().includes(lowerQuery) || lowerQuery.includes(format.toLowerCase()),
      )

    // Search in internal features
    const featureMatch = tool.internalFeatures?.some(
      (feature) => feature.toLowerCase().includes(lowerQuery) || lowerQuery.includes(feature.toLowerCase()),
    )

    return basicMatch || tagMatch || formatMatch || featureMatch
  }

  

  return (
    <TooltipProvider>
      <div className="relative w-full max-w-4xl mx-auto mb-8">
        {/* Structured Data for SEO */}
        {generateSearchResultsSchema() && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(generateSearchResultsSchema())
            }}
          />
        )}
        {generateSuggestionsSchema() && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(generateSuggestionsSchema())
            }}
          />
        )}

        {/* Search Mode Tabs */}
        <Tabs
          value={searchMode}
          onValueChange={(value) => setSearchMode(value as "simple" | "conversion")}
          className="mb-4"
          role="tablist"
          aria-label="Search mode selection"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="simple" className="flex items-center gap-2" role="tab" aria-selected={searchMode === "simple"}>
              <Search className="h-4 w-4" />
              Simple Search
            </TabsTrigger>
            <TabsTrigger value="conversion" className="flex items-center gap-2" role="tab" aria-selected={searchMode === "conversion"}>
              <ArrowRight className="h-4 w-4" />
              Conversion Search
            </TabsTrigger>
          </TabsList>

          <TabsContent value="simple" className="space-y-4" role="tabpanel" aria-label="Simple search interface">
            {/* Simple Search */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" aria-hidden="true" />
                <Input
                  id="search-tools"
                  type="text"
                  placeholder="Search tools... Try 'JSON to YAML', 'image to base64', or 'file to hash'"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setShowResults(true)
                    setSelectedIndex(-1)
                    // Generate suggestions only for 3 or fewer characters
                    if (e.target.value.length <= 3) {
                      const newSuggestions = generateSuggestions(e.target.value)
                      setSuggestions(newSuggestions)
                      setShowSuggestions(newSuggestions.length > 0)
                    } else {
                      setShowSuggestions(false)
                    }
                  }}
                  onFocus={() => {
                    setShowResults(true)
                    if (searchQuery.length <= 3) {
                      const newSuggestions = generateSuggestions(searchQuery)
                      setSuggestions(newSuggestions)
                      setShowSuggestions(newSuggestions.length > 0)
                    }
                  }}
                  className="pl-10 pr-20 py-2.5 text-sm placeholder:text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg transition-all duration-200"
                  aria-label="Search for developer tools"
                  aria-describedby="search-help"
                  role="searchbox"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-xs text-gray-400" aria-hidden="true">
                  <Keyboard className="h-3 w-3" />
                  <span>Ctrl+K</span>
                </div>
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" aria-label="Filter by category">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Suggestions - Only show for 3 or fewer characters */}
            {showSuggestions && shouldShowSuggestions && suggestions.length > 0 && (
              <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-2" role="listbox" aria-label="Search suggestions">
                <div className="text-xs text-gray-500 mb-2 px-2">Suggestions:</div>
                <div className="space-y-1">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded cursor-pointer"
                      role="option"
                      aria-label={`Search for ${suggestion}`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="conversion" className="space-y-4" role="tabpanel" aria-label="Conversion search interface">
            {/* Conversion Search */}
            <div className="flex gap-3 items-center">
              <div className="flex-1">
                <Input
                  id="input-format"
                  type="text"
                  placeholder="Input format (e.g., JSON, Image, File, Text)"
                  value={inputFormat}
                  onChange={(e) => {
                    setInputFormat(e.target.value)
                    setShowResults(true)
                    setSelectedIndex(-1)
                  }}
                  onFocus={() => setShowResults(true)}
                  className="py-2.5 text-sm placeholder:text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg transition-all duration-200"
                  aria-label="Input format for conversion"
                />
              </div>

              <ArrowRight className="h-5 w-5 text-gray-400 flex-shrink-0" aria-hidden="true" />

              <div className="flex-1">
                <Input
                  id="output-format"
                  type="text"
                  placeholder="Output format (e.g., YAML, Base64, Hash, Binary)"
                  value={outputFormat}
                  onChange={(e) => {
                    setOutputFormat(e.target.value)
                    setShowResults(true)
                    setSelectedIndex(-1)
                  }}
                  onFocus={() => setShowResults(true)}
                  className="py-2.5 text-sm placeholder:text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg transition-all duration-200"
                  aria-label="Output format for conversion"
                />
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const temp = inputFormat
                  setInputFormat(outputFormat)
                  setOutputFormat(temp)
                }}
                className="flex-shrink-0 border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="Swap input and output"
                aria-label="Swap input and output formats"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" aria-label="Filter by category">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Conversion Suggestions */}
            {!inputFormat && !outputFormat && (
              <div>
                <p className="text-sm text-gray-600 mb-2">Popular conversions:</p>
                <div className="flex flex-wrap gap-2" role="list" aria-label="Popular conversion suggestions">
                  {conversionSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setInputFormat(suggestion.input)
                        setOutputFormat(suggestion.output)
                        setShowResults(true)
                      }}
                      className="text-xs flex items-center gap-1 border border-gray-300 hover:bg-gray-50"
                      role="listitem"
                      aria-label={`Convert ${suggestion.input} to ${suggestion.output}`}
                    >
                      {suggestion.input} <ArrowRight className="h-3 w-3" /> {suggestion.output}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Popular Searches for Simple Mode - Only show when not searching */}
        {searchMode === "simple" && !searchQuery && !showResults && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Popular searches:</p>
            <div className="flex flex-wrap gap-2" role="list" aria-label="Popular search terms">
              {popularSearches.map((search) => (
                <Button
                  key={search}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery(search)
                    setShowResults(true)
                  }}
                  className="text-xs border border-gray-300 hover:bg-gray-50"
                  role="listitem"
                  aria-label={`Search for ${search}`}
                >
                  {search}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {showResults && shouldShowResults && (
          <div
            className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
            role="region"
            aria-label="Search results"
            aria-live="polite"
            aria-atomic="false"
          >
            {filteredTools.length > 0 ? (
              <div className="p-4">
                <div className="text-sm text-gray-600 mb-3" id="search-results-summary">
                  Found {filteredTools.length} tool{filteredTools.length !== 1 ? "s" : ""}
                  {searchMode === "conversion" && (inputFormat || outputFormat) && (
                    <span className="ml-2 text-blue-600">
                      {inputFormat && `from ${inputFormat}`}
                      {inputFormat && outputFormat && " "}
                      {outputFormat && `to ${outputFormat}`}
                    </span>
                  )}
                </div>

                <div role="list" aria-label="Search results list">
                  {Object.entries(groupedResults).map(([category, tools]) => (
                    <div key={category} className="mb-4 last:mb-0">
                      <h3 className="text-sm font-semibold text-gray-800 mb-2 border-b border-gray-100 pb-1">{category}</h3>
                      <div className="space-y-2" role="list" aria-label={`${category} tools`}>
                        {tools.map((tool, index) => {
                          const globalIndex = filteredTools.indexOf(tool)
                          const isFavorite = favoriteTools.some(fav => fav.href === tool.href)
                          const isToolLoading = loadingTool === tool.href
                          return (
                            <div
                              key={tool.href}
                              onClick={() => handleToolClick(tool.href)}
                              className={`block p-3 rounded-lg border transition-colors cursor-pointer ${selectedIndex === globalIndex
                                  ? "bg-blue-50 border-blue-200"
                                  : "hover:bg-gray-50 border-gray-100"
                                } ${isToolLoading ? 'bg-blue-50 border-blue-200' : ''}`}
                              role="listitem"
                              aria-label={`${tool.name} - ${tool.description}`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="font-medium text-gray-900 mb-1">
                                    {searchMode === "simple" ? highlightText(tool.name, searchQuery) : tool.name}
                                    {isToolLoading && (
                                      <span className="ml-2 inline-flex items-center text-blue-600 text-sm">
                                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                        Loading...
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-sm text-gray-600 mb-2">
                                    {searchMode === "simple" ? highlightText(tool.description, searchQuery) : tool.description}
                                  </div>
                                  <div className="flex items-center gap-2 text-xs mb-2">
                                    <div className="flex flex-wrap gap-1">
                                      <span className="text-gray-500">Input:</span>
                                      {tool.inputFormats.slice(0, 4).map((format) => (
                                        <span
                                          key={format}
                                          className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded"
                                        >
                                          {format}
                                        </span>
                                      ))}
                                      {tool.inputFormats.length > 4 && (
                                        <span className="text-gray-400">+{tool.inputFormats.length - 4} more</span>
                                      )}
                                    </div>
                                    <ArrowRight className="h-3 w-3 text-gray-400" aria-hidden="true" />
                                    <div className="flex flex-wrap gap-1">
                                      <span className="text-gray-500">Output:</span>
                                      {tool.outputFormats.slice(0, 4).map((format) => (
                                        <span key={format} className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded">
                                          {format}
                                        </span>
                                      ))}
                                      {tool.outputFormats.length > 4 && (
                                        <span className="text-gray-400">+{tool.outputFormats.length - 4} more</span>
                                      )}
                                    </div>
                                  </div>
                                  {tool.internalFeatures && tool.internalFeatures.length > 0 && (
                                    <div className="text-xs text-gray-500">
                                      <span className="font-medium">Features:</span>{" "}
                                      {tool.internalFeatures.slice(0, 3).join(", ")}
                                      {tool.internalFeatures.length > 3 && "..."}
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => {
                                          e.preventDefault()
                                          e.stopPropagation()
                                          toggleFavorite(tool)
                                        }}
                                        className="h-8 w-8 p-0"
                                        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                                        disabled={isToolLoading}
                                      >
                                        <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center" role="status" aria-live="polite">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tools found</h3>
                <p className="text-gray-600 mb-4">
                  {searchMode === "conversion"
                    ? "Try different input/output formats or browse by category"
                    : "Try adjusting your search or browse by category"}
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setInputFormat("")
                    setOutputFormat("")
                    setSelectedCategory("All Categories")
                    setShowResults(false)
                  }}
                  className="border border-gray-300 hover:bg-gray-50"
                  aria-label="Clear search and reset filters"
                >
                  Clear search
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Overlay to close results */}
        {showResults && <div className="fixed inset-0 z-40" onClick={() => setShowResults(false)} aria-hidden="true" />}

        {/* Favorite Tools - Keep only this part */}
        {favoriteTools.length > 0 && !shouldShowResults && (
          <div className="bg-yellow-50 rounded-lg p-4 mt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-yellow-900 flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Favorite Tools ({favoriteTools.length})
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {favoriteTools.slice(0, 6).map((tool) => (
                <div
                  key={tool.href}
                  className="flex items-center justify-between bg-white rounded-md p-2 border border-yellow-200"
                >
                  <Link
                    href={tool.href}
                    className="text-sm text-yellow-900 hover:underline truncate"
                    onClick={() => {
                      // Save current scroll position before navigation - only on client
                      if (typeof window !== 'undefined') {
                        const position = {
                          x: window.scrollX,
                          y: window.scrollY,
                          timestamp: isClient ? Date.now() : 0
                        }
                        sessionStorage.setItem('tools-page-scroll-position', JSON.stringify(position))
                      }
                    }}
                  >
                    {tool.name}
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFavorite(tool.href)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
