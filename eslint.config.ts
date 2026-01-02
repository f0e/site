import globals from "globals";
import path from "path";
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import json from "@eslint/json";
import prettier from "eslint-config-prettier";
import astro from "eslint-plugin-astro";
import astroParser from "astro-eslint-parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import svelte from "eslint-plugin-svelte";
import tailwind from "eslint-plugin-better-tailwindcss";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    ignores: [".astro/**", ".vscode", "dist", "public"],
  },

  // json
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: [json.configs.recommended],
  },

  // javascript/typescript
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: [js.configs.recommended],
  },

  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: { globals: { ...globals.browser } },
  },

  tseslint.configs.recommended,

  // react
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { reactHooks, react },
    extends: [
      reactHooks.configs.flat["recommended-latest"],
      react.configs.flat.recommended,
      react.configs.flat["jsx-runtime"],
    ],
  },

  // astro
  {
    plugins: { astro, "better-tailwindcss": tailwind },
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
    },
    extends: [
      ...astro.configs.recommended.filter((c) => !c.files),
      ...astro.configs["jsx-a11y-strict"].filter((c) => !c.files),
    ],
    rules: {
      // enable all recommended rules to report a warning
      ...tailwind.configs["recommended-warn"].rules,
      // enable all recommended rules to report an error
      ...tailwind.configs["recommended-error"].rules,
      "better-tailwindcss/no-unregistered-classes": [
        "warn",
        {
          ignore: ["post", "masky", "requires-js", "fade-in"],
        },
      ],
    },
    files: ["**/*.astro"],
    settings: {
      "better-tailwindcss": {
        entryPoint: path.resolve(__dirname, "src/styles/global.css"),
      },
    },
  },

  // svelte
  {
    files: ["**/*.{svelte}"],
    plugins: { svelte },
    extends: [js.configs.recommended],
  },

  // prettier - must be last
  prettier,
);
