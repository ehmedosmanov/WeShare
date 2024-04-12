import MillionLint from '@million/lint';
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
var plugins = [react()];
plugins.unshift(MillionLint.vite())
export default defineConfig({
  plugins: plugins,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});