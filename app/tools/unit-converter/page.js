import UnitConverter from './unit-converter'

export const metadata = {
  title: 'Unit Converter - Convert Between Different Units of Measurement',
  description: 'Free unit converter to convert between length, weight, temperature, area, volume, and more. Easy-to-use tool for unit conversions.',
  keywords: 'unit converter, measurement converter, length converter, weight converter, temperature converter, area converter, volume converter, free unit converter',
  openGraph: {
    title: 'Unit Converter - Convert Between Different Units of Measurement',
    description: 'Free unit converter to convert between length, weight, temperature, area, volume, and more.',
  },
  alternates: {
    canonical: 'https://devcalculators.com/tools/unit-converter'
  }
}

export default function UnitConverterPage() {
  return <UnitConverter />
} 