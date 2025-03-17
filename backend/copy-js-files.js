const fs = require('fs');
const path = require('path');

// Function to recursively copy JavaScript files
function copyJsFiles(sourceDir, targetDir) {
  // Create target directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Read source directory
  const items = fs.readdirSync(sourceDir);

  // Process each item
  for (const item of items) {
    const sourcePath = path.join(sourceDir, item);
    const targetPath = path.join(targetDir, item);

    // Get item stats
    const stats = fs.statSync(sourcePath);

    if (stats.isDirectory()) {
      // Recursively copy subdirectories
      copyJsFiles(sourcePath, targetPath);
    } else if (stats.isFile() && item.endsWith('.js')) {
      // Copy JavaScript files
      console.log(`Copying ${sourcePath} to ${targetPath}`);
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

// Source and target directories
const sourceDir = path.join(__dirname, 'src');
const targetDir = path.join(__dirname, 'dist');

// Start copying
console.log('Copying JavaScript files...');
copyJsFiles(sourceDir, targetDir);
console.log('Done!'); 