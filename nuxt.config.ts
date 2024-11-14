import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css"],
  future: {
    compatibilityVersion: 4,
  },
  devServer: {
    https: {
      key: "./192.168.8.134+1-key.pem",
      cert: "./192.168.8.134+1.pem",
    },
    host: "192.168.8.134", // Replace with your IP
    port: 3000,
  },
  experimental: {
    scanPageMeta: "after-resolve",
    sharedPrerenderData: false,
    compileTemplate: true,
    resetAsyncDataToUndefined: true,
    templateUtils: true,
    relativeWatchPaths: true,
    normalizeComponentNames: false,
    defaults: {
      useAsyncData: {
        deep: true,
      },
    },
  },
  unhead: {
    renderSSRHeadOptions: {
      omitLineBreaks: false,
    },
  },

  runtimeConfig: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseApiKey: process.env.SUPABASE_API_KEY,
  },

  i18n: {
    locales: [
      { code: "ar", language: "ar-SA", file: "ar.json", dir: "rtl", name: "العربية" },
      { code: "en", language: "en-US", file: "en.json", name: "English", dir: "ltr" },
    ],
    defaultLocale: "ar",
    lazy: true,
    langDir: "locales/", // Ensure this path is correct
    strategy: "prefix",
  },

  googleFonts: {
    families: {
      "Noto Sans Arabic": true,
      "Noto Sans": true,
    },
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./app/components/ui",
  },

  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "",
    classPrefix: "",
  },

  modules: [
    "@nuxtjs/i18n",
    "@nuxtjs/google-fonts",
    "@nuxt/icon",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "shadcn-nuxt",
  ],
});
