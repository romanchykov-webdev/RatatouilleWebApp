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
