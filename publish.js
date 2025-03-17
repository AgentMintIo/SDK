/**
 * Script to help with publishing the package to npm
 * 
 * Usage:
 * node publish.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

// Helper function to execute commands
function exec(command) {
  try {
    console.log(`${colors.cyan}> ${command}${colors.reset}`);
    return execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`${colors.red}Error executing command: ${command}${colors.reset}`);
    throw error;
  }
}

// Main function
async function main() {
  console.log(`\n${colors.bright}${colors.green}=== Publishing Agent Mint SDK ===${colors.reset}\n`);
  
  // Check if dist directory exists and is not empty
  if (!fs.existsSync('dist') || fs.readdirSync('dist').length === 0) {
    console.log(`${colors.yellow}Building package...${colors.reset}`);
    exec('npm run build');
  }
  
  // Run tests
  console.log(`\n${colors.yellow}Running tests...${colors.reset}`);
  exec('npm test');
  
  // Publish to npm
  console.log(`\n${colors.yellow}Publishing to npm...${colors.reset}`);
  exec('npm publish');
  
  console.log(`\n${colors.bright}${colors.green}=== Package published successfully! ===${colors.reset}\n`);
}

// Run the main function
main().catch(error => {
  console.error(`${colors.red}Error: ${error.message}${colors.reset}`);
  process.exit(1);
}); 