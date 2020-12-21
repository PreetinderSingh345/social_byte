const express=require("express");//requiring express and its existing instance will be used
const router=express.Router();//getting the router

router.use("/v1", require("./v1/index"));//for handling the requests at "/v1" route, we use the index file of the v1 folder defined inside the api folder

module.exports=router;//exporting the router, so that it can be accessed by the server to handle the incoming requests