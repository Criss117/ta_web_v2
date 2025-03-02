import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    TanStackRouterVite({ autoCodeSplitting: true }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "./src/modules/shared"),
      "@products": path.resolve(__dirname, "./src/modules/products"),
      "@clients": path.resolve(__dirname, "./src/modules/clients"),
      "@ui": path.resolve(__dirname, "./src/components/ui"),
      "@form": path.resolve(__dirname, "./src/components/form"),
      "@tickets": path.resolve(__dirname, "./src/modules/tickets"),
    },
  },
  build: {
    commonjsOptions: {
      exclude: ["@faker-js/faker"],
    },
  },
});
