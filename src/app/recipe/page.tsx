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
import { Loader2 } from 'lucide-react';
import { IOwner, IRecipe, IUserProfile } from '@/types';
import LoaderCustom from '@/components/Loaders/LoaderCustom';

const RecipePage: React.FC<IRecipe> = (): JSX.Element => {
  const userData = useAppSelector((state: RootState) => state.user as IUserProfile);
  // console.log('userData', JSON.stringify(userData, null));
  // const { shadowBox } = useShadowBox();

  const [recipeData, setRecipeData] = useState<IRecipe | null>(null);
  // console.log('recipeData', JSON.stringify(recipeData, null));

  const [ownerData, setOwnerData] = useState<IOwner | null>(null);

  // console.log('ownerData', JSON.stringify(ownerData, null));

  // const router = useRouter();

  const searchParams = useSearchParams();
  const idRecipe = searchParams.toString().split('=')[0];
  // console.log('searchParams', idRecipe);

  const fetchRecipe = async () => {
    const recipeDataArr = await getRecipeById(idRecipe);
    if (recipeDataArr && recipeDataArr.length > 0) {
      const firstRecipe = recipeDataArr[0];
      setRecipeData(firstRecipe);
      fetchGetOwnerData(firstRecipe);
    }
  };

  const fetchGetOwnerData = async (recipe: IRecipe) => {
    if (!recipe.published_id) return;
    const ownerRecipeData = await getOwnerRecipeById(recipe.published_id);
    setOwnerData(ownerRecipeData);
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  // console.log('recipeData', JSON.stringify(recipeData, null));
  // console.log('ownerData', JSON.stringify(ownerData, null));

  if (!recipeData || !ownerData) {
    return <LoaderCustom />;
  }

  return (
    <WrapperApp>
      <HeaderComponent />

      <RecipeComponent
        recipe={recipeData}
        ownerRecipe={ownerData}
        userId={userData.isAuth && userData.userId ? userData.userId : null}
        userLang={userData.appLang}
      />
    </WrapperApp>
  );
};
export default RecipePage;
