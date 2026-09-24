// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

import tailwindcss from "@tailwindcss/vite";

import svelte from "@astrojs/svelte";

import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://tekno.sh",

  integrations: [
    mdx(),
    svelte(),
    react(),
    // skip the 404 page
    sitemap({
      filter: (page) => !/\/404$/.test(page),
    }),
  ],

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
