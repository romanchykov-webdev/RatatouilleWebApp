'use client';

import React from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import LoaderCustomAbsolute from '@/components/Loaders/LoaderCustomAbsolute';

interface IBGImageCartItemProps {
  bdImg: string;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const BGImage: React.FC<IBGImageCartItemProps> = ({ bdImg, isLoading, setIsLoading }) => {
  return (
    <Avatar className="w-full h-full rounded-none absolute top-0 left-0 right-0 bottom-0">
      {isLoading && <LoaderCustomAbsolute />}
      <AvatarImage
        src={bdImg}
        className={`w-full h-full  ${isLoading ? 'hidden' : 'block'}`}
        alt="Logo"
        onLoad={() => setTimeout(() => setIsLoading(false), 1000)}
        onError={() => setIsLoading(false)}
      />
    </Avatar>
  );
};
export default BGImage;
