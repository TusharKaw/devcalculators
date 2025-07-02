import { MetadataRoute } from 'next'
import { getBaseUrl } from '@/lib/utils'

export const dynamic = 'force-static'

// Define format lists locally since they're no longer exported from page files
const universalFormats = [
  "json", "yaml", "xml", "csv", "toml", "ini", "properties", "tsv", "bson", "ndjson", "sql", "messagepack"
]

const sqlFormats = [
  "sql", "json", "csv", "xml", "yaml", "tsv", "ini", "toml"
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl()
  const currentDate = new Date()
  const sitemapEntries: MetadataRoute.Sitemap = []
  
  // Add homepage
  sitemapEntries.push({
    url: baseUrl,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 1.0,
  })
  
  // Add tools landing page
  sitemapEntries.push({
    url: `${baseUrl}/tools`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  })

  // Add search page
  sitemapEntries.push({
    url: `${baseUrl}/tools/search`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  })

  // Tool categories for better organization
  const toolCategories = [
    'converters',
    'formatters',
    'generators',
    'encoders',
    'encryption',
    'hashing',
    'testers',
    'image-tools',
    'text-transformers',
  ]

  // Add category pages
  toolCategories.forEach(category => {
    sitemapEntries.push({
      url: `${baseUrl}/tools/${category}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    })
  })
  
  // Add static tool pages
  const staticTools = [
    'json-formatter',
    'yaml-converter',
    'xml-converter',
    'text-diff',
    'hash-generator',
    'password-generator',
    'bcrypt-generator',
    'md5-generator',
    'sha1-generator',
    'sha256-generator',
    'sha512-generator',
    'hmac-generator',
    'base64-encoder',
    'jwt-decoder',
    'jwt-generator',
    'qr-code-generator',
    'barcode-generator',
    'color-generator',
    'uuid-generator',
    'password-encryption',
    'text-repeater',
    'text-reverser',
    'lorem-ipsum',
    'meta-tag-generator',
    'robots-txt-generator',
    'regex-tester',
    'cron-tester',
    'url-tester',
    'js-formatter',
    'html-formatter',
    'css-formatter',
    'sql-formatter',
    'json-validator',
    'markdown-converter',
    'color-palette-extractor',
    'image-resizer',
    'image-compressor',
    'image-cropper',
    'image-filters',
    'image-format-converter',
    'image-metadata-viewer',
    'image-background-remover',
    'image-base64-converter',
    'hash-visualizer',
    'hash-verifier',
    'file-hash-calculator',
    'wifi-qr-generator',
    'vcard-qr-generator',
    'bulk-qr-generator',
    'timestamp-converter',
    'string-converter',
    'csv-to-json',
    'color-converter',
    'digital-signature',
    'emoji-translator',
    'upside-down-text',
    'zalgo-text-generator',
    'leet-speak-converter',
    'morse-code-translator',
    'pig-latin-translator',
    'rot13-caesar',
  ]
  
  staticTools.forEach(tool => {
    sitemapEntries.push({
      url: `${baseUrl}/tools/${tool}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  })
  
  // Add Universal Converter format combinations with improved SEO-friendly URLs
  for (const source of universalFormats) {
    for (const target of universalFormats) {
      if (source !== target) {
        sitemapEntries.push({
          url: `${baseUrl}/tools/universal-converter/${source}-to-${target}`,
          lastModified: currentDate,
          changeFrequency: 'monthly',
          priority: 0.7,
        })
      }
    }
  }
  
  // Add SQL Converter format combinations
  for (const source of sqlFormats) {
    for (const target of sqlFormats) {
      if (source !== target) {
        sitemapEntries.push({
          url: `${baseUrl}/tools/sql-converter/${source}-to-${target}`,
          lastModified: currentDate,
          changeFrequency: 'monthly',
          priority: 0.7,
        })
      }
    }
  }
  
  // Add other dynamic format combinations with improved structure
  const otherConverters = [
    {
      path: 'base64-binary-converter',
      formats: ['base64', 'binary', 'hex', 'text'],
      priority: 0.7
    },
    {
      path: 'tsv-converter',
      formats: ['tsv', 'json', 'csv', 'sql', 'xml'],
      priority: 0.7
    },
    {
      path: 'ini-converter',
      formats: ['ini', 'json', 'yaml', 'toml', 'properties'],
      priority: 0.7
    },
    {
      path: 'yaml-converter',
      formats: ['yaml', 'json', 'xml', 'csv'],
      priority: 0.75
    },
    {
      path: 'xml-converter',
      formats: ['xml', 'json', 'yaml', 'csv'],
      priority: 0.75
    }
  ]
  
  otherConverters.forEach(converter => {
    for (const source of converter.formats) {
      for (const target of converter.formats) {
        if (source !== target) {
          sitemapEntries.push({
            url: `${baseUrl}/tools/${converter.path}/${source}-to-${target}`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: converter.priority,
          })
        }
      }
    }
  })
  
  // Encryption tools with algorithm variants
  const encryptionTools = [
    {
      path: 'aes-encryption',
      variants: ['aes-128', 'aes-192', 'aes-256'],
    },
    {
      path: 'rsa-encryption',
      variants: ['rsa-1024', 'rsa-2048', 'rsa-4096'],
    },
  ]

  encryptionTools.forEach(tool => {
    // Base tool URL
    sitemapEntries.push({
      url: `${baseUrl}/tools/${tool.path}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    })

    // Variant URLs
    tool.variants.forEach(variant => {
      sitemapEntries.push({
        url: `${baseUrl}/tools/${tool.path}/${variant}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.65,
      })
    })
  })
  
  return sitemapEntries
}
