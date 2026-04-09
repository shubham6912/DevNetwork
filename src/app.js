const express = require("express");

const app = express();

app.use("/", (req,res) => {
    res.send("Hello from dashboard 222");
});


app.use("/hello", (req,res) => {
    res.send("Hello hello");
});



app.listen(7777 , () =>{
    console.log("Server is succesfully created ");
});