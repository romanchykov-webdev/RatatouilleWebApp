'use client';

import React, { ChangeEvent, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { clearQuery, setQuery } from '@/store/searchSlice';
import { useDebounce } from '@/helpers/hooks/useDebounce';
import { CircleX } from 'lucide-react';


const SearchComponent: React.FC = () => {

  const pathName = usePathname();

  const router = useRouter();

  const dispatch = useDispatch();

  const searchQuery = useSelector((state: RootState) => state.search.query);

  const debounceValue = useDebounce(searchQuery);

  if (pathName !== '/' && !pathName.startsWith('/searchScreen')) return null;

  //  Отправка запроса на сервер
  useEffect(() => {

    if (debounceValue && pathName.startsWith('/searchScreen')) {
      // getSearchQuery(debounceValue);
      console.log(debounceValue);
    }


  }, [debounceValue, pathName, dispatch]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push('/searchScreen');
    }
  };

  const handClearQuery = () => {
    dispatch(clearQuery());
  };


  return (
    <div className="items-center relative  flex ">
      <div className="relative w-full">
        <Input
          value={searchQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setQuery(e.target.value))}
          type="text"
          style={{ paddingLeft: 5, height: 40, fontSize: 24 }}
          placeholder="Search recipe"
        />
        <CircleX
          onClick={handClearQuery}
          className={`absolute right-0 w-[20px] h-[20px] text-red-400 transition-all duration-600
          ${searchQuery.trim() !== '' ? 'top-0 opacity-100' : '-top-[20px] opacity-0'}`
          }
        />
      </div>
      {
        !pathName.startsWith('/searchScreen') && (
          <Button style={{ marginLeft: 10 }} onClick={handleSearch}
                  className="w-[40px] h-[40px]   cursor-pointer shadow-none ">
            <Search
              style={{ height: 30, width: 30 }}
              className="text-neutral-400 dark:text-white hover:text-neutral-900 transition-text duration-600"
            />
          </Button>
        )
      }

    </div>
  );
};
export default SearchComponent;