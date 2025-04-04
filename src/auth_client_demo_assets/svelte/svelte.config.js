import adapter from "@sveltejs/adapter-static";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter({
      fallback: "index.html", // may differ from host to host
      precompress: false,
      pages: path.resolve(__dirname, "..", "dist", "svelte"),
      assets: path.resolve(__dirname, "..", "dist", "svelte"),
    }),
    serviceWorker: {
      register: false,
    },
    paths: {
      base: "/svelte",
    },
  },
};

export default config;
