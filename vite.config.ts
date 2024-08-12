import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import postcssConfig from './postcss.config';

/// <reference types="vite/client" />

export default defineConfig({
  optimizeDeps: {
    include: ["@workspace/ckeditor5-custom-build"],
  },
  plugins: [react()],
  define: {
    'process.env': import.meta.env,
  },
  css: {
    postcss: postcssConfig,
  },
});
