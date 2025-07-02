"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Copy, FileCode, Download, Upload, RefreshCw, Check, X, Code, DownloadCloud } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "sonner"

// Import prettier dynamically to avoid errors
let prettier: any
let parserBabel: any

// Only load in client-side
if (typeof window !== 'undefined') {
  // These will be loaded on demand
  import('prettier/standalone').then(module => { prettier = module.default })
  import('prettier/parser-babel').then(module => { parserBabel = module.default })
}

export function JSFormatter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [modulesLoaded, setModulesLoaded] = useState(false)
  
  // Formatting options
  const [minify, setMinify] = useState(false)
  const [indentSize, setIndentSize] = useState<number>(2)
  const [indentType, setIndentType] = useState<"spaces" | "tabs">("spaces")
  const [quoteStyle, setQuoteStyle] = useState<"single" | "double">("single")
  const [semicolons, setSemicolons] = useState<boolean>(true)
  const [trailingCommas, setTrailingCommas] = useState<string>("es5")
  const [bracketSpacing, setBracketSpacing] = useState<boolean>(true)
  const [arrowParens, setArrowParens] = useState<string>("always")
  const [formatError, setFormatError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Load modules on component mount
  useEffect(() => {
    const loadModules = async () => {
      try {
        const [prettierModule, babelModule] = await Promise.all([
          import('prettier/standalone').then(m => m.default),
          import('prettier/parser-babel').then(m => m.default)
        ]);
        prettier = prettierModule;
        parserBabel = babelModule;
        setModulesLoaded(true);
      } catch (err) {
        console.error("Failed to load formatter modules:", err);
        setFormatError("Failed to load formatter modules. Please try refreshing the page.");
      }
    };
    
    loadModules();
  }, []);
  
  // Format the JS code using prettier-standalone
  const formatJavaScript = async () => {
    if (!input.trim()) {
      toast.error("Please enter some JavaScript code first")
      return
    }
    
    if (!modulesLoaded) {
      toast.error("Formatter modules are still loading. Please wait a moment and try again.")
      return
    }
    
    setFormatError(null)
    setLoading(true)
    
    try {
      if (minify) {
        // Minify code
        const minified = await prettier.format(input, {
          parser: "babel",
          plugins: [parserBabel],
          printWidth: 9999,
          tabWidth: indentSize,
          useTabs: indentType === "tabs",
          semi: semicolons,
          singleQuote: quoteStyle === "single",
          trailingComma: trailingCommas as "es5" | "none" | "all",
          bracketSpacing: bracketSpacing,
          arrowParens: arrowParens as "avoid" | "always",
          proseWrap: "never",
        })
        setOutput(minified)
        toast.success("JavaScript minified successfully")
      } else {
        // Beautify code
        const formatted = await prettier.format(input, {
          parser: "babel",
          plugins: [parserBabel],
          printWidth: 80,
          tabWidth: indentSize,
          useTabs: indentType === "tabs",
          semi: semicolons,
          singleQuote: quoteStyle === "single",
          trailingComma: trailingCommas as "es5" | "none" | "all",
          bracketSpacing: bracketSpacing,
          arrowParens: arrowParens as "avoid" | "always",
        })
        setOutput(formatted)
        toast.success("JavaScript formatted successfully")
      }
    } catch (error) {
      console.error("Error formatting JavaScript:", error)
      setFormatError(error instanceof Error ? error.message : "Unknown error occurred while formatting")
      setOutput(input) // Keep the original input in case of error
      toast.error("Error formatting JavaScript code")
    } finally {
      setLoading(false)
    }
  }
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    toast.success("Copied to clipboard")
    setTimeout(() => setCopied(false), 2000)
  }
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      setInput(content)
      toast.success(`File "${file.name}" loaded`)
    }
    reader.onerror = () => {
      toast.error("Error reading file")
    }
    reader.readAsText(file)
  }
  
  const downloadOutput = () => {
    const blob = new Blob([output], { type: "text/javascript" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "formatted.js"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("File downloaded")
  }
  
  const loadSampleCode = () => {
    setInput(`// Example JavaScript code
function calculateFactorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * calculateFactorial(n - 1);
}

const numbers = [5, 10, 15, 20];
const factorials = numbers.map(num => {
  console.log("Calculating factorial for", num);
  return calculateFactorial(num);
});

const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  address: {
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345"
  },
  hobbies: ["reading", "coding", "hiking"]
};

// Class example
class Calculator {
  constructor(initialValue = 0) {
    this.value = initialValue;
  }
  
  add(num) {
    this.value += num;
    return this;
  }
  
  subtract(num) {
    this.value -= num;
    return this;
  }
  
  multiply(num) {
    this.value *= num;
    return this;
  }
  
  getValue() {
    return this.value;
  }
}

// Arrow function with destructuring
const formatName = ({firstName, lastName}) => \`\${firstName} \${lastName}\`;

console.log(formatName(person));`)
    toast.success("Sample code loaded")
  }
  
  return (
    <div className="space-y-6 bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold">JavaScript Formatter</h2>
          <p className="text-sm text-muted-foreground mt-1">Format or minify your JavaScript code with customizable options</p>
        </div>
        
        <div className="flex items-center gap-2 self-end md:self-auto">
          <Label htmlFor="minify" className="cursor-pointer text-sm font-medium">
            Minify Code
          </Label>
          <Switch
            id="minify"
            checked={minify}
            onCheckedChange={setMinify}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Input JavaScript</Label>
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={loadSampleCode}
                className="text-xs"
              >
                <Code className="h-3 w-3 mr-1" />
                Use Sample Code
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs"
              >
                <Upload className="h-3 w-3 mr-1" />
                Upload
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".js,.jsx,.ts,.tsx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JavaScript code here..."
            className="font-mono min-h-[400px] resize-y bg-white"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Output</Label>
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={formatJavaScript}
                disabled={loading || !input.trim() || !modulesLoaded}
                className="text-xs"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                    Processing...
                  </>
                ) : !modulesLoaded ? (
                  <>
                    <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    Format
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                disabled={!output || loading}
                className="text-xs"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={downloadOutput}
                disabled={!output || loading}
                className="text-xs"
              >
                <DownloadCloud className="h-3 w-3 mr-1" />
                Download
              </Button>
            </div>
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder="Formatted code will appear here..."
            className="font-mono min-h-[400px] resize-y bg-white"
          />
          
          {formatError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{formatError}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Formatting Options</CardTitle>
          <CardDescription>Customize how your JavaScript is formatted</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="indent-size" className="text-sm">Indentation</Label>
              <Select
                value={indentType}
                onValueChange={(value: "spaces" | "tabs") => setIndentType(value)}
              >
                <SelectTrigger id="indent-type">
                  <SelectValue placeholder="Indentation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spaces">Spaces</SelectItem>
                  <SelectItem value="tabs">Tabs</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {indentType === "spaces" && (
              <div className="space-y-2">
                <Label htmlFor="indent-size" className="text-sm">Indent Size</Label>
                <Select
                  value={indentSize.toString()}
                  onValueChange={(value) => setIndentSize(parseInt(value))}
                >
                  <SelectTrigger id="indent-size">
                    <SelectValue placeholder="Indent size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 Spaces</SelectItem>
                    <SelectItem value="4">4 Spaces</SelectItem>
                    <SelectItem value="8">8 Spaces</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="quote-style" className="text-sm">Quote Style</Label>
              <Select
                value={quoteStyle}
                onValueChange={(value: "single" | "double") => setQuoteStyle(value)}
              >
                <SelectTrigger id="quote-style">
                  <SelectValue placeholder="Quote style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single Quotes</SelectItem>
                  <SelectItem value="double">Double Quotes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="trailing-commas" className="text-sm">Trailing Commas</Label>
              <Select
                value={trailingCommas}
                onValueChange={setTrailingCommas}
              >
                <SelectTrigger id="trailing-commas">
                  <SelectValue placeholder="Trailing commas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="es5">ES5 Compatible</SelectItem>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="arrow-parens" className="text-sm">Arrow Function Parentheses</Label>
              <Select
                value={arrowParens}
                onValueChange={setArrowParens}
              >
                <SelectTrigger id="arrow-parens">
                  <SelectValue placeholder="Arrow function parentheses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="always">Always</SelectItem>
                  <SelectItem value="avoid">Avoid When Possible</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="semicolons"
                checked={semicolons}
                onCheckedChange={setSemicolons}
              />
              <Label htmlFor="semicolons" className="cursor-pointer text-sm">
                Use Semicolons
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="bracket-spacing"
                checked={bracketSpacing}
                onCheckedChange={setBracketSpacing}
              />
              <Label htmlFor="bracket-spacing" className="cursor-pointer text-sm">
                Bracket Spacing
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 