import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../../api/supabase';
import { logout } from '@/store/slices/isAuthSlice';

export const signOutThunk = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/signOut',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut({ scope: 'local' }); // Используем scope: 'local' для выхода только из текущей сессии
      if (error) {
        throw error;
      }
      dispatch(logout()); // Сбрасываем состояние Redux
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);
