'use client';

import React, { JSX } from 'react';
import {
  IArea,
  IIngredient,
  IInstruction,
  ILanguage,
  ISocialRenderProps,
  ITitle,
} from '@/types/createNewRecipeScreen.types';
import { IMetaData } from '@/types/recipeMeta.types';
import Image from 'next/image';
import { useShadowBox } from '@/helpers/hooks/useShadowBox';
import { usePathname } from 'next/navigation';
import {
  Heart,
  HeartHandshake,
  Star,
  MessageCircle,
  Users,
  Clock,
  Flame,
  Layers,
} from 'lucide-react';
import { formatNumberToK } from '@/helpers/formatNumberToK';
import RecipeMetaComponents from '@/components/RecipeMeta/RecipeMetaComponents';
import RecipeMetaItem from '@/components/RecipeMeta/RecipeMetaItem';

interface IRecipeComponentProps {
  recipe: {
    authorId: string;
    category: string;
    subCategory: string;
    imageHeader: string;
    languages: ILanguage[];
    title: ITitle[];
    aria: IArea[];
    tags: string[];
    recipeMeta: IMetaData;
    ingredients: IIngredient[];
    instruction: IInstruction[];
    socialLinks: ISocialRenderProps;
    rating?: number;
    comments?: number;
    isLiked?: boolean;
  };
}

const RecipeComponent: React.FC<IRecipeComponentProps> = ({
  recipe,
}: IRecipeComponentProps): JSX.Element => {
  const { shadowBox } = useShadowBox();

  const pathName = usePathname();

  return (
    <article className="flex flex-col gap-y-3">
      {/*header image*/}
      <div className="relative rounded-[25px] overflow-hidden" style={shadowBox()}>
        <div className="absolute top-0 right-0  flex items-center justify-end w-full  p-5  ">
          <div
            className="flex items-center justify-center relative rounded-full     p-2"
            style={{ backgroundColor: 'rgba(255,255,255,0.8)', ...shadowBox() }}
          >
            <Heart className=" text-yellow-500 w-[40px] h-[40px]" />
            <span className="absolute z-10 text-yellow-500 ">{recipe?.rating}</span>
          </div>
        </div>
        <Image
          src={recipe?.imageHeader}
          alt="Логотип"
          width={200}
          height={200}
          style={{ objectFit: 'cover' }}
          // className="rotate-[-90deg]"
          priority
          className="w-full "
        />

        {/*block rating comments*/}
        <div className="absolute bottom-0 right-0  flex items-center justify-between w-full  p-5  ">
          {/*rating*/}
          <div
            className="flex items-center justify-center relative rounded-full     p-2"
            style={{ backgroundColor: 'rgba(255,255,255,0.8)', ...shadowBox() }}
          >
            <Star className=" text-yellow-500 w-[40px] h-[40px]" />
            <span className="absolute z-10 text-yellow-500 ">{recipe?.rating}</span>
          </div>

          {/*comments*/}
          <div
            className="flex items-center justify-center relative rounded-full     p-2"
            style={{ backgroundColor: 'rgba(255,255,255,0.8)', ...shadowBox() }}
          >
            <MessageCircle className=" text-yellow-500 w-[40px] h-[40px]" />
            <span className="absolute z-10 text-yellow-500 ">{recipe?.rating}</span>
          </div>
        </div>
      </div>

      {/*  block subscribe*/}
      <div className="border-[1px] border-neutral-300 h-[50px] rounded-[10px] p-2">
        subscribe
      </div>

      {/*  title area*/}
      <div>
        <h1>Title</h1>
        <h4>area</h4>
      </div>

      {/*  mataData*/}
      <div
        className="grid gap-x-3  justify-between"
        style={{ gridTemplateColumns: 'repeat(4, minmax(50px, 80px))' }}
      >
        {/*time*/}
        <div
          style={shadowBox()}
          className="relative w h-[150px] rounded-full overflow-hidden"
        >
          <RecipeMetaItem
            pathName={pathName}
            // handler={()=>void }
            type={'serv'}
            num={recipe.recipeMeta.time}
            text={'time'}
            icon={Clock}
          />
        </div>

        {/*ser*/}
        <div
          style={shadowBox()}
          className="relative w h-[150px] rounded-full overflow-hidden"
        >
          <RecipeMetaItem
            pathName={pathName}
            // handler={()=>void }
            type={'serv'}
            num={recipe.recipeMeta.serv}
            text={'serv'}
            icon={Users}
          />
        </div>

        {/*  cal*/}
        <div
          style={shadowBox()}
          className="relative w h-[150px] rounded-full overflow-hidden"
        >
          <RecipeMetaItem
            pathName={pathName}
            // handler={()=>void }
            type={'serv'}
            num={recipe.recipeMeta.cal}
            text={'cal'}
            icon={Flame}
          />
        </div>

        {/*  level*/}
        <div
          style={shadowBox()}
          className="relative w h-[150px] rounded-full overflow-hidden"
        >
          <RecipeMetaItem
            pathName={pathName}
            // handler={()=>void }
            type={'level'}
            // num={recipe.recipeMeta.level}
            text={recipe.recipeMeta.level}
            icon={Layers}
          />
        </div>
      </div>
    </article>
  );
};
export default RecipeComponent;
