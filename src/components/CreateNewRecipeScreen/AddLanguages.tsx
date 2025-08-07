'use client';

import React, { JSX, useState } from 'react';
import { AppDispatch } from '@/store';
import { Modal } from '@/components/Modal/modal';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import { languagesObj } from '@/helpers/languagesObj';
import { addLanguage, removeAllLanguages } from '@/store/slices/createNewRecipeSlice';
import { Skeleton } from '@/components/ui/skeleton';
import { ILanguage } from '@/types/createNewRecipeScreen.types';

interface IAddLanguagesProps {
  dispatch: AppDispatch;
  imageHeaderStore: string | File | null;
}

const AddLanguages: React.FC<IAddLanguagesProps> = ({
  dispatch,
  imageHeaderStore,
}: IAddLanguagesProps): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedLanguages, setSelectedLanguages] = useState<ILanguage[]>([]);

  const toggleLanguage = (lang: ILanguage) => {
    const exists = selectedLanguages.find(l => l.name === lang.name);
    if (exists) {
      // Удалить, если уже есть
      setSelectedLanguages(prev => prev.filter(l => l.name !== lang.name));
    } else {
      // Добавить
      setSelectedLanguages(prev => [...prev, lang]);
    }
  };
  const handleConfirm = () => {
    console.log('Выбранные языки:', selectedLanguages);
    dispatch(addLanguage(selectedLanguages));
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setSelectedLanguages([]);
    dispatch(removeAllLanguages());
    setIsModalOpen(false);
  };

  return (
    <section
      className={`relative mb-5 flex flex-col ${imageHeaderStore !== null && 'gap-y-5'} `}
    >
      {imageHeaderStore === null && (
        <Skeleton className="absolute z-10 w-full h-full bg-neutral-400 opacity-90" />
      )}
      <Button
        className="w-full bg-green-500 hover:bg-green-300
        flex items-center justify-center gap-x-5 text-black
                  "
        onClick={() => setIsModalOpen(true)}
      >
        Add Languages <Languages className="w-[20px] h-[20px] " />
      </Button>
      {selectedLanguages && (
        <div className="flex flex-wrap gap-2 items-center justify-center">
          {selectedLanguages.map(l => (
            <div
              key={l.name}
              className="capitalize border-[1px] border-neutral-300 rounded-full p-2"
            >
              {l.value}
            </div>
          ))}
        </div>
      )}

      {/* Модальное окно */}
      <Modal
        isOpen={isModalOpen}
        onCloseAction={closeModal}
        title="Selected Languages"
        confirmText="Выход"
        cancelText="Отмена"
        onConfirm={handleConfirm}
        showCloseButton={true}
        maxWidth="max-w-lg"
      >
        <div className="flex flex-col gap-y-4">
          {/*<div className="flex items-center gap-x-2">content</div>*/}
          <div className="flex flex-wrap gap-3">
            {languagesObj.map(lang => {
              const isSelected = selectedLanguages.some(l => l.name === lang.name);
              return (
                <Button
                  key={lang.name}
                  className="capitalize relative"
                  onClick={() => toggleLanguage(lang)}
                >
                  {lang.value}
                  {isSelected && (
                    <span className="absolute -top-1 -right-1 text-white text-[10px] bg-red-500 rounded-full w-[16px] h-[16px] flex items-center justify-center">
                      ×
                    </span>
                  )}
                </Button>
              );
            })}
          </div>
          {/* Кнопки */}
          <div className="flex justify-end gap-4">
            <Button
              disabled={selectedLanguages.length === 0}
              variant="outline"
              onClick={handleConfirm}
            >
              Save
            </Button>

            <Button onClick={closeModal}>Clear</Button>
          </div>
        </div>
      </Modal>
      {/*</div>*/}
    </section>
  );
};
export default AddLanguages;
