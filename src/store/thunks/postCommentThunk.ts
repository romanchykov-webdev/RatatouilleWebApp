import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../../api/supabase';
import { ICommentDta } from '@/types/comment.type';
import toast from 'react-hot-toast';

export const postCommentThunk = createAsyncThunk(
  'comments/postComment',
  async (commentDta: ICommentDta, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([
          {
            comment: commentDta.comment,
            post_id: commentDta.post_id,
            user_id_commented: commentDta.user_id_commented,
          },
        ])
        .select();

      if (error) {
        return rejectWithValue(error.message); // <- вот здесь заменили throw
      }
      // Если вставка прошла успешно, показываем тост
      toast.success('Comment added!');
      return data ?? [];
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);
