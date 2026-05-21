const jwtT = require("jsonwebtoken")
const User = require("../models/user.js");



const userAuth = async (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {

        res.status(400).send("ERROR Token is not present please login")
    }
    const decodedId = await jwtT.verify(token, "DevTinder@799");


    const user = await User.findById(decodedId);

    if (!user) {
        res.status(400).send("User not found");
    }

    req.user = user;
    next();


}

module.exports = { userAuth };

