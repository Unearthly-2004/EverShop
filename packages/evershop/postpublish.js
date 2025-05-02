const fs = require('fs');
const path = require('path');

function getFilesRecursively(dir, files) {
  try {
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        getFilesRecursively(filePath, files);
      } else {
        files.push(filePath);
      }
    });
  } catch (error) {
    console.error(`Error reading directory: ${dir}`, error);
  }
}

const files = [];

try {
  const serveDir = path.resolve(__dirname, './bin/serve');
  getFilesRecursively(serveDir, files);

  files.forEach((file) => {
    try {
      const source = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });
      const result = source.replace(/\.\.\/dist/g, '../src');
      fs.writeFileSync(file, result, 'utf8');
      console.log(`Processed file: ${file}`);
    } catch (error) {
      console.error(`Error processing file: ${file}`, error);
    }
  });

  console.log('Post-publish script completed successfully.');
} catch (error) {
  console.error('Error during post-publish script execution:', error);
}