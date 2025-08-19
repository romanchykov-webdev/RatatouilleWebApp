import { supabase } from '../../../api/supabase';

export const getAllRecipesByCategory = async (category: string) => {
  try {
    if (!category) {
      console.warn('getAllRecipesByCategory: пустая категория');
      return null;
    }

    const { data, error } = await supabase
      .from('short_desc')
      .select('*')
      .eq('category', category);

    if (error) {
      console.error(
        'Ошибка Supabase при получении рецептов по категории:',
        error.message,
      );
      return null;
    }

    if (!data || data.length === 0) {
      console.warn(`Рецепты в категории "${category}" не найдены`);
      return null;
    }

    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    console.error('Ошибка при получении рецептов по категории:', message);
    return null;
  }
};

export const getAllRecipesBySubCategory = async (subCategory: string) => {
  try {
    if (!subCategory) {
      console.warn('getAllRecipesBySubCategory: пустая подкатегория');
      return null;
    }

    const { data, error } = await supabase
      .from('short_desc')
      .select('*')
      .eq('point', subCategory);

    if (error) {
      console.error(
        'Ошибка Supabase при получении рецептов по подкатегории:',
        error.message,
      );
      return null;
    }

    if (!data || data.length === 0) {
      console.warn(`Рецепты в подкатегории "${subCategory}" не найдены`);
      return null;
    }

    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    console.error('Ошибка при получении рецептов по подкатегории:', message);
    return null;
  }
};
