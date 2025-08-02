export interface ISubcategory {
  name: string;
  point: string;
  image: string;
}

export interface ICategory {
  name: string;
  point: string;
  image: string;
  subcategories: ISubcategory[];
}

export interface ILanguage {
  name: string;
  value: string;
}

export interface ITitle {
  lang: string;
  value: string;
}

export interface IArea extends ITitle {
  lang: ITitle['lang'];
  value: ITitle['value'];
}

export interface IMeasurement {
  [language: string]: {
    [unitKey: string]: string;
  };
}

export interface IIngredientEntry {
  [lang: string]: string | number;

  mera: string;
  ves: number;
}

export interface IIngredientTitle {
  lang: string;
  value: Record<string, string>; // название ингредиента
  mera: string; // мера веса/объема, локализованная
  ves: number; // числовое значение веса/объема
}
