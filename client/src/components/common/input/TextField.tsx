import { CreateUser } from '@/models/user';
import React from 'react';
import { UseFormRegister, UseFormRegisterReturn } from 'react-hook-form';

interface TextFieldProps {
  id: string;
  className?: string;
  placeholder: string;
  register: UseFormRegisterReturn<any>;
}

const TextField: React.FC<TextFieldProps> = ({ id, placeholder, className, register }) => {
  const defaultClassName =
    'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
  const inputClassName = className || defaultClassName;
  console.log('im here...');

  return <input id={id} type="text" {...register} placeholder={placeholder} className={inputClassName} />;
};

export default TextField;
