'use client';

import React, { ChangeEvent, JSX, RefObject, useEffect, useRef, useState } from 'react';
import { AppDispatch } from '@/store';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ILanguage } from '@/components/CreateNewRecipeScreen/createNewRecipeScreen.types';
import { ImagePlus } from 'lucide-react';
import { useImageUpload } from '@/helpers/hooks/useImageUpload';
import toast from 'react-hot-toast';
import { useShadowBox } from '@/helpers/hooks/useShadowBox';
import { addInstruction } from '@/store/slices/createNewRecipeSlice';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';

interface IInstructionWrapperProps {
  dispatch: AppDispatch;
  languagesStore: ILanguage[];
  userLangStore: string;
}

const InstructionWrapper: React.FC<IInstructionWrapperProps> = ({
  dispatch,
  languagesStore,
  userLangStore,
}: IInstructionWrapperProps): JSX.Element => {
  const { shadowBox } = useShadowBox();

  const fileInputRef: RefObject<HTMLInputElement | null> = useRef<HTMLInputElement>(null);

  // Состояние для текущего языка
  const [selectedLang, setSelectedLang] = useState<string>('');

  // Состояние для текстов инструкций по языкам
  const [instructions, setInstructions] = useState<Record<string, string>>({});

  const { images, handleImageChange, clearImages } = useImageUpload({
    multiple: true,
  });

  // API карусели Embla
  const [emblaApi, setEmblaApi] = useState<CarouselApi | undefined>();

  // Инициализация языка
  useEffect(() => {
    if (!emblaApi || !userLangStore || languagesStore.length === 0) return;

    const index = languagesStore.findIndex(l => l.name === userLangStore);
    if (index !== -1) {
      requestAnimationFrame(() => {
        emblaApi.scrollTo(index);
        setSelectedLang(userLangStore);
      });
    }
  }, [emblaApi, userLangStore, languagesStore]);

  // Очистка previewUrl при размонтировании
  useEffect(() => {
    return () => {
      clearImages();
    };
  }, [clearImages]);

  const handlerChangeLang = (lang: string, index: number) => {
    setSelectedLang(lang);
    emblaApi?.scrollTo(index);
  };

  const handlerAddImage = () => {
    if (images.length >= 5) {
      toast.success('5 images maximum ');
      return;
    }
    fileInputRef.current?.click();
  };

  // ad to store
  const handlerAddStep = async () => {
    console.log('instructions', instructions);
    console.log('languagesStore', languagesStore);
    // if (!instructions[selectedLang]) {
    //   toast.error('Введите инструкцию');
    //   return;
    // }
    const imagesUrl = images.map(item => item.base64);

    dispatch(addInstruction({ lang: instructions, images: imagesUrl }));
    // Очищаем текст для текущего языка и изображения
    setInstructions({});
    clearImages();
    // clearImages(true);
  };

  const handleTextareaChange = (lang: string, value: string) => {
    setInstructions(prev => ({ ...prev, [lang]: value }));
  };

  const isActive: boolean = languagesStore.every(
    lang =>
      instructions.hasOwnProperty(lang.name) && instructions[lang.name].trim() !== '',
  );

  return (
    <article className="flex flex-col gap-y-2">
      <h6 className="text-center">Add instructions</h6>

      {/* Кнопки для переключения языков */}
      <div className="flex flex-wrap items-center justify-around gap-2">
        {languagesStore?.length > 0 &&
          languagesStore.map((l, index) => {
            return (
              <Button
                key={l.name}
                onClick={() => handlerChangeLang(l.name, index)}
                className={`capitalize ${
                  l.name === selectedLang ? 'bg-yellow-500' : ''
                } hover:bg-yellow-300`}
              >
                {l.name}
              </Button>
            );
          })}
      </div>

      {/* Карусель с Textarea для каждого языка */}
      <div className="w-full max-w-md mx-auto">
        <Carousel className="w-full max-w-md mx-auto" setApi={setEmblaApi}>
          <CarouselContent>
            {languagesStore.map(l => (
              <CarouselItem key={l.name}>
                <div className="p-1">
                  <Textarea
                    value={instructions[l.name] || ''}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      handleTextareaChange(l.name, e.target.value)
                    }
                    className="h-[200px]"
                    placeholder={`Step-by-step cooking instruction in ${l.name}`}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/*block buttons*/}
      <div className="flex items-center justify-between">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
        <Button
          className="hover:bg-yellow-500"
          onClick={handlerAddStep}
          disabled={!isActive}
        >
          Add step
        </Button>

        <Button onClick={handlerAddImage} className="relative hover:bg-yellow-500">
          <ImagePlus className="w-[20px] h-[20px] text-violet-500" />
          Add image
          <span
            style={shadowBox()}
            className={`flex items-center justify-center w-[20px] h-[20px]
                            bg-violet-500 rounded-full absolute  -right-[5px]
                            opacity-0 transition-all duration-600
                            text-black ${images.length > 0 ? '-top-[5px] opacity-100' : '-top-[15px]'}
                      `}
          >
            {images.length}
          </span>
        </Button>
      </div>
    </article>
  );
};
export default InstructionWrapper;
