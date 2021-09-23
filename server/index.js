const { ApolloServer } = require("apollo-server");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

require("dotenv").config();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen({ port: 5000 }).then(res => {
  console.log(`Server running at ${res.url}`);
});
