import { supabase } from '../../../api/supabase';

export const getRecipesByHomeSlider = async () => {
  try {
    const { data, error } = await supabase.from('short_desc').select('*');
    // .gt('rating', 0) // фильтр: рейтинг больше 1
    // .order('rating', { ascending: false }); // сортировка по рейтингу, от большего к меньшему

    if (error) {
      console.error('Ошибка Supabase при получении рецептов:', error.message);
      return null;
    }

    if (!data || data.length === 0) {
      console.warn('Рецепты с рейтингом больше 1 не найдены');
      return [];
    }

    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    console.error('Ошибка при получении рецептов:', message);
    return null;
  }
};
