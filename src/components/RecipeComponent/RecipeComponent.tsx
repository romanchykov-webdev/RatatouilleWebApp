'use client';

import React, { JSX, useState } from 'react';

import { useShadowBox } from '@/helpers/hooks/useShadowBox';
import { usePathname } from 'next/navigation';
import { Users, Clock, Flame, Layers } from 'lucide-react';
import RecipeMetaItem from '@/components/RecipeComponent/RecipeMetaItem';
import IngredientItem from '@/components/IngredientsWrapper/IngredientItem';
import ImageHeader from '@/components/RecipeComponent/ImageHeader';
import RatingStar from '@/components/RecipeComponent/RatingStar';
import Instruction from '@/components/Instruction/Instruction';
import SocialRender from '@/components/SocialRender/SocialRender';
import TitleArea from '@/components/RecipeComponent/TitleArea';
import toast from 'react-hot-toast';
import SubscribeComponent from '@/components/RecipeComponent/SubscribeComponent';
import { IMeasurementData, IOwner, IRecipe } from '@/types';
import { languagesObj } from '@/helpers/languagesObj';
import { ModalLoginRes } from '@/components/Modal/ModalLoginRes';
import ButtonBack from '@/components/Buttons/ButtonBack';
import Comments from '@/components/RecipeComponent/Comments';

interface IRecipeComponentProps {
  recipe: IRecipe;
  userLang: string;
  userId: string | null;
  ownerRecipe: IOwner;
  measurementData: IMeasurementData;
}

const RecipeComponent: React.FC<IRecipeComponentProps> = ({
  recipe,
  userLang,
  userId,
  ownerRecipe,
  measurementData,
}): JSX.Element => {
  const { shadowBox } = useShadowBox();

  console.log('measurementData', JSON.stringify(measurementData, null));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isActiveLang, setIsActiveLang] = useState<string>(userLang);

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

  // const languagesRecipe = languagesObj.filter(lang =>
  //   recipe.title.some(t => t.lang === lang.name),
  // );
  const languagesRecipe = languagesObj.filter(lang =>
    recipe.title.hasOwnProperty(lang.name),
  );

  // console.log('languagesRecipe recipe.title', languagesRecipe);

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

  // isActiveLang={isActiveLang} instructionStore={recipe?.instructions}

  // console.log('RecipeComponent socialLinks', recipe?.instructions);

  return (
    <article className="flex flex-col gap-y-[35px]">
      {/*name recipe and back*/}
      <div className="flex items-center p-2 mb-5">
        {/*button back*/}
        <ButtonBack />
        {/*  name recipe*/}
        <h1 className="flex-1 text-center font-bold text-xl">
          {recipe.title[isActiveLang] ?? Object.values(recipe.title)[0]}
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

      {/*/!*block rating*!/*/}
      <RatingStar rating={recipe?.rating} handlerSelectedRating={handlerSelectedRating} />

      {/*/!*  block subscribe*!/*/}
      <SubscribeComponent ownerRecipe={ownerRecipe} userId={userId} />

      {/*/!*  title area*!/*/}
      <TitleArea title={recipe?.title} area={recipe?.area} isActiveLang={isActiveLang} />

      {/*/!*  mataData*!/*/}
      <div
        className="grid gap-x-3  justify-between"
        style={{ gridTemplateColumns: 'repeat(4, minmax(50px, 80px))' }}
      >
        {/*  /!*time*!/*/}
        <div
          style={shadowBox()}
          className="relative w h-[150px] rounded-full overflow-hidden"
        >
          <RecipeMetaItem
            pathName={pathName}
            type={'serv'}
            num={recipe?.recipe_metrics?.time}
            text={'time'}
            icon={Clock}
          />
        </div>

        {/*  /!*ser*!/*/}
        <div
          style={shadowBox()}
          className="relative w h-[150px] rounded-full overflow-hidden"
        >
          <RecipeMetaItem
            pathName={pathName}
            type={'serv'}
            num={recipe?.recipe_metrics?.serv}
            text={'serv'}
            icon={Users}
          />
        </div>

        {/*  /!*  cal*!/*/}
        <div
          style={shadowBox()}
          className="relative w h-[150px] rounded-full overflow-hidden"
        >
          <RecipeMetaItem
            pathName={pathName}
            type={'serv'}
            num={recipe?.recipe_metrics?.cal}
            text={'cal'}
            icon={Flame}
          />
        </div>

        {/*  /!*  level*!/*/}
        <div
          style={shadowBox()}
          className="relative w h-[150px] rounded-full overflow-hidden"
        >
          <RecipeMetaItem
            pathName={pathName}
            type={'level'}
            text={recipe?.recipe_metrics?.level ?? ''}
            icon={Layers}
          />
        </div>
      </div>

      {/*/!*ingredients*!/*/}
      <div>
        <h4>Ingredients</h4>
        <IngredientItem
          ingredientsStore={recipe.ingredients}
          isCreateRecipe={false}
          measurements={measurementData}
          isActiveLang={isActiveLang}
        />
      </div>

      {/*/!*instruction*!/*/}
      <Instruction isActiveLang={isActiveLang} instructionStore={recipe?.instructions} />

      {/*/!*social links*!/*/}

      <SocialRender socialLinks={socialLinks} />

      <Comments />

      {/* Модальное окно */}
      <ModalLoginRes isOpen={isModalOpen} onCloseAction={() => setIsModalOpen(false)} />
    </article>
  );
};
export default RecipeComponent;
