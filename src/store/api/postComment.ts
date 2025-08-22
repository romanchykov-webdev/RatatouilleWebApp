import { supabase } from '../../../api/supabase';
import { ICommentDta } from '@/types/comment.type';




export const postComment = async (commentDta:ICommentDta) => {
  try {
    if (!commentDta.post_id) {
      console.warn('postComment: recipe id error');
      return null;
    }

    const { data, error } = await supabase
      .from('comments')
      .insert([
        { comment: commentDta.comment, post_id: commentDta.post_id,user_id_commented:commentDta.user_id_commented },
      ])
      .select()

    if (error) {
      console.error('Ошибка Supabase ',error.message,);
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
