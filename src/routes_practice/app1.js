const express = require("express");

const app = express();


app.get("/user",(req,res) =>{
    console.log("GET API CALL")
    res.send("GET USER CALL");
});

app.post("/user", (req,res) => {
    res.send(" POST user call");
    console.log(req.body)
});

app.patch("/user" , (req,res) =>{
    res.send("PATCH USER CALL");
});

app.delete("/user", (req,res) => {
    res.send("DELETE USER API CALL");
})

app.use("/hello", (req,res) => {
    res.send("Hello hello");
});

app.use("/", (req,res) => {
    res.send("Hello from dashboard 222");
});




app.listen(7777 , () =>{
    console.log("Server is succesfully created ");
});