import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const supabaseServer = () => {
  const cookieStore = cookies(); // Убираем await, так как cookies() синхронная
  return createServerComponentClient({
    cookies: () => cookieStore,
  });
};