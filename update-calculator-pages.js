const fs = require('fs');
const path = require('path');

// Get all calculator directories
const toolsDir = path.join(__dirname, 'app/tools');
const calculatorDirs = fs.readdirSync(toolsDir).filter(dir => {
  const dirPath = path.join(toolsDir, dir);
  return fs.statSync(dirPath).isDirectory();
});

// Pages we've already updated
const updatedPages = [
  'bmi-calculator',
  'age-calculator', 
  'loan-calculator',
  'percentage-calculator'
];

calculatorDirs.forEach(calculatorDir => {
  if (updatedPages.includes(calculatorDir)) {
    console.log(`Skipping ${calculatorDir} - already updated`);
    return;
  }
  
  const pageFilePath = path.join(toolsDir, calculatorDir, 'page.js');
  
  if (!fs.existsSync(pageFilePath)) {
    console.log(`No page.js found for ${calculatorDir}`);
    return;
  }
  
  const content = fs.readFileSync(pageFilePath, 'utf8');
  
  // Check if it's already updated
  if (content.includes('CalculatorLayout')) {
    console.log(`${calculatorDir} already has CalculatorLayout`);
    return;
  }
  
  // Extract the import name and title
  const importMatch = content.match(/import\s+(\w+)\s+from\s+["']\.\/[\w-]+\.jsx["']/);
  if (!importMatch) {
    console.log(`Could not find import for ${calculatorDir}`);
    return;
  }
  
  const importName = importMatch[1];
  const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
  const title = titleMatch ? titleMatch[1].split('|')[0].trim() : importName.replace(/([A-Z])/g, ' $1').trim();
  
  // Create updated content
  const updatedContent = content
    .replace(
      /import\s+\w+\s+from\s+["']\.\/[\w-]+\.jsx["']/,
      `$&\nimport CalculatorLayout from "../../../components/CalculatorLayout.jsx"`
    )
    .replace(
      /export default function \w+Page\(\) \{\s*return\s+<\w+\s+\/>\s*\}/,
      `export default function ${importName}Page() {
  return (
    <CalculatorLayout title="${title}">
      <${importName} />
    </CalculatorLayout>
  )
}`
    );
  
  fs.writeFileSync(pageFilePath, updatedContent);
  console.log(`Updated ${calculatorDir}`);
});

console.log('Done updating calculator pages!');