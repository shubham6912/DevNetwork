const jwtT = require("jsonwebtoken");
const User = require("../models/user.js");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("ERROR: Token is not present, please login");
    }

    const decoded = jwtT.verify(token, "DevTinder@799");
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).send("ERROR: " + err.message);
  }
};

module.exports = { userAuth };
