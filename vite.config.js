import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";

export default defineConfig({
  root: "./src",
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true,
  },
  test: {
    include: ["**/*.{test,spec}.{js,ts}"],
    exclude: [...configDefaults.exclude, "dist/**"],
  },
});
