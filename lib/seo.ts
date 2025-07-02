import type { Metadata } from "next"

export interface ToolSEO {
  title: string
  description: string
  keywords: string[]
  category: string
  features: string[]
  useCases: string[]
  relatedTools: string[]
}

export const toolsData: Record<string, ToolSEO> = {
  "yaml-converter": {
    title: "YAML ↔ JSON Converter - Convert Between YAML and JSON",
    description:
      "Convert between YAML and JSON formats with real-time validation, formatting options, and error handling. Free online YAML to JSON converter tool.",
    keywords: ["yaml converter", "json to yaml", "yaml to json", "yaml parser", "json parser", "data conversion"],
    category: "Converters",
    features: ["Real-time conversion", "Syntax validation", "Error highlighting", "Format options"],
    useCases: ["API configuration", "Data migration", "Config file conversion", "DevOps workflows"],
    relatedTools: ["json-formatter", "xml-converter", "csv-to-json"],
  },
  "string-converter": {
    title: "String Converter & Text Transformer - Case Conversion Tool",
    description:
      "Transform text with case conversion, manipulation, and extraction tools. Convert between camelCase, snake_case, kebab-case and more.",
    keywords: ["string converter", "text transformer", "case conversion", "camelCase", "snake_case", "kebab-case"],
    category: "Text Transformers",
    features: ["Multiple case formats", "Text extraction", "Character removal", "Pattern matching"],
    useCases: ["Code formatting", "Data cleaning", "Variable naming", "Text processing"],
    relatedTools: ["text-reverser", "text-repeater", "lorem-ipsum"],
  },
  "csv-to-json": {
    title: "CSV to JSON Converter - Convert CSV Files to JSON Format",
    description:
      "Convert CSV files to JSON format with customizable options. Support for headers, delimiters, and data type preservation.",
    keywords: ["csv to json", "csv converter", "json converter", "data conversion", "spreadsheet converter"],
    category: "Converters",
    features: ["Header detection", "Custom delimiters", "Data type preservation", "Bulk conversion"],
    useCases: ["Data migration", "API integration", "Database import", "Spreadsheet processing"],
    relatedTools: ["json-formatter", "yaml-converter", "xml-converter"],
  },
  "password-generator": {
    title: "Secure Password Generator - Create Strong Random Passwords",
    description:
      "Generate secure, random passwords with customizable length and character sets. Includes strength analysis and security tips.",
    keywords: ["password generator", "secure password", "random password", "password strength", "security"],
    category: "Generators",
    features: ["Customizable length", "Character set options", "Strength analysis", "Bulk generation"],
    useCases: ["Account security", "Password management", "System administration", "Security audits"],
    relatedTools: ["uuid-generator", "hash-generator", "bcrypt-generator"],
  },
  "color-generator": {
    title: "Color Palette Generator - Create Beautiful Color Schemes",
    description:
      "Generate beautiful color palettes for design projects. Create harmonious color schemes with various color theory rules.",
    keywords: ["color generator", "color palette", "color scheme", "design colors", "hex colors"],
    category: "Generators",
    features: ["Color harmony rules", "Multiple formats", "Dark mode variants", "Export options"],
    useCases: ["Web design", "Graphic design", "Brand identity", "UI/UX design"],
    relatedTools: ["color-palette-extractor", "image-filters", "qr-code-generator"],
  },
  "json-validator": {
    title: "JSON Validator - Validate and Parse JSON Data",
    description:
      "Validate JSON syntax and structure with detailed error reporting. Parse and analyze JSON data with statistics.",
    keywords: ["json validator", "json parser", "json syntax", "json validation", "json checker"],
    category: "Testers",
    features: ["Syntax validation", "Error reporting", "Structure analysis", "Statistics"],
    useCases: ["API development", "Data validation", "Configuration files", "Debugging"],
    relatedTools: ["json-formatter", "yaml-converter", "xml-converter"],
  },
  "url-tester": {
    title: "URL Tester & Validator - Test URL Validity and Components",
    description:
      "Test URL validity, analyze components, and check security features. Bulk URL testing with detailed analysis.",
    keywords: ["url tester", "url validator", "url checker", "link tester", "url analysis"],
    category: "Testers",
    features: ["URL validation", "Component analysis", "Security checks", "Bulk testing"],
    useCases: ["SEO audits", "Link checking", "Web development", "Quality assurance"],
    relatedTools: ["regex-tester", "cron-tester", "json-validator"],
  },
  "cron-tester": {
    title: "Cron Expression Tester - Validate and Test Cron Jobs",
    description:
      "Test and validate cron expressions with next run predictions. Visual cron job scheduler with examples.",
    keywords: ["cron tester", "cron validator", "cron expression", "cron job", "scheduler"],
    category: "Testers",
    features: ["Expression validation", "Next run prediction", "Visual scheduler", "Examples"],
    useCases: ["DevOps automation", "Task scheduling", "System administration", "CI/CD pipelines"],
    relatedTools: ["regex-tester", "url-tester", "json-validator"],
  },
  "jwt-decoder": {
    title: "JWT Decoder - Decode and Inspect JSON Web Tokens",
    description:
      "Decode and inspect JWT tokens to view header, payload, and signature information. JWT validation and analysis tool.",
    keywords: ["jwt decoder", "json web token", "jwt parser", "token decoder", "jwt validator"],
    category: "Testers",
    features: ["Token decoding", "Header analysis", "Payload inspection", "Signature verification"],
    useCases: ["API authentication", "Security testing", "Token debugging", "OAuth implementation"],
    relatedTools: ["base64-encoder", "hash-generator", "json-validator"],
  },
  "hash-generator": {
    title: "Hash Generator - Generate MD5, SHA-256, SHA-512 Hashes",
    description:
      "Generate cryptographic hashes for text and files. Support for MD5, SHA-1, SHA-256, SHA-512, and more algorithms.",
    keywords: ["hash generator", "md5 hash", "sha256 hash", "sha512 hash", "cryptographic hash"],
    category: "Hashing",
    features: ["Multiple algorithms", "File hashing", "Batch processing", "Hash comparison"],
    useCases: ["Data integrity", "Password hashing", "File verification", "Security audits"],
    relatedTools: ["md5-generator", "sha256-generator", "bcrypt-generator"],
  },
  "text-diff": {
    title: "Text Diff & Merge Tool - Compare and Merge Text Documents",
    description:
      "Compare two text documents, highlight differences, and interactively merge changes with conflict resolution.",
    keywords: ["text diff", "text compare", "merge tool", "diff checker", "text comparison"],
    category: "Diff",
    features: ["Side-by-side comparison", "Interactive merging", "Conflict resolution", "Export options"],
    useCases: ["Code review", "Document comparison", "Version control", "Content editing"],
    relatedTools: ["image-diff", "json-formatter", "text-reverser"],
  },
  "xml-converter": {
    title: "XML ↔ JSON Converter - Convert Between XML and JSON",
    description:
      "Convert between XML and JSON formats with advanced options and validation. Support for attributes and namespaces.",
    keywords: ["xml converter", "xml to json", "json to xml", "xml parser", "data conversion"],
    category: "Converters",
    features: ["Bidirectional conversion", "Attribute handling", "Validation", "Format options"],
    useCases: ["API integration", "Data migration", "Web services", "Configuration files"],
    relatedTools: ["json-formatter", "yaml-converter", "csv-to-json"],
  },
  "markdown-converter": {
    title: "Markdown ↔ HTML Converter - Convert Markdown to HTML",
    description: "Convert between Markdown and HTML formats with GitHub Flavored Markdown support and live preview.",
    keywords: ["markdown converter", "markdown to html", "html to markdown", "markdown parser", "gfm"],
    category: "Converters",
    features: ["GitHub Flavored Markdown", "Live preview", "Syntax highlighting", "Export options"],
    useCases: ["Documentation", "Blog writing", "README files", "Content management"],
    relatedTools: ["text-diff", "html-encoder", "lorem-ipsum"],
  },
  "tsv-converter": {
    title: "TSV Converter - Convert Between TSV, CSV, and JSON",
    description: "Convert between TSV, CSV, and JSON formats with advanced parsing options and data type preservation.",
    keywords: ["tsv converter", "tab separated values", "csv converter", "data conversion", "spreadsheet"],
    category: "Converters",
    features: ["Multiple formats", "Data type detection", "Custom delimiters", "Preview table"],
    useCases: ["Data analysis", "Spreadsheet conversion", "Database import", "Data migration"],
    relatedTools: ["csv-to-json", "json-formatter", "xml-converter"],
  },
  "ini-converter": {
    title: "INI/Config File Converter - Convert INI, JSON, YAML",
    description:
      "Convert between INI/Config files, JSON, and YAML formats with comment preservation and advanced options.",
    keywords: ["ini converter", "config file converter", "ini to json", "configuration parser"],
    category: "Converters",
    features: ["Comment preservation", "Section handling", "Multiple formats", "Validation"],
    useCases: ["Configuration management", "Settings migration", "DevOps automation", "Application config"],
    relatedTools: ["yaml-converter", "json-formatter", "xml-converter"],
  },
  "universal-converter": {
    title: "Universal Data Converter | Convert Between JSON, YAML, XML, CSV, TOML & More",
    description:
      "Free online Universal Data Converter tool. Instantly convert between JSON, YAML, XML, CSV, TOML, INI and more formats with perfect formatting. Supports bidirectional conversion with syntax validation and error highlighting. Perfect for developers, data scientists, and IT professionals.",
    keywords: [
      "universal data converter", 
      "format converter", 
      "json converter", 
      "yaml converter", 
      "xml converter", 
      "csv converter", 
      "toml converter", 
      "ini converter", 
      "data transformation", 
      "bidirectional converter",
      "online data converter",
      "free data converter",
      "convert json to yaml",
      "convert yaml to json",
      "convert xml to json",
      "convert csv to json",
      "data format conversion tool"
    ],
    category: "Converters",
    features: [
      "Multiple format support (JSON, YAML, XML, CSV, TOML, INI, etc.)",
      "Bidirectional conversion between any two formats",
      "Real-time syntax validation and error highlighting",
      "Preserves data types and structure integrity",
      "Copy to clipboard and download options",
      "File upload support for easy conversion",
      "Format-specific configuration options",
      "Pretty printing and minification options",
      "Detailed format information and documentation links",
      "Example data for each format",
      "Mobile-friendly interface"
    ],
    useCases: [
      "API development and testing",
      "Data migration between different systems",
      "Configuration file conversion for DevOps",
      "Format standardization for data pipelines",
      "Converting legacy data formats",
      "Preparing data for different applications",
      "Database export/import operations",
      "Documentation generation from structured data",
      "Microservices integration",
      "Data analysis and transformation"
    ],
    relatedTools: [
      "json-formatter", 
      "yaml-converter", 
      "xml-converter", 
      "csv-to-json", 
      "sql-converter", 
      "ini-converter"
    ],
  },
  "sql-converter": {
    title: "SQL to JSON Converter | Convert SQL Data to JSON, CSV, YAML & More",
    description:
      "Free online SQL converter tool. Convert SQL query results and table data to JSON, CSV, YAML, XML and other formats. Parse SQL INSERT statements, create tables from data, and transform database exports. Essential for database administrators and developers.",
    keywords: [
      "sql converter", 
      "sql to json", 
      "sql to csv", 
      "sql to yaml", 
      "database converter",
      "sql parser",
      "sql transformer",
      "convert sql to json",
      "convert sql results",
      "sql insert parser",
      "sql create table generator",
      "database migration tool",
      "sql export converter",
      "sql data transformation",
      "online sql converter",
      "free sql converter",
      "sql tools",
      "database tools"
    ],
    category: "Converters",
    features: [
      "Convert SQL query results to multiple formats",
      "Parse SQL INSERT statements into structured data",
      "Generate SQL from JSON, CSV, and other formats",
      "Support for multiple SQL dialects (MySQL, PostgreSQL, SQLite, etc.)",
      "Data type preservation during conversion",
      "Table schema detection and generation",
      "Bulk SQL statement processing",
      "Copy to clipboard functionality",
      "Download converted files",
      "File upload support",
      "SQL syntax highlighting",
      "SQL validation"
    ],
    useCases: [
      "Database migration between different systems",
      "API development with SQL backend",
      "Data analysis and reporting",
      "Database backup and restoration",
      "Converting legacy database exports",
      "Creating test data from production exports",
      "Generating documentation from database schemas",
      "ETL (Extract, Transform, Load) processes",
      "Database version control integration",
      "Data visualization preparation"
    ],
    relatedTools: [
      "json-formatter", 
      "csv-to-json", 
      "universal-converter", 
      "sql-formatter", 
      "database-diagram-generator", 
      "tsv-converter"
    ],
  },
  "uuid-generator": {
    title: "UUID Generator - Generate Unique Identifiers (UUID v4)",
    description:
      "Generate universally unique identifiers (UUID v4) for databases, APIs, and applications. Bulk UUID generation.",
    keywords: ["uuid generator", "unique identifier", "guid generator", "uuid v4", "random id"],
    category: "Generators",
    features: ["UUID v4 generation", "Bulk generation", "Copy to clipboard", "Validation"],
    useCases: ["Database keys", "API identifiers", "Session tokens", "Unique references"],
    relatedTools: ["password-generator", "hash-generator", "random-number-generator"],
  },
  "lorem-ipsum": {
    title: "Lorem Ipsum Generator - Generate Placeholder Text",
    description:
      "Generate Lorem Ipsum placeholder text for designs and layouts. Customizable word, sentence, and paragraph counts.",
    keywords: ["lorem ipsum", "placeholder text", "dummy text", "filler text", "design text"],
    category: "Generators",
    features: ["Customizable length", "Multiple formats", "Statistics", "Copy options"],
    useCases: ["Web design", "Print design", "Mockups", "Typography testing"],
    relatedTools: ["text-repeater", "random-text-generator", "string-converter"],
  },
  "base64-binary-converter": {
    title: "Base64 & Binary Converter - Encode/Decode Text, Images, Files",
    description:
      "Convert between Base64, binary, and text formats. Support for images, files, and data URLs with preview.",
    keywords: ["base64 converter", "binary converter", "base64 encoder", "base64 decoder", "data url"],
    category: "Encoders",
    features: ["Multiple formats", "File support", "Image preview", "Batch conversion"],
    useCases: ["Data encoding", "Image embedding", "API data", "File transfer"],
    relatedTools: ["base64-encoder", "url-encoder", "html-encoder"],
  },
  "base64-encoder": {
    title: "Base64 Encoder/Decoder - Encode and Decode Base64 Data",
    description:
      "Encode and decode Base64 data with support for text, images, and files. Real-time conversion with preview.",
    keywords: ["base64 encoder", "base64 decoder", "base64 converter", "encoding", "decoding"],
    category: "Encoders",
    features: ["Real-time conversion", "File support", "Image preview", "Copy options"],
    useCases: ["Data encoding", "Email attachments", "Web development", "API integration"],
    relatedTools: ["base64-binary-converter", "url-encoder", "html-encoder"],
  },
  "url-encoder": {
    title: "URL Encoder/Decoder - Encode and Decode URLs",
    description:
      "Encode and decode URLs and URL components. Support for query parameters, paths, and special characters.",
    keywords: ["url encoder", "url decoder", "percent encoding", "url escape", "query string"],
    category: "Encoders",
    features: ["Component encoding", "Query parameter handling", "Batch processing", "Validation"],
    useCases: ["Web development", "API calls", "Form data", "Link generation"],
    relatedTools: ["base64-encoder", "html-encoder", "json-formatter"],
  },
  "image-base64-converter": {
    title: "Image to Base64 Converter - Convert Images to Base64",
    description: "Convert images to Base64 data URLs and vice versa. Support for multiple image formats with preview.",
    keywords: ["image to base64", "base64 image", "image converter", "data url", "image encoder"],
    category: "Encoders",
    features: ["Multiple formats", "Image preview", "Data URL generation", "Copy options"],
    useCases: ["Web development", "Email templates", "CSS embedding", "API data"],
    relatedTools: ["base64-encoder", "image-format-converter", "image-compressor"],
  },
  "md5-generator": {
    title: "MD5 Hash Generator - Generate MD5 Hashes Online",
    description:
      "Generate MD5 hashes for text and files. Fast and secure MD5 hash calculator with verification options.",
    keywords: ["md5 generator", "md5 hash", "md5 calculator", "hash generator", "checksum"],
    category: "Hashing",
    features: ["Text hashing", "File hashing", "Hash verification", "Batch processing"],
    useCases: ["File integrity", "Password hashing", "Data verification", "Checksums"],
    relatedTools: ["sha1-generator", "sha256-generator", "hash-generator"],
  },
  "sha1-generator": {
    title: "SHA-1 Hash Generator - Generate SHA-1 Hashes Online",
    description:
      "Generate SHA-1 hashes for text and files. Secure SHA-1 hash calculator with verification and comparison.",
    keywords: ["sha1 generator", "sha1 hash", "sha1 calculator", "hash generator", "cryptographic hash"],
    category: "Hashing",
    features: ["Text hashing", "File hashing", "Hash verification", "Comparison tools"],
    useCases: ["Data integrity", "Digital signatures", "Version control", "Security audits"],
    relatedTools: ["md5-generator", "sha256-generator", "hash-generator"],
  },
  "sha256-generator": {
    title: "SHA-256 Hash Generator - Generate SHA-256 Hashes Online",
    description: "Generate SHA-256 hashes for text and files. Secure SHA-256 hash calculator with advanced options.",
    keywords: ["sha256 generator", "sha256 hash", "sha256 calculator", "hash generator", "secure hash"],
    category: "Hashing",
    features: ["Text hashing", "File hashing", "Hash verification", "Security analysis"],
    useCases: ["Blockchain", "Digital certificates", "Password security", "Data integrity"],
    relatedTools: ["sha512-generator", "md5-generator", "hash-generator"],
  },
  "sha512-generator": {
    title: "SHA-512 Hash Generator - Generate SHA-512 Hashes Online",
    description: "Generate SHA-512 hashes for text and files. High-security SHA-512 hash calculator with verification.",
    keywords: ["sha512 generator", "sha512 hash", "sha512 calculator", "hash generator", "cryptographic hash"],
    category: "Hashing",
    features: ["Text hashing", "File hashing", "Hash verification", "Security analysis"],
    useCases: ["High security applications", "Digital signatures", "Cryptography", "Data integrity"],
    relatedTools: ["sha256-generator", "sha1-generator", "hash-generator"],
  },
  "crc32-generator": {
    title: "CRC32 Hash Generator - Generate CRC32 Checksums Online",
    description: "Generate CRC32 checksums for text and files. Fast CRC32 calculator for data integrity verification.",
    keywords: ["crc32 generator", "crc32 checksum", "crc32 calculator", "checksum generator", "data integrity"],
    category: "Hashing",
    features: ["Text checksums", "File checksums", "Verification", "Error detection"],
    useCases: ["File verification", "Data transmission", "Error detection", "Archive validation"],
    relatedTools: ["md5-generator", "sha256-generator", "hash-generator"],
  },
  "hmac-generator": {
    title: "HMAC Generator - Generate HMAC Hashes with Secret Key",
    description: "Generate HMAC (Hash-based Message Authentication Code) with various hash algorithms and secret keys.",
    keywords: ["hmac generator", "hmac hash", "message authentication", "hmac calculator", "secure hash"],
    category: "Hashing",
    features: ["Multiple algorithms", "Secret key support", "Message authentication", "Verification"],
    useCases: ["API authentication", "Message integrity", "Secure communications", "Token generation"],
    relatedTools: ["hash-generator", "jwt-decoder", "password-encryption"],
  },
  "hash-verifier": {
    title: "Hash Verifier - Verify and Compare Hash Values",
    description:
      "Verify and compare hash values for data integrity. Support for multiple hash algorithms and file verification.",
    keywords: ["hash verifier", "hash checker", "hash comparison", "data integrity", "file verification"],
    category: "Hashing",
    features: ["Hash comparison", "File verification", "Multiple algorithms", "Batch verification"],
    useCases: ["File integrity", "Download verification", "Data validation", "Security audits"],
    relatedTools: ["hash-generator", "file-hash-calculator", "md5-generator"],
  },
  "file-hash-calculator": {
    title: "File Hash Calculator - Calculate Hashes for Files",
    description: "Calculate hash values for uploaded files. Support for multiple hash algorithms and batch processing.",
    keywords: ["file hash calculator", "file checksum", "file hash generator", "file integrity", "hash calculator"],
    category: "Hashing",
    features: ["File upload", "Multiple algorithms", "Batch processing", "Hash comparison"],
    useCases: ["File verification", "Download integrity", "Backup validation", "Security audits"],
    relatedTools: ["hash-generator", "hash-verifier", "md5-generator"],
  },
  "bcrypt-generator": {
    title: "Bcrypt Generator - Generate Bcrypt Password Hashes",
    description:
      "Generate secure bcrypt password hashes with customizable salt rounds. Password hashing for applications.",
    keywords: ["bcrypt generator", "bcrypt hash", "password hash", "bcrypt calculator", "secure password"],
    category: "Hashing",
    features: ["Salt rounds", "Password verification", "Security analysis", "Hash comparison"],
    useCases: ["User authentication", "Password storage", "Security implementation", "Application development"],
    relatedTools: ["argon2-generator", "password-generator", "hash-generator"],
  },
  "argon2-generator": {
    title: "Argon2 Generator - Generate Argon2 Password Hashes",
    description:
      "Generate secure Argon2 password hashes with customizable parameters. Modern password hashing algorithm.",
    keywords: ["argon2 generator", "argon2 hash", "password hash", "argon2 calculator", "secure password"],
    category: "Hashing",
    features: ["Parameter tuning", "Password verification", "Security analysis", "Performance options"],
    useCases: ["Modern authentication", "High-security applications", "Password storage", "Cryptographic applications"],
    relatedTools: ["bcrypt-generator", "password-generator", "hash-generator"],
  },
  "aes-encryption": {
    title: "AES Encryption/Decryption - Encrypt and Decrypt with AES",
    description: "Encrypt and decrypt text using AES (Advanced Encryption Standard) with various modes and key sizes.",
    keywords: ["aes encryption", "aes decryption", "aes cipher", "symmetric encryption", "data encryption"],
    category: "Encryption",
    features: ["Multiple modes", "Key sizes", "IV generation", "Secure encryption"],
    useCases: ["Data protection", "File encryption", "Secure storage", "Privacy protection"],
    relatedTools: ["rsa-encryption", "des-encryption", "password-encryption"],
  },
  "rsa-encryption": {
    title: "RSA Encryption/Decryption - Public Key Cryptography",
    description:
      "Encrypt and decrypt text using RSA public key cryptography. Generate RSA key pairs and secure messages.",
    keywords: ["rsa encryption", "rsa decryption", "public key encryption", "rsa cipher", "asymmetric encryption"],
    category: "Encryption",
    features: ["Key pair generation", "Public key encryption", "Digital signatures", "Secure communication"],
    useCases: ["Secure messaging", "Digital signatures", "Key exchange", "Certificate generation"],
    relatedTools: ["aes-encryption", "ecc-encryption", "digital-signature"],
  },
  "des-encryption": {
    title: "DES Encryption/Decryption - Data Encryption Standard",
    description: "Encrypt and decrypt text using DES (Data Encryption Standard) and 3DES algorithms.",
    keywords: ["des encryption", "des decryption", "3des encryption", "data encryption standard", "symmetric cipher"],
    category: "Encryption",
    features: ["DES and 3DES", "Multiple modes", "Key management", "Legacy support"],
    useCases: ["Legacy systems", "Compatibility", "Educational purposes", "Historical encryption"],
    relatedTools: ["aes-encryption", "blowfish-encryption", "caesar-cipher"],
  },
  "caesar-cipher": {
    title: "Caesar Cipher - Classical Encryption and Decryption",
    description:
      "Encrypt and decrypt text using the Caesar cipher with customizable shift values. Classical cryptography tool.",
    keywords: ["caesar cipher", "shift cipher", "classical encryption", "substitution cipher", "cryptography"],
    category: "Encryption",
    features: ["Shift values", "Brute force", "Frequency analysis", "Educational tool"],
    useCases: ["Education", "Puzzles", "Historical cryptography", "Simple encoding"],
    relatedTools: ["vigenere-cipher", "rot13-caesar", "text-reverser"],
  },
  "vigenere-cipher": {
    title: "Vigenère Cipher - Polyalphabetic Substitution Cipher",
    description: "Encrypt and decrypt text using the Vigenère cipher with keyword-based encryption.",
    keywords: [
      "vigenere cipher",
      "polyalphabetic cipher",
      "keyword encryption",
      "classical cryptography",
      "substitution cipher",
    ],
    category: "Encryption",
    features: ["Keyword encryption", "Frequency analysis", "Cipher breaking", "Educational tool"],
    useCases: ["Education", "Historical cryptography", "Puzzle solving", "Classical encryption"],
    relatedTools: ["caesar-cipher", "rot13-caesar", "text-encryption"],
  },
  "password-encryption": {
    title: "Password Encryption - Encrypt and Decrypt Passwords",
    description: "Encrypt and decrypt passwords using various encryption algorithms. Secure password protection tool.",
    keywords: ["password encryption", "password protection", "secure passwords", "password cipher", "data protection"],
    category: "Encryption",
    features: ["Multiple algorithms", "Secure encryption", "Password protection", "Key derivation"],
    useCases: ["Password storage", "Data protection", "Security implementation", "Privacy protection"],
    relatedTools: ["aes-encryption", "bcrypt-generator", "password-generator"],
  },
  "pgp-encryption": {
    title: "PGP Encryption/Decryption - Pretty Good Privacy",
    description:
      "Encrypt and decrypt messages using PGP (Pretty Good Privacy) with key management and digital signatures.",
    keywords: ["pgp encryption", "pgp decryption", "pretty good privacy", "email encryption", "digital signatures"],
    category: "Encryption",
    features: ["Key management", "Digital signatures", "Email encryption", "Secure communication"],
    useCases: ["Email security", "File encryption", "Secure communication", "Digital signatures"],
    relatedTools: ["rsa-encryption", "digital-signature", "aes-encryption"],
  },
  "fernet-encryption": {
    title: "Fernet Encryption/Decryption - Symmetric Authenticated Cryptography",
    description:
      "Encrypt and decrypt data using Fernet symmetric authenticated cryptography with timestamp verification.",
    keywords: [
      "fernet encryption",
      "fernet decryption",
      "symmetric encryption",
      "authenticated encryption",
      "cryptography",
    ],
    category: "Encryption",
    features: ["Authenticated encryption", "Timestamp verification", "Key generation", "Secure encryption"],
    useCases: ["Data protection", "Secure storage", "Token encryption", "API security"],
    relatedTools: ["aes-encryption", "jwt-generator", "password-encryption"],
  },
  "ecc-encryption": {
    title: "ECC Encryption - Elliptic Curve Cryptography",
    description: "Encrypt and decrypt data using Elliptic Curve Cryptography (ECC) with efficient key sizes.",
    keywords: [
      "ecc encryption",
      "elliptic curve cryptography",
      "ecc cipher",
      "public key encryption",
      "modern cryptography",
    ],
    category: "Encryption",
    features: ["Efficient key sizes", "Modern cryptography", "Key generation", "Secure encryption"],
    useCases: ["Mobile applications", "IoT security", "Modern cryptography", "Efficient encryption"],
    relatedTools: ["rsa-encryption", "digital-signature", "key-exchange-simulator"],
  },
  "digital-signature": {
    title: "Digital Signature Generator - Create and Verify Digital Signatures",
    description:
      "Generate and verify digital signatures using various algorithms. Ensure document authenticity and integrity.",
    keywords: [
      "digital signature",
      "signature generator",
      "document signing",
      "signature verification",
      "authenticity",
    ],
    category: "Encryption",
    features: ["Signature generation", "Verification", "Multiple algorithms", "Document integrity"],
    useCases: ["Document signing", "Authentication", "Legal documents", "Data integrity"],
    relatedTools: ["rsa-encryption", "ecc-encryption", "pgp-encryption"],
  },
  "blowfish-encryption": {
    title: "Blowfish Encryption/Decryption - Symmetric Block Cipher",
    description: "Encrypt and decrypt data using the Blowfish symmetric block cipher with variable key lengths.",
    keywords: ["blowfish encryption", "blowfish decryption", "blowfish cipher", "symmetric encryption", "block cipher"],
    category: "Encryption",
    features: ["Variable key length", "Fast encryption", "Secure cipher", "Block encryption"],
    useCases: ["Data encryption", "File protection", "Secure storage", "Legacy applications"],
    relatedTools: ["aes-encryption", "des-encryption", "chacha20-encryption"],
  },
  "key-exchange-simulator": {
    title: "Key Exchange Simulator - Diffie-Hellman Key Exchange",
    description: "Simulate cryptographic key exchange protocols including Diffie-Hellman and ECDH.",
    keywords: ["key exchange", "diffie hellman", "ecdh", "key agreement", "cryptographic protocols"],
    category: "Encryption",
    features: ["Protocol simulation", "Key generation", "Educational tool", "Security analysis"],
    useCases: ["Education", "Protocol understanding", "Security research", "Cryptography learning"],
    relatedTools: ["rsa-encryption", "ecc-encryption", "digital-signature"],
  },
  "chacha20-encryption": {
    title: "ChaCha20 Encryption/Decryption - Stream Cipher",
    description: "Encrypt and decrypt data using the ChaCha20 stream cipher with high performance and security.",
    keywords: ["chacha20 encryption", "chacha20 decryption", "stream cipher", "modern encryption", "high performance"],
    category: "Encryption",
    features: ["High performance", "Stream cipher", "Modern cryptography", "Secure encryption"],
    useCases: ["High-speed encryption", "Mobile applications", "Real-time encryption", "Modern security"],
    relatedTools: ["aes-encryption", "fernet-encryption", "blowfish-encryption"],
  },
  "jwt-generator": {
    title: "JWT Generator - Create JSON Web Tokens",
    description:
      "Generate JSON Web Tokens (JWT) with custom headers, payloads, and signatures. JWT creation and validation tool.",
    keywords: ["jwt generator", "json web token", "jwt creator", "token generator", "jwt builder"],
    category: "Generators",
    features: ["Custom headers", "Payload editing", "Signature algorithms", "Token validation"],
    useCases: ["API authentication", "Single sign-on", "Token-based auth", "Microservices"],
    relatedTools: ["jwt-decoder", "hash-generator", "base64-encoder"],
  },
  "text-reverser": {
    title: "Text Reverser - Reverse Text and Strings Online",
    description:
      "Reverse text, words, and characters online. Multiple reversal options including word order and character order.",
    keywords: ["text reverser", "reverse text", "string reverser", "text manipulation", "reverse words"],
    category: "Text Transformers",
    features: ["Character reversal", "Word reversal", "Line reversal", "Custom options"],
    useCases: ["Text manipulation", "Puzzles", "Data processing", "String operations"],
    relatedTools: ["text-repeater", "string-converter", "upside-down-text"],
  },
  "rot13-caesar": {
    title: "ROT13 & Caesar Cipher - Text Encoding and Decoding",
    description: "Encode and decode text using ROT13 and Caesar cipher with customizable shift values.",
    keywords: ["rot13", "caesar cipher", "text encoding", "shift cipher", "text encryption"],
    category: "Text Transformers",
    features: ["ROT13 encoding", "Custom shifts", "Batch processing", "Reverse encoding"],
    useCases: ["Text obfuscation", "Simple encoding", "Puzzles", "Educational purposes"],
    relatedTools: ["caesar-cipher", "vigenere-cipher", "text-reverser"],
  },
  "text-repeater": {
    title: "Text Repeater - Repeat Text Multiple Times",
    description:
      "Repeat text, words, or characters multiple times with customizable separators and formatting options.",
    keywords: ["text repeater", "repeat text", "text multiplier", "string repeater", "text duplication"],
    category: "Text Transformers",
    features: ["Custom repetition", "Separators", "Formatting options", "Bulk generation"],
    useCases: ["Text generation", "Testing data", "Pattern creation", "Content duplication"],
    relatedTools: ["lorem-ipsum", "text-reverser", "string-converter"],
  },
  "pig-latin-translator": {
    title: "Pig Latin Translator - Convert Text to Pig Latin",
    description: "Convert English text to Pig Latin and vice versa. Fun language game translator with custom rules.",
    keywords: ["pig latin", "pig latin translator", "language game", "text translator", "word game"],
    category: "Text Transformers",
    features: ["Bidirectional translation", "Custom rules", "Word processing", "Educational tool"],
    useCases: ["Language games", "Education", "Fun translation", "Word puzzles"],
    relatedTools: ["morse-code-translator", "leet-speak-converter", "text-reverser"],
  },
  "upside-down-text": {
    title: "Upside Down Text Generator - Flip Text Upside Down",
    description: "Generate upside down text using Unicode characters. Create flipped text for social media and fun.",
    keywords: ["upside down text", "flip text", "inverted text", "unicode text", "flipped characters"],
    category: "Text Transformers",
    features: ["Unicode flipping", "Character mapping", "Copy options", "Social media ready"],
    useCases: ["Social media", "Fun text", "Decorative text", "Unique formatting"],
    relatedTools: ["zalgo-text-generator", "text-reverser", "leet-speak-converter"],
  },
  "zalgo-text-generator": {
    title: "Zalgo Text Generator - Create Glitchy Corrupted Text",
    description:
      "Generate Zalgo text with combining characters for a glitchy, corrupted appearance. Customizable intensity.",
    keywords: ["zalgo text", "glitch text", "corrupted text", "zalgo generator", "creepy text"],
    category: "Text Transformers",
    features: ["Intensity control", "Character combining", "Custom effects", "Copy options"],
    useCases: ["Creative text", "Horror themes", "Artistic effects", "Social media"],
    relatedTools: ["upside-down-text", "leet-speak-converter", "text-reverser"],
  },
  "leet-speak-converter": {
    title: "Leet Speak Converter - Convert Text to 1337 Speak",
    description: "Convert normal text to leet speak (1337 speak) with customizable character substitutions.",
    keywords: ["leet speak", "1337 speak", "leet converter", "hacker text", "internet slang"],
    category: "Text Transformers",
    features: ["Character substitution", "Intensity levels", "Custom mappings", "Reverse conversion"],
    useCases: ["Internet culture", "Gaming", "Hacker aesthetics", "Fun text"],
    relatedTools: ["zalgo-text-generator", "upside-down-text", "text-reverser"],
  },
  "morse-code-translator": {
    title: "Morse Code Translator - Convert Text to Morse Code",
    description: "Convert text to Morse code and vice versa. Audio playback and visual representation of Morse code.",
    keywords: ["morse code", "morse translator", "morse converter", "telegraph code", "dot dash"],
    category: "Text Transformers",
    features: ["Bidirectional conversion", "Audio playback", "Visual representation", "Custom timing"],
    useCases: ["Communication", "Education", "Emergency signaling", "Historical interest"],
    relatedTools: ["pig-latin-translator", "text-reverser", "binary-converter"],
  },
  "json-formatter": {
    title: "JSON Formatter & Validator | Beautify, Minify & Validate JSON Online",
    description:
      "Free online JSON Formatter, Validator and Beautifier with advanced options. Format JSON with custom indentation, sort keys, validate syntax, repair malformed JSON, and convert to/from other formats. Built for developers and data professionals.",
    keywords: [
      "json formatter", 
      "json beautifier", 
      "json validator", 
      "json parser", 
      "pretty json", 
      "minify json", 
      "format json online", 
      "json syntax checker",
      "json linter",
      "json editor",
      "json viewer",
      "json pretty print",
      "validate json",
      "json tools",
      "online json formatter",
      "free json formatter",
      "json indentation",
      "json structure validator"
    ],
    category: "Formatters",
    features: [
      "Real-time JSON validation and error highlighting",
      "Beautify JSON with customizable indentation",
      "Minify JSON for compact representation",
      "Sort object keys alphabetically",
      "Tree view visualization of JSON structure",
      "Repair malformed JSON automatically",
      "Nested JSON string parsing",
      "Copy formatted JSON to clipboard",
      "Download formatted JSON",
      "Dark mode support",
      "JSON path query support",
      "JSON schema validation"
    ],
    useCases: [
      "API response debugging and testing",
      "Configuration file management",
      "Data validation before processing",
      "Improving code readability",
      "Preparing JSON for documentation",
      "Optimizing JSON for production",
      "Fixing broken JSON data",
      "Learning JSON structure and syntax",
      "Database export/import preparation",
      "Web development and testing"
    ],
    relatedTools: [
      "yaml-converter", 
      "xml-converter", 
      "universal-converter", 
      "json-validator", 
      "json-diff", 
      "json-minifier"
    ],
  },
  "image-diff": {
    title: "Image Diff - Compare Images Side by Side",
    description: "Compare two images side by side to identify differences. Visual image comparison tool for designers.",
    keywords: ["image diff", "image compare", "image comparison", "visual diff", "image analysis"],
    category: "Diff",
    features: ["Side-by-side comparison", "Difference highlighting", "Zoom controls", "Export options"],
    useCases: ["Design review", "Quality assurance", "Version comparison", "Visual testing"],
    relatedTools: ["text-diff", "image-filters", "image-metadata-viewer"],
  },
  "qr-code-generator": {
    title: "QR Code Generator - Create Custom QR Codes",
    description: "Generate QR codes for text, URLs, WiFi, and more. Customizable colors, sizes, and error correction.",
    keywords: ["qr code generator", "qr code creator", "qr code maker", "barcode generator", "qr scanner"],
    category: "QR & Barcode",
    features: ["Multiple data types", "Customization", "Error correction", "High resolution"],
    useCases: ["Marketing", "Contact sharing", "URL sharing", "Event tickets"],
    relatedTools: ["barcode-generator", "wifi-qr-generator", "vcard-qr-generator"],
  },
  "image-format-converter": {
    title: "Image Format Converter - Convert Between Image Formats",
    description: "Convert images between different formats (JPEG, PNG, WebP, GIF, etc.) with quality and size options.",
    keywords: ["image converter", "image format converter", "jpeg to png", "webp converter", "image transformation"],
    category: "Image Tools",
    features: ["Multiple formats", "Quality control", "Batch conversion", "Size optimization"],
    useCases: ["Web optimization", "Format compatibility", "File size reduction", "Image processing"],
    relatedTools: ["image-compressor", "image-resizer", "image-base64-converter"],
  },
  "barcode-generator": {
    title: "Barcode Generator - Create Various Types of Barcodes",
    description: "Generate different types of barcodes including Code 128, Code 39, EAN, UPC, and more.",
    keywords: ["barcode generator", "barcode creator", "code 128", "ean barcode", "upc barcode"],
    category: "QR & Barcode",
    features: ["Multiple formats", "Customization", "High resolution", "Print ready"],
    useCases: ["Inventory management", "Product labeling", "Asset tracking", "Retail"],
    relatedTools: ["qr-code-generator", "bulk-qr-generator", "image-format-converter"],
  },
  "wifi-qr-generator": {
    title: "WiFi QR Code Generator - Share WiFi Credentials",
    description: "Generate QR codes for WiFi networks to easily share credentials. Support for various security types.",
    keywords: ["wifi qr code", "wifi qr generator", "wifi sharing", "network qr code", "wifi password"],
    category: "QR & Barcode",
    features: ["Security types", "Hidden networks", "Custom styling", "Easy sharing"],
    useCases: ["Guest networks", "Business WiFi", "Home networks", "Event WiFi"],
    relatedTools: ["qr-code-generator", "vcard-qr-generator", "bulk-qr-generator"],
  },
  "vcard-qr-generator": {
    title: "vCard QR Code Generator - Share Contact Information",
    description: "Generate QR codes for contact information (vCard) to easily share business cards and contacts.",
    keywords: ["vcard qr code", "contact qr code", "business card qr", "vcard generator", "contact sharing"],
    category: "QR & Barcode",
    features: ["Complete contact info", "vCard format", "Custom styling", "Easy sharing"],
    useCases: ["Business cards", "Networking", "Contact sharing", "Professional profiles"],
    relatedTools: ["qr-code-generator", "wifi-qr-generator", "bulk-qr-generator"],
  },
  "bulk-qr-generator": {
    title: "Bulk QR Code Generator - Generate Multiple QR Codes",
    description:
      "Generate multiple QR codes in batch from CSV data or lists. Export as ZIP archive with custom naming.",
    keywords: ["bulk qr generator", "batch qr codes", "multiple qr codes", "qr code batch", "mass qr generation"],
    category: "QR & Barcode",
    features: ["Batch processing", "CSV import", "ZIP export", "Custom naming"],
    useCases: ["Event management", "Inventory tracking", "Marketing campaigns", "Asset labeling"],
    relatedTools: ["qr-code-generator", "barcode-generator", "csv-to-json"],
  },
  "image-resizer": {
    title: "Image Resizer - Resize Images Online",
    description:
      "Resize images with custom dimensions, aspect ratio preservation, and quality control. Batch processing support.",
    keywords: ["image resizer", "resize image", "image dimensions", "image scaling", "photo resizer"],
    category: "Image Tools",
    features: ["Custom dimensions", "Aspect ratio", "Quality control", "Batch processing"],
    useCases: ["Web optimization", "Social media", "Print preparation", "Thumbnail creation"],
    relatedTools: ["image-compressor", "image-cropper", "image-format-converter"],
  },
  "image-compressor": {
    title: "Image Compressor - Compress Images Online",
    description:
      "Compress images to reduce file size while maintaining quality. Support for JPEG, PNG, and WebP formats.",
    keywords: ["image compressor", "compress image", "image optimization", "reduce file size", "image quality"],
    category: "Image Tools",
    features: ["Quality control", "Size reduction", "Format optimization", "Batch compression"],
    useCases: ["Web optimization", "Storage saving", "Faster loading", "Bandwidth reduction"],
    relatedTools: ["image-resizer", "image-format-converter", "image-cropper"],
  },
  "image-cropper": {
    title: "Image Cropper - Crop Images Online",
    description: "Crop images with custom aspect ratios, preset dimensions, and precise selection tools.",
    keywords: ["image cropper", "crop image", "image editing", "photo cropper", "image trimming"],
    category: "Image Tools",
    features: ["Custom aspect ratios", "Preset dimensions", "Precise selection", "Preview"],
    useCases: ["Photo editing", "Social media", "Profile pictures", "Image composition"],
    relatedTools: ["image-resizer", "image-filters", "image-background-remover"],
  },
  "image-filters": {
    title: "Image Filters - Apply Filters to Images Online",
    description:
      "Apply various filters and effects to images including blur, brightness, contrast, and artistic filters.",
    keywords: ["image filters", "photo filters", "image effects", "photo editing", "image enhancement"],
    category: "Image Tools",
    features: ["Multiple filters", "Real-time preview", "Adjustable intensity", "Export options"],
    useCases: ["Photo enhancement", "Artistic effects", "Image correction", "Creative editing"],
    relatedTools: ["image-cropper", "image-background-remover", "color-palette-extractor"],
  },
  "image-metadata-viewer": {
    title: "Image Metadata Viewer - View EXIF Data",
    description: "View and analyze image metadata including EXIF data, camera settings, GPS coordinates, and more.",
    keywords: ["image metadata", "exif viewer", "image properties", "photo metadata", "camera data"],
    category: "Image Tools",
    features: ["EXIF data", "GPS coordinates", "Camera settings", "File properties"],
    useCases: ["Photo analysis", "Forensics", "Photography", "Image verification"],
    relatedTools: ["image-diff", "image-filters", "color-palette-extractor"],
  },
  "color-palette-extractor": {
    title: "Color Palette Extractor - Extract Colors from Images",
    description:
      "Extract dominant colors from images to create color palettes. Perfect for design and branding projects.",
    keywords: ["color palette extractor", "image colors", "dominant colors", "color analysis", "design colors"],
    category: "Image Tools",
    features: ["Color extraction", "Palette generation", "Color codes", "Export options"],
    useCases: ["Design projects", "Branding", "Color schemes", "Art analysis"],
    relatedTools: ["color-generator", "image-filters", "image-metadata-viewer"],
  },
  "image-background-remover": {
    title: "Image Background Remover - Remove Backgrounds from Images",
    description: "Remove backgrounds from images automatically using AI. Create transparent backgrounds for photos.",
    keywords: ["background remover", "remove background", "transparent background", "image editing", "photo editing"],
    category: "Image Tools",
    features: ["AI-powered removal", "Transparent backgrounds", "Edge refinement", "Batch processing"],
    useCases: ["Product photos", "Profile pictures", "Design elements", "E-commerce"],
    relatedTools: ["image-cropper", "image-filters", "image-format-converter"],
  },
  "emoji-translator": {
    title: "Emoji Translator - Convert Text to Emojis",
    description: "Convert text to emojis and vice versa. Translate words and phrases into emoji representations.",
    keywords: ["emoji translator", "text to emoji", "emoji converter", "emoji dictionary", "emoji search"],
    category: "Text Transformers",
    features: ["Text to emoji", "Emoji to text", "Emoji dictionary", "Search functionality"],
    useCases: ["Social media", "Creative writing", "Communication", "Fun translation"],
    relatedTools: ["text-reverser", "leet-speak-converter", "upside-down-text"],
  },
  "ascii-art-generator": {
    title: "ASCII Art Generator - Convert Text and Images to ASCII",
    description: "Generate ASCII art from text and images. Create text-based art with customizable fonts and styles.",
    keywords: ["ascii art", "ascii generator", "text art", "ascii converter", "text to ascii"],
    category: "Text Transformers",
    features: ["Text to ASCII", "Image to ASCII", "Multiple fonts", "Customizable styles"],
    useCases: ["Terminal art", "Retro aesthetics", "Text decoration", "Programming comments"],
    relatedTools: ["text-reverser", "morse-code-translator", "zalgo-text-generator"],
  },
  "regex-tester": {
    title: "Regex Tester - Test Regular Expressions Online",
    description: "Test and debug regular expressions with real-time matching, explanation, and common pattern library.",
    keywords: ["regex tester", "regular expression", "regex validator", "pattern matching", "regex debugger"],
    category: "Testers",
    features: ["Real-time testing", "Pattern explanation", "Match highlighting", "Common patterns"],
    useCases: ["Data validation", "Text processing", "Programming", "Pattern matching"],
    relatedTools: ["url-tester", "json-validator", "cron-tester"],
  },
  "color-converter": {
    title: "Color Converter - Convert Between RGB, HEX, HSL, and CMYK Formats",
    description: "Free online color converter tool to easily convert colors between RGB, HEX, HSL, and CMYK formats with real-time preview. Perfect for web developers, designers, and digital artists.",
    keywords: [
      "color converter", 
      "rgb to hex", 
      "hex to rgb", 
      "rgb to hsl", 
      "hsl to rgb", 
      "hex to hsl", 
      "hsl to hex", 
      "rgb to cmyk", 
      "cmyk to rgb", 
      "color format", 
      "color code", 
      "web colors", 
      "color picker", 
      "color transformation", 
      "color format conversion", 
      "web design tools",
      "color preview",
      "color codes",
      "css colors"
    ],
    category: "Converters",
    features: [
      "Convert between RGB, HEX, HSL, and CMYK color formats",
      "Real-time color preview",
      "Copy color codes to clipboard",
      "Random color generator",
      "Detailed color format information",
      "URL synchronization with selected format",
      "Mobile-friendly interface",
      "Color theory guide"
    ],
    useCases: [
      "Web development and CSS styling",
      "Digital design and graphic creation",
      "Print design preparation",
      "UI/UX design work",
      "Brand color management",
      "Accessibility testing and color contrast checking",
      "Educational purposes for learning color theory"
    ],
    relatedTools: [
      "image-color-picker",
      "color-palette-generator",
      "contrast-checker",
      "gradient-generator",
      "svg-converter",
      "css-minifier"
    ]
  },
}

