const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserType = require("./types/UserType");
const PostType = require("./types/PostType");
const AuthPayloadType = require("./types/AuthPayloadType");
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
      args: {
        tag: { type: GraphQLString },
      },
      resolve(parent, args) {
        if (args.tag) {
          return db.Post.findAll({
            where: { tags: { [db.Sequelize.Op.like]: `%${args.tag}%` } },
          });
        }
        return db.Post.findAll();
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: AuthPayloadType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const user = await db.User.create({
          username: args.username,
          password: args.password,
        });

        const token = jwt.sign(
          { user: { id: user.id } },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        return { token, user };
      },
    },
    login: {
      type: AuthPayloadType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const user = await db.User.findOne({
          where: { username: args.username },
        });
        if (!user) {
          throw new Error("Invalid credentials");
        }

        const isMatch = await user.comparePassword(args.password);
        if (!isMatch) {
          throw new Error("Invalid credentials");
        }

        const token = jwt.sign(
          { user: { id: user.id } },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        return { token, user };
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
      resolve(parent, args, context) {
        if (!context.user) {
          throw new Error("Authentication required");
        }
        return db.Post.create({
          title: args.title,
          content: args.content,
          tags: args.tags,
          userId: context.user.id,
        });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
