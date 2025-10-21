// build.js
import { copyFile, mkdir } from "fs/promises";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import process from "node:process";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function moveFiles() {
  try {
    // Create directories if they don't exist
    await mkdir(resolve(__dirname, "dist"), { recursive: true });

    // Copy files from src/pages to root of dist
    const pages = ["list.html", "about.html", "details.html"];
    for (const page of pages) {
      try {
        await copyFile(
          resolve(__dirname, `dist/src/pages/${page}`),
          resolve(__dirname, `dist/${page}`),
        );
      } catch (err) {
        console.warn(`Warning: Could not copy ${page}: ${err.message}`);
      }
    }

    console.log("Files processed successfully");
  } catch (error) {
    console.error("Error moving files:", error);
    process.exit(1);
  }
}

moveFiles().catch((error) => {
  console.error("Build script failed:", error);
  process.exit(1);
});
