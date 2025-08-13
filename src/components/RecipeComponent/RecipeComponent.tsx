'use client';

import React, { JSX, useEffect, useState } from 'react';
import {
  IArea,
  IIngredient,
  IInstruction,
  ILanguage,
  ISocialRenderProps,
  ITitle,
} from '@/types/createNewRecipeScreen.types';
import { IMetaData } from '@/types/recipeMeta.types';
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
import { Modal } from '@/components/Modal/modal';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SubscribeComponent from '@/components/RecipeComponent/SubscribeComponent';

interface IRecipeComponentProps {
  recipe: {
    id?: string;
    authorId: string;
    category: string;
    subCategory: string;
    imageHeader: string;
    languages: ILanguage[];
    title: ITitle[];
    area: IArea[];
    tags: string[];
    recipeMeta: IMetaData;
    ingredients: IIngredient[];
    instruction: IInstruction[];
    socialLinks: ISocialRenderProps;
    rating: number;
    comments: number;
    isLiked: boolean;
  };
  userLang: string;
  userId: string;
  ownerRecipe: {
    avatar: string;
    name: string;
    subscribers: number;
    ownerId: string;
  };
}

const RecipeComponent: React.FC<IRecipeComponentProps> = ({
  recipe,
  userLang,
  userId,
  ownerRecipe,
}: IRecipeComponentProps): JSX.Element => {
  const { shadowBox } = useShadowBox();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isActiveLang, setIsActiveLang] = useState<string | null>(userLang ?? null);

  // console.log('RecipeComponent recipe', JSON.stringify(recipe, null, 2));
  // console.log('RecipeComponent userLang', userLang);
  // console.log('RecipeComponent userId', userId);
  // console.log('RecipeComponent ownerRecipe', ownerRecipe);

  useEffect(() => {
    // console.log('isActiveLang', isActiveLang);
    setIsActiveLang(userLang);
  }, [userLang]);

  const handlerSelectedLang = (lang: string) => {
    console.log('handlerSelectedLang', lang);
    setIsActiveLang(lang);
  };

  const pathName = usePathname();

  // handler for make rating
  const handlerSelectedRating = (
    newRating: number,
    idRecipe = recipe?.id,
    idOwnerRecipe = recipe?.authorId,
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
      toast.success('Only registered users can mark a recipe');
    }
  };

  // handler fol make like
  const handlerIsLackedRecipe = (
    idRecipe: string,
    idOwnerRecipe: string,
    idUserClick: string,
  ) => {
    console.log('handlerIsLackedRecipe idRecipe', idRecipe);
    console.log('handlerIsLackedRecipe idOwnerRecipe', idOwnerRecipe);
    console.log('handlerIsLackedRecipe idUserClick', idUserClick);
    if (idOwnerRecipe === idUserClick) {
      toast.success('This recipe is published by you');
    }
    if (idUserClick === null) {
      toast.success('Only registered users can mark a recipe');
      setIsModalOpen(true);
    }
  };

  // modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleConfirm = () => {
    setIsModalOpen(false);
  };

  if (!recipe || !ownerRecipe?.[0]) {
    return <div>Loading...</div>;
  }

  const socialLinks = {
    tiktok: recipe?.social_links?.tiktok || null,
    facebook: recipe?.social_links?.facebook || null,
    instagram: recipe?.social_links?.instagram || null,
    link_copyright: recipe?.link_copyright || null,
    map_coordinates: recipe?.map_coordinates || null,
  };

  console.log('RecipeComponent isActiveLang', isActiveLang);

  return (
    <article className="flex flex-col gap-y-[35px]">
      {/*header image*/}

      <ImageHeader
        isLiked={recipe?.isLiked}
        imageHeader={recipe?.image_header}
        rating={recipe?.rating}
        comments={recipe?.comments}
        isActiveLang={isActiveLang}
        handlerSelectedLang={handlerSelectedLang}
        languages={recipe?.title}
        isLackedRecipe={handlerIsLackedRecipe}
        idOwnerRecipe={recipe?.published_id}
        idUserClick={userId}
        idRecipe={recipe?.id ?? ''}
      />

      {/*block rating*/}
      <RatingStar rating={recipe?.rating} selectedRating={handlerSelectedRating} />

      {/*  block subscribe*/}
      <SubscribeComponent ownerRecipe={ownerRecipe[0]} userId={recipe?.published_id} />

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
            text={recipe?.recipe_metrics?.level}
            icon={Layers}
          />
        </div>
      </div>

      {/*ingredients*/}
      <div>
        <h4>Ingredients</h4>
        <IngredientItem
          ingredientsStore={recipe?.ingredients}
          isCreateRecipe={false}
          isActiveLang={isActiveLang}
        />
      </div>

      {/*instruction*/}
      <Instruction
        userLangStore={isActiveLang}
        instructionStore={recipe?.instructions}
        isVisibleButtonLang={false}
        isVisibleRemoveInstruction={false}
      />

      {/*social links*/}

      <SocialRender socialLinks={socialLinks} />

      {/* Модальное окно */}
      {/*<Modal*/}
      {/*  isOpen={isModalOpen}*/}
      {/*  onCloseAction={closeModal}*/}
      {/*  title={'Login to your account or submit'}*/}
      {/*  confirmText="Выход"*/}
      {/*  cancelText="Отмена"*/}
      {/*  onConfirm={handleConfirm}*/}
      {/*  showCloseButton={true}*/}
      {/*  maxWidth="max-w-lg"*/}
      {/*>*/}
      {/*  <div className="flex flex-col gap-y-4">*/}
      {/*    <Link href={'/login'}>Login</Link>*/}
      {/*    <Link href={'/registr'}>Sing Up</Link>*/}

      {/*    /!* Кнопки *!/*/}
      {/*    <div className="flex justify-end gap-4">*/}
      {/*      <Button onClick={closeModal} className="cursor-pointer">*/}
      {/*        Exit*/}
      {/*      </Button>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</Modal>*/}
    </article>
  );
};
export default RecipeComponent;
