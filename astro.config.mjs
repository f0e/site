// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

import tailwindcss from "@tailwindcss/vite";

import svelte from "@astrojs/svelte";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), svelte(), react()],

  vite: {
    plugins: [tailwindcss()],
  },

  trailingSlash: "never",
});
