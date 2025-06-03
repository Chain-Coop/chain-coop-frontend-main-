// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    define: {
      "process.env": Object.entries(env).reduce((prev, [key, val]) => {
        return {
          ...prev,
          [key]: JSON.stringify(val),
        };
      }, {}),
      global: "globalThis",
    },
    optimizeDeps: {
      include: [
        "@workspace/ckeditor5-custom-build",
        "@ckeditor/ckeditor5-editor-classic",
        "@ckeditor/ckeditor5-essentials",
        "@ckeditor/ckeditor5-paragraph",
        "@ckeditor/ckeditor5-basic-styles",
        "@ckeditor/ckeditor5-heading",
        "@ckeditor/ckeditor5-link",
        "@ckeditor/ckeditor5-list",
        "@ckeditor/ckeditor5-block-quote",
        "@ckeditor/ckeditor5-alignment",
        "@ckeditor/ckeditor5-image",
        "@ckeditor/ckeditor5-upload",
        "@ckeditor/ckeditor5-undo",
      ],
    },
    build: {
      rollupOptions: {
        external: (id) => {
          // Don't externalize CKEditor modules during build
          if (id.includes("@ckeditor")) {
            return false;
          }
          return false;
        },
      },
    },
  };
});
