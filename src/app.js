const express = require("express");

const app = express();

const connectDB = require("./database/database.js");

const User = require("./models/user.js");


app.post("/signup", async (req,res) => {
  const user = new User({
    firstName:"Sachin",
    lastName:"Tendulkar",
    emailId :"tech.sachin@gmail.com",
    password : "India"
  })
  try{
    await user.save();
    res.send("User saved successfully ")
  }catch(err){
     res.status(400).send("Error saving the user :"+ err.message);
  }
  
});

connectDB().then(()=>{
    console.log("Database connection successful ");
    app.listen(7777, ()=>{
        console.log("Server is successfully connected to port 7777")
    });

}).catch((err) =>{
    console.log("Database cannot be connected")
});
