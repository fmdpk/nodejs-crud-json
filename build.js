const fs = require("fs");
const path = require("path");

const srcFilePath = path.join(__dirname, "src", "data", "items.json");
const destFilePath = path.join(__dirname, "dist", "data", "items.json");

// Create the dist/data directory if it doesn't exist
if (!fs.existsSync(path.dirname(destFilePath))) {
  fs.mkdirSync(path.dirname(destFilePath), { recursive: true });
}

// Copy the items.json file
fs.copyFileSync(srcFilePath, destFilePath);
console.log(`Copied items.json to ${destFilePath}`);
