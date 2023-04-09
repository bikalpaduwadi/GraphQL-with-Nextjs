import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CellContext, createColumnHelper } from '@tanstack/react-table';

import Table from '../common/table/Table';
import Nationality from '@/enums/Nationality';
import TextField from '../common/input/TextField';
import NumberField from '../common/input/NumberField';
import SelectField from '../common/input/SelectField';
import User, { CreateUser, UserTableView } from '@/models/user';
import { ApolloQueryResult, useMutation } from '@apollo/client';
import { DELETE_USER_MUTATION, UPDATE_USER_MUTATION } from '@/graphql/queries/users';

interface UsersListProps {
  users: User[];
  refetch: () => Promise<ApolloQueryResult<any>>;
}

const UsersList: React.FC<UsersListProps> = ({ users, refetch }) => {
  const [selectedRow, setSelectedRow] = useState<UserTableView | null>(null);

  const { register, handleSubmit, reset } = useForm<CreateUser>();

  const usersTableData = (users || []) as UserTableView[];
  const columnHelper = createColumnHelper<UserTableView>();

  const [updateUser, { data: updateUserResponse }] = useMutation(UPDATE_USER_MUTATION);
  const [deleteUser, { data: deleteUserResponse }] = useMutation(DELETE_USER_MUTATION);

  const isSelectedRow = (id: number) => id === selectedRow?.id;

  const handleSave = async () => {
    await handleSubmit(_editUser)();
  };

  const _editUser: SubmitHandler<CreateUser> = async (data) => {
    console.log('payload', data);
    const userPayload = {
      name: data.name,
      age: Number(data.age),
      username: data.username,
      id: Number(selectedRow?.id),
      nationality: data.nationality,
    };
    await updateUser({
      variables: {
        updateUserPayload: { ...userPayload },
      },
    });

    refetch();

    setSelectedRow(null);
  };

  const _deleteUser = async (userId: number) => {
    await deleteUser({
      variables: {
        userId,
      },
    });

    refetch();
  };

  const cellRenderer = (info: CellContext<UserTableView, any>, component: JSX.Element) => {
    const isSelected = isSelectedRow(info.row.original.id);

    if (isSelected) {
      return component;
    }

    return info.getValue();
  };

  const onEdit = (row: UserTableView) => {
    const userValue = row as CreateUser;
    reset(userValue);
    setSelectedRow(row);
  };

  const onCancel = () => {
    reset();
    setSelectedRow(null);
  };

  const columns = [
    columnHelper.accessor('id', {
      cell: (info) => info.getValue(),
      header: () => <span>Id</span>,
    }),
    columnHelper.accessor((row) => row.name, {
      id: 'name',
      header: () => <span>Name</span>,
      cell: (info) => {
        const registerValidation = register('name', { required: true });
        const TextFieldComponent = <TextField id="name" placeholder="Enter name" register={registerValidation} />;
        return cellRenderer(info, TextFieldComponent);
      },
    }),

    columnHelper.accessor('age', {
      header: () => 'Age',
      cell: (info) => {
        const registerValidation = register('age', { required: true });
        const NumberFieldComponent = (
          <NumberField id="age" min={10} max={100} placeholder="Enter age" register={registerValidation} />
        );
        return cellRenderer(info, NumberFieldComponent);
      },
    }),

    columnHelper.accessor('username', {
      header: () => <span>Username</span>,
      cell: (info) => {
        const registerValidation = register('username', { required: true });
        const TextFieldComponent = (
          <TextField id="username" placeholder="Enter username" register={registerValidation} />
        );
        return cellRenderer(info, TextFieldComponent);
      },
    }),

    columnHelper.accessor('nationality', {
      header: 'Nationality',
      cell: (info) => {
        const registerValidation = register('nationality');
        const value = Object.values(Nationality).filter((nation) => typeof nation === 'string');
        const SelectFieldComponent = <SelectField id="username" value={value} register={registerValidation} />;
        return cellRenderer(info, SelectFieldComponent);
      },
    }),

    {
      id: 'action',
      header: 'Action',
      cell: ({ row }: any) => {
        const isSelected = isSelectedRow(row.original.id);

        return (
          <>
            {isSelected ? (
              <>
                <a
                  onClick={() => handleSave()}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-4 cursor-pointer"
                >
                  Save
                </a>
                <a
                  onClick={onCancel}
                  className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                >
                  Cancel
                </a>
              </>
            ) : (
              <>
                <a
                  onClick={() => onEdit(row.original)}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-4 cursor-pointer"
                >
                  Edit
                </a>
                <a
                  onClick={() => _deleteUser(row.original.id)}
                  className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                >
                  Delete
                </a>
              </>
            )}
          </>
        );
      },
    },
  ];

  return (
    <>
      <Table columns={columns} defaultData={usersTableData} selectedRow={selectedRow}></Table>
    </>
  );
};

export default UsersList;
