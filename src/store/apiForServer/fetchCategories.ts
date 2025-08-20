import { supabase } from '../../../api/supabase';
import { ICategory } from '@/types';

export async function fetchCategories(lang: string): Promise<ICategory[]> {
  const { data, error } = await supabase
    .from('categories_masonry')
    .select('*')
    .eq('lang', lang);

  if (error || !data) return [];
  return data;
}
