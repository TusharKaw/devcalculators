import TimeZoneConverter from "./time-zone-converter.jsx"
import CalculatorLayout from "../../../components/CalculatorLayout.jsx"

export const metadata = {
  title: "Time Zone Converter | Devcalculators.com",
  description: "Free Time Zone Converter. Convert times between different time zones and plan meetings.",
  keywords: "time zone converter, meeting planner, world clock converter",
  canonical: "https://devcalculators.com/tools/time-zone-converter",
}

export default function TimeZoneConverterPage() {
  return (
    <CalculatorLayout title="Time Zone Converter">
      <TimeZoneConverter />
    </CalculatorLayout>
  )
} 
