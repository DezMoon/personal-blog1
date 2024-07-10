const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const app = express();
require("dotenv").config();
const auth = require("./middleware/auth");

app.use(express.json());

app.use((req, res, next) => {
  const token = req.header("x-auth-token");
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;
    } catch (err) {
      console.error(err);
    }
  }
  next();
});

app.use(
  "/graphql",
  graphqlHTTP((req) => ({
    schema,
    graphiql: true,
    context: {
      user: req.user,
    },
  }))
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
