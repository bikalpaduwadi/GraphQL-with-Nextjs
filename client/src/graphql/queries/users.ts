import { gql } from '@apollo/client';

export const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      age
      name
      username
      nationality
      friends {
        id
        name
      }
    }
  }
`;

export const QUERY_USER_BY_NAME = gql`
  query GetUserByName($name: String!) {
    usersByName(name: $name) {
      id
      age
      name
      username
      nationality
      friends {
        id
        name
      }
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($createUserPayload: CreateUserInput!) {
    createUser(createUserPayload: $createUserPayload) {
      id
      age
      name
      username
      nationality
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($updateUserPayload: UpdateUserInput!) {
    UpdateUser(updateUserPayload: $updateUserPayload) {
      id
      age
      name
      username
      nationality
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($userId: ID!) {
    DeleteUser(userId: $userId) {
      id
    }
  }
`;
