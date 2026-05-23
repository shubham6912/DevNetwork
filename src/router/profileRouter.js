const express = require("express")

const profileRouter = express.Router();


const { userAuth } = require("../middleware/auth.js")


profileRouter.get("/profile", userAuth, async (req, res) => {

  try {
    const userProfile = req.user;
    res.send(userProfile);
  } catch (err) {
    console.log(err)
    res.status(400).send("Error reading profile");
  }
})

module.exports = profileRouter