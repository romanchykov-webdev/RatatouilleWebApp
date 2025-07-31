import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IArea,
  ILanguage,
  ITitle,
} from '@/components/CreateNewRecipeScreen/createNewRecipeScreen.types';

export interface ICreateNewRecipe {
  authorId: string;
  category: string;
  subCategory: string;
  imageHeader: File | string | null;
  languages: ILanguage[];
  title: ITitle[];
  aria: IArea[];
}

const initialState: ICreateNewRecipe = {
  authorId: '',
  category: '',
  subCategory: '',
  imageHeader: null,
  languages: [],
  title: [],
  aria: [],
};

const createNewRecipeSlice = createSlice({
  name: 'createNewRecipe',
  initialState,
  reducers: {
    addCategory(state, action: PayloadAction<ICreateNewRecipe['category']>) {
      state.category = action.payload;
    },
    addSubCategory(state, action: PayloadAction<ICreateNewRecipe['subCategory']>) {
      state.subCategory = action.payload;
    },
    clearCategorySubCategory(state) {
      state.subCategory = '';
      state.category = '';
    },
    addHeaderImage(state, action: PayloadAction<ICreateNewRecipe['imageHeader']>) {
      state.imageHeader = action.payload;
    },
    clearHeaderImage(state) {
      state.imageHeader = null;
    },
    addLanguage(state, action: PayloadAction<ILanguage[]>) {
      state.languages = action.payload;
    },
    // removeLanguage(state, action: PayloadAction<ILanguage>) {
    //   state.languages = state.languages.filter(
    //     (language: ILanguage) => language.name !== action.payload.name,
    //   );
    // },
    removeAllLanguages(state) {
      state.languages = [];
    },
    addTitle(state, action: PayloadAction<ITitle[]>) {
      state.title = action.payload;
    },
    addArea(state, action: PayloadAction<ITitle[]>) {
      state.aria = action.payload;
    },
  },
});

export const {
  addCategory,
  addSubCategory,
  clearCategorySubCategory,
  addHeaderImage,
  clearHeaderImage,
  addLanguage,
  // removeLanguage,
  removeAllLanguages,
  addTitle,
  addArea,
} = createNewRecipeSlice.actions;
export default createNewRecipeSlice.reducer;
