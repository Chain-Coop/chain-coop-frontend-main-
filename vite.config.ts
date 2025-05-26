import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    optimizeDeps: {
      include: ["@workspace/ckeditor5-custom-build"],
    },
    plugins: [react()],
    define: {
      "process.env": Object.entries(env).reduce((prev, [key, val]) => {
        return {
          ...prev,
          [key]: JSON.stringify(val),
        };
      }, {}),
    },
  };
});
