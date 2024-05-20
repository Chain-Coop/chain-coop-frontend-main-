import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";

export default defineConfig({
  optimizeDeps: {
    include: ["@workspace/ckeditor5-custom-build"],
  },

  plugins: [
    react(),
    /@workspace\/ckeditor5-custom-build/,
    /node_modules/,
    autoprefixer(),
  ],
  define: {
    "process.env": import.meta.env,
  },
});
