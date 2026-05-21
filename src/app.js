const express = require("express");

const app = express();

const connectDB = require("./database/database.js");

const User = require("./models/user.js");

const { validateSignUp } = require("./utils/validation.js");

const bcrypt = require("bcrypt");

const cookieParser = require("cookie-parser");

const { userAuth } = require("./middleware/auth.js")

const jwt = require("jsonwebtoken");

app.use(express.json());

app.use(cookieParser());


app.post("/signup", async (req, res) => {


  const user = new User(req.body)
  const { firstName, lastName, emailId, password } = req.body;
  try {

    validateSignUp(req);

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword
    })

    await user.save();

    res.send("User saved successfully ")
  } catch (err) {
    res.status(400).send("Error saving the user :" + err.message);
  }

});

app.post("/login", async (req, res) => {
  try {

    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const jwtToken = user.getJWT();

      res.cookie('token', jwtToken, {
        expires: new Date(Date.now() + 8 * 60 * 60 * 1000)   // 8 hours
      });
      res.send("Login successful");
    } else {
      throw new Error("Invalid Credentials");
    }

  } catch (err) {
    res.status(400).send("Error authenticating user :" + err.message);
  }

})

app.get("/profile", userAuth, async (req, res) => {

  try {
    const userProfile = req.user;
    res.send(userProfile);
  } catch (err) {
    console.log(err)
    res.status(400).send("Error reading profile");
  }
})






connectDB().then(() => {
  console.log("Database connection successful ");
  app.listen(7777, () => {
    console.log("Server is successfully connected to port 7777")
  });

}).catch((err) => {
  console.log("Database cannot be connected")
});
