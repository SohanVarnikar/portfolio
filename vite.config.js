import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Test section
  test: {
    globals: true,
    environment: "jsdom",
    // this line to handles the 'file://' issue
    transformMode: {
      web: [/.[tj]sx$/],
    },
  },
  // Test section
});
