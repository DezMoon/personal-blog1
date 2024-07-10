import { gql } from "graphql-tag";
import { request } from "graphql-request";

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
  query ($tag: String) {
    posts(tag: $tag) {
      id
      title
      content
      tags
    }
  }
`;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, content, tags } = req.body;
    const response = await request(API_URL, ADD_POST, { title, content, tags });
    res.status(200).json(response.addPost);
  } else {
    const { tag } = req.query;
    const response = await request(API_URL, GET_POSTS, { tag });
    res.status(200).json(response.posts);
  }
}
