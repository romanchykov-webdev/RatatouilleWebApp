'use client';

import React from 'react';
import { Languages, Youtube } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useShadowBox } from '@/helpers/hooks/useShadowBox';
import LoaderCustomAbsolute from '@/components/Loaders/LoaderCustomAbsolute';
import { ITitle } from '@/types';

interface IHeaderCartItemProps {
  author: string;
  authorAvatar: string;
  lang: ITitle;
  video: string | null;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const HeaderCartItem: React.FC<IHeaderCartItemProps> = ({
  author,
  authorAvatar,
  lang,
  video,
  isLoading,
  setIsLoading,
}) => {
  const { shadowBox } = useShadowBox();
  return (
    <div className="flex items-start justify-between  w-full">
      <div>
        {video && <Youtube className="text-red-500" />}
        {Object.keys(lang).length > 1 && (
          <Languages className="text-white text-xs w-[20px] h-[20px]" />
        )}
      </div>
      <div className="flex flex-col justify-center relative">
        {isLoading && <LoaderCustomAbsolute />}

        <Avatar style={shadowBox()}>
          <AvatarImage
            src={authorAvatar}
            className="w-[30px] h-[30px] rounded-full"
            alt="Author avatar"
            onLoad={() => setTimeout(() => setIsLoading(false), 1000)}
            onError={() => setIsLoading(false)}
          />
        </Avatar>
        <span className="text-[8px] text-white text-shadow-2xs text-shadow-gray-900 capitalize  text-center">
          {author.length > 5 ? author.slice(0, 5) : author}
        </span>
      </div>
    </div>
  );
};
export default HeaderCartItem;
