import { supabase } from '../../../api/supabase';
import { login } from '@/store/slices/isAuthSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PostgrestError } from '@supabase/supabase-js';
import { UserProfile } from '@/types';

interface LoginPayload {
  email: string;
  password: string;
}

// interface UserProfile {
//   id: string;
//   user_name?: string;
//   avatar?: string;
//   lang?: string;
//   theme?: string;
//   subscribers?: number;
// }

interface LoginResponse {
  success: boolean;
  error?: string | null;
}

export const logInUser = createAsyncThunk<LoginResponse, LoginPayload>(
  'auth/logInUser',
  async ({ email, password }, { dispatch }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      const user = data.user;

      // Получаем профиль из БД
      const { data: profileData, error: profileError } = (await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()) as { data: UserProfile | null; error: PostgrestError | null };

      if (profileError || !profileData) {
        throw new Error(profileError?.message || 'Профиль пользователя не найден');
      }

      dispatch(
        login({
          userId: profileData.userId, // Изменено с id на userId
          userName: profileData.userName || '', // Изменено с user_name на userName
          userAvatar: profileData.userAvatar || '', // Изменено с avatar на userAvatar
          userEmail: user.email || '',
          lang: profileData.lang || 'en',
          userTheme: profileData.userTheme || 'light', // Изменено с theme на userTheme
          subscribers: profileData.subscribers || 0,
        }),
      );

      return { success: true };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
      return { success: false, error: errorMessage };
    }
  },
);
