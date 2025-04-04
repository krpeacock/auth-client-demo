import path from "path";
import { defineConfig } from "vite";
import EnvironmentPlugin from "vite-plugin-environment";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  root: path.resolve(__dirname, "src", "auth_client_demo_assets", "vanilla"),
  base: "/vanilla/",
  build: {
    outDir: path.resolve(
      __dirname,
      "src",
      "auth_client_demo_assets",
      "dist",
      "vanilla"
    ),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(
          __dirname,
          "src",
          "auth_client_demo_assets",
          "vanilla",
          "index.html"
        ),
      },
    },
  },
  define: {
    global: "window",
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4943",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    EnvironmentPlugin("all", { prefix: "CANISTER_" }),
    EnvironmentPlugin("all", { prefix: "DFX_" }),
    EnvironmentPlugin({ BACKEND_CANISTER_ID: "" }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      target: "es2018",
    },
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
});
