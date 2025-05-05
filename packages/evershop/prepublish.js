const fs = require('fs');
const path = require('path');

// Define source and destination paths for the README file
const sourcePath = path.resolve(__dirname, '../../README.md');
const destinationPath = path.resolve(__dirname, './README.md');

// Copy the README file
fs.copyFile(sourcePath, destinationPath, (err) => {
  if (err) {
    console.error(`Failed to copy README.md from ${sourcePath} to ${destinationPath}:`, err.message);
    process.exit(1); // Exit with an error code
  } else {
    console.log(`Successfully copied README.md to ${destinationPath}`);
  }
});
