import imageCompression from 'browser-image-compression';

// Параметры компрессии
interface CompressionOptions {
  maxSizeMB?: number; // Максимальный размер в мегабайтах
  maxWidthOrHeight?: number; // Максимальная ширина или высота
  quality?: number; // Качество изображения (0–1, только для JPEG/WebP)
  useWebWorker?: boolean; // Использовать Web Worker для компрессии
}

// Значения по умолчанию для разных случаев
const defaultAvatarOptions: CompressionOptions = {
  maxSizeMB: 0.5, // 500 КБ для аватаров
  maxWidthOrHeight: 512, // Небольшое разрешение для аватаров
  quality: 0.7, // Умеренное качество
  useWebWorker: true,
};

const defaultRecipeOptions: CompressionOptions = {
  maxSizeMB: 2, // 2 МБ для изображений рецептов
  maxWidthOrHeight: 1920, // Высокое разрешение для рецептов
  quality: 0.85, // Высокое качество
  useWebWorker: true,
};

// Функция компрессии изображения
export const compressImage = async (
  file: File,
  options: CompressionOptions = defaultAvatarOptions, // По умолчанию для аватаров
): Promise<File> => {
  try {
    const compressionOptions: CompressionOptions = {
      ...defaultAvatarOptions, // Базовые настройки
      ...options, // Пользовательские настройки перезаписывают базовые
    };

    return await imageCompression(file, compressionOptions);
  } catch (error) {
    console.error('Ошибка компрессии изображения:', error);
    throw new Error('Не удалось сжать изображение');
  }
};

// Экспорт пресетов для удобства
export const avatarCompressionOptions = defaultAvatarOptions;
export const recipeCompressionOptions = defaultRecipeOptions;
