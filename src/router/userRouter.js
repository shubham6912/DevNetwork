const express = require("express");
const { userAuth } = require("../middleware/auth");

const userRouter = express.Router();

const connectionRequest = require("../models/connectRequestHandler");
const ConnectionRequest = require("../models/connectRequestHandler");

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
         $or:[   
            { fromUserId: loggedInUser._id, status : "accepted"},
            {  toUserId: loggedInUser._id, status: "accepted"}
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



module.exports = userRouter