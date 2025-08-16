import { supabase } from '../../../api/supabase';
import { IOwner } from '@/types';

export const getOwnerRecipeById = async (userId: string): Promise<IOwner | null> => {
  try {
    console.log('getOwnerRecipeById', userId);
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    // Если нужно фильтровать по категории

    if (error) throw error;

    return data;
  } catch (e) {
    console.error('Ошибка при получении категорий:', e);
    return null;
  }
};
