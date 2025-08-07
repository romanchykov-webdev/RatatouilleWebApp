'use client';

import React, { JSX, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { IInstruction } from '@/types/createNewRecipeScreen.types';
import { useShadowBox } from '@/helpers/hooks/useShadowBox';

import SliderHandmade from '@/components/Sliders/SliderHandmade/SliderHandmade';
import { AppDispatch } from '@/store';
import { removeInstruction } from '@/store/slices/createNewRecipeSlice';
import SkeletonCustom from '@/components/CreateNewRecipeScreen/SkeletonCustom';

interface IInstructionProps {
  instructionStore: IInstruction[];
  userLangStore: string;
  dispatch?: AppDispatch;
}

const Instruction: React.FC<IInstructionProps> = ({
  instructionStore,
  userLangStore,
  dispatch,
}: IInstructionProps): JSX.Element => {
  const { shadowBox } = useShadowBox();

  // API карусели Embla
  // const [emblaApi, setEmblaApi] = useState<CarouselApi | undefined>();
  // const handleTextareaChange = (lang: string, value: string) => {
  //   setInstructions(prev => ({ ...prev, [lang]: value }));
  // };

  const pathName = usePathname();

  const [langInstruction, setLangInstruction] = useState<string>('');

  useEffect(() => {
    setLangInstruction(userLangStore);
  }, [userLangStore]);

  const keyButton = Array.from(
    new Set(instructionStore.flatMap(item => Object.keys(item.lang))),
  );
  const handleSelectLang = (l: string) => {
    setLangInstruction(l);
  };

  const handlerRemoveInst = (index: number) => {
    if (pathName === '/profile/create' && dispatch) {
      dispatch(removeInstruction(index));
    }
  };

  return (
    <article className="flex flex-col gap-y-2">
      {instructionStore && <SkeletonCustom dependency={instructionStore} />}
      <h6 className="text-center">Instruction Const</h6>

      {/*block button for create recipe*/}
      {pathName === '/profile/create' && (
        <div className="flex items-center justify-around">
          {keyButton.map(item => (
            <Button
              className={`capitalize hover:bg-yellow-300 ${langInstruction === item && 'bg-yellow-500'}`}
              key={item}
              onClick={() => handleSelectLang(item)}
            >
              {item}
            </Button>
          ))}
        </div>
      )}

      {/*render inst*/}
      {instructionStore.length > 0 ? (
        <div>
          {instructionStore.map((instruction: IInstruction, index) => (
            <div
              key={index}
              className="mb-10 border-[1px] border-neutral-300  rounded-[10px] overflow-hidden"
            >
              <div className=" relative p-2 mb-2">
                <p className="text-lg  ">
                  {index + 1}) {instruction.lang[langInstruction] || 'No instruction'}
                </p>
                <span
                  onClick={() => handlerRemoveInst(index)}
                  className="flex items-center justify-center h-[20px] w-[20px] text-black bg-red-500 rounded-full
                                  hover:bg-red-900 cursor-pointer transition-colors duration-500 ease-in-out
                                  absolute top-[2px] right-[2px]
                                "
                >
                  X
                </span>
              </div>

              {/*block img slider*/}
              <div className="flex flex-col gap-y-2">
                {instruction.images.length === 1 &&
                  instruction.images.map((img, i) => (
                    <div
                      key={i}
                      className="w-[full] h-[200px] bg-cover bg-center rounded-md border border-neutral-300"
                      style={{ backgroundImage: `url(${img})`, ...shadowBox() }}
                    />
                  ))}
                {instruction.images.length >= 2 && (
                  <SliderHandmade images={instruction.images} />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-neutral-500">No instructions added</div>
      )}
    </article>
  );
};

export default Instruction;
