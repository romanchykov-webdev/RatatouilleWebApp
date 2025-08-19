import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../../api/supabase';
import { ICategory } from '@/types';

type CategoriesResponse = ICategory[];

export const categoriesThunk = createAsyncThunk<CategoriesResponse, string>(
  'categories/categoriesThunk',
  async (userLang, thunkAPI) => {
    try {
      const { data, error } = await supabase
        .from('categories_masonry')
        .select('*')
        .eq('lang', userLang);

      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }

      if (!data) {
        return thunkAPI.rejectWithValue('No data returned');
      }
      // console.log(JSON.stringify(data, null, 2));
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);
