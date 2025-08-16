import { ISocialRenderProps } from '@/types/createNewRecipeScreen.types';

export interface ILocalizedText {
  lang: string;
  value: string;
}

export interface IIngredient {
  id?: string;
  name: string;
  amount?: string;
  unit?: string;
}

export interface IInstruction {
  step: number;
  text: string;
}

export interface IPublishedUser {
  avatar: string | null;
  user_id: string;
  user_name: string;
}

export interface IRecipeMetrics {
  cal: number;
  serv: number;
  time: number;

  [key: string]: number | string;
}

// export interface ISocialLinks {
//   tiktok: string | null;
//   facebook: string | null;
//   instagram: string | null;
// }

export interface IRecipe {
  id?: string;
  created_at?: string;
  category: string;
  category_id?: string;
  image_header: string;
  area: ILocalizedText[];
  title: ILocalizedText[];
  rating: number;
  likes?: number;
  comments: number;
  ingredients: IIngredient[];
  instructions: IInstruction[];
  link_copyright?: string | null;
  map_coordinates?: string | null;
  point: string;
  full_recipe_id: string;
  published_id: string;
  published_user: IPublishedUser;
  recipe_metrics: IRecipeMetrics;
  social_links?: ISocialRenderProps;
  source_reference: string | null;
  tags: string[];
  video: string | null;
}

export interface IOwner {
  id?: string;
  avatar: string | null;
  user_id: string;
  user_name: string;
  created_at?: string;
  email?: string;
  appLang?: string;
  theme?: string;
  subscribers?: number;
}
