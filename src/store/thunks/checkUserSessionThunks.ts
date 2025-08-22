import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../../api/supabase';
import { login, logout } from '@/store/slices/isAuthSlice';
import { AppDispatch } from '@/store';

interface CheckSessionResponse {
  success: boolean;
  error?: string | null;
}

export const checkUserSessionThunks = createAsyncThunk<
  CheckSessionResponse,
  void,
  { dispatch: AppDispatch; rejectValue: string }
>('auth/checkUserSession', async (_, { dispatch, rejectWithValue }) => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error || !session?.user) {
      dispatch(logout());
      return rejectWithValue('Нет активной сессии пользователя или ошибка');
    }

    const user = session.user;

    const { data: profileData, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError || !profileData) {
      return rejectWithValue(profileError?.message || 'Профиль пользователя не найден');
    }

    dispatch(
      login({
        id: profileData.id,
        user_name: profileData.user_name || '',
        avatar: profileData.avatar || '',
        email: user.email || '',
        app_lang: profileData.app_lang || 'en',
        theme: profileData.theme || 'light',
        subscribers: profileData.subscribers || 0,
      }),
    );

    return { success: true, error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Неизвестная ошибка';
    return rejectWithValue(message);
  }
});
