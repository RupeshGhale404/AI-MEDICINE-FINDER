
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command }) => ({
  // Local development: /
  // Production build for GitHub Pages: /AI-MEDICINE-FINDER/
  base: command === "build" ? "/AI-MEDICINE-FINDER/" : "/",

  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
}));
