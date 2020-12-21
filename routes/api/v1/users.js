const express=require("express");//requiring express and its existing instance will be used
const router=express.Router();//getting the router
const usersApi=require("../../../controllers/api/v1/users_api");//getting the users api controller

router.post("/create-session", usersApi.createSession);//for handling the requests at "/create-session", we use the createSession action of the users api

module.exports=router;//exporting the router, so that it can be accessed by the server to handle the incoming requests