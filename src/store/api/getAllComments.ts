import { supabase } from '../../../api/supabase';

export const getAllCommentsByRecipe = async (recipeId: string) => {
  try {
    if (!recipeId) {
      console.warn('postComment: recipe id error');
      return null;
    }

    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', recipeId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Ошибка Supabase ', error.message);
      return null;
    }

    if (!data || data.length === 0) {
      return null;
    }

    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    console.error('Error', message);
    return null;
  }
};
