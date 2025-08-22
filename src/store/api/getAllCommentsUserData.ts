import { supabase } from '../../../api/supabase';
import { IAllUserCommentedRecipe } from '@/types/comment.type';

export const getAllCommentsUserData = async (usersIds: string[]) => {
  try {
    if (!usersIds || usersIds.length === 0) {
      console.warn('getAllCommentsUserData: usersIds пустой массив');
      return null;
    }

    // console.log('getAllCommentsUserData usersIds', usersIds);
    const { data, error } = await supabase
      .from('users')
      .select('id, user_name, avatar')
      .eq('id', usersIds);

    if (error) {
      console.error('Ошибка Supabase ', error.message);
      return null;
    }

    if (!data || data.length === 0) {
      return null;
    }

    const result: IAllUserCommentedRecipe[] = data.map(user => ({
      user_id: user.id,
      user_name: user.user_name,
      avatar: user.avatar,
    }));

    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    console.error('Error', message);
    return null;
  }
};
