//gzxlhAhONmHRMbZH
const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();
const PORT = 3005;

mongoose
  .connect(
    `mongodb+srv://Yury:gzxlhAhONmHRMbZH@graphql-tutorial-dsdrr.mongodb.net/graphql-tutorial?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// const dbConnection = mongoose.connection;
// dbConnection.on("error", (err) => console.log(`connection error: ${err}`));
// dbConnection.once("open", () => console.log("connected to DB"));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log("Server started!");
});
