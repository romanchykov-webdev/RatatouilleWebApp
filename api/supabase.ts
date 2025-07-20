// api/supabase.ts
import { createClient } from '@supabase/supabase-js';

// Клиент для браузера (client-side)
export const createClientSupabase = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
};
