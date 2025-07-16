'use client';

import React, from 'react';
import Header from '@/components/Header/header';
import WrapperApp from '@/components/Wrappers/wrapperApp';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

const SearchScreen: React.FC = () => {

  const query = useSelector((state: RootState) => state.search.query);


  return (
    <WrapperApp>
      <Header />

      <div>
        <h1>Результаты поиска</h1>
        <p>Введённый запрос: {query || 'Запрос не указан'}</p>
        {/* Логика для отображения результатов поиска на основе query */}
      </div>
    </WrapperApp>
  );
};
export default SearchScreen;