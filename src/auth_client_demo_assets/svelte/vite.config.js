import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from "path";
import environment from "vite-plugin-environment";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config();

export default defineConfig({
  plugins: [
    sveltekit(),
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
    environment({ BACKEND_CANISTER_ID: "" }),
  ],
  base: "/svelte/",
  build: {
    outDir: path.resolve(__dirname, "..", "dist", "svelte"),
    emptyOutDir: true,
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4943",
        changeOrigin: true,
      },
    },
  },
  define: {
    "process.env": process.env,
  },
});
