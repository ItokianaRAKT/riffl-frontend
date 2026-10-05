import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const backendUrl = "http://localhost:3000";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/files": backendUrl,
      "/stream": backendUrl,
      "/cover": backendUrl,
      "/action": backendUrl,
    },
  },
});
