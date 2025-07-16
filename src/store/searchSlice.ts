import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISearchState {
  query: string;
}

const initialState: ISearchState = {
  query: '',
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
  },
});

export const { setQuery, clearQuery } = searchSlice.actions;
export default searchSlice.reducer;