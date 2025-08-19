'use client';

import React, { useEffect, useState } from 'react';
import HeaderComponent from '@/components/Header/headerComponent';
import BreadcrumbsComponent from '@/components/Breadcrumbs/BreadcrumbsComponent';
import SelectedCategory from '@/components/CreateNewRecipeScreen/SelectedCategory';
import AddHeaderImage from '@/components/CreateNewRecipeScreen/AddHeaderImage';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import AddLanguages from '@/components/CreateNewRecipeScreen/AddLanguages';
import { RootState } from '@/store';
import CreateTitleRecipe from '@/components/CreateNewRecipeScreen/CreateTitleRecipe';
import AddArea from '@/components/CreateNewRecipeScreen/AddArea';
import AddTags from '@/components/CreateNewRecipeScreen/AddTags';
import RecipeMetaComponents from '@/components/CreateNewRecipeScreen/RecipeMeta/RecipeMetaComponents';
import { usePathname } from 'next/navigation';
import AddIngredientsRecipe from '@/components/CreateNewRecipeScreen/AddIngredientsRecipe';
import SectionWrapper from '@/components/CreateNewRecipeScreen/SectionWrapper';
import IngredientsWrapper from '@/components/IngredientsWrapper/IngredientsWrapper';
import {
  ICategoriesAndSubcategories,
  IInstructionsByCreateRecipe,
  IMeasurements,
  IUserProfile,
} from '@/types';
import SkeletonCustom from '@/components/CreateNewRecipeScreen/SkeletonCustom';
import AddInstructions from '@/components/Instruction/InstructionWrapper';
import AddSocialWrapper from '@/components/CreateNewRecipeScreen/AddSocialWrapper';
import { addOwnerId, clearNewRecipeState } from '@/store/slices/createNewRecipeSlice';
import { Button } from '@/components/ui/button';
import { uploadBase64ToCloudinary } from '@/helpers/uploadBase64ToCloudinary';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import InstructionWrapper from '@/components/CreateNewRecipeScreen/InstructionWrapper';
import { addRecipeThunk } from '@/store/thunks/createNewRecipeThunk';

const CreateNewRecipe: React.FC = () => {
  const [uploadRecipe, setUploadRecipe] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const dispatch = useAppDispatch();

  const categoryStore: ICategoriesAndSubcategories[] = useAppSelector(
    (state: RootState): ICategoriesAndSubcategories[] => state.allCategories.categories,
  );

  const measurementStore: IMeasurements = useAppSelector(
    (state: RootState): IMeasurements => state.measurement,
  );

  const createNewRecipe = useAppSelector((state: RootState) => state.createNewRecipe);
  const {
    category: categoryNewRecipe,
    subCategory: subCategoryNewRecipe,
    image_header: imageHeaderStore,
    languages: languagesStore,
    title: titleStore,
    area: ariaStore,
    tags: tagStore,
    recipe_metrics: recipeMetaStore,
    ingredients: ingredientsStore,
    instructions: instructionStore,
  } = createNewRecipe;

  const pathName = usePathname();

  // const router = useRouter();

  const user: IUserProfile = useAppSelector(
    (state: RootState) => state.user as IUserProfile,
  );
  const {
    appLang: userLangStore,
    id: userId,
    avatar: userAvatar,
    user_name: userName,
  } = user;

  useEffect(() => {
    dispatch(addOwnerId(userId));
  }, [dispatch, userId]);

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

      instructions.forEach((step: IInstructionsByCreateRecipe) => {
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
      const updatedInstructions: IInstructionsByCreateRecipe[] = await Promise.all(
        instructions.map(async (step: IInstructionsByCreateRecipe) => {
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

      // console.log('pered otpravcoi newRecipeData', JSON.stringify(newRecipeData, null));

      dispatch(addRecipeThunk(newRecipeData));
    } catch (error) {
      console.error('Error while publishing recipe:', error);
      toast.error('Ошибка при публикации рецепта');
    } finally {
      setTimeout(() => {
        dispatch(clearNewRecipeState());
        setUploadRecipe(false);
        setUploadProgress(0);
        // router.replace('/profile/create');
      }, 500);
    }
  };

  return (
    <section className="flex flex-col gap-y-5">
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
            dispatch={dispatch}
            categoryStore={categoryStore}
            categoryNewRecipe={categoryNewRecipe}
            subCategoryNewRecipe={subCategoryNewRecipe}
          />
          <AddHeaderImage
            dispatch={dispatch}
            imageHeaderStore={imageHeaderStore}
            subCategoryStore={subCategoryNewRecipe}
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
          {recipeMetaStore?.cal === 0 && (
            <SkeletonCustom dependency={recipeMetaStore.cal} />
          )}

          <AddIngredientsRecipe
            dispatch={dispatch}
            languagesStore={languagesStore}
            measurements={measurementStore}
            ingredientsStore={ingredientsStore}
            userLangStore={userLangStore}
          />
        </SectionWrapper>

        {/*section 5*/}
        <SectionWrapper>
          {ingredientsStore.length > 0 ? (
            <IngredientsWrapper
              measurements={measurementStore}
              dispatch={dispatch}
              userLangStore={userLangStore}
            />
          ) : (
            <SkeletonCustom dependency={ingredientsStore} />
          )}
        </SectionWrapper>

        {/*section 6*/}
        <SectionWrapper>
          <AddInstructions
            dispatch={dispatch}
            languagesStore={languagesStore}
            userLangStore={userLangStore}
            ingredientsStore={ingredientsStore}
          />
        </SectionWrapper>

        {/*section 7*/}
        <SectionWrapper>
          <InstructionWrapper
            instructionStore={instructionStore}
            isActiveLang={userLangStore}
            languagesStore={languagesStore}
          />
        </SectionWrapper>

        {/*section 8*/}
        <SectionWrapper>
          <AddSocialWrapper dispatch={dispatch} instructionStore={instructionStore} />
        </SectionWrapper>

        {/*section last*/}
        <SectionWrapper styleWrapper="sm:col-span-2 lg:col-span-1">
          {/*{instructionStore.length === 0 ? (*/}
          {/*  <SkeletonCustom dependency={instructionStore} />*/}
          {/*) : (*/}
          <div className="flex flex-col gap-y-5">
            <Button
              // onClick={handlerPreview}
              className="bg-violet-300 w-full hover:bg-yellow-500"
            >
              <a href="/preview" target="_blank" rel="noopener noreferrer">
                Preview
              </a>
            </Button>
            <Button
              onClick={handlerPublish}
              className="bg-green-300 w-full hover:bg-yellow-500"
            >
              Publish
            </Button>
          </div>
          {/*)}*/}
        </SectionWrapper>
      </div>
    </section>
  );
};
export default CreateNewRecipe;
