import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface SelectFieldProps {
  id: string;
  value: any[];
  className?: string;
  register: UseFormRegisterReturn<any>;
}

const SelectField: React.FC<SelectFieldProps> = ({ id, value, className, register }) => {
  const defaultClassName =
    'bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
  const selectClassName = className || defaultClassName;

  return (
    <select id={id} className={selectClassName} {...register}>
      {value.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default SelectField;
