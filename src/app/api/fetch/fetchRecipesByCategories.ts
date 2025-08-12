// src/api/fetchRecipes.ts
import { supabase } from '../../../../api/supabase';
import { IRecipe } from '@/components/SectionList/CartList.types';

/**
 * Загружает рецепты по категориям и обрезает до 10 на категорию.
 */
export async function fetchRecipesByCategories(
  categoryPoints: string[],
): Promise<IRecipe[]> {
  try {
    const { data, error } = await supabase
      .from('short_desc')
      .select('*')
      .in('category', categoryPoints);

    if (error) throw error;
    if (!data) return [];

    const grouped = data.reduce<Record<string, IRecipe[]>>((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      if (acc[item.category].length < 10) acc[item.category].push(item);
      return acc;
    }, {});

    return Object.values(grouped).flat();
  } catch (err) {
    console.error('Ошибка при загрузке рецептов:', err);
    return [];
  }
}
