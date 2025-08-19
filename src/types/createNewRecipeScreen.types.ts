export interface ILanguageByCreateRecipe {
  [lang: string]: string; // ключ — любой код языка, значение — строка
}

export interface IAreaByCreateRecipe {
  [lang: string]: string;
}

export interface IIngredientsByCreateRecipe {
  ves: number; // количество
  lang: string; // исходный язык описания
  mera: string; // единица измерения (kg, ml, tsp, tbs, g, unit, sprigs и т.д.)
  value: { [lang: string]: string }; // название ингредиента на разных языках
}

export interface IInstructionsByCreateRecipe {
  [lang: string]: string | string[]; // динамические ключи для текстов на разных языках
  images: string[]; // всегда массив строк
}

export interface ISocialByCreateRecipe {
  video: string | null;
  instagram: string | null;
  facebook: string | null;
  tiktok: string | null;
  link_copyright: string | null;
  map_coordinates: string | null;
  source_reference: string | null;
}

export interface ITitleByCreateRecipe {
  [lang: string]: string;
}

export interface IMetaDataByCreateRecipe {
  time: number;
  serv: number;
  cal: number;
  level: string;
}
