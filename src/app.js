const express = require("express");

const app = express();

const connectDB = require("./database/database.js");

const User = require("./models/user.js");

app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log(req.body)
  const user = new User(req.body)
  try {
    await user.save();
    res.send("User saved successfully ")
  } catch (err) {
    res.status(400).send("Error saving the user :" + err.message);
  }

});


app.delete("/user", async (req, res) => {
  const userEmailId = req.body.emailId;
  await User.deleteOne({ emailId: userEmailId });

  res.send("User deleted succesfully");

});

app.patch("/user", async (req, res) => {
  try {
    const userEmailId = req.body.emailId;
    console.log(userEmailId);

    const updatedUser = await User.findOneAndUpdate(
      { emailId: userEmailId },   // filter
      req.body                   // update daa
    );

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.send({
      message: "User updated successfully",
      user: updatedUser
    });

  } catch (err) {
    res.status(500).send({
      message: "Error updating user",
      error: err.message
    });
  }
});


app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  console.log(userEmail)
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length == 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }


  } catch (err) {
    res.send(500).send("Something went wrong");
  }

});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users)
  } catch (err) {
    res.status(500).send("No users found")
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
