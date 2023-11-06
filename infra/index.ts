import { ApolloServer } from 'apollo-server-lambda';
import typeDefs from './types/index';
import resolvers from './resolvers/index';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const handler = server.createHandler();