import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../../api/supabase';

interface Recipe {
  id: number;
  name: string;
  category: string;
  rating: number;
  // ... остальные поля из таблицы short_desc
}

interface FetchRecipesArgs {
  categories: string[];
}

export const fetchRecipesByCategories = createAsyncThunk<
  Recipe[], // возвращаемый тип — массив рецептов
  FetchRecipesArgs // входящий аргумент
>('recipes/fetchByCategories', async ({ categories }, thunkAPI) => {
  try {
    const { data, error } = await supabase
      .from('short_desc')
      .select('*')
      .in('category', categories)
      .gt('rating', 0);

    if (error) {
      return thunkAPI.rejectWithValue(error.message);
    }

    if (!data) return [];

    // Группируем рецепты по категории
    const grouped: Record<string, Recipe[]> = {};
    data.forEach(recipe => {
      if (!grouped[recipe.category]) grouped[recipe.category] = [];
      grouped[recipe.category].push(recipe);
    });

    // Обрезаем до 10 штук на категорию и собираем обратно в один массив
    const limitedRecipes = Object.values(grouped).flatMap(arr => arr.slice(0, 10));

    return limitedRecipes;
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
