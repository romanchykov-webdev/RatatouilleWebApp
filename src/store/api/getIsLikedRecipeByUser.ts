import { supabase } from '../../../api/supabase';

export const getIsLikedRecipeByUser = async (
  userId: string,
): Promise<string[] | null> => {
  try {
    console.log('getIsLikedRecipeByUser', userId);
    const { data, error } = await supabase
      .from('recipes_likes')
      .select('*')
      .eq('user_id_like', userId);

    // Если нужно фильтровать по категории

    if (error) throw error;

    return data;
  } catch (e) {
    console.error('Ошибка при получении категорий:', e);
    return null;
  }
};
