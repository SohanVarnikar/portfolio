import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";
import path from "node:path";
import process from "node:process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
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
    // Load all environment variables (prefixed or not) into the test context
    env: loadEnv(mode, process.cwd(), ""),
  },
  // Test section
}));
