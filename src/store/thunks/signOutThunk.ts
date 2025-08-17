import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../../api/supabase';
import { logout } from '@/store/slices/isAuthSlice';

export const signOutThunk = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/signOut',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut({ scope: 'local' });
      if (error) {
        return rejectWithValue(error.message);
      }

      dispatch(logout());
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Неизвестная ошибка при выходе';
      return rejectWithValue(message);
    }
  },
);
