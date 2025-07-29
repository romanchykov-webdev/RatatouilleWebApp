// api/GET/getData.ts
import { createClientSupabase } from '../supabase';

export const getAllRecipes = async () => {
  try {
    const supabase = createClientSupabase(); // Используем клиентский клиент
    const { data, error } = await supabase.from('all_recipes_description').select('*');

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, error: 'Неожиданная ошибка' };
  }
};
