'use client';

import React, { JSX, RefObject, useEffect, useRef } from 'react';
import { ImagePlus } from 'lucide-react';
import { AppDispatch, RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';
import { addHeaderImage, clearHeaderImage } from '@/store/slices/createNewRecipeSlice';
import { useShadowBox } from '@/helpers/hooks/useShadowBox';

import { Skeleton } from '@/components/ui/skeleton';
import { useImageUpload } from '@/helpers/hooks/useImageUpload';

interface IAddHeaderImageProps {
  dispatch: AppDispatch;
  setSelectedFile: (file: File | null) => void;
  categoryStore: string;
  subCategoryStore: string;
}

const AddHeaderImage: React.FC<IAddHeaderImageProps> = ({
  dispatch,
  setSelectedFile,
  categoryStore,
  subCategoryStore,
}: IAddHeaderImageProps): JSX.Element => {
  const fileInputRef: RefObject<HTMLInputElement | null> = useRef<HTMLInputElement>(null);
  const imageHeader: string | File | null = useAppSelector(
    (state: RootState): string | File | null => state.createNewRecipe.imageHeader,
  );

  const { shadowBox } = useShadowBox();

  const { images, handleImageChange, clearImages } = useImageUpload({
    multiple: false,
  });

  // Синхронизация с Redux
  // useEffect(() => {
  //   if (images.length > 0) {
  //     dispatch(addHeaderImage(images[0].previewUrl));
  //     setSelectedFile(images[0].file);
  //   } else if (imageHeader) {
  //     dispatch(clearHeaderImage());
  //     setSelectedFile(null);
  //   }
  // }, [images, imageHeader, dispatch, setSelectedFile]);

  useEffect(() => {
    if (images.length > 0) {
      dispatch(addHeaderImage(images[0].base64)); // сохраняем base64 в store
      setSelectedFile(images[0].file);
    } else if (imageHeader) {
      dispatch(clearHeaderImage());
      setSelectedFile(null);
    }
  }, [images, imageHeader, dispatch, setSelectedFile]);

  // Очистка previewUrl при размонтировании
  useEffect(() => {
    return () => {
      clearImages(); // Освобождаем память
    };
  }, [clearImages]);

  const handlerAddImage = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className="relative">
      {(categoryStore === '' || subCategoryStore === '') && (
        <Skeleton className="absolute z-10 w-full h-full bg-neutral-400 opacity-90" />
      )}

      <div
        onClick={handlerAddImage}
        className={`border-[1px] border-neutral-300 w-full h-[200px]
                  rounded-[10px] flex flex-col items-center justify-center bg-neutral-400
                  dark:text-black cursor-pointer gap-y-2 hover:gap-y-5 transition-all duration-600
                  relative 
                  ${images.length > 0 ? 'bg-cover bg-center bg-no-repeat' : ''}
                `}
        style={
          images.length > 0 ? { backgroundImage: `url(${images[0].base64})` } : undefined
        }
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        {images.length > 0 ? (
          <button
            style={shadowBox()}
            onClick={e => {
              e.stopPropagation(); // Предотвращаем вызов handlerAddImage
              clearImages();
            }}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-[30px] h-[30px] hover:bg-red-600"
          >
            X
          </button>
        ) : (
          <>
            <ImagePlus className="mr-2 h-10 w-10" />
            <span>Выбрать изображение</span>
          </>
        )}
      </div>
    </section>
  );
};
export default AddHeaderImage;
