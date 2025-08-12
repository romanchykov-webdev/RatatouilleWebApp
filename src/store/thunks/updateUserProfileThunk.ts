import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { supabase } from '../../../api/supabase';
import { IUserProfileUpdate } from '@/types';

// Тип данных для обновления профиля

// Thunk для обновления профиля
export const updateUserProfileThunk = createAsyncThunk(
  'user/updateUserProfileThunk',
  async (userData: IUserProfileUpdate, { rejectWithValue }) => {
    // console.log('updateUserProfileThunk userData', userData);
    try {
      const { userId, userName, userAvatar, lang, userTheme } = userData;
      const { error } = await supabase
        .from('users')
        .update({
          user_name: userName,
          avatar: userAvatar,
          lang,
          theme: userTheme,
        })
        .eq('id', userId);

      if (error) {
        toast.error('Ошибка обновления профиля: ' + error.message);
        return rejectWithValue(error.message);
      }

      toast.success('Профиль успешно обновлен');
      return userData;
    } catch (error: unknown) {
      toast.error('Ошибка при обновлении профиля');
      // return rejectWithValue(error.message || 'Неизвестная ошибка');
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
      return { success: false, error: errorMessage };
    }
  },
);
