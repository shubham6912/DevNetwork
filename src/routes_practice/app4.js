const express = require("express")

const app = express();


const {adminAuth,userAuth} = require("../middleware/auth.js");


app.use("/admin", adminAuth);


app.get("/admin/getAllUsers",(req,res) =>{
    console.log("Get all users");
    res.send("All the users ");
});



app.delete("/admin/delete",(req,res) => {
    console.log("Delete a user");
    res.send("User successfully deleted");
});


app.get("/user/login",(req,res) => {
    console.log("Redirecting to login page");
    res.send("Login page")
});

app.get("/user/getData",userAuth, (req,res) =>{
    console.log("Fetching user data");
    res.send("Fetching user data");
})

app.listen(7999,(req,res) => {
    console.log("server started")
})