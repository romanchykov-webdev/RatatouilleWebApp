// Интерфейс для перевода названия рецепта
interface TitleTranslation {
  lang: string;
  name: string;
  strTitle?: string;
}

// Интерфейс для объекта published_user
interface PublishedUser {
  avatar: string;
  user_id: string;
  user_name: string;
}

// Интерфейс для результата поиска
export interface SearchResult {
  id: string;
  created_at: string;
  published_id: string;
  category: string;
  category_id: string;
  image_header: string;
  title: TitleTranslation[];
  rating: number;
  likes: number;
  comments: number;
  video: boolean;
  tags: string[];
  full_recipe_id: string;
  published_user: PublishedUser;
  point: string;
}

// Интерфейс для состояния поиска
export interface ISearchState {
  query: string;
  results: SearchResult[];
}
