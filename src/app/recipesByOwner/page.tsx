'use client';

import React, { JSX, useEffect, useState } from 'react';
import WrapperApp from '@/components/Wrappers/wrapperApp';
import { useRouter, useSearchParams } from 'next/navigation';
import { Undo2, Users } from 'lucide-react';
import { IOwner, IRecipe, IUserProfile } from '@/types';
import { getOwnerRecipeById } from '@/store/api/getOwnerRecipe';
import { getAllRecipesByOwner } from '@/store/api/getAllRecipesByOwner';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useShadowBox } from '@/helpers/hooks/useShadowBox';
import { Button } from '@/components/ui/button';
import HeaderComponent from '@/components/Header/headerComponent';
import { formatNumberToK } from '@/helpers/formatNumberToK';
import toast from 'react-hot-toast';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import LoaderCustom from '@/components/Loaders/LoaderCustom';
import CartItem from '@/components/SectionList/CartItem/CartItem';

// interface IRecipeByOwnerProps {}

const RecipeByOwner: React.FC = (): JSX.Element => {
  const userData = useAppSelector((state: RootState) => state.user as IUserProfile);

  const searchParams = useSearchParams();

  const { shadowBox } = useShadowBox();

  const router = useRouter();

  const [ownerRecipe, setOwnerRecipe] = useState<IOwner | null>(null);
  const [allRecipesByOwner, setAllRecipesByOwner] = useState<IRecipe[] | null>([]);

  const [isLoading, setIsLoading] = useState(true);

  const ownerId = searchParams.toString().split('=')[0];
  console.log('RecipeByOwner raw', ownerId);

  // fetch ger ownerData and recipe by owner
  const fetchOwnerData = async () => {
    setIsLoading(true);
    const ownerData = await getOwnerRecipeById(ownerId);
    console.log('fetchOwnerData ownerData', ownerData);
    setOwnerRecipe(ownerData);

    const resRecipes = await getAllRecipesByOwner(ownerId);
    // console.log('fetchOwnerData resRecipes', resRecipes);
    setAllRecipesByOwner(resRecipes);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchOwnerData();
  }, [ownerId]);

  const handlerSubscribe = async () => {
    if (userData?.isAuth === false) {
      toast.success('Your nid or login ar register');
    }

    console.log('SubscribeComponent handler subscribe');
    if (ownerRecipe?.id === userData?.userId) {
      toast.success('This recipe was published by you');
    }
    //   запрос на подписку
  };

  if (isLoading) {
    return <LoaderCustom />;
  }

  return (
    <WrapperApp>
      <HeaderComponent />

      {/*button back*/}
      <div className="mt-5">
        <Button
          onClick={() => router.back()}
          className="p-2 rounded-full bg-neutral-500"
          style={shadowBox()}
        >
          <Undo2 />
        </Button>
      </div>

      {/*owner data*/}
      <article className="flex flex-col gap-y-5 items-center">
        <Avatar className="w-[200px] h-[200px]" style={shadowBox()}>
          <AvatarImage src={ownerRecipe?.avatar ?? ''} />
        </Avatar>
        <h2>{ownerRecipe?.user_name}</h2>

        {/*  subscribers*/}
        <div className="flex items-center gap-2">
          <Users /> {formatNumberToK(ownerRecipe?.subscribers ?? 0)}
        </div>

        {/*/!*Button subscribe*!/*/}
        <Button onClick={handlerSubscribe} className="bg-green-300 hover:bg-yellow-500">
          Subscribe
        </Button>

        {/*  recipes by owner*/}
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full mt-[30px]">
          {allRecipesByOwner &&
            allRecipesByOwner.map(item => (
              <CartItem
                item={item}
                appLang={userData.appLang}
                key={item.id}
                loading={isLoading}
              />
            ))}
        </div>
      </article>
    </WrapperApp>
  );
};
export default RecipeByOwner;
