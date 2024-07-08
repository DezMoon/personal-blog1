const { GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

module.exports = UserType;
