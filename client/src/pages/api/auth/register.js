import bcrypt from "bcryptjs";
import { request, gql } from "graphql-request";
import generateToken from "../../../utils/generateToken";

const API_URL = "http://localhost:5000/graphql";

const ADD_USER = gql`
  mutation ($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      id
      username
    }
  }
`;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const response = await request(API_URL, ADD_USER, {
      username,
      password: hashedPassword,
    });

    const token = generateToken(response.addUser.id);

    res.status(200).json({ token });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
