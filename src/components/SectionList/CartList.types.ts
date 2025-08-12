export interface IRecipeTitle {
  lang: string;
  value: string;
}

export interface IPublishedUser {
  avatar: string;
  user_id: string;
  user_name: string;
}

export interface IRecipe {
  id: string;
  created_at: string;
  published_id: string;
  category: string;
  category_id: string;
  image_header: string;
  title: IRecipeTitle[];
  rating: number;
  likes: number;
  comments: number;
  video: boolean;
  tags: string[];
  full_recipe_id: string;
  published_user: IPublishedUser;
  point: string;
}

export interface ISubCategory {
  point: string;
  name: string;
}
