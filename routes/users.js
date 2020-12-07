const express=require("express");//requiring express and its available instance will be used
const router=express.Router();//getting the router
const usersController=require("../controllers/users_controller");//getting the users controller
const passport=require("passport");//requiring passport

// router.get("/profile", usersController.profile);//for handling the requests at "/profile" route, we call the profile action of the usersController

router.get("/profile", passport.checkAuthentication, usersController.profile);//for handling the requests at "/profile" route, we call the profile action of the usersController and we're using checkAuthentication as a middleware for making sure that the profile page is accessible only if the user is signed in 

router.get("/profile/:id", passport.checkAuthentication, usersController.friendsProfile);//for handling the requests at "profile" route(the string param id contains the id of the user whose profile page is to be rendered) and we're using checkAuthentication as a middleware for making sure that the profile page is accessible only when the user is signed in

router.get("/sign-up", usersController.signUp)//for handling the requests at "/sign-up"(using kebab case for routes) route, we call the signUp action of the usersController

router.get("/sign-in", usersController.signIn);//for handling the requests at "/sign-in" route, we call the signIn action of the usersController

router.post("/create", usersController.create);//for handling the requests at "/create" route, we call the create action of the usersController

// router.post("/create-session", usersController.createSession);//for handling the requests at "/create-session", we call the createSession action of the usersController

router.post("/create-session", passport.authenticate(//authenticating the request using passport

    "local",//specifying the passport stragey we're using
    {failureRedirect: "/users/sign-in"}//redirecting to the sign in page in case the authentication fails

    // authentication takes place inside the passport-local-strategy file we've set up inside config

), usersController.createSession);//for handling the requests at "/create-session" route, we call the createSession action of the usersController and we are using authenticate as a middleware for authentication

router.get("/sign-out", usersController.destroySession);//for handling the requests at "/sign-out" route, we call the destroySession action of the usersController 

module.exports=router;//exporting the router, so that it can be accessed by the server to handle the incoming requests