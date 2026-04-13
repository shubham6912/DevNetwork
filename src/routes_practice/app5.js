const express = require("express")

const app = express();






app.get("/user/getData", (req,res) =>{
    console.log("Fetching user data");
    throw Error("error ");
    res.send("Fetching user data");
})

app.use("/",(err,req,res,next) =>{
    if(err){
        res.status(500).send("An internal error has occured");
    }
})
app.listen(7999,(req,res) => {
    console.log("server started")
})