export function generateToolMetadata(toolSlug: string, customTitle?: string, customDescription?: string): Metadata {
  const tool = toolsData[toolSlug]

  if (!tool) {
    return {
      title: "Tool Not Found - Developer Tools",
      description: "The requested tool could not be found.",
    }
  }

  const title = customTitle || tool.title
  const description = customDescription || tool.description
  const url = `https://tools.vercel.app/tools/${toolSlug}`
  
  // Get current date for lastModified
  const today = new Date().toISOString().split('T')[0]

  return {
    title,
    description,
    keywords: tool.keywords.join(", "),
    authors: [{ name: "Developer Tools" }],
    creator: "Developer Tools",
    publisher: "Developer Tools",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL("https://tools.vercel.app"),
    alternates: {
      canonical: url,
      languages: {
        'en-US': `https://tools.vercel.app/tools/${toolSlug}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Developer Tools",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `/og-images/${toolSlug}.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/og-images/${toolSlug}.png`],
      creator: "@devtools",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
      other: {
        yandex: "your-yandex-verification-code",
        bing: "your-bing-verification-code",
      },
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    applicationName: "Developer Tools",
  }
}

// Separate viewport configuration for Next.js 15
export function generateViewport() {
  return {
    themeColor: '#ffffff',
    width: 'device-width',
    initialScale: 1,
  }
}

export function generateStructuredData(toolSlug: string) {
  const tool = toolsData[toolSlug]

  if (!tool) return null

  // Base structured data for SoftwareApplication
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title.split("|")[0].trim(),
    headline: tool.title,
    description: tool.description,
    url: `https://tools.vercel.app/tools/${toolSlug}`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: tool.features,
    keywords: tool.keywords.join(", "),
    author: {
      "@type": "Organization",
      name: "Developer Tools",
      url: "https://tools.vercel.app",
    },
    publisher: {
      "@type": "Organization",
      name: "Developer Tools",
      url: "https://tools.vercel.app",
      logo: {
        "@type": "ImageObject",
        url: "https://tools.vercel.app/logo.png"
      }
    },
    datePublished: "2023-01-01T00:00:00Z",
    dateModified: "2024-01-01T00:00:00Z",
    image: "https://tools.vercel.app/og-image.png",
    screenshot: "https://tools.vercel.app/screenshots/tools-screenshot.png",
    inLanguage: "en-US",
    isAccessibleForFree: true,
    license: "https://opensource.org/licenses/MIT"
  }

  // Add FAQ structured data for converter tools
  if (["universal-converter", "json-formatter", "yaml-converter", "xml-converter", "sql-converter"].includes(toolSlug)) {
    // For tools with FAQs, return a WebPage with FAQPage
    const faqData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: getFAQsForTool(toolSlug)
    }
    
    // Return both schemas as an array
    return [baseStructuredData, faqData]
  }

  return baseStructuredData
}

// Generate FAQs for specific tools to improve SEO
function getFAQsForTool(toolSlug: string) {
  const faqs: Record<string, Array<{question: string, answer: string}>> = {
    "universal-converter": [
      {
        question: "How do I convert between different data formats?",
        answer: "Simply paste your data in the input field, select the source format and target format from the dropdown menus, and click 'Convert'. The tool automatically detects and converts between JSON, YAML, XML, CSV, TOML, INI, and more formats while preserving data structure."
      },
      {
        question: "Is this Universal Data Converter free to use?",
        answer: "Yes, our Universal Data Converter is completely free to use with no limitations. You can convert between all supported formats as many times as you need without any charges or account creation."
      },
      {
        question: "Can I convert large files with this tool?",
        answer: "Yes, the Universal Data Converter supports large files up to 10MB. For very large files, the tool processes the data in your browser to ensure privacy and security of your information."
      },
      {
        question: "Does the converter preserve data types during conversion?",
        answer: "Yes, the Universal Data Converter preserves data types (strings, numbers, booleans, arrays, objects, etc.) during conversion between formats that support them. Some formats have limitations in their type systems, and the converter handles these cases intelligently."
      },
      {
        question: "How secure is my data when using this converter?",
        answer: "All conversions happen entirely in your browser. Your data never leaves your computer or gets sent to any server, ensuring complete privacy and security of your information."
      }
    ],
    "json-formatter": [
      {
        question: "How do I format and beautify JSON data?",
        answer: "Paste your JSON data into the input field and click 'Format JSON'. The tool will automatically validate your JSON, fix any formatting issues, and display a properly indented, beautified version. You can customize the indentation size and style in the settings."
      },
      {
        question: "Can this tool fix invalid or malformed JSON?",
        answer: "Yes, our JSON Formatter has built-in repair functionality that can fix common JSON syntax errors such as missing quotes, commas, and brackets. It highlights errors with detailed messages to help you identify and fix problems in your JSON data."
      },
      {
        question: "How do I minify JSON data?",
        answer: "Paste your JSON data and select the 'Minify' option from the formatting settings. This will remove all unnecessary whitespace, creating a compact version of your JSON that's ideal for production environments and reducing file size."
      },
      {
        question: "Can I sort the keys in my JSON objects alphabetically?",
        answer: "Yes, enable the 'Sort Keys' option in the settings panel. This will sort all object keys alphabetically, making it easier to find specific properties and creating a consistent structure for comparison and version control."
      },
      {
        question: "Is this JSON Formatter tool free to use?",
        answer: "Yes, our JSON Formatter is completely free with no limitations. You can format, validate, beautify, and minify JSON data as many times as you need without any charges or account creation."
      }
    ],
    "yaml-converter": [
      {
        question: "How do I convert YAML to JSON?",
        answer: "Paste your YAML data into the input field, select 'YAML to JSON' conversion, and click 'Convert'. The tool will instantly transform your YAML into properly formatted JSON while preserving the data structure and types."
      },
      {
        question: "How do I convert JSON to YAML?",
        answer: "Paste your JSON data into the input field, select 'JSON to YAML' conversion, and click 'Convert'. The tool will transform your JSON into clean, properly indented YAML format while maintaining the original data structure."
      },
      {
        question: "Does this converter support YAML anchors and aliases?",
        answer: "Yes, our YAML to JSON converter fully supports YAML anchors (&) and aliases (*) for reference handling. When converting to JSON, these references are resolved into their full structure, and when converting back to YAML, the tool attempts to preserve the reference structure when possible."
      },
      {
        question: "Can I convert multi-document YAML files?",
        answer: "Yes, the converter supports YAML files containing multiple documents separated by '---'. When converting to JSON, these are transformed into a JSON array with each document as an element. When converting from JSON arrays back to YAML, you can choose to create separate YAML documents."
      },
      {
        question: "Is my YAML/JSON data secure when using this converter?",
        answer: "Yes, all conversions happen entirely in your browser. Your data never leaves your computer or gets sent to any server, ensuring complete privacy and security of your information."
      }
    ],
    "xml-converter": [
      {
        question: "How do I convert XML to JSON?",
        answer: "Paste your XML data into the input field, select 'XML to JSON' conversion, and click 'Convert'. The tool will transform your XML into properly structured JSON, with options for handling attributes, namespaces, and special XML features."
      },
      {
        question: "How do I convert JSON to XML?",
        answer: "Paste your JSON data into the input field, select 'JSON to XML' conversion, and click 'Convert'. The tool will transform your JSON into well-formed XML, with customizable options for root element name, attributes, and formatting."
      },
      {
        question: "How does this converter handle XML attributes?",
        answer: "The XML to JSON converter provides several options for handling XML attributes. By default, attributes are converted to properties with an '@' prefix, but you can customize this behavior in the settings panel to use a different prefix or structure."
      },
      {
        question: "Can this tool handle XML namespaces?",
        answer: "Yes, the XML converter properly handles XML namespaces. When converting to JSON, namespaces can be preserved as prefixes or expanded to full URIs based on your settings. When converting from JSON to XML, you can define namespace prefixes and URIs."
      },
      {
        question: "Does this converter support XML CDATA sections?",
        answer: "Yes, the XML to JSON converter preserves CDATA sections during conversion. When converting from JSON to XML, you can specify which text content should be wrapped in CDATA sections to preserve special characters and formatting."
      }
    ],
    "sql-converter": [
      {
        question: "How do I convert SQL data to JSON?",
        answer: "Paste your SQL INSERT statements or query results into the input field, select 'SQL to JSON' conversion, and click 'Convert'. The tool will parse the SQL data and transform it into a properly structured JSON array of objects representing your database records."
      },
      {
        question: "Can I convert JSON data back to SQL INSERT statements?",
        answer: "Yes, paste your JSON array of objects into the input field, select 'JSON to SQL' conversion, specify the table name, and click 'Convert'. The tool will generate SQL INSERT statements for each object in your JSON array, with proper type handling and SQL syntax."
      },
      {
        question: "Which SQL dialects does this converter support?",
        answer: "Our SQL converter supports multiple SQL dialects including MySQL, PostgreSQL, SQLite, SQL Server, and Oracle. You can select your preferred dialect in the settings panel to ensure the generated SQL follows the correct syntax and type conventions."
      },
      {
        question: "Can I convert SQL data to formats other than JSON?",
        answer: "Yes, our SQL converter supports conversion to multiple formats including JSON, CSV, YAML, XML, and more. Simply select your desired output format from the dropdown menu after pasting your SQL data."
      },
      {
        question: "How does the tool handle SQL data types during conversion?",
        answer: "The SQL converter preserves data types during conversion by analyzing the SQL syntax and type declarations. Numbers, dates, booleans, and strings are properly converted to their equivalent representations in the target format, ensuring data integrity."
      }
    ]
  }
  
  return faqs[toolSlug]?.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer
    }
  })) || []
}

export function generateBreadcrumbStructuredData(toolSlug: string) {
  const tool = toolsData[toolSlug]

  if (!tool) return null

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://tools.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: "https://tools.vercel.app/tools",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.category,
        item: `https://tools.vercel.app/tools/${tool.category.toLowerCase().replace(/\s+/g, "-")}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: tool.title,
        item: `https://tools.vercel.app/tools/${toolSlug}`,
      },
    ],
  }
}

export const siteMetadata = {
  title: "DevTools - Professional Developer Utilities & Online Tools",
  description:
    "Free online developer tools for data conversion, encoding, testing, validation, and more. Professional utilities for developers, designers, and IT professionals.",
  keywords: [
    "developer tools",
    "online tools",
    "data converter",
    "json formatter",
    "base64 encoder",
    "hash generator",
    "password generator",
    "regex tester",
    "url encoder",
    "text converter",
    "image converter",
    "encryption tools",
    "validation tools",
    "free tools",
    "web tools",
    "programming tools",
    "coding tools",
    "utilities",
  ],
  siteUrl: "https://tools.vercel.app", // Replace with your actual domain
  author: "DevTools Team",
  social: {
    twitter: "@devtools",
    github: "devtools",
  },
}
