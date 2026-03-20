/**
 * Convert all JPG/JPEG/PNG/GIF images in public/images/ to WebP
 * and delete the originals. SVG files are kept as-is.
 * Existing .webp and .avif files are kept untouched.
 *
 * Usage: node scripts/convert-to-webp.mjs
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";

const IMAGES_DIR = path.resolve("public/images");
const QUALITY = 80; // WebP quality (0-100)
const CONVERTIBLE = /\.(jpe?g|png|gif)$/i;

async function main() {
  const files = fs.readdirSync(IMAGES_DIR);
  const toConvert = files.filter((f) => CONVERTIBLE.test(f));

  console.log(`Found ${toConvert.length} images to convert to WebP.\n`);

  let converted = 0;
  let totalSavedBytes = 0;
  const errors = [];

  for (const file of toConvert) {
    const inputPath = path.join(IMAGES_DIR, file);
    const ext = path.extname(file);
    const baseName = file.slice(0, -ext.length);
    const outputPath = path.join(IMAGES_DIR, `${baseName}.webp`);

    // Skip if WebP version already exists
    if (fs.existsSync(outputPath)) {
      console.log(`  SKIP (webp exists): ${file}`);
      continue;
    }

    try {
      const inputStats = fs.statSync(inputPath);
      const inputSize = inputStats.size;

      await sharp(inputPath)
        .webp({ quality: QUALITY })
        .toFile(outputPath);

      const outputStats = fs.statSync(outputPath);
      const outputSize = outputStats.size;
      const saved = inputSize - outputSize;
      const pct = ((saved / inputSize) * 100).toFixed(1);

      totalSavedBytes += saved;
      converted++;

      console.log(
        `  OK: ${file} (${fmtSize(inputSize)}) -> ${baseName}.webp (${fmtSize(outputSize)}) [${pct}% smaller]`
      );

      // Delete original
      fs.unlinkSync(inputPath);
    } catch (err) {
      errors.push({ file, error: err.message });
      console.error(`  ERROR: ${file} - ${err.message}`);
    }
  }

  console.log(`\n--- Summary ---`);
  console.log(`Converted: ${converted}/${toConvert.length}`);
  console.log(`Total saved: ${fmtSize(totalSavedBytes)}`);
  if (errors.length > 0) {
    console.log(`Errors: ${errors.length}`);
    errors.forEach((e) => console.log(`  - ${e.file}: ${e.error}`));
  }
}

function fmtSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

main().catch(console.error);
