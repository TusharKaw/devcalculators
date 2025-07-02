import { MetadataRoute } from 'next'
import { getBaseUrl } from '@/lib/utils'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl()

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        // Disallow duplicate URL patterns and non-canonical URLs
        disallow: [
          // Disallow page2.tsx files
          '/tools/*/page2.tsx',
          '/tools/*/*/page2.tsx',
          
          // Disallow internal format route patterns
          '/tools/*/[[...formats]]/*',
          '/tools/*/[[...params]]/*',
          
          // Disallow non-canonical format combinations
          '/tools/universal-converter/formats',
          '/tools/sql-converter/formats',
          '/tools/base64-binary-converter/formats',
          '/tools/tsv-converter/formats',
          '/tools/ini-converter/formats',
          
          // Disallow internal directories
          '/components/',
          '/lib/',
          '/contexts/',
          '/hooks/',
          '/styles/',
          
          // Admin and development paths
          '/admin/',
          '/dev/',
          '/test/',
        ]
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
