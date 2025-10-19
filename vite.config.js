import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root: ".",
  base: "/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        list: resolve(__dirname, "src/pages/list.html"),
        about: resolve(__dirname, "src/pages/about.html"),
        details: resolve(__dirname, "src/pages/details.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
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
