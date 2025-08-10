// import React, { useState, useCallback } from 'react';
// import toast from 'react-hot-toast';
// import {
//   compressImage,
//   formatMB,
//   recipeCompressionOptions,
//   ICompressionOptions,
// } from '@/lib/utils/imageCompression';
//
// interface ImageData {
//   file: File;
//   previewUrl: string;
// }
//
// interface IUseImageUploadProps {
//   maxSizeMB?: number; // Максимальный размер файла в МБ (по умолчанию 2 МБ)
//   multiple?: boolean; // Поддержка множественной загрузки
//   compressionOptions?: ICompressionOptions; // Пользовательские настройки сжатия
// }
//
// interface IUseImageUploadReturnProps {
//   images: ImageData[]; // Массив загруженных изображений
//   handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
//   removeImage: (index: number) => void; // Удаление изображения по индексу
//   clearImages: () => void; // Очистка всех изображений
// }
//
// export const useImageUpload = ({
//   maxSizeMB = 2,
//   multiple = false,
//   compressionOptions = recipeCompressionOptions, // По умолчанию используем recipeCompressionOptions
// }: IUseImageUploadProps = {}): IUseImageUploadReturnProps => {
//   const [images, setImages] = useState<ImageData[]>([]);
//
//   const handleImageChange = useCallback(
//     async (event: React.ChangeEvent<HTMLInputElement>) => {
//       const files = event.target.files;
//       if (!files || files.length === 0) {
//         toast.error('Файл не выбран');
//         return;
//       }
//
//       const newImages: ImageData[] = [];
//       for (const file of Array.from(files)) {
//         // Проверка типа файла
//         if (!file.type.startsWith('image/')) {
//           toast.error('Пожалуйста, выберите изображение (JPEG, PNG и т.д.)');
//           continue;
//         }
//
//         try {
//           // Сжатие изображения с переданными настройками
//           const { file: compressedFile, sizeMB } = await compressImage(
//             file,
//             compressionOptions,
//           );
//           if (compressedFile.size > maxSizeMB * 1024 * 1024) {
//             toast.error(
//               `Сжатый файл слишком большой (${formatMB(sizeMB)}). Попробуйте другое изображение`,
//             );
//             continue;
//           }
//
//           // Создание URL для предварительного просмотра
//           const previewUrl = URL.createObjectURL(compressedFile);
//           newImages.push({ file: compressedFile, previewUrl });
//           toast.success(`Изображение добавлено: ${formatMB(sizeMB)}`);
//         } catch (error) {
//           const errorMessage =
//             error instanceof Error ? error.message : 'Ошибка при сжатии изображения';
//           toast.error(errorMessage);
//         }
//       }
//
//       if (newImages.length > 0) {
//         setImages(prev => (multiple ? [...prev, ...newImages] : [newImages[0]]));
//       }
//
//       // Сброс input
//       if (event.target) {
//         event.target.value = '';
//       }
//     },
//     [maxSizeMB, multiple, compressionOptions],
//   );
//
//   const removeImage = useCallback((index: number) => {
//     setImages(prev => {
//       const newImages = [...prev];
//       const removedImage = newImages.splice(index, 1)[0];
//       if (removedImage.previewUrl) {
//         URL.revokeObjectURL(removedImage.previewUrl); // Освобождение памяти
//       }
//       return newImages;
//     });
//   }, []);
//
//   // const clearImages = useCallback(() => {
//   //   setImages(prev => {
//   //     prev.forEach(image => {
//   //       if (image.previewUrl) {
//   //         URL.revokeObjectURL(image.previewUrl); // Освобождение памяти
//   //       }
//   //     });
//   //     return [];
//   //   });
//   // }, []);
//   const clearImages = useCallback((shouldClear: boolean = true) => {
//     if (!shouldClear) return;
//
//     setImages(prev => {
//       prev.forEach(image => {
//         if (image.previewUrl) {
//           URL.revokeObjectURL(image.previewUrl);
//         }
//       });
//       return [];
//     });
//   }, []);
//
//   return { images, handleImageChange, removeImage, clearImages };
// };
import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import {
  compressImage,
  formatMB,
  recipeCompressionOptions,
  ICompressionOptions,
} from '@/lib/utils/imageCompression';

interface ImageData {
  file: File;
  base64: string; // теперь вместо previewUrl
}

interface IUseImageUploadProps {
  maxSizeMB?: number;
  multiple?: boolean;
  compressionOptions?: ICompressionOptions;
}

interface IUseImageUploadReturnProps {
  images: ImageData[];
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  removeImage: (index: number) => void;
  clearImages: () => void;
}

// 🔹 Преобразование в base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
};

export const useImageUpload = ({
  maxSizeMB = 2,
  multiple = false,
  compressionOptions = recipeCompressionOptions,
}: IUseImageUploadProps = {}): IUseImageUploadReturnProps => {
  const [images, setImages] = useState<ImageData[]>([]);

  const handleImageChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files || files.length === 0) {
        toast.error('Файл не выбран');
        return;
      }

      const newImages: ImageData[] = [];

      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) {
          toast.error('Пожалуйста, выберите изображение');
          continue;
        }

        try {
          const { file: compressedFile, sizeMB } = await compressImage(
            file,
            compressionOptions,
          );

          if (compressedFile.size > maxSizeMB * 1024 * 1024) {
            toast.error(
              `Сжатый файл слишком большой (${formatMB(sizeMB)}). Попробуйте другое изображение`,
            );
            continue;
          }

          const base64 = await fileToBase64(compressedFile);

          newImages.push({ file: compressedFile, base64 });
          toast.success(`Изображение добавлено: ${formatMB(sizeMB)}`);
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Ошибка при сжатии изображения';
          toast.error(errorMessage);
        }
      }

      if (newImages.length > 0) {
        setImages(prev => (multiple ? [...prev, ...newImages] : [newImages[0]]));
      }

      if (event.target) {
        event.target.value = '';
      }
    },
    [maxSizeMB, multiple, compressionOptions],
  );

  const removeImage = useCallback((index: number) => {
    setImages(prev => {
      const newImages = [...prev];
      newImages.splice(index, 1);
      return newImages;
    });
  }, []);

  const clearImages = useCallback(() => {
    setImages([]);
  }, []);

  return { images, handleImageChange, removeImage, clearImages };
};
