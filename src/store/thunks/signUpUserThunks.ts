import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../../api/supabase';
import { login } from '@/store/slices/isAuthSlice';

interface SignUpPayload {
  email: string;
  password: string;
}

interface SignUpResponse {
  success: boolean;
  error?: string | null;
}

export const signUpUserThunk = createAsyncThunk<SignUpResponse, SignUpPayload>(
  'auth/signUpUser',
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      // Регистрация пользователя
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        return rejectWithValue(error.message);
      }

      const user = data.user;
      if (!user?.email) {
        return rejectWithValue('Email пользователя не определен');
      }

      // Получение профиля пользователя
      const { data: profileData, error: fetchProfileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (fetchProfileError || !profileData) {
        return rejectWithValue(
          fetchProfileError?.message || 'Профиль пользователя не найден',
        );
      }

      dispatch(
        login({
          id: profileData.id,
          user_name: profileData.user_name,
          avatar: profileData.avatar,
          email: user.email,
          appLang: profileData.appLang,
          theme: profileData.theme,
          subscribers: profileData.subscribers,
        }),
      );

      return { success: true, error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
      return rejectWithValue(errorMessage);
    }
  },
);
