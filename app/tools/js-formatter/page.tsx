import { Metadata } from "next"
import { ToolSEOHead } from "@/components/tool-seo-head"
import { JSFormatter } from "./js-formatter"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Book, ArrowLeft, Wrench, Code } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "JavaScript Formatter | Minify & Beautify JS Code",
  description: "Minify or beautify JavaScript code with customizable formatting options, indentation, and spacing preferences. Free online JS formatter for developers.",
  keywords: [
    "JavaScript formatter",
    "JS beautifier",
    "JS minifier",
    "format JavaScript",
    "beautify JS",
    "minify JS",
    "code formatter",
    "online JavaScript formatter",
    "JavaScript code beautifier",
    "JavaScript code minifier",
    "format JS online",
    "JS code style",
    "JavaScript indentation",
    "JavaScript code cleanup"
  ],
  openGraph: {
    title: "JavaScript Formatter | Minify & Beautify JS Code",
    description: "Minify or beautify JavaScript code with customizable formatting options, indentation, and spacing preferences. Free online JS formatter for developers.",
    type: "website",
    siteName: "Developer Tools",
  },
  twitter: {
    card: "summary_large_image",
    title: "JavaScript Formatter | Minify & Beautify JS Code",
    description: "Minify or beautify JavaScript code with customizable formatting options, indentation, and spacing preferences. Free online JS formatter for developers.",
  },
  alternates: {
    canonical: "/tools/js-formatter",
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does a JavaScript formatter do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A JavaScript formatter organizes and beautifies your JS code, making it easier to read and maintain. It can also minify code for production by removing unnecessary whitespace and comments."
      }
    },
    {
      "@type": "Question",
      name: "How do I use the JavaScript Formatter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paste or type your JavaScript code into the input area, select your formatting options, and click the format or minify button to see the result."
      }
    },
    {
      "@type": "Question",
      name: "Is this JavaScript formatter free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, this tool is completely free and runs entirely in your browser. No code is sent to any server."
      }
    },
    {
      "@type": "Question",
      name: "Can I minify my JavaScript code for production?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can switch to minify mode to compress your JavaScript code for faster loading in production environments."
      }
    },
    {
      "@type": "Question",
      name: "Does the tool support ES6+ syntax?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the formatter supports modern JavaScript syntax including ES6 and beyond."
      }
    }
  ]
}

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "JavaScript Formatter",
  description: "Online tool to format, beautify, and minify JavaScript code with customizable options.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "Beautify JavaScript code",
    "Minify JavaScript code",
    "Custom indentation and spacing",
    "Support for ES6+ syntax",
    "Code cleanup and style enforcement",
    "Download or copy formatted code",
    "No server-side processing"
  ]
}

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Format JavaScript Code Online",
  description: "Step-by-step guide to formatting and minifying JavaScript code using the online JS Formatter tool.",
  step: [
    {
      "@type": "HowToStep",
      name: "Paste or Type Code",
      text: "Enter your JavaScript code into the input area."
    },
    {
      "@type": "HowToStep",
      name: "Choose Formatting Options",
      text: "Select your preferred indentation, spacing, and style options."
    },
    {
      "@type": "HowToStep",
      name: "Format or Minify",
      text: "Click the format or minify button to process your code."
    },
    {
      "@type": "HowToStep",
      name: "Copy or Download Result",
      text: "Copy the formatted code to your clipboard or download it as a file."
    }
  ]
}

