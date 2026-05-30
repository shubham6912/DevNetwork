const express = require("express");

const authRouter = express.Router();

const User = require("../models/user.js");

const bcrypt = require("bcrypt");

const { validateSignUp } = require("../utils/validation.js");

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
  try {

    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const jwtToken = await user.getJWT();

      res.cookie('token', jwtToken, {
        expires: new Date(Date.now() + 8 * 60 * 60 * 1000)   // 8 hours
      });
      res.send(user);
    } else {
      throw new Error("Invalid Credentials");
    }

  } catch (err) {
    res.status(400).send("Error authenticating user :" + err.message);
  }

})

authRouter.post("/logout", async (req,res) =>{
  res.cookie("token", null , {
    expires : new Date(Date.now()),
  })

  res.send("Logout successfull !")
})

module.exports= authRouter;