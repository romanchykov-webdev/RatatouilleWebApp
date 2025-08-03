import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IArea,
  IIngredientTitle,
  IInstruction,
  ILanguage,
  ITitle,
} from '@/components/CreateNewRecipeScreen/createNewRecipeScreen.types';
import { IMetaData } from '@/components/RecipeMeta/recipeMeta.types';

export interface ICreateNewRecipe {
  authorId: string;
  category: string;
  subCategory: string;
  imageHeader: File | string | null;
  languages: ILanguage[];
  title: ITitle[];
  aria: IArea[];
  tags: string[];
  recipeMeta: IMetaData;
  ingredients: IIngredientTitle[];
  instruction: IInstruction[];
}

const initialState: ICreateNewRecipe = {
  authorId: '',
  category: '',
  subCategory: '',
  imageHeader: null,
  languages: [],
  title: [],
  aria: [],
  tags: [],
  recipeMeta: { time: 0, serv: 0, cal: 0, level: 'easy' },
  ingredients: [],
  instruction: [],
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
    addArea(state, action: PayloadAction<IArea[]>) {
      state.aria = action.payload;
    },
    addTags(state, action: PayloadAction<string[]>) {
      state.tags = action.payload;
    },
    addRecipeMeta(state, action: PayloadAction<ICreateNewRecipe['recipeMeta']>) {
      state.recipeMeta = action.payload;
    },
    // addIngredients(state, action: PayloadAction<IIngredientTitle[]>) {
    //   state.ingredients = action.payload;
    // },
    addIngredients(state, action: PayloadAction<ICreateNewRecipe['ingredients']>) {
      state.ingredients = action.payload;
    },
    removeIngredient(state, action: PayloadAction<number>) {
      state.ingredients = state.ingredients.filter(
        (_, index) => index !== action.payload,
      );
    },
    addInstruction(state, action: PayloadAction<IInstruction>) {
      state.instruction.push(action.payload);
    },
    removeInstruction(state, action: PayloadAction<number>) {
      state.instruction = state.instruction.filter(
        (_, index) => index !== action.payload,
      );
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
  addTags,
  addRecipeMeta,
  addIngredients,
  removeIngredient,
  addInstruction,
  removeInstruction,
} = createNewRecipeSlice.actions;
export default createNewRecipeSlice.reducer;
