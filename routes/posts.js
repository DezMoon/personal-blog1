const express = require("express");
const { gql } = require("graphql-request");
const { request } = require("graphql-request");
const auth = require("../middleware/auth");

const router = express.Router();
const API_URL = "http://localhost:5000/graphql";

const ADD_POST = gql`
  mutation ($title: String!, $content: String!, $tags: String!) {
    addPost(title: $title, content: $content, tags: $tags) {
      id
      title
      content
      tags
    }
  }
`;

const GET_POSTS = gql`
  {
    posts {
      id
      title
      content
      tags
    }
  }
`;

// Get posts
router.get("/", async (req, res) => {
  try {
    const response = await request(API_URL, GET_POSTS);
    res.status(200).json(response.posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Add a post
router.post("/", auth, async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    const response = await request(API_URL, ADD_POST, { title, content, tags });
    res.status(200).json(response.addPost);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
