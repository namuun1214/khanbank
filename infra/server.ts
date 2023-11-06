import {ApolloServer} from 'apollo-server';
import typeDefs from './types/index';
import resolvers from './resolvers/index';

const server = new ApolloServer({typeDefs, resolvers});

server.listen(4000).then(({url}) => {
  console.log(`🚀 Server ready at ${url}`);
});
