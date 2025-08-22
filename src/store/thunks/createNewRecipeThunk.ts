import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { supabase } from '../../../api/supabase';
import {
  IAreaByCreateRecipe,
  IIngredientsByCreateRecipe,
  IInstructionsByCreateRecipe,
  ILanguageByCreateRecipe,
  ISocialByCreateRecipe,
  ITitleByCreateRecipe,
  IMetaDataByCreateRecipe,
} from '@/types/createNewRecipeScreen.types';

// Окончательная модель для вставки рецепта
export interface IRecipeCreate {
  authorId: string; // id автора рецепта-
  category: string; // основная категория -
  subCategory: string; // подкатегория
  image_header: string; // картинка заголовка  -
  languages: ILanguageByCreateRecipe[]; // массив языковых данных-
  title: ITitleByCreateRecipe; // массив заголовков
  area: IAreaByCreateRecipe;
  tags: string[]; // массив тегов
  recipe_metrics: IMetaDataByCreateRecipe; // метаданные рецепта -
  ingredients: IIngredientsByCreateRecipe[]; // ингредиенты -
  instructions: IInstructionsByCreateRecipe[]; // пошаговая инструкция -
  social_links: ISocialByCreateRecipe;
  user_name: string;
  avatar: string; //-
}

export const addRecipeThunk = createAsyncThunk(
  'recipes/addRecipeThunk',
  async (recipeData: IRecipeCreate, { rejectWithValue }) => {
    // console.log('addRecipeThunk recipeData', recipeData);

    try {
      const payload = {
        category: recipeData.category,
        category_id: recipeData.category,
        image_header: recipeData.image_header,
        area: recipeData.area,
        title: recipeData.title,
        rating: 0,
        likes: 0,
        comments: 0,
        recipe_metrics: recipeData.recipe_metrics,
        ingredients: recipeData.ingredients,
        instructions: recipeData.instructions,
        tags: recipeData.tags,
        published_id: recipeData.authorId,
        published_user: {
          user_id: recipeData.authorId,
          user_name: recipeData.user_name,
          avatar: recipeData.avatar,
        },
        point: recipeData.subCategory,
        link_copyright: recipeData.social_links.link_copyright,
        map_coordinates: recipeData.social_links.map_coordinates,
        video: recipeData.social_links.video,
        source_reference: recipeData.social_links.source_reference,
        social_links: {
          facebook: recipeData.social_links.facebook,
          instagram: recipeData.social_links.instagram,
          tiktok: recipeData.social_links.tiktok,
        },
      };

      console.log('addRecipeThunk payload', payload);

      const { data, error } = await supabase
        .from('all_recipes_description')
        .insert([payload])
        .select();

      if (error) {
        toast.error('Ошибка добавления рецепта: ' + error.message);
        return rejectWithValue(error.message);
      }

      toast.success('Рецепт успешно добавлен');
      return data?.[0];
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
      toast.error('Ошибка при добавлении рецепта');
      return rejectWithValue(errorMessage);
    }
  },
);
