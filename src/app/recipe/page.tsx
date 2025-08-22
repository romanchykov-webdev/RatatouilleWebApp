'use client';

import React, { JSX, useEffect, useRef, useState } from 'react';
import RecipeComponent from '@/components/RecipeComponent/RecipeComponent';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { useSearchParams } from 'next/navigation';
import { getRecipeById } from '@/store/api/getRecipe';
import { getOwnerRecipeById } from '@/store/api/getOwnerRecipe';
import HeaderComponent from '@/components/Header/headerComponent';
import { IMeasurements, IOwner, IRecipe, IUserProfile } from '@/types';
import LoaderCustom from '@/components/Loaders/LoaderCustom';

const RecipePage: React.FC<IRecipe> = (): JSX.Element => {
  const userData = useAppSelector((state: RootState) => state.user as IUserProfile);

  const measurementData: IMeasurements = useAppSelector((state: RootState) => state.measurement);

  const [recipeData, setRecipeData] = useState<IRecipe | null>(null);

  const [ownerData, setOwnerData] = useState<IOwner | null>(null);

  const searchParams = useSearchParams();
  const idRecipe = searchParams.toString().split('=')[0];

  // Используем useRef чтобы вызвать fetch только один раз
  const fetched = useRef(false);

  const fetchRecipe = async () => {
    const res = await getRecipeById(idRecipe);
    // console.log('recipeDataArr', res);
    if (res) {
      // const firstRecipe = res[0];
      setRecipeData(res);
      fetchGetOwnerData(res.published_id);
    }
  };

  const fetchGetOwnerData = async (ownerId: string) => {
    if (!ownerId) return;
    const ownerRecipeData = await getOwnerRecipeById(ownerId);
    setOwnerData(ownerRecipeData);
  };

  useEffect(() => {
    if (!fetched.current) {
      fetchRecipe();
      fetched.current = true;
      // console.log('render page');
    }
  }, []);

  // Логируем данные только после их загрузки
  // useEffect(() => {
  //   if (recipeData && ownerData) {
  //     console.log('recipeData', recipeData);
  //     console.log('ownerData', ownerData);
  //     console.log('render page');
  //   }
  // }, [recipeData, ownerData]);

  // Показываем Loader пока данные не загрузились
  if (!recipeData || !ownerData) {
    return <LoaderCustom />;
  }

  return (
    <section>
      <HeaderComponent />

      <RecipeComponent
        recipe={recipeData}
        ownerRecipe={ownerData}
        userId={userData.isAuth && userData.id ? userData.id : null}
        userLang={userData.app_lang}
        measurementData={measurementData}
      />
    </section>
  );
};
export default RecipePage;
