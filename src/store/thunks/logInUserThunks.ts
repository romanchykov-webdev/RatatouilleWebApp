import { supabase } from '../../../api/supabase';
import { login } from '@/store/slices/isAuthSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PostgrestError } from '@supabase/supabase-js';
import { IUserProfile } from '@/types';
import { AppDispatch } from '@/store';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  error?: string | null;
}

export const logInUserThunk = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { dispatch: AppDispatch; rejectValue: string }
>('auth/logInUser', async ({ email, password }, { dispatch, rejectWithValue }) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return rejectWithValue(error?.message || 'Пользователь не найден');
    }

    const user = data.user;

    // Получаем профиль из БД
    const { data: profileData, error: profileError } = (await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()) as { data: IUserProfile | null; error: PostgrestError | null };

    if (profileError || !profileData) {
      return rejectWithValue(profileError?.message || 'Профиль пользователя не найден');
    }

    // console.log('logInUser', profileData);

    // const isLikedRecipe: string[] = await getIsLikedRecipeByUser(profileData.userId);
    //
    // console.log('isLikedRecipe', isLikedRecipe);

    dispatch(
      login({
        id: profileData.id, // Изменено с id на userId
        user_name: profileData.user_name || '', // Изменено с user_name на userName
        avatar: profileData.avatar || '', // Изменено с avatar на avatar
        email: user.email || '',
        app_lang: profileData.app_lang || 'en',
        theme: profileData.theme || 'light', // Изменено с theme на userTheme
        subscribers: profileData.subscribers || 0,
        // isLikedRecipe: isLikedRecipe,
      }),
    );

    return { success: true, error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return rejectWithValue(message);
  }
});
