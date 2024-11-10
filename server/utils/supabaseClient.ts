import { createClient } from "@supabase/supabase-js";

let client: ReturnType<typeof createClient> | null = null;

export const getSupabaseClient = () => {
  if (client) return client;

  const config = useRuntimeConfig();

  client = createClient(config.supabaseUrl, config.supabaseApiKey);

  return client;
};
