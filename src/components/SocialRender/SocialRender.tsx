'use client';

import React, { JSX, useEffect } from 'react';
import { ISocialRenderProps } from '@/types/createNewRecipeScreen.types';

import { Youtube, Instagram, Facebook, MapPin, Copyright } from 'lucide-react';
import Link from 'next/link';

// interface ISocialLinksPropsProps {
//   socialLinks: ISocialRenderProps;
// }

const SocialRender: React.FC = ({ socialLinks }): JSX.Element => {
  // const { youtube, blog, instagram, facebook, tikTok, pointCoordinates } =
  //   socialLinksProps;
  // console.log('socialLinks youtubeUrl', socialLinks);

  return (
    <article className="flex flex-wrap gap-2 items-center justify-center">
      {Object.entries(socialLinks).map(([key, value]) => {
        if (value === null) return '';

        const Icon = () => {
          switch (key) {
            case 'facebook':
              return <Facebook className="w-[30px] h-[30px] text-blue-500" />;
            case 'youtube':
              return <Youtube className="w-[30px] h-[30px] text-red-500" />;
            case 'instagram':
              return <Instagram className="w-[30px] h-[30px] text-red-300" />;
            case 'coordinates':
              return <MapPin className="w-[30px] h-[30px] text-blue-300" />;
            // case 'blog':
            //   return <BookOpenText className="w-[30px] h-[30px] text-blue-300" />;
            case 'link_copyright':
              return <Copyright className="w-[30px] h-[30px] text-blue-300" />;
            default:
              return null;
          }
        };

        return (
          <Link
            className="px-5 py-2 capitalize border-[1px] border-neutral-300 flex rounded-[10px]
            items-center gap-x-2
            hover:bg-yellow-300 hover:text-black transition-all duration-200"
            href={value}
            key={key}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon />
            {key}
          </Link>
        );
      })}
    </article>
  );
};
export default SocialRender;
