'use client';

import React, { JSX, useEffect, useState } from 'react';
import { AppDispatch } from '@/store';
import { Clock, Users, Flame, Layers } from 'lucide-react';
import { Modal } from '@/components/Modal/modal';
import { Button } from '@/components/ui/button';
import RecipeMetaItem from '@/components/RecipeMeta/RecipeMetaItem';
import SelectedMetaData from '@/components/RecipeMeta/SelectedMetaData/SelectedMetaData';
import { IMetaData } from '@/components/RecipeMeta/recipeMeta.types';
import { useDebounce } from '@/helpers/hooks/useDebounce';
import { addRecipeMeta } from '@/store/slices/createNewRecipeSlice';
import SkeletonCustom from '@/components/CreateNewRecipeScreen/SkeletonCustom';
import { useShadowBox } from '@/helpers/hooks/useShadowBox';

interface IRecipeMetaProps {
  dispatch: AppDispatch;
  tagStore: string[];
  pathName: string;
}

const RecipeMetaComponents: React.FC<IRecipeMetaProps> = ({
  dispatch,
  tagStore,
  pathName,
}: IRecipeMetaProps): JSX.Element => {
  const { shadowBox } = useShadowBox();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [metaData, setMetaData] = useState<IMetaData>({
    time: 0,
    serv: 0,
    cal: 0,
    level: 'easy',
  });

  const [typeItem, setTypeItem] = useState<keyof IMetaData | null>(null);

  const debounceMetaData = useDebounce(metaData);

  const closeModal = () => {
    setIsModalOpen(false);
    setTypeItem(null);
  };
  const handleConfirm = () => {
    setIsModalOpen(false);
    setTypeItem(null);
  };

  const handler = (type: keyof IMetaData) => {
    if (pathName !== '/profile/create') return;
    setTypeItem(type);
    setIsModalOpen(true);
    // console.log('handler type:', type);
  };
  useEffect(() => {
    dispatch(addRecipeMeta(debounceMetaData));
  }, [dispatch, debounceMetaData]);
  return (
    <article
      className="grid gap-x-3  justify-between"
      style={{ gridTemplateColumns: 'repeat(4, minmax(50px, 80px))' }}
    >
      {/*time*/}
      <div
        style={shadowBox()}
        className="relative w-full h-[150px] rounded-full overflow-hidden"
      >
        {tagStore.length === 0 ? (
          <SkeletonCustom dependency={tagStore} />
        ) : (
          <RecipeMetaItem
            pathName={pathName}
            handler={handler}
            type={'time'}
            num={metaData.time}
            text={'min'}
            icon={Clock}
          />
        )}
      </div>

      {/*serv*/}
      <div
        style={shadowBox()}
        className="relative w h-[150px] rounded-full overflow-hidden"
      >
        {metaData.time !== 0 && tagStore.length !== 0 ? (
          <RecipeMetaItem
            pathName={pathName}
            handler={handler}
            type={'serv'}
            num={metaData.serv}
            text={'serv'}
            icon={Users}
          />
        ) : (
          <SkeletonCustom dependency={metaData.time} />
        )}
      </div>

      {/*cal*/}
      <div
        style={shadowBox()}
        className="relative w h-[150px] rounded-full overflow-hidden"
      >
        {metaData.serv !== 0 && tagStore.length !== 0 ? (
          <RecipeMetaItem
            pathName={pathName}
            handler={handler}
            type={'cal'}
            num={metaData.cal}
            text={'cal'}
            icon={Flame}
          />
        ) : (
          <SkeletonCustom dependency={metaData.serv} />
        )}
      </div>

      {/*level*/}
      <div
        style={shadowBox()}
        className="relative w h-[150px] rounded-full overflow-hidden"
      >
        {metaData.cal !== 0 && tagStore.length !== 0 ? (
          <RecipeMetaItem
            pathName={pathName}
            handler={handler}
            type={'level'}
            // num={0}
            text={metaData.level}
            icon={Layers}
          />
        ) : (
          <SkeletonCustom dependency={metaData.cal} />
        )}
      </div>

      {/* Модальное окно */}
      <Modal
        isOpen={isModalOpen}
        onCloseAction={closeModal}
        title={typeItem ? `Selected ${typeItem}` : 'Select an item'}
        confirmText="Выход"
        cancelText="Отмена"
        onConfirm={handleConfirm}
        showCloseButton={true}
        maxWidth="max-w-lg"
      >
        <div className="flex flex-col gap-y-4">
          {typeItem && (
            <SelectedMetaData
              setMetaData={setMetaData}
              metaData={metaData}
              typeItem={typeItem}
            />
          )}

          {/* Кнопки */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" className="cursor-pointer" onClick={handleConfirm}>
              Save
            </Button>

            <Button onClick={closeModal} className="cursor-pointer">
              Exit
            </Button>
          </div>
        </div>
      </Modal>
    </article>
  );
};
export default RecipeMetaComponents;
