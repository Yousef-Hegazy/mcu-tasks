export {};

declare module "nuxt/schema" {
  interface RuntimeConfig {
    supabaseUrl: string;
    supabaseApiKey: string;
  }
}
