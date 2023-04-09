import { ApolloServer } from "apollo-server";

import typeDefs from "./schema/type-defs.js";
import resolvers from "./schema/resolver.js";

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Graphql api listening.. : ${url}`);
});
