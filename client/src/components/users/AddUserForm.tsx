import React from 'react';
import { FormState, UseFormRegister } from 'react-hook-form';

import { CreateUser } from '@/models/user';
import Nationality from '@/enums/Nationality';

interface AddUserFormProps {
  formState: FormState<CreateUser>;
  register: UseFormRegister<CreateUser>;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ formState, register }) => {
  return (
    <div className="flex justify-center">
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label htmlFor="full_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Full name
          </label>
          <input
            type="text"
            id="full_name"
            placeholder="John Doe"
            {...register('name', { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="John"
            {...register('username', { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nationality
          </label>
          <select
            id="countries"
            {...register('nationality')}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {Object.values(Nationality)
              .filter((nation) => typeof nation === 'string')
              .map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Age
          </label>
          <input
            id="age"
            min={15}
            max={115}
            type="number"
            placeholder="23"
            {...register('age')}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;
