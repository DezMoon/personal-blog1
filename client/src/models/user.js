import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const users = [];

const findUserByEmail = (email) => users.find((user) => user.email === email);

const createUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { email, password: hashedPassword };
  users.push(newUser);
  return newUser;
};

const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export { findUserByEmail, createUser, verifyPassword, generateToken };
