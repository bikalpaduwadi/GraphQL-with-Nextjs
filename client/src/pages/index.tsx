import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';

import MoviesList from '@/components/movies/MoviesList';
import apolloClientInstance from '@/graphql/apolloClient';
import Users from '@/components/users';

export default function Home() {
  return (
    <>
      <Head>
        <title>My App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ApolloProvider client={apolloClientInstance}>
        <div className="w-3/4 m-auto">
          <Users></Users>
          <h2 className="text-2xl font-sans text-zinc-400 my-5">List of movies</h2>
          <MoviesList />
        </div>
      </ApolloProvider>
    </>
  );
}
