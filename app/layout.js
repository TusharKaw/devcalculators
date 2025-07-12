import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export const metadata = {
  title: {
    default: 'Free Online Calculators - Math, Finance, Health & More',
    template: '%s | Free Online Calculators'
  },
  description: 'Free online calculators for math, finance, health, and more. Easy-to-use tools for everyday calculations.',
  keywords: 'calculator, online calculator, free calculator, math calculator, bmi calculator, calorie calculator, mortgage calculator',
  authors: [{ name: 'DevCalculators' }],
  creator: 'DevCalculators',
  publisher: 'DevCalculators',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devcalculators.com',
    title: 'Free Online Calculators - Math, Finance, Health & More',
    description: 'Free online calculators for math, finance, health, and more. Easy-to-use tools for everyday calculations.',
    siteName: 'DevCalculators',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Calculators - Math, Finance, Health & More',
    description: 'Free online calculators for math, finance, health, and more. Easy-to-use tools for everyday calculations.',
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://devcalculators.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
