const express = require("express");

const app = express();


app.use("/user",
   [ 
    (req ,res , next) =>{
    console.log("GET API CALL")
    next();
    
    },
    (req,res , next ) => {
        console.log("Second Route handler CALL ");
        next();
    },
    (req,res , next) => {
        console.log("Third Route handler CALL ");
        //res.send("GET USER CALL BLOCK 3");
        next();
    },
    (req,res, next ) => {
        console.log("Fourth Route handler CALL ");
        res.send("Last block response")
        
    }]

);


app.listen(7778 , () =>{
    console.log("Server is succesfully created ");
});