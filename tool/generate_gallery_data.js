// Generate galleryData.json from ImageKit CSV exports
// Usage: node tool/generate_gallery_data.js

const fs = require("fs");
const path = require("path");

const CSV_FILES = [
  {
    key: "pre_wedding",
    path: "/Users/duongquocnghi/Downloads/media-library-export-2026-03-05_21-56-24.csv",
  },
  {
    key: "wedding_3101",
    path: "/Users/duongquocnghi/Downloads/media-library-export-2026-03-05_21-57-40.csv",
  },
  {
    key: "wedding_0802",
    path: "/Users/duongquocnghi/Downloads/media-library-export-2026-03-05_22-15-34.csv",
  },
];

function extractUrlsFromCsv(content) {
  const lines = content.split("\n").filter((l) => l.trim().length > 0);
  if (lines.length <= 1) return [];

  // Skip header
  const dataLines = lines.slice(1);

  const urls = [];

  for (const rawLine of dataLines) {
    const line = rawLine.trim();
    if (!line) continue;

    // Very simple CSV split, safe here because URL does not contain commas
    const parts = line.split('","');
    if (parts.length < 6) continue;

    let url = parts[5];
    // Remove leading and trailing quotes if any
    if (url.startsWith('"')) url = url.slice(1);
    if (url.endsWith('"')) url = url.slice(0, -1);

    if (url) {
      urls.push(url);
    }
  }

  return urls;
}

function main() {
  const result = {
    data: {},
  };

  for (const file of CSV_FILES) {
    const csvPath = file.path;
    if (!fs.existsSync(csvPath)) {
      console.warn(`CSV file not found, skipping: ${csvPath}`);
      result.data[file.key] = [];
      continue;
    }

    const content = fs.readFileSync(csvPath, "utf8");
    const urls = extractUrlsFromCsv(content);

    result.data[file.key] = urls.map((url) => ({
      image: url,
      tag: [],
      hidden: false,
    }));
  }

  const rootDir = path.resolve(__dirname, "..");
  const outPath = path.join(rootDir, "lib", "constants", "galleryData.json");

  const json = JSON.stringify(result, null, 2);
  fs.writeFileSync(outPath, json, "utf8");

  // eslint-disable-next-line no-console
  console.log(`galleryData.json generated at: ${outPath}`);
}

main();

