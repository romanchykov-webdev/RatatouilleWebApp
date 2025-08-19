'use client';

import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { JSX, useEffect, useState } from 'react';

import ItemCarousel from '@/components/Sliders/HomeBigCarousel/ItemCarousel';
import { getRecipesByHomeSlider } from '@/store/api/getRecipeByHomeSlider';
import LoaderCustom from '@/components/Loaders/LoaderCustom';
import { chunkArray } from '@/helpers/chunkArray';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { IRecipe } from '@/types';

export const WrapperCarouselItems: React.FC = ({}): JSX.Element => {
  const appLang: string = useAppSelector(
    (state: RootState): string => state.user.appLang,
  );

  const router: AppRouterInstance = useRouter();

  const [recipesBySlider, setRecipesBySlider] = useState<IRecipe[][]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchRecipeBySlider = async () => {
    setIsLoading(true);
    const result = await getRecipesByHomeSlider();
    // console.log('WrapperCarouselItems', JSON.stringify(result, null));
    if (result) {
      setRecipesBySlider(chunkArray(result, 3));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRecipeBySlider();

    // console.log('recipesBySlider?.image_header', recipesBySlider);
  }, []);
  const handleOpenRecipe = (itemId: string) => {
    // console.log('handleOpenRecipe item id', item.full_recipe_id);
    // router.push('/recipe');
    router.push(`/recipe?${encodeURIComponent(`${itemId}`)}`);
  };
  if (isLoading) {
    return <LoaderCustom />;
  }
  // console.log('WrapperCarouselItems recipesBySlider', recipesBySlider);
  return (
    <>
      {recipesBySlider?.length > 0 &&
        recipesBySlider.map((group, groupIndex) => (
          <CarouselItem key={groupIndex} className="h-[520px]">
            <Card className="h-[500px] py-0 border-none bg-transparent">
              <CardContent className="flex items-center justify-center h-full p-0">
                <div className="grid grid-cols-5 gap-2 w-full h-full">
                  {/* big left item (первый в группе) */}
                  <div
                    className="col-span-3 h-full w-full border-2 border-neutral-300
                         rounded-[16px] flex items-center justify-center relative overflow-hidden"
                  >
                    {group[0] && (
                      <ItemCarousel
                        handleOpenRecipe={handleOpenRecipe}
                        recipeId={group[0].full_recipe_id}
                        key={group[0].id}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        video={group[0].video}
                        lang={group[0].title}
                        authorAvatar={group[0].published_user.avatar}
                        author={group[0].published_user.user_name}
                        bgBigImage={group[0].image_header}
                        title={
                          group[0].title[appLang] ?? Object.values(group[0].title)[0]
                        }
                        likes={group[0].likes}
                        comments={group[0].comments}
                        rating={group[0].rating}
                        isLiked={false} //temp
                      />
                    )}
                  </div>

                  {/* right 2 small items (второй и третий в группе) */}
                  <div className="grid grid-rows-2 gap-2 col-span-2">
                    {group.slice(1).map(recipe => (
                      <div
                        key={recipe.id}
                        className="h-full border-2 border-neutral-300
                             rounded-[16px] flex items-center justify-center relative overflow-hidden"
                      >
                        <ItemCarousel
                          handleOpenRecipe={handleOpenRecipe}
                          recipeId={recipe.full_recipe_id}
                          isLoading={isLoading}
                          setIsLoading={setIsLoading}
                          video={recipe.video}
                          lang={recipe.title}
                          authorAvatar={recipe.published_user.avatar}
                          author={recipe.published_user.user_name}
                          bgBigImage={recipe.image_header}
                          title={recipe.title[appLang] ?? Object.values(recipe.title)[0]}
                          likes={recipe.likes}
                          comments={recipe.comments}
                          rating={recipe.rating}
                          isLiked={false} //temp
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
    </>
  );
};

const HomeBigCarouselComponent: React.FC = () => {
  return (
    <section className=" justify-center flex ">
      <Carousel className="w-full  h-[520px]">
        <CarouselContent className="mb-5">
          {Array.from({ length: 5 }).map((_, index) => {
            return <WrapperCarouselItems key={index} />;
          })}
        </CarouselContent>
        <div className="flex justify-center">
          <CarouselPrevious className="relative" />
          <CarouselNext className="relative" />
        </div>
      </Carousel>
    </section>
  );
};
export default HomeBigCarouselComponent;
