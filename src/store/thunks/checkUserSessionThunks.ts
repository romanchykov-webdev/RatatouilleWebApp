import { AppDispatch } from '@/store';
import { supabase } from '../../../api/supabase';
import { login, logout } from '@/store/slices/isAuthSlice';

export const checkUserSessionThunks = () => async (dispatch: AppDispatch) => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session?.user) {
    console.warn('Нет активной сессии пользователя или ошибка');
    dispatch(logout());
    return;
  }

  const user = session.user;

  const { data: profileData, error: profileError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profileError) {
    console.error('Ошибка получения профиля:', profileError.message);
    return;
  }

  dispatch(
    login({
      userId: profileData.id,
      userName: profileData.user_name || '',
      userAvatar: profileData.avatar || '',
      userEmail: user.email || '',
      appLang: profileData.appLang || 'en',
      userTheme: profileData.theme || 'light',
      subscribers: profileData.subscribers || 0,
    }),
  );
};
