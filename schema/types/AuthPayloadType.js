const { GraphQLObjectType, GraphQLString } = require("graphql");

const AuthPayloadType = new GraphQLObjectType({
  name: "AuthPayload",
  fields: () => ({
    token: { type: GraphQLString },
    user: { type: require("./UserType") },
  }),
});

module.exports = AuthPayloadType;
