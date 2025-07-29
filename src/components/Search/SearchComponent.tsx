'use client';

import React, { ChangeEvent, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery } from '@/store/slices/searchSlice';
import { useDebounce } from '@/helpers/hooks/useDebounce';

const SearchComponent: React.FC = () => {
  const pathName = usePathname();

  const router = useRouter();

  const dispatch = useDispatch();

  const searchQuery = useSelector((state: RootState) => state.search.query);

  const debounceValue = useDebounce(searchQuery);

  //  Отправка запроса на сервер
  useEffect(() => {
    if (debounceValue && pathName.startsWith('/searchScreen')) {
      // getSearchQuery(debounceValue);
      console.log(debounceValue);
    }
  }, [dispatch, debounceValue, pathName]);

  if (pathName !== '/' && !pathName.startsWith('/searchScreen')) return null;

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push('/searchScreen');
    }
  };

  return (
    <div className="items-center relative  flex ">
      <Input
        value={searchQuery}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          dispatch(setQuery(e.target.value))
        }
        type="text"
        style={{ paddingLeft: 5, height: 40, fontSize: 24 }}
        placeholder="Search recipe"
      />
      {!pathName.startsWith('/searchScreen') && (
        <Button
          style={{ marginLeft: 10 }}
          onClick={handleSearch}
          className="w-[40px] h-[40px]   cursor-pointer shadow-none "
        >
          <Search
            style={{ height: 30, width: 30 }}
            className="text-neutral-400 dark:text-white hover:text-neutral-900 transition-text duration-600"
          />
        </Button>
      )}
    </div>
  );
};
export default SearchComponent;
