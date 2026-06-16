import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(
  supabaseUrl,
  supabaseKey,
  {
    auth : {
      persistSession : true,
      autoRefreshToken : true,
      detectSessionInUrl : true,
      storage : window.localStorage,
      storageKey : "userSession",
      multiTab : false
    }
  }
);

export default supabase;
