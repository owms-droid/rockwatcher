import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";

export default defineConfig({
  root: ".",
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "./index.html",
        list: "./src/pages/list.html",
        about: "./src/pages/about.html",
        details: "./src/pages/details.html",
      },
    },
  },
  server: {
    port: 3000,
    open: true,
    fs: {
      allow: [".."],
    },
  },
  test: {
    include: ["**/*.{test,spec}.{js,ts}"],
    exclude: [...configDefaults.exclude, "dist/**"],
  },
});
