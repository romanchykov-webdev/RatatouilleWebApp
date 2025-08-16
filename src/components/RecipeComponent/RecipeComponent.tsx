'use client';

import React, { JSX, useState } from 'react';
// import {
//   IArea,
//   IIngredient,
//   IInstruction,
//   ILanguage,
//   ISocialRenderProps,
//   ITitle,
// } from '@/types/createNewRecipeScreen.types';
// import { IMetaData } from '@/types/recipeMeta.types';
import { useShadowBox } from '@/helpers/hooks/useShadowBox';
import { usePathname } from 'next/navigation';
import { Users, Clock, Flame, Layers } from 'lucide-react';
import RecipeMetaItem from '@/components/RecipeMeta/RecipeMetaItem';
import IngredientItem from '@/components/IngredientsWrapper/IngredientItem';
import ImageHeader from '@/components/RecipeComponent/ImageHeader';
import RatingStar from '@/components/RecipeComponent/RatingStar';
import Instruction from '@/components/Instruction/Instruction';
import SocialRender from '@/components/SocialRender/SocialRender';
import TitleArea from '@/components/RecipeComponent/TitleArea';
import toast from 'react-hot-toast';
import SubscribeComponent from '@/components/RecipeComponent/SubscribeComponent';
import { IOwner, IRecipe } from '@/types';
import { languagesObj } from '@/helpers/languagesObj';
import { IIngredient, IInstruction } from '@/types/createNewRecipeScreen.types';
import { ModalLoginRes } from '@/components/Modal/ModalLoginRes';
import ButtonBack from '@/components/Buttons/ButtonBack';

// interface IRecipeComponentProps {
//   recipe: {
//     id?: string;
//     authorId: string;
//     category: string;
//     subCategory: string;
//     image_header: string;
//     languages: ILanguage[];
//     title: ITitle[];
//     area: IArea[];
//     tags: string[];
//     recipe_metrics: IMetaData;
//     ingredients: IIngredient[];
//     instructions: IInstruction[];
//     social_links: ISocialRenderProps;
//     rating: number;
//     comments: number;
//     isLiked: boolean;
//   };
//   userLang: string;
//   userId: string | null;
//   ownerRecipe: IOwner;
// }
interface IRecipeComponentProps {
  recipe: IRecipe;
  userLang: string;
  userId: string | null;
  ownerRecipe: IOwner;
}

const RecipeComponent: React.FC<IRecipeComponentProps> = ({
  recipe,
  userLang,
  userId,
  ownerRecipe,
}: IRecipeComponentProps): JSX.Element => {
  const { shadowBox } = useShadowBox();

  console.log('recipecomponent', recipe);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isActiveLang, setIsActiveLang] = useState<string | null>(userLang ?? null);

  // console.log('recicpeComponent', ownerRecipe);
  const handlerSelectedLang = (lang: string) => {
    console.log('handlerSelectedLang', lang);
    setIsActiveLang(lang);
  };

  const pathName = usePathname();

  // handler for make rating
  const handlerSelectedRating = (
    newRating: number,
    idRecipe = recipe?.id,
    idOwnerRecipe = recipe?.published_user.user_id,
    idUserClick = userId,
  ) => {
    console.log('handlerSelectedRating idRecipe', idRecipe);
    console.log('handlerSelectedRating idOwnerRecipe', idOwnerRecipe);
    console.log('handlerSelectedRating idUserClick', idUserClick);
    console.log('handlerSelectedRating', newRating);
    if (idOwnerRecipe === idUserClick) {
      toast.success('This recipe is published by you');
    }
    if (idUserClick === null) {
      toast.error('Only registered users can mark a recipe');
      setIsModalOpen(true);
    }
  };

  // handler fol make like
  const handlerIsLackedRecipe = (
    idRecipe: string,
    idOwnerRecipe: string,
    idUserClick: string | null,
  ) => {
    console.log('handlerIsLackedRecipe idRecipe', idRecipe);
    console.log('handlerIsLackedRecipe idOwnerRecipe', idOwnerRecipe);
    console.log('handlerIsLackedRecipe idUserClick', idUserClick);
    if (idOwnerRecipe === idUserClick) {
      toast.success('This recipe is published by you');
    }
    if (idUserClick === null) {
      toast.error('Only registered users can mark a recipe');
      setIsModalOpen(true);
    }
  };

  const languagesRecipe = languagesObj.filter(lang =>
    recipe.title.some(t => t.lang === lang.name),
  );

  // console.log('languagesRecipe', languagesRecipe);

  if (!recipe || !ownerRecipe) {
    return <div>Loading...</div>;
  }

  const socialLinks = {
    tiktok: recipe?.social_links?.tiktok || null,
    facebook: recipe?.social_links?.facebook || null,
    instagram: recipe?.social_links?.instagram || null,
    link_copyright: recipe?.link_copyright || null,
    coordinates: recipe?.map_coordinates || null,
    youtube: recipe?.video || null,
    // blog: recipe?.blog || null,
  };

  console.log('RecipeComponent socialLinks', JSON.stringify(recipe?.social_links, null));

  return (
    <article className="flex flex-col gap-y-[35px]">
      {/*name recipe and back*/}
      <div className="flex items-center p-2 mb-5">
        {/*button back*/}
        <ButtonBack />
        {/*  name recipe*/}
        <h1 className="flex-1 text-center font-bold text-xl">
          {recipe.title.find(item => item.lang === isActiveLang)?.value ||
            recipe.title[0].value}
        </h1>
      </div>

      {/*header image*/}
      <ImageHeader
        isLiked={false}
        image_header={recipe?.image_header}
        rating={recipe?.rating}
        comments={recipe?.comments}
        isActiveLang={isActiveLang}
        handlerSelectedLang={handlerSelectedLang}
        languages={languagesRecipe}
        isLackedRecipe={handlerIsLackedRecipe}
        idOwnerRecipe={recipe?.published_id}
        idUserClick={userId}
        idRecipe={recipe?.id ?? ''}
      />

      {/*block rating*/}
      <RatingStar rating={recipe?.rating} selectedRating={handlerSelectedRating} />

      {/*  block subscribe*/}
      <SubscribeComponent ownerRecipe={ownerRecipe} userId={userId} />

      {/*  title area*/}
      <TitleArea title={recipe?.title} area={recipe?.area} isActiveLang={isActiveLang} />

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
            num={recipe?.recipe_metrics?.time}
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
            num={recipe?.recipe_metrics?.serv}
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
            num={recipe?.recipe_metrics?.cal}
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
            text={recipe?.recipe_metrics?.level ?? ''}
            icon={Layers}
          />
        </div>
      </div>

      {/*ingredients*/}
      <div>
        <h4>Ingredients</h4>
        <IngredientItem
          ingredientsStore={recipe?.ingredients as unknown as IIngredient[]}
          isCreateRecipe={false}
          isActiveLang={isActiveLang}
        />
      </div>

      {/*instruction*/}
      <Instruction
        userLangStore={isActiveLang ?? ''}
        instructionStore={recipe?.instructions as unknown as IInstruction[]}
        isVisibleButtonLang={false}
        isVisibleRemoveInstruction={false}
      />

      {/*social links*/}

      <SocialRender socialLinks={socialLinks} />

      {/* Модальное окно */}
      <ModalLoginRes isOpen={isModalOpen} onCloseAction={() => setIsModalOpen(false)} />
    </article>
  );
};
export default RecipeComponent;
