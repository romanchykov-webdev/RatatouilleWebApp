import { supabase } from '../../../api/supabase';

export const getRecipeById = async (idRecipe: string) => {
  try {
    // console.log('getRecipeById', idRecipe);
    if (!idRecipe) {
      console.warn('getRecipeById: idRecipe пустой');
      return null;
    }
    const { data, error } = await supabase
      .from('all_recipes_description')
      .select('*')
      .eq('id', idRecipe)
      .single(); // single() сразу возвращает один объект вместо массива

    if (error) {
      console.error('Ошибка Supabase при получении рецепта:', error.message);
      return null;
    }

    if (!data) {
      console.warn(`Рецепт с id ${idRecipe} не найден`);
      return null;
    }
    // console.log('getRecipeById', data);
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    console.error('Ошибка при получении рецепта:', message);
    return null;
  }
};
