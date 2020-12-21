const express=require("express");//requiring express and its existing instance will be used
const router=express.Router();//getting the router

router.use("/posts", require("./posts"));//for handling the requests at "/posts" route, we use the posts file of the v1 folder defined inside the api folder

router.use("/users", require("./users"));//for handling the requests at "/users" route, we use the users file of the v1 folder defined inside the api folder

module.exports=router;//exporting the router, so that it can be accessed by the server to handle the incoming requests