import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface NumberFieldProps {
  id: string;
  min: number;
  max: number;
  className?: string;
  placeholder: string;
  register: UseFormRegisterReturn<any>;
}

const NumberField: React.FC<NumberFieldProps> = ({ id, min, max, placeholder, className, register }) => {
  const defaultClassName =
    'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
  const inputClassName = className || defaultClassName;

  return (
    <input
      id={id}
      min={min}
      max={max}
      type="number"
      {...register}
      placeholder={placeholder}
      className={inputClassName}
    />
  );
};

export default NumberField;
