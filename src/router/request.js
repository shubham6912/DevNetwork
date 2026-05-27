const express = require("express")

const requestRouter = express.Router();


const { userAuth } = require("../middleware/auth.js");
const ConnectionRequest = require("../models/connectRequestHandler.js");
const User = require("../models/user.js")


requestRouter.post("/request/send/:status/:toUserId",
    userAuth,
    async (req, res) => {
        try {
            const fromUserId = req.user._id;
            const toUserId = req.params.toUserId;
            const status = req.params.status;



            const allowedStatus = ["ignore", "interested"];

            if (!allowedStatus.includes(status)) {
                return res.status(400).send("Invalid status type");
            }

            const toUserExists = await User.findById(toUserId);

            if (!toUserExists) {
                return res.status(404).json({ message: " User not found " })
            }

            const existingConnectionRequest = await ConnectionRequest.findOne({
                $or: [
                    { fromUserId, toUserId },
                    { fromUserId: toUserId, toUserId: fromUserId }
                ]
            });

            if (existingConnectionRequest) {
                return res.status(400).send("Existing connection request already exists");
            }

            const connectionRequest = new ConnectionRequest({
                fromUserId,
                toUserId,
                status
            })

            const data = await connectionRequest.save();

            res.json({
                message: req.user.firstName + " is " + status + " in " + toUserExists.firstName,
                data,
            })



        } catch (err) {
            res.status(500).send(err.message)
        }
    }
)

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;

        const allowedStatus = ["accepted", "rejected"];

        if (!allowedStatus.includes(status)) {
            return res.status(400).send("Status not allowed ");
        }

        const connectionRequest = await ConnectionRequest.findOne({
            "_id": requestId,
            "toUserId": loggedInUser._id,
            "status": "interested"
        });

        if (!connectionRequest) {
            return res.status(404).send("Connection request not found");
        }

        connectionRequest.status = status;
        const data = await connectionRequest.save();
        res.json({ message: "Connection Request " + status, data });

    } catch (err) {
        res.status(500).send("ERROR occured while review of status");
    }

})

module.exports = requestRouter;