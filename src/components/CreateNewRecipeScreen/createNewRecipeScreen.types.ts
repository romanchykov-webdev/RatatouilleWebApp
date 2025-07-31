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

// export interface ILanguage {
//   name: string;
//   value: string;
// }

export interface ITitle {
  lang: string;
  value: string;
}

export interface IArea extends ITitle {
  lang: ITitle['lang'];
  value: ITitle['value'];
}
