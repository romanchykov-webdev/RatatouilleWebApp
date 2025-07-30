'use client';

import React from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { IBGImageCartItemProps } from '@/components/SectionList/CartItem.types';

const BGImage: React.FC<IBGImageCartItemProps> = ({ bdImg, isLoading, setIsLoading }) => {
  return (
    <Avatar className="w-full h-full rounded-none absolute top-0 left-0 right-0 bottom-0">
      {isLoading && (
        <Skeleton className="w-full h-full top-0 left-0 right-0 bottom-0 absolute bg-neutral-500" />
      )}
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
