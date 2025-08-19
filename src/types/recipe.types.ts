export interface ISocial {
  instagram: string | null;
  facebook: string | null;
  tiktok: string | null;

  [key: string]: string | null;
}

export interface IArea {
  [lang: string]: string; // любое свойство с ключом-строкой и значением строка
}

export interface ITitle {
  [lang: string]: string; // ключ — любой код языка, значение — строка
}

export interface IIngredient {
  ves: number; // количество
  lang: string; // исходный язык описания
  mera: string; // единица измерения (kg, ml, tsp, tbs, g, unit, sprigs и т.д.)
  value: { [lang: string]: string }; // название ингредиента на разных языках
}

// interface InstructionStep {
//   [lang: string]: string;
//
//   image: string;
// }
//
// export interface IInstructions {
//   instructions: InstructionStep[];
// }

export interface IInstructions {
  [lang: string]: string | string[]; // динамические ключи для текстов на разных языках
  images: string[]; // всегда массив строк
}

// interface Instruction {
//   [lang: string]: string | string[]; // Языки — string, images — string[]
//   images?: string[]; // Необязательное поле images
// }

export interface IPublishedUser {
  avatar: string;
  user_name: string;
  user_id: string;
}

export interface IRecipeMetrics {
  cal: number; // Калории на порцию
  serv: number; // Количество порций
  time: number; // Время приготовления в минутах
  level: 'easy' | 'medium' | 'hard'; // Уровень сложности
}

export interface IRecipe {
  id?: string;
  created_at?: string;
  category: string;
  category_id?: string;
  image_header: string;
  area: IArea;
  title: ITitle;
  rating: number;
  likes: number;
  comments: number;
  ingredients: IIngredient[];
  instructions: IInstructions[];
  link_copyright: string | null;
  map_coordinates: string | null;
  point: string;
  full_recipe_id: string;
  published_id: string;
  published_user: IPublishedUser;
  recipe_metrics: IRecipeMetrics;
  social_links: ISocial;
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
