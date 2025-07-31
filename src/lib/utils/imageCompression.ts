import imageCompression from 'browser-image-compression';

// Параметры компрессии
interface CompressionOptions {
  maxSizeMB?: number; // Максимальный размер в мегабайтах
  maxWidthOrHeight?: number; // Максимальная ширина или высота
  quality?: number; // Качество изображения (0–1, только для JPEG/WebP)
  useWebWorker?: boolean; // Использовать Web Worker для компрессии
}

// Новый тип возвращаемого результата
export interface CompressedResult {
  file: File;
  sizeMB: number;
}

// Значения по умолчанию для разных случаев
const defaultAvatarOptions: CompressionOptions = {
  maxSizeMB: 0.5, // 500 КБ для аватаров
  maxWidthOrHeight: 512, // Небольшое разрешение для аватаров
  quality: 0.3, // Умеренное качество
  useWebWorker: true,
};

const defaultRecipeOptions: CompressionOptions = {
  maxSizeMB: 2, // 2 МБ для изображений рецептов
  maxWidthOrHeight: 1920, // Высокое разрешение для рецептов
  quality: 0.5, // Высокое качество
  useWebWorker: true,
};

// Переводит байты в мегабайты
const bytesToMB = (bytes: number): number => bytes / 1024 / 1024;

// Форматирует мегабайты, например "1.23 MB"
export const formatMB = (mb: number, decimals = 2): string =>
  `${mb.toFixed(decimals)} MB`;

// Функция компрессии изображения
export const compressImage = async (
  file: File,
  options: CompressionOptions = defaultAvatarOptions, // По умолчанию для аватаров
): Promise<CompressedResult> => {
  try {
    const compressionOptions: CompressionOptions = {
      ...defaultAvatarOptions, // Базовые настройки
      ...options, // Пользовательские настройки перезаписывают базовые
    };

    // return await imageCompression(file, compressionOptions);
    const compressedFile: File = await imageCompression(file, compressionOptions);
    const sizeMB = bytesToMB(compressedFile.size);

    return {
      file: compressedFile,
      sizeMB,
    };
  } catch (error) {
    console.error('Ошибка компрессии изображения:', error);
    throw new Error('Не удалось сжать изображение');
  }
};

// Экспорт пресетов для удобства
export const avatarCompressionOptions = defaultAvatarOptions;
export const recipeCompressionOptions = defaultRecipeOptions;
