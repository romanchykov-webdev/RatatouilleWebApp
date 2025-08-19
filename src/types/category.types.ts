export interface ISubcategory {
  name: string;
  point: string;
  image: string;
}

export interface ICategoriesAndSubcategories {
  name: string;
  point: string;
  image: string;
  subcategories: ISubcategory[];
}

export interface ICategory {
  id: string;
  created_at: string;
  lang: string;
  title: ICategoriesAndSubcategories[];
}
