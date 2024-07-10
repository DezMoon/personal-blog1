import bcrypt from "bcryptjs";
import { request, gql } from "graphql-request";
import generateToken from "../../../utils/generateToken";

const API_URL = "http://localhost:5000/graphql";

const GET_USER = gql`
  query ($username: String!) {
    user(username: $username) {
      id
      username
      password
    }
  }
`;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    const response = await request(API_URL, GET_USER, { username });

    if (!response.user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const valid = await bcrypt.compare(password, response.user.password);

    if (!valid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = generateToken(response.user.id);

    res.status(200).json({ token });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
