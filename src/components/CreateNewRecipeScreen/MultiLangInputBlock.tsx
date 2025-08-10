'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import SkeletonCustom from './SkeletonCustom';
import { useDebounce } from '@/helpers/hooks/useDebounce';
import { ILanguage } from '@/types/createNewRecipeScreen.types';

interface MultiLangInputBlockProps {
  label: string;
  languages: ILanguage[];
  dependency: { lang: string; value: string }[];
  dispatch: (payload: { lang: string; value: string }[]) => void;
  placeholderPrefix: string;
}

const MultiLangInputBlock: React.FC<MultiLangInputBlockProps> = ({
  label,
  languages,
  dependency,
  dispatch,
  placeholderPrefix,
}) => {
  const [values, setValues] = useState<Record<string, string>>({});

  const debouncedValues = useDebounce(values);

  const handleChange = (langName: string, value: string) => {
    setValues(prev => ({ ...prev, [langName]: value }));
  };

  useEffect(() => {
    const allFilled =
      languages.length > 0 && languages.every(lang => debouncedValues[lang.name]?.trim());

    if (allFilled) {
      const payload = languages.map(lang => ({
        lang: lang.name,
        value: debouncedValues[lang.name],
      }));
      dispatch(payload);
    }
  }, [debouncedValues, dispatch, languages]);

  return (
    <article className="flex flex-col gap-y-2 relative">
      <SkeletonCustom dependency={dependency} />
      <h6 className="text-center">{label}</h6>
      {languages.map(lang => (
        <div key={lang.name} className="flex gap-x-2 items-center">
          <Input
            type="text"
            className="w-[90%]"
            value={values[lang.name] || ''}
            onChange={e => handleChange(lang.name, e.target.value)}
            placeholder={`${placeholderPrefix} ${lang.value}`}
          />
          <div className="capitalize text-lg">{lang.name}</div>
        </div>
      ))}
    </article>
  );
};

export default MultiLangInputBlock;
