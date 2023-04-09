import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import Filter from '../Flter';
import Movie from '@/models/movie';
import { QUERY_MOVIE_BY_NAME } from '@/graphql/queries/movies';

const MoviesList = () => {
  // const { data, loading, error } = useQuery(QUERY_ALL_MOVIES);
  // const movies: Movie[] = data?.movies;

  const [fetchMovies, { data: searchedMovies, loading, error: SearchError }] = useLazyQuery(QUERY_MOVIE_BY_NAME);

  useEffect(() => {
    searchMovies('');
  }, []);

  const searchMovies = (searchValue: string) => {
    fetchMovies({
      variables: {
        name: searchValue,
      },
    });
  };

  if (loading) {
    return <h2 className="text-zinc-500 text-lg">Data is loading...</h2>;
  }

  const movies: Movie[] = searchedMovies?.moviesByName;
  console.log(movies);

  return (
    <>
      <Filter placeholder="Search Movies" onFilter={searchMovies}></Filter>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Is In Theaters
              </th>
              <th scope="col" className="px-6 py-3">
                Year Of Publication
              </th>
            </tr>
          </thead>
          <tbody>
            {movies?.map((movie) => (
              <tr
                key={movie?.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{movie?.id}</td>
                <td className="px-6 py-4">{movie.name}</td>
                <td className="px-6 py-4">{movie?.isInTheaters.toString().toUpperCase()}</td>
                <td className="px-6 py-4">{movie?.yearOfPublication}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MoviesList;
