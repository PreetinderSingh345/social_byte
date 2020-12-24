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

router.post("/update/:id", passport.checkAuthentication, usersController.update);//for handling the requests at "/update" route(id is passed as a string param containing the id of the user whose profile is to be updated), we call the update action of the usersController and we're using checkAuthentication as a middleware for making sure that the user can update only when it is signed in

// for handling the requests at "/auth/google" route, we use passport.authenticate as a middleware for authenticating the request we're sending to google and inside the middleware, we define the strategy i.e. google and the scope i.e. the data we want google to provide about the user

router.get("/auth/google", passport.authenticate(

    "google", 

    {scope:[

        "profile",
        "email",

    ]}

));

// for handling the requests at "/auth/google/callback" route, we use passport.authenticate as a middleware for authenticating the request google is sending to us and inside the middleware, we define the strategy i.e. google and if the user is not authenticated by google, then we redirect the user to the sign in page else, we call the create session controller of the users controller(this route is the callback url)

router.get("/auth/google/callback", passport.authenticate(

    "google",
    {failureRedirect: "/users/sign-in"}

), usersController.createSession);

// for handling the requests at "/reset-password-link" route, we use the resetPasswordLink action of the users controller

router.post("/reset-password-link", usersController.resetPasswordLink);

// for handling the requests at "/reset-password-page" route, we use the resetPasswordPage action of the users controller

router.get("/reset-password-page", usersController.resetPasswordPage);

module.exports=router;//exporting the router, so that it can be accessed by the server to handle the incoming requests