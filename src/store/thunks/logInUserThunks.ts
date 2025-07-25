import { AppDispatch } from '@/store';
import { supabase } from '../../../api/supabase';
import { login } from '@/store/slices/isAuthSlice';

export const logInUser =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error.message);
      return;
    }
    const user = data.user;

    // 🔽 Получаем профиль из БД
    const { data: profileData, error: profileError } = await supabase
      .from('users') // ← укажи имя своей таблицы
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('Ошибка профиля:', profileError.message);
      return;
    }
    dispatch(
      login({
        userId: profileData.id,
        userName: profileData.user_name || '',
        userAvatar: profileData.avatar || '',
        userEmail: user.email || '',
        lang: profileData.lang || 'en',
        userTheme: profileData.theme || 'light',
        subscribers: profileData.subscribers || 0,
      }),
    );
  };
