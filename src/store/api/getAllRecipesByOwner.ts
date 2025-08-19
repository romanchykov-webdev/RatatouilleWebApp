import { supabase } from '../../../api/supabase';

export const getAllRecipesByOwner = async (ownerId: string) => {
  try {
    if (!ownerId) {
      console.warn('getAllRecipesByOwner: ownerId пустой');
      return null;
    }

    const { data, error } = await supabase
      .from('short_desc')
      .select('*')
      .eq('published_id', ownerId);

    if (error) {
      console.error('Ошибка Supabase при получении рецептов владельца:', error.message);
      return null;
    }

    if (!data || data.length === 0) {
      console.warn(`Рецепты для владельца с id ${ownerId} не найдены`);
      return null;
    }

    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    console.error('Ошибка при получении рецептов владельца:', message);
    return null;
  }
};
