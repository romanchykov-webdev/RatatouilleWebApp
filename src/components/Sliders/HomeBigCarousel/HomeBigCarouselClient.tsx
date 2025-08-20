'use client';

import { Card, CardContent } from '@/components/ui/card';
import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import ItemCarousel from '@/components/Sliders/HomeBigCarousel/ItemCarousel';
import { IRecipe } from '@/types';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
interface HomeBigCarouselClientProps {
  recipesBySlider: IRecipe[][];
}

const HomeBigCarouselClient: React.FC<HomeBigCarouselClientProps> = ({ recipesBySlider }) => {
  if (!recipesBySlider || recipesBySlider.length === 0) {
    return <p className="text-center">Нет рецептов</p>;
  }
  const router: AppRouterInstance = useRouter();


  const handleOpenRecipe = (itemId: string) => {
    // console.log('handleOpenRecipe item id', item.full_recipe_id);
    // router.push('/recipe');
    router.push(`/recipe?${encodeURIComponent(`${itemId}`)}`);
  };

  return (
    <section className="justify-center flex">
      <Carousel className="w-full h-[520px]">
        <CarouselContent className="mb-5">
          {recipesBySlider.map((group, groupIndex) => (
            <CarouselItem key={groupIndex} className="h-[520px]">
              <Card className="h-[500px] py-0 border-none bg-transparent">
                <CardContent className="flex items-center justify-center h-full p-0">
                  <div className="grid grid-cols-5 gap-2 w-full h-full">
                    {/* big left item */}
                    <div className="col-span-3 h-full w-full border-2 border-neutral-300
                       rounded-[16px] flex items-center justify-center relative overflow-hidden"
                    >
                      {group[0] && (
                        <ItemCarousel
                          handleOpenRecipe={handleOpenRecipe}
                          recipeId={group[0].full_recipe_id}
                          key={group[0].id}
                          video={group[0].video}
                          lang={group[0].title}
                          authorAvatar={group[0].published_user.avatar}
                          author={group[0].published_user.user_name}
                          bgBigImage={group[0].image_header}
                          title={group[0].title['en'] ?? Object.values(group[0].title)[0]}
                          likes={group[0].likes}
                          comments={group[0].comments}
                          rating={group[0].rating}
                          isLiked={false} // temp
                        />
                      )}
                    </div>

                    {/* right 2 small items */}
                    <div className="grid grid-rows-2 gap-2 col-span-2">
                      {group.slice(1).map(recipe => (
                        <div
                          key={recipe.id}
                          className="h-full border-2 border-neutral-300
                             rounded-[16px] flex items-center justify-center relative overflow-hidden"
                        >
                          <ItemCarousel
                            handleOpenRecipe={() =>
                              window.location.assign(`/recipe?${recipe.full_recipe_id}`)
                            }
                            recipeId={recipe.full_recipe_id}
                            video={recipe.video}
                            lang={recipe.title}
                            authorAvatar={recipe.published_user.avatar}
                            author={recipe.published_user.user_name}
                            bgBigImage={recipe.image_header}
                            title={recipe.title['en'] ?? Object.values(recipe.title)[0]}
                            likes={recipe.likes}
                            comments={recipe.comments}
                            rating={recipe.rating}
                            isLiked={false}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center">
          <CarouselPrevious className="relative" />
          <CarouselNext className="relative" />
        </div>
      </Carousel>
    </section>
  );
}


export  default HomeBigCarouselClient;