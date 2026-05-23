const express = require("express");

const app = express();

const connectDB = require("./database/database.js");

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());

app.use(cookieParser());

const authRouter = require("./router/authRouter");
const profileRouter = require("./router/profileRouter")

app.use("/",authRouter);
app.use("/",profileRouter);



connectDB().then(() => {
  console.log("Database connection successful ");
  app.listen(7777, () => {
    console.log("Server is successfully connected to port 7777")
  });

}).catch((err) => {
  console.log("Database cannot be connected")
});
