import React from 'react';

export interface IItemCarouselProps {
  bgBigImage: string;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  video: boolean;
  lang: string[];
  authorAvatar: string;
  author: string;
  title: string;
  like: number;
  comments: number;
  rating: number;
  isLiked: boolean;
}
