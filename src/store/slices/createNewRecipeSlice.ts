import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IMetaData } from '@/types/recipeMeta.types';
import {
  IAreaByCreateRecipe,
  IIngredientsByCreateRecipe,
  IInstructionsByCreateRecipe,
  ILanguageByCreateRecipe,
  ISocialByCreateRecipe,
  ITitleByCreateRecipe,
} from '@/types';

export interface ICreateNewRecipe {
  authorId: string;
  category: string;
  subCategory: string;
  image_header: string;
  languages: ILanguageByCreateRecipe[];
  title: ITitleByCreateRecipe[];
  area: IAreaByCreateRecipe[];
  tags: string[];
  recipe_metrics: IMetaData;
  ingredients: IIngredientsByCreateRecipe[];
  instructions: IInstructionsByCreateRecipe[];
  social_links: ISocialByCreateRecipe;
}

const initialState: ICreateNewRecipe = {
  authorId: '',
  category: '',
  subCategory: '',
  image_header: '',
  languages: [],
  title: [],
  area: [],
  tags: [],
  recipe_metrics: { time: 0, serv: 0, cal: 0, level: 'easy' },
  ingredients: [],
  instructions: [],
  social_links: {
    instagram: null,
    facebook: null,
    tiktok: null,
    map_coordinates: null,
    link_copyright: null,
    source_reference: null,
    video: null,
  },
};

const createNewRecipeSlice = createSlice({
  name: 'createNewRecipe',
  initialState,
  reducers: {
    addOwnerId: (state, action: PayloadAction<string>) => {
      state.authorId = action.payload;
    },
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
    clearSubCategory(state) {
      state.subCategory = '';
    },
    addHeaderImage(state, action: PayloadAction<ICreateNewRecipe['image_header']>) {
      state.image_header = action.payload;
    },
    clearHeaderImage(state) {
      state.image_header = '';
    },
    addLanguage(state, action: PayloadAction<ILanguageByCreateRecipe>) {
      const exists = state.languages.some(l => l.name === action.payload.name);
      if (!exists) {
        state.languages.push(action.payload);
      }
    },
    removeLanguage(state, action: PayloadAction<string>) {
      state.languages = state.languages.filter(lang => lang.name !== action.payload);
    },

    removeAllLanguages(state) {
      state.languages = [];
    },
    addTitle(state, action: PayloadAction<ITitleByCreateRecipe[]>) {
      state.title = action.payload;
    },
    addArea(state, action: PayloadAction<IAreaByCreateRecipe[]>) {
      state.area = action.payload;
    },
    addTags(state, action: PayloadAction<string[]>) {
      state.tags = action.payload;
    },
    addRecipeMeta(state, action: PayloadAction<ICreateNewRecipe['recipe_metrics']>) {
      state.recipe_metrics = action.payload;
    },
    removeTag(state, action: PayloadAction<number>) {
      state.tags = state.tags.filter((_, index: number) => index !== action.payload);
    },

    addIngredients(state, action: PayloadAction<ICreateNewRecipe['ingredients']>) {
      state.ingredients = action.payload;
    },
    removeIngredient(state, action: PayloadAction<number>) {
      state.ingredients = state.ingredients.filter(
        (_, index) => index !== action.payload,
      );
    },
    addInstruction(state, action: PayloadAction<IInstructionsByCreateRecipe>) {
      state.instructions.push(action.payload);
    },
    removeInstruction(state, action: PayloadAction<number>) {
      state.instructions = state.instructions.filter(
        (_, index) => index !== action.payload,
      );
    },
    addSocialLinks(state, action: PayloadAction<ISocialByCreateRecipe>) {
      state.social_links = action.payload;
    },
    removeSocialLink(state, action: PayloadAction<keyof ISocialByCreateRecipe>) {
      state.social_links[action.payload] = null;
    },

    clearNewRecipeState(state) {
      state.languages = [];
      Object.assign(state, initialState);
    },
  },
});

export const {
  addOwnerId,
  addCategory,
  addSubCategory,
  clearSubCategory,
  clearCategorySubCategory,
  addHeaderImage,
  clearHeaderImage,
  addLanguage,
  removeLanguage,
  removeAllLanguages,
  addTitle,
  addArea,
  addTags,
  removeTag,
  addRecipeMeta,
  addIngredients,
  removeIngredient,
  addInstruction,
  removeInstruction,
  addSocialLinks,
  removeSocialLink,
  clearNewRecipeState,
} = createNewRecipeSlice.actions;
export default createNewRecipeSlice.reducer;
