import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, " "),
      },
      "/cloud": {
        target: "https://api.cloudinary.com",
        changeOrigin: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    },
  },
});
