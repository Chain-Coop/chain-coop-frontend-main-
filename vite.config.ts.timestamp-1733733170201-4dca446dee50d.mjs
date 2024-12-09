// vite.config.ts
import { defineConfig, loadEnv } from "file:///C:/Users/DELL/Desktop/chain-coop-frontend-main-/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/DELL/Desktop/chain-coop-frontend-main-/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tailwindcss from "file:///C:/Users/DELL/Desktop/chain-coop-frontend-main-/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///C:/Users/DELL/Desktop/chain-coop-frontend-main-/node_modules/autoprefixer/lib/autoprefixer.js";
var postcssConfig = {
  plugins: [tailwindcss(), autoprefixer()]
};
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    optimizeDeps: {
      include: ["@workspace/ckeditor5-custom-build"]
    },
    plugins: [react()],
    define: {
      "process.env": Object.entries(env).reduce((prev, [key, val]) => {
        return {
          ...prev,
          [key]: JSON.stringify(val)
        };
      }, {})
    },
    css: {
      postcss: postcssConfig
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxERUxMXFxcXERlc2t0b3BcXFxcY2hhaW4tY29vcC1mcm9udGVuZC1tYWluLVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcREVMTFxcXFxEZXNrdG9wXFxcXGNoYWluLWNvb3AtZnJvbnRlbmQtbWFpbi1cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0RFTEwvRGVza3RvcC9jaGFpbi1jb29wLWZyb250ZW5kLW1haW4tL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSBcInRhaWx3aW5kY3NzXCI7XHJcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSBcImF1dG9wcmVmaXhlclwiO1xyXG5cclxuY29uc3QgcG9zdGNzc0NvbmZpZyA9IHtcclxuICBwbHVnaW5zOiBbdGFpbHdpbmRjc3MoKSwgYXV0b3ByZWZpeGVyKCldLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgXCJcIik7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBvcHRpbWl6ZURlcHM6IHtcclxuICAgICAgaW5jbHVkZTogW1wiQHdvcmtzcGFjZS9ja2VkaXRvcjUtY3VzdG9tLWJ1aWxkXCJdLFxyXG4gICAgfSxcclxuICAgIHBsdWdpbnM6IFtyZWFjdCgpXSxcclxuICAgIGRlZmluZToge1xyXG4gICAgICBcInByb2Nlc3MuZW52XCI6IE9iamVjdC5lbnRyaWVzKGVudikucmVkdWNlKChwcmV2LCBba2V5LCB2YWxdKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIC4uLnByZXYsXHJcbiAgICAgICAgICBba2V5XTogSlNPTi5zdHJpbmdpZnkodmFsKSxcclxuICAgICAgICB9O1xyXG4gICAgICB9LCB7fSksXHJcbiAgICB9LFxyXG4gICAgY3NzOiB7XHJcbiAgICAgIHBvc3Rjc3M6IHBvc3Rjc3NDb25maWcsXHJcbiAgICB9LFxyXG4gIH07XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlVLFNBQVMsY0FBYyxlQUFlO0FBQy9XLE9BQU8sV0FBVztBQUNsQixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLGtCQUFrQjtBQUV6QixJQUFNLGdCQUFnQjtBQUFBLEVBQ3BCLFNBQVMsQ0FBQyxZQUFZLEdBQUcsYUFBYSxDQUFDO0FBQ3pDO0FBRUEsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO0FBRTNDLFNBQU87QUFBQSxJQUNMLGNBQWM7QUFBQSxNQUNaLFNBQVMsQ0FBQyxtQ0FBbUM7QUFBQSxJQUMvQztBQUFBLElBQ0EsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLElBQ2pCLFFBQVE7QUFBQSxNQUNOLGVBQWUsT0FBTyxRQUFRLEdBQUcsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFNO0FBQzlELGVBQU87QUFBQSxVQUNMLEdBQUc7QUFBQSxVQUNILENBQUMsR0FBRyxHQUFHLEtBQUssVUFBVSxHQUFHO0FBQUEsUUFDM0I7QUFBQSxNQUNGLEdBQUcsQ0FBQyxDQUFDO0FBQUEsSUFDUDtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gsU0FBUztBQUFBLElBQ1g7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
