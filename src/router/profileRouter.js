const express = require("express")

const profileRouter = express.Router();


const { userAuth } = require("../middleware/auth.js")

const {validateProfileData} = require("../utils/validation")


profileRouter.get("/profile/view", userAuth, async (req, res) => {

  try {
    const userProfile = req.user;
    res.send(userProfile);
  } catch (err) {
    console.log(err)
    res.status(400).send("Error reading profile");
  }
})


profileRouter.patch("/profile/edit" , userAuth , async (req , res) =>{
  try{
     
    if(!validateProfileData(req)){
      throw new Error("Invalid edit request")
    }
    
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();
    
    res.json({
      message : `${loggedInUser.firstName} , your profile updated succesfully`,
      data : loggedInUser
    })

  }catch(err){

    console.log(err);
    res.status(400).send("Error while updating profile")

  }

})



module.exports = profileRouter