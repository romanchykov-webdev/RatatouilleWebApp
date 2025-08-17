import { createSlice } from '@reduxjs/toolkit';
import { IMeasurementData } from '@/types';

const initialState: IMeasurementData = {
  en: {
    g: '',
    kg: '',
    ml: '',
    tbs: '',
    tsp: '',
    unit: '',
    Liter: '',
    pinch: '',
    sprigs: '',
  },
  es: {
    g: '',
    kg: '',
    ml: '',
    tbs: '',
    tsp: '',
    unit: '',
    Liter: '',
    pinch: '',
    sprigs: '',
  },
  it: {
    g: '',
    kg: '',
    ml: '',
    tbs: '',
    tsp: '',
    unit: '',
    Liter: '',
    pinch: '',
    sprigs: '',
  },
  ru: {
    g: '',
    kg: '',
    ml: '',
    tbs: '',
    tsp: '',
    unit: '',
    Liter: '',
    pinch: '',
    sprigs: '',
  },
  ua: {
    g: '',
    kg: '',
    ml: '',
    tbs: '',
    tsp: '',
    unit: '',
    Liter: '',
    pinch: '',
    sprigs: '',
  },
};

const measurementSlice = createSlice({
  name: 'measurement',
  initialState,
  reducers: {
    setMeasurement(state, action) {
      return action.payload;
    },
  },
});

export const { setMeasurement } = measurementSlice.actions;
export default measurementSlice.reducer;
