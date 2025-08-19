'use client';

import React, { JSX, useState } from 'react';
import { useShadowBox } from '@/helpers/hooks/useShadowBox';

import SliderHandmade from '@/components/Sliders/SliderHandmade/SliderHandmade';

import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { IInstructionsByCreateRecipe, ILanguageByCreateRecipe } from '@/types';

interface IInstructionProps {
  instructionStore: IInstructionsByCreateRecipe[];
  isActiveLang: string;
  languagesStore?: ILanguageByCreateRecipe[];
  handlerRemoveInstItem?: (index: number) => void;
  isVisibleRemoveInstruction?: boolean;
}

const Instruction: React.FC<IInstructionProps> = ({
  instructionStore,
  isActiveLang,
  handlerRemoveInstItem,
  isVisibleRemoveInstruction = false,
}): JSX.Element => {
  const { shadowBox } = useShadowBox();

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState<string[]>([]);

  const openLightbox = (images: string[], index: number) => {
    setCurrentImages(images);
    setCurrentIndex(index);
    setIsOpen(true);
  };

  // console.log('Instruction instructionStore', JSON.stringify(instructionStore, null));

  return (
    <article className="flex flex-col gap-y-2">
      {/*{instructionStore && <SkeletonCustom dependency={instructionStore} />}*/}
      <h6 className="text-center">Instruction</h6>

      {instructionStore?.length > 0 ? (
        <div>
          {instructionStore.map((instruction: IInstructionsByCreateRecipe, index) => {
            // console.log('instruction', instruction);
            // console.log('instruction langInstruction', langInstruction);
            return (
              <div
                key={index}
                className="mb-10 border-[1px] border-neutral-300  rounded-[10px] overflow-hidden"
              >
                <div className=" relative p-2 mb-2">
                  <p className="text-lg  ">
                    {index + 1}){' '}
                    {instruction[isActiveLang] ?? Object.values(instruction)[0]}
                  </p>

                  {/*if create new recipe screen */}
                  {isVisibleRemoveInstruction && handlerRemoveInstItem && (
                    <span
                      onClick={() => handlerRemoveInstItem(index)}
                      className="flex items-center justify-center h-[20px] w-[20px] text-black bg-red-500 rounded-full
                                  hover:bg-red-900 cursor-pointer transition-colors duration-500 ease-in-out
                                  absolute top-[2px] right-[2px]
                                "
                    >
                      X
                    </span>
                  )}
                </div>

                {/*block img slider*/}
                <div className="flex flex-col gap-y-2">
                  {instruction.images.length === 1 &&
                    instruction.images.map((img, i) => (
                      <div
                        key={i}
                        className="w-full min-h-[200px] h-[400px] bg-cover bg-center rounded-md border border-neutral-300 cursor-pointer"
                        style={{ backgroundImage: `url(${img})`, ...shadowBox() }}
                        onClick={() => openLightbox(instruction.images, i)}
                      />
                    ))}

                  {instruction.images.length >= 2 && (
                    <SliderHandmade images={instruction.images} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-neutral-500">No instructions added</div>
      )}
      {/* Lightbox */}
      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={currentImages.map(src => ({ src }))}
          index={currentIndex}
          carousel={{ finite: true }} // убрали swipe
          animation={{}} // если нужно, можно указать duration: 300
          render={{
            slide: ({ slide }) => (
              <img
                src={slide.src}
                alt=""
                style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
              />
            ),
            buttonPrev: () => null,
            buttonNext: () => null,
          }}
        />
      )}
    </article>
  );
};

export default Instruction;
