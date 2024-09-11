// import { defineConfig, loadEnv } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from 'tailwindcss';
// import autoprefixer from 'autoprefixer';
// import postcssConfig from './postcss.config';

// export default defineConfig(({ mode }) => {

//   const env = loadEnv(mode, process.cwd(), '');

//   return {
//     optimizeDeps: {
//       include: ["@workspace/ckeditor5-custom-build"],
//     },
//     plugins: [react()],
//     define: {
//       // Stringify all properties of env
//       'process.env': Object.entries(env).reduce((prev, [key, val]) => {
//         return {
//           ...prev,
//           [key]: JSON.stringify(val),
//         };
//       }, {}),
//     },
//     css: {
//       postcss: postcssConfig,
//     },
//   };
// });

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

const postcssConfig = {
  plugins: [tailwindcss(), autoprefixer()],
};

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
    css: {
      postcss: postcssConfig,
    },
  };
});
