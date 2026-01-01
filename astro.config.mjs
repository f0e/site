// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

import tailwindcss from "@tailwindcss/vite";

import svelte from "@astrojs/svelte";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://tekno.sh",

  integrations: [mdx(), svelte(), react()],

  vite: {
    plugins: [tailwindcss()],
  },

  trailingSlash: "never",

  markdown: {
    shikiConfig: {
      themes: {
        light: "kanagawa-lotus",
        dark: "kanagawa-dragon",
      },
    },
  },
});
