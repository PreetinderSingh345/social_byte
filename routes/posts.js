const express=require("express");//requiring express and its existing instance will be used
const router=express.Router();//getting the router
const postsController=require("../controllers/posts_controller");//getting the posts controller

router.post("/create", postsController.create);//for handling the requests at "/create" route, we call the create action of the postsController

module.exports=router;//exporting the router, so that it can be accessed by the server to handle the incoming requests