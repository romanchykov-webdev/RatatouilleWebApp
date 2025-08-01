'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Eye, EyeClosed } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface IInputLogResProps {
  id: string;
  type: string;
  inputValue: string;
  setValue: (value: string) => void;
  isPas?: boolean;
  isError?: boolean;
  errorText?: string | null;
  placeholder?: string;
}

const InputLogRes: React.FC<IInputLogResProps> = ({
  id,
  type,
  inputValue,
  setValue,
  isPas = false,
  isError = false,
  errorText = null,
  placeholder = '',
}) => {
  const [isVisiblePass, setIsVisiblePass] = useState(false);

  console.log('InputLogRes isError', isError);
  console.log('InputLogRes errorText', errorText);

  return (
    <div className="grid gap-2   ">
      <div className="flex items-center">
        <Label htmlFor={id} className="capitalize">
          {id}
        </Label>
      </div>
      <div className="relative flex items-center ">
        <Input
          id={id}
          type={isPas && isVisiblePass ? 'text' : type}
          value={inputValue}
          onChange={e => setValue(e.target.value)}
          required
          placeholder={placeholder}
          aria-describedby={isError && errorText ? `${id}-error` : undefined}
        />
        {isPas && (
          <div
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={() => setIsVisiblePass(!isVisiblePass)}
            role="button"
            aria-label={isVisiblePass ? 'Скрыть пароль' : 'Показать пароль'}
          >
            {isVisiblePass ? (
              <Eye className="w-5 h-5" />
            ) : (
              <EyeClosed className="w-5 h-5" />
            )}
          </div>
        )}
      </div>

      {isError && errorText && (
        <div id={`${id}-error`} className="text-red-500 text-xs pl-1">
          {errorText}
        </div>
      )}
    </div>
  );
};
export default InputLogRes;
