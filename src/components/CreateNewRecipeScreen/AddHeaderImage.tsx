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

interface IAddHeaderImageProps {
  dispatch: AppDispatch;
  setSelectedFile: (file: File | null) => void;
}

const AddHeaderImage: React.FC<IAddHeaderImageProps> = ({
  dispatch,
  setSelectedFile,
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
      // const compressedFile = await compressImage(file, recipeCompressionOptions);
      const { file: compressedFile, sizeMB } = await compressImage(
        file,
        recipeCompressionOptions,
      );
      // console.log('Размер сжатого файла (в байтах):', compressedFile.size);
      // console.log('Размер в мегабайтах:', formatMB(sizeMB));
      // Проверка размера сжатого файла (например, максимум 2MB, как в recipeCompressionOptions)
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
    <div
      onClick={handlerAddImage}
      className={`border-[1px] border-neutral-300 w-full h-[200px]
                  rounded-[10px] flex flex-col items-center justify-center bg-neutral-400
                  dark:text-black cursor-pointer gap-y-2 hover:gap-y-5 transition-all duration-600
                  relative
                  ${imageHeader && previewUrl ? 'bg-cover bg-center bg-no-repeat' : ''}
                `}
      style={
        imageHeader && previewUrl ? { backgroundImage: `url(${previewUrl})` } : undefined
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
        <>
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
        </>
      ) : (
        <>
          <ImagePlus className="mr-2 h-10 w-10" />
          <span>Выбрать изображение</span>
        </>
      )}
    </div>
  );
};
export default AddHeaderImage;
