import { createSlice } from '@reduxjs/toolkit';
import { categoriesThunk, ITitle } from '@/store/thunks/categoriesThunk';

interface CategoriesState {
  categories: ITitle[];
}

const initialState: CategoriesState = {
  categories: [],
};

const getAllCategoriesSlice = createSlice({
  name: 'getAllCategories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(categoriesThunk.fulfilled, (state, action) => {
      // action.payload - это data из thunk
      // Присваиваем массив заголовков из первой категории (data[0].title)
      state.categories = action.payload.length ? action.payload[0].title : [];
    });
  },
});

export const {} = getAllCategoriesSlice.actions;
export default getAllCategoriesSlice.reducer;
