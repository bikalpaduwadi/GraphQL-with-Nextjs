import { gql } from "apollo-server"

const typeDefs = gql`
  type User {
    id: ID!
    age: Int!
    name: String!
    friends: [User]
    username: String!
    nationality: Nationality!
    favoriteMovies: [Movie]
  }

  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }

  type Query {
    users: [User!]!
    usersByName(name: String!): [User]
    user(id: ID!): User!
    movies: [Movie!]!
    moviesByName(name: String!): [Movie]
    movie(id: ID!): Movie!
  }

  input CreateUserInput {
    age: Int!
    name: String!
    username: String!
    nationality: Nationality = Australia
  }

  input UpdateUserInput {
    id: ID!
    age: Int!
    name: String!
    username: String!
    nationality: Nationality = Australia
  }

  input UpdateUsernameInput {
    id: ID!
    username: String!
  }

  type Mutation {
    createUser(createUserPayload: CreateUserInput): User!
    UpdateUser(updateUserPayload: UpdateUserInput): User!
    UpdateUsername(UpdateUsernamePayload: UpdateUsernameInput): User!
    DeleteUser(userId: ID!): User!
  }

  enum Nationality {
    Nepal
    Canada
    Brazil
    Australia
    Indonesia
    SouthAfrica
    UnitedStates
  }
`

export default typeDefs
