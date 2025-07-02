import { redirect } from "next/navigation"

export default function JSONToCSVRedirect() {
  redirect("/tools/csv-json-converter/json-to-csv")
} 