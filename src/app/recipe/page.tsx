'use client';

import React, { JSX, useEffect, useState } from 'react';
import WrapperApp from '@/components/Wrappers/wrapperApp';
import RecipeComponent from '@/components/RecipeComponent/RecipeComponent';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { useSearchParams } from 'next/navigation';
import { getRecipeById } from '@/store/api/getRecipe';
import { getOwnerRecipeById } from '@/store/api/getOwnerRecipe';

interface IRecipePageProps {}

const RecipePage: React.FC<IRecipePageProps> = (): JSX.Element => {
  const userData = useAppSelector((state: RootState) => state.user);

  const [recipeData, setRecipeData] = useState([]);

  const [ownerData, setOwnerData] = useState([]);

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

  return (
    <WrapperApp>
      <div>RecipePage</div>
      <RecipeComponent
        recipe={recipeData}
        ownerRecipe={{
          avatar: ownerData?.avatar,
          name: ownerData?.user_name,
          subscribers: ownerData?.subscribers,
          ownerId: ownerData?.id,
        }}
        userId={userData.isAuth ? userData.userId : null}
        userLang={userData.userLang}
      />
    </WrapperApp>
  );
};
export default RecipePage;
