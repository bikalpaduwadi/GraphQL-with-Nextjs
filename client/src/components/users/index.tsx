import { GrFormAdd } from 'react-icons/gr';
import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLazyQuery, useMutation } from '@apollo/client';

import Filter from '../Flter';
import User from '@/models/user';
import Modal from '../common/Modal';
import UsersList from './UsersList';
import AddUserForm from './AddUserForm';
import { CreateUser } from '@/models/user';
import { CREATE_USER_MUTATION, QUERY_USER_BY_NAME } from '@/graphql/queries/users';

const Users = () => {
  // const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  // const users: User[] = data?.users;

  const [fetchUsers, { data: searchedUsers, loading: searchLoading, error: SearchError, refetch }] =
    useLazyQuery(QUERY_USER_BY_NAME);

  useEffect(() => {
    searchUsers('');
  }, []);

  const [createUser, { data: createUserResponse }] = useMutation(CREATE_USER_MUTATION);

  const usersList: User[] = searchedUsers?.usersByName;

  const { watch, register, formState, handleSubmit, reset } = useForm<CreateUser>();
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const onAddUser: SubmitHandler<CreateUser> = async (data) => {
    await createUser({
      variables: {
        createUserPayload: { ...data, age: Number(data.age) },
      },
    });
    refetch();
  };

  const searchUsers = (searchValue: string) => {
    fetchUsers({
      variables: {
        name: searchValue,
      },
    });
  };

  const handleClose = () => {
    setShowAddUserModal(false);
    reset();
  };

  const handleSave = async () => {
    await handleSubmit(onAddUser)();
    reset();
  };

  return (
    <div>
      <h2 className="text-2xl font-sans text-zinc-400 my-5">List of users</h2>
      <div className="flex flex-row items-center">
        <Filter placeholder="Search Users" onFilter={searchUsers}></Filter>

        <button
          type="button"
          title="Add New User"
          onClick={() => setShowAddUserModal((value) => !value)}
          className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <GrFormAdd color="white" className="mr-1" size={20}></GrFormAdd>
        </button>
      </div>

      {searchLoading ? (
        <h2 className="text-zinc-500 text-lg">Data is loading...</h2>
      ) : (
        <UsersList users={usersList} refetch={refetch}></UsersList>
      )}

      {showAddUserModal && (
        <Modal title="Add User" onSave={handleSave} onClose={handleClose}>
          <AddUserForm formState={formState} register={register}></AddUserForm>
        </Modal>
      )}
    </div>
  );
};

export default Users;
