'use client';

import React from 'react';
import HeaderComponent from '@/components/Header/headerComponent';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { useDebounce } from '@/helpers/hooks/useDebounce';

const SearchScreen: React.FC = () => {
  const query = useSelector((state: RootState) => state.search.query);

  const debounceValue = useDebounce(query);

  return (
    <section>
      <HeaderComponent />

      <div>
        <h1>Результаты поиска</h1>
        <p>Введённый запрос: {debounceValue || 'Запрос не указан'}</p>
        {/* Логика для отображения результатов поиска на основе query */}
      </div>
    </section>
  );
};
export default SearchScreen;
