import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../../api/supabase';
import { AuthError } from '@supabase/auth-js';
import { IUserProfile } from '@/types';
import { PostgrestError } from '@supabase/supabase-js';
import { login } from '@/store/slices/isAuthSlice';

interface SignUpPayload {
  email: string;
  password: string;
}

interface SignUpResponse {
  success: boolean;
  error?: string | null;
}

export const signUpUser = createAsyncThunk<SignUpResponse, SignUpPayload>(
  'auth/signUpUser',
  async ({ email, password }, { dispatch }) => {
    try {
      // Регистрация
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        throw new Error((error as AuthError).message);
      }

      const user = data.user;

      if (!user) {
        throw new Error('User not created');
      }
      if (!user.email) {
        throw new Error('User email is undefined');
      }

      // Получение профиля
      const { data: profileData, error: fetchProfileError } = (await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()) as { data: IUserProfile | null; error: PostgrestError | null };

      if (fetchProfileError || !profileData) {
        throw new Error(fetchProfileError?.message || 'Профиль пользователя не найден');
      }

      dispatch(
        login({
          userId: profileData.userId,
          userName: profileData.userName,
          userAvatar: profileData.userAvatar,
          userEmail: user.email,
          lang: profileData.lang,
          userTheme: profileData.userTheme,
          subscribers: profileData.subscribers,
        }),
      );

      return { success: true, error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
      return { success: false, error: errorMessage };
    }
  },
);
