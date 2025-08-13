'use client';

import React, { JSX, useEffect, useState } from 'react';
import WrapperApp from '@/components/Wrappers/wrapperApp';
import RecipeComponent from '@/components/RecipeComponent/RecipeComponent';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { useSearchParams } from 'next/navigation';
import { getRecipeById } from '@/store/api/getRecipe';
import { getOwnerRecipeById } from '@/store/api/getOwnerRecipe';
import HeaderComponent from '@/components/Header/headerComponent';
import { useRouter } from 'next/navigation';
import { Loader, Loader2, Undo2 } from 'lucide-react';
import { useShadowBox } from '@/helpers/hooks/useShadowBox';
import { Button } from '@/components/ui/button';

interface IRecipePageProps {}

const RecipePage: React.FC<IRecipePageProps> = (): JSX.Element => {
  const userData = useAppSelector((state: RootState) => state.user);

  const { shadowBox } = useShadowBox();

  const [recipeData, setRecipeData] = useState<any | null>(null);

  const [ownerData, setOwnerData] = useState([]);

  const router = useRouter();

  const searchParams = useSearchParams();
  const idRecipe = searchParams.toString().split('=')[0];
  // console.log('searchParams', idRecipe);

  const fetchRecipe = async () => {
    const recipeData = await getRecipeById(idRecipe);
    // console.log('recipeData', JSON.stringify(recipeData,null));
    setRecipeData(recipeData[0]);
    if (recipeData) {
      fetchGetOwnerData(recipeData[0]);
    }
  };

  const fetchGetOwnerData = async (recipeData: []) => {
    // console.log('recipeData.published_user.user_Id', recipeData?.published_id);
    const ownerRecipeData = await getOwnerRecipeById(recipeData?.published_id);
    // console.log('ownerRecipeData', ownerRecipeData);
    setOwnerData(ownerRecipeData);
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  // console.log('recipeData', JSON.stringify(recipeData, null));
  // console.log('ownerData', JSON.stringify(ownerData, null));

  if (!recipeData) {
    return (
      <div
        className="fixed top-0 left-0 flex items-center justify-center w-full h-screen"
        style={{ backgroundColor: 'rgba(0,0,0, 0.9)' }}
      >
        <Loader2 className="ml-2 w-[50px] h-[50px] text-yellow-400 animate-spin" />
      </div>
    );
  }

  return (
    <WrapperApp>
      <HeaderComponent />

      {/*name recipe and back*/}
      <div className="flex items-center p-2 mb-5">
        {/*button back*/}
        <Button
          onClick={() => router.back()}
          className="p-2 rounded-full bg-neutral-500"
          style={shadowBox()}
        >
          <Undo2 />
        </Button>
        {/*  name recipe*/}
        <h1 className="flex-1 text-center font-bold text-xl">
          {recipeData.title.find(item => item.lang === userData.appLang)?.value ||
            recipeData.title[0].value}
        </h1>
      </div>

      <RecipeComponent
        recipe={recipeData}
        ownerRecipe={ownerData}
        userId={userData.isAuth ? userData.userId : null}
        userLang={userData.appLang}
      />
    </WrapperApp>
  );
};
export default RecipePage;
