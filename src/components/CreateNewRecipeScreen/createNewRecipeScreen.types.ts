export interface Subcategory {
  name: string;
  point: string;
  image: string;
}

export interface Category {
  name: string;
  point: string;
  image: string;
  subcategories: Subcategory[];
}
