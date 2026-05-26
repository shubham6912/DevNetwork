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

            const allowedStatus = ["ignored", "accepted"];

            if (!allowedStatus.includes(status)) {
                return res.status(400).send("Invalid status type");
            }

            const toUserExists = await UserActivation.findById(toUserId);

            if (!toUserExists) {
                return res.status(404).json({ message: " User not found " })
            }

            const existingConnectionRequest = await ConnectionRequest.findOne({
                $or: [
                    { fromUserId, toUserId },
                    { fromUserId: toUserId, toUserId: fromUserId }
                ]
            })

            if (existingConnectionRequest) {
                res.status(400).send("Existing connection request already exists");
            }

            const connectionRequest = new ConnectionRequest({
                fromUserId,
                toUserId,
                status
            })

            const data = await connectionRequest.save();

            res.json({
                message: req.user.firstName + "is " + status + " in " + toUser.firstName,
                data,
            })



        } catch (err) {
            res.status(500).status("ERROR ")
        }
    }
)

module.exports = requestRouter;