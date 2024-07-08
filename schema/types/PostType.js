const { GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");

const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    tags: { type: GraphQLString },
    userId: { type: GraphQLInt },
  }),
});

module.exports = PostType;
