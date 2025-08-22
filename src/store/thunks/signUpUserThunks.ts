import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../../api/supabase';
import { login } from '@/store/slices/isAuthSlice';

interface SignUpPayload {
  user_name: string;
  email: string;
  password: string;
  app_lang: string; // Изменено на app_lang
  avatar: string;
  theme: string;
  subscribers: number;
}

interface SignUpResponse {
  success: boolean;
  error?: string | null;
}

export const signUpUserThunk = createAsyncThunk<SignUpResponse, SignUpPayload>(
  'auth/signUpUser',
  async (
    { user_name, email, password, app_lang, avatar, theme, subscribers },
    { rejectWithValue, dispatch },
  ) => {
    try {
      console.log('signUpUserThunk email:', email);
      console.log('signUpUserThunk password:', password);
      console.log('signUpUserThunk user_name:', user_name);
      console.log('signUpUserThunk app_lang:', app_lang);

      // Регистрация пользователя с метаданными
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_name,
            app_lang, // Изменено на app_lang
            avatar,
            theme,
            subscribers: subscribers.toString(),
          },
        },
      });

      if (error) {
        console.error('Supabase signUp error:', error);
        return rejectWithValue(error.message || 'Ошибка регистрации');
      }

      const user = data.user;
      if (!user?.email || !user.id) {
        return rejectWithValue('Email или ID пользователя не определены');
      }

      // Проверка, существует ли профиль
      const { data: profileData, error: fetchProfileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (fetchProfileError || !profileData) {
        // Если профиль не создан триггером, вставляем его
        const { error: insertError } = await supabase.from('users').insert({
          id: user.id,
          user_name,
          email: user.email,
          app_lang,
          avatar,
          theme,
          subscribers,
        });

        if (insertError) {
          console.error('Supabase insert error:', insertError);
          return rejectWithValue(insertError.message || 'Ошибка при создании профиля пользователя');
        }
      }

      // Повторное получение профиля
      const { data: finalProfileData, error: finalFetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (finalFetchError || !finalProfileData) {
        console.error('Supabase fetch profile error:', finalFetchError);
        return rejectWithValue(finalFetchError?.message || 'Профиль пользователя не найден');
      }

      // Диспатч действия логина
      dispatch(
        login({
          id: finalProfileData.id,
          user_name: finalProfileData.user_name,
          avatar: finalProfileData.avatar,
          email: user.email,
          app_lang: finalProfileData.app_lang, // Изменено на app_lang
          theme: finalProfileData.theme,
          subscribers: finalProfileData.subscribers,
        }),
      );

      return { success: true, error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
      console.error('Unexpected error:', error);
      return rejectWithValue(errorMessage);
    }
  },
);
