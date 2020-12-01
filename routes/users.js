const express=require("express");//requiring express and its available instance will be used
const router=express.Router();//getting the router
const usersController=require("../controllers/users_controller");//getting the users controller

router.get("/profile", usersController.profile);//for handling the requests at "/profile" route, we call the profile action of the usersController

module.exports=router;//exporting the router, so that it can be accessed by the server to handle the incoming requests