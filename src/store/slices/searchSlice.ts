import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  results: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    clearQuery(state) {
      state.query = '';
    },
    setResults(state, action) {
      state.results = action.payload;
    },
  },
});

export const { setQuery, clearQuery, setResults } = searchSlice.actions;
export default searchSlice.reducer;
