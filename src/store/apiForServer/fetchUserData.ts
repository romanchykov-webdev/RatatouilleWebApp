import { supabaseServer } from '@/store/apiForServer/supabaseServer';

export async function fetchUserData() {
  console.log('Fetching user data');

  const supabase = await supabaseServer(); // обязательно await
  const { data: { user }, error } = await supabase.auth.getUser();

  console.log('Supabase user:', user, 'Error:', error);

  if (error || !user) return null;

  const { data: profileData, error: profileError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profileError || !profileData) return null;

  return {
    id: profileData.id,
    user_name: profileData.user_name || '',
    avatar: profileData.avatar || '',
    email: user.email || '',
    appLang: profileData.appLang || 'en',
    theme: profileData.theme || 'light',
    subscribers: profileData.subscribers || 0,
  };
}
