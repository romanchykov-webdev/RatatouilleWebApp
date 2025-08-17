export interface ISubcategory {
  name: string;
  point: string;
  image: string;
}

export interface ITitleByCategory {
  name: string;
  point: string;
  image: string;
  subcategories: ISubcategory[];
}

export interface ICategory {
  id: string;
  created_at: string;
  lang: string;
  title: ITitleByCategory[];
}
