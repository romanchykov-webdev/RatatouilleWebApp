import { supabase } from '../../../api/supabase';

export const getOwnerRecipeById = async (userId: string) => {
  try {
    if (!userId) {
      console.warn('getOwnerRecipeById: userId пустой');
      return null;
    }
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single(); // single() сразу возвращает один объект вместо массива

    if (error) {
      console.error('Ошибка Supabase при получении пользователя:', error.message);
      return null;
    }

    if (!data) {
      console.warn(`Пользователь с id ${userId} не найден`);
      return null;
    }

    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    console.error('Ошибка при получении пользователя:', message);
    return null;
  }
};
