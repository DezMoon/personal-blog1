const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");
const UserType = require("./types/UserType");
const PostType = require("./types/PostType");
const db = require("../models");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return db.User.findAll();
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return db.Post.findAll();
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        return db.User.create({
          username: args.username,
          password: args.password,
        });
      },
    },
    addPost: {
      type: PostType,
      args: {
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        tags: { type: GraphQLString },
        userId: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return db.Post.create({
          title: args.title,
          content: args.content,
          tags: args.tags,
          userId: args.userId,
        });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
