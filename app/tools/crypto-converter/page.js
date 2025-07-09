import CryptoConverter from "./crypto-converter.jsx"
import CalculatorLayout from '@/components/CalculatorLayout';

export const metadata = {
  title: "Crypto Converter | Devcalculators.com",
  description: "Free Crypto Converter. Convert between cryptocurrencies and fiat currencies.",
  keywords: "crypto converter, cryptocurrency calculator, bitcoin converter",
  canonical: "https://Devcalculators.com/tools/crypto-converter",
}

export default function CryptoConverterPage() {
  return (
    <CalculatorLayout title="Crypto Converter">
      <CryptoConverter />
    </CalculatorLayout>
  );
} 