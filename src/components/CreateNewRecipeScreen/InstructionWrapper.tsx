'use client';

import React, { JSX, useState } from 'react';
import Instruction from '@/components/Instruction/Instruction';
import { IInstructionsByCreateRecipe, ILanguageByCreateRecipe } from '@/types';
import SkeletonCustom from '@/components/CreateNewRecipeScreen/SkeletonCustom';
import { removeInstruction } from '@/store/slices/createNewRecipeSlice';
import { useAppDispatch } from '@/store/hooks';
import ButtonsLangSelected from '@/components/Buttons/ButtonsLangSelected';

interface IInstructionWrapperProps {
  instructionStore: IInstructionsByCreateRecipe[];
  isActiveLang: string;
  languagesStore: ILanguageByCreateRecipe[];
}

const InstructionWrapper: React.FC<IInstructionWrapperProps> = ({
  instructionStore,
  isActiveLang,
  languagesStore,
}): JSX.Element => {
  // Состояние для текущего языка
  const [selectedLang, setSelectedLang] = useState<string>(isActiveLang);

  const dispatch = useAppDispatch();

  const handlerChangeLang = (lang: string) => {
    setSelectedLang(lang);
    // console.log('selectedLang', selectedLang);
  };

  const handlerRemoveInstItem = (index: number) => {
    dispatch(removeInstruction(index));
  };

  return (
    <>
      {instructionStore.length === 0 ? (
        <SkeletonCustom dependency={instructionStore} />
      ) : (
        <div>
          {/* Кнопки для переключения языков */}
          <ButtonsLangSelected
            langRecipe={languagesStore}
            selectedLang={selectedLang}
            handlerChangeLang={handlerChangeLang}
          />

          <Instruction
            isActiveLang={selectedLang}
            instructionStore={instructionStore}
            languagesStore={languagesStore}
            isVisibleRemoveInstruction={true}
            handlerRemoveInstItem={handlerRemoveInstItem}
          />
        </div>
      )}
    </>
  );
};
export default InstructionWrapper;
