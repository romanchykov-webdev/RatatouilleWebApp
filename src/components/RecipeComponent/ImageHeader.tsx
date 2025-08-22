'use client';

import React, { JSX, useState } from 'react';
import { Heart, HeartHandshake, MessageCircle, Star, Languages } from 'lucide-react';
import Image from 'next/image';
import { useShadowBox } from '@/helpers/hooks/useShadowBox';
import { Modal } from '@/components/Modal/modal';
import ButtonsLangSelected from '@/components/Buttons/ButtonsLangSelected';
import { ILanguageByCreateRecipe } from '@/types';

interface IImageHeaderProps {
  isLiked: boolean;
  image_header: string;
  rating: number;
  comments: number;
  handlerSelectedLang: (lang: string) => void;
  isActiveLang: string;
  languages: ILanguageByCreateRecipe[];
  isLackedRecipe: (idRecipe: string, idOwnerRecipe: string, idUserClick: string | null) => void;
  idOwnerRecipe: string;
  idUserClick: string | null;
  idRecipe: string;
}

const ImageHeader: React.FC<IImageHeaderProps> = ({
  isLiked,
  image_header,
  rating,
  comments,
  isActiveLang,
  handlerSelectedLang,
  languages,
  isLackedRecipe,
  idOwnerRecipe,
  idUserClick,
  idRecipe,
}: IImageHeaderProps): JSX.Element => {
  const { shadowBox } = useShadowBox();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleConfirm = () => {
    setIsModalOpen(false);
  };

  // console.log('ImageHeader image_header', image_header);
  return (
    <div className="relative rounded-[25px] overflow-hidden " style={shadowBox()}>
      <div className="absolute top-0 right-0  flex items-center justify-end w-full  p-5  ">
        <div className="flex items-center justify-between w-full relative rounded-full   ">
          {/*selected lang*/}
          {languages.length > 1 && (
            <div
              onClick={() => setIsModalOpen(true)}
              className="p-2 rounded-full cursor-pointer"
              style={{ backgroundColor: 'rgba(255,255,255,0.8)', ...shadowBox() }}
            >
              <Languages className="  w-[40px] h-[40px] text-gray-500" />
            </div>
          )}

          {/*isLicked*/}
          <div
            className="p-2 rounded-full ml-auto"
            style={{ backgroundColor: 'rgba(255,255,255,0.8)', ...shadowBox() }}
            onClick={() => isLackedRecipe(idRecipe, idOwnerRecipe, idUserClick)}
          >
            {isLiked ? (
              <HeartHandshake className="  w-[40px] h-[40px] text-red-500" />
            ) : (
              <Heart className=" text-gray-500 w-[40px] h-[40px]" />
            )}
          </div>
        </div>
      </div>
      {image_header && (
        <Image
          src={image_header}
          // src={'https://res.cloudinary.com/dq0ymjvhx/image/upload/v1754757979/ratatouille_images/byvlnfyruho5rwxvibzs.jpg'}
          alt="Логотип"
          width={200}
          height={200}
          style={{ objectFit: 'cover' }}
          priority
          className="w-full"
        />
      )}
      {/*block rating comments*/}
      <div className="absolute bottom-0 right-0  flex items-center justify-between w-full  p-5  ">
        {/*rating*/}
        <div
          className="flex items-center justify-center relative rounded-full     p-2"
          style={{ backgroundColor: 'rgba(255,255,255,0.8)', ...shadowBox() }}
        >
          <Star className=" text-yellow-500 w-[40px] h-[40px]" />
          <span className="absolute z-10 text-yellow-500 ">{rating}</span>
        </div>

        {/*comments*/}
        <div
          className="flex items-center justify-center relative rounded-full     p-2"
          style={{ backgroundColor: 'rgba(255,255,255,0.8)', ...shadowBox() }}
        >
          <MessageCircle className=" text-yellow-500 w-[40px] h-[40px]" />
          <span className="absolute z-10 text-yellow-500 ">{comments}</span>
        </div>
      </div>
      {/* Модальное окно */}
      <Modal
        isOpen={isModalOpen}
        onCloseAction={closeModal}
        title={`Selected language`}
        confirmText="Выход"
        cancelText="Отмена"
        onConfirm={handleConfirm}
        showCloseButton={true}
        maxWidth="max-w-lg"
      >
        <div className="flex flex-col gap-y-4">
          <ButtonsLangSelected
            langRecipe={languages}
            selectedLang={isActiveLang}
            handlerChangeLang={handlerSelectedLang}
          />
          {/*<Button onClick={handleConfirm}>Save</Button>*/}
        </div>
      </Modal>
    </div>
  );
};
export default ImageHeader;
