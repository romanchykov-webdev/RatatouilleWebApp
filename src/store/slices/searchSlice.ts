import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISearchState, SearchResult } from '@/types';

const initialState: ISearchState = {
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
    clearQuery(state: ISearchState) {
      state.query = '';
    },
    setResults(state, action: PayloadAction<SearchResult[]>) {
      state.results = action.payload;
    },
  },
});

export const { setQuery, clearQuery, setResults } = searchSlice.actions;
export default searchSlice.reducer;
