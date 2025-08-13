import { supabase } from '../../../api/supabase';

// import { IItem } from '@/components/SectionList/CartItem.types';

export interface IRecipe {
  id: string;
  created_at: string;
  published_id: string;
  category: string;
  category_id: string;
  image_header: string;
  title: {
    lang: string;
    value: string;
  }[];
  rating: number;
  likes: number;
  comments: number;
  video: boolean;
  tags: string[];
  full_recipe_id: string;
  published_user: {
    avatar: string;
    user_id: string;
    user_name: string;
  };
  point: string;
}

export const getAllRecipesByCategory = async (cat: string): Promise<IRecipe[] | null> => {
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
): Promise<IRecipe[] | null> => {
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
