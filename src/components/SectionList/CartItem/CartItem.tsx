'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

import HeaderCartItem from '@/components/SectionList/CartItem/HeaderCartItem';
import BGImage from '@/components/SectionList/CartItem/BGImage';
import FooterCartItem from '@/components/SectionList/CartItem/FooterCartItem';
import { useShadowBox } from '@/helpers/hooks/useShadowBox';
import SkeletonCustom from '@/components/CreateNewRecipeScreen/SkeletonCustom';
import { IItem } from '@/components/SectionList/CartItem.types';
import { useRouter } from 'next/navigation';

// export interface IItem {
//   id: string;
//   index?: number;
//   image: string;
//   author: string;
//   authorAvatar: string;
//   category: string;
//   subcategory: string;
//   title: { lang: string; value: string }[]; // <-- исправлено
//   likes: number;
//   comments: number;
//   rating: number;
//   isLiked: boolean;
//   lang: string[];
//   video: boolean;
//   image_header?: string;
//   published_user?: {
//     avatar: string;
//     user_name: string;
//   };
// }

// Интерфейс для пропсов компонента CartItem
interface ICartItemProps {
  item: IItem;
  appLang: string;
  loading: boolean;
}

const CartItem: React.FC<ICartItemProps> = ({
  item,
  appLang,
  loading,
}): React.ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { shadowBox } = useShadowBox();

  const router = useRouter();
  // console.log('CartItem item', item);

  // useEffect(() => {
  //   dispatch(getRecipeHomeThunk(categoryArr.point));
  // }, []);
  // Ищем заголовок на нужном языке appLang
  const titleObj = item.title.find(t => t.lang === appLang) || item.title[0];
  const titleText = titleObj?.value ?? 'No title';
  const handleOpenRecipe = () => {
    console.log('handleOpenRecipe item id', item.full_recipe_id);
    // router.push('/recipe');
    router.push(`/recipe?${encodeURIComponent(`${item.full_recipe_id}`)}`);
  };

  return (
    <article onClick={handleOpenRecipe}>
      <Card
        style={shadowBox()}
        className=" h-[200px] relative  cursor-pointer border-none  p-0 transition-all hover:transform  hover:scale-107 duration-600 "
      >
        {loading ? (
          <SkeletonCustom dependency={loading} />
        ) : (
          <CardContent className="relative w-full h-full  overflow-hidden rounded-lg">
            {/*bg image*/}
            <BGImage
              bdImg={item.image_header ?? ''}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            {/*content*/}
            <div
              className="absolute left-0 top-0 bottom-0 right-0 bg-gradient-to-t
                        from-black/90 to-black/70
                      "
            />
            <div className="absolute flex flex-col h-full items-center justify-between  w-full left-0 p-2">
              {/*header video author avatar name*/}
              <HeaderCartItem
                video={item.video}
                lang={item.title}
                authorAvatar={item?.published_user?.avatar ?? ''}
                author={item.published_user?.user_name || 'Unknown'}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />

              {/*/!* footer title like commit rating isLiked *!/*/}
              <FooterCartItem
                title={titleText}
                likes={item.likes}
                comments={item.comments}
                rating={item.rating}
                isLiked={item.isLiked}
              />
            </div>
          </CardContent>
        )}
      </Card>
    </article>
  );
};
export default CartItem;
