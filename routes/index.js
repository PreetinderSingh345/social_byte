const express=require("express");//requiring express and its available instance will be used
const router=express.Router();//getting the router 
const homeController=require("../controllers/home_controller");//getting the home controller

router.get("/", homeController.home);//for handling the requests at "/" or "/home" route, we call the home action of the homeController
router.get("/home", homeController.home);

router.use("/users", require("./users"));//for handling the requests at "/users" route, we use the users route defined inside the same routes section/folder

router.use("/posts", require("./posts"));//for handling the requests at "/posts" route, we use the posts route defined inside the routes folder

module.exports=router;//exporting the router, so that it can be accessed by the server to handle the incoming requests