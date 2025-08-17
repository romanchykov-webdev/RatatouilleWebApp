'use client';

import React, { useEffect, useState } from 'react';
import WrapperApp from '@/components/Wrappers/wrapperApp';
import HeaderComponent from '@/components/Header/headerComponent';
import BreadcrumbsComponent from '@/components/Breadcrumbs/BreadcrumbsComponent';
import { supabase } from '../../../../api/supabase';
import SelectedCategory from '@/components/CreateNewRecipeScreen/SelectedCategory';
import AddHeaderImage from '@/components/CreateNewRecipeScreen/AddHeaderImage';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import AddLanguages from '@/components/CreateNewRecipeScreen/AddLanguages';
import { RootState } from '@/store';
import CreateTitleRecipe from '@/components/CreateNewRecipeScreen/CreateTitleRecipe';
import AddArea from '@/components/CreateNewRecipeScreen/AddArea';
import AddTags from '@/components/CreateNewRecipeScreen/AddTags';
import RecipeMetaComponents from '@/components/CreateNewRecipeScreen/RecipeMeta/RecipeMetaComponents';
import { usePathname, useRouter } from 'next/navigation';
import IngredientsRecipe from '@/components/CreateNewRecipeScreen/IngredientsRecipe';
import SectionWrapper from '@/components/CreateNewRecipeScreen/SectionWrapper';
import IngredientsWrapper from '@/components/IngredientsWrapper/IngredientsWrapper';
import { ICategory, IMeasurement } from '@/types/createNewRecipeScreen.types';
import { IUserProfile } from '@/types';
import SkeletonCustom from '@/components/CreateNewRecipeScreen/SkeletonCustom';
import InstructionWrapper from '@/components/Instruction/InstructionWrapper';
import Instruction from '@/components/Instruction/Instruction';
import AddSocialWrapper from '@/components/CreateNewRecipeScreen/AddSocialWrapper';
import RecipeComponent from '@/components/RecipeComponent/RecipeComponent';
import { addOwnerId, clearNewRecipeState } from '@/store/slices/createNewRecipeSlice';
import { Button } from '@/components/ui/button';
import { addRecipeThunk } from '@/store/thunks/createNewRecipeThunk';
import { uploadBase64ToCloudinary } from '@/helpers/uploadBase64ToCloudinary';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const CreateNewRecipe: React.FC = () => {
  const [category, setCategory] = useState<ICategory[]>([]);
  const [measurements, setMeasurements] = useState<IMeasurement>({});

  const [uploadRecipe, setUploadRecipe] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const dispatch = useAppDispatch();
  const createNewRecipe = useAppSelector((state: RootState) => state.createNewRecipe);
  const {
    category: categoryStore,
    subCategory: subCategoryStore,
    image_header: imageHeaderStore,
    languages: languagesStore,
    title: titleStore,
    area: ariaStore,
    tags: tagStore,
    recipe_metrics: recipeMetaStore,
    ingredients: ingredientsStore,
    instructions: instructionStore,
    social_links: socialLinkStore,
  } = createNewRecipe;

  const pathName = usePathname();

  const router = useRouter();

  // console.log('CreateNewRecipe instructionStore', instructionStore);
  const user: IUserProfile = useAppSelector(
    (state: RootState) => state.user as IUserProfile,
  );
  const { appLang: userLangStore, userId, userAvatar, userName, subscribers } = user;

  const getMeasurement = async () => {
    const { data, error } = await supabase.from('measurement').select('lang');
    if (error) {
      console.error('Error fetching measurements:', error.message);
      return;
    }
    if (data && data[0]?.lang) {
      // console.log('data[0].lang', JSON.stringify(data[0].lang, null, 2));
      setMeasurements(data[0].lang as IMeasurement);
    } else {
      console.warn('No measurement data found');
      setMeasurements({});
    }
  };

  const getCategory = async () => {
    // const lang = userLangStore || 'en';
    const { data, error } = await supabase
      .from('categories_masonry')
      .select('*')
      .eq('lang', `${userLangStore}`);
    if (error) {
      console.error('Error fetching categories:', error.message);
      return;
    }
    if (data && data.length > 0 && data[0]?.title) {
      setCategory(data[0].title as ICategory[]);
    } else {
      console.warn('No category data found for lang:');
      setCategory([]);
    }
  };

  useEffect(() => {
    dispatch(addOwnerId(userId));
    getCategory();
    getMeasurement();
  }, [userLangStore, dispatch, userId]);

  // const imageHeaderToPass =
  //   typeof createNewRecipe.imageHeader === 'string' ? createNewRecipe.imageHeader : '';

  //  Publish recipe
  const handlerPublish = async () => {
    try {
      setUploadRecipe(true);
      setUploadProgress(0);

      const { instructions, image_header } = createNewRecipe;

      // Считаем все изображения
      const imagesToUpload = [];

      if (image_header.startsWith('data:image')) {
        imagesToUpload.push(image_header);
      }

      instructions.forEach(step => {
        if (step.images && step.images.length > 0) {
          step.images.forEach(img => {
            if (img.startsWith('data:image')) {
              imagesToUpload.push(img);
            }
          });
        }
      });

      const totalImages = imagesToUpload.length;
      let uploadedCount = 0;

      // Функция для загрузки с обновлением прогресса
      const uploadWithProgress = async (img: string) => {
        const url = await uploadBase64ToCloudinary(img);
        uploadedCount++;
        setUploadProgress(Math.round((uploadedCount / totalImages) * 100));
        return url;
      };

      // Загружаем imageHeader
      let imageHeaderUrl = image_header;
      if (image_header.startsWith('data:image')) {
        imageHeaderUrl = await uploadWithProgress(image_header);
      }

      // Загружаем изображения в instruction
      const updatedInstructions = await Promise.all(
        instructions.map(async step => {
          if (step.images && step.images.length > 0) {
            const updatedImages = await Promise.all(
              step.images.map(async img => {
                if (img.startsWith('data:image')) {
                  return await uploadWithProgress(img);
                }
                return img;
              }),
            );
            return { ...step, images: updatedImages };
          }
          return step;
        }),
      );

      // Формируем новый объект
      const newRecipeData = {
        ...createNewRecipe,
        image_header: imageHeaderUrl,
        instructions: updatedInstructions,
        user_name: userName,
        avatar: userAvatar,
      };

      // console.log('pered otpravcoi newRecipeData', newRecipeData);

      // dispatch(addRecipeThunk(newRecipeData));
    } catch (error) {
      console.error('Error while publishing recipe:', error);
      toast.error('Ошибка при публикации рецепта');
    }
    // finally {
    //   setTimeout(() => {
    //     dispatch(clearNewRecipeState());
    //     setUploadRecipe(false);
    //     setUploadProgress(0);
    //     router.replace('/profile/create');
    //   }, 500);
    // }
  };

  return (
    <WrapperApp>
      <HeaderComponent />
      <BreadcrumbsComponent />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {uploadRecipe && (
          <div
            className="fixed z-20 left-0 right-0 top-0 bottom-0 w-full h-full flex items-center justify-center flex-col gap-y-5"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
          >
            <h2>Подождите, загружается рецепт на сервер</h2>

            {/* Например, если используешь shadcn UI Progress */}
            <Progress value={uploadProgress} max={100} className="w-64" />

            <span>{uploadProgress}%</span>

            <Loader2 className="ml-2 w-[50px] h-[50px] text-yellow-400 animate-spin" />
          </div>
        )}
        {/*section 1*/}
        <SectionWrapper>
          <SelectedCategory
            data={category}
            dispatch={dispatch}
            categoryStore={categoryStore}
            subCategoryStore={subCategoryStore}
          />
          <AddHeaderImage
            dispatch={dispatch}
            // setSelectedFile={setSelectedFile}
            categoryStore={categoryStore}
            imageHeaderStore={imageHeaderStore}
            subCategoryStore={subCategoryStore}
          />
          <AddLanguages
            dispatch={dispatch}
            imageHeaderStore={imageHeaderStore}
            languagesStore={languagesStore}
          />
        </SectionWrapper>

        {/*section 2*/}
        <SectionWrapper>
          <CreateTitleRecipe dispatch={dispatch} languagesStore={languagesStore} />
          <AddArea
            dispatch={dispatch}
            titleStore={titleStore}
            languagesStore={languagesStore}
          />
        </SectionWrapper>

        {/*section 3*/}
        <SectionWrapper>
          <AddTags dispatch={dispatch} ariaStore={ariaStore} tagStore={tagStore} />
          <RecipeMetaComponents
            dispatch={dispatch}
            tagStore={tagStore}
            pathName={pathName}
          />
        </SectionWrapper>

        {/*section 4*/}
        <SectionWrapper>
          <IngredientsRecipe
            dispatch={dispatch}
            recipeMetaStore={recipeMetaStore}
            languagesStore={languagesStore}
            measurements={measurements}
          />
        </SectionWrapper>

        {/*section 5*/}
        <SectionWrapper>
          {ingredientsStore.length > 0 ? (
            <IngredientsWrapper
              measurements={measurements}
              dispatch={dispatch}
              userLangStore={userLangStore}
            />
          ) : (
            <SkeletonCustom dependency={ingredientsStore} />
          )}
        </SectionWrapper>

        {/*section 6*/}
        <SectionWrapper>
          <InstructionWrapper
            dispatch={dispatch}
            languagesStore={languagesStore}
            userLangStore={userLangStore}
            ingredientsStore={ingredientsStore}
          />
        </SectionWrapper>

        {/*section 7*/}
        <SectionWrapper>
          {instructionStore.length === 0 ? (
            <SkeletonCustom dependency={instructionStore} />
          ) : (
            <Instruction
              dispatch={dispatch}
              instructionStore={instructionStore}
              userLangStore={userLangStore}
              languagesStore={languagesStore}
            />
          )}
        </SectionWrapper>

        {/*section 8*/}
        <SectionWrapper>
          {instructionStore.length === 0 ? (
            <SkeletonCustom dependency={instructionStore} />
          ) : (
            <AddSocialWrapper
              dispatch={dispatch}
              instructionStore={instructionStore}
              socialLinkStore={socialLinkStore}
            />
          )}
        </SectionWrapper>

        {/*section last*/}
        <SectionWrapper styleWrapper="sm:col-span-2 lg:col-span-1">
          {/*{instructionStore.length === 0 ? (*/}
          {/*  <SkeletonCustom dependency={instructionStore} />*/}
          {/*) : (*/}
          {/*  <RecipeComponent*/}
          {/*    recipe={{*/}
          {/*      ...createNewRecipe,*/}
          {/*      // userId: userId,*/}
          {/*      rating: 0,*/}
          {/*      comments: 0,*/}
          {/*      // isLiked: false,*/}
          {/*    }}*/}
          {/*    userLang={userLangStore}*/}
          {/*    userId={userId}*/}
          {/*    ownerRecipe={{*/}
          {/*      avatar: userAvatar,*/}
          {/*      user_name: userName,*/}
          {/*      subscribers: subscribers,*/}
          {/*      user_id: userId,*/}
          {/*    }}*/}
          {/*  />*/}
          {/*  <RecipeComponent*/}
          {/*    recipe={createNewRecipe}*/}
          {/*    ownerRecipe={{*/}
          {/*      avatar: userAvatar,*/}
          {/*      user_name: userName,*/}
          {/*      subscribers: subscribers,*/}
          {/*      user_id: userId,*/}
          {/*    }}*/}
          {/*    userId={userId}*/}
          {/*    userLang={'ru'}*/}
          {/*  />*/}
          {/*)}*/}
          <div>
            <Button
              onClick={handlerPublish}
              className="bg-green-300 w-full hover:bg-yellow-500"
            >
              Publish
            </Button>
          </div>
        </SectionWrapper>
      </div>
    </WrapperApp>
  );
};
export default CreateNewRecipe;
