import { supabase } from '../../../api/supabase';
import { IRecipe } from '@/types';

export const getAllRecipesByOwner = async (
  ownerId: string,
): Promise<IRecipe[] | null> => {
  try {
    console.log('getRecipe', ownerId);
    const { data, error } = await supabase
      .from('short_desc')
      .select('*')
      .eq('published_id', ownerId);

    // Если нужно фильтровать по категории

    if (error) throw error;

    return data;
  } catch (e) {
    console.error('Ошибка при получении категорий:', e);
    return null;
  }
};
