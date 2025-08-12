import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import userReducer from './slices/isAuthSlice';
import createNewRecipeSlice from '@/store/slices/createNewRecipeSlice';
import getAllCategoriesSlice from '@/store/slices/categoriesSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    user: userReducer,
    createNewRecipe: createNewRecipeSlice,
    allCategories: getAllCategoriesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
