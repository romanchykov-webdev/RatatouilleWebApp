import { getRecipesByHomeSlider } from '@/store/api/getRecipeByHomeSlider';
import { chunkArray } from '@/helpers/chunkArray';
import HomeBigCarouselClient from './HomeBigCarouselClient';

// ISR – обновление данных каждые 60 секунд
export const revalidate = 60;

export default async function HomeBigCarouselServerComponent() {
  const recipes = await getRecipesByHomeSlider();
  const recipesBySlider = recipes ? chunkArray(recipes, 3) : [];

  return <HomeBigCarouselClient recipesBySlider={recipesBySlider} />;
}
