import CurrencyConverter from "./currency-converter.jsx"
import CalculatorLayout from '@/components/CalculatorLayout';

export const metadata = {
  title: "Currency Converter | Devcalculators.com",
  description: "Free Currency Converter. Convert between different currencies with real-time exchange rates.",
  keywords: "currency converter, exchange rate calculator, money converter",
  canonical: "https://Devcalculators.com/tools/currency-converter.html",
}

export default function CurrencyConverterPage() {
  return (
    <CalculatorLayout title="Crypto Converter">
      <CurrencyConverter />
    </CalculatorLayout>
  );
} 