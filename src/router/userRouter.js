const express = require("express");
const { userAuth } = require("../middleware/auth");

const userRouter = express.Router();

const connectionRequest = require("../models/connectRequestHandler");
const ConnectionRequest = require("../models/connectRequestHandler");

const User = require("../models/user");

const USER_SAFE_DATA = ["firstName", "lastName", "age", "about", "photoUrl", "skills"];

userRouter.get("/user/request/received", userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user;

        const connectionReceived = await connectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate(
            "fromUserId",
            USER_SAFE_DATA
        );

        res.json({
            message: "Data fetched successfully",
            data: connectionReceived
        })



    } catch (err) {
        console.log(err)
        res.status(500).send("ERROR occured while fetching request received")
    }

})


userRouter.get("/user/connection", userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user;


        const connections = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id, status: "accepted" },
                { toUserId: loggedInUser._id, status: "accepted" }
            ]
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);

        console.log(connections)
        const data = connections.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;

        });
        res.json({ data });

    } catch (err) {
        res.status(500).send("ERROR " + err);
    }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;

        const loggedInUser = req.user;
        const connections = await connectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id },
                { fromUserId: loggedInUser._id },
            ]
        }).select("fromUserId toUserId");


        const hideUserFromFeed = new Set();

        connections.forEach((req) => {
            hideUserFromFeed.add(req.fromUserId);
            hideUserFromFeed.add(req.toUserId)
        });


        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUserFromFeed) } },
                { _id: { $ne: loggedInUser._id } }
            ]
    }).select(USER_SAFE_DATA).skip(skip).limit(limit);

    res.send(users);

    } catch (err) {
    res.status(400).send("ERROR " + err.message);
}

})



module.exports = userRouter