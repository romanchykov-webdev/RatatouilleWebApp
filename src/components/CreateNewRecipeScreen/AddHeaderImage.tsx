'use client';

import React, { useRef, useState } from 'react';
import { ImagePlus } from 'lucide-react';
import { AppDispatch, RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';
import toast from 'react-hot-toast';
import { addHeaderImage, clearHeaderImage } from '@/store/slices/createNewRecipeSlice';
import { useShadowBox } from '@/helpers/hooks/useShadowBox';
import {
  compressImage,
  formatMB,
  recipeCompressionOptions,
} from '@/lib/utils/imageCompression';
import { Skeleton } from '@/components/ui/skeleton';

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
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageHeader = useAppSelector(
    (state: RootState) => state.createNewRecipe.imageHeader,
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { shadowBox } = useShadowBox();

  const handlerAddImage = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      toast.error('File not found');
      return;
    }

    // Проверка типа файла (только изображения)
    if (!file.type.startsWith('image/')) {
      toast.error('Пожалуйста, выберите изображение (JPEG, PNG и т.д.)');
      return;
    }

    try {
      // Сжатие изображения
      const { file: compressedFile, sizeMB } = await compressImage(
        file,
        recipeCompressionOptions,
      );
      toast.success(`Размер изображения: ${formatMB(sizeMB)}`);
      if (compressedFile.size > 2 * 1024 * 1024) {
        toast.error('Сжатый файл всё ещё слишком большой. Попробуйте другое изображение');
        return;
      }

      // Создание URL для предварительного просмотра
      const url = URL.createObjectURL(compressedFile);
      setPreviewUrl(url);
      setSelectedFile(compressedFile);

      // Сохранение URL в Redux
      dispatch(addHeaderImage(url));

      // Сброс input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Ошибка при сжатии изображения';
      toast.error(errorMessage);
    }
  };

  // Удаляем предварительный просмотр и очищаем Redux
  const handleRemoveImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    dispatch(clearHeaderImage());
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
                  relative mb-5
                  ${imageHeader && previewUrl ? 'bg-cover bg-center bg-no-repeat' : ''}
                `}
        style={
          imageHeader && previewUrl
            ? { backgroundImage: `url(${previewUrl})` }
            : undefined
        }
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        {imageHeader && previewUrl ? (
          <button
            style={shadowBox()}
            onClick={e => {
              e.stopPropagation(); // Предотвращаем вызов handlerAddImage
              handleRemoveImage();
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
