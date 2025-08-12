import { supabase } from '../../../api/supabase';
import { IItem } from '@/components/SectionList/CartItem.types';

export const getAllRecipesByCategory = async (cat: string): Promise<IItem[] | null> => {
  try {
    console.log('getAllRecipesByCategory', cat);
    const { data, error } = await supabase
      .from('short_desc')
      .select('*')
      .eq('category', cat);

    // Если нужно фильтровать по категории

    if (error) throw error;

    return data;
  } catch (e) {
    console.error('Ошибка при получении категорий:', e);
    return null;
  }
};

export const getAllRecipesBySubCategory = async (
  cat: string,
): Promise<IItem[] | null> => {
  try {
    console.log('getAllRecipesByCategory', cat);
    const { data, error } = await supabase
      .from('short_desc')
      .select('*')
      .eq('point', cat);

    // Если нужно фильтровать по категории

    if (error) throw error;

    return data;
  } catch (e) {
    console.error('Ошибка при получении категорий:', e);
    return null;
  }
};
