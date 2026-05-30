const express = require("express");

const app = express();

const connectDB = require("./database/database.js");

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());

app.use(cookieParser());

const authRouter = require("./router/authRouter");
const profileRouter = require("./router/profileRouter");
const requestRouter = require("./router/request");
const userRouter = require("./router/userRouter");
const cors = require("cors");

app.use(cors(
  {
    origin: "http://localhost:5173",
     credentials: true,
  }
));
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);





connectDB().then(() => {
  console.log("Database connection successful ");
  app.listen(7777, () => {
    console.log("Server is successfully connected to port 7777")
  });

}).catch((err) => {
  console.log("Database cannot be connected")
});