export default function JSFormatterPage() {
  return (
    <>
      <ToolSEOHead
        toolSlug="js-formatter"
        title="JavaScript Formatter | Minify & Beautify JS Code"
        description="Minify or beautify JavaScript code with customizable formatting options, indentation, and spacing preferences. Free online JS formatter for developers."
        schema={[faqSchema, softwareApplicationSchema, howToSchema]}
        keywords="JavaScript formatter, JS beautifier, JS minifier, format JavaScript, beautify JS, minify JS, code formatter, online JavaScript formatter, JavaScript code beautifier, JavaScript code minifier, format JS online, JS code style, JavaScript indentation, JavaScript code cleanup"
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link href="/tools" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tools
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">JavaScript Formatter</h1>
            <p className="text-xl text-gray-600 mb-6">
              Minify or beautify JavaScript code with customizable formatting options. Easily compress your code for production or format it for readability.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">JavaScript</Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">Minify</Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">Beautify</Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">Code Formatting</Badge>
            </div>
          </div>

          {/* Tool */}
          <div className="mb-8">
            <JSFormatter />
          </div>

          {/* Information Sections */}
          <div className="grid gap-6 lg:grid-cols-2 mb-8">
            {/* About JavaScript Formatting */}
            <Card className="border-blue-200">
              <CardHeader className="bg-blue-50 border-b border-blue-100">
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Book className="h-5 w-5" />
                  About JavaScript Formatting
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <p className="text-sm">
                  JavaScript formatting is the process of organizing code to improve readability and maintainability.
                  Proper formatting makes code easier to debug, understand, and collaborate on.
                </p>
                
                <div className="space-y-3">
                  <h4 className="font-semibold">Beautification</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                    <li>Adds proper indentation based on code structure</li>
                    <li>Inserts line breaks at logical points</li>
                    <li>Formats whitespace around operators and keywords</li>
                    <li>Ensures consistent spacing and style</li>
                    <li>Makes code easier to read and maintain</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Minification</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                    <li>Removes unnecessary whitespace, comments, and line breaks</li>
                    <li>Reduces file size for faster loading in browsers</li>
                    <li>Can shorten variable names in advanced minifiers</li>
                    <li>Essential for production JavaScript files</li>
                    <li>Can improve page load performance</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Benefits of Formatting */}
            <Card className="border-green-200">
              <CardHeader className="bg-green-50 border-b border-green-100">
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Wrench className="h-5 w-5" />
                  Benefits of Code Formatting
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">Developer Benefits</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                    <li>Improves code readability and comprehension</li>
                    <li>Makes debugging easier by providing clear visual structure</li>
                    <li>Enforces consistent style across a codebase</li>
                    <li>Reduces cognitive load when reading complex code</li>
                    <li>Makes code reviews more efficient</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Production Benefits</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                    <li>Minified code reduces bandwidth usage</li>
                    <li>Faster page load times for end users</li>
                    <li>Smaller file sizes for mobile users</li>
                    <li>Can be part of a comprehensive optimization strategy</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Best Practices */}
            <Card className="border-purple-200">
              <CardHeader className="bg-purple-50 border-b border-purple-100">
                <CardTitle className="flex items-center gap-2 text-purple-800">
                  <Code className="h-5 w-5" />
                  JavaScript Formatting Best Practices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">Style Consistency</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                    <li>Use consistent indentation (2 or 4 spaces typically)</li>
                    <li>Choose a consistent quote style (single or double quotes)</li>
                    <li>Set clear rules for semicolons (always or never)</li>
                    <li>Use consistent brace style</li>
                    <li>Consider adopting an established style guide (Airbnb, Google, Standard)</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Automation</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                    <li>Use auto-formatters like Prettier in your development workflow</li>
                    <li>Integrate formatting with your editor</li>
                    <li>Consider format-on-save functionality</li>
                    <li>Use linters like ESLint alongside formatters</li>
                    <li>Include formatting in CI/CD pipelines</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Tool Features */}
            <Card className="border-orange-200">
              <CardHeader className="bg-orange-50 border-b border-orange-100">
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <Wrench className="h-5 w-5" />
                  Using This Formatter
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">Key Features</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                    <li>Toggle between beautify and minify modes</li>
                    <li>Customize indentation size and type</li>
                    <li>Set quote style preferences (single or double quotes)</li>
                    <li>Control semicolon insertion</li>
                    <li>Configure trailing comma style</li>
                    <li>Adjust bracket spacing</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Common Uses</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                    <li>Beautify code before debugging or code reviews</li>
                    <li>Minify code before deploying to production</li>
                    <li>Convert between different style conventions</li>
                    <li>Clean up messy or inconsistent code</li>
                    <li>Prepare code snippets for documentation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
} 