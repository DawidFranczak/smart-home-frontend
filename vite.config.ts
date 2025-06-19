import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "assets/main.js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "assets/style.css";
          }
          return "assets/[name][extname]";
        },
        chunkFileNames: "assets/[name].js",
      },
    },
  },
});
