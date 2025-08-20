import { supabase } from '../../../api/supabase';

export async function fetchMeasurements() {
  const { data, error } = await supabase.from('measurement').select('lang');

  if (error || !data) return [];
  return data;
}
