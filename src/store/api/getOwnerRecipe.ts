import { supabase } from '../../../api/supabase';

export const getOwnerRecipeById = async (userId: string) => {
  try {
    console.log('getOwnerRecipeById', userId);
    const { data, error } = await supabase.from('users').select('*').eq('id', userId);

    // Если нужно фильтровать по категории

    if (error) throw error;

    return data;
  } catch (e) {
    console.error('Ошибка при получении категорий:', e);
    return null;
  }
};
