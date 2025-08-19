import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../../api/supabase';
import { setMeasurement } from '@/store/slices/measurementSlice';

export const measurementThunk = createAsyncThunk(
  'measurement/measurementThunk',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data, error } = await supabase.from('measurement').select('lang').single();

      if (error) {
        return rejectWithValue(error.message);
      }

      if (!data) {
        return rejectWithValue('Data not found');
      }
      // console.log('measurementThunk', JSON.stringify(data.lang, null, 2));
      dispatch(setMeasurement(data.lang));
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sam Error';
      return rejectWithValue(errorMessage);
    }
  },
);
