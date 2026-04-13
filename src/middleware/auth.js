

const adminAuth=(req,res,next) =>{

    const token="abc";
    console.log("Autheticating admin token");
    const isAdminAuthorized = token === "abc";
    
    if(isAdminAuthorized){
        next();
    }else{
        res.status(401).send("Authintication failed");
    }

};

const userAuth = (req,res,next ) => {
    const token = "abc";

    console.log("User authentication token ");

    const userAuthenticated = token === "abc";

    if(userAuthenticated){
        next();
    }else {
        res.status(401).send("User authentication failed")
    }
}

module.exports={adminAuth , userAuth};

