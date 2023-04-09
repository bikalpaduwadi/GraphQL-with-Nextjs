import { UsersList, MoviesList } from "../FakeData.js"

const resolvers = {
  Query: {
    // USER RESOLVERS
    users: () => {
      return UsersList
    },

    usersByName: (_, args) => {
      const username = args.name

      if (!username) {
        return UsersList
      }

      const users = UsersList.filter((user) =>
        user.name
          .toString()
          .toLocaleLowerCase()
          .includes(username.toString().toLocaleLowerCase())
      )

      return users
    },

    user: (_, args) => {
      const userId = args.id
      const user = UsersList.find(
        (user) => user.id.toString() === userId.toString()
      )

      return user
    },

    //MOVIE RESOLVERS
    movies: () => {
      return MoviesList
    },

    moviesByName: (_, args) => {
      const movieName = args.name

      if (!movieName) {
        return MoviesList
      }

      const movies = MoviesList.filter((movie) =>
        movie.name
          .toString()
          .toLocaleLowerCase()
          .includes(movieName.toString().toLocaleLowerCase())
      )

      return movies
    },

    movie: (_, args) => {
      const movieId = args.id
      const movie = MoviesList.find(
        (movie) => movie.id.toString() === movieId.toString()
      )

      return movie
    },
  },

  User: {
    favoriteMovies: () => {
      return MoviesList.filter((movie) => movie.yearOfPublication >= 1995)
    },
  },

  Mutation: {
    createUser: (_, args) => {
      const user = args.createUserPayload
      console.log(user)
      const userId = UsersList[UsersList.length - 1].id + 1
      user.id = userId
      UsersList.push(user)

      return user
    },

    UpdateUsername: (_, args) => {
      const inputPayload = args.UpdateUsernamePayload
      const user = UsersList.find(
        (user) => user.id.toString() === inputPayload.id.toString()
      )
      user.username = inputPayload.username
      // UsersList[inputPayload.id].name = inputPayload.name;

      return user
    },

    UpdateUser: (_, args) => {
      const inputPayload = args.updateUserPayload
      const user = UsersList.find(
        (user) => user.id.toString() === inputPayload.id.toString()
      )
      user.name = inputPayload.name
      user.username = inputPayload.username
      user.age = inputPayload.age
      user.nationality = inputPayload.nationality

      return user
    },

    DeleteUser: (_, args) => {
      const userId = args.userId
      const user = UsersList.find(
        (user) => user.id.toString() === userId.toString()
      )
      const userIndex = UsersList.indexOf(user)

      UsersList.splice(userIndex, 1)

      return user
    },
  },
}

export default resolvers
