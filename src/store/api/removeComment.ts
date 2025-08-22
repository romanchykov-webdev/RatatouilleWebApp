import { supabase } from '../../../api/supabase';

export const removeComment = async (commentId: string) => {
  try {
    if (!commentId) {
      console.warn('removeComment: comment id is missing');
      return null;
    }

    const { data, error } = await supabase.from('comments').delete().eq('id', commentId).select();

    if (error) {
      console.error('Ошибка Supabase:', error.message);
      return null;
    }

    return data ?? null;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    console.error('Error', message);
    return null;
  }
};
