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
    assetsInlineLimit: 4096,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        list: resolve(__dirname, "src/pages/list.html"),
        about: resolve(__dirname, "src/pages/about.html"),
        details: resolve(__dirname, "src/pages/details.html"),
      },
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".").at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "img";
          }
          // Don't hash the logo SVG
          if (assetInfo.name === "rockwatcherlogo.svg") {
            return `assets/img/[name][extname]`;
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
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
