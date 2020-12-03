const express=require("express");//requiring express and its available instance will be used
const router=express.Router();//getting the router
const usersController=require("../controllers/users_controller");//getting the users controller

router.get("/profile", usersController.profile);//for handling the requests at "/profile" route, we call the profile action of the usersController

router.get("/sign-up", usersController.signUp)//for handling the requests at "/sign-up"(using kebab case for routes) route, we call the signUp action of the usersController

router.get("/sign-in", usersController.signIn);//for handling the requests at "/sign-in" route, we call the signIn action of the usersController

router.post("/create", usersController.create);//for handling the requests at "/create" route, we call the create action of the usersController

router.post("/create-session", usersController.createSession);//for handling the requests at "/create-session" route, we call the createSession action of the usersController

router.get("/sign-out", usersController.signOut);//for handling the requests at "/sign-out" route, we call the signOut action of the usersController

module.exports=router;//exporting the router, so that it can be accessed by the server to handle the incoming requests