const express = require("express");

const app = express();


app.use("/",(req,res , next) =>{
console.log(" generic middle ware")
next();
});

app.get("/user" ,(req,res,next) =>{
console.log("First middleware ");
next();

});


app.get("/user" , (req,res,next) =>{
    console.log("Last MW");
    res.send("Hello")
})


app.listen(7778 , () =>{
    console.log("Server is succesfully created ");
});