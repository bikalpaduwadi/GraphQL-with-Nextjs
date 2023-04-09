import { gql } from '@apollo/client';

export const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      id
      name
      isInTheaters
      yearOfPublication
    }
  }
`;

export const QUERY_MOVIE_BY_NAME = gql`
  query GetMovieByName($name: String!) {
    moviesByName(name: $name) {
      id
      name
      yearOfPublication
      isInTheaters
    }
  }
`;
