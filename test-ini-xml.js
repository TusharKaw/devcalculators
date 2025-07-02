// Test script for INI to XML conversion
const ini = require('ini');
const { js2xml } = require('xml-js');

// Sample INI data
const iniText = `# Configuration file example
[DEFAULT]
# Default settings
debug = false
log_level = info
timeout = 30

[database]
host = localhost
port = 5432
name = myapp
user = admin
password = secret123

[server]
host = 0.0.0.0
port = 8080
workers = 4
max_connections = 100

[features]
enable_cache = true
cache_size = 1024
enable_ssl = false
compression = gzip`;

// Parse INI
console.log('Parsing INI...');
const parsedData = ini.parse(iniText);
console.log('Parsed INI data:', JSON.stringify(parsedData, null, 2));

// Convert to XML using the same logic as in the component
function convertToXML(data, rootName = "root") {
  try {
    // Handle INI data structure specifically
    // INI data has sections as top-level properties, each containing key-value pairs
    let xmlData;
    
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      // Check if this looks like INI data (has sections with string values)
      const hasSections = Object.values(data).some(value => 
        typeof value === 'object' && value !== null && !Array.isArray(value)
      );
      
      if (hasSections) {
        // This is likely INI data with sections, convert to proper XML structure
        xmlData = { [rootName]: {} };
        
        for (const [sectionName, sectionData] of Object.entries(data)) {
          if (typeof sectionData === 'object' && sectionData !== null && !Array.isArray(sectionData)) {
            // Create section element
            xmlData[rootName][sectionName] = {};
            
            // Add section attributes and elements
            for (const [key, value] of Object.entries(sectionData)) {
              if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                // Nested object - create sub-element
                xmlData[rootName][sectionName][key] = value;
              } else {
                // Simple value - create element with text content
                xmlData[rootName][sectionName][key] = { _text: String(value) };
              }
            }
          } else {
            // Direct value (no section)
            xmlData[rootName][sectionName] = { _text: String(sectionData) };
          }
        }
      } else {
        // Regular object data, wrap in root element
        xmlData = { [rootName]: {} };
        
        for (const [key, value] of Object.entries(data)) {
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            xmlData[rootName][key] = value;
          } else {
            xmlData[rootName][key] = { _text: String(value) };
          }
        }
      }
    } else if (Array.isArray(data)) {
      // Array data
      xmlData = { [rootName]: { item: data.map(item => 
        typeof item === 'object' && item !== null ? item : { _text: String(item) }
      ) } };
    } else {
      // Simple value
      xmlData = { [rootName]: { _text: String(data) } };
    }

    console.log('XML Data structure:', JSON.stringify(xmlData, null, 2));

    const options = {
      compact: false,
      spaces: 2,
      fullTagEmptyElement: false,
      spacesBeforeSlash: 0,
      spacesAfterSlash: 0
    }

    return js2xml(xmlData, options);
  } catch (error) {
    throw new Error(`XML conversion error: ${error.message}`);
  }
}

// Convert to XML
console.log('\nConverting to XML...');
const xmlResult = convertToXML(parsedData);
console.log('XML Result:');
console.log(xmlResult);

console.log('\nTest completed successfully!'); 