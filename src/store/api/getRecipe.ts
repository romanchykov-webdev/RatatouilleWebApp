import { IItem } from '@/components/SectionList/CartItem.types';
import { supabase } from '../../../api/supabase';

export const getRecipeById = async (idRecipe: string): Promise<IItem[] | null> => {
  try {
    console.log('getRecipe', idRecipe);
    const { data, error } = await supabase
      .from('all_recipes_description')
      .select('*')
      .eq('id', idRecipe);

    // Если нужно фильтровать по категории

    if (error) throw error;

    return data;
  } catch (e) {
    console.error('Ошибка при получении категорий:', e);
    return null;
  }
};
