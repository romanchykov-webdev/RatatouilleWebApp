import React from 'react';

// Базовый интерфейс для блюда или элемента
export interface IItem {
  id: string;
  index: number;
  image: string;
  author: string;
  authorAvatar: string;
  category: string;
  subcategory: string;
  title: string;
  like: number;
  comments: number;
  rating: number;
  isLiked: boolean;
  lang: string[];
  video: boolean;
}

// Интерфейс для списка карточек
export interface ICartListProps {
  categoryArr: IItem[];
}

// Интерфейс для props компонентов карточки
interface ICartItemBaseProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Props для заголовка карточки
export interface IHeaderCartItemProps extends ICartItemBaseProps {
  author: IItem['author'];
  authorAvatar: IItem['authorAvatar'];
  lang: IItem['lang'];
  video: IItem['video'];
}

// Props для фонового изображения карточки
export interface IBGImageCartItemProps extends ICartItemBaseProps {
  bdImg: IItem['image'];
}

// Props для футера карточки
export interface IFooterCartItemProps extends ICartItemBaseProps {
  title: IItem['title'];
  like: IItem['like'];
  comments: IItem['comments'];
  rating: IItem['rating'];
  isLiked: IItem['isLiked'];
}

// export interface IFooterCartItemProps
//   extends Pick<IItem, 'title' | 'like' | 'comments' | 'rating' | 'isLiked'> {}
